/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */
!function(){if(jQuery&&jQuery.fn&&jQuery.fn.select2&&jQuery.fn.select2.amd)var n=jQuery.fn.select2.amd;return n.define("select2/i18n/lt",[],function(){function n(n,e,i,t){return n%100>9&&21>n%100||n%10===0?n%10>1?i:t:e}return{inputTooLong:function(e){var i=e.input.length-e.maximum,t="Pa\u0161alinkite "+i+" simbol";return t+=n(i,"i\u0173","ius","\u012f")},inputTooShort:function(e){var i=e.minimum-e.input.length,t="\u012era\u0161ykite dar "+i+" simbol";return t+=n(i,"i\u0173","ius","\u012f")},loadingMore:function(){return"Kraunama daugiau rezultat\u0173\u2026"},maximumSelected:function(e){var i="J\u016bs galite pasirinkti tik "+e.maximum+" element";return i+=n(e.maximum,"\u0173","us","\u0105")},noResults:function(){return"Atitikmen\u0173 nerasta"},searching:function(){return"Ie\u0161koma\u2026"}}}),{define:n.define,require:n.require}}();