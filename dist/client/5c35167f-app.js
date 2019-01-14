!function(){if(!window.$fsx){var e=window.$fsx={};e.f={},e.m={},e.r=function(t){var o=e.m[t];if(o)return o.m.exports;var a,r=e.f[t];return r?((o=e.m[t]={}).exports={},o.m={exports:o.exports},r.call(o.exports,o.m,o.exports),null===(a=o.m.exports)||-1===["function","object","array"].indexOf(typeof a)||a.hasOwnProperty("default")||(Object.isFrozen(a)?a.default=a:Object.defineProperty(a,"default",{value:a,writable:!0,enumerable:!1})),o.m.exports):void 0}}}(),function(e){e.f[90]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const a=e.r(72),r=e.r(41),i=e.r(26),d=e.r(91),n=e.r(99),l=e.r(101);e.r(103),r.default.render(a.default.createElement(i.Provider,Object.assign({},n.default),a.default.createElement(d.default,{history:l.history})),document.getElementById("app"))},e.f[91]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const a=e.r(72),r=e.r(47),i=e.r(92),d=e.r(97),n=e.r(98);o.default=(({history:e})=>a.default.createElement(r.Router,{history:e},a.default.createElement(r.Route,{render:({location:e,history:t})=>a.default.createElement("div",{className:"page-content"},a.default.createElement(n.default,{history:t,location:e}),a.default.createElement(r.Switch,null,a.default.createElement(r.Route,{path:"/view/:id",component:d.default}),a.default.createElement(r.Route,{path:"/",component:i.default})))})))},e.f[92]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const a=e.r(72),r=e.r(26),i=e.r(93);class d extends a.default.Component{componentWillUnmount(){this.props.scroll.save(window.scrollX,window.scrollY),window.scrollTo(0,0)}componentDidMount(){this.props.scroll.restore()}render(){let{images:e}=this.props;return a.default.createElement(a.default.Fragment,null,a.default.createElement(i.default,{items:e.itemsSorted,location:location,history:history}))}}o.ImageCollection=d,o.default=r.inject("images","scroll")(r.observer(d))},e.f[93]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const a=e.r(72),r=e.r(26),i=e.r(94),d=e.r(83),n=d.default.div`
  border-radius: 0.2em;
  overflow: hidden;
`;o.Grid=(({items:e})=>a.default.createElement(n,{className:"grid"},e.map((e,t)=>a.default.createElement(i.default,{key:e.id,item:e})))),o.default=r.observer(o.Grid)},e.f[94]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const a=e.r(72),r=e.r(26),i=e.r(95),d=e.r(47),n=e.r(83),l=n.default.div`
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
`;o.GridItem=(({item:e})=>a.default.createElement("article",null,a.default.createElement(l,null,a.default.createElement("div",{className:"inside"},a.default.createElement("label",null,e.filename),a.default.createElement(d.NavLink,{to:`/view/${e.id}`},a.default.createElement(i.default,{id:e.id,width:400,height:400,quality:90})))))),o.default=r.observer(o.GridItem)},e.f[95]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const a=e.r(86),r=e.r(72),i=e.r(96),d=e.r(26),n=e.r(83),l=n.default.div`
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
`;let s=class extends r.default.Component{componentWillMount(){let{width:e,height:t,quality:o,id:a}=this.props,r=[];e&&r.push(`width=${e}`),t&&r.push(`height=${t}`),o&&r.push(`quality=${o}`),this.path=`/i/${a}::${r.join(",")}.jpg`}componentWillUnmount(){i.default.unload(this.path)}render(){let e=i.default.getImage(this.path);return e?r.default.createElement("img",{src:e}):r.default.createElement(l,null)}};s=a.__decorate([d.observer],s),o.default=s},e.f[96]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const a=e.r(86),r=e.r(27);console.log("image service loaded");class i{constructor(e,t){this.src=void 0,this.previewLoading=!0,this.el={full:document.createElement("img"),preview:document.createElement("img")},setTimeout(()=>this.load(e,t),0)}load(e,t){let{preview:o,full:a}=this.el,i=o.src=e.replace(/^(.*)(\.jpg)$/,"$1,preview$2");o.onload=(()=>{this.previewLoading=!1,this.src=i}),r.reaction(()=>t.previewsLoading,(t,o)=>{0===t&&(a.src=e,a.onload=(()=>{this.src=e}),o.dispose())})}}a.__decorate([r.observable,a.__metadata("design:type",Object)],i.prototype,"src",void 0),a.__decorate([r.observable,a.__metadata("design:type",Object)],i.prototype,"previewLoading",void 0),a.__decorate([r.action,a.__metadata("design:type",Function),a.__metadata("design:paramtypes",[Object,Object]),a.__metadata("design:returntype",void 0)],i.prototype,"load",null),o.Image=i;class d{constructor(){this.images={},this.getImage=(e=>{return(this.images[e]||(this.images[e]=new i(e,this))).src})}unload(e){}get previewsLoading(){return Object.values(this.images).filter(e=>e.previewLoading).length}}a.__decorate([r.observable,a.__metadata("design:type",Object)],d.prototype,"images",void 0),a.__decorate([r.action,a.__metadata("design:type",Function),a.__metadata("design:paramtypes",[Object]),a.__metadata("design:returntype",void 0)],d.prototype,"unload",null),a.__decorate([r.computed,a.__metadata("design:type",Object),a.__metadata("design:paramtypes",[])],d.prototype,"previewsLoading",null),o.ImageService=d,o.default=new d},e.f[97]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const a=e.r(72),r=e.r(26),i=e.r(83),d=e.r(95);let n=i.default.div`
  border-radius: 0.2em;
  overflow: hidden;

  img {
    max-width: 100%;
    width: 100%;
  }
`;i.default.pre`
  padding: 1.5em;
  font-size: 0.7em;
`;o.Viewer=(({images:e,match:t})=>a.default.createElement(n,null,a.default.createElement(d.default,{id:t.params.id,width:1e3}),!1)),o.default=r.inject("images")(r.observer(o.Viewer))},e.f[98]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const a=e.r(72),r=e.r(83),i=r.default.div`
  padding: 1em;
  background: #ddd;
  cursor: pointer;
  margin-bottom: 0.2em;
  position: relative;
  border-radius: 0.2em;
  color: white;

  &:before {
    content: '\\2039';
    font-size: 2em;
    line-height: 0;
    position: relative;
    bottom: -0.1em;
    margin-right: 0.1em;
  }

  &:hover {
    background-color: #ccc;
  }
`;o.Back=(({history:e,location:t})=>"/"!==t.pathname&&a.default.createElement(i,{onClick:e.goBack},"Go Back")),o.default=o.Back},e.f[99]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const a=e.r(100),r=e.r(101),i=e.r(102);o.default={images:a.default,routing:r.default,scroll:i.default}},e.f[100]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const a=e.r(86),r=e.r(27),i=(e,t)=>e.date<t.date?1:e.date>t.date?-1:0;class d{constructor(e){this.name="",Object.assign(this,e),this.date=new Date(this.date)}}a.__decorate([r.observable,a.__metadata("design:type",Object)],d.prototype,"name",void 0),o.ImageItem=d;class n{constructor(){this.items=[],this.enabled=!1,this.getById=(e=>this.items.slice().find(t=>t.id===e)),this.toggle=(()=>this.enabled=!this.enabled),this.add=(e=>this.items.push(new d(e))),fetch("/api/list").then(e=>e.json()).then(e=>e.filter(e=>"file"===e.type)).then(e=>e.forEach(this.add)).catch(e=>console.warn(e))}get itemsSorted(){return this.items.slice().sort(i)}}a.__decorate([r.observable,a.__metadata("design:type",Object)],n.prototype,"items",void 0),a.__decorate([r.observable,a.__metadata("design:type",Object)],n.prototype,"enabled",void 0),a.__decorate([r.computed,a.__metadata("design:type",Object),a.__metadata("design:paramtypes",[])],n.prototype,"itemsSorted",null),a.__decorate([r.action,a.__metadata("design:type",Object)],n.prototype,"toggle",void 0),a.__decorate([r.action,a.__metadata("design:type",Object)],n.prototype,"add",void 0),o.ImageList=n,o.default=window.images=new n},e.f[101]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const a=e.r(19),r=e.r(25),i=e.r(25);o.routing=new i.RouterStore,o.browserHistory=a.default(),o.history=r.syncHistoryWithStore(o.browserHistory,o.routing)},e.f[102]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const a=e.r(86),r=e.r(27);class i{constructor(){this.save=((e,t)=>{this.x=e,this.y=t}),this.restore=(()=>{window.scrollTo(this.x,this.y)})}}a.__decorate([r.observable,a.__metadata("design:type",Object)],i.prototype,"x",void 0),a.__decorate([r.observable,a.__metadata("design:type",Object)],i.prototype,"y",void 0),a.__decorate([r.action,a.__metadata("design:type",Object)],i.prototype,"save",void 0),a.__decorate([r.action,a.__metadata("design:type",Object)],i.prototype,"restore",void 0),o.Scroller=i,o.default=window.scroll=new i},e.r(90)}($fsx);