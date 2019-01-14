!function(){if(!window.$fsx){var e=window.$fsx={};e.f={},e.m={},e.r=function(t){var a=e.m[t];if(a)return a.m.exports;var r,i=e.f[t];return i?((a=e.m[t]={}).exports={},a.m={exports:a.exports},i.call(a.exports,a.m,a.exports),null===(r=a.m.exports)||-1===["function","object","array"].indexOf(typeof r)||r.hasOwnProperty("default")||(Object.isFrozen(r)?r.default=r:Object.defineProperty(r,"default",{value:r,writable:!0,enumerable:!1})),a.m.exports):void 0}}}(),function(e){e.f[90]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(72),i=e.r(41),o=e.r(26),d=e.r(91),n=e.r(99),l=e.r(101);e.r(102),i.default.render(r.default.createElement(o.Provider,Object.assign({},n.default),r.default.createElement(d.default,{history:l.history})),document.getElementById("app"))},e.f[91]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(72),i=e.r(47),o=e.r(92),d=e.r(97),n=e.r(98);a.default=(({history:e})=>r.default.createElement(i.Router,{history:e},r.default.createElement(i.Route,{render:({location:e,history:t})=>r.default.createElement("div",{className:"page-content"},r.default.createElement(n.default,{history:t,location:e}),r.default.createElement(i.Switch,null,r.default.createElement(i.Route,{path:"/view/:id",component:d.default}),r.default.createElement(i.Route,{path:"/",component:o.default})))})))},e.f[92]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(72),i=e.r(26),o=e.r(93);a.ImageCollection=(({images:e})=>r.default.createElement(r.default.Fragment,null,r.default.createElement(o.default,{items:e.itemsSorted,location:location,history:history}))),a.default=i.inject("images")(i.observer(a.ImageCollection))},e.f[93]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(72),i=e.r(26),o=e.r(94),d=e.r(83),n=d.default.div`
  border-radius: 0.2em;
  overflow: hidden;
`;a.Grid=(({items:e})=>r.default.createElement(n,{className:"grid"},e.map((e,t)=>r.default.createElement(o.default,{key:e.id,item:e})))),a.default=i.observer(a.Grid)},e.f[94]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(72),i=e.r(26),o=e.r(95),d=e.r(47),n=e.r(83),l=n.default.div`
  position: relative;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  .inside {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  img {
    max-width: 100%;
    width: 100%;
  }

  label {
    position: absolute;
    z-index: 1;
    font-size: 2vmin;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.8em 1em;
    background-color: rgba(0,0,0,0.1);
    color: white;
  }
`;a.GridItem=(({item:e})=>r.default.createElement("article",null,r.default.createElement(l,null,r.default.createElement("div",{className:"inside"},r.default.createElement("label",null,e.filename),r.default.createElement(d.NavLink,{to:`/view/${e.id}`},r.default.createElement(o.default,{id:e.id,width:400,height:400,quality:90})))))),a.default=i.observer(a.GridItem)},e.f[95]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(72),i=e.r(96),o=e.r(26),d=e.r(83),n=d.default.div`
  background-color: #eee;
  height: 100%;
  text-align: center;
  position: relative;

  &:after {
    color: #333;
    opacity: 0.2;
    content: ' loading...';
    display: block;
    position: absolute;
    top: 40%;
    width: 100%;
  }
`;a.default=o.observer(({width:e,height:t,quality:a,id:o})=>{let d=[];e&&d.push(`width=${e}`),t&&d.push(`height=${t}`),a&&d.push(`quality=${a}`);let l=`/i/${o}::${d.join(",")}.jpg`,s=i.default.getImage(l);return s?r.default.createElement("img",{src:s}):r.default.createElement(n,null)})},e.f[96]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(86),i=e.r(27);console.log("image service loaded");class o{constructor(e,t){this.src=void 0,this.previewLoading=!0,this.el={full:document.createElement("img"),preview:document.createElement("img")},setTimeout(()=>this.load(e,t),0)}load(e,t){let{preview:a,full:r}=this.el,o=a.src=e.replace(/^(.*)(\.jpg)$/,"$1,preview$2");a.onload=(()=>{this.previewLoading=!1,this.src=o}),i.reaction(()=>t.previewsLoading,(t,a)=>{0===t&&(r.src=e,r.onload=(()=>{this.src=e}),a.dispose())})}}r.__decorate([i.observable,r.__metadata("design:type",Object)],o.prototype,"src",void 0),r.__decorate([i.observable,r.__metadata("design:type",Object)],o.prototype,"previewLoading",void 0),a.Image=o;class d{constructor(){this.images={},this.getImage=(e=>{return(this.images[e]||(this.images[e]=new o(e,this))).src})}get previewsLoading(){return Object.values(this.images).filter(e=>e.previewLoading).length}}r.__decorate([i.observable,r.__metadata("design:type",Object)],d.prototype,"images",void 0),r.__decorate([i.computed,r.__metadata("design:type",Object),r.__metadata("design:paramtypes",[])],d.prototype,"previewsLoading",null),a.ImageService=d,a.default=new d},e.f[97]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(72),i=e.r(26),o=e.r(83),d=e.r(95);let n=o.default.div`
  border-radius: 0.2em;
  overflow: hidden;

  img {
    max-width: 100%;
    width: 100%;
  }
`;o.default.pre`
  padding: 1.5em;
  font-size: 0.7em;
`;a.Viewer=(({images:e,match:t})=>r.default.createElement(n,null,r.default.createElement(d.default,{id:t.params.id,width:1e3}),!1)),a.default=i.inject("images")(i.observer(a.Viewer))},e.f[98]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(72),i=e.r(83),o=i.default.div`
  padding: 1em;
  background: #ddd;
  cursor: pointer;
  margin-bottom: 0.2em;
  position: relative;
  border-radius: 0.2em;

  &:before {
    content: '\\2039';
    font-size: 2em;
    line-height: 0;
    position: relative;
    bottom: -0.1em;
    color: #666;
    margin-right: 0.1em;
  }

  &:hover {
    background-color: #ccc;
  }
`;a.Back=(({history:e,location:t})=>"/"!==t.pathname&&r.default.createElement(o,{onClick:e.goBack},"Go Back")),a.default=a.Back},e.f[99]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(100),i=e.r(101);a.default={images:r.default,routing:i.default}},e.f[100]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(86),i=e.r(27),o=(e,t)=>e.date<t.date?1:e.date>t.date?-1:0;class d{constructor(e){this.name="",Object.assign(this,e),this.date=new Date(this.date)}}r.__decorate([i.observable,r.__metadata("design:type",Object)],d.prototype,"name",void 0),a.ImageItem=d;class n{constructor(){this.items=[],this.enabled=!1,this.getById=(e=>this.items.slice().find(t=>t.id===e)),this.toggle=(()=>this.enabled=!this.enabled),this.add=(e=>this.items.push(new d(e))),fetch("/api/list").then(e=>e.json()).then(e=>e.filter(e=>"file"===e.type)).then(e=>e.forEach(this.add)).catch(e=>console.warn(e))}get itemsSorted(){return this.items.slice().sort(o)}}r.__decorate([i.observable,r.__metadata("design:type",Object)],n.prototype,"items",void 0),r.__decorate([i.observable,r.__metadata("design:type",Object)],n.prototype,"enabled",void 0),r.__decorate([i.computed,r.__metadata("design:type",Object),r.__metadata("design:paramtypes",[])],n.prototype,"itemsSorted",null),r.__decorate([i.action,r.__metadata("design:type",Object)],n.prototype,"toggle",void 0),r.__decorate([i.action,r.__metadata("design:type",Object)],n.prototype,"add",void 0),a.ImageList=n,a.default=window.images=new n},e.f[101]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(19),i=e.r(25),o=e.r(25);a.routing=new o.RouterStore,a.browserHistory=r.default(),a.history=i.syncHistoryWithStore(a.browserHistory,a.routing)},e.r(90)}($fsx);