!function(){if(!window.$fsx){var e=window.$fsx={};e.f={},e.m={},e.r=function(t){var r=e.m[t];if(r)return r.m.exports;var a,o=e.f[t];return o?((r=e.m[t]={}).exports={},r.m={exports:r.exports},o.call(r.exports,r.m,r.exports),null===(a=r.m.exports)||-1===["function","object","array"].indexOf(typeof a)||a.hasOwnProperty("default")||(Object.isFrozen(a)?a.default=a:Object.defineProperty(a,"default",{value:a,writable:!0,enumerable:!1})),r.m.exports):void 0}}}(),function(e){e.f[30]=function(t,r){Object.defineProperty(r,"__esModule",{value:!0});const a=e.r(17),o=e.r(14),n=e.r(8),l=e.r(31),i=e.r(35),s=e.r(37);e.r(38),o.default.render(a.default.createElement(n.Provider,Object.assign({},i.default),a.default.createElement(l.default,{history:s.history})),document.getElementById("app"))},e.f[31]=function(t,r){Object.defineProperty(r,"__esModule",{value:!0});const a=e.r(17),o=e.r(32);r.default=(()=>a.default.createElement(o.default,null))},e.f[32]=function(t,r){Object.defineProperty(r,"__esModule",{value:!0});const a=e.r(17),o=e.r(8),n=e.r(33);r.ImageCollection=(({images:e})=>a.default.createElement(a.default.Fragment,null,a.default.createElement(n.default,{items:e.items}))),r.default=o.inject("images")(o.observer(r.ImageCollection))},e.f[33]=function(t,r){Object.defineProperty(r,"__esModule",{value:!0});const a=e.r(17),o=e.r(8),n=e.r(34);r.Grid=(({items:e})=>a.default.createElement("section",{className:"grid"},e.map((e,t)=>2!==t?null:a.default.createElement("article",{key:e.content_hash},a.default.createElement("label",null,e.name),a.default.createElement(n.default,{src:`/i${e.path_display}`}))))),r.default=o.observer(r.Grid)},e.f[34]=function(t,r){Object.defineProperty(r,"__esModule",{value:!0});const a=e.r(17);r.default=(({src:e})=>{let t=e.replace(/^(.*)\.(\w{3,4})$/,"$1::width=500,height=500,quality=90.$2");return a.default.createElement("img",{src:t})})},e.f[35]=function(t,r){Object.defineProperty(r,"__esModule",{value:!0});const a=e.r(36),o=e.r(37);r.default={images:a.default,routing:o.default}},e.f[36]=function(t,r){Object.defineProperty(r,"__esModule",{value:!0});const a=e.r(27),o=e.r(9);class n{constructor(e){this.name="",Object.assign(this,e)}}a.__decorate([o.observable,a.__metadata("design:type",Object)],n.prototype,"name",void 0),r.ImageItem=n;class l{constructor(){this.items=[],this.enabled=!1,this.toggle=(()=>this.enabled=!this.enabled),this.add=(e=>this.items.push(new n(e))),fetch("/api/list").then(e=>e.json()).then(e=>e.entries).then(e=>e.filter(e=>"file"===e[".tag"])).then(e=>e.forEach(this.add)).catch(e=>console.warn(e))}}a.__decorate([o.observable,a.__metadata("design:type",Object)],l.prototype,"items",void 0),a.__decorate([o.observable,a.__metadata("design:type",Object)],l.prototype,"enabled",void 0),a.__decorate([o.action,a.__metadata("design:type",Object)],l.prototype,"toggle",void 0),a.__decorate([o.action,a.__metadata("design:type",Object)],l.prototype,"add",void 0),r.ImageList=l,r.default=window.images=new l},e.f[37]=function(t,r){Object.defineProperty(r,"__esModule",{value:!0});const a=e.r(1),o=e.r(7),n=e.r(7);r.routing=new n.RouterStore,r.browserHistory=a.default(),r.history=o.syncHistoryWithStore(r.browserHistory,r.routing)},e.r(30)}($fsx);