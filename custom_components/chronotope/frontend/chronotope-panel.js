var rr=Object.create;var Mi=Object.defineProperty;var ar=Object.getOwnPropertyDescriptor;var lr=Object.getOwnPropertyNames;var hr=Object.getPrototypeOf,ur=Object.prototype.hasOwnProperty;var cr=(h,s,a)=>s in h?Mi(h,s,{enumerable:!0,configurable:!0,writable:!0,value:a}):h[s]=a;var dr=(h,s)=>()=>(s||h((s={exports:{}}).exports,s),s.exports);var fr=(h,s,a,u)=>{if(s&&typeof s=="object"||typeof s=="function")for(let d of lr(s))!ur.call(h,d)&&d!==a&&Mi(h,d,{get:()=>s[d],enumerable:!(u=ar(s,d))||u.enumerable});return h};var pr=(h,s,a)=>(a=h!=null?rr(hr(h)):{},fr(s||!h||!h.__esModule?Mi(a,"default",{value:h,enumerable:!0}):a,h));var rt=(h,s,a)=>cr(h,typeof s!="symbol"?s+"":s,a);var Lo=dr((Ve,Po)=>{(function(h,s){typeof Ve=="object"&&typeof Po<"u"?s(Ve):typeof define=="function"&&define.amd?define(["exports"],s):(h=typeof globalThis<"u"?globalThis:h||self,s(h.leaflet={}))})(Ve,function(h){"use strict";var s="1.9.4";function a(t){var e,i,n,o;for(i=1,n=arguments.length;i<n;i++){o=arguments[i];for(e in o)t[e]=o[e]}return t}var u=Object.create||function(){function t(){}return function(e){return t.prototype=e,new t}}();function d(t,e){var i=Array.prototype.slice;if(t.bind)return t.bind.apply(t,i.call(arguments,1));var n=i.call(arguments,2);return function(){return t.apply(e,n.length?n.concat(i.call(arguments)):arguments)}}var m=0;function _(t){return"_leaflet_id"in t||(t._leaflet_id=++m),t._leaflet_id}function A(t,e,i){var n,o,r,l;return l=function(){n=!1,o&&(r.apply(i,o),o=!1)},r=function(){n?o=arguments:(t.apply(i,arguments),setTimeout(l,e),n=!0)},r}function P(t,e,i){var n=e[1],o=e[0],r=n-o;return t===n&&i?t:((t-o)%r+r)%r+o}function T(){return!1}function $(t,e){if(e===!1)return t;var i=Math.pow(10,e===void 0?6:e);return Math.round(t*i)/i}function O(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function G(t){return O(t).split(/\s+/)}function C(t,e){Object.prototype.hasOwnProperty.call(t,"options")||(t.options=t.options?u(t.options):{});for(var i in e)t.options[i]=e[i];return t.options}function St(t,e,i){var n=[];for(var o in t)n.push(encodeURIComponent(i?o.toUpperCase():o)+"="+encodeURIComponent(t[o]));return(!e||e.indexOf("?")===-1?"?":"&")+n.join("&")}var Oo=/\{ *([\w_ -]+) *\}/g;function Wi(t,e){return t.replace(Oo,function(i,n){var o=e[n];if(o===void 0)throw new Error("No value provided for variable "+i);return typeof o=="function"&&(o=o(e)),o})}var at=Array.isArray||function(t){return Object.prototype.toString.call(t)==="[object Array]"};function Ke(t,e){for(var i=0;i<t.length;i++)if(t[i]===e)return i;return-1}var be="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function je(t){return window["webkit"+t]||window["moz"+t]||window["ms"+t]}var Ui=0;function qi(t){var e=+new Date,i=Math.max(0,16-(e-Ui));return Ui=e+i,window.setTimeout(t,i)}var Ye=window.requestAnimationFrame||je("RequestAnimationFrame")||qi,Vi=window.cancelAnimationFrame||je("CancelAnimationFrame")||je("CancelRequestAnimationFrame")||function(t){window.clearTimeout(t)};function Y(t,e,i){if(i&&Ye===qi)t.call(e);else return Ye.call(window,d(t,e))}function it(t){t&&Vi.call(window,t)}var Io={__proto__:null,extend:a,create:u,bind:d,get lastId(){return m},stamp:_,throttle:A,wrapNum:P,falseFn:T,formatNum:$,trim:O,splitWords:G,setOptions:C,getParamString:St,template:Wi,isArray:at,indexOf:Ke,emptyImageUrl:be,requestFn:Ye,cancelFn:Vi,requestAnimFrame:Y,cancelAnimFrame:it};function _t(){}_t.extend=function(t){var e=function(){C(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},i=e.__super__=this.prototype,n=u(i);n.constructor=e,e.prototype=n;for(var o in this)Object.prototype.hasOwnProperty.call(this,o)&&o!=="prototype"&&o!=="__super__"&&(e[o]=this[o]);return t.statics&&a(e,t.statics),t.includes&&(Zo(t.includes),a.apply(null,[n].concat(t.includes))),a(n,t),delete n.statics,delete n.includes,n.options&&(n.options=i.options?u(i.options):{},a(n.options,t.options)),n._initHooks=[],n.callInitHooks=function(){if(!this._initHooksCalled){i.callInitHooks&&i.callInitHooks.call(this),this._initHooksCalled=!0;for(var r=0,l=n._initHooks.length;r<l;r++)n._initHooks[r].call(this)}},e},_t.include=function(t){var e=this.prototype.options;return a(this.prototype,t),t.options&&(this.prototype.options=e,this.mergeOptions(t.options)),this},_t.mergeOptions=function(t){return a(this.prototype.options,t),this},_t.addInitHook=function(t){var e=Array.prototype.slice.call(arguments,1),i=typeof t=="function"?t:function(){this[t].apply(this,e)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(i),this};function Zo(t){if(!(typeof L>"u"||!L||!L.Mixin)){t=at(t)?t:[t];for(var e=0;e<t.length;e++)t[e]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",new Error().stack)}}var et={on:function(t,e,i){if(typeof t=="object")for(var n in t)this._on(n,t[n],e);else{t=G(t);for(var o=0,r=t.length;o<r;o++)this._on(t[o],e,i)}return this},off:function(t,e,i){if(!arguments.length)delete this._events;else if(typeof t=="object")for(var n in t)this._off(n,t[n],e);else{t=G(t);for(var o=arguments.length===1,r=0,l=t.length;r<l;r++)o?this._off(t[r]):this._off(t[r],e,i)}return this},_on:function(t,e,i,n){if(typeof e!="function"){console.warn("wrong listener type: "+typeof e);return}if(this._listens(t,e,i)===!1){i===this&&(i=void 0);var o={fn:e,ctx:i};n&&(o.once=!0),this._events=this._events||{},this._events[t]=this._events[t]||[],this._events[t].push(o)}},_off:function(t,e,i){var n,o,r;if(this._events&&(n=this._events[t],!!n)){if(arguments.length===1){if(this._firingCount)for(o=0,r=n.length;o<r;o++)n[o].fn=T;delete this._events[t];return}if(typeof e!="function"){console.warn("wrong listener type: "+typeof e);return}var l=this._listens(t,e,i);if(l!==!1){var c=n[l];this._firingCount&&(c.fn=T,this._events[t]=n=n.slice()),n.splice(l,1)}}},fire:function(t,e,i){if(!this.listens(t,i))return this;var n=a({},e,{type:t,target:this,sourceTarget:e&&e.sourceTarget||this});if(this._events){var o=this._events[t];if(o){this._firingCount=this._firingCount+1||1;for(var r=0,l=o.length;r<l;r++){var c=o[r],f=c.fn;c.once&&this.off(t,f,c.ctx),f.call(c.ctx||this,n)}this._firingCount--}}return i&&this._propagateEvent(n),this},listens:function(t,e,i,n){typeof t!="string"&&console.warn('"string" type argument expected');var o=e;typeof e!="function"&&(n=!!e,o=void 0,i=void 0);var r=this._events&&this._events[t];if(r&&r.length&&this._listens(t,o,i)!==!1)return!0;if(n){for(var l in this._eventParents)if(this._eventParents[l].listens(t,e,i,n))return!0}return!1},_listens:function(t,e,i){if(!this._events)return!1;var n=this._events[t]||[];if(!e)return!!n.length;i===this&&(i=void 0);for(var o=0,r=n.length;o<r;o++)if(n[o].fn===e&&n[o].ctx===i)return o;return!1},once:function(t,e,i){if(typeof t=="object")for(var n in t)this._on(n,t[n],e,!0);else{t=G(t);for(var o=0,r=t.length;o<r;o++)this._on(t[o],e,i,!0)}return this},addEventParent:function(t){return this._eventParents=this._eventParents||{},this._eventParents[_(t)]=t,this},removeEventParent:function(t){return this._eventParents&&delete this._eventParents[_(t)],this},_propagateEvent:function(t){for(var e in this._eventParents)this._eventParents[e].fire(t.type,a({layer:t.target,propagatedFrom:t.target},t),!0)}};et.addEventListener=et.on,et.removeEventListener=et.clearAllEventListeners=et.off,et.addOneTimeEventListener=et.once,et.fireEvent=et.fire,et.hasEventListeners=et.listens;var Kt=_t.extend(et);function w(t,e,i){this.x=i?Math.round(t):t,this.y=i?Math.round(e):e}var Gi=Math.trunc||function(t){return t>0?Math.floor(t):Math.ceil(t)};w.prototype={clone:function(){return new w(this.x,this.y)},add:function(t){return this.clone()._add(x(t))},_add:function(t){return this.x+=t.x,this.y+=t.y,this},subtract:function(t){return this.clone()._subtract(x(t))},_subtract:function(t){return this.x-=t.x,this.y-=t.y,this},divideBy:function(t){return this.clone()._divideBy(t)},_divideBy:function(t){return this.x/=t,this.y/=t,this},multiplyBy:function(t){return this.clone()._multiplyBy(t)},_multiplyBy:function(t){return this.x*=t,this.y*=t,this},scaleBy:function(t){return new w(this.x*t.x,this.y*t.y)},unscaleBy:function(t){return new w(this.x/t.x,this.y/t.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=Gi(this.x),this.y=Gi(this.y),this},distanceTo:function(t){t=x(t);var e=t.x-this.x,i=t.y-this.y;return Math.sqrt(e*e+i*i)},equals:function(t){return t=x(t),t.x===this.x&&t.y===this.y},contains:function(t){return t=x(t),Math.abs(t.x)<=Math.abs(this.x)&&Math.abs(t.y)<=Math.abs(this.y)},toString:function(){return"Point("+$(this.x)+", "+$(this.y)+")"}};function x(t,e,i){return t instanceof w?t:at(t)?new w(t[0],t[1]):t==null?t:typeof t=="object"&&"x"in t&&"y"in t?new w(t.x,t.y):new w(t,e,i)}function R(t,e){if(t)for(var i=e?[t,e]:t,n=0,o=i.length;n<o;n++)this.extend(i[n])}R.prototype={extend:function(t){var e,i;if(!t)return this;if(t instanceof w||typeof t[0]=="number"||"x"in t)e=i=x(t);else if(t=J(t),e=t.min,i=t.max,!e||!i)return this;return!this.min&&!this.max?(this.min=e.clone(),this.max=i.clone()):(this.min.x=Math.min(e.x,this.min.x),this.max.x=Math.max(i.x,this.max.x),this.min.y=Math.min(e.y,this.min.y),this.max.y=Math.max(i.y,this.max.y)),this},getCenter:function(t){return x((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,t)},getBottomLeft:function(){return x(this.min.x,this.max.y)},getTopRight:function(){return x(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(t){var e,i;return typeof t[0]=="number"||t instanceof w?t=x(t):t=J(t),t instanceof R?(e=t.min,i=t.max):e=i=t,e.x>=this.min.x&&i.x<=this.max.x&&e.y>=this.min.y&&i.y<=this.max.y},intersects:function(t){t=J(t);var e=this.min,i=this.max,n=t.min,o=t.max,r=o.x>=e.x&&n.x<=i.x,l=o.y>=e.y&&n.y<=i.y;return r&&l},overlaps:function(t){t=J(t);var e=this.min,i=this.max,n=t.min,o=t.max,r=o.x>e.x&&n.x<i.x,l=o.y>e.y&&n.y<i.y;return r&&l},isValid:function(){return!!(this.min&&this.max)},pad:function(t){var e=this.min,i=this.max,n=Math.abs(e.x-i.x)*t,o=Math.abs(e.y-i.y)*t;return J(x(e.x-n,e.y-o),x(i.x+n,i.y+o))},equals:function(t){return t?(t=J(t),this.min.equals(t.getTopLeft())&&this.max.equals(t.getBottomRight())):!1}};function J(t,e){return!t||t instanceof R?t:new R(t,e)}function X(t,e){if(t)for(var i=e?[t,e]:t,n=0,o=i.length;n<o;n++)this.extend(i[n])}X.prototype={extend:function(t){var e=this._southWest,i=this._northEast,n,o;if(t instanceof I)n=t,o=t;else if(t instanceof X){if(n=t._southWest,o=t._northEast,!n||!o)return this}else return t?this.extend(z(t)||W(t)):this;return!e&&!i?(this._southWest=new I(n.lat,n.lng),this._northEast=new I(o.lat,o.lng)):(e.lat=Math.min(n.lat,e.lat),e.lng=Math.min(n.lng,e.lng),i.lat=Math.max(o.lat,i.lat),i.lng=Math.max(o.lng,i.lng)),this},pad:function(t){var e=this._southWest,i=this._northEast,n=Math.abs(e.lat-i.lat)*t,o=Math.abs(e.lng-i.lng)*t;return new X(new I(e.lat-n,e.lng-o),new I(i.lat+n,i.lng+o))},getCenter:function(){return new I((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new I(this.getNorth(),this.getWest())},getSouthEast:function(){return new I(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(t){typeof t[0]=="number"||t instanceof I||"lat"in t?t=z(t):t=W(t);var e=this._southWest,i=this._northEast,n,o;return t instanceof X?(n=t.getSouthWest(),o=t.getNorthEast()):n=o=t,n.lat>=e.lat&&o.lat<=i.lat&&n.lng>=e.lng&&o.lng<=i.lng},intersects:function(t){t=W(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),o=t.getNorthEast(),r=o.lat>=e.lat&&n.lat<=i.lat,l=o.lng>=e.lng&&n.lng<=i.lng;return r&&l},overlaps:function(t){t=W(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),o=t.getNorthEast(),r=o.lat>e.lat&&n.lat<i.lat,l=o.lng>e.lng&&n.lng<i.lng;return r&&l},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(t,e){return t?(t=W(t),this._southWest.equals(t.getSouthWest(),e)&&this._northEast.equals(t.getNorthEast(),e)):!1},isValid:function(){return!!(this._southWest&&this._northEast)}};function W(t,e){return t instanceof X?t:new X(t,e)}function I(t,e,i){if(isNaN(t)||isNaN(e))throw new Error("Invalid LatLng object: ("+t+", "+e+")");this.lat=+t,this.lng=+e,i!==void 0&&(this.alt=+i)}I.prototype={equals:function(t,e){if(!t)return!1;t=z(t);var i=Math.max(Math.abs(this.lat-t.lat),Math.abs(this.lng-t.lng));return i<=(e===void 0?1e-9:e)},toString:function(t){return"LatLng("+$(this.lat,t)+", "+$(this.lng,t)+")"},distanceTo:function(t){return bt.distance(this,z(t))},wrap:function(){return bt.wrapLatLng(this)},toBounds:function(t){var e=180*t/40075017,i=e/Math.cos(Math.PI/180*this.lat);return W([this.lat-e,this.lng-i],[this.lat+e,this.lng+i])},clone:function(){return new I(this.lat,this.lng,this.alt)}};function z(t,e,i){return t instanceof I?t:at(t)&&typeof t[0]!="object"?t.length===3?new I(t[0],t[1],t[2]):t.length===2?new I(t[0],t[1]):null:t==null?t:typeof t=="object"&&"lat"in t?new I(t.lat,"lng"in t?t.lng:t.lon,t.alt):e===void 0?null:new I(t,e,i)}var mt={latLngToPoint:function(t,e){var i=this.projection.project(t),n=this.scale(e);return this.transformation._transform(i,n)},pointToLatLng:function(t,e){var i=this.scale(e),n=this.transformation.untransform(t,i);return this.projection.unproject(n)},project:function(t){return this.projection.project(t)},unproject:function(t){return this.projection.unproject(t)},scale:function(t){return 256*Math.pow(2,t)},zoom:function(t){return Math.log(t/256)/Math.LN2},getProjectedBounds:function(t){if(this.infinite)return null;var e=this.projection.bounds,i=this.scale(t),n=this.transformation.transform(e.min,i),o=this.transformation.transform(e.max,i);return new R(n,o)},infinite:!1,wrapLatLng:function(t){var e=this.wrapLng?P(t.lng,this.wrapLng,!0):t.lng,i=this.wrapLat?P(t.lat,this.wrapLat,!0):t.lat,n=t.alt;return new I(i,e,n)},wrapLatLngBounds:function(t){var e=t.getCenter(),i=this.wrapLatLng(e),n=e.lat-i.lat,o=e.lng-i.lng;if(n===0&&o===0)return t;var r=t.getSouthWest(),l=t.getNorthEast(),c=new I(r.lat-n,r.lng-o),f=new I(l.lat-n,l.lng-o);return new X(c,f)}},bt=a({},mt,{wrapLng:[-180,180],R:6371e3,distance:function(t,e){var i=Math.PI/180,n=t.lat*i,o=e.lat*i,r=Math.sin((e.lat-t.lat)*i/2),l=Math.sin((e.lng-t.lng)*i/2),c=r*r+Math.cos(n)*Math.cos(o)*l*l,f=2*Math.atan2(Math.sqrt(c),Math.sqrt(1-c));return this.R*f}}),Ki=6378137,Je={R:Ki,MAX_LATITUDE:85.0511287798,project:function(t){var e=Math.PI/180,i=this.MAX_LATITUDE,n=Math.max(Math.min(i,t.lat),-i),o=Math.sin(n*e);return new w(this.R*t.lng*e,this.R*Math.log((1+o)/(1-o))/2)},unproject:function(t){var e=180/Math.PI;return new I((2*Math.atan(Math.exp(t.y/this.R))-Math.PI/2)*e,t.x*e/this.R)},bounds:function(){var t=Ki*Math.PI;return new R([-t,-t],[t,t])}()};function Xe(t,e,i,n){if(at(t)){this._a=t[0],this._b=t[1],this._c=t[2],this._d=t[3];return}this._a=t,this._b=e,this._c=i,this._d=n}Xe.prototype={transform:function(t,e){return this._transform(t.clone(),e)},_transform:function(t,e){return e=e||1,t.x=e*(this._a*t.x+this._b),t.y=e*(this._c*t.y+this._d),t},untransform:function(t,e){return e=e||1,new w((t.x/e-this._b)/this._a,(t.y/e-this._d)/this._c)}};function jt(t,e,i,n){return new Xe(t,e,i,n)}var Qe=a({},bt,{code:"EPSG:3857",projection:Je,transformation:function(){var t=.5/(Math.PI*Je.R);return jt(t,.5,-t,.5)}()}),$o=a({},Qe,{code:"EPSG:900913"});function ji(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function Yi(t,e){var i="",n,o,r,l,c,f;for(n=0,r=t.length;n<r;n++){for(c=t[n],o=0,l=c.length;o<l;o++)f=c[o],i+=(o?"L":"M")+f.x+" "+f.y;i+=e?v.svg?"z":"x":""}return i||"M0 0"}var ti=document.documentElement.style,Pe="ActiveXObject"in window,Bo=Pe&&!document.addEventListener,Ji="msLaunchUri"in navigator&&!("documentMode"in document),ei=ut("webkit"),Xi=ut("android"),Qi=ut("android 2")||ut("android 3"),No=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),Ro=Xi&&ut("Google")&&No<537&&!("AudioNode"in window),ii=!!window.opera,tn=!Ji&&ut("chrome"),en=ut("gecko")&&!ei&&!ii&&!Pe,Do=!tn&&ut("safari"),nn=ut("phantom"),on="OTransition"in ti,Ho=navigator.platform.indexOf("Win")===0,sn=Pe&&"transition"in ti,ni="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!Qi,rn="MozPerspective"in ti,Fo=!window.L_DISABLE_3D&&(sn||ni||rn)&&!on&&!nn,Yt=typeof orientation<"u"||ut("mobile"),Wo=Yt&&ei,Uo=Yt&&ni,an=!window.PointerEvent&&window.MSPointerEvent,ln=!!(window.PointerEvent||an),hn="ontouchstart"in window||!!window.TouchEvent,qo=!window.L_NO_TOUCH&&(hn||ln),Vo=Yt&&ii,Go=Yt&&en,Ko=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,jo=function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("testPassiveEventSupport",T,e),window.removeEventListener("testPassiveEventSupport",T,e)}catch{}return t}(),Yo=function(){return!!document.createElement("canvas").getContext}(),oi=!!(document.createElementNS&&ji("svg").createSVGRect),Jo=!!oi&&function(){var t=document.createElement("div");return t.innerHTML="<svg/>",(t.firstChild&&t.firstChild.namespaceURI)==="http://www.w3.org/2000/svg"}(),Xo=!oi&&function(){try{var t=document.createElement("div");t.innerHTML='<v:shape adj="1"/>';var e=t.firstChild;return e.style.behavior="url(#default#VML)",e&&typeof e.adj=="object"}catch{return!1}}(),Qo=navigator.platform.indexOf("Mac")===0,ts=navigator.platform.indexOf("Linux")===0;function ut(t){return navigator.userAgent.toLowerCase().indexOf(t)>=0}var v={ie:Pe,ielt9:Bo,edge:Ji,webkit:ei,android:Xi,android23:Qi,androidStock:Ro,opera:ii,chrome:tn,gecko:en,safari:Do,phantom:nn,opera12:on,win:Ho,ie3d:sn,webkit3d:ni,gecko3d:rn,any3d:Fo,mobile:Yt,mobileWebkit:Wo,mobileWebkit3d:Uo,msPointer:an,pointer:ln,touch:qo,touchNative:hn,mobileOpera:Vo,mobileGecko:Go,retina:Ko,passiveEvents:jo,canvas:Yo,svg:oi,vml:Xo,inlineSvg:Jo,mac:Qo,linux:ts},un=v.msPointer?"MSPointerDown":"pointerdown",cn=v.msPointer?"MSPointerMove":"pointermove",dn=v.msPointer?"MSPointerUp":"pointerup",fn=v.msPointer?"MSPointerCancel":"pointercancel",si={touchstart:un,touchmove:cn,touchend:dn,touchcancel:fn},pn={touchstart:rs,touchmove:Le,touchend:Le,touchcancel:Le},Bt={},_n=!1;function es(t,e,i){return e==="touchstart"&&ss(),pn[e]?(i=pn[e].bind(this,i),t.addEventListener(si[e],i,!1),i):(console.warn("wrong event specified:",e),T)}function is(t,e,i){if(!si[e]){console.warn("wrong event specified:",e);return}t.removeEventListener(si[e],i,!1)}function ns(t){Bt[t.pointerId]=t}function os(t){Bt[t.pointerId]&&(Bt[t.pointerId]=t)}function mn(t){delete Bt[t.pointerId]}function ss(){_n||(document.addEventListener(un,ns,!0),document.addEventListener(cn,os,!0),document.addEventListener(dn,mn,!0),document.addEventListener(fn,mn,!0),_n=!0)}function Le(t,e){if(e.pointerType!==(e.MSPOINTER_TYPE_MOUSE||"mouse")){e.touches=[];for(var i in Bt)e.touches.push(Bt[i]);e.changedTouches=[e],t(e)}}function rs(t,e){e.MSPOINTER_TYPE_TOUCH&&e.pointerType===e.MSPOINTER_TYPE_TOUCH&&K(e),Le(t,e)}function as(t){var e={},i,n;for(n in t)i=t[n],e[n]=i&&i.bind?i.bind(t):i;return t=e,e.type="dblclick",e.detail=2,e.isTrusted=!1,e._simulated=!0,e}var ls=200;function hs(t,e){t.addEventListener("dblclick",e);var i=0,n;function o(r){if(r.detail!==1){n=r.detail;return}if(!(r.pointerType==="mouse"||r.sourceCapabilities&&!r.sourceCapabilities.firesTouchEvents)){var l=wn(r);if(!(l.some(function(f){return f instanceof HTMLLabelElement&&f.attributes.for})&&!l.some(function(f){return f instanceof HTMLInputElement||f instanceof HTMLSelectElement}))){var c=Date.now();c-i<=ls?(n++,n===2&&e(as(r))):n=1,i=c}}}return t.addEventListener("click",o),{dblclick:e,simDblclick:o}}function us(t,e){t.removeEventListener("dblclick",e.dblclick),t.removeEventListener("click",e.simDblclick)}var ri=Se(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),Jt=Se(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),gn=Jt==="webkitTransition"||Jt==="OTransition"?Jt+"End":"transitionend";function vn(t){return typeof t=="string"?document.getElementById(t):t}function Xt(t,e){var i=t.style[e]||t.currentStyle&&t.currentStyle[e];if((!i||i==="auto")&&document.defaultView){var n=document.defaultView.getComputedStyle(t,null);i=n?n[e]:null}return i==="auto"?null:i}function M(t,e,i){var n=document.createElement(t);return n.className=e||"",i&&i.appendChild(n),n}function D(t){var e=t.parentNode;e&&e.removeChild(t)}function Te(t){for(;t.firstChild;)t.removeChild(t.firstChild)}function Nt(t){var e=t.parentNode;e&&e.lastChild!==t&&e.appendChild(t)}function Rt(t){var e=t.parentNode;e&&e.firstChild!==t&&e.insertBefore(t,e.firstChild)}function ai(t,e){if(t.classList!==void 0)return t.classList.contains(e);var i=ke(t);return i.length>0&&new RegExp("(^|\\s)"+e+"(\\s|$)").test(i)}function k(t,e){if(t.classList!==void 0)for(var i=G(e),n=0,o=i.length;n<o;n++)t.classList.add(i[n]);else if(!ai(t,e)){var r=ke(t);li(t,(r?r+" ":"")+e)}}function F(t,e){t.classList!==void 0?t.classList.remove(e):li(t,O((" "+ke(t)+" ").replace(" "+e+" "," ")))}function li(t,e){t.className.baseVal===void 0?t.className=e:t.className.baseVal=e}function ke(t){return t.correspondingElement&&(t=t.correspondingElement),t.className.baseVal===void 0?t.className:t.className.baseVal}function nt(t,e){"opacity"in t.style?t.style.opacity=e:"filter"in t.style&&cs(t,e)}function cs(t,e){var i=!1,n="DXImageTransform.Microsoft.Alpha";try{i=t.filters.item(n)}catch{if(e===1)return}e=Math.round(e*100),i?(i.Enabled=e!==100,i.Opacity=e):t.style.filter+=" progid:"+n+"(opacity="+e+")"}function Se(t){for(var e=document.documentElement.style,i=0;i<t.length;i++)if(t[i]in e)return t[i];return!1}function zt(t,e,i){var n=e||new w(0,0);t.style[ri]=(v.ie3d?"translate("+n.x+"px,"+n.y+"px)":"translate3d("+n.x+"px,"+n.y+"px,0)")+(i?" scale("+i+")":"")}function U(t,e){t._leaflet_pos=e,v.any3d?zt(t,e):(t.style.left=e.x+"px",t.style.top=e.y+"px")}function Et(t){return t._leaflet_pos||new w(0,0)}var Qt,te,hi;if("onselectstart"in document)Qt=function(){b(window,"selectstart",K)},te=function(){B(window,"selectstart",K)};else{var ee=Se(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);Qt=function(){if(ee){var t=document.documentElement.style;hi=t[ee],t[ee]="none"}},te=function(){ee&&(document.documentElement.style[ee]=hi,hi=void 0)}}function ui(){b(window,"dragstart",K)}function ci(){B(window,"dragstart",K)}var ze,di;function fi(t){for(;t.tabIndex===-1;)t=t.parentNode;t.style&&(Ee(),ze=t,di=t.style.outlineStyle,t.style.outlineStyle="none",b(window,"keydown",Ee))}function Ee(){ze&&(ze.style.outlineStyle=di,ze=void 0,di=void 0,B(window,"keydown",Ee))}function yn(t){do t=t.parentNode;while((!t.offsetWidth||!t.offsetHeight)&&t!==document.body);return t}function pi(t){var e=t.getBoundingClientRect();return{x:e.width/t.offsetWidth||1,y:e.height/t.offsetHeight||1,boundingClientRect:e}}var ds={__proto__:null,TRANSFORM:ri,TRANSITION:Jt,TRANSITION_END:gn,get:vn,getStyle:Xt,create:M,remove:D,empty:Te,toFront:Nt,toBack:Rt,hasClass:ai,addClass:k,removeClass:F,setClass:li,getClass:ke,setOpacity:nt,testProp:Se,setTransform:zt,setPosition:U,getPosition:Et,get disableTextSelection(){return Qt},get enableTextSelection(){return te},disableImageDrag:ui,enableImageDrag:ci,preventOutline:fi,restoreOutline:Ee,getSizedParentNode:yn,getScale:pi};function b(t,e,i,n){if(e&&typeof e=="object")for(var o in e)mi(t,o,e[o],i);else{e=G(e);for(var r=0,l=e.length;r<l;r++)mi(t,e[r],i,n)}return this}var ct="_leaflet_events";function B(t,e,i,n){if(arguments.length===1)xn(t),delete t[ct];else if(e&&typeof e=="object")for(var o in e)gi(t,o,e[o],i);else if(e=G(e),arguments.length===2)xn(t,function(c){return Ke(e,c)!==-1});else for(var r=0,l=e.length;r<l;r++)gi(t,e[r],i,n);return this}function xn(t,e){for(var i in t[ct]){var n=i.split(/\d/)[0];(!e||e(n))&&gi(t,n,null,null,i)}}var _i={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function mi(t,e,i,n){var o=e+_(i)+(n?"_"+_(n):"");if(t[ct]&&t[ct][o])return this;var r=function(c){return i.call(n||t,c||window.event)},l=r;!v.touchNative&&v.pointer&&e.indexOf("touch")===0?r=es(t,e,r):v.touch&&e==="dblclick"?r=hs(t,r):"addEventListener"in t?e==="touchstart"||e==="touchmove"||e==="wheel"||e==="mousewheel"?t.addEventListener(_i[e]||e,r,v.passiveEvents?{passive:!1}:!1):e==="mouseenter"||e==="mouseleave"?(r=function(c){c=c||window.event,yi(t,c)&&l(c)},t.addEventListener(_i[e],r,!1)):t.addEventListener(e,l,!1):t.attachEvent("on"+e,r),t[ct]=t[ct]||{},t[ct][o]=r}function gi(t,e,i,n,o){o=o||e+_(i)+(n?"_"+_(n):"");var r=t[ct]&&t[ct][o];if(!r)return this;!v.touchNative&&v.pointer&&e.indexOf("touch")===0?is(t,e,r):v.touch&&e==="dblclick"?us(t,r):"removeEventListener"in t?t.removeEventListener(_i[e]||e,r,!1):t.detachEvent("on"+e,r),t[ct][o]=null}function Ct(t){return t.stopPropagation?t.stopPropagation():t.originalEvent?t.originalEvent._stopped=!0:t.cancelBubble=!0,this}function vi(t){return mi(t,"wheel",Ct),this}function ie(t){return b(t,"mousedown touchstart dblclick contextmenu",Ct),t._leaflet_disable_click=!0,this}function K(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,this}function Mt(t){return K(t),Ct(t),this}function wn(t){if(t.composedPath)return t.composedPath();for(var e=[],i=t.target;i;)e.push(i),i=i.parentNode;return e}function bn(t,e){if(!e)return new w(t.clientX,t.clientY);var i=pi(e),n=i.boundingClientRect;return new w((t.clientX-n.left)/i.x-e.clientLeft,(t.clientY-n.top)/i.y-e.clientTop)}var fs=v.linux&&v.chrome?window.devicePixelRatio:v.mac?window.devicePixelRatio*3:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function Pn(t){return v.edge?t.wheelDeltaY/2:t.deltaY&&t.deltaMode===0?-t.deltaY/fs:t.deltaY&&t.deltaMode===1?-t.deltaY*20:t.deltaY&&t.deltaMode===2?-t.deltaY*60:t.deltaX||t.deltaZ?0:t.wheelDelta?(t.wheelDeltaY||t.wheelDelta)/2:t.detail&&Math.abs(t.detail)<32765?-t.detail*20:t.detail?t.detail/-32765*60:0}function yi(t,e){var i=e.relatedTarget;if(!i)return!0;try{for(;i&&i!==t;)i=i.parentNode}catch{return!1}return i!==t}var ps={__proto__:null,on:b,off:B,stopPropagation:Ct,disableScrollPropagation:vi,disableClickPropagation:ie,preventDefault:K,stop:Mt,getPropagationPath:wn,getMousePosition:bn,getWheelDelta:Pn,isExternalTarget:yi,addListener:b,removeListener:B},Ln=Kt.extend({run:function(t,e,i,n){this.stop(),this._el=t,this._inProgress=!0,this._duration=i||.25,this._easeOutPower=1/Math.max(n||.5,.2),this._startPos=Et(t),this._offset=e.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=Y(this._animate,this),this._step()},_step:function(t){var e=+new Date-this._startTime,i=this._duration*1e3;e<i?this._runFrame(this._easeOut(e/i),t):(this._runFrame(1),this._complete())},_runFrame:function(t,e){var i=this._startPos.add(this._offset.multiplyBy(t));e&&i._round(),U(this._el,i),this.fire("step")},_complete:function(){it(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(t){return 1-Math.pow(1-t,this._easeOutPower)}}),E=Kt.extend({options:{crs:Qe,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(t,e){e=C(this,e),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(t),this._initLayout(),this._onResize=d(this._onResize,this),this._initEvents(),e.maxBounds&&this.setMaxBounds(e.maxBounds),e.zoom!==void 0&&(this._zoom=this._limitZoom(e.zoom)),e.center&&e.zoom!==void 0&&this.setView(z(e.center),e.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=Jt&&v.any3d&&!v.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),b(this._proxy,gn,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(t,e,i){if(e=e===void 0?this._zoom:this._limitZoom(e),t=this._limitCenter(z(t),e,this.options.maxBounds),i=i||{},this._stop(),this._loaded&&!i.reset&&i!==!0){i.animate!==void 0&&(i.zoom=a({animate:i.animate},i.zoom),i.pan=a({animate:i.animate,duration:i.duration},i.pan));var n=this._zoom!==e?this._tryAnimatedZoom&&this._tryAnimatedZoom(t,e,i.zoom):this._tryAnimatedPan(t,i.pan);if(n)return clearTimeout(this._sizeTimer),this}return this._resetView(t,e,i.pan&&i.pan.noMoveStart),this},setZoom:function(t,e){return this._loaded?this.setView(this.getCenter(),t,{zoom:e}):(this._zoom=t,this)},zoomIn:function(t,e){return t=t||(v.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+t,e)},zoomOut:function(t,e){return t=t||(v.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-t,e)},setZoomAround:function(t,e,i){var n=this.getZoomScale(e),o=this.getSize().divideBy(2),r=t instanceof w?t:this.latLngToContainerPoint(t),l=r.subtract(o).multiplyBy(1-1/n),c=this.containerPointToLatLng(o.add(l));return this.setView(c,e,{zoom:i})},_getBoundsCenterZoom:function(t,e){e=e||{},t=t.getBounds?t.getBounds():W(t);var i=x(e.paddingTopLeft||e.padding||[0,0]),n=x(e.paddingBottomRight||e.padding||[0,0]),o=this.getBoundsZoom(t,!1,i.add(n));if(o=typeof e.maxZoom=="number"?Math.min(e.maxZoom,o):o,o===1/0)return{center:t.getCenter(),zoom:o};var r=n.subtract(i).divideBy(2),l=this.project(t.getSouthWest(),o),c=this.project(t.getNorthEast(),o),f=this.unproject(l.add(c).divideBy(2).add(r),o);return{center:f,zoom:o}},fitBounds:function(t,e){if(t=W(t),!t.isValid())throw new Error("Bounds are not valid.");var i=this._getBoundsCenterZoom(t,e);return this.setView(i.center,i.zoom,e)},fitWorld:function(t){return this.fitBounds([[-90,-180],[90,180]],t)},panTo:function(t,e){return this.setView(t,this._zoom,{pan:e})},panBy:function(t,e){if(t=x(t).round(),e=e||{},!t.x&&!t.y)return this.fire("moveend");if(e.animate!==!0&&!this.getSize().contains(t))return this._resetView(this.unproject(this.project(this.getCenter()).add(t)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new Ln,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),e.noMoveStart||this.fire("movestart"),e.animate!==!1){k(this._mapPane,"leaflet-pan-anim");var i=this._getMapPanePos().subtract(t).round();this._panAnim.run(this._mapPane,i,e.duration||.25,e.easeLinearity)}else this._rawPanBy(t),this.fire("move").fire("moveend");return this},flyTo:function(t,e,i){if(i=i||{},i.animate===!1||!v.any3d)return this.setView(t,e,i);this._stop();var n=this.project(this.getCenter()),o=this.project(t),r=this.getSize(),l=this._zoom;t=z(t),e=e===void 0?l:e;var c=Math.max(r.x,r.y),f=c*this.getZoomScale(l,e),p=o.distanceTo(n)||1,g=1.42,y=g*g;function S(q){var He=q?-1:1,ir=q?f:c,nr=f*f-c*c+He*y*y*p*p,or=2*ir*y*p,Ci=nr/or,oo=Math.sqrt(Ci*Ci+1)-Ci,sr=oo<1e-9?-18:Math.log(oo);return sr}function j(q){return(Math.exp(q)-Math.exp(-q))/2}function V(q){return(Math.exp(q)+Math.exp(-q))/2}function st(q){return j(q)/V(q)}var Q=S(0);function qt(q){return c*(V(Q)/V(Q+g*q))}function Xs(q){return c*(V(Q)*st(Q+g*q)-j(Q))/y}function Qs(q){return 1-Math.pow(1-q,1.5)}var tr=Date.now(),io=(S(1)-Q)/g,er=i.duration?1e3*i.duration:1e3*io*.8;function no(){var q=(Date.now()-tr)/er,He=Qs(q)*io;q<=1?(this._flyToFrame=Y(no,this),this._move(this.unproject(n.add(o.subtract(n).multiplyBy(Xs(He)/p)),l),this.getScaleZoom(c/qt(He),l),{flyTo:!0})):this._move(t,e)._moveEnd(!0)}return this._moveStart(!0,i.noMoveStart),no.call(this),this},flyToBounds:function(t,e){var i=this._getBoundsCenterZoom(t,e);return this.flyTo(i.center,i.zoom,e)},setMaxBounds:function(t){return t=W(t),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),t.isValid()?(this.options.maxBounds=t,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(t){var e=this.options.minZoom;return this.options.minZoom=t,this._loaded&&e!==t&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(t):this},setMaxZoom:function(t){var e=this.options.maxZoom;return this.options.maxZoom=t,this._loaded&&e!==t&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(t):this},panInsideBounds:function(t,e){this._enforcingBounds=!0;var i=this.getCenter(),n=this._limitCenter(i,this._zoom,W(t));return i.equals(n)||this.panTo(n,e),this._enforcingBounds=!1,this},panInside:function(t,e){e=e||{};var i=x(e.paddingTopLeft||e.padding||[0,0]),n=x(e.paddingBottomRight||e.padding||[0,0]),o=this.project(this.getCenter()),r=this.project(t),l=this.getPixelBounds(),c=J([l.min.add(i),l.max.subtract(n)]),f=c.getSize();if(!c.contains(r)){this._enforcingBounds=!0;var p=r.subtract(c.getCenter()),g=c.extend(r).getSize().subtract(f);o.x+=p.x<0?-g.x:g.x,o.y+=p.y<0?-g.y:g.y,this.panTo(this.unproject(o),e),this._enforcingBounds=!1}return this},invalidateSize:function(t){if(!this._loaded)return this;t=a({animate:!1,pan:!0},t===!0?{animate:!0}:t);var e=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var i=this.getSize(),n=e.divideBy(2).round(),o=i.divideBy(2).round(),r=n.subtract(o);return!r.x&&!r.y?this:(t.animate&&t.pan?this.panBy(r):(t.pan&&this._rawPanBy(r),this.fire("move"),t.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(d(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:e,newSize:i}))},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(t){if(t=this._locateOptions=a({timeout:1e4,watch:!1},t),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var e=d(this._handleGeolocationResponse,this),i=d(this._handleGeolocationError,this);return t.watch?this._locationWatchId=navigator.geolocation.watchPosition(e,i,t):navigator.geolocation.getCurrentPosition(e,i,t),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(t){if(this._container._leaflet_id){var e=t.code,i=t.message||(e===1?"permission denied":e===2?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:e,message:"Geolocation error: "+i+"."})}},_handleGeolocationResponse:function(t){if(this._container._leaflet_id){var e=t.coords.latitude,i=t.coords.longitude,n=new I(e,i),o=n.toBounds(t.coords.accuracy*2),r=this._locateOptions;if(r.setView){var l=this.getBoundsZoom(o);this.setView(n,r.maxZoom?Math.min(l,r.maxZoom):l)}var c={latlng:n,bounds:o,timestamp:t.timestamp};for(var f in t.coords)typeof t.coords[f]=="number"&&(c[f]=t.coords[f]);this.fire("locationfound",c)}},addHandler:function(t,e){if(!e)return this;var i=this[t]=new e(this);return this._handlers.push(i),this.options[t]&&i.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch{this._container._leaflet_id=void 0,this._containerId=void 0}this._locationWatchId!==void 0&&this.stopLocate(),this._stop(),D(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(it(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload");var t;for(t in this._layers)this._layers[t].remove();for(t in this._panes)D(this._panes[t]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(t,e){var i="leaflet-pane"+(t?" leaflet-"+t.replace("Pane","")+"-pane":""),n=M("div",i,e||this._mapPane);return t&&(this._panes[t]=n),n},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var t=this.getPixelBounds(),e=this.unproject(t.getBottomLeft()),i=this.unproject(t.getTopRight());return new X(e,i)},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(t,e,i){t=W(t),i=x(i||[0,0]);var n=this.getZoom()||0,o=this.getMinZoom(),r=this.getMaxZoom(),l=t.getNorthWest(),c=t.getSouthEast(),f=this.getSize().subtract(i),p=J(this.project(c,n),this.project(l,n)).getSize(),g=v.any3d?this.options.zoomSnap:1,y=f.x/p.x,S=f.y/p.y,j=e?Math.max(y,S):Math.min(y,S);return n=this.getScaleZoom(j,n),g&&(n=Math.round(n/(g/100))*(g/100),n=e?Math.ceil(n/g)*g:Math.floor(n/g)*g),Math.max(o,Math.min(r,n))},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new w(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(t,e){var i=this._getTopLeftPoint(t,e);return new R(i,i.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(t){return this.options.crs.getProjectedBounds(t===void 0?this.getZoom():t)},getPane:function(t){return typeof t=="string"?this._panes[t]:t},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(t,e){var i=this.options.crs;return e=e===void 0?this._zoom:e,i.scale(t)/i.scale(e)},getScaleZoom:function(t,e){var i=this.options.crs;e=e===void 0?this._zoom:e;var n=i.zoom(t*i.scale(e));return isNaN(n)?1/0:n},project:function(t,e){return e=e===void 0?this._zoom:e,this.options.crs.latLngToPoint(z(t),e)},unproject:function(t,e){return e=e===void 0?this._zoom:e,this.options.crs.pointToLatLng(x(t),e)},layerPointToLatLng:function(t){var e=x(t).add(this.getPixelOrigin());return this.unproject(e)},latLngToLayerPoint:function(t){var e=this.project(z(t))._round();return e._subtract(this.getPixelOrigin())},wrapLatLng:function(t){return this.options.crs.wrapLatLng(z(t))},wrapLatLngBounds:function(t){return this.options.crs.wrapLatLngBounds(W(t))},distance:function(t,e){return this.options.crs.distance(z(t),z(e))},containerPointToLayerPoint:function(t){return x(t).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(t){return x(t).add(this._getMapPanePos())},containerPointToLatLng:function(t){var e=this.containerPointToLayerPoint(x(t));return this.layerPointToLatLng(e)},latLngToContainerPoint:function(t){return this.layerPointToContainerPoint(this.latLngToLayerPoint(z(t)))},mouseEventToContainerPoint:function(t){return bn(t,this._container)},mouseEventToLayerPoint:function(t){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))},mouseEventToLatLng:function(t){return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))},_initContainer:function(t){var e=this._container=vn(t);if(e){if(e._leaflet_id)throw new Error("Map container is already initialized.")}else throw new Error("Map container not found.");b(e,"scroll",this._onScroll,this),this._containerId=_(e)},_initLayout:function(){var t=this._container;this._fadeAnimated=this.options.fadeAnimation&&v.any3d,k(t,"leaflet-container"+(v.touch?" leaflet-touch":"")+(v.retina?" leaflet-retina":"")+(v.ielt9?" leaflet-oldie":"")+(v.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var e=Xt(t,"position");e!=="absolute"&&e!=="relative"&&e!=="fixed"&&e!=="sticky"&&(t.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var t=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),U(this._mapPane,new w(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(k(t.markerPane,"leaflet-zoom-hide"),k(t.shadowPane,"leaflet-zoom-hide"))},_resetView:function(t,e,i){U(this._mapPane,new w(0,0));var n=!this._loaded;this._loaded=!0,e=this._limitZoom(e),this.fire("viewprereset");var o=this._zoom!==e;this._moveStart(o,i)._move(t,e)._moveEnd(o),this.fire("viewreset"),n&&this.fire("load")},_moveStart:function(t,e){return t&&this.fire("zoomstart"),e||this.fire("movestart"),this},_move:function(t,e,i,n){e===void 0&&(e=this._zoom);var o=this._zoom!==e;return this._zoom=e,this._lastCenter=t,this._pixelOrigin=this._getNewPixelOrigin(t),n?i&&i.pinch&&this.fire("zoom",i):((o||i&&i.pinch)&&this.fire("zoom",i),this.fire("move",i)),this},_moveEnd:function(t){return t&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return it(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(t){U(this._mapPane,this._getMapPanePos().subtract(t))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(t){this._targets={},this._targets[_(this._container)]=this;var e=t?B:b;e(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&e(window,"resize",this._onResize,this),v.any3d&&this.options.transform3DLimit&&(t?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){it(this._resizeRequest),this._resizeRequest=Y(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var t=this._getMapPanePos();Math.max(Math.abs(t.x),Math.abs(t.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(t,e){for(var i=[],n,o=e==="mouseout"||e==="mouseover",r=t.target||t.srcElement,l=!1;r;){if(n=this._targets[_(r)],n&&(e==="click"||e==="preclick")&&this._draggableMoved(n)){l=!0;break}if(n&&n.listens(e,!0)&&(o&&!yi(r,t)||(i.push(n),o))||r===this._container)break;r=r.parentNode}return!i.length&&!l&&!o&&this.listens(e,!0)&&(i=[this]),i},_isClickDisabled:function(t){for(;t&&t!==this._container;){if(t._leaflet_disable_click)return!0;t=t.parentNode}},_handleDOMEvent:function(t){var e=t.target||t.srcElement;if(!(!this._loaded||e._leaflet_disable_events||t.type==="click"&&this._isClickDisabled(e))){var i=t.type;i==="mousedown"&&fi(e),this._fireDOMEvent(t,i)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(t,e,i){if(t.type==="click"){var n=a({},t);n.type="preclick",this._fireDOMEvent(n,n.type,i)}var o=this._findEventTargets(t,e);if(i){for(var r=[],l=0;l<i.length;l++)i[l].listens(e,!0)&&r.push(i[l]);o=r.concat(o)}if(o.length){e==="contextmenu"&&K(t);var c=o[0],f={originalEvent:t};if(t.type!=="keypress"&&t.type!=="keydown"&&t.type!=="keyup"){var p=c.getLatLng&&(!c._radius||c._radius<=10);f.containerPoint=p?this.latLngToContainerPoint(c.getLatLng()):this.mouseEventToContainerPoint(t),f.layerPoint=this.containerPointToLayerPoint(f.containerPoint),f.latlng=p?c.getLatLng():this.layerPointToLatLng(f.layerPoint)}for(l=0;l<o.length;l++)if(o[l].fire(e,f,!0),f.originalEvent._stopped||o[l].options.bubblingMouseEvents===!1&&Ke(this._mouseEvents,e)!==-1)return}},_draggableMoved:function(t){return t=t.dragging&&t.dragging.enabled()?t:this,t.dragging&&t.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var t=0,e=this._handlers.length;t<e;t++)this._handlers[t].disable()},whenReady:function(t,e){return this._loaded?t.call(e||this,{target:this}):this.on("load",t,e),this},_getMapPanePos:function(){return Et(this._mapPane)||new w(0,0)},_moved:function(){var t=this._getMapPanePos();return t&&!t.equals([0,0])},_getTopLeftPoint:function(t,e){var i=t&&e!==void 0?this._getNewPixelOrigin(t,e):this.getPixelOrigin();return i.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(t,e){var i=this.getSize()._divideBy(2);return this.project(t,e)._subtract(i)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(t,e,i){var n=this._getNewPixelOrigin(i,e);return this.project(t,e)._subtract(n)},_latLngBoundsToNewLayerBounds:function(t,e,i){var n=this._getNewPixelOrigin(i,e);return J([this.project(t.getSouthWest(),e)._subtract(n),this.project(t.getNorthWest(),e)._subtract(n),this.project(t.getSouthEast(),e)._subtract(n),this.project(t.getNorthEast(),e)._subtract(n)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(t){return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())},_limitCenter:function(t,e,i){if(!i)return t;var n=this.project(t,e),o=this.getSize().divideBy(2),r=new R(n.subtract(o),n.add(o)),l=this._getBoundsOffset(r,i,e);return Math.abs(l.x)<=1&&Math.abs(l.y)<=1?t:this.unproject(n.add(l),e)},_limitOffset:function(t,e){if(!e)return t;var i=this.getPixelBounds(),n=new R(i.min.add(t),i.max.add(t));return t.add(this._getBoundsOffset(n,e))},_getBoundsOffset:function(t,e,i){var n=J(this.project(e.getNorthEast(),i),this.project(e.getSouthWest(),i)),o=n.min.subtract(t.min),r=n.max.subtract(t.max),l=this._rebound(o.x,-r.x),c=this._rebound(o.y,-r.y);return new w(l,c)},_rebound:function(t,e){return t+e>0?Math.round(t-e)/2:Math.max(0,Math.ceil(t))-Math.max(0,Math.floor(e))},_limitZoom:function(t){var e=this.getMinZoom(),i=this.getMaxZoom(),n=v.any3d?this.options.zoomSnap:1;return n&&(t=Math.round(t/n)*n),Math.max(e,Math.min(i,t))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){F(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(t,e){var i=this._getCenterOffset(t)._trunc();return(e&&e.animate)!==!0&&!this.getSize().contains(i)?!1:(this.panBy(i,e),!0)},_createAnimProxy:function(){var t=this._proxy=M("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(t),this.on("zoomanim",function(e){var i=ri,n=this._proxy.style[i];zt(this._proxy,this.project(e.center,e.zoom),this.getZoomScale(e.zoom,1)),n===this._proxy.style[i]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){D(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var t=this.getCenter(),e=this.getZoom();zt(this._proxy,this.project(t,e),this.getZoomScale(e,1))},_catchTransitionEnd:function(t){this._animatingZoom&&t.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(t,e,i){if(this._animatingZoom)return!0;if(i=i||{},!this._zoomAnimated||i.animate===!1||this._nothingToAnimate()||Math.abs(e-this._zoom)>this.options.zoomAnimationThreshold)return!1;var n=this.getZoomScale(e),o=this._getCenterOffset(t)._divideBy(1-1/n);return i.animate!==!0&&!this.getSize().contains(o)?!1:(Y(function(){this._moveStart(!0,i.noMoveStart||!1)._animateZoom(t,e,!0)},this),!0)},_animateZoom:function(t,e,i,n){this._mapPane&&(i&&(this._animatingZoom=!0,this._animateToCenter=t,this._animateToZoom=e,k(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:t,zoom:e,noUpdate:n}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(d(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&F(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function _s(t,e){return new E(t,e)}var lt=_t.extend({options:{position:"topright"},initialize:function(t){C(this,t)},getPosition:function(){return this.options.position},setPosition:function(t){var e=this._map;return e&&e.removeControl(this),this.options.position=t,e&&e.addControl(this),this},getContainer:function(){return this._container},addTo:function(t){this.remove(),this._map=t;var e=this._container=this.onAdd(t),i=this.getPosition(),n=t._controlCorners[i];return k(e,"leaflet-control"),i.indexOf("bottom")!==-1?n.insertBefore(e,n.firstChild):n.appendChild(e),this._map.on("unload",this.remove,this),this},remove:function(){return this._map?(D(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this},_refocusOnMap:function(t){this._map&&t&&t.screenX>0&&t.screenY>0&&this._map.getContainer().focus()}}),ne=function(t){return new lt(t)};E.include({addControl:function(t){return t.addTo(this),this},removeControl:function(t){return t.remove(),this},_initControlPos:function(){var t=this._controlCorners={},e="leaflet-",i=this._controlContainer=M("div",e+"control-container",this._container);function n(o,r){var l=e+o+" "+e+r;t[o+r]=M("div",l,i)}n("top","left"),n("top","right"),n("bottom","left"),n("bottom","right")},_clearControlPos:function(){for(var t in this._controlCorners)D(this._controlCorners[t]);D(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var Tn=lt.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(t,e,i,n){return i<n?-1:n<i?1:0}},initialize:function(t,e,i){C(this,i),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1;for(var n in t)this._addLayer(t[n],n);for(n in e)this._addLayer(e[n],n,!0)},onAdd:function(t){this._initLayout(),this._update(),this._map=t,t.on("zoomend",this._checkDisabledLayers,this);for(var e=0;e<this._layers.length;e++)this._layers[e].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(t){return lt.prototype.addTo.call(this,t),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var t=0;t<this._layers.length;t++)this._layers[t].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(t,e){return this._addLayer(t,e),this._map?this._update():this},addOverlay:function(t,e){return this._addLayer(t,e,!0),this._map?this._update():this},removeLayer:function(t){t.off("add remove",this._onLayerChange,this);var e=this._getLayer(_(t));return e&&this._layers.splice(this._layers.indexOf(e),1),this._map?this._update():this},expand:function(){k(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var t=this._map.getSize().y-(this._container.offsetTop+50);return t<this._section.clientHeight?(k(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=t+"px"):F(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return F(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var t="leaflet-control-layers",e=this._container=M("div",t),i=this.options.collapsed;e.setAttribute("aria-haspopup",!0),ie(e),vi(e);var n=this._section=M("section",t+"-list");i&&(this._map.on("click",this.collapse,this),b(e,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var o=this._layersLink=M("a",t+"-toggle",e);o.href="#",o.title="Layers",o.setAttribute("role","button"),b(o,{keydown:function(r){r.keyCode===13&&this._expandSafely()},click:function(r){K(r),this._expandSafely()}},this),i||this.expand(),this._baseLayersList=M("div",t+"-base",n),this._separator=M("div",t+"-separator",n),this._overlaysList=M("div",t+"-overlays",n),e.appendChild(n)},_getLayer:function(t){for(var e=0;e<this._layers.length;e++)if(this._layers[e]&&_(this._layers[e].layer)===t)return this._layers[e]},_addLayer:function(t,e,i){this._map&&t.on("add remove",this._onLayerChange,this),this._layers.push({layer:t,name:e,overlay:i}),this.options.sortLayers&&this._layers.sort(d(function(n,o){return this.options.sortFunction(n.layer,o.layer,n.name,o.name)},this)),this.options.autoZIndex&&t.setZIndex&&(this._lastZIndex++,t.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;Te(this._baseLayersList),Te(this._overlaysList),this._layerControlInputs=[];var t,e,i,n,o=0;for(i=0;i<this._layers.length;i++)n=this._layers[i],this._addItem(n),e=e||n.overlay,t=t||!n.overlay,o+=n.overlay?0:1;return this.options.hideSingleBase&&(t=t&&o>1,this._baseLayersList.style.display=t?"":"none"),this._separator.style.display=e&&t?"":"none",this},_onLayerChange:function(t){this._handlingClick||this._update();var e=this._getLayer(_(t.target)),i=e.overlay?t.type==="add"?"overlayadd":"overlayremove":t.type==="add"?"baselayerchange":null;i&&this._map.fire(i,e)},_createRadioElement:function(t,e){var i='<input type="radio" class="leaflet-control-layers-selector" name="'+t+'"'+(e?' checked="checked"':"")+"/>",n=document.createElement("div");return n.innerHTML=i,n.firstChild},_addItem:function(t){var e=document.createElement("label"),i=this._map.hasLayer(t.layer),n;t.overlay?(n=document.createElement("input"),n.type="checkbox",n.className="leaflet-control-layers-selector",n.defaultChecked=i):n=this._createRadioElement("leaflet-base-layers_"+_(this),i),this._layerControlInputs.push(n),n.layerId=_(t.layer),b(n,"click",this._onInputClick,this);var o=document.createElement("span");o.innerHTML=" "+t.name;var r=document.createElement("span");e.appendChild(r),r.appendChild(n),r.appendChild(o);var l=t.overlay?this._overlaysList:this._baseLayersList;return l.appendChild(e),this._checkDisabledLayers(),e},_onInputClick:function(){if(!this._preventClick){var t=this._layerControlInputs,e,i,n=[],o=[];this._handlingClick=!0;for(var r=t.length-1;r>=0;r--)e=t[r],i=this._getLayer(e.layerId).layer,e.checked?n.push(i):e.checked||o.push(i);for(r=0;r<o.length;r++)this._map.hasLayer(o[r])&&this._map.removeLayer(o[r]);for(r=0;r<n.length;r++)this._map.hasLayer(n[r])||this._map.addLayer(n[r]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var t=this._layerControlInputs,e,i,n=this._map.getZoom(),o=t.length-1;o>=0;o--)e=t[o],i=this._getLayer(e.layerId).layer,e.disabled=i.options.minZoom!==void 0&&n<i.options.minZoom||i.options.maxZoom!==void 0&&n>i.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var t=this._section;this._preventClick=!0,b(t,"click",K),this.expand();var e=this;setTimeout(function(){B(t,"click",K),e._preventClick=!1})}}),ms=function(t,e,i){return new Tn(t,e,i)},xi=lt.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(t){var e="leaflet-control-zoom",i=M("div",e+" leaflet-bar"),n=this.options;return this._zoomInButton=this._createButton(n.zoomInText,n.zoomInTitle,e+"-in",i,this._zoomIn),this._zoomOutButton=this._createButton(n.zoomOutText,n.zoomOutTitle,e+"-out",i,this._zoomOut),this._updateDisabled(),t.on("zoomend zoomlevelschange",this._updateDisabled,this),i},onRemove:function(t){t.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(t){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(t.shiftKey?3:1))},_zoomOut:function(t){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(t.shiftKey?3:1))},_createButton:function(t,e,i,n,o){var r=M("a",i,n);return r.innerHTML=t,r.href="#",r.title=e,r.setAttribute("role","button"),r.setAttribute("aria-label",e),ie(r),b(r,"click",Mt),b(r,"click",o,this),b(r,"click",this._refocusOnMap,this),r},_updateDisabled:function(){var t=this._map,e="leaflet-disabled";F(this._zoomInButton,e),F(this._zoomOutButton,e),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||t._zoom===t.getMinZoom())&&(k(this._zoomOutButton,e),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||t._zoom===t.getMaxZoom())&&(k(this._zoomInButton,e),this._zoomInButton.setAttribute("aria-disabled","true"))}});E.mergeOptions({zoomControl:!0}),E.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new xi,this.addControl(this.zoomControl))});var gs=function(t){return new xi(t)},kn=lt.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(t){var e="leaflet-control-scale",i=M("div",e),n=this.options;return this._addScales(n,e+"-line",i),t.on(n.updateWhenIdle?"moveend":"move",this._update,this),t.whenReady(this._update,this),i},onRemove:function(t){t.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(t,e,i){t.metric&&(this._mScale=M("div",e,i)),t.imperial&&(this._iScale=M("div",e,i))},_update:function(){var t=this._map,e=t.getSize().y/2,i=t.distance(t.containerPointToLatLng([0,e]),t.containerPointToLatLng([this.options.maxWidth,e]));this._updateScales(i)},_updateScales:function(t){this.options.metric&&t&&this._updateMetric(t),this.options.imperial&&t&&this._updateImperial(t)},_updateMetric:function(t){var e=this._getRoundNum(t),i=e<1e3?e+" m":e/1e3+" km";this._updateScale(this._mScale,i,e/t)},_updateImperial:function(t){var e=t*3.2808399,i,n,o;e>5280?(i=e/5280,n=this._getRoundNum(i),this._updateScale(this._iScale,n+" mi",n/i)):(o=this._getRoundNum(e),this._updateScale(this._iScale,o+" ft",o/e))},_updateScale:function(t,e,i){t.style.width=Math.round(this.options.maxWidth*i)+"px",t.innerHTML=e},_getRoundNum:function(t){var e=Math.pow(10,(Math.floor(t)+"").length-1),i=t/e;return i=i>=10?10:i>=5?5:i>=3?3:i>=2?2:1,e*i}}),vs=function(t){return new kn(t)},ys='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',wi=lt.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(v.inlineSvg?ys+" ":"")+"Leaflet</a>"},initialize:function(t){C(this,t),this._attributions={}},onAdd:function(t){t.attributionControl=this,this._container=M("div","leaflet-control-attribution"),ie(this._container);for(var e in t._layers)t._layers[e].getAttribution&&this.addAttribution(t._layers[e].getAttribution());return this._update(),t.on("layeradd",this._addAttribution,this),this._container},onRemove:function(t){t.off("layeradd",this._addAttribution,this)},_addAttribution:function(t){t.layer.getAttribution&&(this.addAttribution(t.layer.getAttribution()),t.layer.once("remove",function(){this.removeAttribution(t.layer.getAttribution())},this))},setPrefix:function(t){return this.options.prefix=t,this._update(),this},addAttribution:function(t){return t?(this._attributions[t]||(this._attributions[t]=0),this._attributions[t]++,this._update(),this):this},removeAttribution:function(t){return t?(this._attributions[t]&&(this._attributions[t]--,this._update()),this):this},_update:function(){if(this._map){var t=[];for(var e in this._attributions)this._attributions[e]&&t.push(e);var i=[];this.options.prefix&&i.push(this.options.prefix),t.length&&i.push(t.join(", ")),this._container.innerHTML=i.join(' <span aria-hidden="true">|</span> ')}}});E.mergeOptions({attributionControl:!0}),E.addInitHook(function(){this.options.attributionControl&&new wi().addTo(this)});var xs=function(t){return new wi(t)};lt.Layers=Tn,lt.Zoom=xi,lt.Scale=kn,lt.Attribution=wi,ne.layers=ms,ne.zoom=gs,ne.scale=vs,ne.attribution=xs;var dt=_t.extend({initialize:function(t){this._map=t},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});dt.addTo=function(t,e){return t.addHandler(e,this),this};var ws={Events:et},Sn=v.touch?"touchstart mousedown":"mousedown",Pt=Kt.extend({options:{clickTolerance:3},initialize:function(t,e,i,n){C(this,n),this._element=t,this._dragStartTarget=e||t,this._preventOutline=i},enable:function(){this._enabled||(b(this._dragStartTarget,Sn,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(Pt._dragging===this&&this.finishDrag(!0),B(this._dragStartTarget,Sn,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(t){if(this._enabled&&(this._moved=!1,!ai(this._element,"leaflet-zoom-anim"))){if(t.touches&&t.touches.length!==1){Pt._dragging===this&&this.finishDrag();return}if(!(Pt._dragging||t.shiftKey||t.which!==1&&t.button!==1&&!t.touches)&&(Pt._dragging=this,this._preventOutline&&fi(this._element),ui(),Qt(),!this._moving)){this.fire("down");var e=t.touches?t.touches[0]:t,i=yn(this._element);this._startPoint=new w(e.clientX,e.clientY),this._startPos=Et(this._element),this._parentScale=pi(i);var n=t.type==="mousedown";b(document,n?"mousemove":"touchmove",this._onMove,this),b(document,n?"mouseup":"touchend touchcancel",this._onUp,this)}}},_onMove:function(t){if(this._enabled){if(t.touches&&t.touches.length>1){this._moved=!0;return}var e=t.touches&&t.touches.length===1?t.touches[0]:t,i=new w(e.clientX,e.clientY)._subtract(this._startPoint);!i.x&&!i.y||Math.abs(i.x)+Math.abs(i.y)<this.options.clickTolerance||(i.x/=this._parentScale.x,i.y/=this._parentScale.y,K(t),this._moved||(this.fire("dragstart"),this._moved=!0,k(document.body,"leaflet-dragging"),this._lastTarget=t.target||t.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),k(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(i),this._moving=!0,this._lastEvent=t,this._updatePosition())}},_updatePosition:function(){var t={originalEvent:this._lastEvent};this.fire("predrag",t),U(this._element,this._newPos),this.fire("drag",t)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(t){F(document.body,"leaflet-dragging"),this._lastTarget&&(F(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),B(document,"mousemove touchmove",this._onMove,this),B(document,"mouseup touchend touchcancel",this._onUp,this),ci(),te();var e=this._moved&&this._moving;this._moving=!1,Pt._dragging=!1,e&&this.fire("dragend",{noInertia:t,distance:this._newPos.distanceTo(this._startPos)})}});function zn(t,e,i){var n,o=[1,4,2,8],r,l,c,f,p,g,y,S;for(r=0,g=t.length;r<g;r++)t[r]._code=At(t[r],e);for(c=0;c<4;c++){for(y=o[c],n=[],r=0,g=t.length,l=g-1;r<g;l=r++)f=t[r],p=t[l],f._code&y?p._code&y||(S=Ce(p,f,y,e,i),S._code=At(S,e),n.push(S)):(p._code&y&&(S=Ce(p,f,y,e,i),S._code=At(S,e),n.push(S)),n.push(f));t=n}return t}function En(t,e){var i,n,o,r,l,c,f,p,g;if(!t||t.length===0)throw new Error("latlngs not passed");ot(t)||(console.warn("latlngs are not flat! Only the first ring will be used"),t=t[0]);var y=z([0,0]),S=W(t),j=S.getNorthWest().distanceTo(S.getSouthWest())*S.getNorthEast().distanceTo(S.getNorthWest());j<1700&&(y=bi(t));var V=t.length,st=[];for(i=0;i<V;i++){var Q=z(t[i]);st.push(e.project(z([Q.lat-y.lat,Q.lng-y.lng])))}for(c=f=p=0,i=0,n=V-1;i<V;n=i++)o=st[i],r=st[n],l=o.y*r.x-r.y*o.x,f+=(o.x+r.x)*l,p+=(o.y+r.y)*l,c+=l*3;c===0?g=st[0]:g=[f/c,p/c];var qt=e.unproject(x(g));return z([qt.lat+y.lat,qt.lng+y.lng])}function bi(t){for(var e=0,i=0,n=0,o=0;o<t.length;o++){var r=z(t[o]);e+=r.lat,i+=r.lng,n++}return z([e/n,i/n])}var bs={__proto__:null,clipPolygon:zn,polygonCenter:En,centroid:bi};function Cn(t,e){if(!e||!t.length)return t.slice();var i=e*e;return t=Ts(t,i),t=Ls(t,i),t}function Mn(t,e,i){return Math.sqrt(oe(t,e,i,!0))}function Ps(t,e,i){return oe(t,e,i)}function Ls(t,e){var i=t.length,n=typeof Uint8Array<"u"?Uint8Array:Array,o=new n(i);o[0]=o[i-1]=1,Pi(t,o,e,0,i-1);var r,l=[];for(r=0;r<i;r++)o[r]&&l.push(t[r]);return l}function Pi(t,e,i,n,o){var r=0,l,c,f;for(c=n+1;c<=o-1;c++)f=oe(t[c],t[n],t[o],!0),f>r&&(l=c,r=f);r>i&&(e[l]=1,Pi(t,e,i,n,l),Pi(t,e,i,l,o))}function Ts(t,e){for(var i=[t[0]],n=1,o=0,r=t.length;n<r;n++)ks(t[n],t[o])>e&&(i.push(t[n]),o=n);return o<r-1&&i.push(t[r-1]),i}var An;function On(t,e,i,n,o){var r=n?An:At(t,i),l=At(e,i),c,f,p;for(An=l;;){if(!(r|l))return[t,e];if(r&l)return!1;c=r||l,f=Ce(t,e,c,i,o),p=At(f,i),c===r?(t=f,r=p):(e=f,l=p)}}function Ce(t,e,i,n,o){var r=e.x-t.x,l=e.y-t.y,c=n.min,f=n.max,p,g;return i&8?(p=t.x+r*(f.y-t.y)/l,g=f.y):i&4?(p=t.x+r*(c.y-t.y)/l,g=c.y):i&2?(p=f.x,g=t.y+l*(f.x-t.x)/r):i&1&&(p=c.x,g=t.y+l*(c.x-t.x)/r),new w(p,g,o)}function At(t,e){var i=0;return t.x<e.min.x?i|=1:t.x>e.max.x&&(i|=2),t.y<e.min.y?i|=4:t.y>e.max.y&&(i|=8),i}function ks(t,e){var i=e.x-t.x,n=e.y-t.y;return i*i+n*n}function oe(t,e,i,n){var o=e.x,r=e.y,l=i.x-o,c=i.y-r,f=l*l+c*c,p;return f>0&&(p=((t.x-o)*l+(t.y-r)*c)/f,p>1?(o=i.x,r=i.y):p>0&&(o+=l*p,r+=c*p)),l=t.x-o,c=t.y-r,n?l*l+c*c:new w(o,r)}function ot(t){return!at(t[0])||typeof t[0][0]!="object"&&typeof t[0][0]<"u"}function In(t){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),ot(t)}function Zn(t,e){var i,n,o,r,l,c,f,p;if(!t||t.length===0)throw new Error("latlngs not passed");ot(t)||(console.warn("latlngs are not flat! Only the first ring will be used"),t=t[0]);var g=z([0,0]),y=W(t),S=y.getNorthWest().distanceTo(y.getSouthWest())*y.getNorthEast().distanceTo(y.getNorthWest());S<1700&&(g=bi(t));var j=t.length,V=[];for(i=0;i<j;i++){var st=z(t[i]);V.push(e.project(z([st.lat-g.lat,st.lng-g.lng])))}for(i=0,n=0;i<j-1;i++)n+=V[i].distanceTo(V[i+1])/2;if(n===0)p=V[0];else for(i=0,r=0;i<j-1;i++)if(l=V[i],c=V[i+1],o=l.distanceTo(c),r+=o,r>n){f=(r-n)/o,p=[c.x-f*(c.x-l.x),c.y-f*(c.y-l.y)];break}var Q=e.unproject(x(p));return z([Q.lat+g.lat,Q.lng+g.lng])}var Ss={__proto__:null,simplify:Cn,pointToSegmentDistance:Mn,closestPointOnSegment:Ps,clipSegment:On,_getEdgeIntersection:Ce,_getBitCode:At,_sqClosestPointOnSegment:oe,isFlat:ot,_flat:In,polylineCenter:Zn},Li={project:function(t){return new w(t.lng,t.lat)},unproject:function(t){return new I(t.y,t.x)},bounds:new R([-180,-90],[180,90])},Ti={R:6378137,R_MINOR:6356752314245179e-9,bounds:new R([-2003750834279e-5,-1549657073972e-5],[2003750834279e-5,1876465623138e-5]),project:function(t){var e=Math.PI/180,i=this.R,n=t.lat*e,o=this.R_MINOR/i,r=Math.sqrt(1-o*o),l=r*Math.sin(n),c=Math.tan(Math.PI/4-n/2)/Math.pow((1-l)/(1+l),r/2);return n=-i*Math.log(Math.max(c,1e-10)),new w(t.lng*e*i,n)},unproject:function(t){for(var e=180/Math.PI,i=this.R,n=this.R_MINOR/i,o=Math.sqrt(1-n*n),r=Math.exp(-t.y/i),l=Math.PI/2-2*Math.atan(r),c=0,f=.1,p;c<15&&Math.abs(f)>1e-7;c++)p=o*Math.sin(l),p=Math.pow((1-p)/(1+p),o/2),f=Math.PI/2-2*Math.atan(r*p)-l,l+=f;return new I(l*e,t.x*e/i)}},zs={__proto__:null,LonLat:Li,Mercator:Ti,SphericalMercator:Je},Es=a({},bt,{code:"EPSG:3395",projection:Ti,transformation:function(){var t=.5/(Math.PI*Ti.R);return jt(t,.5,-t,.5)}()}),$n=a({},bt,{code:"EPSG:4326",projection:Li,transformation:jt(1/180,1,-1/180,.5)}),Cs=a({},mt,{projection:Li,transformation:jt(1,0,-1,0),scale:function(t){return Math.pow(2,t)},zoom:function(t){return Math.log(t)/Math.LN2},distance:function(t,e){var i=e.lng-t.lng,n=e.lat-t.lat;return Math.sqrt(i*i+n*n)},infinite:!0});mt.Earth=bt,mt.EPSG3395=Es,mt.EPSG3857=Qe,mt.EPSG900913=$o,mt.EPSG4326=$n,mt.Simple=Cs;var ht=Kt.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(t){return t.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(t){return t&&t.removeLayer(this),this},getPane:function(t){return this._map.getPane(t?this.options[t]||t:this.options.pane)},addInteractiveTarget:function(t){return this._map._targets[_(t)]=this,this},removeInteractiveTarget:function(t){return delete this._map._targets[_(t)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(t){var e=t.target;if(e.hasLayer(this)){if(this._map=e,this._zoomAnimated=e._zoomAnimated,this.getEvents){var i=this.getEvents();e.on(i,this),this.once("remove",function(){e.off(i,this)},this)}this.onAdd(e),this.fire("add"),e.fire("layeradd",{layer:this})}}});E.include({addLayer:function(t){if(!t._layerAdd)throw new Error("The provided object is not a Layer.");var e=_(t);return this._layers[e]?this:(this._layers[e]=t,t._mapToAdd=this,t.beforeAdd&&t.beforeAdd(this),this.whenReady(t._layerAdd,t),this)},removeLayer:function(t){var e=_(t);return this._layers[e]?(this._loaded&&t.onRemove(this),delete this._layers[e],this._loaded&&(this.fire("layerremove",{layer:t}),t.fire("remove")),t._map=t._mapToAdd=null,this):this},hasLayer:function(t){return _(t)in this._layers},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},_addLayers:function(t){t=t?at(t)?t:[t]:[];for(var e=0,i=t.length;e<i;e++)this.addLayer(t[e])},_addZoomLimit:function(t){(!isNaN(t.options.maxZoom)||!isNaN(t.options.minZoom))&&(this._zoomBoundLayers[_(t)]=t,this._updateZoomLevels())},_removeZoomLimit:function(t){var e=_(t);this._zoomBoundLayers[e]&&(delete this._zoomBoundLayers[e],this._updateZoomLevels())},_updateZoomLevels:function(){var t=1/0,e=-1/0,i=this._getZoomSpan();for(var n in this._zoomBoundLayers){var o=this._zoomBoundLayers[n].options;t=o.minZoom===void 0?t:Math.min(t,o.minZoom),e=o.maxZoom===void 0?e:Math.max(e,o.maxZoom)}this._layersMaxZoom=e===-1/0?void 0:e,this._layersMinZoom=t===1/0?void 0:t,i!==this._getZoomSpan()&&this.fire("zoomlevelschange"),this.options.maxZoom===void 0&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===void 0&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var Dt=ht.extend({initialize:function(t,e){C(this,e),this._layers={};var i,n;if(t)for(i=0,n=t.length;i<n;i++)this.addLayer(t[i])},addLayer:function(t){var e=this.getLayerId(t);return this._layers[e]=t,this._map&&this._map.addLayer(t),this},removeLayer:function(t){var e=t in this._layers?t:this.getLayerId(t);return this._map&&this._layers[e]&&this._map.removeLayer(this._layers[e]),delete this._layers[e],this},hasLayer:function(t){var e=typeof t=="number"?t:this.getLayerId(t);return e in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(t){var e=Array.prototype.slice.call(arguments,1),i,n;for(i in this._layers)n=this._layers[i],n[t]&&n[t].apply(n,e);return this},onAdd:function(t){this.eachLayer(t.addLayer,t)},onRemove:function(t){this.eachLayer(t.removeLayer,t)},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},getLayer:function(t){return this._layers[t]},getLayers:function(){var t=[];return this.eachLayer(t.push,t),t},setZIndex:function(t){return this.invoke("setZIndex",t)},getLayerId:function(t){return _(t)}}),Ms=function(t,e){return new Dt(t,e)},gt=Dt.extend({addLayer:function(t){return this.hasLayer(t)?this:(t.addEventParent(this),Dt.prototype.addLayer.call(this,t),this.fire("layeradd",{layer:t}))},removeLayer:function(t){return this.hasLayer(t)?(t in this._layers&&(t=this._layers[t]),t.removeEventParent(this),Dt.prototype.removeLayer.call(this,t),this.fire("layerremove",{layer:t})):this},setStyle:function(t){return this.invoke("setStyle",t)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var t=new X;for(var e in this._layers){var i=this._layers[e];t.extend(i.getBounds?i.getBounds():i.getLatLng())}return t}}),As=function(t,e){return new gt(t,e)},Ht=_t.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(t){C(this,t)},createIcon:function(t){return this._createIcon("icon",t)},createShadow:function(t){return this._createIcon("shadow",t)},_createIcon:function(t,e){var i=this._getIconUrl(t);if(!i){if(t==="icon")throw new Error("iconUrl not set in Icon options (see the docs).");return null}var n=this._createImg(i,e&&e.tagName==="IMG"?e:null);return this._setIconStyles(n,t),(this.options.crossOrigin||this.options.crossOrigin==="")&&(n.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),n},_setIconStyles:function(t,e){var i=this.options,n=i[e+"Size"];typeof n=="number"&&(n=[n,n]);var o=x(n),r=x(e==="shadow"&&i.shadowAnchor||i.iconAnchor||o&&o.divideBy(2,!0));t.className="leaflet-marker-"+e+" "+(i.className||""),r&&(t.style.marginLeft=-r.x+"px",t.style.marginTop=-r.y+"px"),o&&(t.style.width=o.x+"px",t.style.height=o.y+"px")},_createImg:function(t,e){return e=e||document.createElement("img"),e.src=t,e},_getIconUrl:function(t){return v.retina&&this.options[t+"RetinaUrl"]||this.options[t+"Url"]}});function Os(t){return new Ht(t)}var se=Ht.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(t){return typeof se.imagePath!="string"&&(se.imagePath=this._detectIconPath()),(this.options.imagePath||se.imagePath)+Ht.prototype._getIconUrl.call(this,t)},_stripUrl:function(t){var e=function(i,n,o){var r=n.exec(i);return r&&r[o]};return t=e(t,/^url\((['"])?(.+)\1\)$/,2),t&&e(t,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var t=M("div","leaflet-default-icon-path",document.body),e=Xt(t,"background-image")||Xt(t,"backgroundImage");if(document.body.removeChild(t),e=this._stripUrl(e),e)return e;var i=document.querySelector('link[href$="leaflet.css"]');return i?i.href.substring(0,i.href.length-11-1):""}}),Bn=dt.extend({initialize:function(t){this._marker=t},addHooks:function(){var t=this._marker._icon;this._draggable||(this._draggable=new Pt(t,t,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),k(t,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&F(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(t){var e=this._marker,i=e._map,n=this._marker.options.autoPanSpeed,o=this._marker.options.autoPanPadding,r=Et(e._icon),l=i.getPixelBounds(),c=i.getPixelOrigin(),f=J(l.min._subtract(c).add(o),l.max._subtract(c).subtract(o));if(!f.contains(r)){var p=x((Math.max(f.max.x,r.x)-f.max.x)/(l.max.x-f.max.x)-(Math.min(f.min.x,r.x)-f.min.x)/(l.min.x-f.min.x),(Math.max(f.max.y,r.y)-f.max.y)/(l.max.y-f.max.y)-(Math.min(f.min.y,r.y)-f.min.y)/(l.min.y-f.min.y)).multiplyBy(n);i.panBy(p,{animate:!1}),this._draggable._newPos._add(p),this._draggable._startPos._add(p),U(e._icon,this._draggable._newPos),this._onDrag(t),this._panRequest=Y(this._adjustPan.bind(this,t))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(t){this._marker.options.autoPan&&(it(this._panRequest),this._panRequest=Y(this._adjustPan.bind(this,t)))},_onDrag:function(t){var e=this._marker,i=e._shadow,n=Et(e._icon),o=e._map.layerPointToLatLng(n);i&&U(i,n),e._latlng=o,t.latlng=o,t.oldLatLng=this._oldLatLng,e.fire("move",t).fire("drag",t)},_onDragEnd:function(t){it(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",t)}}),Me=ht.extend({options:{icon:new se,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(t,e){C(this,e),this._latlng=z(t)},onAdd:function(t){this._zoomAnimated=this._zoomAnimated&&t.options.markerZoomAnimation,this._zoomAnimated&&t.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(t){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&t.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(t){var e=this._latlng;return this._latlng=z(t),this.update(),this.fire("move",{oldLatLng:e,latlng:this._latlng})},setZIndexOffset:function(t){return this.options.zIndexOffset=t,this.update()},getIcon:function(){return this.options.icon},setIcon:function(t){return this.options.icon=t,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var t=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(t)}return this},_initIcon:function(){var t=this.options,e="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),i=t.icon.createIcon(this._icon),n=!1;i!==this._icon&&(this._icon&&this._removeIcon(),n=!0,t.title&&(i.title=t.title),i.tagName==="IMG"&&(i.alt=t.alt||"")),k(i,e),t.keyboard&&(i.tabIndex="0",i.setAttribute("role","button")),this._icon=i,t.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&b(i,"focus",this._panOnFocus,this);var o=t.icon.createShadow(this._shadow),r=!1;o!==this._shadow&&(this._removeShadow(),r=!0),o&&(k(o,e),o.alt=""),this._shadow=o,t.opacity<1&&this._updateOpacity(),n&&this.getPane().appendChild(this._icon),this._initInteraction(),o&&r&&this.getPane(t.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&B(this._icon,"focus",this._panOnFocus,this),D(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&D(this._shadow),this._shadow=null},_setPos:function(t){this._icon&&U(this._icon,t),this._shadow&&U(this._shadow,t),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(t){this._icon&&(this._icon.style.zIndex=this._zIndex+t)},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center).round();this._setPos(e)},_initInteraction:function(){if(this.options.interactive&&(k(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),Bn)){var t=this.options.draggable;this.dragging&&(t=this.dragging.enabled(),this.dragging.disable()),this.dragging=new Bn(this),t&&this.dragging.enable()}},setOpacity:function(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var t=this.options.opacity;this._icon&&nt(this._icon,t),this._shadow&&nt(this._shadow,t)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var t=this._map;if(t){var e=this.options.icon.options,i=e.iconSize?x(e.iconSize):x(0,0),n=e.iconAnchor?x(e.iconAnchor):x(0,0);t.panInside(this._latlng,{paddingTopLeft:n,paddingBottomRight:i.subtract(n)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function Is(t,e){return new Me(t,e)}var Lt=ht.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(t){this._renderer=t.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(t){return C(this,t),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&t&&Object.prototype.hasOwnProperty.call(t,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),Ae=Lt.extend({options:{fill:!0,radius:10},initialize:function(t,e){C(this,e),this._latlng=z(t),this._radius=this.options.radius},setLatLng:function(t){var e=this._latlng;return this._latlng=z(t),this.redraw(),this.fire("move",{oldLatLng:e,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(t){return this.options.radius=this._radius=t,this.redraw()},getRadius:function(){return this._radius},setStyle:function(t){var e=t&&t.radius||this._radius;return Lt.prototype.setStyle.call(this,t),this.setRadius(e),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var t=this._radius,e=this._radiusY||t,i=this._clickTolerance(),n=[t+i,e+i];this._pxBounds=new R(this._point.subtract(n),this._point.add(n))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(t){return t.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function Zs(t,e){return new Ae(t,e)}var ki=Ae.extend({initialize:function(t,e,i){if(typeof e=="number"&&(e=a({},i,{radius:e})),C(this,e),this._latlng=z(t),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(t){return this._mRadius=t,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var t=[this._radius,this._radiusY||this._radius];return new X(this._map.layerPointToLatLng(this._point.subtract(t)),this._map.layerPointToLatLng(this._point.add(t)))},setStyle:Lt.prototype.setStyle,_project:function(){var t=this._latlng.lng,e=this._latlng.lat,i=this._map,n=i.options.crs;if(n.distance===bt.distance){var o=Math.PI/180,r=this._mRadius/bt.R/o,l=i.project([e+r,t]),c=i.project([e-r,t]),f=l.add(c).divideBy(2),p=i.unproject(f).lat,g=Math.acos((Math.cos(r*o)-Math.sin(e*o)*Math.sin(p*o))/(Math.cos(e*o)*Math.cos(p*o)))/o;(isNaN(g)||g===0)&&(g=r/Math.cos(Math.PI/180*e)),this._point=f.subtract(i.getPixelOrigin()),this._radius=isNaN(g)?0:f.x-i.project([p,t-g]).x,this._radiusY=f.y-l.y}else{var y=n.unproject(n.project(this._latlng).subtract([this._mRadius,0]));this._point=i.latLngToLayerPoint(this._latlng),this._radius=this._point.x-i.latLngToLayerPoint(y).x}this._updateBounds()}});function $s(t,e,i){return new ki(t,e,i)}var vt=Lt.extend({options:{smoothFactor:1,noClip:!1},initialize:function(t,e){C(this,e),this._setLatLngs(t)},getLatLngs:function(){return this._latlngs},setLatLngs:function(t){return this._setLatLngs(t),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(t){for(var e=1/0,i=null,n=oe,o,r,l=0,c=this._parts.length;l<c;l++)for(var f=this._parts[l],p=1,g=f.length;p<g;p++){o=f[p-1],r=f[p];var y=n(t,o,r,!0);y<e&&(e=y,i=n(t,o,r))}return i&&(i.distance=Math.sqrt(e)),i},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Zn(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(t,e){return e=e||this._defaultShape(),t=z(t),e.push(t),this._bounds.extend(t),this.redraw()},_setLatLngs:function(t){this._bounds=new X,this._latlngs=this._convertLatLngs(t)},_defaultShape:function(){return ot(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(t){for(var e=[],i=ot(t),n=0,o=t.length;n<o;n++)i?(e[n]=z(t[n]),this._bounds.extend(e[n])):e[n]=this._convertLatLngs(t[n]);return e},_project:function(){var t=new R;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,t),this._bounds.isValid()&&t.isValid()&&(this._rawPxBounds=t,this._updateBounds())},_updateBounds:function(){var t=this._clickTolerance(),e=new w(t,t);this._rawPxBounds&&(this._pxBounds=new R([this._rawPxBounds.min.subtract(e),this._rawPxBounds.max.add(e)]))},_projectLatlngs:function(t,e,i){var n=t[0]instanceof I,o=t.length,r,l;if(n){for(l=[],r=0;r<o;r++)l[r]=this._map.latLngToLayerPoint(t[r]),i.extend(l[r]);e.push(l)}else for(r=0;r<o;r++)this._projectLatlngs(t[r],e,i)},_clipPoints:function(){var t=this._renderer._bounds;if(this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(t))){if(this.options.noClip){this._parts=this._rings;return}var e=this._parts,i,n,o,r,l,c,f;for(i=0,o=0,r=this._rings.length;i<r;i++)for(f=this._rings[i],n=0,l=f.length;n<l-1;n++)c=On(f[n],f[n+1],t,n,!0),c&&(e[o]=e[o]||[],e[o].push(c[0]),(c[1]!==f[n+1]||n===l-2)&&(e[o].push(c[1]),o++))}},_simplifyPoints:function(){for(var t=this._parts,e=this.options.smoothFactor,i=0,n=t.length;i<n;i++)t[i]=Cn(t[i],e)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(t,e){var i,n,o,r,l,c,f=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(t))return!1;for(i=0,r=this._parts.length;i<r;i++)for(c=this._parts[i],n=0,l=c.length,o=l-1;n<l;o=n++)if(!(!e&&n===0)&&Mn(t,c[o],c[n])<=f)return!0;return!1}});function Bs(t,e){return new vt(t,e)}vt._flat=In;var Ft=vt.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return En(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(t){var e=vt.prototype._convertLatLngs.call(this,t),i=e.length;return i>=2&&e[0]instanceof I&&e[0].equals(e[i-1])&&e.pop(),e},_setLatLngs:function(t){vt.prototype._setLatLngs.call(this,t),ot(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return ot(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var t=this._renderer._bounds,e=this.options.weight,i=new w(e,e);if(t=new R(t.min.subtract(i),t.max.add(i)),this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(t))){if(this.options.noClip){this._parts=this._rings;return}for(var n=0,o=this._rings.length,r;n<o;n++)r=zn(this._rings[n],t,!0),r.length&&this._parts.push(r)}},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(t){var e=!1,i,n,o,r,l,c,f,p;if(!this._pxBounds||!this._pxBounds.contains(t))return!1;for(r=0,f=this._parts.length;r<f;r++)for(i=this._parts[r],l=0,p=i.length,c=p-1;l<p;c=l++)n=i[l],o=i[c],n.y>t.y!=o.y>t.y&&t.x<(o.x-n.x)*(t.y-n.y)/(o.y-n.y)+n.x&&(e=!e);return e||vt.prototype._containsPoint.call(this,t,!0)}});function Ns(t,e){return new Ft(t,e)}var yt=gt.extend({initialize:function(t,e){C(this,e),this._layers={},t&&this.addData(t)},addData:function(t){var e=at(t)?t:t.features,i,n,o;if(e){for(i=0,n=e.length;i<n;i++)o=e[i],(o.geometries||o.geometry||o.features||o.coordinates)&&this.addData(o);return this}var r=this.options;if(r.filter&&!r.filter(t))return this;var l=Oe(t,r);return l?(l.feature=$e(t),l.defaultOptions=l.options,this.resetStyle(l),r.onEachFeature&&r.onEachFeature(t,l),this.addLayer(l)):this},resetStyle:function(t){return t===void 0?this.eachLayer(this.resetStyle,this):(t.options=a({},t.defaultOptions),this._setLayerStyle(t,this.options.style),this)},setStyle:function(t){return this.eachLayer(function(e){this._setLayerStyle(e,t)},this)},_setLayerStyle:function(t,e){t.setStyle&&(typeof e=="function"&&(e=e(t.feature)),t.setStyle(e))}});function Oe(t,e){var i=t.type==="Feature"?t.geometry:t,n=i?i.coordinates:null,o=[],r=e&&e.pointToLayer,l=e&&e.coordsToLatLng||Si,c,f,p,g;if(!n&&!i)return null;switch(i.type){case"Point":return c=l(n),Nn(r,t,c,e);case"MultiPoint":for(p=0,g=n.length;p<g;p++)c=l(n[p]),o.push(Nn(r,t,c,e));return new gt(o);case"LineString":case"MultiLineString":return f=Ie(n,i.type==="LineString"?0:1,l),new vt(f,e);case"Polygon":case"MultiPolygon":return f=Ie(n,i.type==="Polygon"?1:2,l),new Ft(f,e);case"GeometryCollection":for(p=0,g=i.geometries.length;p<g;p++){var y=Oe({geometry:i.geometries[p],type:"Feature",properties:t.properties},e);y&&o.push(y)}return new gt(o);case"FeatureCollection":for(p=0,g=i.features.length;p<g;p++){var S=Oe(i.features[p],e);S&&o.push(S)}return new gt(o);default:throw new Error("Invalid GeoJSON object.")}}function Nn(t,e,i,n){return t?t(e,i):new Me(i,n&&n.markersInheritOptions&&n)}function Si(t){return new I(t[1],t[0],t[2])}function Ie(t,e,i){for(var n=[],o=0,r=t.length,l;o<r;o++)l=e?Ie(t[o],e-1,i):(i||Si)(t[o]),n.push(l);return n}function zi(t,e){return t=z(t),t.alt!==void 0?[$(t.lng,e),$(t.lat,e),$(t.alt,e)]:[$(t.lng,e),$(t.lat,e)]}function Ze(t,e,i,n){for(var o=[],r=0,l=t.length;r<l;r++)o.push(e?Ze(t[r],ot(t[r])?0:e-1,i,n):zi(t[r],n));return!e&&i&&o.length>0&&o.push(o[0].slice()),o}function Wt(t,e){return t.feature?a({},t.feature,{geometry:e}):$e(e)}function $e(t){return t.type==="Feature"||t.type==="FeatureCollection"?t:{type:"Feature",properties:{},geometry:t}}var Ei={toGeoJSON:function(t){return Wt(this,{type:"Point",coordinates:zi(this.getLatLng(),t)})}};Me.include(Ei),ki.include(Ei),Ae.include(Ei),vt.include({toGeoJSON:function(t){var e=!ot(this._latlngs),i=Ze(this._latlngs,e?1:0,!1,t);return Wt(this,{type:(e?"Multi":"")+"LineString",coordinates:i})}}),Ft.include({toGeoJSON:function(t){var e=!ot(this._latlngs),i=e&&!ot(this._latlngs[0]),n=Ze(this._latlngs,i?2:e?1:0,!0,t);return e||(n=[n]),Wt(this,{type:(i?"Multi":"")+"Polygon",coordinates:n})}}),Dt.include({toMultiPoint:function(t){var e=[];return this.eachLayer(function(i){e.push(i.toGeoJSON(t).geometry.coordinates)}),Wt(this,{type:"MultiPoint",coordinates:e})},toGeoJSON:function(t){var e=this.feature&&this.feature.geometry&&this.feature.geometry.type;if(e==="MultiPoint")return this.toMultiPoint(t);var i=e==="GeometryCollection",n=[];return this.eachLayer(function(o){if(o.toGeoJSON){var r=o.toGeoJSON(t);if(i)n.push(r.geometry);else{var l=$e(r);l.type==="FeatureCollection"?n.push.apply(n,l.features):n.push(l)}}}),i?Wt(this,{geometries:n,type:"GeometryCollection"}):{type:"FeatureCollection",features:n}}});function Rn(t,e){return new yt(t,e)}var Rs=Rn,Be=ht.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(t,e,i){this._url=t,this._bounds=W(e),C(this,i)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(k(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){D(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(t){return this.options.opacity=t,this._image&&this._updateOpacity(),this},setStyle:function(t){return t.opacity&&this.setOpacity(t.opacity),this},bringToFront:function(){return this._map&&Nt(this._image),this},bringToBack:function(){return this._map&&Rt(this._image),this},setUrl:function(t){return this._url=t,this._image&&(this._image.src=t),this},setBounds:function(t){return this._bounds=W(t),this._map&&this._reset(),this},getEvents:function(){var t={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var t=this._url.tagName==="IMG",e=this._image=t?this._url:M("img");if(k(e,"leaflet-image-layer"),this._zoomAnimated&&k(e,"leaflet-zoom-animated"),this.options.className&&k(e,this.options.className),e.onselectstart=T,e.onmousemove=T,e.onload=d(this.fire,this,"load"),e.onerror=d(this._overlayOnError,this,"error"),(this.options.crossOrigin||this.options.crossOrigin==="")&&(e.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),t){this._url=e.src;return}e.src=this._url,e.alt=this.options.alt},_animateZoom:function(t){var e=this._map.getZoomScale(t.zoom),i=this._map._latLngBoundsToNewLayerBounds(this._bounds,t.zoom,t.center).min;zt(this._image,i,e)},_reset:function(){var t=this._image,e=new R(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),i=e.getSize();U(t,e.min),t.style.width=i.x+"px",t.style.height=i.y+"px"},_updateOpacity:function(){nt(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var t=this.options.errorOverlayUrl;t&&this._url!==t&&(this._url=t,this._image.src=t)},getCenter:function(){return this._bounds.getCenter()}}),Ds=function(t,e,i){return new Be(t,e,i)},Dn=Be.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var t=this._url.tagName==="VIDEO",e=this._image=t?this._url:M("video");if(k(e,"leaflet-image-layer"),this._zoomAnimated&&k(e,"leaflet-zoom-animated"),this.options.className&&k(e,this.options.className),e.onselectstart=T,e.onmousemove=T,e.onloadeddata=d(this.fire,this,"load"),t){for(var i=e.getElementsByTagName("source"),n=[],o=0;o<i.length;o++)n.push(i[o].src);this._url=i.length>0?n:[e.src];return}at(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(e.style,"objectFit")&&(e.style.objectFit="fill"),e.autoplay=!!this.options.autoplay,e.loop=!!this.options.loop,e.muted=!!this.options.muted,e.playsInline=!!this.options.playsInline;for(var r=0;r<this._url.length;r++){var l=M("source");l.src=this._url[r],e.appendChild(l)}}});function Hs(t,e,i){return new Dn(t,e,i)}var Hn=Be.extend({_initImage:function(){var t=this._image=this._url;k(t,"leaflet-image-layer"),this._zoomAnimated&&k(t,"leaflet-zoom-animated"),this.options.className&&k(t,this.options.className),t.onselectstart=T,t.onmousemove=T}});function Fs(t,e,i){return new Hn(t,e,i)}var ft=ht.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(t,e){t&&(t instanceof I||at(t))?(this._latlng=z(t),C(this,e)):(C(this,t),this._source=e),this.options.content&&(this._content=this.options.content)},openOn:function(t){return t=arguments.length?t:this._source._map,t.hasLayer(this)||t.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(t){return this._map?this.close():(arguments.length?this._source=t:t=this._source,this._prepareOpen(),this.openOn(t._map)),this},onAdd:function(t){this._zoomAnimated=t._zoomAnimated,this._container||this._initLayout(),t._fadeAnimated&&nt(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),t._fadeAnimated&&nt(this._container,1),this.bringToFront(),this.options.interactive&&(k(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(t){t._fadeAnimated?(nt(this._container,0),this._removeTimeout=setTimeout(d(D,void 0,this._container),200)):D(this._container),this.options.interactive&&(F(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(t){return this._latlng=z(t),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(t){return this._content=t,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var t={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&Nt(this._container),this},bringToBack:function(){return this._map&&Rt(this._container),this},_prepareOpen:function(t){var e=this._source;if(!e._map)return!1;if(e instanceof gt){e=null;var i=this._source._layers;for(var n in i)if(i[n]._map){e=i[n];break}if(!e)return!1;this._source=e}if(!t)if(e.getCenter)t=e.getCenter();else if(e.getLatLng)t=e.getLatLng();else if(e.getBounds)t=e.getBounds().getCenter();else throw new Error("Unable to get source layer LatLng.");return this.setLatLng(t),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var t=this._contentNode,e=typeof this._content=="function"?this._content(this._source||this):this._content;if(typeof e=="string")t.innerHTML=e;else{for(;t.hasChildNodes();)t.removeChild(t.firstChild);t.appendChild(e)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var t=this._map.latLngToLayerPoint(this._latlng),e=x(this.options.offset),i=this._getAnchor();this._zoomAnimated?U(this._container,t.add(i)):e=e.add(t).add(i);var n=this._containerBottom=-e.y,o=this._containerLeft=-Math.round(this._containerWidth/2)+e.x;this._container.style.bottom=n+"px",this._container.style.left=o+"px"}},_getAnchor:function(){return[0,0]}});E.include({_initOverlay:function(t,e,i,n){var o=e;return o instanceof t||(o=new t(n).setContent(e)),i&&o.setLatLng(i),o}}),ht.include({_initOverlay:function(t,e,i,n){var o=i;return o instanceof t?(C(o,n),o._source=this):(o=e&&!n?e:new t(n,this),o.setContent(i)),o}});var Ne=ft.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(t){return t=arguments.length?t:this._source._map,!t.hasLayer(this)&&t._popup&&t._popup.options.autoClose&&t.removeLayer(t._popup),t._popup=this,ft.prototype.openOn.call(this,t)},onAdd:function(t){ft.prototype.onAdd.call(this,t),t.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof Lt||this._source.on("preclick",Ct))},onRemove:function(t){ft.prototype.onRemove.call(this,t),t.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof Lt||this._source.off("preclick",Ct))},getEvents:function(){var t=ft.prototype.getEvents.call(this);return(this.options.closeOnClick!==void 0?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(t.preclick=this.close),this.options.keepInView&&(t.moveend=this._adjustPan),t},_initLayout:function(){var t="leaflet-popup",e=this._container=M("div",t+" "+(this.options.className||"")+" leaflet-zoom-animated"),i=this._wrapper=M("div",t+"-content-wrapper",e);if(this._contentNode=M("div",t+"-content",i),ie(e),vi(this._contentNode),b(e,"contextmenu",Ct),this._tipContainer=M("div",t+"-tip-container",e),this._tip=M("div",t+"-tip",this._tipContainer),this.options.closeButton){var n=this._closeButton=M("a",t+"-close-button",e);n.setAttribute("role","button"),n.setAttribute("aria-label","Close popup"),n.href="#close",n.innerHTML='<span aria-hidden="true">&#215;</span>',b(n,"click",function(o){K(o),this.close()},this)}},_updateLayout:function(){var t=this._contentNode,e=t.style;e.width="",e.whiteSpace="nowrap";var i=t.offsetWidth;i=Math.min(i,this.options.maxWidth),i=Math.max(i,this.options.minWidth),e.width=i+1+"px",e.whiteSpace="",e.height="";var n=t.offsetHeight,o=this.options.maxHeight,r="leaflet-popup-scrolled";o&&n>o?(e.height=o+"px",k(t,r)):F(t,r),this._containerWidth=this._container.offsetWidth},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center),i=this._getAnchor();U(this._container,e.add(i))},_adjustPan:function(){if(this.options.autoPan){if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning){this._autopanning=!1;return}var t=this._map,e=parseInt(Xt(this._container,"marginBottom"),10)||0,i=this._container.offsetHeight+e,n=this._containerWidth,o=new w(this._containerLeft,-i-this._containerBottom);o._add(Et(this._container));var r=t.layerPointToContainerPoint(o),l=x(this.options.autoPanPadding),c=x(this.options.autoPanPaddingTopLeft||l),f=x(this.options.autoPanPaddingBottomRight||l),p=t.getSize(),g=0,y=0;r.x+n+f.x>p.x&&(g=r.x+n-p.x+f.x),r.x-g-c.x<0&&(g=r.x-c.x),r.y+i+f.y>p.y&&(y=r.y+i-p.y+f.y),r.y-y-c.y<0&&(y=r.y-c.y),(g||y)&&(this.options.keepInView&&(this._autopanning=!0),t.fire("autopanstart").panBy([g,y]))}},_getAnchor:function(){return x(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),Ws=function(t,e){return new Ne(t,e)};E.mergeOptions({closePopupOnClick:!0}),E.include({openPopup:function(t,e,i){return this._initOverlay(Ne,t,e,i).openOn(this),this},closePopup:function(t){return t=arguments.length?t:this._popup,t&&t.close(),this}}),ht.include({bindPopup:function(t,e){return this._popup=this._initOverlay(Ne,this._popup,t,e),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(t){return this._popup&&(this instanceof gt||(this._popup._source=this),this._popup._prepareOpen(t||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return this._popup?this._popup.isOpen():!1},setPopupContent:function(t){return this._popup&&this._popup.setContent(t),this},getPopup:function(){return this._popup},_openPopup:function(t){if(!(!this._popup||!this._map)){Mt(t);var e=t.layer||t.target;if(this._popup._source===e&&!(e instanceof Lt)){this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(t.latlng);return}this._popup._source=e,this.openPopup(t.latlng)}},_movePopup:function(t){this._popup.setLatLng(t.latlng)},_onKeyPress:function(t){t.originalEvent.keyCode===13&&this._openPopup(t)}});var Re=ft.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(t){ft.prototype.onAdd.call(this,t),this.setOpacity(this.options.opacity),t.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(t){ft.prototype.onRemove.call(this,t),t.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var t=ft.prototype.getEvents.call(this);return this.options.permanent||(t.preclick=this.close),t},_initLayout:function(){var t="leaflet-tooltip",e=t+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=M("div",e),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+_(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(t){var e,i,n=this._map,o=this._container,r=n.latLngToContainerPoint(n.getCenter()),l=n.layerPointToContainerPoint(t),c=this.options.direction,f=o.offsetWidth,p=o.offsetHeight,g=x(this.options.offset),y=this._getAnchor();c==="top"?(e=f/2,i=p):c==="bottom"?(e=f/2,i=0):c==="center"?(e=f/2,i=p/2):c==="right"?(e=0,i=p/2):c==="left"?(e=f,i=p/2):l.x<r.x?(c="right",e=0,i=p/2):(c="left",e=f+(g.x+y.x)*2,i=p/2),t=t.subtract(x(e,i,!0)).add(g).add(y),F(o,"leaflet-tooltip-right"),F(o,"leaflet-tooltip-left"),F(o,"leaflet-tooltip-top"),F(o,"leaflet-tooltip-bottom"),k(o,"leaflet-tooltip-"+c),U(o,t)},_updatePosition:function(){var t=this._map.latLngToLayerPoint(this._latlng);this._setPosition(t)},setOpacity:function(t){this.options.opacity=t,this._container&&nt(this._container,t)},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);this._setPosition(e)},_getAnchor:function(){return x(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),Us=function(t,e){return new Re(t,e)};E.include({openTooltip:function(t,e,i){return this._initOverlay(Re,t,e,i).openOn(this),this},closeTooltip:function(t){return t.close(),this}}),ht.include({bindTooltip:function(t,e){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(Re,this._tooltip,t,e),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(t){if(!(!t&&this._tooltipHandlersAdded)){var e=t?"off":"on",i={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?i.add=this._openTooltip:(i.mouseover=this._openTooltip,i.mouseout=this.closeTooltip,i.click=this._openTooltip,this._map?this._addFocusListeners():i.add=this._addFocusListeners),this._tooltip.options.sticky&&(i.mousemove=this._moveTooltip),this[e](i),this._tooltipHandlersAdded=!t}},openTooltip:function(t){return this._tooltip&&(this instanceof gt||(this._tooltip._source=this),this._tooltip._prepareOpen(t)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(t){return this._tooltip&&this._tooltip.setContent(t),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(t){var e=typeof t.getElement=="function"&&t.getElement();e&&(b(e,"focus",function(){this._tooltip._source=t,this.openTooltip()},this),b(e,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(t){var e=typeof t.getElement=="function"&&t.getElement();e&&e.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(t){if(!(!this._tooltip||!this._map)){if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var e=this;this._map.once("moveend",function(){e._openOnceFlag=!1,e._openTooltip(t)});return}this._tooltip._source=t.layer||t.target,this.openTooltip(this._tooltip.options.sticky?t.latlng:void 0)}},_moveTooltip:function(t){var e=t.latlng,i,n;this._tooltip.options.sticky&&t.originalEvent&&(i=this._map.mouseEventToContainerPoint(t.originalEvent),n=this._map.containerPointToLayerPoint(i),e=this._map.layerPointToLatLng(n)),this._tooltip.setLatLng(e)}});var Fn=Ht.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(t){var e=t&&t.tagName==="DIV"?t:document.createElement("div"),i=this.options;if(i.html instanceof Element?(Te(e),e.appendChild(i.html)):e.innerHTML=i.html!==!1?i.html:"",i.bgPos){var n=x(i.bgPos);e.style.backgroundPosition=-n.x+"px "+-n.y+"px"}return this._setIconStyles(e,"icon"),e},createShadow:function(){return null}});function qs(t){return new Fn(t)}Ht.Default=se;var re=ht.extend({options:{tileSize:256,opacity:1,updateWhenIdle:v.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(t){C(this,t)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(t){t._addZoomLimit(this)},onRemove:function(t){this._removeAllTiles(),D(this._container),t._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(Nt(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(Rt(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(t){return this.options.opacity=t,this._updateOpacity(),this},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var t=this._clampZoom(this._map.getZoom());t!==this._tileZoom&&(this._tileZoom=t,this._updateLevels()),this._update()}return this},getEvents:function(){var t={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=A(this._onMoveEnd,this.options.updateInterval,this)),t.move=this._onMove),this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},createTile:function(){return document.createElement("div")},getTileSize:function(){var t=this.options.tileSize;return t instanceof w?t:new w(t,t)},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(t){for(var e=this.getPane().children,i=-t(-1/0,1/0),n=0,o=e.length,r;n<o;n++)r=e[n].style.zIndex,e[n]!==this._container&&r&&(i=t(i,+r));isFinite(i)&&(this.options.zIndex=i+t(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!v.ielt9){nt(this._container,this.options.opacity);var t=+new Date,e=!1,i=!1;for(var n in this._tiles){var o=this._tiles[n];if(!(!o.current||!o.loaded)){var r=Math.min(1,(t-o.loaded)/200);nt(o.el,r),r<1?e=!0:(o.active?i=!0:this._onOpaqueTile(o),o.active=!0)}}i&&!this._noPrune&&this._pruneTiles(),e&&(it(this._fadeFrame),this._fadeFrame=Y(this._updateOpacity,this))}},_onOpaqueTile:T,_initContainer:function(){this._container||(this._container=M("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var t=this._tileZoom,e=this.options.maxZoom;if(t!==void 0){for(var i in this._levels)i=Number(i),this._levels[i].el.children.length||i===t?(this._levels[i].el.style.zIndex=e-Math.abs(t-i),this._onUpdateLevel(i)):(D(this._levels[i].el),this._removeTilesAtZoom(i),this._onRemoveLevel(i),delete this._levels[i]);var n=this._levels[t],o=this._map;return n||(n=this._levels[t]={},n.el=M("div","leaflet-tile-container leaflet-zoom-animated",this._container),n.el.style.zIndex=e,n.origin=o.project(o.unproject(o.getPixelOrigin()),t).round(),n.zoom=t,this._setZoomTransform(n,o.getCenter(),o.getZoom()),T(n.el.offsetWidth),this._onCreateLevel(n)),this._level=n,n}},_onUpdateLevel:T,_onRemoveLevel:T,_onCreateLevel:T,_pruneTiles:function(){if(this._map){var t,e,i=this._map.getZoom();if(i>this.options.maxZoom||i<this.options.minZoom){this._removeAllTiles();return}for(t in this._tiles)e=this._tiles[t],e.retain=e.current;for(t in this._tiles)if(e=this._tiles[t],e.current&&!e.active){var n=e.coords;this._retainParent(n.x,n.y,n.z,n.z-5)||this._retainChildren(n.x,n.y,n.z,n.z+2)}for(t in this._tiles)this._tiles[t].retain||this._removeTile(t)}},_removeTilesAtZoom:function(t){for(var e in this._tiles)this._tiles[e].coords.z===t&&this._removeTile(e)},_removeAllTiles:function(){for(var t in this._tiles)this._removeTile(t)},_invalidateAll:function(){for(var t in this._levels)D(this._levels[t].el),this._onRemoveLevel(Number(t)),delete this._levels[t];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(t,e,i,n){var o=Math.floor(t/2),r=Math.floor(e/2),l=i-1,c=new w(+o,+r);c.z=+l;var f=this._tileCoordsToKey(c),p=this._tiles[f];return p&&p.active?(p.retain=!0,!0):(p&&p.loaded&&(p.retain=!0),l>n?this._retainParent(o,r,l,n):!1)},_retainChildren:function(t,e,i,n){for(var o=2*t;o<2*t+2;o++)for(var r=2*e;r<2*e+2;r++){var l=new w(o,r);l.z=i+1;var c=this._tileCoordsToKey(l),f=this._tiles[c];if(f&&f.active){f.retain=!0;continue}else f&&f.loaded&&(f.retain=!0);i+1<n&&this._retainChildren(o,r,i+1,n)}},_resetView:function(t){var e=t&&(t.pinch||t.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),e,e)},_animateZoom:function(t){this._setView(t.center,t.zoom,!0,t.noUpdate)},_clampZoom:function(t){var e=this.options;return e.minNativeZoom!==void 0&&t<e.minNativeZoom?e.minNativeZoom:e.maxNativeZoom!==void 0&&e.maxNativeZoom<t?e.maxNativeZoom:t},_setView:function(t,e,i,n){var o=Math.round(e);this.options.maxZoom!==void 0&&o>this.options.maxZoom||this.options.minZoom!==void 0&&o<this.options.minZoom?o=void 0:o=this._clampZoom(o);var r=this.options.updateWhenZooming&&o!==this._tileZoom;(!n||r)&&(this._tileZoom=o,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),o!==void 0&&this._update(t),i||this._pruneTiles(),this._noPrune=!!i),this._setZoomTransforms(t,e)},_setZoomTransforms:function(t,e){for(var i in this._levels)this._setZoomTransform(this._levels[i],t,e)},_setZoomTransform:function(t,e,i){var n=this._map.getZoomScale(i,t.zoom),o=t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e,i)).round();v.any3d?zt(t.el,o,n):U(t.el,o)},_resetGrid:function(){var t=this._map,e=t.options.crs,i=this._tileSize=this.getTileSize(),n=this._tileZoom,o=this._map.getPixelWorldBounds(this._tileZoom);o&&(this._globalTileRange=this._pxBoundsToTileRange(o)),this._wrapX=e.wrapLng&&!this.options.noWrap&&[Math.floor(t.project([0,e.wrapLng[0]],n).x/i.x),Math.ceil(t.project([0,e.wrapLng[1]],n).x/i.y)],this._wrapY=e.wrapLat&&!this.options.noWrap&&[Math.floor(t.project([e.wrapLat[0],0],n).y/i.x),Math.ceil(t.project([e.wrapLat[1],0],n).y/i.y)]},_onMoveEnd:function(){!this._map||this._map._animatingZoom||this._update()},_getTiledPixelBounds:function(t){var e=this._map,i=e._animatingZoom?Math.max(e._animateToZoom,e.getZoom()):e.getZoom(),n=e.getZoomScale(i,this._tileZoom),o=e.project(t,this._tileZoom).floor(),r=e.getSize().divideBy(n*2);return new R(o.subtract(r),o.add(r))},_update:function(t){var e=this._map;if(e){var i=this._clampZoom(e.getZoom());if(t===void 0&&(t=e.getCenter()),this._tileZoom!==void 0){var n=this._getTiledPixelBounds(t),o=this._pxBoundsToTileRange(n),r=o.getCenter(),l=[],c=this.options.keepBuffer,f=new R(o.getBottomLeft().subtract([c,-c]),o.getTopRight().add([c,-c]));if(!(isFinite(o.min.x)&&isFinite(o.min.y)&&isFinite(o.max.x)&&isFinite(o.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var p in this._tiles){var g=this._tiles[p].coords;(g.z!==this._tileZoom||!f.contains(new w(g.x,g.y)))&&(this._tiles[p].current=!1)}if(Math.abs(i-this._tileZoom)>1){this._setView(t,i);return}for(var y=o.min.y;y<=o.max.y;y++)for(var S=o.min.x;S<=o.max.x;S++){var j=new w(S,y);if(j.z=this._tileZoom,!!this._isValidTile(j)){var V=this._tiles[this._tileCoordsToKey(j)];V?V.current=!0:l.push(j)}}if(l.sort(function(Q,qt){return Q.distanceTo(r)-qt.distanceTo(r)}),l.length!==0){this._loading||(this._loading=!0,this.fire("loading"));var st=document.createDocumentFragment();for(S=0;S<l.length;S++)this._addTile(l[S],st);this._level.el.appendChild(st)}}}},_isValidTile:function(t){var e=this._map.options.crs;if(!e.infinite){var i=this._globalTileRange;if(!e.wrapLng&&(t.x<i.min.x||t.x>i.max.x)||!e.wrapLat&&(t.y<i.min.y||t.y>i.max.y))return!1}if(!this.options.bounds)return!0;var n=this._tileCoordsToBounds(t);return W(this.options.bounds).overlaps(n)},_keyToBounds:function(t){return this._tileCoordsToBounds(this._keyToTileCoords(t))},_tileCoordsToNwSe:function(t){var e=this._map,i=this.getTileSize(),n=t.scaleBy(i),o=n.add(i),r=e.unproject(n,t.z),l=e.unproject(o,t.z);return[r,l]},_tileCoordsToBounds:function(t){var e=this._tileCoordsToNwSe(t),i=new X(e[0],e[1]);return this.options.noWrap||(i=this._map.wrapLatLngBounds(i)),i},_tileCoordsToKey:function(t){return t.x+":"+t.y+":"+t.z},_keyToTileCoords:function(t){var e=t.split(":"),i=new w(+e[0],+e[1]);return i.z=+e[2],i},_removeTile:function(t){var e=this._tiles[t];e&&(D(e.el),delete this._tiles[t],this.fire("tileunload",{tile:e.el,coords:this._keyToTileCoords(t)}))},_initTile:function(t){k(t,"leaflet-tile");var e=this.getTileSize();t.style.width=e.x+"px",t.style.height=e.y+"px",t.onselectstart=T,t.onmousemove=T,v.ielt9&&this.options.opacity<1&&nt(t,this.options.opacity)},_addTile:function(t,e){var i=this._getTilePos(t),n=this._tileCoordsToKey(t),o=this.createTile(this._wrapCoords(t),d(this._tileReady,this,t));this._initTile(o),this.createTile.length<2&&Y(d(this._tileReady,this,t,null,o)),U(o,i),this._tiles[n]={el:o,coords:t,current:!0},e.appendChild(o),this.fire("tileloadstart",{tile:o,coords:t})},_tileReady:function(t,e,i){e&&this.fire("tileerror",{error:e,tile:i,coords:t});var n=this._tileCoordsToKey(t);i=this._tiles[n],i&&(i.loaded=+new Date,this._map._fadeAnimated?(nt(i.el,0),it(this._fadeFrame),this._fadeFrame=Y(this._updateOpacity,this)):(i.active=!0,this._pruneTiles()),e||(k(i.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:i.el,coords:t})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),v.ielt9||!this._map._fadeAnimated?Y(this._pruneTiles,this):setTimeout(d(this._pruneTiles,this),250)))},_getTilePos:function(t){return t.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(t){var e=new w(this._wrapX?P(t.x,this._wrapX):t.x,this._wrapY?P(t.y,this._wrapY):t.y);return e.z=t.z,e},_pxBoundsToTileRange:function(t){var e=this.getTileSize();return new R(t.min.unscaleBy(e).floor(),t.max.unscaleBy(e).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var t in this._tiles)if(!this._tiles[t].loaded)return!1;return!0}});function Vs(t){return new re(t)}var Ut=re.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(t,e){this._url=t,e=C(this,e),e.detectRetina&&v.retina&&e.maxZoom>0?(e.tileSize=Math.floor(e.tileSize/2),e.zoomReverse?(e.zoomOffset--,e.minZoom=Math.min(e.maxZoom,e.minZoom+1)):(e.zoomOffset++,e.maxZoom=Math.max(e.minZoom,e.maxZoom-1)),e.minZoom=Math.max(0,e.minZoom)):e.zoomReverse?e.minZoom=Math.min(e.maxZoom,e.minZoom):e.maxZoom=Math.max(e.minZoom,e.maxZoom),typeof e.subdomains=="string"&&(e.subdomains=e.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(t,e){return this._url===t&&e===void 0&&(e=!0),this._url=t,e||this.redraw(),this},createTile:function(t,e){var i=document.createElement("img");return b(i,"load",d(this._tileOnLoad,this,e,i)),b(i,"error",d(this._tileOnError,this,e,i)),(this.options.crossOrigin||this.options.crossOrigin==="")&&(i.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),typeof this.options.referrerPolicy=="string"&&(i.referrerPolicy=this.options.referrerPolicy),i.alt="",i.src=this.getTileUrl(t),i},getTileUrl:function(t){var e={r:v.retina?"@2x":"",s:this._getSubdomain(t),x:t.x,y:t.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var i=this._globalTileRange.max.y-t.y;this.options.tms&&(e.y=i),e["-y"]=i}return Wi(this._url,a(e,this.options))},_tileOnLoad:function(t,e){v.ielt9?setTimeout(d(t,this,null,e),0):t(null,e)},_tileOnError:function(t,e,i){var n=this.options.errorTileUrl;n&&e.getAttribute("src")!==n&&(e.src=n),t(i,e)},_onTileRemove:function(t){t.tile.onload=null},_getZoomForUrl:function(){var t=this._tileZoom,e=this.options.maxZoom,i=this.options.zoomReverse,n=this.options.zoomOffset;return i&&(t=e-t),t+n},_getSubdomain:function(t){var e=Math.abs(t.x+t.y)%this.options.subdomains.length;return this.options.subdomains[e]},_abortLoading:function(){var t,e;for(t in this._tiles)if(this._tiles[t].coords.z!==this._tileZoom&&(e=this._tiles[t].el,e.onload=T,e.onerror=T,!e.complete)){e.src=be;var i=this._tiles[t].coords;D(e),delete this._tiles[t],this.fire("tileabort",{tile:e,coords:i})}},_removeTile:function(t){var e=this._tiles[t];if(e)return e.el.setAttribute("src",be),re.prototype._removeTile.call(this,t)},_tileReady:function(t,e,i){if(!(!this._map||i&&i.getAttribute("src")===be))return re.prototype._tileReady.call(this,t,e,i)}});function Wn(t,e){return new Ut(t,e)}var Un=Ut.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(t,e){this._url=t;var i=a({},this.defaultWmsParams);for(var n in e)n in this.options||(i[n]=e[n]);e=C(this,e);var o=e.detectRetina&&v.retina?2:1,r=this.getTileSize();i.width=r.x*o,i.height=r.y*o,this.wmsParams=i},onAdd:function(t){this._crs=this.options.crs||t.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var e=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[e]=this._crs.code,Ut.prototype.onAdd.call(this,t)},getTileUrl:function(t){var e=this._tileCoordsToNwSe(t),i=this._crs,n=J(i.project(e[0]),i.project(e[1])),o=n.min,r=n.max,l=(this._wmsVersion>=1.3&&this._crs===$n?[o.y,o.x,r.y,r.x]:[o.x,o.y,r.x,r.y]).join(","),c=Ut.prototype.getTileUrl.call(this,t);return c+St(this.wmsParams,c,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+l},setParams:function(t,e){return a(this.wmsParams,t),e||this.redraw(),this}});function Gs(t,e){return new Un(t,e)}Ut.WMS=Un,Wn.wms=Gs;var xt=ht.extend({options:{padding:.1},initialize:function(t){C(this,t),_(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),k(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var t={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(t.zoomanim=this._onAnimZoom),t},_onAnimZoom:function(t){this._updateTransform(t.center,t.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(t,e){var i=this._map.getZoomScale(e,this._zoom),n=this._map.getSize().multiplyBy(.5+this.options.padding),o=this._map.project(this._center,e),r=n.multiplyBy(-i).add(o).subtract(this._map._getNewPixelOrigin(t,e));v.any3d?zt(this._container,r,i):U(this._container,r)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var t in this._layers)this._layers[t]._reset()},_onZoomEnd:function(){for(var t in this._layers)this._layers[t]._project()},_updatePaths:function(){for(var t in this._layers)this._layers[t]._update()},_update:function(){var t=this.options.padding,e=this._map.getSize(),i=this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();this._bounds=new R(i,i.add(e.multiplyBy(1+t*2)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),qn=xt.extend({options:{tolerance:0},getEvents:function(){var t=xt.prototype.getEvents.call(this);return t.viewprereset=this._onViewPreReset,t},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){xt.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var t=this._container=document.createElement("canvas");b(t,"mousemove",this._onMouseMove,this),b(t,"click dblclick mousedown mouseup contextmenu",this._onClick,this),b(t,"mouseout",this._handleMouseOut,this),t._leaflet_disable_events=!0,this._ctx=t.getContext("2d")},_destroyContainer:function(){it(this._redrawRequest),delete this._ctx,D(this._container),B(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){var t;this._redrawBounds=null;for(var e in this._layers)t=this._layers[e],t._update();this._redraw()}},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){xt.prototype._update.call(this);var t=this._bounds,e=this._container,i=t.getSize(),n=v.retina?2:1;U(e,t.min),e.width=n*i.x,e.height=n*i.y,e.style.width=i.x+"px",e.style.height=i.y+"px",v.retina&&this._ctx.scale(2,2),this._ctx.translate(-t.min.x,-t.min.y),this.fire("update")}},_reset:function(){xt.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(t){this._updateDashArray(t),this._layers[_(t)]=t;var e=t._order={layer:t,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=e),this._drawLast=e,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(t){this._requestRedraw(t)},_removePath:function(t){var e=t._order,i=e.next,n=e.prev;i?i.prev=n:this._drawLast=n,n?n.next=i:this._drawFirst=i,delete t._order,delete this._layers[_(t)],this._requestRedraw(t)},_updatePath:function(t){this._extendRedrawBounds(t),t._project(),t._update(),this._requestRedraw(t)},_updateStyle:function(t){this._updateDashArray(t),this._requestRedraw(t)},_updateDashArray:function(t){if(typeof t.options.dashArray=="string"){var e=t.options.dashArray.split(/[, ]+/),i=[],n,o;for(o=0;o<e.length;o++){if(n=Number(e[o]),isNaN(n))return;i.push(n)}t.options._dashArray=i}else t.options._dashArray=t.options.dashArray},_requestRedraw:function(t){this._map&&(this._extendRedrawBounds(t),this._redrawRequest=this._redrawRequest||Y(this._redraw,this))},_extendRedrawBounds:function(t){if(t._pxBounds){var e=(t.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new R,this._redrawBounds.extend(t._pxBounds.min.subtract([e,e])),this._redrawBounds.extend(t._pxBounds.max.add([e,e]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var t=this._redrawBounds;if(t){var e=t.getSize();this._ctx.clearRect(t.min.x,t.min.y,e.x,e.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var t,e=this._redrawBounds;if(this._ctx.save(),e){var i=e.getSize();this._ctx.beginPath(),this._ctx.rect(e.min.x,e.min.y,i.x,i.y),this._ctx.clip()}this._drawing=!0;for(var n=this._drawFirst;n;n=n.next)t=n.layer,(!e||t._pxBounds&&t._pxBounds.intersects(e))&&t._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(t,e){if(this._drawing){var i,n,o,r,l=t._parts,c=l.length,f=this._ctx;if(c){for(f.beginPath(),i=0;i<c;i++){for(n=0,o=l[i].length;n<o;n++)r=l[i][n],f[n?"lineTo":"moveTo"](r.x,r.y);e&&f.closePath()}this._fillStroke(f,t)}}},_updateCircle:function(t){if(!(!this._drawing||t._empty())){var e=t._point,i=this._ctx,n=Math.max(Math.round(t._radius),1),o=(Math.max(Math.round(t._radiusY),1)||n)/n;o!==1&&(i.save(),i.scale(1,o)),i.beginPath(),i.arc(e.x,e.y/o,n,0,Math.PI*2,!1),o!==1&&i.restore(),this._fillStroke(i,t)}},_fillStroke:function(t,e){var i=e.options;i.fill&&(t.globalAlpha=i.fillOpacity,t.fillStyle=i.fillColor||i.color,t.fill(i.fillRule||"evenodd")),i.stroke&&i.weight!==0&&(t.setLineDash&&t.setLineDash(e.options&&e.options._dashArray||[]),t.globalAlpha=i.opacity,t.lineWidth=i.weight,t.strokeStyle=i.color,t.lineCap=i.lineCap,t.lineJoin=i.lineJoin,t.stroke())},_onClick:function(t){for(var e=this._map.mouseEventToLayerPoint(t),i,n,o=this._drawFirst;o;o=o.next)i=o.layer,i.options.interactive&&i._containsPoint(e)&&(!(t.type==="click"||t.type==="preclick")||!this._map._draggableMoved(i))&&(n=i);this._fireEvent(n?[n]:!1,t)},_onMouseMove:function(t){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var e=this._map.mouseEventToLayerPoint(t);this._handleMouseHover(t,e)}},_handleMouseOut:function(t){var e=this._hoveredLayer;e&&(F(this._container,"leaflet-interactive"),this._fireEvent([e],t,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(t,e){if(!this._mouseHoverThrottled){for(var i,n,o=this._drawFirst;o;o=o.next)i=o.layer,i.options.interactive&&i._containsPoint(e)&&(n=i);n!==this._hoveredLayer&&(this._handleMouseOut(t),n&&(k(this._container,"leaflet-interactive"),this._fireEvent([n],t,"mouseover"),this._hoveredLayer=n)),this._fireEvent(this._hoveredLayer?[this._hoveredLayer]:!1,t),this._mouseHoverThrottled=!0,setTimeout(d(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(t,e,i){this._map._fireDOMEvent(e,i||e.type,t)},_bringToFront:function(t){var e=t._order;if(e){var i=e.next,n=e.prev;if(i)i.prev=n;else return;n?n.next=i:i&&(this._drawFirst=i),e.prev=this._drawLast,this._drawLast.next=e,e.next=null,this._drawLast=e,this._requestRedraw(t)}},_bringToBack:function(t){var e=t._order;if(e){var i=e.next,n=e.prev;if(n)n.next=i;else return;i?i.prev=n:n&&(this._drawLast=n),e.prev=null,e.next=this._drawFirst,this._drawFirst.prev=e,this._drawFirst=e,this._requestRedraw(t)}}});function Vn(t){return v.canvas?new qn(t):null}var ae=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(t){return document.createElement("<lvml:"+t+' class="lvml">')}}catch{}return function(t){return document.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}(),Ks={_initContainer:function(){this._container=M("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(xt.prototype._update.call(this),this.fire("update"))},_initPath:function(t){var e=t._container=ae("shape");k(e,"leaflet-vml-shape "+(this.options.className||"")),e.coordsize="1 1",t._path=ae("path"),e.appendChild(t._path),this._updateStyle(t),this._layers[_(t)]=t},_addPath:function(t){var e=t._container;this._container.appendChild(e),t.options.interactive&&t.addInteractiveTarget(e)},_removePath:function(t){var e=t._container;D(e),t.removeInteractiveTarget(e),delete this._layers[_(t)]},_updateStyle:function(t){var e=t._stroke,i=t._fill,n=t.options,o=t._container;o.stroked=!!n.stroke,o.filled=!!n.fill,n.stroke?(e||(e=t._stroke=ae("stroke")),o.appendChild(e),e.weight=n.weight+"px",e.color=n.color,e.opacity=n.opacity,n.dashArray?e.dashStyle=at(n.dashArray)?n.dashArray.join(" "):n.dashArray.replace(/( *, *)/g," "):e.dashStyle="",e.endcap=n.lineCap.replace("butt","flat"),e.joinstyle=n.lineJoin):e&&(o.removeChild(e),t._stroke=null),n.fill?(i||(i=t._fill=ae("fill")),o.appendChild(i),i.color=n.fillColor||n.color,i.opacity=n.fillOpacity):i&&(o.removeChild(i),t._fill=null)},_updateCircle:function(t){var e=t._point.round(),i=Math.round(t._radius),n=Math.round(t._radiusY||i);this._setPath(t,t._empty()?"M0 0":"AL "+e.x+","+e.y+" "+i+","+n+" 0,"+65535*360)},_setPath:function(t,e){t._path.v=e},_bringToFront:function(t){Nt(t._container)},_bringToBack:function(t){Rt(t._container)}},De=v.vml?ae:ji,le=xt.extend({_initContainer:function(){this._container=De("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=De("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){D(this._container),B(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){xt.prototype._update.call(this);var t=this._bounds,e=t.getSize(),i=this._container;(!this._svgSize||!this._svgSize.equals(e))&&(this._svgSize=e,i.setAttribute("width",e.x),i.setAttribute("height",e.y)),U(i,t.min),i.setAttribute("viewBox",[t.min.x,t.min.y,e.x,e.y].join(" ")),this.fire("update")}},_initPath:function(t){var e=t._path=De("path");t.options.className&&k(e,t.options.className),t.options.interactive&&k(e,"leaflet-interactive"),this._updateStyle(t),this._layers[_(t)]=t},_addPath:function(t){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(t._path),t.addInteractiveTarget(t._path)},_removePath:function(t){D(t._path),t.removeInteractiveTarget(t._path),delete this._layers[_(t)]},_updatePath:function(t){t._project(),t._update()},_updateStyle:function(t){var e=t._path,i=t.options;e&&(i.stroke?(e.setAttribute("stroke",i.color),e.setAttribute("stroke-opacity",i.opacity),e.setAttribute("stroke-width",i.weight),e.setAttribute("stroke-linecap",i.lineCap),e.setAttribute("stroke-linejoin",i.lineJoin),i.dashArray?e.setAttribute("stroke-dasharray",i.dashArray):e.removeAttribute("stroke-dasharray"),i.dashOffset?e.setAttribute("stroke-dashoffset",i.dashOffset):e.removeAttribute("stroke-dashoffset")):e.setAttribute("stroke","none"),i.fill?(e.setAttribute("fill",i.fillColor||i.color),e.setAttribute("fill-opacity",i.fillOpacity),e.setAttribute("fill-rule",i.fillRule||"evenodd")):e.setAttribute("fill","none"))},_updatePoly:function(t,e){this._setPath(t,Yi(t._parts,e))},_updateCircle:function(t){var e=t._point,i=Math.max(Math.round(t._radius),1),n=Math.max(Math.round(t._radiusY),1)||i,o="a"+i+","+n+" 0 1,0 ",r=t._empty()?"M0 0":"M"+(e.x-i)+","+e.y+o+i*2+",0 "+o+-i*2+",0 ";this._setPath(t,r)},_setPath:function(t,e){t._path.setAttribute("d",e)},_bringToFront:function(t){Nt(t._path)},_bringToBack:function(t){Rt(t._path)}});v.vml&&le.include(Ks);function Gn(t){return v.svg||v.vml?new le(t):null}E.include({getRenderer:function(t){var e=t.options.renderer||this._getPaneRenderer(t.options.pane)||this.options.renderer||this._renderer;return e||(e=this._renderer=this._createRenderer()),this.hasLayer(e)||this.addLayer(e),e},_getPaneRenderer:function(t){if(t==="overlayPane"||t===void 0)return!1;var e=this._paneRenderers[t];return e===void 0&&(e=this._createRenderer({pane:t}),this._paneRenderers[t]=e),e},_createRenderer:function(t){return this.options.preferCanvas&&Vn(t)||Gn(t)}});var Kn=Ft.extend({initialize:function(t,e){Ft.prototype.initialize.call(this,this._boundsToLatLngs(t),e)},setBounds:function(t){return this.setLatLngs(this._boundsToLatLngs(t))},_boundsToLatLngs:function(t){return t=W(t),[t.getSouthWest(),t.getNorthWest(),t.getNorthEast(),t.getSouthEast()]}});function js(t,e){return new Kn(t,e)}le.create=De,le.pointsToPath=Yi,yt.geometryToLayer=Oe,yt.coordsToLatLng=Si,yt.coordsToLatLngs=Ie,yt.latLngToCoords=zi,yt.latLngsToCoords=Ze,yt.getFeature=Wt,yt.asFeature=$e,E.mergeOptions({boxZoom:!0});var jn=dt.extend({initialize:function(t){this._map=t,this._container=t._container,this._pane=t._panes.overlayPane,this._resetStateTimeout=0,t.on("unload",this._destroy,this)},addHooks:function(){b(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){B(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){D(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){this._resetStateTimeout!==0&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(t){if(!t.shiftKey||t.which!==1&&t.button!==1)return!1;this._clearDeferredResetState(),this._resetState(),Qt(),ui(),this._startPoint=this._map.mouseEventToContainerPoint(t),b(document,{contextmenu:Mt,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(t){this._moved||(this._moved=!0,this._box=M("div","leaflet-zoom-box",this._container),k(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(t);var e=new R(this._point,this._startPoint),i=e.getSize();U(this._box,e.min),this._box.style.width=i.x+"px",this._box.style.height=i.y+"px"},_finish:function(){this._moved&&(D(this._box),F(this._container,"leaflet-crosshair")),te(),ci(),B(document,{contextmenu:Mt,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(t){if(!(t.which!==1&&t.button!==1)&&(this._finish(),!!this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(d(this._resetState,this),0);var e=new X(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(e).fire("boxzoomend",{boxZoomBounds:e})}},_onKeyDown:function(t){t.keyCode===27&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});E.addInitHook("addHandler","boxZoom",jn),E.mergeOptions({doubleClickZoom:!0});var Yn=dt.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(t){var e=this._map,i=e.getZoom(),n=e.options.zoomDelta,o=t.originalEvent.shiftKey?i-n:i+n;e.options.doubleClickZoom==="center"?e.setZoom(o):e.setZoomAround(t.containerPoint,o)}});E.addInitHook("addHandler","doubleClickZoom",Yn),E.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var Jn=dt.extend({addHooks:function(){if(!this._draggable){var t=this._map;this._draggable=new Pt(t._mapPane,t._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),t.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),t.on("zoomend",this._onZoomEnd,this),t.whenReady(this._onZoomEnd,this))}k(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){F(this._map._container,"leaflet-grab"),F(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var t=this._map;if(t._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var e=W(this._map.options.maxBounds);this._offsetLimit=J(this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(e.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;t.fire("movestart").fire("dragstart"),t.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(t){if(this._map.options.inertia){var e=this._lastTime=+new Date,i=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(i),this._times.push(e),this._prunePositions(e)}this._map.fire("move",t).fire("drag",t)},_prunePositions:function(t){for(;this._positions.length>1&&t-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var t=this._map.getSize().divideBy(2),e=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=e.subtract(t).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(t,e){return t-(t-e)*this._viscosity},_onPreDragLimit:function(){if(!(!this._viscosity||!this._offsetLimit)){var t=this._draggable._newPos.subtract(this._draggable._startPos),e=this._offsetLimit;t.x<e.min.x&&(t.x=this._viscousLimit(t.x,e.min.x)),t.y<e.min.y&&(t.y=this._viscousLimit(t.y,e.min.y)),t.x>e.max.x&&(t.x=this._viscousLimit(t.x,e.max.x)),t.y>e.max.y&&(t.y=this._viscousLimit(t.y,e.max.y)),this._draggable._newPos=this._draggable._startPos.add(t)}},_onPreDragWrap:function(){var t=this._worldWidth,e=Math.round(t/2),i=this._initialWorldOffset,n=this._draggable._newPos.x,o=(n-e+i)%t+e-i,r=(n+e+i)%t-e-i,l=Math.abs(o+i)<Math.abs(r+i)?o:r;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=l},_onDragEnd:function(t){var e=this._map,i=e.options,n=!i.inertia||t.noInertia||this._times.length<2;if(e.fire("dragend",t),n)e.fire("moveend");else{this._prunePositions(+new Date);var o=this._lastPos.subtract(this._positions[0]),r=(this._lastTime-this._times[0])/1e3,l=i.easeLinearity,c=o.multiplyBy(l/r),f=c.distanceTo([0,0]),p=Math.min(i.inertiaMaxSpeed,f),g=c.multiplyBy(p/f),y=p/(i.inertiaDeceleration*l),S=g.multiplyBy(-y/2).round();!S.x&&!S.y?e.fire("moveend"):(S=e._limitOffset(S,e.options.maxBounds),Y(function(){e.panBy(S,{duration:y,easeLinearity:l,noMoveStart:!0,animate:!0})}))}}});E.addInitHook("addHandler","dragging",Jn),E.mergeOptions({keyboard:!0,keyboardPanDelta:80});var Xn=dt.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(t){this._map=t,this._setPanDelta(t.options.keyboardPanDelta),this._setZoomDelta(t.options.zoomDelta)},addHooks:function(){var t=this._map._container;t.tabIndex<=0&&(t.tabIndex="0"),b(t,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),B(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var t=document.body,e=document.documentElement,i=t.scrollTop||e.scrollTop,n=t.scrollLeft||e.scrollLeft;this._map._container.focus(),window.scrollTo(n,i)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(t){var e=this._panKeys={},i=this.keyCodes,n,o;for(n=0,o=i.left.length;n<o;n++)e[i.left[n]]=[-1*t,0];for(n=0,o=i.right.length;n<o;n++)e[i.right[n]]=[t,0];for(n=0,o=i.down.length;n<o;n++)e[i.down[n]]=[0,t];for(n=0,o=i.up.length;n<o;n++)e[i.up[n]]=[0,-1*t]},_setZoomDelta:function(t){var e=this._zoomKeys={},i=this.keyCodes,n,o;for(n=0,o=i.zoomIn.length;n<o;n++)e[i.zoomIn[n]]=t;for(n=0,o=i.zoomOut.length;n<o;n++)e[i.zoomOut[n]]=-t},_addHooks:function(){b(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){B(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(t){if(!(t.altKey||t.ctrlKey||t.metaKey)){var e=t.keyCode,i=this._map,n;if(e in this._panKeys){if(!i._panAnim||!i._panAnim._inProgress)if(n=this._panKeys[e],t.shiftKey&&(n=x(n).multiplyBy(3)),i.options.maxBounds&&(n=i._limitOffset(x(n),i.options.maxBounds)),i.options.worldCopyJump){var o=i.wrapLatLng(i.unproject(i.project(i.getCenter()).add(n)));i.panTo(o)}else i.panBy(n)}else if(e in this._zoomKeys)i.setZoom(i.getZoom()+(t.shiftKey?3:1)*this._zoomKeys[e]);else if(e===27&&i._popup&&i._popup.options.closeOnEscapeKey)i.closePopup();else return;Mt(t)}}});E.addInitHook("addHandler","keyboard",Xn),E.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var Qn=dt.extend({addHooks:function(){b(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){B(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(t){var e=Pn(t),i=this._map.options.wheelDebounceTime;this._delta+=e,this._lastMousePos=this._map.mouseEventToContainerPoint(t),this._startTime||(this._startTime=+new Date);var n=Math.max(i-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(d(this._performZoom,this),n),Mt(t)},_performZoom:function(){var t=this._map,e=t.getZoom(),i=this._map.options.zoomSnap||0;t._stop();var n=this._delta/(this._map.options.wheelPxPerZoomLevel*4),o=4*Math.log(2/(1+Math.exp(-Math.abs(n))))/Math.LN2,r=i?Math.ceil(o/i)*i:o,l=t._limitZoom(e+(this._delta>0?r:-r))-e;this._delta=0,this._startTime=null,l&&(t.options.scrollWheelZoom==="center"?t.setZoom(e+l):t.setZoomAround(this._lastMousePos,e+l))}});E.addInitHook("addHandler","scrollWheelZoom",Qn);var Ys=600;E.mergeOptions({tapHold:v.touchNative&&v.safari&&v.mobile,tapTolerance:15});var to=dt.extend({addHooks:function(){b(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){B(this._map._container,"touchstart",this._onDown,this)},_onDown:function(t){if(clearTimeout(this._holdTimeout),t.touches.length===1){var e=t.touches[0];this._startPos=this._newPos=new w(e.clientX,e.clientY),this._holdTimeout=setTimeout(d(function(){this._cancel(),this._isTapValid()&&(b(document,"touchend",K),b(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",e))},this),Ys),b(document,"touchend touchcancel contextmenu",this._cancel,this),b(document,"touchmove",this._onMove,this)}},_cancelClickPrevent:function t(){B(document,"touchend",K),B(document,"touchend touchcancel",t)},_cancel:function(){clearTimeout(this._holdTimeout),B(document,"touchend touchcancel contextmenu",this._cancel,this),B(document,"touchmove",this._onMove,this)},_onMove:function(t){var e=t.touches[0];this._newPos=new w(e.clientX,e.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(t,e){var i=new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window,screenX:e.screenX,screenY:e.screenY,clientX:e.clientX,clientY:e.clientY});i._simulated=!0,e.target.dispatchEvent(i)}});E.addInitHook("addHandler","tapHold",to),E.mergeOptions({touchZoom:v.touch,bounceAtZoomLimits:!0});var eo=dt.extend({addHooks:function(){k(this._map._container,"leaflet-touch-zoom"),b(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){F(this._map._container,"leaflet-touch-zoom"),B(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(t){var e=this._map;if(!(!t.touches||t.touches.length!==2||e._animatingZoom||this._zooming)){var i=e.mouseEventToContainerPoint(t.touches[0]),n=e.mouseEventToContainerPoint(t.touches[1]);this._centerPoint=e.getSize()._divideBy(2),this._startLatLng=e.containerPointToLatLng(this._centerPoint),e.options.touchZoom!=="center"&&(this._pinchStartLatLng=e.containerPointToLatLng(i.add(n)._divideBy(2))),this._startDist=i.distanceTo(n),this._startZoom=e.getZoom(),this._moved=!1,this._zooming=!0,e._stop(),b(document,"touchmove",this._onTouchMove,this),b(document,"touchend touchcancel",this._onTouchEnd,this),K(t)}},_onTouchMove:function(t){if(!(!t.touches||t.touches.length!==2||!this._zooming)){var e=this._map,i=e.mouseEventToContainerPoint(t.touches[0]),n=e.mouseEventToContainerPoint(t.touches[1]),o=i.distanceTo(n)/this._startDist;if(this._zoom=e.getScaleZoom(o,this._startZoom),!e.options.bounceAtZoomLimits&&(this._zoom<e.getMinZoom()&&o<1||this._zoom>e.getMaxZoom()&&o>1)&&(this._zoom=e._limitZoom(this._zoom)),e.options.touchZoom==="center"){if(this._center=this._startLatLng,o===1)return}else{var r=i._add(n)._divideBy(2)._subtract(this._centerPoint);if(o===1&&r.x===0&&r.y===0)return;this._center=e.unproject(e.project(this._pinchStartLatLng,this._zoom).subtract(r),this._zoom)}this._moved||(e._moveStart(!0,!1),this._moved=!0),it(this._animRequest);var l=d(e._move,e,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=Y(l,this,!0),K(t)}},_onTouchEnd:function(){if(!this._moved||!this._zooming){this._zooming=!1;return}this._zooming=!1,it(this._animRequest),B(document,"touchmove",this._onTouchMove,this),B(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))}});E.addInitHook("addHandler","touchZoom",eo),E.BoxZoom=jn,E.DoubleClickZoom=Yn,E.Drag=Jn,E.Keyboard=Xn,E.ScrollWheelZoom=Qn,E.TapHold=to,E.TouchZoom=eo,h.Bounds=R,h.Browser=v,h.CRS=mt,h.Canvas=qn,h.Circle=ki,h.CircleMarker=Ae,h.Class=_t,h.Control=lt,h.DivIcon=Fn,h.DivOverlay=ft,h.DomEvent=ps,h.DomUtil=ds,h.Draggable=Pt,h.Evented=Kt,h.FeatureGroup=gt,h.GeoJSON=yt,h.GridLayer=re,h.Handler=dt,h.Icon=Ht,h.ImageOverlay=Be,h.LatLng=I,h.LatLngBounds=X,h.Layer=ht,h.LayerGroup=Dt,h.LineUtil=Ss,h.Map=E,h.Marker=Me,h.Mixin=ws,h.Path=Lt,h.Point=w,h.PolyUtil=bs,h.Polygon=Ft,h.Polyline=vt,h.Popup=Ne,h.PosAnimation=Ln,h.Projection=zs,h.Rectangle=Kn,h.Renderer=xt,h.SVG=le,h.SVGOverlay=Hn,h.TileLayer=Ut,h.Tooltip=Re,h.Transformation=Xe,h.Util=Io,h.VideoOverlay=Dn,h.bind=d,h.bounds=J,h.canvas=Vn,h.circle=$s,h.circleMarker=Zs,h.control=ne,h.divIcon=qs,h.extend=a,h.featureGroup=As,h.geoJSON=Rn,h.geoJson=Rs,h.gridLayer=Vs,h.icon=Os,h.imageOverlay=Ds,h.latLng=z,h.latLngBounds=W,h.layerGroup=Ms,h.map=_s,h.marker=Is,h.point=x,h.polygon=Ns,h.polyline=Bs,h.popup=Ws,h.rectangle=js,h.setOptions=C,h.stamp=_,h.svg=Gn,h.svgOverlay=Fs,h.tileLayer=Wn,h.tooltip=Us,h.transformation=jt,h.version=s,h.videoOverlay=Hs;var Js=window.L;h.noConflict=function(){return window.L=Js,this},window.L=h})});var Fe=globalThis,We=Fe.ShadowRoot&&(Fe.ShadyCSS===void 0||Fe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ai=Symbol(),so=new WeakMap,he=class{constructor(s,a,u){if(this._$cssResult$=!0,u!==Ai)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=s,this.t=a}get styleSheet(){let s=this.o,a=this.t;if(We&&s===void 0){let u=a!==void 0&&a.length===1;u&&(s=so.get(a)),s===void 0&&((this.o=s=new CSSStyleSheet).replaceSync(this.cssText),u&&so.set(a,s))}return s}toString(){return this.cssText}},Ue=h=>new he(typeof h=="string"?h:h+"",void 0,Ai),pt=(h,...s)=>{let a=h.length===1?h[0]:s.reduce((u,d,m)=>u+(_=>{if(_._$cssResult$===!0)return _.cssText;if(typeof _=="number")return _;throw Error("Value passed to 'css' function must be a 'css' function result: "+_+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(d)+h[m+1],h[0]);return new he(a,h,Ai)},ro=(h,s)=>{if(We)h.adoptedStyleSheets=s.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(let a of s){let u=document.createElement("style"),d=Fe.litNonce;d!==void 0&&u.setAttribute("nonce",d),u.textContent=a.cssText,h.appendChild(u)}},Oi=We?h=>h:h=>h instanceof CSSStyleSheet?(s=>{let a="";for(let u of s.cssRules)a+=u.cssText;return Ue(a)})(h):h;var{is:_r,defineProperty:mr,getOwnPropertyDescriptor:gr,getOwnPropertyNames:vr,getOwnPropertySymbols:yr,getPrototypeOf:xr}=Object,Tt=globalThis,ao=Tt.trustedTypes,wr=ao?ao.emptyScript:"",br=Tt.reactiveElementPolyfillSupport,ue=(h,s)=>h,Ii={toAttribute(h,s){switch(s){case Boolean:h=h?wr:null;break;case Object:case Array:h=h==null?h:JSON.stringify(h)}return h},fromAttribute(h,s){let a=h;switch(s){case Boolean:a=h!==null;break;case Number:a=h===null?null:Number(h);break;case Object:case Array:try{a=JSON.parse(h)}catch{a=null}}return a}},ho=(h,s)=>!_r(h,s),lo={attribute:!0,type:String,converter:Ii,reflect:!1,useDefault:!1,hasChanged:ho};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Tt.litPropertyMetadata??(Tt.litPropertyMetadata=new WeakMap);var wt=class extends HTMLElement{static addInitializer(s){this._$Ei(),(this.l??(this.l=[])).push(s)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(s,a=lo){if(a.state&&(a.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(s)&&((a=Object.create(a)).wrapped=!0),this.elementProperties.set(s,a),!a.noAccessor){let u=Symbol(),d=this.getPropertyDescriptor(s,u,a);d!==void 0&&mr(this.prototype,s,d)}}static getPropertyDescriptor(s,a,u){let{get:d,set:m}=gr(this.prototype,s)??{get(){return this[a]},set(_){this[a]=_}};return{get:d,set(_){let A=d?.call(this);m?.call(this,_),this.requestUpdate(s,A,u)},configurable:!0,enumerable:!0}}static getPropertyOptions(s){return this.elementProperties.get(s)??lo}static _$Ei(){if(this.hasOwnProperty(ue("elementProperties")))return;let s=xr(this);s.finalize(),s.l!==void 0&&(this.l=[...s.l]),this.elementProperties=new Map(s.elementProperties)}static finalize(){if(this.hasOwnProperty(ue("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ue("properties"))){let a=this.properties,u=[...vr(a),...yr(a)];for(let d of u)this.createProperty(d,a[d])}let s=this[Symbol.metadata];if(s!==null){let a=litPropertyMetadata.get(s);if(a!==void 0)for(let[u,d]of a)this.elementProperties.set(u,d)}this._$Eh=new Map;for(let[a,u]of this.elementProperties){let d=this._$Eu(a,u);d!==void 0&&this._$Eh.set(d,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(s){let a=[];if(Array.isArray(s)){let u=new Set(s.flat(1/0).reverse());for(let d of u)a.unshift(Oi(d))}else s!==void 0&&a.push(Oi(s));return a}static _$Eu(s,a){let u=a.attribute;return u===!1?void 0:typeof u=="string"?u:typeof s=="string"?s.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(s=>this.enableUpdating=s),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(s=>s(this))}addController(s){(this._$EO??(this._$EO=new Set)).add(s),this.renderRoot!==void 0&&this.isConnected&&s.hostConnected?.()}removeController(s){this._$EO?.delete(s)}_$E_(){let s=new Map,a=this.constructor.elementProperties;for(let u of a.keys())this.hasOwnProperty(u)&&(s.set(u,this[u]),delete this[u]);s.size>0&&(this._$Ep=s)}createRenderRoot(){let s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ro(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(s=>s.hostConnected?.())}enableUpdating(s){}disconnectedCallback(){this._$EO?.forEach(s=>s.hostDisconnected?.())}attributeChangedCallback(s,a,u){this._$AK(s,u)}_$ET(s,a){let u=this.constructor.elementProperties.get(s),d=this.constructor._$Eu(s,u);if(d!==void 0&&u.reflect===!0){let m=(u.converter?.toAttribute!==void 0?u.converter:Ii).toAttribute(a,u.type);this._$Em=s,m==null?this.removeAttribute(d):this.setAttribute(d,m),this._$Em=null}}_$AK(s,a){let u=this.constructor,d=u._$Eh.get(s);if(d!==void 0&&this._$Em!==d){let m=u.getPropertyOptions(d),_=typeof m.converter=="function"?{fromAttribute:m.converter}:m.converter?.fromAttribute!==void 0?m.converter:Ii;this._$Em=d;let A=_.fromAttribute(a,m.type);this[d]=A??this._$Ej?.get(d)??A,this._$Em=null}}requestUpdate(s,a,u,d=!1,m){if(s!==void 0){let _=this.constructor;if(d===!1&&(m=this[s]),u??(u=_.getPropertyOptions(s)),!((u.hasChanged??ho)(m,a)||u.useDefault&&u.reflect&&m===this._$Ej?.get(s)&&!this.hasAttribute(_._$Eu(s,u))))return;this.C(s,a,u)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(s,a,{useDefault:u,reflect:d,wrapped:m},_){u&&!(this._$Ej??(this._$Ej=new Map)).has(s)&&(this._$Ej.set(s,_??a??this[s]),m!==!0||_!==void 0)||(this._$AL.has(s)||(this.hasUpdated||u||(a=void 0),this._$AL.set(s,a)),d===!0&&this._$Em!==s&&(this._$Eq??(this._$Eq=new Set)).add(s))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}let s=this.scheduleUpdate();return s!=null&&await s,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[d,m]of this._$Ep)this[d]=m;this._$Ep=void 0}let u=this.constructor.elementProperties;if(u.size>0)for(let[d,m]of u){let{wrapped:_}=m,A=this[d];_!==!0||this._$AL.has(d)||A===void 0||this.C(d,void 0,m,A)}}let s=!1,a=this._$AL;try{s=this.shouldUpdate(a),s?(this.willUpdate(a),this._$EO?.forEach(u=>u.hostUpdate?.()),this.update(a)):this._$EM()}catch(u){throw s=!1,this._$EM(),u}s&&this._$AE(a)}willUpdate(s){}_$AE(s){this._$EO?.forEach(a=>a.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(s)),this.updated(s)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(s){return!0}update(s){this._$Eq&&(this._$Eq=this._$Eq.forEach(a=>this._$ET(a,this[a]))),this._$EM()}updated(s){}firstUpdated(s){}};wt.elementStyles=[],wt.shadowRootOptions={mode:"open"},wt[ue("elementProperties")]=new Map,wt[ue("finalized")]=new Map,br?.({ReactiveElement:wt}),(Tt.reactiveElementVersions??(Tt.reactiveElementVersions=[])).push("2.1.2");var de=globalThis,uo=h=>h,qe=de.trustedTypes,co=qe?qe.createPolicy("lit-html",{createHTML:h=>h}):void 0,vo="$lit$",kt=`lit$${Math.random().toFixed(9).slice(2)}$`,yo="?"+kt,Pr=`<${yo}>`,Zt=document,fe=()=>Zt.createComment(""),pe=h=>h===null||typeof h!="object"&&typeof h!="function",Hi=Array.isArray,Lr=h=>Hi(h)||typeof h?.[Symbol.iterator]=="function",Zi=`[ 	
\f\r]`,ce=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,fo=/-->/g,po=/>/g,Ot=RegExp(`>|${Zi}(?:([^\\s"'>=/]+)(${Zi}*=${Zi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_o=/'/g,mo=/"/g,xo=/^(?:script|style|textarea|title)$/i,Fi=h=>(s,...a)=>({_$litType$:h,strings:s,values:a}),N=Fi(1),$r=Fi(2),Br=Fi(3),$t=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),go=new WeakMap,It=Zt.createTreeWalker(Zt,129);function wo(h,s){if(!Hi(h)||!h.hasOwnProperty("raw"))throw Error("invalid template strings array");return co!==void 0?co.createHTML(s):s}var Tr=(h,s)=>{let a=h.length-1,u=[],d,m=s===2?"<svg>":s===3?"<math>":"",_=ce;for(let A=0;A<a;A++){let P=h[A],T,$,O=-1,G=0;for(;G<P.length&&(_.lastIndex=G,$=_.exec(P),$!==null);)G=_.lastIndex,_===ce?$[1]==="!--"?_=fo:$[1]!==void 0?_=po:$[2]!==void 0?(xo.test($[2])&&(d=RegExp("</"+$[2],"g")),_=Ot):$[3]!==void 0&&(_=Ot):_===Ot?$[0]===">"?(_=d??ce,O=-1):$[1]===void 0?O=-2:(O=_.lastIndex-$[2].length,T=$[1],_=$[3]===void 0?Ot:$[3]==='"'?mo:_o):_===mo||_===_o?_=Ot:_===fo||_===po?_=ce:(_=Ot,d=void 0);let C=_===Ot&&h[A+1].startsWith("/>")?" ":"";m+=_===ce?P+Pr:O>=0?(u.push(T),P.slice(0,O)+vo+P.slice(O)+kt+C):P+kt+(O===-2?A:C)}return[wo(h,m+(h[a]||"<?>")+(s===2?"</svg>":s===3?"</math>":"")),u]},_e=class h{constructor({strings:s,_$litType$:a},u){let d;this.parts=[];let m=0,_=0,A=s.length-1,P=this.parts,[T,$]=Tr(s,a);if(this.el=h.createElement(T,u),It.currentNode=this.el.content,a===2||a===3){let O=this.el.content.firstChild;O.replaceWith(...O.childNodes)}for(;(d=It.nextNode())!==null&&P.length<A;){if(d.nodeType===1){if(d.hasAttributes())for(let O of d.getAttributeNames())if(O.endsWith(vo)){let G=$[_++],C=d.getAttribute(O).split(kt),St=/([.?@])?(.*)/.exec(G);P.push({type:1,index:m,name:St[2],strings:C,ctor:St[1]==="."?Bi:St[1]==="?"?Ni:St[1]==="@"?Ri:Gt}),d.removeAttribute(O)}else O.startsWith(kt)&&(P.push({type:6,index:m}),d.removeAttribute(O));if(xo.test(d.tagName)){let O=d.textContent.split(kt),G=O.length-1;if(G>0){d.textContent=qe?qe.emptyScript:"";for(let C=0;C<G;C++)d.append(O[C],fe()),It.nextNode(),P.push({type:2,index:++m});d.append(O[G],fe())}}}else if(d.nodeType===8)if(d.data===yo)P.push({type:2,index:m});else{let O=-1;for(;(O=d.data.indexOf(kt,O+1))!==-1;)P.push({type:7,index:m}),O+=kt.length-1}m++}}static createElement(s,a){let u=Zt.createElement("template");return u.innerHTML=s,u}};function Vt(h,s,a=h,u){if(s===$t)return s;let d=u!==void 0?a._$Co?.[u]:a._$Cl,m=pe(s)?void 0:s._$litDirective$;return d?.constructor!==m&&(d?._$AO?.(!1),m===void 0?d=void 0:(d=new m(h),d._$AT(h,a,u)),u!==void 0?(a._$Co??(a._$Co=[]))[u]=d:a._$Cl=d),d!==void 0&&(s=Vt(h,d._$AS(h,s.values),d,u)),s}var $i=class{constructor(s,a){this._$AV=[],this._$AN=void 0,this._$AD=s,this._$AM=a}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(s){let{el:{content:a},parts:u}=this._$AD,d=(s?.creationScope??Zt).importNode(a,!0);It.currentNode=d;let m=It.nextNode(),_=0,A=0,P=u[0];for(;P!==void 0;){if(_===P.index){let T;P.type===2?T=new me(m,m.nextSibling,this,s):P.type===1?T=new P.ctor(m,P.name,P.strings,this,s):P.type===6&&(T=new Di(m,this,s)),this._$AV.push(T),P=u[++A]}_!==P?.index&&(m=It.nextNode(),_++)}return It.currentNode=Zt,d}p(s){let a=0;for(let u of this._$AV)u!==void 0&&(u.strings!==void 0?(u._$AI(s,u,a),a+=u.strings.length-2):u._$AI(s[a])),a++}},me=class h{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(s,a,u,d){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=s,this._$AB=a,this._$AM=u,this.options=d,this._$Cv=d?.isConnected??!0}get parentNode(){let s=this._$AA.parentNode,a=this._$AM;return a!==void 0&&s?.nodeType===11&&(s=a.parentNode),s}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(s,a=this){s=Vt(this,s,a),pe(s)?s===Z||s==null||s===""?(this._$AH!==Z&&this._$AR(),this._$AH=Z):s!==this._$AH&&s!==$t&&this._(s):s._$litType$!==void 0?this.$(s):s.nodeType!==void 0?this.T(s):Lr(s)?this.k(s):this._(s)}O(s){return this._$AA.parentNode.insertBefore(s,this._$AB)}T(s){this._$AH!==s&&(this._$AR(),this._$AH=this.O(s))}_(s){this._$AH!==Z&&pe(this._$AH)?this._$AA.nextSibling.data=s:this.T(Zt.createTextNode(s)),this._$AH=s}$(s){let{values:a,_$litType$:u}=s,d=typeof u=="number"?this._$AC(s):(u.el===void 0&&(u.el=_e.createElement(wo(u.h,u.h[0]),this.options)),u);if(this._$AH?._$AD===d)this._$AH.p(a);else{let m=new $i(d,this),_=m.u(this.options);m.p(a),this.T(_),this._$AH=m}}_$AC(s){let a=go.get(s.strings);return a===void 0&&go.set(s.strings,a=new _e(s)),a}k(s){Hi(this._$AH)||(this._$AH=[],this._$AR());let a=this._$AH,u,d=0;for(let m of s)d===a.length?a.push(u=new h(this.O(fe()),this.O(fe()),this,this.options)):u=a[d],u._$AI(m),d++;d<a.length&&(this._$AR(u&&u._$AB.nextSibling,d),a.length=d)}_$AR(s=this._$AA.nextSibling,a){for(this._$AP?.(!1,!0,a);s!==this._$AB;){let u=uo(s).nextSibling;uo(s).remove(),s=u}}setConnected(s){this._$AM===void 0&&(this._$Cv=s,this._$AP?.(s))}},Gt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(s,a,u,d,m){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=s,this.name=a,this._$AM=d,this.options=m,u.length>2||u[0]!==""||u[1]!==""?(this._$AH=Array(u.length-1).fill(new String),this.strings=u):this._$AH=Z}_$AI(s,a=this,u,d){let m=this.strings,_=!1;if(m===void 0)s=Vt(this,s,a,0),_=!pe(s)||s!==this._$AH&&s!==$t,_&&(this._$AH=s);else{let A=s,P,T;for(s=m[0],P=0;P<m.length-1;P++)T=Vt(this,A[u+P],a,P),T===$t&&(T=this._$AH[P]),_||(_=!pe(T)||T!==this._$AH[P]),T===Z?s=Z:s!==Z&&(s+=(T??"")+m[P+1]),this._$AH[P]=T}_&&!d&&this.j(s)}j(s){s===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,s??"")}},Bi=class extends Gt{constructor(){super(...arguments),this.type=3}j(s){this.element[this.name]=s===Z?void 0:s}},Ni=class extends Gt{constructor(){super(...arguments),this.type=4}j(s){this.element.toggleAttribute(this.name,!!s&&s!==Z)}},Ri=class extends Gt{constructor(s,a,u,d,m){super(s,a,u,d,m),this.type=5}_$AI(s,a=this){if((s=Vt(this,s,a,0)??Z)===$t)return;let u=this._$AH,d=s===Z&&u!==Z||s.capture!==u.capture||s.once!==u.once||s.passive!==u.passive,m=s!==Z&&(u===Z||d);d&&this.element.removeEventListener(this.name,this,u),m&&this.element.addEventListener(this.name,this,s),this._$AH=s}handleEvent(s){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,s):this._$AH.handleEvent(s)}},Di=class{constructor(s,a,u){this.element=s,this.type=6,this._$AN=void 0,this._$AM=a,this.options=u}get _$AU(){return this._$AM._$AU}_$AI(s){Vt(this,s)}};var kr=de.litHtmlPolyfillSupport;kr?.(_e,me),(de.litHtmlVersions??(de.litHtmlVersions=[])).push("3.3.3");var bo=(h,s,a)=>{let u=a?.renderBefore??s,d=u._$litPart$;if(d===void 0){let m=a?.renderBefore??null;u._$litPart$=d=new me(s.insertBefore(fe(),m),m,void 0,a??{})}return d._$AI(h),d};var ge=globalThis,tt=class extends wt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var a;let s=super.createRenderRoot();return(a=this.renderOptions).renderBefore??(a.renderBefore=s.firstChild),s}update(s){let a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(s),this._$Do=bo(a,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return $t}};tt._$litElement$=!0,tt.finalized=!0,ge.litElementHydrateSupport?.({LitElement:tt});var Sr=ge.litElementPolyfillSupport;Sr?.({LitElement:tt});(ge.litElementVersions??(ge.litElementVersions=[])).push("4.2.2");var H=pr(Lo(),1);var To=`/* required styles */\r
\r
.leaflet-pane,\r
.leaflet-tile,\r
.leaflet-marker-icon,\r
.leaflet-marker-shadow,\r
.leaflet-tile-container,\r
.leaflet-pane > svg,\r
.leaflet-pane > canvas,\r
.leaflet-zoom-box,\r
.leaflet-image-layer,\r
.leaflet-layer {\r
	position: absolute;\r
	left: 0;\r
	top: 0;\r
	}\r
.leaflet-container {\r
	overflow: hidden;\r
	}\r
.leaflet-tile,\r
.leaflet-marker-icon,\r
.leaflet-marker-shadow {\r
	-webkit-user-select: none;\r
	   -moz-user-select: none;\r
	        user-select: none;\r
	  -webkit-user-drag: none;\r
	}\r
/* Prevents IE11 from highlighting tiles in blue */\r
.leaflet-tile::selection {\r
	background: transparent;\r
}\r
/* Safari renders non-retina tile on retina better with this, but Chrome is worse */\r
.leaflet-safari .leaflet-tile {\r
	image-rendering: -webkit-optimize-contrast;\r
	}\r
/* hack that prevents hw layers "stretching" when loading new tiles */\r
.leaflet-safari .leaflet-tile-container {\r
	width: 1600px;\r
	height: 1600px;\r
	-webkit-transform-origin: 0 0;\r
	}\r
.leaflet-marker-icon,\r
.leaflet-marker-shadow {\r
	display: block;\r
	}\r
/* .leaflet-container svg: reset svg max-width decleration shipped in Joomla! (joomla.org) 3.x */\r
/* .leaflet-container img: map is broken in FF if you have max-width: 100% on tiles */\r
.leaflet-container .leaflet-overlay-pane svg {\r
	max-width: none !important;\r
	max-height: none !important;\r
	}\r
.leaflet-container .leaflet-marker-pane img,\r
.leaflet-container .leaflet-shadow-pane img,\r
.leaflet-container .leaflet-tile-pane img,\r
.leaflet-container img.leaflet-image-layer,\r
.leaflet-container .leaflet-tile {\r
	max-width: none !important;\r
	max-height: none !important;\r
	width: auto;\r
	padding: 0;\r
	}\r
\r
.leaflet-container img.leaflet-tile {\r
	/* See: https://bugs.chromium.org/p/chromium/issues/detail?id=600120 */\r
	mix-blend-mode: plus-lighter;\r
}\r
\r
.leaflet-container.leaflet-touch-zoom {\r
	-ms-touch-action: pan-x pan-y;\r
	touch-action: pan-x pan-y;\r
	}\r
.leaflet-container.leaflet-touch-drag {\r
	-ms-touch-action: pinch-zoom;\r
	/* Fallback for FF which doesn't support pinch-zoom */\r
	touch-action: none;\r
	touch-action: pinch-zoom;\r
}\r
.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {\r
	-ms-touch-action: none;\r
	touch-action: none;\r
}\r
.leaflet-container {\r
	-webkit-tap-highlight-color: transparent;\r
}\r
.leaflet-container a {\r
	-webkit-tap-highlight-color: rgba(51, 181, 229, 0.4);\r
}\r
.leaflet-tile {\r
	filter: inherit;\r
	visibility: hidden;\r
	}\r
.leaflet-tile-loaded {\r
	visibility: inherit;\r
	}\r
.leaflet-zoom-box {\r
	width: 0;\r
	height: 0;\r
	-moz-box-sizing: border-box;\r
	     box-sizing: border-box;\r
	z-index: 800;\r
	}\r
/* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */\r
.leaflet-overlay-pane svg {\r
	-moz-user-select: none;\r
	}\r
\r
.leaflet-pane         { z-index: 400; }\r
\r
.leaflet-tile-pane    { z-index: 200; }\r
.leaflet-overlay-pane { z-index: 400; }\r
.leaflet-shadow-pane  { z-index: 500; }\r
.leaflet-marker-pane  { z-index: 600; }\r
.leaflet-tooltip-pane   { z-index: 650; }\r
.leaflet-popup-pane   { z-index: 700; }\r
\r
.leaflet-map-pane canvas { z-index: 100; }\r
.leaflet-map-pane svg    { z-index: 200; }\r
\r
.leaflet-vml-shape {\r
	width: 1px;\r
	height: 1px;\r
	}\r
.lvml {\r
	behavior: url(#default#VML);\r
	display: inline-block;\r
	position: absolute;\r
	}\r
\r
\r
/* control positioning */\r
\r
.leaflet-control {\r
	position: relative;\r
	z-index: 800;\r
	pointer-events: visiblePainted; /* IE 9-10 doesn't have auto */\r
	pointer-events: auto;\r
	}\r
.leaflet-top,\r
.leaflet-bottom {\r
	position: absolute;\r
	z-index: 1000;\r
	pointer-events: none;\r
	}\r
.leaflet-top {\r
	top: 0;\r
	}\r
.leaflet-right {\r
	right: 0;\r
	}\r
.leaflet-bottom {\r
	bottom: 0;\r
	}\r
.leaflet-left {\r
	left: 0;\r
	}\r
.leaflet-control {\r
	float: left;\r
	clear: both;\r
	}\r
.leaflet-right .leaflet-control {\r
	float: right;\r
	}\r
.leaflet-top .leaflet-control {\r
	margin-top: 10px;\r
	}\r
.leaflet-bottom .leaflet-control {\r
	margin-bottom: 10px;\r
	}\r
.leaflet-left .leaflet-control {\r
	margin-left: 10px;\r
	}\r
.leaflet-right .leaflet-control {\r
	margin-right: 10px;\r
	}\r
\r
\r
/* zoom and fade animations */\r
\r
.leaflet-fade-anim .leaflet-popup {\r
	opacity: 0;\r
	-webkit-transition: opacity 0.2s linear;\r
	   -moz-transition: opacity 0.2s linear;\r
	        transition: opacity 0.2s linear;\r
	}\r
.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {\r
	opacity: 1;\r
	}\r
.leaflet-zoom-animated {\r
	-webkit-transform-origin: 0 0;\r
	    -ms-transform-origin: 0 0;\r
	        transform-origin: 0 0;\r
	}\r
svg.leaflet-zoom-animated {\r
	will-change: transform;\r
}\r
\r
.leaflet-zoom-anim .leaflet-zoom-animated {\r
	-webkit-transition: -webkit-transform 0.25s cubic-bezier(0,0,0.25,1);\r
	   -moz-transition:    -moz-transform 0.25s cubic-bezier(0,0,0.25,1);\r
	        transition:         transform 0.25s cubic-bezier(0,0,0.25,1);\r
	}\r
.leaflet-zoom-anim .leaflet-tile,\r
.leaflet-pan-anim .leaflet-tile {\r
	-webkit-transition: none;\r
	   -moz-transition: none;\r
	        transition: none;\r
	}\r
\r
.leaflet-zoom-anim .leaflet-zoom-hide {\r
	visibility: hidden;\r
	}\r
\r
\r
/* cursors */\r
\r
.leaflet-interactive {\r
	cursor: pointer;\r
	}\r
.leaflet-grab {\r
	cursor: -webkit-grab;\r
	cursor:    -moz-grab;\r
	cursor:         grab;\r
	}\r
.leaflet-crosshair,\r
.leaflet-crosshair .leaflet-interactive {\r
	cursor: crosshair;\r
	}\r
.leaflet-popup-pane,\r
.leaflet-control {\r
	cursor: auto;\r
	}\r
.leaflet-dragging .leaflet-grab,\r
.leaflet-dragging .leaflet-grab .leaflet-interactive,\r
.leaflet-dragging .leaflet-marker-draggable {\r
	cursor: move;\r
	cursor: -webkit-grabbing;\r
	cursor:    -moz-grabbing;\r
	cursor:         grabbing;\r
	}\r
\r
/* marker & overlays interactivity */\r
.leaflet-marker-icon,\r
.leaflet-marker-shadow,\r
.leaflet-image-layer,\r
.leaflet-pane > svg path,\r
.leaflet-tile-container {\r
	pointer-events: none;\r
	}\r
\r
.leaflet-marker-icon.leaflet-interactive,\r
.leaflet-image-layer.leaflet-interactive,\r
.leaflet-pane > svg path.leaflet-interactive,\r
svg.leaflet-image-layer.leaflet-interactive path {\r
	pointer-events: visiblePainted; /* IE 9-10 doesn't have auto */\r
	pointer-events: auto;\r
	}\r
\r
/* visual tweaks */\r
\r
.leaflet-container {\r
	background: #ddd;\r
	outline-offset: 1px;\r
	}\r
.leaflet-container a {\r
	color: #0078A8;\r
	}\r
.leaflet-zoom-box {\r
	border: 2px dotted #38f;\r
	background: rgba(255,255,255,0.5);\r
	}\r
\r
\r
/* general typography */\r
.leaflet-container {\r
	font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;\r
	font-size: 12px;\r
	font-size: 0.75rem;\r
	line-height: 1.5;\r
	}\r
\r
\r
/* general toolbar styles */\r
\r
.leaflet-bar {\r
	box-shadow: 0 1px 5px rgba(0,0,0,0.65);\r
	border-radius: 4px;\r
	}\r
.leaflet-bar a {\r
	background-color: #fff;\r
	border-bottom: 1px solid #ccc;\r
	width: 26px;\r
	height: 26px;\r
	line-height: 26px;\r
	display: block;\r
	text-align: center;\r
	text-decoration: none;\r
	color: black;\r
	}\r
.leaflet-bar a,\r
.leaflet-control-layers-toggle {\r
	background-position: 50% 50%;\r
	background-repeat: no-repeat;\r
	display: block;\r
	}\r
.leaflet-bar a:hover,\r
.leaflet-bar a:focus {\r
	background-color: #f4f4f4;\r
	}\r
.leaflet-bar a:first-child {\r
	border-top-left-radius: 4px;\r
	border-top-right-radius: 4px;\r
	}\r
.leaflet-bar a:last-child {\r
	border-bottom-left-radius: 4px;\r
	border-bottom-right-radius: 4px;\r
	border-bottom: none;\r
	}\r
.leaflet-bar a.leaflet-disabled {\r
	cursor: default;\r
	background-color: #f4f4f4;\r
	color: #bbb;\r
	}\r
\r
.leaflet-touch .leaflet-bar a {\r
	width: 30px;\r
	height: 30px;\r
	line-height: 30px;\r
	}\r
.leaflet-touch .leaflet-bar a:first-child {\r
	border-top-left-radius: 2px;\r
	border-top-right-radius: 2px;\r
	}\r
.leaflet-touch .leaflet-bar a:last-child {\r
	border-bottom-left-radius: 2px;\r
	border-bottom-right-radius: 2px;\r
	}\r
\r
/* zoom control */\r
\r
.leaflet-control-zoom-in,\r
.leaflet-control-zoom-out {\r
	font: bold 18px 'Lucida Console', Monaco, monospace;\r
	text-indent: 1px;\r
	}\r
\r
.leaflet-touch .leaflet-control-zoom-in, .leaflet-touch .leaflet-control-zoom-out  {\r
	font-size: 22px;\r
	}\r
\r
\r
/* layers control */\r
\r
.leaflet-control-layers {\r
	box-shadow: 0 1px 5px rgba(0,0,0,0.4);\r
	background: #fff;\r
	border-radius: 5px;\r
	}\r
.leaflet-control-layers-toggle {\r
	background-image: url(images/layers.png);\r
	width: 36px;\r
	height: 36px;\r
	}\r
.leaflet-retina .leaflet-control-layers-toggle {\r
	background-image: url(images/layers-2x.png);\r
	background-size: 26px 26px;\r
	}\r
.leaflet-touch .leaflet-control-layers-toggle {\r
	width: 44px;\r
	height: 44px;\r
	}\r
.leaflet-control-layers .leaflet-control-layers-list,\r
.leaflet-control-layers-expanded .leaflet-control-layers-toggle {\r
	display: none;\r
	}\r
.leaflet-control-layers-expanded .leaflet-control-layers-list {\r
	display: block;\r
	position: relative;\r
	}\r
.leaflet-control-layers-expanded {\r
	padding: 6px 10px 6px 6px;\r
	color: #333;\r
	background: #fff;\r
	}\r
.leaflet-control-layers-scrollbar {\r
	overflow-y: scroll;\r
	overflow-x: hidden;\r
	padding-right: 5px;\r
	}\r
.leaflet-control-layers-selector {\r
	margin-top: 2px;\r
	position: relative;\r
	top: 1px;\r
	}\r
.leaflet-control-layers label {\r
	display: block;\r
	font-size: 13px;\r
	font-size: 1.08333em;\r
	}\r
.leaflet-control-layers-separator {\r
	height: 0;\r
	border-top: 1px solid #ddd;\r
	margin: 5px -10px 5px -6px;\r
	}\r
\r
/* Default icon URLs */\r
.leaflet-default-icon-path { /* used only in path-guessing heuristic, see L.Icon.Default */\r
	background-image: url(images/marker-icon.png);\r
	}\r
\r
\r
/* attribution and scale controls */\r
\r
.leaflet-container .leaflet-control-attribution {\r
	background: #fff;\r
	background: rgba(255, 255, 255, 0.8);\r
	margin: 0;\r
	}\r
.leaflet-control-attribution,\r
.leaflet-control-scale-line {\r
	padding: 0 5px;\r
	color: #333;\r
	line-height: 1.4;\r
	}\r
.leaflet-control-attribution a {\r
	text-decoration: none;\r
	}\r
.leaflet-control-attribution a:hover,\r
.leaflet-control-attribution a:focus {\r
	text-decoration: underline;\r
	}\r
.leaflet-attribution-flag {\r
	display: inline !important;\r
	vertical-align: baseline !important;\r
	width: 1em;\r
	height: 0.6669em;\r
	}\r
.leaflet-left .leaflet-control-scale {\r
	margin-left: 5px;\r
	}\r
.leaflet-bottom .leaflet-control-scale {\r
	margin-bottom: 5px;\r
	}\r
.leaflet-control-scale-line {\r
	border: 2px solid #777;\r
	border-top: none;\r
	line-height: 1.1;\r
	padding: 2px 5px 1px;\r
	white-space: nowrap;\r
	-moz-box-sizing: border-box;\r
	     box-sizing: border-box;\r
	background: rgba(255, 255, 255, 0.8);\r
	text-shadow: 1px 1px #fff;\r
	}\r
.leaflet-control-scale-line:not(:first-child) {\r
	border-top: 2px solid #777;\r
	border-bottom: none;\r
	margin-top: -2px;\r
	}\r
.leaflet-control-scale-line:not(:first-child):not(:last-child) {\r
	border-bottom: 2px solid #777;\r
	}\r
\r
.leaflet-touch .leaflet-control-attribution,\r
.leaflet-touch .leaflet-control-layers,\r
.leaflet-touch .leaflet-bar {\r
	box-shadow: none;\r
	}\r
.leaflet-touch .leaflet-control-layers,\r
.leaflet-touch .leaflet-bar {\r
	border: 2px solid rgba(0,0,0,0.2);\r
	background-clip: padding-box;\r
	}\r
\r
\r
/* popup */\r
\r
.leaflet-popup {\r
	position: absolute;\r
	text-align: center;\r
	margin-bottom: 20px;\r
	}\r
.leaflet-popup-content-wrapper {\r
	padding: 1px;\r
	text-align: left;\r
	border-radius: 12px;\r
	}\r
.leaflet-popup-content {\r
	margin: 13px 24px 13px 20px;\r
	line-height: 1.3;\r
	font-size: 13px;\r
	font-size: 1.08333em;\r
	min-height: 1px;\r
	}\r
.leaflet-popup-content p {\r
	margin: 17px 0;\r
	margin: 1.3em 0;\r
	}\r
.leaflet-popup-tip-container {\r
	width: 40px;\r
	height: 20px;\r
	position: absolute;\r
	left: 50%;\r
	margin-top: -1px;\r
	margin-left: -20px;\r
	overflow: hidden;\r
	pointer-events: none;\r
	}\r
.leaflet-popup-tip {\r
	width: 17px;\r
	height: 17px;\r
	padding: 1px;\r
\r
	margin: -10px auto 0;\r
	pointer-events: auto;\r
\r
	-webkit-transform: rotate(45deg);\r
	   -moz-transform: rotate(45deg);\r
	    -ms-transform: rotate(45deg);\r
	        transform: rotate(45deg);\r
	}\r
.leaflet-popup-content-wrapper,\r
.leaflet-popup-tip {\r
	background: white;\r
	color: #333;\r
	box-shadow: 0 3px 14px rgba(0,0,0,0.4);\r
	}\r
.leaflet-container a.leaflet-popup-close-button {\r
	position: absolute;\r
	top: 0;\r
	right: 0;\r
	border: none;\r
	text-align: center;\r
	width: 24px;\r
	height: 24px;\r
	font: 16px/24px Tahoma, Verdana, sans-serif;\r
	color: #757575;\r
	text-decoration: none;\r
	background: transparent;\r
	}\r
.leaflet-container a.leaflet-popup-close-button:hover,\r
.leaflet-container a.leaflet-popup-close-button:focus {\r
	color: #585858;\r
	}\r
.leaflet-popup-scrolled {\r
	overflow: auto;\r
	}\r
\r
.leaflet-oldie .leaflet-popup-content-wrapper {\r
	-ms-zoom: 1;\r
	}\r
.leaflet-oldie .leaflet-popup-tip {\r
	width: 24px;\r
	margin: 0 auto;\r
\r
	-ms-filter: "progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";\r
	filter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);\r
	}\r
\r
.leaflet-oldie .leaflet-control-zoom,\r
.leaflet-oldie .leaflet-control-layers,\r
.leaflet-oldie .leaflet-popup-content-wrapper,\r
.leaflet-oldie .leaflet-popup-tip {\r
	border: 1px solid #999;\r
	}\r
\r
\r
/* div icon */\r
\r
.leaflet-div-icon {\r
	background: #fff;\r
	border: 1px solid #666;\r
	}\r
\r
\r
/* Tooltip */\r
/* Base styles for the element that has a tooltip */\r
.leaflet-tooltip {\r
	position: absolute;\r
	padding: 6px;\r
	background-color: #fff;\r
	border: 1px solid #fff;\r
	border-radius: 3px;\r
	color: #222;\r
	white-space: nowrap;\r
	-webkit-user-select: none;\r
	-moz-user-select: none;\r
	-ms-user-select: none;\r
	user-select: none;\r
	pointer-events: none;\r
	box-shadow: 0 1px 3px rgba(0,0,0,0.4);\r
	}\r
.leaflet-tooltip.leaflet-interactive {\r
	cursor: pointer;\r
	pointer-events: auto;\r
	}\r
.leaflet-tooltip-top:before,\r
.leaflet-tooltip-bottom:before,\r
.leaflet-tooltip-left:before,\r
.leaflet-tooltip-right:before {\r
	position: absolute;\r
	pointer-events: none;\r
	border: 6px solid transparent;\r
	background: transparent;\r
	content: "";\r
	}\r
\r
/* Directions */\r
\r
.leaflet-tooltip-bottom {\r
	margin-top: 6px;\r
}\r
.leaflet-tooltip-top {\r
	margin-top: -6px;\r
}\r
.leaflet-tooltip-bottom:before,\r
.leaflet-tooltip-top:before {\r
	left: 50%;\r
	margin-left: -6px;\r
	}\r
.leaflet-tooltip-top:before {\r
	bottom: 0;\r
	margin-bottom: -12px;\r
	border-top-color: #fff;\r
	}\r
.leaflet-tooltip-bottom:before {\r
	top: 0;\r
	margin-top: -12px;\r
	margin-left: -6px;\r
	border-bottom-color: #fff;\r
	}\r
.leaflet-tooltip-left {\r
	margin-left: -6px;\r
}\r
.leaflet-tooltip-right {\r
	margin-left: 6px;\r
}\r
.leaflet-tooltip-left:before,\r
.leaflet-tooltip-right:before {\r
	top: 50%;\r
	margin-top: -6px;\r
	}\r
.leaflet-tooltip-left:before {\r
	right: 0;\r
	margin-right: -12px;\r
	border-left-color: #fff;\r
	}\r
.leaflet-tooltip-right:before {\r
	left: 0;\r
	margin-left: -12px;\r
	border-right-color: #fff;\r
	}\r
\r
/* Printing */\r
\r
@media print {\r
	/* Prevent printers from removing background-images of controls. */\r
	.leaflet-control {\r
		-webkit-print-color-adjust: exact;\r
		print-color-adjust: exact;\r
		}\r
	}\r
`;var ve=class extends tt{constructor(){super(),this.events=[],this.radiusKm=10,this.radiusEnabled=!1,this.zones=[],this.dark=!1,this._markersById=new Map,this._didInitialFit=!1,this._zonesSignature=""}render(){return N`<div id="map"></div>`}firstUpdated(){let s=this.center?[this.center.lat,this.center.lon]:[52.52,13.405];this._map=H.map(this.renderRoot.getElementById("map"),{center:s,zoom:12,zoomControl:!0}),H.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(this._map),this._zoneLayer=H.layerGroup().addTo(this._map),this._eventLayer=H.featureGroup().addTo(this._map),this._radiusLayer=H.layerGroup().addTo(this._map),this._map.on("click",a=>{this.dispatchEvent(new CustomEvent("center-changed",{detail:{lat:a.latlng.lat,lon:a.latlng.lng}}))}),this._resizeObserver=new ResizeObserver(()=>this._map.invalidateSize()),this._resizeObserver.observe(this),this._renderEvents(),this._renderRadius(),this._renderZones()}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),this._map?.remove(),this._map=void 0}updated(s){this._map&&(s.has("events")&&this._renderEvents(),(s.has("center")||s.has("radiusKm")||s.has("radiusEnabled"))&&this._renderRadius(),s.has("zones")&&this._renderZones(),s.has("selectedId")&&this.selectedId&&this._focusEvent(this.selectedId))}_accentColor(){return getComputedStyle(this).getPropertyValue("--primary-color").trim()||"#03a9f4"}_renderEvents(){this._eventLayer.clearLayers(),this._markersById.clear();let s=this._accentColor();for(let a of this.events||[]){let u=null;if(a.geometry)try{u=H.geoJSON(JSON.parse(a.geometry),{style:this._shapeStyle(s,a),pointToLayer:(d,m)=>H.circleMarker(m,this._markerStyle(s,a))})}catch(d){console.warn("chronotope: invalid geometry for event",a.id,d)}!u&&a.lat!=null&&a.lon!=null&&(u=H.circleMarker([a.lat,a.lon],this._markerStyle(s,a))),u&&(u.bindPopup(this._popupHtml(a)),u.on("click",()=>{this.dispatchEvent(new CustomEvent("event-selected",{detail:{id:a.id}}))}),u.addTo(this._eventLayer),this._markersById.set(a.id,u))}!this._didInitialFit&&this._markersById.size>0&&(this._didInitialFit=!0,this._map.fitBounds(this._eventLayer.getBounds().pad(.2),{maxZoom:14}))}_markerStyle(s,a){return{radius:9,color:s,weight:2,fillColor:s,fillOpacity:.35,dashArray:a?.time_precision==="approximate"?"3 4":null}}_shapeStyle(s,a){return{color:s,weight:3,fillOpacity:.2,dashArray:a?.time_precision==="approximate"?"6 6":null}}_popupHtml(s){let a=document.createElement("div"),u=document.createElement("div");u.className="popup-title",u.textContent=s.title;let d=document.createElement("div");d.className="popup-meta";let m=s.occurrences?.[0]?.[0]??s.start_time,_=s.time_precision==="approximate"&&s.schedule_text?`~ ${s.schedule_text}`:new Date(m).toLocaleString();if(d.textContent=`${s.category||""} ${_}`.trim(),a.append(u,d),s.address){let A=document.createElement("div");A.className="popup-meta",A.textContent=s.address,a.append(A)}return a}_renderZones(){if(!this._map)return;let s=JSON.stringify(this.zones||[]);if(s===this._zonesSignature)return;this._zonesSignature=s,this._zoneLayer.clearLayers();let a=getComputedStyle(this).getPropertyValue("--accent-color").trim()||"#ff9800";for(let u of this.zones||[])H.circle([u.lat,u.lon],{radius:u.radius,color:a,weight:1.5,dashArray:u.passive?"2 6":"4 4",fillColor:a,fillOpacity:.06}).bindTooltip(u.name).addTo(this._zoneLayer),u.home&&H.marker([u.lat,u.lon],{icon:H.divIcon({className:"zone-home-icon",html:"\u{1F3E0}",iconSize:[24,24],iconAnchor:[12,12]}),interactive:!1,keyboard:!1}).addTo(this._zoneLayer)}_renderRadius(){if(this._radiusLayer.clearLayers(),!this.radiusEnabled||!this.center)return;let s=this._accentColor();H.circle([this.center.lat,this.center.lon],{radius:this.radiusKm*1e3,color:s,weight:1.5,dashArray:"6 6",fillOpacity:.05}).addTo(this._radiusLayer),H.circleMarker([this.center.lat,this.center.lon],{radius:4,color:s,fillColor:s,fillOpacity:1}).addTo(this._radiusLayer)}_focusEvent(s){let a=this._markersById.get(s);a&&(a.getLatLng?this._map.panTo(a.getLatLng()):a.getBounds&&this._map.fitBounds(a.getBounds().pad(.3),{maxZoom:15}),a.openPopup())}};rt(ve,"properties",{events:{attribute:!1},center:{attribute:!1},radiusKm:{attribute:!1},radiusEnabled:{attribute:!1},zones:{attribute:!1},selectedId:{attribute:!1},dark:{type:Boolean,reflect:!0}}),rt(ve,"styles",[pt`
      ${Ue(To)}
    `,pt`
      :host {
        display: block;
        position: relative;
      }
      #map {
        position: absolute;
        inset: 0;
        background: var(--card-background-color, #fafafa);
      }
      :host([dark]) .leaflet-tile-pane {
        filter: brightness(0.6) invert(1) contrast(3.2) hue-rotate(200deg)
          saturate(0.35) brightness(0.75);
      }
      :host([dark]) #map {
        background: #1c1c1c;
      }
      .leaflet-control-attribution,
      .leaflet-control-zoom a {
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color, #212121);
      }
      .leaflet-control-attribution a {
        color: var(--primary-color, #03a9f4);
      }
      .leaflet-control-zoom a {
        border-color: var(--divider-color, #e0e0e0);
      }
      .leaflet-popup-content-wrapper,
      .leaflet-popup-tip {
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color, #212121);
      }
      .popup-title {
        font-weight: 600;
      }
      .popup-meta {
        color: var(--secondary-text-color, #727272);
        font-size: 0.85em;
      }
      .zone-home-icon {
        background: none;
        border: none;
        font-size: 18px;
        line-height: 24px;
        text-align: center;
      }
    `]);customElements.define("chronotope-map-view",ve);var Er=["Mo","Di","Mi","Do","Fr","Sa","So"],ye=class extends tt{constructor(){super(),this.profiles=[],this.selectedProfileId="",this._profileName=""}updated(s){if(s.has("selectedProfileId")){let a=(this.profiles||[]).find(u=>u.id===this.selectedProfileId);this._profileName=a?a.name:""}}render(){let s=this.state;return N`
      <div class="groups">
        <div class="group">
          <span class="label">Profil</span>
          <div class="row">
            <select
              .value=${this.selectedProfileId||""}
              @change=${a=>this.dispatchEvent(new CustomEvent("profile-selected",{detail:{id:a.target.value}}))}
            >
              <option value="">— kein Profil —</option>
              ${(this.profiles||[]).map(a=>N`
                  <option value=${a.id} ?selected=${a.id===this.selectedProfileId}>
                    ${a.name}
                  </option>
                `)}
            </select>
            <input
              type="text"
              placeholder="Profilname"
              .value=${this._profileName}
              @input=${a=>this._profileName=a.target.value}
            />
            <button
              class="ics-button"
              title="Aktuelle Filter unter diesem Namen speichern"
              @click=${this._saveProfile}
            >
              Speichern
            </button>
            ${this.selectedProfileId?N`<button
                  class="ics-button"
                  title="Ausgewähltes Profil löschen"
                  @click=${()=>this.dispatchEvent(new CustomEvent("profile-delete",{detail:{id:this.selectedProfileId}}))}
                >
                  Löschen
                </button>`:Z}
          </div>
        </div>

        <div class="group">
          <span class="label">Kategorie</span>
          <div class="chips">
            ${(this.categories||[]).length===0?N`<span class="hint">Noch keine Kategorien</span>`:(this.categories||[]).map(a=>N`
                    <button
                      class="chip"
                      aria-pressed=${s.categories.includes(a)?"true":"false"}
                      @click=${()=>this._toggleCategory(a)}
                    >
                      ${a}
                    </button>
                  `)}
          </div>
        </div>

        <div class="group">
          <span class="label">Radius</span>
          <div class="row">
            <input
              type="checkbox"
              id="radius-enabled"
              .checked=${s.radiusEnabled}
              @change=${a=>this._patch({radiusEnabled:a.target.checked})}
            />
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              .value=${String(s.radiusKm)}
              ?disabled=${!s.radiusEnabled}
              @input=${a=>this._patch({radiusKm:Number(a.target.value)})}
            />
            <span>${s.radiusKm} km</span>
          </div>
          <span class="hint">Klick auf die Karte setzt das Zentrum</span>
        </div>

        <div class="group">
          <span class="label">Zeitfenster</span>
          <div class="row">
            <input
              type="datetime-local"
              .value=${s.start}
              @change=${a=>this._patch({start:a.target.value})}
            />
            <span>–</span>
            <input
              type="datetime-local"
              .value=${s.end}
              @change=${a=>this._patch({end:a.target.value})}
            />
          </div>
        </div>

        <div class="group">
          <span class="label">Wochentage</span>
          <div class="chips">
            ${Er.map((a,u)=>N`
                <button
                  class="chip"
                  aria-pressed=${s.weekdays.includes(u)?"true":"false"}
                  @click=${()=>this._toggleWeekday(u)}
                >
                  ${a}
                </button>
              `)}
          </div>
          <div class="row">
            <select
              .value=${s.timeMode}
              @change=${a=>this._patch({timeMode:a.target.value})}
            >
              <option value="allday">Ganztags</option>
              <option value="range">Nach Uhrzeit</option>
            </select>
            ${s.timeMode==="range"?N`
                  <input
                    type="time"
                    .value=${s.timeFrom}
                    @change=${a=>this._patch({timeFrom:a.target.value})}
                  />
                  <span>–</span>
                  <input
                    type="time"
                    .value=${s.timeTo}
                    @change=${a=>this._patch({timeTo:a.target.value})}
                  />
                `:Z}
          </div>
        </div>

        <div class="group">
          <span class="label">Karte</span>
          <label class="row">
            <input
              type="checkbox"
              .checked=${s.showZones}
              @change=${a=>this._patch({showZones:a.target.checked})}
            />
            HA-Zonen anzeigen
          </label>
        </div>

        <div class="group">
          <span class="label">Export</span>
          <button
            class="ics-button"
            @click=${()=>this.dispatchEvent(new CustomEvent("ics-requested"))}
          >
            ${this.icsCopied?"URL kopiert \u2713":"ICS-Abo-URL kopieren"}
          </button>
        </div>
      </div>
    `}_patch(s){this.dispatchEvent(new CustomEvent("filters-changed",{detail:s}))}_saveProfile(){let s=(this._profileName||"").trim();if(!s)return;let a=(this.profiles||[]).find(u=>u.id===this.selectedProfileId);this.dispatchEvent(new CustomEvent("profile-save",{detail:{name:s,id:a&&a.name===s?a.id:void 0}}))}_toggleCategory(s){let a=this.state.categories.includes(s)?this.state.categories.filter(u=>u!==s):[...this.state.categories,s];this._patch({categories:a})}_toggleWeekday(s){let a=this.state.weekdays.includes(s)?this.state.weekdays.filter(u=>u!==s):[...this.state.weekdays,s];this._patch({weekdays:a})}};rt(ye,"properties",{state:{attribute:!1},categories:{attribute:!1},icsCopied:{attribute:!1},profiles:{attribute:!1},selectedProfileId:{attribute:!1},_profileName:{state:!0}}),rt(ye,"styles",pt`
    :host {
      display: block;
      background: var(--card-background-color, #fff);
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      padding: 8px 16px 12px;
      font-size: 14px;
    }
    .groups {
      display: flex;
      flex-wrap: wrap;
      gap: 16px 24px;
      align-items: flex-start;
    }
    .group {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }
    .label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--secondary-text-color, #727272);
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .chip {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 14px;
      padding: 3px 12px;
      cursor: pointer;
      background: transparent;
      color: var(--primary-text-color, #212121);
      font: inherit;
      line-height: 1.4;
    }
    .chip[aria-pressed="true"] {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    .row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    input[type="datetime-local"],
    input[type="time"],
    input[type="text"],
    select {
      background: var(--primary-background-color, #fafafa);
      color: var(--primary-text-color, #212121);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      padding: 4px 6px;
      font: inherit;
      color-scheme: light dark;
    }
    input[type="range"] {
      width: 140px;
      accent-color: var(--primary-color, #03a9f4);
    }
    input[type="checkbox"] {
      accent-color: var(--primary-color, #03a9f4);
    }
    .hint {
      font-size: 11px;
      color: var(--secondary-text-color, #727272);
    }
    .ics-button {
      border: 1px solid var(--primary-color, #03a9f4);
      color: var(--primary-color, #03a9f4);
      background: transparent;
      border-radius: 4px;
      padding: 5px 12px;
      cursor: pointer;
      font: inherit;
      white-space: nowrap;
    }
    .ics-button:hover {
      background: color-mix(in srgb, var(--primary-color, #03a9f4) 12%, transparent);
    }
  `);customElements.define("chronotope-filter-bar",ye);var xe=class extends tt{render(){let s=this.events||[];return s.length===0?N`<div class="empty">Keine Events für die aktuellen Filter.</div>`:N`${s.map(a=>this._renderItem(a))}`}_renderItem(s){let a=s.occurrences?.[0]?.[0]??s.start_time,u=s.occurrences?.[0]?.[1]??s.end_time;return N`
      <button
        class="item"
        aria-current=${s.id===this.selectedId?"true":"false"}
        @click=${()=>this.dispatchEvent(new CustomEvent("event-selected",{detail:{id:s.id}}))}
      >
        <div class="title-row">
          <span class="title">${s.title}</span>
          ${s.distance_km!=null?N`<span class="distance">${this._formatDistance(s.distance_km)}</span>`:Z}
        </div>
        <div class="meta">
          ${this._renderWhen(s,a,u)}
          ${s.recurrence?N`<span title=${s.recurrence}>🔁</span>`:Z}
          ${s.category?N`<span class="badge">${s.category}</span>`:Z}
          ${s.confidence?N`<span class="badge confidence-${s.confidence}">${s.confidence}</span>`:Z}
          ${s.source_url?N`<span class="source">
                <a href=${s.source_url} target="_blank" rel="noopener noreferrer"
                  @click=${d=>d.stopPropagation()}
                  >${s.source_name||"Quelle"}</a
                >
              </span>`:Z}
        </div>
        ${s.address?N`<div class="address">${s.address}</div>`:Z}
      </button>
    `}_renderWhen(s,a,u){if(s.time_precision==="approximate"){let d=s.schedule_text||this._formatRange(a,u);return N`<span class="fuzzy" title="Unpräzise Zeitangabe">~ ${d}</span>`}return N`<span>${this._formatRange(a,u)}</span>`}_formatDistance(s){return`${(s<10?s.toFixed(1):Math.round(s).toString()).replace(".",",")} km`}_formatRange(s,a){let u=this.locale||void 0,d=new Date(s),m=new Date(a),_=new Intl.DateTimeFormat(u,{weekday:"short",day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}),A=new Intl.DateTimeFormat(u,{hour:"2-digit",minute:"2-digit"});return d.toDateString()===m.toDateString()?`${_.format(d)} \u2013 ${A.format(m)}`:`${_.format(d)} \u2013 ${_.format(m)}`}};rt(xe,"properties",{events:{attribute:!1},selectedId:{attribute:!1},locale:{attribute:!1}}),rt(xe,"styles",pt`
    :host {
      display: block;
      overflow-y: auto;
      background: var(--primary-background-color, #fafafa);
    }
    .empty {
      padding: 24px 16px;
      color: var(--secondary-text-color, #727272);
      text-align: center;
    }
    .item {
      display: block;
      width: 100%;
      text-align: left;
      border: none;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
      padding: 10px 16px;
      cursor: pointer;
      font: inherit;
    }
    .item[aria-current="true"] {
      border-inline-start: 3px solid var(--primary-color, #03a9f4);
      background: color-mix(in srgb, var(--primary-color, #03a9f4) 8%, var(--card-background-color, #fff));
    }
    .title-row {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      align-items: baseline;
    }
    .title {
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .distance {
      color: var(--primary-color, #03a9f4);
      font-size: 0.85em;
      white-space: nowrap;
    }
    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
      margin-top: 4px;
      font-size: 0.85em;
      color: var(--secondary-text-color, #727272);
    }
    .badge {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 10px;
      padding: 0 8px;
      font-size: 0.9em;
    }
    .confidence-verified {
      color: var(--success-color, #4caf50);
      border-color: currentColor;
    }
    .confidence-scraped {
      color: var(--warning-color, #ff9800);
      border-color: currentColor;
    }
    .confidence-inferred {
      color: var(--error-color, #f44336);
      border-color: currentColor;
    }
    .source a {
      color: var(--primary-color, #03a9f4);
      text-decoration: none;
    }
    .address {
      margin-top: 2px;
      font-size: 0.85em;
      color: var(--secondary-text-color, #727272);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .fuzzy {
      font-style: italic;
    }
  `);customElements.define("chronotope-event-list",xe);var ko=(h,s)=>h.callWS({type:"chronotope/events/query",...s}),So=h=>h.callWS({type:"chronotope/categories"}),zo=(h,s)=>h.callWS({type:"chronotope/ics_url",...s});var Eo=h=>h.callWS({type:"chronotope/profiles/list"}),Co=(h,s)=>h.callWS({type:"chronotope/profiles/save",profile:s}),Mo=(h,s)=>h.callWS({type:"chronotope/profiles/delete",profile_id:s});function Ge(h){let s={};return h.categories.length&&(s.categories=[...h.categories]),h.radiusEnabled&&h.center&&(s.center={lat:h.center.lat,lon:h.center.lon},s.radius_km=h.radiusKm),h.start&&(s.start=new Date(h.start).toISOString()),h.end&&(s.end=new Date(h.end).toISOString()),h.weekdays.length&&(s.weekdays=[...h.weekdays]),h.timeMode==="range"&&(h.timeFrom&&(s.time_from=h.timeFrom),h.timeTo&&(s.time_to=h.timeTo)),h.text&&(s.text=h.text),h.favoritesOnly&&(s.favorites_only=!0),s}function Ao(h){if(!h)return"";let s=new Date(h);if(Number.isNaN(s.getTime()))return"";let a=u=>String(u).padStart(2,"0");return`${s.getFullYear()}-${a(s.getMonth()+1)}-${a(s.getDate())}T${a(s.getHours())}:${a(s.getMinutes())}`}var Cr=250,we=class extends tt{constructor(){super(),this._events=[],this._categories=[],this._selectedId=null,this._icsCopied=!1,this._error=null,this._profiles=[],this._selectedProfileId="",this._filters={categories:[],radiusEnabled:!1,radiusKm:10,center:null,start:"",end:"",weekdays:[],timeMode:"allday",timeFrom:"",timeTo:"",text:"",favoritesOnly:!1,showZones:!0},this._initialized=!1}willUpdate(s){s.has("hass")&&this.hass&&!this._initialized&&(this._initialized=!0,this._filters={...this._filters,center:{lat:this.hass.config.latitude,lon:this.hass.config.longitude}},this._loadCategories(),this._loadProfiles(),this._runQuery())}render(){let s=!!this.hass?.themes?.darkMode;return N`
      <header>
        <h1>Chronotope</h1>
        <span class="count">
          ${this._events.length} ${this._events.length===1?"Event":"Events"}
        </span>
      </header>
      <chronotope-filter-bar
        .state=${this._filters}
        .categories=${this._categories}
        .icsCopied=${this._icsCopied}
        .profiles=${this._profiles}
        .selectedProfileId=${this._selectedProfileId}
        @filters-changed=${this._onFiltersChanged}
        @ics-requested=${this._onIcsRequested}
        @profile-selected=${this._onProfileSelected}
        @profile-save=${this._onProfileSave}
        @profile-delete=${this._onProfileDelete}
      ></chronotope-filter-bar>
      ${this._error?N`<div class="error">${this._error}</div>`:""}
      <div class="content ${this.narrow?"narrow":""}">
        <chronotope-event-list
          .events=${this._events}
          .selectedId=${this._selectedId}
          .locale=${this.hass?.locale?.language}
          @event-selected=${this._onEventSelected}
        ></chronotope-event-list>
        <chronotope-map-view
          .events=${this._events}
          .center=${this._filters.center}
          .radiusKm=${this._filters.radiusKm}
          .radiusEnabled=${this._filters.radiusEnabled}
          .zones=${this._filters.showZones?this._haZones():[]}
          .selectedId=${this._selectedId}
          .dark=${s}
          @center-changed=${this._onCenterChanged}
          @event-selected=${this._onEventSelected}
        ></chronotope-map-view>
      </div>
    `}_haZones(){let s=this.hass?.states||{},a=Object.values(s).filter(u=>u.entity_id.startsWith("zone.")).map(u=>({id:u.entity_id,name:u.attributes.friendly_name||u.entity_id,lat:u.attributes.latitude,lon:u.attributes.longitude,radius:u.attributes.radius??100,passive:!!u.attributes.passive,home:u.entity_id==="zone.home"})).filter(u=>u.lat!=null&&u.lon!=null);return!a.some(u=>u.home)&&this.hass?.config?.latitude!=null&&a.push({id:"home",name:"Zuhause",lat:this.hass.config.latitude,lon:this.hass.config.longitude,radius:100,passive:!1,home:!0}),a}_onFiltersChanged(s){this._filters={...this._filters,...s.detail},this._icsCopied=!1,Object.keys(s.detail).filter(u=>u!=="showZones").length&&this._scheduleQuery()}_onCenterChanged(s){this._filters={...this._filters,center:s.detail},this._filters.radiusEnabled&&this._scheduleQuery()}_onEventSelected(s){this._selectedId=s.detail.id}_scheduleQuery(){clearTimeout(this._queryTimer),this._queryTimer=setTimeout(()=>this._runQuery(),Cr)}async _loadCategories(){try{let s=await So(this.hass);this._categories=s.categories}catch(s){console.error("chronotope: loading categories failed",s)}}async _loadProfiles(){try{let s=await Eo(this.hass);this._profiles=s.profiles}catch(s){console.error("chronotope: loading profiles failed",s)}}_onProfileSelected(s){this._selectedProfileId=s.detail.id;let a=this._profiles.find(u=>u.id===s.detail.id);a&&this._applyProfileFilters(a.filters||{})}_applyProfileFilters(s){let a=s.center||this._filters.center;this._filters={...this._filters,categories:s.categories||[],radiusEnabled:!!(s.center&&s.radius_km!=null),radiusKm:s.radius_km!=null?s.radius_km:this._filters.radiusKm,center:a,start:Ao(s.start),end:Ao(s.end),weekdays:s.weekdays||[],timeMode:s.time_from||s.time_to?"range":"allday",timeFrom:s.time_from||"",timeTo:s.time_to||"",text:s.text||"",favoritesOnly:!!s.favorites_only},this._scheduleQuery()}async _onProfileSave(s){try{let a=await Co(this.hass,{id:s.detail.id,name:s.detail.name,filters:Ge(this._filters)});await this._loadProfiles(),this._selectedProfileId=a.profile.id,this._error=null}catch(a){this._error=`Profil speichern fehlgeschlagen: ${a.message||a.code||a}`}}async _onProfileDelete(s){try{await Mo(this.hass,s.detail.id),this._selectedProfileId===s.detail.id&&(this._selectedProfileId=""),await this._loadProfiles()}catch(a){this._error=`Profil l\xF6schen fehlgeschlagen: ${a.message||a.code||a}`}}async _runQuery(){if(this.hass)try{let s=await ko(this.hass,Ge(this._filters));this._events=s.events,this._error=null,this._selectedId&&!this._events.some(a=>a.id===this._selectedId)&&(this._selectedId=null)}catch(s){this._error=`Abfrage fehlgeschlagen: ${s.message||s.code||s}`}}async _onIcsRequested(){try{let s=this._selectedProfileId?{profile_id:this._selectedProfileId}:Ge(this._filters),a=await zo(this.hass,s);await navigator.clipboard.writeText(a.url),this._icsCopied=!0,setTimeout(()=>{this._icsCopied=!1},3e3)}catch(s){this._error=`ICS-URL konnte nicht kopiert werden: ${s.message||s.code||s}`}}};rt(we,"properties",{hass:{attribute:!1},narrow:{attribute:!1},route:{attribute:!1},panel:{attribute:!1},_events:{state:!0},_categories:{state:!0},_filters:{state:!0},_selectedId:{state:!0},_icsCopied:{state:!0},_error:{state:!0},_profiles:{state:!0},_selectedProfileId:{state:!0}}),rt(we,"styles",pt`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background: var(--primary-background-color, #fafafa);
      color: var(--primary-text-color, #212121);
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
    }
    header {
      display: flex;
      align-items: center;
      gap: 12px;
      height: 56px;
      padding: 0 16px;
      flex: 0 0 auto;
      background: var(--app-header-background-color, var(--primary-color, #03a9f4));
      color: var(--app-header-text-color, var(--text-primary-color, #fff));
    }
    header h1 {
      font-size: 20px;
      font-weight: 400;
      margin: 0;
      flex: 1;
    }
    .count {
      font-size: 14px;
      opacity: 0.85;
    }
    chronotope-filter-bar {
      flex: 0 0 auto;
    }
    .error {
      flex: 0 0 auto;
      padding: 8px 16px;
      background: var(--error-color, #f44336);
      color: var(--text-primary-color, #fff);
      font-size: 14px;
    }
    .content {
      flex: 1 1 auto;
      display: flex;
      min-height: 0;
    }
    chronotope-event-list {
      flex: 0 0 340px;
      border-inline-end: 1px solid var(--divider-color, #e0e0e0);
    }
    chronotope-map-view {
      flex: 1 1 auto;
    }
    .content.narrow {
      flex-direction: column-reverse;
    }
    .content.narrow chronotope-event-list {
      flex: 1 1 50%;
      border-inline-end: none;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }
    .content.narrow chronotope-map-view {
      flex: 1 1 50%;
    }
  `);customElements.define("chronotope-panel",we);
