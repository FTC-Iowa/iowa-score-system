(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d125a882"],{"10de":function(e,t,a){"use strict";var s=a("3457"),r=a.n(s);r.a},3457:function(e,t,a){},bdc6:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-card",[e.isGenerated?e._e():a("v-card-text",[a("v-layout",{attrs:{row:"",wrap:"","justify-center":""}},[a("v-flex",{attrs:{xs8:""}},[a("v-text-field",{attrs:{label:"Matches Per Team",readonly:!0},model:{value:e.matchesPerTeam,callback:function(t){e.matchesPerTeam=t},expression:"matchesPerTeam"}})],1),a("v-flex",{staticClass:"text-xs-center",attrs:{xs8:""}},[a("v-btn",{attrs:{color:"success",large:"",loading:e.loading,disabled:e.loading},on:{click:e.generate}},[e._v("\n          Generate\n        ")])],1)],1)],1),e.isGenerated?a("v-card-text",[a("v-data-table",{attrs:{headers:e.headers,items:e.matches,"hide-actions":""},scopedSlots:e._u([{key:"items",fn:function(t){return[a("td",[e._v(e._s(t.item.number))]),a("td",[e._v(e._s(t.item.red.teams[0].number)+e._s(t.item.red.teams[0].surrogate?"*":""))]),a("td",[e._v(e._s(t.item.red.teams[1].number)+e._s(t.item.red.teams[1].surrogate?"*":""))]),a("td",[e._v(e._s(t.item.blue.teams[0].number)+e._s(t.item.blue.teams[0].surrogate?"*":""))]),a("td",[e._v(e._s(t.item.blue.teams[1].number)+e._s(t.item.blue.teams[1].surrogate?"*":""))])]}}])})],1):e._e()],1)},r=[],n={data:function(){return{matchesPerTeam:5,loading:!1,headers:[{text:"Number",value:"number"},{text:"Red 1",value:"red1"},{text:"Red 2",value:"red2"},{text:"Blue 1",value:"blue1"},{text:"Blue 2",value:"blue2"}]}},computed:{isGenerated:function(){return this.$store.state.event.matches.length>0},matches:function(){return this.$store.state.event.matches}},methods:{generate:function(){this.loading=!0,this.$store.dispatch("GENERATE_MATCH_LIST",this.matchesPerTeam)}},watch:{isGenerated:{immediate:!0,handler:function(e){e&&(this.loading=!1)}}}},i=n,u=(a("10de"),a("2877")),d=Object(u["a"])(i,s,r,!1,null,null,null);d.options.__file="index.vue";t["default"]=d.exports}}]);
//# sourceMappingURL=chunk-d125a882.a08ad5ac.js.map