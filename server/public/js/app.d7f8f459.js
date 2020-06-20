(function(t){function e(e){for(var r,i,o=e[0],l=e[1],c=e[2],b=0,h=[];b<o.length;b++)i=o[b],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&h.push(s[i][0]),s[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);u&&u(e);while(h.length)h.shift()();return n.push.apply(n,c||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],r=!0,o=1;o<a.length;o++){var l=a[o];0!==s[l]&&(r=!1)}r&&(n.splice(e--,1),t=i(i.s=a[0]))}return t}var r={},s={app:0},n=[];function i(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=r,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(a,r,function(e){return t[e]}.bind(null,r));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var r=a("85ec"),s=a.n(r);s.a},"56d7":function(t,e,a){"use strict";a.r(e);var r=a("2b0e"),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("nav",{staticClass:"navbar navbar-expand-md navbar-dark bg-dark fixed-top"},[a("a",{staticClass:"navbar-brand",attrs:{href:"#"}},[t._v("Dashboard")]),a("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarsExampleDefault"}},[a("ul",{staticClass:"navbar-nav mr-auto"},[a("li",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.searchQuery,expression:"searchQuery"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Search","aria-label":"Search"},domProps:{value:t.searchQuery},on:{keydown:t.search,input:function(e){e.target.composing||(t.searchQuery=e.target.value)}}})]),a("button",{staticClass:"btn btn-dark h-50",attrs:{type:"button"}},[a("a",{attrs:{href:t.websiteHref,download:t.websiteDownload}},[t._v("Save to websites CSV")])]),a("button",{staticClass:"btn btn-dark h-50",attrs:{type:"button"}},[a("a",{attrs:{href:t.alternativeHref,download:t.alternativeDownload}},[t._v("Save to alternatives CSV")])]),a("button",{staticClass:"btn btn-dark h-50",attrs:{type:"button"}},[t._v("Build graphs")])])])]),a("main",{staticClass:"container-fluid",attrs:{role:"main"}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[t.websiteData?a("div",{staticClass:"table-responsive max-table"},[a("table",{staticClass:"table table-striped table-dark"},[a("thead",[a("tr",t._l(t.websiteColumns,(function(e){return a("th",{key:e},[t._v(t._s(e))])})),0)]),a("tbody",t._l(t.websiteData,(function(e){return a("tr",{key:e},t._l(t.websiteColumns,(function(r){return a("td",{key:r},[t._v(t._s(e[r]))])})),0)})),0)])]):t._e()])])])])},n=[],i=a("bc3a"),o=a.n(i),l=a("f59f"),c=a.n(l),u={data(){return{searchQuery:null,websiteDownload:null,websiteHref:null,websiteColumns:[],websiteData:[],alternativeDownload:null,alternativeHref:null,alternativeColumns:[],alternativeData:[]}},methods:{prepareAlternativesCsv(t){if(t)try{const e=c.a.Parser,a=new e({fields:Object.keys(t[0])}),r=a.parse(t),s=new Blob([r],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(s);this.alternativeDownload=`alternatives-${(new Date).toString().slice(0,24).replace(/\s|:/g,"-")}.csv`,this.alternativeHref=n}catch(e){console.error("Error while parsing csv:",e)}},prepareWebsiteCsv(t){if(t)try{const e=c.a.Parser,a=new e({fields:Object.keys(t[0])}),r=a.parse(t),s=new Blob([r],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(s);this.websiteDownload=`websites-${(new Date).toString().slice(0,24).replace(/\s|:/g,"-")}.csv`,this.websiteHref=n}catch(e){console.error("Error while parsing csv:",e)}},search(t){13===t.keyCode&&o.a.get("http://localhost:3000/alternative?searchQuery="+this.searchQuery).then(({data:t})=>{this.websiteData.find(e=>e.title===t.title)||(this.websiteColumns=Object.keys(t),this.websiteData.push(t)),this.prepareWebsiteCsv(this.websiteData)}).catch(t=>{console.log(t),window.alert(`Page for ${this.searchQuery} doesn't exist!`)})}},mounted(){o.a.get("http://localhost:3000/websites").then(({data:t})=>{this.websiteColumns=Object.keys(t[0]),this.websiteData=t,this.prepareWebsiteCsv(this.websiteData)}).catch(t=>{console.error("Error while running search:",t)}),o.a.get("http://localhost:3000/alternatives").then(({data:t})=>{t&&t.length>0&&(this.alternativeColumns=Object.keys(t[0]),this.alternativeData=t,this.prepareAlternativesCsv(this.alternativeData))}).catch(t=>{console.error("Error while running search:",t)})}},b=u,h=(a("034f"),a("2877")),p=Object(h["a"])(b,s,n,!1,null,null,null),d=p.exports;a("1157"),a("4989"),a("ab8b");r["a"].config.productionTip=!1,new r["a"]({render:function(t){return t(d)}}).$mount("#app")},"85ec":function(t,e,a){}});
//# sourceMappingURL=app.d7f8f459.js.map