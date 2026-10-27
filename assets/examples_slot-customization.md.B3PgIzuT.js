import{_ as l}from"./chunks/SlidingPagination.svOnYcaC.js";import{_ as x,o as d,c as v,j as s,E as n,w as a,p as r,a as f}from"./chunks/framework.CteHI--S.js";const c={class:"slots-container"},b={class:"example-section"},S={class:"example-section"},z={class:"example-section"},k={class:"example-section"},w={__name:"SlotsExample",setup(C){const i=r(1),e=r(1),u=r(1),g=r(1),P={name:"EmojiPage",props:{ariaPageLabel:String,isCurrent:Boolean,page:Number,pageClass:String},setup(p,{emit:t}){return{props:p,goToPage:m=>{m.preventDefault(),m.stopPropagation(),t("page-click",p.page)}}},template:`
    <a 
      v-if="!props.isCurrent" 
      :class="props.pageClass" 
      href="#" 
      :aria-label="props.ariaPageLabel" 
      @click="goToPage"
    >
      {{ page }}✨
    </a>
    <span 
      v-else 
      :class="[props.pageClass, 'current-page']" 
      :aria-label="props.ariaPageLabel"
    >
      {{ page }}🎯
    </span>
  `};return(p,t)=>(d(),v("div",c,[s("div",b,[t[6]||(t[6]=s("h3",null,"Custom Previous/Next Icons (SVG)",-1)),n(l,{current:i.value,total:10,onPageChange:t[0]||(t[0]=o=>i.value=o)},{previousPage:a(()=>[...t[4]||(t[4]=[s("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[s("path",{d:"M19 12H5M12 19l-7-7 7-7"})],-1)])]),nextPage:a(()=>[...t[5]||(t[5]=[s("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[s("path",{d:"M5 12h14M12 5l7 7-7 7"})],-1)])]),_:1},8,["current"])]),s("div",S,[t[9]||(t[9]=s("h3",null,"Custom Gap Indicators",-1)),n(l,{current:e.value,total:20,onPageChange:t[1]||(t[1]=o=>e.value=o)},{gapLeft:a(()=>[...t[7]||(t[7]=[s("span",{class:"custom-gap"},"...",-1)])]),gapRight:a(()=>[...t[8]||(t[8]=[s("span",{class:"custom-gap"},"...",-1)])]),_:1},8,["current"])]),s("div",z,[t[14]||(t[14]=s("h3",null,"All Slots Customized",-1)),n(l,{current:u.value,total:30,onPageChange:t[2]||(t[2]=o=>u.value=o)},{previousPage:a(()=>[...t[10]||(t[10]=[s("span",{class:"nav-icon"},"←",-1)])]),nextPage:a(()=>[...t[11]||(t[11]=[s("span",{class:"nav-icon"},"→",-1)])]),gapLeft:a(()=>[...t[12]||(t[12]=[s("span",{class:"gap-indicator"},"←←←",-1)])]),gapRight:a(()=>[...t[13]||(t[13]=[s("span",{class:"gap-indicator"},"→→→",-1)])]),_:1},8,["current"])]),s("div",k,[t[15]||(t[15]=s("h3",null,"Custom Page Component with Emoji",-1)),n(l,{pageComponent:P,current:g.value,total:10,onPageChange:t[3]||(t[3]=o=>g.value=o)},null,8,["current"])])]))}},E=x(w,[["__scopeId","data-v-ebb281bb"]]),L=JSON.parse('{"title":"Slot Customization","description":"","frontmatter":{},"headers":[],"relativePath":"examples/slot-customization.md","filePath":"examples/slot-customization.md"}'),j={name:"examples/slot-customization.md"},T=Object.assign(j,{setup(C){return(i,e)=>(d(),v("div",null,[e[0]||(e[0]=s("h1",{id:"slot-customization",tabindex:"-1"},[f("Slot Customization "),s("a",{class:"header-anchor",href:"#slot-customization","aria-label":'Permalink to "Slot Customization"'},"​")],-1)),e[1]||(e[1]=s("p",null,"Test slot customization for navigation icons and gap indicators.",-1)),n(E)]))}});export{L as __pageData,T as default};
