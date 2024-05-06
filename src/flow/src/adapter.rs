// Copyright 2023 Greptime Team
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//! for getting data from source and sending results to sink
//! and communicating with other parts of the database
use std::borrow::BorrowMut;
use std::collections::{BTreeMap, BTreeSet, HashMap, VecDeque};
use std::sync::Arc;

use api::v1::{RowDeleteRequest, RowDeleteRequests, RowInsertRequest, RowInsertRequests};
use common_error::ext::BoxedError;
use common_frontend::handler::FrontendInvoker;
use common_meta::key::table_info::{TableInfoManager, TableInfoValue};
use common_meta::key::table_name::{TableNameKey, TableNameManager};
use common_meta::key::{TableMetadataManager, TableMetadataManagerRef};
use greptime_proto::v1;
use hydroflow::scheduled::graph::Hydroflow;
use itertools::Itertools;
use minstant::Anchor;
use prost::bytes::buf;
use query::QueryEngine;
use serde::{Deserialize, Serialize};
use session::context::QueryContext;
use smallvec::SmallVec;
use snafu::{OptionExt, ResultExt};
use store_api::storage::RegionId;
use table::metadata::TableId;
use tokio::sync::{broadcast, mpsc, oneshot, Mutex};
use tokio::task::LocalSet;

use crate::adapter::error::{EvalSnafu, ExternalSnafu, TableNotFoundMetaSnafu, TableNotFoundSnafu};
use crate::adapter::util::column_schemas_to_proto;
use crate::adapter::worker::{create_worker, Worker, WorkerHandle};
use crate::compute::{Context, DataflowState, ErrCollector};
use crate::expr::error::InternalSnafu;
use crate::expr::GlobalId;
use crate::plan::{Plan, TypedPlan};
use crate::repr::{self, ColumnType, DiffRow, RelationType, Row, BROADCAST_CAP};
use crate::transform::sql_to_flow_plan;

pub(crate) mod error;
mod server;
#[cfg(test)]
mod tests;
mod util;
mod worker;

use error::Error;

pub const PER_REQ_MAX_ROW_CNT: usize = 8192;

// TODO: refactor common types for flow to a separate module
/// FlowId is a unique identifier for a flow task
pub type FlowId = u64;
pub type TableName = Vec<String>;

/// This function will create a new thread for flow worker and return a handle to the flow node manager
pub fn start_flow_node_and_one_worker(
    frontend_invoker: Box<dyn FrontendInvoker + Send + Sync>,
    query_engine: Arc<dyn QueryEngine>,
    table_meta: TableMetadataManagerRef,
) -> FlowNodeManager {
    let (tx, rx) = oneshot::channel();

    let _handle = std::thread::spawn(move || {
        let node_id = Some(1);
        let (flow_node_manager, mut worker) =
            FlowNodeManager::new_with_worker(node_id, frontend_invoker, query_engine, table_meta);
        let _ = tx.send(flow_node_manager);
        worker.run();
    });

    rx.blocking_recv().unwrap()
}

pub type FlowNodeManagerRef = Arc<FlowNodeManager>;

/// FlowNodeManager manages the state of all tasks in the flow node, which should be run on the same thread
///
/// The choice of timestamp is just using current system timestamp for now
pub struct FlowNodeManager {
    /// The handler to the worker that will run the dataflow
    /// which is `!Send` so a handle is used
    pub worker_handles: Vec<Mutex<WorkerHandle>>,
    /// The query engine that will be used to parse the query and convert it to a dataflow plan
    query_engine: Arc<dyn QueryEngine>,
    /// Getting table name and table schema from table info manager
    table_info_source: TableInfoSource,
    frontend_invoker: Box<dyn FrontendInvoker + Send + Sync>,
    /// contains mapping from table name to global id, and table schema
    node_context: Mutex<FlowNodeContext>,
    tick_manager: FlowTickManager,
    node_id: Option<u32>,
    run_task_created: Mutex<bool>,
}

impl FlowNodeManager {
    /// Trigger dataflow running, and then send writeback request to the source sender
    ///
    /// note that this method didn't handle input mirror request, as this should be handled by grpc server
    pub async fn run(&self) {
        loop {
            self.run_available().await;
            // TODO(discord9): error handling
            let _ = self.send_writeback_requests().await;
            tokio::time::sleep(std::time::Duration::from_secs(1)).await;
        }
    }
    pub fn new(
        node_id: Option<u32>,
        frontend_invoker: Box<dyn FrontendInvoker + Send + Sync>,
        query_engine: Arc<dyn QueryEngine>,
        table_meta: TableMetadataManagerRef,
    ) -> Self {
        let srv_map = TableInfoSource::new(
            table_meta.table_info_manager().clone(),
            table_meta.table_name_manager().clone(),
        );
        let node_context = FlowNodeContext::default();
        let tick_manager = FlowTickManager::new();
        let worker_handles = Vec::new();
        FlowNodeManager {
            worker_handles,
            query_engine,
            table_info_source: srv_map,
            frontend_invoker,
            node_context: Mutex::new(node_context),
            tick_manager,
            node_id,
            run_task_created: Mutex::new(false),
        }
    }
    pub fn new_with_worker<'s>(
        node_id: Option<u32>,
        frontend_invoker: Box<dyn FrontendInvoker + Send + Sync>,
        query_engine: Arc<dyn QueryEngine>,
        table_meta: TableMetadataManagerRef,
    ) -> (Self, Worker<'s>) {
        let mut zelf = Self::new(node_id, frontend_invoker, query_engine, table_meta);
        let (handle, worker) = create_worker();
        zelf.add_worker_handle(handle);
        (zelf, worker)
    }
    pub fn add_worker_handle(&mut self, handle: WorkerHandle) {
        self.worker_handles.push(Mutex::new(handle));
    }
}

/// Just check if NodeManager's other fields are `Send` so later we can refactor so A Flow Node Manager
/// can manage multiple flow worker(thread) then we can run multiple flow worker in a single flow node manager
#[test]
fn check_is_send() {
    fn is_send<T: Send + Sync>() {}
    is_send::<FlowNodeManager>();
}

/// mapping of table name <-> table id should be query from tableinfo manager
pub struct TableInfoSource {
    /// for query `TableId -> TableName` mapping
    table_info_manager: TableInfoManager,
    table_name_manager: TableNameManager,
}

impl TableInfoSource {
    pub fn new(table_info_manager: TableInfoManager, table_name_manager: TableNameManager) -> Self {
        TableInfoSource {
            table_info_manager,
            table_name_manager,
        }
    }

    pub async fn get_table_id_from_proto_name(
        &self,
        name: &greptime_proto::v1::TableName,
    ) -> Result<TableId, Error> {
        self.table_name_manager
            .get(TableNameKey::new(
                &name.catalog_name,
                &name.schema_name,
                &name.table_name,
            ))
            .await
            .with_context(|_| TableNotFoundMetaSnafu {
                msg: format!("Table name = {:?}, couldn't found table id", name),
            })
            .map(|id| id.unwrap().table_id())
    }

    pub async fn get_table_id_from_name(&self, name: &TableName) -> Result<TableId, Error> {
        self.table_name_manager
            .get(TableNameKey::new(&name[0], &name[1], &name[2]))
            .await
            .with_context(|_| TableNotFoundMetaSnafu {
                msg: format!("Table name = {:?}, couldn't found table id", name),
            })
            .map(|id| id.unwrap().table_id())
    }

    /// query metasrv about the table name and table id
    pub async fn get_table_name(&self, table_id: &TableId) -> Result<TableName, Error> {
        self.table_info_manager
            .get(*table_id)
            .await
            .with_context(|_| TableNotFoundMetaSnafu {
                msg: format!("TableId = {:?}, couldn't found table name", table_id),
            })
            .map(|name| name.unwrap().table_name())
            .map(|name| vec![name.catalog_name, name.schema_name, name.table_name])
    }
    /// query metasrv about the table name and table id
    pub async fn get_table_info_value(
        &self,
        table_id: &TableId,
    ) -> Result<Option<TableInfoValue>, Error> {
        Ok(self
            .table_info_manager
            .get(*table_id)
            .await
            .with_context(|_| TableNotFoundMetaSnafu {
                msg: format!("TableId = {:?}, couldn't found table name", table_id),
            })?
            .map(|v| v.into_inner()))
    }

    pub async fn get_table_schema(&self, table_id: &TableId) -> Result<RelationType, Error> {
        let table_info_value = self
            .get_table_info_value(table_id)
            .await?
            .with_context(|| TableNotFoundSnafu {
                name: format!("TableId = {:?}, Can't found table info", table_id),
            })?;
        let raw_schema = table_info_value.table_info.meta.schema;
        let column_types = raw_schema
            .column_schemas
            .into_iter()
            .map(|col| ColumnType {
                nullable: col.is_nullable(),
                scalar_type: col.data_type,
            })
            .collect_vec();

        let key = table_info_value.table_info.meta.primary_key_indices;
        let keys = vec![repr::Key::from(key)];

        let time_index = raw_schema.timestamp_index;
        Ok(RelationType {
            column_types,
            keys,
            time_index,
        })
    }
}

pub enum DiffRequest {
    Insert(Vec<Row>),
    Delete(Vec<Row>),
}

/// iterate through the diff row and from from continuous diff row with same diff type
pub fn diff_row_to_request(rows: Vec<DiffRow>) -> Vec<DiffRequest> {
    let mut reqs = Vec::new();
    for (row, _t, diff) in rows {
        let last = reqs.last_mut();
        match (last, diff) {
            (Some(DiffRequest::Insert(rows)), 1) => {
                rows.push(row);
            }
            (Some(DiffRequest::Insert(_)), -1) => reqs.push(DiffRequest::Delete(vec![row])),
            (Some(DiffRequest::Delete(rows)), -1) => {
                rows.push(row);
            }
            (Some(DiffRequest::Delete(_)), 1) => reqs.push(DiffRequest::Insert(vec![row])),
            _ => (),
        }
    }
    reqs
}

impl FlowNodeManager {
    /// Run all available subgraph in the flow node
    /// This will try to run all dataflow in this node
    ///
    /// However this is not blocking and can sometimes return while actual computation is still running in worker thread
    /// TODO(discord9): add flag for subgraph that have input since last run
    pub async fn run_available(&self) {
        let now = self.tick_manager.tick();
        for worker in self.worker_handles.iter() {
            worker.lock().await.run_available(now);
        }
    }

    /// send write request to related source sender
    pub async fn handle_write_request(
        &self,
        region_id: RegionId,
        rows: Vec<DiffRow>,
    ) -> Result<(), Error> {
        let table_id = region_id.table_id();
        self.node_context.lock().await.send(table_id, rows)?;
        Ok(())
    }

    /// TODO(discord9): merge all same type of diff row into one requests
    ///
    /// Return the number of requests it made
    pub async fn send_writeback_requests(&self) -> Result<usize, Error> {
        let all_reqs = self.generate_writeback_request().await;
        let mut req_cnt = 0;
        for (table_name, reqs) in all_reqs {
            let table_id = self
                .table_info_source
                .get_table_id_from_name(&table_name)
                .await?;
            let table_info = self
                .table_info_source
                .get_table_info_value(&table_id)
                .await?
                .unwrap();
            let (catalog, schema) = (
                table_info.table_info.catalog_name,
                table_info.table_info.schema_name,
            );
            let ctx = QueryContext::with(&catalog, &schema);

            let primary_keys = table_info
                .table_info
                .meta
                .primary_key_indices
                .into_iter()
                .map(|i| {
                    table_info.table_info.meta.schema.column_schemas[i]
                        .name
                        .clone()
                })
                .collect_vec();

            let schema = table_info.table_info.meta.schema.column_schemas;
            let proto_schema = column_schemas_to_proto(schema, &primary_keys)?;

            for req in reqs {
                match req {
                    DiffRequest::Insert(insert) => {
                        let rows_proto: Vec<v1::Row> =
                            insert.into_iter().map(|row| row.into()).collect::<Vec<_>>();
                        let table_name = table_name.last().unwrap().clone();
                        let req = RowInsertRequest {
                            table_name,
                            rows: Some(v1::Rows {
                                schema: proto_schema.clone(),
                                rows: rows_proto,
                            }),
                        };
                        req_cnt += 1;
                        self.frontend_invoker
                            .row_inserts(RowInsertRequests { inserts: vec![req] }, ctx.clone())
                            .await
                            .map_err(BoxedError::new)
                            .with_context(|_| ExternalSnafu {})?;
                    }
                    DiffRequest::Delete(remove) => {
                        let rows_proto: Vec<v1::Row> =
                            remove.into_iter().map(|row| row.into()).collect::<Vec<_>>();
                        let table_name = table_name.last().unwrap().clone();
                        let req = RowDeleteRequest {
                            table_name,
                            rows: Some(v1::Rows {
                                schema: proto_schema.clone(),
                                rows: rows_proto,
                            }),
                        };

                        req_cnt += 1;
                        self.frontend_invoker
                            .row_deletes(RowDeleteRequests { deletes: vec![req] }, ctx.clone())
                            .await
                            .map_err(BoxedError::new)
                            .with_context(|_| ExternalSnafu {})?;
                    }
                }
            }
        }
        Ok(req_cnt)
    }

    /// Generate writeback request for all sink table
    pub async fn generate_writeback_request(&self) -> BTreeMap<TableName, Vec<DiffRequest>> {
        let mut output = BTreeMap::new();
        for (name, sink_recv) in self
            .node_context
            .lock()
            .await
            .sink_receiver
            .iter_mut()
            .map(|(n, (_s, r))| (n, r))
        {
            let mut rows = Vec::new();
            let _recv_cnt = sink_recv.recv_many(&mut rows, PER_REQ_MAX_ROW_CNT).await;
            let reqs = diff_row_to_request(rows);
            output.insert(name.clone(), reqs);
        }
        output
    }

    pub async fn remove_flow(&self, flow_id: FlowId) -> Result<(), Error> {
        for handle in self.worker_handles.iter() {
            let handle = handle.lock().await;
            if handle.contains_flow(flow_id)? {
                handle.remove_flow(flow_id)?;
                break;
            }
        }
        Ok(())
    }

    /// Return task id if a new task is created, otherwise return None
    ///
    /// steps to create task:
    /// 1. parse query into typed plan(and optional parse expire_when expr)
    /// 2. render source/sink with output table id and used input table id
    #[allow(clippy::too_many_arguments)]
    pub async fn create_flow(
        &self,
        flow_id: FlowId,
        sink_table_id: TableId,
        source_table_ids: &[TableId],
        create_if_not_exist: bool,
        expire_when: Option<String>,
        comment: Option<String>,
        sql: String,
        task_options: HashMap<String, String>,
    ) -> Result<Option<FlowId>, Error> {
        if create_if_not_exist {
            // check if the task already exists
            for handle in self.worker_handles.iter() {
                if handle.lock().await.contains_flow(flow_id)? {
                    return Ok(None);
                }
            }
        }

        let mut node_ctx = self.node_context.lock().await;
        // assign global id to source and sink table
        for source in source_table_ids
            .iter()
            .chain(std::iter::once(&sink_table_id))
        {
            node_ctx
                .assign_global_id_to_table(&self.table_info_source, *source)
                .await;
        }
        node_ctx.register_task_src_sink(flow_id, source_table_ids, sink_table_id);

        // construct a active dataflow state with it
        let flow_plan = sql_to_flow_plan(node_ctx.borrow_mut(), &self.query_engine, &sql).await?;

        // TODO(discord9): parse `expire_when`
        let _ = expire_when;
        let _ = comment;
        let _ = task_options;

        // TODO(discord9): add more than one handles
        let sink_id = node_ctx
            .table_repr
            .get_by_table_id(&sink_table_id)
            .unwrap()
            .1;
        let sink_sender = node_ctx.get_sink_by_global_id(&sink_id)?;

        let source_ids = source_table_ids
            .iter()
            .map(|id| node_ctx.table_repr.get_by_table_id(id).unwrap().1)
            .collect_vec();
        let source_senders = source_ids
            .iter()
            .map(|id| node_ctx.get_source_by_global_id(id).map(|s| s.subscribe()))
            .collect::<Result<Vec<_>, _>>()?;

        let handle = &self.worker_handles[0].lock().await;
        handle.create_flow(
            flow_id,
            flow_plan,
            sink_id,
            sink_sender,
            &source_ids,
            source_senders,
            create_if_not_exist,
        )?;

        Ok(Some(flow_id))
    }
}

/// A context that holds the information of the dataflow
#[derive(Default)]
pub struct FlowNodeContext {
    /// mapping from source table to tasks, useful for schedule which task to run when a source table is updated
    pub source_to_tasks: BTreeMap<TableId, BTreeSet<FlowId>>,
    /// mapping from task to sink table, useful for sending data back to the client when a task is done running
    pub flow_to_sink: BTreeMap<FlowId, TableName>,
    /// broadcast sender for source table, any incoming write request will be sent to the source table's corresponding sender
    ///
    /// Note that we are getting insert requests with table id, so we should use table id as the key
    pub source_sender: BTreeMap<TableId, broadcast::Sender<DiffRow>>,
    /// broadcast receiver for sink table, there should only be one receiver, and it will receive all the data from the sink table
    ///
    /// and send it back to the client, since we are mocking the sink table as a client, we should use table name as the key
    /// note that the sink receiver should only have one, and we are using broadcast as mpsc channel here
    pub sink_receiver: BTreeMap<
        TableName,
        (
            mpsc::UnboundedSender<DiffRow>,
            mpsc::UnboundedReceiver<DiffRow>,
        ),
    >,
    /// store source in buffer for each source table, in case broadcast channel is full
    pub send_buffer: BTreeMap<TableId, VecDeque<DiffRow>>,
    /// the schema of the table
    pub schema: HashMap<GlobalId, RelationType>,
    /// All the tables that have been registered in the worker
    pub table_repr: TriMap,
}

impl FlowNodeContext {
    // TODO(discord9): add send_buf in case the broadcast channel is full
    // return number of rows it actuall send(including what's in the buffer)
    pub fn send(&mut self, table_id: TableId, rows: Vec<DiffRow>) -> Result<usize, Error> {
        let sender = self
            .source_sender
            .get(&table_id)
            .with_context(|| TableNotFoundSnafu {
                name: table_id.to_string(),
            })?;
        let send_buffer = self.send_buffer.entry(table_id).or_default();
        send_buffer.extend(rows);
        let mut row_cnt = 0;
        while let Some(row) = send_buffer.pop_front() {
            if sender.len() >= BROADCAST_CAP {
                break;
            }
            row_cnt += 1;
            sender
                .send(row)
                .map_err(|err| {
                    InternalSnafu {
                        reason: format!(
                            "Failed to send row to table_id = {:?}, error = {:?}",
                            table_id, err
                        ),
                    }
                    .build()
                })
                .with_context(|_| EvalSnafu)?;
        }

        Ok(row_cnt)
    }
}

impl FlowNodeContext {
    /// mapping source table to task, and sink table to task in worker context
    ///
    /// also add their corrseponding broadcast sender/receiver
    fn register_task_src_sink(
        &mut self,
        task_id: FlowId,
        source_table_ids: &[TableId],
        sink_table_id: TableId,
    ) {
        for source_table_id in source_table_ids {
            self.add_source_sender(*source_table_id);
            self.source_to_tasks
                .entry(*source_table_id)
                .or_default()
                .insert(task_id);
        }

        let sink_table_name = self.table_repr.get_by_table_id(&sink_table_id).unwrap().0;
        self.add_sink_receiver(sink_table_name.clone());
        self.flow_to_sink.insert(task_id, sink_table_name);
    }

    pub fn add_source_sender(&mut self, table_id: TableId) {
        self.source_sender
            .entry(table_id)
            .or_insert_with(|| broadcast::channel(BROADCAST_CAP).0);
    }

    pub fn add_sink_receiver(&mut self, table_name: TableName) {
        self.sink_receiver
            .entry(table_name)
            .or_insert_with(mpsc::unbounded_channel::<DiffRow>);
    }

    pub fn get_source_by_global_id(
        &self,
        id: &GlobalId,
    ) -> Result<&broadcast::Sender<DiffRow>, Error> {
        let table_id = self
            .table_repr
            .get_by_global_id(id)
            .with_context(|| TableNotFoundSnafu {
                name: format!("{:?}", id),
            })?
            .1;
        self.source_sender
            .get(&table_id)
            .with_context(|| TableNotFoundSnafu {
                name: table_id.to_string(),
            })
    }

    pub fn get_sink_by_global_id(
        &self,
        id: &GlobalId,
    ) -> Result<mpsc::UnboundedSender<DiffRow>, Error> {
        let table_name = self
            .table_repr
            .get_by_global_id(id)
            .with_context(|| TableNotFoundSnafu {
                name: format!("{:?}", id),
            })?
            .0;
        self.sink_receiver
            .get(&table_name)
            .map(|(s, _r)| s.clone())
            .with_context(|| TableNotFoundSnafu {
                name: table_name.join("."),
            })
    }
}

impl FlowNodeContext {
    /// Retrieves a GlobalId and table schema representing a table previously registered by calling the [register_table] function.
    ///
    /// Returns an error if no table has been registered with the provided names
    pub fn table(&self, name: &Vec<String>) -> Result<(GlobalId, RelationType), Error> {
        let id = self
            .table_repr
            .get_by_name(name)
            .map(|(_tid, gid)| gid)
            .with_context(|| TableNotFoundSnafu {
                name: name.join("."),
            })?;
        let schema = self
            .schema
            .get(&id)
            .cloned()
            .with_context(|| TableNotFoundSnafu {
                name: name.join("."),
            })?;
        Ok((id, schema))
    }

    /// Assign a global id to a table, if already assigned, return the existing global id
    ///
    /// NOTE: this will not actually render the table into collection refered as GlobalId
    /// merely creating a mapping from table id to global id
    pub async fn assign_global_id_to_table(
        &mut self,
        srv_map: &TableInfoSource,
        table_id: TableId,
    ) -> GlobalId {
        if let Some((_name, gid)) = self.table_repr.get_by_table_id(&table_id) {
            gid
        } else {
            let global_id = self.new_global_id();

            let table_name = srv_map.get_table_name(&table_id).await.unwrap();
            let schema = srv_map.get_table_schema(&table_id).await.unwrap();
            self.schema.insert(global_id, schema);

            self.table_repr.insert(table_name, table_id, global_id);
            global_id
        }
    }

    /// Get a new global id
    pub fn new_global_id(&self) -> GlobalId {
        GlobalId::User(self.table_repr.global_id_to_name_id.len() as u64)
    }
}

/// A tri-directional map that maps table name, table id, and global id
#[derive(Default)]
pub struct TriMap {
    name_to_global_id: HashMap<TableName, GlobalId>,
    id_to_global_id: HashMap<TableId, GlobalId>,
    global_id_to_name_id: BTreeMap<GlobalId, (TableName, TableId)>,
}

impl TriMap {
    pub fn new() -> Self {
        Default::default()
    }

    pub fn insert(&mut self, name: TableName, id: TableId, global_id: GlobalId) {
        self.name_to_global_id.insert(name.clone(), global_id);
        self.id_to_global_id.insert(id, global_id);
        self.global_id_to_name_id.insert(global_id, (name, id));
    }

    pub fn get_by_name(&self, name: &TableName) -> Option<(TableId, GlobalId)> {
        self.name_to_global_id.get(name).and_then(|global_id| {
            self.global_id_to_name_id
                .get(global_id)
                .map(|(_name, id)| (*id, *global_id))
        })
    }

    pub fn get_by_table_id(&self, id: &TableId) -> Option<(TableName, GlobalId)> {
        self.id_to_global_id.get(id).and_then(|global_id| {
            self.global_id_to_name_id
                .get(global_id)
                .map(|(name, _id)| (name.clone(), *global_id))
        })
    }

    pub fn get_by_global_id(&self, global_id: &GlobalId) -> Option<(TableName, TableId)> {
        self.global_id_to_name_id
            .get(global_id)
            .map(|(name, id)| (name.clone(), *id))
    }
}

/// FlowTickManager is a manager for flow tick
#[derive(Clone)]
pub struct FlowTickManager {
    anchor: Anchor,
}

impl std::fmt::Debug for FlowTickManager {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("FlowTickManager").finish()
    }
}

impl FlowTickManager {
    pub fn new() -> Self {
        FlowTickManager {
            anchor: Anchor::new(),
        }
    }

    /// Return the current timestamp in milliseconds
    pub fn tick(&self) -> repr::Timestamp {
        (minstant::Instant::now().as_unix_nanos(&self.anchor) / 1_000_000) as repr::Timestamp
    }
}
