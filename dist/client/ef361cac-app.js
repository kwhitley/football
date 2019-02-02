!function(){if(!window.$fsx){var e=window.$fsx={};e.f={},e.m={},e.r=function(t){var a=e.m[t];if(a)return a.m.exports;var o,i=e.f[t];return i?((a=e.m[t]={}).exports={},a.m={exports:a.exports},i.call(a.exports,a.m,a.exports),null===(o=a.m.exports)||-1===["function","object","array"].indexOf(typeof o)||o.hasOwnProperty("default")||(Object.isFrozen(o)?o.default=o:Object.defineProperty(o,"default",{value:o,writable:!0,enumerable:!1})),a.m.exports):void 0}}}(),function(e){e.f[96]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),l=e.r(97),s=e.r(118),n=e.r(123);e.r(128),e.r(129),o.render(o.default.createElement(i.Provider,Object.assign({},s.default),o.default.createElement(l.default,{history:n.history})),document.getElementById("app"))},e.f[97]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(64),l=e.r(98),s=e.r(105),n=e.r(108),r=e.r(112),d=e.r(113);a.default=(({history:e})=>o.default.createElement(i.Router,{history:e},o.default.createElement(i.Route,{render:e=>o.default.createElement("div",{className:"page-content"},o.default.createElement(i.Switch,null,o.default.createElement(i.Route,{path:"/login",exact:!0,render:()=>o.default.createElement(n.default,Object.assign({},e))}),o.default.createElement(i.Route,{path:"/collections/create",exact:!0,render:()=>o.default.createElement(r.default,Object.assign({},e))}),o.default.createElement(i.Route,{path:"/signup",exact:!0,render:()=>o.default.createElement(n.default,Object.assign({},e,{signup:!0}))}),o.default.createElement(i.Route,{path:"/:collection?",exact:!0,component:l.default}),o.default.createElement(i.Route,{path:"/:collection/:id",exact:!0,component:s.default}),o.default.createElement(i.Route,{render:()=>o.default.createElement("div",null,"Page not found")})),o.default.createElement(d.default,Object.assign({},e)))})))},e.f[98]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),l=e.r(99),s=e.r(103);class n extends o.Component{componentWillUnmount(){this.props.scroll.isTracking=!1,window.scrollTo(0,0)}componentDidMount(){let{collection:e,scroll:t,match:a}=this.props,{params:o}=a;t.restore(),t.isTracking=!0,e.load(o.collection||"krwhitley")}componentDidUpdate(e){let{match:t}=this.props,{params:a}=t;e.match!==t&&(collection.load(a.collection||"krwhitley"),console.log("match update",t,e,a.collection))}render(){let{collection:e,history:t,images:a,match:i}=this.props,{params:n}=i;return o.default.createElement(s.default,null,o.default.createElement("h1",{className:"collection-title"},e.name||e.slug),o.default.createElement(l.default,{items:e.items.sorted,collection:e,location:location,history:t}))}}a.ImageCollection=n,a.default=i.inject("collection","images","scroll")(i.observer(n))},e.f[99]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),l=e.r(100);a.Grid=(({items:e,collection:t})=>o.default.createElement("div",{className:"grid"},e.map((e,a)=>o.default.createElement(l.default,{key:e.id,collection:t,item:e})))),a.default=i.observer(a.Grid)},e.f[100]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),l=e.r(64),s=e.r(101);a.GridItem=(({app:e,item:t,collection:a})=>o.default.createElement("article",null,o.default.createElement(l.NavLink,{to:`/${a.slug}/${t.id}`},o.default.createElement(s.default,{id:t.id,collection:a.slug,width:400,height:400}),o.default.createElement("label",null,o.default.createElement("span",null,t.name))))),a.default=i.inject("app")(i.observer(a.GridItem))},e.f[101]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(48),l=e.r(102),s=e.r(42);let n=class extends i.Component{componentWillMount(){let{width:e,height:t,quality:a,id:o,collection:i}=this.props,l=[];e&&l.push(`width=${e}`),t&&l.push(`height=${t}`),a&&l.push(`quality=${a}`),this.path=`/i/${i}/${o}::${l.join(",")}.jpg`}componentWillUnmount(){l.default.unload(this.path)}render(){let e=l.default.getImage(this.path);return e?i.default.createElement("img",{src:e}):i.default.createElement("div",{className:"loading"})}};n=o.__decorate([s.observer],n),a.default=n},e.f[102]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(44);console.log("image service loaded");class l{constructor(e,t){this.src=void 0,this.previewLoading=!0,this.el={full:document.createElement("img"),preview:document.createElement("img")},setTimeout(()=>this.load(e,t),0)}load(e,t){let{preview:a,full:o}=this.el,i=a.src=e.replace(/^(.*)(\.jpg)$/,"$1,preview$2");a.onload=(()=>{this.previewLoading=!1,this.src=i,setTimeout(()=>{o.src=e,o.onload=(()=>{this.src=e})},10)})}}o.__decorate([i.observable,o.__metadata("design:type",Object)],l.prototype,"src",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],l.prototype,"previewLoading",void 0),o.__decorate([i.action,o.__metadata("design:type",Function),o.__metadata("design:paramtypes",[Object,Object]),o.__metadata("design:returntype",void 0)],l.prototype,"load",null),a.Image=l;class s{constructor(){this.images={},this.getImage=(e=>{return(this.images[e]||(this.images[e]=new l(e,this))).src})}unload(e){}get previewsLoading(){return Object.values(this.images).filter(e=>e.previewLoading).length}}o.__decorate([i.observable,o.__metadata("design:type",Object)],s.prototype,"images",void 0),o.__decorate([i.action,o.__metadata("design:type",Function),o.__metadata("design:paramtypes",[Object]),o.__metadata("design:returntype",void 0)],s.prototype,"unload",null),o.__decorate([i.computed,o.__metadata("design:type",Object),o.__metadata("design:paramtypes",[])],s.prototype,"previewsLoading",null),a.ImageService=s,a.default=new s},e.f[103]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(48),l=e.r(1),s=e.r(104);a.default=(e=>{var{children:t,className:a,back:n}=e,r=o.__rest(e,["children","className","back"]);return i.default.createElement("div",{className:l.default("page",a)},n&&i.default.createElement(s.default,Object.assign({},r)),t)})},e.f[104]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48);a.Back=(({history:e,location:t})=>o.default.createElement("div",{className:"back",onClick:e.goBack})),a.default=a.Back},e.f[105]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),l=e.r(101),s=e.r(106),n=e.r(103);a.Viewer=(({collection:e,user:t,match:a,history:i,location:r})=>{let{params:d}=a;e.slug||e.load(d.collection);let c=e.items.getById(d.id);return o.default.createElement(n.default,{back:!0,className:"viewer",history:i},o.default.createElement(l.default,{collection:a.params.collection,id:a.params.id,width:900}),c&&o.default.createElement(s.default,{image:c}))}),a.default=i.inject("collection","user")(i.observer(a.Viewer))},e.f[106]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),l=e.r(63),s=e.r(107);a.ImageDetails=(({app:e,image:t,editing:a})=>o.default.createElement("div",{className:"image-details"},e.editMode?o.default.createElement(s.default,{className:"h1 title",value:t.name,onChange:t.set("name"),placeholder:"Give the image a title"}):o.default.createElement("h1",null,t.name),e.editMode?o.default.createElement(s.default,{className:"story",value:t.story,onChange:t.set("story"),placeholder:"Tell the story"}):o.default.createElement("div",{className:"story"},l.default([t.story])),e.editMode&&t.isDirty?o.default.createElement("button",{className:"save",onClick:t.save},"Save Changes"):null)),a.default=i.inject("app")(i.observer(a.ImageDetails))},e.f[107]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(48),l=e.r(42),s=e.r(1),n=e.r(61);a.LiveEdit=(e=>{var{value:t,placeholder:a,onChange:l,className:r}=e,d=o.__rest(e,["value","placeholder","onChange","className"]);return i.default.createElement("div",{className:"input-group"},i.default.createElement(n.default,Object.assign({className:s.default("live-edit",r),type:"text",onChange:(e=>t=>e(t.target.value))(l),value:t,placeholder:a},d)),i.default.createElement("label",null,a))}),a.default=l.observer(a.LiveEdit)},e.f[108]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),l=e.r(103),s=e.r(109),n=e.r(110),r=e.r(111);a.LoginForm=(({user:e,location:t,history:a,signup:i=!1})=>{let{newCollection:d}=e;return o.default.createElement(l.default,{className:"form full-page user-login",back:!0,history:a},o.default.createElement(r.default,{value:e.credentials.email,onChange:t=>e.credentials.email=t,disabled:e.isValidating}),o.default.createElement(n.default,{value:e.credentials.password,onChange:t=>e.credentials.password=t,disabled:e.isValidating}),i&&o.default.createElement(n.default,{value:e.credentials.passwordConfirmation,onChange:t=>e.credentials.passwordConfirmation=t,placeholder:"password (confirmation)",disabled:e.isValidating}),i&&o.default.createElement(s.default,{placeholder:"Collection URL (link)",value:d.slug,onChange:d.setSlug,disabled:d.isValidating,invalid:!d.isAvailable,valid:d.isAvailable}),i&&o.default.createElement(s.default,{value:d.source.apiKey,onChange:e=>d.source.apiKey=e,id:"apiKey",placeholder:"Dropbox API Key",disabled:e.isValidating,autocapitalize:"none",required:!0}),o.default.createElement("div",{className:"error"},e.error),o.default.createElement("button",{onClick:()=>e.login(a,i),disabled:e.isValidating},i?"Sign Up":"Login"))}),a.default=i.inject("user")(i.observer(a.LoginForm))},e.f[109]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(48),l=e.r(42),s=e.r(1);a.Input=(e=>{var{value:t,placeholder:a,onChange:l,className:n}=e,r=o.__rest(e,["value","placeholder","onChange","className"]);return i.default.createElement("div",{className:"input-group"},i.default.createElement("input",Object.assign({autocomplete:!0,className:s.default("input",n),type:"text",onChange:(e=>t=>e(t.target.value))(l),value:t,placeholder:a},r)),a?i.default.createElement("label",null,a):null)}),a.default=l.observer(a.Input)},e.f[110]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(109);a.default=function(e){return o.default.createElement(i.default,Object.assign({placeholder:"password",pattern:"(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}",type:"password",autocapitalize:"none",required:!0},e))}},e.f[111]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(109);a.default=function(e){return o.default.createElement(i.default,Object.assign({className:"email",placeholder:"email address",pattern:".+@.{2,}\\..{2,}",autocapitalize:"none",required:!0},e))}},e.f[112]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(48),l=e.r(42),s=e.r(103),n=e.r(109);class r extends i.default.Component{constructor(){super(...arguments),this.submit=(()=>o.__awaiter(this,void 0,void 0,function*(){let{user:e,history:t}=this.props,a=yield e.createCollection();t.push("/"+a.slug)}))}render(){let{user:e,location:t,history:a,signup:o=!1}=this.props;const{newCollection:l}=e;return i.default.createElement(s.default,{back:!0,history:a},i.default.createElement("div",{className:"form full-page create-collection"},i.default.createElement(n.default,{placeholder:"Collection Name",value:l.name,onChange:e=>l.name=e,disabled:l.isPending}),i.default.createElement(n.default,{placeholder:"Collection URL (link)",value:l.slug,onChange:l.setSlug,disabled:l.isPending,invalid:!l.isAvailable,valid:l.isAvailable}),i.default.createElement(n.default,{placeholder:"API Key (Dropbox)",value:l.source.apiKey,onChange:e=>l.source.apiKey=e,disabled:l.isPending,invalid:!l.isAvailable,valid:l.isAvailable}),i.default.createElement("div",{className:"error"},e.error),i.default.createElement("button",{onClick:this.submit,disabled:l.isPending},"Create")))}}a.CreateForm=r,a.default=l.inject("user")(l.observer(r))},e.f[113]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),l=e.r(114),s=e.r(115),n=e.r(116),r=e.r(117);a.UserActions=(({user:e,location:t})=>["/login","/signup"].includes(t.pathname)?null:o.default.createElement("div",{className:"user-actions"},e.isLoggedIn&&o.default.createElement(r.default,{collections:e.collections}),o.default.createElement("div",{className:"login-signup"},o.default.createElement(s.default,null),o.default.createElement(n.default,null)),o.default.createElement(l.default,null))),a.default=i.inject("user")(i.observer(a.UserActions))},e.f[114]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),l=e.r(1);a.default=i.inject("app","user")(i.observer(({app:e,user:t})=>t.isLoggedIn?o.default.createElement("div",{className:l.default("toggle","edit",e.editMode&&"active"),onClick:e.toggleEdit},e.editMode?"editing":"locked"):null))},e.f[115]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),l=e.r(64);a.LoginLogoutLink=(({user:e})=>e.isLoggedIn&&e.profile?o.default.createElement("a",{className:"link login-logout",onClick:e.logout},"Logout",o.default.createElement("span",{className:"hide-mobile"},"(",e.profile.email.replace(/@.*/gi,""),")")):o.default.createElement(l.NavLink,{className:"login-logout",to:"/login"},"Login")),a.default=i.inject("user")(i.observer(a.LoginLogoutLink))},e.f[116]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),l=e.r(64);a.SignupLink=(({user:e})=>e.isLoggedIn?null:o.default.createElement(l.NavLink,{className:"signup",to:"/signup"},"Sign Up")),a.default=i.inject("user")(i.observer(a.SignupLink))},e.f[117]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),l=e.r(64);a.CollectionsNav=(({collections:e})=>o.default.createElement("div",{className:"collections"},o.default.createElement("h1",null,"My Collections"),o.default.createElement("nav",{className:"horizontal"},e.map(e=>o.default.createElement(l.NavLink,{key:e._id,className:"collection",to:`/${e.slug}`},e.name||e.slug)),o.default.createElement(l.NavLink,{className:"create",to:"/collections/create"},"Create New")))),a.default=i.observer(a.CollectionsNav)},e.f[118]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(119),i=e.r(120),l=e.r(123),s=e.r(124),n=e.r(125),r=e.r(126);let d={app:o.default,images:i.default,routing:l.default,scroll:new s.default,user:new n.default,collection:new r.default};a.default=d},e.f[119]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(44);class l{constructor(){this.editMode=!1,this.toggleMode=(e=>this[`${e}Mode`]=!this[`${e}Mode`]),this.toggleEdit=(()=>this.toggleMode("edit")),i.reaction(()=>this.editMode,e=>setTimeout(()=>document.body.scrollTo(0,99999),0))}}o.__decorate([i.observable,o.__metadata("design:type",Object)],l.prototype,"editMode",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],l.prototype,"toggleMode",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],l.prototype,"toggleEdit",void 0),a.AppState=l,a.default=window.images=new l},e.f[120]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(121);a.default=window.images=new o.default},e.f[121]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(44),l=e.r(122),s=(e,t)=>e.dateCreated<t.dateCreated?1:e.dateCreated>t.dateCreated?-1:0;class n{constructor(e=[],t){this.items=[],this.enabled=!1,this.getById=(e=>this.items.slice().find(t=>t.id===e)),this.toggle=(()=>this.enabled=!this.enabled),this.viewImage=(e=>this.items.forEach(t=>{t.viewing=t.image_id===e})),this.items=e.map(e=>new l.default(e,t))}get length(){return this.items.length}map(...e){return this.items.map(...e)}get sorted(){return this.items.slice().sort(s)}get viewingImage(){return this.items.find(e=>e.viewing)}}o.__decorate([i.observable,o.__metadata("design:type",Object)],n.prototype,"items",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],n.prototype,"enabled",void 0),o.__decorate([i.computed,o.__metadata("design:type",Object),o.__metadata("design:paramtypes",[])],n.prototype,"length",null),o.__decorate([i.computed,o.__metadata("design:type",Object),o.__metadata("design:paramtypes",[])],n.prototype,"sorted",null),o.__decorate([i.computed,o.__metadata("design:type",Object),o.__metadata("design:paramtypes",[])],n.prototype,"viewingImage",null),o.__decorate([i.action,o.__metadata("design:type",Object)],n.prototype,"toggle",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],n.prototype,"viewImage",void 0),a.default=n},e.f[122]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(44);class l{constructor(e,t){this.name="",this.story="",this.viewing=!1,this.isDirty=!1,this.set=(e=>t=>{this[e]=t,this.isDirty=!0}),this.save=(()=>{fetch(`/api/collections/${this.collectionSlug}/items/${this.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.saveable)}).then(e=>e.json()).catch(e=>console.warn(e)),this.isDirty=!1}),Object.assign(this,e),this.date=new Date(this.date),this.collectionSlug=t}get saveable(){return{name:this.name,story:this.story}}}o.__decorate([i.observable,o.__metadata("design:type",Object)],l.prototype,"name",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],l.prototype,"story",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],l.prototype,"viewing",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],l.prototype,"isDirty",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],l.prototype,"set",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],l.prototype,"save",void 0),o.__decorate([i.computed,o.__metadata("design:type",Object),o.__metadata("design:paramtypes",[])],l.prototype,"saveable",null),a.default=l},e.f[123]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(29),i=e.r(43),l=e.r(43);a.routing=new l.RouterStore,a.browserHistory=o.default(),a.history=i.syncHistoryWithStore(a.browserHistory,a.routing)},e.f[124]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(44);class l{constructor(){this.x=0,this.y=0,this.isTracking=!1,this.save=(()=>{var e=document.documentElement,t=(window.pageYOffset||e.scrollTop)-(e.clientTop||0);this.y=t}),this.restore=((e=10)=>{setTimeout(()=>window.scrollTo(this.x,this.y),e)}),i.reaction(()=>this.isTracking,e=>{e?setTimeout(()=>window.addEventListener("scroll",this.save),10):window.removeEventListener("scroll",this.save)})}}o.__decorate([i.observable,o.__metadata("design:type",Object)],l.prototype,"x",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],l.prototype,"y",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],l.prototype,"isTracking",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],l.prototype,"save",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],l.prototype,"restore",void 0),a.default=l},e.f[125]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(44),l=e.r(126),s=e=>({409:"Looks like you already exist here.  Who knew?",401:"The email address or password you provided were not found in our system.  Try again?"})[e]||"Oops! Something went wrong!";class n{constructor(){this.isLoggedIn=!1,this.isValidating=!1,this.error=void 0,this.statusCode=void 0,this.profile=void 0,this.collections=[],this.credentials={email:void 0,password:void 0},this.newCollection=new l.default,this.login=((e,t=!1)=>o.__awaiter(this,void 0,void 0,function*(){let{email:a,password:o,passwordConfirmation:l,apiKey:n}=this.credentials,{isAvailable:r,source:d,slug:c}=this.newCollection;if(!a||!o)return this.error="You probably need both an email address and password to get through this...";if(t&&o!==l)return this.error="Are you sure you typed your passwords correctly?  They don't match!";if(t&&(!c||""===c))return this.error="You'll need a collection name to get started here.  That's what the site is all about!";if(t&&!r)return this.error="That collection name has already been taken.  Try something different!";if(t&&!d.apiKey)return this.error="You'll need to tell us where to get those images from.  Add an API key!";this.isValidating=!0,this.error=void 0;let u=yield fetch(`/user/${t?"signup":"login"}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i.toJS(this.credentials))}).then(e=>(this.statusCode=e.status,e.json())).catch(()=>{});u?(this.initialize(u),t&&this.newCollection.isAvailable&&this.createCollection(),e.push("/")):this.error=s(this.statusCode),this.isValidating=!1})),this.save=(()=>o.__awaiter(this,void 0,void 0,function*(){})),this.initialize=((e={})=>o.__awaiter(this,void 0,void 0,function*(){console.log("initialize",e),this.collections=e.collections.map(e=>new l.default(e)),delete e.collections,this.profile=e,this.isLoggedIn=!0})),this.logout=(()=>o.__awaiter(this,void 0,void 0,function*(){console.log("logging user out...");let e=yield fetch("/user/logout").then(e=>200===e.status).catch(e=>console.warn(e));console.log("logoutSuccess",e),e&&(console.log("inside logoutSuccess",this),this.isLoggedIn=!1,this.profile=void 0,this.collections=[])})),this.createCollection=(e=>o.__awaiter(this,void 0,void 0,function*(){e&&(this.newCollection=new l.default,this.newCollection.slug=e);let t=yield this.newCollection.save();return t&&(this.collections.push(t),this.newCollection=new l.default),t})),this.getProfile=(()=>o.__awaiter(this,void 0,void 0,function*(){return yield fetch("/user/profile").then(e=>e.json()).then(e=>this.initialize(e)).catch(e=>console.log("user not logged in..."))})),this.getProfile(),i.reaction(()=>this.isLoggedIn,e=>console.log("logged in?",e))}get json(){return{profile:i.toJS(this.profile),collections:i.toJS(this.collections)}}}o.__decorate([i.observable,o.__metadata("design:type",Object)],n.prototype,"isLoggedIn",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],n.prototype,"isValidating",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],n.prototype,"error",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],n.prototype,"statusCode",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],n.prototype,"profile",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],n.prototype,"collections",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],n.prototype,"credentials",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],n.prototype,"newCollection",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],n.prototype,"login",void 0),o.__decorate([i.computed,o.__metadata("design:type",Object),o.__metadata("design:paramtypes",[])],n.prototype,"json",null),o.__decorate([i.action,o.__metadata("design:type",Object)],n.prototype,"save",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],n.prototype,"initialize",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],n.prototype,"logout",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],n.prototype,"createCollection",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],n.prototype,"getProfile",void 0),a.default=n},e.f[126]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(44),l=e.r(127),s=e.r(121),n=e=>({409:"Looks like you already exist here.  Who knew?",401:"The email address or password you provided were not found in our system.  Try again?"})[e]||"Oops! Something went wrong!";class r{constructor(e){this.name=void 0,this.description=void 0,this.slug=void 0,this.owner=void 0,this.items=new s.default,this.source=new l.default,this.isAvailable=!1,this.isPending=!1,this.checkAvailability=!0,this.setSlug=(e=>{this.slug=e.toLowerCase().replace(/[^\w\.\-_]/gi,"-").replace(/\-+/gi,"-")}),this.initialize(e)}get saveable(){let{name:e,description:t,slug:a,source:o}=this;return{name:e,description:t,slug:a,source:o}}get json(){return i.toJS(this)}handeStatus(e){return this.error=200===e.code?void 0:n(e.code),e}remove(){return o.__awaiter(this,void 0,void 0,function*(){if(!this.slug)return console.warn("a collection must have a name to be deleted");this.isPending=!0;let e=yield fetch(`/api/collections/${this.slug}`,{method:"DELETE"}).then(e=>(this.statusCode=e.status,e.json())).catch(()=>{});this.isPending=!1,e?(console.log("collection deletion success",e),this.isLoggedIn=!0):this.error=n(this.statusCode)})}save(){return o.__awaiter(this,void 0,void 0,function*(){if(!this.slug||""===this.slug)return console.warn("a collection must have a name before saving");this.isPending=!0;let e=yield fetch(`/api/collections${this._id?"/"+this.slug:""}`,{method:this._id?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i.toJS(this.saveable))}).then(e=>(this.statusCode=e.status,e.json())).catch(()=>{});return this.isPending=!1,e?(console.log("collection creation success",e),this.isLoggedIn=!0):this.error=n(this.statusCode),this})}load(e){return o.__awaiter(this,void 0,void 0,function*(){return console.log("loading collection",e,this.slug),e?(this.checkAvailability=!1,this.isPending=!0,yield fetch(`/api/collections/${e}`).then(e=>e.json()).then(e=>this.initialize(e)).catch(e=>console.error(e)),this.isPending=!1,this.checkAvailability=!0,this):console.warn("collection.load(slug) requires a slug or this.slug to be set")})}initialize(e={}){console.log("creating new collection from",e),window.collection=this;let{_id:t,name:a,description:n,slug:r,source:d,dateCreated:c,dateModified:u,items:p}=e;Object.assign(this,{_id:t,name:a,description:n,slug:r,dateCreated:new Date(c),dateModified:new Date(u),source:new l.default(d)}),this.items=new s.default(p,this.slug),i.reaction(()=>this.slug,e=>o.__awaiter(this,void 0,void 0,function*(){this.checkAvailability&&e&&e.length>2?yield fetch(`/api/collections/${this.slug}/available`).then(e=>this.isAvailable=200===e.status).catch(()=>{}):this.isAvailable=!1,console.log("collection",this.slug,"available?",this.isAvailable)}))}}o.__decorate([i.observable,o.__metadata("design:type",Object)],r.prototype,"name",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],r.prototype,"description",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],r.prototype,"slug",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],r.prototype,"owner",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],r.prototype,"items",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],r.prototype,"source",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],r.prototype,"isAvailable",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],r.prototype,"isPending",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],r.prototype,"checkAvailability",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],r.prototype,"setSlug",void 0),o.__decorate([i.computed,o.__metadata("design:type",Object),o.__metadata("design:paramtypes",[])],r.prototype,"saveable",null),o.__decorate([i.computed,o.__metadata("design:type",Object),o.__metadata("design:paramtypes",[])],r.prototype,"json",null),o.__decorate([i.action,o.__metadata("design:type",Function),o.__metadata("design:paramtypes",[Object]),o.__metadata("design:returntype",void 0)],r.prototype,"handeStatus",null),o.__decorate([i.action,o.__metadata("design:type",Function),o.__metadata("design:paramtypes",[]),o.__metadata("design:returntype",Promise)],r.prototype,"remove",null),o.__decorate([i.action,o.__metadata("design:type",Function),o.__metadata("design:paramtypes",[]),o.__metadata("design:returntype",Promise)],r.prototype,"save",null),o.__decorate([i.action,o.__metadata("design:type",Function),o.__metadata("design:paramtypes",[Object]),o.__metadata("design:returntype",Promise)],r.prototype,"load",null),o.__decorate([i.action,o.__metadata("design:type",Function),o.__metadata("design:paramtypes",[Object]),o.__metadata("design:returntype",void 0)],r.prototype,"initialize",null),a.default=r},e.f[127]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(44);class l{constructor(e){this.service="dropbox",this.apiKey=void 0,Object.assign(this,e)}}o.__decorate([i.observable,o.__metadata("design:type",Object)],l.prototype,"service",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],l.prototype,"apiKey",void 0),a.default=l},e.f[128]=function(){!function(e){console.log("zoomfix loaded");var t=navigator.userAgent;if(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(t)&&t.indexOf("AppleWebKit")>-1){var a=e.document;if(a.querySelector){var o,i,l,s,n=a.querySelector("meta[name=viewport]"),r=n&&n.getAttribute("content"),d=r+",maximum-scale=1",c=r+",maximum-scale=10",u=!0;n&&(e.addEventListener("orientationchange",p,!1),e.addEventListener("devicemotion",function(t){s=t.accelerationIncludingGravity,o=Math.abs(s.x),i=Math.abs(s.y),l=Math.abs(s.z),e.orientation&&180!==e.orientation||!(o>7||(l>6&&i<8||l<8&&i>6)&&o>5)?u||p():u&&(n.setAttribute("content",d),u=!1)},!1))}}function p(){n.setAttribute("content",c),u=!0}}(this)},e.r(96)}($fsx);