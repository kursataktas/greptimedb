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

use serde::{Deserialize, Serialize};

pub mod config;
pub mod options;
pub mod test_util;

pub const BROKER_ENDPOINT: &str = "127.0.0.1:9092";
pub const TOPIC_NAME_PREFIX: &str = "greptimedb_wal_topic";

/// The type of the topic selector, i.e. with which strategy to select a topic.
// The enum is defined here to work around cyclic dependency issues.
#[derive(Default, Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum TopicSelectorType {
    #[default]
    RoundRobin,
}
