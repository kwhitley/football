!function(){if(!window.$fsx){var e=window.$fsx={};e.f={},e.m={},e.r=function(t){var a=e.m[t];if(a)return a.m.exports;var o,r=e.f[t];return r?((a=e.m[t]={}).exports={},a.m={exports:a.exports},r.call(a.exports,a.m,a.exports),null===(o=a.m.exports)||-1===["function","object","array"].indexOf(typeof o)||o.hasOwnProperty("default")||(Object.isFrozen(o)?o.default=o:Object.defineProperty(o,"default",{value:o,writable:!0,enumerable:!1})),a.m.exports):void 0}}}(),function(e){e.f[364]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(350),r=e.r(315),i=e.r(298),d=e.r(365),n=e.r(376),l=e.r(379);e.r(381),r.default.render(o.default.createElement(i.Provider,Object.assign({},n.default),o.default.createElement(d.default,{history:l.history})),document.getElementById("app"))},e.f[365]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(350),r=e.r(325),i=e.r(366),d=e.r(371),n=e.r(374),l=e.r(375);a.default=(({history:e})=>o.default.createElement(r.Router,{history:e},o.default.createElement(r.Route,{render:({location:e,history:t})=>o.default.createElement("div",{className:"page-content"},o.default.createElement(n.default,{history:t,location:e}),o.default.createElement(r.Switch,null,o.default.createElement(r.Route,{path:"/view/:id",component:d.default}),o.default.createElement(r.Route,{path:"/",component:i.default})),o.default.createElement(l.default,null))})))},e.f[366]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(350),r=e.r(298),i=e.r(367);class d extends o.default.Component{componentWillUnmount(){this.props.scroll.save(window.scrollX,window.scrollY),window.scrollTo(0,0)}componentDidMount(){this.props.scroll.restore()}render(){let{images:e}=this.props;return o.default.createElement(o.default.Fragment,null,o.default.createElement(i.default,{items:e.itemsSorted,location:location,history:history}))}}a.ImageCollection=d,a.default=r.inject("images","scroll")(r.observer(d))},e.f[367]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(350),r=e.r(298),i=e.r(368);a.Grid=(({items:e})=>o.default.createElement("div",{className:"grid"},e.map((e,t)=>o.default.createElement(i.default,{key:e.id,item:e})))),a.default=r.observer(a.Grid)},e.f[368]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(350),r=e.r(298),i=e.r(369),d=e.r(325);a.GridItem=(({app:e,item:t})=>(console.log("rendering GridItem"),o.default.createElement("article",null,o.default.createElement(d.NavLink,{to:`/view/${t.id}`},o.default.createElement(i.default,{id:t.id,width:400,height:400}),o.default.createElement("label",null,o.default.createElement("span",null,t.name||t.filename)))))),a.default=r.inject("app")(r.observer(a.GridItem))},e.f[369]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(360),r=e.r(350),i=e.r(370),d=e.r(298);let n=class extends r.default.Component{componentWillMount(){let{width:e,height:t,quality:a,id:o}=this.props,r=[];e&&r.push(`width=${e}`),t&&r.push(`height=${t}`),a&&r.push(`quality=${a}`),this.path=`/i/${o}::${r.join(",")}.jpg`}componentWillUnmount(){i.default.unload(this.path)}render(){let e=i.default.getImage(this.path);return e?r.default.createElement("img",{src:e}):r.default.createElement("div",{className:"loading"})}};n=o.__decorate([d.observer],n),a.default=n},e.f[370]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(360),r=e.r(299);console.log("image service loaded");class i{constructor(e,t){this.src=void 0,this.previewLoading=!0,this.el={full:document.createElement("img"),preview:document.createElement("img")},setTimeout(()=>this.load(e,t),0)}load(e,t){let{preview:a,full:o}=this.el,r=a.src=e.replace(/^(.*)(\.jpg)$/,"$1,preview$2");a.onload=(()=>{this.previewLoading=!1,this.src=r,setTimeout(()=>{o.src=e,o.onload=(()=>{this.src=e})},10)})}}o.__decorate([r.observable,o.__metadata("design:type",Object)],i.prototype,"src",void 0),o.__decorate([r.observable,o.__metadata("design:type",Object)],i.prototype,"previewLoading",void 0),o.__decorate([r.action,o.__metadata("design:type",Function),o.__metadata("design:paramtypes",[Object,Object]),o.__metadata("design:returntype",void 0)],i.prototype,"load",null),a.Image=i;class d{constructor(){this.images={},this.getImage=(e=>{return(this.images[e]||(this.images[e]=new i(e,this))).src})}unload(e){}get previewsLoading(){return Object.values(this.images).filter(e=>e.previewLoading).length}}o.__decorate([r.observable,o.__metadata("design:type",Object)],d.prototype,"images",void 0),o.__decorate([r.action,o.__metadata("design:type",Function),o.__metadata("design:paramtypes",[Object]),o.__metadata("design:returntype",void 0)],d.prototype,"unload",null),o.__decorate([r.computed,o.__metadata("design:type",Object),o.__metadata("design:paramtypes",[])],d.prototype,"previewsLoading",null),a.ImageService=d,a.default=new d},e.f[371]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(350),r=e.r(298),i=e.r(369),d=e.r(372);a.Viewer=(({images:e,match:t})=>{let a=e.getById(t.params.id);return o.default.createElement("div",{className:"viewer"},o.default.createElement(i.default,{id:t.params.id,width:900}),a&&o.default.createElement(d.default,{image:a}))}),a.default=r.inject("images")(r.observer(a.Viewer))},e.f[372]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(350),r=e.r(298),i=e.r(318),d=e.r(373);a.ImageDetails=(({app:e,image:t,editing:a})=>o.default.createElement("div",{className:"image-details"},e.editMode?o.default.createElement(d.default,{className:"h1 title",value:t.name,onChange:t.set("name"),placeholder:t.filename}):o.default.createElement("h1",null,t.name),e.editMode?o.default.createElement(d.default,{className:"story",value:t.story,onChange:t.set("story"),placeholder:"(image story)",rows:3}):o.default.createElement(i.MarkdownPreview,{className:"story",value:t.story,markedOptions:{sanitize:!1}}))),a.default=r.inject("app")(r.observer(a.ImageDetails))},e.f[373]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(360),r=e.r(350),i=e.r(298),d=e.r(14),n=e.r(313);a.LiveEdit=(e=>{var{value:t,placeholder:a,onChange:i,className:l}=e,s=o.__rest(e,["value","placeholder","onChange","className"]);return r.default.createElement(n.default,Object.assign({className:d.default("live-edit",l),type:"text",onChange:(e=>t=>e(t.target.value))(i),value:t,placeholder:a},s))}),a.default=i.observer(a.LiveEdit)},e.f[374]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(350);a.Back=(({history:e,location:t})=>"/"!==t.pathname&&o.default.createElement("div",{className:"back",onClick:e.goBack})),a.default=a.Back},e.f[375]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(350),r=e.r(298),i=e.r(14);a.default=r.inject("app","images")(r.observer(function({app:e,images:t}){return t.items.length?o.default.createElement("div",{className:i.default("toggle","edit",e.editMode&&"active"),onClick:e.toggleEdit},e.editMode?"editing":"locked"):null}))},e.f[376]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(377),r=e.r(378),i=e.r(379),d=e.r(380);let n={app:o.default,images:r.default,routing:i.default,scroll:d.default};a.default=n},e.f[377]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(360),r=e.r(299);class i{constructor(){this.editMode=!0,this.toggleMode=(e=>this[`${e}Mode`]=!this[`${e}Mode`]),this.toggleEdit=(()=>this.toggleMode("edit"))}}o.__decorate([r.observable,o.__metadata("design:type",Object)],i.prototype,"editMode",void 0),o.__decorate([r.action,o.__metadata("design:type",Object)],i.prototype,"toggleMode",void 0),o.__decorate([r.action,o.__metadata("design:type",Object)],i.prototype,"toggleEdit",void 0),a.AppState=i,a.default=window.images=new i},e.f[378]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(360),r=e.r(299),i=(e,t)=>e.date<t.date?1:e.date>t.date?-1:0;class d{constructor(e){this.name="",this.story="",this.viewing=!1,this.set=(e=>t=>this[e]=t),Object.assign(this,e),this.date=new Date(this.date)}}o.__decorate([r.observable,o.__metadata("design:type",Object)],d.prototype,"name",void 0),o.__decorate([r.observable,o.__metadata("design:type",Object)],d.prototype,"story",void 0),o.__decorate([r.observable,o.__metadata("design:type",Object)],d.prototype,"viewing",void 0),o.__decorate([r.action,o.__metadata("design:type",Object)],d.prototype,"set",void 0),a.ImageItem=d;class n{constructor(){this.items=[],this.enabled=!1,this.getById=(e=>this.items.slice().find(t=>t.id===e)),this.toggle=(()=>this.enabled=!this.enabled),this.viewImage=(e=>this.items.forEach(t=>{t.viewing=t.image_id===e})),this.add=(e=>this.items.push(new d(e))),fetch("/api/list").then(e=>e.json()).then(e=>e.filter(e=>"file"===e.type)).then(e=>e.forEach(this.add)).catch(e=>console.warn(e))}get itemsSorted(){return this.items.slice().sort(i)}get viewingImage(){return this.items.find(e=>e.viewing)}}o.__decorate([r.observable,o.__metadata("design:type",Object)],n.prototype,"items",void 0),o.__decorate([r.observable,o.__metadata("design:type",Object)],n.prototype,"enabled",void 0),o.__decorate([r.computed,o.__metadata("design:type",Object),o.__metadata("design:paramtypes",[])],n.prototype,"itemsSorted",null),o.__decorate([r.computed,o.__metadata("design:type",Object),o.__metadata("design:paramtypes",[])],n.prototype,"viewingImage",null),o.__decorate([r.action,o.__metadata("design:type",Object)],n.prototype,"toggle",void 0),o.__decorate([r.action,o.__metadata("design:type",Object)],n.prototype,"viewImage",void 0),o.__decorate([r.action,o.__metadata("design:type",Object)],n.prototype,"add",void 0),a.ImageList=n,a.default=window.images=new n},e.f[379]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(290),r=e.r(297),i=e.r(297);a.routing=new i.RouterStore,a.browserHistory=o.default(),a.history=r.syncHistoryWithStore(a.browserHistory,a.routing)},e.f[380]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(360),r=e.r(299);class i{constructor(){this.save=((e,t)=>{this.x=e,this.y=t}),this.restore=(()=>{window.scrollTo(this.x,this.y)})}}o.__decorate([r.observable,o.__metadata("design:type",Object)],i.prototype,"x",void 0),o.__decorate([r.observable,o.__metadata("design:type",Object)],i.prototype,"y",void 0),o.__decorate([r.action,o.__metadata("design:type",Object)],i.prototype,"save",void 0),o.__decorate([r.action,o.__metadata("design:type",Object)],i.prototype,"restore",void 0),a.Scroller=i,a.default=window.scroll=new i},e.r(364)}($fsx);