(function() {
    var type_impls = Object.fromEntries([["catalog",[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-CacheContainer%3CK,+V,+CacheToken%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/common_meta/cache/container.rs.html#132-135\">source</a><a href=\"#impl-CacheContainer%3CK,+V,+CacheToken%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;K, V, CacheToken&gt; <a class=\"struct\" href=\"common_meta/cache/container/struct.CacheContainer.html\" title=\"struct common_meta::cache::container::CacheContainer\">CacheContainer</a>&lt;K, V, CacheToken&gt;<div class=\"where\">where\n    K: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/hash/trait.Hash.html\" title=\"trait core::hash::Hash\">Hash</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a> + 'static,\n    V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a> + 'static,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.invalidate\" class=\"method\"><a class=\"src rightside\" href=\"src/common_meta/cache/container.rs.html#138\">source</a><h4 class=\"code-header\">pub async fn <a href=\"common_meta/cache/container/struct.CacheContainer.html#tymethod.invalidate\" class=\"fn\">invalidate</a>(&amp;self, caches: &amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.slice.html\">[CacheToken]</a>) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.unit.html\">()</a>, <a class=\"enum\" href=\"common_meta/error/enum.Error.html\" title=\"enum common_meta::error::Error\">Error</a>&gt;</h4></section></summary><div class=\"docblock\"><p>Invalidates cache by [CacheToken].</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.contains_key\" class=\"method\"><a class=\"src rightside\" href=\"src/common_meta/cache/container.rs.html#151-154\">source</a><h4 class=\"code-header\">pub fn <a href=\"common_meta/cache/container/struct.CacheContainer.html#tymethod.contains_key\" class=\"fn\">contains_key</a>&lt;Q&gt;(&amp;self, key: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;Q</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a><div class=\"where\">where\n    K: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/borrow/trait.Borrow.html\" title=\"trait core::borrow::Borrow\">Borrow</a>&lt;Q&gt;,\n    Q: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/hash/trait.Hash.html\" title=\"trait core::hash::Hash\">Hash</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a> + ?<a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>,</div></h4></section></summary><div class=\"docblock\"><p>Returns true if the cache contains a value for the key.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.get_by_ref\" class=\"method\"><a class=\"src rightside\" href=\"src/common_meta/cache/container.rs.html#160-163\">source</a><h4 class=\"code-header\">pub async fn <a href=\"common_meta/cache/container/struct.CacheContainer.html#tymethod.get_by_ref\" class=\"fn\">get_by_ref</a>&lt;Q&gt;(&amp;self, key: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;Q</a>) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;V&gt;, <a class=\"enum\" href=\"common_meta/error/enum.Error.html\" title=\"enum common_meta::error::Error\">Error</a>&gt;<div class=\"where\">where\n    K: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/borrow/trait.Borrow.html\" title=\"trait core::borrow::Borrow\">Borrow</a>&lt;Q&gt;,\n    Q: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/alloc/borrow/trait.ToOwned.html\" title=\"trait alloc::borrow::ToOwned\">ToOwned</a>&lt;Owned = K&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/hash/trait.Hash.html\" title=\"trait core::hash::Hash\">Hash</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a> + ?<a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>,</div></h4></section></summary><div class=\"docblock\"><p>Returns a <em>clone</em> of the value corresponding to the key.</p>\n</div></details></div></details>",0,"catalog::kvbackend::table_cache::TableCache"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-CacheContainer%3CK,+V,+CacheToken%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/common_meta/cache/container.rs.html#49-53\">source</a><a href=\"#impl-CacheContainer%3CK,+V,+CacheToken%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;K, V, CacheToken&gt; <a class=\"struct\" href=\"common_meta/cache/container/struct.CacheContainer.html\" title=\"struct common_meta::cache::container::CacheContainer\">CacheContainer</a>&lt;K, V, CacheToken&gt;<div class=\"where\">where\n    K: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a>,\n    V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a>,\n    CacheToken: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.new\" class=\"method\"><a class=\"src rightside\" href=\"src/common_meta/cache/container.rs.html#56-62\">source</a><h4 class=\"code-header\">pub fn <a href=\"common_meta/cache/container/struct.CacheContainer.html#tymethod.new\" class=\"fn\">new</a>(\n    name: <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>,\n    cache: Cache&lt;K, V&gt;,\n    invalidator: <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn for&lt;'a&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.Fn.html\" title=\"trait core::ops::function::Fn\">Fn</a>(&amp;'a Cache&lt;K, V&gt;, <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;'a CacheToken</a>) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.unit.html\">()</a>, <a class=\"enum\" href=\"common_meta/error/enum.Error.html\" title=\"enum common_meta::error::Error\">Error</a>&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'a&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a>&gt;,\n    initializer: <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/sync/struct.Arc.html\" title=\"struct alloc::sync::Arc\">Arc</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.Fn.html\" title=\"trait core::ops::function::Fn\">Fn</a>(<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;K</a>) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;V&gt;, <a class=\"enum\" href=\"common_meta/error/enum.Error.html\" title=\"enum common_meta::error::Error\">Error</a>&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + '_&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a>&gt;,\n    token_filter: <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.Fn.html\" title=\"trait core::ops::function::Fn\">Fn</a>(<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;CacheToken</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a>&gt;,\n) -&gt; <a class=\"struct\" href=\"common_meta/cache/container/struct.CacheContainer.html\" title=\"struct common_meta::cache::container::CacheContainer\">CacheContainer</a>&lt;K, V, CacheToken&gt;</h4></section></summary><div class=\"docblock\"><p>Constructs an <a href=\"common_meta/cache/container/struct.CacheContainer.html\" title=\"struct common_meta::cache::container::CacheContainer\">CacheContainer</a>.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.name\" class=\"method\"><a class=\"src rightside\" href=\"src/common_meta/cache/container.rs.html#73\">source</a><h4 class=\"code-header\">pub fn <a href=\"common_meta/cache/container/struct.CacheContainer.html#tymethod.name\" class=\"fn\">name</a>(&amp;self) -&gt; &amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.str.html\">str</a></h4></section></summary><div class=\"docblock\"><p>Returns the <code>name</code>.</p>\n</div></details></div></details>",0,"catalog::kvbackend::table_cache::TableCache"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-CacheContainer%3CK,+V,+CacheToken%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/common_meta/cache/container.rs.html#97-100\">source</a><a href=\"#impl-CacheContainer%3CK,+V,+CacheToken%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;K, V, CacheToken&gt; <a class=\"struct\" href=\"common_meta/cache/container/struct.CacheContainer.html\" title=\"struct common_meta::cache::container::CacheContainer\">CacheContainer</a>&lt;K, V, CacheToken&gt;<div class=\"where\">where\n    K: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Copy.html\" title=\"trait core::marker::Copy\">Copy</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/hash/trait.Hash.html\" title=\"trait core::hash::Hash\">Hash</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a> + 'static,\n    V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a> + 'static,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.get\" class=\"method\"><a class=\"src rightside\" href=\"src/common_meta/cache/container.rs.html#103\">source</a><h4 class=\"code-header\">pub async fn <a href=\"common_meta/cache/container/struct.CacheContainer.html#tymethod.get\" class=\"fn\">get</a>(&amp;self, key: K) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;V&gt;, <a class=\"enum\" href=\"common_meta/error/enum.Error.html\" title=\"enum common_meta::error::Error\">Error</a>&gt;</h4></section></summary><div class=\"docblock\"><p>Returns a <em>clone</em> of the value corresponding to the key.</p>\n</div></details></div></details>",0,"catalog::kvbackend::table_cache::TableCache"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-CacheInvalidator-for-CacheContainer%3CK,+V,+CacheIdent%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/common_meta/cache/container.rs.html#79-82\">source</a><a href=\"#impl-CacheInvalidator-for-CacheContainer%3CK,+V,+CacheIdent%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;K, V&gt; <a class=\"trait\" href=\"common_meta/cache_invalidator/trait.CacheInvalidator.html\" title=\"trait common_meta::cache_invalidator::CacheInvalidator\">CacheInvalidator</a> for <a class=\"struct\" href=\"common_meta/cache/container/struct.CacheContainer.html\" title=\"struct common_meta::cache::container::CacheContainer\">CacheContainer</a>&lt;K, V, <a class=\"enum\" href=\"common_meta/instruction/enum.CacheIdent.html\" title=\"enum common_meta::instruction::CacheIdent\">CacheIdent</a>&gt;<div class=\"where\">where\n    K: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a>,\n    V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a>,</div></h3></section></summary><div class=\"impl-items\"><section id=\"method.invalidate\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/common_meta/cache/container.rs.html#78\">source</a><a href=\"#method.invalidate\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"common_meta/cache_invalidator/trait.CacheInvalidator.html#tymethod.invalidate\" class=\"fn\">invalidate</a>&lt;'life0, 'life1, 'life2, 'async_trait&gt;(\n    &amp;'life0 self,\n    _ctx: &amp;'life1 <a class=\"struct\" href=\"common_meta/cache_invalidator/struct.Context.html\" title=\"struct common_meta::cache_invalidator::Context\">Context</a>,\n    caches: &amp;'life2 [<a class=\"enum\" href=\"common_meta/instruction/enum.CacheIdent.html\" title=\"enum common_meta::instruction::CacheIdent\">CacheIdent</a>],\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.unit.html\">()</a>, <a class=\"enum\" href=\"common_meta/error/enum.Error.html\" title=\"enum common_meta::error::Error\">Error</a>&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    'life1: 'async_trait,\n    'life2: 'async_trait,\n    <a class=\"struct\" href=\"common_meta/cache/container/struct.CacheContainer.html\" title=\"struct common_meta::cache::container::CacheContainer\">CacheContainer</a>&lt;K, V, <a class=\"enum\" href=\"common_meta/instruction/enum.CacheIdent.html\" title=\"enum common_meta::instruction::CacheIdent\">CacheIdent</a>&gt;: 'async_trait,</div></h4></section></div></details>","CacheInvalidator","catalog::kvbackend::table_cache::TableCache"]]],["common_meta",[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-CacheContainer%3CK,+V,+CacheToken%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/common_meta/cache/container.rs.html#132-193\">source</a><a href=\"#impl-CacheContainer%3CK,+V,+CacheToken%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;K, V, CacheToken&gt; <a class=\"struct\" href=\"common_meta/cache/container/struct.CacheContainer.html\" title=\"struct common_meta::cache::container::CacheContainer\">CacheContainer</a>&lt;K, V, CacheToken&gt;<div class=\"where\">where\n    K: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/hash/trait.Hash.html\" title=\"trait core::hash::Hash\">Hash</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a> + 'static,\n    V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a> + 'static,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.invalidate\" class=\"method\"><a class=\"src rightside\" href=\"src/common_meta/cache/container.rs.html#138-148\">source</a><h4 class=\"code-header\">pub async fn <a href=\"common_meta/cache/container/struct.CacheContainer.html#tymethod.invalidate\" class=\"fn\">invalidate</a>(&amp;self, caches: &amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.slice.html\">[CacheToken]</a>) -&gt; <a class=\"type\" href=\"common_meta/error/type.Result.html\" title=\"type common_meta::error::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.unit.html\">()</a>&gt;</h4></section></summary><div class=\"docblock\"><p>Invalidates cache by [CacheToken].</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.contains_key\" class=\"method\"><a class=\"src rightside\" href=\"src/common_meta/cache/container.rs.html#151-157\">source</a><h4 class=\"code-header\">pub fn <a href=\"common_meta/cache/container/struct.CacheContainer.html#tymethod.contains_key\" class=\"fn\">contains_key</a>&lt;Q&gt;(&amp;self, key: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;Q</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a><div class=\"where\">where\n    K: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/borrow/trait.Borrow.html\" title=\"trait core::borrow::Borrow\">Borrow</a>&lt;Q&gt;,\n    Q: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/hash/trait.Hash.html\" title=\"trait core::hash::Hash\">Hash</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a> + ?<a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>,</div></h4></section></summary><div class=\"docblock\"><p>Returns true if the cache contains a value for the key.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.get_by_ref\" class=\"method\"><a class=\"src rightside\" href=\"src/common_meta/cache/container.rs.html#160-192\">source</a><h4 class=\"code-header\">pub async fn <a href=\"common_meta/cache/container/struct.CacheContainer.html#tymethod.get_by_ref\" class=\"fn\">get_by_ref</a>&lt;Q&gt;(&amp;self, key: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;Q</a>) -&gt; <a class=\"type\" href=\"common_meta/error/type.Result.html\" title=\"type common_meta::error::Result\">Result</a>&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;V&gt;&gt;<div class=\"where\">where\n    K: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/borrow/trait.Borrow.html\" title=\"trait core::borrow::Borrow\">Borrow</a>&lt;Q&gt;,\n    Q: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/alloc/borrow/trait.ToOwned.html\" title=\"trait alloc::borrow::ToOwned\">ToOwned</a>&lt;Owned = K&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/hash/trait.Hash.html\" title=\"trait core::hash::Hash\">Hash</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a> + ?<a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>,</div></h4></section></summary><div class=\"docblock\"><p>Returns a <em>clone</em> of the value corresponding to the key.</p>\n</div></details></div></details>",0,"common_meta::cache::flow::table_flownode::TableFlownodeSetCache","common_meta::cache::table::table_info::TableInfoCache","common_meta::cache::table::table_name::TableNameCache","common_meta::cache::table::table_route::TableRouteCache","common_meta::cache::table::view_info::ViewInfoCache"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-CacheContainer%3CK,+V,+CacheToken%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/common_meta/cache/container.rs.html#49-76\">source</a><a href=\"#impl-CacheContainer%3CK,+V,+CacheToken%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;K, V, CacheToken&gt; <a class=\"struct\" href=\"common_meta/cache/container/struct.CacheContainer.html\" title=\"struct common_meta::cache::container::CacheContainer\">CacheContainer</a>&lt;K, V, CacheToken&gt;<div class=\"where\">where\n    K: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a>,\n    V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a>,\n    CacheToken: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.new\" class=\"method\"><a class=\"src rightside\" href=\"src/common_meta/cache/container.rs.html#56-70\">source</a><h4 class=\"code-header\">pub fn <a href=\"common_meta/cache/container/struct.CacheContainer.html#tymethod.new\" class=\"fn\">new</a>(\n    name: <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>,\n    cache: Cache&lt;K, V&gt;,\n    invalidator: <a class=\"type\" href=\"common_meta/cache/container/type.Invalidator.html\" title=\"type common_meta::cache::container::Invalidator\">Invalidator</a>&lt;K, V, CacheToken&gt;,\n    initializer: <a class=\"type\" href=\"common_meta/cache/container/type.Initializer.html\" title=\"type common_meta::cache::container::Initializer\">Initializer</a>&lt;K, V&gt;,\n    token_filter: <a class=\"type\" href=\"common_meta/cache/container/type.TokenFilter.html\" title=\"type common_meta::cache::container::TokenFilter\">TokenFilter</a>&lt;CacheToken&gt;,\n) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Constructs an <a href=\"common_meta/cache/container/struct.CacheContainer.html\" title=\"struct common_meta::cache::container::CacheContainer\">CacheContainer</a>.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.name\" class=\"method\"><a class=\"src rightside\" href=\"src/common_meta/cache/container.rs.html#73-75\">source</a><h4 class=\"code-header\">pub fn <a href=\"common_meta/cache/container/struct.CacheContainer.html#tymethod.name\" class=\"fn\">name</a>(&amp;self) -&gt; &amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.str.html\">str</a></h4></section></summary><div class=\"docblock\"><p>Returns the <code>name</code>.</p>\n</div></details></div></details>",0,"common_meta::cache::flow::table_flownode::TableFlownodeSetCache","common_meta::cache::table::table_info::TableInfoCache","common_meta::cache::table::table_name::TableNameCache","common_meta::cache::table::table_route::TableRouteCache","common_meta::cache::table::view_info::ViewInfoCache"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-CacheContainer%3CK,+V,+CacheToken%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/common_meta/cache/container.rs.html#97-130\">source</a><a href=\"#impl-CacheContainer%3CK,+V,+CacheToken%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;K, V, CacheToken&gt; <a class=\"struct\" href=\"common_meta/cache/container/struct.CacheContainer.html\" title=\"struct common_meta::cache::container::CacheContainer\">CacheContainer</a>&lt;K, V, CacheToken&gt;<div class=\"where\">where\n    K: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Copy.html\" title=\"trait core::marker::Copy\">Copy</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/hash/trait.Hash.html\" title=\"trait core::hash::Hash\">Hash</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a> + 'static,\n    V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a> + 'static,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.get\" class=\"method\"><a class=\"src rightside\" href=\"src/common_meta/cache/container.rs.html#103-129\">source</a><h4 class=\"code-header\">pub async fn <a href=\"common_meta/cache/container/struct.CacheContainer.html#tymethod.get\" class=\"fn\">get</a>(&amp;self, key: K) -&gt; <a class=\"type\" href=\"common_meta/error/type.Result.html\" title=\"type common_meta::error::Result\">Result</a>&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;V&gt;&gt;</h4></section></summary><div class=\"docblock\"><p>Returns a <em>clone</em> of the value corresponding to the key.</p>\n</div></details></div></details>",0,"common_meta::cache::flow::table_flownode::TableFlownodeSetCache","common_meta::cache::table::table_info::TableInfoCache","common_meta::cache::table::table_name::TableNameCache","common_meta::cache::table::table_route::TableRouteCache","common_meta::cache::table::view_info::ViewInfoCache"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-CacheInvalidator-for-CacheContainer%3CK,+V,+CacheIdent%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/common_meta/cache/container.rs.html#79-95\">source</a><a href=\"#impl-CacheInvalidator-for-CacheContainer%3CK,+V,+CacheIdent%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;K, V&gt; <a class=\"trait\" href=\"common_meta/cache_invalidator/trait.CacheInvalidator.html\" title=\"trait common_meta::cache_invalidator::CacheInvalidator\">CacheInvalidator</a> for <a class=\"struct\" href=\"common_meta/cache/container/struct.CacheContainer.html\" title=\"struct common_meta::cache::container::CacheContainer\">CacheContainer</a>&lt;K, V, <a class=\"enum\" href=\"common_meta/instruction/enum.CacheIdent.html\" title=\"enum common_meta::instruction::CacheIdent\">CacheIdent</a>&gt;<div class=\"where\">where\n    K: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a>,\n    V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a>,</div></h3></section></summary><div class=\"impl-items\"><section id=\"method.invalidate\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/common_meta/cache/container.rs.html#84-94\">source</a><a href=\"#method.invalidate\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"common_meta/cache_invalidator/trait.CacheInvalidator.html#tymethod.invalidate\" class=\"fn\">invalidate</a>&lt;'life0, 'life1, 'life2, 'async_trait&gt;(\n    &amp;'life0 self,\n    _ctx: &amp;'life1 <a class=\"struct\" href=\"common_meta/cache_invalidator/struct.Context.html\" title=\"struct common_meta::cache_invalidator::Context\">Context</a>,\n    caches: &amp;'life2 [<a class=\"enum\" href=\"common_meta/instruction/enum.CacheIdent.html\" title=\"enum common_meta::instruction::CacheIdent\">CacheIdent</a>],\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"type\" href=\"common_meta/error/type.Result.html\" title=\"type common_meta::error::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.unit.html\">()</a>&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    Self: 'async_trait,\n    'life0: 'async_trait,\n    'life1: 'async_trait,\n    'life2: 'async_trait,</div></h4></section></div></details>","CacheInvalidator","common_meta::cache::flow::table_flownode::TableFlownodeSetCache","common_meta::cache::table::table_info::TableInfoCache","common_meta::cache::table::table_name::TableNameCache","common_meta::cache::table::table_route::TableRouteCache","common_meta::cache::table::view_info::ViewInfoCache"]]]]);
    if (window.register_type_impls) {
        window.register_type_impls(type_impls);
    } else {
        window.pending_type_impls = type_impls;
    }
})()
//{"start":55,"fragment_lengths":[19438,15789]}