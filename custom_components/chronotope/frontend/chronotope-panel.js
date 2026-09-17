var Pa=Object.create;var mr=Object.defineProperty;var Ca=Object.getOwnPropertyDescriptor;var Ma=Object.getOwnPropertyNames;var Sa=Object.getPrototypeOf,Ta=Object.prototype.hasOwnProperty;var za=(a,i,s)=>i in a?mr(a,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[i]=s;var Ps=(a,i)=>()=>(i||a((i={exports:{}}).exports,i),i.exports);var Ea=(a,i,s,r)=>{if(i&&typeof i=="object"||typeof i=="function")for(let l of Ma(i))!Ta.call(a,l)&&l!==s&&mr(a,l,{get:()=>i[l],enumerable:!(r=Ca(i,l))||r.enumerable});return a};var Ii=(a,i,s)=>(s=a!=null?Pa(Sa(a)):{},Ea(i||!a||!a.__esModule?mr(s,"default",{value:a,enumerable:!0}):s,a));var le=(a,i,s)=>za(a,typeof i!="symbol"?i+"":i,s);var Di=Ps((Zn,Gs)=>{(function(a,i){typeof Zn=="object"&&typeof Gs<"u"?i(Zn):typeof define=="function"&&define.amd?define(["exports"],i):(a=typeof globalThis<"u"?globalThis:a||self,i(a.leaflet={}))})(Zn,function(a){"use strict";var i="1.9.4";function s(t){var e,n,o,h;for(n=1,o=arguments.length;n<o;n++){h=arguments[n];for(e in h)t[e]=h[e]}return t}var r=Object.create||function(){function t(){}return function(e){return t.prototype=e,new t}}();function l(t,e){var n=Array.prototype.slice;if(t.bind)return t.bind.apply(t,n.call(arguments,1));var o=n.call(arguments,2);return function(){return t.apply(e,o.length?o.concat(n.call(arguments)):arguments)}}var c=0;function d(t){return"_leaflet_id"in t||(t._leaflet_id=++c),t._leaflet_id}function _(t,e,n){var o,h,u,g;return g=function(){o=!1,h&&(u.apply(n,h),h=!1)},u=function(){o?h=arguments:(t.apply(n,arguments),setTimeout(g,e),o=!0)},u}function f(t,e,n){var o=e[1],h=e[0],u=o-h;return t===o&&n?t:((t-h)%u+u)%u+h}function m(){return!1}function y(t,e){if(e===!1)return t;var n=Math.pow(10,e===void 0?6:e);return Math.round(t*n)/n}function v(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function x(t){return v(t).split(/\s+/)}function w(t,e){Object.prototype.hasOwnProperty.call(t,"options")||(t.options=t.options?r(t.options):{});for(var n in e)t.options[n]=e[n];return t.options}function T(t,e,n){var o=[];for(var h in t)o.push(encodeURIComponent(n?h.toUpperCase():h)+"="+encodeURIComponent(t[h]));return(!e||e.indexOf("?")===-1?"?":"&")+o.join("&")}var z=/\{ *([\w_ -]+) *\}/g;function B(t,e){return t.replace(z,function(n,o){var h=e[o];if(h===void 0)throw new Error("No value provided for variable "+n);return typeof h=="function"&&(h=h(e)),h})}var O=Array.isArray||function(t){return Object.prototype.toString.call(t)==="[object Array]"};function Y(t,e){for(var n=0;n<t.length;n++)if(t[n]===e)return n;return-1}var W="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function st(t){return window["webkit"+t]||window["moz"+t]||window["ms"+t]}var ot=0;function D(t){var e=+new Date,n=Math.max(0,16-(e-ot));return ot=e+n,window.setTimeout(t,n)}var j=window.requestAnimationFrame||st("RequestAnimationFrame")||D,J=window.cancelAnimationFrame||st("CancelAnimationFrame")||st("CancelRequestAnimationFrame")||function(t){window.clearTimeout(t)};function V(t,e,n){if(n&&j===D)t.call(e);else return j.call(window,l(t,e))}function tt(t){t&&J.call(window,t)}var pt={__proto__:null,extend:s,create:r,bind:l,get lastId(){return c},stamp:d,throttle:_,wrapNum:f,falseFn:m,formatNum:y,trim:v,splitWords:x,setOptions:w,getParamString:T,template:B,isArray:O,indexOf:Y,emptyImageUrl:W,requestFn:j,cancelFn:J,requestAnimFrame:V,cancelAnimFrame:tt};function G(){}G.extend=function(t){var e=function(){w(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},n=e.__super__=this.prototype,o=r(n);o.constructor=e,e.prototype=o;for(var h in this)Object.prototype.hasOwnProperty.call(this,h)&&h!=="prototype"&&h!=="__super__"&&(e[h]=this[h]);return t.statics&&s(e,t.statics),t.includes&&(It(t.includes),s.apply(null,[o].concat(t.includes))),s(o,t),delete o.statics,delete o.includes,o.options&&(o.options=n.options?r(n.options):{},s(o.options,t.options)),o._initHooks=[],o.callInitHooks=function(){if(!this._initHooksCalled){n.callInitHooks&&n.callInitHooks.call(this),this._initHooksCalled=!0;for(var u=0,g=o._initHooks.length;u<g;u++)o._initHooks[u].call(this)}},e},G.include=function(t){var e=this.prototype.options;return s(this.prototype,t),t.options&&(this.prototype.options=e,this.mergeOptions(t.options)),this},G.mergeOptions=function(t){return s(this.prototype.options,t),this},G.addInitHook=function(t){var e=Array.prototype.slice.call(arguments,1),n=typeof t=="function"?t:function(){this[t].apply(this,e)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(n),this};function It(t){if(!(typeof L>"u"||!L||!L.Mixin)){t=O(t)?t:[t];for(var e=0;e<t.length;e++)t[e]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",new Error().stack)}}var rt={on:function(t,e,n){if(typeof t=="object")for(var o in t)this._on(o,t[o],e);else{t=x(t);for(var h=0,u=t.length;h<u;h++)this._on(t[h],e,n)}return this},off:function(t,e,n){if(!arguments.length)delete this._events;else if(typeof t=="object")for(var o in t)this._off(o,t[o],e);else{t=x(t);for(var h=arguments.length===1,u=0,g=t.length;u<g;u++)h?this._off(t[u]):this._off(t[u],e,n)}return this},_on:function(t,e,n,o){if(typeof e!="function"){console.warn("wrong listener type: "+typeof e);return}if(this._listens(t,e,n)===!1){n===this&&(n=void 0);var h={fn:e,ctx:n};o&&(h.once=!0),this._events=this._events||{},this._events[t]=this._events[t]||[],this._events[t].push(h)}},_off:function(t,e,n){var o,h,u;if(this._events&&(o=this._events[t],!!o)){if(arguments.length===1){if(this._firingCount)for(h=0,u=o.length;h<u;h++)o[h].fn=m;delete this._events[t];return}if(typeof e!="function"){console.warn("wrong listener type: "+typeof e);return}var g=this._listens(t,e,n);if(g!==!1){var b=o[g];this._firingCount&&(b.fn=m,this._events[t]=o=o.slice()),o.splice(g,1)}}},fire:function(t,e,n){if(!this.listens(t,n))return this;var o=s({},e,{type:t,target:this,sourceTarget:e&&e.sourceTarget||this});if(this._events){var h=this._events[t];if(h){this._firingCount=this._firingCount+1||1;for(var u=0,g=h.length;u<g;u++){var b=h[u],P=b.fn;b.once&&this.off(t,P,b.ctx),P.call(b.ctx||this,o)}this._firingCount--}}return n&&this._propagateEvent(o),this},listens:function(t,e,n,o){typeof t!="string"&&console.warn('"string" type argument expected');var h=e;typeof e!="function"&&(o=!!e,h=void 0,n=void 0);var u=this._events&&this._events[t];if(u&&u.length&&this._listens(t,h,n)!==!1)return!0;if(o){for(var g in this._eventParents)if(this._eventParents[g].listens(t,e,n,o))return!0}return!1},_listens:function(t,e,n){if(!this._events)return!1;var o=this._events[t]||[];if(!e)return!!o.length;n===this&&(n=void 0);for(var h=0,u=o.length;h<u;h++)if(o[h].fn===e&&o[h].ctx===n)return h;return!1},once:function(t,e,n){if(typeof t=="object")for(var o in t)this._on(o,t[o],e,!0);else{t=x(t);for(var h=0,u=t.length;h<u;h++)this._on(t[h],e,n,!0)}return this},addEventParent:function(t){return this._eventParents=this._eventParents||{},this._eventParents[d(t)]=t,this},removeEventParent:function(t){return this._eventParents&&delete this._eventParents[d(t)],this},_propagateEvent:function(t){for(var e in this._eventParents)this._eventParents[e].fire(t.type,s({layer:t.target,propagatedFrom:t.target},t),!0)}};rt.addEventListener=rt.on,rt.removeEventListener=rt.clearAllEventListeners=rt.off,rt.addOneTimeEventListener=rt.once,rt.fireEvent=rt.fire,rt.hasEventListeners=rt.listens;var Lt=G.extend(rt);function S(t,e,n){this.x=n?Math.round(t):t,this.y=n?Math.round(e):e}var Ot=Math.trunc||function(t){return t>0?Math.floor(t):Math.ceil(t)};S.prototype={clone:function(){return new S(this.x,this.y)},add:function(t){return this.clone()._add($(t))},_add:function(t){return this.x+=t.x,this.y+=t.y,this},subtract:function(t){return this.clone()._subtract($(t))},_subtract:function(t){return this.x-=t.x,this.y-=t.y,this},divideBy:function(t){return this.clone()._divideBy(t)},_divideBy:function(t){return this.x/=t,this.y/=t,this},multiplyBy:function(t){return this.clone()._multiplyBy(t)},_multiplyBy:function(t){return this.x*=t,this.y*=t,this},scaleBy:function(t){return new S(this.x*t.x,this.y*t.y)},unscaleBy:function(t){return new S(this.x/t.x,this.y/t.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=Ot(this.x),this.y=Ot(this.y),this},distanceTo:function(t){t=$(t);var e=t.x-this.x,n=t.y-this.y;return Math.sqrt(e*e+n*n)},equals:function(t){return t=$(t),t.x===this.x&&t.y===this.y},contains:function(t){return t=$(t),Math.abs(t.x)<=Math.abs(this.x)&&Math.abs(t.y)<=Math.abs(this.y)},toString:function(){return"Point("+y(this.x)+", "+y(this.y)+")"}};function $(t,e,n){return t instanceof S?t:O(t)?new S(t[0],t[1]):t==null?t:typeof t=="object"&&"x"in t&&"y"in t?new S(t.x,t.y):new S(t,e,n)}function U(t,e){if(t)for(var n=e?[t,e]:t,o=0,h=n.length;o<h;o++)this.extend(n[o])}U.prototype={extend:function(t){var e,n;if(!t)return this;if(t instanceof S||typeof t[0]=="number"||"x"in t)e=n=$(t);else if(t=dt(t),e=t.min,n=t.max,!e||!n)return this;return!this.min&&!this.max?(this.min=e.clone(),this.max=n.clone()):(this.min.x=Math.min(e.x,this.min.x),this.max.x=Math.max(n.x,this.max.x),this.min.y=Math.min(e.y,this.min.y),this.max.y=Math.max(n.y,this.max.y)),this},getCenter:function(t){return $((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,t)},getBottomLeft:function(){return $(this.min.x,this.max.y)},getTopRight:function(){return $(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(t){var e,n;return typeof t[0]=="number"||t instanceof S?t=$(t):t=dt(t),t instanceof U?(e=t.min,n=t.max):e=n=t,e.x>=this.min.x&&n.x<=this.max.x&&e.y>=this.min.y&&n.y<=this.max.y},intersects:function(t){t=dt(t);var e=this.min,n=this.max,o=t.min,h=t.max,u=h.x>=e.x&&o.x<=n.x,g=h.y>=e.y&&o.y<=n.y;return u&&g},overlaps:function(t){t=dt(t);var e=this.min,n=this.max,o=t.min,h=t.max,u=h.x>e.x&&o.x<n.x,g=h.y>e.y&&o.y<n.y;return u&&g},isValid:function(){return!!(this.min&&this.max)},pad:function(t){var e=this.min,n=this.max,o=Math.abs(e.x-n.x)*t,h=Math.abs(e.y-n.y)*t;return dt($(e.x-o,e.y-h),$(n.x+o,n.y+h))},equals:function(t){return t?(t=dt(t),this.min.equals(t.getTopLeft())&&this.max.equals(t.getBottomRight())):!1}};function dt(t,e){return!t||t instanceof U?t:new U(t,e)}function at(t,e){if(t)for(var n=e?[t,e]:t,o=0,h=n.length;o<h;o++)this.extend(n[o])}at.prototype={extend:function(t){var e=this._southWest,n=this._northEast,o,h;if(t instanceof K)o=t,h=t;else if(t instanceof at){if(o=t._southWest,h=t._northEast,!o||!h)return this}else return t?this.extend(H(t)||I(t)):this;return!e&&!n?(this._southWest=new K(o.lat,o.lng),this._northEast=new K(h.lat,h.lng)):(e.lat=Math.min(o.lat,e.lat),e.lng=Math.min(o.lng,e.lng),n.lat=Math.max(h.lat,n.lat),n.lng=Math.max(h.lng,n.lng)),this},pad:function(t){var e=this._southWest,n=this._northEast,o=Math.abs(e.lat-n.lat)*t,h=Math.abs(e.lng-n.lng)*t;return new at(new K(e.lat-o,e.lng-h),new K(n.lat+o,n.lng+h))},getCenter:function(){return new K((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new K(this.getNorth(),this.getWest())},getSouthEast:function(){return new K(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(t){typeof t[0]=="number"||t instanceof K||"lat"in t?t=H(t):t=I(t);var e=this._southWest,n=this._northEast,o,h;return t instanceof at?(o=t.getSouthWest(),h=t.getNorthEast()):o=h=t,o.lat>=e.lat&&h.lat<=n.lat&&o.lng>=e.lng&&h.lng<=n.lng},intersects:function(t){t=I(t);var e=this._southWest,n=this._northEast,o=t.getSouthWest(),h=t.getNorthEast(),u=h.lat>=e.lat&&o.lat<=n.lat,g=h.lng>=e.lng&&o.lng<=n.lng;return u&&g},overlaps:function(t){t=I(t);var e=this._southWest,n=this._northEast,o=t.getSouthWest(),h=t.getNorthEast(),u=h.lat>e.lat&&o.lat<n.lat,g=h.lng>e.lng&&o.lng<n.lng;return u&&g},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(t,e){return t?(t=I(t),this._southWest.equals(t.getSouthWest(),e)&&this._northEast.equals(t.getNorthEast(),e)):!1},isValid:function(){return!!(this._southWest&&this._northEast)}};function I(t,e){return t instanceof at?t:new at(t,e)}function K(t,e,n){if(isNaN(t)||isNaN(e))throw new Error("Invalid LatLng object: ("+t+", "+e+")");this.lat=+t,this.lng=+e,n!==void 0&&(this.alt=+n)}K.prototype={equals:function(t,e){if(!t)return!1;t=H(t);var n=Math.max(Math.abs(this.lat-t.lat),Math.abs(this.lng-t.lng));return n<=(e===void 0?1e-9:e)},toString:function(t){return"LatLng("+y(this.lat,t)+", "+y(this.lng,t)+")"},distanceTo:function(t){return Z.distance(this,H(t))},wrap:function(){return Z.wrapLatLng(this)},toBounds:function(t){var e=180*t/40075017,n=e/Math.cos(Math.PI/180*this.lat);return I([this.lat-e,this.lng-n],[this.lat+e,this.lng+n])},clone:function(){return new K(this.lat,this.lng,this.alt)}};function H(t,e,n){return t instanceof K?t:O(t)&&typeof t[0]!="object"?t.length===3?new K(t[0],t[1],t[2]):t.length===2?new K(t[0],t[1]):null:t==null?t:typeof t=="object"&&"lat"in t?new K(t.lat,"lng"in t?t.lng:t.lon,t.alt):e===void 0?null:new K(t,e,n)}var R={latLngToPoint:function(t,e){var n=this.projection.project(t),o=this.scale(e);return this.transformation._transform(n,o)},pointToLatLng:function(t,e){var n=this.scale(e),o=this.transformation.untransform(t,n);return this.projection.unproject(o)},project:function(t){return this.projection.project(t)},unproject:function(t){return this.projection.unproject(t)},scale:function(t){return 256*Math.pow(2,t)},zoom:function(t){return Math.log(t/256)/Math.LN2},getProjectedBounds:function(t){if(this.infinite)return null;var e=this.projection.bounds,n=this.scale(t),o=this.transformation.transform(e.min,n),h=this.transformation.transform(e.max,n);return new U(o,h)},infinite:!1,wrapLatLng:function(t){var e=this.wrapLng?f(t.lng,this.wrapLng,!0):t.lng,n=this.wrapLat?f(t.lat,this.wrapLat,!0):t.lat,o=t.alt;return new K(n,e,o)},wrapLatLngBounds:function(t){var e=t.getCenter(),n=this.wrapLatLng(e),o=e.lat-n.lat,h=e.lng-n.lng;if(o===0&&h===0)return t;var u=t.getSouthWest(),g=t.getNorthEast(),b=new K(u.lat-o,u.lng-h),P=new K(g.lat-o,g.lng-h);return new at(b,P)}},Z=s({},R,{wrapLng:[-180,180],R:6371e3,distance:function(t,e){var n=Math.PI/180,o=t.lat*n,h=e.lat*n,u=Math.sin((e.lat-t.lat)*n/2),g=Math.sin((e.lng-t.lng)*n/2),b=u*u+Math.cos(o)*Math.cos(h)*g*g,P=2*Math.atan2(Math.sqrt(b),Math.sqrt(1-b));return this.R*P}}),zt=6378137,mt={R:zt,MAX_LATITUDE:85.0511287798,project:function(t){var e=Math.PI/180,n=this.MAX_LATITUDE,o=Math.max(Math.min(n,t.lat),-n),h=Math.sin(o*e);return new S(this.R*t.lng*e,this.R*Math.log((1+h)/(1-h))/2)},unproject:function(t){var e=180/Math.PI;return new K((2*Math.atan(Math.exp(t.y/this.R))-Math.PI/2)*e,t.x*e/this.R)},bounds:function(){var t=zt*Math.PI;return new U([-t,-t],[t,t])}()};function xt(t,e,n,o){if(O(t)){this._a=t[0],this._b=t[1],this._c=t[2],this._d=t[3];return}this._a=t,this._b=e,this._c=n,this._d=o}xt.prototype={transform:function(t,e){return this._transform(t.clone(),e)},_transform:function(t,e){return e=e||1,t.x=e*(this._a*t.x+this._b),t.y=e*(this._c*t.y+this._d),t},untransform:function(t,e){return e=e||1,new S((t.x/e-this._b)/this._a,(t.y/e-this._d)/this._c)}};function et(t,e,n,o){return new xt(t,e,n,o)}var Kt=s({},Z,{code:"EPSG:3857",projection:mt,transformation:function(){var t=.5/(Math.PI*mt.R);return et(t,.5,-t,.5)}()}),At=s({},Kt,{code:"EPSG:900913"});function Nt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function ht(t,e){var n="",o,h,u,g,b,P;for(o=0,u=t.length;o<u;o++){for(b=t[o],h=0,g=b.length;h<g;h++)P=b[h],n+=(h?"L":"M")+P.x+" "+P.y;n+=e?N.svg?"z":"x":""}return n||"M0 0"}var ft=document.documentElement.style,Pt="ActiveXObject"in window,bt=Pt&&!document.addEventListener,it="msLaunchUri"in navigator&&!("documentMode"in document),_t=M("webkit"),ct=M("android"),nt=M("android 2")||M("android 3"),kt=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),Ct=ct&&M("Google")&&kt<537&&!("AudioNode"in window),gt=!!window.opera,wt=!it&&M("chrome"),Dt=M("gecko")&&!_t&&!gt&&!Pt,Ft=!wt&&M("safari"),Rt=M("phantom"),Ut="OTransition"in ft,ce=navigator.platform.indexOf("Win")===0,Xt=Pt&&"transition"in ft,Gt="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!nt,p="MozPerspective"in ft,jt=!window.L_DISABLE_3D&&(Xt||Gt||p)&&!Ut&&!Rt,Wt=typeof orientation<"u"||M("mobile"),re=Wt&&_t,Le=Wt&&Gt,Et=!window.PointerEvent&&window.MSPointerEvent,Ht=!!(window.PointerEvent||Et),Se="ontouchstart"in window||!!window.TouchEvent,Qt=!window.L_NO_TOUCH&&(Se||Ht),te=Wt&&gt,Te=Wt&&Dt,ue=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,ke=function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("testPassiveEventSupport",m,e),window.removeEventListener("testPassiveEventSupport",m,e)}catch{}return t}(),ye=function(){return!!document.createElement("canvas").getContext}(),ee=!!(document.createElementNS&&Nt("svg").createSVGRect),ie=!!ee&&function(){var t=document.createElement("div");return t.innerHTML="<svg/>",(t.firstChild&&t.firstChild.namespaceURI)==="http://www.w3.org/2000/svg"}(),me=!ee&&function(){try{var t=document.createElement("div");t.innerHTML='<v:shape adj="1"/>';var e=t.firstChild;return e.style.behavior="url(#default#VML)",e&&typeof e.adj=="object"}catch{return!1}}(),ge=navigator.platform.indexOf("Mac")===0,Yt=navigator.platform.indexOf("Linux")===0;function M(t){return navigator.userAgent.toLowerCase().indexOf(t)>=0}var N={ie:Pt,ielt9:bt,edge:it,webkit:_t,android:ct,android23:nt,androidStock:Ct,opera:gt,chrome:wt,gecko:Dt,safari:Ft,phantom:Rt,opera12:Ut,win:ce,ie3d:Xt,webkit3d:Gt,gecko3d:p,any3d:jt,mobile:Wt,mobileWebkit:re,mobileWebkit3d:Le,msPointer:Et,pointer:Ht,touch:Qt,touchNative:Se,mobileOpera:te,mobileGecko:Te,retina:ue,passiveEvents:ke,canvas:ye,svg:ee,vml:me,inlineSvg:ie,mac:ge,linux:Yt},be=N.msPointer?"MSPointerDown":"pointerdown",Ze=N.msPointer?"MSPointerMove":"pointermove",vt=N.msPointer?"MSPointerUp":"pointerup",ii=N.msPointer?"MSPointerCancel":"pointercancel",Ge={touchstart:be,touchmove:Ze,touchend:vt,touchcancel:ii},ze={touchstart:Ri,touchmove:Ee,touchend:Ee,touchcancel:Ee},se={},qt=!1;function xe(t,e,n){return e==="touchstart"&&Zt(),ze[e]?(n=ze[e].bind(this,n),t.addEventListener(Ge[e],n,!1),n):(console.warn("wrong event specified:",e),m)}function ni(t,e,n){if(!Ge[e]){console.warn("wrong event specified:",e);return}t.removeEventListener(Ge[e],n,!1)}function ri(t){se[t.pointerId]=t}function oe(t){se[t.pointerId]&&(se[t.pointerId]=t)}function ne(t){delete se[t.pointerId]}function Zt(){qt||(document.addEventListener(be,ri,!0),document.addEventListener(Ze,oe,!0),document.addEventListener(vt,ne,!0),document.addEventListener(ii,ne,!0),qt=!0)}function Ee(t,e){if(e.pointerType!==(e.MSPOINTER_TYPE_MOUSE||"mouse")){e.touches=[];for(var n in se)e.touches.push(se[n]);e.changedTouches=[e],t(e)}}function Ri(t,e){e.MSPOINTER_TYPE_TOUCH&&e.pointerType===e.MSPOINTER_TYPE_TOUCH&&de(e),Ee(t,e)}function Hi(t){var e={},n,o;for(o in t)n=t[o],e[o]=n&&n.bind?n.bind(t):n;return t=e,e.type="dblclick",e.detail=2,e.isTrusted=!1,e._simulated=!0,e}var Ui=200;function Gi(t,e){t.addEventListener("dblclick",e);var n=0,o;function h(u){if(u.detail!==1){o=u.detail;return}if(!(u.pointerType==="mouse"||u.sourceCapabilities&&!u.sourceCapabilities.firesTouchEvents)){var g=Rr(u);if(!(g.some(function(P){return P instanceof HTMLLabelElement&&P.attributes.for})&&!g.some(function(P){return P instanceof HTMLInputElement||P instanceof HTMLSelectElement}))){var b=Date.now();b-n<=Ui?(o++,o===2&&e(Hi(u))):o=1,n=b}}}return t.addEventListener("click",h),{dblclick:e,simDblclick:h}}function ui(t,e){t.removeEventListener("dblclick",e.dblclick),t.removeEventListener("click",e.simDblclick)}var We=Si(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),qe=Si(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),Mi=qe==="webkitTransition"||qe==="OTransition"?qe+"End":"transitionend";function Be(t){return typeof t=="string"?document.getElementById(t):t}function Pe(t,e){var n=t.style[e]||t.currentStyle&&t.currentStyle[e];if((!n||n==="auto")&&document.defaultView){var o=document.defaultView.getComputedStyle(t,null);n=o?o[e]:null}return n==="auto"?null:n}function ut(t,e,n){var o=document.createElement(t);return o.className=e||"",n&&n.appendChild(o),o}function Mt(t){var e=t.parentNode;e&&e.removeChild(t)}function si(t){for(;t.firstChild;)t.removeChild(t.firstChild)}function De(t){var e=t.parentNode;e&&e.lastChild!==t&&e.appendChild(t)}function Ce(t){var e=t.parentNode;e&&e.firstChild!==t&&e.insertBefore(t,e.firstChild)}function pi(t,e){if(t.classList!==void 0)return t.classList.contains(e);var n=Fe(t);return n.length>0&&new RegExp("(^|\\s)"+e+"(\\s|$)").test(n)}function X(t,e){if(t.classList!==void 0)for(var n=x(e),o=0,h=n.length;o<h;o++)t.classList.add(n[o]);else if(!pi(t,e)){var u=Fe(t);oi(t,(u?u+" ":"")+e)}}function St(t,e){t.classList!==void 0?t.classList.remove(e):oi(t,v((" "+Fe(t)+" ").replace(" "+e+" "," ")))}function oi(t,e){t.className.baseVal===void 0?t.className=e:t.className.baseVal=e}function Fe(t){return t.correspondingElement&&(t=t.correspondingElement),t.className.baseVal===void 0?t.className:t.className.baseVal}function pe(t,e){"opacity"in t.style?t.style.opacity=e:"filter"in t.style&&Wi(t,e)}function Wi(t,e){var n=!1,o="DXImageTransform.Microsoft.Alpha";try{n=t.filters.item(o)}catch{if(e===1)return}e=Math.round(e*100),n?(n.Enabled=e!==100,n.Opacity=e):t.style.filter+=" progid:"+o+"(opacity="+e+")"}function Si(t){for(var e=document.documentElement.style,n=0;n<t.length;n++)if(t[n]in e)return t[n];return!1}function Ve(t,e,n){var o=e||new S(0,0);t.style[We]=(N.ie3d?"translate("+o.x+"px,"+o.y+"px)":"translate3d("+o.x+"px,"+o.y+"px,0)")+(n?" scale("+n+")":"")}function Vt(t,e){t._leaflet_pos=e,N.any3d?Ve(t,e):(t.style.left=e.x+"px",t.style.top=e.y+"px")}function je(t){return t._leaflet_pos||new S(0,0)}var fi,_i,qi;if("onselectstart"in document)fi=function(){Q(window,"selectstart",de)},_i=function(){$t(window,"selectstart",de)};else{var mi=Si(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);fi=function(){if(mi){var t=document.documentElement.style;qi=t[mi],t[mi]="none"}},_i=function(){mi&&(document.documentElement.style[mi]=qi,qi=void 0)}}function Vi(){Q(window,"dragstart",de)}function Yn(){$t(window,"dragstart",de)}var bn,Jn;function Xn(t){for(;t.tabIndex===-1;)t=t.parentNode;t.style&&(xn(),bn=t,Jn=t.style.outlineStyle,t.style.outlineStyle="none",Q(window,"keydown",xn))}function xn(){bn&&(bn.style.outlineStyle=Jn,bn=void 0,Jn=void 0,$t(window,"keydown",xn))}function Dr(t){do t=t.parentNode;while((!t.offsetWidth||!t.offsetHeight)&&t!==document.body);return t}function Qn(t){var e=t.getBoundingClientRect();return{x:e.width/t.offsetWidth||1,y:e.height/t.offsetHeight||1,boundingClientRect:e}}var Eo={__proto__:null,TRANSFORM:We,TRANSITION:qe,TRANSITION_END:Mi,get:Be,getStyle:Pe,create:ut,remove:Mt,empty:si,toFront:De,toBack:Ce,hasClass:pi,addClass:X,removeClass:St,setClass:oi,getClass:Fe,setOpacity:pe,testProp:Si,setTransform:Ve,setPosition:Vt,getPosition:je,get disableTextSelection(){return fi},get enableTextSelection(){return _i},disableImageDrag:Vi,enableImageDrag:Yn,preventOutline:Xn,restoreOutline:xn,getSizedParentNode:Dr,getScale:Qn};function Q(t,e,n,o){if(e&&typeof e=="object")for(var h in e)er(t,h,e[h],n);else{e=x(e);for(var u=0,g=e.length;u<g;u++)er(t,e[u],n,o)}return this}var Re="_leaflet_events";function $t(t,e,n,o){if(arguments.length===1)Fr(t),delete t[Re];else if(e&&typeof e=="object")for(var h in e)ir(t,h,e[h],n);else if(e=x(e),arguments.length===2)Fr(t,function(b){return Y(e,b)!==-1});else for(var u=0,g=e.length;u<g;u++)ir(t,e[u],n,o);return this}function Fr(t,e){for(var n in t[Re]){var o=n.split(/\d/)[0];(!e||e(o))&&ir(t,o,null,null,n)}}var tr={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function er(t,e,n,o){var h=e+d(n)+(o?"_"+d(o):"");if(t[Re]&&t[Re][h])return this;var u=function(b){return n.call(o||t,b||window.event)},g=u;!N.touchNative&&N.pointer&&e.indexOf("touch")===0?u=xe(t,e,u):N.touch&&e==="dblclick"?u=Gi(t,u):"addEventListener"in t?e==="touchstart"||e==="touchmove"||e==="wheel"||e==="mousewheel"?t.addEventListener(tr[e]||e,u,N.passiveEvents?{passive:!1}:!1):e==="mouseenter"||e==="mouseleave"?(u=function(b){b=b||window.event,rr(t,b)&&g(b)},t.addEventListener(tr[e],u,!1)):t.addEventListener(e,g,!1):t.attachEvent("on"+e,u),t[Re]=t[Re]||{},t[Re][h]=u}function ir(t,e,n,o,h){h=h||e+d(n)+(o?"_"+d(o):"");var u=t[Re]&&t[Re][h];if(!u)return this;!N.touchNative&&N.pointer&&e.indexOf("touch")===0?ni(t,e,u):N.touch&&e==="dblclick"?ui(t,u):"removeEventListener"in t?t.removeEventListener(tr[e]||e,u,!1):t.detachEvent("on"+e,u),t[Re][h]=null}function gi(t){return t.stopPropagation?t.stopPropagation():t.originalEvent?t.originalEvent._stopped=!0:t.cancelBubble=!0,this}function nr(t){return er(t,"wheel",gi),this}function ji(t){return Q(t,"mousedown touchstart dblclick contextmenu",gi),t._leaflet_disable_click=!0,this}function de(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,this}function vi(t){return de(t),gi(t),this}function Rr(t){if(t.composedPath)return t.composedPath();for(var e=[],n=t.target;n;)e.push(n),n=n.parentNode;return e}function Hr(t,e){if(!e)return new S(t.clientX,t.clientY);var n=Qn(e),o=n.boundingClientRect;return new S((t.clientX-o.left)/n.x-e.clientLeft,(t.clientY-o.top)/n.y-e.clientTop)}var $o=N.linux&&N.chrome?window.devicePixelRatio:N.mac?window.devicePixelRatio*3:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function Ur(t){return N.edge?t.wheelDeltaY/2:t.deltaY&&t.deltaMode===0?-t.deltaY/$o:t.deltaY&&t.deltaMode===1?-t.deltaY*20:t.deltaY&&t.deltaMode===2?-t.deltaY*60:t.deltaX||t.deltaZ?0:t.wheelDelta?(t.wheelDeltaY||t.wheelDelta)/2:t.detail&&Math.abs(t.detail)<32765?-t.detail*20:t.detail?t.detail/-32765*60:0}function rr(t,e){var n=e.relatedTarget;if(!n)return!0;try{for(;n&&n!==t;)n=n.parentNode}catch{return!1}return n!==t}var Oo={__proto__:null,on:Q,off:$t,stopPropagation:gi,disableScrollPropagation:nr,disableClickPropagation:ji,preventDefault:de,stop:vi,getPropagationPath:Rr,getMousePosition:Hr,getWheelDelta:Ur,isExternalTarget:rr,addListener:Q,removeListener:$t},Gr=Lt.extend({run:function(t,e,n,o){this.stop(),this._el=t,this._inProgress=!0,this._duration=n||.25,this._easeOutPower=1/Math.max(o||.5,.2),this._startPos=je(t),this._offset=e.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=V(this._animate,this),this._step()},_step:function(t){var e=+new Date-this._startTime,n=this._duration*1e3;e<n?this._runFrame(this._easeOut(e/n),t):(this._runFrame(1),this._complete())},_runFrame:function(t,e){var n=this._startPos.add(this._offset.multiplyBy(t));e&&n._round(),Vt(this._el,n),this.fire("step")},_complete:function(){tt(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(t){return 1-Math.pow(1-t,this._easeOutPower)}}),yt=Lt.extend({options:{crs:Kt,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(t,e){e=w(this,e),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(t),this._initLayout(),this._onResize=l(this._onResize,this),this._initEvents(),e.maxBounds&&this.setMaxBounds(e.maxBounds),e.zoom!==void 0&&(this._zoom=this._limitZoom(e.zoom)),e.center&&e.zoom!==void 0&&this.setView(H(e.center),e.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=qe&&N.any3d&&!N.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),Q(this._proxy,Mi,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(t,e,n){if(e=e===void 0?this._zoom:this._limitZoom(e),t=this._limitCenter(H(t),e,this.options.maxBounds),n=n||{},this._stop(),this._loaded&&!n.reset&&n!==!0){n.animate!==void 0&&(n.zoom=s({animate:n.animate},n.zoom),n.pan=s({animate:n.animate,duration:n.duration},n.pan));var o=this._zoom!==e?this._tryAnimatedZoom&&this._tryAnimatedZoom(t,e,n.zoom):this._tryAnimatedPan(t,n.pan);if(o)return clearTimeout(this._sizeTimer),this}return this._resetView(t,e,n.pan&&n.pan.noMoveStart),this},setZoom:function(t,e){return this._loaded?this.setView(this.getCenter(),t,{zoom:e}):(this._zoom=t,this)},zoomIn:function(t,e){return t=t||(N.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+t,e)},zoomOut:function(t,e){return t=t||(N.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-t,e)},setZoomAround:function(t,e,n){var o=this.getZoomScale(e),h=this.getSize().divideBy(2),u=t instanceof S?t:this.latLngToContainerPoint(t),g=u.subtract(h).multiplyBy(1-1/o),b=this.containerPointToLatLng(h.add(g));return this.setView(b,e,{zoom:n})},_getBoundsCenterZoom:function(t,e){e=e||{},t=t.getBounds?t.getBounds():I(t);var n=$(e.paddingTopLeft||e.padding||[0,0]),o=$(e.paddingBottomRight||e.padding||[0,0]),h=this.getBoundsZoom(t,!1,n.add(o));if(h=typeof e.maxZoom=="number"?Math.min(e.maxZoom,h):h,h===1/0)return{center:t.getCenter(),zoom:h};var u=o.subtract(n).divideBy(2),g=this.project(t.getSouthWest(),h),b=this.project(t.getNorthEast(),h),P=this.unproject(g.add(b).divideBy(2).add(u),h);return{center:P,zoom:h}},fitBounds:function(t,e){if(t=I(t),!t.isValid())throw new Error("Bounds are not valid.");var n=this._getBoundsCenterZoom(t,e);return this.setView(n.center,n.zoom,e)},fitWorld:function(t){return this.fitBounds([[-90,-180],[90,180]],t)},panTo:function(t,e){return this.setView(t,this._zoom,{pan:e})},panBy:function(t,e){if(t=$(t).round(),e=e||{},!t.x&&!t.y)return this.fire("moveend");if(e.animate!==!0&&!this.getSize().contains(t))return this._resetView(this.unproject(this.project(this.getCenter()).add(t)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new Gr,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),e.noMoveStart||this.fire("movestart"),e.animate!==!1){X(this._mapPane,"leaflet-pan-anim");var n=this._getMapPanePos().subtract(t).round();this._panAnim.run(this._mapPane,n,e.duration||.25,e.easeLinearity)}else this._rawPanBy(t),this.fire("move").fire("moveend");return this},flyTo:function(t,e,n){if(n=n||{},n.animate===!1||!N.any3d)return this.setView(t,e,n);this._stop();var o=this.project(this.getCenter()),h=this.project(t),u=this.getSize(),g=this._zoom;t=H(t),e=e===void 0?g:e;var b=Math.max(u.x,u.y),P=b*this.getZoomScale(g,e),C=h.distanceTo(o)||1,A=1.42,q=A*A;function lt(Jt){var On=Jt?-1:1,xa=Jt?P:b,wa=P*P-b*b+On*q*q*C*C,La=2*xa*q*C,_r=wa/La,ks=Math.sqrt(_r*_r+1)-_r,ka=ks<1e-9?-18:Math.log(ks);return ka}function ve(Jt){return(Math.exp(Jt)-Math.exp(-Jt))/2}function ae(Jt){return(Math.exp(Jt)+Math.exp(-Jt))/2}function Oe(Jt){return ve(Jt)/ae(Jt)}var we=lt(0);function Ai(Jt){return b*(ae(we)/ae(we+A*Jt))}function ga(Jt){return b*(ae(we)*Oe(we+A*Jt)-ve(we))/q}function va(Jt){return 1-Math.pow(1-Jt,1.5)}var ya=Date.now(),ws=(lt(1)-we)/A,ba=n.duration?1e3*n.duration:1e3*ws*.8;function Ls(){var Jt=(Date.now()-ya)/ba,On=va(Jt)*ws;Jt<=1?(this._flyToFrame=V(Ls,this),this._move(this.unproject(o.add(h.subtract(o).multiplyBy(ga(On)/C)),g),this.getScaleZoom(b/Ai(On),g),{flyTo:!0})):this._move(t,e)._moveEnd(!0)}return this._moveStart(!0,n.noMoveStart),Ls.call(this),this},flyToBounds:function(t,e){var n=this._getBoundsCenterZoom(t,e);return this.flyTo(n.center,n.zoom,e)},setMaxBounds:function(t){return t=I(t),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),t.isValid()?(this.options.maxBounds=t,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(t){var e=this.options.minZoom;return this.options.minZoom=t,this._loaded&&e!==t&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(t):this},setMaxZoom:function(t){var e=this.options.maxZoom;return this.options.maxZoom=t,this._loaded&&e!==t&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(t):this},panInsideBounds:function(t,e){this._enforcingBounds=!0;var n=this.getCenter(),o=this._limitCenter(n,this._zoom,I(t));return n.equals(o)||this.panTo(o,e),this._enforcingBounds=!1,this},panInside:function(t,e){e=e||{};var n=$(e.paddingTopLeft||e.padding||[0,0]),o=$(e.paddingBottomRight||e.padding||[0,0]),h=this.project(this.getCenter()),u=this.project(t),g=this.getPixelBounds(),b=dt([g.min.add(n),g.max.subtract(o)]),P=b.getSize();if(!b.contains(u)){this._enforcingBounds=!0;var C=u.subtract(b.getCenter()),A=b.extend(u).getSize().subtract(P);h.x+=C.x<0?-A.x:A.x,h.y+=C.y<0?-A.y:A.y,this.panTo(this.unproject(h),e),this._enforcingBounds=!1}return this},invalidateSize:function(t){if(!this._loaded)return this;t=s({animate:!1,pan:!0},t===!0?{animate:!0}:t);var e=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var n=this.getSize(),o=e.divideBy(2).round(),h=n.divideBy(2).round(),u=o.subtract(h);return!u.x&&!u.y?this:(t.animate&&t.pan?this.panBy(u):(t.pan&&this._rawPanBy(u),this.fire("move"),t.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(l(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:e,newSize:n}))},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(t){if(t=this._locateOptions=s({timeout:1e4,watch:!1},t),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var e=l(this._handleGeolocationResponse,this),n=l(this._handleGeolocationError,this);return t.watch?this._locationWatchId=navigator.geolocation.watchPosition(e,n,t):navigator.geolocation.getCurrentPosition(e,n,t),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(t){if(this._container._leaflet_id){var e=t.code,n=t.message||(e===1?"permission denied":e===2?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:e,message:"Geolocation error: "+n+"."})}},_handleGeolocationResponse:function(t){if(this._container._leaflet_id){var e=t.coords.latitude,n=t.coords.longitude,o=new K(e,n),h=o.toBounds(t.coords.accuracy*2),u=this._locateOptions;if(u.setView){var g=this.getBoundsZoom(h);this.setView(o,u.maxZoom?Math.min(g,u.maxZoom):g)}var b={latlng:o,bounds:h,timestamp:t.timestamp};for(var P in t.coords)typeof t.coords[P]=="number"&&(b[P]=t.coords[P]);this.fire("locationfound",b)}},addHandler:function(t,e){if(!e)return this;var n=this[t]=new e(this);return this._handlers.push(n),this.options[t]&&n.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch{this._container._leaflet_id=void 0,this._containerId=void 0}this._locationWatchId!==void 0&&this.stopLocate(),this._stop(),Mt(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(tt(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload");var t;for(t in this._layers)this._layers[t].remove();for(t in this._panes)Mt(this._panes[t]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(t,e){var n="leaflet-pane"+(t?" leaflet-"+t.replace("Pane","")+"-pane":""),o=ut("div",n,e||this._mapPane);return t&&(this._panes[t]=o),o},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var t=this.getPixelBounds(),e=this.unproject(t.getBottomLeft()),n=this.unproject(t.getTopRight());return new at(e,n)},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(t,e,n){t=I(t),n=$(n||[0,0]);var o=this.getZoom()||0,h=this.getMinZoom(),u=this.getMaxZoom(),g=t.getNorthWest(),b=t.getSouthEast(),P=this.getSize().subtract(n),C=dt(this.project(b,o),this.project(g,o)).getSize(),A=N.any3d?this.options.zoomSnap:1,q=P.x/C.x,lt=P.y/C.y,ve=e?Math.max(q,lt):Math.min(q,lt);return o=this.getScaleZoom(ve,o),A&&(o=Math.round(o/(A/100))*(A/100),o=e?Math.ceil(o/A)*A:Math.floor(o/A)*A),Math.max(h,Math.min(u,o))},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new S(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(t,e){var n=this._getTopLeftPoint(t,e);return new U(n,n.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(t){return this.options.crs.getProjectedBounds(t===void 0?this.getZoom():t)},getPane:function(t){return typeof t=="string"?this._panes[t]:t},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(t,e){var n=this.options.crs;return e=e===void 0?this._zoom:e,n.scale(t)/n.scale(e)},getScaleZoom:function(t,e){var n=this.options.crs;e=e===void 0?this._zoom:e;var o=n.zoom(t*n.scale(e));return isNaN(o)?1/0:o},project:function(t,e){return e=e===void 0?this._zoom:e,this.options.crs.latLngToPoint(H(t),e)},unproject:function(t,e){return e=e===void 0?this._zoom:e,this.options.crs.pointToLatLng($(t),e)},layerPointToLatLng:function(t){var e=$(t).add(this.getPixelOrigin());return this.unproject(e)},latLngToLayerPoint:function(t){var e=this.project(H(t))._round();return e._subtract(this.getPixelOrigin())},wrapLatLng:function(t){return this.options.crs.wrapLatLng(H(t))},wrapLatLngBounds:function(t){return this.options.crs.wrapLatLngBounds(I(t))},distance:function(t,e){return this.options.crs.distance(H(t),H(e))},containerPointToLayerPoint:function(t){return $(t).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(t){return $(t).add(this._getMapPanePos())},containerPointToLatLng:function(t){var e=this.containerPointToLayerPoint($(t));return this.layerPointToLatLng(e)},latLngToContainerPoint:function(t){return this.layerPointToContainerPoint(this.latLngToLayerPoint(H(t)))},mouseEventToContainerPoint:function(t){return Hr(t,this._container)},mouseEventToLayerPoint:function(t){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))},mouseEventToLatLng:function(t){return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))},_initContainer:function(t){var e=this._container=Be(t);if(e){if(e._leaflet_id)throw new Error("Map container is already initialized.")}else throw new Error("Map container not found.");Q(e,"scroll",this._onScroll,this),this._containerId=d(e)},_initLayout:function(){var t=this._container;this._fadeAnimated=this.options.fadeAnimation&&N.any3d,X(t,"leaflet-container"+(N.touch?" leaflet-touch":"")+(N.retina?" leaflet-retina":"")+(N.ielt9?" leaflet-oldie":"")+(N.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var e=Pe(t,"position");e!=="absolute"&&e!=="relative"&&e!=="fixed"&&e!=="sticky"&&(t.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var t=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),Vt(this._mapPane,new S(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(X(t.markerPane,"leaflet-zoom-hide"),X(t.shadowPane,"leaflet-zoom-hide"))},_resetView:function(t,e,n){Vt(this._mapPane,new S(0,0));var o=!this._loaded;this._loaded=!0,e=this._limitZoom(e),this.fire("viewprereset");var h=this._zoom!==e;this._moveStart(h,n)._move(t,e)._moveEnd(h),this.fire("viewreset"),o&&this.fire("load")},_moveStart:function(t,e){return t&&this.fire("zoomstart"),e||this.fire("movestart"),this},_move:function(t,e,n,o){e===void 0&&(e=this._zoom);var h=this._zoom!==e;return this._zoom=e,this._lastCenter=t,this._pixelOrigin=this._getNewPixelOrigin(t),o?n&&n.pinch&&this.fire("zoom",n):((h||n&&n.pinch)&&this.fire("zoom",n),this.fire("move",n)),this},_moveEnd:function(t){return t&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return tt(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(t){Vt(this._mapPane,this._getMapPanePos().subtract(t))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(t){this._targets={},this._targets[d(this._container)]=this;var e=t?$t:Q;e(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&e(window,"resize",this._onResize,this),N.any3d&&this.options.transform3DLimit&&(t?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){tt(this._resizeRequest),this._resizeRequest=V(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var t=this._getMapPanePos();Math.max(Math.abs(t.x),Math.abs(t.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(t,e){for(var n=[],o,h=e==="mouseout"||e==="mouseover",u=t.target||t.srcElement,g=!1;u;){if(o=this._targets[d(u)],o&&(e==="click"||e==="preclick")&&this._draggableMoved(o)){g=!0;break}if(o&&o.listens(e,!0)&&(h&&!rr(u,t)||(n.push(o),h))||u===this._container)break;u=u.parentNode}return!n.length&&!g&&!h&&this.listens(e,!0)&&(n=[this]),n},_isClickDisabled:function(t){for(;t&&t!==this._container;){if(t._leaflet_disable_click)return!0;t=t.parentNode}},_handleDOMEvent:function(t){var e=t.target||t.srcElement;if(!(!this._loaded||e._leaflet_disable_events||t.type==="click"&&this._isClickDisabled(e))){var n=t.type;n==="mousedown"&&Xn(e),this._fireDOMEvent(t,n)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(t,e,n){if(t.type==="click"){var o=s({},t);o.type="preclick",this._fireDOMEvent(o,o.type,n)}var h=this._findEventTargets(t,e);if(n){for(var u=[],g=0;g<n.length;g++)n[g].listens(e,!0)&&u.push(n[g]);h=u.concat(h)}if(h.length){e==="contextmenu"&&de(t);var b=h[0],P={originalEvent:t};if(t.type!=="keypress"&&t.type!=="keydown"&&t.type!=="keyup"){var C=b.getLatLng&&(!b._radius||b._radius<=10);P.containerPoint=C?this.latLngToContainerPoint(b.getLatLng()):this.mouseEventToContainerPoint(t),P.layerPoint=this.containerPointToLayerPoint(P.containerPoint),P.latlng=C?b.getLatLng():this.layerPointToLatLng(P.layerPoint)}for(g=0;g<h.length;g++)if(h[g].fire(e,P,!0),P.originalEvent._stopped||h[g].options.bubblingMouseEvents===!1&&Y(this._mouseEvents,e)!==-1)return}},_draggableMoved:function(t){return t=t.dragging&&t.dragging.enabled()?t:this,t.dragging&&t.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var t=0,e=this._handlers.length;t<e;t++)this._handlers[t].disable()},whenReady:function(t,e){return this._loaded?t.call(e||this,{target:this}):this.on("load",t,e),this},_getMapPanePos:function(){return je(this._mapPane)||new S(0,0)},_moved:function(){var t=this._getMapPanePos();return t&&!t.equals([0,0])},_getTopLeftPoint:function(t,e){var n=t&&e!==void 0?this._getNewPixelOrigin(t,e):this.getPixelOrigin();return n.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(t,e){var n=this.getSize()._divideBy(2);return this.project(t,e)._subtract(n)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(t,e,n){var o=this._getNewPixelOrigin(n,e);return this.project(t,e)._subtract(o)},_latLngBoundsToNewLayerBounds:function(t,e,n){var o=this._getNewPixelOrigin(n,e);return dt([this.project(t.getSouthWest(),e)._subtract(o),this.project(t.getNorthWest(),e)._subtract(o),this.project(t.getSouthEast(),e)._subtract(o),this.project(t.getNorthEast(),e)._subtract(o)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(t){return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())},_limitCenter:function(t,e,n){if(!n)return t;var o=this.project(t,e),h=this.getSize().divideBy(2),u=new U(o.subtract(h),o.add(h)),g=this._getBoundsOffset(u,n,e);return Math.abs(g.x)<=1&&Math.abs(g.y)<=1?t:this.unproject(o.add(g),e)},_limitOffset:function(t,e){if(!e)return t;var n=this.getPixelBounds(),o=new U(n.min.add(t),n.max.add(t));return t.add(this._getBoundsOffset(o,e))},_getBoundsOffset:function(t,e,n){var o=dt(this.project(e.getNorthEast(),n),this.project(e.getSouthWest(),n)),h=o.min.subtract(t.min),u=o.max.subtract(t.max),g=this._rebound(h.x,-u.x),b=this._rebound(h.y,-u.y);return new S(g,b)},_rebound:function(t,e){return t+e>0?Math.round(t-e)/2:Math.max(0,Math.ceil(t))-Math.max(0,Math.floor(e))},_limitZoom:function(t){var e=this.getMinZoom(),n=this.getMaxZoom(),o=N.any3d?this.options.zoomSnap:1;return o&&(t=Math.round(t/o)*o),Math.max(e,Math.min(n,t))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){St(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(t,e){var n=this._getCenterOffset(t)._trunc();return(e&&e.animate)!==!0&&!this.getSize().contains(n)?!1:(this.panBy(n,e),!0)},_createAnimProxy:function(){var t=this._proxy=ut("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(t),this.on("zoomanim",function(e){var n=We,o=this._proxy.style[n];Ve(this._proxy,this.project(e.center,e.zoom),this.getZoomScale(e.zoom,1)),o===this._proxy.style[n]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){Mt(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var t=this.getCenter(),e=this.getZoom();Ve(this._proxy,this.project(t,e),this.getZoomScale(e,1))},_catchTransitionEnd:function(t){this._animatingZoom&&t.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(t,e,n){if(this._animatingZoom)return!0;if(n=n||{},!this._zoomAnimated||n.animate===!1||this._nothingToAnimate()||Math.abs(e-this._zoom)>this.options.zoomAnimationThreshold)return!1;var o=this.getZoomScale(e),h=this._getCenterOffset(t)._divideBy(1-1/o);return n.animate!==!0&&!this.getSize().contains(h)?!1:(V(function(){this._moveStart(!0,n.noMoveStart||!1)._animateZoom(t,e,!0)},this),!0)},_animateZoom:function(t,e,n,o){this._mapPane&&(n&&(this._animatingZoom=!0,this._animateToCenter=t,this._animateToZoom=e,X(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:t,zoom:e,noUpdate:o}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(l(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&St(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function Ao(t,e){return new yt(t,e)}var Ie=G.extend({options:{position:"topright"},initialize:function(t){w(this,t)},getPosition:function(){return this.options.position},setPosition:function(t){var e=this._map;return e&&e.removeControl(this),this.options.position=t,e&&e.addControl(this),this},getContainer:function(){return this._container},addTo:function(t){this.remove(),this._map=t;var e=this._container=this.onAdd(t),n=this.getPosition(),o=t._controlCorners[n];return X(e,"leaflet-control"),n.indexOf("bottom")!==-1?o.insertBefore(e,o.firstChild):o.appendChild(e),this._map.on("unload",this.remove,this),this},remove:function(){return this._map?(Mt(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this},_refocusOnMap:function(t){this._map&&t&&t.screenX>0&&t.screenY>0&&this._map.getContainer().focus()}}),Ki=function(t){return new Ie(t)};yt.include({addControl:function(t){return t.addTo(this),this},removeControl:function(t){return t.remove(),this},_initControlPos:function(){var t=this._controlCorners={},e="leaflet-",n=this._controlContainer=ut("div",e+"control-container",this._container);function o(h,u){var g=e+h+" "+e+u;t[h+u]=ut("div",g,n)}o("top","left"),o("top","right"),o("bottom","left"),o("bottom","right")},_clearControlPos:function(){for(var t in this._controlCorners)Mt(this._controlCorners[t]);Mt(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var Wr=Ie.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(t,e,n,o){return n<o?-1:o<n?1:0}},initialize:function(t,e,n){w(this,n),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1;for(var o in t)this._addLayer(t[o],o);for(o in e)this._addLayer(e[o],o,!0)},onAdd:function(t){this._initLayout(),this._update(),this._map=t,t.on("zoomend",this._checkDisabledLayers,this);for(var e=0;e<this._layers.length;e++)this._layers[e].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(t){return Ie.prototype.addTo.call(this,t),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var t=0;t<this._layers.length;t++)this._layers[t].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(t,e){return this._addLayer(t,e),this._map?this._update():this},addOverlay:function(t,e){return this._addLayer(t,e,!0),this._map?this._update():this},removeLayer:function(t){t.off("add remove",this._onLayerChange,this);var e=this._getLayer(d(t));return e&&this._layers.splice(this._layers.indexOf(e),1),this._map?this._update():this},expand:function(){X(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var t=this._map.getSize().y-(this._container.offsetTop+50);return t<this._section.clientHeight?(X(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=t+"px"):St(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return St(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var t="leaflet-control-layers",e=this._container=ut("div",t),n=this.options.collapsed;e.setAttribute("aria-haspopup",!0),ji(e),nr(e);var o=this._section=ut("section",t+"-list");n&&(this._map.on("click",this.collapse,this),Q(e,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var h=this._layersLink=ut("a",t+"-toggle",e);h.href="#",h.title="Layers",h.setAttribute("role","button"),Q(h,{keydown:function(u){u.keyCode===13&&this._expandSafely()},click:function(u){de(u),this._expandSafely()}},this),n||this.expand(),this._baseLayersList=ut("div",t+"-base",o),this._separator=ut("div",t+"-separator",o),this._overlaysList=ut("div",t+"-overlays",o),e.appendChild(o)},_getLayer:function(t){for(var e=0;e<this._layers.length;e++)if(this._layers[e]&&d(this._layers[e].layer)===t)return this._layers[e]},_addLayer:function(t,e,n){this._map&&t.on("add remove",this._onLayerChange,this),this._layers.push({layer:t,name:e,overlay:n}),this.options.sortLayers&&this._layers.sort(l(function(o,h){return this.options.sortFunction(o.layer,h.layer,o.name,h.name)},this)),this.options.autoZIndex&&t.setZIndex&&(this._lastZIndex++,t.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;si(this._baseLayersList),si(this._overlaysList),this._layerControlInputs=[];var t,e,n,o,h=0;for(n=0;n<this._layers.length;n++)o=this._layers[n],this._addItem(o),e=e||o.overlay,t=t||!o.overlay,h+=o.overlay?0:1;return this.options.hideSingleBase&&(t=t&&h>1,this._baseLayersList.style.display=t?"":"none"),this._separator.style.display=e&&t?"":"none",this},_onLayerChange:function(t){this._handlingClick||this._update();var e=this._getLayer(d(t.target)),n=e.overlay?t.type==="add"?"overlayadd":"overlayremove":t.type==="add"?"baselayerchange":null;n&&this._map.fire(n,e)},_createRadioElement:function(t,e){var n='<input type="radio" class="leaflet-control-layers-selector" name="'+t+'"'+(e?' checked="checked"':"")+"/>",o=document.createElement("div");return o.innerHTML=n,o.firstChild},_addItem:function(t){var e=document.createElement("label"),n=this._map.hasLayer(t.layer),o;t.overlay?(o=document.createElement("input"),o.type="checkbox",o.className="leaflet-control-layers-selector",o.defaultChecked=n):o=this._createRadioElement("leaflet-base-layers_"+d(this),n),this._layerControlInputs.push(o),o.layerId=d(t.layer),Q(o,"click",this._onInputClick,this);var h=document.createElement("span");h.innerHTML=" "+t.name;var u=document.createElement("span");e.appendChild(u),u.appendChild(o),u.appendChild(h);var g=t.overlay?this._overlaysList:this._baseLayersList;return g.appendChild(e),this._checkDisabledLayers(),e},_onInputClick:function(){if(!this._preventClick){var t=this._layerControlInputs,e,n,o=[],h=[];this._handlingClick=!0;for(var u=t.length-1;u>=0;u--)e=t[u],n=this._getLayer(e.layerId).layer,e.checked?o.push(n):e.checked||h.push(n);for(u=0;u<h.length;u++)this._map.hasLayer(h[u])&&this._map.removeLayer(h[u]);for(u=0;u<o.length;u++)this._map.hasLayer(o[u])||this._map.addLayer(o[u]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var t=this._layerControlInputs,e,n,o=this._map.getZoom(),h=t.length-1;h>=0;h--)e=t[h],n=this._getLayer(e.layerId).layer,e.disabled=n.options.minZoom!==void 0&&o<n.options.minZoom||n.options.maxZoom!==void 0&&o>n.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var t=this._section;this._preventClick=!0,Q(t,"click",de),this.expand();var e=this;setTimeout(function(){$t(t,"click",de),e._preventClick=!1})}}),Io=function(t,e,n){return new Wr(t,e,n)},sr=Ie.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(t){var e="leaflet-control-zoom",n=ut("div",e+" leaflet-bar"),o=this.options;return this._zoomInButton=this._createButton(o.zoomInText,o.zoomInTitle,e+"-in",n,this._zoomIn),this._zoomOutButton=this._createButton(o.zoomOutText,o.zoomOutTitle,e+"-out",n,this._zoomOut),this._updateDisabled(),t.on("zoomend zoomlevelschange",this._updateDisabled,this),n},onRemove:function(t){t.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(t){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(t.shiftKey?3:1))},_zoomOut:function(t){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(t.shiftKey?3:1))},_createButton:function(t,e,n,o,h){var u=ut("a",n,o);return u.innerHTML=t,u.href="#",u.title=e,u.setAttribute("role","button"),u.setAttribute("aria-label",e),ji(u),Q(u,"click",vi),Q(u,"click",h,this),Q(u,"click",this._refocusOnMap,this),u},_updateDisabled:function(){var t=this._map,e="leaflet-disabled";St(this._zoomInButton,e),St(this._zoomOutButton,e),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||t._zoom===t.getMinZoom())&&(X(this._zoomOutButton,e),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||t._zoom===t.getMaxZoom())&&(X(this._zoomInButton,e),this._zoomInButton.setAttribute("aria-disabled","true"))}});yt.mergeOptions({zoomControl:!0}),yt.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new sr,this.addControl(this.zoomControl))});var No=function(t){return new sr(t)},qr=Ie.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(t){var e="leaflet-control-scale",n=ut("div",e),o=this.options;return this._addScales(o,e+"-line",n),t.on(o.updateWhenIdle?"moveend":"move",this._update,this),t.whenReady(this._update,this),n},onRemove:function(t){t.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(t,e,n){t.metric&&(this._mScale=ut("div",e,n)),t.imperial&&(this._iScale=ut("div",e,n))},_update:function(){var t=this._map,e=t.getSize().y/2,n=t.distance(t.containerPointToLatLng([0,e]),t.containerPointToLatLng([this.options.maxWidth,e]));this._updateScales(n)},_updateScales:function(t){this.options.metric&&t&&this._updateMetric(t),this.options.imperial&&t&&this._updateImperial(t)},_updateMetric:function(t){var e=this._getRoundNum(t),n=e<1e3?e+" m":e/1e3+" km";this._updateScale(this._mScale,n,e/t)},_updateImperial:function(t){var e=t*3.2808399,n,o,h;e>5280?(n=e/5280,o=this._getRoundNum(n),this._updateScale(this._iScale,o+" mi",o/n)):(h=this._getRoundNum(e),this._updateScale(this._iScale,h+" ft",h/e))},_updateScale:function(t,e,n){t.style.width=Math.round(this.options.maxWidth*n)+"px",t.innerHTML=e},_getRoundNum:function(t){var e=Math.pow(10,(Math.floor(t)+"").length-1),n=t/e;return n=n>=10?10:n>=5?5:n>=3?3:n>=2?2:1,e*n}}),Zo=function(t){return new qr(t)},Bo='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',or=Ie.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(N.inlineSvg?Bo+" ":"")+"Leaflet</a>"},initialize:function(t){w(this,t),this._attributions={}},onAdd:function(t){t.attributionControl=this,this._container=ut("div","leaflet-control-attribution"),ji(this._container);for(var e in t._layers)t._layers[e].getAttribution&&this.addAttribution(t._layers[e].getAttribution());return this._update(),t.on("layeradd",this._addAttribution,this),this._container},onRemove:function(t){t.off("layeradd",this._addAttribution,this)},_addAttribution:function(t){t.layer.getAttribution&&(this.addAttribution(t.layer.getAttribution()),t.layer.once("remove",function(){this.removeAttribution(t.layer.getAttribution())},this))},setPrefix:function(t){return this.options.prefix=t,this._update(),this},addAttribution:function(t){return t?(this._attributions[t]||(this._attributions[t]=0),this._attributions[t]++,this._update(),this):this},removeAttribution:function(t){return t?(this._attributions[t]&&(this._attributions[t]--,this._update()),this):this},_update:function(){if(this._map){var t=[];for(var e in this._attributions)this._attributions[e]&&t.push(e);var n=[];this.options.prefix&&n.push(this.options.prefix),t.length&&n.push(t.join(", ")),this._container.innerHTML=n.join(' <span aria-hidden="true">|</span> ')}}});yt.mergeOptions({attributionControl:!0}),yt.addInitHook(function(){this.options.attributionControl&&new or().addTo(this)});var Do=function(t){return new or(t)};Ie.Layers=Wr,Ie.Zoom=sr,Ie.Scale=qr,Ie.Attribution=or,Ki.layers=Io,Ki.zoom=No,Ki.scale=Zo,Ki.attribution=Do;var He=G.extend({initialize:function(t){this._map=t},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});He.addTo=function(t,e){return t.addHandler(e,this),this};var Fo={Events:rt},Vr=N.touch?"touchstart mousedown":"mousedown",ai=Lt.extend({options:{clickTolerance:3},initialize:function(t,e,n,o){w(this,o),this._element=t,this._dragStartTarget=e||t,this._preventOutline=n},enable:function(){this._enabled||(Q(this._dragStartTarget,Vr,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(ai._dragging===this&&this.finishDrag(!0),$t(this._dragStartTarget,Vr,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(t){if(this._enabled&&(this._moved=!1,!pi(this._element,"leaflet-zoom-anim"))){if(t.touches&&t.touches.length!==1){ai._dragging===this&&this.finishDrag();return}if(!(ai._dragging||t.shiftKey||t.which!==1&&t.button!==1&&!t.touches)&&(ai._dragging=this,this._preventOutline&&Xn(this._element),Vi(),fi(),!this._moving)){this.fire("down");var e=t.touches?t.touches[0]:t,n=Dr(this._element);this._startPoint=new S(e.clientX,e.clientY),this._startPos=je(this._element),this._parentScale=Qn(n);var o=t.type==="mousedown";Q(document,o?"mousemove":"touchmove",this._onMove,this),Q(document,o?"mouseup":"touchend touchcancel",this._onUp,this)}}},_onMove:function(t){if(this._enabled){if(t.touches&&t.touches.length>1){this._moved=!0;return}var e=t.touches&&t.touches.length===1?t.touches[0]:t,n=new S(e.clientX,e.clientY)._subtract(this._startPoint);!n.x&&!n.y||Math.abs(n.x)+Math.abs(n.y)<this.options.clickTolerance||(n.x/=this._parentScale.x,n.y/=this._parentScale.y,de(t),this._moved||(this.fire("dragstart"),this._moved=!0,X(document.body,"leaflet-dragging"),this._lastTarget=t.target||t.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),X(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(n),this._moving=!0,this._lastEvent=t,this._updatePosition())}},_updatePosition:function(){var t={originalEvent:this._lastEvent};this.fire("predrag",t),Vt(this._element,this._newPos),this.fire("drag",t)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(t){St(document.body,"leaflet-dragging"),this._lastTarget&&(St(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),$t(document,"mousemove touchmove",this._onMove,this),$t(document,"mouseup touchend touchcancel",this._onUp,this),Yn(),_i();var e=this._moved&&this._moving;this._moving=!1,ai._dragging=!1,e&&this.fire("dragend",{noInertia:t,distance:this._newPos.distanceTo(this._startPos)})}});function jr(t,e,n){var o,h=[1,4,2,8],u,g,b,P,C,A,q,lt;for(u=0,A=t.length;u<A;u++)t[u]._code=yi(t[u],e);for(b=0;b<4;b++){for(q=h[b],o=[],u=0,A=t.length,g=A-1;u<A;g=u++)P=t[u],C=t[g],P._code&q?C._code&q||(lt=wn(C,P,q,e,n),lt._code=yi(lt,e),o.push(lt)):(C._code&q&&(lt=wn(C,P,q,e,n),lt._code=yi(lt,e),o.push(lt)),o.push(P));t=o}return t}function Kr(t,e){var n,o,h,u,g,b,P,C,A;if(!t||t.length===0)throw new Error("latlngs not passed");$e(t)||(console.warn("latlngs are not flat! Only the first ring will be used"),t=t[0]);var q=H([0,0]),lt=I(t),ve=lt.getNorthWest().distanceTo(lt.getSouthWest())*lt.getNorthEast().distanceTo(lt.getNorthWest());ve<1700&&(q=ar(t));var ae=t.length,Oe=[];for(n=0;n<ae;n++){var we=H(t[n]);Oe.push(e.project(H([we.lat-q.lat,we.lng-q.lng])))}for(b=P=C=0,n=0,o=ae-1;n<ae;o=n++)h=Oe[n],u=Oe[o],g=h.y*u.x-u.y*h.x,P+=(h.x+u.x)*g,C+=(h.y+u.y)*g,b+=g*3;b===0?A=Oe[0]:A=[P/b,C/b];var Ai=e.unproject($(A));return H([Ai.lat+q.lat,Ai.lng+q.lng])}function ar(t){for(var e=0,n=0,o=0,h=0;h<t.length;h++){var u=H(t[h]);e+=u.lat,n+=u.lng,o++}return H([e/o,n/o])}var Ro={__proto__:null,clipPolygon:jr,polygonCenter:Kr,centroid:ar};function Yr(t,e){if(!e||!t.length)return t.slice();var n=e*e;return t=Go(t,n),t=Uo(t,n),t}function Jr(t,e,n){return Math.sqrt(Yi(t,e,n,!0))}function Ho(t,e,n){return Yi(t,e,n)}function Uo(t,e){var n=t.length,o=typeof Uint8Array<"u"?Uint8Array:Array,h=new o(n);h[0]=h[n-1]=1,lr(t,h,e,0,n-1);var u,g=[];for(u=0;u<n;u++)h[u]&&g.push(t[u]);return g}function lr(t,e,n,o,h){var u=0,g,b,P;for(b=o+1;b<=h-1;b++)P=Yi(t[b],t[o],t[h],!0),P>u&&(g=b,u=P);u>n&&(e[g]=1,lr(t,e,n,o,g),lr(t,e,n,g,h))}function Go(t,e){for(var n=[t[0]],o=1,h=0,u=t.length;o<u;o++)Wo(t[o],t[h])>e&&(n.push(t[o]),h=o);return h<u-1&&n.push(t[u-1]),n}var Xr;function Qr(t,e,n,o,h){var u=o?Xr:yi(t,n),g=yi(e,n),b,P,C;for(Xr=g;;){if(!(u|g))return[t,e];if(u&g)return!1;b=u||g,P=wn(t,e,b,n,h),C=yi(P,n),b===u?(t=P,u=C):(e=P,g=C)}}function wn(t,e,n,o,h){var u=e.x-t.x,g=e.y-t.y,b=o.min,P=o.max,C,A;return n&8?(C=t.x+u*(P.y-t.y)/g,A=P.y):n&4?(C=t.x+u*(b.y-t.y)/g,A=b.y):n&2?(C=P.x,A=t.y+g*(P.x-t.x)/u):n&1&&(C=b.x,A=t.y+g*(b.x-t.x)/u),new S(C,A,h)}function yi(t,e){var n=0;return t.x<e.min.x?n|=1:t.x>e.max.x&&(n|=2),t.y<e.min.y?n|=4:t.y>e.max.y&&(n|=8),n}function Wo(t,e){var n=e.x-t.x,o=e.y-t.y;return n*n+o*o}function Yi(t,e,n,o){var h=e.x,u=e.y,g=n.x-h,b=n.y-u,P=g*g+b*b,C;return P>0&&(C=((t.x-h)*g+(t.y-u)*b)/P,C>1?(h=n.x,u=n.y):C>0&&(h+=g*C,u+=b*C)),g=t.x-h,b=t.y-u,o?g*g+b*b:new S(h,u)}function $e(t){return!O(t[0])||typeof t[0][0]!="object"&&typeof t[0][0]<"u"}function ts(t){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),$e(t)}function es(t,e){var n,o,h,u,g,b,P,C;if(!t||t.length===0)throw new Error("latlngs not passed");$e(t)||(console.warn("latlngs are not flat! Only the first ring will be used"),t=t[0]);var A=H([0,0]),q=I(t),lt=q.getNorthWest().distanceTo(q.getSouthWest())*q.getNorthEast().distanceTo(q.getNorthWest());lt<1700&&(A=ar(t));var ve=t.length,ae=[];for(n=0;n<ve;n++){var Oe=H(t[n]);ae.push(e.project(H([Oe.lat-A.lat,Oe.lng-A.lng])))}for(n=0,o=0;n<ve-1;n++)o+=ae[n].distanceTo(ae[n+1])/2;if(o===0)C=ae[0];else for(n=0,u=0;n<ve-1;n++)if(g=ae[n],b=ae[n+1],h=g.distanceTo(b),u+=h,u>o){P=(u-o)/h,C=[b.x-P*(b.x-g.x),b.y-P*(b.y-g.y)];break}var we=e.unproject($(C));return H([we.lat+A.lat,we.lng+A.lng])}var qo={__proto__:null,simplify:Yr,pointToSegmentDistance:Jr,closestPointOnSegment:Ho,clipSegment:Qr,_getEdgeIntersection:wn,_getBitCode:yi,_sqClosestPointOnSegment:Yi,isFlat:$e,_flat:ts,polylineCenter:es},hr={project:function(t){return new S(t.lng,t.lat)},unproject:function(t){return new K(t.y,t.x)},bounds:new U([-180,-90],[180,90])},cr={R:6378137,R_MINOR:6356752314245179e-9,bounds:new U([-2003750834279e-5,-1549657073972e-5],[2003750834279e-5,1876465623138e-5]),project:function(t){var e=Math.PI/180,n=this.R,o=t.lat*e,h=this.R_MINOR/n,u=Math.sqrt(1-h*h),g=u*Math.sin(o),b=Math.tan(Math.PI/4-o/2)/Math.pow((1-g)/(1+g),u/2);return o=-n*Math.log(Math.max(b,1e-10)),new S(t.lng*e*n,o)},unproject:function(t){for(var e=180/Math.PI,n=this.R,o=this.R_MINOR/n,h=Math.sqrt(1-o*o),u=Math.exp(-t.y/n),g=Math.PI/2-2*Math.atan(u),b=0,P=.1,C;b<15&&Math.abs(P)>1e-7;b++)C=h*Math.sin(g),C=Math.pow((1-C)/(1+C),h/2),P=Math.PI/2-2*Math.atan(u*C)-g,g+=P;return new K(g*e,t.x*e/n)}},Vo={__proto__:null,LonLat:hr,Mercator:cr,SphericalMercator:mt},jo=s({},Z,{code:"EPSG:3395",projection:cr,transformation:function(){var t=.5/(Math.PI*cr.R);return et(t,.5,-t,.5)}()}),is=s({},Z,{code:"EPSG:4326",projection:hr,transformation:et(1/180,1,-1/180,.5)}),Ko=s({},R,{projection:hr,transformation:et(1,0,-1,0),scale:function(t){return Math.pow(2,t)},zoom:function(t){return Math.log(t)/Math.LN2},distance:function(t,e){var n=e.lng-t.lng,o=e.lat-t.lat;return Math.sqrt(n*n+o*o)},infinite:!0});R.Earth=Z,R.EPSG3395=jo,R.EPSG3857=Kt,R.EPSG900913=At,R.EPSG4326=is,R.Simple=Ko;var Ne=Lt.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(t){return t.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(t){return t&&t.removeLayer(this),this},getPane:function(t){return this._map.getPane(t?this.options[t]||t:this.options.pane)},addInteractiveTarget:function(t){return this._map._targets[d(t)]=this,this},removeInteractiveTarget:function(t){return delete this._map._targets[d(t)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(t){var e=t.target;if(e.hasLayer(this)){if(this._map=e,this._zoomAnimated=e._zoomAnimated,this.getEvents){var n=this.getEvents();e.on(n,this),this.once("remove",function(){e.off(n,this)},this)}this.onAdd(e),this.fire("add"),e.fire("layeradd",{layer:this})}}});yt.include({addLayer:function(t){if(!t._layerAdd)throw new Error("The provided object is not a Layer.");var e=d(t);return this._layers[e]?this:(this._layers[e]=t,t._mapToAdd=this,t.beforeAdd&&t.beforeAdd(this),this.whenReady(t._layerAdd,t),this)},removeLayer:function(t){var e=d(t);return this._layers[e]?(this._loaded&&t.onRemove(this),delete this._layers[e],this._loaded&&(this.fire("layerremove",{layer:t}),t.fire("remove")),t._map=t._mapToAdd=null,this):this},hasLayer:function(t){return d(t)in this._layers},eachLayer:function(t,e){for(var n in this._layers)t.call(e,this._layers[n]);return this},_addLayers:function(t){t=t?O(t)?t:[t]:[];for(var e=0,n=t.length;e<n;e++)this.addLayer(t[e])},_addZoomLimit:function(t){(!isNaN(t.options.maxZoom)||!isNaN(t.options.minZoom))&&(this._zoomBoundLayers[d(t)]=t,this._updateZoomLevels())},_removeZoomLimit:function(t){var e=d(t);this._zoomBoundLayers[e]&&(delete this._zoomBoundLayers[e],this._updateZoomLevels())},_updateZoomLevels:function(){var t=1/0,e=-1/0,n=this._getZoomSpan();for(var o in this._zoomBoundLayers){var h=this._zoomBoundLayers[o].options;t=h.minZoom===void 0?t:Math.min(t,h.minZoom),e=h.maxZoom===void 0?e:Math.max(e,h.maxZoom)}this._layersMaxZoom=e===-1/0?void 0:e,this._layersMinZoom=t===1/0?void 0:t,n!==this._getZoomSpan()&&this.fire("zoomlevelschange"),this.options.maxZoom===void 0&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===void 0&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var Ti=Ne.extend({initialize:function(t,e){w(this,e),this._layers={};var n,o;if(t)for(n=0,o=t.length;n<o;n++)this.addLayer(t[n])},addLayer:function(t){var e=this.getLayerId(t);return this._layers[e]=t,this._map&&this._map.addLayer(t),this},removeLayer:function(t){var e=t in this._layers?t:this.getLayerId(t);return this._map&&this._layers[e]&&this._map.removeLayer(this._layers[e]),delete this._layers[e],this},hasLayer:function(t){var e=typeof t=="number"?t:this.getLayerId(t);return e in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(t){var e=Array.prototype.slice.call(arguments,1),n,o;for(n in this._layers)o=this._layers[n],o[t]&&o[t].apply(o,e);return this},onAdd:function(t){this.eachLayer(t.addLayer,t)},onRemove:function(t){this.eachLayer(t.removeLayer,t)},eachLayer:function(t,e){for(var n in this._layers)t.call(e,this._layers[n]);return this},getLayer:function(t){return this._layers[t]},getLayers:function(){var t=[];return this.eachLayer(t.push,t),t},setZIndex:function(t){return this.invoke("setZIndex",t)},getLayerId:function(t){return d(t)}}),Yo=function(t,e){return new Ti(t,e)},Ke=Ti.extend({addLayer:function(t){return this.hasLayer(t)?this:(t.addEventParent(this),Ti.prototype.addLayer.call(this,t),this.fire("layeradd",{layer:t}))},removeLayer:function(t){return this.hasLayer(t)?(t in this._layers&&(t=this._layers[t]),t.removeEventParent(this),Ti.prototype.removeLayer.call(this,t),this.fire("layerremove",{layer:t})):this},setStyle:function(t){return this.invoke("setStyle",t)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var t=new at;for(var e in this._layers){var n=this._layers[e];t.extend(n.getBounds?n.getBounds():n.getLatLng())}return t}}),Jo=function(t,e){return new Ke(t,e)},zi=G.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(t){w(this,t)},createIcon:function(t){return this._createIcon("icon",t)},createShadow:function(t){return this._createIcon("shadow",t)},_createIcon:function(t,e){var n=this._getIconUrl(t);if(!n){if(t==="icon")throw new Error("iconUrl not set in Icon options (see the docs).");return null}var o=this._createImg(n,e&&e.tagName==="IMG"?e:null);return this._setIconStyles(o,t),(this.options.crossOrigin||this.options.crossOrigin==="")&&(o.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),o},_setIconStyles:function(t,e){var n=this.options,o=n[e+"Size"];typeof o=="number"&&(o=[o,o]);var h=$(o),u=$(e==="shadow"&&n.shadowAnchor||n.iconAnchor||h&&h.divideBy(2,!0));t.className="leaflet-marker-"+e+" "+(n.className||""),u&&(t.style.marginLeft=-u.x+"px",t.style.marginTop=-u.y+"px"),h&&(t.style.width=h.x+"px",t.style.height=h.y+"px")},_createImg:function(t,e){return e=e||document.createElement("img"),e.src=t,e},_getIconUrl:function(t){return N.retina&&this.options[t+"RetinaUrl"]||this.options[t+"Url"]}});function Xo(t){return new zi(t)}var Ji=zi.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(t){return typeof Ji.imagePath!="string"&&(Ji.imagePath=this._detectIconPath()),(this.options.imagePath||Ji.imagePath)+zi.prototype._getIconUrl.call(this,t)},_stripUrl:function(t){var e=function(n,o,h){var u=o.exec(n);return u&&u[h]};return t=e(t,/^url\((['"])?(.+)\1\)$/,2),t&&e(t,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var t=ut("div","leaflet-default-icon-path",document.body),e=Pe(t,"background-image")||Pe(t,"backgroundImage");if(document.body.removeChild(t),e=this._stripUrl(e),e)return e;var n=document.querySelector('link[href$="leaflet.css"]');return n?n.href.substring(0,n.href.length-11-1):""}}),ns=He.extend({initialize:function(t){this._marker=t},addHooks:function(){var t=this._marker._icon;this._draggable||(this._draggable=new ai(t,t,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),X(t,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&St(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(t){var e=this._marker,n=e._map,o=this._marker.options.autoPanSpeed,h=this._marker.options.autoPanPadding,u=je(e._icon),g=n.getPixelBounds(),b=n.getPixelOrigin(),P=dt(g.min._subtract(b).add(h),g.max._subtract(b).subtract(h));if(!P.contains(u)){var C=$((Math.max(P.max.x,u.x)-P.max.x)/(g.max.x-P.max.x)-(Math.min(P.min.x,u.x)-P.min.x)/(g.min.x-P.min.x),(Math.max(P.max.y,u.y)-P.max.y)/(g.max.y-P.max.y)-(Math.min(P.min.y,u.y)-P.min.y)/(g.min.y-P.min.y)).multiplyBy(o);n.panBy(C,{animate:!1}),this._draggable._newPos._add(C),this._draggable._startPos._add(C),Vt(e._icon,this._draggable._newPos),this._onDrag(t),this._panRequest=V(this._adjustPan.bind(this,t))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(t){this._marker.options.autoPan&&(tt(this._panRequest),this._panRequest=V(this._adjustPan.bind(this,t)))},_onDrag:function(t){var e=this._marker,n=e._shadow,o=je(e._icon),h=e._map.layerPointToLatLng(o);n&&Vt(n,o),e._latlng=h,t.latlng=h,t.oldLatLng=this._oldLatLng,e.fire("move",t).fire("drag",t)},_onDragEnd:function(t){tt(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",t)}}),Ln=Ne.extend({options:{icon:new Ji,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(t,e){w(this,e),this._latlng=H(t)},onAdd:function(t){this._zoomAnimated=this._zoomAnimated&&t.options.markerZoomAnimation,this._zoomAnimated&&t.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(t){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&t.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(t){var e=this._latlng;return this._latlng=H(t),this.update(),this.fire("move",{oldLatLng:e,latlng:this._latlng})},setZIndexOffset:function(t){return this.options.zIndexOffset=t,this.update()},getIcon:function(){return this.options.icon},setIcon:function(t){return this.options.icon=t,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var t=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(t)}return this},_initIcon:function(){var t=this.options,e="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),n=t.icon.createIcon(this._icon),o=!1;n!==this._icon&&(this._icon&&this._removeIcon(),o=!0,t.title&&(n.title=t.title),n.tagName==="IMG"&&(n.alt=t.alt||"")),X(n,e),t.keyboard&&(n.tabIndex="0",n.setAttribute("role","button")),this._icon=n,t.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&Q(n,"focus",this._panOnFocus,this);var h=t.icon.createShadow(this._shadow),u=!1;h!==this._shadow&&(this._removeShadow(),u=!0),h&&(X(h,e),h.alt=""),this._shadow=h,t.opacity<1&&this._updateOpacity(),o&&this.getPane().appendChild(this._icon),this._initInteraction(),h&&u&&this.getPane(t.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&$t(this._icon,"focus",this._panOnFocus,this),Mt(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&Mt(this._shadow),this._shadow=null},_setPos:function(t){this._icon&&Vt(this._icon,t),this._shadow&&Vt(this._shadow,t),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(t){this._icon&&(this._icon.style.zIndex=this._zIndex+t)},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center).round();this._setPos(e)},_initInteraction:function(){if(this.options.interactive&&(X(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),ns)){var t=this.options.draggable;this.dragging&&(t=this.dragging.enabled(),this.dragging.disable()),this.dragging=new ns(this),t&&this.dragging.enable()}},setOpacity:function(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var t=this.options.opacity;this._icon&&pe(this._icon,t),this._shadow&&pe(this._shadow,t)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var t=this._map;if(t){var e=this.options.icon.options,n=e.iconSize?$(e.iconSize):$(0,0),o=e.iconAnchor?$(e.iconAnchor):$(0,0);t.panInside(this._latlng,{paddingTopLeft:o,paddingBottomRight:n.subtract(o)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function Qo(t,e){return new Ln(t,e)}var li=Ne.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(t){this._renderer=t.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(t){return w(this,t),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&t&&Object.prototype.hasOwnProperty.call(t,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),kn=li.extend({options:{fill:!0,radius:10},initialize:function(t,e){w(this,e),this._latlng=H(t),this._radius=this.options.radius},setLatLng:function(t){var e=this._latlng;return this._latlng=H(t),this.redraw(),this.fire("move",{oldLatLng:e,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(t){return this.options.radius=this._radius=t,this.redraw()},getRadius:function(){return this._radius},setStyle:function(t){var e=t&&t.radius||this._radius;return li.prototype.setStyle.call(this,t),this.setRadius(e),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var t=this._radius,e=this._radiusY||t,n=this._clickTolerance(),o=[t+n,e+n];this._pxBounds=new U(this._point.subtract(o),this._point.add(o))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(t){return t.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function ta(t,e){return new kn(t,e)}var dr=kn.extend({initialize:function(t,e,n){if(typeof e=="number"&&(e=s({},n,{radius:e})),w(this,e),this._latlng=H(t),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(t){return this._mRadius=t,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var t=[this._radius,this._radiusY||this._radius];return new at(this._map.layerPointToLatLng(this._point.subtract(t)),this._map.layerPointToLatLng(this._point.add(t)))},setStyle:li.prototype.setStyle,_project:function(){var t=this._latlng.lng,e=this._latlng.lat,n=this._map,o=n.options.crs;if(o.distance===Z.distance){var h=Math.PI/180,u=this._mRadius/Z.R/h,g=n.project([e+u,t]),b=n.project([e-u,t]),P=g.add(b).divideBy(2),C=n.unproject(P).lat,A=Math.acos((Math.cos(u*h)-Math.sin(e*h)*Math.sin(C*h))/(Math.cos(e*h)*Math.cos(C*h)))/h;(isNaN(A)||A===0)&&(A=u/Math.cos(Math.PI/180*e)),this._point=P.subtract(n.getPixelOrigin()),this._radius=isNaN(A)?0:P.x-n.project([C,t-A]).x,this._radiusY=P.y-g.y}else{var q=o.unproject(o.project(this._latlng).subtract([this._mRadius,0]));this._point=n.latLngToLayerPoint(this._latlng),this._radius=this._point.x-n.latLngToLayerPoint(q).x}this._updateBounds()}});function ea(t,e,n){return new dr(t,e,n)}var Ye=li.extend({options:{smoothFactor:1,noClip:!1},initialize:function(t,e){w(this,e),this._setLatLngs(t)},getLatLngs:function(){return this._latlngs},setLatLngs:function(t){return this._setLatLngs(t),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(t){for(var e=1/0,n=null,o=Yi,h,u,g=0,b=this._parts.length;g<b;g++)for(var P=this._parts[g],C=1,A=P.length;C<A;C++){h=P[C-1],u=P[C];var q=o(t,h,u,!0);q<e&&(e=q,n=o(t,h,u))}return n&&(n.distance=Math.sqrt(e)),n},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return es(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(t,e){return e=e||this._defaultShape(),t=H(t),e.push(t),this._bounds.extend(t),this.redraw()},_setLatLngs:function(t){this._bounds=new at,this._latlngs=this._convertLatLngs(t)},_defaultShape:function(){return $e(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(t){for(var e=[],n=$e(t),o=0,h=t.length;o<h;o++)n?(e[o]=H(t[o]),this._bounds.extend(e[o])):e[o]=this._convertLatLngs(t[o]);return e},_project:function(){var t=new U;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,t),this._bounds.isValid()&&t.isValid()&&(this._rawPxBounds=t,this._updateBounds())},_updateBounds:function(){var t=this._clickTolerance(),e=new S(t,t);this._rawPxBounds&&(this._pxBounds=new U([this._rawPxBounds.min.subtract(e),this._rawPxBounds.max.add(e)]))},_projectLatlngs:function(t,e,n){var o=t[0]instanceof K,h=t.length,u,g;if(o){for(g=[],u=0;u<h;u++)g[u]=this._map.latLngToLayerPoint(t[u]),n.extend(g[u]);e.push(g)}else for(u=0;u<h;u++)this._projectLatlngs(t[u],e,n)},_clipPoints:function(){var t=this._renderer._bounds;if(this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(t))){if(this.options.noClip){this._parts=this._rings;return}var e=this._parts,n,o,h,u,g,b,P;for(n=0,h=0,u=this._rings.length;n<u;n++)for(P=this._rings[n],o=0,g=P.length;o<g-1;o++)b=Qr(P[o],P[o+1],t,o,!0),b&&(e[h]=e[h]||[],e[h].push(b[0]),(b[1]!==P[o+1]||o===g-2)&&(e[h].push(b[1]),h++))}},_simplifyPoints:function(){for(var t=this._parts,e=this.options.smoothFactor,n=0,o=t.length;n<o;n++)t[n]=Yr(t[n],e)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(t,e){var n,o,h,u,g,b,P=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(t))return!1;for(n=0,u=this._parts.length;n<u;n++)for(b=this._parts[n],o=0,g=b.length,h=g-1;o<g;h=o++)if(!(!e&&o===0)&&Jr(t,b[h],b[o])<=P)return!0;return!1}});function ia(t,e){return new Ye(t,e)}Ye._flat=ts;var Ei=Ye.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Kr(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(t){var e=Ye.prototype._convertLatLngs.call(this,t),n=e.length;return n>=2&&e[0]instanceof K&&e[0].equals(e[n-1])&&e.pop(),e},_setLatLngs:function(t){Ye.prototype._setLatLngs.call(this,t),$e(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return $e(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var t=this._renderer._bounds,e=this.options.weight,n=new S(e,e);if(t=new U(t.min.subtract(n),t.max.add(n)),this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(t))){if(this.options.noClip){this._parts=this._rings;return}for(var o=0,h=this._rings.length,u;o<h;o++)u=jr(this._rings[o],t,!0),u.length&&this._parts.push(u)}},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(t){var e=!1,n,o,h,u,g,b,P,C;if(!this._pxBounds||!this._pxBounds.contains(t))return!1;for(u=0,P=this._parts.length;u<P;u++)for(n=this._parts[u],g=0,C=n.length,b=C-1;g<C;b=g++)o=n[g],h=n[b],o.y>t.y!=h.y>t.y&&t.x<(h.x-o.x)*(t.y-o.y)/(h.y-o.y)+o.x&&(e=!e);return e||Ye.prototype._containsPoint.call(this,t,!0)}});function na(t,e){return new Ei(t,e)}var Je=Ke.extend({initialize:function(t,e){w(this,e),this._layers={},t&&this.addData(t)},addData:function(t){var e=O(t)?t:t.features,n,o,h;if(e){for(n=0,o=e.length;n<o;n++)h=e[n],(h.geometries||h.geometry||h.features||h.coordinates)&&this.addData(h);return this}var u=this.options;if(u.filter&&!u.filter(t))return this;var g=Pn(t,u);return g?(g.feature=Sn(t),g.defaultOptions=g.options,this.resetStyle(g),u.onEachFeature&&u.onEachFeature(t,g),this.addLayer(g)):this},resetStyle:function(t){return t===void 0?this.eachLayer(this.resetStyle,this):(t.options=s({},t.defaultOptions),this._setLayerStyle(t,this.options.style),this)},setStyle:function(t){return this.eachLayer(function(e){this._setLayerStyle(e,t)},this)},_setLayerStyle:function(t,e){t.setStyle&&(typeof e=="function"&&(e=e(t.feature)),t.setStyle(e))}});function Pn(t,e){var n=t.type==="Feature"?t.geometry:t,o=n?n.coordinates:null,h=[],u=e&&e.pointToLayer,g=e&&e.coordsToLatLng||ur,b,P,C,A;if(!o&&!n)return null;switch(n.type){case"Point":return b=g(o),rs(u,t,b,e);case"MultiPoint":for(C=0,A=o.length;C<A;C++)b=g(o[C]),h.push(rs(u,t,b,e));return new Ke(h);case"LineString":case"MultiLineString":return P=Cn(o,n.type==="LineString"?0:1,g),new Ye(P,e);case"Polygon":case"MultiPolygon":return P=Cn(o,n.type==="Polygon"?1:2,g),new Ei(P,e);case"GeometryCollection":for(C=0,A=n.geometries.length;C<A;C++){var q=Pn({geometry:n.geometries[C],type:"Feature",properties:t.properties},e);q&&h.push(q)}return new Ke(h);case"FeatureCollection":for(C=0,A=n.features.length;C<A;C++){var lt=Pn(n.features[C],e);lt&&h.push(lt)}return new Ke(h);default:throw new Error("Invalid GeoJSON object.")}}function rs(t,e,n,o){return t?t(e,n):new Ln(n,o&&o.markersInheritOptions&&o)}function ur(t){return new K(t[1],t[0],t[2])}function Cn(t,e,n){for(var o=[],h=0,u=t.length,g;h<u;h++)g=e?Cn(t[h],e-1,n):(n||ur)(t[h]),o.push(g);return o}function pr(t,e){return t=H(t),t.alt!==void 0?[y(t.lng,e),y(t.lat,e),y(t.alt,e)]:[y(t.lng,e),y(t.lat,e)]}function Mn(t,e,n,o){for(var h=[],u=0,g=t.length;u<g;u++)h.push(e?Mn(t[u],$e(t[u])?0:e-1,n,o):pr(t[u],o));return!e&&n&&h.length>0&&h.push(h[0].slice()),h}function $i(t,e){return t.feature?s({},t.feature,{geometry:e}):Sn(e)}function Sn(t){return t.type==="Feature"||t.type==="FeatureCollection"?t:{type:"Feature",properties:{},geometry:t}}var fr={toGeoJSON:function(t){return $i(this,{type:"Point",coordinates:pr(this.getLatLng(),t)})}};Ln.include(fr),dr.include(fr),kn.include(fr),Ye.include({toGeoJSON:function(t){var e=!$e(this._latlngs),n=Mn(this._latlngs,e?1:0,!1,t);return $i(this,{type:(e?"Multi":"")+"LineString",coordinates:n})}}),Ei.include({toGeoJSON:function(t){var e=!$e(this._latlngs),n=e&&!$e(this._latlngs[0]),o=Mn(this._latlngs,n?2:e?1:0,!0,t);return e||(o=[o]),$i(this,{type:(n?"Multi":"")+"Polygon",coordinates:o})}}),Ti.include({toMultiPoint:function(t){var e=[];return this.eachLayer(function(n){e.push(n.toGeoJSON(t).geometry.coordinates)}),$i(this,{type:"MultiPoint",coordinates:e})},toGeoJSON:function(t){var e=this.feature&&this.feature.geometry&&this.feature.geometry.type;if(e==="MultiPoint")return this.toMultiPoint(t);var n=e==="GeometryCollection",o=[];return this.eachLayer(function(h){if(h.toGeoJSON){var u=h.toGeoJSON(t);if(n)o.push(u.geometry);else{var g=Sn(u);g.type==="FeatureCollection"?o.push.apply(o,g.features):o.push(g)}}}),n?$i(this,{geometries:o,type:"GeometryCollection"}):{type:"FeatureCollection",features:o}}});function ss(t,e){return new Je(t,e)}var ra=ss,Tn=Ne.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(t,e,n){this._url=t,this._bounds=I(e),w(this,n)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(X(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){Mt(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(t){return this.options.opacity=t,this._image&&this._updateOpacity(),this},setStyle:function(t){return t.opacity&&this.setOpacity(t.opacity),this},bringToFront:function(){return this._map&&De(this._image),this},bringToBack:function(){return this._map&&Ce(this._image),this},setUrl:function(t){return this._url=t,this._image&&(this._image.src=t),this},setBounds:function(t){return this._bounds=I(t),this._map&&this._reset(),this},getEvents:function(){var t={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var t=this._url.tagName==="IMG",e=this._image=t?this._url:ut("img");if(X(e,"leaflet-image-layer"),this._zoomAnimated&&X(e,"leaflet-zoom-animated"),this.options.className&&X(e,this.options.className),e.onselectstart=m,e.onmousemove=m,e.onload=l(this.fire,this,"load"),e.onerror=l(this._overlayOnError,this,"error"),(this.options.crossOrigin||this.options.crossOrigin==="")&&(e.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),t){this._url=e.src;return}e.src=this._url,e.alt=this.options.alt},_animateZoom:function(t){var e=this._map.getZoomScale(t.zoom),n=this._map._latLngBoundsToNewLayerBounds(this._bounds,t.zoom,t.center).min;Ve(this._image,n,e)},_reset:function(){var t=this._image,e=new U(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),n=e.getSize();Vt(t,e.min),t.style.width=n.x+"px",t.style.height=n.y+"px"},_updateOpacity:function(){pe(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var t=this.options.errorOverlayUrl;t&&this._url!==t&&(this._url=t,this._image.src=t)},getCenter:function(){return this._bounds.getCenter()}}),sa=function(t,e,n){return new Tn(t,e,n)},os=Tn.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var t=this._url.tagName==="VIDEO",e=this._image=t?this._url:ut("video");if(X(e,"leaflet-image-layer"),this._zoomAnimated&&X(e,"leaflet-zoom-animated"),this.options.className&&X(e,this.options.className),e.onselectstart=m,e.onmousemove=m,e.onloadeddata=l(this.fire,this,"load"),t){for(var n=e.getElementsByTagName("source"),o=[],h=0;h<n.length;h++)o.push(n[h].src);this._url=n.length>0?o:[e.src];return}O(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(e.style,"objectFit")&&(e.style.objectFit="fill"),e.autoplay=!!this.options.autoplay,e.loop=!!this.options.loop,e.muted=!!this.options.muted,e.playsInline=!!this.options.playsInline;for(var u=0;u<this._url.length;u++){var g=ut("source");g.src=this._url[u],e.appendChild(g)}}});function oa(t,e,n){return new os(t,e,n)}var as=Tn.extend({_initImage:function(){var t=this._image=this._url;X(t,"leaflet-image-layer"),this._zoomAnimated&&X(t,"leaflet-zoom-animated"),this.options.className&&X(t,this.options.className),t.onselectstart=m,t.onmousemove=m}});function aa(t,e,n){return new as(t,e,n)}var Ue=Ne.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(t,e){t&&(t instanceof K||O(t))?(this._latlng=H(t),w(this,e)):(w(this,t),this._source=e),this.options.content&&(this._content=this.options.content)},openOn:function(t){return t=arguments.length?t:this._source._map,t.hasLayer(this)||t.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(t){return this._map?this.close():(arguments.length?this._source=t:t=this._source,this._prepareOpen(),this.openOn(t._map)),this},onAdd:function(t){this._zoomAnimated=t._zoomAnimated,this._container||this._initLayout(),t._fadeAnimated&&pe(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),t._fadeAnimated&&pe(this._container,1),this.bringToFront(),this.options.interactive&&(X(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(t){t._fadeAnimated?(pe(this._container,0),this._removeTimeout=setTimeout(l(Mt,void 0,this._container),200)):Mt(this._container),this.options.interactive&&(St(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(t){return this._latlng=H(t),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(t){return this._content=t,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var t={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&De(this._container),this},bringToBack:function(){return this._map&&Ce(this._container),this},_prepareOpen:function(t){var e=this._source;if(!e._map)return!1;if(e instanceof Ke){e=null;var n=this._source._layers;for(var o in n)if(n[o]._map){e=n[o];break}if(!e)return!1;this._source=e}if(!t)if(e.getCenter)t=e.getCenter();else if(e.getLatLng)t=e.getLatLng();else if(e.getBounds)t=e.getBounds().getCenter();else throw new Error("Unable to get source layer LatLng.");return this.setLatLng(t),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var t=this._contentNode,e=typeof this._content=="function"?this._content(this._source||this):this._content;if(typeof e=="string")t.innerHTML=e;else{for(;t.hasChildNodes();)t.removeChild(t.firstChild);t.appendChild(e)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var t=this._map.latLngToLayerPoint(this._latlng),e=$(this.options.offset),n=this._getAnchor();this._zoomAnimated?Vt(this._container,t.add(n)):e=e.add(t).add(n);var o=this._containerBottom=-e.y,h=this._containerLeft=-Math.round(this._containerWidth/2)+e.x;this._container.style.bottom=o+"px",this._container.style.left=h+"px"}},_getAnchor:function(){return[0,0]}});yt.include({_initOverlay:function(t,e,n,o){var h=e;return h instanceof t||(h=new t(o).setContent(e)),n&&h.setLatLng(n),h}}),Ne.include({_initOverlay:function(t,e,n,o){var h=n;return h instanceof t?(w(h,o),h._source=this):(h=e&&!o?e:new t(o,this),h.setContent(n)),h}});var zn=Ue.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(t){return t=arguments.length?t:this._source._map,!t.hasLayer(this)&&t._popup&&t._popup.options.autoClose&&t.removeLayer(t._popup),t._popup=this,Ue.prototype.openOn.call(this,t)},onAdd:function(t){Ue.prototype.onAdd.call(this,t),t.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof li||this._source.on("preclick",gi))},onRemove:function(t){Ue.prototype.onRemove.call(this,t),t.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof li||this._source.off("preclick",gi))},getEvents:function(){var t=Ue.prototype.getEvents.call(this);return(this.options.closeOnClick!==void 0?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(t.preclick=this.close),this.options.keepInView&&(t.moveend=this._adjustPan),t},_initLayout:function(){var t="leaflet-popup",e=this._container=ut("div",t+" "+(this.options.className||"")+" leaflet-zoom-animated"),n=this._wrapper=ut("div",t+"-content-wrapper",e);if(this._contentNode=ut("div",t+"-content",n),ji(e),nr(this._contentNode),Q(e,"contextmenu",gi),this._tipContainer=ut("div",t+"-tip-container",e),this._tip=ut("div",t+"-tip",this._tipContainer),this.options.closeButton){var o=this._closeButton=ut("a",t+"-close-button",e);o.setAttribute("role","button"),o.setAttribute("aria-label","Close popup"),o.href="#close",o.innerHTML='<span aria-hidden="true">&#215;</span>',Q(o,"click",function(h){de(h),this.close()},this)}},_updateLayout:function(){var t=this._contentNode,e=t.style;e.width="",e.whiteSpace="nowrap";var n=t.offsetWidth;n=Math.min(n,this.options.maxWidth),n=Math.max(n,this.options.minWidth),e.width=n+1+"px",e.whiteSpace="",e.height="";var o=t.offsetHeight,h=this.options.maxHeight,u="leaflet-popup-scrolled";h&&o>h?(e.height=h+"px",X(t,u)):St(t,u),this._containerWidth=this._container.offsetWidth},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center),n=this._getAnchor();Vt(this._container,e.add(n))},_adjustPan:function(){if(this.options.autoPan){if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning){this._autopanning=!1;return}var t=this._map,e=parseInt(Pe(this._container,"marginBottom"),10)||0,n=this._container.offsetHeight+e,o=this._containerWidth,h=new S(this._containerLeft,-n-this._containerBottom);h._add(je(this._container));var u=t.layerPointToContainerPoint(h),g=$(this.options.autoPanPadding),b=$(this.options.autoPanPaddingTopLeft||g),P=$(this.options.autoPanPaddingBottomRight||g),C=t.getSize(),A=0,q=0;u.x+o+P.x>C.x&&(A=u.x+o-C.x+P.x),u.x-A-b.x<0&&(A=u.x-b.x),u.y+n+P.y>C.y&&(q=u.y+n-C.y+P.y),u.y-q-b.y<0&&(q=u.y-b.y),(A||q)&&(this.options.keepInView&&(this._autopanning=!0),t.fire("autopanstart").panBy([A,q]))}},_getAnchor:function(){return $(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),la=function(t,e){return new zn(t,e)};yt.mergeOptions({closePopupOnClick:!0}),yt.include({openPopup:function(t,e,n){return this._initOverlay(zn,t,e,n).openOn(this),this},closePopup:function(t){return t=arguments.length?t:this._popup,t&&t.close(),this}}),Ne.include({bindPopup:function(t,e){return this._popup=this._initOverlay(zn,this._popup,t,e),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(t){return this._popup&&(this instanceof Ke||(this._popup._source=this),this._popup._prepareOpen(t||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return this._popup?this._popup.isOpen():!1},setPopupContent:function(t){return this._popup&&this._popup.setContent(t),this},getPopup:function(){return this._popup},_openPopup:function(t){if(!(!this._popup||!this._map)){vi(t);var e=t.layer||t.target;if(this._popup._source===e&&!(e instanceof li)){this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(t.latlng);return}this._popup._source=e,this.openPopup(t.latlng)}},_movePopup:function(t){this._popup.setLatLng(t.latlng)},_onKeyPress:function(t){t.originalEvent.keyCode===13&&this._openPopup(t)}});var En=Ue.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(t){Ue.prototype.onAdd.call(this,t),this.setOpacity(this.options.opacity),t.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(t){Ue.prototype.onRemove.call(this,t),t.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var t=Ue.prototype.getEvents.call(this);return this.options.permanent||(t.preclick=this.close),t},_initLayout:function(){var t="leaflet-tooltip",e=t+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=ut("div",e),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+d(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(t){var e,n,o=this._map,h=this._container,u=o.latLngToContainerPoint(o.getCenter()),g=o.layerPointToContainerPoint(t),b=this.options.direction,P=h.offsetWidth,C=h.offsetHeight,A=$(this.options.offset),q=this._getAnchor();b==="top"?(e=P/2,n=C):b==="bottom"?(e=P/2,n=0):b==="center"?(e=P/2,n=C/2):b==="right"?(e=0,n=C/2):b==="left"?(e=P,n=C/2):g.x<u.x?(b="right",e=0,n=C/2):(b="left",e=P+(A.x+q.x)*2,n=C/2),t=t.subtract($(e,n,!0)).add(A).add(q),St(h,"leaflet-tooltip-right"),St(h,"leaflet-tooltip-left"),St(h,"leaflet-tooltip-top"),St(h,"leaflet-tooltip-bottom"),X(h,"leaflet-tooltip-"+b),Vt(h,t)},_updatePosition:function(){var t=this._map.latLngToLayerPoint(this._latlng);this._setPosition(t)},setOpacity:function(t){this.options.opacity=t,this._container&&pe(this._container,t)},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);this._setPosition(e)},_getAnchor:function(){return $(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),ha=function(t,e){return new En(t,e)};yt.include({openTooltip:function(t,e,n){return this._initOverlay(En,t,e,n).openOn(this),this},closeTooltip:function(t){return t.close(),this}}),Ne.include({bindTooltip:function(t,e){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(En,this._tooltip,t,e),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(t){if(!(!t&&this._tooltipHandlersAdded)){var e=t?"off":"on",n={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?n.add=this._openTooltip:(n.mouseover=this._openTooltip,n.mouseout=this.closeTooltip,n.click=this._openTooltip,this._map?this._addFocusListeners():n.add=this._addFocusListeners),this._tooltip.options.sticky&&(n.mousemove=this._moveTooltip),this[e](n),this._tooltipHandlersAdded=!t}},openTooltip:function(t){return this._tooltip&&(this instanceof Ke||(this._tooltip._source=this),this._tooltip._prepareOpen(t)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(t){return this._tooltip&&this._tooltip.setContent(t),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(t){var e=typeof t.getElement=="function"&&t.getElement();e&&(Q(e,"focus",function(){this._tooltip._source=t,this.openTooltip()},this),Q(e,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(t){var e=typeof t.getElement=="function"&&t.getElement();e&&e.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(t){if(!(!this._tooltip||!this._map)){if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var e=this;this._map.once("moveend",function(){e._openOnceFlag=!1,e._openTooltip(t)});return}this._tooltip._source=t.layer||t.target,this.openTooltip(this._tooltip.options.sticky?t.latlng:void 0)}},_moveTooltip:function(t){var e=t.latlng,n,o;this._tooltip.options.sticky&&t.originalEvent&&(n=this._map.mouseEventToContainerPoint(t.originalEvent),o=this._map.containerPointToLayerPoint(n),e=this._map.layerPointToLatLng(o)),this._tooltip.setLatLng(e)}});var ls=zi.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(t){var e=t&&t.tagName==="DIV"?t:document.createElement("div"),n=this.options;if(n.html instanceof Element?(si(e),e.appendChild(n.html)):e.innerHTML=n.html!==!1?n.html:"",n.bgPos){var o=$(n.bgPos);e.style.backgroundPosition=-o.x+"px "+-o.y+"px"}return this._setIconStyles(e,"icon"),e},createShadow:function(){return null}});function ca(t){return new ls(t)}zi.Default=Ji;var Xi=Ne.extend({options:{tileSize:256,opacity:1,updateWhenIdle:N.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(t){w(this,t)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(t){t._addZoomLimit(this)},onRemove:function(t){this._removeAllTiles(),Mt(this._container),t._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(De(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(Ce(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(t){return this.options.opacity=t,this._updateOpacity(),this},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var t=this._clampZoom(this._map.getZoom());t!==this._tileZoom&&(this._tileZoom=t,this._updateLevels()),this._update()}return this},getEvents:function(){var t={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=_(this._onMoveEnd,this.options.updateInterval,this)),t.move=this._onMove),this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},createTile:function(){return document.createElement("div")},getTileSize:function(){var t=this.options.tileSize;return t instanceof S?t:new S(t,t)},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(t){for(var e=this.getPane().children,n=-t(-1/0,1/0),o=0,h=e.length,u;o<h;o++)u=e[o].style.zIndex,e[o]!==this._container&&u&&(n=t(n,+u));isFinite(n)&&(this.options.zIndex=n+t(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!N.ielt9){pe(this._container,this.options.opacity);var t=+new Date,e=!1,n=!1;for(var o in this._tiles){var h=this._tiles[o];if(!(!h.current||!h.loaded)){var u=Math.min(1,(t-h.loaded)/200);pe(h.el,u),u<1?e=!0:(h.active?n=!0:this._onOpaqueTile(h),h.active=!0)}}n&&!this._noPrune&&this._pruneTiles(),e&&(tt(this._fadeFrame),this._fadeFrame=V(this._updateOpacity,this))}},_onOpaqueTile:m,_initContainer:function(){this._container||(this._container=ut("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var t=this._tileZoom,e=this.options.maxZoom;if(t!==void 0){for(var n in this._levels)n=Number(n),this._levels[n].el.children.length||n===t?(this._levels[n].el.style.zIndex=e-Math.abs(t-n),this._onUpdateLevel(n)):(Mt(this._levels[n].el),this._removeTilesAtZoom(n),this._onRemoveLevel(n),delete this._levels[n]);var o=this._levels[t],h=this._map;return o||(o=this._levels[t]={},o.el=ut("div","leaflet-tile-container leaflet-zoom-animated",this._container),o.el.style.zIndex=e,o.origin=h.project(h.unproject(h.getPixelOrigin()),t).round(),o.zoom=t,this._setZoomTransform(o,h.getCenter(),h.getZoom()),m(o.el.offsetWidth),this._onCreateLevel(o)),this._level=o,o}},_onUpdateLevel:m,_onRemoveLevel:m,_onCreateLevel:m,_pruneTiles:function(){if(this._map){var t,e,n=this._map.getZoom();if(n>this.options.maxZoom||n<this.options.minZoom){this._removeAllTiles();return}for(t in this._tiles)e=this._tiles[t],e.retain=e.current;for(t in this._tiles)if(e=this._tiles[t],e.current&&!e.active){var o=e.coords;this._retainParent(o.x,o.y,o.z,o.z-5)||this._retainChildren(o.x,o.y,o.z,o.z+2)}for(t in this._tiles)this._tiles[t].retain||this._removeTile(t)}},_removeTilesAtZoom:function(t){for(var e in this._tiles)this._tiles[e].coords.z===t&&this._removeTile(e)},_removeAllTiles:function(){for(var t in this._tiles)this._removeTile(t)},_invalidateAll:function(){for(var t in this._levels)Mt(this._levels[t].el),this._onRemoveLevel(Number(t)),delete this._levels[t];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(t,e,n,o){var h=Math.floor(t/2),u=Math.floor(e/2),g=n-1,b=new S(+h,+u);b.z=+g;var P=this._tileCoordsToKey(b),C=this._tiles[P];return C&&C.active?(C.retain=!0,!0):(C&&C.loaded&&(C.retain=!0),g>o?this._retainParent(h,u,g,o):!1)},_retainChildren:function(t,e,n,o){for(var h=2*t;h<2*t+2;h++)for(var u=2*e;u<2*e+2;u++){var g=new S(h,u);g.z=n+1;var b=this._tileCoordsToKey(g),P=this._tiles[b];if(P&&P.active){P.retain=!0;continue}else P&&P.loaded&&(P.retain=!0);n+1<o&&this._retainChildren(h,u,n+1,o)}},_resetView:function(t){var e=t&&(t.pinch||t.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),e,e)},_animateZoom:function(t){this._setView(t.center,t.zoom,!0,t.noUpdate)},_clampZoom:function(t){var e=this.options;return e.minNativeZoom!==void 0&&t<e.minNativeZoom?e.minNativeZoom:e.maxNativeZoom!==void 0&&e.maxNativeZoom<t?e.maxNativeZoom:t},_setView:function(t,e,n,o){var h=Math.round(e);this.options.maxZoom!==void 0&&h>this.options.maxZoom||this.options.minZoom!==void 0&&h<this.options.minZoom?h=void 0:h=this._clampZoom(h);var u=this.options.updateWhenZooming&&h!==this._tileZoom;(!o||u)&&(this._tileZoom=h,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),h!==void 0&&this._update(t),n||this._pruneTiles(),this._noPrune=!!n),this._setZoomTransforms(t,e)},_setZoomTransforms:function(t,e){for(var n in this._levels)this._setZoomTransform(this._levels[n],t,e)},_setZoomTransform:function(t,e,n){var o=this._map.getZoomScale(n,t.zoom),h=t.origin.multiplyBy(o).subtract(this._map._getNewPixelOrigin(e,n)).round();N.any3d?Ve(t.el,h,o):Vt(t.el,h)},_resetGrid:function(){var t=this._map,e=t.options.crs,n=this._tileSize=this.getTileSize(),o=this._tileZoom,h=this._map.getPixelWorldBounds(this._tileZoom);h&&(this._globalTileRange=this._pxBoundsToTileRange(h)),this._wrapX=e.wrapLng&&!this.options.noWrap&&[Math.floor(t.project([0,e.wrapLng[0]],o).x/n.x),Math.ceil(t.project([0,e.wrapLng[1]],o).x/n.y)],this._wrapY=e.wrapLat&&!this.options.noWrap&&[Math.floor(t.project([e.wrapLat[0],0],o).y/n.x),Math.ceil(t.project([e.wrapLat[1],0],o).y/n.y)]},_onMoveEnd:function(){!this._map||this._map._animatingZoom||this._update()},_getTiledPixelBounds:function(t){var e=this._map,n=e._animatingZoom?Math.max(e._animateToZoom,e.getZoom()):e.getZoom(),o=e.getZoomScale(n,this._tileZoom),h=e.project(t,this._tileZoom).floor(),u=e.getSize().divideBy(o*2);return new U(h.subtract(u),h.add(u))},_update:function(t){var e=this._map;if(e){var n=this._clampZoom(e.getZoom());if(t===void 0&&(t=e.getCenter()),this._tileZoom!==void 0){var o=this._getTiledPixelBounds(t),h=this._pxBoundsToTileRange(o),u=h.getCenter(),g=[],b=this.options.keepBuffer,P=new U(h.getBottomLeft().subtract([b,-b]),h.getTopRight().add([b,-b]));if(!(isFinite(h.min.x)&&isFinite(h.min.y)&&isFinite(h.max.x)&&isFinite(h.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var C in this._tiles){var A=this._tiles[C].coords;(A.z!==this._tileZoom||!P.contains(new S(A.x,A.y)))&&(this._tiles[C].current=!1)}if(Math.abs(n-this._tileZoom)>1){this._setView(t,n);return}for(var q=h.min.y;q<=h.max.y;q++)for(var lt=h.min.x;lt<=h.max.x;lt++){var ve=new S(lt,q);if(ve.z=this._tileZoom,!!this._isValidTile(ve)){var ae=this._tiles[this._tileCoordsToKey(ve)];ae?ae.current=!0:g.push(ve)}}if(g.sort(function(we,Ai){return we.distanceTo(u)-Ai.distanceTo(u)}),g.length!==0){this._loading||(this._loading=!0,this.fire("loading"));var Oe=document.createDocumentFragment();for(lt=0;lt<g.length;lt++)this._addTile(g[lt],Oe);this._level.el.appendChild(Oe)}}}},_isValidTile:function(t){var e=this._map.options.crs;if(!e.infinite){var n=this._globalTileRange;if(!e.wrapLng&&(t.x<n.min.x||t.x>n.max.x)||!e.wrapLat&&(t.y<n.min.y||t.y>n.max.y))return!1}if(!this.options.bounds)return!0;var o=this._tileCoordsToBounds(t);return I(this.options.bounds).overlaps(o)},_keyToBounds:function(t){return this._tileCoordsToBounds(this._keyToTileCoords(t))},_tileCoordsToNwSe:function(t){var e=this._map,n=this.getTileSize(),o=t.scaleBy(n),h=o.add(n),u=e.unproject(o,t.z),g=e.unproject(h,t.z);return[u,g]},_tileCoordsToBounds:function(t){var e=this._tileCoordsToNwSe(t),n=new at(e[0],e[1]);return this.options.noWrap||(n=this._map.wrapLatLngBounds(n)),n},_tileCoordsToKey:function(t){return t.x+":"+t.y+":"+t.z},_keyToTileCoords:function(t){var e=t.split(":"),n=new S(+e[0],+e[1]);return n.z=+e[2],n},_removeTile:function(t){var e=this._tiles[t];e&&(Mt(e.el),delete this._tiles[t],this.fire("tileunload",{tile:e.el,coords:this._keyToTileCoords(t)}))},_initTile:function(t){X(t,"leaflet-tile");var e=this.getTileSize();t.style.width=e.x+"px",t.style.height=e.y+"px",t.onselectstart=m,t.onmousemove=m,N.ielt9&&this.options.opacity<1&&pe(t,this.options.opacity)},_addTile:function(t,e){var n=this._getTilePos(t),o=this._tileCoordsToKey(t),h=this.createTile(this._wrapCoords(t),l(this._tileReady,this,t));this._initTile(h),this.createTile.length<2&&V(l(this._tileReady,this,t,null,h)),Vt(h,n),this._tiles[o]={el:h,coords:t,current:!0},e.appendChild(h),this.fire("tileloadstart",{tile:h,coords:t})},_tileReady:function(t,e,n){e&&this.fire("tileerror",{error:e,tile:n,coords:t});var o=this._tileCoordsToKey(t);n=this._tiles[o],n&&(n.loaded=+new Date,this._map._fadeAnimated?(pe(n.el,0),tt(this._fadeFrame),this._fadeFrame=V(this._updateOpacity,this)):(n.active=!0,this._pruneTiles()),e||(X(n.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:n.el,coords:t})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),N.ielt9||!this._map._fadeAnimated?V(this._pruneTiles,this):setTimeout(l(this._pruneTiles,this),250)))},_getTilePos:function(t){return t.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(t){var e=new S(this._wrapX?f(t.x,this._wrapX):t.x,this._wrapY?f(t.y,this._wrapY):t.y);return e.z=t.z,e},_pxBoundsToTileRange:function(t){var e=this.getTileSize();return new U(t.min.unscaleBy(e).floor(),t.max.unscaleBy(e).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var t in this._tiles)if(!this._tiles[t].loaded)return!1;return!0}});function da(t){return new Xi(t)}var Oi=Xi.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(t,e){this._url=t,e=w(this,e),e.detectRetina&&N.retina&&e.maxZoom>0?(e.tileSize=Math.floor(e.tileSize/2),e.zoomReverse?(e.zoomOffset--,e.minZoom=Math.min(e.maxZoom,e.minZoom+1)):(e.zoomOffset++,e.maxZoom=Math.max(e.minZoom,e.maxZoom-1)),e.minZoom=Math.max(0,e.minZoom)):e.zoomReverse?e.minZoom=Math.min(e.maxZoom,e.minZoom):e.maxZoom=Math.max(e.minZoom,e.maxZoom),typeof e.subdomains=="string"&&(e.subdomains=e.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(t,e){return this._url===t&&e===void 0&&(e=!0),this._url=t,e||this.redraw(),this},createTile:function(t,e){var n=document.createElement("img");return Q(n,"load",l(this._tileOnLoad,this,e,n)),Q(n,"error",l(this._tileOnError,this,e,n)),(this.options.crossOrigin||this.options.crossOrigin==="")&&(n.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),typeof this.options.referrerPolicy=="string"&&(n.referrerPolicy=this.options.referrerPolicy),n.alt="",n.src=this.getTileUrl(t),n},getTileUrl:function(t){var e={r:N.retina?"@2x":"",s:this._getSubdomain(t),x:t.x,y:t.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var n=this._globalTileRange.max.y-t.y;this.options.tms&&(e.y=n),e["-y"]=n}return B(this._url,s(e,this.options))},_tileOnLoad:function(t,e){N.ielt9?setTimeout(l(t,this,null,e),0):t(null,e)},_tileOnError:function(t,e,n){var o=this.options.errorTileUrl;o&&e.getAttribute("src")!==o&&(e.src=o),t(n,e)},_onTileRemove:function(t){t.tile.onload=null},_getZoomForUrl:function(){var t=this._tileZoom,e=this.options.maxZoom,n=this.options.zoomReverse,o=this.options.zoomOffset;return n&&(t=e-t),t+o},_getSubdomain:function(t){var e=Math.abs(t.x+t.y)%this.options.subdomains.length;return this.options.subdomains[e]},_abortLoading:function(){var t,e;for(t in this._tiles)if(this._tiles[t].coords.z!==this._tileZoom&&(e=this._tiles[t].el,e.onload=m,e.onerror=m,!e.complete)){e.src=W;var n=this._tiles[t].coords;Mt(e),delete this._tiles[t],this.fire("tileabort",{tile:e,coords:n})}},_removeTile:function(t){var e=this._tiles[t];if(e)return e.el.setAttribute("src",W),Xi.prototype._removeTile.call(this,t)},_tileReady:function(t,e,n){if(!(!this._map||n&&n.getAttribute("src")===W))return Xi.prototype._tileReady.call(this,t,e,n)}});function hs(t,e){return new Oi(t,e)}var cs=Oi.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(t,e){this._url=t;var n=s({},this.defaultWmsParams);for(var o in e)o in this.options||(n[o]=e[o]);e=w(this,e);var h=e.detectRetina&&N.retina?2:1,u=this.getTileSize();n.width=u.x*h,n.height=u.y*h,this.wmsParams=n},onAdd:function(t){this._crs=this.options.crs||t.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var e=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[e]=this._crs.code,Oi.prototype.onAdd.call(this,t)},getTileUrl:function(t){var e=this._tileCoordsToNwSe(t),n=this._crs,o=dt(n.project(e[0]),n.project(e[1])),h=o.min,u=o.max,g=(this._wmsVersion>=1.3&&this._crs===is?[h.y,h.x,u.y,u.x]:[h.x,h.y,u.x,u.y]).join(","),b=Oi.prototype.getTileUrl.call(this,t);return b+T(this.wmsParams,b,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+g},setParams:function(t,e){return s(this.wmsParams,t),e||this.redraw(),this}});function ua(t,e){return new cs(t,e)}Oi.WMS=cs,hs.wms=ua;var Xe=Ne.extend({options:{padding:.1},initialize:function(t){w(this,t),d(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),X(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var t={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(t.zoomanim=this._onAnimZoom),t},_onAnimZoom:function(t){this._updateTransform(t.center,t.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(t,e){var n=this._map.getZoomScale(e,this._zoom),o=this._map.getSize().multiplyBy(.5+this.options.padding),h=this._map.project(this._center,e),u=o.multiplyBy(-n).add(h).subtract(this._map._getNewPixelOrigin(t,e));N.any3d?Ve(this._container,u,n):Vt(this._container,u)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var t in this._layers)this._layers[t]._reset()},_onZoomEnd:function(){for(var t in this._layers)this._layers[t]._project()},_updatePaths:function(){for(var t in this._layers)this._layers[t]._update()},_update:function(){var t=this.options.padding,e=this._map.getSize(),n=this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();this._bounds=new U(n,n.add(e.multiplyBy(1+t*2)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),ds=Xe.extend({options:{tolerance:0},getEvents:function(){var t=Xe.prototype.getEvents.call(this);return t.viewprereset=this._onViewPreReset,t},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){Xe.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var t=this._container=document.createElement("canvas");Q(t,"mousemove",this._onMouseMove,this),Q(t,"click dblclick mousedown mouseup contextmenu",this._onClick,this),Q(t,"mouseout",this._handleMouseOut,this),t._leaflet_disable_events=!0,this._ctx=t.getContext("2d")},_destroyContainer:function(){tt(this._redrawRequest),delete this._ctx,Mt(this._container),$t(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){var t;this._redrawBounds=null;for(var e in this._layers)t=this._layers[e],t._update();this._redraw()}},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){Xe.prototype._update.call(this);var t=this._bounds,e=this._container,n=t.getSize(),o=N.retina?2:1;Vt(e,t.min),e.width=o*n.x,e.height=o*n.y,e.style.width=n.x+"px",e.style.height=n.y+"px",N.retina&&this._ctx.scale(2,2),this._ctx.translate(-t.min.x,-t.min.y),this.fire("update")}},_reset:function(){Xe.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(t){this._updateDashArray(t),this._layers[d(t)]=t;var e=t._order={layer:t,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=e),this._drawLast=e,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(t){this._requestRedraw(t)},_removePath:function(t){var e=t._order,n=e.next,o=e.prev;n?n.prev=o:this._drawLast=o,o?o.next=n:this._drawFirst=n,delete t._order,delete this._layers[d(t)],this._requestRedraw(t)},_updatePath:function(t){this._extendRedrawBounds(t),t._project(),t._update(),this._requestRedraw(t)},_updateStyle:function(t){this._updateDashArray(t),this._requestRedraw(t)},_updateDashArray:function(t){if(typeof t.options.dashArray=="string"){var e=t.options.dashArray.split(/[, ]+/),n=[],o,h;for(h=0;h<e.length;h++){if(o=Number(e[h]),isNaN(o))return;n.push(o)}t.options._dashArray=n}else t.options._dashArray=t.options.dashArray},_requestRedraw:function(t){this._map&&(this._extendRedrawBounds(t),this._redrawRequest=this._redrawRequest||V(this._redraw,this))},_extendRedrawBounds:function(t){if(t._pxBounds){var e=(t.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new U,this._redrawBounds.extend(t._pxBounds.min.subtract([e,e])),this._redrawBounds.extend(t._pxBounds.max.add([e,e]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var t=this._redrawBounds;if(t){var e=t.getSize();this._ctx.clearRect(t.min.x,t.min.y,e.x,e.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var t,e=this._redrawBounds;if(this._ctx.save(),e){var n=e.getSize();this._ctx.beginPath(),this._ctx.rect(e.min.x,e.min.y,n.x,n.y),this._ctx.clip()}this._drawing=!0;for(var o=this._drawFirst;o;o=o.next)t=o.layer,(!e||t._pxBounds&&t._pxBounds.intersects(e))&&t._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(t,e){if(this._drawing){var n,o,h,u,g=t._parts,b=g.length,P=this._ctx;if(b){for(P.beginPath(),n=0;n<b;n++){for(o=0,h=g[n].length;o<h;o++)u=g[n][o],P[o?"lineTo":"moveTo"](u.x,u.y);e&&P.closePath()}this._fillStroke(P,t)}}},_updateCircle:function(t){if(!(!this._drawing||t._empty())){var e=t._point,n=this._ctx,o=Math.max(Math.round(t._radius),1),h=(Math.max(Math.round(t._radiusY),1)||o)/o;h!==1&&(n.save(),n.scale(1,h)),n.beginPath(),n.arc(e.x,e.y/h,o,0,Math.PI*2,!1),h!==1&&n.restore(),this._fillStroke(n,t)}},_fillStroke:function(t,e){var n=e.options;n.fill&&(t.globalAlpha=n.fillOpacity,t.fillStyle=n.fillColor||n.color,t.fill(n.fillRule||"evenodd")),n.stroke&&n.weight!==0&&(t.setLineDash&&t.setLineDash(e.options&&e.options._dashArray||[]),t.globalAlpha=n.opacity,t.lineWidth=n.weight,t.strokeStyle=n.color,t.lineCap=n.lineCap,t.lineJoin=n.lineJoin,t.stroke())},_onClick:function(t){for(var e=this._map.mouseEventToLayerPoint(t),n,o,h=this._drawFirst;h;h=h.next)n=h.layer,n.options.interactive&&n._containsPoint(e)&&(!(t.type==="click"||t.type==="preclick")||!this._map._draggableMoved(n))&&(o=n);this._fireEvent(o?[o]:!1,t)},_onMouseMove:function(t){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var e=this._map.mouseEventToLayerPoint(t);this._handleMouseHover(t,e)}},_handleMouseOut:function(t){var e=this._hoveredLayer;e&&(St(this._container,"leaflet-interactive"),this._fireEvent([e],t,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(t,e){if(!this._mouseHoverThrottled){for(var n,o,h=this._drawFirst;h;h=h.next)n=h.layer,n.options.interactive&&n._containsPoint(e)&&(o=n);o!==this._hoveredLayer&&(this._handleMouseOut(t),o&&(X(this._container,"leaflet-interactive"),this._fireEvent([o],t,"mouseover"),this._hoveredLayer=o)),this._fireEvent(this._hoveredLayer?[this._hoveredLayer]:!1,t),this._mouseHoverThrottled=!0,setTimeout(l(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(t,e,n){this._map._fireDOMEvent(e,n||e.type,t)},_bringToFront:function(t){var e=t._order;if(e){var n=e.next,o=e.prev;if(n)n.prev=o;else return;o?o.next=n:n&&(this._drawFirst=n),e.prev=this._drawLast,this._drawLast.next=e,e.next=null,this._drawLast=e,this._requestRedraw(t)}},_bringToBack:function(t){var e=t._order;if(e){var n=e.next,o=e.prev;if(o)o.next=n;else return;n?n.prev=o:o&&(this._drawLast=o),e.prev=null,e.next=this._drawFirst,this._drawFirst.prev=e,this._drawFirst=e,this._requestRedraw(t)}}});function us(t){return N.canvas?new ds(t):null}var Qi=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(t){return document.createElement("<lvml:"+t+' class="lvml">')}}catch{}return function(t){return document.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}(),pa={_initContainer:function(){this._container=ut("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(Xe.prototype._update.call(this),this.fire("update"))},_initPath:function(t){var e=t._container=Qi("shape");X(e,"leaflet-vml-shape "+(this.options.className||"")),e.coordsize="1 1",t._path=Qi("path"),e.appendChild(t._path),this._updateStyle(t),this._layers[d(t)]=t},_addPath:function(t){var e=t._container;this._container.appendChild(e),t.options.interactive&&t.addInteractiveTarget(e)},_removePath:function(t){var e=t._container;Mt(e),t.removeInteractiveTarget(e),delete this._layers[d(t)]},_updateStyle:function(t){var e=t._stroke,n=t._fill,o=t.options,h=t._container;h.stroked=!!o.stroke,h.filled=!!o.fill,o.stroke?(e||(e=t._stroke=Qi("stroke")),h.appendChild(e),e.weight=o.weight+"px",e.color=o.color,e.opacity=o.opacity,o.dashArray?e.dashStyle=O(o.dashArray)?o.dashArray.join(" "):o.dashArray.replace(/( *, *)/g," "):e.dashStyle="",e.endcap=o.lineCap.replace("butt","flat"),e.joinstyle=o.lineJoin):e&&(h.removeChild(e),t._stroke=null),o.fill?(n||(n=t._fill=Qi("fill")),h.appendChild(n),n.color=o.fillColor||o.color,n.opacity=o.fillOpacity):n&&(h.removeChild(n),t._fill=null)},_updateCircle:function(t){var e=t._point.round(),n=Math.round(t._radius),o=Math.round(t._radiusY||n);this._setPath(t,t._empty()?"M0 0":"AL "+e.x+","+e.y+" "+n+","+o+" 0,"+65535*360)},_setPath:function(t,e){t._path.v=e},_bringToFront:function(t){De(t._container)},_bringToBack:function(t){Ce(t._container)}},$n=N.vml?Qi:Nt,tn=Xe.extend({_initContainer:function(){this._container=$n("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=$n("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){Mt(this._container),$t(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){Xe.prototype._update.call(this);var t=this._bounds,e=t.getSize(),n=this._container;(!this._svgSize||!this._svgSize.equals(e))&&(this._svgSize=e,n.setAttribute("width",e.x),n.setAttribute("height",e.y)),Vt(n,t.min),n.setAttribute("viewBox",[t.min.x,t.min.y,e.x,e.y].join(" ")),this.fire("update")}},_initPath:function(t){var e=t._path=$n("path");t.options.className&&X(e,t.options.className),t.options.interactive&&X(e,"leaflet-interactive"),this._updateStyle(t),this._layers[d(t)]=t},_addPath:function(t){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(t._path),t.addInteractiveTarget(t._path)},_removePath:function(t){Mt(t._path),t.removeInteractiveTarget(t._path),delete this._layers[d(t)]},_updatePath:function(t){t._project(),t._update()},_updateStyle:function(t){var e=t._path,n=t.options;e&&(n.stroke?(e.setAttribute("stroke",n.color),e.setAttribute("stroke-opacity",n.opacity),e.setAttribute("stroke-width",n.weight),e.setAttribute("stroke-linecap",n.lineCap),e.setAttribute("stroke-linejoin",n.lineJoin),n.dashArray?e.setAttribute("stroke-dasharray",n.dashArray):e.removeAttribute("stroke-dasharray"),n.dashOffset?e.setAttribute("stroke-dashoffset",n.dashOffset):e.removeAttribute("stroke-dashoffset")):e.setAttribute("stroke","none"),n.fill?(e.setAttribute("fill",n.fillColor||n.color),e.setAttribute("fill-opacity",n.fillOpacity),e.setAttribute("fill-rule",n.fillRule||"evenodd")):e.setAttribute("fill","none"))},_updatePoly:function(t,e){this._setPath(t,ht(t._parts,e))},_updateCircle:function(t){var e=t._point,n=Math.max(Math.round(t._radius),1),o=Math.max(Math.round(t._radiusY),1)||n,h="a"+n+","+o+" 0 1,0 ",u=t._empty()?"M0 0":"M"+(e.x-n)+","+e.y+h+n*2+",0 "+h+-n*2+",0 ";this._setPath(t,u)},_setPath:function(t,e){t._path.setAttribute("d",e)},_bringToFront:function(t){De(t._path)},_bringToBack:function(t){Ce(t._path)}});N.vml&&tn.include(pa);function ps(t){return N.svg||N.vml?new tn(t):null}yt.include({getRenderer:function(t){var e=t.options.renderer||this._getPaneRenderer(t.options.pane)||this.options.renderer||this._renderer;return e||(e=this._renderer=this._createRenderer()),this.hasLayer(e)||this.addLayer(e),e},_getPaneRenderer:function(t){if(t==="overlayPane"||t===void 0)return!1;var e=this._paneRenderers[t];return e===void 0&&(e=this._createRenderer({pane:t}),this._paneRenderers[t]=e),e},_createRenderer:function(t){return this.options.preferCanvas&&us(t)||ps(t)}});var fs=Ei.extend({initialize:function(t,e){Ei.prototype.initialize.call(this,this._boundsToLatLngs(t),e)},setBounds:function(t){return this.setLatLngs(this._boundsToLatLngs(t))},_boundsToLatLngs:function(t){return t=I(t),[t.getSouthWest(),t.getNorthWest(),t.getNorthEast(),t.getSouthEast()]}});function fa(t,e){return new fs(t,e)}tn.create=$n,tn.pointsToPath=ht,Je.geometryToLayer=Pn,Je.coordsToLatLng=ur,Je.coordsToLatLngs=Cn,Je.latLngToCoords=pr,Je.latLngsToCoords=Mn,Je.getFeature=$i,Je.asFeature=Sn,yt.mergeOptions({boxZoom:!0});var _s=He.extend({initialize:function(t){this._map=t,this._container=t._container,this._pane=t._panes.overlayPane,this._resetStateTimeout=0,t.on("unload",this._destroy,this)},addHooks:function(){Q(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){$t(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){Mt(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){this._resetStateTimeout!==0&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(t){if(!t.shiftKey||t.which!==1&&t.button!==1)return!1;this._clearDeferredResetState(),this._resetState(),fi(),Vi(),this._startPoint=this._map.mouseEventToContainerPoint(t),Q(document,{contextmenu:vi,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(t){this._moved||(this._moved=!0,this._box=ut("div","leaflet-zoom-box",this._container),X(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(t);var e=new U(this._point,this._startPoint),n=e.getSize();Vt(this._box,e.min),this._box.style.width=n.x+"px",this._box.style.height=n.y+"px"},_finish:function(){this._moved&&(Mt(this._box),St(this._container,"leaflet-crosshair")),_i(),Yn(),$t(document,{contextmenu:vi,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(t){if(!(t.which!==1&&t.button!==1)&&(this._finish(),!!this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(l(this._resetState,this),0);var e=new at(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(e).fire("boxzoomend",{boxZoomBounds:e})}},_onKeyDown:function(t){t.keyCode===27&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});yt.addInitHook("addHandler","boxZoom",_s),yt.mergeOptions({doubleClickZoom:!0});var ms=He.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(t){var e=this._map,n=e.getZoom(),o=e.options.zoomDelta,h=t.originalEvent.shiftKey?n-o:n+o;e.options.doubleClickZoom==="center"?e.setZoom(h):e.setZoomAround(t.containerPoint,h)}});yt.addInitHook("addHandler","doubleClickZoom",ms),yt.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var gs=He.extend({addHooks:function(){if(!this._draggable){var t=this._map;this._draggable=new ai(t._mapPane,t._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),t.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),t.on("zoomend",this._onZoomEnd,this),t.whenReady(this._onZoomEnd,this))}X(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){St(this._map._container,"leaflet-grab"),St(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var t=this._map;if(t._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var e=I(this._map.options.maxBounds);this._offsetLimit=dt(this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(e.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;t.fire("movestart").fire("dragstart"),t.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(t){if(this._map.options.inertia){var e=this._lastTime=+new Date,n=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(n),this._times.push(e),this._prunePositions(e)}this._map.fire("move",t).fire("drag",t)},_prunePositions:function(t){for(;this._positions.length>1&&t-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var t=this._map.getSize().divideBy(2),e=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=e.subtract(t).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(t,e){return t-(t-e)*this._viscosity},_onPreDragLimit:function(){if(!(!this._viscosity||!this._offsetLimit)){var t=this._draggable._newPos.subtract(this._draggable._startPos),e=this._offsetLimit;t.x<e.min.x&&(t.x=this._viscousLimit(t.x,e.min.x)),t.y<e.min.y&&(t.y=this._viscousLimit(t.y,e.min.y)),t.x>e.max.x&&(t.x=this._viscousLimit(t.x,e.max.x)),t.y>e.max.y&&(t.y=this._viscousLimit(t.y,e.max.y)),this._draggable._newPos=this._draggable._startPos.add(t)}},_onPreDragWrap:function(){var t=this._worldWidth,e=Math.round(t/2),n=this._initialWorldOffset,o=this._draggable._newPos.x,h=(o-e+n)%t+e-n,u=(o+e+n)%t-e-n,g=Math.abs(h+n)<Math.abs(u+n)?h:u;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=g},_onDragEnd:function(t){var e=this._map,n=e.options,o=!n.inertia||t.noInertia||this._times.length<2;if(e.fire("dragend",t),o)e.fire("moveend");else{this._prunePositions(+new Date);var h=this._lastPos.subtract(this._positions[0]),u=(this._lastTime-this._times[0])/1e3,g=n.easeLinearity,b=h.multiplyBy(g/u),P=b.distanceTo([0,0]),C=Math.min(n.inertiaMaxSpeed,P),A=b.multiplyBy(C/P),q=C/(n.inertiaDeceleration*g),lt=A.multiplyBy(-q/2).round();!lt.x&&!lt.y?e.fire("moveend"):(lt=e._limitOffset(lt,e.options.maxBounds),V(function(){e.panBy(lt,{duration:q,easeLinearity:g,noMoveStart:!0,animate:!0})}))}}});yt.addInitHook("addHandler","dragging",gs),yt.mergeOptions({keyboard:!0,keyboardPanDelta:80});var vs=He.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(t){this._map=t,this._setPanDelta(t.options.keyboardPanDelta),this._setZoomDelta(t.options.zoomDelta)},addHooks:function(){var t=this._map._container;t.tabIndex<=0&&(t.tabIndex="0"),Q(t,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),$t(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var t=document.body,e=document.documentElement,n=t.scrollTop||e.scrollTop,o=t.scrollLeft||e.scrollLeft;this._map._container.focus(),window.scrollTo(o,n)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(t){var e=this._panKeys={},n=this.keyCodes,o,h;for(o=0,h=n.left.length;o<h;o++)e[n.left[o]]=[-1*t,0];for(o=0,h=n.right.length;o<h;o++)e[n.right[o]]=[t,0];for(o=0,h=n.down.length;o<h;o++)e[n.down[o]]=[0,t];for(o=0,h=n.up.length;o<h;o++)e[n.up[o]]=[0,-1*t]},_setZoomDelta:function(t){var e=this._zoomKeys={},n=this.keyCodes,o,h;for(o=0,h=n.zoomIn.length;o<h;o++)e[n.zoomIn[o]]=t;for(o=0,h=n.zoomOut.length;o<h;o++)e[n.zoomOut[o]]=-t},_addHooks:function(){Q(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){$t(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(t){if(!(t.altKey||t.ctrlKey||t.metaKey)){var e=t.keyCode,n=this._map,o;if(e in this._panKeys){if(!n._panAnim||!n._panAnim._inProgress)if(o=this._panKeys[e],t.shiftKey&&(o=$(o).multiplyBy(3)),n.options.maxBounds&&(o=n._limitOffset($(o),n.options.maxBounds)),n.options.worldCopyJump){var h=n.wrapLatLng(n.unproject(n.project(n.getCenter()).add(o)));n.panTo(h)}else n.panBy(o)}else if(e in this._zoomKeys)n.setZoom(n.getZoom()+(t.shiftKey?3:1)*this._zoomKeys[e]);else if(e===27&&n._popup&&n._popup.options.closeOnEscapeKey)n.closePopup();else return;vi(t)}}});yt.addInitHook("addHandler","keyboard",vs),yt.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var ys=He.extend({addHooks:function(){Q(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){$t(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(t){var e=Ur(t),n=this._map.options.wheelDebounceTime;this._delta+=e,this._lastMousePos=this._map.mouseEventToContainerPoint(t),this._startTime||(this._startTime=+new Date);var o=Math.max(n-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(l(this._performZoom,this),o),vi(t)},_performZoom:function(){var t=this._map,e=t.getZoom(),n=this._map.options.zoomSnap||0;t._stop();var o=this._delta/(this._map.options.wheelPxPerZoomLevel*4),h=4*Math.log(2/(1+Math.exp(-Math.abs(o))))/Math.LN2,u=n?Math.ceil(h/n)*n:h,g=t._limitZoom(e+(this._delta>0?u:-u))-e;this._delta=0,this._startTime=null,g&&(t.options.scrollWheelZoom==="center"?t.setZoom(e+g):t.setZoomAround(this._lastMousePos,e+g))}});yt.addInitHook("addHandler","scrollWheelZoom",ys);var _a=600;yt.mergeOptions({tapHold:N.touchNative&&N.safari&&N.mobile,tapTolerance:15});var bs=He.extend({addHooks:function(){Q(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){$t(this._map._container,"touchstart",this._onDown,this)},_onDown:function(t){if(clearTimeout(this._holdTimeout),t.touches.length===1){var e=t.touches[0];this._startPos=this._newPos=new S(e.clientX,e.clientY),this._holdTimeout=setTimeout(l(function(){this._cancel(),this._isTapValid()&&(Q(document,"touchend",de),Q(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",e))},this),_a),Q(document,"touchend touchcancel contextmenu",this._cancel,this),Q(document,"touchmove",this._onMove,this)}},_cancelClickPrevent:function t(){$t(document,"touchend",de),$t(document,"touchend touchcancel",t)},_cancel:function(){clearTimeout(this._holdTimeout),$t(document,"touchend touchcancel contextmenu",this._cancel,this),$t(document,"touchmove",this._onMove,this)},_onMove:function(t){var e=t.touches[0];this._newPos=new S(e.clientX,e.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(t,e){var n=new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window,screenX:e.screenX,screenY:e.screenY,clientX:e.clientX,clientY:e.clientY});n._simulated=!0,e.target.dispatchEvent(n)}});yt.addInitHook("addHandler","tapHold",bs),yt.mergeOptions({touchZoom:N.touch,bounceAtZoomLimits:!0});var xs=He.extend({addHooks:function(){X(this._map._container,"leaflet-touch-zoom"),Q(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){St(this._map._container,"leaflet-touch-zoom"),$t(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(t){var e=this._map;if(!(!t.touches||t.touches.length!==2||e._animatingZoom||this._zooming)){var n=e.mouseEventToContainerPoint(t.touches[0]),o=e.mouseEventToContainerPoint(t.touches[1]);this._centerPoint=e.getSize()._divideBy(2),this._startLatLng=e.containerPointToLatLng(this._centerPoint),e.options.touchZoom!=="center"&&(this._pinchStartLatLng=e.containerPointToLatLng(n.add(o)._divideBy(2))),this._startDist=n.distanceTo(o),this._startZoom=e.getZoom(),this._moved=!1,this._zooming=!0,e._stop(),Q(document,"touchmove",this._onTouchMove,this),Q(document,"touchend touchcancel",this._onTouchEnd,this),de(t)}},_onTouchMove:function(t){if(!(!t.touches||t.touches.length!==2||!this._zooming)){var e=this._map,n=e.mouseEventToContainerPoint(t.touches[0]),o=e.mouseEventToContainerPoint(t.touches[1]),h=n.distanceTo(o)/this._startDist;if(this._zoom=e.getScaleZoom(h,this._startZoom),!e.options.bounceAtZoomLimits&&(this._zoom<e.getMinZoom()&&h<1||this._zoom>e.getMaxZoom()&&h>1)&&(this._zoom=e._limitZoom(this._zoom)),e.options.touchZoom==="center"){if(this._center=this._startLatLng,h===1)return}else{var u=n._add(o)._divideBy(2)._subtract(this._centerPoint);if(h===1&&u.x===0&&u.y===0)return;this._center=e.unproject(e.project(this._pinchStartLatLng,this._zoom).subtract(u),this._zoom)}this._moved||(e._moveStart(!0,!1),this._moved=!0),tt(this._animRequest);var g=l(e._move,e,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=V(g,this,!0),de(t)}},_onTouchEnd:function(){if(!this._moved||!this._zooming){this._zooming=!1;return}this._zooming=!1,tt(this._animRequest),$t(document,"touchmove",this._onTouchMove,this),$t(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))}});yt.addInitHook("addHandler","touchZoom",xs),yt.BoxZoom=_s,yt.DoubleClickZoom=ms,yt.Drag=gs,yt.Keyboard=vs,yt.ScrollWheelZoom=ys,yt.TapHold=bs,yt.TouchZoom=xs,a.Bounds=U,a.Browser=N,a.CRS=R,a.Canvas=ds,a.Circle=dr,a.CircleMarker=kn,a.Class=G,a.Control=Ie,a.DivIcon=ls,a.DivOverlay=Ue,a.DomEvent=Oo,a.DomUtil=Eo,a.Draggable=ai,a.Evented=Lt,a.FeatureGroup=Ke,a.GeoJSON=Je,a.GridLayer=Xi,a.Handler=He,a.Icon=zi,a.ImageOverlay=Tn,a.LatLng=K,a.LatLngBounds=at,a.Layer=Ne,a.LayerGroup=Ti,a.LineUtil=qo,a.Map=yt,a.Marker=Ln,a.Mixin=Fo,a.Path=li,a.Point=S,a.PolyUtil=Ro,a.Polygon=Ei,a.Polyline=Ye,a.Popup=zn,a.PosAnimation=Gr,a.Projection=Vo,a.Rectangle=fs,a.Renderer=Xe,a.SVG=tn,a.SVGOverlay=as,a.TileLayer=Oi,a.Tooltip=En,a.Transformation=xt,a.Util=pt,a.VideoOverlay=os,a.bind=l,a.bounds=dt,a.canvas=us,a.circle=ea,a.circleMarker=ta,a.control=Ki,a.divIcon=ca,a.extend=s,a.featureGroup=Jo,a.geoJSON=ss,a.geoJson=ra,a.gridLayer=da,a.icon=Xo,a.imageOverlay=sa,a.latLng=H,a.latLngBounds=I,a.layerGroup=Yo,a.map=Ao,a.marker=Qo,a.point=$,a.polygon=na,a.polyline=ia,a.popup=la,a.rectangle=fa,a.setOptions=w,a.stamp=d,a.svg=ps,a.svgOverlay=aa,a.tileLayer=hs,a.tooltip=ha,a.transformation=et,a.version=i,a.videoOverlay=oa;var ma=window.L;a.noConflict=function(){return window.L=ma,this},window.L=a})});var qs=Ps((Bn,Ws)=>{(function(a,i){typeof Bn=="object"&&typeof Ws<"u"?i(Bn):typeof define=="function"&&define.amd?define(["exports"],i):(a=a||self,i((a.Leaflet=a.Leaflet||{},a.Leaflet.markercluster={})))})(Bn,function(a){"use strict";var i=L.MarkerClusterGroup=L.FeatureGroup.extend({options:{maxClusterRadius:80,iconCreateFunction:null,clusterPane:L.Marker.prototype.options.pane,spiderfyOnEveryZoom:!1,spiderfyOnMaxZoom:!0,showCoverageOnHover:!0,zoomToBoundsOnClick:!0,singleMarkerMode:!1,disableClusteringAtZoom:null,removeOutsideVisibleBounds:!0,animate:!0,animateAddingMarkers:!1,spiderfyShapePositions:null,spiderfyDistanceMultiplier:1,spiderLegPolylineOptions:{weight:1.5,color:"#222",opacity:.5},chunkedLoading:!1,chunkInterval:200,chunkDelay:50,chunkProgress:null,polygonOptions:{}},initialize:function(r){L.Util.setOptions(this,r),this.options.iconCreateFunction||(this.options.iconCreateFunction=this._defaultIconCreateFunction),this._featureGroup=L.featureGroup(),this._featureGroup.addEventParent(this),this._nonPointGroup=L.featureGroup(),this._nonPointGroup.addEventParent(this),this._inZoomAnimation=0,this._needsClustering=[],this._needsRemoving=[],this._currentShownBounds=null,this._queue=[],this._childMarkerEventHandlers={dragstart:this._childMarkerDragStart,move:this._childMarkerMoved,dragend:this._childMarkerDragEnd};var l=L.DomUtil.TRANSITION&&this.options.animate;L.extend(this,l?this._withAnimation:this._noAnimation),this._markerCluster=l?L.MarkerCluster:L.MarkerClusterNonAnimated},addLayer:function(r){if(r instanceof L.LayerGroup)return this.addLayers([r]);if(!r.getLatLng)return this._nonPointGroup.addLayer(r),this.fire("layeradd",{layer:r}),this;if(!this._map)return this._needsClustering.push(r),this.fire("layeradd",{layer:r}),this;if(this.hasLayer(r))return this;this._unspiderfy&&this._unspiderfy(),this._addLayer(r,this._maxZoom),this.fire("layeradd",{layer:r}),this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons();var l=r,c=this._zoom;if(r.__parent)for(;l.__parent._zoom>=c;)l=l.__parent;return this._currentShownBounds.contains(l.getLatLng())&&(this.options.animateAddingMarkers?this._animationAddLayer(r,l):this._animationAddLayerNonAnimated(r,l)),this},removeLayer:function(r){return r instanceof L.LayerGroup?this.removeLayers([r]):r.getLatLng?this._map?r.__parent?(this._unspiderfy&&(this._unspiderfy(),this._unspiderfyLayer(r)),this._removeLayer(r,!0),this.fire("layerremove",{layer:r}),this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),r.off(this._childMarkerEventHandlers,this),this._featureGroup.hasLayer(r)&&(this._featureGroup.removeLayer(r),r.clusterShow&&r.clusterShow()),this):this:(!this._arraySplice(this._needsClustering,r)&&this.hasLayer(r)&&this._needsRemoving.push({layer:r,latlng:r._latlng}),this.fire("layerremove",{layer:r}),this):(this._nonPointGroup.removeLayer(r),this.fire("layerremove",{layer:r}),this)},addLayers:function(r,l){if(!L.Util.isArray(r))return this.addLayer(r);var c=this._featureGroup,d=this._nonPointGroup,_=this.options.chunkedLoading,f=this.options.chunkInterval,m=this.options.chunkProgress,y=r.length,v=0,x=!0,w;if(this._map){var T=new Date().getTime(),z=L.bind(function(){var O=new Date().getTime();for(this._map&&this._unspiderfy&&this._unspiderfy();v<y;v++){if(_&&v%200===0){var Y=new Date().getTime()-O;if(Y>f)break}if(w=r[v],w instanceof L.LayerGroup){x&&(r=r.slice(),x=!1),this._extractNonGroupLayers(w,r),y=r.length;continue}if(!w.getLatLng){d.addLayer(w),l||this.fire("layeradd",{layer:w});continue}if(!this.hasLayer(w)&&(this._addLayer(w,this._maxZoom),l||this.fire("layeradd",{layer:w}),w.__parent&&w.__parent.getChildCount()===2)){var W=w.__parent.getAllChildMarkers(),st=W[0]===w?W[1]:W[0];c.removeLayer(st)}}m&&m(v,y,new Date().getTime()-T),v===y?(this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds)):setTimeout(z,this.options.chunkDelay)},this);z()}else for(var B=this._needsClustering;v<y;v++){if(w=r[v],w instanceof L.LayerGroup){x&&(r=r.slice(),x=!1),this._extractNonGroupLayers(w,r),y=r.length;continue}if(!w.getLatLng){d.addLayer(w);continue}this.hasLayer(w)||B.push(w)}return this},removeLayers:function(r){var l,c,d=r.length,_=this._featureGroup,f=this._nonPointGroup,m=!0;if(!this._map){for(l=0;l<d;l++){if(c=r[l],c instanceof L.LayerGroup){m&&(r=r.slice(),m=!1),this._extractNonGroupLayers(c,r),d=r.length;continue}this._arraySplice(this._needsClustering,c),f.removeLayer(c),this.hasLayer(c)&&this._needsRemoving.push({layer:c,latlng:c._latlng}),this.fire("layerremove",{layer:c})}return this}if(this._unspiderfy){this._unspiderfy();var y=r.slice(),v=d;for(l=0;l<v;l++){if(c=y[l],c instanceof L.LayerGroup){this._extractNonGroupLayers(c,y),v=y.length;continue}this._unspiderfyLayer(c)}}for(l=0;l<d;l++){if(c=r[l],c instanceof L.LayerGroup){m&&(r=r.slice(),m=!1),this._extractNonGroupLayers(c,r),d=r.length;continue}if(!c.__parent){f.removeLayer(c),this.fire("layerremove",{layer:c});continue}this._removeLayer(c,!0,!0),this.fire("layerremove",{layer:c}),_.hasLayer(c)&&(_.removeLayer(c),c.clusterShow&&c.clusterShow())}return this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds),this},clearLayers:function(){return this._map||(this._needsClustering=[],this._needsRemoving=[],delete this._gridClusters,delete this._gridUnclustered),this._noanimationUnspiderfy&&this._noanimationUnspiderfy(),this._featureGroup.clearLayers(),this._nonPointGroup.clearLayers(),this.eachLayer(function(r){r.off(this._childMarkerEventHandlers,this),delete r.__parent},this),this._map&&this._generateInitialClusters(),this},getBounds:function(){var r=new L.LatLngBounds;this._topClusterLevel&&r.extend(this._topClusterLevel._bounds);for(var l=this._needsClustering.length-1;l>=0;l--)r.extend(this._needsClustering[l].getLatLng());return r.extend(this._nonPointGroup.getBounds()),r},eachLayer:function(r,l){var c=this._needsClustering.slice(),d=this._needsRemoving,_,f,m;for(this._topClusterLevel&&this._topClusterLevel.getAllChildMarkers(c),f=c.length-1;f>=0;f--){for(_=!0,m=d.length-1;m>=0;m--)if(d[m].layer===c[f]){_=!1;break}_&&r.call(l,c[f])}this._nonPointGroup.eachLayer(r,l)},getLayers:function(){var r=[];return this.eachLayer(function(l){r.push(l)}),r},getLayer:function(r){var l=null;return r=parseInt(r,10),this.eachLayer(function(c){L.stamp(c)===r&&(l=c)}),l},hasLayer:function(r){if(!r)return!1;var l,c=this._needsClustering;for(l=c.length-1;l>=0;l--)if(c[l]===r)return!0;for(c=this._needsRemoving,l=c.length-1;l>=0;l--)if(c[l].layer===r)return!1;return!!(r.__parent&&r.__parent._group===this)||this._nonPointGroup.hasLayer(r)},zoomToShowLayer:function(r,l){var c=this._map;typeof l!="function"&&(l=function(){});var d=function(){(c.hasLayer(r)||c.hasLayer(r.__parent))&&!this._inZoomAnimation&&(this._map.off("moveend",d,this),this.off("animationend",d,this),c.hasLayer(r)?l():r.__parent._icon&&(this.once("spiderfied",l,this),r.__parent.spiderfy()))};r._icon&&this._map.getBounds().contains(r.getLatLng())?l():r.__parent._zoom<Math.round(this._map._zoom)?(this._map.on("moveend",d,this),this._map.panTo(r.getLatLng())):(this._map.on("moveend",d,this),this.on("animationend",d,this),r.__parent.zoomToBounds())},onAdd:function(r){this._map=r;var l,c,d;if(!isFinite(this._map.getMaxZoom()))throw"Map has no maxZoom specified";for(this._featureGroup.addTo(r),this._nonPointGroup.addTo(r),this._gridClusters||this._generateInitialClusters(),this._maxLat=r.options.crs.projection.MAX_LATITUDE,l=0,c=this._needsRemoving.length;l<c;l++)d=this._needsRemoving[l],d.newlatlng=d.layer._latlng,d.layer._latlng=d.latlng;for(l=0,c=this._needsRemoving.length;l<c;l++)d=this._needsRemoving[l],this._removeLayer(d.layer,!0),d.layer._latlng=d.newlatlng;this._needsRemoving=[],this._zoom=Math.round(this._map._zoom),this._currentShownBounds=this._getExpandedVisibleBounds(),this._map.on("zoomend",this._zoomEnd,this),this._map.on("moveend",this._moveEnd,this),this._spiderfierOnAdd&&this._spiderfierOnAdd(),this._bindEvents(),c=this._needsClustering,this._needsClustering=[],this.addLayers(c,!0)},onRemove:function(r){r.off("zoomend",this._zoomEnd,this),r.off("moveend",this._moveEnd,this),this._unbindEvents(),this._map._mapPane.className=this._map._mapPane.className.replace(" leaflet-cluster-anim",""),this._spiderfierOnRemove&&this._spiderfierOnRemove(),delete this._maxLat,this._hideCoverage(),this._featureGroup.remove(),this._nonPointGroup.remove(),this._featureGroup.clearLayers(),this._map=null},getVisibleParent:function(r){for(var l=r;l&&!l._icon;)l=l.__parent;return l||null},_arraySplice:function(r,l){for(var c=r.length-1;c>=0;c--)if(r[c]===l)return r.splice(c,1),!0},_removeFromGridUnclustered:function(r,l){for(var c=this._map,d=this._gridUnclustered,_=Math.floor(this._map.getMinZoom());l>=_&&d[l].removeObject(r,c.project(r.getLatLng(),l));l--);},_childMarkerDragStart:function(r){r.target.__dragStart=r.target._latlng},_childMarkerMoved:function(r){if(!this._ignoreMove&&!r.target.__dragStart){var l=r.target._popup&&r.target._popup.isOpen();this._moveChild(r.target,r.oldLatLng,r.latlng),l&&r.target.openPopup()}},_moveChild:function(r,l,c){r._latlng=l,this.removeLayer(r),r._latlng=c,this.addLayer(r)},_childMarkerDragEnd:function(r){var l=r.target.__dragStart;delete r.target.__dragStart,l&&this._moveChild(r.target,l,r.target._latlng)},_removeLayer:function(r,l,c){var d=this._gridClusters,_=this._gridUnclustered,f=this._featureGroup,m=this._map,y=Math.floor(this._map.getMinZoom());l&&this._removeFromGridUnclustered(r,this._maxZoom);var v=r.__parent,x=v._markers,w;for(this._arraySplice(x,r);v&&(v._childCount--,v._boundsNeedUpdate=!0,!(v._zoom<y));)l&&v._childCount<=1?(w=v._markers[0]===r?v._markers[1]:v._markers[0],d[v._zoom].removeObject(v,m.project(v._cLatLng,v._zoom)),_[v._zoom].addObject(w,m.project(w.getLatLng(),v._zoom)),this._arraySplice(v.__parent._childClusters,v),v.__parent._markers.push(w),w.__parent=v.__parent,v._icon&&(f.removeLayer(v),c||f.addLayer(w))):v._iconNeedsUpdate=!0,v=v.__parent;delete r.__parent},_isOrIsParent:function(r,l){for(;l;){if(r===l)return!0;l=l.parentNode}return!1},fire:function(r,l,c){if(l&&l.layer instanceof L.MarkerCluster){if(l.originalEvent&&this._isOrIsParent(l.layer._icon,l.originalEvent.relatedTarget))return;r="cluster"+r}L.FeatureGroup.prototype.fire.call(this,r,l,c)},listens:function(r,l){return L.FeatureGroup.prototype.listens.call(this,r,l)||L.FeatureGroup.prototype.listens.call(this,"cluster"+r,l)},_defaultIconCreateFunction:function(r){var l=r.getChildCount(),c=" marker-cluster-";return l<10?c+="small":l<100?c+="medium":c+="large",new L.DivIcon({html:"<div><span>"+l+"</span></div>",className:"marker-cluster"+c,iconSize:new L.Point(40,40)})},_bindEvents:function(){var r=this._map,l=this.options.spiderfyOnMaxZoom,c=this.options.showCoverageOnHover,d=this.options.zoomToBoundsOnClick,_=this.options.spiderfyOnEveryZoom;(l||d||_)&&this.on("clusterclick clusterkeypress",this._zoomOrSpiderfy,this),c&&(this.on("clustermouseover",this._showCoverage,this),this.on("clustermouseout",this._hideCoverage,this),r.on("zoomend",this._hideCoverage,this))},_zoomOrSpiderfy:function(r){var l=r.layer,c=l;if(!(r.type==="clusterkeypress"&&r.originalEvent&&r.originalEvent.keyCode!==13)){for(;c._childClusters.length===1;)c=c._childClusters[0];c._zoom===this._maxZoom&&c._childCount===l._childCount&&this.options.spiderfyOnMaxZoom?l.spiderfy():this.options.zoomToBoundsOnClick&&l.zoomToBounds(),this.options.spiderfyOnEveryZoom&&l.spiderfy(),r.originalEvent&&r.originalEvent.keyCode===13&&this._map._container.focus()}},_showCoverage:function(r){var l=this._map;this._inZoomAnimation||(this._shownPolygon&&l.removeLayer(this._shownPolygon),r.layer.getChildCount()>2&&r.layer!==this._spiderfied&&(this._shownPolygon=new L.Polygon(r.layer.getConvexHull(),this.options.polygonOptions),l.addLayer(this._shownPolygon)))},_hideCoverage:function(){this._shownPolygon&&(this._map.removeLayer(this._shownPolygon),this._shownPolygon=null)},_unbindEvents:function(){var r=this.options.spiderfyOnMaxZoom,l=this.options.showCoverageOnHover,c=this.options.zoomToBoundsOnClick,d=this.options.spiderfyOnEveryZoom,_=this._map;(r||c||d)&&this.off("clusterclick clusterkeypress",this._zoomOrSpiderfy,this),l&&(this.off("clustermouseover",this._showCoverage,this),this.off("clustermouseout",this._hideCoverage,this),_.off("zoomend",this._hideCoverage,this))},_zoomEnd:function(){this._map&&(this._mergeSplitClusters(),this._zoom=Math.round(this._map._zoom),this._currentShownBounds=this._getExpandedVisibleBounds())},_moveEnd:function(){if(!this._inZoomAnimation){var r=this._getExpandedVisibleBounds();this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),this._zoom,r),this._topClusterLevel._recursivelyAddChildrenToMap(null,Math.round(this._map._zoom),r),this._currentShownBounds=r}},_generateInitialClusters:function(){var r=Math.ceil(this._map.getMaxZoom()),l=Math.floor(this._map.getMinZoom()),c=this.options.maxClusterRadius,d=c;typeof c!="function"&&(d=function(){return c}),this.options.disableClusteringAtZoom!==null&&(r=this.options.disableClusteringAtZoom-1),this._maxZoom=r,this._gridClusters={},this._gridUnclustered={};for(var _=r;_>=l;_--)this._gridClusters[_]=new L.DistanceGrid(d(_)),this._gridUnclustered[_]=new L.DistanceGrid(d(_));this._topClusterLevel=new this._markerCluster(this,l-1)},_addLayer:function(r,l){var c=this._gridClusters,d=this._gridUnclustered,_=Math.floor(this._map.getMinZoom()),f,m;for(this.options.singleMarkerMode&&this._overrideMarkerIcon(r),r.on(this._childMarkerEventHandlers,this);l>=_;l--){f=this._map.project(r.getLatLng(),l);var y=c[l].getNearObject(f);if(y){y._addChild(r),r.__parent=y;return}if(y=d[l].getNearObject(f),y){var v=y.__parent;v&&this._removeLayer(y,!1);var x=new this._markerCluster(this,l,y,r);c[l].addObject(x,this._map.project(x._cLatLng,l)),y.__parent=x,r.__parent=x;var w=x;for(m=l-1;m>v._zoom;m--)w=new this._markerCluster(this,m,w),c[m].addObject(w,this._map.project(y.getLatLng(),m));v._addChild(w),this._removeFromGridUnclustered(y,l);return}d[l].addObject(r,f)}this._topClusterLevel._addChild(r),r.__parent=this._topClusterLevel},_refreshClustersIcons:function(){this._featureGroup.eachLayer(function(r){r instanceof L.MarkerCluster&&r._iconNeedsUpdate&&r._updateIcon()})},_enqueue:function(r){this._queue.push(r),this._queueTimeout||(this._queueTimeout=setTimeout(L.bind(this._processQueue,this),300))},_processQueue:function(){for(var r=0;r<this._queue.length;r++)this._queue[r].call(this);this._queue.length=0,clearTimeout(this._queueTimeout),this._queueTimeout=null},_mergeSplitClusters:function(){var r=Math.round(this._map._zoom);this._processQueue(),this._zoom<r&&this._currentShownBounds.intersects(this._getExpandedVisibleBounds())?(this._animationStart(),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),this._zoom,this._getExpandedVisibleBounds()),this._animationZoomIn(this._zoom,r)):this._zoom>r?(this._animationStart(),this._animationZoomOut(this._zoom,r)):this._moveEnd()},_getExpandedVisibleBounds:function(){if(this.options.removeOutsideVisibleBounds){if(L.Browser.mobile)return this._checkBoundsMaxLat(this._map.getBounds())}else return this._mapBoundsInfinite;return this._checkBoundsMaxLat(this._map.getBounds().pad(1))},_checkBoundsMaxLat:function(r){var l=this._maxLat;return l!==void 0&&(r.getNorth()>=l&&(r._northEast.lat=1/0),r.getSouth()<=-l&&(r._southWest.lat=-1/0)),r},_animationAddLayerNonAnimated:function(r,l){if(l===r)this._featureGroup.addLayer(r);else if(l._childCount===2){l._addToMap();var c=l.getAllChildMarkers();this._featureGroup.removeLayer(c[0]),this._featureGroup.removeLayer(c[1])}else l._updateIcon()},_extractNonGroupLayers:function(r,l){var c=r.getLayers(),d=0,_;for(l=l||[];d<c.length;d++){if(_=c[d],_ instanceof L.LayerGroup){this._extractNonGroupLayers(_,l);continue}l.push(_)}return l},_overrideMarkerIcon:function(r){var l=r.options.icon=this.options.iconCreateFunction({getChildCount:function(){return 1},getAllChildMarkers:function(){return[r]}});return l}});L.MarkerClusterGroup.include({_mapBoundsInfinite:new L.LatLngBounds(new L.LatLng(-1/0,-1/0),new L.LatLng(1/0,1/0))}),L.MarkerClusterGroup.include({_noAnimation:{_animationStart:function(){},_animationZoomIn:function(r,l){this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),r),this._topClusterLevel._recursivelyAddChildrenToMap(null,l,this._getExpandedVisibleBounds()),this.fire("animationend")},_animationZoomOut:function(r,l){this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),r),this._topClusterLevel._recursivelyAddChildrenToMap(null,l,this._getExpandedVisibleBounds()),this.fire("animationend")},_animationAddLayer:function(r,l){this._animationAddLayerNonAnimated(r,l)}},_withAnimation:{_animationStart:function(){this._map._mapPane.className+=" leaflet-cluster-anim",this._inZoomAnimation++},_animationZoomIn:function(r,l){var c=this._getExpandedVisibleBounds(),d=this._featureGroup,_=Math.floor(this._map.getMinZoom()),f;this._ignoreMove=!0,this._topClusterLevel._recursively(c,r,_,function(m){var y=m._latlng,v=m._markers,x;for(c.contains(y)||(y=null),m._isSingleParent()&&r+1===l?(d.removeLayer(m),m._recursivelyAddChildrenToMap(null,l,c)):(m.clusterHide(),m._recursivelyAddChildrenToMap(y,l,c)),f=v.length-1;f>=0;f--)x=v[f],c.contains(x._latlng)||d.removeLayer(x)}),this._forceLayout(),this._topClusterLevel._recursivelyBecomeVisible(c,l),d.eachLayer(function(m){!(m instanceof L.MarkerCluster)&&m._icon&&m.clusterShow()}),this._topClusterLevel._recursively(c,r,l,function(m){m._recursivelyRestoreChildPositions(l)}),this._ignoreMove=!1,this._enqueue(function(){this._topClusterLevel._recursively(c,r,_,function(m){d.removeLayer(m),m.clusterShow()}),this._animationEnd()})},_animationZoomOut:function(r,l){this._animationZoomOutSingle(this._topClusterLevel,r-1,l),this._topClusterLevel._recursivelyAddChildrenToMap(null,l,this._getExpandedVisibleBounds()),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),r,this._getExpandedVisibleBounds())},_animationAddLayer:function(r,l){var c=this,d=this._featureGroup;d.addLayer(r),l!==r&&(l._childCount>2?(l._updateIcon(),this._forceLayout(),this._animationStart(),r._setPos(this._map.latLngToLayerPoint(l.getLatLng())),r.clusterHide(),this._enqueue(function(){d.removeLayer(r),r.clusterShow(),c._animationEnd()})):(this._forceLayout(),c._animationStart(),c._animationZoomOutSingle(l,this._map.getMaxZoom(),this._zoom)))}},_animationZoomOutSingle:function(r,l,c){var d=this._getExpandedVisibleBounds(),_=Math.floor(this._map.getMinZoom());r._recursivelyAnimateChildrenInAndAddSelfToMap(d,_,l+1,c);var f=this;this._forceLayout(),r._recursivelyBecomeVisible(d,c),this._enqueue(function(){if(r._childCount===1){var m=r._markers[0];this._ignoreMove=!0,m.setLatLng(m.getLatLng()),this._ignoreMove=!1,m.clusterShow&&m.clusterShow()}else r._recursively(d,c,_,function(y){y._recursivelyRemoveChildrenFromMap(d,_,l+1)});f._animationEnd()})},_animationEnd:function(){this._map&&(this._map._mapPane.className=this._map._mapPane.className.replace(" leaflet-cluster-anim","")),this._inZoomAnimation--,this.fire("animationend")},_forceLayout:function(){L.Util.falseFn(document.body.offsetWidth)}}),L.markerClusterGroup=function(r){return new L.MarkerClusterGroup(r)};var s=L.MarkerCluster=L.Marker.extend({options:L.Icon.prototype.options,initialize:function(r,l,c,d){L.Marker.prototype.initialize.call(this,c?c._cLatLng||c.getLatLng():new L.LatLng(0,0),{icon:this,pane:r.options.clusterPane}),this._group=r,this._zoom=l,this._markers=[],this._childClusters=[],this._childCount=0,this._iconNeedsUpdate=!0,this._boundsNeedUpdate=!0,this._bounds=new L.LatLngBounds,c&&this._addChild(c),d&&this._addChild(d)},getAllChildMarkers:function(r,l){r=r||[];for(var c=this._childClusters.length-1;c>=0;c--)this._childClusters[c].getAllChildMarkers(r,l);for(var d=this._markers.length-1;d>=0;d--)l&&this._markers[d].__dragStart||r.push(this._markers[d]);return r},getChildCount:function(){return this._childCount},zoomToBounds:function(r){for(var l=this._childClusters.slice(),c=this._group._map,d=c.getBoundsZoom(this._bounds),_=this._zoom+1,f=c.getZoom(),m;l.length>0&&d>_;){_++;var y=[];for(m=0;m<l.length;m++)y=y.concat(l[m]._childClusters);l=y}d>_?this._group._map.setView(this._latlng,_):d<=f?this._group._map.setView(this._latlng,f+1):this._group._map.fitBounds(this._bounds,r)},getBounds:function(){var r=new L.LatLngBounds;return r.extend(this._bounds),r},_updateIcon:function(){this._iconNeedsUpdate=!0,this._icon&&this.setIcon(this)},createIcon:function(){return this._iconNeedsUpdate&&(this._iconObj=this._group.options.iconCreateFunction(this),this._iconNeedsUpdate=!1),this._iconObj.createIcon()},createShadow:function(){return this._iconObj.createShadow()},_addChild:function(r,l){this._iconNeedsUpdate=!0,this._boundsNeedUpdate=!0,this._setClusterCenter(r),r instanceof L.MarkerCluster?(l||(this._childClusters.push(r),r.__parent=this),this._childCount+=r._childCount):(l||this._markers.push(r),this._childCount++),this.__parent&&this.__parent._addChild(r,!0)},_setClusterCenter:function(r){this._cLatLng||(this._cLatLng=r._cLatLng||r._latlng)},_resetBounds:function(){var r=this._bounds;r._southWest&&(r._southWest.lat=1/0,r._southWest.lng=1/0),r._northEast&&(r._northEast.lat=-1/0,r._northEast.lng=-1/0)},_recalculateBounds:function(){var r=this._markers,l=this._childClusters,c=0,d=0,_=this._childCount,f,m,y,v;if(_!==0){for(this._resetBounds(),f=0;f<r.length;f++)y=r[f]._latlng,this._bounds.extend(y),c+=y.lat,d+=y.lng;for(f=0;f<l.length;f++)m=l[f],m._boundsNeedUpdate&&m._recalculateBounds(),this._bounds.extend(m._bounds),y=m._wLatLng,v=m._childCount,c+=y.lat*v,d+=y.lng*v;this._latlng=this._wLatLng=new L.LatLng(c/_,d/_),this._boundsNeedUpdate=!1}},_addToMap:function(r){r&&(this._backupLatlng=this._latlng,this.setLatLng(r)),this._group._featureGroup.addLayer(this)},_recursivelyAnimateChildrenIn:function(r,l,c){this._recursively(r,this._group._map.getMinZoom(),c-1,function(d){var _=d._markers,f,m;for(f=_.length-1;f>=0;f--)m=_[f],m._icon&&(m._setPos(l),m.clusterHide())},function(d){var _=d._childClusters,f,m;for(f=_.length-1;f>=0;f--)m=_[f],m._icon&&(m._setPos(l),m.clusterHide())})},_recursivelyAnimateChildrenInAndAddSelfToMap:function(r,l,c,d){this._recursively(r,d,l,function(_){_._recursivelyAnimateChildrenIn(r,_._group._map.latLngToLayerPoint(_.getLatLng()).round(),c),_._isSingleParent()&&c-1===d?(_.clusterShow(),_._recursivelyRemoveChildrenFromMap(r,l,c)):_.clusterHide(),_._addToMap()})},_recursivelyBecomeVisible:function(r,l){this._recursively(r,this._group._map.getMinZoom(),l,null,function(c){c.clusterShow()})},_recursivelyAddChildrenToMap:function(r,l,c){this._recursively(c,this._group._map.getMinZoom()-1,l,function(d){if(l!==d._zoom)for(var _=d._markers.length-1;_>=0;_--){var f=d._markers[_];c.contains(f._latlng)&&(r&&(f._backupLatlng=f.getLatLng(),f.setLatLng(r),f.clusterHide&&f.clusterHide()),d._group._featureGroup.addLayer(f))}},function(d){d._addToMap(r)})},_recursivelyRestoreChildPositions:function(r){for(var l=this._markers.length-1;l>=0;l--){var c=this._markers[l];c._backupLatlng&&(c.setLatLng(c._backupLatlng),delete c._backupLatlng)}if(r-1===this._zoom)for(var d=this._childClusters.length-1;d>=0;d--)this._childClusters[d]._restorePosition();else for(var _=this._childClusters.length-1;_>=0;_--)this._childClusters[_]._recursivelyRestoreChildPositions(r)},_restorePosition:function(){this._backupLatlng&&(this.setLatLng(this._backupLatlng),delete this._backupLatlng)},_recursivelyRemoveChildrenFromMap:function(r,l,c,d){var _,f;this._recursively(r,l-1,c-1,function(m){for(f=m._markers.length-1;f>=0;f--)_=m._markers[f],(!d||!d.contains(_._latlng))&&(m._group._featureGroup.removeLayer(_),_.clusterShow&&_.clusterShow())},function(m){for(f=m._childClusters.length-1;f>=0;f--)_=m._childClusters[f],(!d||!d.contains(_._latlng))&&(m._group._featureGroup.removeLayer(_),_.clusterShow&&_.clusterShow())})},_recursively:function(r,l,c,d,_){var f=this._childClusters,m=this._zoom,y,v;if(l<=m&&(d&&d(this),_&&m===c&&_(this)),m<l||m<c)for(y=f.length-1;y>=0;y--)v=f[y],v._boundsNeedUpdate&&v._recalculateBounds(),r.intersects(v._bounds)&&v._recursively(r,l,c,d,_)},_isSingleParent:function(){return this._childClusters.length>0&&this._childClusters[0]._childCount===this._childCount}});L.Marker.include({clusterHide:function(){var r=this.options.opacity;return this.setOpacity(0),this.options.opacity=r,this},clusterShow:function(){return this.setOpacity(this.options.opacity)}}),L.DistanceGrid=function(r){this._cellSize=r,this._sqCellSize=r*r,this._grid={},this._objectPoint={}},L.DistanceGrid.prototype={addObject:function(r,l){var c=this._getCoord(l.x),d=this._getCoord(l.y),_=this._grid,f=_[d]=_[d]||{},m=f[c]=f[c]||[],y=L.Util.stamp(r);this._objectPoint[y]=l,m.push(r)},updateObject:function(r,l){this.removeObject(r),this.addObject(r,l)},removeObject:function(r,l){var c=this._getCoord(l.x),d=this._getCoord(l.y),_=this._grid,f=_[d]=_[d]||{},m=f[c]=f[c]||[],y,v;for(delete this._objectPoint[L.Util.stamp(r)],y=0,v=m.length;y<v;y++)if(m[y]===r)return m.splice(y,1),v===1&&delete f[c],!0},eachObject:function(r,l){var c,d,_,f,m,y,v,x=this._grid;for(c in x){m=x[c];for(d in m)for(y=m[d],_=0,f=y.length;_<f;_++)v=r.call(l,y[_]),v&&(_--,f--)}},getNearObject:function(r){var l=this._getCoord(r.x),c=this._getCoord(r.y),d,_,f,m,y,v,x,w,T=this._objectPoint,z=this._sqCellSize,B=null;for(d=c-1;d<=c+1;d++)if(m=this._grid[d],m){for(_=l-1;_<=l+1;_++)if(y=m[_],y)for(f=0,v=y.length;f<v;f++)x=y[f],w=this._sqDist(T[L.Util.stamp(x)],r),(w<z||w<=z&&B===null)&&(z=w,B=x)}return B},_getCoord:function(r){var l=Math.floor(r/this._cellSize);return isFinite(l)?l:r},_sqDist:function(r,l){var c=l.x-r.x,d=l.y-r.y;return c*c+d*d}},function(){L.QuickHull={getDistant:function(r,l){var c=l[1].lat-l[0].lat,d=l[0].lng-l[1].lng;return d*(r.lat-l[0].lat)+c*(r.lng-l[0].lng)},findMostDistantPointFromBaseLine:function(r,l){var c=0,d=null,_=[],f,m,y;for(f=l.length-1;f>=0;f--){if(m=l[f],y=this.getDistant(m,r),y>0)_.push(m);else continue;y>c&&(c=y,d=m)}return{maxPoint:d,newPoints:_}},buildConvexHull:function(r,l){var c=[],d=this.findMostDistantPointFromBaseLine(r,l);return d.maxPoint?(c=c.concat(this.buildConvexHull([r[0],d.maxPoint],d.newPoints)),c=c.concat(this.buildConvexHull([d.maxPoint,r[1]],d.newPoints)),c):[r[0]]},getConvexHull:function(r){var l=!1,c=!1,d=!1,_=!1,f=null,m=null,y=null,v=null,x=null,w=null,T;for(T=r.length-1;T>=0;T--){var z=r[T];(l===!1||z.lat>l)&&(f=z,l=z.lat),(c===!1||z.lat<c)&&(m=z,c=z.lat),(d===!1||z.lng>d)&&(y=z,d=z.lng),(_===!1||z.lng<_)&&(v=z,_=z.lng)}c!==l?(w=m,x=f):(w=v,x=y);var B=[].concat(this.buildConvexHull([w,x],r),this.buildConvexHull([x,w],r));return B}}}(),L.MarkerCluster.include({getConvexHull:function(){var r=this.getAllChildMarkers(),l=[],c,d;for(d=r.length-1;d>=0;d--)c=r[d].getLatLng(),l.push(c);return L.QuickHull.getConvexHull(l)}}),L.MarkerCluster.include({_2PI:Math.PI*2,_circleFootSeparation:25,_circleStartAngle:0,_spiralFootSeparation:28,_spiralLengthStart:11,_spiralLengthFactor:5,_circleSpiralSwitchover:9,spiderfy:function(){if(!(this._group._spiderfied===this||this._group._inZoomAnimation)){var r=this.getAllChildMarkers(null,!0),l=this._group,c=l._map,d=c.latLngToLayerPoint(this._latlng),_;this._group._unspiderfy(),this._group._spiderfied=this,this._group.options.spiderfyShapePositions?_=this._group.options.spiderfyShapePositions(r.length,d):r.length>=this._circleSpiralSwitchover?_=this._generatePointsSpiral(r.length,d):(d.y+=10,_=this._generatePointsCircle(r.length,d)),this._animationSpiderfy(r,_)}},unspiderfy:function(r){this._group._inZoomAnimation||(this._animationUnspiderfy(r),this._group._spiderfied=null)},_generatePointsCircle:function(r,l){var c=this._group.options.spiderfyDistanceMultiplier*this._circleFootSeparation*(2+r),d=c/this._2PI,_=this._2PI/r,f=[],m,y;for(d=Math.max(d,35),f.length=r,m=0;m<r;m++)y=this._circleStartAngle+m*_,f[m]=new L.Point(l.x+d*Math.cos(y),l.y+d*Math.sin(y))._round();return f},_generatePointsSpiral:function(r,l){var c=this._group.options.spiderfyDistanceMultiplier,d=c*this._spiralLengthStart,_=c*this._spiralFootSeparation,f=c*this._spiralLengthFactor*this._2PI,m=0,y=[],v;for(y.length=r,v=r;v>=0;v--)v<r&&(y[v]=new L.Point(l.x+d*Math.cos(m),l.y+d*Math.sin(m))._round()),m+=_/d+v*5e-4,d+=f/m;return y},_noanimationUnspiderfy:function(){var r=this._group,l=r._map,c=r._featureGroup,d=this.getAllChildMarkers(null,!0),_,f;for(r._ignoreMove=!0,this.setOpacity(1),f=d.length-1;f>=0;f--)_=d[f],c.removeLayer(_),_._preSpiderfyLatlng&&(_.setLatLng(_._preSpiderfyLatlng),delete _._preSpiderfyLatlng),_.setZIndexOffset&&_.setZIndexOffset(0),_._spiderLeg&&(l.removeLayer(_._spiderLeg),delete _._spiderLeg);r.fire("unspiderfied",{cluster:this,markers:d}),r._ignoreMove=!1,r._spiderfied=null}}),L.MarkerClusterNonAnimated=L.MarkerCluster.extend({_animationSpiderfy:function(r,l){var c=this._group,d=c._map,_=c._featureGroup,f=this._group.options.spiderLegPolylineOptions,m,y,v,x;for(c._ignoreMove=!0,m=0;m<r.length;m++)x=d.layerPointToLatLng(l[m]),y=r[m],v=new L.Polyline([this._latlng,x],f),d.addLayer(v),y._spiderLeg=v,y._preSpiderfyLatlng=y._latlng,y.setLatLng(x),y.setZIndexOffset&&y.setZIndexOffset(1e6),_.addLayer(y);this.setOpacity(.3),c._ignoreMove=!1,c.fire("spiderfied",{cluster:this,markers:r})},_animationUnspiderfy:function(){this._noanimationUnspiderfy()}}),L.MarkerCluster.include({_animationSpiderfy:function(r,l){var c=this,d=this._group,_=d._map,f=d._featureGroup,m=this._latlng,y=_.latLngToLayerPoint(m),v=L.Path.SVG,x=L.extend({},this._group.options.spiderLegPolylineOptions),w=x.opacity,T,z,B,O,Y,W;for(w===void 0&&(w=L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity),v?(x.opacity=0,x.className=(x.className||"")+" leaflet-cluster-spider-leg"):x.opacity=w,d._ignoreMove=!0,T=0;T<r.length;T++)z=r[T],W=_.layerPointToLatLng(l[T]),B=new L.Polyline([m,W],x),_.addLayer(B),z._spiderLeg=B,v&&(O=B._path,Y=O.getTotalLength()+.1,O.style.strokeDasharray=Y,O.style.strokeDashoffset=Y),z.setZIndexOffset&&z.setZIndexOffset(1e6),z.clusterHide&&z.clusterHide(),f.addLayer(z),z._setPos&&z._setPos(y);for(d._forceLayout(),d._animationStart(),T=r.length-1;T>=0;T--)W=_.layerPointToLatLng(l[T]),z=r[T],z._preSpiderfyLatlng=z._latlng,z.setLatLng(W),z.clusterShow&&z.clusterShow(),v&&(B=z._spiderLeg,O=B._path,O.style.strokeDashoffset=0,B.setStyle({opacity:w}));this.setOpacity(.3),d._ignoreMove=!1,setTimeout(function(){d._animationEnd(),d.fire("spiderfied",{cluster:c,markers:r})},200)},_animationUnspiderfy:function(r){var l=this,c=this._group,d=c._map,_=c._featureGroup,f=r?d._latLngToNewLayerPoint(this._latlng,r.zoom,r.center):d.latLngToLayerPoint(this._latlng),m=this.getAllChildMarkers(null,!0),y=L.Path.SVG,v,x,w,T,z,B;for(c._ignoreMove=!0,c._animationStart(),this.setOpacity(1),x=m.length-1;x>=0;x--)v=m[x],v._preSpiderfyLatlng&&(v.closePopup(),v.setLatLng(v._preSpiderfyLatlng),delete v._preSpiderfyLatlng,B=!0,v._setPos&&(v._setPos(f),B=!1),v.clusterHide&&(v.clusterHide(),B=!1),B&&_.removeLayer(v),y&&(w=v._spiderLeg,T=w._path,z=T.getTotalLength()+.1,T.style.strokeDashoffset=z,w.setStyle({opacity:0})));c._ignoreMove=!1,setTimeout(function(){var O=0;for(x=m.length-1;x>=0;x--)v=m[x],v._spiderLeg&&O++;for(x=m.length-1;x>=0;x--)v=m[x],v._spiderLeg&&(v.clusterShow&&v.clusterShow(),v.setZIndexOffset&&v.setZIndexOffset(0),O>1&&_.removeLayer(v),d.removeLayer(v._spiderLeg),delete v._spiderLeg);c._animationEnd(),c.fire("unspiderfied",{cluster:l,markers:m})},200)}}),L.MarkerClusterGroup.include({_spiderfied:null,unspiderfy:function(){this._unspiderfy.apply(this,arguments)},_spiderfierOnAdd:function(){this._map.on("click",this._unspiderfyWrapper,this),this._map.options.zoomAnimation&&this._map.on("zoomstart",this._unspiderfyZoomStart,this),this._map.on("zoomend",this._noanimationUnspiderfy,this),L.Browser.touch||this._map.getRenderer(this)},_spiderfierOnRemove:function(){this._map.off("click",this._unspiderfyWrapper,this),this._map.off("zoomstart",this._unspiderfyZoomStart,this),this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._map.off("zoomend",this._noanimationUnspiderfy,this),this._noanimationUnspiderfy()},_unspiderfyZoomStart:function(){this._map&&this._map.on("zoomanim",this._unspiderfyZoomAnim,this)},_unspiderfyZoomAnim:function(r){L.DomUtil.hasClass(this._map._mapPane,"leaflet-touching")||(this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._unspiderfy(r))},_unspiderfyWrapper:function(){this._unspiderfy()},_unspiderfy:function(r){this._spiderfied&&this._spiderfied.unspiderfy(r)},_noanimationUnspiderfy:function(){this._spiderfied&&this._spiderfied._noanimationUnspiderfy()},_unspiderfyLayer:function(r){r._spiderLeg&&(this._featureGroup.removeLayer(r),r.clusterShow&&r.clusterShow(),r.setZIndexOffset&&r.setZIndexOffset(0),this._map.removeLayer(r._spiderLeg),delete r._spiderLeg)}}),L.MarkerClusterGroup.include({refreshClusters:function(r){return r?r instanceof L.MarkerClusterGroup?r=r._topClusterLevel.getAllChildMarkers():r instanceof L.LayerGroup?r=r._layers:r instanceof L.MarkerCluster?r=r.getAllChildMarkers():r instanceof L.Marker&&(r=[r]):r=this._topClusterLevel.getAllChildMarkers(),this._flagParentsIconsNeedUpdate(r),this._refreshClustersIcons(),this.options.singleMarkerMode&&this._refreshSingleMarkerModeMarkers(r),this},_flagParentsIconsNeedUpdate:function(r){var l,c;for(l in r)for(c=r[l].__parent;c;)c._iconNeedsUpdate=!0,c=c.__parent},_refreshSingleMarkerModeMarkers:function(r){var l,c;for(l in r)c=r[l],this.hasLayer(c)&&c.setIcon(this._overrideMarkerIcon(c))}}),L.Marker.include({refreshIconOptions:function(r,l){var c=this.options.icon;return L.setOptions(c,r),this.setIcon(c),l&&this.__parent&&this.__parent._group.refreshClusters(this),this}}),a.MarkerClusterGroup=i,a.MarkerCluster=s,Object.defineProperty(a,"__esModule",{value:!0})})});var An=globalThis,In=An.ShadowRoot&&(An.ShadyCSS===void 0||An.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,gr=Symbol(),Cs=new WeakMap,en=class{constructor(i,s,r){if(this._$cssResult$=!0,r!==gr)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=s}get styleSheet(){let i=this.o,s=this.t;if(In&&i===void 0){let r=s!==void 0&&s.length===1;r&&(i=Cs.get(s)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),r&&Cs.set(s,i))}return i}toString(){return this.cssText}},Ni=a=>new en(typeof a=="string"?a:a+"",void 0,gr),fe=(a,...i)=>{let s=a.length===1?a[0]:i.reduce((r,l,c)=>r+(d=>{if(d._$cssResult$===!0)return d.cssText;if(typeof d=="number")return d;throw Error("Value passed to 'css' function must be a 'css' function result: "+d+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(l)+a[c+1],a[0]);return new en(s,a,gr)},Ms=(a,i)=>{if(In)a.adoptedStyleSheets=i.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet);else for(let s of i){let r=document.createElement("style"),l=An.litNonce;l!==void 0&&r.setAttribute("nonce",l),r.textContent=s.cssText,a.appendChild(r)}},vr=In?a=>a:a=>a instanceof CSSStyleSheet?(i=>{let s="";for(let r of i.cssRules)s+=r.cssText;return Ni(s)})(a):a;var{is:$a,defineProperty:Oa,getOwnPropertyDescriptor:Aa,getOwnPropertyNames:Ia,getOwnPropertySymbols:Na,getPrototypeOf:Za}=Object,hi=globalThis,Ss=hi.trustedTypes,Ba=Ss?Ss.emptyScript:"",Da=hi.reactiveElementPolyfillSupport,nn=(a,i)=>a,yr={toAttribute(a,i){switch(i){case Boolean:a=a?Ba:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,i){let s=a;switch(i){case Boolean:s=a!==null;break;case Number:s=a===null?null:Number(a);break;case Object:case Array:try{s=JSON.parse(a)}catch{s=null}}return s}},zs=(a,i)=>!$a(a,i),Ts={attribute:!0,type:String,converter:yr,reflect:!1,useDefault:!1,hasChanged:zs};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),hi.litPropertyMetadata??(hi.litPropertyMetadata=new WeakMap);var Qe=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??(this.l=[])).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,s=Ts){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(i,s),!s.noAccessor){let r=Symbol(),l=this.getPropertyDescriptor(i,r,s);l!==void 0&&Oa(this.prototype,i,l)}}static getPropertyDescriptor(i,s,r){let{get:l,set:c}=Aa(this.prototype,i)??{get(){return this[s]},set(d){this[s]=d}};return{get:l,set(d){let _=l?.call(this);c?.call(this,d),this.requestUpdate(i,_,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??Ts}static _$Ei(){if(this.hasOwnProperty(nn("elementProperties")))return;let i=Za(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(nn("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(nn("properties"))){let s=this.properties,r=[...Ia(s),...Na(s)];for(let l of r)this.createProperty(l,s[l])}let i=this[Symbol.metadata];if(i!==null){let s=litPropertyMetadata.get(i);if(s!==void 0)for(let[r,l]of s)this.elementProperties.set(r,l)}this._$Eh=new Map;for(let[s,r]of this.elementProperties){let l=this._$Eu(s,r);l!==void 0&&this._$Eh.set(l,s)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let s=[];if(Array.isArray(i)){let r=new Set(i.flat(1/0).reverse());for(let l of r)s.unshift(vr(l))}else i!==void 0&&s.push(vr(i));return s}static _$Eu(i,s){let r=s.attribute;return r===!1?void 0:typeof r=="string"?r:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??(this._$EO=new Set)).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,s=this.constructor.elementProperties;for(let r of s.keys())this.hasOwnProperty(r)&&(i.set(r,this[r]),delete this[r]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ms(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,s,r){this._$AK(i,r)}_$ET(i,s){let r=this.constructor.elementProperties.get(i),l=this.constructor._$Eu(i,r);if(l!==void 0&&r.reflect===!0){let c=(r.converter?.toAttribute!==void 0?r.converter:yr).toAttribute(s,r.type);this._$Em=i,c==null?this.removeAttribute(l):this.setAttribute(l,c),this._$Em=null}}_$AK(i,s){let r=this.constructor,l=r._$Eh.get(i);if(l!==void 0&&this._$Em!==l){let c=r.getPropertyOptions(l),d=typeof c.converter=="function"?{fromAttribute:c.converter}:c.converter?.fromAttribute!==void 0?c.converter:yr;this._$Em=l;let _=d.fromAttribute(s,c.type);this[l]=_??this._$Ej?.get(l)??_,this._$Em=null}}requestUpdate(i,s,r,l=!1,c){if(i!==void 0){let d=this.constructor;if(l===!1&&(c=this[i]),r??(r=d.getPropertyOptions(i)),!((r.hasChanged??zs)(c,s)||r.useDefault&&r.reflect&&c===this._$Ej?.get(i)&&!this.hasAttribute(d._$Eu(i,r))))return;this.C(i,s,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,s,{useDefault:r,reflect:l,wrapped:c},d){r&&!(this._$Ej??(this._$Ej=new Map)).has(i)&&(this._$Ej.set(i,d??s??this[i]),c!==!0||d!==void 0)||(this._$AL.has(i)||(this.hasUpdated||r||(s=void 0),this._$AL.set(i,s)),l===!0&&this._$Em!==i&&(this._$Eq??(this._$Eq=new Set)).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(s){Promise.reject(s)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[l,c]of this._$Ep)this[l]=c;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[l,c]of r){let{wrapped:d}=c,_=this[l];d!==!0||this._$AL.has(l)||_===void 0||this.C(l,void 0,c,_)}}let i=!1,s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(s)):this._$EM()}catch(r){throw i=!1,this._$EM(),r}i&&this._$AE(s)}willUpdate(i){}_$AE(i){this._$EO?.forEach(s=>s.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&(this._$Eq=this._$Eq.forEach(s=>this._$ET(s,this[s]))),this._$EM()}updated(i){}firstUpdated(i){}};Qe.elementStyles=[],Qe.shadowRootOptions={mode:"open"},Qe[nn("elementProperties")]=new Map,Qe[nn("finalized")]=new Map,Da?.({ReactiveElement:Qe}),(hi.reactiveElementVersions??(hi.reactiveElementVersions=[])).push("2.1.2");var sn=globalThis,Es=a=>a,Nn=sn.trustedTypes,$s=Nn?Nn.createPolicy("lit-html",{createHTML:a=>a}):void 0,Bs="$lit$",ci=`lit$${Math.random().toFixed(9).slice(2)}$`,Ds="?"+ci,Fa=`<${Ds}>`,wi=document,on=()=>wi.createComment(""),an=a=>a===null||typeof a!="object"&&typeof a!="function",Cr=Array.isArray,Ra=a=>Cr(a)||typeof a?.[Symbol.iterator]=="function",br=`[ 	
\f\r]`,rn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Os=/-->/g,As=/>/g,bi=RegExp(`>|${br}(?:([^\\s"'>=/]+)(${br}*=${br}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Is=/'/g,Ns=/"/g,Fs=/^(?:script|style|textarea|title)$/i,Mr=a=>(i,...s)=>({_$litType$:a,strings:i,values:s}),E=Mr(1),Rs=Mr(2),wl=Mr(3),Li=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),Zs=new WeakMap,xi=wi.createTreeWalker(wi,129);function Hs(a,i){if(!Cr(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return $s!==void 0?$s.createHTML(i):i}var Ha=(a,i)=>{let s=a.length-1,r=[],l,c=i===2?"<svg>":i===3?"<math>":"",d=rn;for(let _=0;_<s;_++){let f=a[_],m,y,v=-1,x=0;for(;x<f.length&&(d.lastIndex=x,y=d.exec(f),y!==null);)x=d.lastIndex,d===rn?y[1]==="!--"?d=Os:y[1]!==void 0?d=As:y[2]!==void 0?(Fs.test(y[2])&&(l=RegExp("</"+y[2],"g")),d=bi):y[3]!==void 0&&(d=bi):d===bi?y[0]===">"?(d=l??rn,v=-1):y[1]===void 0?v=-2:(v=d.lastIndex-y[2].length,m=y[1],d=y[3]===void 0?bi:y[3]==='"'?Ns:Is):d===Ns||d===Is?d=bi:d===Os||d===As?d=rn:(d=bi,l=void 0);let w=d===bi&&a[_+1].startsWith("/>")?" ":"";c+=d===rn?f+Fa:v>=0?(r.push(m),f.slice(0,v)+Bs+f.slice(v)+ci+w):f+ci+(v===-2?_:w)}return[Hs(a,c+(a[s]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),r]},ln=class a{constructor({strings:i,_$litType$:s},r){let l;this.parts=[];let c=0,d=0,_=i.length-1,f=this.parts,[m,y]=Ha(i,s);if(this.el=a.createElement(m,r),xi.currentNode=this.el.content,s===2||s===3){let v=this.el.content.firstChild;v.replaceWith(...v.childNodes)}for(;(l=xi.nextNode())!==null&&f.length<_;){if(l.nodeType===1){if(l.hasAttributes())for(let v of l.getAttributeNames())if(v.endsWith(Bs)){let x=y[d++],w=l.getAttribute(v).split(ci),T=/([.?@])?(.*)/.exec(x);f.push({type:1,index:c,name:T[2],strings:w,ctor:T[1]==="."?wr:T[1]==="?"?Lr:T[1]==="@"?kr:Bi}),l.removeAttribute(v)}else v.startsWith(ci)&&(f.push({type:6,index:c}),l.removeAttribute(v));if(Fs.test(l.tagName)){let v=l.textContent.split(ci),x=v.length-1;if(x>0){l.textContent=Nn?Nn.emptyScript:"";for(let w=0;w<x;w++)l.append(v[w],on()),xi.nextNode(),f.push({type:2,index:++c});l.append(v[x],on())}}}else if(l.nodeType===8)if(l.data===Ds)f.push({type:2,index:c});else{let v=-1;for(;(v=l.data.indexOf(ci,v+1))!==-1;)f.push({type:7,index:c}),v+=ci.length-1}c++}}static createElement(i,s){let r=wi.createElement("template");return r.innerHTML=i,r}};function Zi(a,i,s=a,r){if(i===Li)return i;let l=r!==void 0?s._$Co?.[r]:s._$Cl,c=an(i)?void 0:i._$litDirective$;return l?.constructor!==c&&(l?._$AO?.(!1),c===void 0?l=void 0:(l=new c(a),l._$AT(a,s,r)),r!==void 0?(s._$Co??(s._$Co=[]))[r]=l:s._$Cl=l),l!==void 0&&(i=Zi(a,l._$AS(a,i.values),l,r)),i}var xr=class{constructor(i,s){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=s}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:s},parts:r}=this._$AD,l=(i?.creationScope??wi).importNode(s,!0);xi.currentNode=l;let c=xi.nextNode(),d=0,_=0,f=r[0];for(;f!==void 0;){if(d===f.index){let m;f.type===2?m=new hn(c,c.nextSibling,this,i):f.type===1?m=new f.ctor(c,f.name,f.strings,this,i):f.type===6&&(m=new Pr(c,this,i)),this._$AV.push(m),f=r[++_]}d!==f?.index&&(c=xi.nextNode(),d++)}return xi.currentNode=wi,l}p(i){let s=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(i,r,s),s+=r.strings.length-2):r._$AI(i[s])),s++}},hn=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,s,r,l){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=i,this._$AB=s,this._$AM=r,this.options=l,this._$Cv=l?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,s=this._$AM;return s!==void 0&&i?.nodeType===11&&(i=s.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,s=this){i=Zi(this,i,s),an(i)?i===F||i==null||i===""?(this._$AH!==F&&this._$AR(),this._$AH=F):i!==this._$AH&&i!==Li&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):Ra(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==F&&an(this._$AH)?this._$AA.nextSibling.data=i:this.T(wi.createTextNode(i)),this._$AH=i}$(i){let{values:s,_$litType$:r}=i,l=typeof r=="number"?this._$AC(i):(r.el===void 0&&(r.el=ln.createElement(Hs(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===l)this._$AH.p(s);else{let c=new xr(l,this),d=c.u(this.options);c.p(s),this.T(d),this._$AH=c}}_$AC(i){let s=Zs.get(i.strings);return s===void 0&&Zs.set(i.strings,s=new ln(i)),s}k(i){Cr(this._$AH)||(this._$AH=[],this._$AR());let s=this._$AH,r,l=0;for(let c of i)l===s.length?s.push(r=new a(this.O(on()),this.O(on()),this,this.options)):r=s[l],r._$AI(c),l++;l<s.length&&(this._$AR(r&&r._$AB.nextSibling,l),s.length=l)}_$AR(i=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);i!==this._$AB;){let r=Es(i).nextSibling;Es(i).remove(),i=r}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},Bi=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,s,r,l,c){this.type=1,this._$AH=F,this._$AN=void 0,this.element=i,this.name=s,this._$AM=l,this.options=c,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=F}_$AI(i,s=this,r,l){let c=this.strings,d=!1;if(c===void 0)i=Zi(this,i,s,0),d=!an(i)||i!==this._$AH&&i!==Li,d&&(this._$AH=i);else{let _=i,f,m;for(i=c[0],f=0;f<c.length-1;f++)m=Zi(this,_[r+f],s,f),m===Li&&(m=this._$AH[f]),d||(d=!an(m)||m!==this._$AH[f]),m===F?i=F:i!==F&&(i+=(m??"")+c[f+1]),this._$AH[f]=m}d&&!l&&this.j(i)}j(i){i===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},wr=class extends Bi{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===F?void 0:i}},Lr=class extends Bi{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==F)}},kr=class extends Bi{constructor(i,s,r,l,c){super(i,s,r,l,c),this.type=5}_$AI(i,s=this){if((i=Zi(this,i,s,0)??F)===Li)return;let r=this._$AH,l=i===F&&r!==F||i.capture!==r.capture||i.once!==r.once||i.passive!==r.passive,c=i!==F&&(r===F||l);l&&this.element.removeEventListener(this.name,this,r),c&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},Pr=class{constructor(i,s,r){this.element=i,this.type=6,this._$AN=void 0,this._$AM=s,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(i){Zi(this,i)}};var Ua=sn.litHtmlPolyfillSupport;Ua?.(ln,hn),(sn.litHtmlVersions??(sn.litHtmlVersions=[])).push("3.3.3");var Us=(a,i,s)=>{let r=s?.renderBefore??i,l=r._$litPart$;if(l===void 0){let c=s?.renderBefore??null;r._$litPart$=l=new hn(i.insertBefore(on(),c),c,void 0,s??{})}return l._$AI(a),l};var cn=globalThis,he=class extends Qe{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var s;let i=super.createRenderRoot();return(s=this.renderOptions).renderBefore??(s.renderBefore=i.firstChild),i}update(i){let s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=Us(s,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Li}};he._$litElement$=!0,he.finalized=!0,cn.litElementHydrateSupport?.({LitElement:he});var Ga=cn.litElementPolyfillSupport;Ga?.({LitElement:he});(cn.litElementVersions??(cn.litElementVersions=[])).push("4.2.2");var Tt=Ii(Di(),1),rh=Ii(qs(),1);var Vs=`/* required styles */\r
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
`;var Dn={en:{"panel.newEvent":"+ New event","panel.count.one":"{n} event","panel.count.other":"{n} events","panel.home":"Home","error.query":"Query failed: {msg}","error.profileSave":"Saving profile failed: {msg}","error.profileDelete":"Deleting profile failed: {msg}","error.save":"Saving failed: {msg}","error.delete":"Deleting failed: {msg}","error.action":"Action failed: {msg}","error.ics":"Could not copy ICS URL: {msg}","error.capture":"Too few points for the drawing.","profile.label":"Profile","profile.none":"(no profile)","profile.placeholder":"Profile name","profile.save":"Save","profile.save.title":"Save current filters under this name","profile.delete":"Delete","profile.delete.title":"Delete selected profile","search.label":"Search","search.placeholder":"Title, description, address\u2026","search.favorites":"Favorites only","search.showHidden":"Show hidden","category.label":"Category","category.none":"No categories yet","radius.label":"Radius","radius.hint":"Click the map to set the center","window.label":"Time window","window.allDays":"All days","weekdays.label":"Weekdays","weekdays.short":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],"time.allday":"All day","time.range":"By time of day","map.label":"Map","map.zones":"HA zones","map.persons":"People","map.geofeeds":"Geo feeds","map.route":"Directions (OSM)","export.label":"Export","export.copy":"Copy ICS subscription URL","export.copied":"URL copied","view.label":"View","view.reset":"Reset view","view.reset.title":"Restore default filters and map layers","filters.label":"Filters","filters.active":"{n} active","filters.show":"Show filters","filters.hide":"Hide filters","stats.summary":"Statistics ({n} events)","stats.places":"Cached places","stats.profiles":"Profiles","stats.events":"events","stats.last":"last","list.empty":"No events match the current filters.","list.visited":"visited","list.source":"Source","list.favorite.add":"Mark as favorite","list.favorite.remove":"Remove favorite","list.edit":"Edit event","list.hide":"Hide event","list.unhide":"Unhide event","list.hidden":"hidden","list.fuzzy":"Imprecise schedule","editor.new":"New event","editor.edit":"Edit event","editor.title":"Title*","editor.category":"Category","editor.start":"Start*","editor.end":"End*","editor.address":"Address","editor.address.placeholder":"fills coordinates from the cache","editor.pickPoint":"Pick point on map","editor.rrule":"Recurrence (RRULE)","editor.precision":"Time precision","editor.precision.exact":"exact","editor.precision.approximate":"approximate","editor.scheduleText":"Schedule wording","editor.scheduleText.placeholder":"Wednesdays 6 pm, ~twice a month","editor.geometry":"Geometry (GeoJSON, optional)","editor.drawLine":"Draw line","editor.drawPolygon":"Draw area","editor.applyDrawing":"Apply drawing","editor.captureHint.point":"Click the map to set the point.","editor.captureHint.points":"Click the map to add points.","editor.source":"Source","editor.sourceUrl":"Source URL","editor.description":"Description","editor.favorite":"Favorite","editor.save":"Save","editor.cancel":"Cancel","editor.delete":"Delete","editor.error.times":"Start and end are required.","editor.error.geometry":"Geometry is not valid JSON.","editor.error.coords":"Provide lat and lon together.","editor.close":"Close","editor.delete.confirm":"Delete this event?","layers.label":"Layers","layers.show":"Show layers","layers.hide":"Hide layers","layers.disabled":"Data layers are switched off. Enable them in the integration options (Settings > Devices & services > Chronotope > Configure).","layers.group.tracks":"Moving objects","layers.group.events":"Events","layers.group.features":"Places & regions","layers.group.raster":"Overlays","layers.group.grid":"Gridded data","layers.group.custom":"Custom layers","layers.freshness.fresh":"fresh","layers.freshness.stale":"stale","layers.freshness.error":"error","layers.freshness.blocked":"blocked","layers.freshness.disabled":"off","layers.lastSuccess":"last success","layers.lastError":"last error","layers.count":"objects","layers.nc":"NC","layers.nc.title":"Non-commercial license: this source may only be used non-commercially.","layers.keyMissing":"API key required: add it in the integration options.","layers.opacity":"Opacity","layers.params":"Parameters","layers.params.radius_nm":"Radius (nautical miles)","layers.params.center":"Center","layers.params.useMapCenter":"Use map center","layers.params.useHome":"Use home","layers.params.interval":"Refresh interval (s)","layers.params.apply":"Apply","layers.params.magnitude":"Minimum magnitude","layers.params.period":"Period","layers.params.mode":"Mode","layers.params.year":"Year","layers.warning.active":"The 'active' group has tens of thousands of objects; only the first 3000 are shown.","layers.eventsHint":"Stored as events: filter them via the category chips.","layers.zoomIn":"Zoom in to load","layers.pending":"{n} tiles loading","layers.fallback":"Fallback source active","layers.add":"Add layer","layers.add.preset":"From preset","layers.add.presetPick":"(pick a preset)","layers.add.custom":"Custom layer","layers.add.provider":"Type","layers.add.title":"Title","layers.add.url":"URL (https, with {z}/{x}/{y} for tiles)","layers.add.wmsLayers":"WMS layers","layers.add.attribution":"Attribution text (required)","layers.add.attributionUrl":"Attribution link","layers.add.license":"License note","layers.add.test":"Test","layers.add.save":"Save layer","layers.add.cancel":"Cancel","layers.add.testing":"Testing\u2026","layers.add.testOk":"OK: {info}","layers.add.testFailed":"Failed: {msg}","layers.add.needTest":"Run the test before saving.","layers.delete":"Delete","layers.delete.confirm":"Delete this layer?","layers.source":"Source","layers.attribution.more":"more sources","layers.attribution.less":"fewer","layers.satellite.track":"Ground track \xB145 min","layers.dropped":"dropped","basemap.label":"Base map","basemap.osm":"OpenStreetMap","basemap.topplus":"TopPlusOpen (BKG)","basemap.esri_imagery":"Esri World Imagery","card.layersDisabled":"Layer is not enabled","error.layers":"Layer action failed: {msg}","layer.flights_regional":"Aircraft (regional, adsb.lol)","layer.flights_military":"Military aircraft (global)","layer.flights_opensky":"Aircraft (OpenSky, fallback)","layer.satellites_stations":"Satellites: space stations","layer.satellites_visual":"Satellites: brightest","layer.satellites_starlink":"Satellites: Starlink","layer.satellites_gps":"Satellites: GPS","layer.satellites_weather":"Satellites: weather","layer.satellites_active":"Satellites: all active (large)","layer.vessels":"Vessels (AISStream)","layer.earthquakes":"Earthquakes (USGS)","layer.launches":"Rocket launches (Launch Library)","layer.natural_events":"Natural events (NASA EONET)","layer.conflicts":"Conflict events (UCDP Candidate)","layer.conflicts_api":"Conflict events (UCDP API)","layer.fires":"Fire hotspots (NASA FIRMS)","layer.fishing":"Fishing activity (Global Fishing Watch)","layer.datacenters":"Data centers (OpenStreetMap)","layer.dams":"Dams (OpenStreetMap)","layer.regions":"Regions (Natural Earth)","layer.countries":"Countries (Natural Earth)","layer.submarine_cables":"Submarine cables (TeleGeography)","layer.tor_relays":"Tor relays (Onionoo)","layer.radio_stations":"Radio stations (Radio Browser)","layer.refugees":"Refugees by country (UNHCR)","layer.internet_outages":"Internet outages (IODA)","layer.aurora":"Aurora forecast (NOAA SWPC)","layer.dwd_radar":"Precipitation radar (DWD)","layer.dwd_warnings":"Weather warnings (DWD)","layer.night_lights":"Night-time lights (NASA Black Marble)","layer.thermal_anomalies":"Thermal anomalies (NASA GIBS)"},de:{"panel.newEvent":"+ Neues Event","panel.count.one":"{n} Event","panel.count.other":"{n} Events","panel.home":"Zuhause","error.query":"Abfrage fehlgeschlagen: {msg}","error.profileSave":"Profil speichern fehlgeschlagen: {msg}","error.profileDelete":"Profil l\xF6schen fehlgeschlagen: {msg}","error.save":"Speichern fehlgeschlagen: {msg}","error.delete":"L\xF6schen fehlgeschlagen: {msg}","error.action":"Aktion fehlgeschlagen: {msg}","error.ics":"ICS-URL konnte nicht kopiert werden: {msg}","error.capture":"Zu wenige Punkte f\xFCr die Zeichnung.","profile.label":"Profil","profile.none":"(kein Profil)","profile.placeholder":"Profilname","profile.save":"Speichern","profile.save.title":"Aktuelle Filter unter diesem Namen speichern","profile.delete":"L\xF6schen","profile.delete.title":"Ausgew\xE4hltes Profil l\xF6schen","search.label":"Suche","search.placeholder":"Titel, Beschreibung, Adresse\u2026","search.favorites":"nur Favoriten","search.showHidden":"Ausgeblendete anzeigen","category.label":"Kategorie","category.none":"Noch keine Kategorien","radius.label":"Radius","radius.hint":"Klick auf die Karte setzt das Zentrum","window.label":"Zeitfenster","window.allDays":"Alle Tage","weekdays.label":"Wochentage","weekdays.short":["Mo","Di","Mi","Do","Fr","Sa","So"],"time.allday":"Ganztags","time.range":"Nach Uhrzeit","map.label":"Karte","map.zones":"HA-Zonen","map.persons":"Personen","map.geofeeds":"Geo-Feeds","map.route":"Route (OSM)","export.label":"Export","export.copy":"ICS-Abo-URL kopieren","export.copied":"URL kopiert","view.label":"Ansicht","view.reset":"Ansicht zur\xFCcksetzen","view.reset.title":"Filter und Karten-Layer auf Standard zur\xFCcksetzen","filters.label":"Filter","filters.active":"{n} aktiv","filters.show":"Filter anzeigen","filters.hide":"Filter ausblenden","stats.summary":"Statistik ({n} Events)","stats.places":"Orte im Cache","stats.profiles":"Profile","stats.events":"Events","stats.last":"zuletzt","list.empty":"Keine Events f\xFCr die aktuellen Filter.","list.visited":"besucht","list.source":"Quelle","list.favorite.add":"Als Favorit markieren","list.favorite.remove":"Favorit entfernen","list.edit":"Event bearbeiten","list.hide":"Event ausblenden","list.unhide":"Event wieder einblenden","list.hidden":"ausgeblendet","list.fuzzy":"Unpr\xE4zise Zeitangabe","editor.new":"Neues Event","editor.edit":"Event bearbeiten","editor.title":"Titel*","editor.category":"Kategorie","editor.start":"Beginn*","editor.end":"Ende*","editor.address":"Adresse","editor.address.placeholder":"f\xFCllt Koordinaten aus dem Cache","editor.pickPoint":"Punkt per Kartenklick","editor.rrule":"Wiederholung (RRULE)","editor.precision":"Zeit-Pr\xE4zision","editor.precision.exact":"exakt","editor.precision.approximate":"ungef\xE4hr","editor.scheduleText":"Zeitangabe (Wortlaut)","editor.scheduleText.placeholder":"mittwochs 18 Uhr, ca. 2x im Monat","editor.geometry":"Geometrie (GeoJSON, optional)","editor.drawLine":"Linie zeichnen","editor.drawPolygon":"Fl\xE4che zeichnen","editor.applyDrawing":"Zeichnung \xFCbernehmen","editor.captureHint.point":"Klicke auf die Karte, um den Punkt zu setzen.","editor.captureHint.points":"Klicke auf die Karte, um Punkte hinzuzuf\xFCgen.","editor.source":"Quelle","editor.sourceUrl":"Quell-URL","editor.description":"Beschreibung","editor.favorite":"Favorit","editor.save":"Speichern","editor.cancel":"Abbrechen","editor.delete":"L\xF6schen","editor.error.times":"Beginn und Ende sind Pflichtfelder.","editor.error.geometry":"Geometrie ist kein g\xFCltiges JSON.","editor.error.coords":"Lat und Lon nur gemeinsam angeben.","editor.close":"Schlie\xDFen","editor.delete.confirm":"Dieses Event l\xF6schen?","layers.label":"Layer","layers.show":"Layer anzeigen","layers.hide":"Layer ausblenden","layers.disabled":"Datenlayer sind abgeschaltet. Aktivierung in den Integrationsoptionen (Einstellungen > Ger\xE4te & Dienste > Chronotope > Konfigurieren).","layers.group.tracks":"Bewegte Objekte","layers.group.events":"Ereignisse","layers.group.features":"Orte & Regionen","layers.group.raster":"Overlays","layers.group.grid":"Gitterdaten","layers.group.custom":"Eigene Layer","layers.freshness.fresh":"aktuell","layers.freshness.stale":"veraltet","layers.freshness.error":"Fehler","layers.freshness.blocked":"blockiert","layers.freshness.disabled":"aus","layers.lastSuccess":"letzter Erfolg","layers.lastError":"letzter Fehler","layers.count":"Objekte","layers.nc":"NC","layers.nc.title":"Nicht-kommerzielle Lizenz: diese Quelle darf nur nicht-kommerziell genutzt werden.","layers.keyMissing":"API-Schl\xFCssel n\xF6tig: in den Integrationsoptionen eintragen.","layers.opacity":"Deckkraft","layers.params":"Parameter","layers.params.radius_nm":"Radius (Seemeilen)","layers.params.center":"Mittelpunkt","layers.params.useMapCenter":"Kartenmitte \xFCbernehmen","layers.params.useHome":"Zuhause","layers.params.interval":"Aktualisierung (s)","layers.params.apply":"\xDCbernehmen","layers.params.magnitude":"Mindestmagnitude","layers.params.period":"Zeitraum","layers.params.mode":"Modus","layers.params.year":"Jahr","layers.warning.active":"Die Gruppe 'active' hat zehntausende Objekte; nur die ersten 3000 werden gezeigt.","layers.eventsHint":"Als Events gespeichert: Filterung \xFCber die Kategorie-Chips.","layers.zoomIn":"Zum Laden hineinzoomen","layers.pending":"{n} Kacheln laden","layers.fallback":"R\xFCckfallquelle aktiv","layers.add":"Layer hinzuf\xFCgen","layers.add.preset":"Aus Vorlage","layers.add.presetPick":"(Vorlage w\xE4hlen)","layers.add.custom":"Eigener Layer","layers.add.provider":"Typ","layers.add.title":"Titel","layers.add.url":"URL (https, mit {z}/{x}/{y} f\xFCr Kacheln)","layers.add.wmsLayers":"WMS-Layer","layers.add.attribution":"Quellenangabe (Pflicht)","layers.add.attributionUrl":"Link zur Quellenangabe","layers.add.license":"Lizenzhinweis","layers.add.test":"Testen","layers.add.save":"Layer speichern","layers.add.cancel":"Abbrechen","layers.add.testing":"Teste\u2026","layers.add.testOk":"OK: {info}","layers.add.testFailed":"Fehlgeschlagen: {msg}","layers.add.needTest":"Vor dem Speichern testen.","layers.delete":"L\xF6schen","layers.delete.confirm":"Diesen Layer l\xF6schen?","layers.source":"Quelle","layers.attribution.more":"weitere Quellen","layers.attribution.less":"weniger","layers.satellite.track":"Bodenspur \xB145 min","layers.dropped":"verworfen","basemap.label":"Basiskarte","basemap.osm":"OpenStreetMap","basemap.topplus":"TopPlusOpen (BKG)","basemap.esri_imagery":"Esri World Imagery","card.layersDisabled":"Layer ist nicht aktiviert","error.layers":"Layer-Aktion fehlgeschlagen: {msg}","layer.flights_regional":"Flugzeuge (regional, adsb.lol)","layer.flights_military":"Milit\xE4rflugzeuge (global)","layer.flights_opensky":"Flugzeuge (OpenSky, R\xFCckfall)","layer.satellites_stations":"Satelliten: Raumstationen","layer.satellites_visual":"Satelliten: hellste","layer.satellites_starlink":"Satelliten: Starlink","layer.satellites_gps":"Satelliten: GPS","layer.satellites_weather":"Satelliten: Wetter","layer.satellites_active":"Satelliten: alle aktiven (gro\xDF)","layer.vessels":"Schiffe (AISStream)","layer.earthquakes":"Erdbeben (USGS)","layer.launches":"Raketenstarts (Launch Library)","layer.natural_events":"Naturereignisse (NASA EONET)","layer.conflicts":"Konfliktereignisse (UCDP Candidate)","layer.conflicts_api":"Konfliktereignisse (UCDP API)","layer.fires":"Brandherde (NASA FIRMS)","layer.fishing":"Fischereiaktivit\xE4t (Global Fishing Watch)","layer.datacenters":"Rechenzentren (OpenStreetMap)","layer.dams":"Talsperren (OpenStreetMap)","layer.regions":"Regionen (Natural Earth)","layer.countries":"L\xE4nder (Natural Earth)","layer.submarine_cables":"Seekabel (TeleGeography)","layer.tor_relays":"Tor-Relays (Onionoo)","layer.radio_stations":"Radiosender (Radio Browser)","layer.refugees":"Gefl\xFCchtete je Land (UNHCR)","layer.internet_outages":"Internetausf\xE4lle (IODA)","layer.aurora":"Polarlicht-Vorhersage (NOAA SWPC)","layer.dwd_radar":"Niederschlagsradar (DWD)","layer.dwd_warnings":"Wetterwarnungen (DWD)","layer.night_lights":"Nachtlichter (NASA Black Marble)","layer.thermal_anomalies":"Thermische Anomalien (NASA GIBS)"}},js=Dn.en;function Ks(a){let i=String(a||"en").toLowerCase().split("-")[0];js=Dn[i]||Dn.en}function k(a,i){let s=js[a]??Dn.en[a]??a;if(typeof s=="string"&&i)for(let[r,l]of Object.entries(i))s=s.replace(`{${r}}`,String(l));return s}var ti=a=>Rs`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d=${a}></path></svg>`,Ys=ti("M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"),Js=ti("M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z"),Xs=ti("M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"),Qs=ti("M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z"),to=ti("M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"),eo=ti("M17,17H7V14L3,18L7,22V19H19V13H17M7,7H17V10L21,6L17,2V5H5V11H7V7Z"),Sr=ti("M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"),Tr=ti("M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"),io=ti("M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"),no='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/></svg>';function Ae(a,i){customElements.get(a)||customElements.define(a,i)}var ro=`.leaflet-cluster-anim .leaflet-marker-icon, .leaflet-cluster-anim .leaflet-marker-shadow {
	-webkit-transition: -webkit-transform 0.3s ease-out, opacity 0.3s ease-in;
	-moz-transition: -moz-transform 0.3s ease-out, opacity 0.3s ease-in;
	-o-transition: -o-transform 0.3s ease-out, opacity 0.3s ease-in;
	transition: transform 0.3s ease-out, opacity 0.3s ease-in;
}

.leaflet-cluster-spider-leg {
	/* stroke-dashoffset (duration and function) should match with leaflet-marker-icon transform in order to track it exactly */
	-webkit-transition: -webkit-stroke-dashoffset 0.3s ease-out, -webkit-stroke-opacity 0.3s ease-in;
	-moz-transition: -moz-stroke-dashoffset 0.3s ease-out, -moz-stroke-opacity 0.3s ease-in;
	-o-transition: -o-stroke-dashoffset 0.3s ease-out, -o-stroke-opacity 0.3s ease-in;
	transition: stroke-dashoffset 0.3s ease-out, stroke-opacity 0.3s ease-in;
}
`;var so=`.marker-cluster-small {
	background-color: rgba(181, 226, 140, 0.6);
	}
.marker-cluster-small div {
	background-color: rgba(110, 204, 57, 0.6);
	}

.marker-cluster-medium {
	background-color: rgba(241, 211, 87, 0.6);
	}
.marker-cluster-medium div {
	background-color: rgba(240, 194, 12, 0.6);
	}

.marker-cluster-large {
	background-color: rgba(253, 156, 115, 0.6);
	}
.marker-cluster-large div {
	background-color: rgba(241, 128, 23, 0.6);
	}

	/* IE 6-8 fallback colors */
.leaflet-oldie .marker-cluster-small {
	background-color: rgb(181, 226, 140);
	}
.leaflet-oldie .marker-cluster-small div {
	background-color: rgb(110, 204, 57);
	}

.leaflet-oldie .marker-cluster-medium {
	background-color: rgb(241, 211, 87);
	}
.leaflet-oldie .marker-cluster-medium div {
	background-color: rgb(240, 194, 12);
	}

.leaflet-oldie .marker-cluster-large {
	background-color: rgb(253, 156, 115);
	}
.leaflet-oldie .marker-cluster-large div {
	background-color: rgb(241, 128, 23);
}

.marker-cluster {
	background-clip: padding-box;
	border-radius: 20px;
	}
.marker-cluster div {
	width: 30px;
	height: 30px;
	margin-left: 5px;
	margin-top: 5px;

	text-align: center;
	border-radius: 15px;
	font: 12px "Helvetica Neue", Arial, Helvetica, sans-serif;
	}
.marker-cluster span {
	line-height: 30px;
	}`;var zr=Ii(Di(),1);var Fi=Ii(Di(),1),ki=Fi.default.Layer.extend({options:{pane:"overlayPane",opacity:1},initialize(a){Fi.default.setOptions(this,a)},onAdd(a){this._map=a,this._canvas=Fi.default.DomUtil.create("canvas","leaflet-layer chronotope-canvas"),this._canvas.style.pointerEvents="none",this._canvas.style.opacity=String(this.options.opacity),this.getPane().appendChild(this._canvas),a.on("moveend zoomend resize",this._reset,this),a.on("zoomstart",this._hide,this),this._reset()},onRemove(a){a.off("moveend zoomend resize",this._reset,this),a.off("zoomstart",this._hide,this),Fi.default.DomUtil.remove(this._canvas),this._canvas=null},setOpacity(a){return this.options.opacity=a,this._canvas&&(this._canvas.style.opacity=String(a)),this},redraw(){return this._map&&this._canvas&&this._draw(),this},_hide(){this._canvas&&(this._canvas.style.visibility="hidden")},_reset(){if(!this._map||!this._canvas)return;let a=this._map.getSize(),i=window.devicePixelRatio||1;this._canvas.width=Math.round(a.x*i),this._canvas.height=Math.round(a.y*i),this._canvas.style.width=`${a.x}px`,this._canvas.style.height=`${a.y}px`,Fi.default.DomUtil.setPosition(this._canvas,this._map.containerPointToLayerPoint([0,0])),this._canvas.style.visibility="",this._draw()},_draw(){let a=this._canvas.getContext("2d"),i=window.devicePixelRatio||1;a.setTransform(i,0,0,i,0,0),a.clearRect(0,0,this._canvas.width,this._canvas.height),this.draw(a,this._map.getSize())},draw(a,i){}});var ja=12,Fn=ki.extend({options:{pane:"overlayPane",opacity:1,color:"#42a5f5",icon:"circle",rotateBy:null,size:7,selectedId:null,labels:!1,minLabelZoom:9},initialize(a){ki.prototype.initialize.call(this,a),this._features=[],this._positions=[]},onAdd(a){ki.prototype.onAdd.call(this,a),a.on("click",this._onClick,this)},onRemove(a){a.off("click",this._onClick,this),ki.prototype.onRemove.call(this,a)},setFeatures(a){return this._features=a||[],this.redraw(),this},setSelected(a){return this.options.selectedId=a,this.redraw(),this},draw(a,i){let s=this._map,r=s.getZoom(),l=s.getBounds().pad(.05);this._positions=[];let c=this.options.labels&&r>=this.options.minLabelZoom;for(let d of this._features){let _=d.geometry?.coordinates;if(!_||_.length<2)continue;let f=zr.default.latLng(_[1],_[0]);if(!l.contains(f))continue;let m=s.latLngToContainerPoint(f);if(m.x<-20||m.y<-20||m.x>i.x+20||m.y>i.y+20)continue;this._positions.push({x:m.x,y:m.y,feature:d});let y=d.id===this.options.selectedId,v=d.properties?.color||this.options.color,x=this.options.rotateBy?d.properties?.[this.options.rotateBy]:null;Ka(a,m.x,m.y,this.options.icon,v,this.options.size*(y?1.5:1),x,y),c&&d.properties?.label&&(a.font="11px sans-serif",a.fillStyle=v,a.strokeStyle="rgba(0,0,0,0.6)",a.lineWidth=3,a.strokeText(d.properties.label,m.x+9,m.y+4),a.fillText(d.properties.label,m.x+9,m.y+4))}},_onClick(a){if(!this._positions.length)return;let i=a.containerPoint,s=null;for(let r of this._positions){let l=Math.hypot(r.x-i.x,r.y-i.y);l<=ja&&(!s||l<s.d)&&(s={d:l,entry:r})}s&&(zr.default.DomEvent.stop(a.originalEvent),this.fire("featureclick",{feature:s.entry.feature,latlng:a.latlng}))}});function Ka(a,i,s,r,l,c,d,_){switch(a.save(),a.translate(i,s),a.fillStyle=l,a.strokeStyle=_?"#fff":"rgba(0,0,0,0.55)",a.lineWidth=_?2:1,d!=null&&Number.isFinite(d)&&a.rotate(d*Math.PI/180),a.beginPath(),r){case"aircraft":{let f=c;a.moveTo(0,-f*1.4),a.lineTo(f*.35,-f*.3),a.lineTo(f*1.5,f*.3),a.lineTo(f*1.5,f*.6),a.lineTo(f*.3,f*.35),a.lineTo(f*.3,f*1),a.lineTo(f*.7,f*1.3),a.lineTo(f*.7,f*1.5),a.lineTo(0,f*1.3),a.lineTo(-f*.7,f*1.5),a.lineTo(-f*.7,f*1.3),a.lineTo(-f*.3,f*1),a.lineTo(-f*.3,f*.35),a.lineTo(-f*1.5,f*.6),a.lineTo(-f*1.5,f*.3),a.lineTo(-f*.35,-f*.3),a.closePath();break}case"vessel":{let f=c;a.moveTo(0,-f*1.3),a.lineTo(f*.8,f*.6),a.lineTo(f*.8,f*1.2),a.lineTo(-f*.8,f*1.2),a.lineTo(-f*.8,f*.6),a.closePath();break}case"satellite":{let f=c*.7;a.rect(-f,-f,2*f,2*f),a.moveTo(-f*2.2,0),a.lineTo(-f,0),a.moveTo(f,0),a.lineTo(f*2.2,0);break}case"diamond":{let f=c;a.moveTo(0,-f),a.lineTo(f,0),a.lineTo(0,f),a.lineTo(-f,0),a.closePath();break}default:a.arc(0,0,c*.8,0,Math.PI*2)}a.fill(),a.stroke(),a.restore()}var oo=ki.extend({options:{pane:"chronotope-grid",opacity:.6,threshold:5,vmax:100},setGrid(a){return this._grid=a,this.redraw(),this},draw(a,i){let s=this._grid;if(!s||!s.values)return;let r=this._map,l=r.getBounds(),{lon0:c,lat0:d,dlon:_,dlat:f,nx:m,ny:y,values:v}=s,x=this.options.threshold,w=this.options.vmax||100,T=Math.max(-180,Math.floor(l.getWest())),z=Math.min(180,Math.ceil(l.getEast())),B=Math.max(-85,Math.floor(l.getSouth())),O=Math.min(85,Math.ceil(l.getNorth()));for(let Y=0;Y<y;Y+=1){let W=d+Y*f;if(W+f<B||W>O)continue;let st=r.latLngToContainerPoint([Math.min(85,W+f),0]).y,ot=r.latLngToContainerPoint([Math.max(-85,W),0]).y;for(let D=0;D<m;D+=1){let j=v[Y*m+D];if(j==null||j<x)continue;let J=c+D*_;for(let V of[0,360,-360]){let tt=J+V;if(tt+_<T||tt>z)continue;let pt=r.latLngToContainerPoint([0,tt]).x,G=r.latLngToContainerPoint([0,tt+_]).x;G<0||pt>i.x||ot<0||st>i.y||(a.fillStyle=Er(j,w),a.fillRect(pt,st,Math.max(1,G-pt),Math.max(1,ot-st)))}}}}});function Er(a,i){let s=Math.max(0,Math.min(1,a/i)),r=120-120*s,l=.25+.6*s;return`hsla(${r.toFixed(0)}, 90%, 50%, ${l.toFixed(2)})`}var $r=Ii(Di(),1);function Rn(a,i,s,r={}){let l=a.properties||{},c=document.createElement("div");c.className="layer-popup";let d=document.createElement("div");d.className="popup-title",d.textContent=String(l.label??a.id??""),c.append(d);let _=document.createElement("div");_.className="popup-meta",_.textContent=[l.kind,l.ts?new Date(l.ts).toLocaleString():null].filter(Boolean).join(" \xB7 "),c.append(_);let f=[];if(l.alt_m!=null&&f.push(`${Math.round(l.alt_m)} m`),l.speed_ms!=null&&f.push(`${Math.round(l.speed_ms*3.6)} km/h`),l.track!=null&&f.push(`${Math.round(l.track)}\xB0`),l.value!=null&&f.push(String(l.value)),f.length){let v=document.createElement("div");v.className="popup-meta",v.textContent=f.join(" \xB7 "),c.append(v)}let m=l.detail&&typeof l.detail=="object"?l.detail:{},y=Object.entries(m).filter(([,v])=>v!=null&&v!=="");if(y.length){let v=document.createElement("table");v.className="popup-detail";for(let[x,w]of y){let T=document.createElement("tr"),z=document.createElement("td");z.textContent=x;let B=document.createElement("td"),O=typeof w=="object"?JSON.stringify(w):String(w);if(/^https?:\/\//i.test(O)&&O.length<300){let Y=document.createElement("a");Y.href=O,Y.target="_blank",Y.rel="noopener noreferrer",Y.textContent=O.replace(/^https?:\/\//,"").slice(0,60),B.append(Y)}else B.textContent=O.length>200?`${O.slice(0,200)}\u2026`:O;T.append(z,B),v.append(T)}c.append(v)}if(r.lines)for(let v of r.lines){let x=document.createElement("div");x.className="popup-meta",x.textContent=v,c.append(x)}if(i?.attribution?.text){let v=document.createElement("div");if(v.className="popup-meta",v.textContent=`${s("layers.source")}: `,i.attribution.url){let x=document.createElement("a");x.href=i.attribution.url,x.target="_blank",x.rel="noopener noreferrer",x.textContent=i.attribution.text,v.append(x)}else v.append(document.createTextNode(i.attribution.text));c.append(v)}return c}function ao(a,i){let{style:s={},renderer:r,pane:l,meta:c,t:d,onSelect:_,opacity:f=1}=i,m=s.color||s.fill||"#66bb6a",y=s.kind==="choropleth";return $r.default.geoJSON({type:"FeatureCollection",features:a},{renderer:r,pane:l,style:x=>{let w=x.properties||{};if(y){let T=Number(w.intensity??0);return{color:"rgba(255,255,255,0.35)",weight:.6,fillColor:Er(T*100,100),fillOpacity:Math.min(.85,.2+.7*T)*f}}return{color:w.color||m,weight:x.geometry?.type?.includes("Line")?2:1.2,fillColor:w.color||s.fill||m,fillOpacity:.18*f,opacity:.9*f}},pointToLayer:(x,w)=>$r.default.circleMarker(w,{renderer:r,pane:l,radius:5,color:x.properties?.color||m,fillColor:x.properties?.color||m,fillOpacity:.7*f,weight:1}),onEachFeature:(x,w)=>{w.bindPopup(()=>Rn(x,c,d),{maxWidth:320}),_&&w.on("click",()=>_(x))}})}var Ar=Ii(Di(),1);function Or(a,i=0){let s=new Date(Date.now()-i*864e5),r=s.toISOString().slice(0,10);switch(a){case"yesterday":return new Date(Date.now()-(i+1)*864e5).toISOString().slice(0,10);case"yearly-latest":return`${s.getUTCFullYear()-1}-01-01`;case"today":default:return r}}function Ir(a,i={}){let{opacity:s=a.opacity??1,pane:r="chronotope-raster",attribution:l="",onTileError:c}=i,d=a.time||a.params?.time||null;if((a.type||a.provider)==="wms"){let x={...a.params||{}};delete x.time;let w={layers:x.layers,styles:x.styles||"",format:x.format||"image/png",transparent:x.transparent!==!1,version:x.version||"1.3.0"};d&&(w.time=Or(d));let T=Ar.default.tileLayer.wms(a.url,{...w,opacity:s,pane:r,attribution:l,maxZoom:a.max_zoom??18,minZoom:a.min_zoom??0,crossOrigin:!1});return c&&T.on("tileerror",c),T}let f=a.url,m=null;f.includes("{Time}")&&(f=f.replace("{Time}",Or(d||"today")),m=Or(d||"today",1));let y=Ar.default.tileLayer(f,{opacity:s,pane:r,attribution:l,maxZoom:a.max_zoom??19,minZoom:a.min_zoom??0,maxNativeZoom:a.max_native_zoom??a.max_zoom??19,crossOrigin:!1}),v=!1;return y.on("tileerror",x=>{m&&!v&&d!=="yearly-latest"&&(v=!0,y.setUrl(a.url.replace("{Time}",m))),c&&c(x)}),y}var Hn=class{constructor(i,s){this._map=i,this._t=s,this._entries=[],this._expanded=!1,this._container=null}setEntries(i){let s=new Set;this._entries=i.filter(r=>{if(!r||!r.text)return!1;let l=`${r.text}|${r.url||""}`;return s.has(l)?!1:(s.add(l),!0)}),this._render()}_render(){let i=this._map.attributionControl;if(!i)return;for(let c of Object.keys(i._attributions||{}))i.removeAttribution(c);i.setPrefix(!1);let s=i.getContainer();if(!s)return;s.replaceChildren();let r=document.createElement("span");if(r.className="chronotope-attribution",(this._expanded||this._entries.length<=4?this._entries:this._entries.slice(0,2)).forEach((c,d)=>{if(d>0&&r.append(document.createTextNode(" | ")),c.url){let _=document.createElement("a");_.href=c.url,_.target="_blank",_.rel="noopener noreferrer",_.textContent=c.text,r.append(_)}else r.append(document.createTextNode(c.text))}),this._entries.length>4){r.append(document.createTextNode(" "));let c=document.createElement("a");c.href="#",c.textContent=this._expanded?this._t("layers.attribution.less"):`+${this._entries.length-2} ${this._t("layers.attribution.more")}`,c.addEventListener("click",d=>{d.preventDefault(),this._expanded=!this._expanded,this._render()}),r.append(c)}s.append(r)}};var Un=class{constructor({intervalMs:i=15e3,trailMs:s=6e4,maxSamples:r=12}={}){this.intervalMs=i,this.trailMs=s,this.maxSamples=r,this._tracks=new Map}setInterval(i){this.intervalMs=Math.max(1e3,i)}ingest(i,s=Date.now()){let r=new Set;for(let l of i||[]){let c=l.geometry?.coordinates;if(!c||c.length<2)continue;let d=l.properties?.ts?Date.parse(l.properties.ts):NaN,_=Number.isFinite(d)?Math.min(d,s):s,f=this._tracks.get(l.id)||{feature:l,samples:[]};f.feature=l;let m=f.samples[f.samples.length-1];(!m||m.t<_||m.lat!==c[1]||m.lon!==c[0])&&(f.samples.push({t:m&&m.t>=_?m.t+1:_,lat:c[1],lon:c[0],alt:c[2]??null}),f.samples.length>this.maxSamples&&f.samples.shift()),f.lastSeen=s,this._tracks.set(l.id,f),r.add(l.id)}for(let[l,c]of this._tracks)!r.has(l)&&s-c.lastSeen>2*this.intervalMs&&this._tracks.delete(l)}featuresAt(i=Date.now()){let s=i-this.intervalMs,r=[];for(let[,l]of this._tracks){let c=this._positionAt(l,s);if(!c)continue;let d=[c.lon,c.lat];c.alt!=null&&d.push(c.alt),r.push({...l.feature,geometry:{type:"Point",coordinates:d}})}return r}trail(i,s=Date.now()){let r=this._tracks.get(i);if(!r)return[];let l=s-this.intervalMs-this.trailMs;return r.samples.filter(c=>c.t>=l).map(c=>[c.lat,c.lon])}_positionAt(i,s){let r=i.samples;if(!r.length)return null;let l=r[r.length-1];if(s<=r[0].t)return r[0];for(let w=r.length-1;w>0;w-=1){let T=r[w-1],z=r[w];if(s>=T.t&&s<=z.t){let B=z.t===T.t?1:(s-T.t)/(z.t-T.t);return{lat:T.lat+(z.lat-T.lat)*B,lon:T.lon+(z.lon-T.lon)*B,alt:T.alt!=null&&z.alt!=null?T.alt+(z.alt-T.alt)*B:z.alt??T.alt}}}let c=s-l.t;if(c>2*this.intervalMs)return null;let d=i.feature.properties||{},_=Number(d.speed_ms),f=Number(d.track);if(!Number.isFinite(_)||!Number.isFinite(f)||_<=0)return l;let m=_*(c/1e3),y=f*Math.PI/180,v=m*Math.cos(y)/111320,x=m*Math.sin(y)/(111320*Math.max(.05,Math.cos(l.lat*Math.PI/180)));return{lat:l.lat+v,lon:l.lon+x,alt:l.alt}}};var _e=Math.PI,Bt=_e*2,dn=_e/180,Ya=180/_e,Ja=1440,Xa=398600.8,Me=6378.135,ei=60/Math.sqrt(Me*Me*Me/Xa),Nr=Me*ei/60,Qa=1/ei,Pi=.001082616,tl=-253881e-11,el=-165597e-11,Ci=tl/Pi,un=2/3,il=1440/(2*_e);function nl(a,i){for(var s=[31,a%4===0?29:28,31,30,31,30,31,31,30,31,30,31],r=Math.floor(i),l=1,c=0;r>c+s[l-1]&&l<12;)c+=s[l-1],l+=1;var d=l,_=r-c,f=(i-r)*24,m=Math.floor(f);f=(f-m)*60;var y=Math.floor(f),v=(f-y)*60;return{mon:d,day:_,hr:m,minute:y,sec:v}}function lo(a,i,s,r,l,c){var d=arguments.length>6&&arguments[6]!==void 0?arguments[6]:0;return 367*a-Math.floor(7*(a+Math.floor((i+9)/12))*.25)+Math.floor(275*i/9)+s+17210135e-1+((d/6e4+c/60+l)/60+r)/24}function Gn(a,i,s,r,l,c){var d=arguments.length>6&&arguments[6]!==void 0?arguments[6]:0;if(a instanceof Date){var _=a;return lo(_.getUTCFullYear(),_.getUTCMonth()+1,_.getUTCDate(),_.getUTCHours(),_.getUTCMinutes(),_.getUTCSeconds(),_.getUTCMilliseconds())}return lo(a,i,s,r,l,c,d)}function ho(a,i){var s=a.e3,r=a.ee2,l=a.peo,c=a.pgho,d=a.pho,_=a.pinco,f=a.plo,m=a.se2,y=a.se3,v=a.sgh2,x=a.sgh3,w=a.sgh4,T=a.sh2,z=a.sh3,B=a.si2,O=a.si3,Y=a.sl2,W=a.sl3,st=a.sl4,ot=a.t,D=a.xgh2,j=a.xgh3,J=a.xgh4,V=a.xh2,tt=a.xh3,pt=a.xi2,G=a.xi3,It=a.xl2,rt=a.xl3,Lt=a.xl4,S=a.zmol,Ot=a.zmos,$=i.init,U=i.opsmode,dt=i.ep,at=i.inclp,I=i.nodep,K=i.argpp,H=i.mp,R,Z,zt,mt,xt,et,Kt,At,Nt,ht,ft,Pt,bt,it,_t,ct,nt,kt,Ct,gt,wt,Dt=119459e-10,Ft=.01675,Rt=.00015835218,Ut=.0549;wt=Ot+Dt*ot,$==="y"&&(wt=Ot),gt=wt+2*Ft*Math.sin(wt),nt=Math.sin(gt),ht=.5*nt*nt-.25,ft=-.5*nt*Math.cos(gt);var ce=m*ht+y*ft,Xt=B*ht+O*ft,Gt=Y*ht+W*ft+st*nt,p=v*ht+x*ft+w*nt,jt=T*ht+z*ft;wt=S+Rt*ot,$==="y"&&(wt=S),gt=wt+2*Ut*Math.sin(wt),nt=Math.sin(gt),ht=.5*nt*nt-.25,ft=-.5*nt*Math.cos(gt);var Wt=r*ht+s*ft,re=pt*ht+G*ft,Le=It*ht+rt*ft+Lt*nt,Et=D*ht+j*ft+J*nt,Ht=V*ht+tt*ft;return Pt=ce+Wt,_t=Xt+re,ct=Gt+Le,bt=p+Et,it=jt+Ht,$==="n"&&(Pt-=l,_t-=_,ct-=f,bt-=c,it-=d,at+=_t,dt+=Pt,mt=Math.sin(at),zt=Math.cos(at),at>=.2?(it/=mt,bt-=zt*it,K+=bt,I+=it,H+=ct):(et=Math.sin(I),xt=Math.cos(I),R=mt*et,Z=mt*xt,Kt=it*xt+_t*zt*et,At=-it*et+_t*zt*xt,R+=Kt,Z+=At,I%=Bt,I<0&&U==="a"&&(I+=Bt),kt=H+K+zt*I,Nt=ct+bt-_t*I*mt,kt+=Nt,Ct=I,I=Math.atan2(R,Z),I<0&&U==="a"&&(I+=Bt),Math.abs(Ct-I)>_e&&(I<Ct?I+=Bt:I-=Bt),H+=ct,K=kt-H-zt*I)),{ep:dt,inclp:at,nodep:I,argpp:K,mp:H}}function rl(a){var i=a.epoch,s=a.ep,r=a.argpp,l=a.tc,c=a.inclp,d=a.nodep,_=a.np,f,m,y,v,x,w,T,z,B,O,Y,W,st,ot,D,j,J,V,tt,pt,G,It,rt,Lt,S,Ot,$,U,dt,at,I,K,H,R,Z,zt,mt,xt,et,Kt,At,Nt,ht,ft,Pt,bt,it,_t,ct,nt,kt,Ct,gt,wt,Dt,Ft,Rt,Ut,ce,Xt,Gt,p,jt,Wt=.01675,re=.0549,Le=29864797e-13,Et=47968065e-14,Ht=.39785416,Se=.91744867,Qt=.1945905,te=-.98088458,Te=_,ue=s,ke=Math.sin(d),ye=Math.cos(d),ee=Math.sin(r),ie=Math.cos(r),me=Math.sin(c),ge=Math.cos(c),Yt=ue*ue,M=1-Yt,N=Math.sqrt(M),be=0,Ze=0,vt=0,ii=0,Ge=0,ze=i+18261.5+l/1440,se=(4.523602-.00092422029*ze)%Bt,qt=Math.sin(se),xe=Math.cos(se),ni=.91375164-.03568096*xe,ri=Math.sqrt(1-ni*ni),oe=.089683511*qt/ri,ne=Math.sqrt(1-oe*oe),Zt=5.8351514+.001944368*ze,Ee=.39785416*qt/ri,Ri=ne*xe+.91744867*oe*qt;Ee=Math.atan2(Ee,Ri),Ee+=Zt-se;var Hi=Math.cos(Ee),Ui=Math.sin(Ee);pt=Qt,G=te,Lt=Se,S=Ht,It=ye,rt=ke,Y=Le;for(var Gi=1/Te,ui=0;ui<2;)ui+=1,f=pt*It+G*Lt*rt,y=-G*It+pt*Lt*rt,T=-pt*rt+G*Lt*It,z=G*S,B=G*rt+pt*Lt*It,O=pt*S,m=ge*T+me*z,v=ge*B+me*O,x=-me*T+ge*z,w=-me*B+ge*O,W=f*ie+m*ee,st=y*ie+v*ee,ot=-f*ee+m*ie,D=-y*ee+v*ie,j=x*ee,J=w*ee,V=x*ie,tt=w*ie,Gt=12*W*W-3*ot*ot,p=24*W*st-6*ot*D,jt=12*st*st-3*D*D,Ct=3*(f*f+m*m)+Gt*Yt,gt=6*(f*y+m*v)+p*Yt,wt=3*(y*y+v*v)+jt*Yt,Dt=-6*f*x+Yt*(-24*W*V-6*ot*j),Ft=-6*(f*w+y*x)+Yt*(-24*(st*V+W*tt)+-6*(ot*J+D*j)),Rt=-6*y*w+Yt*(-24*st*tt-6*D*J),Ut=6*m*x+Yt*(24*W*j-6*ot*V),ce=6*(v*x+m*w)+Yt*(24*(st*j+W*J)-6*(D*V+ot*tt)),Xt=6*v*w+Yt*(24*st*J-6*D*tt),Ct=Ct+Ct+M*Gt,gt=gt+gt+M*p,wt=wt+wt+M*jt,it=Y*Gi,bt=-.5*it/N,_t=it*N,Pt=-15*ue*_t,ct=W*ot+st*D,nt=st*ot+W*D,kt=st*D-W*ot,ui===1&&(Ot=Pt,$=bt,U=it,dt=_t,at=ct,I=nt,K=kt,H=Ct,R=gt,Z=wt,zt=Dt,mt=Ft,xt=Rt,et=Ut,Kt=ce,At=Xt,Nt=Gt,ht=p,ft=jt,pt=Hi,G=Ui,Lt=ni,S=ri,It=ne*ye+oe*ke,rt=ke*ne-ye*oe,Y=Et);var We=(4.7199672+(.2299715*ze-Zt))%Bt,qe=(6.2565837+.017201977*ze)%Bt,Mi=2*Ot*I,Be=2*Ot*K,Pe=2*$*mt,ut=2*$*(xt-zt),Mt=-2*U*R,si=-2*U*(Z-H),De=-2*U*(-21-9*Yt)*Wt,Ce=2*dt*ht,pi=2*dt*(ft-Nt),X=-18*dt*Wt,St=-2*$*Kt,oi=-2*$*(At-et),Fe=2*Pt*nt,pe=2*Pt*kt,Wi=2*bt*Ft,Si=2*bt*(Rt-Dt),Ve=-2*it*gt,Vt=-2*it*(wt-Ct),je=-2*it*(-21-9*Yt)*re,fi=2*_t*p,_i=2*_t*(jt-Gt),qi=-18*_t*re,mi=-2*bt*ce,Vi=-2*bt*(Xt-Ut);return{snodm:ke,cnodm:ye,sinim:me,cosim:ge,sinomm:ee,cosomm:ie,day:ze,e3:pe,ee2:Fe,em:ue,emsq:Yt,gam:Zt,peo:be,pgho:ii,pho:Ge,pinco:Ze,plo:vt,rtemsq:N,se2:Mi,se3:Be,sgh2:Ce,sgh3:pi,sgh4:X,sh2:St,sh3:oi,si2:Pe,si3:ut,sl2:Mt,sl3:si,sl4:De,s1:Pt,s2:bt,s3:it,s4:_t,s5:ct,s6:nt,s7:kt,ss1:Ot,ss2:$,ss3:U,ss4:dt,ss5:at,ss6:I,ss7:K,sz1:H,sz2:R,sz3:Z,sz11:zt,sz12:mt,sz13:xt,sz21:et,sz22:Kt,sz23:At,sz31:Nt,sz32:ht,sz33:ft,xgh2:fi,xgh3:_i,xgh4:qi,xh2:mi,xh3:Vi,xi2:Wi,xi3:Si,xl2:Ve,xl3:Vt,xl4:je,nm:Te,z1:Ct,z2:gt,z3:wt,z11:Dt,z12:Ft,z13:Rt,z21:Ut,z22:ce,z23:Xt,z31:Gt,z32:p,z33:jt,zmol:We,zmos:qe}}function sl(a){var i=a.cosim,s=a.argpo,r=a.s1,l=a.s2,c=a.s3,d=a.s4,_=a.s5,f=a.sinim,m=a.ss1,y=a.ss2,v=a.ss3,x=a.ss4,w=a.ss5,T=a.sz1,z=a.sz3,B=a.sz11,O=a.sz13,Y=a.sz21,W=a.sz23,st=a.sz31,ot=a.sz33,D=a.t,j=a.tc,J=a.gsto,V=a.mo,tt=a.mdot,pt=a.no,G=a.nodeo,It=a.nodedot,rt=a.xpidot,Lt=a.z1,S=a.z3,Ot=a.z11,$=a.z13,U=a.z21,dt=a.z23,at=a.z31,I=a.z33,K=a.ecco,H=a.eccsq,R=a.emsq,Z=a.em,zt=a.argpm,mt=a.inclm,xt=a.mm,et=a.nm,Kt=a.nodem,At=a.irez,Nt=a.atime,ht=a.d2201,ft=a.d2211,Pt=a.d3210,bt=a.d3222,it=a.d4410,_t=a.d4422,ct=a.d5220,nt=a.d5232,kt=a.d5421,Ct=a.d5433,gt=a.dedt,wt=a.didt,Dt=a.dmdt,Ft=a.dnodt,Rt=a.domdt,Ut=a.del1,ce=a.del2,Xt=a.del3,Gt=a.xfact,p=a.xlamo,jt=a.xli,Wt=a.xni,re,Le,Et,Ht,Se,Qt,te,Te,ue,ke,ye,ee,ie,me,ge,Yt,M,N,be,Ze,vt,ii,Ge,ze,se,qt,xe,ni,ri,oe,ne,Zt,Ee=17891679e-13,Ri=21460748e-13,Hi=22123015e-14,Ui=17891679e-13,Gi=73636953e-16,ui=21765803e-16,We=.0043752690880113,qe=37393792e-14,Mi=11428639e-14,Be=.00015835218,Pe=119459e-10;At=0,et<.0052359877&&et>.0034906585&&(At=1),et>=.00826&&et<=.00924&&Z>=.5&&(At=2);var ut=m*Pe*w,Mt=y*Pe*(B+O),si=-Pe*v*(T+z-14-6*R),De=x*Pe*(st+ot-6),Ce=-Pe*y*(Y+W);(mt<.052359877||mt>_e-.052359877)&&(Ce=0),f!==0&&(Ce/=f);var pi=De-i*Ce;gt=ut+r*Be*_,wt=Mt+l*Be*(Ot+$),Dt=si-Be*c*(Lt+S-14-6*R);var X=d*Be*(at+I-6),St=-Be*l*(U+dt);(mt<.052359877||mt>_e-.052359877)&&(St=0),Rt=pi+X,Ft=Ce,f!==0&&(Rt-=i/f*St,Ft+=St/f);var oi=0,Fe=(J+j*We)%Bt;if(Z+=gt*D,mt+=wt*D,zt+=Rt*D,Kt+=Ft*D,xt+=Dt*D,At!==0){if(oe=Math.pow(et/ei,un),At===2){ne=i*i;var pe=Z;Z=K;var Wi=R;R=H,Zt=Z*R,me=-.306-(Z-.64)*.44,Z<=.65?(ge=3.616-13.247*Z+16.29*R,M=-19.302+117.39*Z-228.419*R+156.591*Zt,N=-18.9068+109.7927*Z-214.6334*R+146.5816*Zt,be=-41.122+242.694*Z-471.094*R+313.953*Zt,Ze=-146.407+841.88*Z-1629.014*R+1083.435*Zt,vt=-532.114+3017.977*Z-5740.032*R+3708.276*Zt):(ge=-72.099+331.819*Z-508.738*R+266.724*Zt,M=-346.844+1582.851*Z-2415.925*R+1246.113*Zt,N=-342.585+1554.908*Z-2366.899*R+1215.972*Zt,be=-1052.797+4758.686*Z-7193.992*R+3651.957*Zt,Ze=-3581.69+16178.11*Z-24462.77*R+12422.52*Zt,Z>.715?vt=-5149.66+29936.92*Z-54087.36*R+31324.56*Zt:vt=1464.74-4664.75*Z+3763.64*R),Z<.7?(ze=-919.2277+4988.61*Z-9064.77*R+5542.21*Zt,ii=-822.71072+4568.6173*Z-8491.4146*R+5337.524*Zt,Ge=-853.666+4690.25*Z-8624.77*R+5341.4*Zt):(ze=-37995.78+161616.52*Z-229838.2*R+109377.94*Zt,ii=-51752.104+218913.95*Z-309468.16*R+146349.42*Zt,Ge=-40023.88+170470.89*Z-242699.48*R+115605.82*Zt),se=f*f,re=.75*(1+2*i+ne),Le=1.5*se,Ht=1.875*f*(1-2*i-3*ne),Se=-1.875*f*(1+2*i-3*ne),te=35*se*re,Te=39.375*se*se,ue=9.84375*f*(se*(1-2*i-5*ne)+.33333333*(-2+4*i+6*ne)),ke=f*(4.92187512*se*(-2-4*i+10*ne)+6.56250012*(1+2*i-3*ne)),ye=29.53125*f*(2-8*i+ne*(-12+8*i+10*ne)),ee=29.53125*f*(-2-8*i+ne*(12+8*i-10*ne)),ni=et*et,ri=oe*oe,xe=3*ni*ri,qt=xe*Ui,ht=qt*re*me,ft=qt*Le*ge,xe*=oe,qt=xe*qe,Pt=qt*Ht*M,bt=qt*Se*N,xe*=oe,qt=2*xe*Gi,it=qt*te*be,_t=qt*Te*Ze,xe*=oe,qt=xe*Mi,ct=qt*ue*vt,nt=qt*ke*Ge,qt=2*xe*ui,kt=qt*ye*ii,Ct=qt*ee*ze,p=(V+G+G-(Fe+Fe))%Bt,Gt=tt+Dt+2*(It+Ft-We)-pt,Z=pe,R=Wi}At===1&&(ie=1+R*(-2.5+.8125*R),M=1+2*R,Yt=1+R*(-6+6.60937*R),re=.75*(1+i)*(1+i),Et=.9375*f*f*(1+3*i)-.75*(1+i),Qt=1+i,Qt*=1.875*Qt*Qt,Ut=3*et*et*oe*oe,ce=2*Ut*re*ie*Ee,Xt=3*Ut*Qt*Yt*Hi*oe,Ut=Ut*Et*M*Ri*oe,p=(V+G+s-Fe)%Bt,Gt=tt+rt+Dt+Rt+Ft-(pt+We)),jt=p,Wt=pt,Nt=0,et=pt+oi}return{em:Z,argpm:zt,inclm:mt,mm:xt,nm:et,nodem:Kt,irez:At,atime:Nt,d2201:ht,d2211:ft,d3210:Pt,d3222:bt,d4410:it,d4422:_t,d5220:ct,d5232:nt,d5421:kt,d5433:Ct,dedt:gt,didt:wt,dmdt:Dt,dndt:oi,dnodt:Ft,domdt:Rt,del1:Ut,del2:ce,del3:Xt,xfact:Gt,xlamo:p,xli:jt,xni:Wt}}function Zr(a){var i=(a-2451545)/36525,s=-62e-7*i*i*i+.093104*i*i+(876600*3600+8640184812866e-6)*i+67310.54841;return s=s*dn/240%Bt,s<0&&(s+=Bt),s}function Wn(a,i,s,r,l,c,d){return a instanceof Date?Zr(Gn(a)):Zr(i!==void 0?Gn(a,i,s,r,l,c,d):a)}function ol(a){var i=a.ecco,s=a.epoch,r=a.inclo,l=a.opsmode,c=a.no,d=i*i,_=1-d,f=Math.sqrt(_),m=Math.cos(r),y=m*m,v=Math.pow(ei/c,un),x=.75*Pi*(3*y-1)/(f*_),w=x/(v*v),T=v*(1-w*w-w*(1/3+134*w*w/81));w=x/(T*T),c/=1+w;var z=Math.pow(ei/c,un),B=Math.sin(r),O=z*_,Y=1-5*y,W=-Y-y-y,st=1/z,ot=O*O,D=z*(1-i),j="n",J;if(l==="a"){var V=s-7305,tt=Math.floor(V+1e-8),pt=V-tt,G=.017202791694070362,It=1.7321343856509375,rt=5075514194322695e-30,Lt=G+Bt;J=(It+G*tt+Lt*pt+V*V*rt)%Bt,J<0&&(J+=Bt)}else J=Wn(s+24332815e-1);return{no:c,method:j,ainv:st,ao:z,con41:W,con42:Y,cosio:m,cosio2:y,eccsq:d,omeosq:_,posq:ot,rp:D,rteosq:f,sinio:B,gsto:J}}function al(a){var i=a.irez,s=a.d2201,r=a.d2211,l=a.d3210,c=a.d3222,d=a.d4410,_=a.d4422,f=a.d5220,m=a.d5232,y=a.d5421,v=a.d5433,x=a.dedt,w=a.del1,T=a.del2,z=a.del3,B=a.didt,O=a.dmdt,Y=a.dnodt,W=a.domdt,st=a.argpo,ot=a.argpdot,D=a.t,j=a.tc,J=a.gsto,V=a.xfact,tt=a.xlamo,pt=a.no,G=a.atime,It=a.em,rt=a.argpm,Lt=a.inclm,S=a.xli,Ot=a.mm,$=a.xni,U=a.nodem,dt=a.nm,at=.13130908,I=2.8843198,K=.37448087,H=5.7686396,R=.95240898,Z=1.8014998,zt=1.050833,mt=4.4108898,xt=.0043752690880113,et=720,Kt=-720,At=259200,Nt,ht,ft,Pt,bt,it,_t,ct,nt=0,kt=0,Ct=(J+j*xt)%Bt;if(It+=x*D,Lt+=B*D,rt+=W*D,U+=Y*D,Ot+=O*D,i!==0){(G===0||D*G<=0||Math.abs(D)<Math.abs(G))&&(G=0,$=pt,S=tt),D>0?Nt=et:Nt=Kt;for(var gt=381;gt===381;)i!==2?(_t=w*Math.sin(S-at)+T*Math.sin(2*(S-I))+z*Math.sin(3*(S-K)),bt=$+V,it=w*Math.cos(S-at)+2*T*Math.cos(2*(S-I))+3*z*Math.cos(3*(S-K)),it*=bt):(ct=st+ot*G,ft=ct+ct,ht=S+S,_t=s*Math.sin(ft+S-H)+r*Math.sin(S-H)+l*Math.sin(ct+S-R)+c*Math.sin(-ct+S-R)+d*Math.sin(ft+ht-Z)+_*Math.sin(ht-Z)+f*Math.sin(ct+S-zt)+m*Math.sin(-ct+S-zt)+y*Math.sin(ct+ht-mt)+v*Math.sin(-ct+ht-mt),bt=$+V,it=s*Math.cos(ft+S-H)+r*Math.cos(S-H)+l*Math.cos(ct+S-R)+c*Math.cos(-ct+S-R)+f*Math.cos(ct+S-zt)+m*Math.cos(-ct+S-zt)+2*(d*Math.cos(ft+ht-Z)+_*Math.cos(ht-Z)+y*Math.cos(ct+ht-mt)+v*Math.cos(-ct+ht-mt)),it*=bt),Math.abs(D-G)>=et?gt=381:(kt=D-G,gt=0),gt===381&&(S+=bt*Nt+_t*At,$+=_t*Nt+it*At,G+=Nt);dt=$+_t*kt+it*kt*kt*.5,Pt=S+bt*kt+_t*kt*kt*.5,i!==1?(Ot=Pt-2*U+2*Ct,nt=dt-pt):(Ot=Pt-U-rt+Ct,nt=dt-pt),dt=pt+nt}return{atime:G,em:It,argpm:rt,inclm:Lt,xli:S,mm:Ot,xni:$,nodem:U,dndt:nt,nm:dt}}var di;(function(a){a[a.None=0]="None",a[a.MeanEccentricityOutOfRange=1]="MeanEccentricityOutOfRange",a[a.MeanMotionBelowZero=2]="MeanMotionBelowZero",a[a.PerturbedEccentricityOutOfRange=3]="PerturbedEccentricityOutOfRange",a[a.SemiLatusRectumBelowZero=4]="SemiLatusRectumBelowZero",a[a.Decayed=6]="Decayed"})(di||(di={}));function co(a,i){var s,r,l,c,d,_,f,m,y,v,x,w,T,z,B,O,Y,W,st,ot,D,j,J,V,tt,pt,G,It=15e-13;a.t=i,a.error=di.None;var rt=a.mo+a.mdot*a.t,Lt=a.argpo+a.argpdot*a.t,S=a.nodeo+a.nodedot*a.t;y=Lt,D=rt;var Ot=a.t*a.t;if(J=S+a.nodecf*Ot,Y=1-a.cc1*a.t,W=a.bstar*a.cc4*a.t,st=a.t2cof*Ot,a.isimp!==1){f=a.omgcof*a.t;var $=1+a.eta*Math.cos(rt);_=a.xmcof*($*$*$-a.delmo),O=f+_,D=rt+O,y=Lt-O,w=Ot*a.t,T=w*a.t,Y=Y-a.d2*Ot-a.d3*w-a.d4*T,W+=a.bstar*a.cc5*(Math.sin(D)-a.sinmao),st=st+a.t3cof*w+T*(a.t4cof+a.t*a.t5cof)}j=a.no;var U=a.ecco;if(ot=a.inclo,a.method==="d"){z=a.t;var dt={irez:a.irez,d2201:a.d2201,d2211:a.d2211,d3210:a.d3210,d3222:a.d3222,d4410:a.d4410,d4422:a.d4422,d5220:a.d5220,d5232:a.d5232,d5421:a.d5421,d5433:a.d5433,dedt:a.dedt,del1:a.del1,del2:a.del2,del3:a.del3,didt:a.didt,dmdt:a.dmdt,dnodt:a.dnodt,domdt:a.domdt,argpo:a.argpo,argpdot:a.argpdot,t:a.t,tc:z,gsto:a.gsto,xfact:a.xfact,xlamo:a.xlamo,no:a.no,atime:a.atime,em:U,argpm:y,inclm:ot,xli:a.xli,mm:D,xni:a.xni,nodem:J,nm:j},at=al(dt);U=at.em,y=at.argpm,ot=at.inclm,D=at.mm,J=at.nodem,j=at.nm}if(j<=0)return a.error=di.MeanMotionBelowZero,null;var I=Math.pow(ei/j,un)*Y*Y;if(j=ei/Math.pow(I,1.5),U-=W,U>=1||U<-.001)return a.error=di.MeanEccentricityOutOfRange,null;U<1e-6&&(U=1e-6),D+=a.no*st,tt=D+y+J,J%=Bt,y%=Bt,tt%=Bt,D=(tt-y-J)%Bt;var K={am:I,em:U,im:ot,Om:J,om:y,mm:D,nm:j},H=Math.sin(ot),R=Math.cos(ot),Z=U;if(V=ot,v=y,G=J,pt=D,c=H,l=R,a.method==="d"){var zt={inclo:a.inclo,init:"n",ep:Z,inclp:V,nodep:G,argpp:v,mp:pt,opsmode:a.operationmode},mt=ho(a,zt);if(Z=mt.ep,G=mt.nodep,v=mt.argpp,pt=mt.mp,V=mt.inclp,V<0&&(V=-V,G+=_e,v-=_e),Z<0||Z>1)return a.error=di.PerturbedEccentricityOutOfRange,null}a.method==="d"&&(c=Math.sin(V),l=Math.cos(V),a.aycof=-.5*Ci*c,Math.abs(l+1)>15e-13?a.xlcof=-.25*Ci*c*(3+5*l)/(1+l):a.xlcof=-.25*Ci*c*(3+5*l)/It);var xt=Z*Math.cos(v);O=1/(I*(1-Z*Z));var et=Z*Math.sin(v)+O*a.aycof,Kt=pt+v+G+O*a.xlcof*xt,At=(Kt-G)%Bt;m=At,B=9999.9;for(var Nt=1;Math.abs(B)>=1e-12&&Nt<=10;)r=Math.sin(m),s=Math.cos(m),B=1-s*xt-r*et,B=(At-et*s+xt*r-m)/B,Math.abs(B)>=.95&&(B>0?B=.95:B=-.95),m+=B,Nt+=1;var ht=xt*s+et*r,ft=xt*r-et*s,Pt=xt*xt+et*et,bt=I*(1-Pt);if(bt<0)return a.error=di.SemiLatusRectumBelowZero,null;var it=I*(1-ht),_t=Math.sqrt(I)*ft/it,ct=Math.sqrt(bt)/it,nt=Math.sqrt(1-Pt);O=ft/(1+nt);var kt=I/it*(r-et-xt*O),Ct=I/it*(s-xt+et*O);x=Math.atan2(kt,Ct);var gt=(Ct+Ct)*kt,wt=1-2*kt*kt;O=1/bt;var Dt=.5*Pi*O,Ft=Dt*O;a.method==="d"&&(d=l*l,a.con41=3*d-1,a.x1mth2=1-d,a.x7thm1=7*d-1);var Rt=it*(1-1.5*Ft*nt*a.con41)+.5*Dt*a.x1mth2*wt;if(Rt<1)return a.error=di.Decayed,null;x-=.25*Ft*a.x7thm1*gt;var Ut=G+1.5*Ft*l*gt,ce=V+1.5*Ft*l*c*wt,Xt=_t-j*Dt*a.x1mth2*gt/ei,Gt=ct+j*Dt*(a.x1mth2*wt+1.5*a.con41)/ei,p=Math.sin(x),jt=Math.cos(x),Wt=Math.sin(Ut),re=Math.cos(Ut),Le=Math.sin(ce),Et=Math.cos(ce),Ht=-Wt*Et,Se=re*Et,Qt=Ht*p+re*jt,te=Se*p+Wt*jt,Te=Le*p,ue=Ht*jt-re*p,ke=Se*jt-Wt*p,ye=Le*jt,ee={x:Rt*Qt*Me,y:Rt*te*Me,z:Rt*Te*Me},ie={x:(Xt*Qt+Gt*ue)*Nr,y:(Xt*te+Gt*ke)*Nr,z:(Xt*Te+Gt*ye)*Nr};return{position:ee,velocity:ie,meanElements:K}}function ll(a,i){var s=i.opsmode,r=i.satn,l=i.epoch,c=i.xbstar,d=i.xecco,_=i.xargpo,f=i.xinclo,m=i.xmo,y=i.xno,v=i.xnodeo,x,w,T,z,B,O,Y,W,st,ot,D,j,J,V,tt,pt,G,It,rt,Lt,S,Ot,$,U,dt,at,I,K,H,R,Z,zt,mt,xt,et,Kt,At,Nt,ht,ft,Pt,bt,it,_t,ct,nt,kt,Ct,gt,wt,Dt,Ft,Rt,Ut,ce,Xt,Gt=15e-13,p=a;p.isimp=0,p.method="n",p.aycof=0,p.con41=0,p.cc1=0,p.cc4=0,p.cc5=0,p.d2=0,p.d3=0,p.d4=0,p.delmo=0,p.eta=0,p.argpdot=0,p.omgcof=0,p.sinmao=0,p.t=0,p.t2cof=0,p.t3cof=0,p.t4cof=0,p.t5cof=0,p.x1mth2=0,p.x7thm1=0,p.mdot=0,p.nodedot=0,p.xlcof=0,p.xmcof=0,p.nodecf=0,p.irez=0,p.d2201=0,p.d2211=0,p.d3210=0,p.d3222=0,p.d4410=0,p.d4422=0,p.d5220=0,p.d5232=0,p.d5421=0,p.d5433=0,p.dedt=0,p.del1=0,p.del2=0,p.del3=0,p.didt=0,p.dmdt=0,p.dnodt=0,p.domdt=0,p.e3=0,p.ee2=0,p.peo=0,p.pgho=0,p.pho=0,p.pinco=0,p.plo=0,p.se2=0,p.se3=0,p.sgh2=0,p.sgh3=0,p.sgh4=0,p.sh2=0,p.sh3=0,p.si2=0,p.si3=0,p.sl2=0,p.sl3=0,p.sl4=0,p.gsto=0,p.xfact=0,p.xgh2=0,p.xgh3=0,p.xgh4=0,p.xh2=0,p.xh3=0,p.xi2=0,p.xi3=0,p.xl2=0,p.xl3=0,p.xl4=0,p.xlamo=0,p.zmol=0,p.zmos=0,p.atime=0,p.xli=0,p.xni=0,p.bstar=c,p.ecco=d,p.argpo=_,p.inclo=f,p.mo=m,p.no=y,p.nodeo=v,p.operationmode=s;var jt=78/Me+1,Wt=42/Me,re=Wt*Wt*Wt*Wt;p.init="y",p.t=0;var Le={satn:r,ecco:p.ecco,epoch:l,inclo:p.inclo,no:p.no,method:p.method,opsmode:p.operationmode},Et=ol(Le),Ht=Et.ao,Se=Et.con42,Qt=Et.cosio,te=Et.cosio2,Te=Et.eccsq,ue=Et.omeosq,ke=Et.posq,ye=Et.rp,ee=Et.rteosq,ie=Et.sinio;if(p.no=Et.no,p.con41=Et.con41,p.gsto=Et.gsto,p.a=Math.pow(p.no*Qa,-2/3),p.alta=p.a*(1+p.ecco)-1,p.altp=p.a*(1-p.ecco)-1,p.error=0,ue>=0||p.no>=0){if(p.isimp=0,ye<220/Me+1&&(p.isimp=1),I=jt,S=re,It=(ye-1)*Me,It<156){I=It-78,It<98&&(I=20);var me=(120-I)/Me;S=me*me*me*me,I=I/Me+1}rt=1/ke,nt=1/(Ht-I),p.eta=Ht*p.ecco*nt,j=p.eta*p.eta,D=p.ecco*p.eta,Lt=Math.abs(1-j),O=S*Math.pow(nt,4),Y=O/Math.pow(Lt,3.5),z=Y*p.no*(Ht*(1+1.5*j+D*(4+j))+.375*Pi*nt/Lt*p.con41*(8+3*j*(8+j))),p.cc1=p.bstar*z,B=0,p.ecco>1e-4&&(B=-2*O*nt*Ci*p.no*ie/p.ecco),p.x1mth2=1-te,p.cc4=2*p.no*Y*Ht*ue*(p.eta*(2+.5*j)+p.ecco*(.5+2*j)-Pi*nt/(Ht*Lt)*(-3*p.con41*(1-2*D+j*(1.5-.5*D))+.75*p.x1mth2*(2*j-D*(1+j))*Math.cos(2*p.argpo))),p.cc5=2*Y*Ht*ue*(1+2.75*(j+D)+D*j),W=te*te,it=1.5*Pi*rt*p.no,_t=.5*it*Pi*rt,ct=-.46875*el*rt*rt*p.no,p.mdot=p.no+.5*it*ee*p.con41+.0625*_t*ee*(13-78*te+137*W),p.argpdot=-.5*it*Se+.0625*_t*(7-114*te+395*W)+ct*(3-36*te+49*W),Ct=-it*Qt,p.nodedot=Ct+(.5*_t*(4-19*te)+2*ct*(3-7*te))*Qt,kt=p.argpdot+p.nodedot,p.omgcof=p.bstar*B*Math.cos(p.argpo),p.xmcof=0,p.ecco>1e-4&&(p.xmcof=-un*O*p.bstar/D),p.nodecf=3.5*ue*Ct*p.cc1,p.t2cof=1.5*p.cc1,Math.abs(Qt+1)>15e-13?p.xlcof=-.25*Ci*ie*(3+5*Qt)/(1+Qt):p.xlcof=-.25*Ci*ie*(3+5*Qt)/Gt,p.aycof=-.5*Ci*ie;var ge=1+p.eta*Math.cos(p.mo);if(p.delmo=ge*ge*ge,p.sinmao=Math.sin(p.mo),p.x7thm1=7*te-1,2*_e/p.no>=225){p.method="d",p.isimp=1,Pt=0,tt=p.inclo;var Yt={epoch:l,ep:p.ecco,argpp:p.argpo,tc:Pt,inclp:p.inclo,nodep:p.nodeo,np:p.no,e3:p.e3,ee2:p.ee2,peo:p.peo,pgho:p.pgho,pho:p.pho,pinco:p.pinco,plo:p.plo,se2:p.se2,se3:p.se3,sgh2:p.sgh2,sgh3:p.sgh3,sgh4:p.sgh4,sh2:p.sh2,sh3:p.sh3,si2:p.si2,si3:p.si3,sl2:p.sl2,sl3:p.sl3,sl4:p.sl4,xgh2:p.xgh2,xgh3:p.xgh3,xgh4:p.xgh4,xh2:p.xh2,xh3:p.xh3,xi2:p.xi2,xi3:p.xi3,xl2:p.xl2,xl3:p.xl3,xl4:p.xl4,zmol:p.zmol,zmos:p.zmos},M=rl(Yt);p.e3=M.e3,p.ee2=M.ee2,p.peo=M.peo,p.pgho=M.pgho,p.pho=M.pho,p.pinco=M.pinco,p.plo=M.plo,p.se2=M.se2,p.se3=M.se3,p.sgh2=M.sgh2,p.sgh3=M.sgh3,p.sgh4=M.sgh4,p.sh2=M.sh2,p.sh3=M.sh3,p.si2=M.si2,p.si3=M.si3,p.sl2=M.sl2,p.sl3=M.sl3,p.sl4=M.sl4,w=M.sinim,x=M.cosim,st=M.em,ot=M.emsq,Ot=M.s1,$=M.s2,U=M.s3,dt=M.s4,at=M.s5,K=M.ss1,H=M.ss2,R=M.ss3,Z=M.ss4,zt=M.ss5,mt=M.sz1,xt=M.sz3,et=M.sz11,Kt=M.sz13,At=M.sz21,Nt=M.sz23,ht=M.sz31,ft=M.sz33,p.xgh2=M.xgh2,p.xgh3=M.xgh3,p.xgh4=M.xgh4,p.xh2=M.xh2,p.xh3=M.xh3,p.xi2=M.xi2,p.xi3=M.xi3,p.xl2=M.xl2,p.xl3=M.xl3,p.xl4=M.xl4,p.zmol=M.zmol,p.zmos=M.zmos,G=M.nm,gt=M.z1,wt=M.z3,Dt=M.z11,Ft=M.z13,Rt=M.z21,Ut=M.z23,ce=M.z31,Xt=M.z33;var N={inclo:tt,init:p.init,ep:p.ecco,inclp:p.inclo,nodep:p.nodeo,argpp:p.argpo,mp:p.mo,opsmode:p.operationmode},be=ho(p,N);p.ecco=be.ep,p.inclo=be.inclp,p.nodeo=be.nodep,p.argpo=be.argpp,p.mo=be.mp,J=0,V=0,pt=0;var Ze={cosim:x,emsq:ot,argpo:p.argpo,s1:Ot,s2:$,s3:U,s4:dt,s5:at,sinim:w,ss1:K,ss2:H,ss3:R,ss4:Z,ss5:zt,sz1:mt,sz3:xt,sz11:et,sz13:Kt,sz21:At,sz23:Nt,sz31:ht,sz33:ft,t:p.t,tc:Pt,gsto:p.gsto,mo:p.mo,mdot:p.mdot,no:p.no,nodeo:p.nodeo,nodedot:p.nodedot,xpidot:kt,z1:gt,z3:wt,z11:Dt,z13:Ft,z21:Rt,z23:Ut,z31:ce,z33:Xt,ecco:p.ecco,eccsq:Te,em:st,argpm:J,inclm:tt,mm:pt,nm:G,nodem:V,irez:p.irez,atime:p.atime,d2201:p.d2201,d2211:p.d2211,d3210:p.d3210,d3222:p.d3222,d4410:p.d4410,d4422:p.d4422,d5220:p.d5220,d5232:p.d5232,d5421:p.d5421,d5433:p.d5433,dedt:p.dedt,didt:p.didt,dmdt:p.dmdt,dnodt:p.dnodt,domdt:p.domdt,del1:p.del1,del2:p.del2,del3:p.del3,xfact:p.xfact,xlamo:p.xlamo,xli:p.xli,xni:p.xni},vt=sl(Ze);p.irez=vt.irez,p.atime=vt.atime,p.d2201=vt.d2201,p.d2211=vt.d2211,p.d3210=vt.d3210,p.d3222=vt.d3222,p.d4410=vt.d4410,p.d4422=vt.d4422,p.d5220=vt.d5220,p.d5232=vt.d5232,p.d5421=vt.d5421,p.d5433=vt.d5433,p.dedt=vt.dedt,p.didt=vt.didt,p.dmdt=vt.dmdt,p.dnodt=vt.dnodt,p.domdt=vt.domdt,p.del1=vt.del1,p.del2=vt.del2,p.del3=vt.del3,p.xfact=vt.xfact,p.xlamo=vt.xlamo,p.xli=vt.xli,p.xni=vt.xni}p.isimp!==1&&(T=p.cc1*p.cc1,p.d2=4*Ht*nt*T,bt=p.d2*nt*p.cc1/3,p.d3=(17*Ht+I)*bt,p.d4=.5*bt*Ht*nt*(221*Ht+31*I)*p.cc1,p.t3cof=p.d2+2*T,p.t4cof=.25*(3*p.d3+p.cc1*(12*p.d2+10*T)),p.t5cof=.2*(3*p.d4+12*p.cc1*p.d3+6*p.d2*p.d2+15*T*(2*p.d2+T)))}co(p,0),p.init="n"}function uo(a){var i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"i",s=0,r=a.NORAD_CAT_ID.toString(),l=new Date(a.EPOCH.endsWith("Z")?a.EPOCH:a.EPOCH+"Z"),c=l.getUTCFullYear(),d=Number(c.toString().slice(-2)),_=(l.valueOf()-new Date(Date.UTC(c,0,1,0,0,0)).valueOf())/(86400*1e3)+1,f=Number(a.MEAN_MOTION_DOT),m=Number(a.MEAN_MOTION_DDOT),y=Number(a.BSTAR),v=Number(a.INCLINATION)*dn,x=Number(a.RA_OF_ASC_NODE)*dn,w=Number(a.ECCENTRICITY),T=Number(a.ARG_OF_PERICENTER)*dn,z=Number(a.MEAN_ANOMALY)*dn,B=Number(a.MEAN_MOTION)/il,O=nl(c,_),Y=O.mon,W=O.day,st=O.hr,ot=O.minute,D=O.sec,j=Gn(c,Y,W,st,ot,D),J={error:s,satnum:r,epochyr:d,epochdays:_,ndot:f,nddot:m,bstar:y,inclo:v,nodeo:x,ecco:w,argpo:T,mo:z,no:B,jdsatepoch:j};return ll(J,{opsmode:i,satn:J.satnum,epoch:J.jdsatepoch-24332815e-1,xbstar:J.bstar,xecco:J.ecco,xargpo:J.argpo,xinclo:J.inclo,xmo:J.mo,xno:J.no,xnodeo:J.nodeo}),J}function po(a){for(var i=arguments.length,s=new Array(i>1?i-1:0),r=1;r<i;r++)s[r-1]=arguments[r];var l=Gn.apply(void 0,s),c=(l-a.jdsatepoch)*Ja;return co(a,c)}function fo(a){return a*Ya}function _o(a){if(a<-_e/2||a>_e/2)throw new RangeError("Latitude radians must be in range [-pi/2; pi/2].");return fo(a)}function mo(a){if(a<-_e||a>_e)throw new RangeError("Longitude radians must be in range [-pi; pi].");return fo(a)}function go(a,i){for(var s=6378.137,r=6356.7523142,l=Math.sqrt(a.x*a.x+a.y*a.y),c=(s-r)/s,d=2*c-c*c,_=Math.atan2(a.y,a.x)-i;_<-_e;)_+=Bt;for(;_>_e;)_-=Bt;for(var f=20,m=0,y=Math.atan2(a.z,Math.sqrt(a.x*a.x+a.y*a.y)),v;m++<f;)v=1/Math.sqrt(1-d*(Math.sin(y)*Math.sin(y))),y=Math.atan2(a.z+s*v*d*Math.sin(y),l);var x=l/Math.cos(y)-s*v;return{longitude:_,latitude:y,height:x}}var qn=class{constructor(){this._records=new Map,this._positions=new Map,this.group=null}setOmm(i,s){this.group=s||null,this._records.clear();for(let r of i||[])try{let l=uo(r);if(l.error)continue;this._records.set(`sat:${r.NORAD_CAT_ID}`,{satrec:l,omm:r})}catch{}for(let r of[...this._positions.keys()])this._records.has(r)||this._positions.delete(r)}get size(){return this._records.size}tick(i=new Date,s=null){let r=Wn(i);for(let[l,{satrec:c}]of this._records){if(s&&!s(l,this._positions.get(l)))continue;let d=this._propagate(c,i,r);d?this._positions.set(l,{...d,t:i.getTime()}):this._positions.delete(l)}}features(i){let s=[];for(let[r,{omm:l}]of this._records){let c=this._positions.get(r);c&&s.push({type:"Feature",id:r,geometry:{type:"Point",coordinates:[c.lon,c.lat,Math.round(c.alt*1e3)]},properties:{label:l.OBJECT_NAME,kind:"satellite",ts:new Date(c.t).toISOString(),alt_m:Math.round(c.alt*1e3),color:i,detail:{norad:l.NORAD_CAT_ID,object_id:l.OBJECT_ID,group:this.group,epoch:l.EPOCH,inclination_deg:l.INCLINATION,period_min:l.MEAN_MOTION?Math.round(1440/l.MEAN_MOTION*10)/10:null}}})}return s}groundTrack(i,s=new Date,r=45,l=60){let c=this._records.get(i);if(!c)return[];let d=[],_=null;for(let y=-r*60;y<=r*60;y+=l){let v=new Date(s.getTime()+y*1e3),x=this._propagate(c.satrec,v,Wn(v));x&&(_&&Math.abs(x.lon-_.lon)>180&&d.push(null),d.push([x.lat,x.lon]),_=x)}let f=[],m=[];for(let y of d)y===null?(m.length>1&&f.push(m),m=[]):m.push(y);return m.length>1&&f.push(m),f}_propagate(i,s,r){try{let l=po(i,s);if(!l||!l.position||typeof l.position!="object")return null;let c=go(l.position,r),d=_o(c.latitude),_=mo(c.longitude);return!Number.isFinite(d)||!Number.isFinite(_)||!Number.isFinite(c.height)?null:{lat:d,lon:_,alt:c.height}}catch{return null}}};var hl={"chronotope-raster":250,"chronotope-grid":300,"chronotope-shapes":350,"chronotope-points":450,"chronotope-tracks":500,"chronotope-geofeeds":550},cl=100,dl=1e3,pn={osm:{type:"xyz",url:"https://tile.openstreetmap.org/{z}/{x}/{y}.png",max_zoom:19,attribution:{text:"\xA9 OpenStreetMap contributors",url:"https://www.openstreetmap.org/copyright"},invert_dark:!0}},fn=class extends he{constructor(){super(),this.events=[],this.radiusKm=10,this.radiusEnabled=!1,this.zones=[],this.persons=[],this.geoMarkers=[],this.capture=null,this.dark=!1,this.basemap="osm",this.basemaps=pn,this.registry=null,this.layerVersion=0,this.initialView=null,this.showEvents=!0,this._markersById=new Map,this._didInitialFit=!1,this._zonesSignature="",this._personsSignature="",this._geoSignature="",this._layerObjs=new Map,this._selectedFeature=null,this._satTrackers=new Map,this._interpolators=new Map}render(){return E`<div id="map"></div>`}firstUpdated(){let i=this.initialView?.center||(this.center?[this.center.lat,this.center.lon]:[52.52,13.405]);this._map=Tt.default.map(this.renderRoot.getElementById("map"),{center:i,zoom:this.initialView?.zoom||12,zoomControl:!0,worldCopyJump:!0});for(let[s,r]of Object.entries(hl)){let l=this._map.createPane(s);l.style.zIndex=String(r)}this._attribution=new Hn(this._map,k),this._canvasRenderer=Tt.default.canvas({pane:"chronotope-shapes",padding:.3}),this._renderBasemap(),this._zoneLayer=Tt.default.layerGroup().addTo(this._map),this._geoFeedLayer=new Fn({pane:"chronotope-geofeeds",icon:"diamond",color:this._cssVar("--info-color","#2196f3"),size:5}),this._geoFeedLayer.on("featureclick",s=>this._openTextPopup(s.latlng,s.feature.properties.label,s.feature.properties.detail?.text)),this._geoFeedLayer.addTo(this._map),this._personLayer=Tt.default.layerGroup().addTo(this._map),this._shapeLayer=Tt.default.featureGroup().addTo(this._map),this._clusterGroup=Tt.default.markerClusterGroup({maxClusterRadius:40,showCoverageOnHover:!1}).addTo(this._map),this._radiusLayer=Tt.default.layerGroup().addTo(this._map),this._captureLayer=Tt.default.layerGroup().addTo(this._map),this._trailLayer=Tt.default.layerGroup().addTo(this._map),this._map.on("click",s=>{s.originalEvent?.defaultPrevented||this.dispatchEvent(new CustomEvent("map-click",{detail:{lat:s.latlng.lat,lon:s.latlng.lng}}))}),this._map.on("moveend zoomend",()=>this._emitViewport()),this._resizeObserver=new ResizeObserver(()=>this._map.invalidateSize()),this._resizeObserver.observe(this),this._renderEvents(),this._renderRadius(),this._renderZones(),this._renderPersons(),this._renderGeoMarkers(),this._renderLayers(),this._emitViewport(),this._startAnimation()}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),clearInterval(this._trackTimer),clearInterval(this._satTimer),this._map?.remove(),this._map=void 0}updated(i){this._map&&((i.has("events")||i.has("showEvents"))&&this._renderEvents(),(i.has("center")||i.has("radiusKm")||i.has("radiusEnabled"))&&this._renderRadius(),i.has("zones")&&this._renderZones(),i.has("persons")&&this._renderPersons(),i.has("geoMarkers")&&this._renderGeoMarkers(),i.has("capture")&&this._renderCapture(),(i.has("basemap")||i.has("basemaps")||i.has("dark"))&&this._renderBasemap(),(i.has("layerVersion")||i.has("registry"))&&this._renderLayers(),i.has("selectedId")&&this.selectedId&&this._focusEvent(this.selectedId))}setView(i,s,r){this._map&&this._map.setView([i,s],r??this._map.getZoom())}getCenter(){if(!this._map)return null;let i=this._map.getCenter();return{lat:i.lat,lon:i.lng}}_cssVar(i,s){return getComputedStyle(this).getPropertyValue(i).trim()||s}_accentColor(){return this._cssVar("--primary-color","#03a9f4")}_emitViewport(){clearTimeout(this._viewportTimer),this._viewportTimer=setTimeout(()=>{if(!this._map)return;let i=this._map.getBounds(),s=[i.getWest(),i.getSouth(),i.getEast(),i.getNorth()].map(l=>l.toFixed(4)).join(","),r=this._map.getCenter();this.dispatchEvent(new CustomEvent("viewport-changed",{detail:{bbox:s,zoom:this._map.getZoom(),center:{lat:r.lat,lon:r.lng}}})),this._refreshAttribution()},150)}_openTextPopup(i,s,r){let l=document.createElement("div"),c=document.createElement("div");if(c.className="popup-title",c.textContent=String(s??""),l.append(c),r){let d=document.createElement("div");d.className="popup-meta",d.textContent=String(r),l.append(d)}Tt.default.popup({maxWidth:280}).setLatLng(i).setContent(l).openOn(this._map)}_renderBasemap(){let i=this.basemaps&&Object.keys(this.basemaps).length?this.basemaps:pn,s=i[this.basemap]?this.basemap:"osm",r=i[s]||pn.osm;r.invert_dark===!1?this.setAttribute("no-invert",""):this.removeAttribute("no-invert"),!(this._basemapKey===s&&this._basemapLayer)&&(this._basemapLayer&&this._map.removeLayer(this._basemapLayer),this._basemapKey=s,this._basemapLayer=Ir({...r,opacity:1},{pane:"tilePane",opacity:1}),this._basemapLayer.addTo(this._map),this._refreshAttribution())}_refreshAttribution(){if(!this._attribution)return;let i=[],r=(this.basemaps&&Object.keys(this.basemaps).length?this.basemaps:pn)[this._basemapKey]||pn.osm;r.attribution&&i.push(r.attribution);for(let[l]of this._layerObjs){let c=this.registry?.definition(l),_=this.registry?.docs.get(l)?.meta?.attribution||c?.attribution;_?.text&&i.push(_)}this._attribution.setEntries(i)}_renderEvents(){if(this._clusterGroup.clearLayers(),this._shapeLayer.clearLayers(),this._markersById.clear(),this.showEvents===!1)return;let i=this._accentColor();for(let s of this.events||[]){let r=null,l=!1;if(s.geometry)try{r=Tt.default.geoJSON(JSON.parse(s.geometry),{style:this._shapeStyle(i,s),pointToLayer:(c,d)=>Tt.default.circleMarker(d,this._markerStyle(i,s))})}catch(c){console.warn("chronotope: invalid geometry for event",s.id,c)}!r&&s.lat!=null&&s.lon!=null&&(r=Tt.default.circleMarker([s.lat,s.lon],this._markerStyle(i,s)),l=!0),r&&(r.bindPopup(this._popupHtml(s)),r.on("click",()=>{this.dispatchEvent(new CustomEvent("event-selected",{detail:{id:s.id}}))}),(l?this._clusterGroup:this._shapeLayer).addLayer(r),this._markersById.set(s.id,{layer:r,clustered:l}))}if(!this._didInitialFit&&this._markersById.size>0&&!this.initialView){this._didInitialFit=!0;let s=this._clusterGroup.getBounds().extend(this._shapeLayer.getBounds());s.isValid()&&this._map.fitBounds(s.pad(.2),{maxZoom:14})}}_markerStyle(i,s){return{radius:9,color:i,weight:2,fillColor:i,fillOpacity:s?.favorite?.75:.35,dashArray:s?.time_precision==="approximate"?"3 4":null}}_shapeStyle(i,s){return{color:i,weight:3,fillOpacity:.2,dashArray:s?.time_precision==="approximate"?"6 6":null}}_popupHtml(i){let s=document.createElement("div"),r=document.createElement("div");r.className="popup-title",r.textContent=i.title;let l=document.createElement("div");l.className="popup-meta";let c=i.occurrences?.[0]?.[0]??i.start_time,d=i.time_precision==="approximate"&&i.schedule_text?`~ ${i.schedule_text}`:new Date(c).toLocaleString();if(l.textContent=`${i.category||""} ${d}`.trim(),s.append(r,l),i.address){let _=document.createElement("div");_.className="popup-meta",_.textContent=i.address,s.append(_)}if(i.raw_description){let _=document.createElement("div");_.className="popup-meta",_.textContent=i.raw_description.length>240?`${i.raw_description.slice(0,240)}\u2026`:i.raw_description,s.append(_)}if(i.source_url){let _=document.createElement("div");_.className="popup-meta";let f=document.createElement("a");f.href=i.source_url,f.target="_blank",f.rel="noopener noreferrer",f.textContent=i.source_name||k("list.source"),_.append(f),s.append(_)}if(i.lat!=null&&i.lon!=null){let _=document.createElement("div");_.className="popup-meta";let f=document.createElement("a");f.href=`https://www.openstreetmap.org/directions?to=${i.lat}%2C${i.lon}`,f.target="_blank",f.rel="noopener noreferrer",f.textContent=k("map.route"),_.append(f),s.append(_)}return s}_renderRadius(){if(this._radiusLayer.clearLayers(),!this.radiusEnabled||!this.center)return;let i=this._accentColor();Tt.default.circle([this.center.lat,this.center.lon],{radius:this.radiusKm*1e3,color:i,weight:1.5,dashArray:"6 6",fillOpacity:.05}).addTo(this._radiusLayer),Tt.default.circleMarker([this.center.lat,this.center.lon],{radius:4,color:i,fillColor:i,fillOpacity:1}).addTo(this._radiusLayer)}_renderZones(){if(!this._map)return;let i=JSON.stringify(this.zones||[]);if(i===this._zonesSignature)return;this._zonesSignature=i,this._zoneLayer.clearLayers();let s=this._cssVar("--accent-color","#ff9800");for(let r of this.zones||[]){let l=document.createElement("span");l.textContent=r.name,Tt.default.circle([r.lat,r.lon],{radius:r.radius,color:s,weight:1.5,dashArray:r.passive?"2 6":"4 4",fillColor:s,fillOpacity:.06}).bindTooltip(l).addTo(this._zoneLayer),r.home&&Tt.default.marker([r.lat,r.lon],{icon:Tt.default.divIcon({className:"zone-home-icon",html:no,iconSize:[24,24],iconAnchor:[12,12]}),interactive:!1,keyboard:!1}).addTo(this._zoneLayer)}}_renderPersons(){if(!this._map)return;let i=JSON.stringify(this.persons||[]);if(i!==this._personsSignature){this._personsSignature=i,this._personLayer.clearLayers();for(let s of this.persons||[]){let r;s.picture?(r=document.createElement("img"),r.alt="",r.src=String(s.picture)):(r=document.createElement("span"),r.className="initial",r.textContent=(s.name||"?")[0].toUpperCase());let l=document.createElement("span");l.textContent=`${s.name} (${s.state})`,Tt.default.marker([s.lat,s.lon],{icon:Tt.default.divIcon({className:"person-icon",html:r,iconSize:[28,28],iconAnchor:[14,14]}),keyboard:!1,zIndexOffset:1e3}).bindTooltip(l).addTo(this._personLayer)}}}_renderGeoMarkers(){if(!this._map)return;let i=JSON.stringify(this.geoMarkers||[]);if(i===this._geoSignature)return;this._geoSignature=i;let s=(this.geoMarkers||[]).map(r=>({type:"Feature",id:r.id,geometry:{type:"Point",coordinates:[r.lon,r.lat]},properties:{label:r.name,kind:r.source,ts:null,detail:{text:`${r.source}`+(r.distance&&r.distance!=="unknown"?` \xB7 ${r.distance} ${r.unit}`:"")}}}));this._geoFeedLayer.setFeatures(s)}_renderCapture(){if(this._captureLayer.clearLayers(),this.capture?.mode)this.setAttribute("data-capturing","");else{this.removeAttribute("data-capturing");return}let i=this._accentColor(),s=this.capture.points||[];for(let[r,l]of s)Tt.default.circleMarker([r,l],{radius:5,color:i,fillColor:i,fillOpacity:.9}).addTo(this._captureLayer);if(s.length>=2){let r=s.map(([l,c])=>[l,c]);this.capture.mode==="polygon"&&s.length>=3?Tt.default.polygon(r,{color:i,weight:2,dashArray:"4 4",fillOpacity:.1}).addTo(this._captureLayer):Tt.default.polyline(r,{color:i,weight:2,dashArray:"4 4"}).addTo(this._captureLayer)}}_focusEvent(i){let s=this._markersById.get(i);if(!s)return;let{layer:r,clustered:l}=s;l&&r.getLatLng?this._clusterGroup.zoomToShowLayer(r,()=>r.openPopup()):r.getBounds?(this._map.fitBounds(r.getBounds().pad(.3),{maxZoom:15}),r.openPopup()):r.getLatLng&&(this._map.panTo(r.getLatLng()),r.openPopup())}_renderLayers(){if(!this._map)return;let i=this.registry,s=i?i.activeIds():[],r=new Set(s);for(let l of[...this._layerObjs.keys()])r.has(l)||this._removeLayer(l);for(let l of s){let c=i.definition(l);if(!c)continue;let d=i.docs.get(l);this._renderLayer(c,d)}this._refreshAttribution()}_removeLayer(i){let s=this._layerObjs.get(i);if(s){for(let r of s.objects)this._map.removeLayer(r);this._layerObjs.delete(i),this._satTrackers.delete(i),this._interpolators.delete(i),this._selectedFeature?.layerId===i&&(this._selectedFeature=null,this._trailLayer.clearLayers())}}_renderLayer(i,s){let r=i.id,l=JSON.stringify({klass:i.klass,raster:i.raster,opacity:i.opacity,url:i.config?.url,params:i.config?.params}),c=this._layerObjs.get(r);switch(c&&c.signature!==l&&(this._removeLayer(r),c=null),i.klass){case"raster":if(!c){let d=i.raster;if(!d)return;let _=Ir({...d,provider:d.provider||d.type},{opacity:i.opacity,pane:"chronotope-raster"});_.addTo(this._map),this._layerObjs.set(r,{signature:l,objects:[_],kind:"raster"})}return;case"grid":{if(!c){let d=new oo({pane:"chronotope-grid",opacity:i.opacity,threshold:i.style?.threshold??5});d.addTo(this._map),c={signature:l,objects:[d],kind:"grid",docVersion:null},this._layerObjs.set(r,c)}s?.grid&&c.docVersion!==s.receivedAt&&(c.docVersion=s.receivedAt,c.objects[0].setGrid(s.grid));return}case"features":this._renderFeaturesLayer(i,s,c,l);return;case"tracks":this._renderTracksLayer(i,s,c,l);return;default:return}}_renderFeaturesLayer(i,s,r,l){let c=i.id;if(!r){let m=new Fn({pane:"chronotope-points",icon:(i.style?.icon==="relay"||i.style?.icon==="radio","circle"),color:i.style?.color||"#66bb6a",size:5,opacity:i.opacity});m.on("featureclick",y=>this._onLayerFeatureClick(i,y.feature,y.latlng)),m.addTo(this._map),r={signature:l,objects:[m],kind:"features",docVersion:null,shapes:null},this._layerObjs.set(c,r)}if(!s||r.docVersion===s.receivedAt)return;r.docVersion=s.receivedAt;let d=s.features||[],_=d.filter(m=>m.geometry?.type==="Point"),f=d.filter(m=>m.geometry&&m.geometry.type!=="Point");if(r.objects[0].setFeatures(_),r.shapes&&(this._map.removeLayer(r.shapes),r.objects=r.objects.filter(m=>m!==r.shapes),r.shapes=null),f.length){let m=ao(f,{style:i.style,renderer:this._canvasRenderer,pane:"chronotope-shapes",meta:s.meta,t:k,opacity:i.opacity});m.addTo(this._map),r.shapes=m,r.objects.push(m)}}_renderTracksLayer(i,s,r,l){let c=i.id,d=i.style?.propagate==="browser";if(!r){let _=new Fn({pane:"chronotope-tracks",icon:i.style?.icon||"circle",color:i.style?.color||"#42a5f5",rotateBy:i.style?.rotate_by||null,size:d?4:6,labels:!0});_.on("featureclick",f=>this._onLayerFeatureClick(i,f.feature,f.latlng)),_.addTo(this._map),r={signature:l,objects:[_],kind:d?"satellites":"tracks",docVersion:null},this._layerObjs.set(c,r),d?this._satTrackers.set(c,new qn):this._interpolators.set(c,new Un({intervalMs:i.interval}))}if(!(!s||r.docVersion===s.receivedAt))if(r.docVersion=s.receivedAt,d){let _=this._satTrackers.get(c);_.setOmm(s.omm||[],s.meta?.group),_.tick(new Date),r.objects[0].setFeatures(_.features(i.style?.color))}else{let _=this._interpolators.get(c);_.setInterval(i.interval),_.ingest(s.features||[],s.receivedAt)}}_startAnimation(){clearInterval(this._trackTimer),clearInterval(this._satTimer),this._trackTimer=setInterval(()=>{if(document.hidden)return;let s=Date.now();for(let[r,l]of this._interpolators){let c=this._layerObjs.get(r);c&&(c.objects[0].setFeatures(l.featuresAt(s)),this._selectedFeature?.layerId===r&&this._drawTrail(r,l.trail(this._selectedFeature.id,s)))}},cl);let i=0;this._satTimer=setInterval(()=>{if(document.hidden||!this._map)return;i+=1;let s=this._map.getBounds().pad(.2),r=i%10===0;for(let[l,c]of this._satTrackers){let d=this._layerObjs.get(l);if(!d)continue;c.tick(new Date,r?null:(f,m)=>!m||s.contains([m.lat,m.lon]));let _=this.registry?.definition(l);d.objects[0].setFeatures(c.features(_?.style?.color)),this._selectedFeature?.layerId===l&&i%30===0&&this._drawGroundTrack(l,this._selectedFeature.id)}},dl)}_onLayerFeatureClick(i,s,r){let l=this.registry?.docs.get(i.id),c={lines:[]};i.klass==="tracks"&&l?.meta?.fallback&&c.lines.push(k("layers.fallback"));let d=Rn(s,l?.meta,k,c);Tt.default.popup({maxWidth:320}).setLatLng(r).setContent(d).openOn(this._map),this._selectedFeature={layerId:i.id,id:s.id};for(let[_,f]of this._layerObjs)f.objects[0]?.setSelected&&f.objects[0].setSelected(_===i.id?s.id:null);this._trailLayer.clearLayers(),this._satTrackers.has(i.id)&&this._drawGroundTrack(i.id,s.id),this.dispatchEvent(new CustomEvent("layer-feature-selected",{detail:{layerId:i.id,feature:s}}))}_drawTrail(i,s){if(this._trailLayer.clearLayers(),!s||s.length<2)return;let r=this.registry?.definition(i);Tt.default.polyline(s,{color:r?.style?.color||"#42a5f5",weight:2,opacity:.7,pane:"chronotope-tracks",renderer:this._canvasRenderer}).addTo(this._trailLayer)}_drawGroundTrack(i,s){let r=this._satTrackers.get(i);if(!r)return;this._trailLayer.clearLayers();let c=this.registry?.definition(i)?.style?.color||"#ffb300";for(let d of r.groundTrack(s,new Date))Tt.default.polyline(d,{color:c,weight:1.5,opacity:.8,dashArray:"4 6"}).addTo(this._trailLayer)}};le(fn,"properties",{events:{attribute:!1},center:{attribute:!1},radiusKm:{attribute:!1},radiusEnabled:{attribute:!1},zones:{attribute:!1},persons:{attribute:!1},geoMarkers:{attribute:!1},capture:{attribute:!1},selectedId:{attribute:!1},dark:{type:Boolean,reflect:!0},basemap:{attribute:!1},basemaps:{attribute:!1},registry:{attribute:!1},layerVersion:{attribute:!1},initialView:{attribute:!1},showEvents:{attribute:!1}}),le(fn,"styles",[fe`
      ${Ni(Vs)}
    `,fe`
      ${Ni(ro)}
    `,fe`
      ${Ni(so)}
    `,fe`
      :host {
        display: block;
        position: relative;
      }
      #map {
        position: absolute;
        inset: 0;
        background: var(--card-background-color, #fafafa);
      }
      /* Dark mode inverts only the base map tiles, never data rasters (7.5). */
      :host([dark]:not([no-invert])) .leaflet-tile-pane {
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
      .popup-meta a {
        color: var(--primary-color, #03a9f4);
        text-decoration: none;
      }
      .popup-detail {
        font-size: 0.8em;
        border-collapse: collapse;
        margin-top: 4px;
      }
      .popup-detail td {
        padding: 0 6px 0 0;
        vertical-align: top;
      }
      .popup-detail td:first-child {
        color: var(--secondary-text-color, #727272);
      }
      .zone-home-icon {
        background: none;
        border: none;
      }
      .zone-home-icon svg {
        width: 100%;
        height: 100%;
        fill: var(--accent-color, #ff9800);
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
      }
      .person-icon {
        border-radius: 50%;
        border: 2px solid var(--primary-color, #03a9f4);
        background: var(--card-background-color, #fff);
        overflow: hidden;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
      }
      .person-icon img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .person-icon .initial {
        display: block;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 24px;
        font-size: 13px;
        font-weight: 600;
        color: var(--primary-color, #03a9f4);
      }
      .chronotope-canvas {
        position: absolute;
        left: 0;
        top: 0;
      }
      :host([data-capturing]) #map {
        cursor: crosshair;
      }
    `]);Ae("chronotope-map-view",fn);var _n=class extends he{constructor(){super(),this.profiles=[],this.selectedProfileId="",this.collapsed=!1,this.layersCollapsed=!0,this.narrow=!1,this._profileName=""}_activeFilterCount(){let i=this.state||{},s=0;return i.categories?.length&&(s+=1),i.radiusEnabled&&(s+=1),(i.start||i.end)&&(s+=1),i.weekdays?.length&&(s+=1),i.timeMode==="range"&&(i.timeFrom||i.timeTo)&&(s+=1),i.text&&(s+=1),i.favoritesOnly&&(s+=1),s}updated(i){if(i.has("selectedProfileId")){let s=(this.profiles||[]).find(r=>r.id===this.selectedProfileId);this._profileName=s?s.name:""}}render(){let i=this.state,s=this._activeFilterCount();return E`
      <button
        class="toggle-row"
        title=${this.collapsed?k("filters.show"):k("filters.hide")}
        @click=${()=>this.dispatchEvent(new CustomEvent("toggle-collapsed"))}
      >
        <span>
          ${k("filters.label")}
          ${s?E` <span class="active-count">· ${k("filters.active",{n:s})}</span>`:F}
        </span>
        ${this.collapsed?Sr:Tr}
      </button>
      ${this.collapsed?F:this._renderGroups(i)}
    `}_renderGroups(i){return E`
      <div class="groups">
        <div class="group">
          <span class="label">${k("profile.label")}</span>
          <div class="row">
            <select
              .value=${this.selectedProfileId||""}
              @change=${s=>this.dispatchEvent(new CustomEvent("profile-selected",{detail:{id:s.target.value}}))}
            >
              <option value="">${k("profile.none")}</option>
              ${(this.profiles||[]).map(s=>E`
                  <option value=${s.id} ?selected=${s.id===this.selectedProfileId}>
                    ${s.name}
                  </option>
                `)}
            </select>
            <input
              type="text"
              placeholder=${k("profile.placeholder")}
              .value=${this._profileName}
              @input=${s=>this._profileName=s.target.value}
            />
            <button
              class="ics-button"
              title=${k("profile.save.title")}
              @click=${this._saveProfile}
            >
              ${k("profile.save")}
            </button>
            ${this.selectedProfileId?E`<button
                  class="ics-button"
                  title=${k("profile.delete.title")}
                  @click=${()=>this.dispatchEvent(new CustomEvent("profile-delete",{detail:{id:this.selectedProfileId}}))}
                >
                  ${k("profile.delete")}
                </button>`:F}
          </div>
        </div>

        <div class="group">
          <span class="label">${k("search.label")}</span>
          <div class="row">
            <input
              type="text"
              placeholder=${k("search.placeholder")}
              .value=${i.text||""}
              @input=${s=>this._patch({text:s.target.value})}
            />
            <label class="row" style="gap:4px">
              <input
                type="checkbox"
                .checked=${i.favoritesOnly}
                @change=${s=>this._patch({favoritesOnly:s.target.checked})}
              />
              ${k("search.favorites")}
            </label>
            <label class="row" style="gap:4px">
              <input
                type="checkbox"
                .checked=${i.showHidden}
                @change=${s=>this._patch({showHidden:s.target.checked})}
              />
              ${k("search.showHidden")}
            </label>
          </div>
        </div>

        <div class="group">
          <span class="label">${k("category.label")}</span>
          <div class="chips">
            ${(this.categories||[]).length===0?E`<span class="hint">${k("category.none")}</span>`:(this.categories||[]).map(s=>E`
                    <button
                      class="chip"
                      aria-pressed=${i.categories.includes(s)?"true":"false"}
                      @click=${()=>this._toggleCategory(s)}
                    >
                      ${s}
                    </button>
                  `)}
          </div>
        </div>

        <div class="group">
          <span class="label">${k("radius.label")}</span>
          <div class="row">
            <input
              type="checkbox"
              id="radius-enabled"
              .checked=${i.radiusEnabled}
              @change=${s=>this._patch({radiusEnabled:s.target.checked})}
            />
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              .value=${String(i.radiusKm)}
              ?disabled=${!i.radiusEnabled}
              @input=${s=>this._patch({radiusKm:Number(s.target.value)})}
            />
            <span>${i.radiusKm} km</span>
          </div>
          <span class="hint">${k("radius.hint")}</span>
        </div>

        <div class="group">
          <span class="label">${k("window.label")}</span>
          <div class="row">
            <input
              type="datetime-local"
              .value=${i.start}
              @change=${s=>this._patch({start:s.target.value,dayFilter:""})}
            />
            <span>–</span>
            <input
              type="datetime-local"
              .value=${i.end}
              @change=${s=>this._patch({end:s.target.value,dayFilter:""})}
            />
          </div>
          ${this._renderDaySlider(i)}
        </div>

        <div class="group">
          <span class="label">${k("weekdays.label")}</span>
          <div class="chips">
            ${k("weekdays.short").map((s,r)=>E`
                <button
                  class="chip"
                  aria-pressed=${i.weekdays.includes(r)?"true":"false"}
                  @click=${()=>this._toggleWeekday(r)}
                >
                  ${s}
                </button>
              `)}
          </div>
          <div class="row">
            <select
              .value=${i.timeMode}
              @change=${s=>this._patch({timeMode:s.target.value})}
            >
              <option value="allday">${k("time.allday")}</option>
              <option value="range">${k("time.range")}</option>
            </select>
            ${i.timeMode==="range"?E`
                  <input
                    type="time"
                    .value=${i.timeFrom}
                    @change=${s=>this._patch({timeFrom:s.target.value})}
                  />
                  <span>–</span>
                  <input
                    type="time"
                    .value=${i.timeTo}
                    @change=${s=>this._patch({timeTo:s.target.value})}
                  />
                `:F}
          </div>
        </div>

        <div class="group">
          <span class="label">${k("map.label")}</span>
          <label class="row">
            <input
              type="checkbox"
              .checked=${i.showZones}
              @change=${s=>this._patch({showZones:s.target.checked})}
            />
            ${k("map.zones")}
          </label>
          <label class="row">
            <input
              type="checkbox"
              .checked=${i.showPersons}
              @change=${s=>this._patch({showPersons:s.target.checked})}
            />
            ${k("map.persons")}
          </label>
          <label class="row">
            <input
              type="checkbox"
              .checked=${i.showGeoFeeds}
              @change=${s=>this._patch({showGeoFeeds:s.target.checked})}
            />
            ${k("map.geofeeds")}
          </label>
        </div>

        <div class="group">
          <span class="label">${k("export.label")}</span>
          <button
            class="ics-button"
            @click=${()=>this.dispatchEvent(new CustomEvent("ics-requested"))}
          >
            ${this.icsCopied?k("export.copied"):k("export.copy")}
          </button>
          ${this._renderStats()}
        </div>

        <div class="group layers">
          <button
            class="toggle-row layers-toggle"
            @click=${()=>this.dispatchEvent(new CustomEvent("toggle-layers"))}
          >
            <span>${k("layers.label")}</span>
            ${this.layersCollapsed?Sr:Tr}
          </button>
          ${this.layersCollapsed?F:E`<slot name="layers"></slot>`}
        </div>

        <div class="group">
          <span class="label">${k("view.label")}</span>
          <button
            class="ics-button"
            title=${k("view.reset.title")}
            @click=${()=>this.dispatchEvent(new CustomEvent("reset-requested"))}
          >
            ${k("view.reset")}
          </button>
        </div>
      </div>
    `}_renderStats(){let i=this.stats;return i?E`
      <details class="stats" @toggle=${s=>{s.target.open&&this.dispatchEvent(new CustomEvent("stats-requested"))}}>
        <summary>${k("stats.summary",{n:i.total_events})}</summary>
        <table>
          <tr><td>${k("stats.places")}</td><td>${i.places}</td></tr>
          <tr><td>${k("stats.profiles")}</td><td>${i.profiles}</td></tr>
          ${(i.sources||[]).map(s=>E`
              <tr>
                <td>${s.source}</td>
                <td>
                  ${s.events} ${k("stats.events")}${s.last_scraped?E`, ${k("stats.last")}
                      ${new Date(s.last_scraped).toLocaleDateString()}`:F}
                </td>
              </tr>
            `)}
        </table>
      </details>
    `:F}_patch(i){this.dispatchEvent(new CustomEvent("filters-changed",{detail:i}))}_renderDaySlider(i){if(!i.start||!i.end)return F;let s=new Date(i.start);s.setHours(0,0,0,0);let r=new Date(i.end),l=Math.min(Math.ceil((r-s)/864e5),60);if(l<2)return F;let c=m=>{if(!m)return 0;let y=new Date(`${m}T00:00:00`);return Math.round((y-s)/864e5)+1},d=m=>{if(!m)return"";let y=new Date(s.getTime()+(m-1)*864e5),v=x=>String(x).padStart(2,"0");return`${y.getFullYear()}-${v(y.getMonth()+1)}-${v(y.getDate())}`},_=c(i.dayFilter),f=i.dayFilter?new Date(`${i.dayFilter}T00:00:00`).toLocaleDateString(void 0,{weekday:"short",day:"2-digit",month:"2-digit"}):k("window.allDays");return E`
      <div class="row">
        <input
          type="range"
          min="0"
          max=${String(l)}
          step="1"
          .value=${String(_)}
          @input=${m=>this._patch({dayFilter:d(Number(m.target.value))})}
        />
        <span>${f}</span>
      </div>
    `}_saveProfile(){let i=(this._profileName||"").trim();if(!i)return;let s=(this.profiles||[]).find(r=>r.id===this.selectedProfileId);this.dispatchEvent(new CustomEvent("profile-save",{detail:{name:i,id:s&&s.name===i?s.id:void 0}}))}_toggleCategory(i){let s=this.state.categories.includes(i)?this.state.categories.filter(r=>r!==i):[...this.state.categories,i];this._patch({categories:s})}_toggleWeekday(i){let s=this.state.weekdays.includes(i)?this.state.weekdays.filter(r=>r!==i):[...this.state.weekdays,i];this._patch({weekdays:s})}};le(_n,"properties",{state:{attribute:!1},categories:{attribute:!1},icsCopied:{attribute:!1},profiles:{attribute:!1},selectedProfileId:{attribute:!1},stats:{attribute:!1},collapsed:{type:Boolean,reflect:!0},layersCollapsed:{type:Boolean},narrow:{type:Boolean,reflect:!0},_profileName:{state:!0}}),le(_n,"styles",fe`
    :host {
      display: block;
      background: var(--card-background-color, #fff);
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      font-size: 14px;
    }
    .toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      border: none;
      background: none;
      cursor: pointer;
      font: inherit;
      font-size: 13px;
      color: var(--secondary-text-color, #727272);
      padding: 8px 16px;
    }
    .toggle-row .icon {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }
    .toggle-row .active-count {
      color: var(--primary-color, #03a9f4);
      font-weight: 500;
    }
    .groups {
      display: flex;
      flex-wrap: wrap;
      gap: 16px 24px;
      align-items: flex-start;
      padding: 0 16px 12px;
    }
    :host([narrow]) .groups {
      flex-direction: column;
      gap: 14px;
      max-height: 60vh;
      overflow-y: auto;
    }
    :host([narrow]) .group {
      width: 100%;
    }
    :host([narrow]) input[type="datetime-local"] {
      flex: 1;
      min-width: 0;
    }
    :host([narrow]) input[type="text"] {
      flex: 1;
      min-width: 0;
    }
    :host([narrow]) input[type="range"] {
      flex: 1;
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
    .group.layers {
      flex-basis: 100%;
    }
    .layers-toggle {
      padding: 0;
      justify-content: flex-start;
      gap: 6px;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    details.stats {
      font-size: 12px;
      color: var(--secondary-text-color, #727272);
    }
    details.stats summary {
      cursor: pointer;
    }
    details.stats table {
      border-collapse: collapse;
      margin-top: 4px;
    }
    details.stats td {
      padding: 1px 8px 1px 0;
    }
  `);Ae("chronotope-filter-bar",_n);var mn=class extends he{render(){let i=this.events||[];return i.length===0?E`<div class="empty">${k("list.empty")}</div>`:E`${i.map(s=>this._renderItem(s))}`}_renderItem(i){let s=i.occurrences?.[0]?.[0]??i.start_time,r=i.occurrences?.[0]?.[1]??i.end_time;return E`
      <button
        class="item ${i.hidden?"is-hidden":""}"
        aria-current=${i.id===this.selectedId?"true":"false"}
        @click=${()=>this.dispatchEvent(new CustomEvent("event-selected",{detail:{id:i.id}}))}
      >
        <div class="title-row">
          <span class="title">${i.title}</span>
          <span>
            ${i.distance_km!=null?E`<span class="distance">${this._formatDistance(i.distance_km)}</span>`:F}
            <button
              class="icon-btn ${i.favorite?"starred":""}"
              title=${i.favorite?k("list.favorite.remove"):k("list.favorite.add")}
              @click=${l=>this._flag(l,i,{favorite:!i.favorite})}
            >
              ${i.favorite?Ys:Js}
            </button>
            <button
              class="icon-btn"
              title=${k("list.edit")}
              @click=${l=>{l.stopPropagation(),this.dispatchEvent(new CustomEvent("event-edit",{detail:{id:i.id}}))}}
            >
              ${Xs}
            </button>
            <button
              class="icon-btn"
              title=${i.hidden?k("list.unhide"):k("list.hide")}
              @click=${l=>this._flag(l,i,{hidden:!i.hidden})}
            >
              ${i.hidden?to:Qs}
            </button>
          </span>
        </div>
        <div class="meta">
          ${this._renderWhen(i,s,r)}
          ${i.recurrence?E`<span title=${i.recurrence}>${eo}</span>`:F}
          ${i.hidden?E`<span class="badge">${k("list.hidden")}</span>`:F}
          ${i.category?E`<span class="badge">${i.category}</span>`:F}
          ${i.confidence?E`<span class="badge confidence-${i.confidence}">${i.confidence}</span>`:F}
          ${i.source_url?E`<span class="source">
                <a href=${i.source_url} target="_blank" rel="noopener noreferrer"
                  @click=${l=>l.stopPropagation()}
                  >${i.source_name||k("list.source")}</a
                >
              </span>`:F}
          ${i.visits?.length?E`<span
                class="visited"
                title=${i.visits.map(l=>`${l.person_id} (${new Date(l.last_seen).toLocaleDateString()})`).join(", ")}
                >${k("list.visited")}</span
              >`:F}
        </div>
        ${i.address?E`<div class="address">${i.address}</div>`:F}
      </button>
    `}_flag(i,s,r){i.stopPropagation(),this.dispatchEvent(new CustomEvent("event-flag",{detail:{id:s.id,...r}}))}_renderWhen(i,s,r){if(i.time_precision==="approximate"){let l=i.schedule_text||this._formatRange(s,r);return E`<span class="fuzzy" title=${k("list.fuzzy")}>~ ${l}</span>`}return E`<span>${this._formatRange(s,r)}</span>`}_formatDistance(i){return`${(i<10?i.toFixed(1):Math.round(i).toString()).replace(".",",")} km`}_formatRange(i,s){let r=this.locale||void 0,l=new Date(i),c=new Date(s),d=new Intl.DateTimeFormat(r,{weekday:"short",day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}),_=new Intl.DateTimeFormat(r,{hour:"2-digit",minute:"2-digit"});return l.toDateString()===c.toDateString()?`${d.format(l)} \u2013 ${_.format(c)}`:`${d.format(l)} \u2013 ${d.format(c)}`}};le(mn,"properties",{events:{attribute:!1},selectedId:{attribute:!1},locale:{attribute:!1}}),le(mn,"styles",fe`
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
    .item.is-hidden {
      opacity: 0.55;
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
    .icon-btn {
      border: none;
      background: none;
      cursor: pointer;
      padding: 0 2px;
      font: inherit;
      color: var(--secondary-text-color, #727272);
      line-height: 1;
    }
    .icon {
      width: 16px;
      height: 16px;
      fill: currentColor;
      vertical-align: -3px;
    }
    @media (max-width: 870px) {
      .item {
        padding: 12px 16px;
      }
      .icon-btn {
        padding: 6px;
      }
      .icon {
        width: 20px;
        height: 20px;
      }
    }
    .icon-btn.starred {
      color: var(--warning-color, #ff9800);
    }
    .visited {
      color: var(--success-color, #4caf50);
    }
  `);Ae("chronotope-event-list",mn);function vo(a){if(!a)return"";let i=new Date(a);if(Number.isNaN(i.getTime()))return"";let s=r=>String(r).padStart(2,"0");return`${i.getFullYear()}-${s(i.getMonth()+1)}-${s(i.getDate())}T${s(i.getHours())}:${s(i.getMinutes())}`}var gn=class extends he{updated(i){i.has("captureMode")&&this.toggleAttribute("capturing",!!this.captureMode)}willUpdate(i){if(i.has("event")){let s=this.event||{};this._draft={id:s.id,title:s.title||"",category:s.category||"",start:vo(s.start_time),end:vo(s.end_time),address:s.address||"",lat:s.lat??"",lon:s.lon??"",recurrence:s.recurrence||"",time_precision:s.time_precision||"exact",schedule_text:s.schedule_text||"",source_name:s.source_name||"",source_url:s.source_url||"",raw_description:s.raw_description||"",geometry:s.geometry||"",favorite:!!s.favorite},this._error=null}}setCoords(i,s){this._draft={...this._draft,lat:Number(i.toFixed(6)),lon:Number(s.toFixed(6))}}setGeometry(i){this._draft={...this._draft,geometry:JSON.stringify(i)}}render(){let i=this._draft||{};return E`
      <div class="grip"></div>
      <div class="head">
        <h2>${i.id?k("editor.edit"):k("editor.new")}</h2>
        <button
          class="close"
          type="button"
          title=${k("editor.close")}
          @click=${()=>this.dispatchEvent(new CustomEvent("editor-cancel"))}
        >
          ${io}
        </button>
      </div>
      <form @submit=${this._save}>
        ${this._error?E`<div class="error">${this._error}</div>`:F}
        <label>
          ${k("editor.title")}
          <input required .value=${i.title} @input=${this._set("title")} />
        </label>
        <label>
          ${k("editor.category")}
          <input list="categories" .value=${i.category} @input=${this._set("category")} />
          <datalist id="categories">
            ${(this.categories||[]).map(s=>E`<option value=${s}></option>`)}
          </datalist>
        </label>
        <div class="row">
          <label>
            ${k("editor.start")}
            <input type="datetime-local" required .value=${i.start} @input=${this._set("start")} />
          </label>
          <label>
            ${k("editor.end")}
            <input type="datetime-local" required .value=${i.end} @input=${this._set("end")} />
          </label>
        </div>
        <label>
          ${k("editor.address")}
          <input
            .value=${i.address}
            placeholder=${k("editor.address.placeholder")}
            @input=${this._set("address")}
          />
        </label>
        <div class="row">
          <label>
            Lat
            <input type="number" step="any" .value=${String(i.lat)} @input=${this._set("lat")} />
          </label>
          <label>
            Lon
            <input type="number" step="any" .value=${String(i.lon)} @input=${this._set("lon")} />
          </label>
        </div>
        <div class="buttons">
          <button
            type="button"
            aria-pressed=${this.captureMode==="point"?"true":"false"}
            @click=${()=>this._requestCapture("point")}
          >
            ${k("editor.pickPoint")}
          </button>
        </div>
        <label>
          ${k("editor.rrule")}
          <input
            .value=${i.recurrence}
            placeholder="FREQ=WEEKLY;BYDAY=SA"
            @input=${this._set("recurrence")}
          />
        </label>
        <div class="row">
          <label>
            ${k("editor.precision")}
            <select .value=${i.time_precision} @change=${this._set("time_precision")}>
              <option value="exact">${k("editor.precision.exact")}</option>
              <option value="approximate">${k("editor.precision.approximate")}</option>
            </select>
          </label>
          <label>
            ${k("editor.scheduleText")}
            <input
              .value=${i.schedule_text}
              placeholder=${k("editor.scheduleText.placeholder")}
              @input=${this._set("schedule_text")}
            />
          </label>
        </div>
        <label>
          ${k("editor.geometry")}
          <textarea .value=${i.geometry} @input=${this._set("geometry")}></textarea>
        </label>
        <div class="buttons">
          <button
            type="button"
            aria-pressed=${this.captureMode==="line"?"true":"false"}
            @click=${()=>this._requestCapture("line")}
          >
            ${k("editor.drawLine")}
          </button>
          <button
            type="button"
            aria-pressed=${this.captureMode==="polygon"?"true":"false"}
            @click=${()=>this._requestCapture("polygon")}
          >
            ${k("editor.drawPolygon")}
          </button>
          ${this.captureMode==="line"||this.captureMode==="polygon"?E`<button type="button" class="primary" @click=${this._finishCapture}>
                ${k("editor.applyDrawing")}
              </button>`:F}
        </div>
        ${this.captureMode?E`<div class="hint">
              ${this.captureMode==="point"?k("editor.captureHint.point"):k("editor.captureHint.points")}
            </div>`:F}
        <div class="row">
          <label>
            ${k("editor.source")}
            <input .value=${i.source_name} @input=${this._set("source_name")} />
          </label>
          <label>
            ${k("editor.sourceUrl")}
            <input .value=${i.source_url} @input=${this._set("source_url")} />
          </label>
        </div>
        <label>
          ${k("editor.description")}
          <textarea .value=${i.raw_description} @input=${this._set("raw_description")}></textarea>
        </label>
        <label style="flex-direction: row; align-items: center; gap: 8px;">
          <input
            type="checkbox"
            .checked=${i.favorite}
            @change=${s=>this._draft={...this._draft,favorite:s.target.checked}}
          />
          ${k("editor.favorite")}
        </label>
        <div class="buttons foot">
          <button type="submit" class="primary">${k("editor.save")}</button>
          <button type="button" @click=${()=>this.dispatchEvent(new CustomEvent("editor-cancel"))}>
            ${k("editor.cancel")}
          </button>
          ${i.id?E`<button
                type="button"
                class="danger"
                @click=${this._confirmDelete}
              >
                ${k("editor.delete")}
              </button>`:F}
        </div>
      </form>
    `}_confirmDelete(){window.confirm(k("editor.delete.confirm"))&&this.dispatchEvent(new CustomEvent("editor-delete",{detail:{id:this._draft.id}}))}_set(i){return s=>{this._draft={...this._draft,[i]:s.target.value}}}_requestCapture(i){let s=this.captureMode===i?null:i;this.dispatchEvent(new CustomEvent("capture-request",{detail:{mode:s}}))}_finishCapture(){this.dispatchEvent(new CustomEvent("capture-finish"))}_save(i){i.preventDefault();let s=this._draft;if(!s.start||!s.end){this._error=k("editor.error.times");return}let r=null;if(s.geometry&&s.geometry.trim())try{r=JSON.parse(s.geometry)}catch{this._error=k("editor.error.geometry");return}let l=s.lat!==""&&s.lat!=null,c=s.lon!==""&&s.lon!=null;if(l!==c){this._error=k("editor.error.coords");return}let d={id:s.id||void 0,title:s.title,category:s.category,start_time:new Date(s.start).toISOString(),end_time:new Date(s.end).toISOString(),address:s.address||null,lat:l?Number(s.lat):null,lon:c?Number(s.lon):null,recurrence:s.recurrence||null,time_precision:s.time_precision,schedule_text:s.schedule_text||null,source_name:s.source_name||null,source_url:s.source_url||null,raw_description:s.raw_description||null,geometry:r,favorite:s.favorite};this.dispatchEvent(new CustomEvent("editor-save",{detail:{event:d}}))}};le(gn,"properties",{event:{attribute:!1},categories:{attribute:!1},captureMode:{attribute:!1},narrow:{type:Boolean,reflect:!0},_draft:{state:!0},_error:{state:!0}}),le(gn,"styles",fe`
    :host {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: min(400px, 92vw);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
      border-inline-start: 1px solid var(--divider-color, #e0e0e0);
      box-shadow: -4px 0 12px rgba(0, 0, 0, 0.15);
      z-index: 1200;
      font-size: 14px;
      transition: width 0.2s ease, max-height 0.2s ease;
    }
    /* While drawing on the map (desktop), free up map space. */
    :host([capturing]:not([narrow])) {
      width: 300px;
    }
    /* Phone: bottom sheet, map stays visible above. */
    :host([narrow]) {
      top: auto;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      max-height: 72%;
      border-inline-start: none;
      border-top: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 16px 16px 0 0;
      box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.25);
    }
    /* Phone while drawing: shrink to a strip so the map is free. */
    :host([narrow][capturing]) {
      max-height: 42%;
    }
    .grip {
      display: none;
      width: 36px;
      height: 4px;
      border-radius: 2px;
      background: var(--divider-color, #e0e0e0);
      margin: 8px auto 0;
      flex: 0 0 auto;
    }
    :host([narrow]) .grip {
      display: block;
    }
    .head {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px 10px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }
    .close {
      border: none;
      background: none;
      cursor: pointer;
      color: var(--secondary-text-color, #727272);
      padding: 4px;
      line-height: 1;
    }
    .close .icon {
      width: 22px;
      height: 22px;
      fill: currentColor;
    }
    form {
      flex: 1 1 auto;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 12px 16px 0;
    }
    .foot {
      position: sticky;
      bottom: 0;
      background: var(--card-background-color, #fff);
      border-top: 1px solid var(--divider-color, #e0e0e0);
      padding: 12px 0 16px;
      margin-top: 6px;
    }
    h2 {
      margin: 0;
      font-size: 17px;
      font-weight: 500;
    }
    label {
      display: flex;
      flex-direction: column;
      gap: 3px;
      font-size: 12px;
      color: var(--secondary-text-color, #727272);
    }
    input,
    select,
    textarea {
      background: var(--primary-background-color, #fafafa);
      color: var(--primary-text-color, #212121);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      padding: 6px;
      font: inherit;
      color-scheme: light dark;
    }
    textarea {
      min-height: 60px;
      resize: vertical;
    }
    .row {
      display: flex;
      gap: 8px;
    }
    .row > label {
      flex: 1;
    }
    .buttons {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    button {
      border: 1px solid var(--primary-color, #03a9f4);
      color: var(--primary-color, #03a9f4);
      background: transparent;
      border-radius: 4px;
      padding: 6px 12px;
      cursor: pointer;
      font: inherit;
    }
    button.primary {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    button.danger {
      border-color: var(--error-color, #f44336);
      color: var(--error-color, #f44336);
    }
    button[aria-pressed="true"] {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    .error {
      color: var(--error-color, #f44336);
      font-size: 13px;
    }
    .hint {
      font-size: 11px;
      color: var(--secondary-text-color, #727272);
    }
  `);Ae("chronotope-event-editor",gn);var ul=["tracks","events","features","grid","raster","custom"],vn=class extends he{constructor(){super(),this.catalog={layers:[],presets:[],basemaps:{}},this.configs=[],this.freshness=()=>"disabled",this.layersEnabled=!1,this.basemap="osm",this._open=new Set,this._adding=!1,this._form=null,this._test=null}_configFor(i){return(this.configs||[]).find(s=>s.id===i)||null}_groups(){let i=new Map;for(let r of this.catalog?.layers||[]){let l=r.klass;i.has(l)||i.set(l,[]),i.get(l).push({id:r.id,spec:r,config:this._configFor(r.id)})}let s=(this.configs||[]).filter(r=>!r.layer_id);return s.length&&i.set("custom",s.map(r=>({id:r.id,spec:null,config:r}))),ul.filter(r=>i.has(r)).map(r=>[r,i.get(r)])}_title(i){return i.spec?k(i.spec.title_key):i.config?.title||i.id}_status(i){let s=i.config?.status||{},r=i.config?.enabled?this.freshness(i.id)||s.freshness:"disabled";return{...s,freshness:r}}_statusTitle(i){let s=this._status(i),r=[k(`layers.freshness.${s.freshness||"disabled"}`)];return s.last_success&&r.push(`${k("layers.lastSuccess")}: ${new Date(s.last_success).toLocaleString()}`),s.last_error&&r.push(`${k("layers.lastError")}: ${s.last_error}`),s.count!=null&&r.push(`${s.count} ${k("layers.count")}`),r.join(`
`)}render(){return this.layersEnabled?E`
      ${this._renderBasemap()}
      ${this._groups().map(([i,s])=>E`
          <div class="group-title">${k(`layers.group.${i}`)}</div>
          ${s.map(r=>this._renderLayer(r,i))}
        `)}
      <div class="group-title">${k("layers.add")}</div>
      ${this._adding?this._renderAddForm():this._renderAddButtons()}
    `:E`<div class="hint">${k("layers.disabled")}</div>${this._renderBasemap()}`}_renderBasemap(){let i=Object.keys(this.catalog?.basemaps||{osm:{}});return E`
      <div class="row" style="margin-top:4px">
        <span class="hint">${k("basemap.label")}</span>
        <select
          .value=${this.basemap}
          @change=${s=>this.dispatchEvent(new CustomEvent("basemap-changed",{detail:{basemap:s.target.value}}))}
        >
          ${i.map(s=>E`<option value=${s} ?selected=${s===this.basemap}>${k(`basemap.${s}`)}</option>`)}
        </select>
      </div>
    `}_renderLayer(i,s){let r=i.spec,l=i.config,c=!!l?.enabled,d=l?.missing_key||(r?.requires_key&&r.key_set===!1?r.requires_key:null),_=this._status(i),f=this._open.has(i.id),m=r?.license?.noncommercial;return E`
      <div class="layer ${c?"":"off"}">
        <input
          type="checkbox"
          .checked=${c}
          ?disabled=${!!d}
          title=${d?k("layers.keyMissing"):""}
          @change=${y=>this.dispatchEvent(new CustomEvent("layer-toggle",{detail:{id:i.id,enabled:y.target.checked,spec:r}}))}
        />
        <span class="dot ${_.freshness||"disabled"}" title=${this._statusTitle(i)}></span>
        <span class="title" title=${this._statusTitle(i)}>
          ${this._title(i)}
          ${m?E`<span class="badge" title=${k("layers.nc.title")}>${k("layers.nc")}</span>`:F}
        </span>
        <span class="tools">
          ${_.count!=null&&c?E`<span class="hint">${_.count}</span>`:F}
          <button class="icon" title=${k("layers.params")} @click=${()=>this._toggleOpen(i.id)}>⚙</button>
        </span>
        ${f?this._renderDetails(i,s,d):F}
      </div>
    `}_renderDetails(i,s,r){let l=i.spec,c=i.config||{},d=c.params||{},_=l?.params_schema||{},f=s==="raster"||s==="grid"||s==="custom"||l?.klass==="features",m=[];for(let[v,x]of Object.entries(_))if(x.type!=="const"){if(x.type==="number")m.push(E`<label>${k(`layers.params.${v}`)}
          <input type="number" min=${x.min??""} max=${x.max??""} .value=${String(d[v]??x.default??"")}
            @change=${w=>this._setParam(i,v,w.target.value===""?null:Number(w.target.value))} /></label>`);else if(x.type==="enum")m.push(E`<label>${k(`layers.params.${v}`)}
          <select .value=${String(d[v]??x.default)} @change=${w=>this._setParam(i,v,w.target.value)}>
            ${x.values.map(w=>E`<option value=${w} ?selected=${String(d[v]??x.default)===w}>${w}</option>`)}
          </select></label>`);else if(x.type==="latlon"){let w=d[v];m.push(E`<span class="hint">${k("layers.params.center")}: ${w?`${w.lat.toFixed(3)}, ${w.lon.toFixed(3)}`:k("layers.params.useHome")}</span>
          <button class="btn" @click=${()=>this._setParam(i,v,this.mapCenter?{lat:this.mapCenter.lat,lon:this.mapCenter.lon}:null)}>${k("layers.params.useMapCenter")}</button>
          <button class="btn" @click=${()=>this._setParam(i,v,null)}>${k("layers.params.useHome")}</button>`)}}let y=this._status(i);return E`
      <div class="details">
        ${r?E`<span class="warn">${k("layers.keyMissing")}</span>`:F}
        ${l?.klass==="events"?E`<span class="hint">${k("layers.eventsHint")}</span>`:F}
        ${l?.id==="satellites_active"?E`<span class="warn">${k("layers.warning.active")}</span>`:F}
        ${l?.license?E`<span class="hint">${l.license.id}${l.license.notes?` \xB7 ${l.license.notes}`:""}</span>`:F}
        ${c.license_note?E`<span class="hint">${c.license_note}</span>`:F}
        ${y.last_error?E`<span class="warn">${y.last_error}</span>`:F}
        ${m}
        ${l&&l.klass!=="raster"?E`<label>${k("layers.params.interval")}
          <input type="number" min=${l.min_interval_s} .value=${String(c.interval_s??l.default_interval_s)}
            @change=${v=>this._save(i,{interval_s:Math.max(l.min_interval_s,Number(v.target.value)||l.default_interval_s)})} /></label>`:F}
        ${f?E`<label>${k("layers.opacity")}
          <input type="range" min="0.1" max="1" step="0.05" .value=${String(c.opacity??1)}
            @change=${v=>this._save(i,{opacity:Number(v.target.value)})} /></label>`:F}
        ${l?F:E`<button class="btn" @click=${()=>this._delete(i.id)}>${k("layers.delete")}</button>`}
      </div>
    `}_renderAddButtons(){let i=this.catalog?.presets||[];return E`
      <div class="row">
        <select @change=${s=>this._startFromPreset(s.target.value)}>
          <option value="">${k("layers.add.presetPick")}</option>
          ${i.map(s=>E`<option value=${s.preset_id}>${s.title}</option>`)}
        </select>
        <button class="btn" @click=${()=>this._startCustom()}>${k("layers.add.custom")}</button>
      </div>
    `}_renderAddForm(){let i=this._form,s=this._test;return E`
      <form class="add" @submit=${r=>r.preventDefault()}>
        <label>${k("layers.add.provider")}
          <select .value=${i.provider} @change=${r=>this._patchForm({provider:r.target.value})}>
            ${(this.catalog?.generic_providers||["xyz","wmts","wms","geojson_url"]).map(r=>E`<option value=${r} ?selected=${r===i.provider}>${r}</option>`)}
          </select></label>
        <label>${k("layers.add.title")}<input type="text" .value=${i.title} @input=${r=>this._patchForm({title:r.target.value})} /></label>
        <label class="full">${k("layers.add.url")}<input type="url" .value=${i.url} @input=${r=>this._patchForm({url:r.target.value})} /></label>
        ${i.provider==="wms"?E`<label>${k("layers.add.wmsLayers")}<input type="text" .value=${i.wmsLayers} @input=${r=>this._patchForm({wmsLayers:r.target.value})} /></label>`:F}
        <label>${k("layers.add.attribution")}<input type="text" .value=${i.attributionText} @input=${r=>this._patchForm({attributionText:r.target.value})} /></label>
        <label>${k("layers.add.attributionUrl")}<input type="url" .value=${i.attributionUrl} @input=${r=>this._patchForm({attributionUrl:r.target.value})} /></label>
        <label class="full">${k("layers.add.license")}<input type="text" .value=${i.licenseNote} @input=${r=>this._patchForm({licenseNote:r.target.value})} /></label>
        <label>${k("layers.opacity")}<input type="range" min="0.1" max="1" step="0.05" .value=${String(i.opacity)} @change=${r=>this._patchForm({opacity:Number(r.target.value)})} /></label>
        <div class="row full">
          <button class="btn" @click=${()=>this._runTest()}>${k("layers.add.test")}</button>
          <button class="btn" ?disabled=${!s?.ok} @click=${()=>this._saveNew()}>${k("layers.add.save")}</button>
          <button class="btn" @click=${()=>{this._adding=!1,this._test=null}}>${k("layers.add.cancel")}</button>
        </div>
        <div class="full">
          ${s==="pending"?E`<span class="hint">${k("layers.add.testing")}</span>`:F}
          ${s&&s!=="pending"&&s.ok?E`<span class="hint">${k("layers.add.testOk",{info:s.count!=null?`${s.count} features`:`${s.status} ${s.content_type||""}`})}</span>`:F}
          ${s&&s!=="pending"&&!s.ok?E`<span class="warn">${k("layers.add.testFailed",{msg:s.error})}</span>`:F}
          ${s?F:E`<span class="hint">${k("layers.add.needTest")}</span>`}
        </div>
      </form>
    `}_toggleOpen(i){let s=new Set(this._open);s.has(i)?s.delete(i):s.add(i),this._open=s}_setParam(i,s,r){let l={...i.config?.params||{}};r==null?delete l[s]:l[s]=r,this._save(i,{params:l})}_save(i,s){let r=i.config?{...i.config}:{layer_id:i.spec.id,enabled:!1,params:{},interval_s:i.spec.default_interval_s};delete r.status,delete r.missing_key,delete r.updated_at,this.dispatchEvent(new CustomEvent("layer-save",{detail:{layer:{...r,...s}}}))}_delete(i){window.confirm(k("layers.delete.confirm"))&&this.dispatchEvent(new CustomEvent("layer-delete",{detail:{id:i}}))}_emptyForm(){return{provider:"xyz",title:"",url:"",wmsLayers:"",attributionText:"",attributionUrl:"",licenseNote:"",opacity:.8,params:{}}}_startCustom(){this._form=this._emptyForm(),this._test=null,this._adding=!0}_startFromPreset(i){let s=(this.catalog?.presets||[]).find(r=>r.preset_id===i);s&&(this._form={...this._emptyForm(),provider:s.provider,title:s.title,url:s.url,wmsLayers:s.params?.layers||"",attributionText:s.attribution?.text||"",attributionUrl:s.attribution?.url||"",licenseNote:s.license_note||"",opacity:s.opacity??.8,params:{...s.params||{}},max_zoom:s.max_zoom},this._test=null,this._adding=!0)}_patchForm(i){this._form={...this._form,...i},this._test=null}_layerFromForm(){let i=this._form,s={...i.params||{}};i.provider==="wms"&&(s.layers=i.wmsLayers);let r={provider:i.provider,title:i.title,url:i.url,params:s,attribution:{text:i.attributionText,url:i.attributionUrl||null},license_note:i.licenseNote||null,opacity:i.opacity,enabled:!0};return i.max_zoom&&(r.max_zoom=i.max_zoom),r}_runTest(){this._test="pending";let i=this._layerFromForm();this.dispatchEvent(new CustomEvent("layer-preview",{detail:{layer:i,resolve:s=>{this._test=s||{ok:!1,error:"no result"}}}}))}_saveNew(){if(!this._test||this._test==="pending"||!this._test.ok)return;let i=this._test.config?{...this._test.config,enabled:!0}:this._layerFromForm();this.dispatchEvent(new CustomEvent("layer-save",{detail:{layer:i}})),this._adding=!1,this._test=null}};le(vn,"properties",{catalog:{attribute:!1},configs:{attribute:!1},freshness:{attribute:!1},version:{attribute:!1},layersEnabled:{attribute:!1},basemap:{attribute:!1},mapCenter:{attribute:!1},homeCenter:{attribute:!1},narrow:{type:Boolean,reflect:!0},_open:{state:!0},_adding:{state:!0},_form:{state:!0},_test:{state:!0}}),le(vn,"styles",fe`
    :host {
      display: block;
      font-size: 13px;
      color: var(--primary-text-color, #212121);
    }
    .group-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--secondary-text-color, #727272);
      margin: 10px 0 4px;
    }
    .layer {
      display: grid;
      grid-template-columns: auto 10px 1fr auto;
      align-items: center;
      gap: 6px 8px;
      padding: 3px 0;
    }
    .layer .title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .layer.off .title {
      color: var(--secondary-text-color, #727272);
    }
    .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--disabled-text-color, #9e9e9e);
    }
    .dot.fresh { background: #43a047; }
    .dot.stale { background: #fbc02d; }
    .dot.error, .dot.blocked { background: #e53935; }
    .badge {
      font-size: 10px;
      border: 1px solid var(--warning-color, #ff9800);
      color: var(--warning-color, #ff9800);
      border-radius: 3px;
      padding: 0 4px;
      margin-inline-start: 4px;
      cursor: help;
    }
    .tools {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    button.icon {
      border: none;
      background: none;
      cursor: pointer;
      color: var(--secondary-text-color, #727272);
      font: inherit;
      padding: 0 4px;
    }
    button.icon:hover { color: var(--primary-color, #03a9f4); }
    .details {
      grid-column: 3 / span 2;
      display: flex;
      flex-wrap: wrap;
      gap: 6px 10px;
      align-items: center;
      padding: 4px 0 6px;
      font-size: 12px;
    }
    .details label {
      display: flex;
      gap: 4px;
      align-items: center;
    }
    input[type="range"] {
      width: 110px;
      accent-color: var(--primary-color, #03a9f4);
    }
    input[type="checkbox"] { accent-color: var(--primary-color, #03a9f4); }
    input[type="text"], input[type="number"], input[type="url"], select {
      background: var(--primary-background-color, #fafafa);
      color: var(--primary-text-color, #212121);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      padding: 3px 6px;
      font: inherit;
      font-size: 12px;
      max-width: 100%;
      color-scheme: light dark;
    }
    .hint {
      color: var(--secondary-text-color, #727272);
      font-size: 11px;
    }
    .warn {
      color: var(--error-color, #f44336);
      font-size: 11px;
    }
    .btn {
      border: 1px solid var(--primary-color, #03a9f4);
      color: var(--primary-color, #03a9f4);
      background: transparent;
      border-radius: 4px;
      padding: 3px 10px;
      cursor: pointer;
      font: inherit;
      font-size: 12px;
    }
    .btn[disabled] { opacity: 0.5; cursor: default; }
    form.add {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 10px;
      margin-top: 6px;
      max-width: 560px;
    }
    :host([narrow]) form.add { grid-template-columns: 1fr; }
    form.add label {
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 11px;
      color: var(--secondary-text-color, #727272);
    }
    form.add .full { grid-column: 1 / -1; }
    .row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  `);Ae("chronotope-layer-panel",vn);var yo=new Set(["tracks","features","grid"]),Vn=class{constructor({hass:i,onChange:s}){this.hass=i,this.onChange=s||(()=>{}),this.catalog={layers:[],presets:[],basemaps:{},generic_providers:[]},this.configs=[],this.docs=new Map,this.errors=new Map,this._timers=new Map,this._inflight=new Set,this._viewport=null,this._viewportTimer=null,this._running=!1,this._onVisibility=()=>{document.hidden?this._pauseAll():this._resumeAll()}}setHass(i){this.hass=i}async loadCatalog(){return this.catalog=await this.hass.callWS({type:"chronotope/layers/catalog"}),this.onChange("catalog"),this.catalog}async loadConfigs(){let i=await this.hass.callWS({type:"chronotope/layers/list"});return this.configs=i.layers||[],this.layersEnabled=!!i.layers_enabled,this._syncPolling(),this.onChange("configs"),this.configs}async refreshStatus(){let i=await this.hass.callWS({type:"chronotope/layers/status"});for(let s of this.configs)i.status?.[s.id]&&(s.status=i.status[s.id]);this.onChange("status")}spec(i){let r=this.configFor(i)?.layer_id||i;return this.catalog.layers.find(l=>l.id===r)||null}configFor(i){return this.configs.find(s=>s.id===i)||null}definition(i){let s=this.configFor(i),r=this.spec(i);if(!s&&!r)return null;let l=r?.klass||(s?.provider==="geojson_url"?"features":"raster");return{id:i,klass:l,spec:r,config:s,title:r?r.title_key:s?.title||i,provider:r?.provider||s?.provider,style:r?.style||{},raster:r?.raster||(s&&!s.layer_id?s:null),attribution:r?.attribution||s?.attribution||null,license:r?.license||null,opacity:s?.opacity??r?.raster?.opacity??1,enabled:!!s?.enabled,bboxFiltered:!!r?.bbox_filtered,interval:(s?.interval_s||r?.default_interval_s||60)*1e3}}activeIds(){return this.configs.filter(i=>i.enabled).map(i=>i.id)}async save(i){let s=await this.hass.callWS({type:"chronotope/layers/save",layer:i}),r=this.configs.findIndex(l=>l.id===s.layer.id);return r>=0?this.configs[r]=s.layer:this.configs.push(s.layer),this._syncPolling(),this.onChange("configs"),s.layer}async setEnabled(i,s){let r=this.configFor(i),l=this.spec(i),c=r?{...r,enabled:s}:l?{layer_id:l.id,enabled:s,params:{},interval_s:l.default_interval_s}:null;if(!c)throw new Error(`unknown layer ${i}`);return delete c.status,delete c.missing_key,delete c.updated_at,s||this.docs.delete(i),this.save(c)}async remove(i){await this.hass.callWS({type:"chronotope/layers/delete",layer_id:i}),this.configs=this.configs.filter(s=>s.id!==i),this.docs.delete(i),this._syncPolling(),this.onChange("configs")}preview(i){return this.hass.callWS({type:"chronotope/layers/preview",layer:i})}start(){this._running=!0,document.addEventListener("visibilitychange",this._onVisibility),this._syncPolling()}stop(){this._running=!1,document.removeEventListener("visibilitychange",this._onVisibility),this._pauseAll()}setViewport(i,s){this._viewport={bbox:i,zoom:s},clearTimeout(this._viewportTimer),this._viewportTimer=setTimeout(()=>{for(let r of this.activeIds()){let l=this.definition(r);l?.bboxFiltered&&yo.has(l.klass)&&this.fetchLayer(r)}},500)}_syncPolling(){if(!this._running)return;let i=new Set;for(let s of this.activeIds()){let r=this.definition(s);!r||!yo.has(r.klass)||(i.add(s),this._timers.has(s)||this._schedule(s,0))}for(let s of[...this._timers.keys()])i.has(s)||(clearTimeout(this._timers.get(s)),this._timers.delete(s))}_schedule(i,s){clearTimeout(this._timers.get(i)),this._timers.set(i,setTimeout(()=>this.fetchLayer(i).finally(()=>this._reschedule(i)),s))}_reschedule(i){if(!this._running||document.hidden||!this.activeIds().includes(i)){this._timers.delete(i);return}let s=this.definition(i);this._schedule(i,Math.max(5e3,s?.interval||6e4))}_pauseAll(){for(let i of this._timers.values())clearTimeout(i);this._timers.clear()}_resumeAll(){this._syncPolling()}async fetchLayer(i){if(this._inflight.has(i)||!this.hass)return null;this._inflight.add(i);try{let s=this.definition(i),r=new URLSearchParams;s?.bboxFiltered&&this._viewport?.bbox&&(r.set("bbox",this._viewport.bbox),r.set("zoom",String(this._viewport.zoom)));let l=r.toString(),c=`/api/chronotope/layers/${encodeURIComponent(i)}/data${l?`?${l}`:""}`,d=await this.hass.fetchWithAuth(c,{cache:"no-cache"});if(!d.ok)throw new Error(`HTTP ${d.status}`);let _=await d.json();_.receivedAt=Date.now(),this.docs.set(i,_),this.errors.delete(i);let f=this.configFor(i);return f&&_.meta&&(f.status={...f.status||{},freshness:_.meta.freshness,last_error:_.meta.last_error,count:_.meta.count}),this.onChange("data",i),_}catch(s){return this.errors.set(i,s.message||String(s)),this.onChange("error",i),null}finally{this._inflight.delete(i)}}freshness(i){let s=this.docs.get(i);return this.errors.has(i)?"error":s?.meta?.freshness||this.configFor(i)?.status?.freshness||"disabled"}};var bo=(a,i)=>a.callWS({type:"chronotope/events/query",...i}),xo=a=>a.callWS({type:"chronotope/categories"}),wo=(a,i)=>a.callWS({type:"chronotope/ics_url",...i}),Lo=(a,i)=>a.callWS({type:"chronotope/events/save",event:i}),ko=(a,i)=>a.callWS({type:"chronotope/events/delete",event_id:i}),Po=(a,i,s)=>a.callWS({type:"chronotope/events/flag",event_id:i,...s}),Co=a=>a.callWS({type:"chronotope/profiles/list"}),Mo=(a,i)=>a.callWS({type:"chronotope/profiles/save",profile:i}),So=(a,i)=>a.callWS({type:"chronotope/profiles/delete",profile_id:i}),To=a=>a.callWS({type:"chronotope/stats"});function jn(a){let i={};return a.categories.length&&(i.categories=[...a.categories]),a.radiusEnabled&&a.center&&(i.center={lat:a.center.lat,lon:a.center.lon},i.radius_km=a.radiusKm),a.start&&(i.start=new Date(a.start).toISOString()),a.end&&(i.end=new Date(a.end).toISOString()),a.weekdays.length&&(i.weekdays=[...a.weekdays]),a.timeMode==="range"&&(a.timeFrom&&(i.time_from=a.timeFrom),a.timeTo&&(i.time_to=a.timeTo)),a.text&&(i.text=a.text),a.favoritesOnly&&(i.favorites_only=!0),a.showHidden&&(i.include_hidden=!0),i}var pl=250,fl=new Set(["showZones","showPersons","showGeoFeeds","dayFilter","filtersCollapsed"]),Kn="chronotope-panel-state-v2",_l=["chronotope-panel-state-v1"],ml=3e4;function Br(){return{categories:[],radiusEnabled:!1,radiusKm:10,center:null,start:"",end:"",weekdays:[],timeMode:"allday",timeFrom:"",timeTo:"",text:"",favoritesOnly:!1,showHidden:!1,showZones:!0,showPersons:!0,showGeoFeeds:!0,dayFilter:"",filtersCollapsed:!1}}function zo(a){if(!a)return"";let i=new Date(a);if(Number.isNaN(i.getTime()))return"";let s=r=>String(r).padStart(2,"0");return`${i.getFullYear()}-${s(i.getMonth()+1)}-${s(i.getDate())}T${s(i.getHours())}:${s(i.getMinutes())}`}var yn=class extends he{constructor(){super(),this._events=[],this._categories=[],this._selectedId=null,this._icsCopied=!1,this._error=null,this._profiles=[],this._selectedProfileId="",this._editing=null,this._capture=null,this._stats=null,this._filters=Br(),this._initialized=!1,this._basemap="osm",this._layersCollapsed=!0,this._layerVersion=0,this._mapCenter=null,this._deepLink=null,this._registry=new Vn({hass:null,onChange:()=>{this._layerVersion+=1}})}connectedCallback(){super.connectedCallback(),this._statusTimer=setInterval(()=>{!document.hidden&&this._registry.layersEnabled&&this._registry.refreshStatus().catch(()=>{})},ml)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._statusTimer),this._registry.stop()}willUpdate(i){if(i.has("hass")&&this.hass&&Ks(this.hass.locale?.language||this.hass.language),i.has("hass")&&this.hass&&this._registry.setHass(this.hass),i.has("hass")&&this.hass&&!this._initialized){this._initialized=!0;let s=this._loadPersistedState();this._filters={...Br(),...s?.filters||{},center:s?.filters?.center||this._homeCenter(),filtersCollapsed:s?.filters?.filtersCollapsed??!!this.narrow},this._selectedProfileId=s?.selectedProfileId||"",this._basemap=s?.basemap||"osm",this._layersCollapsed=s?.layersCollapsed??!0,this._deepLink=this._parseDeepLink(),this._deepLink?.base&&(this._basemap=this._deepLink.base),this._deepLink?.profile&&(this._selectedProfileId=this._deepLink.profile),this._loadCategories(),this._loadProfiles(),this._loadStats(),this._loadLayers(),this._runQuery()}}updated(i){this._initialized&&(i.has("_filters")||i.has("_selectedProfileId")||i.has("_basemap")||i.has("_layersCollapsed"))&&this._persistState()}_persistState(){if(!this._deepLink)try{window.localStorage.setItem(Kn,JSON.stringify({version:2,filters:this._filters,selectedProfileId:this._selectedProfileId,basemap:this._basemap,layersCollapsed:this._layersCollapsed}))}catch{}}_parseDeepLink(){let i;try{i=new URLSearchParams(window.location.search)}catch{return null}if(!["layers","lat","lon","z","profile","base"].some(c=>i.has(c)))return null;let r=Number(i.get("lat")),l=Number(i.get("lon"));return{layers:(i.get("layers")||"").split(",").map(c=>c.trim()).filter(Boolean),center:Number.isFinite(r)&&Number.isFinite(l)&&i.has("lat")?[r,l]:null,zoom:i.has("z")?Number(i.get("z")):null,profile:i.get("profile")||null,base:i.get("base")||null}}_homeCenter(){return{lat:this.hass.config.latitude,lon:this.hass.config.longitude}}_loadPersistedState(){try{let i=window.localStorage.getItem(Kn);if(i)return JSON.parse(i);for(let s of _l){let r=window.localStorage.getItem(s);if(r){let l=JSON.parse(r),c={version:2,filters:l.filters||{},selectedProfileId:l.selectedProfileId||"",basemap:"osm",layersCollapsed:!0};return window.localStorage.setItem(Kn,JSON.stringify(c)),window.localStorage.removeItem(s),c}}return null}catch(i){return console.warn("chronotope: persisted panel state unreadable",i),null}}_onResetView(){try{window.localStorage.removeItem(Kn)}catch{}this._filters={...Br(),center:this._homeCenter()},this._selectedProfileId="",this._basemap="osm",this._layersCollapsed=!0,this._icsCopied=!1,this._error=null,this._scheduleQuery()}async _loadLayers(){try{if(await this._registry.loadCatalog(),await this._registry.loadConfigs(),this._registry.start(),this._deepLink?.layers?.length)for(let i of this._deepLink.layers)!this._registry.configFor(i)?.enabled&&this._registry.spec(i)&&await this._registry.setEnabled(i,!0)}catch(i){console.error("chronotope: loading layers failed",i)}}async _onLayerToggle(i){try{await this._registry.setEnabled(i.detail.id,i.detail.enabled),this._error=null,this._registry.spec(i.detail.id)?.klass==="events"&&(this._scheduleQuery(),this._loadCategories())}catch(s){this._error=k("error.layers",{msg:s.message||s.code||s})}}async _onLayerSave(i){try{await this._registry.save(i.detail.layer),this._error=null}catch(s){this._error=k("error.layers",{msg:s.message||s.code||s})}}async _onLayerDelete(i){try{await this._registry.remove(i.detail.id)}catch(s){this._error=k("error.layers",{msg:s.message||s.code||s})}}async _onLayerPreview(i){try{i.detail.resolve(await this._registry.preview(i.detail.layer))}catch(s){i.detail.resolve({ok:!1,error:s.message||s.code||String(s)})}}_onViewportChanged(i){this._mapCenter=i.detail.center,this._registry.setViewport(i.detail.bbox,i.detail.zoom)}async _loadStats(){try{this._stats=await To(this.hass)}catch(i){console.error("chronotope: loading stats failed",i)}}get _displayedEvents(){if(!this._filters.dayFilter)return this._events;let i=new Date(`${this._filters.dayFilter}T00:00:00`),s=new Date(i.getTime()+864e5);return this._events.filter(r=>(r.occurrences||[[r.start_time,r.end_time]]).some(([c,d])=>new Date(c)<s&&new Date(d)>i))}render(){let i=!!this.hass?.themes?.darkMode,s=this._displayedEvents;return E`
      <header>
        <h1>Chronotope</h1>
        <span class="count">
          ${k(s.length===1?"panel.count.one":"panel.count.other",{n:s.length})}
        </span>
        <button class="new-event" @click=${this._onNewEvent}>
          ${k("panel.newEvent")}
        </button>
      </header>
      <chronotope-filter-bar
        .state=${this._filters}
        .categories=${this._categories}
        .icsCopied=${this._icsCopied}
        .profiles=${this._profiles}
        .selectedProfileId=${this._selectedProfileId}
        .stats=${this._stats}
        .collapsed=${this._filters.filtersCollapsed}
        .layersCollapsed=${this._layersCollapsed}
        .narrow=${!!this.narrow}
        @toggle-collapsed=${this._onToggleFilters}
        @toggle-layers=${()=>{this._layersCollapsed=!this._layersCollapsed}}
        @filters-changed=${this._onFiltersChanged}
        @ics-requested=${this._onIcsRequested}
        @profile-selected=${this._onProfileSelected}
        @profile-save=${this._onProfileSave}
        @profile-delete=${this._onProfileDelete}
        @stats-requested=${this._loadStats}
        @reset-requested=${this._onResetView}
      >
        <chronotope-layer-panel
          slot="layers"
          .catalog=${this._registry.catalog}
          .configs=${this._registry.configs}
          .freshness=${r=>this._registry.freshness(r)}
          .version=${this._layerVersion}
          .layersEnabled=${!!this._registry.layersEnabled}
          .basemap=${this._basemap}
          .mapCenter=${this._mapCenter}
          .homeCenter=${this._homeCenter()}
          .narrow=${!!this.narrow}
          @layer-toggle=${this._onLayerToggle}
          @layer-save=${this._onLayerSave}
          @layer-delete=${this._onLayerDelete}
          @layer-preview=${this._onLayerPreview}
          @basemap-changed=${r=>{this._basemap=r.detail.basemap}}
        ></chronotope-layer-panel>
      </chronotope-filter-bar>
      ${this._error?E`<div class="error">${this._error}</div>`:""}
      <div class="content ${this.narrow?"narrow":""}">
        <chronotope-event-list
          .events=${s}
          .selectedId=${this._selectedId}
          .locale=${this.hass?.locale?.language}
          @event-selected=${this._onEventSelected}
          @event-flag=${this._onEventFlag}
          @event-edit=${this._onEventEdit}
        ></chronotope-event-list>
        <chronotope-map-view
          .events=${s}
          .center=${this._filters.center}
          .radiusKm=${this._filters.radiusKm}
          .radiusEnabled=${this._filters.radiusEnabled}
          .zones=${this._filters.showZones?this._haZones():[]}
          .persons=${this._filters.showPersons?this._haPersons():[]}
          .geoMarkers=${this._filters.showGeoFeeds?this._haGeoLocations():[]}
          .capture=${this._capture}
          .selectedId=${this._selectedId}
          .dark=${i}
          .basemap=${this._basemap}
          .basemaps=${this._registry.catalog.basemaps}
          .registry=${this._registry}
          .layerVersion=${this._layerVersion}
          .initialView=${this._deepLink?.center?{center:this._deepLink.center,zoom:this._deepLink.zoom||10}:null}
          @map-click=${this._onMapClick}
          @event-selected=${this._onEventSelected}
          @viewport-changed=${this._onViewportChanged}
        ></chronotope-map-view>
        ${this._editing!==null?E`<chronotope-event-editor
              .event=${this._editing}
              .categories=${this._categories}
              .captureMode=${this._capture?.mode||null}
              .narrow=${!!this.narrow}
              @editor-save=${this._onEditorSave}
              @editor-delete=${this._onEditorDelete}
              @editor-cancel=${this._onEditorCancel}
              @capture-request=${this._onCaptureRequest}
              @capture-finish=${this._onCaptureFinish}
            ></chronotope-event-editor>`:""}
      </div>
    `}_haZones(){let i=this.hass?.states||{},s=Object.values(i).filter(r=>r.entity_id.startsWith("zone.")).map(r=>({id:r.entity_id,name:r.attributes.friendly_name||r.entity_id,lat:r.attributes.latitude,lon:r.attributes.longitude,radius:r.attributes.radius??100,passive:!!r.attributes.passive,home:r.entity_id==="zone.home"})).filter(r=>r.lat!=null&&r.lon!=null);return!s.some(r=>r.home)&&this.hass?.config?.latitude!=null&&s.push({id:"home",name:k("panel.home"),lat:this.hass.config.latitude,lon:this.hass.config.longitude,radius:100,passive:!1,home:!0}),s}_haPersons(){let i=this.hass?.states||{};return Object.values(i).filter(s=>s.entity_id.startsWith("person.")).map(s=>({id:s.entity_id,name:s.attributes.friendly_name||s.entity_id,lat:s.attributes.latitude,lon:s.attributes.longitude,picture:s.attributes.entity_picture||null,state:s.state})).filter(s=>s.lat!=null&&s.lon!=null)}_haGeoLocations(){let i=this.hass?.states||{};return Object.values(i).filter(s=>s.entity_id.startsWith("geo_location.")).map(s=>({id:s.entity_id,name:s.attributes.friendly_name||s.entity_id,lat:s.attributes.latitude,lon:s.attributes.longitude,source:s.attributes.source||"geo_location",distance:s.state,unit:s.attributes.unit_of_measurement||"km"})).filter(s=>s.lat!=null&&s.lon!=null)}_onToggleFilters(){this._filters={...this._filters,filtersCollapsed:!this._filters.filtersCollapsed}}_onFiltersChanged(i){this._filters={...this._filters,...i.detail},this._icsCopied=!1,Object.keys(i.detail).filter(r=>!fl.has(r)).length&&this._scheduleQuery()}_onMapClick(i){let{lat:s,lon:r}=i.detail;if(this._capture?.mode==="point"){this._editorElement()?.setCoords(s,r),this._capture=null;return}if(this._capture?.mode){this._capture={...this._capture,points:[...this._capture.points,[s,r]]};return}this._filters={...this._filters,center:{lat:s,lon:r}},this._filters.radiusEnabled&&this._scheduleQuery()}_onEventSelected(i){this._selectedId=i.detail.id}_scheduleQuery(){clearTimeout(this._queryTimer),this._queryTimer=setTimeout(()=>this._runQuery(),pl)}async _loadCategories(){try{let i=await xo(this.hass);this._categories=i.categories}catch(i){console.error("chronotope: loading categories failed",i)}}async _loadProfiles(){try{let i=await Co(this.hass);this._profiles=i.profiles}catch(i){console.error("chronotope: loading profiles failed",i)}}async _runQuery(){if(this.hass)try{let i=await bo(this.hass,jn(this._filters));this._events=i.events,this._error=null,this._selectedId&&!this._events.some(s=>s.id===this._selectedId)&&(this._selectedId=null)}catch(i){this._error=k("error.query",{msg:i.message||i.code||i})}}_onProfileSelected(i){this._selectedProfileId=i.detail.id;let s=this._profiles.find(r=>r.id===i.detail.id);s&&(this._applyProfileFilters(s.filters||{}),this._applyProfileLayers(s.filters?.layers))}async _applyProfileLayers(i){if(!(!Array.isArray(i)||!i.length)){for(let s of i)if(!this._registry.configFor(s)?.enabled&&this._registry.spec(s))try{await this._registry.setEnabled(s,!0)}catch(r){console.warn("chronotope: enabling layer from profile failed",s,r)}}}_applyProfileFilters(i){let s=i.center||this._filters.center;this._filters={...this._filters,categories:i.categories||[],radiusEnabled:!!(i.center&&i.radius_km!=null),radiusKm:i.radius_km!=null?i.radius_km:this._filters.radiusKm,center:s,start:zo(i.start),end:zo(i.end),weekdays:i.weekdays||[],timeMode:i.time_from||i.time_to?"range":"allday",timeFrom:i.time_from||"",timeTo:i.time_to||"",text:i.text||"",favoritesOnly:!!i.favorites_only,dayFilter:""},this._scheduleQuery()}async _onProfileSave(i){try{let s=await Mo(this.hass,{id:i.detail.id,name:i.detail.name,filters:{...jn(this._filters),layers:this._registry.activeIds()}});await this._loadProfiles(),this._selectedProfileId=s.profile.id,this._error=null}catch(s){this._error=k("error.profileSave",{msg:s.message||s.code||s})}}async _onProfileDelete(i){try{await So(this.hass,i.detail.id),this._selectedProfileId===i.detail.id&&(this._selectedProfileId=""),await this._loadProfiles()}catch(s){this._error=k("error.profileDelete",{msg:s.message||s.code||s})}}_editorElement(){return this.renderRoot.querySelector("chronotope-event-editor")}_onNewEvent(){let i=new Date;i.setMinutes(0,0,0);let s=new Date(i.getTime()+2*36e5);this._editing={start_time:i.toISOString(),end_time:s.toISOString()},this._capture=null}_onEventEdit(i){let s=this._events.find(r=>r.id===i.detail.id);s&&(this._editing=s,this._capture=null)}async _onEditorSave(i){try{await Lo(this.hass,i.detail.event),this._editing=null,this._capture=null,this._error=null,await this._runQuery(),await this._loadCategories()}catch(s){this._error=k("error.save",{msg:s.message||s.code||s})}}async _onEditorDelete(i){try{await ko(this.hass,i.detail.id),this._editing=null,this._capture=null,await this._runQuery()}catch(s){this._error=k("error.delete",{msg:s.message||s.code||s})}}_onEditorCancel(){this._editing=null,this._capture=null}_onCaptureRequest(i){let s=i.detail.mode;this._capture=s?{mode:s,points:[]}:null}_onCaptureFinish(){let i=this._capture;if(i){if(i.mode==="line"&&i.points.length>=2)this._editorElement()?.setGeometry({type:"LineString",coordinates:i.points.map(([s,r])=>[r,s])});else if(i.mode==="polygon"&&i.points.length>=3){let s=i.points.map(([r,l])=>[l,r]);s.push(s[0]),this._editorElement()?.setGeometry({type:"Polygon",coordinates:[s]})}else{this._error=k("error.capture");return}this._capture=null,this._error=null}}async _onEventFlag(i){let{id:s,...r}=i.detail;try{await Po(this.hass,s,r),await this._runQuery()}catch(l){this._error=k("error.action",{msg:l.message||l.code||l})}}async _onIcsRequested(){try{let i=this._selectedProfileId?{profile_id:this._selectedProfileId}:jn(this._filters),s=await wo(this.hass,i);await navigator.clipboard.writeText(s.url),this._icsCopied=!0,setTimeout(()=>{this._icsCopied=!1},3e3)}catch(i){this._error=k("error.ics",{msg:i.message||i.code||i})}}};le(yn,"properties",{hass:{attribute:!1},narrow:{attribute:!1},route:{attribute:!1},panel:{attribute:!1},_events:{state:!0},_categories:{state:!0},_filters:{state:!0},_selectedId:{state:!0},_icsCopied:{state:!0},_error:{state:!0},_profiles:{state:!0},_selectedProfileId:{state:!0},_editing:{state:!0},_capture:{state:!0},_stats:{state:!0},_basemap:{state:!0},_layersCollapsed:{state:!0},_layerVersion:{state:!0},_mapCenter:{state:!0}}),le(yn,"styles",fe`
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
    .new-event {
      border: 1px solid currentColor;
      border-radius: 4px;
      background: transparent;
      color: inherit;
      font: inherit;
      font-size: 14px;
      padding: 5px 12px;
      cursor: pointer;
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
      position: relative;
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
      flex: 1 1 45%;
      border-inline-end: none;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }
    .content.narrow chronotope-map-view {
      flex: 1 1 55%;
    }
  `);Ae("chronotope-panel",yn);
