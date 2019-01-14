!function(){if(!window.$fsx){var e=window.$fsx={};e.f={},e.m={},e.r=function(t){var a=e.m[t];if(a)return a.m.exports;var r,o=e.f[t];return o?((a=e.m[t]={}).exports={},a.m={exports:a.exports},o.call(a.exports,a.m,a.exports),null===(r=a.m.exports)||-1===["function","object","array"].indexOf(typeof r)||r.hasOwnProperty("default")||(Object.isFrozen(r)?r.default=r:Object.defineProperty(r,"default",{value:r,writable:!0,enumerable:!1})),a.m.exports):void 0}}}(),function(e){e.f[102]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(84),o=e.r(45),i=e.r(30),d=e.r(103),n=e.r(111),l=e.r(113);e.r(114),o.default.render(r.default.createElement(i.Provider,Object.assign({},n.default),r.default.createElement(d.default,{history:l.history})),document.getElementById("app"))},e.f[103]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(84),o=e.r(52),i=e.r(77),d=e.r(104),n=e.r(109),l=e.r(110);a.default=(({history:e})=>r.default.createElement(o.Router,{history:e},r.default.createElement(o.Route,{render:({location:e,history:t})=>r.default.createElement("div",{className:"page-content"},r.default.createElement(l.default,{history:t,location:e}),r.default.createElement(i.TransitionGroup,null,r.default.createElement(i.CSSTransition,{key:e.pathname,timeout:200,classNames:"fade"},r.default.createElement(o.Switch,null,r.default.createElement(o.Route,{path:"/view/:id",component:n.default}),r.default.createElement(o.Route,{path:"/",component:d.default})))))})))},e.f[104]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(84),o=e.r(30),i=e.r(105);a.ImageCollection=(({images:e})=>r.default.createElement(r.default.Fragment,null,r.default.createElement(i.default,{items:e.itemsSorted,location:location,history:history}))),a.default=o.inject("images")(o.observer(a.ImageCollection))},e.f[105]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(84),o=e.r(30),i=e.r(106),d=e.r(95),n=d.default.div`
  border-radius: 0.2em;
  overflow: hidden;
`;a.Grid=(({items:e})=>r.default.createElement(n,{className:"grid"},e.map((e,t)=>r.default.createElement(i.default,{key:e.id,item:e})))),a.default=o.observer(a.Grid)},e.f[106]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(84),o=e.r(30),i=e.r(107),d=e.r(52);a.GridItem=(({item:e})=>r.default.createElement("article",null,r.default.createElement("label",null,e.filename),r.default.createElement(d.NavLink,{to:`/view/${e.id}`},r.default.createElement(i.default,{id:e.id,width:400,height:400,quality:90})))),a.default=o.observer(a.GridItem)},e.f[107]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(84),o=e.r(108),i=e.r(30);a.default=i.observer(({width:e,height:t,quality:a,id:i})=>{let d=[];e&&d.push(`width=${e}`),t&&d.push(`height=${t}`),a&&d.push(`quality=${a}`);let n=`/i/${i}::${d.join(",")}.jpg`;return r.default.createElement("img",{src:o.default.getImage(n)})})},e.f[108]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(98),o=e.r(31);console.log("image service loaded");class i{constructor(e,t){this.src=void 0,this.previewLoading=!0,this.el={full:document.createElement("img"),preview:document.createElement("img")},setTimeout(()=>this.load(e,t),0)}load(e,t){let{preview:a,full:r}=this.el,i=a.src=e.replace(/^(.*)(\.jpg)$/,"$1,preview$2");a.onload=(()=>{this.previewLoading=!1,this.src=i}),o.reaction(()=>t.previewsLoading,(t,a)=>{t<3&&(r.src=e,r.onload=(()=>{this.src=e}),a.dispose())})}}r.__decorate([o.observable,r.__metadata("design:type",Object)],i.prototype,"src",void 0),r.__decorate([o.observable,r.__metadata("design:type",Object)],i.prototype,"previewLoading",void 0),a.Image=i;class d{constructor(){this.images={},this.getImage=(e=>{return(this.images[e]||(this.images[e]=new i(e,this))).src})}get previewsLoading(){return Object.values(this.images).filter(e=>e.previewLoading).length}}r.__decorate([o.observable,r.__metadata("design:type",Object)],d.prototype,"images",void 0),r.__decorate([o.computed,r.__metadata("design:type",Object),r.__metadata("design:paramtypes",[])],d.prototype,"previewsLoading",null),a.ImageService=d,a.default=new d},e.f[109]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(84),o=e.r(30),i=e.r(95),d=e.r(107);let n=i.default.div`
  border-radius: 0.2em;
  overflow: hidden;

  img {
    max-width: 100%;
    width: 100%;
  }
`;i.default.pre`
  padding: 1.5em;
  font-size: 0.7em;
`;a.Viewer=(({images:e,match:t})=>r.default.createElement(n,null,r.default.createElement(d.default,{id:t.params.id,width:1e3}),!1)),a.default=o.inject("images")(o.observer(a.Viewer))},e.f[110]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(84),o=e.r(95),i=o.default.div`
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
`;a.Back=(({history:e,location:t})=>"/"!==t.pathname&&r.default.createElement(i,{onClick:e.goBack},"Go Back")),a.default=a.Back},e.f[111]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(112),o=e.r(113);a.default={images:r.default,routing:o.default}},e.f[112]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(98),o=e.r(31),i=(e,t)=>e.date<t.date?1:e.date>t.date?-1:0;class d{constructor(e){this.name="",Object.assign(this,e),this.date=new Date(this.date)}}r.__decorate([o.observable,r.__metadata("design:type",Object)],d.prototype,"name",void 0),a.ImageItem=d;class n{constructor(){this.items=[],this.enabled=!1,this.getById=(e=>this.items.slice().find(t=>t.id===e)),this.toggle=(()=>this.enabled=!this.enabled),this.add=(e=>this.items.push(new d(e))),fetch("/api/list").then(e=>e.json()).then(e=>e.filter(e=>"file"===e.type)).then(e=>e.forEach(this.add)).catch(e=>console.warn(e))}get itemsSorted(){return this.items.slice().sort(i)}}r.__decorate([o.observable,r.__metadata("design:type",Object)],n.prototype,"items",void 0),r.__decorate([o.observable,r.__metadata("design:type",Object)],n.prototype,"enabled",void 0),r.__decorate([o.computed,r.__metadata("design:type",Object),r.__metadata("design:paramtypes",[])],n.prototype,"itemsSorted",null),r.__decorate([o.action,r.__metadata("design:type",Object)],n.prototype,"toggle",void 0),r.__decorate([o.action,r.__metadata("design:type",Object)],n.prototype,"add",void 0),a.ImageList=n,a.default=window.images=new n},e.f[113]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const r=e.r(23),o=e.r(29),i=e.r(29);a.routing=new i.RouterStore,a.browserHistory=r.default(),a.history=o.syncHistoryWithStore(a.browserHistory,a.routing)},e.r(102)}($fsx);