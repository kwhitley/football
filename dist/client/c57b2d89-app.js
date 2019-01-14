!function(){if(!window.$fsx){var e=window.$fsx={};e.f={},e.m={},e.r=function(t){var o=e.m[t];if(o)return o.m.exports;var r,a=e.f[t];return a?((o=e.m[t]={}).exports={},o.m={exports:o.exports},a.call(o.exports,o.m,o.exports),null===(r=o.m.exports)||-1===["function","object","array"].indexOf(typeof r)||r.hasOwnProperty("default")||(Object.isFrozen(r)?r.default=r:Object.defineProperty(r,"default",{value:r,writable:!0,enumerable:!1})),o.m.exports):void 0}}}(),function(e){e.f[90]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const r=e.r(72),a=e.r(41),i=e.r(26),d=e.r(91),n=e.r(99),l=e.r(101);e.r(103),a.default.render(r.default.createElement(i.Provider,Object.assign({},n.default),r.default.createElement(d.default,{history:l.history})),document.getElementById("app"))},e.f[91]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const r=e.r(72),a=e.r(47),i=e.r(92),d=e.r(97),n=e.r(98);o.default=(({history:e})=>r.default.createElement(a.Router,{history:e},r.default.createElement(a.Route,{render:({location:e,history:t})=>r.default.createElement("div",{className:"page-content"},r.default.createElement(n.default,{history:t,location:e}),r.default.createElement(a.Switch,null,r.default.createElement(a.Route,{path:"/view/:id",component:d.default}),r.default.createElement(a.Route,{path:"/",component:i.default})))})))},e.f[92]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const r=e.r(72),a=e.r(26),i=e.r(93);class d extends r.default.Component{componentWillUnmount(){this.props.scroll.save(window.scrollX,window.scrollY),window.scrollTo(0,0)}componentDidMount(){this.props.scroll.restore()}render(){let{images:e}=this.props;return r.default.createElement(r.default.Fragment,null,r.default.createElement(i.default,{items:e.itemsSorted,location:location,history:history}))}}o.ImageCollection=d,o.default=a.inject("images","scroll")(a.observer(d))},e.f[93]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const r=e.r(72),a=e.r(26),i=e.r(94),d=e.r(83),n=d.default.div`
  border-radius: 0.2em;
  overflow: hidden;
`;o.Grid=(({items:e})=>r.default.createElement(n,{className:"grid"},e.map((e,t)=>r.default.createElement(i.default,{key:e.id,item:e})))),o.default=a.observer(o.Grid)},e.f[94]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const r=e.r(72),a=e.r(26),i=e.r(95),d=e.r(47),n=e.r(83),l=n.default.div`
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
`;o.GridItem=(({item:e})=>r.default.createElement("article",null,r.default.createElement(l,null,r.default.createElement("div",{className:"inside"},r.default.createElement("label",null,e.filename),r.default.createElement(d.NavLink,{to:`/view/${e.id}`},r.default.createElement(i.default,{id:e.id,width:400,height:400,quality:90})))))),o.default=a.observer(o.GridItem)},e.f[95]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const r=e.r(72),a=e.r(96),i=e.r(26),d=e.r(83),n=d.default.div`
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
`;o.default=i.observer(({width:e,height:t,quality:o,id:i})=>{let d=[];e&&d.push(`width=${e}`),t&&d.push(`height=${t}`),o&&d.push(`quality=${o}`);let l=`/i/${i}::${d.join(",")}.jpg`,s=a.default.getImage(l);return s?r.default.createElement("img",{src:s}):r.default.createElement(n,null)})},e.f[96]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const r=e.r(86),a=e.r(27);console.log("image service loaded");class i{constructor(e,t){this.src=void 0,this.previewLoading=!0,this.el={full:document.createElement("img"),preview:document.createElement("img")},setTimeout(()=>this.load(e,t),0)}load(e,t){let{preview:o,full:r}=this.el,i=o.src=e.replace(/^(.*)(\.jpg)$/,"$1,preview$2");o.onload=(()=>{this.previewLoading=!1,this.src=i}),a.reaction(()=>t.previewsLoading,(t,o)=>{0===t&&(r.src=e,r.onload=(()=>{this.src=e}),o.dispose())})}}r.__decorate([a.observable,r.__metadata("design:type",Object)],i.prototype,"src",void 0),r.__decorate([a.observable,r.__metadata("design:type",Object)],i.prototype,"previewLoading",void 0),o.Image=i;class d{constructor(){this.images={},this.getImage=(e=>{return(this.images[e]||(this.images[e]=new i(e,this))).src})}get previewsLoading(){return Object.values(this.images).filter(e=>e.previewLoading).length}}r.__decorate([a.observable,r.__metadata("design:type",Object)],d.prototype,"images",void 0),r.__decorate([a.computed,r.__metadata("design:type",Object),r.__metadata("design:paramtypes",[])],d.prototype,"previewsLoading",null),o.ImageService=d,o.default=new d},e.f[97]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const r=e.r(72),a=e.r(26),i=e.r(83),d=e.r(95);let n=i.default.div`
  border-radius: 0.2em;
  overflow: hidden;

  img {
    max-width: 100%;
    width: 100%;
  }
`;i.default.pre`
  padding: 1.5em;
  font-size: 0.7em;
`;o.Viewer=(({images:e,match:t})=>r.default.createElement(n,null,r.default.createElement(d.default,{id:t.params.id,width:1e3}),!1)),o.default=a.inject("images")(a.observer(o.Viewer))},e.f[98]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const r=e.r(72),a=e.r(83),i=a.default.div`
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
`;o.Back=(({history:e,location:t})=>"/"!==t.pathname&&r.default.createElement(i,{onClick:e.goBack},"Go Back")),o.default=o.Back},e.f[99]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const r=e.r(100),a=e.r(101),i=e.r(102);o.default={images:r.default,routing:a.default,scroll:i.default}},e.f[100]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const r=e.r(86),a=e.r(27),i=(e,t)=>e.date<t.date?1:e.date>t.date?-1:0;class d{constructor(e){this.name="",Object.assign(this,e),this.date=new Date(this.date)}}r.__decorate([a.observable,r.__metadata("design:type",Object)],d.prototype,"name",void 0),o.ImageItem=d;class n{constructor(){this.items=[],this.enabled=!1,this.getById=(e=>this.items.slice().find(t=>t.id===e)),this.toggle=(()=>this.enabled=!this.enabled),this.add=(e=>this.items.push(new d(e))),fetch("/api/list").then(e=>e.json()).then(e=>e.filter(e=>"file"===e.type)).then(e=>e.forEach(this.add)).catch(e=>console.warn(e))}get itemsSorted(){return this.items.slice().sort(i)}}r.__decorate([a.observable,r.__metadata("design:type",Object)],n.prototype,"items",void 0),r.__decorate([a.observable,r.__metadata("design:type",Object)],n.prototype,"enabled",void 0),r.__decorate([a.computed,r.__metadata("design:type",Object),r.__metadata("design:paramtypes",[])],n.prototype,"itemsSorted",null),r.__decorate([a.action,r.__metadata("design:type",Object)],n.prototype,"toggle",void 0),r.__decorate([a.action,r.__metadata("design:type",Object)],n.prototype,"add",void 0),o.ImageList=n,o.default=window.images=new n},e.f[101]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const r=e.r(19),a=e.r(25),i=e.r(25);o.routing=new i.RouterStore,o.browserHistory=r.default(),o.history=a.syncHistoryWithStore(o.browserHistory,o.routing)},e.f[102]=function(t,o){Object.defineProperty(o,"__esModule",{value:!0});const r=e.r(86),a=e.r(27);class i{constructor(){this.save=((e,t)=>{this.x=e,this.y=t}),this.restore=(()=>{window.scrollTo(this.x,this.y)})}}r.__decorate([a.observable,r.__metadata("design:type",Object)],i.prototype,"x",void 0),r.__decorate([a.observable,r.__metadata("design:type",Object)],i.prototype,"y",void 0),r.__decorate([a.action,r.__metadata("design:type",Object)],i.prototype,"save",void 0),r.__decorate([a.action,r.__metadata("design:type",Object)],i.prototype,"restore",void 0),o.Scroller=i,o.default=window.scroll=new i},e.r(90)}($fsx);