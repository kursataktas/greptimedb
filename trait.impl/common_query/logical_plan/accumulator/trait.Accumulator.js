(function() {
    var implementors = Object.fromEntries([["common_function",[["impl <a class=\"trait\" href=\"common_query/logical_plan/accumulator/trait.Accumulator.html\" title=\"trait common_query::logical_plan::accumulator::Accumulator\">Accumulator</a> for <a class=\"struct\" href=\"common_function/scalars/geo/encoding/struct.JsonPathAccumulator.html\" title=\"struct common_function::scalars::geo::encoding::JsonPathAccumulator\">JsonPathAccumulator</a>"],["impl&lt;I, O&gt; <a class=\"trait\" href=\"common_query/logical_plan/accumulator/trait.Accumulator.html\" title=\"trait common_query::logical_plan::accumulator::Accumulator\">Accumulator</a> for <a class=\"struct\" href=\"common_function/scalars/aggregate/diff/struct.Diff.html\" title=\"struct common_function::scalars::aggregate::diff::Diff\">Diff</a>&lt;I, O&gt;<div class=\"where\">where\n    I: WrapperType,\n    O: WrapperType,\n    I::Native: <a class=\"trait\" href=\"https://docs.rs/num-traits/0.2/num_traits/cast/trait.AsPrimitive.html\" title=\"trait num_traits::cast::AsPrimitive\">AsPrimitive</a>&lt;O::Native&gt;,\n    O::Native: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Sub.html\" title=\"trait core::ops::arith::Sub\">Sub</a>&lt;Output = O::Native&gt;,</div>"],["impl&lt;T&gt; <a class=\"trait\" href=\"common_query/logical_plan/accumulator/trait.Accumulator.html\" title=\"trait common_query::logical_plan::accumulator::Accumulator\">Accumulator</a> for <a class=\"struct\" href=\"common_function/scalars/aggregate/argmax/struct.Argmax.html\" title=\"struct common_function::scalars::aggregate::argmax::Argmax\">Argmax</a>&lt;T&gt;<div class=\"where\">where\n    T: WrapperType + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialOrd.html\" title=\"trait core::cmp::PartialOrd\">PartialOrd</a>,</div>"],["impl&lt;T&gt; <a class=\"trait\" href=\"common_query/logical_plan/accumulator/trait.Accumulator.html\" title=\"trait common_query::logical_plan::accumulator::Accumulator\">Accumulator</a> for <a class=\"struct\" href=\"common_function/scalars/aggregate/argmin/struct.Argmin.html\" title=\"struct common_function::scalars::aggregate::argmin::Argmin\">Argmin</a>&lt;T&gt;<div class=\"where\">where\n    T: WrapperType + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialOrd.html\" title=\"trait core::cmp::PartialOrd\">PartialOrd</a>,</div>"],["impl&lt;T&gt; <a class=\"trait\" href=\"common_query/logical_plan/accumulator/trait.Accumulator.html\" title=\"trait common_query::logical_plan::accumulator::Accumulator\">Accumulator</a> for <a class=\"struct\" href=\"common_function/scalars/aggregate/mean/struct.Mean.html\" title=\"struct common_function::scalars::aggregate::mean::Mean\">Mean</a>&lt;T&gt;<div class=\"where\">where\n    T: WrapperType,\n    T::Native: <a class=\"trait\" href=\"https://docs.rs/num-traits/0.2/num_traits/cast/trait.AsPrimitive.html\" title=\"trait num_traits::cast::AsPrimitive\">AsPrimitive</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f64.html\">f64</a>&gt;,</div>"],["impl&lt;T&gt; <a class=\"trait\" href=\"common_query/logical_plan/accumulator/trait.Accumulator.html\" title=\"trait common_query::logical_plan::accumulator::Accumulator\">Accumulator</a> for <a class=\"struct\" href=\"common_function/scalars/aggregate/scipy_stats_norm_cdf/struct.ScipyStatsNormCdf.html\" title=\"struct common_function::scalars::aggregate::scipy_stats_norm_cdf::ScipyStatsNormCdf\">ScipyStatsNormCdf</a>&lt;T&gt;<div class=\"where\">where\n    T: WrapperType + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/iter/traits/accum/trait.Sum.html\" title=\"trait core::iter::traits::accum::Sum\">Sum</a>&lt;T&gt;,\n    T::Native: <a class=\"trait\" href=\"https://docs.rs/num-traits/0.2/num_traits/cast/trait.AsPrimitive.html\" title=\"trait num_traits::cast::AsPrimitive\">AsPrimitive</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f64.html\">f64</a>&gt;,</div>"],["impl&lt;T&gt; <a class=\"trait\" href=\"common_query/logical_plan/accumulator/trait.Accumulator.html\" title=\"trait common_query::logical_plan::accumulator::Accumulator\">Accumulator</a> for <a class=\"struct\" href=\"common_function/scalars/aggregate/scipy_stats_norm_pdf/struct.ScipyStatsNormPdf.html\" title=\"struct common_function::scalars::aggregate::scipy_stats_norm_pdf::ScipyStatsNormPdf\">ScipyStatsNormPdf</a>&lt;T&gt;<div class=\"where\">where\n    T: WrapperType,\n    T::Native: <a class=\"trait\" href=\"https://docs.rs/num-traits/0.2/num_traits/cast/trait.AsPrimitive.html\" title=\"trait num_traits::cast::AsPrimitive\">AsPrimitive</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.f64.html\">f64</a>&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/iter/traits/accum/trait.Sum.html\" title=\"trait core::iter::traits::accum::Sum\">Sum</a>&lt;T&gt;,</div>"],["impl&lt;T, PolyT&gt; <a class=\"trait\" href=\"common_query/logical_plan/accumulator/trait.Accumulator.html\" title=\"trait common_query::logical_plan::accumulator::Accumulator\">Accumulator</a> for <a class=\"struct\" href=\"common_function/scalars/aggregate/polyval/struct.Polyval.html\" title=\"struct common_function::scalars::aggregate::polyval::Polyval\">Polyval</a>&lt;T, PolyT&gt;<div class=\"where\">where\n    T: WrapperType,\n    T::Native: <a class=\"trait\" href=\"https://docs.rs/num-traits/0.2/num_traits/cast/trait.AsPrimitive.html\" title=\"trait num_traits::cast::AsPrimitive\">AsPrimitive</a>&lt;PolyT::Native&gt;,\n    PolyT: WrapperType + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/iter/traits/accum/trait.Sum.html\" title=\"trait core::iter::traits::accum::Sum\">Sum</a>&lt;&lt;PolyT as WrapperType&gt;::Native&gt;,\n    PolyT::Native: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;Output = PolyT::Native&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/iter/traits/accum/trait.Sum.html\" title=\"trait core::iter::traits::accum::Sum\">Sum</a>&lt;PolyT::Native&gt;,\n    <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.i64.html\">i64</a>: <a class=\"trait\" href=\"https://docs.rs/num-traits/0.2/num_traits/cast/trait.AsPrimitive.html\" title=\"trait num_traits::cast::AsPrimitive\">AsPrimitive</a>&lt;&lt;PolyT as WrapperType&gt;::Native&gt;,</div>"]]]]);
    if (window.register_implementors) {
        window.register_implementors(implementors);
    } else {
        window.pending_implementors = implementors;
    }
})()
//{"start":57,"fragment_lengths":[6490]}