(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{149:function(e,i,t){},150:function(e){e.exports=JSON.parse('{"componentClass":"c-sliding-pagination","list":"c-sliding-pagination__list","element":"c-sliding-pagination__list-element","elementDisabled":"c-sliding-pagination__list-element--disabled","elementActive":"c-sliding-pagination__list-element--active","page":"c-sliding-pagination__page"}')},151:function(e,i,t){"use strict";t(149)},152:function(e,i,t){"use strict";var a={name:"SlidingPaginationDefaultPage",props:{ariaPageLabel:{type:String,required:!0},isCurrent:{type:Boolean,required:!0},page:{type:Number,required:!0},pageClass:{type:String,required:!0}},computed:{pageClasses(){let e=this.pageClass;return this.isCurrent&&(e+=" c-sliding-pagination__page--current"),e}},methods:{goToPage(e){e.preventDefault(),e.stopPropagation(),this.$emit("page-click",this.page)}},render(e){return e("a",{class:this.pageClasses,attrs:{href:"#","aria-label":this.ariaPageLabel},on:{click:this.goToPage}},this.page)}},n=t(150);function s(e,i){const t=[];if("number"!=typeof e||"number"!=typeof i)return t;if(e>i){const t=e;e=i,i=t}for(let a=e;a<=i;a++)t.push(a);return t}var r={name:"SlidingPagination",props:{ariaPaginationLabel:{type:String,required:!1,default:"Pagination Navigation"},ariaGotoPageLabel:{type:String,required:!1,default:"Go to page %page% of %total%"},ariaPreviousPageLabel:{type:String,required:!1,default:"Go to previous page"},ariaNextPageLabel:{type:String,required:!1,default:"Go to next page"},ariaCurrentPageLabel:{type:String,required:!1,default:"Page %page% of %total%, current page"},classMap:{type:Object,required:!1,default:()=>n},current:{required:!0,type:Number},total:{required:!0,type:Number},slidingEndingSize:{required:!1,type:Number,default:2},slidingWindowSize:{required:!1,type:Number,default:3},nonSlidingSize:{required:!1,type:Number,default:9},pageComponent:{required:!1,type:Object,default:()=>a}},components:{SlidingPaginationDefaultPage:a},computed:{isSliding(){return this.total>this.nonSlidingSize},hasBeginningGap(){return!!this.isSliding&&this.lastBeginningPage+1!==this.firstWindowPage},hasEndingGap(){return!!this.isSliding&&this.lastWindowPage+1!==this.firstEndingPage},beginningPages(){return s(1,this.isSliding?this.slidingEndingSize:this.total)},lastBeginningPage(){return this.beginningPages[this.beginningPages.length-1]},endingPages(){return this.isSliding?s(this.total-this.slidingEndingSize+1,this.total):[]},firstEndingPage(){return this.endingPages[0]},slidingWindowHalf(){let e=this.slidingWindowSize/2;return this.slidingWindowSize%2==1&&(e-=.5),e},slidingWindowPages(){if(!this.isSliding)return[];const e=this.lastBeginningPage+this.slidingWindowHalf,i=this.firstEndingPage-this.slidingWindowHalf;if(this.current<=e)return s(this.lastBeginningPage+1,this.lastBeginningPage+this.slidingWindowSize);if(this.current>e&&this.current<i){let e=this.slidingWindowHalf;return this.slidingWindowSize%2==0&&(e/=2),s(-this.slidingWindowHalf+this.current,e+this.current)}return s(this.firstEndingPage-this.slidingWindowSize,this.firstEndingPage-1)},firstWindowPage(){return this.slidingWindowPages[0]},lastWindowPage(){return this.slidingWindowPages[this.slidingWindowPages.length-1]},showPreviousPageAction(){return this.total>this.nonSlidingSize},showNextPageAction(){return this.total>this.nonSlidingSize}},methods:{replaceLabelVars(e,i){return e.replace("%total%",this.total).replace("%page%",i)},isCurrentPage(e){return this.current===e},currentPageLabel(e){return this.replaceLabelVars(this.ariaCurrentPageLabel,e)},goToPage(e){this.$emit("page-change",e)},goToPageLabel(e){return this.replaceLabelVars(this.ariaGotoPageLabel,e)},pageLabel(e){return this.isCurrentPage(e)?this.currentPageLabel(e):this.goToPageLabel(e)},slotOrDefault(e,i){return this.$slots[e]?this.$slots[e]:i},navigationElement(e,i,t,a,n){return e("li",{class:[this.classMap.element,this.current===i?this.classMap.elementDisabled:""],key:i},[e("a",{class:this.classMap.page,attrs:{href:"#","aria-label":a,disabled:1===this.current},on:{click:e=>{e.preventDefault(),e.stopPropagation(),this.goToPage(this.current+t)}}},n)])},pageListPage(e,i){return e("li",{class:[this.classMap.element,this.isCurrentPage(i)?this.classMap.elementActive:""]},[e(this.pageComponent,{props:{isCurrent:this.isCurrentPage(i),ariaPageLabel:this.pageLabel(i),page:i,pageClass:this.classMap.page},on:{"page-click":this.goToPage}})])},gap(e,i){return e("li",{class:[this.classMap.element,this.classMap.elementDisabled],attrs:{"aria-hidden":!0}},[e("a",{class:this.classMap.page,attrs:{href:"#",disabled:!0}},i)])}},render(e){let i=[];return this.showPreviousPageAction&&i.push(this.navigationElement(e,1,-1,this.ariaPreviousPageLabel,this.slotOrDefault("previous-page","&laquo;"))),i=i.concat(this.beginningPages.map(i=>this.pageListPage(e,i))),this.hasBeginningGap&&i.push(this.gap(e,this.slotOrDefault("gap-left","&hellip;"))),i=i.concat(this.slidingWindowPages.map(i=>this.pageListPage(e,i))),this.hasEndingGap&&i.push(this.gap(e,this.slotOrDefault("gap-right","&hellip;"))),i=i.concat(this.endingPages.map(i=>this.pageListPage(e,i))),this.showNextPageAction&&i.push(this.navigationElement(e,this.total,1,this.ariaNextPageLabel,this.slotOrDefault("next-page","&raquo;"))),e("nav",{class:this.classMap.component,attrs:{"aria-label":this.ariaPaginationLabel}},[e("ul",{class:this.classMap.list},i)])}},g=(t(151),t(6)),l=Object(g.a)(r,void 0,void 0,!1,null,null,null);i.a=l.exports},193:function(e,i,t){"use strict";t.r(i);var a={name:"SimpleExample",components:{SlidingPagination:t(152).a},data:()=>({current:1,total:10}),methods:{onPageChange(e){this.current=e}}},n=t(6),s=Object(n.a)(a,(function(){var e=this.$createElement;return(this._self._c||e)("sliding-pagination",{attrs:{current:this.current,total:this.total},on:{"page-change":this.onPageChange}})}),[],!1,null,null,null);i.default=s.exports}}]);