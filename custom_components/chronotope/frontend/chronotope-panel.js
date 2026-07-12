var Os=Object.create;var Ni=Object.defineProperty;var $s=Object.getOwnPropertyDescriptor;var Is=Object.getOwnPropertyNames;var Zs=Object.getPrototypeOf,Bs=Object.prototype.hasOwnProperty;var Ns=(d,r,a)=>r in d?Ni(d,r,{enumerable:!0,configurable:!0,writable:!0,value:a}):d[r]=a;var po=(d,r)=>()=>(r||d((r={exports:{}}).exports,r),r.exports);var Ds=(d,r,a,o)=>{if(r&&typeof r=="object"||typeof r=="function")for(let l of Is(r))!Bs.call(d,l)&&l!==a&&Ni(d,l,{get:()=>r[l],enumerable:!(o=$s(r,l))||o.enumerable});return d};var _o=(d,r,a)=>(a=d!=null?Os(Zs(d)):{},Ds(r||!d||!d.__esModule?Ni(a,"default",{value:d,enumerable:!0}):a,d));var it=(d,r,a)=>Ns(d,typeof r!="symbol"?r+"":r,a);var Io=po((Qe,$o)=>{(function(d,r){typeof Qe=="object"&&typeof $o<"u"?r(Qe):typeof define=="function"&&define.amd?define(["exports"],r):(d=typeof globalThis<"u"?globalThis:d||self,r(d.leaflet={}))})(Qe,function(d){"use strict";var r="1.9.4";function a(t){var e,i,n,s;for(i=1,n=arguments.length;i<n;i++){s=arguments[i];for(e in s)t[e]=s[e]}return t}var o=Object.create||function(){function t(){}return function(e){return t.prototype=e,new t}}();function l(t,e){var i=Array.prototype.slice;if(t.bind)return t.bind.apply(t,i.call(arguments,1));var n=i.call(arguments,2);return function(){return t.apply(e,n.length?n.concat(i.call(arguments)):arguments)}}var u=0;function c(t){return"_leaflet_id"in t||(t._leaflet_id=++u),t._leaflet_id}function _(t,e,i){var n,s,h,f;return f=function(){n=!1,s&&(h.apply(i,s),s=!1)},h=function(){n?s=arguments:(t.apply(i,arguments),setTimeout(f,e),n=!0)},h}function g(t,e,i){var n=e[1],s=e[0],h=n-s;return t===n&&i?t:((t-s)%h+h)%h+s}function p(){return!1}function x(t,e){if(e===!1)return t;var i=Math.pow(10,e===void 0?6:e);return Math.round(t*i)/i}function y(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function C(t){return y(t).split(/\s+/)}function P(t,e){Object.prototype.hasOwnProperty.call(t,"options")||(t.options=t.options?o(t.options):{});for(var i in e)t.options[i]=e[i];return t.options}function R(t,e,i){var n=[];for(var s in t)n.push(encodeURIComponent(i?s.toUpperCase():s)+"="+encodeURIComponent(t[s]));return(!e||e.indexOf("?")===-1?"?":"&")+n.join("&")}var A=/\{ *([\w_ -]+) *\}/g;function G(t,e){return t.replace(A,function(i,n){var s=e[n];if(s===void 0)throw new Error("No value provided for variable "+i);return typeof s=="function"&&(s=s(e)),s})}var W=Array.isArray||function(t){return Object.prototype.toString.call(t)==="[object Array]"};function xt(t,e){for(var i=0;i<t.length;i++)if(t[i]===e)return i;return-1}var lt="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function te(t){return window["webkit"+t]||window["moz"+t]||window["ms"+t]}var Xi=0;function Qi(t){var e=+new Date,i=Math.max(0,16-(e-Xi));return Xi=e+i,window.setTimeout(t,i)}var ni=window.requestAnimationFrame||te("RequestAnimationFrame")||Qi,tn=window.cancelAnimationFrame||te("CancelAnimationFrame")||te("CancelRequestAnimationFrame")||function(t){window.clearTimeout(t)};function nt(t,e,i){if(i&&ni===Qi)t.call(e);else return ni.call(window,l(t,e))}function ut(t){t&&tn.call(window,t)}var ar={__proto__:null,extend:a,create:o,bind:l,get lastId(){return u},stamp:c,throttle:_,wrapNum:g,falseFn:p,formatNum:x,trim:y,splitWords:C,setOptions:P,getParamString:R,template:G,isArray:W,indexOf:xt,emptyImageUrl:lt,requestFn:ni,cancelFn:tn,requestAnimFrame:nt,cancelAnimFrame:ut};function bt(){}bt.extend=function(t){var e=function(){P(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},i=e.__super__=this.prototype,n=o(i);n.constructor=e,e.prototype=n;for(var s in this)Object.prototype.hasOwnProperty.call(this,s)&&s!=="prototype"&&s!=="__super__"&&(e[s]=this[s]);return t.statics&&a(e,t.statics),t.includes&&(lr(t.includes),a.apply(null,[n].concat(t.includes))),a(n,t),delete n.statics,delete n.includes,n.options&&(n.options=i.options?o(i.options):{},a(n.options,t.options)),n._initHooks=[],n.callInitHooks=function(){if(!this._initHooksCalled){i.callInitHooks&&i.callInitHooks.call(this),this._initHooksCalled=!0;for(var h=0,f=n._initHooks.length;h<f;h++)n._initHooks[h].call(this)}},e},bt.include=function(t){var e=this.prototype.options;return a(this.prototype,t),t.options&&(this.prototype.options=e,this.mergeOptions(t.options)),this},bt.mergeOptions=function(t){return a(this.prototype.options,t),this},bt.addInitHook=function(t){var e=Array.prototype.slice.call(arguments,1),i=typeof t=="function"?t:function(){this[t].apply(this,e)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(i),this};function lr(t){if(!(typeof L>"u"||!L||!L.Mixin)){t=W(t)?t:[t];for(var e=0;e<t.length;e++)t[e]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",new Error().stack)}}var ht={on:function(t,e,i){if(typeof t=="object")for(var n in t)this._on(n,t[n],e);else{t=C(t);for(var s=0,h=t.length;s<h;s++)this._on(t[s],e,i)}return this},off:function(t,e,i){if(!arguments.length)delete this._events;else if(typeof t=="object")for(var n in t)this._off(n,t[n],e);else{t=C(t);for(var s=arguments.length===1,h=0,f=t.length;h<f;h++)s?this._off(t[h]):this._off(t[h],e,i)}return this},_on:function(t,e,i,n){if(typeof e!="function"){console.warn("wrong listener type: "+typeof e);return}if(this._listens(t,e,i)===!1){i===this&&(i=void 0);var s={fn:e,ctx:i};n&&(s.once=!0),this._events=this._events||{},this._events[t]=this._events[t]||[],this._events[t].push(s)}},_off:function(t,e,i){var n,s,h;if(this._events&&(n=this._events[t],!!n)){if(arguments.length===1){if(this._firingCount)for(s=0,h=n.length;s<h;s++)n[s].fn=p;delete this._events[t];return}if(typeof e!="function"){console.warn("wrong listener type: "+typeof e);return}var f=this._listens(t,e,i);if(f!==!1){var m=n[f];this._firingCount&&(m.fn=p,this._events[t]=n=n.slice()),n.splice(f,1)}}},fire:function(t,e,i){if(!this.listens(t,i))return this;var n=a({},e,{type:t,target:this,sourceTarget:e&&e.sourceTarget||this});if(this._events){var s=this._events[t];if(s){this._firingCount=this._firingCount+1||1;for(var h=0,f=s.length;h<f;h++){var m=s[h],v=m.fn;m.once&&this.off(t,v,m.ctx),v.call(m.ctx||this,n)}this._firingCount--}}return i&&this._propagateEvent(n),this},listens:function(t,e,i,n){typeof t!="string"&&console.warn('"string" type argument expected');var s=e;typeof e!="function"&&(n=!!e,s=void 0,i=void 0);var h=this._events&&this._events[t];if(h&&h.length&&this._listens(t,s,i)!==!1)return!0;if(n){for(var f in this._eventParents)if(this._eventParents[f].listens(t,e,i,n))return!0}return!1},_listens:function(t,e,i){if(!this._events)return!1;var n=this._events[t]||[];if(!e)return!!n.length;i===this&&(i=void 0);for(var s=0,h=n.length;s<h;s++)if(n[s].fn===e&&n[s].ctx===i)return s;return!1},once:function(t,e,i){if(typeof t=="object")for(var n in t)this._on(n,t[n],e,!0);else{t=C(t);for(var s=0,h=t.length;s<h;s++)this._on(t[s],e,i,!0)}return this},addEventParent:function(t){return this._eventParents=this._eventParents||{},this._eventParents[c(t)]=t,this},removeEventParent:function(t){return this._eventParents&&delete this._eventParents[c(t)],this},_propagateEvent:function(t){for(var e in this._eventParents)this._eventParents[e].fire(t.type,a({layer:t.target,propagatedFrom:t.target},t),!0)}};ht.addEventListener=ht.on,ht.removeEventListener=ht.clearAllEventListeners=ht.off,ht.addOneTimeEventListener=ht.once,ht.fireEvent=ht.fire,ht.hasEventListeners=ht.listens;var ee=bt.extend(ht);function E(t,e,i){this.x=i?Math.round(t):t,this.y=i?Math.round(e):e}var en=Math.trunc||function(t){return t>0?Math.floor(t):Math.ceil(t)};E.prototype={clone:function(){return new E(this.x,this.y)},add:function(t){return this.clone()._add(M(t))},_add:function(t){return this.x+=t.x,this.y+=t.y,this},subtract:function(t){return this.clone()._subtract(M(t))},_subtract:function(t){return this.x-=t.x,this.y-=t.y,this},divideBy:function(t){return this.clone()._divideBy(t)},_divideBy:function(t){return this.x/=t,this.y/=t,this},multiplyBy:function(t){return this.clone()._multiplyBy(t)},_multiplyBy:function(t){return this.x*=t,this.y*=t,this},scaleBy:function(t){return new E(this.x*t.x,this.y*t.y)},unscaleBy:function(t){return new E(this.x/t.x,this.y/t.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=en(this.x),this.y=en(this.y),this},distanceTo:function(t){t=M(t);var e=t.x-this.x,i=t.y-this.y;return Math.sqrt(e*e+i*i)},equals:function(t){return t=M(t),t.x===this.x&&t.y===this.y},contains:function(t){return t=M(t),Math.abs(t.x)<=Math.abs(this.x)&&Math.abs(t.y)<=Math.abs(this.y)},toString:function(){return"Point("+x(this.x)+", "+x(this.y)+")"}};function M(t,e,i){return t instanceof E?t:W(t)?new E(t[0],t[1]):t==null?t:typeof t=="object"&&"x"in t&&"y"in t?new E(t.x,t.y):new E(t,e,i)}function q(t,e){if(t)for(var i=e?[t,e]:t,n=0,s=i.length;n<s;n++)this.extend(i[n])}q.prototype={extend:function(t){var e,i;if(!t)return this;if(t instanceof E||typeof t[0]=="number"||"x"in t)e=i=M(t);else if(t=ot(t),e=t.min,i=t.max,!e||!i)return this;return!this.min&&!this.max?(this.min=e.clone(),this.max=i.clone()):(this.min.x=Math.min(e.x,this.min.x),this.max.x=Math.max(i.x,this.max.x),this.min.y=Math.min(e.y,this.min.y),this.max.y=Math.max(i.y,this.max.y)),this},getCenter:function(t){return M((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,t)},getBottomLeft:function(){return M(this.min.x,this.max.y)},getTopRight:function(){return M(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(t){var e,i;return typeof t[0]=="number"||t instanceof E?t=M(t):t=ot(t),t instanceof q?(e=t.min,i=t.max):e=i=t,e.x>=this.min.x&&i.x<=this.max.x&&e.y>=this.min.y&&i.y<=this.max.y},intersects:function(t){t=ot(t);var e=this.min,i=this.max,n=t.min,s=t.max,h=s.x>=e.x&&n.x<=i.x,f=s.y>=e.y&&n.y<=i.y;return h&&f},overlaps:function(t){t=ot(t);var e=this.min,i=this.max,n=t.min,s=t.max,h=s.x>e.x&&n.x<i.x,f=s.y>e.y&&n.y<i.y;return h&&f},isValid:function(){return!!(this.min&&this.max)},pad:function(t){var e=this.min,i=this.max,n=Math.abs(e.x-i.x)*t,s=Math.abs(e.y-i.y)*t;return ot(M(e.x-n,e.y-s),M(i.x+n,i.y+s))},equals:function(t){return t?(t=ot(t),this.min.equals(t.getTopLeft())&&this.max.equals(t.getBottomRight())):!1}};function ot(t,e){return!t||t instanceof q?t:new q(t,e)}function rt(t,e){if(t)for(var i=e?[t,e]:t,n=0,s=i.length;n<s;n++)this.extend(i[n])}rt.prototype={extend:function(t){var e=this._southWest,i=this._northEast,n,s;if(t instanceof F)n=t,s=t;else if(t instanceof rt){if(n=t._southWest,s=t._northEast,!n||!s)return this}else return t?this.extend(B(t)||K(t)):this;return!e&&!i?(this._southWest=new F(n.lat,n.lng),this._northEast=new F(s.lat,s.lng)):(e.lat=Math.min(n.lat,e.lat),e.lng=Math.min(n.lng,e.lng),i.lat=Math.max(s.lat,i.lat),i.lng=Math.max(s.lng,i.lng)),this},pad:function(t){var e=this._southWest,i=this._northEast,n=Math.abs(e.lat-i.lat)*t,s=Math.abs(e.lng-i.lng)*t;return new rt(new F(e.lat-n,e.lng-s),new F(i.lat+n,i.lng+s))},getCenter:function(){return new F((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new F(this.getNorth(),this.getWest())},getSouthEast:function(){return new F(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(t){typeof t[0]=="number"||t instanceof F||"lat"in t?t=B(t):t=K(t);var e=this._southWest,i=this._northEast,n,s;return t instanceof rt?(n=t.getSouthWest(),s=t.getNorthEast()):n=s=t,n.lat>=e.lat&&s.lat<=i.lat&&n.lng>=e.lng&&s.lng<=i.lng},intersects:function(t){t=K(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),s=t.getNorthEast(),h=s.lat>=e.lat&&n.lat<=i.lat,f=s.lng>=e.lng&&n.lng<=i.lng;return h&&f},overlaps:function(t){t=K(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),s=t.getNorthEast(),h=s.lat>e.lat&&n.lat<i.lat,f=s.lng>e.lng&&n.lng<i.lng;return h&&f},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(t,e){return t?(t=K(t),this._southWest.equals(t.getSouthWest(),e)&&this._northEast.equals(t.getNorthEast(),e)):!1},isValid:function(){return!!(this._southWest&&this._northEast)}};function K(t,e){return t instanceof rt?t:new rt(t,e)}function F(t,e,i){if(isNaN(t)||isNaN(e))throw new Error("Invalid LatLng object: ("+t+", "+e+")");this.lat=+t,this.lng=+e,i!==void 0&&(this.alt=+i)}F.prototype={equals:function(t,e){if(!t)return!1;t=B(t);var i=Math.max(Math.abs(this.lat-t.lat),Math.abs(this.lng-t.lng));return i<=(e===void 0?1e-9:e)},toString:function(t){return"LatLng("+x(this.lat,t)+", "+x(this.lng,t)+")"},distanceTo:function(t){return Tt.distance(this,B(t))},wrap:function(){return Tt.wrapLatLng(this)},toBounds:function(t){var e=180*t/40075017,i=e/Math.cos(Math.PI/180*this.lat);return K([this.lat-e,this.lng-i],[this.lat+e,this.lng+i])},clone:function(){return new F(this.lat,this.lng,this.alt)}};function B(t,e,i){return t instanceof F?t:W(t)&&typeof t[0]!="object"?t.length===3?new F(t[0],t[1],t[2]):t.length===2?new F(t[0],t[1]):null:t==null?t:typeof t=="object"&&"lat"in t?new F(t.lat,"lng"in t?t.lng:t.lon,t.alt):e===void 0?null:new F(t,e,i)}var wt={latLngToPoint:function(t,e){var i=this.projection.project(t),n=this.scale(e);return this.transformation._transform(i,n)},pointToLatLng:function(t,e){var i=this.scale(e),n=this.transformation.untransform(t,i);return this.projection.unproject(n)},project:function(t){return this.projection.project(t)},unproject:function(t){return this.projection.unproject(t)},scale:function(t){return 256*Math.pow(2,t)},zoom:function(t){return Math.log(t/256)/Math.LN2},getProjectedBounds:function(t){if(this.infinite)return null;var e=this.projection.bounds,i=this.scale(t),n=this.transformation.transform(e.min,i),s=this.transformation.transform(e.max,i);return new q(n,s)},infinite:!1,wrapLatLng:function(t){var e=this.wrapLng?g(t.lng,this.wrapLng,!0):t.lng,i=this.wrapLat?g(t.lat,this.wrapLat,!0):t.lat,n=t.alt;return new F(i,e,n)},wrapLatLngBounds:function(t){var e=t.getCenter(),i=this.wrapLatLng(e),n=e.lat-i.lat,s=e.lng-i.lng;if(n===0&&s===0)return t;var h=t.getSouthWest(),f=t.getNorthEast(),m=new F(h.lat-n,h.lng-s),v=new F(f.lat-n,f.lng-s);return new rt(m,v)}},Tt=a({},wt,{wrapLng:[-180,180],R:6371e3,distance:function(t,e){var i=Math.PI/180,n=t.lat*i,s=e.lat*i,h=Math.sin((e.lat-t.lat)*i/2),f=Math.sin((e.lng-t.lng)*i/2),m=h*h+Math.cos(n)*Math.cos(s)*f*f,v=2*Math.atan2(Math.sqrt(m),Math.sqrt(1-m));return this.R*v}}),nn=6378137,oi={R:nn,MAX_LATITUDE:85.0511287798,project:function(t){var e=Math.PI/180,i=this.MAX_LATITUDE,n=Math.max(Math.min(i,t.lat),-i),s=Math.sin(n*e);return new E(this.R*t.lng*e,this.R*Math.log((1+s)/(1-s))/2)},unproject:function(t){var e=180/Math.PI;return new F((2*Math.atan(Math.exp(t.y/this.R))-Math.PI/2)*e,t.x*e/this.R)},bounds:function(){var t=nn*Math.PI;return new q([-t,-t],[t,t])}()};function ri(t,e,i,n){if(W(t)){this._a=t[0],this._b=t[1],this._c=t[2],this._d=t[3];return}this._a=t,this._b=e,this._c=i,this._d=n}ri.prototype={transform:function(t,e){return this._transform(t.clone(),e)},_transform:function(t,e){return e=e||1,t.x=e*(this._a*t.x+this._b),t.y=e*(this._c*t.y+this._d),t},untransform:function(t,e){return e=e||1,new E((t.x/e-this._b)/this._a,(t.y/e-this._d)/this._c)}};function ie(t,e,i,n){return new ri(t,e,i,n)}var si=a({},Tt,{code:"EPSG:3857",projection:oi,transformation:function(){var t=.5/(Math.PI*oi.R);return ie(t,.5,-t,.5)}()}),hr=a({},si,{code:"EPSG:900913"});function on(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function rn(t,e){var i="",n,s,h,f,m,v;for(n=0,h=t.length;n<h;n++){for(m=t[n],s=0,f=m.length;s<f;s++)v=m[s],i+=(s?"L":"M")+v.x+" "+v.y;i+=e?S.svg?"z":"x":""}return i||"M0 0"}var ai=document.documentElement.style,ze="ActiveXObject"in window,ur=ze&&!document.addEventListener,sn="msLaunchUri"in navigator&&!("documentMode"in document),li=mt("webkit"),an=mt("android"),ln=mt("android 2")||mt("android 3"),cr=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),dr=an&&mt("Google")&&cr<537&&!("AudioNode"in window),hi=!!window.opera,hn=!sn&&mt("chrome"),un=mt("gecko")&&!li&&!hi&&!ze,fr=!hn&&mt("safari"),cn=mt("phantom"),dn="OTransition"in ai,pr=navigator.platform.indexOf("Win")===0,fn=ze&&"transition"in ai,ui="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!ln,pn="MozPerspective"in ai,_r=!window.L_DISABLE_3D&&(fn||ui||pn)&&!dn&&!cn,ne=typeof orientation<"u"||mt("mobile"),mr=ne&&li,gr=ne&&ui,_n=!window.PointerEvent&&window.MSPointerEvent,mn=!!(window.PointerEvent||_n),gn="ontouchstart"in window||!!window.TouchEvent,vr=!window.L_NO_TOUCH&&(gn||mn),yr=ne&&hi,xr=ne&&un,br=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,wr=function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("testPassiveEventSupport",p,e),window.removeEventListener("testPassiveEventSupport",p,e)}catch{}return t}(),Lr=function(){return!!document.createElement("canvas").getContext}(),ci=!!(document.createElementNS&&on("svg").createSVGRect),Pr=!!ci&&function(){var t=document.createElement("div");return t.innerHTML="<svg/>",(t.firstChild&&t.firstChild.namespaceURI)==="http://www.w3.org/2000/svg"}(),Cr=!ci&&function(){try{var t=document.createElement("div");t.innerHTML='<v:shape adj="1"/>';var e=t.firstChild;return e.style.behavior="url(#default#VML)",e&&typeof e.adj=="object"}catch{return!1}}(),kr=navigator.platform.indexOf("Mac")===0,Sr=navigator.platform.indexOf("Linux")===0;function mt(t){return navigator.userAgent.toLowerCase().indexOf(t)>=0}var S={ie:ze,ielt9:ur,edge:sn,webkit:li,android:an,android23:ln,androidStock:dr,opera:hi,chrome:hn,gecko:un,safari:fr,phantom:cn,opera12:dn,win:pr,ie3d:fn,webkit3d:ui,gecko3d:pn,any3d:_r,mobile:ne,mobileWebkit:mr,mobileWebkit3d:gr,msPointer:_n,pointer:mn,touch:vr,touchNative:gn,mobileOpera:yr,mobileGecko:xr,retina:br,passiveEvents:wr,canvas:Lr,svg:ci,vml:Cr,inlineSvg:Pr,mac:kr,linux:Sr},vn=S.msPointer?"MSPointerDown":"pointerdown",yn=S.msPointer?"MSPointerMove":"pointermove",xn=S.msPointer?"MSPointerUp":"pointerup",bn=S.msPointer?"MSPointerCancel":"pointercancel",di={touchstart:vn,touchmove:yn,touchend:xn,touchcancel:bn},wn={touchstart:Or,touchmove:Ae,touchend:Ae,touchcancel:Ae},Ht={},Ln=!1;function Tr(t,e,i){return e==="touchstart"&&Ar(),wn[e]?(i=wn[e].bind(this,i),t.addEventListener(di[e],i,!1),i):(console.warn("wrong event specified:",e),p)}function Mr(t,e,i){if(!di[e]){console.warn("wrong event specified:",e);return}t.removeEventListener(di[e],i,!1)}function Er(t){Ht[t.pointerId]=t}function zr(t){Ht[t.pointerId]&&(Ht[t.pointerId]=t)}function Pn(t){delete Ht[t.pointerId]}function Ar(){Ln||(document.addEventListener(vn,Er,!0),document.addEventListener(yn,zr,!0),document.addEventListener(xn,Pn,!0),document.addEventListener(bn,Pn,!0),Ln=!0)}function Ae(t,e){if(e.pointerType!==(e.MSPOINTER_TYPE_MOUSE||"mouse")){e.touches=[];for(var i in Ht)e.touches.push(Ht[i]);e.changedTouches=[e],t(e)}}function Or(t,e){e.MSPOINTER_TYPE_TOUCH&&e.pointerType===e.MSPOINTER_TYPE_TOUCH&&Q(e),Ae(t,e)}function $r(t){var e={},i,n;for(n in t)i=t[n],e[n]=i&&i.bind?i.bind(t):i;return t=e,e.type="dblclick",e.detail=2,e.isTrusted=!1,e._simulated=!0,e}var Ir=200;function Zr(t,e){t.addEventListener("dblclick",e);var i=0,n;function s(h){if(h.detail!==1){n=h.detail;return}if(!(h.pointerType==="mouse"||h.sourceCapabilities&&!h.sourceCapabilities.firesTouchEvents)){var f=Mn(h);if(!(f.some(function(v){return v instanceof HTMLLabelElement&&v.attributes.for})&&!f.some(function(v){return v instanceof HTMLInputElement||v instanceof HTMLSelectElement}))){var m=Date.now();m-i<=Ir?(n++,n===2&&e($r(h))):n=1,i=m}}}return t.addEventListener("click",s),{dblclick:e,simDblclick:s}}function Br(t,e){t.removeEventListener("dblclick",e.dblclick),t.removeEventListener("click",e.simDblclick)}var fi=Ie(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),oe=Ie(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),Cn=oe==="webkitTransition"||oe==="OTransition"?oe+"End":"transitionend";function kn(t){return typeof t=="string"?document.getElementById(t):t}function re(t,e){var i=t.style[e]||t.currentStyle&&t.currentStyle[e];if((!i||i==="auto")&&document.defaultView){var n=document.defaultView.getComputedStyle(t,null);i=n?n[e]:null}return i==="auto"?null:i}function D(t,e,i){var n=document.createElement(t);return n.className=e||"",i&&i.appendChild(n),n}function V(t){var e=t.parentNode;e&&e.removeChild(t)}function Oe(t){for(;t.firstChild;)t.removeChild(t.firstChild)}function Ut(t){var e=t.parentNode;e&&e.lastChild!==t&&e.appendChild(t)}function Gt(t){var e=t.parentNode;e&&e.firstChild!==t&&e.insertBefore(t,e.firstChild)}function pi(t,e){if(t.classList!==void 0)return t.classList.contains(e);var i=$e(t);return i.length>0&&new RegExp("(^|\\s)"+e+"(\\s|$)").test(i)}function O(t,e){if(t.classList!==void 0)for(var i=C(e),n=0,s=i.length;n<s;n++)t.classList.add(i[n]);else if(!pi(t,e)){var h=$e(t);_i(t,(h?h+" ":"")+e)}}function j(t,e){t.classList!==void 0?t.classList.remove(e):_i(t,y((" "+$e(t)+" ").replace(" "+e+" "," ")))}function _i(t,e){t.className.baseVal===void 0?t.className=e:t.className.baseVal=e}function $e(t){return t.correspondingElement&&(t=t.correspondingElement),t.className.baseVal===void 0?t.className:t.className.baseVal}function ct(t,e){"opacity"in t.style?t.style.opacity=e:"filter"in t.style&&Nr(t,e)}function Nr(t,e){var i=!1,n="DXImageTransform.Microsoft.Alpha";try{i=t.filters.item(n)}catch{if(e===1)return}e=Math.round(e*100),i?(i.Enabled=e!==100,i.Opacity=e):t.style.filter+=" progid:"+n+"(opacity="+e+")"}function Ie(t){for(var e=document.documentElement.style,i=0;i<t.length;i++)if(t[i]in e)return t[i];return!1}function Ot(t,e,i){var n=e||new E(0,0);t.style[fi]=(S.ie3d?"translate("+n.x+"px,"+n.y+"px)":"translate3d("+n.x+"px,"+n.y+"px,0)")+(i?" scale("+i+")":"")}function Y(t,e){t._leaflet_pos=e,S.any3d?Ot(t,e):(t.style.left=e.x+"px",t.style.top=e.y+"px")}function $t(t){return t._leaflet_pos||new E(0,0)}var se,ae,mi;if("onselectstart"in document)se=function(){z(window,"selectstart",Q)},ae=function(){H(window,"selectstart",Q)};else{var le=Ie(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);se=function(){if(le){var t=document.documentElement.style;mi=t[le],t[le]="none"}},ae=function(){le&&(document.documentElement.style[le]=mi,mi=void 0)}}function gi(){z(window,"dragstart",Q)}function vi(){H(window,"dragstart",Q)}var Ze,yi;function xi(t){for(;t.tabIndex===-1;)t=t.parentNode;t.style&&(Be(),Ze=t,yi=t.style.outlineStyle,t.style.outlineStyle="none",z(window,"keydown",Be))}function Be(){Ze&&(Ze.style.outlineStyle=yi,Ze=void 0,yi=void 0,H(window,"keydown",Be))}function Sn(t){do t=t.parentNode;while((!t.offsetWidth||!t.offsetHeight)&&t!==document.body);return t}function bi(t){var e=t.getBoundingClientRect();return{x:e.width/t.offsetWidth||1,y:e.height/t.offsetHeight||1,boundingClientRect:e}}var Dr={__proto__:null,TRANSFORM:fi,TRANSITION:oe,TRANSITION_END:Cn,get:kn,getStyle:re,create:D,remove:V,empty:Oe,toFront:Ut,toBack:Gt,hasClass:pi,addClass:O,removeClass:j,setClass:_i,getClass:$e,setOpacity:ct,testProp:Ie,setTransform:Ot,setPosition:Y,getPosition:$t,get disableTextSelection(){return se},get enableTextSelection(){return ae},disableImageDrag:gi,enableImageDrag:vi,preventOutline:xi,restoreOutline:Be,getSizedParentNode:Sn,getScale:bi};function z(t,e,i,n){if(e&&typeof e=="object")for(var s in e)Li(t,s,e[s],i);else{e=C(e);for(var h=0,f=e.length;h<f;h++)Li(t,e[h],i,n)}return this}var gt="_leaflet_events";function H(t,e,i,n){if(arguments.length===1)Tn(t),delete t[gt];else if(e&&typeof e=="object")for(var s in e)Pi(t,s,e[s],i);else if(e=C(e),arguments.length===2)Tn(t,function(m){return xt(e,m)!==-1});else for(var h=0,f=e.length;h<f;h++)Pi(t,e[h],i,n);return this}function Tn(t,e){for(var i in t[gt]){var n=i.split(/\d/)[0];(!e||e(n))&&Pi(t,n,null,null,i)}}var wi={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function Li(t,e,i,n){var s=e+c(i)+(n?"_"+c(n):"");if(t[gt]&&t[gt][s])return this;var h=function(m){return i.call(n||t,m||window.event)},f=h;!S.touchNative&&S.pointer&&e.indexOf("touch")===0?h=Tr(t,e,h):S.touch&&e==="dblclick"?h=Zr(t,h):"addEventListener"in t?e==="touchstart"||e==="touchmove"||e==="wheel"||e==="mousewheel"?t.addEventListener(wi[e]||e,h,S.passiveEvents?{passive:!1}:!1):e==="mouseenter"||e==="mouseleave"?(h=function(m){m=m||window.event,ki(t,m)&&f(m)},t.addEventListener(wi[e],h,!1)):t.addEventListener(e,f,!1):t.attachEvent("on"+e,h),t[gt]=t[gt]||{},t[gt][s]=h}function Pi(t,e,i,n,s){s=s||e+c(i)+(n?"_"+c(n):"");var h=t[gt]&&t[gt][s];if(!h)return this;!S.touchNative&&S.pointer&&e.indexOf("touch")===0?Mr(t,e,h):S.touch&&e==="dblclick"?Br(t,h):"removeEventListener"in t?t.removeEventListener(wi[e]||e,h,!1):t.detachEvent("on"+e,h),t[gt][s]=null}function It(t){return t.stopPropagation?t.stopPropagation():t.originalEvent?t.originalEvent._stopped=!0:t.cancelBubble=!0,this}function Ci(t){return Li(t,"wheel",It),this}function he(t){return z(t,"mousedown touchstart dblclick contextmenu",It),t._leaflet_disable_click=!0,this}function Q(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,this}function Zt(t){return Q(t),It(t),this}function Mn(t){if(t.composedPath)return t.composedPath();for(var e=[],i=t.target;i;)e.push(i),i=i.parentNode;return e}function En(t,e){if(!e)return new E(t.clientX,t.clientY);var i=bi(e),n=i.boundingClientRect;return new E((t.clientX-n.left)/i.x-e.clientLeft,(t.clientY-n.top)/i.y-e.clientTop)}var Rr=S.linux&&S.chrome?window.devicePixelRatio:S.mac?window.devicePixelRatio*3:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function zn(t){return S.edge?t.wheelDeltaY/2:t.deltaY&&t.deltaMode===0?-t.deltaY/Rr:t.deltaY&&t.deltaMode===1?-t.deltaY*20:t.deltaY&&t.deltaMode===2?-t.deltaY*60:t.deltaX||t.deltaZ?0:t.wheelDelta?(t.wheelDeltaY||t.wheelDelta)/2:t.detail&&Math.abs(t.detail)<32765?-t.detail*20:t.detail?t.detail/-32765*60:0}function ki(t,e){var i=e.relatedTarget;if(!i)return!0;try{for(;i&&i!==t;)i=i.parentNode}catch{return!1}return i!==t}var Fr={__proto__:null,on:z,off:H,stopPropagation:It,disableScrollPropagation:Ci,disableClickPropagation:he,preventDefault:Q,stop:Zt,getPropagationPath:Mn,getMousePosition:En,getWheelDelta:zn,isExternalTarget:ki,addListener:z,removeListener:H},An=ee.extend({run:function(t,e,i,n){this.stop(),this._el=t,this._inProgress=!0,this._duration=i||.25,this._easeOutPower=1/Math.max(n||.5,.2),this._startPos=$t(t),this._offset=e.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=nt(this._animate,this),this._step()},_step:function(t){var e=+new Date-this._startTime,i=this._duration*1e3;e<i?this._runFrame(this._easeOut(e/i),t):(this._runFrame(1),this._complete())},_runFrame:function(t,e){var i=this._startPos.add(this._offset.multiplyBy(t));e&&i._round(),Y(this._el,i),this.fire("step")},_complete:function(){ut(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(t){return 1-Math.pow(1-t,this._easeOutPower)}}),N=ee.extend({options:{crs:si,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(t,e){e=P(this,e),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(t),this._initLayout(),this._onResize=l(this._onResize,this),this._initEvents(),e.maxBounds&&this.setMaxBounds(e.maxBounds),e.zoom!==void 0&&(this._zoom=this._limitZoom(e.zoom)),e.center&&e.zoom!==void 0&&this.setView(B(e.center),e.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=oe&&S.any3d&&!S.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),z(this._proxy,Cn,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(t,e,i){if(e=e===void 0?this._zoom:this._limitZoom(e),t=this._limitCenter(B(t),e,this.options.maxBounds),i=i||{},this._stop(),this._loaded&&!i.reset&&i!==!0){i.animate!==void 0&&(i.zoom=a({animate:i.animate},i.zoom),i.pan=a({animate:i.animate,duration:i.duration},i.pan));var n=this._zoom!==e?this._tryAnimatedZoom&&this._tryAnimatedZoom(t,e,i.zoom):this._tryAnimatedPan(t,i.pan);if(n)return clearTimeout(this._sizeTimer),this}return this._resetView(t,e,i.pan&&i.pan.noMoveStart),this},setZoom:function(t,e){return this._loaded?this.setView(this.getCenter(),t,{zoom:e}):(this._zoom=t,this)},zoomIn:function(t,e){return t=t||(S.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+t,e)},zoomOut:function(t,e){return t=t||(S.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-t,e)},setZoomAround:function(t,e,i){var n=this.getZoomScale(e),s=this.getSize().divideBy(2),h=t instanceof E?t:this.latLngToContainerPoint(t),f=h.subtract(s).multiplyBy(1-1/n),m=this.containerPointToLatLng(s.add(f));return this.setView(m,e,{zoom:i})},_getBoundsCenterZoom:function(t,e){e=e||{},t=t.getBounds?t.getBounds():K(t);var i=M(e.paddingTopLeft||e.padding||[0,0]),n=M(e.paddingBottomRight||e.padding||[0,0]),s=this.getBoundsZoom(t,!1,i.add(n));if(s=typeof e.maxZoom=="number"?Math.min(e.maxZoom,s):s,s===1/0)return{center:t.getCenter(),zoom:s};var h=n.subtract(i).divideBy(2),f=this.project(t.getSouthWest(),s),m=this.project(t.getNorthEast(),s),v=this.unproject(f.add(m).divideBy(2).add(h),s);return{center:v,zoom:s}},fitBounds:function(t,e){if(t=K(t),!t.isValid())throw new Error("Bounds are not valid.");var i=this._getBoundsCenterZoom(t,e);return this.setView(i.center,i.zoom,e)},fitWorld:function(t){return this.fitBounds([[-90,-180],[90,180]],t)},panTo:function(t,e){return this.setView(t,this._zoom,{pan:e})},panBy:function(t,e){if(t=M(t).round(),e=e||{},!t.x&&!t.y)return this.fire("moveend");if(e.animate!==!0&&!this.getSize().contains(t))return this._resetView(this.unproject(this.project(this.getCenter()).add(t)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new An,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),e.noMoveStart||this.fire("movestart"),e.animate!==!1){O(this._mapPane,"leaflet-pan-anim");var i=this._getMapPanePos().subtract(t).round();this._panAnim.run(this._mapPane,i,e.duration||.25,e.easeLinearity)}else this._rawPanBy(t),this.fire("move").fire("moveend");return this},flyTo:function(t,e,i){if(i=i||{},i.animate===!1||!S.any3d)return this.setView(t,e,i);this._stop();var n=this.project(this.getCenter()),s=this.project(t),h=this.getSize(),f=this._zoom;t=B(t),e=e===void 0?f:e;var m=Math.max(h.x,h.y),v=m*this.getZoomScale(f,e),b=s.distanceTo(n)||1,k=1.42,T=k*k;function $(J){var Ke=J?-1:1,Ms=J?v:m,Es=v*v-m*m+Ke*T*T*b*b,zs=2*Ms*T*b,Bi=Es/zs,fo=Math.sqrt(Bi*Bi+1)-Bi,As=fo<1e-9?-18:Math.log(fo);return As}function et(J){return(Math.exp(J)-Math.exp(-J))/2}function X(J){return(Math.exp(J)+Math.exp(-J))/2}function ft(J){return et(J)/X(J)}var st=$(0);function Yt(J){return m*(X(st)/X(st+k*J))}function Cs(J){return m*(X(st)*ft(st+k*J)-et(st))/T}function ks(J){return 1-Math.pow(1-J,1.5)}var Ss=Date.now(),uo=($(1)-st)/k,Ts=i.duration?1e3*i.duration:1e3*uo*.8;function co(){var J=(Date.now()-Ss)/Ts,Ke=ks(J)*uo;J<=1?(this._flyToFrame=nt(co,this),this._move(this.unproject(n.add(s.subtract(n).multiplyBy(Cs(Ke)/b)),f),this.getScaleZoom(m/Yt(Ke),f),{flyTo:!0})):this._move(t,e)._moveEnd(!0)}return this._moveStart(!0,i.noMoveStart),co.call(this),this},flyToBounds:function(t,e){var i=this._getBoundsCenterZoom(t,e);return this.flyTo(i.center,i.zoom,e)},setMaxBounds:function(t){return t=K(t),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),t.isValid()?(this.options.maxBounds=t,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(t){var e=this.options.minZoom;return this.options.minZoom=t,this._loaded&&e!==t&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(t):this},setMaxZoom:function(t){var e=this.options.maxZoom;return this.options.maxZoom=t,this._loaded&&e!==t&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(t):this},panInsideBounds:function(t,e){this._enforcingBounds=!0;var i=this.getCenter(),n=this._limitCenter(i,this._zoom,K(t));return i.equals(n)||this.panTo(n,e),this._enforcingBounds=!1,this},panInside:function(t,e){e=e||{};var i=M(e.paddingTopLeft||e.padding||[0,0]),n=M(e.paddingBottomRight||e.padding||[0,0]),s=this.project(this.getCenter()),h=this.project(t),f=this.getPixelBounds(),m=ot([f.min.add(i),f.max.subtract(n)]),v=m.getSize();if(!m.contains(h)){this._enforcingBounds=!0;var b=h.subtract(m.getCenter()),k=m.extend(h).getSize().subtract(v);s.x+=b.x<0?-k.x:k.x,s.y+=b.y<0?-k.y:k.y,this.panTo(this.unproject(s),e),this._enforcingBounds=!1}return this},invalidateSize:function(t){if(!this._loaded)return this;t=a({animate:!1,pan:!0},t===!0?{animate:!0}:t);var e=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var i=this.getSize(),n=e.divideBy(2).round(),s=i.divideBy(2).round(),h=n.subtract(s);return!h.x&&!h.y?this:(t.animate&&t.pan?this.panBy(h):(t.pan&&this._rawPanBy(h),this.fire("move"),t.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(l(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:e,newSize:i}))},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(t){if(t=this._locateOptions=a({timeout:1e4,watch:!1},t),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var e=l(this._handleGeolocationResponse,this),i=l(this._handleGeolocationError,this);return t.watch?this._locationWatchId=navigator.geolocation.watchPosition(e,i,t):navigator.geolocation.getCurrentPosition(e,i,t),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(t){if(this._container._leaflet_id){var e=t.code,i=t.message||(e===1?"permission denied":e===2?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:e,message:"Geolocation error: "+i+"."})}},_handleGeolocationResponse:function(t){if(this._container._leaflet_id){var e=t.coords.latitude,i=t.coords.longitude,n=new F(e,i),s=n.toBounds(t.coords.accuracy*2),h=this._locateOptions;if(h.setView){var f=this.getBoundsZoom(s);this.setView(n,h.maxZoom?Math.min(f,h.maxZoom):f)}var m={latlng:n,bounds:s,timestamp:t.timestamp};for(var v in t.coords)typeof t.coords[v]=="number"&&(m[v]=t.coords[v]);this.fire("locationfound",m)}},addHandler:function(t,e){if(!e)return this;var i=this[t]=new e(this);return this._handlers.push(i),this.options[t]&&i.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch{this._container._leaflet_id=void 0,this._containerId=void 0}this._locationWatchId!==void 0&&this.stopLocate(),this._stop(),V(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(ut(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload");var t;for(t in this._layers)this._layers[t].remove();for(t in this._panes)V(this._panes[t]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(t,e){var i="leaflet-pane"+(t?" leaflet-"+t.replace("Pane","")+"-pane":""),n=D("div",i,e||this._mapPane);return t&&(this._panes[t]=n),n},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var t=this.getPixelBounds(),e=this.unproject(t.getBottomLeft()),i=this.unproject(t.getTopRight());return new rt(e,i)},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(t,e,i){t=K(t),i=M(i||[0,0]);var n=this.getZoom()||0,s=this.getMinZoom(),h=this.getMaxZoom(),f=t.getNorthWest(),m=t.getSouthEast(),v=this.getSize().subtract(i),b=ot(this.project(m,n),this.project(f,n)).getSize(),k=S.any3d?this.options.zoomSnap:1,T=v.x/b.x,$=v.y/b.y,et=e?Math.max(T,$):Math.min(T,$);return n=this.getScaleZoom(et,n),k&&(n=Math.round(n/(k/100))*(k/100),n=e?Math.ceil(n/k)*k:Math.floor(n/k)*k),Math.max(s,Math.min(h,n))},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new E(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(t,e){var i=this._getTopLeftPoint(t,e);return new q(i,i.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(t){return this.options.crs.getProjectedBounds(t===void 0?this.getZoom():t)},getPane:function(t){return typeof t=="string"?this._panes[t]:t},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(t,e){var i=this.options.crs;return e=e===void 0?this._zoom:e,i.scale(t)/i.scale(e)},getScaleZoom:function(t,e){var i=this.options.crs;e=e===void 0?this._zoom:e;var n=i.zoom(t*i.scale(e));return isNaN(n)?1/0:n},project:function(t,e){return e=e===void 0?this._zoom:e,this.options.crs.latLngToPoint(B(t),e)},unproject:function(t,e){return e=e===void 0?this._zoom:e,this.options.crs.pointToLatLng(M(t),e)},layerPointToLatLng:function(t){var e=M(t).add(this.getPixelOrigin());return this.unproject(e)},latLngToLayerPoint:function(t){var e=this.project(B(t))._round();return e._subtract(this.getPixelOrigin())},wrapLatLng:function(t){return this.options.crs.wrapLatLng(B(t))},wrapLatLngBounds:function(t){return this.options.crs.wrapLatLngBounds(K(t))},distance:function(t,e){return this.options.crs.distance(B(t),B(e))},containerPointToLayerPoint:function(t){return M(t).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(t){return M(t).add(this._getMapPanePos())},containerPointToLatLng:function(t){var e=this.containerPointToLayerPoint(M(t));return this.layerPointToLatLng(e)},latLngToContainerPoint:function(t){return this.layerPointToContainerPoint(this.latLngToLayerPoint(B(t)))},mouseEventToContainerPoint:function(t){return En(t,this._container)},mouseEventToLayerPoint:function(t){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))},mouseEventToLatLng:function(t){return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))},_initContainer:function(t){var e=this._container=kn(t);if(e){if(e._leaflet_id)throw new Error("Map container is already initialized.")}else throw new Error("Map container not found.");z(e,"scroll",this._onScroll,this),this._containerId=c(e)},_initLayout:function(){var t=this._container;this._fadeAnimated=this.options.fadeAnimation&&S.any3d,O(t,"leaflet-container"+(S.touch?" leaflet-touch":"")+(S.retina?" leaflet-retina":"")+(S.ielt9?" leaflet-oldie":"")+(S.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var e=re(t,"position");e!=="absolute"&&e!=="relative"&&e!=="fixed"&&e!=="sticky"&&(t.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var t=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),Y(this._mapPane,new E(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(O(t.markerPane,"leaflet-zoom-hide"),O(t.shadowPane,"leaflet-zoom-hide"))},_resetView:function(t,e,i){Y(this._mapPane,new E(0,0));var n=!this._loaded;this._loaded=!0,e=this._limitZoom(e),this.fire("viewprereset");var s=this._zoom!==e;this._moveStart(s,i)._move(t,e)._moveEnd(s),this.fire("viewreset"),n&&this.fire("load")},_moveStart:function(t,e){return t&&this.fire("zoomstart"),e||this.fire("movestart"),this},_move:function(t,e,i,n){e===void 0&&(e=this._zoom);var s=this._zoom!==e;return this._zoom=e,this._lastCenter=t,this._pixelOrigin=this._getNewPixelOrigin(t),n?i&&i.pinch&&this.fire("zoom",i):((s||i&&i.pinch)&&this.fire("zoom",i),this.fire("move",i)),this},_moveEnd:function(t){return t&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return ut(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(t){Y(this._mapPane,this._getMapPanePos().subtract(t))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(t){this._targets={},this._targets[c(this._container)]=this;var e=t?H:z;e(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&e(window,"resize",this._onResize,this),S.any3d&&this.options.transform3DLimit&&(t?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){ut(this._resizeRequest),this._resizeRequest=nt(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var t=this._getMapPanePos();Math.max(Math.abs(t.x),Math.abs(t.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(t,e){for(var i=[],n,s=e==="mouseout"||e==="mouseover",h=t.target||t.srcElement,f=!1;h;){if(n=this._targets[c(h)],n&&(e==="click"||e==="preclick")&&this._draggableMoved(n)){f=!0;break}if(n&&n.listens(e,!0)&&(s&&!ki(h,t)||(i.push(n),s))||h===this._container)break;h=h.parentNode}return!i.length&&!f&&!s&&this.listens(e,!0)&&(i=[this]),i},_isClickDisabled:function(t){for(;t&&t!==this._container;){if(t._leaflet_disable_click)return!0;t=t.parentNode}},_handleDOMEvent:function(t){var e=t.target||t.srcElement;if(!(!this._loaded||e._leaflet_disable_events||t.type==="click"&&this._isClickDisabled(e))){var i=t.type;i==="mousedown"&&xi(e),this._fireDOMEvent(t,i)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(t,e,i){if(t.type==="click"){var n=a({},t);n.type="preclick",this._fireDOMEvent(n,n.type,i)}var s=this._findEventTargets(t,e);if(i){for(var h=[],f=0;f<i.length;f++)i[f].listens(e,!0)&&h.push(i[f]);s=h.concat(s)}if(s.length){e==="contextmenu"&&Q(t);var m=s[0],v={originalEvent:t};if(t.type!=="keypress"&&t.type!=="keydown"&&t.type!=="keyup"){var b=m.getLatLng&&(!m._radius||m._radius<=10);v.containerPoint=b?this.latLngToContainerPoint(m.getLatLng()):this.mouseEventToContainerPoint(t),v.layerPoint=this.containerPointToLayerPoint(v.containerPoint),v.latlng=b?m.getLatLng():this.layerPointToLatLng(v.layerPoint)}for(f=0;f<s.length;f++)if(s[f].fire(e,v,!0),v.originalEvent._stopped||s[f].options.bubblingMouseEvents===!1&&xt(this._mouseEvents,e)!==-1)return}},_draggableMoved:function(t){return t=t.dragging&&t.dragging.enabled()?t:this,t.dragging&&t.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var t=0,e=this._handlers.length;t<e;t++)this._handlers[t].disable()},whenReady:function(t,e){return this._loaded?t.call(e||this,{target:this}):this.on("load",t,e),this},_getMapPanePos:function(){return $t(this._mapPane)||new E(0,0)},_moved:function(){var t=this._getMapPanePos();return t&&!t.equals([0,0])},_getTopLeftPoint:function(t,e){var i=t&&e!==void 0?this._getNewPixelOrigin(t,e):this.getPixelOrigin();return i.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(t,e){var i=this.getSize()._divideBy(2);return this.project(t,e)._subtract(i)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(t,e,i){var n=this._getNewPixelOrigin(i,e);return this.project(t,e)._subtract(n)},_latLngBoundsToNewLayerBounds:function(t,e,i){var n=this._getNewPixelOrigin(i,e);return ot([this.project(t.getSouthWest(),e)._subtract(n),this.project(t.getNorthWest(),e)._subtract(n),this.project(t.getSouthEast(),e)._subtract(n),this.project(t.getNorthEast(),e)._subtract(n)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(t){return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())},_limitCenter:function(t,e,i){if(!i)return t;var n=this.project(t,e),s=this.getSize().divideBy(2),h=new q(n.subtract(s),n.add(s)),f=this._getBoundsOffset(h,i,e);return Math.abs(f.x)<=1&&Math.abs(f.y)<=1?t:this.unproject(n.add(f),e)},_limitOffset:function(t,e){if(!e)return t;var i=this.getPixelBounds(),n=new q(i.min.add(t),i.max.add(t));return t.add(this._getBoundsOffset(n,e))},_getBoundsOffset:function(t,e,i){var n=ot(this.project(e.getNorthEast(),i),this.project(e.getSouthWest(),i)),s=n.min.subtract(t.min),h=n.max.subtract(t.max),f=this._rebound(s.x,-h.x),m=this._rebound(s.y,-h.y);return new E(f,m)},_rebound:function(t,e){return t+e>0?Math.round(t-e)/2:Math.max(0,Math.ceil(t))-Math.max(0,Math.floor(e))},_limitZoom:function(t){var e=this.getMinZoom(),i=this.getMaxZoom(),n=S.any3d?this.options.zoomSnap:1;return n&&(t=Math.round(t/n)*n),Math.max(e,Math.min(i,t))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){j(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(t,e){var i=this._getCenterOffset(t)._trunc();return(e&&e.animate)!==!0&&!this.getSize().contains(i)?!1:(this.panBy(i,e),!0)},_createAnimProxy:function(){var t=this._proxy=D("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(t),this.on("zoomanim",function(e){var i=fi,n=this._proxy.style[i];Ot(this._proxy,this.project(e.center,e.zoom),this.getZoomScale(e.zoom,1)),n===this._proxy.style[i]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){V(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var t=this.getCenter(),e=this.getZoom();Ot(this._proxy,this.project(t,e),this.getZoomScale(e,1))},_catchTransitionEnd:function(t){this._animatingZoom&&t.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(t,e,i){if(this._animatingZoom)return!0;if(i=i||{},!this._zoomAnimated||i.animate===!1||this._nothingToAnimate()||Math.abs(e-this._zoom)>this.options.zoomAnimationThreshold)return!1;var n=this.getZoomScale(e),s=this._getCenterOffset(t)._divideBy(1-1/n);return i.animate!==!0&&!this.getSize().contains(s)?!1:(nt(function(){this._moveStart(!0,i.noMoveStart||!1)._animateZoom(t,e,!0)},this),!0)},_animateZoom:function(t,e,i,n){this._mapPane&&(i&&(this._animatingZoom=!0,this._animateToCenter=t,this._animateToZoom=e,O(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:t,zoom:e,noUpdate:n}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(l(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&j(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function Hr(t,e){return new N(t,e)}var pt=bt.extend({options:{position:"topright"},initialize:function(t){P(this,t)},getPosition:function(){return this.options.position},setPosition:function(t){var e=this._map;return e&&e.removeControl(this),this.options.position=t,e&&e.addControl(this),this},getContainer:function(){return this._container},addTo:function(t){this.remove(),this._map=t;var e=this._container=this.onAdd(t),i=this.getPosition(),n=t._controlCorners[i];return O(e,"leaflet-control"),i.indexOf("bottom")!==-1?n.insertBefore(e,n.firstChild):n.appendChild(e),this._map.on("unload",this.remove,this),this},remove:function(){return this._map?(V(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this},_refocusOnMap:function(t){this._map&&t&&t.screenX>0&&t.screenY>0&&this._map.getContainer().focus()}}),ue=function(t){return new pt(t)};N.include({addControl:function(t){return t.addTo(this),this},removeControl:function(t){return t.remove(),this},_initControlPos:function(){var t=this._controlCorners={},e="leaflet-",i=this._controlContainer=D("div",e+"control-container",this._container);function n(s,h){var f=e+s+" "+e+h;t[s+h]=D("div",f,i)}n("top","left"),n("top","right"),n("bottom","left"),n("bottom","right")},_clearControlPos:function(){for(var t in this._controlCorners)V(this._controlCorners[t]);V(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var On=pt.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(t,e,i,n){return i<n?-1:n<i?1:0}},initialize:function(t,e,i){P(this,i),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1;for(var n in t)this._addLayer(t[n],n);for(n in e)this._addLayer(e[n],n,!0)},onAdd:function(t){this._initLayout(),this._update(),this._map=t,t.on("zoomend",this._checkDisabledLayers,this);for(var e=0;e<this._layers.length;e++)this._layers[e].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(t){return pt.prototype.addTo.call(this,t),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var t=0;t<this._layers.length;t++)this._layers[t].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(t,e){return this._addLayer(t,e),this._map?this._update():this},addOverlay:function(t,e){return this._addLayer(t,e,!0),this._map?this._update():this},removeLayer:function(t){t.off("add remove",this._onLayerChange,this);var e=this._getLayer(c(t));return e&&this._layers.splice(this._layers.indexOf(e),1),this._map?this._update():this},expand:function(){O(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var t=this._map.getSize().y-(this._container.offsetTop+50);return t<this._section.clientHeight?(O(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=t+"px"):j(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return j(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var t="leaflet-control-layers",e=this._container=D("div",t),i=this.options.collapsed;e.setAttribute("aria-haspopup",!0),he(e),Ci(e);var n=this._section=D("section",t+"-list");i&&(this._map.on("click",this.collapse,this),z(e,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var s=this._layersLink=D("a",t+"-toggle",e);s.href="#",s.title="Layers",s.setAttribute("role","button"),z(s,{keydown:function(h){h.keyCode===13&&this._expandSafely()},click:function(h){Q(h),this._expandSafely()}},this),i||this.expand(),this._baseLayersList=D("div",t+"-base",n),this._separator=D("div",t+"-separator",n),this._overlaysList=D("div",t+"-overlays",n),e.appendChild(n)},_getLayer:function(t){for(var e=0;e<this._layers.length;e++)if(this._layers[e]&&c(this._layers[e].layer)===t)return this._layers[e]},_addLayer:function(t,e,i){this._map&&t.on("add remove",this._onLayerChange,this),this._layers.push({layer:t,name:e,overlay:i}),this.options.sortLayers&&this._layers.sort(l(function(n,s){return this.options.sortFunction(n.layer,s.layer,n.name,s.name)},this)),this.options.autoZIndex&&t.setZIndex&&(this._lastZIndex++,t.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;Oe(this._baseLayersList),Oe(this._overlaysList),this._layerControlInputs=[];var t,e,i,n,s=0;for(i=0;i<this._layers.length;i++)n=this._layers[i],this._addItem(n),e=e||n.overlay,t=t||!n.overlay,s+=n.overlay?0:1;return this.options.hideSingleBase&&(t=t&&s>1,this._baseLayersList.style.display=t?"":"none"),this._separator.style.display=e&&t?"":"none",this},_onLayerChange:function(t){this._handlingClick||this._update();var e=this._getLayer(c(t.target)),i=e.overlay?t.type==="add"?"overlayadd":"overlayremove":t.type==="add"?"baselayerchange":null;i&&this._map.fire(i,e)},_createRadioElement:function(t,e){var i='<input type="radio" class="leaflet-control-layers-selector" name="'+t+'"'+(e?' checked="checked"':"")+"/>",n=document.createElement("div");return n.innerHTML=i,n.firstChild},_addItem:function(t){var e=document.createElement("label"),i=this._map.hasLayer(t.layer),n;t.overlay?(n=document.createElement("input"),n.type="checkbox",n.className="leaflet-control-layers-selector",n.defaultChecked=i):n=this._createRadioElement("leaflet-base-layers_"+c(this),i),this._layerControlInputs.push(n),n.layerId=c(t.layer),z(n,"click",this._onInputClick,this);var s=document.createElement("span");s.innerHTML=" "+t.name;var h=document.createElement("span");e.appendChild(h),h.appendChild(n),h.appendChild(s);var f=t.overlay?this._overlaysList:this._baseLayersList;return f.appendChild(e),this._checkDisabledLayers(),e},_onInputClick:function(){if(!this._preventClick){var t=this._layerControlInputs,e,i,n=[],s=[];this._handlingClick=!0;for(var h=t.length-1;h>=0;h--)e=t[h],i=this._getLayer(e.layerId).layer,e.checked?n.push(i):e.checked||s.push(i);for(h=0;h<s.length;h++)this._map.hasLayer(s[h])&&this._map.removeLayer(s[h]);for(h=0;h<n.length;h++)this._map.hasLayer(n[h])||this._map.addLayer(n[h]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var t=this._layerControlInputs,e,i,n=this._map.getZoom(),s=t.length-1;s>=0;s--)e=t[s],i=this._getLayer(e.layerId).layer,e.disabled=i.options.minZoom!==void 0&&n<i.options.minZoom||i.options.maxZoom!==void 0&&n>i.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var t=this._section;this._preventClick=!0,z(t,"click",Q),this.expand();var e=this;setTimeout(function(){H(t,"click",Q),e._preventClick=!1})}}),Ur=function(t,e,i){return new On(t,e,i)},Si=pt.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(t){var e="leaflet-control-zoom",i=D("div",e+" leaflet-bar"),n=this.options;return this._zoomInButton=this._createButton(n.zoomInText,n.zoomInTitle,e+"-in",i,this._zoomIn),this._zoomOutButton=this._createButton(n.zoomOutText,n.zoomOutTitle,e+"-out",i,this._zoomOut),this._updateDisabled(),t.on("zoomend zoomlevelschange",this._updateDisabled,this),i},onRemove:function(t){t.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(t){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(t.shiftKey?3:1))},_zoomOut:function(t){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(t.shiftKey?3:1))},_createButton:function(t,e,i,n,s){var h=D("a",i,n);return h.innerHTML=t,h.href="#",h.title=e,h.setAttribute("role","button"),h.setAttribute("aria-label",e),he(h),z(h,"click",Zt),z(h,"click",s,this),z(h,"click",this._refocusOnMap,this),h},_updateDisabled:function(){var t=this._map,e="leaflet-disabled";j(this._zoomInButton,e),j(this._zoomOutButton,e),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||t._zoom===t.getMinZoom())&&(O(this._zoomOutButton,e),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||t._zoom===t.getMaxZoom())&&(O(this._zoomInButton,e),this._zoomInButton.setAttribute("aria-disabled","true"))}});N.mergeOptions({zoomControl:!0}),N.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new Si,this.addControl(this.zoomControl))});var Gr=function(t){return new Si(t)},$n=pt.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(t){var e="leaflet-control-scale",i=D("div",e),n=this.options;return this._addScales(n,e+"-line",i),t.on(n.updateWhenIdle?"moveend":"move",this._update,this),t.whenReady(this._update,this),i},onRemove:function(t){t.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(t,e,i){t.metric&&(this._mScale=D("div",e,i)),t.imperial&&(this._iScale=D("div",e,i))},_update:function(){var t=this._map,e=t.getSize().y/2,i=t.distance(t.containerPointToLatLng([0,e]),t.containerPointToLatLng([this.options.maxWidth,e]));this._updateScales(i)},_updateScales:function(t){this.options.metric&&t&&this._updateMetric(t),this.options.imperial&&t&&this._updateImperial(t)},_updateMetric:function(t){var e=this._getRoundNum(t),i=e<1e3?e+" m":e/1e3+" km";this._updateScale(this._mScale,i,e/t)},_updateImperial:function(t){var e=t*3.2808399,i,n,s;e>5280?(i=e/5280,n=this._getRoundNum(i),this._updateScale(this._iScale,n+" mi",n/i)):(s=this._getRoundNum(e),this._updateScale(this._iScale,s+" ft",s/e))},_updateScale:function(t,e,i){t.style.width=Math.round(this.options.maxWidth*i)+"px",t.innerHTML=e},_getRoundNum:function(t){var e=Math.pow(10,(Math.floor(t)+"").length-1),i=t/e;return i=i>=10?10:i>=5?5:i>=3?3:i>=2?2:1,e*i}}),Wr=function(t){return new $n(t)},qr='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',Ti=pt.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(S.inlineSvg?qr+" ":"")+"Leaflet</a>"},initialize:function(t){P(this,t),this._attributions={}},onAdd:function(t){t.attributionControl=this,this._container=D("div","leaflet-control-attribution"),he(this._container);for(var e in t._layers)t._layers[e].getAttribution&&this.addAttribution(t._layers[e].getAttribution());return this._update(),t.on("layeradd",this._addAttribution,this),this._container},onRemove:function(t){t.off("layeradd",this._addAttribution,this)},_addAttribution:function(t){t.layer.getAttribution&&(this.addAttribution(t.layer.getAttribution()),t.layer.once("remove",function(){this.removeAttribution(t.layer.getAttribution())},this))},setPrefix:function(t){return this.options.prefix=t,this._update(),this},addAttribution:function(t){return t?(this._attributions[t]||(this._attributions[t]=0),this._attributions[t]++,this._update(),this):this},removeAttribution:function(t){return t?(this._attributions[t]&&(this._attributions[t]--,this._update()),this):this},_update:function(){if(this._map){var t=[];for(var e in this._attributions)this._attributions[e]&&t.push(e);var i=[];this.options.prefix&&i.push(this.options.prefix),t.length&&i.push(t.join(", ")),this._container.innerHTML=i.join(' <span aria-hidden="true">|</span> ')}}});N.mergeOptions({attributionControl:!0}),N.addInitHook(function(){this.options.attributionControl&&new Ti().addTo(this)});var Vr=function(t){return new Ti(t)};pt.Layers=On,pt.Zoom=Si,pt.Scale=$n,pt.Attribution=Ti,ue.layers=Ur,ue.zoom=Gr,ue.scale=Wr,ue.attribution=Vr;var vt=bt.extend({initialize:function(t){this._map=t},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});vt.addTo=function(t,e){return t.addHandler(e,this),this};var jr={Events:ht},In=S.touch?"touchstart mousedown":"mousedown",Mt=ee.extend({options:{clickTolerance:3},initialize:function(t,e,i,n){P(this,n),this._element=t,this._dragStartTarget=e||t,this._preventOutline=i},enable:function(){this._enabled||(z(this._dragStartTarget,In,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(Mt._dragging===this&&this.finishDrag(!0),H(this._dragStartTarget,In,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(t){if(this._enabled&&(this._moved=!1,!pi(this._element,"leaflet-zoom-anim"))){if(t.touches&&t.touches.length!==1){Mt._dragging===this&&this.finishDrag();return}if(!(Mt._dragging||t.shiftKey||t.which!==1&&t.button!==1&&!t.touches)&&(Mt._dragging=this,this._preventOutline&&xi(this._element),gi(),se(),!this._moving)){this.fire("down");var e=t.touches?t.touches[0]:t,i=Sn(this._element);this._startPoint=new E(e.clientX,e.clientY),this._startPos=$t(this._element),this._parentScale=bi(i);var n=t.type==="mousedown";z(document,n?"mousemove":"touchmove",this._onMove,this),z(document,n?"mouseup":"touchend touchcancel",this._onUp,this)}}},_onMove:function(t){if(this._enabled){if(t.touches&&t.touches.length>1){this._moved=!0;return}var e=t.touches&&t.touches.length===1?t.touches[0]:t,i=new E(e.clientX,e.clientY)._subtract(this._startPoint);!i.x&&!i.y||Math.abs(i.x)+Math.abs(i.y)<this.options.clickTolerance||(i.x/=this._parentScale.x,i.y/=this._parentScale.y,Q(t),this._moved||(this.fire("dragstart"),this._moved=!0,O(document.body,"leaflet-dragging"),this._lastTarget=t.target||t.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),O(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(i),this._moving=!0,this._lastEvent=t,this._updatePosition())}},_updatePosition:function(){var t={originalEvent:this._lastEvent};this.fire("predrag",t),Y(this._element,this._newPos),this.fire("drag",t)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(t){j(document.body,"leaflet-dragging"),this._lastTarget&&(j(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),H(document,"mousemove touchmove",this._onMove,this),H(document,"mouseup touchend touchcancel",this._onUp,this),vi(),ae();var e=this._moved&&this._moving;this._moving=!1,Mt._dragging=!1,e&&this.fire("dragend",{noInertia:t,distance:this._newPos.distanceTo(this._startPos)})}});function Zn(t,e,i){var n,s=[1,4,2,8],h,f,m,v,b,k,T,$;for(h=0,k=t.length;h<k;h++)t[h]._code=Bt(t[h],e);for(m=0;m<4;m++){for(T=s[m],n=[],h=0,k=t.length,f=k-1;h<k;f=h++)v=t[h],b=t[f],v._code&T?b._code&T||($=Ne(b,v,T,e,i),$._code=Bt($,e),n.push($)):(b._code&T&&($=Ne(b,v,T,e,i),$._code=Bt($,e),n.push($)),n.push(v));t=n}return t}function Bn(t,e){var i,n,s,h,f,m,v,b,k;if(!t||t.length===0)throw new Error("latlngs not passed");dt(t)||(console.warn("latlngs are not flat! Only the first ring will be used"),t=t[0]);var T=B([0,0]),$=K(t),et=$.getNorthWest().distanceTo($.getSouthWest())*$.getNorthEast().distanceTo($.getNorthWest());et<1700&&(T=Mi(t));var X=t.length,ft=[];for(i=0;i<X;i++){var st=B(t[i]);ft.push(e.project(B([st.lat-T.lat,st.lng-T.lng])))}for(m=v=b=0,i=0,n=X-1;i<X;n=i++)s=ft[i],h=ft[n],f=s.y*h.x-h.y*s.x,v+=(s.x+h.x)*f,b+=(s.y+h.y)*f,m+=f*3;m===0?k=ft[0]:k=[v/m,b/m];var Yt=e.unproject(M(k));return B([Yt.lat+T.lat,Yt.lng+T.lng])}function Mi(t){for(var e=0,i=0,n=0,s=0;s<t.length;s++){var h=B(t[s]);e+=h.lat,i+=h.lng,n++}return B([e/n,i/n])}var Kr={__proto__:null,clipPolygon:Zn,polygonCenter:Bn,centroid:Mi};function Nn(t,e){if(!e||!t.length)return t.slice();var i=e*e;return t=Xr(t,i),t=Jr(t,i),t}function Dn(t,e,i){return Math.sqrt(ce(t,e,i,!0))}function Yr(t,e,i){return ce(t,e,i)}function Jr(t,e){var i=t.length,n=typeof Uint8Array<"u"?Uint8Array:Array,s=new n(i);s[0]=s[i-1]=1,Ei(t,s,e,0,i-1);var h,f=[];for(h=0;h<i;h++)s[h]&&f.push(t[h]);return f}function Ei(t,e,i,n,s){var h=0,f,m,v;for(m=n+1;m<=s-1;m++)v=ce(t[m],t[n],t[s],!0),v>h&&(f=m,h=v);h>i&&(e[f]=1,Ei(t,e,i,n,f),Ei(t,e,i,f,s))}function Xr(t,e){for(var i=[t[0]],n=1,s=0,h=t.length;n<h;n++)Qr(t[n],t[s])>e&&(i.push(t[n]),s=n);return s<h-1&&i.push(t[h-1]),i}var Rn;function Fn(t,e,i,n,s){var h=n?Rn:Bt(t,i),f=Bt(e,i),m,v,b;for(Rn=f;;){if(!(h|f))return[t,e];if(h&f)return!1;m=h||f,v=Ne(t,e,m,i,s),b=Bt(v,i),m===h?(t=v,h=b):(e=v,f=b)}}function Ne(t,e,i,n,s){var h=e.x-t.x,f=e.y-t.y,m=n.min,v=n.max,b,k;return i&8?(b=t.x+h*(v.y-t.y)/f,k=v.y):i&4?(b=t.x+h*(m.y-t.y)/f,k=m.y):i&2?(b=v.x,k=t.y+f*(v.x-t.x)/h):i&1&&(b=m.x,k=t.y+f*(m.x-t.x)/h),new E(b,k,s)}function Bt(t,e){var i=0;return t.x<e.min.x?i|=1:t.x>e.max.x&&(i|=2),t.y<e.min.y?i|=4:t.y>e.max.y&&(i|=8),i}function Qr(t,e){var i=e.x-t.x,n=e.y-t.y;return i*i+n*n}function ce(t,e,i,n){var s=e.x,h=e.y,f=i.x-s,m=i.y-h,v=f*f+m*m,b;return v>0&&(b=((t.x-s)*f+(t.y-h)*m)/v,b>1?(s=i.x,h=i.y):b>0&&(s+=f*b,h+=m*b)),f=t.x-s,m=t.y-h,n?f*f+m*m:new E(s,h)}function dt(t){return!W(t[0])||typeof t[0][0]!="object"&&typeof t[0][0]<"u"}function Hn(t){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),dt(t)}function Un(t,e){var i,n,s,h,f,m,v,b;if(!t||t.length===0)throw new Error("latlngs not passed");dt(t)||(console.warn("latlngs are not flat! Only the first ring will be used"),t=t[0]);var k=B([0,0]),T=K(t),$=T.getNorthWest().distanceTo(T.getSouthWest())*T.getNorthEast().distanceTo(T.getNorthWest());$<1700&&(k=Mi(t));var et=t.length,X=[];for(i=0;i<et;i++){var ft=B(t[i]);X.push(e.project(B([ft.lat-k.lat,ft.lng-k.lng])))}for(i=0,n=0;i<et-1;i++)n+=X[i].distanceTo(X[i+1])/2;if(n===0)b=X[0];else for(i=0,h=0;i<et-1;i++)if(f=X[i],m=X[i+1],s=f.distanceTo(m),h+=s,h>n){v=(h-n)/s,b=[m.x-v*(m.x-f.x),m.y-v*(m.y-f.y)];break}var st=e.unproject(M(b));return B([st.lat+k.lat,st.lng+k.lng])}var ts={__proto__:null,simplify:Nn,pointToSegmentDistance:Dn,closestPointOnSegment:Yr,clipSegment:Fn,_getEdgeIntersection:Ne,_getBitCode:Bt,_sqClosestPointOnSegment:ce,isFlat:dt,_flat:Hn,polylineCenter:Un},zi={project:function(t){return new E(t.lng,t.lat)},unproject:function(t){return new F(t.y,t.x)},bounds:new q([-180,-90],[180,90])},Ai={R:6378137,R_MINOR:6356752314245179e-9,bounds:new q([-2003750834279e-5,-1549657073972e-5],[2003750834279e-5,1876465623138e-5]),project:function(t){var e=Math.PI/180,i=this.R,n=t.lat*e,s=this.R_MINOR/i,h=Math.sqrt(1-s*s),f=h*Math.sin(n),m=Math.tan(Math.PI/4-n/2)/Math.pow((1-f)/(1+f),h/2);return n=-i*Math.log(Math.max(m,1e-10)),new E(t.lng*e*i,n)},unproject:function(t){for(var e=180/Math.PI,i=this.R,n=this.R_MINOR/i,s=Math.sqrt(1-n*n),h=Math.exp(-t.y/i),f=Math.PI/2-2*Math.atan(h),m=0,v=.1,b;m<15&&Math.abs(v)>1e-7;m++)b=s*Math.sin(f),b=Math.pow((1-b)/(1+b),s/2),v=Math.PI/2-2*Math.atan(h*b)-f,f+=v;return new F(f*e,t.x*e/i)}},es={__proto__:null,LonLat:zi,Mercator:Ai,SphericalMercator:oi},is=a({},Tt,{code:"EPSG:3395",projection:Ai,transformation:function(){var t=.5/(Math.PI*Ai.R);return ie(t,.5,-t,.5)}()}),Gn=a({},Tt,{code:"EPSG:4326",projection:zi,transformation:ie(1/180,1,-1/180,.5)}),ns=a({},wt,{projection:zi,transformation:ie(1,0,-1,0),scale:function(t){return Math.pow(2,t)},zoom:function(t){return Math.log(t)/Math.LN2},distance:function(t,e){var i=e.lng-t.lng,n=e.lat-t.lat;return Math.sqrt(i*i+n*n)},infinite:!0});wt.Earth=Tt,wt.EPSG3395=is,wt.EPSG3857=si,wt.EPSG900913=hr,wt.EPSG4326=Gn,wt.Simple=ns;var _t=ee.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(t){return t.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(t){return t&&t.removeLayer(this),this},getPane:function(t){return this._map.getPane(t?this.options[t]||t:this.options.pane)},addInteractiveTarget:function(t){return this._map._targets[c(t)]=this,this},removeInteractiveTarget:function(t){return delete this._map._targets[c(t)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(t){var e=t.target;if(e.hasLayer(this)){if(this._map=e,this._zoomAnimated=e._zoomAnimated,this.getEvents){var i=this.getEvents();e.on(i,this),this.once("remove",function(){e.off(i,this)},this)}this.onAdd(e),this.fire("add"),e.fire("layeradd",{layer:this})}}});N.include({addLayer:function(t){if(!t._layerAdd)throw new Error("The provided object is not a Layer.");var e=c(t);return this._layers[e]?this:(this._layers[e]=t,t._mapToAdd=this,t.beforeAdd&&t.beforeAdd(this),this.whenReady(t._layerAdd,t),this)},removeLayer:function(t){var e=c(t);return this._layers[e]?(this._loaded&&t.onRemove(this),delete this._layers[e],this._loaded&&(this.fire("layerremove",{layer:t}),t.fire("remove")),t._map=t._mapToAdd=null,this):this},hasLayer:function(t){return c(t)in this._layers},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},_addLayers:function(t){t=t?W(t)?t:[t]:[];for(var e=0,i=t.length;e<i;e++)this.addLayer(t[e])},_addZoomLimit:function(t){(!isNaN(t.options.maxZoom)||!isNaN(t.options.minZoom))&&(this._zoomBoundLayers[c(t)]=t,this._updateZoomLevels())},_removeZoomLimit:function(t){var e=c(t);this._zoomBoundLayers[e]&&(delete this._zoomBoundLayers[e],this._updateZoomLevels())},_updateZoomLevels:function(){var t=1/0,e=-1/0,i=this._getZoomSpan();for(var n in this._zoomBoundLayers){var s=this._zoomBoundLayers[n].options;t=s.minZoom===void 0?t:Math.min(t,s.minZoom),e=s.maxZoom===void 0?e:Math.max(e,s.maxZoom)}this._layersMaxZoom=e===-1/0?void 0:e,this._layersMinZoom=t===1/0?void 0:t,i!==this._getZoomSpan()&&this.fire("zoomlevelschange"),this.options.maxZoom===void 0&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===void 0&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var Wt=_t.extend({initialize:function(t,e){P(this,e),this._layers={};var i,n;if(t)for(i=0,n=t.length;i<n;i++)this.addLayer(t[i])},addLayer:function(t){var e=this.getLayerId(t);return this._layers[e]=t,this._map&&this._map.addLayer(t),this},removeLayer:function(t){var e=t in this._layers?t:this.getLayerId(t);return this._map&&this._layers[e]&&this._map.removeLayer(this._layers[e]),delete this._layers[e],this},hasLayer:function(t){var e=typeof t=="number"?t:this.getLayerId(t);return e in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(t){var e=Array.prototype.slice.call(arguments,1),i,n;for(i in this._layers)n=this._layers[i],n[t]&&n[t].apply(n,e);return this},onAdd:function(t){this.eachLayer(t.addLayer,t)},onRemove:function(t){this.eachLayer(t.removeLayer,t)},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},getLayer:function(t){return this._layers[t]},getLayers:function(){var t=[];return this.eachLayer(t.push,t),t},setZIndex:function(t){return this.invoke("setZIndex",t)},getLayerId:function(t){return c(t)}}),os=function(t,e){return new Wt(t,e)},Lt=Wt.extend({addLayer:function(t){return this.hasLayer(t)?this:(t.addEventParent(this),Wt.prototype.addLayer.call(this,t),this.fire("layeradd",{layer:t}))},removeLayer:function(t){return this.hasLayer(t)?(t in this._layers&&(t=this._layers[t]),t.removeEventParent(this),Wt.prototype.removeLayer.call(this,t),this.fire("layerremove",{layer:t})):this},setStyle:function(t){return this.invoke("setStyle",t)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var t=new rt;for(var e in this._layers){var i=this._layers[e];t.extend(i.getBounds?i.getBounds():i.getLatLng())}return t}}),rs=function(t,e){return new Lt(t,e)},qt=bt.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(t){P(this,t)},createIcon:function(t){return this._createIcon("icon",t)},createShadow:function(t){return this._createIcon("shadow",t)},_createIcon:function(t,e){var i=this._getIconUrl(t);if(!i){if(t==="icon")throw new Error("iconUrl not set in Icon options (see the docs).");return null}var n=this._createImg(i,e&&e.tagName==="IMG"?e:null);return this._setIconStyles(n,t),(this.options.crossOrigin||this.options.crossOrigin==="")&&(n.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),n},_setIconStyles:function(t,e){var i=this.options,n=i[e+"Size"];typeof n=="number"&&(n=[n,n]);var s=M(n),h=M(e==="shadow"&&i.shadowAnchor||i.iconAnchor||s&&s.divideBy(2,!0));t.className="leaflet-marker-"+e+" "+(i.className||""),h&&(t.style.marginLeft=-h.x+"px",t.style.marginTop=-h.y+"px"),s&&(t.style.width=s.x+"px",t.style.height=s.y+"px")},_createImg:function(t,e){return e=e||document.createElement("img"),e.src=t,e},_getIconUrl:function(t){return S.retina&&this.options[t+"RetinaUrl"]||this.options[t+"Url"]}});function ss(t){return new qt(t)}var de=qt.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(t){return typeof de.imagePath!="string"&&(de.imagePath=this._detectIconPath()),(this.options.imagePath||de.imagePath)+qt.prototype._getIconUrl.call(this,t)},_stripUrl:function(t){var e=function(i,n,s){var h=n.exec(i);return h&&h[s]};return t=e(t,/^url\((['"])?(.+)\1\)$/,2),t&&e(t,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var t=D("div","leaflet-default-icon-path",document.body),e=re(t,"background-image")||re(t,"backgroundImage");if(document.body.removeChild(t),e=this._stripUrl(e),e)return e;var i=document.querySelector('link[href$="leaflet.css"]');return i?i.href.substring(0,i.href.length-11-1):""}}),Wn=vt.extend({initialize:function(t){this._marker=t},addHooks:function(){var t=this._marker._icon;this._draggable||(this._draggable=new Mt(t,t,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),O(t,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&j(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(t){var e=this._marker,i=e._map,n=this._marker.options.autoPanSpeed,s=this._marker.options.autoPanPadding,h=$t(e._icon),f=i.getPixelBounds(),m=i.getPixelOrigin(),v=ot(f.min._subtract(m).add(s),f.max._subtract(m).subtract(s));if(!v.contains(h)){var b=M((Math.max(v.max.x,h.x)-v.max.x)/(f.max.x-v.max.x)-(Math.min(v.min.x,h.x)-v.min.x)/(f.min.x-v.min.x),(Math.max(v.max.y,h.y)-v.max.y)/(f.max.y-v.max.y)-(Math.min(v.min.y,h.y)-v.min.y)/(f.min.y-v.min.y)).multiplyBy(n);i.panBy(b,{animate:!1}),this._draggable._newPos._add(b),this._draggable._startPos._add(b),Y(e._icon,this._draggable._newPos),this._onDrag(t),this._panRequest=nt(this._adjustPan.bind(this,t))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(t){this._marker.options.autoPan&&(ut(this._panRequest),this._panRequest=nt(this._adjustPan.bind(this,t)))},_onDrag:function(t){var e=this._marker,i=e._shadow,n=$t(e._icon),s=e._map.layerPointToLatLng(n);i&&Y(i,n),e._latlng=s,t.latlng=s,t.oldLatLng=this._oldLatLng,e.fire("move",t).fire("drag",t)},_onDragEnd:function(t){ut(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",t)}}),De=_t.extend({options:{icon:new de,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(t,e){P(this,e),this._latlng=B(t)},onAdd:function(t){this._zoomAnimated=this._zoomAnimated&&t.options.markerZoomAnimation,this._zoomAnimated&&t.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(t){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&t.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(t){var e=this._latlng;return this._latlng=B(t),this.update(),this.fire("move",{oldLatLng:e,latlng:this._latlng})},setZIndexOffset:function(t){return this.options.zIndexOffset=t,this.update()},getIcon:function(){return this.options.icon},setIcon:function(t){return this.options.icon=t,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var t=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(t)}return this},_initIcon:function(){var t=this.options,e="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),i=t.icon.createIcon(this._icon),n=!1;i!==this._icon&&(this._icon&&this._removeIcon(),n=!0,t.title&&(i.title=t.title),i.tagName==="IMG"&&(i.alt=t.alt||"")),O(i,e),t.keyboard&&(i.tabIndex="0",i.setAttribute("role","button")),this._icon=i,t.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&z(i,"focus",this._panOnFocus,this);var s=t.icon.createShadow(this._shadow),h=!1;s!==this._shadow&&(this._removeShadow(),h=!0),s&&(O(s,e),s.alt=""),this._shadow=s,t.opacity<1&&this._updateOpacity(),n&&this.getPane().appendChild(this._icon),this._initInteraction(),s&&h&&this.getPane(t.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&H(this._icon,"focus",this._panOnFocus,this),V(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&V(this._shadow),this._shadow=null},_setPos:function(t){this._icon&&Y(this._icon,t),this._shadow&&Y(this._shadow,t),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(t){this._icon&&(this._icon.style.zIndex=this._zIndex+t)},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center).round();this._setPos(e)},_initInteraction:function(){if(this.options.interactive&&(O(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),Wn)){var t=this.options.draggable;this.dragging&&(t=this.dragging.enabled(),this.dragging.disable()),this.dragging=new Wn(this),t&&this.dragging.enable()}},setOpacity:function(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var t=this.options.opacity;this._icon&&ct(this._icon,t),this._shadow&&ct(this._shadow,t)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var t=this._map;if(t){var e=this.options.icon.options,i=e.iconSize?M(e.iconSize):M(0,0),n=e.iconAnchor?M(e.iconAnchor):M(0,0);t.panInside(this._latlng,{paddingTopLeft:n,paddingBottomRight:i.subtract(n)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function as(t,e){return new De(t,e)}var Et=_t.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(t){this._renderer=t.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(t){return P(this,t),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&t&&Object.prototype.hasOwnProperty.call(t,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),Re=Et.extend({options:{fill:!0,radius:10},initialize:function(t,e){P(this,e),this._latlng=B(t),this._radius=this.options.radius},setLatLng:function(t){var e=this._latlng;return this._latlng=B(t),this.redraw(),this.fire("move",{oldLatLng:e,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(t){return this.options.radius=this._radius=t,this.redraw()},getRadius:function(){return this._radius},setStyle:function(t){var e=t&&t.radius||this._radius;return Et.prototype.setStyle.call(this,t),this.setRadius(e),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var t=this._radius,e=this._radiusY||t,i=this._clickTolerance(),n=[t+i,e+i];this._pxBounds=new q(this._point.subtract(n),this._point.add(n))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(t){return t.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function ls(t,e){return new Re(t,e)}var Oi=Re.extend({initialize:function(t,e,i){if(typeof e=="number"&&(e=a({},i,{radius:e})),P(this,e),this._latlng=B(t),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(t){return this._mRadius=t,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var t=[this._radius,this._radiusY||this._radius];return new rt(this._map.layerPointToLatLng(this._point.subtract(t)),this._map.layerPointToLatLng(this._point.add(t)))},setStyle:Et.prototype.setStyle,_project:function(){var t=this._latlng.lng,e=this._latlng.lat,i=this._map,n=i.options.crs;if(n.distance===Tt.distance){var s=Math.PI/180,h=this._mRadius/Tt.R/s,f=i.project([e+h,t]),m=i.project([e-h,t]),v=f.add(m).divideBy(2),b=i.unproject(v).lat,k=Math.acos((Math.cos(h*s)-Math.sin(e*s)*Math.sin(b*s))/(Math.cos(e*s)*Math.cos(b*s)))/s;(isNaN(k)||k===0)&&(k=h/Math.cos(Math.PI/180*e)),this._point=v.subtract(i.getPixelOrigin()),this._radius=isNaN(k)?0:v.x-i.project([b,t-k]).x,this._radiusY=v.y-f.y}else{var T=n.unproject(n.project(this._latlng).subtract([this._mRadius,0]));this._point=i.latLngToLayerPoint(this._latlng),this._radius=this._point.x-i.latLngToLayerPoint(T).x}this._updateBounds()}});function hs(t,e,i){return new Oi(t,e,i)}var Pt=Et.extend({options:{smoothFactor:1,noClip:!1},initialize:function(t,e){P(this,e),this._setLatLngs(t)},getLatLngs:function(){return this._latlngs},setLatLngs:function(t){return this._setLatLngs(t),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(t){for(var e=1/0,i=null,n=ce,s,h,f=0,m=this._parts.length;f<m;f++)for(var v=this._parts[f],b=1,k=v.length;b<k;b++){s=v[b-1],h=v[b];var T=n(t,s,h,!0);T<e&&(e=T,i=n(t,s,h))}return i&&(i.distance=Math.sqrt(e)),i},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Un(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(t,e){return e=e||this._defaultShape(),t=B(t),e.push(t),this._bounds.extend(t),this.redraw()},_setLatLngs:function(t){this._bounds=new rt,this._latlngs=this._convertLatLngs(t)},_defaultShape:function(){return dt(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(t){for(var e=[],i=dt(t),n=0,s=t.length;n<s;n++)i?(e[n]=B(t[n]),this._bounds.extend(e[n])):e[n]=this._convertLatLngs(t[n]);return e},_project:function(){var t=new q;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,t),this._bounds.isValid()&&t.isValid()&&(this._rawPxBounds=t,this._updateBounds())},_updateBounds:function(){var t=this._clickTolerance(),e=new E(t,t);this._rawPxBounds&&(this._pxBounds=new q([this._rawPxBounds.min.subtract(e),this._rawPxBounds.max.add(e)]))},_projectLatlngs:function(t,e,i){var n=t[0]instanceof F,s=t.length,h,f;if(n){for(f=[],h=0;h<s;h++)f[h]=this._map.latLngToLayerPoint(t[h]),i.extend(f[h]);e.push(f)}else for(h=0;h<s;h++)this._projectLatlngs(t[h],e,i)},_clipPoints:function(){var t=this._renderer._bounds;if(this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(t))){if(this.options.noClip){this._parts=this._rings;return}var e=this._parts,i,n,s,h,f,m,v;for(i=0,s=0,h=this._rings.length;i<h;i++)for(v=this._rings[i],n=0,f=v.length;n<f-1;n++)m=Fn(v[n],v[n+1],t,n,!0),m&&(e[s]=e[s]||[],e[s].push(m[0]),(m[1]!==v[n+1]||n===f-2)&&(e[s].push(m[1]),s++))}},_simplifyPoints:function(){for(var t=this._parts,e=this.options.smoothFactor,i=0,n=t.length;i<n;i++)t[i]=Nn(t[i],e)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(t,e){var i,n,s,h,f,m,v=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(t))return!1;for(i=0,h=this._parts.length;i<h;i++)for(m=this._parts[i],n=0,f=m.length,s=f-1;n<f;s=n++)if(!(!e&&n===0)&&Dn(t,m[s],m[n])<=v)return!0;return!1}});function us(t,e){return new Pt(t,e)}Pt._flat=Hn;var Vt=Pt.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Bn(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(t){var e=Pt.prototype._convertLatLngs.call(this,t),i=e.length;return i>=2&&e[0]instanceof F&&e[0].equals(e[i-1])&&e.pop(),e},_setLatLngs:function(t){Pt.prototype._setLatLngs.call(this,t),dt(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return dt(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var t=this._renderer._bounds,e=this.options.weight,i=new E(e,e);if(t=new q(t.min.subtract(i),t.max.add(i)),this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(t))){if(this.options.noClip){this._parts=this._rings;return}for(var n=0,s=this._rings.length,h;n<s;n++)h=Zn(this._rings[n],t,!0),h.length&&this._parts.push(h)}},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(t){var e=!1,i,n,s,h,f,m,v,b;if(!this._pxBounds||!this._pxBounds.contains(t))return!1;for(h=0,v=this._parts.length;h<v;h++)for(i=this._parts[h],f=0,b=i.length,m=b-1;f<b;m=f++)n=i[f],s=i[m],n.y>t.y!=s.y>t.y&&t.x<(s.x-n.x)*(t.y-n.y)/(s.y-n.y)+n.x&&(e=!e);return e||Pt.prototype._containsPoint.call(this,t,!0)}});function cs(t,e){return new Vt(t,e)}var Ct=Lt.extend({initialize:function(t,e){P(this,e),this._layers={},t&&this.addData(t)},addData:function(t){var e=W(t)?t:t.features,i,n,s;if(e){for(i=0,n=e.length;i<n;i++)s=e[i],(s.geometries||s.geometry||s.features||s.coordinates)&&this.addData(s);return this}var h=this.options;if(h.filter&&!h.filter(t))return this;var f=Fe(t,h);return f?(f.feature=Ge(t),f.defaultOptions=f.options,this.resetStyle(f),h.onEachFeature&&h.onEachFeature(t,f),this.addLayer(f)):this},resetStyle:function(t){return t===void 0?this.eachLayer(this.resetStyle,this):(t.options=a({},t.defaultOptions),this._setLayerStyle(t,this.options.style),this)},setStyle:function(t){return this.eachLayer(function(e){this._setLayerStyle(e,t)},this)},_setLayerStyle:function(t,e){t.setStyle&&(typeof e=="function"&&(e=e(t.feature)),t.setStyle(e))}});function Fe(t,e){var i=t.type==="Feature"?t.geometry:t,n=i?i.coordinates:null,s=[],h=e&&e.pointToLayer,f=e&&e.coordsToLatLng||$i,m,v,b,k;if(!n&&!i)return null;switch(i.type){case"Point":return m=f(n),qn(h,t,m,e);case"MultiPoint":for(b=0,k=n.length;b<k;b++)m=f(n[b]),s.push(qn(h,t,m,e));return new Lt(s);case"LineString":case"MultiLineString":return v=He(n,i.type==="LineString"?0:1,f),new Pt(v,e);case"Polygon":case"MultiPolygon":return v=He(n,i.type==="Polygon"?1:2,f),new Vt(v,e);case"GeometryCollection":for(b=0,k=i.geometries.length;b<k;b++){var T=Fe({geometry:i.geometries[b],type:"Feature",properties:t.properties},e);T&&s.push(T)}return new Lt(s);case"FeatureCollection":for(b=0,k=i.features.length;b<k;b++){var $=Fe(i.features[b],e);$&&s.push($)}return new Lt(s);default:throw new Error("Invalid GeoJSON object.")}}function qn(t,e,i,n){return t?t(e,i):new De(i,n&&n.markersInheritOptions&&n)}function $i(t){return new F(t[1],t[0],t[2])}function He(t,e,i){for(var n=[],s=0,h=t.length,f;s<h;s++)f=e?He(t[s],e-1,i):(i||$i)(t[s]),n.push(f);return n}function Ii(t,e){return t=B(t),t.alt!==void 0?[x(t.lng,e),x(t.lat,e),x(t.alt,e)]:[x(t.lng,e),x(t.lat,e)]}function Ue(t,e,i,n){for(var s=[],h=0,f=t.length;h<f;h++)s.push(e?Ue(t[h],dt(t[h])?0:e-1,i,n):Ii(t[h],n));return!e&&i&&s.length>0&&s.push(s[0].slice()),s}function jt(t,e){return t.feature?a({},t.feature,{geometry:e}):Ge(e)}function Ge(t){return t.type==="Feature"||t.type==="FeatureCollection"?t:{type:"Feature",properties:{},geometry:t}}var Zi={toGeoJSON:function(t){return jt(this,{type:"Point",coordinates:Ii(this.getLatLng(),t)})}};De.include(Zi),Oi.include(Zi),Re.include(Zi),Pt.include({toGeoJSON:function(t){var e=!dt(this._latlngs),i=Ue(this._latlngs,e?1:0,!1,t);return jt(this,{type:(e?"Multi":"")+"LineString",coordinates:i})}}),Vt.include({toGeoJSON:function(t){var e=!dt(this._latlngs),i=e&&!dt(this._latlngs[0]),n=Ue(this._latlngs,i?2:e?1:0,!0,t);return e||(n=[n]),jt(this,{type:(i?"Multi":"")+"Polygon",coordinates:n})}}),Wt.include({toMultiPoint:function(t){var e=[];return this.eachLayer(function(i){e.push(i.toGeoJSON(t).geometry.coordinates)}),jt(this,{type:"MultiPoint",coordinates:e})},toGeoJSON:function(t){var e=this.feature&&this.feature.geometry&&this.feature.geometry.type;if(e==="MultiPoint")return this.toMultiPoint(t);var i=e==="GeometryCollection",n=[];return this.eachLayer(function(s){if(s.toGeoJSON){var h=s.toGeoJSON(t);if(i)n.push(h.geometry);else{var f=Ge(h);f.type==="FeatureCollection"?n.push.apply(n,f.features):n.push(f)}}}),i?jt(this,{geometries:n,type:"GeometryCollection"}):{type:"FeatureCollection",features:n}}});function Vn(t,e){return new Ct(t,e)}var ds=Vn,We=_t.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(t,e,i){this._url=t,this._bounds=K(e),P(this,i)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(O(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){V(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(t){return this.options.opacity=t,this._image&&this._updateOpacity(),this},setStyle:function(t){return t.opacity&&this.setOpacity(t.opacity),this},bringToFront:function(){return this._map&&Ut(this._image),this},bringToBack:function(){return this._map&&Gt(this._image),this},setUrl:function(t){return this._url=t,this._image&&(this._image.src=t),this},setBounds:function(t){return this._bounds=K(t),this._map&&this._reset(),this},getEvents:function(){var t={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var t=this._url.tagName==="IMG",e=this._image=t?this._url:D("img");if(O(e,"leaflet-image-layer"),this._zoomAnimated&&O(e,"leaflet-zoom-animated"),this.options.className&&O(e,this.options.className),e.onselectstart=p,e.onmousemove=p,e.onload=l(this.fire,this,"load"),e.onerror=l(this._overlayOnError,this,"error"),(this.options.crossOrigin||this.options.crossOrigin==="")&&(e.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),t){this._url=e.src;return}e.src=this._url,e.alt=this.options.alt},_animateZoom:function(t){var e=this._map.getZoomScale(t.zoom),i=this._map._latLngBoundsToNewLayerBounds(this._bounds,t.zoom,t.center).min;Ot(this._image,i,e)},_reset:function(){var t=this._image,e=new q(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),i=e.getSize();Y(t,e.min),t.style.width=i.x+"px",t.style.height=i.y+"px"},_updateOpacity:function(){ct(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var t=this.options.errorOverlayUrl;t&&this._url!==t&&(this._url=t,this._image.src=t)},getCenter:function(){return this._bounds.getCenter()}}),fs=function(t,e,i){return new We(t,e,i)},jn=We.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var t=this._url.tagName==="VIDEO",e=this._image=t?this._url:D("video");if(O(e,"leaflet-image-layer"),this._zoomAnimated&&O(e,"leaflet-zoom-animated"),this.options.className&&O(e,this.options.className),e.onselectstart=p,e.onmousemove=p,e.onloadeddata=l(this.fire,this,"load"),t){for(var i=e.getElementsByTagName("source"),n=[],s=0;s<i.length;s++)n.push(i[s].src);this._url=i.length>0?n:[e.src];return}W(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(e.style,"objectFit")&&(e.style.objectFit="fill"),e.autoplay=!!this.options.autoplay,e.loop=!!this.options.loop,e.muted=!!this.options.muted,e.playsInline=!!this.options.playsInline;for(var h=0;h<this._url.length;h++){var f=D("source");f.src=this._url[h],e.appendChild(f)}}});function ps(t,e,i){return new jn(t,e,i)}var Kn=We.extend({_initImage:function(){var t=this._image=this._url;O(t,"leaflet-image-layer"),this._zoomAnimated&&O(t,"leaflet-zoom-animated"),this.options.className&&O(t,this.options.className),t.onselectstart=p,t.onmousemove=p}});function _s(t,e,i){return new Kn(t,e,i)}var yt=_t.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(t,e){t&&(t instanceof F||W(t))?(this._latlng=B(t),P(this,e)):(P(this,t),this._source=e),this.options.content&&(this._content=this.options.content)},openOn:function(t){return t=arguments.length?t:this._source._map,t.hasLayer(this)||t.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(t){return this._map?this.close():(arguments.length?this._source=t:t=this._source,this._prepareOpen(),this.openOn(t._map)),this},onAdd:function(t){this._zoomAnimated=t._zoomAnimated,this._container||this._initLayout(),t._fadeAnimated&&ct(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),t._fadeAnimated&&ct(this._container,1),this.bringToFront(),this.options.interactive&&(O(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(t){t._fadeAnimated?(ct(this._container,0),this._removeTimeout=setTimeout(l(V,void 0,this._container),200)):V(this._container),this.options.interactive&&(j(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(t){return this._latlng=B(t),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(t){return this._content=t,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var t={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&Ut(this._container),this},bringToBack:function(){return this._map&&Gt(this._container),this},_prepareOpen:function(t){var e=this._source;if(!e._map)return!1;if(e instanceof Lt){e=null;var i=this._source._layers;for(var n in i)if(i[n]._map){e=i[n];break}if(!e)return!1;this._source=e}if(!t)if(e.getCenter)t=e.getCenter();else if(e.getLatLng)t=e.getLatLng();else if(e.getBounds)t=e.getBounds().getCenter();else throw new Error("Unable to get source layer LatLng.");return this.setLatLng(t),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var t=this._contentNode,e=typeof this._content=="function"?this._content(this._source||this):this._content;if(typeof e=="string")t.innerHTML=e;else{for(;t.hasChildNodes();)t.removeChild(t.firstChild);t.appendChild(e)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var t=this._map.latLngToLayerPoint(this._latlng),e=M(this.options.offset),i=this._getAnchor();this._zoomAnimated?Y(this._container,t.add(i)):e=e.add(t).add(i);var n=this._containerBottom=-e.y,s=this._containerLeft=-Math.round(this._containerWidth/2)+e.x;this._container.style.bottom=n+"px",this._container.style.left=s+"px"}},_getAnchor:function(){return[0,0]}});N.include({_initOverlay:function(t,e,i,n){var s=e;return s instanceof t||(s=new t(n).setContent(e)),i&&s.setLatLng(i),s}}),_t.include({_initOverlay:function(t,e,i,n){var s=i;return s instanceof t?(P(s,n),s._source=this):(s=e&&!n?e:new t(n,this),s.setContent(i)),s}});var qe=yt.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(t){return t=arguments.length?t:this._source._map,!t.hasLayer(this)&&t._popup&&t._popup.options.autoClose&&t.removeLayer(t._popup),t._popup=this,yt.prototype.openOn.call(this,t)},onAdd:function(t){yt.prototype.onAdd.call(this,t),t.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof Et||this._source.on("preclick",It))},onRemove:function(t){yt.prototype.onRemove.call(this,t),t.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof Et||this._source.off("preclick",It))},getEvents:function(){var t=yt.prototype.getEvents.call(this);return(this.options.closeOnClick!==void 0?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(t.preclick=this.close),this.options.keepInView&&(t.moveend=this._adjustPan),t},_initLayout:function(){var t="leaflet-popup",e=this._container=D("div",t+" "+(this.options.className||"")+" leaflet-zoom-animated"),i=this._wrapper=D("div",t+"-content-wrapper",e);if(this._contentNode=D("div",t+"-content",i),he(e),Ci(this._contentNode),z(e,"contextmenu",It),this._tipContainer=D("div",t+"-tip-container",e),this._tip=D("div",t+"-tip",this._tipContainer),this.options.closeButton){var n=this._closeButton=D("a",t+"-close-button",e);n.setAttribute("role","button"),n.setAttribute("aria-label","Close popup"),n.href="#close",n.innerHTML='<span aria-hidden="true">&#215;</span>',z(n,"click",function(s){Q(s),this.close()},this)}},_updateLayout:function(){var t=this._contentNode,e=t.style;e.width="",e.whiteSpace="nowrap";var i=t.offsetWidth;i=Math.min(i,this.options.maxWidth),i=Math.max(i,this.options.minWidth),e.width=i+1+"px",e.whiteSpace="",e.height="";var n=t.offsetHeight,s=this.options.maxHeight,h="leaflet-popup-scrolled";s&&n>s?(e.height=s+"px",O(t,h)):j(t,h),this._containerWidth=this._container.offsetWidth},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center),i=this._getAnchor();Y(this._container,e.add(i))},_adjustPan:function(){if(this.options.autoPan){if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning){this._autopanning=!1;return}var t=this._map,e=parseInt(re(this._container,"marginBottom"),10)||0,i=this._container.offsetHeight+e,n=this._containerWidth,s=new E(this._containerLeft,-i-this._containerBottom);s._add($t(this._container));var h=t.layerPointToContainerPoint(s),f=M(this.options.autoPanPadding),m=M(this.options.autoPanPaddingTopLeft||f),v=M(this.options.autoPanPaddingBottomRight||f),b=t.getSize(),k=0,T=0;h.x+n+v.x>b.x&&(k=h.x+n-b.x+v.x),h.x-k-m.x<0&&(k=h.x-m.x),h.y+i+v.y>b.y&&(T=h.y+i-b.y+v.y),h.y-T-m.y<0&&(T=h.y-m.y),(k||T)&&(this.options.keepInView&&(this._autopanning=!0),t.fire("autopanstart").panBy([k,T]))}},_getAnchor:function(){return M(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),ms=function(t,e){return new qe(t,e)};N.mergeOptions({closePopupOnClick:!0}),N.include({openPopup:function(t,e,i){return this._initOverlay(qe,t,e,i).openOn(this),this},closePopup:function(t){return t=arguments.length?t:this._popup,t&&t.close(),this}}),_t.include({bindPopup:function(t,e){return this._popup=this._initOverlay(qe,this._popup,t,e),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(t){return this._popup&&(this instanceof Lt||(this._popup._source=this),this._popup._prepareOpen(t||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return this._popup?this._popup.isOpen():!1},setPopupContent:function(t){return this._popup&&this._popup.setContent(t),this},getPopup:function(){return this._popup},_openPopup:function(t){if(!(!this._popup||!this._map)){Zt(t);var e=t.layer||t.target;if(this._popup._source===e&&!(e instanceof Et)){this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(t.latlng);return}this._popup._source=e,this.openPopup(t.latlng)}},_movePopup:function(t){this._popup.setLatLng(t.latlng)},_onKeyPress:function(t){t.originalEvent.keyCode===13&&this._openPopup(t)}});var Ve=yt.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(t){yt.prototype.onAdd.call(this,t),this.setOpacity(this.options.opacity),t.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(t){yt.prototype.onRemove.call(this,t),t.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var t=yt.prototype.getEvents.call(this);return this.options.permanent||(t.preclick=this.close),t},_initLayout:function(){var t="leaflet-tooltip",e=t+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=D("div",e),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+c(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(t){var e,i,n=this._map,s=this._container,h=n.latLngToContainerPoint(n.getCenter()),f=n.layerPointToContainerPoint(t),m=this.options.direction,v=s.offsetWidth,b=s.offsetHeight,k=M(this.options.offset),T=this._getAnchor();m==="top"?(e=v/2,i=b):m==="bottom"?(e=v/2,i=0):m==="center"?(e=v/2,i=b/2):m==="right"?(e=0,i=b/2):m==="left"?(e=v,i=b/2):f.x<h.x?(m="right",e=0,i=b/2):(m="left",e=v+(k.x+T.x)*2,i=b/2),t=t.subtract(M(e,i,!0)).add(k).add(T),j(s,"leaflet-tooltip-right"),j(s,"leaflet-tooltip-left"),j(s,"leaflet-tooltip-top"),j(s,"leaflet-tooltip-bottom"),O(s,"leaflet-tooltip-"+m),Y(s,t)},_updatePosition:function(){var t=this._map.latLngToLayerPoint(this._latlng);this._setPosition(t)},setOpacity:function(t){this.options.opacity=t,this._container&&ct(this._container,t)},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);this._setPosition(e)},_getAnchor:function(){return M(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),gs=function(t,e){return new Ve(t,e)};N.include({openTooltip:function(t,e,i){return this._initOverlay(Ve,t,e,i).openOn(this),this},closeTooltip:function(t){return t.close(),this}}),_t.include({bindTooltip:function(t,e){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(Ve,this._tooltip,t,e),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(t){if(!(!t&&this._tooltipHandlersAdded)){var e=t?"off":"on",i={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?i.add=this._openTooltip:(i.mouseover=this._openTooltip,i.mouseout=this.closeTooltip,i.click=this._openTooltip,this._map?this._addFocusListeners():i.add=this._addFocusListeners),this._tooltip.options.sticky&&(i.mousemove=this._moveTooltip),this[e](i),this._tooltipHandlersAdded=!t}},openTooltip:function(t){return this._tooltip&&(this instanceof Lt||(this._tooltip._source=this),this._tooltip._prepareOpen(t)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(t){return this._tooltip&&this._tooltip.setContent(t),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(t){var e=typeof t.getElement=="function"&&t.getElement();e&&(z(e,"focus",function(){this._tooltip._source=t,this.openTooltip()},this),z(e,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(t){var e=typeof t.getElement=="function"&&t.getElement();e&&e.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(t){if(!(!this._tooltip||!this._map)){if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var e=this;this._map.once("moveend",function(){e._openOnceFlag=!1,e._openTooltip(t)});return}this._tooltip._source=t.layer||t.target,this.openTooltip(this._tooltip.options.sticky?t.latlng:void 0)}},_moveTooltip:function(t){var e=t.latlng,i,n;this._tooltip.options.sticky&&t.originalEvent&&(i=this._map.mouseEventToContainerPoint(t.originalEvent),n=this._map.containerPointToLayerPoint(i),e=this._map.layerPointToLatLng(n)),this._tooltip.setLatLng(e)}});var Yn=qt.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(t){var e=t&&t.tagName==="DIV"?t:document.createElement("div"),i=this.options;if(i.html instanceof Element?(Oe(e),e.appendChild(i.html)):e.innerHTML=i.html!==!1?i.html:"",i.bgPos){var n=M(i.bgPos);e.style.backgroundPosition=-n.x+"px "+-n.y+"px"}return this._setIconStyles(e,"icon"),e},createShadow:function(){return null}});function vs(t){return new Yn(t)}qt.Default=de;var fe=_t.extend({options:{tileSize:256,opacity:1,updateWhenIdle:S.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(t){P(this,t)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(t){t._addZoomLimit(this)},onRemove:function(t){this._removeAllTiles(),V(this._container),t._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(Ut(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(Gt(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(t){return this.options.opacity=t,this._updateOpacity(),this},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var t=this._clampZoom(this._map.getZoom());t!==this._tileZoom&&(this._tileZoom=t,this._updateLevels()),this._update()}return this},getEvents:function(){var t={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=_(this._onMoveEnd,this.options.updateInterval,this)),t.move=this._onMove),this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},createTile:function(){return document.createElement("div")},getTileSize:function(){var t=this.options.tileSize;return t instanceof E?t:new E(t,t)},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(t){for(var e=this.getPane().children,i=-t(-1/0,1/0),n=0,s=e.length,h;n<s;n++)h=e[n].style.zIndex,e[n]!==this._container&&h&&(i=t(i,+h));isFinite(i)&&(this.options.zIndex=i+t(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!S.ielt9){ct(this._container,this.options.opacity);var t=+new Date,e=!1,i=!1;for(var n in this._tiles){var s=this._tiles[n];if(!(!s.current||!s.loaded)){var h=Math.min(1,(t-s.loaded)/200);ct(s.el,h),h<1?e=!0:(s.active?i=!0:this._onOpaqueTile(s),s.active=!0)}}i&&!this._noPrune&&this._pruneTiles(),e&&(ut(this._fadeFrame),this._fadeFrame=nt(this._updateOpacity,this))}},_onOpaqueTile:p,_initContainer:function(){this._container||(this._container=D("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var t=this._tileZoom,e=this.options.maxZoom;if(t!==void 0){for(var i in this._levels)i=Number(i),this._levels[i].el.children.length||i===t?(this._levels[i].el.style.zIndex=e-Math.abs(t-i),this._onUpdateLevel(i)):(V(this._levels[i].el),this._removeTilesAtZoom(i),this._onRemoveLevel(i),delete this._levels[i]);var n=this._levels[t],s=this._map;return n||(n=this._levels[t]={},n.el=D("div","leaflet-tile-container leaflet-zoom-animated",this._container),n.el.style.zIndex=e,n.origin=s.project(s.unproject(s.getPixelOrigin()),t).round(),n.zoom=t,this._setZoomTransform(n,s.getCenter(),s.getZoom()),p(n.el.offsetWidth),this._onCreateLevel(n)),this._level=n,n}},_onUpdateLevel:p,_onRemoveLevel:p,_onCreateLevel:p,_pruneTiles:function(){if(this._map){var t,e,i=this._map.getZoom();if(i>this.options.maxZoom||i<this.options.minZoom){this._removeAllTiles();return}for(t in this._tiles)e=this._tiles[t],e.retain=e.current;for(t in this._tiles)if(e=this._tiles[t],e.current&&!e.active){var n=e.coords;this._retainParent(n.x,n.y,n.z,n.z-5)||this._retainChildren(n.x,n.y,n.z,n.z+2)}for(t in this._tiles)this._tiles[t].retain||this._removeTile(t)}},_removeTilesAtZoom:function(t){for(var e in this._tiles)this._tiles[e].coords.z===t&&this._removeTile(e)},_removeAllTiles:function(){for(var t in this._tiles)this._removeTile(t)},_invalidateAll:function(){for(var t in this._levels)V(this._levels[t].el),this._onRemoveLevel(Number(t)),delete this._levels[t];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(t,e,i,n){var s=Math.floor(t/2),h=Math.floor(e/2),f=i-1,m=new E(+s,+h);m.z=+f;var v=this._tileCoordsToKey(m),b=this._tiles[v];return b&&b.active?(b.retain=!0,!0):(b&&b.loaded&&(b.retain=!0),f>n?this._retainParent(s,h,f,n):!1)},_retainChildren:function(t,e,i,n){for(var s=2*t;s<2*t+2;s++)for(var h=2*e;h<2*e+2;h++){var f=new E(s,h);f.z=i+1;var m=this._tileCoordsToKey(f),v=this._tiles[m];if(v&&v.active){v.retain=!0;continue}else v&&v.loaded&&(v.retain=!0);i+1<n&&this._retainChildren(s,h,i+1,n)}},_resetView:function(t){var e=t&&(t.pinch||t.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),e,e)},_animateZoom:function(t){this._setView(t.center,t.zoom,!0,t.noUpdate)},_clampZoom:function(t){var e=this.options;return e.minNativeZoom!==void 0&&t<e.minNativeZoom?e.minNativeZoom:e.maxNativeZoom!==void 0&&e.maxNativeZoom<t?e.maxNativeZoom:t},_setView:function(t,e,i,n){var s=Math.round(e);this.options.maxZoom!==void 0&&s>this.options.maxZoom||this.options.minZoom!==void 0&&s<this.options.minZoom?s=void 0:s=this._clampZoom(s);var h=this.options.updateWhenZooming&&s!==this._tileZoom;(!n||h)&&(this._tileZoom=s,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),s!==void 0&&this._update(t),i||this._pruneTiles(),this._noPrune=!!i),this._setZoomTransforms(t,e)},_setZoomTransforms:function(t,e){for(var i in this._levels)this._setZoomTransform(this._levels[i],t,e)},_setZoomTransform:function(t,e,i){var n=this._map.getZoomScale(i,t.zoom),s=t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e,i)).round();S.any3d?Ot(t.el,s,n):Y(t.el,s)},_resetGrid:function(){var t=this._map,e=t.options.crs,i=this._tileSize=this.getTileSize(),n=this._tileZoom,s=this._map.getPixelWorldBounds(this._tileZoom);s&&(this._globalTileRange=this._pxBoundsToTileRange(s)),this._wrapX=e.wrapLng&&!this.options.noWrap&&[Math.floor(t.project([0,e.wrapLng[0]],n).x/i.x),Math.ceil(t.project([0,e.wrapLng[1]],n).x/i.y)],this._wrapY=e.wrapLat&&!this.options.noWrap&&[Math.floor(t.project([e.wrapLat[0],0],n).y/i.x),Math.ceil(t.project([e.wrapLat[1],0],n).y/i.y)]},_onMoveEnd:function(){!this._map||this._map._animatingZoom||this._update()},_getTiledPixelBounds:function(t){var e=this._map,i=e._animatingZoom?Math.max(e._animateToZoom,e.getZoom()):e.getZoom(),n=e.getZoomScale(i,this._tileZoom),s=e.project(t,this._tileZoom).floor(),h=e.getSize().divideBy(n*2);return new q(s.subtract(h),s.add(h))},_update:function(t){var e=this._map;if(e){var i=this._clampZoom(e.getZoom());if(t===void 0&&(t=e.getCenter()),this._tileZoom!==void 0){var n=this._getTiledPixelBounds(t),s=this._pxBoundsToTileRange(n),h=s.getCenter(),f=[],m=this.options.keepBuffer,v=new q(s.getBottomLeft().subtract([m,-m]),s.getTopRight().add([m,-m]));if(!(isFinite(s.min.x)&&isFinite(s.min.y)&&isFinite(s.max.x)&&isFinite(s.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var b in this._tiles){var k=this._tiles[b].coords;(k.z!==this._tileZoom||!v.contains(new E(k.x,k.y)))&&(this._tiles[b].current=!1)}if(Math.abs(i-this._tileZoom)>1){this._setView(t,i);return}for(var T=s.min.y;T<=s.max.y;T++)for(var $=s.min.x;$<=s.max.x;$++){var et=new E($,T);if(et.z=this._tileZoom,!!this._isValidTile(et)){var X=this._tiles[this._tileCoordsToKey(et)];X?X.current=!0:f.push(et)}}if(f.sort(function(st,Yt){return st.distanceTo(h)-Yt.distanceTo(h)}),f.length!==0){this._loading||(this._loading=!0,this.fire("loading"));var ft=document.createDocumentFragment();for($=0;$<f.length;$++)this._addTile(f[$],ft);this._level.el.appendChild(ft)}}}},_isValidTile:function(t){var e=this._map.options.crs;if(!e.infinite){var i=this._globalTileRange;if(!e.wrapLng&&(t.x<i.min.x||t.x>i.max.x)||!e.wrapLat&&(t.y<i.min.y||t.y>i.max.y))return!1}if(!this.options.bounds)return!0;var n=this._tileCoordsToBounds(t);return K(this.options.bounds).overlaps(n)},_keyToBounds:function(t){return this._tileCoordsToBounds(this._keyToTileCoords(t))},_tileCoordsToNwSe:function(t){var e=this._map,i=this.getTileSize(),n=t.scaleBy(i),s=n.add(i),h=e.unproject(n,t.z),f=e.unproject(s,t.z);return[h,f]},_tileCoordsToBounds:function(t){var e=this._tileCoordsToNwSe(t),i=new rt(e[0],e[1]);return this.options.noWrap||(i=this._map.wrapLatLngBounds(i)),i},_tileCoordsToKey:function(t){return t.x+":"+t.y+":"+t.z},_keyToTileCoords:function(t){var e=t.split(":"),i=new E(+e[0],+e[1]);return i.z=+e[2],i},_removeTile:function(t){var e=this._tiles[t];e&&(V(e.el),delete this._tiles[t],this.fire("tileunload",{tile:e.el,coords:this._keyToTileCoords(t)}))},_initTile:function(t){O(t,"leaflet-tile");var e=this.getTileSize();t.style.width=e.x+"px",t.style.height=e.y+"px",t.onselectstart=p,t.onmousemove=p,S.ielt9&&this.options.opacity<1&&ct(t,this.options.opacity)},_addTile:function(t,e){var i=this._getTilePos(t),n=this._tileCoordsToKey(t),s=this.createTile(this._wrapCoords(t),l(this._tileReady,this,t));this._initTile(s),this.createTile.length<2&&nt(l(this._tileReady,this,t,null,s)),Y(s,i),this._tiles[n]={el:s,coords:t,current:!0},e.appendChild(s),this.fire("tileloadstart",{tile:s,coords:t})},_tileReady:function(t,e,i){e&&this.fire("tileerror",{error:e,tile:i,coords:t});var n=this._tileCoordsToKey(t);i=this._tiles[n],i&&(i.loaded=+new Date,this._map._fadeAnimated?(ct(i.el,0),ut(this._fadeFrame),this._fadeFrame=nt(this._updateOpacity,this)):(i.active=!0,this._pruneTiles()),e||(O(i.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:i.el,coords:t})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),S.ielt9||!this._map._fadeAnimated?nt(this._pruneTiles,this):setTimeout(l(this._pruneTiles,this),250)))},_getTilePos:function(t){return t.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(t){var e=new E(this._wrapX?g(t.x,this._wrapX):t.x,this._wrapY?g(t.y,this._wrapY):t.y);return e.z=t.z,e},_pxBoundsToTileRange:function(t){var e=this.getTileSize();return new q(t.min.unscaleBy(e).floor(),t.max.unscaleBy(e).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var t in this._tiles)if(!this._tiles[t].loaded)return!1;return!0}});function ys(t){return new fe(t)}var Kt=fe.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(t,e){this._url=t,e=P(this,e),e.detectRetina&&S.retina&&e.maxZoom>0?(e.tileSize=Math.floor(e.tileSize/2),e.zoomReverse?(e.zoomOffset--,e.minZoom=Math.min(e.maxZoom,e.minZoom+1)):(e.zoomOffset++,e.maxZoom=Math.max(e.minZoom,e.maxZoom-1)),e.minZoom=Math.max(0,e.minZoom)):e.zoomReverse?e.minZoom=Math.min(e.maxZoom,e.minZoom):e.maxZoom=Math.max(e.minZoom,e.maxZoom),typeof e.subdomains=="string"&&(e.subdomains=e.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(t,e){return this._url===t&&e===void 0&&(e=!0),this._url=t,e||this.redraw(),this},createTile:function(t,e){var i=document.createElement("img");return z(i,"load",l(this._tileOnLoad,this,e,i)),z(i,"error",l(this._tileOnError,this,e,i)),(this.options.crossOrigin||this.options.crossOrigin==="")&&(i.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),typeof this.options.referrerPolicy=="string"&&(i.referrerPolicy=this.options.referrerPolicy),i.alt="",i.src=this.getTileUrl(t),i},getTileUrl:function(t){var e={r:S.retina?"@2x":"",s:this._getSubdomain(t),x:t.x,y:t.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var i=this._globalTileRange.max.y-t.y;this.options.tms&&(e.y=i),e["-y"]=i}return G(this._url,a(e,this.options))},_tileOnLoad:function(t,e){S.ielt9?setTimeout(l(t,this,null,e),0):t(null,e)},_tileOnError:function(t,e,i){var n=this.options.errorTileUrl;n&&e.getAttribute("src")!==n&&(e.src=n),t(i,e)},_onTileRemove:function(t){t.tile.onload=null},_getZoomForUrl:function(){var t=this._tileZoom,e=this.options.maxZoom,i=this.options.zoomReverse,n=this.options.zoomOffset;return i&&(t=e-t),t+n},_getSubdomain:function(t){var e=Math.abs(t.x+t.y)%this.options.subdomains.length;return this.options.subdomains[e]},_abortLoading:function(){var t,e;for(t in this._tiles)if(this._tiles[t].coords.z!==this._tileZoom&&(e=this._tiles[t].el,e.onload=p,e.onerror=p,!e.complete)){e.src=lt;var i=this._tiles[t].coords;V(e),delete this._tiles[t],this.fire("tileabort",{tile:e,coords:i})}},_removeTile:function(t){var e=this._tiles[t];if(e)return e.el.setAttribute("src",lt),fe.prototype._removeTile.call(this,t)},_tileReady:function(t,e,i){if(!(!this._map||i&&i.getAttribute("src")===lt))return fe.prototype._tileReady.call(this,t,e,i)}});function Jn(t,e){return new Kt(t,e)}var Xn=Kt.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(t,e){this._url=t;var i=a({},this.defaultWmsParams);for(var n in e)n in this.options||(i[n]=e[n]);e=P(this,e);var s=e.detectRetina&&S.retina?2:1,h=this.getTileSize();i.width=h.x*s,i.height=h.y*s,this.wmsParams=i},onAdd:function(t){this._crs=this.options.crs||t.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var e=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[e]=this._crs.code,Kt.prototype.onAdd.call(this,t)},getTileUrl:function(t){var e=this._tileCoordsToNwSe(t),i=this._crs,n=ot(i.project(e[0]),i.project(e[1])),s=n.min,h=n.max,f=(this._wmsVersion>=1.3&&this._crs===Gn?[s.y,s.x,h.y,h.x]:[s.x,s.y,h.x,h.y]).join(","),m=Kt.prototype.getTileUrl.call(this,t);return m+R(this.wmsParams,m,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+f},setParams:function(t,e){return a(this.wmsParams,t),e||this.redraw(),this}});function xs(t,e){return new Xn(t,e)}Kt.WMS=Xn,Jn.wms=xs;var kt=_t.extend({options:{padding:.1},initialize:function(t){P(this,t),c(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),O(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var t={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(t.zoomanim=this._onAnimZoom),t},_onAnimZoom:function(t){this._updateTransform(t.center,t.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(t,e){var i=this._map.getZoomScale(e,this._zoom),n=this._map.getSize().multiplyBy(.5+this.options.padding),s=this._map.project(this._center,e),h=n.multiplyBy(-i).add(s).subtract(this._map._getNewPixelOrigin(t,e));S.any3d?Ot(this._container,h,i):Y(this._container,h)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var t in this._layers)this._layers[t]._reset()},_onZoomEnd:function(){for(var t in this._layers)this._layers[t]._project()},_updatePaths:function(){for(var t in this._layers)this._layers[t]._update()},_update:function(){var t=this.options.padding,e=this._map.getSize(),i=this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();this._bounds=new q(i,i.add(e.multiplyBy(1+t*2)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),Qn=kt.extend({options:{tolerance:0},getEvents:function(){var t=kt.prototype.getEvents.call(this);return t.viewprereset=this._onViewPreReset,t},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){kt.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var t=this._container=document.createElement("canvas");z(t,"mousemove",this._onMouseMove,this),z(t,"click dblclick mousedown mouseup contextmenu",this._onClick,this),z(t,"mouseout",this._handleMouseOut,this),t._leaflet_disable_events=!0,this._ctx=t.getContext("2d")},_destroyContainer:function(){ut(this._redrawRequest),delete this._ctx,V(this._container),H(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){var t;this._redrawBounds=null;for(var e in this._layers)t=this._layers[e],t._update();this._redraw()}},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){kt.prototype._update.call(this);var t=this._bounds,e=this._container,i=t.getSize(),n=S.retina?2:1;Y(e,t.min),e.width=n*i.x,e.height=n*i.y,e.style.width=i.x+"px",e.style.height=i.y+"px",S.retina&&this._ctx.scale(2,2),this._ctx.translate(-t.min.x,-t.min.y),this.fire("update")}},_reset:function(){kt.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(t){this._updateDashArray(t),this._layers[c(t)]=t;var e=t._order={layer:t,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=e),this._drawLast=e,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(t){this._requestRedraw(t)},_removePath:function(t){var e=t._order,i=e.next,n=e.prev;i?i.prev=n:this._drawLast=n,n?n.next=i:this._drawFirst=i,delete t._order,delete this._layers[c(t)],this._requestRedraw(t)},_updatePath:function(t){this._extendRedrawBounds(t),t._project(),t._update(),this._requestRedraw(t)},_updateStyle:function(t){this._updateDashArray(t),this._requestRedraw(t)},_updateDashArray:function(t){if(typeof t.options.dashArray=="string"){var e=t.options.dashArray.split(/[, ]+/),i=[],n,s;for(s=0;s<e.length;s++){if(n=Number(e[s]),isNaN(n))return;i.push(n)}t.options._dashArray=i}else t.options._dashArray=t.options.dashArray},_requestRedraw:function(t){this._map&&(this._extendRedrawBounds(t),this._redrawRequest=this._redrawRequest||nt(this._redraw,this))},_extendRedrawBounds:function(t){if(t._pxBounds){var e=(t.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new q,this._redrawBounds.extend(t._pxBounds.min.subtract([e,e])),this._redrawBounds.extend(t._pxBounds.max.add([e,e]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var t=this._redrawBounds;if(t){var e=t.getSize();this._ctx.clearRect(t.min.x,t.min.y,e.x,e.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var t,e=this._redrawBounds;if(this._ctx.save(),e){var i=e.getSize();this._ctx.beginPath(),this._ctx.rect(e.min.x,e.min.y,i.x,i.y),this._ctx.clip()}this._drawing=!0;for(var n=this._drawFirst;n;n=n.next)t=n.layer,(!e||t._pxBounds&&t._pxBounds.intersects(e))&&t._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(t,e){if(this._drawing){var i,n,s,h,f=t._parts,m=f.length,v=this._ctx;if(m){for(v.beginPath(),i=0;i<m;i++){for(n=0,s=f[i].length;n<s;n++)h=f[i][n],v[n?"lineTo":"moveTo"](h.x,h.y);e&&v.closePath()}this._fillStroke(v,t)}}},_updateCircle:function(t){if(!(!this._drawing||t._empty())){var e=t._point,i=this._ctx,n=Math.max(Math.round(t._radius),1),s=(Math.max(Math.round(t._radiusY),1)||n)/n;s!==1&&(i.save(),i.scale(1,s)),i.beginPath(),i.arc(e.x,e.y/s,n,0,Math.PI*2,!1),s!==1&&i.restore(),this._fillStroke(i,t)}},_fillStroke:function(t,e){var i=e.options;i.fill&&(t.globalAlpha=i.fillOpacity,t.fillStyle=i.fillColor||i.color,t.fill(i.fillRule||"evenodd")),i.stroke&&i.weight!==0&&(t.setLineDash&&t.setLineDash(e.options&&e.options._dashArray||[]),t.globalAlpha=i.opacity,t.lineWidth=i.weight,t.strokeStyle=i.color,t.lineCap=i.lineCap,t.lineJoin=i.lineJoin,t.stroke())},_onClick:function(t){for(var e=this._map.mouseEventToLayerPoint(t),i,n,s=this._drawFirst;s;s=s.next)i=s.layer,i.options.interactive&&i._containsPoint(e)&&(!(t.type==="click"||t.type==="preclick")||!this._map._draggableMoved(i))&&(n=i);this._fireEvent(n?[n]:!1,t)},_onMouseMove:function(t){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var e=this._map.mouseEventToLayerPoint(t);this._handleMouseHover(t,e)}},_handleMouseOut:function(t){var e=this._hoveredLayer;e&&(j(this._container,"leaflet-interactive"),this._fireEvent([e],t,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(t,e){if(!this._mouseHoverThrottled){for(var i,n,s=this._drawFirst;s;s=s.next)i=s.layer,i.options.interactive&&i._containsPoint(e)&&(n=i);n!==this._hoveredLayer&&(this._handleMouseOut(t),n&&(O(this._container,"leaflet-interactive"),this._fireEvent([n],t,"mouseover"),this._hoveredLayer=n)),this._fireEvent(this._hoveredLayer?[this._hoveredLayer]:!1,t),this._mouseHoverThrottled=!0,setTimeout(l(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(t,e,i){this._map._fireDOMEvent(e,i||e.type,t)},_bringToFront:function(t){var e=t._order;if(e){var i=e.next,n=e.prev;if(i)i.prev=n;else return;n?n.next=i:i&&(this._drawFirst=i),e.prev=this._drawLast,this._drawLast.next=e,e.next=null,this._drawLast=e,this._requestRedraw(t)}},_bringToBack:function(t){var e=t._order;if(e){var i=e.next,n=e.prev;if(n)n.next=i;else return;i?i.prev=n:n&&(this._drawLast=n),e.prev=null,e.next=this._drawFirst,this._drawFirst.prev=e,this._drawFirst=e,this._requestRedraw(t)}}});function to(t){return S.canvas?new Qn(t):null}var pe=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(t){return document.createElement("<lvml:"+t+' class="lvml">')}}catch{}return function(t){return document.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}(),bs={_initContainer:function(){this._container=D("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(kt.prototype._update.call(this),this.fire("update"))},_initPath:function(t){var e=t._container=pe("shape");O(e,"leaflet-vml-shape "+(this.options.className||"")),e.coordsize="1 1",t._path=pe("path"),e.appendChild(t._path),this._updateStyle(t),this._layers[c(t)]=t},_addPath:function(t){var e=t._container;this._container.appendChild(e),t.options.interactive&&t.addInteractiveTarget(e)},_removePath:function(t){var e=t._container;V(e),t.removeInteractiveTarget(e),delete this._layers[c(t)]},_updateStyle:function(t){var e=t._stroke,i=t._fill,n=t.options,s=t._container;s.stroked=!!n.stroke,s.filled=!!n.fill,n.stroke?(e||(e=t._stroke=pe("stroke")),s.appendChild(e),e.weight=n.weight+"px",e.color=n.color,e.opacity=n.opacity,n.dashArray?e.dashStyle=W(n.dashArray)?n.dashArray.join(" "):n.dashArray.replace(/( *, *)/g," "):e.dashStyle="",e.endcap=n.lineCap.replace("butt","flat"),e.joinstyle=n.lineJoin):e&&(s.removeChild(e),t._stroke=null),n.fill?(i||(i=t._fill=pe("fill")),s.appendChild(i),i.color=n.fillColor||n.color,i.opacity=n.fillOpacity):i&&(s.removeChild(i),t._fill=null)},_updateCircle:function(t){var e=t._point.round(),i=Math.round(t._radius),n=Math.round(t._radiusY||i);this._setPath(t,t._empty()?"M0 0":"AL "+e.x+","+e.y+" "+i+","+n+" 0,"+65535*360)},_setPath:function(t,e){t._path.v=e},_bringToFront:function(t){Ut(t._container)},_bringToBack:function(t){Gt(t._container)}},je=S.vml?pe:on,_e=kt.extend({_initContainer:function(){this._container=je("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=je("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){V(this._container),H(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){kt.prototype._update.call(this);var t=this._bounds,e=t.getSize(),i=this._container;(!this._svgSize||!this._svgSize.equals(e))&&(this._svgSize=e,i.setAttribute("width",e.x),i.setAttribute("height",e.y)),Y(i,t.min),i.setAttribute("viewBox",[t.min.x,t.min.y,e.x,e.y].join(" ")),this.fire("update")}},_initPath:function(t){var e=t._path=je("path");t.options.className&&O(e,t.options.className),t.options.interactive&&O(e,"leaflet-interactive"),this._updateStyle(t),this._layers[c(t)]=t},_addPath:function(t){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(t._path),t.addInteractiveTarget(t._path)},_removePath:function(t){V(t._path),t.removeInteractiveTarget(t._path),delete this._layers[c(t)]},_updatePath:function(t){t._project(),t._update()},_updateStyle:function(t){var e=t._path,i=t.options;e&&(i.stroke?(e.setAttribute("stroke",i.color),e.setAttribute("stroke-opacity",i.opacity),e.setAttribute("stroke-width",i.weight),e.setAttribute("stroke-linecap",i.lineCap),e.setAttribute("stroke-linejoin",i.lineJoin),i.dashArray?e.setAttribute("stroke-dasharray",i.dashArray):e.removeAttribute("stroke-dasharray"),i.dashOffset?e.setAttribute("stroke-dashoffset",i.dashOffset):e.removeAttribute("stroke-dashoffset")):e.setAttribute("stroke","none"),i.fill?(e.setAttribute("fill",i.fillColor||i.color),e.setAttribute("fill-opacity",i.fillOpacity),e.setAttribute("fill-rule",i.fillRule||"evenodd")):e.setAttribute("fill","none"))},_updatePoly:function(t,e){this._setPath(t,rn(t._parts,e))},_updateCircle:function(t){var e=t._point,i=Math.max(Math.round(t._radius),1),n=Math.max(Math.round(t._radiusY),1)||i,s="a"+i+","+n+" 0 1,0 ",h=t._empty()?"M0 0":"M"+(e.x-i)+","+e.y+s+i*2+",0 "+s+-i*2+",0 ";this._setPath(t,h)},_setPath:function(t,e){t._path.setAttribute("d",e)},_bringToFront:function(t){Ut(t._path)},_bringToBack:function(t){Gt(t._path)}});S.vml&&_e.include(bs);function eo(t){return S.svg||S.vml?new _e(t):null}N.include({getRenderer:function(t){var e=t.options.renderer||this._getPaneRenderer(t.options.pane)||this.options.renderer||this._renderer;return e||(e=this._renderer=this._createRenderer()),this.hasLayer(e)||this.addLayer(e),e},_getPaneRenderer:function(t){if(t==="overlayPane"||t===void 0)return!1;var e=this._paneRenderers[t];return e===void 0&&(e=this._createRenderer({pane:t}),this._paneRenderers[t]=e),e},_createRenderer:function(t){return this.options.preferCanvas&&to(t)||eo(t)}});var io=Vt.extend({initialize:function(t,e){Vt.prototype.initialize.call(this,this._boundsToLatLngs(t),e)},setBounds:function(t){return this.setLatLngs(this._boundsToLatLngs(t))},_boundsToLatLngs:function(t){return t=K(t),[t.getSouthWest(),t.getNorthWest(),t.getNorthEast(),t.getSouthEast()]}});function ws(t,e){return new io(t,e)}_e.create=je,_e.pointsToPath=rn,Ct.geometryToLayer=Fe,Ct.coordsToLatLng=$i,Ct.coordsToLatLngs=He,Ct.latLngToCoords=Ii,Ct.latLngsToCoords=Ue,Ct.getFeature=jt,Ct.asFeature=Ge,N.mergeOptions({boxZoom:!0});var no=vt.extend({initialize:function(t){this._map=t,this._container=t._container,this._pane=t._panes.overlayPane,this._resetStateTimeout=0,t.on("unload",this._destroy,this)},addHooks:function(){z(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){H(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){V(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){this._resetStateTimeout!==0&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(t){if(!t.shiftKey||t.which!==1&&t.button!==1)return!1;this._clearDeferredResetState(),this._resetState(),se(),gi(),this._startPoint=this._map.mouseEventToContainerPoint(t),z(document,{contextmenu:Zt,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(t){this._moved||(this._moved=!0,this._box=D("div","leaflet-zoom-box",this._container),O(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(t);var e=new q(this._point,this._startPoint),i=e.getSize();Y(this._box,e.min),this._box.style.width=i.x+"px",this._box.style.height=i.y+"px"},_finish:function(){this._moved&&(V(this._box),j(this._container,"leaflet-crosshair")),ae(),vi(),H(document,{contextmenu:Zt,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(t){if(!(t.which!==1&&t.button!==1)&&(this._finish(),!!this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(l(this._resetState,this),0);var e=new rt(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(e).fire("boxzoomend",{boxZoomBounds:e})}},_onKeyDown:function(t){t.keyCode===27&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});N.addInitHook("addHandler","boxZoom",no),N.mergeOptions({doubleClickZoom:!0});var oo=vt.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(t){var e=this._map,i=e.getZoom(),n=e.options.zoomDelta,s=t.originalEvent.shiftKey?i-n:i+n;e.options.doubleClickZoom==="center"?e.setZoom(s):e.setZoomAround(t.containerPoint,s)}});N.addInitHook("addHandler","doubleClickZoom",oo),N.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var ro=vt.extend({addHooks:function(){if(!this._draggable){var t=this._map;this._draggable=new Mt(t._mapPane,t._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),t.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),t.on("zoomend",this._onZoomEnd,this),t.whenReady(this._onZoomEnd,this))}O(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){j(this._map._container,"leaflet-grab"),j(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var t=this._map;if(t._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var e=K(this._map.options.maxBounds);this._offsetLimit=ot(this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(e.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;t.fire("movestart").fire("dragstart"),t.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(t){if(this._map.options.inertia){var e=this._lastTime=+new Date,i=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(i),this._times.push(e),this._prunePositions(e)}this._map.fire("move",t).fire("drag",t)},_prunePositions:function(t){for(;this._positions.length>1&&t-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var t=this._map.getSize().divideBy(2),e=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=e.subtract(t).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(t,e){return t-(t-e)*this._viscosity},_onPreDragLimit:function(){if(!(!this._viscosity||!this._offsetLimit)){var t=this._draggable._newPos.subtract(this._draggable._startPos),e=this._offsetLimit;t.x<e.min.x&&(t.x=this._viscousLimit(t.x,e.min.x)),t.y<e.min.y&&(t.y=this._viscousLimit(t.y,e.min.y)),t.x>e.max.x&&(t.x=this._viscousLimit(t.x,e.max.x)),t.y>e.max.y&&(t.y=this._viscousLimit(t.y,e.max.y)),this._draggable._newPos=this._draggable._startPos.add(t)}},_onPreDragWrap:function(){var t=this._worldWidth,e=Math.round(t/2),i=this._initialWorldOffset,n=this._draggable._newPos.x,s=(n-e+i)%t+e-i,h=(n+e+i)%t-e-i,f=Math.abs(s+i)<Math.abs(h+i)?s:h;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=f},_onDragEnd:function(t){var e=this._map,i=e.options,n=!i.inertia||t.noInertia||this._times.length<2;if(e.fire("dragend",t),n)e.fire("moveend");else{this._prunePositions(+new Date);var s=this._lastPos.subtract(this._positions[0]),h=(this._lastTime-this._times[0])/1e3,f=i.easeLinearity,m=s.multiplyBy(f/h),v=m.distanceTo([0,0]),b=Math.min(i.inertiaMaxSpeed,v),k=m.multiplyBy(b/v),T=b/(i.inertiaDeceleration*f),$=k.multiplyBy(-T/2).round();!$.x&&!$.y?e.fire("moveend"):($=e._limitOffset($,e.options.maxBounds),nt(function(){e.panBy($,{duration:T,easeLinearity:f,noMoveStart:!0,animate:!0})}))}}});N.addInitHook("addHandler","dragging",ro),N.mergeOptions({keyboard:!0,keyboardPanDelta:80});var so=vt.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(t){this._map=t,this._setPanDelta(t.options.keyboardPanDelta),this._setZoomDelta(t.options.zoomDelta)},addHooks:function(){var t=this._map._container;t.tabIndex<=0&&(t.tabIndex="0"),z(t,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),H(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var t=document.body,e=document.documentElement,i=t.scrollTop||e.scrollTop,n=t.scrollLeft||e.scrollLeft;this._map._container.focus(),window.scrollTo(n,i)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(t){var e=this._panKeys={},i=this.keyCodes,n,s;for(n=0,s=i.left.length;n<s;n++)e[i.left[n]]=[-1*t,0];for(n=0,s=i.right.length;n<s;n++)e[i.right[n]]=[t,0];for(n=0,s=i.down.length;n<s;n++)e[i.down[n]]=[0,t];for(n=0,s=i.up.length;n<s;n++)e[i.up[n]]=[0,-1*t]},_setZoomDelta:function(t){var e=this._zoomKeys={},i=this.keyCodes,n,s;for(n=0,s=i.zoomIn.length;n<s;n++)e[i.zoomIn[n]]=t;for(n=0,s=i.zoomOut.length;n<s;n++)e[i.zoomOut[n]]=-t},_addHooks:function(){z(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){H(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(t){if(!(t.altKey||t.ctrlKey||t.metaKey)){var e=t.keyCode,i=this._map,n;if(e in this._panKeys){if(!i._panAnim||!i._panAnim._inProgress)if(n=this._panKeys[e],t.shiftKey&&(n=M(n).multiplyBy(3)),i.options.maxBounds&&(n=i._limitOffset(M(n),i.options.maxBounds)),i.options.worldCopyJump){var s=i.wrapLatLng(i.unproject(i.project(i.getCenter()).add(n)));i.panTo(s)}else i.panBy(n)}else if(e in this._zoomKeys)i.setZoom(i.getZoom()+(t.shiftKey?3:1)*this._zoomKeys[e]);else if(e===27&&i._popup&&i._popup.options.closeOnEscapeKey)i.closePopup();else return;Zt(t)}}});N.addInitHook("addHandler","keyboard",so),N.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var ao=vt.extend({addHooks:function(){z(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){H(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(t){var e=zn(t),i=this._map.options.wheelDebounceTime;this._delta+=e,this._lastMousePos=this._map.mouseEventToContainerPoint(t),this._startTime||(this._startTime=+new Date);var n=Math.max(i-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(l(this._performZoom,this),n),Zt(t)},_performZoom:function(){var t=this._map,e=t.getZoom(),i=this._map.options.zoomSnap||0;t._stop();var n=this._delta/(this._map.options.wheelPxPerZoomLevel*4),s=4*Math.log(2/(1+Math.exp(-Math.abs(n))))/Math.LN2,h=i?Math.ceil(s/i)*i:s,f=t._limitZoom(e+(this._delta>0?h:-h))-e;this._delta=0,this._startTime=null,f&&(t.options.scrollWheelZoom==="center"?t.setZoom(e+f):t.setZoomAround(this._lastMousePos,e+f))}});N.addInitHook("addHandler","scrollWheelZoom",ao);var Ls=600;N.mergeOptions({tapHold:S.touchNative&&S.safari&&S.mobile,tapTolerance:15});var lo=vt.extend({addHooks:function(){z(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){H(this._map._container,"touchstart",this._onDown,this)},_onDown:function(t){if(clearTimeout(this._holdTimeout),t.touches.length===1){var e=t.touches[0];this._startPos=this._newPos=new E(e.clientX,e.clientY),this._holdTimeout=setTimeout(l(function(){this._cancel(),this._isTapValid()&&(z(document,"touchend",Q),z(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",e))},this),Ls),z(document,"touchend touchcancel contextmenu",this._cancel,this),z(document,"touchmove",this._onMove,this)}},_cancelClickPrevent:function t(){H(document,"touchend",Q),H(document,"touchend touchcancel",t)},_cancel:function(){clearTimeout(this._holdTimeout),H(document,"touchend touchcancel contextmenu",this._cancel,this),H(document,"touchmove",this._onMove,this)},_onMove:function(t){var e=t.touches[0];this._newPos=new E(e.clientX,e.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(t,e){var i=new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window,screenX:e.screenX,screenY:e.screenY,clientX:e.clientX,clientY:e.clientY});i._simulated=!0,e.target.dispatchEvent(i)}});N.addInitHook("addHandler","tapHold",lo),N.mergeOptions({touchZoom:S.touch,bounceAtZoomLimits:!0});var ho=vt.extend({addHooks:function(){O(this._map._container,"leaflet-touch-zoom"),z(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){j(this._map._container,"leaflet-touch-zoom"),H(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(t){var e=this._map;if(!(!t.touches||t.touches.length!==2||e._animatingZoom||this._zooming)){var i=e.mouseEventToContainerPoint(t.touches[0]),n=e.mouseEventToContainerPoint(t.touches[1]);this._centerPoint=e.getSize()._divideBy(2),this._startLatLng=e.containerPointToLatLng(this._centerPoint),e.options.touchZoom!=="center"&&(this._pinchStartLatLng=e.containerPointToLatLng(i.add(n)._divideBy(2))),this._startDist=i.distanceTo(n),this._startZoom=e.getZoom(),this._moved=!1,this._zooming=!0,e._stop(),z(document,"touchmove",this._onTouchMove,this),z(document,"touchend touchcancel",this._onTouchEnd,this),Q(t)}},_onTouchMove:function(t){if(!(!t.touches||t.touches.length!==2||!this._zooming)){var e=this._map,i=e.mouseEventToContainerPoint(t.touches[0]),n=e.mouseEventToContainerPoint(t.touches[1]),s=i.distanceTo(n)/this._startDist;if(this._zoom=e.getScaleZoom(s,this._startZoom),!e.options.bounceAtZoomLimits&&(this._zoom<e.getMinZoom()&&s<1||this._zoom>e.getMaxZoom()&&s>1)&&(this._zoom=e._limitZoom(this._zoom)),e.options.touchZoom==="center"){if(this._center=this._startLatLng,s===1)return}else{var h=i._add(n)._divideBy(2)._subtract(this._centerPoint);if(s===1&&h.x===0&&h.y===0)return;this._center=e.unproject(e.project(this._pinchStartLatLng,this._zoom).subtract(h),this._zoom)}this._moved||(e._moveStart(!0,!1),this._moved=!0),ut(this._animRequest);var f=l(e._move,e,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=nt(f,this,!0),Q(t)}},_onTouchEnd:function(){if(!this._moved||!this._zooming){this._zooming=!1;return}this._zooming=!1,ut(this._animRequest),H(document,"touchmove",this._onTouchMove,this),H(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))}});N.addInitHook("addHandler","touchZoom",ho),N.BoxZoom=no,N.DoubleClickZoom=oo,N.Drag=ro,N.Keyboard=so,N.ScrollWheelZoom=ao,N.TapHold=lo,N.TouchZoom=ho,d.Bounds=q,d.Browser=S,d.CRS=wt,d.Canvas=Qn,d.Circle=Oi,d.CircleMarker=Re,d.Class=bt,d.Control=pt,d.DivIcon=Yn,d.DivOverlay=yt,d.DomEvent=Fr,d.DomUtil=Dr,d.Draggable=Mt,d.Evented=ee,d.FeatureGroup=Lt,d.GeoJSON=Ct,d.GridLayer=fe,d.Handler=vt,d.Icon=qt,d.ImageOverlay=We,d.LatLng=F,d.LatLngBounds=rt,d.Layer=_t,d.LayerGroup=Wt,d.LineUtil=ts,d.Map=N,d.Marker=De,d.Mixin=jr,d.Path=Et,d.Point=E,d.PolyUtil=Kr,d.Polygon=Vt,d.Polyline=Pt,d.Popup=qe,d.PosAnimation=An,d.Projection=es,d.Rectangle=io,d.Renderer=kt,d.SVG=_e,d.SVGOverlay=Kn,d.TileLayer=Kt,d.Tooltip=Ve,d.Transformation=ri,d.Util=ar,d.VideoOverlay=jn,d.bind=l,d.bounds=ot,d.canvas=to,d.circle=hs,d.circleMarker=ls,d.control=ue,d.divIcon=vs,d.extend=a,d.featureGroup=rs,d.geoJSON=Vn,d.geoJson=ds,d.gridLayer=ys,d.icon=ss,d.imageOverlay=fs,d.latLng=B,d.latLngBounds=K,d.layerGroup=os,d.map=Hr,d.marker=as,d.point=M,d.polygon=cs,d.polyline=us,d.popup=ms,d.rectangle=ws,d.setOptions=P,d.stamp=c,d.svg=eo,d.svgOverlay=_s,d.tileLayer=Jn,d.tooltip=gs,d.transformation=ie,d.version=r,d.videoOverlay=ps;var Ps=window.L;d.noConflict=function(){return window.L=Ps,this},window.L=d})});var Bo=po((ti,Zo)=>{(function(d,r){typeof ti=="object"&&typeof Zo<"u"?r(ti):typeof define=="function"&&define.amd?define(["exports"],r):(d=d||self,r((d.Leaflet=d.Leaflet||{},d.Leaflet.markercluster={})))})(ti,function(d){"use strict";var r=L.MarkerClusterGroup=L.FeatureGroup.extend({options:{maxClusterRadius:80,iconCreateFunction:null,clusterPane:L.Marker.prototype.options.pane,spiderfyOnEveryZoom:!1,spiderfyOnMaxZoom:!0,showCoverageOnHover:!0,zoomToBoundsOnClick:!0,singleMarkerMode:!1,disableClusteringAtZoom:null,removeOutsideVisibleBounds:!0,animate:!0,animateAddingMarkers:!1,spiderfyShapePositions:null,spiderfyDistanceMultiplier:1,spiderLegPolylineOptions:{weight:1.5,color:"#222",opacity:.5},chunkedLoading:!1,chunkInterval:200,chunkDelay:50,chunkProgress:null,polygonOptions:{}},initialize:function(o){L.Util.setOptions(this,o),this.options.iconCreateFunction||(this.options.iconCreateFunction=this._defaultIconCreateFunction),this._featureGroup=L.featureGroup(),this._featureGroup.addEventParent(this),this._nonPointGroup=L.featureGroup(),this._nonPointGroup.addEventParent(this),this._inZoomAnimation=0,this._needsClustering=[],this._needsRemoving=[],this._currentShownBounds=null,this._queue=[],this._childMarkerEventHandlers={dragstart:this._childMarkerDragStart,move:this._childMarkerMoved,dragend:this._childMarkerDragEnd};var l=L.DomUtil.TRANSITION&&this.options.animate;L.extend(this,l?this._withAnimation:this._noAnimation),this._markerCluster=l?L.MarkerCluster:L.MarkerClusterNonAnimated},addLayer:function(o){if(o instanceof L.LayerGroup)return this.addLayers([o]);if(!o.getLatLng)return this._nonPointGroup.addLayer(o),this.fire("layeradd",{layer:o}),this;if(!this._map)return this._needsClustering.push(o),this.fire("layeradd",{layer:o}),this;if(this.hasLayer(o))return this;this._unspiderfy&&this._unspiderfy(),this._addLayer(o,this._maxZoom),this.fire("layeradd",{layer:o}),this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons();var l=o,u=this._zoom;if(o.__parent)for(;l.__parent._zoom>=u;)l=l.__parent;return this._currentShownBounds.contains(l.getLatLng())&&(this.options.animateAddingMarkers?this._animationAddLayer(o,l):this._animationAddLayerNonAnimated(o,l)),this},removeLayer:function(o){return o instanceof L.LayerGroup?this.removeLayers([o]):o.getLatLng?this._map?o.__parent?(this._unspiderfy&&(this._unspiderfy(),this._unspiderfyLayer(o)),this._removeLayer(o,!0),this.fire("layerremove",{layer:o}),this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),o.off(this._childMarkerEventHandlers,this),this._featureGroup.hasLayer(o)&&(this._featureGroup.removeLayer(o),o.clusterShow&&o.clusterShow()),this):this:(!this._arraySplice(this._needsClustering,o)&&this.hasLayer(o)&&this._needsRemoving.push({layer:o,latlng:o._latlng}),this.fire("layerremove",{layer:o}),this):(this._nonPointGroup.removeLayer(o),this.fire("layerremove",{layer:o}),this)},addLayers:function(o,l){if(!L.Util.isArray(o))return this.addLayer(o);var u=this._featureGroup,c=this._nonPointGroup,_=this.options.chunkedLoading,g=this.options.chunkInterval,p=this.options.chunkProgress,x=o.length,y=0,C=!0,P;if(this._map){var R=new Date().getTime(),A=L.bind(function(){var W=new Date().getTime();for(this._map&&this._unspiderfy&&this._unspiderfy();y<x;y++){if(_&&y%200===0){var xt=new Date().getTime()-W;if(xt>g)break}if(P=o[y],P instanceof L.LayerGroup){C&&(o=o.slice(),C=!1),this._extractNonGroupLayers(P,o),x=o.length;continue}if(!P.getLatLng){c.addLayer(P),l||this.fire("layeradd",{layer:P});continue}if(!this.hasLayer(P)&&(this._addLayer(P,this._maxZoom),l||this.fire("layeradd",{layer:P}),P.__parent&&P.__parent.getChildCount()===2)){var lt=P.__parent.getAllChildMarkers(),te=lt[0]===P?lt[1]:lt[0];u.removeLayer(te)}}p&&p(y,x,new Date().getTime()-R),y===x?(this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds)):setTimeout(A,this.options.chunkDelay)},this);A()}else for(var G=this._needsClustering;y<x;y++){if(P=o[y],P instanceof L.LayerGroup){C&&(o=o.slice(),C=!1),this._extractNonGroupLayers(P,o),x=o.length;continue}if(!P.getLatLng){c.addLayer(P);continue}this.hasLayer(P)||G.push(P)}return this},removeLayers:function(o){var l,u,c=o.length,_=this._featureGroup,g=this._nonPointGroup,p=!0;if(!this._map){for(l=0;l<c;l++){if(u=o[l],u instanceof L.LayerGroup){p&&(o=o.slice(),p=!1),this._extractNonGroupLayers(u,o),c=o.length;continue}this._arraySplice(this._needsClustering,u),g.removeLayer(u),this.hasLayer(u)&&this._needsRemoving.push({layer:u,latlng:u._latlng}),this.fire("layerremove",{layer:u})}return this}if(this._unspiderfy){this._unspiderfy();var x=o.slice(),y=c;for(l=0;l<y;l++){if(u=x[l],u instanceof L.LayerGroup){this._extractNonGroupLayers(u,x),y=x.length;continue}this._unspiderfyLayer(u)}}for(l=0;l<c;l++){if(u=o[l],u instanceof L.LayerGroup){p&&(o=o.slice(),p=!1),this._extractNonGroupLayers(u,o),c=o.length;continue}if(!u.__parent){g.removeLayer(u),this.fire("layerremove",{layer:u});continue}this._removeLayer(u,!0,!0),this.fire("layerremove",{layer:u}),_.hasLayer(u)&&(_.removeLayer(u),u.clusterShow&&u.clusterShow())}return this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds),this},clearLayers:function(){return this._map||(this._needsClustering=[],this._needsRemoving=[],delete this._gridClusters,delete this._gridUnclustered),this._noanimationUnspiderfy&&this._noanimationUnspiderfy(),this._featureGroup.clearLayers(),this._nonPointGroup.clearLayers(),this.eachLayer(function(o){o.off(this._childMarkerEventHandlers,this),delete o.__parent},this),this._map&&this._generateInitialClusters(),this},getBounds:function(){var o=new L.LatLngBounds;this._topClusterLevel&&o.extend(this._topClusterLevel._bounds);for(var l=this._needsClustering.length-1;l>=0;l--)o.extend(this._needsClustering[l].getLatLng());return o.extend(this._nonPointGroup.getBounds()),o},eachLayer:function(o,l){var u=this._needsClustering.slice(),c=this._needsRemoving,_,g,p;for(this._topClusterLevel&&this._topClusterLevel.getAllChildMarkers(u),g=u.length-1;g>=0;g--){for(_=!0,p=c.length-1;p>=0;p--)if(c[p].layer===u[g]){_=!1;break}_&&o.call(l,u[g])}this._nonPointGroup.eachLayer(o,l)},getLayers:function(){var o=[];return this.eachLayer(function(l){o.push(l)}),o},getLayer:function(o){var l=null;return o=parseInt(o,10),this.eachLayer(function(u){L.stamp(u)===o&&(l=u)}),l},hasLayer:function(o){if(!o)return!1;var l,u=this._needsClustering;for(l=u.length-1;l>=0;l--)if(u[l]===o)return!0;for(u=this._needsRemoving,l=u.length-1;l>=0;l--)if(u[l].layer===o)return!1;return!!(o.__parent&&o.__parent._group===this)||this._nonPointGroup.hasLayer(o)},zoomToShowLayer:function(o,l){var u=this._map;typeof l!="function"&&(l=function(){});var c=function(){(u.hasLayer(o)||u.hasLayer(o.__parent))&&!this._inZoomAnimation&&(this._map.off("moveend",c,this),this.off("animationend",c,this),u.hasLayer(o)?l():o.__parent._icon&&(this.once("spiderfied",l,this),o.__parent.spiderfy()))};o._icon&&this._map.getBounds().contains(o.getLatLng())?l():o.__parent._zoom<Math.round(this._map._zoom)?(this._map.on("moveend",c,this),this._map.panTo(o.getLatLng())):(this._map.on("moveend",c,this),this.on("animationend",c,this),o.__parent.zoomToBounds())},onAdd:function(o){this._map=o;var l,u,c;if(!isFinite(this._map.getMaxZoom()))throw"Map has no maxZoom specified";for(this._featureGroup.addTo(o),this._nonPointGroup.addTo(o),this._gridClusters||this._generateInitialClusters(),this._maxLat=o.options.crs.projection.MAX_LATITUDE,l=0,u=this._needsRemoving.length;l<u;l++)c=this._needsRemoving[l],c.newlatlng=c.layer._latlng,c.layer._latlng=c.latlng;for(l=0,u=this._needsRemoving.length;l<u;l++)c=this._needsRemoving[l],this._removeLayer(c.layer,!0),c.layer._latlng=c.newlatlng;this._needsRemoving=[],this._zoom=Math.round(this._map._zoom),this._currentShownBounds=this._getExpandedVisibleBounds(),this._map.on("zoomend",this._zoomEnd,this),this._map.on("moveend",this._moveEnd,this),this._spiderfierOnAdd&&this._spiderfierOnAdd(),this._bindEvents(),u=this._needsClustering,this._needsClustering=[],this.addLayers(u,!0)},onRemove:function(o){o.off("zoomend",this._zoomEnd,this),o.off("moveend",this._moveEnd,this),this._unbindEvents(),this._map._mapPane.className=this._map._mapPane.className.replace(" leaflet-cluster-anim",""),this._spiderfierOnRemove&&this._spiderfierOnRemove(),delete this._maxLat,this._hideCoverage(),this._featureGroup.remove(),this._nonPointGroup.remove(),this._featureGroup.clearLayers(),this._map=null},getVisibleParent:function(o){for(var l=o;l&&!l._icon;)l=l.__parent;return l||null},_arraySplice:function(o,l){for(var u=o.length-1;u>=0;u--)if(o[u]===l)return o.splice(u,1),!0},_removeFromGridUnclustered:function(o,l){for(var u=this._map,c=this._gridUnclustered,_=Math.floor(this._map.getMinZoom());l>=_&&c[l].removeObject(o,u.project(o.getLatLng(),l));l--);},_childMarkerDragStart:function(o){o.target.__dragStart=o.target._latlng},_childMarkerMoved:function(o){if(!this._ignoreMove&&!o.target.__dragStart){var l=o.target._popup&&o.target._popup.isOpen();this._moveChild(o.target,o.oldLatLng,o.latlng),l&&o.target.openPopup()}},_moveChild:function(o,l,u){o._latlng=l,this.removeLayer(o),o._latlng=u,this.addLayer(o)},_childMarkerDragEnd:function(o){var l=o.target.__dragStart;delete o.target.__dragStart,l&&this._moveChild(o.target,l,o.target._latlng)},_removeLayer:function(o,l,u){var c=this._gridClusters,_=this._gridUnclustered,g=this._featureGroup,p=this._map,x=Math.floor(this._map.getMinZoom());l&&this._removeFromGridUnclustered(o,this._maxZoom);var y=o.__parent,C=y._markers,P;for(this._arraySplice(C,o);y&&(y._childCount--,y._boundsNeedUpdate=!0,!(y._zoom<x));)l&&y._childCount<=1?(P=y._markers[0]===o?y._markers[1]:y._markers[0],c[y._zoom].removeObject(y,p.project(y._cLatLng,y._zoom)),_[y._zoom].addObject(P,p.project(P.getLatLng(),y._zoom)),this._arraySplice(y.__parent._childClusters,y),y.__parent._markers.push(P),P.__parent=y.__parent,y._icon&&(g.removeLayer(y),u||g.addLayer(P))):y._iconNeedsUpdate=!0,y=y.__parent;delete o.__parent},_isOrIsParent:function(o,l){for(;l;){if(o===l)return!0;l=l.parentNode}return!1},fire:function(o,l,u){if(l&&l.layer instanceof L.MarkerCluster){if(l.originalEvent&&this._isOrIsParent(l.layer._icon,l.originalEvent.relatedTarget))return;o="cluster"+o}L.FeatureGroup.prototype.fire.call(this,o,l,u)},listens:function(o,l){return L.FeatureGroup.prototype.listens.call(this,o,l)||L.FeatureGroup.prototype.listens.call(this,"cluster"+o,l)},_defaultIconCreateFunction:function(o){var l=o.getChildCount(),u=" marker-cluster-";return l<10?u+="small":l<100?u+="medium":u+="large",new L.DivIcon({html:"<div><span>"+l+"</span></div>",className:"marker-cluster"+u,iconSize:new L.Point(40,40)})},_bindEvents:function(){var o=this._map,l=this.options.spiderfyOnMaxZoom,u=this.options.showCoverageOnHover,c=this.options.zoomToBoundsOnClick,_=this.options.spiderfyOnEveryZoom;(l||c||_)&&this.on("clusterclick clusterkeypress",this._zoomOrSpiderfy,this),u&&(this.on("clustermouseover",this._showCoverage,this),this.on("clustermouseout",this._hideCoverage,this),o.on("zoomend",this._hideCoverage,this))},_zoomOrSpiderfy:function(o){var l=o.layer,u=l;if(!(o.type==="clusterkeypress"&&o.originalEvent&&o.originalEvent.keyCode!==13)){for(;u._childClusters.length===1;)u=u._childClusters[0];u._zoom===this._maxZoom&&u._childCount===l._childCount&&this.options.spiderfyOnMaxZoom?l.spiderfy():this.options.zoomToBoundsOnClick&&l.zoomToBounds(),this.options.spiderfyOnEveryZoom&&l.spiderfy(),o.originalEvent&&o.originalEvent.keyCode===13&&this._map._container.focus()}},_showCoverage:function(o){var l=this._map;this._inZoomAnimation||(this._shownPolygon&&l.removeLayer(this._shownPolygon),o.layer.getChildCount()>2&&o.layer!==this._spiderfied&&(this._shownPolygon=new L.Polygon(o.layer.getConvexHull(),this.options.polygonOptions),l.addLayer(this._shownPolygon)))},_hideCoverage:function(){this._shownPolygon&&(this._map.removeLayer(this._shownPolygon),this._shownPolygon=null)},_unbindEvents:function(){var o=this.options.spiderfyOnMaxZoom,l=this.options.showCoverageOnHover,u=this.options.zoomToBoundsOnClick,c=this.options.spiderfyOnEveryZoom,_=this._map;(o||u||c)&&this.off("clusterclick clusterkeypress",this._zoomOrSpiderfy,this),l&&(this.off("clustermouseover",this._showCoverage,this),this.off("clustermouseout",this._hideCoverage,this),_.off("zoomend",this._hideCoverage,this))},_zoomEnd:function(){this._map&&(this._mergeSplitClusters(),this._zoom=Math.round(this._map._zoom),this._currentShownBounds=this._getExpandedVisibleBounds())},_moveEnd:function(){if(!this._inZoomAnimation){var o=this._getExpandedVisibleBounds();this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),this._zoom,o),this._topClusterLevel._recursivelyAddChildrenToMap(null,Math.round(this._map._zoom),o),this._currentShownBounds=o}},_generateInitialClusters:function(){var o=Math.ceil(this._map.getMaxZoom()),l=Math.floor(this._map.getMinZoom()),u=this.options.maxClusterRadius,c=u;typeof u!="function"&&(c=function(){return u}),this.options.disableClusteringAtZoom!==null&&(o=this.options.disableClusteringAtZoom-1),this._maxZoom=o,this._gridClusters={},this._gridUnclustered={};for(var _=o;_>=l;_--)this._gridClusters[_]=new L.DistanceGrid(c(_)),this._gridUnclustered[_]=new L.DistanceGrid(c(_));this._topClusterLevel=new this._markerCluster(this,l-1)},_addLayer:function(o,l){var u=this._gridClusters,c=this._gridUnclustered,_=Math.floor(this._map.getMinZoom()),g,p;for(this.options.singleMarkerMode&&this._overrideMarkerIcon(o),o.on(this._childMarkerEventHandlers,this);l>=_;l--){g=this._map.project(o.getLatLng(),l);var x=u[l].getNearObject(g);if(x){x._addChild(o),o.__parent=x;return}if(x=c[l].getNearObject(g),x){var y=x.__parent;y&&this._removeLayer(x,!1);var C=new this._markerCluster(this,l,x,o);u[l].addObject(C,this._map.project(C._cLatLng,l)),x.__parent=C,o.__parent=C;var P=C;for(p=l-1;p>y._zoom;p--)P=new this._markerCluster(this,p,P),u[p].addObject(P,this._map.project(x.getLatLng(),p));y._addChild(P),this._removeFromGridUnclustered(x,l);return}c[l].addObject(o,g)}this._topClusterLevel._addChild(o),o.__parent=this._topClusterLevel},_refreshClustersIcons:function(){this._featureGroup.eachLayer(function(o){o instanceof L.MarkerCluster&&o._iconNeedsUpdate&&o._updateIcon()})},_enqueue:function(o){this._queue.push(o),this._queueTimeout||(this._queueTimeout=setTimeout(L.bind(this._processQueue,this),300))},_processQueue:function(){for(var o=0;o<this._queue.length;o++)this._queue[o].call(this);this._queue.length=0,clearTimeout(this._queueTimeout),this._queueTimeout=null},_mergeSplitClusters:function(){var o=Math.round(this._map._zoom);this._processQueue(),this._zoom<o&&this._currentShownBounds.intersects(this._getExpandedVisibleBounds())?(this._animationStart(),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),this._zoom,this._getExpandedVisibleBounds()),this._animationZoomIn(this._zoom,o)):this._zoom>o?(this._animationStart(),this._animationZoomOut(this._zoom,o)):this._moveEnd()},_getExpandedVisibleBounds:function(){if(this.options.removeOutsideVisibleBounds){if(L.Browser.mobile)return this._checkBoundsMaxLat(this._map.getBounds())}else return this._mapBoundsInfinite;return this._checkBoundsMaxLat(this._map.getBounds().pad(1))},_checkBoundsMaxLat:function(o){var l=this._maxLat;return l!==void 0&&(o.getNorth()>=l&&(o._northEast.lat=1/0),o.getSouth()<=-l&&(o._southWest.lat=-1/0)),o},_animationAddLayerNonAnimated:function(o,l){if(l===o)this._featureGroup.addLayer(o);else if(l._childCount===2){l._addToMap();var u=l.getAllChildMarkers();this._featureGroup.removeLayer(u[0]),this._featureGroup.removeLayer(u[1])}else l._updateIcon()},_extractNonGroupLayers:function(o,l){var u=o.getLayers(),c=0,_;for(l=l||[];c<u.length;c++){if(_=u[c],_ instanceof L.LayerGroup){this._extractNonGroupLayers(_,l);continue}l.push(_)}return l},_overrideMarkerIcon:function(o){var l=o.options.icon=this.options.iconCreateFunction({getChildCount:function(){return 1},getAllChildMarkers:function(){return[o]}});return l}});L.MarkerClusterGroup.include({_mapBoundsInfinite:new L.LatLngBounds(new L.LatLng(-1/0,-1/0),new L.LatLng(1/0,1/0))}),L.MarkerClusterGroup.include({_noAnimation:{_animationStart:function(){},_animationZoomIn:function(o,l){this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),o),this._topClusterLevel._recursivelyAddChildrenToMap(null,l,this._getExpandedVisibleBounds()),this.fire("animationend")},_animationZoomOut:function(o,l){this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),o),this._topClusterLevel._recursivelyAddChildrenToMap(null,l,this._getExpandedVisibleBounds()),this.fire("animationend")},_animationAddLayer:function(o,l){this._animationAddLayerNonAnimated(o,l)}},_withAnimation:{_animationStart:function(){this._map._mapPane.className+=" leaflet-cluster-anim",this._inZoomAnimation++},_animationZoomIn:function(o,l){var u=this._getExpandedVisibleBounds(),c=this._featureGroup,_=Math.floor(this._map.getMinZoom()),g;this._ignoreMove=!0,this._topClusterLevel._recursively(u,o,_,function(p){var x=p._latlng,y=p._markers,C;for(u.contains(x)||(x=null),p._isSingleParent()&&o+1===l?(c.removeLayer(p),p._recursivelyAddChildrenToMap(null,l,u)):(p.clusterHide(),p._recursivelyAddChildrenToMap(x,l,u)),g=y.length-1;g>=0;g--)C=y[g],u.contains(C._latlng)||c.removeLayer(C)}),this._forceLayout(),this._topClusterLevel._recursivelyBecomeVisible(u,l),c.eachLayer(function(p){!(p instanceof L.MarkerCluster)&&p._icon&&p.clusterShow()}),this._topClusterLevel._recursively(u,o,l,function(p){p._recursivelyRestoreChildPositions(l)}),this._ignoreMove=!1,this._enqueue(function(){this._topClusterLevel._recursively(u,o,_,function(p){c.removeLayer(p),p.clusterShow()}),this._animationEnd()})},_animationZoomOut:function(o,l){this._animationZoomOutSingle(this._topClusterLevel,o-1,l),this._topClusterLevel._recursivelyAddChildrenToMap(null,l,this._getExpandedVisibleBounds()),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),o,this._getExpandedVisibleBounds())},_animationAddLayer:function(o,l){var u=this,c=this._featureGroup;c.addLayer(o),l!==o&&(l._childCount>2?(l._updateIcon(),this._forceLayout(),this._animationStart(),o._setPos(this._map.latLngToLayerPoint(l.getLatLng())),o.clusterHide(),this._enqueue(function(){c.removeLayer(o),o.clusterShow(),u._animationEnd()})):(this._forceLayout(),u._animationStart(),u._animationZoomOutSingle(l,this._map.getMaxZoom(),this._zoom)))}},_animationZoomOutSingle:function(o,l,u){var c=this._getExpandedVisibleBounds(),_=Math.floor(this._map.getMinZoom());o._recursivelyAnimateChildrenInAndAddSelfToMap(c,_,l+1,u);var g=this;this._forceLayout(),o._recursivelyBecomeVisible(c,u),this._enqueue(function(){if(o._childCount===1){var p=o._markers[0];this._ignoreMove=!0,p.setLatLng(p.getLatLng()),this._ignoreMove=!1,p.clusterShow&&p.clusterShow()}else o._recursively(c,u,_,function(x){x._recursivelyRemoveChildrenFromMap(c,_,l+1)});g._animationEnd()})},_animationEnd:function(){this._map&&(this._map._mapPane.className=this._map._mapPane.className.replace(" leaflet-cluster-anim","")),this._inZoomAnimation--,this.fire("animationend")},_forceLayout:function(){L.Util.falseFn(document.body.offsetWidth)}}),L.markerClusterGroup=function(o){return new L.MarkerClusterGroup(o)};var a=L.MarkerCluster=L.Marker.extend({options:L.Icon.prototype.options,initialize:function(o,l,u,c){L.Marker.prototype.initialize.call(this,u?u._cLatLng||u.getLatLng():new L.LatLng(0,0),{icon:this,pane:o.options.clusterPane}),this._group=o,this._zoom=l,this._markers=[],this._childClusters=[],this._childCount=0,this._iconNeedsUpdate=!0,this._boundsNeedUpdate=!0,this._bounds=new L.LatLngBounds,u&&this._addChild(u),c&&this._addChild(c)},getAllChildMarkers:function(o,l){o=o||[];for(var u=this._childClusters.length-1;u>=0;u--)this._childClusters[u].getAllChildMarkers(o,l);for(var c=this._markers.length-1;c>=0;c--)l&&this._markers[c].__dragStart||o.push(this._markers[c]);return o},getChildCount:function(){return this._childCount},zoomToBounds:function(o){for(var l=this._childClusters.slice(),u=this._group._map,c=u.getBoundsZoom(this._bounds),_=this._zoom+1,g=u.getZoom(),p;l.length>0&&c>_;){_++;var x=[];for(p=0;p<l.length;p++)x=x.concat(l[p]._childClusters);l=x}c>_?this._group._map.setView(this._latlng,_):c<=g?this._group._map.setView(this._latlng,g+1):this._group._map.fitBounds(this._bounds,o)},getBounds:function(){var o=new L.LatLngBounds;return o.extend(this._bounds),o},_updateIcon:function(){this._iconNeedsUpdate=!0,this._icon&&this.setIcon(this)},createIcon:function(){return this._iconNeedsUpdate&&(this._iconObj=this._group.options.iconCreateFunction(this),this._iconNeedsUpdate=!1),this._iconObj.createIcon()},createShadow:function(){return this._iconObj.createShadow()},_addChild:function(o,l){this._iconNeedsUpdate=!0,this._boundsNeedUpdate=!0,this._setClusterCenter(o),o instanceof L.MarkerCluster?(l||(this._childClusters.push(o),o.__parent=this),this._childCount+=o._childCount):(l||this._markers.push(o),this._childCount++),this.__parent&&this.__parent._addChild(o,!0)},_setClusterCenter:function(o){this._cLatLng||(this._cLatLng=o._cLatLng||o._latlng)},_resetBounds:function(){var o=this._bounds;o._southWest&&(o._southWest.lat=1/0,o._southWest.lng=1/0),o._northEast&&(o._northEast.lat=-1/0,o._northEast.lng=-1/0)},_recalculateBounds:function(){var o=this._markers,l=this._childClusters,u=0,c=0,_=this._childCount,g,p,x,y;if(_!==0){for(this._resetBounds(),g=0;g<o.length;g++)x=o[g]._latlng,this._bounds.extend(x),u+=x.lat,c+=x.lng;for(g=0;g<l.length;g++)p=l[g],p._boundsNeedUpdate&&p._recalculateBounds(),this._bounds.extend(p._bounds),x=p._wLatLng,y=p._childCount,u+=x.lat*y,c+=x.lng*y;this._latlng=this._wLatLng=new L.LatLng(u/_,c/_),this._boundsNeedUpdate=!1}},_addToMap:function(o){o&&(this._backupLatlng=this._latlng,this.setLatLng(o)),this._group._featureGroup.addLayer(this)},_recursivelyAnimateChildrenIn:function(o,l,u){this._recursively(o,this._group._map.getMinZoom(),u-1,function(c){var _=c._markers,g,p;for(g=_.length-1;g>=0;g--)p=_[g],p._icon&&(p._setPos(l),p.clusterHide())},function(c){var _=c._childClusters,g,p;for(g=_.length-1;g>=0;g--)p=_[g],p._icon&&(p._setPos(l),p.clusterHide())})},_recursivelyAnimateChildrenInAndAddSelfToMap:function(o,l,u,c){this._recursively(o,c,l,function(_){_._recursivelyAnimateChildrenIn(o,_._group._map.latLngToLayerPoint(_.getLatLng()).round(),u),_._isSingleParent()&&u-1===c?(_.clusterShow(),_._recursivelyRemoveChildrenFromMap(o,l,u)):_.clusterHide(),_._addToMap()})},_recursivelyBecomeVisible:function(o,l){this._recursively(o,this._group._map.getMinZoom(),l,null,function(u){u.clusterShow()})},_recursivelyAddChildrenToMap:function(o,l,u){this._recursively(u,this._group._map.getMinZoom()-1,l,function(c){if(l!==c._zoom)for(var _=c._markers.length-1;_>=0;_--){var g=c._markers[_];u.contains(g._latlng)&&(o&&(g._backupLatlng=g.getLatLng(),g.setLatLng(o),g.clusterHide&&g.clusterHide()),c._group._featureGroup.addLayer(g))}},function(c){c._addToMap(o)})},_recursivelyRestoreChildPositions:function(o){for(var l=this._markers.length-1;l>=0;l--){var u=this._markers[l];u._backupLatlng&&(u.setLatLng(u._backupLatlng),delete u._backupLatlng)}if(o-1===this._zoom)for(var c=this._childClusters.length-1;c>=0;c--)this._childClusters[c]._restorePosition();else for(var _=this._childClusters.length-1;_>=0;_--)this._childClusters[_]._recursivelyRestoreChildPositions(o)},_restorePosition:function(){this._backupLatlng&&(this.setLatLng(this._backupLatlng),delete this._backupLatlng)},_recursivelyRemoveChildrenFromMap:function(o,l,u,c){var _,g;this._recursively(o,l-1,u-1,function(p){for(g=p._markers.length-1;g>=0;g--)_=p._markers[g],(!c||!c.contains(_._latlng))&&(p._group._featureGroup.removeLayer(_),_.clusterShow&&_.clusterShow())},function(p){for(g=p._childClusters.length-1;g>=0;g--)_=p._childClusters[g],(!c||!c.contains(_._latlng))&&(p._group._featureGroup.removeLayer(_),_.clusterShow&&_.clusterShow())})},_recursively:function(o,l,u,c,_){var g=this._childClusters,p=this._zoom,x,y;if(l<=p&&(c&&c(this),_&&p===u&&_(this)),p<l||p<u)for(x=g.length-1;x>=0;x--)y=g[x],y._boundsNeedUpdate&&y._recalculateBounds(),o.intersects(y._bounds)&&y._recursively(o,l,u,c,_)},_isSingleParent:function(){return this._childClusters.length>0&&this._childClusters[0]._childCount===this._childCount}});L.Marker.include({clusterHide:function(){var o=this.options.opacity;return this.setOpacity(0),this.options.opacity=o,this},clusterShow:function(){return this.setOpacity(this.options.opacity)}}),L.DistanceGrid=function(o){this._cellSize=o,this._sqCellSize=o*o,this._grid={},this._objectPoint={}},L.DistanceGrid.prototype={addObject:function(o,l){var u=this._getCoord(l.x),c=this._getCoord(l.y),_=this._grid,g=_[c]=_[c]||{},p=g[u]=g[u]||[],x=L.Util.stamp(o);this._objectPoint[x]=l,p.push(o)},updateObject:function(o,l){this.removeObject(o),this.addObject(o,l)},removeObject:function(o,l){var u=this._getCoord(l.x),c=this._getCoord(l.y),_=this._grid,g=_[c]=_[c]||{},p=g[u]=g[u]||[],x,y;for(delete this._objectPoint[L.Util.stamp(o)],x=0,y=p.length;x<y;x++)if(p[x]===o)return p.splice(x,1),y===1&&delete g[u],!0},eachObject:function(o,l){var u,c,_,g,p,x,y,C=this._grid;for(u in C){p=C[u];for(c in p)for(x=p[c],_=0,g=x.length;_<g;_++)y=o.call(l,x[_]),y&&(_--,g--)}},getNearObject:function(o){var l=this._getCoord(o.x),u=this._getCoord(o.y),c,_,g,p,x,y,C,P,R=this._objectPoint,A=this._sqCellSize,G=null;for(c=u-1;c<=u+1;c++)if(p=this._grid[c],p){for(_=l-1;_<=l+1;_++)if(x=p[_],x)for(g=0,y=x.length;g<y;g++)C=x[g],P=this._sqDist(R[L.Util.stamp(C)],o),(P<A||P<=A&&G===null)&&(A=P,G=C)}return G},_getCoord:function(o){var l=Math.floor(o/this._cellSize);return isFinite(l)?l:o},_sqDist:function(o,l){var u=l.x-o.x,c=l.y-o.y;return u*u+c*c}},function(){L.QuickHull={getDistant:function(o,l){var u=l[1].lat-l[0].lat,c=l[0].lng-l[1].lng;return c*(o.lat-l[0].lat)+u*(o.lng-l[0].lng)},findMostDistantPointFromBaseLine:function(o,l){var u=0,c=null,_=[],g,p,x;for(g=l.length-1;g>=0;g--){if(p=l[g],x=this.getDistant(p,o),x>0)_.push(p);else continue;x>u&&(u=x,c=p)}return{maxPoint:c,newPoints:_}},buildConvexHull:function(o,l){var u=[],c=this.findMostDistantPointFromBaseLine(o,l);return c.maxPoint?(u=u.concat(this.buildConvexHull([o[0],c.maxPoint],c.newPoints)),u=u.concat(this.buildConvexHull([c.maxPoint,o[1]],c.newPoints)),u):[o[0]]},getConvexHull:function(o){var l=!1,u=!1,c=!1,_=!1,g=null,p=null,x=null,y=null,C=null,P=null,R;for(R=o.length-1;R>=0;R--){var A=o[R];(l===!1||A.lat>l)&&(g=A,l=A.lat),(u===!1||A.lat<u)&&(p=A,u=A.lat),(c===!1||A.lng>c)&&(x=A,c=A.lng),(_===!1||A.lng<_)&&(y=A,_=A.lng)}u!==l?(P=p,C=g):(P=y,C=x);var G=[].concat(this.buildConvexHull([P,C],o),this.buildConvexHull([C,P],o));return G}}}(),L.MarkerCluster.include({getConvexHull:function(){var o=this.getAllChildMarkers(),l=[],u,c;for(c=o.length-1;c>=0;c--)u=o[c].getLatLng(),l.push(u);return L.QuickHull.getConvexHull(l)}}),L.MarkerCluster.include({_2PI:Math.PI*2,_circleFootSeparation:25,_circleStartAngle:0,_spiralFootSeparation:28,_spiralLengthStart:11,_spiralLengthFactor:5,_circleSpiralSwitchover:9,spiderfy:function(){if(!(this._group._spiderfied===this||this._group._inZoomAnimation)){var o=this.getAllChildMarkers(null,!0),l=this._group,u=l._map,c=u.latLngToLayerPoint(this._latlng),_;this._group._unspiderfy(),this._group._spiderfied=this,this._group.options.spiderfyShapePositions?_=this._group.options.spiderfyShapePositions(o.length,c):o.length>=this._circleSpiralSwitchover?_=this._generatePointsSpiral(o.length,c):(c.y+=10,_=this._generatePointsCircle(o.length,c)),this._animationSpiderfy(o,_)}},unspiderfy:function(o){this._group._inZoomAnimation||(this._animationUnspiderfy(o),this._group._spiderfied=null)},_generatePointsCircle:function(o,l){var u=this._group.options.spiderfyDistanceMultiplier*this._circleFootSeparation*(2+o),c=u/this._2PI,_=this._2PI/o,g=[],p,x;for(c=Math.max(c,35),g.length=o,p=0;p<o;p++)x=this._circleStartAngle+p*_,g[p]=new L.Point(l.x+c*Math.cos(x),l.y+c*Math.sin(x))._round();return g},_generatePointsSpiral:function(o,l){var u=this._group.options.spiderfyDistanceMultiplier,c=u*this._spiralLengthStart,_=u*this._spiralFootSeparation,g=u*this._spiralLengthFactor*this._2PI,p=0,x=[],y;for(x.length=o,y=o;y>=0;y--)y<o&&(x[y]=new L.Point(l.x+c*Math.cos(p),l.y+c*Math.sin(p))._round()),p+=_/c+y*5e-4,c+=g/p;return x},_noanimationUnspiderfy:function(){var o=this._group,l=o._map,u=o._featureGroup,c=this.getAllChildMarkers(null,!0),_,g;for(o._ignoreMove=!0,this.setOpacity(1),g=c.length-1;g>=0;g--)_=c[g],u.removeLayer(_),_._preSpiderfyLatlng&&(_.setLatLng(_._preSpiderfyLatlng),delete _._preSpiderfyLatlng),_.setZIndexOffset&&_.setZIndexOffset(0),_._spiderLeg&&(l.removeLayer(_._spiderLeg),delete _._spiderLeg);o.fire("unspiderfied",{cluster:this,markers:c}),o._ignoreMove=!1,o._spiderfied=null}}),L.MarkerClusterNonAnimated=L.MarkerCluster.extend({_animationSpiderfy:function(o,l){var u=this._group,c=u._map,_=u._featureGroup,g=this._group.options.spiderLegPolylineOptions,p,x,y,C;for(u._ignoreMove=!0,p=0;p<o.length;p++)C=c.layerPointToLatLng(l[p]),x=o[p],y=new L.Polyline([this._latlng,C],g),c.addLayer(y),x._spiderLeg=y,x._preSpiderfyLatlng=x._latlng,x.setLatLng(C),x.setZIndexOffset&&x.setZIndexOffset(1e6),_.addLayer(x);this.setOpacity(.3),u._ignoreMove=!1,u.fire("spiderfied",{cluster:this,markers:o})},_animationUnspiderfy:function(){this._noanimationUnspiderfy()}}),L.MarkerCluster.include({_animationSpiderfy:function(o,l){var u=this,c=this._group,_=c._map,g=c._featureGroup,p=this._latlng,x=_.latLngToLayerPoint(p),y=L.Path.SVG,C=L.extend({},this._group.options.spiderLegPolylineOptions),P=C.opacity,R,A,G,W,xt,lt;for(P===void 0&&(P=L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity),y?(C.opacity=0,C.className=(C.className||"")+" leaflet-cluster-spider-leg"):C.opacity=P,c._ignoreMove=!0,R=0;R<o.length;R++)A=o[R],lt=_.layerPointToLatLng(l[R]),G=new L.Polyline([p,lt],C),_.addLayer(G),A._spiderLeg=G,y&&(W=G._path,xt=W.getTotalLength()+.1,W.style.strokeDasharray=xt,W.style.strokeDashoffset=xt),A.setZIndexOffset&&A.setZIndexOffset(1e6),A.clusterHide&&A.clusterHide(),g.addLayer(A),A._setPos&&A._setPos(x);for(c._forceLayout(),c._animationStart(),R=o.length-1;R>=0;R--)lt=_.layerPointToLatLng(l[R]),A=o[R],A._preSpiderfyLatlng=A._latlng,A.setLatLng(lt),A.clusterShow&&A.clusterShow(),y&&(G=A._spiderLeg,W=G._path,W.style.strokeDashoffset=0,G.setStyle({opacity:P}));this.setOpacity(.3),c._ignoreMove=!1,setTimeout(function(){c._animationEnd(),c.fire("spiderfied",{cluster:u,markers:o})},200)},_animationUnspiderfy:function(o){var l=this,u=this._group,c=u._map,_=u._featureGroup,g=o?c._latLngToNewLayerPoint(this._latlng,o.zoom,o.center):c.latLngToLayerPoint(this._latlng),p=this.getAllChildMarkers(null,!0),x=L.Path.SVG,y,C,P,R,A,G;for(u._ignoreMove=!0,u._animationStart(),this.setOpacity(1),C=p.length-1;C>=0;C--)y=p[C],y._preSpiderfyLatlng&&(y.closePopup(),y.setLatLng(y._preSpiderfyLatlng),delete y._preSpiderfyLatlng,G=!0,y._setPos&&(y._setPos(g),G=!1),y.clusterHide&&(y.clusterHide(),G=!1),G&&_.removeLayer(y),x&&(P=y._spiderLeg,R=P._path,A=R.getTotalLength()+.1,R.style.strokeDashoffset=A,P.setStyle({opacity:0})));u._ignoreMove=!1,setTimeout(function(){var W=0;for(C=p.length-1;C>=0;C--)y=p[C],y._spiderLeg&&W++;for(C=p.length-1;C>=0;C--)y=p[C],y._spiderLeg&&(y.clusterShow&&y.clusterShow(),y.setZIndexOffset&&y.setZIndexOffset(0),W>1&&_.removeLayer(y),c.removeLayer(y._spiderLeg),delete y._spiderLeg);u._animationEnd(),u.fire("unspiderfied",{cluster:l,markers:p})},200)}}),L.MarkerClusterGroup.include({_spiderfied:null,unspiderfy:function(){this._unspiderfy.apply(this,arguments)},_spiderfierOnAdd:function(){this._map.on("click",this._unspiderfyWrapper,this),this._map.options.zoomAnimation&&this._map.on("zoomstart",this._unspiderfyZoomStart,this),this._map.on("zoomend",this._noanimationUnspiderfy,this),L.Browser.touch||this._map.getRenderer(this)},_spiderfierOnRemove:function(){this._map.off("click",this._unspiderfyWrapper,this),this._map.off("zoomstart",this._unspiderfyZoomStart,this),this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._map.off("zoomend",this._noanimationUnspiderfy,this),this._noanimationUnspiderfy()},_unspiderfyZoomStart:function(){this._map&&this._map.on("zoomanim",this._unspiderfyZoomAnim,this)},_unspiderfyZoomAnim:function(o){L.DomUtil.hasClass(this._map._mapPane,"leaflet-touching")||(this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._unspiderfy(o))},_unspiderfyWrapper:function(){this._unspiderfy()},_unspiderfy:function(o){this._spiderfied&&this._spiderfied.unspiderfy(o)},_noanimationUnspiderfy:function(){this._spiderfied&&this._spiderfied._noanimationUnspiderfy()},_unspiderfyLayer:function(o){o._spiderLeg&&(this._featureGroup.removeLayer(o),o.clusterShow&&o.clusterShow(),o.setZIndexOffset&&o.setZIndexOffset(0),this._map.removeLayer(o._spiderLeg),delete o._spiderLeg)}}),L.MarkerClusterGroup.include({refreshClusters:function(o){return o?o instanceof L.MarkerClusterGroup?o=o._topClusterLevel.getAllChildMarkers():o instanceof L.LayerGroup?o=o._layers:o instanceof L.MarkerCluster?o=o.getAllChildMarkers():o instanceof L.Marker&&(o=[o]):o=this._topClusterLevel.getAllChildMarkers(),this._flagParentsIconsNeedUpdate(o),this._refreshClustersIcons(),this.options.singleMarkerMode&&this._refreshSingleMarkerModeMarkers(o),this},_flagParentsIconsNeedUpdate:function(o){var l,u;for(l in o)for(u=o[l].__parent;u;)u._iconNeedsUpdate=!0,u=u.__parent},_refreshSingleMarkerModeMarkers:function(o){var l,u;for(l in o)u=o[l],this.hasLayer(u)&&u.setIcon(this._overrideMarkerIcon(u))}}),L.Marker.include({refreshIconOptions:function(o,l){var u=this.options.icon;return L.setOptions(u,o),this.setIcon(u),l&&this.__parent&&this.__parent._group.refreshClusters(this),this}}),d.MarkerClusterGroup=r,d.MarkerCluster=a,Object.defineProperty(d,"__esModule",{value:!0})})});var Ye=globalThis,Je=Ye.ShadowRoot&&(Ye.ShadyCSS===void 0||Ye.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Di=Symbol(),mo=new WeakMap,me=class{constructor(r,a,o){if(this._$cssResult$=!0,o!==Di)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=a}get styleSheet(){let r=this.o,a=this.t;if(Je&&r===void 0){let o=a!==void 0&&a.length===1;o&&(r=mo.get(a)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),o&&mo.set(a,r))}return r}toString(){return this.cssText}},Jt=d=>new me(typeof d=="string"?d:d+"",void 0,Di),at=(d,...r)=>{let a=d.length===1?d[0]:r.reduce((o,l,u)=>o+(c=>{if(c._$cssResult$===!0)return c.cssText;if(typeof c=="number")return c;throw Error("Value passed to 'css' function must be a 'css' function result: "+c+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(l)+d[u+1],d[0]);return new me(a,d,Di)},go=(d,r)=>{if(Je)d.adoptedStyleSheets=r.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(let a of r){let o=document.createElement("style"),l=Ye.litNonce;l!==void 0&&o.setAttribute("nonce",l),o.textContent=a.cssText,d.appendChild(o)}},Ri=Je?d=>d:d=>d instanceof CSSStyleSheet?(r=>{let a="";for(let o of r.cssRules)a+=o.cssText;return Jt(a)})(d):d;var{is:Rs,defineProperty:Fs,getOwnPropertyDescriptor:Hs,getOwnPropertyNames:Us,getOwnPropertySymbols:Gs,getPrototypeOf:Ws}=Object,zt=globalThis,vo=zt.trustedTypes,qs=vo?vo.emptyScript:"",Vs=zt.reactiveElementPolyfillSupport,ge=(d,r)=>d,Fi={toAttribute(d,r){switch(r){case Boolean:d=d?qs:null;break;case Object:case Array:d=d==null?d:JSON.stringify(d)}return d},fromAttribute(d,r){let a=d;switch(r){case Boolean:a=d!==null;break;case Number:a=d===null?null:Number(d);break;case Object:case Array:try{a=JSON.parse(d)}catch{a=null}}return a}},xo=(d,r)=>!Rs(d,r),yo={attribute:!0,type:String,converter:Fi,reflect:!1,useDefault:!1,hasChanged:xo};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),zt.litPropertyMetadata??(zt.litPropertyMetadata=new WeakMap);var St=class extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??(this.l=[])).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,a=yo){if(a.state&&(a.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((a=Object.create(a)).wrapped=!0),this.elementProperties.set(r,a),!a.noAccessor){let o=Symbol(),l=this.getPropertyDescriptor(r,o,a);l!==void 0&&Fs(this.prototype,r,l)}}static getPropertyDescriptor(r,a,o){let{get:l,set:u}=Hs(this.prototype,r)??{get(){return this[a]},set(c){this[a]=c}};return{get:l,set(c){let _=l?.call(this);u?.call(this,c),this.requestUpdate(r,_,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??yo}static _$Ei(){if(this.hasOwnProperty(ge("elementProperties")))return;let r=Ws(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(ge("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ge("properties"))){let a=this.properties,o=[...Us(a),...Gs(a)];for(let l of o)this.createProperty(l,a[l])}let r=this[Symbol.metadata];if(r!==null){let a=litPropertyMetadata.get(r);if(a!==void 0)for(let[o,l]of a)this.elementProperties.set(o,l)}this._$Eh=new Map;for(let[a,o]of this.elementProperties){let l=this._$Eu(a,o);l!==void 0&&this._$Eh.set(l,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){let a=[];if(Array.isArray(r)){let o=new Set(r.flat(1/0).reverse());for(let l of o)a.unshift(Ri(l))}else r!==void 0&&a.push(Ri(r));return a}static _$Eu(r,a){let o=a.attribute;return o===!1?void 0:typeof o=="string"?o:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(r=>r(this))}addController(r){(this._$EO??(this._$EO=new Set)).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.()}removeController(r){this._$EO?.delete(r)}_$E_(){let r=new Map,a=this.constructor.elementProperties;for(let o of a.keys())this.hasOwnProperty(o)&&(r.set(o,this[o]),delete this[o]);r.size>0&&(this._$Ep=r)}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return go(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(r=>r.hostConnected?.())}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach(r=>r.hostDisconnected?.())}attributeChangedCallback(r,a,o){this._$AK(r,o)}_$ET(r,a){let o=this.constructor.elementProperties.get(r),l=this.constructor._$Eu(r,o);if(l!==void 0&&o.reflect===!0){let u=(o.converter?.toAttribute!==void 0?o.converter:Fi).toAttribute(a,o.type);this._$Em=r,u==null?this.removeAttribute(l):this.setAttribute(l,u),this._$Em=null}}_$AK(r,a){let o=this.constructor,l=o._$Eh.get(r);if(l!==void 0&&this._$Em!==l){let u=o.getPropertyOptions(l),c=typeof u.converter=="function"?{fromAttribute:u.converter}:u.converter?.fromAttribute!==void 0?u.converter:Fi;this._$Em=l;let _=c.fromAttribute(a,u.type);this[l]=_??this._$Ej?.get(l)??_,this._$Em=null}}requestUpdate(r,a,o,l=!1,u){if(r!==void 0){let c=this.constructor;if(l===!1&&(u=this[r]),o??(o=c.getPropertyOptions(r)),!((o.hasChanged??xo)(u,a)||o.useDefault&&o.reflect&&u===this._$Ej?.get(r)&&!this.hasAttribute(c._$Eu(r,o))))return;this.C(r,a,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,a,{useDefault:o,reflect:l,wrapped:u},c){o&&!(this._$Ej??(this._$Ej=new Map)).has(r)&&(this._$Ej.set(r,c??a??this[r]),u!==!0||c!==void 0)||(this._$AL.has(r)||(this.hasUpdated||o||(a=void 0),this._$AL.set(r,a)),l===!0&&this._$Em!==r&&(this._$Eq??(this._$Eq=new Set)).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[l,u]of this._$Ep)this[l]=u;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[l,u]of o){let{wrapped:c}=u,_=this[l];c!==!0||this._$AL.has(l)||_===void 0||this.C(l,void 0,u,_)}}let r=!1,a=this._$AL;try{r=this.shouldUpdate(a),r?(this.willUpdate(a),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(a)):this._$EM()}catch(o){throw r=!1,this._$EM(),o}r&&this._$AE(a)}willUpdate(r){}_$AE(r){this._$EO?.forEach(a=>a.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&(this._$Eq=this._$Eq.forEach(a=>this._$ET(a,this[a]))),this._$EM()}updated(r){}firstUpdated(r){}};St.elementStyles=[],St.shadowRootOptions={mode:"open"},St[ge("elementProperties")]=new Map,St[ge("finalized")]=new Map,Vs?.({ReactiveElement:St}),(zt.reactiveElementVersions??(zt.reactiveElementVersions=[])).push("2.1.2");var ye=globalThis,bo=d=>d,Xe=ye.trustedTypes,wo=Xe?Xe.createPolicy("lit-html",{createHTML:d=>d}):void 0,To="$lit$",At=`lit$${Math.random().toFixed(9).slice(2)}$`,Mo="?"+At,js=`<${Mo}>`,Rt=document,xe=()=>Rt.createComment(""),be=d=>d===null||typeof d!="object"&&typeof d!="function",ji=Array.isArray,Ks=d=>ji(d)||typeof d?.[Symbol.iterator]=="function",Hi=`[ 	
\f\r]`,ve=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Lo=/-->/g,Po=/>/g,Nt=RegExp(`>|${Hi}(?:([^\\s"'>=/]+)(${Hi}*=${Hi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Co=/'/g,ko=/"/g,Eo=/^(?:script|style|textarea|title)$/i,Ki=d=>(r,...a)=>({_$litType$:d,strings:r,values:a}),Z=Ki(1),zo=Ki(2),ha=Ki(3),Ft=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),So=new WeakMap,Dt=Rt.createTreeWalker(Rt,129);function Ao(d,r){if(!ji(d)||!d.hasOwnProperty("raw"))throw Error("invalid template strings array");return wo!==void 0?wo.createHTML(r):r}var Ys=(d,r)=>{let a=d.length-1,o=[],l,u=r===2?"<svg>":r===3?"<math>":"",c=ve;for(let _=0;_<a;_++){let g=d[_],p,x,y=-1,C=0;for(;C<g.length&&(c.lastIndex=C,x=c.exec(g),x!==null);)C=c.lastIndex,c===ve?x[1]==="!--"?c=Lo:x[1]!==void 0?c=Po:x[2]!==void 0?(Eo.test(x[2])&&(l=RegExp("</"+x[2],"g")),c=Nt):x[3]!==void 0&&(c=Nt):c===Nt?x[0]===">"?(c=l??ve,y=-1):x[1]===void 0?y=-2:(y=c.lastIndex-x[2].length,p=x[1],c=x[3]===void 0?Nt:x[3]==='"'?ko:Co):c===ko||c===Co?c=Nt:c===Lo||c===Po?c=ve:(c=Nt,l=void 0);let P=c===Nt&&d[_+1].startsWith("/>")?" ":"";u+=c===ve?g+js:y>=0?(o.push(p),g.slice(0,y)+To+g.slice(y)+At+P):g+At+(y===-2?_:P)}return[Ao(d,u+(d[a]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),o]},we=class d{constructor({strings:r,_$litType$:a},o){let l;this.parts=[];let u=0,c=0,_=r.length-1,g=this.parts,[p,x]=Ys(r,a);if(this.el=d.createElement(p,o),Dt.currentNode=this.el.content,a===2||a===3){let y=this.el.content.firstChild;y.replaceWith(...y.childNodes)}for(;(l=Dt.nextNode())!==null&&g.length<_;){if(l.nodeType===1){if(l.hasAttributes())for(let y of l.getAttributeNames())if(y.endsWith(To)){let C=x[c++],P=l.getAttribute(y).split(At),R=/([.?@])?(.*)/.exec(C);g.push({type:1,index:u,name:R[2],strings:P,ctor:R[1]==="."?Gi:R[1]==="?"?Wi:R[1]==="@"?qi:Qt}),l.removeAttribute(y)}else y.startsWith(At)&&(g.push({type:6,index:u}),l.removeAttribute(y));if(Eo.test(l.tagName)){let y=l.textContent.split(At),C=y.length-1;if(C>0){l.textContent=Xe?Xe.emptyScript:"";for(let P=0;P<C;P++)l.append(y[P],xe()),Dt.nextNode(),g.push({type:2,index:++u});l.append(y[C],xe())}}}else if(l.nodeType===8)if(l.data===Mo)g.push({type:2,index:u});else{let y=-1;for(;(y=l.data.indexOf(At,y+1))!==-1;)g.push({type:7,index:u}),y+=At.length-1}u++}}static createElement(r,a){let o=Rt.createElement("template");return o.innerHTML=r,o}};function Xt(d,r,a=d,o){if(r===Ft)return r;let l=o!==void 0?a._$Co?.[o]:a._$Cl,u=be(r)?void 0:r._$litDirective$;return l?.constructor!==u&&(l?._$AO?.(!1),u===void 0?l=void 0:(l=new u(d),l._$AT(d,a,o)),o!==void 0?(a._$Co??(a._$Co=[]))[o]=l:a._$Cl=l),l!==void 0&&(r=Xt(d,l._$AS(d,r.values),l,o)),r}var Ui=class{constructor(r,a){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=a}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:a},parts:o}=this._$AD,l=(r?.creationScope??Rt).importNode(a,!0);Dt.currentNode=l;let u=Dt.nextNode(),c=0,_=0,g=o[0];for(;g!==void 0;){if(c===g.index){let p;g.type===2?p=new Le(u,u.nextSibling,this,r):g.type===1?p=new g.ctor(u,g.name,g.strings,this,r):g.type===6&&(p=new Vi(u,this,r)),this._$AV.push(p),g=o[++_]}c!==g?.index&&(u=Dt.nextNode(),c++)}return Dt.currentNode=Rt,l}p(r){let a=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(r,o,a),a+=o.strings.length-2):o._$AI(r[a])),a++}},Le=class d{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,a,o,l){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=r,this._$AB=a,this._$AM=o,this.options=l,this._$Cv=l?.isConnected??!0}get parentNode(){let r=this._$AA.parentNode,a=this._$AM;return a!==void 0&&r?.nodeType===11&&(r=a.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,a=this){r=Xt(this,r,a),be(r)?r===I||r==null||r===""?(this._$AH!==I&&this._$AR(),this._$AH=I):r!==this._$AH&&r!==Ft&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):Ks(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==I&&be(this._$AH)?this._$AA.nextSibling.data=r:this.T(Rt.createTextNode(r)),this._$AH=r}$(r){let{values:a,_$litType$:o}=r,l=typeof o=="number"?this._$AC(r):(o.el===void 0&&(o.el=we.createElement(Ao(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===l)this._$AH.p(a);else{let u=new Ui(l,this),c=u.u(this.options);u.p(a),this.T(c),this._$AH=u}}_$AC(r){let a=So.get(r.strings);return a===void 0&&So.set(r.strings,a=new we(r)),a}k(r){ji(this._$AH)||(this._$AH=[],this._$AR());let a=this._$AH,o,l=0;for(let u of r)l===a.length?a.push(o=new d(this.O(xe()),this.O(xe()),this,this.options)):o=a[l],o._$AI(u),l++;l<a.length&&(this._$AR(o&&o._$AB.nextSibling,l),a.length=l)}_$AR(r=this._$AA.nextSibling,a){for(this._$AP?.(!1,!0,a);r!==this._$AB;){let o=bo(r).nextSibling;bo(r).remove(),r=o}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r))}},Qt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,a,o,l,u){this.type=1,this._$AH=I,this._$AN=void 0,this.element=r,this.name=a,this._$AM=l,this.options=u,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=I}_$AI(r,a=this,o,l){let u=this.strings,c=!1;if(u===void 0)r=Xt(this,r,a,0),c=!be(r)||r!==this._$AH&&r!==Ft,c&&(this._$AH=r);else{let _=r,g,p;for(r=u[0],g=0;g<u.length-1;g++)p=Xt(this,_[o+g],a,g),p===Ft&&(p=this._$AH[g]),c||(c=!be(p)||p!==this._$AH[g]),p===I?r=I:r!==I&&(r+=(p??"")+u[g+1]),this._$AH[g]=p}c&&!l&&this.j(r)}j(r){r===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}},Gi=class extends Qt{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===I?void 0:r}},Wi=class extends Qt{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==I)}},qi=class extends Qt{constructor(r,a,o,l,u){super(r,a,o,l,u),this.type=5}_$AI(r,a=this){if((r=Xt(this,r,a,0)??I)===Ft)return;let o=this._$AH,l=r===I&&o!==I||r.capture!==o.capture||r.once!==o.once||r.passive!==o.passive,u=r!==I&&(o===I||l);l&&this.element.removeEventListener(this.name,this,o),u&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r)}},Vi=class{constructor(r,a,o){this.element=r,this.type=6,this._$AN=void 0,this._$AM=a,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(r){Xt(this,r)}};var Js=ye.litHtmlPolyfillSupport;Js?.(we,Le),(ye.litHtmlVersions??(ye.litHtmlVersions=[])).push("3.3.3");var Oo=(d,r,a)=>{let o=a?.renderBefore??r,l=o._$litPart$;if(l===void 0){let u=a?.renderBefore??null;o._$litPart$=l=new Le(r.insertBefore(xe(),u),u,void 0,a??{})}return l._$AI(d),l};var Pe=globalThis,tt=class extends St{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var a;let r=super.createRenderRoot();return(a=this.renderOptions).renderBefore??(a.renderBefore=r.firstChild),r}update(r){let a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=Oo(a,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ft}};tt._$litElement$=!0,tt.finalized=!0,Pe.litElementHydrateSupport?.({LitElement:tt});var Xs=Pe.litElementPolyfillSupport;Xs?.({LitElement:tt});(Pe.litElementVersions??(Pe.litElementVersions=[])).push("4.2.2");var U=_o(Io(),1),Ma=_o(Bo(),1);var No=`/* required styles */\r
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
`;var ei={en:{"panel.newEvent":"+ New event","panel.count.one":"{n} event","panel.count.other":"{n} events","panel.home":"Home","error.query":"Query failed: {msg}","error.profileSave":"Saving profile failed: {msg}","error.profileDelete":"Deleting profile failed: {msg}","error.save":"Saving failed: {msg}","error.delete":"Deleting failed: {msg}","error.action":"Action failed: {msg}","error.ics":"Could not copy ICS URL: {msg}","error.capture":"Too few points for the drawing.","profile.label":"Profile","profile.none":"\u2014 no profile \u2014","profile.placeholder":"Profile name","profile.save":"Save","profile.save.title":"Save current filters under this name","profile.delete":"Delete","profile.delete.title":"Delete selected profile","search.label":"Search","search.placeholder":"Title, description, address\u2026","search.favorites":"Favorites only","category.label":"Category","category.none":"No categories yet","radius.label":"Radius","radius.hint":"Click the map to set the center","window.label":"Time window","window.allDays":"All days","weekdays.label":"Weekdays","weekdays.short":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],"time.allday":"All day","time.range":"By time of day","map.label":"Map","map.zones":"HA zones","map.persons":"People","map.geofeeds":"Geo feeds","map.route":"Directions (OSM)","export.label":"Export","export.copy":"Copy ICS subscription URL","export.copied":"URL copied","view.label":"View","view.reset":"Reset view","view.reset.title":"Restore default filters and map layers","stats.summary":"Statistics ({n} events)","stats.places":"Cached places","stats.profiles":"Profiles","stats.events":"events","stats.last":"last","list.empty":"No events match the current filters.","list.visited":"visited","list.source":"Source","list.favorite.add":"Mark as favorite","list.favorite.remove":"Remove favorite","list.edit":"Edit event","list.hide":"Hide event","list.fuzzy":"Imprecise schedule","editor.new":"New event","editor.edit":"Edit event","editor.title":"Title*","editor.category":"Category","editor.start":"Start*","editor.end":"End*","editor.address":"Address","editor.address.placeholder":"fills coordinates from the cache","editor.pickPoint":"Pick point on map","editor.rrule":"Recurrence (RRULE)","editor.precision":"Time precision","editor.precision.exact":"exact","editor.precision.approximate":"approximate","editor.scheduleText":"Schedule wording","editor.scheduleText.placeholder":"Wednesdays 6 pm, ~twice a month","editor.geometry":"Geometry (GeoJSON, optional)","editor.drawLine":"Draw line","editor.drawPolygon":"Draw area","editor.applyDrawing":"Apply drawing","editor.captureHint.point":"Click the map to set the point.","editor.captureHint.points":"Click the map to add points.","editor.source":"Source","editor.sourceUrl":"Source URL","editor.description":"Description","editor.favorite":"Favorite","editor.save":"Save","editor.cancel":"Cancel","editor.delete":"Delete","editor.error.times":"Start and end are required.","editor.error.geometry":"Geometry is not valid JSON.","editor.error.coords":"Provide lat and lon together."},de:{"panel.newEvent":"+ Neues Event","panel.count.one":"{n} Event","panel.count.other":"{n} Events","panel.home":"Zuhause","error.query":"Abfrage fehlgeschlagen: {msg}","error.profileSave":"Profil speichern fehlgeschlagen: {msg}","error.profileDelete":"Profil l\xF6schen fehlgeschlagen: {msg}","error.save":"Speichern fehlgeschlagen: {msg}","error.delete":"L\xF6schen fehlgeschlagen: {msg}","error.action":"Aktion fehlgeschlagen: {msg}","error.ics":"ICS-URL konnte nicht kopiert werden: {msg}","error.capture":"Zu wenige Punkte f\xFCr die Zeichnung.","profile.label":"Profil","profile.none":"\u2014 kein Profil \u2014","profile.placeholder":"Profilname","profile.save":"Speichern","profile.save.title":"Aktuelle Filter unter diesem Namen speichern","profile.delete":"L\xF6schen","profile.delete.title":"Ausgew\xE4hltes Profil l\xF6schen","search.label":"Suche","search.placeholder":"Titel, Beschreibung, Adresse\u2026","search.favorites":"nur Favoriten","category.label":"Kategorie","category.none":"Noch keine Kategorien","radius.label":"Radius","radius.hint":"Klick auf die Karte setzt das Zentrum","window.label":"Zeitfenster","window.allDays":"Alle Tage","weekdays.label":"Wochentage","weekdays.short":["Mo","Di","Mi","Do","Fr","Sa","So"],"time.allday":"Ganztags","time.range":"Nach Uhrzeit","map.label":"Karte","map.zones":"HA-Zonen","map.persons":"Personen","map.geofeeds":"Geo-Feeds","map.route":"Route (OSM)","export.label":"Export","export.copy":"ICS-Abo-URL kopieren","export.copied":"URL kopiert","view.label":"Ansicht","view.reset":"Ansicht zur\xFCcksetzen","view.reset.title":"Filter und Karten-Layer auf Standard zur\xFCcksetzen","stats.summary":"Statistik ({n} Events)","stats.places":"Orte im Cache","stats.profiles":"Profile","stats.events":"Events","stats.last":"zuletzt","list.empty":"Keine Events f\xFCr die aktuellen Filter.","list.visited":"besucht","list.source":"Quelle","list.favorite.add":"Als Favorit markieren","list.favorite.remove":"Favorit entfernen","list.edit":"Event bearbeiten","list.hide":"Event ausblenden","list.fuzzy":"Unpr\xE4zise Zeitangabe","editor.new":"Neues Event","editor.edit":"Event bearbeiten","editor.title":"Titel*","editor.category":"Kategorie","editor.start":"Beginn*","editor.end":"Ende*","editor.address":"Adresse","editor.address.placeholder":"f\xFCllt Koordinaten aus dem Cache","editor.pickPoint":"Punkt per Kartenklick","editor.rrule":"Wiederholung (RRULE)","editor.precision":"Zeit-Pr\xE4zision","editor.precision.exact":"exakt","editor.precision.approximate":"ungef\xE4hr","editor.scheduleText":"Zeitangabe (Wortlaut)","editor.scheduleText.placeholder":"mittwochs 18 Uhr, ca. 2x im Monat","editor.geometry":"Geometrie (GeoJSON, optional)","editor.drawLine":"Linie zeichnen","editor.drawPolygon":"Fl\xE4che zeichnen","editor.applyDrawing":"Zeichnung \xFCbernehmen","editor.captureHint.point":"Klicke auf die Karte, um den Punkt zu setzen.","editor.captureHint.points":"Klicke auf die Karte, um Punkte hinzuzuf\xFCgen.","editor.source":"Quelle","editor.sourceUrl":"Quell-URL","editor.description":"Beschreibung","editor.favorite":"Favorit","editor.save":"Speichern","editor.cancel":"Abbrechen","editor.delete":"L\xF6schen","editor.error.times":"Beginn und Ende sind Pflichtfelder.","editor.error.geometry":"Geometrie ist kein g\xFCltiges JSON.","editor.error.coords":"Lat und Lon nur gemeinsam angeben."}},Do=ei.en;function Ro(d){let r=String(d||"en").toLowerCase().split("-")[0];Do=ei[r]||ei.en}function w(d,r){let a=Do[d]??ei.en[d]??d;if(typeof a=="string"&&r)for(let[o,l]of Object.entries(r))a=a.replace(`{${o}}`,String(l));return a}var Ce=d=>zo`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d=${d}></path></svg>`,Fo=Ce("M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"),Ho=Ce("M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z"),Uo=Ce("M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"),Go=Ce("M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z"),Wo=Ce("M17,17H7V14L3,18L7,22V19H19V13H17M7,7H17V10L21,6L17,2V5H5V11H7V7Z"),qo='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/></svg>';var Vo=`.leaflet-cluster-anim .leaflet-marker-icon, .leaflet-cluster-anim .leaflet-marker-shadow {
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
`;var jo=`.marker-cluster-small {
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
	}`;var ke=class extends tt{constructor(){super(),this.events=[],this.radiusKm=10,this.radiusEnabled=!1,this.zones=[],this.persons=[],this.geoMarkers=[],this.capture=null,this.dark=!1,this._markersById=new Map,this._didInitialFit=!1,this._zonesSignature="",this._personsSignature="",this._geoSignature=""}render(){return Z`<div id="map"></div>`}firstUpdated(){let r=this.center?[this.center.lat,this.center.lon]:[52.52,13.405];this._map=U.default.map(this.renderRoot.getElementById("map"),{center:r,zoom:12,zoomControl:!0}),U.default.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(this._map),this._zoneLayer=U.default.layerGroup().addTo(this._map),this._geoFeedLayer=U.default.layerGroup().addTo(this._map),this._personLayer=U.default.layerGroup().addTo(this._map),this._shapeLayer=U.default.featureGroup().addTo(this._map),this._clusterGroup=U.default.markerClusterGroup({maxClusterRadius:40,showCoverageOnHover:!1}).addTo(this._map),this._radiusLayer=U.default.layerGroup().addTo(this._map),this._captureLayer=U.default.layerGroup().addTo(this._map),this._map.on("click",a=>{this.dispatchEvent(new CustomEvent("map-click",{detail:{lat:a.latlng.lat,lon:a.latlng.lng}}))}),this._resizeObserver=new ResizeObserver(()=>this._map.invalidateSize()),this._resizeObserver.observe(this),this._renderEvents(),this._renderRadius(),this._renderZones(),this._renderPersons(),this._renderGeoMarkers()}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),this._map?.remove(),this._map=void 0}updated(r){this._map&&(r.has("events")&&this._renderEvents(),(r.has("center")||r.has("radiusKm")||r.has("radiusEnabled"))&&this._renderRadius(),r.has("zones")&&this._renderZones(),r.has("persons")&&this._renderPersons(),r.has("geoMarkers")&&this._renderGeoMarkers(),r.has("capture")&&this._renderCapture(),r.has("selectedId")&&this.selectedId&&this._focusEvent(this.selectedId))}_accentColor(){return getComputedStyle(this).getPropertyValue("--primary-color").trim()||"#03a9f4"}_renderEvents(){this._clusterGroup.clearLayers(),this._shapeLayer.clearLayers(),this._markersById.clear();let r=this._accentColor();for(let a of this.events||[]){let o=null,l=!1;if(a.geometry)try{o=U.default.geoJSON(JSON.parse(a.geometry),{style:this._shapeStyle(r,a),pointToLayer:(u,c)=>U.default.circleMarker(c,this._markerStyle(r,a))})}catch(u){console.warn("chronotope: invalid geometry for event",a.id,u)}!o&&a.lat!=null&&a.lon!=null&&(o=U.default.circleMarker([a.lat,a.lon],this._markerStyle(r,a)),l=!0),o&&(o.bindPopup(this._popupHtml(a)),o.on("click",()=>{this.dispatchEvent(new CustomEvent("event-selected",{detail:{id:a.id}}))}),(l?this._clusterGroup:this._shapeLayer).addLayer(o),this._markersById.set(a.id,{layer:o,clustered:l}))}if(!this._didInitialFit&&this._markersById.size>0){this._didInitialFit=!0;let a=this._clusterGroup.getBounds().extend(this._shapeLayer.getBounds());a.isValid()&&this._map.fitBounds(a.pad(.2),{maxZoom:14})}}_markerStyle(r,a){return{radius:9,color:r,weight:2,fillColor:r,fillOpacity:a?.favorite?.75:.35,dashArray:a?.time_precision==="approximate"?"3 4":null}}_shapeStyle(r,a){return{color:r,weight:3,fillOpacity:.2,dashArray:a?.time_precision==="approximate"?"6 6":null}}_popupHtml(r){let a=document.createElement("div"),o=document.createElement("div");o.className="popup-title",o.textContent=r.title;let l=document.createElement("div");l.className="popup-meta";let u=r.occurrences?.[0]?.[0]??r.start_time,c=r.time_precision==="approximate"&&r.schedule_text?`~ ${r.schedule_text}`:new Date(u).toLocaleString();if(l.textContent=`${r.category||""} ${c}`.trim(),a.append(o,l),r.address){let _=document.createElement("div");_.className="popup-meta",_.textContent=r.address,a.append(_)}if(r.lat!=null&&r.lon!=null){let _=document.createElement("div");_.className="popup-meta";let g=document.createElement("a");g.href=`https://www.openstreetmap.org/directions?to=${r.lat}%2C${r.lon}`,g.target="_blank",g.rel="noopener noreferrer",g.textContent=w("map.route"),_.append(g),a.append(_)}return a}_renderRadius(){if(this._radiusLayer.clearLayers(),!this.radiusEnabled||!this.center)return;let r=this._accentColor();U.default.circle([this.center.lat,this.center.lon],{radius:this.radiusKm*1e3,color:r,weight:1.5,dashArray:"6 6",fillOpacity:.05}).addTo(this._radiusLayer),U.default.circleMarker([this.center.lat,this.center.lon],{radius:4,color:r,fillColor:r,fillOpacity:1}).addTo(this._radiusLayer)}_renderZones(){if(!this._map)return;let r=JSON.stringify(this.zones||[]);if(r===this._zonesSignature)return;this._zonesSignature=r,this._zoneLayer.clearLayers();let a=getComputedStyle(this).getPropertyValue("--accent-color").trim()||"#ff9800";for(let o of this.zones||[])U.default.circle([o.lat,o.lon],{radius:o.radius,color:a,weight:1.5,dashArray:o.passive?"2 6":"4 4",fillColor:a,fillOpacity:.06}).bindTooltip(o.name).addTo(this._zoneLayer),o.home&&U.default.marker([o.lat,o.lon],{icon:U.default.divIcon({className:"zone-home-icon",html:qo,iconSize:[24,24],iconAnchor:[12,12]}),interactive:!1,keyboard:!1}).addTo(this._zoneLayer)}_renderPersons(){if(!this._map)return;let r=JSON.stringify(this.persons||[]);if(r!==this._personsSignature){this._personsSignature=r,this._personLayer.clearLayers();for(let a of this.persons||[]){let o=a.picture?`<img src="${a.picture}" alt="" />`:`<span class="initial">${(a.name||"?")[0].toUpperCase()}</span>`;U.default.marker([a.lat,a.lon],{icon:U.default.divIcon({className:"person-icon",html:o,iconSize:[28,28],iconAnchor:[14,14]}),keyboard:!1,zIndexOffset:1e3}).bindTooltip(`${a.name} (${a.state})`).addTo(this._personLayer)}}}_renderGeoMarkers(){if(!this._map)return;let r=JSON.stringify(this.geoMarkers||[]);if(r!==this._geoSignature){this._geoSignature=r,this._geoFeedLayer.clearLayers();for(let a of this.geoMarkers||[])U.default.marker([a.lat,a.lon],{icon:U.default.divIcon({className:"geo-feed-icon",html:"",iconSize:[12,12],iconAnchor:[6,6]}),keyboard:!1}).bindTooltip(`${a.name} \u2014 ${a.source}`+(a.distance&&a.distance!=="unknown"?` (${a.distance} ${a.unit})`:"")).addTo(this._geoFeedLayer)}}_renderCapture(){if(this._captureLayer.clearLayers(),this.capture?.mode)this.setAttribute("data-capturing","");else{this.removeAttribute("data-capturing");return}let r=this._accentColor(),a=this.capture.points||[];for(let[o,l]of a)U.default.circleMarker([o,l],{radius:5,color:r,fillColor:r,fillOpacity:.9}).addTo(this._captureLayer);if(a.length>=2){let o=a.map(([l,u])=>[l,u]);this.capture.mode==="polygon"&&a.length>=3?U.default.polygon(o,{color:r,weight:2,dashArray:"4 4",fillOpacity:.1}).addTo(this._captureLayer):U.default.polyline(o,{color:r,weight:2,dashArray:"4 4"}).addTo(this._captureLayer)}}_focusEvent(r){let a=this._markersById.get(r);if(!a)return;let{layer:o,clustered:l}=a;l&&o.getLatLng?this._clusterGroup.zoomToShowLayer(o,()=>o.openPopup()):o.getBounds?(this._map.fitBounds(o.getBounds().pad(.3),{maxZoom:15}),o.openPopup()):o.getLatLng&&(this._map.panTo(o.getLatLng()),o.openPopup())}};it(ke,"properties",{events:{attribute:!1},center:{attribute:!1},radiusKm:{attribute:!1},radiusEnabled:{attribute:!1},zones:{attribute:!1},persons:{attribute:!1},geoMarkers:{attribute:!1},capture:{attribute:!1},selectedId:{attribute:!1},dark:{type:Boolean,reflect:!0}}),it(ke,"styles",[at`
      ${Jt(No)}
    `,at`
      ${Jt(Vo)}
    `,at`
      ${Jt(jo)}
    `,at`
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
      .popup-meta a {
        color: var(--primary-color, #03a9f4);
        text-decoration: none;
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
      .geo-feed-icon {
        background: var(--info-color, #2196f3);
        border: 1px solid var(--card-background-color, #fff);
        transform: rotate(45deg);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
      }
      :host([data-capturing]) #map {
        cursor: crosshair;
      }
    `]);customElements.define("chronotope-map-view",ke);var Se=class extends tt{constructor(){super(),this.profiles=[],this.selectedProfileId="",this._profileName=""}updated(r){if(r.has("selectedProfileId")){let a=(this.profiles||[]).find(o=>o.id===this.selectedProfileId);this._profileName=a?a.name:""}}render(){let r=this.state;return Z`
      <div class="groups">
        <div class="group">
          <span class="label">${w("profile.label")}</span>
          <div class="row">
            <select
              .value=${this.selectedProfileId||""}
              @change=${a=>this.dispatchEvent(new CustomEvent("profile-selected",{detail:{id:a.target.value}}))}
            >
              <option value="">${w("profile.none")}</option>
              ${(this.profiles||[]).map(a=>Z`
                  <option value=${a.id} ?selected=${a.id===this.selectedProfileId}>
                    ${a.name}
                  </option>
                `)}
            </select>
            <input
              type="text"
              placeholder=${w("profile.placeholder")}
              .value=${this._profileName}
              @input=${a=>this._profileName=a.target.value}
            />
            <button
              class="ics-button"
              title=${w("profile.save.title")}
              @click=${this._saveProfile}
            >
              ${w("profile.save")}
            </button>
            ${this.selectedProfileId?Z`<button
                  class="ics-button"
                  title=${w("profile.delete.title")}
                  @click=${()=>this.dispatchEvent(new CustomEvent("profile-delete",{detail:{id:this.selectedProfileId}}))}
                >
                  ${w("profile.delete")}
                </button>`:I}
          </div>
        </div>

        <div class="group">
          <span class="label">${w("search.label")}</span>
          <div class="row">
            <input
              type="text"
              placeholder=${w("search.placeholder")}
              .value=${r.text||""}
              @input=${a=>this._patch({text:a.target.value})}
            />
            <label class="row" style="gap:4px">
              <input
                type="checkbox"
                .checked=${r.favoritesOnly}
                @change=${a=>this._patch({favoritesOnly:a.target.checked})}
              />
              ${w("search.favorites")}
            </label>
          </div>
        </div>

        <div class="group">
          <span class="label">${w("category.label")}</span>
          <div class="chips">
            ${(this.categories||[]).length===0?Z`<span class="hint">${w("category.none")}</span>`:(this.categories||[]).map(a=>Z`
                    <button
                      class="chip"
                      aria-pressed=${r.categories.includes(a)?"true":"false"}
                      @click=${()=>this._toggleCategory(a)}
                    >
                      ${a}
                    </button>
                  `)}
          </div>
        </div>

        <div class="group">
          <span class="label">${w("radius.label")}</span>
          <div class="row">
            <input
              type="checkbox"
              id="radius-enabled"
              .checked=${r.radiusEnabled}
              @change=${a=>this._patch({radiusEnabled:a.target.checked})}
            />
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              .value=${String(r.radiusKm)}
              ?disabled=${!r.radiusEnabled}
              @input=${a=>this._patch({radiusKm:Number(a.target.value)})}
            />
            <span>${r.radiusKm} km</span>
          </div>
          <span class="hint">${w("radius.hint")}</span>
        </div>

        <div class="group">
          <span class="label">${w("window.label")}</span>
          <div class="row">
            <input
              type="datetime-local"
              .value=${r.start}
              @change=${a=>this._patch({start:a.target.value,dayFilter:""})}
            />
            <span>–</span>
            <input
              type="datetime-local"
              .value=${r.end}
              @change=${a=>this._patch({end:a.target.value,dayFilter:""})}
            />
          </div>
          ${this._renderDaySlider(r)}
        </div>

        <div class="group">
          <span class="label">${w("weekdays.label")}</span>
          <div class="chips">
            ${w("weekdays.short").map((a,o)=>Z`
                <button
                  class="chip"
                  aria-pressed=${r.weekdays.includes(o)?"true":"false"}
                  @click=${()=>this._toggleWeekday(o)}
                >
                  ${a}
                </button>
              `)}
          </div>
          <div class="row">
            <select
              .value=${r.timeMode}
              @change=${a=>this._patch({timeMode:a.target.value})}
            >
              <option value="allday">${w("time.allday")}</option>
              <option value="range">${w("time.range")}</option>
            </select>
            ${r.timeMode==="range"?Z`
                  <input
                    type="time"
                    .value=${r.timeFrom}
                    @change=${a=>this._patch({timeFrom:a.target.value})}
                  />
                  <span>–</span>
                  <input
                    type="time"
                    .value=${r.timeTo}
                    @change=${a=>this._patch({timeTo:a.target.value})}
                  />
                `:I}
          </div>
        </div>

        <div class="group">
          <span class="label">${w("map.label")}</span>
          <label class="row">
            <input
              type="checkbox"
              .checked=${r.showZones}
              @change=${a=>this._patch({showZones:a.target.checked})}
            />
            ${w("map.zones")}
          </label>
          <label class="row">
            <input
              type="checkbox"
              .checked=${r.showPersons}
              @change=${a=>this._patch({showPersons:a.target.checked})}
            />
            ${w("map.persons")}
          </label>
          <label class="row">
            <input
              type="checkbox"
              .checked=${r.showGeoFeeds}
              @change=${a=>this._patch({showGeoFeeds:a.target.checked})}
            />
            ${w("map.geofeeds")}
          </label>
        </div>

        <div class="group">
          <span class="label">${w("export.label")}</span>
          <button
            class="ics-button"
            @click=${()=>this.dispatchEvent(new CustomEvent("ics-requested"))}
          >
            ${this.icsCopied?w("export.copied"):w("export.copy")}
          </button>
          ${this._renderStats()}
        </div>

        <div class="group">
          <span class="label">${w("view.label")}</span>
          <button
            class="ics-button"
            title=${w("view.reset.title")}
            @click=${()=>this.dispatchEvent(new CustomEvent("reset-requested"))}
          >
            ${w("view.reset")}
          </button>
        </div>
      </div>
    `}_renderStats(){let r=this.stats;return r?Z`
      <details class="stats" @toggle=${a=>{a.target.open&&this.dispatchEvent(new CustomEvent("stats-requested"))}}>
        <summary>${w("stats.summary",{n:r.total_events})}</summary>
        <table>
          <tr><td>${w("stats.places")}</td><td>${r.places}</td></tr>
          <tr><td>${w("stats.profiles")}</td><td>${r.profiles}</td></tr>
          ${(r.sources||[]).map(a=>Z`
              <tr>
                <td>${a.source}</td>
                <td>
                  ${a.events} ${w("stats.events")}${a.last_scraped?Z`, ${w("stats.last")}
                      ${new Date(a.last_scraped).toLocaleDateString()}`:I}
                </td>
              </tr>
            `)}
        </table>
      </details>
    `:I}_patch(r){this.dispatchEvent(new CustomEvent("filters-changed",{detail:r}))}_renderDaySlider(r){if(!r.start||!r.end)return I;let a=new Date(r.start);a.setHours(0,0,0,0);let o=new Date(r.end),l=Math.min(Math.ceil((o-a)/864e5),60);if(l<2)return I;let u=p=>{if(!p)return 0;let x=new Date(`${p}T00:00:00`);return Math.round((x-a)/864e5)+1},c=p=>{if(!p)return"";let x=new Date(a.getTime()+(p-1)*864e5),y=C=>String(C).padStart(2,"0");return`${x.getFullYear()}-${y(x.getMonth()+1)}-${y(x.getDate())}`},_=u(r.dayFilter),g=r.dayFilter?new Date(`${r.dayFilter}T00:00:00`).toLocaleDateString(void 0,{weekday:"short",day:"2-digit",month:"2-digit"}):w("window.allDays");return Z`
      <div class="row">
        <input
          type="range"
          min="0"
          max=${String(l)}
          step="1"
          .value=${String(_)}
          @input=${p=>this._patch({dayFilter:c(Number(p.target.value))})}
        />
        <span>${g}</span>
      </div>
    `}_saveProfile(){let r=(this._profileName||"").trim();if(!r)return;let a=(this.profiles||[]).find(o=>o.id===this.selectedProfileId);this.dispatchEvent(new CustomEvent("profile-save",{detail:{name:r,id:a&&a.name===r?a.id:void 0}}))}_toggleCategory(r){let a=this.state.categories.includes(r)?this.state.categories.filter(o=>o!==r):[...this.state.categories,r];this._patch({categories:a})}_toggleWeekday(r){let a=this.state.weekdays.includes(r)?this.state.weekdays.filter(o=>o!==r):[...this.state.weekdays,r];this._patch({weekdays:a})}};it(Se,"properties",{state:{attribute:!1},categories:{attribute:!1},icsCopied:{attribute:!1},profiles:{attribute:!1},selectedProfileId:{attribute:!1},stats:{attribute:!1},_profileName:{state:!0}}),it(Se,"styles",at`
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
  `);customElements.define("chronotope-filter-bar",Se);var Te=class extends tt{render(){let r=this.events||[];return r.length===0?Z`<div class="empty">${w("list.empty")}</div>`:Z`${r.map(a=>this._renderItem(a))}`}_renderItem(r){let a=r.occurrences?.[0]?.[0]??r.start_time,o=r.occurrences?.[0]?.[1]??r.end_time;return Z`
      <button
        class="item"
        aria-current=${r.id===this.selectedId?"true":"false"}
        @click=${()=>this.dispatchEvent(new CustomEvent("event-selected",{detail:{id:r.id}}))}
      >
        <div class="title-row">
          <span class="title">${r.title}</span>
          <span>
            ${r.distance_km!=null?Z`<span class="distance">${this._formatDistance(r.distance_km)}</span>`:I}
            <button
              class="icon-btn ${r.favorite?"starred":""}"
              title=${r.favorite?w("list.favorite.remove"):w("list.favorite.add")}
              @click=${l=>this._flag(l,r,{favorite:!r.favorite})}
            >
              ${r.favorite?Fo:Ho}
            </button>
            <button
              class="icon-btn"
              title=${w("list.edit")}
              @click=${l=>{l.stopPropagation(),this.dispatchEvent(new CustomEvent("event-edit",{detail:{id:r.id}}))}}
            >
              ${Uo}
            </button>
            <button
              class="icon-btn"
              title=${w("list.hide")}
              @click=${l=>this._flag(l,r,{hidden:!0})}
            >
              ${Go}
            </button>
          </span>
        </div>
        <div class="meta">
          ${this._renderWhen(r,a,o)}
          ${r.recurrence?Z`<span title=${r.recurrence}>${Wo}</span>`:I}
          ${r.category?Z`<span class="badge">${r.category}</span>`:I}
          ${r.confidence?Z`<span class="badge confidence-${r.confidence}">${r.confidence}</span>`:I}
          ${r.source_url?Z`<span class="source">
                <a href=${r.source_url} target="_blank" rel="noopener noreferrer"
                  @click=${l=>l.stopPropagation()}
                  >${r.source_name||w("list.source")}</a
                >
              </span>`:I}
          ${r.visits?.length?Z`<span
                class="visited"
                title=${r.visits.map(l=>`${l.person_id} (${new Date(l.last_seen).toLocaleDateString()})`).join(", ")}
                >${w("list.visited")}</span
              >`:I}
        </div>
        ${r.address?Z`<div class="address">${r.address}</div>`:I}
      </button>
    `}_flag(r,a,o){r.stopPropagation(),this.dispatchEvent(new CustomEvent("event-flag",{detail:{id:a.id,...o}}))}_renderWhen(r,a,o){if(r.time_precision==="approximate"){let l=r.schedule_text||this._formatRange(a,o);return Z`<span class="fuzzy" title=${w("list.fuzzy")}>~ ${l}</span>`}return Z`<span>${this._formatRange(a,o)}</span>`}_formatDistance(r){return`${(r<10?r.toFixed(1):Math.round(r).toString()).replace(".",",")} km`}_formatRange(r,a){let o=this.locale||void 0,l=new Date(r),u=new Date(a),c=new Intl.DateTimeFormat(o,{weekday:"short",day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}),_=new Intl.DateTimeFormat(o,{hour:"2-digit",minute:"2-digit"});return l.toDateString()===u.toDateString()?`${c.format(l)} \u2013 ${_.format(u)}`:`${c.format(l)} \u2013 ${c.format(u)}`}};it(Te,"properties",{events:{attribute:!1},selectedId:{attribute:!1},locale:{attribute:!1}}),it(Te,"styles",at`
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
    .icon-btn.starred {
      color: var(--warning-color, #ff9800);
    }
    .visited {
      color: var(--success-color, #4caf50);
    }
  `);customElements.define("chronotope-event-list",Te);function Ko(d){if(!d)return"";let r=new Date(d);if(Number.isNaN(r.getTime()))return"";let a=o=>String(o).padStart(2,"0");return`${r.getFullYear()}-${a(r.getMonth()+1)}-${a(r.getDate())}T${a(r.getHours())}:${a(r.getMinutes())}`}var Me=class extends tt{willUpdate(r){if(r.has("event")){let a=this.event||{};this._draft={id:a.id,title:a.title||"",category:a.category||"",start:Ko(a.start_time),end:Ko(a.end_time),address:a.address||"",lat:a.lat??"",lon:a.lon??"",recurrence:a.recurrence||"",time_precision:a.time_precision||"exact",schedule_text:a.schedule_text||"",source_name:a.source_name||"",source_url:a.source_url||"",raw_description:a.raw_description||"",geometry:a.geometry||"",favorite:!!a.favorite},this._error=null}}setCoords(r,a){this._draft={...this._draft,lat:Number(r.toFixed(6)),lon:Number(a.toFixed(6))}}setGeometry(r){this._draft={...this._draft,geometry:JSON.stringify(r)}}render(){let r=this._draft||{};return Z`
      <form @submit=${this._save}>
        <h2>${r.id?w("editor.edit"):w("editor.new")}</h2>
        ${this._error?Z`<div class="error">${this._error}</div>`:I}
        <label>
          ${w("editor.title")}
          <input required .value=${r.title} @input=${this._set("title")} />
        </label>
        <label>
          ${w("editor.category")}
          <input list="categories" .value=${r.category} @input=${this._set("category")} />
          <datalist id="categories">
            ${(this.categories||[]).map(a=>Z`<option value=${a}></option>`)}
          </datalist>
        </label>
        <div class="row">
          <label>
            ${w("editor.start")}
            <input type="datetime-local" required .value=${r.start} @input=${this._set("start")} />
          </label>
          <label>
            ${w("editor.end")}
            <input type="datetime-local" required .value=${r.end} @input=${this._set("end")} />
          </label>
        </div>
        <label>
          ${w("editor.address")}
          <input
            .value=${r.address}
            placeholder=${w("editor.address.placeholder")}
            @input=${this._set("address")}
          />
        </label>
        <div class="row">
          <label>
            Lat
            <input type="number" step="any" .value=${String(r.lat)} @input=${this._set("lat")} />
          </label>
          <label>
            Lon
            <input type="number" step="any" .value=${String(r.lon)} @input=${this._set("lon")} />
          </label>
        </div>
        <div class="buttons">
          <button
            type="button"
            aria-pressed=${this.captureMode==="point"?"true":"false"}
            @click=${()=>this._requestCapture("point")}
          >
            ${w("editor.pickPoint")}
          </button>
        </div>
        <label>
          ${w("editor.rrule")}
          <input
            .value=${r.recurrence}
            placeholder="FREQ=WEEKLY;BYDAY=SA"
            @input=${this._set("recurrence")}
          />
        </label>
        <div class="row">
          <label>
            ${w("editor.precision")}
            <select .value=${r.time_precision} @change=${this._set("time_precision")}>
              <option value="exact">${w("editor.precision.exact")}</option>
              <option value="approximate">${w("editor.precision.approximate")}</option>
            </select>
          </label>
          <label>
            ${w("editor.scheduleText")}
            <input
              .value=${r.schedule_text}
              placeholder=${w("editor.scheduleText.placeholder")}
              @input=${this._set("schedule_text")}
            />
          </label>
        </div>
        <label>
          ${w("editor.geometry")}
          <textarea .value=${r.geometry} @input=${this._set("geometry")}></textarea>
        </label>
        <div class="buttons">
          <button
            type="button"
            aria-pressed=${this.captureMode==="line"?"true":"false"}
            @click=${()=>this._requestCapture("line")}
          >
            ${w("editor.drawLine")}
          </button>
          <button
            type="button"
            aria-pressed=${this.captureMode==="polygon"?"true":"false"}
            @click=${()=>this._requestCapture("polygon")}
          >
            ${w("editor.drawPolygon")}
          </button>
          ${this.captureMode==="line"||this.captureMode==="polygon"?Z`<button type="button" class="primary" @click=${this._finishCapture}>
                ${w("editor.applyDrawing")}
              </button>`:I}
        </div>
        ${this.captureMode?Z`<div class="hint">
              ${this.captureMode==="point"?w("editor.captureHint.point"):w("editor.captureHint.points")}
            </div>`:I}
        <div class="row">
          <label>
            ${w("editor.source")}
            <input .value=${r.source_name} @input=${this._set("source_name")} />
          </label>
          <label>
            ${w("editor.sourceUrl")}
            <input .value=${r.source_url} @input=${this._set("source_url")} />
          </label>
        </div>
        <label>
          ${w("editor.description")}
          <textarea .value=${r.raw_description} @input=${this._set("raw_description")}></textarea>
        </label>
        <label style="flex-direction: row; align-items: center; gap: 8px;">
          <input
            type="checkbox"
            .checked=${r.favorite}
            @change=${a=>this._draft={...this._draft,favorite:a.target.checked}}
          />
          ${w("editor.favorite")}
        </label>
        <div class="buttons">
          <button type="submit" class="primary">${w("editor.save")}</button>
          <button type="button" @click=${()=>this.dispatchEvent(new CustomEvent("editor-cancel"))}>
            ${w("editor.cancel")}
          </button>
          ${r.id?Z`<button
                type="button"
                class="danger"
                @click=${()=>this.dispatchEvent(new CustomEvent("editor-delete",{detail:{id:r.id}}))}
              >
                ${w("editor.delete")}
              </button>`:I}
        </div>
      </form>
    `}_set(r){return a=>{this._draft={...this._draft,[r]:a.target.value}}}_requestCapture(r){let a=this.captureMode===r?null:r;this.dispatchEvent(new CustomEvent("capture-request",{detail:{mode:a}}))}_finishCapture(){this.dispatchEvent(new CustomEvent("capture-finish"))}_save(r){r.preventDefault();let a=this._draft;if(!a.start||!a.end){this._error=w("editor.error.times");return}let o=null;if(a.geometry&&a.geometry.trim())try{o=JSON.parse(a.geometry)}catch{this._error=w("editor.error.geometry");return}let l=a.lat!==""&&a.lat!=null,u=a.lon!==""&&a.lon!=null;if(l!==u){this._error=w("editor.error.coords");return}let c={id:a.id||void 0,title:a.title,category:a.category,start_time:new Date(a.start).toISOString(),end_time:new Date(a.end).toISOString(),address:a.address||null,lat:l?Number(a.lat):null,lon:u?Number(a.lon):null,recurrence:a.recurrence||null,time_precision:a.time_precision,schedule_text:a.schedule_text||null,source_name:a.source_name||null,source_url:a.source_url||null,raw_description:a.raw_description||null,geometry:o,favorite:a.favorite};this.dispatchEvent(new CustomEvent("editor-save",{detail:{event:c}}))}};it(Me,"properties",{event:{attribute:!1},categories:{attribute:!1},captureMode:{attribute:!1},_draft:{state:!0},_error:{state:!0}}),it(Me,"styles",at`
    :host {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: min(380px, 90vw);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
      border-inline-start: 1px solid var(--divider-color, #e0e0e0);
      box-shadow: -4px 0 12px rgba(0, 0, 0, 0.15);
      overflow-y: auto;
      z-index: 1200;
      font-size: 14px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 16px;
    }
    h2 {
      margin: 0;
      font-size: 18px;
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
  `);customElements.define("chronotope-event-editor",Me);var Yo=(d,r)=>d.callWS({type:"chronotope/events/query",...r}),Jo=d=>d.callWS({type:"chronotope/categories"}),Xo=(d,r)=>d.callWS({type:"chronotope/ics_url",...r}),Qo=(d,r)=>d.callWS({type:"chronotope/events/save",event:r}),tr=(d,r)=>d.callWS({type:"chronotope/events/delete",event_id:r}),er=(d,r,a)=>d.callWS({type:"chronotope/events/flag",event_id:r,...a}),ir=d=>d.callWS({type:"chronotope/profiles/list"}),nr=(d,r)=>d.callWS({type:"chronotope/profiles/save",profile:r}),or=(d,r)=>d.callWS({type:"chronotope/profiles/delete",profile_id:r}),rr=d=>d.callWS({type:"chronotope/stats"});function ii(d){let r={};return d.categories.length&&(r.categories=[...d.categories]),d.radiusEnabled&&d.center&&(r.center={lat:d.center.lat,lon:d.center.lon},r.radius_km=d.radiusKm),d.start&&(r.start=new Date(d.start).toISOString()),d.end&&(r.end=new Date(d.end).toISOString()),d.weekdays.length&&(r.weekdays=[...d.weekdays]),d.timeMode==="range"&&(d.timeFrom&&(r.time_from=d.timeFrom),d.timeTo&&(r.time_to=d.timeTo)),d.text&&(r.text=d.text),d.favoritesOnly&&(r.favorites_only=!0),r}var ia=250,na=new Set(["showZones","showPersons","showGeoFeeds","dayFilter"]),Yi="chronotope-panel-state-v1";function Ji(){return{categories:[],radiusEnabled:!1,radiusKm:10,center:null,start:"",end:"",weekdays:[],timeMode:"allday",timeFrom:"",timeTo:"",text:"",favoritesOnly:!1,showZones:!0,showPersons:!0,showGeoFeeds:!0,dayFilter:""}}function sr(d){if(!d)return"";let r=new Date(d);if(Number.isNaN(r.getTime()))return"";let a=o=>String(o).padStart(2,"0");return`${r.getFullYear()}-${a(r.getMonth()+1)}-${a(r.getDate())}T${a(r.getHours())}:${a(r.getMinutes())}`}var Ee=class extends tt{constructor(){super(),this._events=[],this._categories=[],this._selectedId=null,this._icsCopied=!1,this._error=null,this._profiles=[],this._selectedProfileId="",this._editing=null,this._capture=null,this._stats=null,this._filters=Ji(),this._initialized=!1}willUpdate(r){if(r.has("hass")&&this.hass&&Ro(this.hass.locale?.language||this.hass.language),r.has("hass")&&this.hass&&!this._initialized){this._initialized=!0;let a=this._loadPersistedState();this._filters={...Ji(),...a?.filters||{},center:a?.filters?.center||this._homeCenter()},this._selectedProfileId=a?.selectedProfileId||"",this._loadCategories(),this._loadProfiles(),this._loadStats(),this._runQuery()}}updated(r){if(this._initialized&&(r.has("_filters")||r.has("_selectedProfileId")))try{window.localStorage.setItem(Yi,JSON.stringify({filters:this._filters,selectedProfileId:this._selectedProfileId}))}catch{}}_homeCenter(){return{lat:this.hass.config.latitude,lon:this.hass.config.longitude}}_loadPersistedState(){try{let r=window.localStorage.getItem(Yi);return r?JSON.parse(r):null}catch(r){return console.warn("chronotope: persisted panel state unreadable",r),null}}_onResetView(){try{window.localStorage.removeItem(Yi)}catch{}this._filters={...Ji(),center:this._homeCenter()},this._selectedProfileId="",this._icsCopied=!1,this._error=null,this._scheduleQuery()}async _loadStats(){try{this._stats=await rr(this.hass)}catch(r){console.error("chronotope: loading stats failed",r)}}get _displayedEvents(){if(!this._filters.dayFilter)return this._events;let r=new Date(`${this._filters.dayFilter}T00:00:00`),a=new Date(r.getTime()+864e5);return this._events.filter(o=>(o.occurrences||[[o.start_time,o.end_time]]).some(([u,c])=>new Date(u)<a&&new Date(c)>r))}render(){let r=!!this.hass?.themes?.darkMode,a=this._displayedEvents;return Z`
      <header>
        <h1>Chronotope</h1>
        <span class="count">
          ${w(a.length===1?"panel.count.one":"panel.count.other",{n:a.length})}
        </span>
        <button class="new-event" @click=${this._onNewEvent}>
          ${w("panel.newEvent")}
        </button>
      </header>
      <chronotope-filter-bar
        .state=${this._filters}
        .categories=${this._categories}
        .icsCopied=${this._icsCopied}
        .profiles=${this._profiles}
        .selectedProfileId=${this._selectedProfileId}
        .stats=${this._stats}
        @filters-changed=${this._onFiltersChanged}
        @ics-requested=${this._onIcsRequested}
        @profile-selected=${this._onProfileSelected}
        @profile-save=${this._onProfileSave}
        @profile-delete=${this._onProfileDelete}
        @stats-requested=${this._loadStats}
        @reset-requested=${this._onResetView}
      ></chronotope-filter-bar>
      ${this._error?Z`<div class="error">${this._error}</div>`:""}
      <div class="content ${this.narrow?"narrow":""}">
        <chronotope-event-list
          .events=${a}
          .selectedId=${this._selectedId}
          .locale=${this.hass?.locale?.language}
          @event-selected=${this._onEventSelected}
          @event-flag=${this._onEventFlag}
          @event-edit=${this._onEventEdit}
        ></chronotope-event-list>
        <chronotope-map-view
          .events=${a}
          .center=${this._filters.center}
          .radiusKm=${this._filters.radiusKm}
          .radiusEnabled=${this._filters.radiusEnabled}
          .zones=${this._filters.showZones?this._haZones():[]}
          .persons=${this._filters.showPersons?this._haPersons():[]}
          .geoMarkers=${this._filters.showGeoFeeds?this._haGeoLocations():[]}
          .capture=${this._capture}
          .selectedId=${this._selectedId}
          .dark=${r}
          @map-click=${this._onMapClick}
          @event-selected=${this._onEventSelected}
        ></chronotope-map-view>
        ${this._editing!==null?Z`<chronotope-event-editor
              .event=${this._editing}
              .categories=${this._categories}
              .captureMode=${this._capture?.mode||null}
              @editor-save=${this._onEditorSave}
              @editor-delete=${this._onEditorDelete}
              @editor-cancel=${this._onEditorCancel}
              @capture-request=${this._onCaptureRequest}
              @capture-finish=${this._onCaptureFinish}
            ></chronotope-event-editor>`:""}
      </div>
    `}_haZones(){let r=this.hass?.states||{},a=Object.values(r).filter(o=>o.entity_id.startsWith("zone.")).map(o=>({id:o.entity_id,name:o.attributes.friendly_name||o.entity_id,lat:o.attributes.latitude,lon:o.attributes.longitude,radius:o.attributes.radius??100,passive:!!o.attributes.passive,home:o.entity_id==="zone.home"})).filter(o=>o.lat!=null&&o.lon!=null);return!a.some(o=>o.home)&&this.hass?.config?.latitude!=null&&a.push({id:"home",name:w("panel.home"),lat:this.hass.config.latitude,lon:this.hass.config.longitude,radius:100,passive:!1,home:!0}),a}_haPersons(){let r=this.hass?.states||{};return Object.values(r).filter(a=>a.entity_id.startsWith("person.")).map(a=>({id:a.entity_id,name:a.attributes.friendly_name||a.entity_id,lat:a.attributes.latitude,lon:a.attributes.longitude,picture:a.attributes.entity_picture||null,state:a.state})).filter(a=>a.lat!=null&&a.lon!=null)}_haGeoLocations(){let r=this.hass?.states||{};return Object.values(r).filter(a=>a.entity_id.startsWith("geo_location.")).map(a=>({id:a.entity_id,name:a.attributes.friendly_name||a.entity_id,lat:a.attributes.latitude,lon:a.attributes.longitude,source:a.attributes.source||"geo_location",distance:a.state,unit:a.attributes.unit_of_measurement||"km"})).filter(a=>a.lat!=null&&a.lon!=null)}_onFiltersChanged(r){this._filters={...this._filters,...r.detail},this._icsCopied=!1,Object.keys(r.detail).filter(o=>!na.has(o)).length&&this._scheduleQuery()}_onMapClick(r){let{lat:a,lon:o}=r.detail;if(this._capture?.mode==="point"){this._editorElement()?.setCoords(a,o),this._capture=null;return}if(this._capture?.mode){this._capture={...this._capture,points:[...this._capture.points,[a,o]]};return}this._filters={...this._filters,center:{lat:a,lon:o}},this._filters.radiusEnabled&&this._scheduleQuery()}_onEventSelected(r){this._selectedId=r.detail.id}_scheduleQuery(){clearTimeout(this._queryTimer),this._queryTimer=setTimeout(()=>this._runQuery(),ia)}async _loadCategories(){try{let r=await Jo(this.hass);this._categories=r.categories}catch(r){console.error("chronotope: loading categories failed",r)}}async _loadProfiles(){try{let r=await ir(this.hass);this._profiles=r.profiles}catch(r){console.error("chronotope: loading profiles failed",r)}}async _runQuery(){if(this.hass)try{let r=await Yo(this.hass,ii(this._filters));this._events=r.events,this._error=null,this._selectedId&&!this._events.some(a=>a.id===this._selectedId)&&(this._selectedId=null)}catch(r){this._error=w("error.query",{msg:r.message||r.code||r})}}_onProfileSelected(r){this._selectedProfileId=r.detail.id;let a=this._profiles.find(o=>o.id===r.detail.id);a&&this._applyProfileFilters(a.filters||{})}_applyProfileFilters(r){let a=r.center||this._filters.center;this._filters={...this._filters,categories:r.categories||[],radiusEnabled:!!(r.center&&r.radius_km!=null),radiusKm:r.radius_km!=null?r.radius_km:this._filters.radiusKm,center:a,start:sr(r.start),end:sr(r.end),weekdays:r.weekdays||[],timeMode:r.time_from||r.time_to?"range":"allday",timeFrom:r.time_from||"",timeTo:r.time_to||"",text:r.text||"",favoritesOnly:!!r.favorites_only,dayFilter:""},this._scheduleQuery()}async _onProfileSave(r){try{let a=await nr(this.hass,{id:r.detail.id,name:r.detail.name,filters:ii(this._filters)});await this._loadProfiles(),this._selectedProfileId=a.profile.id,this._error=null}catch(a){this._error=w("error.profileSave",{msg:a.message||a.code||a})}}async _onProfileDelete(r){try{await or(this.hass,r.detail.id),this._selectedProfileId===r.detail.id&&(this._selectedProfileId=""),await this._loadProfiles()}catch(a){this._error=w("error.profileDelete",{msg:a.message||a.code||a})}}_editorElement(){return this.renderRoot.querySelector("chronotope-event-editor")}_onNewEvent(){let r=new Date;r.setMinutes(0,0,0);let a=new Date(r.getTime()+2*36e5);this._editing={start_time:r.toISOString(),end_time:a.toISOString()},this._capture=null}_onEventEdit(r){let a=this._events.find(o=>o.id===r.detail.id);a&&(this._editing=a,this._capture=null)}async _onEditorSave(r){try{await Qo(this.hass,r.detail.event),this._editing=null,this._capture=null,this._error=null,await this._runQuery(),await this._loadCategories()}catch(a){this._error=w("error.save",{msg:a.message||a.code||a})}}async _onEditorDelete(r){try{await tr(this.hass,r.detail.id),this._editing=null,this._capture=null,await this._runQuery()}catch(a){this._error=w("error.delete",{msg:a.message||a.code||a})}}_onEditorCancel(){this._editing=null,this._capture=null}_onCaptureRequest(r){let a=r.detail.mode;this._capture=a?{mode:a,points:[]}:null}_onCaptureFinish(){let r=this._capture;if(r){if(r.mode==="line"&&r.points.length>=2)this._editorElement()?.setGeometry({type:"LineString",coordinates:r.points.map(([a,o])=>[o,a])});else if(r.mode==="polygon"&&r.points.length>=3){let a=r.points.map(([o,l])=>[l,o]);a.push(a[0]),this._editorElement()?.setGeometry({type:"Polygon",coordinates:[a]})}else{this._error=w("error.capture");return}this._capture=null,this._error=null}}async _onEventFlag(r){let{id:a,...o}=r.detail;try{await er(this.hass,a,o),await this._runQuery()}catch(l){this._error=w("error.action",{msg:l.message||l.code||l})}}async _onIcsRequested(){try{let r=this._selectedProfileId?{profile_id:this._selectedProfileId}:ii(this._filters),a=await Xo(this.hass,r);await navigator.clipboard.writeText(a.url),this._icsCopied=!0,setTimeout(()=>{this._icsCopied=!1},3e3)}catch(r){this._error=w("error.ics",{msg:r.message||r.code||r})}}};it(Ee,"properties",{hass:{attribute:!1},narrow:{attribute:!1},route:{attribute:!1},panel:{attribute:!1},_events:{state:!0},_categories:{state:!0},_filters:{state:!0},_selectedId:{state:!0},_icsCopied:{state:!0},_error:{state:!0},_profiles:{state:!0},_selectedProfileId:{state:!0},_editing:{state:!0},_capture:{state:!0},_stats:{state:!0}}),it(Ee,"styles",at`
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
      flex: 1 1 50%;
      border-inline-end: none;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }
    .content.narrow chronotope-map-view {
      flex: 1 1 50%;
    }
  `);customElements.define("chronotope-panel",Ee);
