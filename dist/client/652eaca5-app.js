!function(){if(!window.$fsx){var e=window.$fsx={};e.f={},e.m={},e.r=function(t){var a=e.m[t];if(a)return a.m.exports;var o,i=e.f[t];return i?((a=e.m[t]={}).exports={},a.m={exports:a.exports},i.call(a.exports,a.m,a.exports),null===(o=a.m.exports)||-1===["function","object","array"].indexOf(typeof o)||o.hasOwnProperty("default")||(Object.isFrozen(o)?o.default=o:Object.defineProperty(o,"default",{value:o,writable:!0,enumerable:!1})),a.m.exports):void 0}}}(),function(e){e.f[96]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),r=e.r(97),n=e.r(113),s=e.r(116);e.r(119),e.r(120),o.render(o.default.createElement(i.Provider,Object.assign({},n.default),o.default.createElement(r.default,{history:s.history})),document.getElementById("app"))},e.f[97]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(64),r=e.r(98),n=e.r(103),s=e.r(106),l=e.r(108),d=e.r(109);a.default=(({history:e})=>o.default.createElement(i.Router,{history:e},o.default.createElement(i.Route,{render:({location:e,history:t})=>o.default.createElement("div",{className:"page-content"},o.default.createElement(l.default,{history:t,location:e}),o.default.createElement(i.Switch,null,o.default.createElement(i.Route,{path:"/login",render:({location:e,history:t})=>o.default.createElement(s.default,{location:e,history:t})}),o.default.createElement(i.Route,{path:"/signup",render:({location:e,history:t})=>o.default.createElement(s.default,{location:e,history:t,signup:!0})}),o.default.createElement(i.Route,{path:"/view/:id",render:({location:e,history:t,match:a})=>o.default.createElement(n.default,{location:e,history:t,match:a})}),o.default.createElement(i.Route,{path:"/",render:({location:e,history:t})=>o.default.createElement(r.default,{location:e,history:t})})),o.default.createElement(d.default,{history:t,location:e}))})))},e.f[98]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),r=e.r(99);class n extends o.Component{componentWillUnmount(){this.props.scroll.isTracking=!1,window.scrollTo(0,0)}componentDidMount(){this.props.scroll.restore(),this.props.scroll.isTracking=!0}render(){let{images:e}=this.props;return o.default.createElement(o.default.Fragment,null,o.default.createElement(r.default,{items:e.itemsSorted,location:location,history:history}))}}a.ImageCollection=n,a.default=i.inject("images","scroll")(i.observer(n))},e.f[99]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),r=e.r(100);a.Grid=(({items:e})=>o.default.createElement("div",{className:"grid"},e.map((e,t)=>o.default.createElement(r.default,{key:e.id,item:e})))),a.default=i.observer(a.Grid)},e.f[100]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),r=e.r(101),n=e.r(64);a.GridItem=(({app:e,item:t})=>o.default.createElement("article",null,o.default.createElement(n.NavLink,{to:`/view/${t.id}`},o.default.createElement(r.default,{id:t.id,width:400,height:400}),o.default.createElement("label",null,o.default.createElement("span",null,t.name))))),a.default=i.inject("app")(i.observer(a.GridItem))},e.f[101]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(48),r=e.r(102),n=e.r(42);let s=class extends i.Component{componentWillMount(){let{width:e,height:t,quality:a,id:o}=this.props,i=[];e&&i.push(`width=${e}`),t&&i.push(`height=${t}`),a&&i.push(`quality=${a}`),this.path=`/i/${o}::${i.join(",")}.jpg`}componentWillUnmount(){r.default.unload(this.path)}render(){let e=r.default.getImage(this.path);return e?i.default.createElement("img",{src:e}):i.default.createElement("div",{className:"loading"})}};s=o.__decorate([n.observer],s),a.default=s},e.f[102]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(44);console.log("image service loaded");class r{constructor(e,t){this.src=void 0,this.previewLoading=!0,this.el={full:document.createElement("img"),preview:document.createElement("img")},setTimeout(()=>this.load(e,t),0)}load(e,t){let{preview:a,full:o}=this.el,i=a.src=e.replace(/^(.*)(\.jpg)$/,"$1,preview$2");a.onload=(()=>{this.previewLoading=!1,this.src=i,setTimeout(()=>{o.src=e,o.onload=(()=>{this.src=e})},10)})}}o.__decorate([i.observable,o.__metadata("design:type",Object)],r.prototype,"src",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],r.prototype,"previewLoading",void 0),o.__decorate([i.action,o.__metadata("design:type",Function),o.__metadata("design:paramtypes",[Object,Object]),o.__metadata("design:returntype",void 0)],r.prototype,"load",null),a.Image=r;class n{constructor(){this.images={},this.getImage=(e=>{return(this.images[e]||(this.images[e]=new r(e,this))).src})}unload(e){}get previewsLoading(){return Object.values(this.images).filter(e=>e.previewLoading).length}}o.__decorate([i.observable,o.__metadata("design:type",Object)],n.prototype,"images",void 0),o.__decorate([i.action,o.__metadata("design:type",Function),o.__metadata("design:paramtypes",[Object]),o.__metadata("design:returntype",void 0)],n.prototype,"unload",null),o.__decorate([i.computed,o.__metadata("design:type",Object),o.__metadata("design:paramtypes",[])],n.prototype,"previewsLoading",null),a.ImageService=n,a.default=new n},e.f[103]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),r=e.r(101),n=e.r(104);a.Viewer=(({images:e,user:t,match:a,history:i,location:s})=>{let l=e.getById(a.params.id);return o.default.createElement("div",{className:"viewer"},o.default.createElement(r.default,{id:a.params.id,width:900}),l&&o.default.createElement(n.default,{image:l}))}),a.default=i.inject("images","user")(i.observer(a.Viewer))},e.f[104]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),r=e.r(63),n=e.r(105);a.ImageDetails=(({app:e,image:t,editing:a})=>o.default.createElement("div",{className:"image-details"},e.editMode?o.default.createElement(n.default,{className:"h1 title",value:t.name,onChange:t.set("name"),placeholder:"Give the image a title"}):o.default.createElement("h1",null,t.name),e.editMode?o.default.createElement(n.default,{className:"story",value:t.story,onChange:t.set("story"),placeholder:"Tell the story"}):o.default.createElement("div",{className:"story"},r.default([t.story])),e.editMode&&t.isDirty?o.default.createElement("button",{className:"save",onClick:t.save},"Save Changes"):null)),a.default=i.inject("app")(i.observer(a.ImageDetails))},e.f[105]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(48),r=e.r(42),n=e.r(1),s=e.r(61);a.LiveEdit=(e=>{var{value:t,placeholder:a,onChange:r,className:l}=e,d=o.__rest(e,["value","placeholder","onChange","className"]);return i.default.createElement("div",{className:"input-group"},i.default.createElement(s.default,Object.assign({className:n.default("live-edit",l),type:"text",onChange:(e=>t=>e(t.target.value))(r),value:t,placeholder:a},d)),i.default.createElement("label",null,a))}),a.default=r.observer(a.LiveEdit)},e.f[106]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),r=e.r(107);a.LoginForm=(({user:e,location:t,history:a,signup:i=!1})=>o.default.createElement("div",{className:"form full-page user-login"},o.default.createElement(r.default,{value:e.credentials.email,onChange:t=>e.credentials.email=t,className:"email",placeholder:"email address",pattern:".+@.{2,}\\..{2,}",disabled:e.isValidating,autocapitalize:"none",required:!0}),o.default.createElement(r.default,{value:e.credentials.password,onChange:t=>e.credentials.password=t,placeholder:"password",pattern:"(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}",type:"password",disabled:e.isValidating,autocapitalize:"none",required:!0}),i?o.default.createElement(r.default,{value:e.credentials.passwordConfirmation,onChange:t=>e.credentials.passwordConfirmation=t,placeholder:"password (confirmation)",type:"password",disabled:e.isValidating,autocapitalize:"none",required:!0}):null,i?o.default.createElement(r.default,{value:e.credentials.apiKey,onChange:t=>e.credentials.apiKey=t,id:"apiKey",placeholder:"Dropbox API Key",disabled:e.isValidating,autocapitalize:"none",required:!0}):null,o.default.createElement("div",{className:"error"},e.error),o.default.createElement("button",{onClick:()=>e.login(a,i),disabled:e.isValidating},i?"Sign Up":"Login"))),a.default=i.inject("user")(i.observer(a.LoginForm))},e.f[107]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(48),r=e.r(42),n=e.r(1);a.Input=(e=>{var{value:t,placeholder:a,onChange:r,className:s}=e,l=o.__rest(e,["value","placeholder","onChange","className"]);return i.default.createElement("div",{className:"input-group"},i.default.createElement("input",Object.assign({className:n.default("input",s),type:"text",onChange:(e=>t=>e(t.target.value))(r),value:t,placeholder:a},l)),a?i.default.createElement("label",null,a):null)}),a.default=r.observer(a.Input)},e.f[108]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48);a.Back=(({history:e,location:t})=>"/"!==t.pathname&&o.default.createElement("div",{className:"back",onClick:e.goBack})),a.default=a.Back},e.f[109]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),r=e.r(110),n=e.r(111),s=e.r(112);a.UserActions=(({location:e})=>["/login","/signup"].includes(e.pathname)?null:o.default.createElement("div",{className:"user-actions"},o.default.createElement("div",{className:"login-signup"},o.default.createElement(n.default,null),o.default.createElement(s.default,null)),o.default.createElement(r.default,null))),a.default=i.observer(a.UserActions)},e.f[110]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),r=e.r(1);a.default=i.inject("app","user")(i.observer(({app:e,user:t})=>t.isLoggedIn?o.default.createElement("div",{className:r.default("toggle","edit",e.editMode&&"active"),onClick:e.toggleEdit},e.editMode?"editing":"locked"):null))},e.f[111]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),r=e.r(64);a.LoginLogoutLink=(({user:e})=>e.isLoggedIn&&e.profile?o.default.createElement("a",{className:"link login-logout",onClick:e.logout},"Logout ",o.default.createElement("span",{className:"hide-mobile"},"(",e.profile.email)):o.default.createElement(r.NavLink,{className:"login-logout",to:"/login"},"Login")),a.default=i.inject("user")(i.observer(a.LoginLogoutLink))},e.f[112]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(48),i=e.r(42),r=e.r(64);a.SignupLink=(({user:e})=>e.isLoggedIn?null:o.default.createElement(r.NavLink,{className:"signup",to:"/signup"},"Sign Up")),a.default=i.inject("user")(i.observer(a.SignupLink))},e.f[113]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(114),i=e.r(115),r=e.r(116),n=e.r(117),s=e.r(118);let l={app:o.default,images:i.default,routing:r.default,scroll:n.default,user:s.default};a.default=l},e.f[114]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(44);class r{constructor(){this.editMode=!1,this.toggleMode=(e=>this[`${e}Mode`]=!this[`${e}Mode`]),this.toggleEdit=(()=>this.toggleMode("edit")),i.reaction(()=>this.editMode,e=>setTimeout(()=>document.body.scrollTo(0,99999),0))}}o.__decorate([i.observable,o.__metadata("design:type",Object)],r.prototype,"editMode",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],r.prototype,"toggleMode",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],r.prototype,"toggleEdit",void 0),a.AppState=r,a.default=window.images=new r},e.f[115]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(44),r=(e,t)=>e.date<t.date?1:e.date>t.date?-1:0;class n{constructor(e){this.name="",this.story="",this.viewing=!1,this.isDirty=!1,this.set=(e=>t=>{this[e]=t,this.isDirty=!0}),this.save=(()=>{fetch(`/api/images/${this.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.saveable)}).then(e=>e.json()).catch(e=>console.warn(e)),this.isDirty=!1}),Object.assign(this,e),this.date=new Date(this.date)}get saveable(){return{name:this.name,story:this.story,dateModified:new Date}}}o.__decorate([i.observable,o.__metadata("design:type",Object)],n.prototype,"name",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],n.prototype,"story",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],n.prototype,"viewing",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],n.prototype,"isDirty",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],n.prototype,"set",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],n.prototype,"save",void 0),o.__decorate([i.computed,o.__metadata("design:type",Object),o.__metadata("design:paramtypes",[])],n.prototype,"saveable",null),a.ImageItem=n;class s{constructor(){this.items=[],this.enabled=!1,this.getById=(e=>this.items.slice().find(t=>t.id===e)),this.toggle=(()=>this.enabled=!this.enabled),this.viewImage=(e=>this.items.forEach(t=>{t.viewing=t.image_id===e})),this.add=(e=>this.items.push(new n(e))),fetch("/api/images").then(e=>e.json()).then(e=>e.filter(e=>"file"===e.type)).then(e=>e.forEach(this.add)).catch(e=>console.warn(e))}get itemsSorted(){return this.items.slice().sort(r)}get viewingImage(){return this.items.find(e=>e.viewing)}}o.__decorate([i.observable,o.__metadata("design:type",Object)],s.prototype,"items",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],s.prototype,"enabled",void 0),o.__decorate([i.computed,o.__metadata("design:type",Object),o.__metadata("design:paramtypes",[])],s.prototype,"itemsSorted",null),o.__decorate([i.computed,o.__metadata("design:type",Object),o.__metadata("design:paramtypes",[])],s.prototype,"viewingImage",null),o.__decorate([i.action,o.__metadata("design:type",Object)],s.prototype,"toggle",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],s.prototype,"viewImage",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],s.prototype,"add",void 0),a.ImageList=s,a.default=window.images=new s},e.f[116]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(32),i=e.r(43),r=e.r(43);a.routing=new r.RouterStore,a.browserHistory=o.default(),a.history=i.syncHistoryWithStore(a.browserHistory,a.routing)},e.f[117]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(44);class r{constructor(){this.x=0,this.y=0,this.isTracking=!1,this.save=(()=>{var e=document.documentElement,t=(window.pageYOffset||e.scrollTop)-(e.clientTop||0);this.y=t}),this.restore=((e=10)=>{setTimeout(()=>window.scrollTo(this.x,this.y),e)}),i.reaction(()=>this.isTracking,e=>{e?setTimeout(()=>window.addEventListener("scroll",this.save),10):window.removeEventListener("scroll",this.save)})}}o.__decorate([i.observable,o.__metadata("design:type",Object)],r.prototype,"x",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],r.prototype,"y",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],r.prototype,"isTracking",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],r.prototype,"save",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],r.prototype,"restore",void 0),a.Scroller=r,a.default=window.scroll=new r},e.f[118]=function(t,a){Object.defineProperty(a,"__esModule",{value:!0});const o=e.r(91),i=e.r(44),r=e=>({409:"Looks like you already exist here.  Who knew?",401:"The email address or password you provided were not found in our system.  Try again?"})[e]||"Oops! Something went wrong!";class n{constructor(){this.isLoggedIn=!1,this.isValidating=!1,this.error=void 0,this.statusCode=void 0,this.profile=void 0,this.credentials={email:void 0,password:void 0},this.login=((e,t=!1)=>o.__awaiter(this,void 0,void 0,function*(){let{email:a,password:o,passwordConfirmation:n,apiKey:s}=this.credentials;return a&&o?t&&o!==n?this.error="Are you sure you typed your passwords correctly?  They don't match!":(this.isValidating=!0,this.error=void 0,this.profile=yield fetch(`/user/${t?"signup":"login"}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i.toJS(this.credentials))}).then(e=>(this.statusCode=e.status,e.json())).catch(()=>{}),this.profile?(console.log("user",this.profile.email,"logged in"),this.isLoggedIn=!0,e.push("/")):this.error=r(this.statusCode),void(this.isValidating=!1)):this.error="You probably need both an email address and password to get through this..."})),this.logout=(()=>o.__awaiter(this,void 0,void 0,function*(){console.log("logging user out...");yield fetch("/user/logout").then(()=>{console.log("user logged out"),this.isLoggedIn=!1,this.profile=void 0}).catch(e=>console.warn(e))})),this.getProfile=(()=>o.__awaiter(this,void 0,void 0,function*(){return yield fetch("/user/profile").then(e=>e.json()).then(e=>{console.log("logged in as",e),this.profile=e,this.isLoggedIn=!0}).catch(e=>console.log("user not logged in..."))})),this.getProfile()}}o.__decorate([i.observable,o.__metadata("design:type",Object)],n.prototype,"isLoggedIn",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],n.prototype,"isValidating",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],n.prototype,"error",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],n.prototype,"statusCode",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],n.prototype,"profile",void 0),o.__decorate([i.observable,o.__metadata("design:type",Object)],n.prototype,"credentials",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],n.prototype,"login",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],n.prototype,"logout",void 0),o.__decorate([i.action,o.__metadata("design:type",Object)],n.prototype,"getProfile",void 0),a.UserState=n,a.default=window.images=new n},e.f[119]=function(){!function(e){console.log("zoomfix loaded");var t=navigator.userAgent;if(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(t)&&t.indexOf("AppleWebKit")>-1){var a=e.document;if(a.querySelector){var o,i,r,n,s=a.querySelector("meta[name=viewport]"),l=s&&s.getAttribute("content"),d=l+",maximum-scale=1",c=l+",maximum-scale=10",u=!0;s&&(e.addEventListener("orientationchange",p,!1),e.addEventListener("devicemotion",function(t){n=t.accelerationIncludingGravity,o=Math.abs(n.x),i=Math.abs(n.y),r=Math.abs(n.z),e.orientation&&180!==e.orientation||!(o>7||(r>6&&i<8||r<8&&i>6)&&o>5)?u||p():u&&(s.setAttribute("content",d),u=!1)},!1))}}function p(){s.setAttribute("content",c),u=!0}}(this)},e.r(96)}($fsx);