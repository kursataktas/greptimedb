(function() {
    var implementors = Object.fromEntries([["common_recordbatch",[["impl RecordBatchStream for <a class=\"struct\" href=\"common_recordbatch/adapter/struct.DfRecordBatchStreamAdapter.html\" title=\"struct common_recordbatch::adapter::DfRecordBatchStreamAdapter\">DfRecordBatchStreamAdapter</a>"],["impl&lt;T, E&gt; RecordBatchStream for <a class=\"struct\" href=\"common_recordbatch/adapter/struct.RecordBatchStreamTypeAdapter.html\" title=\"struct common_recordbatch::adapter::RecordBatchStreamTypeAdapter\">RecordBatchStreamTypeAdapter</a>&lt;T, E&gt;<div class=\"where\">where\n    T: Stream&lt;Item = <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"struct\" href=\"common_recordbatch/struct.DfRecordBatch.html\" title=\"struct common_recordbatch::DfRecordBatch\">DfRecordBatch</a>, E&gt;&gt;,\n    E: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a> + 'static,</div>"]]],["promql",[["impl RecordBatchStream for <a class=\"struct\" href=\"promql/extension_plan/empty_metric/struct.EmptyMetricStream.html\" title=\"struct promql::extension_plan::empty_metric::EmptyMetricStream\">EmptyMetricStream</a>"],["impl RecordBatchStream for <a class=\"struct\" href=\"promql/extension_plan/histogram_fold/struct.HistogramFoldStream.html\" title=\"struct promql::extension_plan::histogram_fold::HistogramFoldStream\">HistogramFoldStream</a>"],["impl RecordBatchStream for <a class=\"struct\" href=\"promql/extension_plan/instant_manipulate/struct.InstantManipulateStream.html\" title=\"struct promql::extension_plan::instant_manipulate::InstantManipulateStream\">InstantManipulateStream</a>"],["impl RecordBatchStream for <a class=\"struct\" href=\"promql/extension_plan/normalize/struct.SeriesNormalizeStream.html\" title=\"struct promql::extension_plan::normalize::SeriesNormalizeStream\">SeriesNormalizeStream</a>"],["impl RecordBatchStream for <a class=\"struct\" href=\"promql/extension_plan/range_manipulate/struct.RangeManipulateStream.html\" title=\"struct promql::extension_plan::range_manipulate::RangeManipulateStream\">RangeManipulateStream</a>"],["impl RecordBatchStream for <a class=\"struct\" href=\"promql/extension_plan/scalar_calculate/struct.ScalarCalculateStream.html\" title=\"struct promql::extension_plan::scalar_calculate::ScalarCalculateStream\">ScalarCalculateStream</a>"],["impl RecordBatchStream for <a class=\"struct\" href=\"promql/extension_plan/series_divide/struct.SeriesDivideStream.html\" title=\"struct promql::extension_plan::series_divide::SeriesDivideStream\">SeriesDivideStream</a>"],["impl RecordBatchStream for <a class=\"struct\" href=\"promql/extension_plan/union_distinct_on/struct.UnionDistinctOnStream.html\" title=\"struct promql::extension_plan::union_distinct_on::UnionDistinctOnStream\">UnionDistinctOnStream</a>"]]],["query",[["impl RecordBatchStream for <a class=\"struct\" href=\"query/part_sort/struct.PartSortStream.html\" title=\"struct query::part_sort::PartSortStream\">PartSortStream</a>"],["impl RecordBatchStream for <a class=\"struct\" href=\"query/range_select/plan/struct.RangeSelectStream.html\" title=\"struct query::range_select::plan::RangeSelectStream\">RangeSelectStream</a>"],["impl RecordBatchStream for <a class=\"struct\" href=\"query/window_sort/struct.WindowedSortStream.html\" title=\"struct query::window_sort::WindowedSortStream\">WindowedSortStream</a>"]]],["table",[["impl RecordBatchStream for <a class=\"struct\" href=\"table/table/scan/struct.StreamWithMetricWrapper.html\" title=\"struct table::table::scan::StreamWithMetricWrapper\">StreamWithMetricWrapper</a>"]]]]);
    if (window.register_implementors) {
        window.register_implementors(implementors);
    } else {
        window.pending_implementors = implementors;
    }
})()
//{"start":57,"fragment_lengths":[1292,1886,570,214]}