!function(){if(!window.$fsx){var e=window.$fsx={};e.f={},e.m={},e.r=function(t){var a=e.m[t];if(a)return a.m.exports;var o,i=e.f[t];return i?((a=e.m[t]={}).exports={},a.m={exports:a.exports},i.call(a.exports,a.m,a.exports),null===(o=a.m.exports)||-1===["function","object","array"].indexOf(typeof o)||o.hasOwnProperty("default")||(Object.isFrozen(o)?o.default=o:Object.defineProperty(o,"default",{value:o,writable:!0,enumerable:!1})),a.m.exports):void 0}}}(),function(e){e.f[96]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),r=e.r(97),d=e.r(108),s=e.r(111);e.r(113),o.render(o.default.createElement(i.Provider,Object.assign({},d.default),o.default.createElement(r.default,{history:s.history})),document.getElementById("app"))},e.f[97]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(64),r=e.r(98),d=e.r(103),s=e.r(106),n=e.r(107);a.default=(({history:e})=>o.default.createElement(i.Router,{history:e},o.default.createElement(i.Route,{render:({location:e,history:t})=>o.default.createElement("div",{className:"page-content"},o.default.createElement(s.default,{history:t,location:e}),o.default.createElement(i.Switch,null,o.default.createElement(i.Route,{path:"/view/:id",component:d.default}),o.default.createElement(i.Route,{path:"/",component:r.default})),o.default.createElement(n.default,null))})))},e.f[98]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),r=e.r(99);class d extends o.Component{componentWillUnmount(){this.props.scroll.save(window.scrollX,window.scrollY),console.log("ImageCollection:scrolling to top"),window.scrollTo(0,0)}componentDidMount(){this.props.scroll.restore()}render(){let{images:e}=this.props;return o.default.createElement(o.default.Fragment,null,o.default.createElement(r.default,{items:e.itemsSorted,location:location,history:history}))}}a.ImageCollection=d,a.default=i.inject("images","scroll")(i.observer(d))},e.f[99]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),r=e.r(100);a.Grid=(({items:e})=>o.default.createElement("div",{className:"grid"},e.map((e,t)=>o.default.createElement(r.default,{key:e.id,item:e})))),a.default=i.observer(a.Grid)},e.f[100]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),r=e.r(101),d=e.r(64);a.GridItem=(({app:e,item:t})=>(console.log("rendering GridItem"),o.default.createElement("article",null,o.default.createElement(d.NavLink,{to:`/view/${t.id}`},o.default.createElement(r.default,{id:t.id,width:400,height:400}),o.default.createElement("label",null,o.default.createElement("span",null,t.name)))))),a.default=i.inject("app")(i.observer(a.GridItem))},e.f[101]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(48),r=e.r(102),d=e.r(42);let s=class extends i.Component{componentWillMount(){let{width:e,height:t,quality:a,id:o}=this.props,i=[];e&&i.push(`width=${e}`),t&&i.push(`height=${t}`),a&&i.push(`quality=${a}`),this.path=`/i/${o}::${i.join(",")}.jpg`}componentWillUnmount(){r.default.unload(this.path)}render(){let e=r.default.getImage(this.path);return e?i.default.createElement("img",{src:e}):i.default.createElement("div",{className:"loading"})}};s=o.__decorate([d.observer],s),a.default=s},e.f[102]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(44);console.log("image service loaded");class r{constructor(e,t){this.src=void 0,this.previewLoading=!0,this.el={full:document.createElement("img"),preview:document.createElement("img")},setTimeout(()=>this.load(e,t),0)}load(e,t){let{preview:a,full:o}=this.el,i=a.src=e.replace(/^(.*)(\.jpg)$/,"$1,preview$2");a.onload=(()=>{this.previewLoading=!1,this.src=i,setTimeout(()=>{o.src=e,o.onload=(()=>{this.src=e})},10)})}}o.__decorate([i.observable,o.__metadata("design:type",Object)],r.prototype,"src",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],r.prototype,"previewLoading",void 0),o.__decorate([i.action,o.__metadata("design:type",Function),o.__metadata("design:paramtypes",[Object,Object]),o.__metadata("design:returntype",void 0)],r.prototype,"load",null),a.Image=r;class d{constructor(){this.images={},this.getImage=(e=>{return(this.images[e]||(this.images[e]=new r(e,this))).src})}unload(e){}get previewsLoading(){return Object.values(this.images).filter(e=>e.previewLoading).length}}o.__decorate([i.observable,o.__metadata("design:type",Object)],d.prototype,"images",void 0),o.__decorate([i.action,o.__metadata("design:type",Function),o.__metadata("design:paramtypes",[Object]),o.__metadata("design:returntype",void 0)],d.prototype,"unload",null),o.__decorate([i.computed,o.__metadata("design:type",Object),o.__metadata("design:paramtypes",[])],d.prototype,"previewsLoading",null),a.ImageService=d,a.default=new d},e.f[103]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),r=e.r(101),d=e.r(104);a.Viewer=(({images:e,match:t})=>{let a=e.getById(t.params.id);return o.default.createElement("div",{className:"viewer"},o.default.createElement(r.default,{id:t.params.id,width:900}),a&&o.default.createElement(d.default,{image:a}))}),a.default=i.inject("images")(i.observer(a.Viewer))},e.f[104]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),r=e.r(63),d=e.r(105);a.ImageDetails=(({app:e,image:t,editing:a})=>o.default.createElement("div",{className:"image-details"},e.editMode?o.default.createElement(d.default,{className:"h1 title",value:t.name,onChange:t.set("name"),placeholder:t.filename}):o.default.createElement("h1",null,t.name),e.editMode?o.default.createElement(d.default,{className:"story",value:t.story,onChange:t.set("story"),placeholder:"(image story)",rows:3}):o.default.createElement("div",{className:"story"},r.default([t.story])),e.editMode&&t.isDirty?o.default.createElement("button",{className:"save",onClick:t.save},"Save Changes"):null)),a.default=i.inject("app")(i.observer(a.ImageDetails))},e.f[105]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(48),r=e.r(42),d=e.r(1),s=e.r(61);a.LiveEdit=(e=>{var{value:t,placeholder:a,onChange:r,className:n}=e,l=o.__rest(e,["value","placeholder","onChange","className"]);return i.default.createElement(s.default,Object.assign({className:d.default("live-edit",n),type:"text",onChange:(e=>t=>e(t.target.value))(r),value:t,placeholder:a},l))}),a.default=r.observer(a.LiveEdit)},e.f[106]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48);a.Back=(({history:e,location:t})=>"/"!==t.pathname&&o.default.createElement("div",{className:"back",onClick:e.goBack})),a.default=a.Back},e.f[107]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),r=e.r(1);a.default=i.inject("app","images")(i.observer(({app:e,images:t})=>t.items.length?o.default.createElement("div",{className:r.default("toggle","edit",e.editMode&&"active"),onClick:e.toggleEdit},e.editMode?"editing":"locked"):null))},e.f[108]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(109),i=e.r(110),r=e.r(111),d=e.r(112);let s={app:o.default,images:i.default,routing:r.default,scroll:d.default};a.default=s},e.f[109]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(44);class r{constructor(){this.editMode=!0,this.toggleMode=(e=>this[`${e}Mode`]=!this[`${e}Mode`]),this.toggleEdit=(()=>this.toggleMode("edit"))}}o.__decorate([i.observable,o.__metadata("design:type",Object)],r.prototype,"editMode",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],r.prototype,"toggleMode",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],r.prototype,"toggleEdit",void 0),a.AppState=r,a.default=window.images=new r},e.f[110]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(44),r=(e,t)=>e.date<t.date?1:e.date>t.date?-1:0;class d{constructor(e){this.name="",this.story="",this.viewing=!1,this.isDirty=!1,this.set=(e=>t=>{this[e]=t,this.isDirty=!0}),this.save=(()=>{fetch(`/api/images/${this.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.saveable)}).then(e=>e.json()).catch(e=>console.warn(e)),this.isDirty=!1}),Object.assign(this,e),this.date=new Date(this.date)}get saveable(){return{name:this.name,story:this.story,dateModified:new Date}}}o.__decorate([i.observable,o.__metadata("design:type",Object)],d.prototype,"name",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],d.prototype,"story",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],d.prototype,"viewing",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],d.prototype,"isDirty",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],d.prototype,"set",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],d.prototype,"save",void 0),o.__decorate([i.computed,o.__metadata("design:type",Object),o.__metadata("design:paramtypes",[])],d.prototype,"saveable",null),a.ImageItem=d;class s{constructor(){this.items=[],this.enabled=!1,this.getById=(e=>this.items.slice().find(t=>t.id===e)),this.toggle=(()=>this.enabled=!this.enabled),this.viewImage=(e=>this.items.forEach(t=>{t.viewing=t.image_id===e})),this.add=(e=>this.items.push(new d(e))),fetch("/api/images").then(e=>e.json()).then(e=>e.filter(e=>"file"===e.type)).then(e=>e.forEach(this.add)).catch(e=>console.warn(e))}get itemsSorted(){return this.items.slice().sort(r)}get viewingImage(){return this.items.find(e=>e.viewing)}}o.__decorate([i.observable,o.__metadata("design:type",Object)],s.prototype,"items",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],s.prototype,"enabled",void 0),o.__decorate([i.computed,o.__metadata("design:type",Object),o.__metadata("design:paramtypes",[])],s.prototype,"itemsSorted",null),o.__decorate([i.computed,o.__metadata("design:type",Object),o.__metadata("design:paramtypes",[])],s.prototype,"viewingImage",null),o.__decorate([i.action,o.__metadata("design:type",Object)],s.prototype,"toggle",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],s.prototype,"viewImage",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],s.prototype,"add",void 0),a.ImageList=s,a.default=window.images=new s},e.f[111]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(32),i=e.r(43),r=e.r(43);a.routing=new r.RouterStore,a.browserHistory=o.default(),a.history=i.syncHistoryWithStore(a.browserHistory,a.routing)},e.f[112]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(44);class r{constructor(){this.save=((e,t)=>{console.log("saving x y coordinates",e,t),this.x=e,this.y=t}),this.restore=(()=>{console.log("restoring x y coordinates",this.x,this.y),window.scrollTo(this.x,this.y)})}}o.__decorate([i.observable,o.__metadata("design:type",Object)],r.prototype,"x",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],r.prototype,"y",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],r.prototype,"save",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],r.prototype,"restore",void 0),a.Scroller=r,a.default=window.scroll=new r},e.r(96)}($fsx);