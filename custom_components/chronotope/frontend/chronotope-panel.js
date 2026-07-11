var ys=Object.create;var $i=Object.defineProperty;var xs=Object.getOwnPropertyDescriptor;var bs=Object.getOwnPropertyNames;var ws=Object.getPrototypeOf,Ls=Object.prototype.hasOwnProperty;var Ps=(d,r,l)=>r in d?$i(d,r,{enumerable:!0,configurable:!0,writable:!0,value:l}):d[r]=l;var lo=(d,r)=>()=>(r||d((r={exports:{}}).exports,r),r.exports);var Cs=(d,r,l,o)=>{if(r&&typeof r=="object"||typeof r=="function")for(let a of bs(r))!Ls.call(d,a)&&a!==l&&$i(d,a,{get:()=>r[a],enumerable:!(o=xs(r,a))||o.enumerable});return d};var ho=(d,r,l)=>(l=d!=null?ys(ws(d)):{},Cs(r||!d||!d.__esModule?$i(l,"default",{value:d,enumerable:!0}):l,d));var et=(d,r,l)=>Ps(d,typeof r!="symbol"?r+"":r,l);var Mo=lo((Je,To)=>{(function(d,r){typeof Je=="object"&&typeof To<"u"?r(Je):typeof define=="function"&&define.amd?define(["exports"],r):(d=typeof globalThis<"u"?globalThis:d||self,r(d.leaflet={}))})(Je,function(d){"use strict";var r="1.9.4";function l(t){var e,i,n,s;for(i=1,n=arguments.length;i<n;i++){s=arguments[i];for(e in s)t[e]=s[e]}return t}var o=Object.create||function(){function t(){}return function(e){return t.prototype=e,new t}}();function a(t,e){var i=Array.prototype.slice;if(t.bind)return t.bind.apply(t,i.call(arguments,1));var n=i.call(arguments,2);return function(){return t.apply(e,n.length?n.concat(i.call(arguments)):arguments)}}var u=0;function c(t){return"_leaflet_id"in t||(t._leaflet_id=++u),t._leaflet_id}function _(t,e,i){var n,s,h,f;return f=function(){n=!1,s&&(h.apply(i,s),s=!1)},h=function(){n?s=arguments:(t.apply(i,arguments),setTimeout(f,e),n=!0)},h}function g(t,e,i){var n=e[1],s=e[0],h=n-s;return t===n&&i?t:((t-s)%h+h)%h+s}function p(){return!1}function x(t,e){if(e===!1)return t;var i=Math.pow(10,e===void 0?6:e);return Math.round(t*i)/i}function y(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function P(t){return y(t).split(/\s+/)}function w(t,e){Object.prototype.hasOwnProperty.call(t,"options")||(t.options=t.options?o(t.options):{});for(var i in e)t.options[i]=e[i];return t.options}function D(t,e,i){var n=[];for(var s in t)n.push(encodeURIComponent(i?s.toUpperCase():s)+"="+encodeURIComponent(t[s]));return(!e||e.indexOf("?")===-1?"?":"&")+n.join("&")}var z=/\{ *([\w_ -]+) *\}/g;function H(t,e){return t.replace(z,function(i,n){var s=e[n];if(s===void 0)throw new Error("No value provided for variable "+i);return typeof s=="function"&&(s=s(e)),s})}var U=Array.isArray||function(t){return Object.prototype.toString.call(t)==="[object Array]"};function yt(t,e){for(var i=0;i<t.length;i++)if(t[i]===e)return i;return-1}var at="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function Qt(t){return window["webkit"+t]||window["moz"+t]||window["ms"+t]}var Vi=0;function ji(t){var e=+new Date,i=Math.max(0,16-(e-Vi));return Vi=e+i,window.setTimeout(t,i)}var ti=window.requestAnimationFrame||Qt("RequestAnimationFrame")||ji,Ki=window.cancelAnimationFrame||Qt("CancelAnimationFrame")||Qt("CancelRequestAnimationFrame")||function(t){window.clearTimeout(t)};function it(t,e,i){if(i&&ti===ji)t.call(e);else return ti.call(window,a(t,e))}function ht(t){t&&Ki.call(window,t)}var Vo={__proto__:null,extend:l,create:o,bind:a,get lastId(){return u},stamp:c,throttle:_,wrapNum:g,falseFn:p,formatNum:x,trim:y,splitWords:P,setOptions:w,getParamString:D,template:H,isArray:U,indexOf:yt,emptyImageUrl:at,requestFn:ti,cancelFn:Ki,requestAnimFrame:it,cancelAnimFrame:ht};function xt(){}xt.extend=function(t){var e=function(){w(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},i=e.__super__=this.prototype,n=o(i);n.constructor=e,e.prototype=n;for(var s in this)Object.prototype.hasOwnProperty.call(this,s)&&s!=="prototype"&&s!=="__super__"&&(e[s]=this[s]);return t.statics&&l(e,t.statics),t.includes&&(jo(t.includes),l.apply(null,[n].concat(t.includes))),l(n,t),delete n.statics,delete n.includes,n.options&&(n.options=i.options?o(i.options):{},l(n.options,t.options)),n._initHooks=[],n.callInitHooks=function(){if(!this._initHooksCalled){i.callInitHooks&&i.callInitHooks.call(this),this._initHooksCalled=!0;for(var h=0,f=n._initHooks.length;h<f;h++)n._initHooks[h].call(this)}},e},xt.include=function(t){var e=this.prototype.options;return l(this.prototype,t),t.options&&(this.prototype.options=e,this.mergeOptions(t.options)),this},xt.mergeOptions=function(t){return l(this.prototype.options,t),this},xt.addInitHook=function(t){var e=Array.prototype.slice.call(arguments,1),i=typeof t=="function"?t:function(){this[t].apply(this,e)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(i),this};function jo(t){if(!(typeof L>"u"||!L||!L.Mixin)){t=U(t)?t:[t];for(var e=0;e<t.length;e++)t[e]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",new Error().stack)}}var lt={on:function(t,e,i){if(typeof t=="object")for(var n in t)this._on(n,t[n],e);else{t=P(t);for(var s=0,h=t.length;s<h;s++)this._on(t[s],e,i)}return this},off:function(t,e,i){if(!arguments.length)delete this._events;else if(typeof t=="object")for(var n in t)this._off(n,t[n],e);else{t=P(t);for(var s=arguments.length===1,h=0,f=t.length;h<f;h++)s?this._off(t[h]):this._off(t[h],e,i)}return this},_on:function(t,e,i,n){if(typeof e!="function"){console.warn("wrong listener type: "+typeof e);return}if(this._listens(t,e,i)===!1){i===this&&(i=void 0);var s={fn:e,ctx:i};n&&(s.once=!0),this._events=this._events||{},this._events[t]=this._events[t]||[],this._events[t].push(s)}},_off:function(t,e,i){var n,s,h;if(this._events&&(n=this._events[t],!!n)){if(arguments.length===1){if(this._firingCount)for(s=0,h=n.length;s<h;s++)n[s].fn=p;delete this._events[t];return}if(typeof e!="function"){console.warn("wrong listener type: "+typeof e);return}var f=this._listens(t,e,i);if(f!==!1){var m=n[f];this._firingCount&&(m.fn=p,this._events[t]=n=n.slice()),n.splice(f,1)}}},fire:function(t,e,i){if(!this.listens(t,i))return this;var n=l({},e,{type:t,target:this,sourceTarget:e&&e.sourceTarget||this});if(this._events){var s=this._events[t];if(s){this._firingCount=this._firingCount+1||1;for(var h=0,f=s.length;h<f;h++){var m=s[h],v=m.fn;m.once&&this.off(t,v,m.ctx),v.call(m.ctx||this,n)}this._firingCount--}}return i&&this._propagateEvent(n),this},listens:function(t,e,i,n){typeof t!="string"&&console.warn('"string" type argument expected');var s=e;typeof e!="function"&&(n=!!e,s=void 0,i=void 0);var h=this._events&&this._events[t];if(h&&h.length&&this._listens(t,s,i)!==!1)return!0;if(n){for(var f in this._eventParents)if(this._eventParents[f].listens(t,e,i,n))return!0}return!1},_listens:function(t,e,i){if(!this._events)return!1;var n=this._events[t]||[];if(!e)return!!n.length;i===this&&(i=void 0);for(var s=0,h=n.length;s<h;s++)if(n[s].fn===e&&n[s].ctx===i)return s;return!1},once:function(t,e,i){if(typeof t=="object")for(var n in t)this._on(n,t[n],e,!0);else{t=P(t);for(var s=0,h=t.length;s<h;s++)this._on(t[s],e,i,!0)}return this},addEventParent:function(t){return this._eventParents=this._eventParents||{},this._eventParents[c(t)]=t,this},removeEventParent:function(t){return this._eventParents&&delete this._eventParents[c(t)],this},_propagateEvent:function(t){for(var e in this._eventParents)this._eventParents[e].fire(t.type,l({layer:t.target,propagatedFrom:t.target},t),!0)}};lt.addEventListener=lt.on,lt.removeEventListener=lt.clearAllEventListeners=lt.off,lt.addOneTimeEventListener=lt.once,lt.fireEvent=lt.fire,lt.hasEventListeners=lt.listens;var te=xt.extend(lt);function M(t,e,i){this.x=i?Math.round(t):t,this.y=i?Math.round(e):e}var Yi=Math.trunc||function(t){return t>0?Math.floor(t):Math.ceil(t)};M.prototype={clone:function(){return new M(this.x,this.y)},add:function(t){return this.clone()._add(T(t))},_add:function(t){return this.x+=t.x,this.y+=t.y,this},subtract:function(t){return this.clone()._subtract(T(t))},_subtract:function(t){return this.x-=t.x,this.y-=t.y,this},divideBy:function(t){return this.clone()._divideBy(t)},_divideBy:function(t){return this.x/=t,this.y/=t,this},multiplyBy:function(t){return this.clone()._multiplyBy(t)},_multiplyBy:function(t){return this.x*=t,this.y*=t,this},scaleBy:function(t){return new M(this.x*t.x,this.y*t.y)},unscaleBy:function(t){return new M(this.x/t.x,this.y/t.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=Yi(this.x),this.y=Yi(this.y),this},distanceTo:function(t){t=T(t);var e=t.x-this.x,i=t.y-this.y;return Math.sqrt(e*e+i*i)},equals:function(t){return t=T(t),t.x===this.x&&t.y===this.y},contains:function(t){return t=T(t),Math.abs(t.x)<=Math.abs(this.x)&&Math.abs(t.y)<=Math.abs(this.y)},toString:function(){return"Point("+x(this.x)+", "+x(this.y)+")"}};function T(t,e,i){return t instanceof M?t:U(t)?new M(t[0],t[1]):t==null?t:typeof t=="object"&&"x"in t&&"y"in t?new M(t.x,t.y):new M(t,e,i)}function G(t,e){if(t)for(var i=e?[t,e]:t,n=0,s=i.length;n<s;n++)this.extend(i[n])}G.prototype={extend:function(t){var e,i;if(!t)return this;if(t instanceof M||typeof t[0]=="number"||"x"in t)e=i=T(t);else if(t=nt(t),e=t.min,i=t.max,!e||!i)return this;return!this.min&&!this.max?(this.min=e.clone(),this.max=i.clone()):(this.min.x=Math.min(e.x,this.min.x),this.max.x=Math.max(i.x,this.max.x),this.min.y=Math.min(e.y,this.min.y),this.max.y=Math.max(i.y,this.max.y)),this},getCenter:function(t){return T((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,t)},getBottomLeft:function(){return T(this.min.x,this.max.y)},getTopRight:function(){return T(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(t){var e,i;return typeof t[0]=="number"||t instanceof M?t=T(t):t=nt(t),t instanceof G?(e=t.min,i=t.max):e=i=t,e.x>=this.min.x&&i.x<=this.max.x&&e.y>=this.min.y&&i.y<=this.max.y},intersects:function(t){t=nt(t);var e=this.min,i=this.max,n=t.min,s=t.max,h=s.x>=e.x&&n.x<=i.x,f=s.y>=e.y&&n.y<=i.y;return h&&f},overlaps:function(t){t=nt(t);var e=this.min,i=this.max,n=t.min,s=t.max,h=s.x>e.x&&n.x<i.x,f=s.y>e.y&&n.y<i.y;return h&&f},isValid:function(){return!!(this.min&&this.max)},pad:function(t){var e=this.min,i=this.max,n=Math.abs(e.x-i.x)*t,s=Math.abs(e.y-i.y)*t;return nt(T(e.x-n,e.y-s),T(i.x+n,i.y+s))},equals:function(t){return t?(t=nt(t),this.min.equals(t.getTopLeft())&&this.max.equals(t.getBottomRight())):!1}};function nt(t,e){return!t||t instanceof G?t:new G(t,e)}function ot(t,e){if(t)for(var i=e?[t,e]:t,n=0,s=i.length;n<s;n++)this.extend(i[n])}ot.prototype={extend:function(t){var e=this._southWest,i=this._northEast,n,s;if(t instanceof R)n=t,s=t;else if(t instanceof ot){if(n=t._southWest,s=t._northEast,!n||!s)return this}else return t?this.extend(Z(t)||V(t)):this;return!e&&!i?(this._southWest=new R(n.lat,n.lng),this._northEast=new R(s.lat,s.lng)):(e.lat=Math.min(n.lat,e.lat),e.lng=Math.min(n.lng,e.lng),i.lat=Math.max(s.lat,i.lat),i.lng=Math.max(s.lng,i.lng)),this},pad:function(t){var e=this._southWest,i=this._northEast,n=Math.abs(e.lat-i.lat)*t,s=Math.abs(e.lng-i.lng)*t;return new ot(new R(e.lat-n,e.lng-s),new R(i.lat+n,i.lng+s))},getCenter:function(){return new R((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new R(this.getNorth(),this.getWest())},getSouthEast:function(){return new R(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(t){typeof t[0]=="number"||t instanceof R||"lat"in t?t=Z(t):t=V(t);var e=this._southWest,i=this._northEast,n,s;return t instanceof ot?(n=t.getSouthWest(),s=t.getNorthEast()):n=s=t,n.lat>=e.lat&&s.lat<=i.lat&&n.lng>=e.lng&&s.lng<=i.lng},intersects:function(t){t=V(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),s=t.getNorthEast(),h=s.lat>=e.lat&&n.lat<=i.lat,f=s.lng>=e.lng&&n.lng<=i.lng;return h&&f},overlaps:function(t){t=V(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),s=t.getNorthEast(),h=s.lat>e.lat&&n.lat<i.lat,f=s.lng>e.lng&&n.lng<i.lng;return h&&f},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(t,e){return t?(t=V(t),this._southWest.equals(t.getSouthWest(),e)&&this._northEast.equals(t.getNorthEast(),e)):!1},isValid:function(){return!!(this._southWest&&this._northEast)}};function V(t,e){return t instanceof ot?t:new ot(t,e)}function R(t,e,i){if(isNaN(t)||isNaN(e))throw new Error("Invalid LatLng object: ("+t+", "+e+")");this.lat=+t,this.lng=+e,i!==void 0&&(this.alt=+i)}R.prototype={equals:function(t,e){if(!t)return!1;t=Z(t);var i=Math.max(Math.abs(this.lat-t.lat),Math.abs(this.lng-t.lng));return i<=(e===void 0?1e-9:e)},toString:function(t){return"LatLng("+x(this.lat,t)+", "+x(this.lng,t)+")"},distanceTo:function(t){return St.distance(this,Z(t))},wrap:function(){return St.wrapLatLng(this)},toBounds:function(t){var e=180*t/40075017,i=e/Math.cos(Math.PI/180*this.lat);return V([this.lat-e,this.lng-i],[this.lat+e,this.lng+i])},clone:function(){return new R(this.lat,this.lng,this.alt)}};function Z(t,e,i){return t instanceof R?t:U(t)&&typeof t[0]!="object"?t.length===3?new R(t[0],t[1],t[2]):t.length===2?new R(t[0],t[1]):null:t==null?t:typeof t=="object"&&"lat"in t?new R(t.lat,"lng"in t?t.lng:t.lon,t.alt):e===void 0?null:new R(t,e,i)}var bt={latLngToPoint:function(t,e){var i=this.projection.project(t),n=this.scale(e);return this.transformation._transform(i,n)},pointToLatLng:function(t,e){var i=this.scale(e),n=this.transformation.untransform(t,i);return this.projection.unproject(n)},project:function(t){return this.projection.project(t)},unproject:function(t){return this.projection.unproject(t)},scale:function(t){return 256*Math.pow(2,t)},zoom:function(t){return Math.log(t/256)/Math.LN2},getProjectedBounds:function(t){if(this.infinite)return null;var e=this.projection.bounds,i=this.scale(t),n=this.transformation.transform(e.min,i),s=this.transformation.transform(e.max,i);return new G(n,s)},infinite:!1,wrapLatLng:function(t){var e=this.wrapLng?g(t.lng,this.wrapLng,!0):t.lng,i=this.wrapLat?g(t.lat,this.wrapLat,!0):t.lat,n=t.alt;return new R(i,e,n)},wrapLatLngBounds:function(t){var e=t.getCenter(),i=this.wrapLatLng(e),n=e.lat-i.lat,s=e.lng-i.lng;if(n===0&&s===0)return t;var h=t.getSouthWest(),f=t.getNorthEast(),m=new R(h.lat-n,h.lng-s),v=new R(f.lat-n,f.lng-s);return new ot(m,v)}},St=l({},bt,{wrapLng:[-180,180],R:6371e3,distance:function(t,e){var i=Math.PI/180,n=t.lat*i,s=e.lat*i,h=Math.sin((e.lat-t.lat)*i/2),f=Math.sin((e.lng-t.lng)*i/2),m=h*h+Math.cos(n)*Math.cos(s)*f*f,v=2*Math.atan2(Math.sqrt(m),Math.sqrt(1-m));return this.R*v}}),Ji=6378137,ei={R:Ji,MAX_LATITUDE:85.0511287798,project:function(t){var e=Math.PI/180,i=this.MAX_LATITUDE,n=Math.max(Math.min(i,t.lat),-i),s=Math.sin(n*e);return new M(this.R*t.lng*e,this.R*Math.log((1+s)/(1-s))/2)},unproject:function(t){var e=180/Math.PI;return new R((2*Math.atan(Math.exp(t.y/this.R))-Math.PI/2)*e,t.x*e/this.R)},bounds:function(){var t=Ji*Math.PI;return new G([-t,-t],[t,t])}()};function ii(t,e,i,n){if(U(t)){this._a=t[0],this._b=t[1],this._c=t[2],this._d=t[3];return}this._a=t,this._b=e,this._c=i,this._d=n}ii.prototype={transform:function(t,e){return this._transform(t.clone(),e)},_transform:function(t,e){return e=e||1,t.x=e*(this._a*t.x+this._b),t.y=e*(this._c*t.y+this._d),t},untransform:function(t,e){return e=e||1,new M((t.x/e-this._b)/this._a,(t.y/e-this._d)/this._c)}};function ee(t,e,i,n){return new ii(t,e,i,n)}var ni=l({},St,{code:"EPSG:3857",projection:ei,transformation:function(){var t=.5/(Math.PI*ei.R);return ee(t,.5,-t,.5)}()}),Ko=l({},ni,{code:"EPSG:900913"});function Xi(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function Qi(t,e){var i="",n,s,h,f,m,v;for(n=0,h=t.length;n<h;n++){for(m=t[n],s=0,f=m.length;s<f;s++)v=m[s],i+=(s?"L":"M")+v.x+" "+v.y;i+=e?k.svg?"z":"x":""}return i||"M0 0"}var oi=document.documentElement.style,Me="ActiveXObject"in window,Yo=Me&&!document.addEventListener,tn="msLaunchUri"in navigator&&!("documentMode"in document),ri=_t("webkit"),en=_t("android"),nn=_t("android 2")||_t("android 3"),Jo=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),Xo=en&&_t("Google")&&Jo<537&&!("AudioNode"in window),si=!!window.opera,on=!tn&&_t("chrome"),rn=_t("gecko")&&!ri&&!si&&!Me,Qo=!on&&_t("safari"),sn=_t("phantom"),an="OTransition"in oi,tr=navigator.platform.indexOf("Win")===0,ln=Me&&"transition"in oi,ai="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!nn,hn="MozPerspective"in oi,er=!window.L_DISABLE_3D&&(ln||ai||hn)&&!an&&!sn,ie=typeof orientation<"u"||_t("mobile"),ir=ie&&ri,nr=ie&&ai,un=!window.PointerEvent&&window.MSPointerEvent,cn=!!(window.PointerEvent||un),dn="ontouchstart"in window||!!window.TouchEvent,or=!window.L_NO_TOUCH&&(dn||cn),rr=ie&&si,sr=ie&&rn,ar=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,lr=function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("testPassiveEventSupport",p,e),window.removeEventListener("testPassiveEventSupport",p,e)}catch{}return t}(),hr=function(){return!!document.createElement("canvas").getContext}(),li=!!(document.createElementNS&&Xi("svg").createSVGRect),ur=!!li&&function(){var t=document.createElement("div");return t.innerHTML="<svg/>",(t.firstChild&&t.firstChild.namespaceURI)==="http://www.w3.org/2000/svg"}(),cr=!li&&function(){try{var t=document.createElement("div");t.innerHTML='<v:shape adj="1"/>';var e=t.firstChild;return e.style.behavior="url(#default#VML)",e&&typeof e.adj=="object"}catch{return!1}}(),dr=navigator.platform.indexOf("Mac")===0,fr=navigator.platform.indexOf("Linux")===0;function _t(t){return navigator.userAgent.toLowerCase().indexOf(t)>=0}var k={ie:Me,ielt9:Yo,edge:tn,webkit:ri,android:en,android23:nn,androidStock:Xo,opera:si,chrome:on,gecko:rn,safari:Qo,phantom:sn,opera12:an,win:tr,ie3d:ln,webkit3d:ai,gecko3d:hn,any3d:er,mobile:ie,mobileWebkit:ir,mobileWebkit3d:nr,msPointer:un,pointer:cn,touch:or,touchNative:dn,mobileOpera:rr,mobileGecko:sr,retina:ar,passiveEvents:lr,canvas:hr,svg:li,vml:cr,inlineSvg:ur,mac:dr,linux:fr},fn=k.msPointer?"MSPointerDown":"pointerdown",pn=k.msPointer?"MSPointerMove":"pointermove",_n=k.msPointer?"MSPointerUp":"pointerup",mn=k.msPointer?"MSPointerCancel":"pointercancel",hi={touchstart:fn,touchmove:pn,touchend:_n,touchcancel:mn},gn={touchstart:yr,touchmove:Ee,touchend:Ee,touchcancel:Ee},Ft={},vn=!1;function pr(t,e,i){return e==="touchstart"&&vr(),gn[e]?(i=gn[e].bind(this,i),t.addEventListener(hi[e],i,!1),i):(console.warn("wrong event specified:",e),p)}function _r(t,e,i){if(!hi[e]){console.warn("wrong event specified:",e);return}t.removeEventListener(hi[e],i,!1)}function mr(t){Ft[t.pointerId]=t}function gr(t){Ft[t.pointerId]&&(Ft[t.pointerId]=t)}function yn(t){delete Ft[t.pointerId]}function vr(){vn||(document.addEventListener(fn,mr,!0),document.addEventListener(pn,gr,!0),document.addEventListener(_n,yn,!0),document.addEventListener(mn,yn,!0),vn=!0)}function Ee(t,e){if(e.pointerType!==(e.MSPOINTER_TYPE_MOUSE||"mouse")){e.touches=[];for(var i in Ft)e.touches.push(Ft[i]);e.changedTouches=[e],t(e)}}function yr(t,e){e.MSPOINTER_TYPE_TOUCH&&e.pointerType===e.MSPOINTER_TYPE_TOUCH&&X(e),Ee(t,e)}function xr(t){var e={},i,n;for(n in t)i=t[n],e[n]=i&&i.bind?i.bind(t):i;return t=e,e.type="dblclick",e.detail=2,e.isTrusted=!1,e._simulated=!0,e}var br=200;function wr(t,e){t.addEventListener("dblclick",e);var i=0,n;function s(h){if(h.detail!==1){n=h.detail;return}if(!(h.pointerType==="mouse"||h.sourceCapabilities&&!h.sourceCapabilities.firesTouchEvents)){var f=Pn(h);if(!(f.some(function(v){return v instanceof HTMLLabelElement&&v.attributes.for})&&!f.some(function(v){return v instanceof HTMLInputElement||v instanceof HTMLSelectElement}))){var m=Date.now();m-i<=br?(n++,n===2&&e(xr(h))):n=1,i=m}}}return t.addEventListener("click",s),{dblclick:e,simDblclick:s}}function Lr(t,e){t.removeEventListener("dblclick",e.dblclick),t.removeEventListener("click",e.simDblclick)}var ui=Oe(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),ne=Oe(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),xn=ne==="webkitTransition"||ne==="OTransition"?ne+"End":"transitionend";function bn(t){return typeof t=="string"?document.getElementById(t):t}function oe(t,e){var i=t.style[e]||t.currentStyle&&t.currentStyle[e];if((!i||i==="auto")&&document.defaultView){var n=document.defaultView.getComputedStyle(t,null);i=n?n[e]:null}return i==="auto"?null:i}function N(t,e,i){var n=document.createElement(t);return n.className=e||"",i&&i.appendChild(n),n}function W(t){var e=t.parentNode;e&&e.removeChild(t)}function ze(t){for(;t.firstChild;)t.removeChild(t.firstChild)}function Ht(t){var e=t.parentNode;e&&e.lastChild!==t&&e.appendChild(t)}function Ut(t){var e=t.parentNode;e&&e.firstChild!==t&&e.insertBefore(t,e.firstChild)}function ci(t,e){if(t.classList!==void 0)return t.classList.contains(e);var i=Ae(t);return i.length>0&&new RegExp("(^|\\s)"+e+"(\\s|$)").test(i)}function A(t,e){if(t.classList!==void 0)for(var i=P(e),n=0,s=i.length;n<s;n++)t.classList.add(i[n]);else if(!ci(t,e)){var h=Ae(t);di(t,(h?h+" ":"")+e)}}function q(t,e){t.classList!==void 0?t.classList.remove(e):di(t,y((" "+Ae(t)+" ").replace(" "+e+" "," ")))}function di(t,e){t.className.baseVal===void 0?t.className=e:t.className.baseVal=e}function Ae(t){return t.correspondingElement&&(t=t.correspondingElement),t.className.baseVal===void 0?t.className:t.className.baseVal}function ut(t,e){"opacity"in t.style?t.style.opacity=e:"filter"in t.style&&Pr(t,e)}function Pr(t,e){var i=!1,n="DXImageTransform.Microsoft.Alpha";try{i=t.filters.item(n)}catch{if(e===1)return}e=Math.round(e*100),i?(i.Enabled=e!==100,i.Opacity=e):t.style.filter+=" progid:"+n+"(opacity="+e+")"}function Oe(t){for(var e=document.documentElement.style,i=0;i<t.length;i++)if(t[i]in e)return t[i];return!1}function At(t,e,i){var n=e||new M(0,0);t.style[ui]=(k.ie3d?"translate("+n.x+"px,"+n.y+"px)":"translate3d("+n.x+"px,"+n.y+"px,0)")+(i?" scale("+i+")":"")}function j(t,e){t._leaflet_pos=e,k.any3d?At(t,e):(t.style.left=e.x+"px",t.style.top=e.y+"px")}function Ot(t){return t._leaflet_pos||new M(0,0)}var re,se,fi;if("onselectstart"in document)re=function(){E(window,"selectstart",X)},se=function(){F(window,"selectstart",X)};else{var ae=Oe(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);re=function(){if(ae){var t=document.documentElement.style;fi=t[ae],t[ae]="none"}},se=function(){ae&&(document.documentElement.style[ae]=fi,fi=void 0)}}function pi(){E(window,"dragstart",X)}function _i(){F(window,"dragstart",X)}var Ie,mi;function gi(t){for(;t.tabIndex===-1;)t=t.parentNode;t.style&&($e(),Ie=t,mi=t.style.outlineStyle,t.style.outlineStyle="none",E(window,"keydown",$e))}function $e(){Ie&&(Ie.style.outlineStyle=mi,Ie=void 0,mi=void 0,F(window,"keydown",$e))}function wn(t){do t=t.parentNode;while((!t.offsetWidth||!t.offsetHeight)&&t!==document.body);return t}function vi(t){var e=t.getBoundingClientRect();return{x:e.width/t.offsetWidth||1,y:e.height/t.offsetHeight||1,boundingClientRect:e}}var Cr={__proto__:null,TRANSFORM:ui,TRANSITION:ne,TRANSITION_END:xn,get:bn,getStyle:oe,create:N,remove:W,empty:ze,toFront:Ht,toBack:Ut,hasClass:ci,addClass:A,removeClass:q,setClass:di,getClass:Ae,setOpacity:ut,testProp:Oe,setTransform:At,setPosition:j,getPosition:Ot,get disableTextSelection(){return re},get enableTextSelection(){return se},disableImageDrag:pi,enableImageDrag:_i,preventOutline:gi,restoreOutline:$e,getSizedParentNode:wn,getScale:vi};function E(t,e,i,n){if(e&&typeof e=="object")for(var s in e)xi(t,s,e[s],i);else{e=P(e);for(var h=0,f=e.length;h<f;h++)xi(t,e[h],i,n)}return this}var mt="_leaflet_events";function F(t,e,i,n){if(arguments.length===1)Ln(t),delete t[mt];else if(e&&typeof e=="object")for(var s in e)bi(t,s,e[s],i);else if(e=P(e),arguments.length===2)Ln(t,function(m){return yt(e,m)!==-1});else for(var h=0,f=e.length;h<f;h++)bi(t,e[h],i,n);return this}function Ln(t,e){for(var i in t[mt]){var n=i.split(/\d/)[0];(!e||e(n))&&bi(t,n,null,null,i)}}var yi={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function xi(t,e,i,n){var s=e+c(i)+(n?"_"+c(n):"");if(t[mt]&&t[mt][s])return this;var h=function(m){return i.call(n||t,m||window.event)},f=h;!k.touchNative&&k.pointer&&e.indexOf("touch")===0?h=pr(t,e,h):k.touch&&e==="dblclick"?h=wr(t,h):"addEventListener"in t?e==="touchstart"||e==="touchmove"||e==="wheel"||e==="mousewheel"?t.addEventListener(yi[e]||e,h,k.passiveEvents?{passive:!1}:!1):e==="mouseenter"||e==="mouseleave"?(h=function(m){m=m||window.event,Li(t,m)&&f(m)},t.addEventListener(yi[e],h,!1)):t.addEventListener(e,f,!1):t.attachEvent("on"+e,h),t[mt]=t[mt]||{},t[mt][s]=h}function bi(t,e,i,n,s){s=s||e+c(i)+(n?"_"+c(n):"");var h=t[mt]&&t[mt][s];if(!h)return this;!k.touchNative&&k.pointer&&e.indexOf("touch")===0?_r(t,e,h):k.touch&&e==="dblclick"?Lr(t,h):"removeEventListener"in t?t.removeEventListener(yi[e]||e,h,!1):t.detachEvent("on"+e,h),t[mt][s]=null}function It(t){return t.stopPropagation?t.stopPropagation():t.originalEvent?t.originalEvent._stopped=!0:t.cancelBubble=!0,this}function wi(t){return xi(t,"wheel",It),this}function le(t){return E(t,"mousedown touchstart dblclick contextmenu",It),t._leaflet_disable_click=!0,this}function X(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,this}function $t(t){return X(t),It(t),this}function Pn(t){if(t.composedPath)return t.composedPath();for(var e=[],i=t.target;i;)e.push(i),i=i.parentNode;return e}function Cn(t,e){if(!e)return new M(t.clientX,t.clientY);var i=vi(e),n=i.boundingClientRect;return new M((t.clientX-n.left)/i.x-e.clientLeft,(t.clientY-n.top)/i.y-e.clientTop)}var kr=k.linux&&k.chrome?window.devicePixelRatio:k.mac?window.devicePixelRatio*3:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function kn(t){return k.edge?t.wheelDeltaY/2:t.deltaY&&t.deltaMode===0?-t.deltaY/kr:t.deltaY&&t.deltaMode===1?-t.deltaY*20:t.deltaY&&t.deltaMode===2?-t.deltaY*60:t.deltaX||t.deltaZ?0:t.wheelDelta?(t.wheelDeltaY||t.wheelDelta)/2:t.detail&&Math.abs(t.detail)<32765?-t.detail*20:t.detail?t.detail/-32765*60:0}function Li(t,e){var i=e.relatedTarget;if(!i)return!0;try{for(;i&&i!==t;)i=i.parentNode}catch{return!1}return i!==t}var Sr={__proto__:null,on:E,off:F,stopPropagation:It,disableScrollPropagation:wi,disableClickPropagation:le,preventDefault:X,stop:$t,getPropagationPath:Pn,getMousePosition:Cn,getWheelDelta:kn,isExternalTarget:Li,addListener:E,removeListener:F},Sn=te.extend({run:function(t,e,i,n){this.stop(),this._el=t,this._inProgress=!0,this._duration=i||.25,this._easeOutPower=1/Math.max(n||.5,.2),this._startPos=Ot(t),this._offset=e.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=it(this._animate,this),this._step()},_step:function(t){var e=+new Date-this._startTime,i=this._duration*1e3;e<i?this._runFrame(this._easeOut(e/i),t):(this._runFrame(1),this._complete())},_runFrame:function(t,e){var i=this._startPos.add(this._offset.multiplyBy(t));e&&i._round(),j(this._el,i),this.fire("step")},_complete:function(){ht(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(t){return 1-Math.pow(1-t,this._easeOutPower)}}),B=te.extend({options:{crs:ni,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(t,e){e=w(this,e),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(t),this._initLayout(),this._onResize=a(this._onResize,this),this._initEvents(),e.maxBounds&&this.setMaxBounds(e.maxBounds),e.zoom!==void 0&&(this._zoom=this._limitZoom(e.zoom)),e.center&&e.zoom!==void 0&&this.setView(Z(e.center),e.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=ne&&k.any3d&&!k.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),E(this._proxy,xn,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(t,e,i){if(e=e===void 0?this._zoom:this._limitZoom(e),t=this._limitCenter(Z(t),e,this.options.maxBounds),i=i||{},this._stop(),this._loaded&&!i.reset&&i!==!0){i.animate!==void 0&&(i.zoom=l({animate:i.animate},i.zoom),i.pan=l({animate:i.animate,duration:i.duration},i.pan));var n=this._zoom!==e?this._tryAnimatedZoom&&this._tryAnimatedZoom(t,e,i.zoom):this._tryAnimatedPan(t,i.pan);if(n)return clearTimeout(this._sizeTimer),this}return this._resetView(t,e,i.pan&&i.pan.noMoveStart),this},setZoom:function(t,e){return this._loaded?this.setView(this.getCenter(),t,{zoom:e}):(this._zoom=t,this)},zoomIn:function(t,e){return t=t||(k.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+t,e)},zoomOut:function(t,e){return t=t||(k.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-t,e)},setZoomAround:function(t,e,i){var n=this.getZoomScale(e),s=this.getSize().divideBy(2),h=t instanceof M?t:this.latLngToContainerPoint(t),f=h.subtract(s).multiplyBy(1-1/n),m=this.containerPointToLatLng(s.add(f));return this.setView(m,e,{zoom:i})},_getBoundsCenterZoom:function(t,e){e=e||{},t=t.getBounds?t.getBounds():V(t);var i=T(e.paddingTopLeft||e.padding||[0,0]),n=T(e.paddingBottomRight||e.padding||[0,0]),s=this.getBoundsZoom(t,!1,i.add(n));if(s=typeof e.maxZoom=="number"?Math.min(e.maxZoom,s):s,s===1/0)return{center:t.getCenter(),zoom:s};var h=n.subtract(i).divideBy(2),f=this.project(t.getSouthWest(),s),m=this.project(t.getNorthEast(),s),v=this.unproject(f.add(m).divideBy(2).add(h),s);return{center:v,zoom:s}},fitBounds:function(t,e){if(t=V(t),!t.isValid())throw new Error("Bounds are not valid.");var i=this._getBoundsCenterZoom(t,e);return this.setView(i.center,i.zoom,e)},fitWorld:function(t){return this.fitBounds([[-90,-180],[90,180]],t)},panTo:function(t,e){return this.setView(t,this._zoom,{pan:e})},panBy:function(t,e){if(t=T(t).round(),e=e||{},!t.x&&!t.y)return this.fire("moveend");if(e.animate!==!0&&!this.getSize().contains(t))return this._resetView(this.unproject(this.project(this.getCenter()).add(t)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new Sn,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),e.noMoveStart||this.fire("movestart"),e.animate!==!1){A(this._mapPane,"leaflet-pan-anim");var i=this._getMapPanePos().subtract(t).round();this._panAnim.run(this._mapPane,i,e.duration||.25,e.easeLinearity)}else this._rawPanBy(t),this.fire("move").fire("moveend");return this},flyTo:function(t,e,i){if(i=i||{},i.animate===!1||!k.any3d)return this.setView(t,e,i);this._stop();var n=this.project(this.getCenter()),s=this.project(t),h=this.getSize(),f=this._zoom;t=Z(t),e=e===void 0?f:e;var m=Math.max(h.x,h.y),v=m*this.getZoomScale(f,e),b=s.distanceTo(n)||1,C=1.42,S=C*C;function O(K){var Ve=K?-1:1,_s=K?v:m,ms=v*v-m*m+Ve*S*S*b*b,gs=2*_s*S*b,Ii=ms/gs,ao=Math.sqrt(Ii*Ii+1)-Ii,vs=ao<1e-9?-18:Math.log(ao);return vs}function tt(K){return(Math.exp(K)-Math.exp(-K))/2}function J(K){return(Math.exp(K)+Math.exp(-K))/2}function dt(K){return tt(K)/J(K)}var rt=O(0);function Kt(K){return m*(J(rt)/J(rt+C*K))}function cs(K){return m*(J(rt)*dt(rt+C*K)-tt(rt))/S}function ds(K){return 1-Math.pow(1-K,1.5)}var fs=Date.now(),ro=(O(1)-rt)/C,ps=i.duration?1e3*i.duration:1e3*ro*.8;function so(){var K=(Date.now()-fs)/ps,Ve=ds(K)*ro;K<=1?(this._flyToFrame=it(so,this),this._move(this.unproject(n.add(s.subtract(n).multiplyBy(cs(Ve)/b)),f),this.getScaleZoom(m/Kt(Ve),f),{flyTo:!0})):this._move(t,e)._moveEnd(!0)}return this._moveStart(!0,i.noMoveStart),so.call(this),this},flyToBounds:function(t,e){var i=this._getBoundsCenterZoom(t,e);return this.flyTo(i.center,i.zoom,e)},setMaxBounds:function(t){return t=V(t),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),t.isValid()?(this.options.maxBounds=t,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(t){var e=this.options.minZoom;return this.options.minZoom=t,this._loaded&&e!==t&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(t):this},setMaxZoom:function(t){var e=this.options.maxZoom;return this.options.maxZoom=t,this._loaded&&e!==t&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(t):this},panInsideBounds:function(t,e){this._enforcingBounds=!0;var i=this.getCenter(),n=this._limitCenter(i,this._zoom,V(t));return i.equals(n)||this.panTo(n,e),this._enforcingBounds=!1,this},panInside:function(t,e){e=e||{};var i=T(e.paddingTopLeft||e.padding||[0,0]),n=T(e.paddingBottomRight||e.padding||[0,0]),s=this.project(this.getCenter()),h=this.project(t),f=this.getPixelBounds(),m=nt([f.min.add(i),f.max.subtract(n)]),v=m.getSize();if(!m.contains(h)){this._enforcingBounds=!0;var b=h.subtract(m.getCenter()),C=m.extend(h).getSize().subtract(v);s.x+=b.x<0?-C.x:C.x,s.y+=b.y<0?-C.y:C.y,this.panTo(this.unproject(s),e),this._enforcingBounds=!1}return this},invalidateSize:function(t){if(!this._loaded)return this;t=l({animate:!1,pan:!0},t===!0?{animate:!0}:t);var e=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var i=this.getSize(),n=e.divideBy(2).round(),s=i.divideBy(2).round(),h=n.subtract(s);return!h.x&&!h.y?this:(t.animate&&t.pan?this.panBy(h):(t.pan&&this._rawPanBy(h),this.fire("move"),t.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(a(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:e,newSize:i}))},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(t){if(t=this._locateOptions=l({timeout:1e4,watch:!1},t),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var e=a(this._handleGeolocationResponse,this),i=a(this._handleGeolocationError,this);return t.watch?this._locationWatchId=navigator.geolocation.watchPosition(e,i,t):navigator.geolocation.getCurrentPosition(e,i,t),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(t){if(this._container._leaflet_id){var e=t.code,i=t.message||(e===1?"permission denied":e===2?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:e,message:"Geolocation error: "+i+"."})}},_handleGeolocationResponse:function(t){if(this._container._leaflet_id){var e=t.coords.latitude,i=t.coords.longitude,n=new R(e,i),s=n.toBounds(t.coords.accuracy*2),h=this._locateOptions;if(h.setView){var f=this.getBoundsZoom(s);this.setView(n,h.maxZoom?Math.min(f,h.maxZoom):f)}var m={latlng:n,bounds:s,timestamp:t.timestamp};for(var v in t.coords)typeof t.coords[v]=="number"&&(m[v]=t.coords[v]);this.fire("locationfound",m)}},addHandler:function(t,e){if(!e)return this;var i=this[t]=new e(this);return this._handlers.push(i),this.options[t]&&i.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch{this._container._leaflet_id=void 0,this._containerId=void 0}this._locationWatchId!==void 0&&this.stopLocate(),this._stop(),W(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(ht(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload");var t;for(t in this._layers)this._layers[t].remove();for(t in this._panes)W(this._panes[t]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(t,e){var i="leaflet-pane"+(t?" leaflet-"+t.replace("Pane","")+"-pane":""),n=N("div",i,e||this._mapPane);return t&&(this._panes[t]=n),n},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var t=this.getPixelBounds(),e=this.unproject(t.getBottomLeft()),i=this.unproject(t.getTopRight());return new ot(e,i)},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(t,e,i){t=V(t),i=T(i||[0,0]);var n=this.getZoom()||0,s=this.getMinZoom(),h=this.getMaxZoom(),f=t.getNorthWest(),m=t.getSouthEast(),v=this.getSize().subtract(i),b=nt(this.project(m,n),this.project(f,n)).getSize(),C=k.any3d?this.options.zoomSnap:1,S=v.x/b.x,O=v.y/b.y,tt=e?Math.max(S,O):Math.min(S,O);return n=this.getScaleZoom(tt,n),C&&(n=Math.round(n/(C/100))*(C/100),n=e?Math.ceil(n/C)*C:Math.floor(n/C)*C),Math.max(s,Math.min(h,n))},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new M(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(t,e){var i=this._getTopLeftPoint(t,e);return new G(i,i.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(t){return this.options.crs.getProjectedBounds(t===void 0?this.getZoom():t)},getPane:function(t){return typeof t=="string"?this._panes[t]:t},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(t,e){var i=this.options.crs;return e=e===void 0?this._zoom:e,i.scale(t)/i.scale(e)},getScaleZoom:function(t,e){var i=this.options.crs;e=e===void 0?this._zoom:e;var n=i.zoom(t*i.scale(e));return isNaN(n)?1/0:n},project:function(t,e){return e=e===void 0?this._zoom:e,this.options.crs.latLngToPoint(Z(t),e)},unproject:function(t,e){return e=e===void 0?this._zoom:e,this.options.crs.pointToLatLng(T(t),e)},layerPointToLatLng:function(t){var e=T(t).add(this.getPixelOrigin());return this.unproject(e)},latLngToLayerPoint:function(t){var e=this.project(Z(t))._round();return e._subtract(this.getPixelOrigin())},wrapLatLng:function(t){return this.options.crs.wrapLatLng(Z(t))},wrapLatLngBounds:function(t){return this.options.crs.wrapLatLngBounds(V(t))},distance:function(t,e){return this.options.crs.distance(Z(t),Z(e))},containerPointToLayerPoint:function(t){return T(t).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(t){return T(t).add(this._getMapPanePos())},containerPointToLatLng:function(t){var e=this.containerPointToLayerPoint(T(t));return this.layerPointToLatLng(e)},latLngToContainerPoint:function(t){return this.layerPointToContainerPoint(this.latLngToLayerPoint(Z(t)))},mouseEventToContainerPoint:function(t){return Cn(t,this._container)},mouseEventToLayerPoint:function(t){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))},mouseEventToLatLng:function(t){return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))},_initContainer:function(t){var e=this._container=bn(t);if(e){if(e._leaflet_id)throw new Error("Map container is already initialized.")}else throw new Error("Map container not found.");E(e,"scroll",this._onScroll,this),this._containerId=c(e)},_initLayout:function(){var t=this._container;this._fadeAnimated=this.options.fadeAnimation&&k.any3d,A(t,"leaflet-container"+(k.touch?" leaflet-touch":"")+(k.retina?" leaflet-retina":"")+(k.ielt9?" leaflet-oldie":"")+(k.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var e=oe(t,"position");e!=="absolute"&&e!=="relative"&&e!=="fixed"&&e!=="sticky"&&(t.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var t=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),j(this._mapPane,new M(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(A(t.markerPane,"leaflet-zoom-hide"),A(t.shadowPane,"leaflet-zoom-hide"))},_resetView:function(t,e,i){j(this._mapPane,new M(0,0));var n=!this._loaded;this._loaded=!0,e=this._limitZoom(e),this.fire("viewprereset");var s=this._zoom!==e;this._moveStart(s,i)._move(t,e)._moveEnd(s),this.fire("viewreset"),n&&this.fire("load")},_moveStart:function(t,e){return t&&this.fire("zoomstart"),e||this.fire("movestart"),this},_move:function(t,e,i,n){e===void 0&&(e=this._zoom);var s=this._zoom!==e;return this._zoom=e,this._lastCenter=t,this._pixelOrigin=this._getNewPixelOrigin(t),n?i&&i.pinch&&this.fire("zoom",i):((s||i&&i.pinch)&&this.fire("zoom",i),this.fire("move",i)),this},_moveEnd:function(t){return t&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return ht(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(t){j(this._mapPane,this._getMapPanePos().subtract(t))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(t){this._targets={},this._targets[c(this._container)]=this;var e=t?F:E;e(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&e(window,"resize",this._onResize,this),k.any3d&&this.options.transform3DLimit&&(t?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){ht(this._resizeRequest),this._resizeRequest=it(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var t=this._getMapPanePos();Math.max(Math.abs(t.x),Math.abs(t.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(t,e){for(var i=[],n,s=e==="mouseout"||e==="mouseover",h=t.target||t.srcElement,f=!1;h;){if(n=this._targets[c(h)],n&&(e==="click"||e==="preclick")&&this._draggableMoved(n)){f=!0;break}if(n&&n.listens(e,!0)&&(s&&!Li(h,t)||(i.push(n),s))||h===this._container)break;h=h.parentNode}return!i.length&&!f&&!s&&this.listens(e,!0)&&(i=[this]),i},_isClickDisabled:function(t){for(;t&&t!==this._container;){if(t._leaflet_disable_click)return!0;t=t.parentNode}},_handleDOMEvent:function(t){var e=t.target||t.srcElement;if(!(!this._loaded||e._leaflet_disable_events||t.type==="click"&&this._isClickDisabled(e))){var i=t.type;i==="mousedown"&&gi(e),this._fireDOMEvent(t,i)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(t,e,i){if(t.type==="click"){var n=l({},t);n.type="preclick",this._fireDOMEvent(n,n.type,i)}var s=this._findEventTargets(t,e);if(i){for(var h=[],f=0;f<i.length;f++)i[f].listens(e,!0)&&h.push(i[f]);s=h.concat(s)}if(s.length){e==="contextmenu"&&X(t);var m=s[0],v={originalEvent:t};if(t.type!=="keypress"&&t.type!=="keydown"&&t.type!=="keyup"){var b=m.getLatLng&&(!m._radius||m._radius<=10);v.containerPoint=b?this.latLngToContainerPoint(m.getLatLng()):this.mouseEventToContainerPoint(t),v.layerPoint=this.containerPointToLayerPoint(v.containerPoint),v.latlng=b?m.getLatLng():this.layerPointToLatLng(v.layerPoint)}for(f=0;f<s.length;f++)if(s[f].fire(e,v,!0),v.originalEvent._stopped||s[f].options.bubblingMouseEvents===!1&&yt(this._mouseEvents,e)!==-1)return}},_draggableMoved:function(t){return t=t.dragging&&t.dragging.enabled()?t:this,t.dragging&&t.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var t=0,e=this._handlers.length;t<e;t++)this._handlers[t].disable()},whenReady:function(t,e){return this._loaded?t.call(e||this,{target:this}):this.on("load",t,e),this},_getMapPanePos:function(){return Ot(this._mapPane)||new M(0,0)},_moved:function(){var t=this._getMapPanePos();return t&&!t.equals([0,0])},_getTopLeftPoint:function(t,e){var i=t&&e!==void 0?this._getNewPixelOrigin(t,e):this.getPixelOrigin();return i.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(t,e){var i=this.getSize()._divideBy(2);return this.project(t,e)._subtract(i)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(t,e,i){var n=this._getNewPixelOrigin(i,e);return this.project(t,e)._subtract(n)},_latLngBoundsToNewLayerBounds:function(t,e,i){var n=this._getNewPixelOrigin(i,e);return nt([this.project(t.getSouthWest(),e)._subtract(n),this.project(t.getNorthWest(),e)._subtract(n),this.project(t.getSouthEast(),e)._subtract(n),this.project(t.getNorthEast(),e)._subtract(n)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(t){return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())},_limitCenter:function(t,e,i){if(!i)return t;var n=this.project(t,e),s=this.getSize().divideBy(2),h=new G(n.subtract(s),n.add(s)),f=this._getBoundsOffset(h,i,e);return Math.abs(f.x)<=1&&Math.abs(f.y)<=1?t:this.unproject(n.add(f),e)},_limitOffset:function(t,e){if(!e)return t;var i=this.getPixelBounds(),n=new G(i.min.add(t),i.max.add(t));return t.add(this._getBoundsOffset(n,e))},_getBoundsOffset:function(t,e,i){var n=nt(this.project(e.getNorthEast(),i),this.project(e.getSouthWest(),i)),s=n.min.subtract(t.min),h=n.max.subtract(t.max),f=this._rebound(s.x,-h.x),m=this._rebound(s.y,-h.y);return new M(f,m)},_rebound:function(t,e){return t+e>0?Math.round(t-e)/2:Math.max(0,Math.ceil(t))-Math.max(0,Math.floor(e))},_limitZoom:function(t){var e=this.getMinZoom(),i=this.getMaxZoom(),n=k.any3d?this.options.zoomSnap:1;return n&&(t=Math.round(t/n)*n),Math.max(e,Math.min(i,t))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){q(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(t,e){var i=this._getCenterOffset(t)._trunc();return(e&&e.animate)!==!0&&!this.getSize().contains(i)?!1:(this.panBy(i,e),!0)},_createAnimProxy:function(){var t=this._proxy=N("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(t),this.on("zoomanim",function(e){var i=ui,n=this._proxy.style[i];At(this._proxy,this.project(e.center,e.zoom),this.getZoomScale(e.zoom,1)),n===this._proxy.style[i]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){W(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var t=this.getCenter(),e=this.getZoom();At(this._proxy,this.project(t,e),this.getZoomScale(e,1))},_catchTransitionEnd:function(t){this._animatingZoom&&t.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(t,e,i){if(this._animatingZoom)return!0;if(i=i||{},!this._zoomAnimated||i.animate===!1||this._nothingToAnimate()||Math.abs(e-this._zoom)>this.options.zoomAnimationThreshold)return!1;var n=this.getZoomScale(e),s=this._getCenterOffset(t)._divideBy(1-1/n);return i.animate!==!0&&!this.getSize().contains(s)?!1:(it(function(){this._moveStart(!0,i.noMoveStart||!1)._animateZoom(t,e,!0)},this),!0)},_animateZoom:function(t,e,i,n){this._mapPane&&(i&&(this._animatingZoom=!0,this._animateToCenter=t,this._animateToZoom=e,A(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:t,zoom:e,noUpdate:n}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(a(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&q(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function Tr(t,e){return new B(t,e)}var ft=xt.extend({options:{position:"topright"},initialize:function(t){w(this,t)},getPosition:function(){return this.options.position},setPosition:function(t){var e=this._map;return e&&e.removeControl(this),this.options.position=t,e&&e.addControl(this),this},getContainer:function(){return this._container},addTo:function(t){this.remove(),this._map=t;var e=this._container=this.onAdd(t),i=this.getPosition(),n=t._controlCorners[i];return A(e,"leaflet-control"),i.indexOf("bottom")!==-1?n.insertBefore(e,n.firstChild):n.appendChild(e),this._map.on("unload",this.remove,this),this},remove:function(){return this._map?(W(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this},_refocusOnMap:function(t){this._map&&t&&t.screenX>0&&t.screenY>0&&this._map.getContainer().focus()}}),he=function(t){return new ft(t)};B.include({addControl:function(t){return t.addTo(this),this},removeControl:function(t){return t.remove(),this},_initControlPos:function(){var t=this._controlCorners={},e="leaflet-",i=this._controlContainer=N("div",e+"control-container",this._container);function n(s,h){var f=e+s+" "+e+h;t[s+h]=N("div",f,i)}n("top","left"),n("top","right"),n("bottom","left"),n("bottom","right")},_clearControlPos:function(){for(var t in this._controlCorners)W(this._controlCorners[t]);W(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var Tn=ft.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(t,e,i,n){return i<n?-1:n<i?1:0}},initialize:function(t,e,i){w(this,i),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1;for(var n in t)this._addLayer(t[n],n);for(n in e)this._addLayer(e[n],n,!0)},onAdd:function(t){this._initLayout(),this._update(),this._map=t,t.on("zoomend",this._checkDisabledLayers,this);for(var e=0;e<this._layers.length;e++)this._layers[e].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(t){return ft.prototype.addTo.call(this,t),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var t=0;t<this._layers.length;t++)this._layers[t].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(t,e){return this._addLayer(t,e),this._map?this._update():this},addOverlay:function(t,e){return this._addLayer(t,e,!0),this._map?this._update():this},removeLayer:function(t){t.off("add remove",this._onLayerChange,this);var e=this._getLayer(c(t));return e&&this._layers.splice(this._layers.indexOf(e),1),this._map?this._update():this},expand:function(){A(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var t=this._map.getSize().y-(this._container.offsetTop+50);return t<this._section.clientHeight?(A(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=t+"px"):q(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return q(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var t="leaflet-control-layers",e=this._container=N("div",t),i=this.options.collapsed;e.setAttribute("aria-haspopup",!0),le(e),wi(e);var n=this._section=N("section",t+"-list");i&&(this._map.on("click",this.collapse,this),E(e,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var s=this._layersLink=N("a",t+"-toggle",e);s.href="#",s.title="Layers",s.setAttribute("role","button"),E(s,{keydown:function(h){h.keyCode===13&&this._expandSafely()},click:function(h){X(h),this._expandSafely()}},this),i||this.expand(),this._baseLayersList=N("div",t+"-base",n),this._separator=N("div",t+"-separator",n),this._overlaysList=N("div",t+"-overlays",n),e.appendChild(n)},_getLayer:function(t){for(var e=0;e<this._layers.length;e++)if(this._layers[e]&&c(this._layers[e].layer)===t)return this._layers[e]},_addLayer:function(t,e,i){this._map&&t.on("add remove",this._onLayerChange,this),this._layers.push({layer:t,name:e,overlay:i}),this.options.sortLayers&&this._layers.sort(a(function(n,s){return this.options.sortFunction(n.layer,s.layer,n.name,s.name)},this)),this.options.autoZIndex&&t.setZIndex&&(this._lastZIndex++,t.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;ze(this._baseLayersList),ze(this._overlaysList),this._layerControlInputs=[];var t,e,i,n,s=0;for(i=0;i<this._layers.length;i++)n=this._layers[i],this._addItem(n),e=e||n.overlay,t=t||!n.overlay,s+=n.overlay?0:1;return this.options.hideSingleBase&&(t=t&&s>1,this._baseLayersList.style.display=t?"":"none"),this._separator.style.display=e&&t?"":"none",this},_onLayerChange:function(t){this._handlingClick||this._update();var e=this._getLayer(c(t.target)),i=e.overlay?t.type==="add"?"overlayadd":"overlayremove":t.type==="add"?"baselayerchange":null;i&&this._map.fire(i,e)},_createRadioElement:function(t,e){var i='<input type="radio" class="leaflet-control-layers-selector" name="'+t+'"'+(e?' checked="checked"':"")+"/>",n=document.createElement("div");return n.innerHTML=i,n.firstChild},_addItem:function(t){var e=document.createElement("label"),i=this._map.hasLayer(t.layer),n;t.overlay?(n=document.createElement("input"),n.type="checkbox",n.className="leaflet-control-layers-selector",n.defaultChecked=i):n=this._createRadioElement("leaflet-base-layers_"+c(this),i),this._layerControlInputs.push(n),n.layerId=c(t.layer),E(n,"click",this._onInputClick,this);var s=document.createElement("span");s.innerHTML=" "+t.name;var h=document.createElement("span");e.appendChild(h),h.appendChild(n),h.appendChild(s);var f=t.overlay?this._overlaysList:this._baseLayersList;return f.appendChild(e),this._checkDisabledLayers(),e},_onInputClick:function(){if(!this._preventClick){var t=this._layerControlInputs,e,i,n=[],s=[];this._handlingClick=!0;for(var h=t.length-1;h>=0;h--)e=t[h],i=this._getLayer(e.layerId).layer,e.checked?n.push(i):e.checked||s.push(i);for(h=0;h<s.length;h++)this._map.hasLayer(s[h])&&this._map.removeLayer(s[h]);for(h=0;h<n.length;h++)this._map.hasLayer(n[h])||this._map.addLayer(n[h]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var t=this._layerControlInputs,e,i,n=this._map.getZoom(),s=t.length-1;s>=0;s--)e=t[s],i=this._getLayer(e.layerId).layer,e.disabled=i.options.minZoom!==void 0&&n<i.options.minZoom||i.options.maxZoom!==void 0&&n>i.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var t=this._section;this._preventClick=!0,E(t,"click",X),this.expand();var e=this;setTimeout(function(){F(t,"click",X),e._preventClick=!1})}}),Mr=function(t,e,i){return new Tn(t,e,i)},Pi=ft.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(t){var e="leaflet-control-zoom",i=N("div",e+" leaflet-bar"),n=this.options;return this._zoomInButton=this._createButton(n.zoomInText,n.zoomInTitle,e+"-in",i,this._zoomIn),this._zoomOutButton=this._createButton(n.zoomOutText,n.zoomOutTitle,e+"-out",i,this._zoomOut),this._updateDisabled(),t.on("zoomend zoomlevelschange",this._updateDisabled,this),i},onRemove:function(t){t.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(t){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(t.shiftKey?3:1))},_zoomOut:function(t){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(t.shiftKey?3:1))},_createButton:function(t,e,i,n,s){var h=N("a",i,n);return h.innerHTML=t,h.href="#",h.title=e,h.setAttribute("role","button"),h.setAttribute("aria-label",e),le(h),E(h,"click",$t),E(h,"click",s,this),E(h,"click",this._refocusOnMap,this),h},_updateDisabled:function(){var t=this._map,e="leaflet-disabled";q(this._zoomInButton,e),q(this._zoomOutButton,e),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||t._zoom===t.getMinZoom())&&(A(this._zoomOutButton,e),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||t._zoom===t.getMaxZoom())&&(A(this._zoomInButton,e),this._zoomInButton.setAttribute("aria-disabled","true"))}});B.mergeOptions({zoomControl:!0}),B.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new Pi,this.addControl(this.zoomControl))});var Er=function(t){return new Pi(t)},Mn=ft.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(t){var e="leaflet-control-scale",i=N("div",e),n=this.options;return this._addScales(n,e+"-line",i),t.on(n.updateWhenIdle?"moveend":"move",this._update,this),t.whenReady(this._update,this),i},onRemove:function(t){t.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(t,e,i){t.metric&&(this._mScale=N("div",e,i)),t.imperial&&(this._iScale=N("div",e,i))},_update:function(){var t=this._map,e=t.getSize().y/2,i=t.distance(t.containerPointToLatLng([0,e]),t.containerPointToLatLng([this.options.maxWidth,e]));this._updateScales(i)},_updateScales:function(t){this.options.metric&&t&&this._updateMetric(t),this.options.imperial&&t&&this._updateImperial(t)},_updateMetric:function(t){var e=this._getRoundNum(t),i=e<1e3?e+" m":e/1e3+" km";this._updateScale(this._mScale,i,e/t)},_updateImperial:function(t){var e=t*3.2808399,i,n,s;e>5280?(i=e/5280,n=this._getRoundNum(i),this._updateScale(this._iScale,n+" mi",n/i)):(s=this._getRoundNum(e),this._updateScale(this._iScale,s+" ft",s/e))},_updateScale:function(t,e,i){t.style.width=Math.round(this.options.maxWidth*i)+"px",t.innerHTML=e},_getRoundNum:function(t){var e=Math.pow(10,(Math.floor(t)+"").length-1),i=t/e;return i=i>=10?10:i>=5?5:i>=3?3:i>=2?2:1,e*i}}),zr=function(t){return new Mn(t)},Ar='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',Ci=ft.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(k.inlineSvg?Ar+" ":"")+"Leaflet</a>"},initialize:function(t){w(this,t),this._attributions={}},onAdd:function(t){t.attributionControl=this,this._container=N("div","leaflet-control-attribution"),le(this._container);for(var e in t._layers)t._layers[e].getAttribution&&this.addAttribution(t._layers[e].getAttribution());return this._update(),t.on("layeradd",this._addAttribution,this),this._container},onRemove:function(t){t.off("layeradd",this._addAttribution,this)},_addAttribution:function(t){t.layer.getAttribution&&(this.addAttribution(t.layer.getAttribution()),t.layer.once("remove",function(){this.removeAttribution(t.layer.getAttribution())},this))},setPrefix:function(t){return this.options.prefix=t,this._update(),this},addAttribution:function(t){return t?(this._attributions[t]||(this._attributions[t]=0),this._attributions[t]++,this._update(),this):this},removeAttribution:function(t){return t?(this._attributions[t]&&(this._attributions[t]--,this._update()),this):this},_update:function(){if(this._map){var t=[];for(var e in this._attributions)this._attributions[e]&&t.push(e);var i=[];this.options.prefix&&i.push(this.options.prefix),t.length&&i.push(t.join(", ")),this._container.innerHTML=i.join(' <span aria-hidden="true">|</span> ')}}});B.mergeOptions({attributionControl:!0}),B.addInitHook(function(){this.options.attributionControl&&new Ci().addTo(this)});var Or=function(t){return new Ci(t)};ft.Layers=Tn,ft.Zoom=Pi,ft.Scale=Mn,ft.Attribution=Ci,he.layers=Mr,he.zoom=Er,he.scale=zr,he.attribution=Or;var gt=xt.extend({initialize:function(t){this._map=t},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});gt.addTo=function(t,e){return t.addHandler(e,this),this};var Ir={Events:lt},En=k.touch?"touchstart mousedown":"mousedown",Tt=te.extend({options:{clickTolerance:3},initialize:function(t,e,i,n){w(this,n),this._element=t,this._dragStartTarget=e||t,this._preventOutline=i},enable:function(){this._enabled||(E(this._dragStartTarget,En,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(Tt._dragging===this&&this.finishDrag(!0),F(this._dragStartTarget,En,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(t){if(this._enabled&&(this._moved=!1,!ci(this._element,"leaflet-zoom-anim"))){if(t.touches&&t.touches.length!==1){Tt._dragging===this&&this.finishDrag();return}if(!(Tt._dragging||t.shiftKey||t.which!==1&&t.button!==1&&!t.touches)&&(Tt._dragging=this,this._preventOutline&&gi(this._element),pi(),re(),!this._moving)){this.fire("down");var e=t.touches?t.touches[0]:t,i=wn(this._element);this._startPoint=new M(e.clientX,e.clientY),this._startPos=Ot(this._element),this._parentScale=vi(i);var n=t.type==="mousedown";E(document,n?"mousemove":"touchmove",this._onMove,this),E(document,n?"mouseup":"touchend touchcancel",this._onUp,this)}}},_onMove:function(t){if(this._enabled){if(t.touches&&t.touches.length>1){this._moved=!0;return}var e=t.touches&&t.touches.length===1?t.touches[0]:t,i=new M(e.clientX,e.clientY)._subtract(this._startPoint);!i.x&&!i.y||Math.abs(i.x)+Math.abs(i.y)<this.options.clickTolerance||(i.x/=this._parentScale.x,i.y/=this._parentScale.y,X(t),this._moved||(this.fire("dragstart"),this._moved=!0,A(document.body,"leaflet-dragging"),this._lastTarget=t.target||t.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),A(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(i),this._moving=!0,this._lastEvent=t,this._updatePosition())}},_updatePosition:function(){var t={originalEvent:this._lastEvent};this.fire("predrag",t),j(this._element,this._newPos),this.fire("drag",t)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(t){q(document.body,"leaflet-dragging"),this._lastTarget&&(q(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),F(document,"mousemove touchmove",this._onMove,this),F(document,"mouseup touchend touchcancel",this._onUp,this),_i(),se();var e=this._moved&&this._moving;this._moving=!1,Tt._dragging=!1,e&&this.fire("dragend",{noInertia:t,distance:this._newPos.distanceTo(this._startPos)})}});function zn(t,e,i){var n,s=[1,4,2,8],h,f,m,v,b,C,S,O;for(h=0,C=t.length;h<C;h++)t[h]._code=Zt(t[h],e);for(m=0;m<4;m++){for(S=s[m],n=[],h=0,C=t.length,f=C-1;h<C;f=h++)v=t[h],b=t[f],v._code&S?b._code&S||(O=Ze(b,v,S,e,i),O._code=Zt(O,e),n.push(O)):(b._code&S&&(O=Ze(b,v,S,e,i),O._code=Zt(O,e),n.push(O)),n.push(v));t=n}return t}function An(t,e){var i,n,s,h,f,m,v,b,C;if(!t||t.length===0)throw new Error("latlngs not passed");ct(t)||(console.warn("latlngs are not flat! Only the first ring will be used"),t=t[0]);var S=Z([0,0]),O=V(t),tt=O.getNorthWest().distanceTo(O.getSouthWest())*O.getNorthEast().distanceTo(O.getNorthWest());tt<1700&&(S=ki(t));var J=t.length,dt=[];for(i=0;i<J;i++){var rt=Z(t[i]);dt.push(e.project(Z([rt.lat-S.lat,rt.lng-S.lng])))}for(m=v=b=0,i=0,n=J-1;i<J;n=i++)s=dt[i],h=dt[n],f=s.y*h.x-h.y*s.x,v+=(s.x+h.x)*f,b+=(s.y+h.y)*f,m+=f*3;m===0?C=dt[0]:C=[v/m,b/m];var Kt=e.unproject(T(C));return Z([Kt.lat+S.lat,Kt.lng+S.lng])}function ki(t){for(var e=0,i=0,n=0,s=0;s<t.length;s++){var h=Z(t[s]);e+=h.lat,i+=h.lng,n++}return Z([e/n,i/n])}var $r={__proto__:null,clipPolygon:zn,polygonCenter:An,centroid:ki};function On(t,e){if(!e||!t.length)return t.slice();var i=e*e;return t=Nr(t,i),t=Br(t,i),t}function In(t,e,i){return Math.sqrt(ue(t,e,i,!0))}function Zr(t,e,i){return ue(t,e,i)}function Br(t,e){var i=t.length,n=typeof Uint8Array<"u"?Uint8Array:Array,s=new n(i);s[0]=s[i-1]=1,Si(t,s,e,0,i-1);var h,f=[];for(h=0;h<i;h++)s[h]&&f.push(t[h]);return f}function Si(t,e,i,n,s){var h=0,f,m,v;for(m=n+1;m<=s-1;m++)v=ue(t[m],t[n],t[s],!0),v>h&&(f=m,h=v);h>i&&(e[f]=1,Si(t,e,i,n,f),Si(t,e,i,f,s))}function Nr(t,e){for(var i=[t[0]],n=1,s=0,h=t.length;n<h;n++)Dr(t[n],t[s])>e&&(i.push(t[n]),s=n);return s<h-1&&i.push(t[h-1]),i}var $n;function Zn(t,e,i,n,s){var h=n?$n:Zt(t,i),f=Zt(e,i),m,v,b;for($n=f;;){if(!(h|f))return[t,e];if(h&f)return!1;m=h||f,v=Ze(t,e,m,i,s),b=Zt(v,i),m===h?(t=v,h=b):(e=v,f=b)}}function Ze(t,e,i,n,s){var h=e.x-t.x,f=e.y-t.y,m=n.min,v=n.max,b,C;return i&8?(b=t.x+h*(v.y-t.y)/f,C=v.y):i&4?(b=t.x+h*(m.y-t.y)/f,C=m.y):i&2?(b=v.x,C=t.y+f*(v.x-t.x)/h):i&1&&(b=m.x,C=t.y+f*(m.x-t.x)/h),new M(b,C,s)}function Zt(t,e){var i=0;return t.x<e.min.x?i|=1:t.x>e.max.x&&(i|=2),t.y<e.min.y?i|=4:t.y>e.max.y&&(i|=8),i}function Dr(t,e){var i=e.x-t.x,n=e.y-t.y;return i*i+n*n}function ue(t,e,i,n){var s=e.x,h=e.y,f=i.x-s,m=i.y-h,v=f*f+m*m,b;return v>0&&(b=((t.x-s)*f+(t.y-h)*m)/v,b>1?(s=i.x,h=i.y):b>0&&(s+=f*b,h+=m*b)),f=t.x-s,m=t.y-h,n?f*f+m*m:new M(s,h)}function ct(t){return!U(t[0])||typeof t[0][0]!="object"&&typeof t[0][0]<"u"}function Bn(t){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),ct(t)}function Nn(t,e){var i,n,s,h,f,m,v,b;if(!t||t.length===0)throw new Error("latlngs not passed");ct(t)||(console.warn("latlngs are not flat! Only the first ring will be used"),t=t[0]);var C=Z([0,0]),S=V(t),O=S.getNorthWest().distanceTo(S.getSouthWest())*S.getNorthEast().distanceTo(S.getNorthWest());O<1700&&(C=ki(t));var tt=t.length,J=[];for(i=0;i<tt;i++){var dt=Z(t[i]);J.push(e.project(Z([dt.lat-C.lat,dt.lng-C.lng])))}for(i=0,n=0;i<tt-1;i++)n+=J[i].distanceTo(J[i+1])/2;if(n===0)b=J[0];else for(i=0,h=0;i<tt-1;i++)if(f=J[i],m=J[i+1],s=f.distanceTo(m),h+=s,h>n){v=(h-n)/s,b=[m.x-v*(m.x-f.x),m.y-v*(m.y-f.y)];break}var rt=e.unproject(T(b));return Z([rt.lat+C.lat,rt.lng+C.lng])}var Rr={__proto__:null,simplify:On,pointToSegmentDistance:In,closestPointOnSegment:Zr,clipSegment:Zn,_getEdgeIntersection:Ze,_getBitCode:Zt,_sqClosestPointOnSegment:ue,isFlat:ct,_flat:Bn,polylineCenter:Nn},Ti={project:function(t){return new M(t.lng,t.lat)},unproject:function(t){return new R(t.y,t.x)},bounds:new G([-180,-90],[180,90])},Mi={R:6378137,R_MINOR:6356752314245179e-9,bounds:new G([-2003750834279e-5,-1549657073972e-5],[2003750834279e-5,1876465623138e-5]),project:function(t){var e=Math.PI/180,i=this.R,n=t.lat*e,s=this.R_MINOR/i,h=Math.sqrt(1-s*s),f=h*Math.sin(n),m=Math.tan(Math.PI/4-n/2)/Math.pow((1-f)/(1+f),h/2);return n=-i*Math.log(Math.max(m,1e-10)),new M(t.lng*e*i,n)},unproject:function(t){for(var e=180/Math.PI,i=this.R,n=this.R_MINOR/i,s=Math.sqrt(1-n*n),h=Math.exp(-t.y/i),f=Math.PI/2-2*Math.atan(h),m=0,v=.1,b;m<15&&Math.abs(v)>1e-7;m++)b=s*Math.sin(f),b=Math.pow((1-b)/(1+b),s/2),v=Math.PI/2-2*Math.atan(h*b)-f,f+=v;return new R(f*e,t.x*e/i)}},Fr={__proto__:null,LonLat:Ti,Mercator:Mi,SphericalMercator:ei},Hr=l({},St,{code:"EPSG:3395",projection:Mi,transformation:function(){var t=.5/(Math.PI*Mi.R);return ee(t,.5,-t,.5)}()}),Dn=l({},St,{code:"EPSG:4326",projection:Ti,transformation:ee(1/180,1,-1/180,.5)}),Ur=l({},bt,{projection:Ti,transformation:ee(1,0,-1,0),scale:function(t){return Math.pow(2,t)},zoom:function(t){return Math.log(t)/Math.LN2},distance:function(t,e){var i=e.lng-t.lng,n=e.lat-t.lat;return Math.sqrt(i*i+n*n)},infinite:!0});bt.Earth=St,bt.EPSG3395=Hr,bt.EPSG3857=ni,bt.EPSG900913=Ko,bt.EPSG4326=Dn,bt.Simple=Ur;var pt=te.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(t){return t.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(t){return t&&t.removeLayer(this),this},getPane:function(t){return this._map.getPane(t?this.options[t]||t:this.options.pane)},addInteractiveTarget:function(t){return this._map._targets[c(t)]=this,this},removeInteractiveTarget:function(t){return delete this._map._targets[c(t)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(t){var e=t.target;if(e.hasLayer(this)){if(this._map=e,this._zoomAnimated=e._zoomAnimated,this.getEvents){var i=this.getEvents();e.on(i,this),this.once("remove",function(){e.off(i,this)},this)}this.onAdd(e),this.fire("add"),e.fire("layeradd",{layer:this})}}});B.include({addLayer:function(t){if(!t._layerAdd)throw new Error("The provided object is not a Layer.");var e=c(t);return this._layers[e]?this:(this._layers[e]=t,t._mapToAdd=this,t.beforeAdd&&t.beforeAdd(this),this.whenReady(t._layerAdd,t),this)},removeLayer:function(t){var e=c(t);return this._layers[e]?(this._loaded&&t.onRemove(this),delete this._layers[e],this._loaded&&(this.fire("layerremove",{layer:t}),t.fire("remove")),t._map=t._mapToAdd=null,this):this},hasLayer:function(t){return c(t)in this._layers},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},_addLayers:function(t){t=t?U(t)?t:[t]:[];for(var e=0,i=t.length;e<i;e++)this.addLayer(t[e])},_addZoomLimit:function(t){(!isNaN(t.options.maxZoom)||!isNaN(t.options.minZoom))&&(this._zoomBoundLayers[c(t)]=t,this._updateZoomLevels())},_removeZoomLimit:function(t){var e=c(t);this._zoomBoundLayers[e]&&(delete this._zoomBoundLayers[e],this._updateZoomLevels())},_updateZoomLevels:function(){var t=1/0,e=-1/0,i=this._getZoomSpan();for(var n in this._zoomBoundLayers){var s=this._zoomBoundLayers[n].options;t=s.minZoom===void 0?t:Math.min(t,s.minZoom),e=s.maxZoom===void 0?e:Math.max(e,s.maxZoom)}this._layersMaxZoom=e===-1/0?void 0:e,this._layersMinZoom=t===1/0?void 0:t,i!==this._getZoomSpan()&&this.fire("zoomlevelschange"),this.options.maxZoom===void 0&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===void 0&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var Gt=pt.extend({initialize:function(t,e){w(this,e),this._layers={};var i,n;if(t)for(i=0,n=t.length;i<n;i++)this.addLayer(t[i])},addLayer:function(t){var e=this.getLayerId(t);return this._layers[e]=t,this._map&&this._map.addLayer(t),this},removeLayer:function(t){var e=t in this._layers?t:this.getLayerId(t);return this._map&&this._layers[e]&&this._map.removeLayer(this._layers[e]),delete this._layers[e],this},hasLayer:function(t){var e=typeof t=="number"?t:this.getLayerId(t);return e in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(t){var e=Array.prototype.slice.call(arguments,1),i,n;for(i in this._layers)n=this._layers[i],n[t]&&n[t].apply(n,e);return this},onAdd:function(t){this.eachLayer(t.addLayer,t)},onRemove:function(t){this.eachLayer(t.removeLayer,t)},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},getLayer:function(t){return this._layers[t]},getLayers:function(){var t=[];return this.eachLayer(t.push,t),t},setZIndex:function(t){return this.invoke("setZIndex",t)},getLayerId:function(t){return c(t)}}),Gr=function(t,e){return new Gt(t,e)},wt=Gt.extend({addLayer:function(t){return this.hasLayer(t)?this:(t.addEventParent(this),Gt.prototype.addLayer.call(this,t),this.fire("layeradd",{layer:t}))},removeLayer:function(t){return this.hasLayer(t)?(t in this._layers&&(t=this._layers[t]),t.removeEventParent(this),Gt.prototype.removeLayer.call(this,t),this.fire("layerremove",{layer:t})):this},setStyle:function(t){return this.invoke("setStyle",t)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var t=new ot;for(var e in this._layers){var i=this._layers[e];t.extend(i.getBounds?i.getBounds():i.getLatLng())}return t}}),Wr=function(t,e){return new wt(t,e)},Wt=xt.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(t){w(this,t)},createIcon:function(t){return this._createIcon("icon",t)},createShadow:function(t){return this._createIcon("shadow",t)},_createIcon:function(t,e){var i=this._getIconUrl(t);if(!i){if(t==="icon")throw new Error("iconUrl not set in Icon options (see the docs).");return null}var n=this._createImg(i,e&&e.tagName==="IMG"?e:null);return this._setIconStyles(n,t),(this.options.crossOrigin||this.options.crossOrigin==="")&&(n.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),n},_setIconStyles:function(t,e){var i=this.options,n=i[e+"Size"];typeof n=="number"&&(n=[n,n]);var s=T(n),h=T(e==="shadow"&&i.shadowAnchor||i.iconAnchor||s&&s.divideBy(2,!0));t.className="leaflet-marker-"+e+" "+(i.className||""),h&&(t.style.marginLeft=-h.x+"px",t.style.marginTop=-h.y+"px"),s&&(t.style.width=s.x+"px",t.style.height=s.y+"px")},_createImg:function(t,e){return e=e||document.createElement("img"),e.src=t,e},_getIconUrl:function(t){return k.retina&&this.options[t+"RetinaUrl"]||this.options[t+"Url"]}});function qr(t){return new Wt(t)}var ce=Wt.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(t){return typeof ce.imagePath!="string"&&(ce.imagePath=this._detectIconPath()),(this.options.imagePath||ce.imagePath)+Wt.prototype._getIconUrl.call(this,t)},_stripUrl:function(t){var e=function(i,n,s){var h=n.exec(i);return h&&h[s]};return t=e(t,/^url\((['"])?(.+)\1\)$/,2),t&&e(t,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var t=N("div","leaflet-default-icon-path",document.body),e=oe(t,"background-image")||oe(t,"backgroundImage");if(document.body.removeChild(t),e=this._stripUrl(e),e)return e;var i=document.querySelector('link[href$="leaflet.css"]');return i?i.href.substring(0,i.href.length-11-1):""}}),Rn=gt.extend({initialize:function(t){this._marker=t},addHooks:function(){var t=this._marker._icon;this._draggable||(this._draggable=new Tt(t,t,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),A(t,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&q(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(t){var e=this._marker,i=e._map,n=this._marker.options.autoPanSpeed,s=this._marker.options.autoPanPadding,h=Ot(e._icon),f=i.getPixelBounds(),m=i.getPixelOrigin(),v=nt(f.min._subtract(m).add(s),f.max._subtract(m).subtract(s));if(!v.contains(h)){var b=T((Math.max(v.max.x,h.x)-v.max.x)/(f.max.x-v.max.x)-(Math.min(v.min.x,h.x)-v.min.x)/(f.min.x-v.min.x),(Math.max(v.max.y,h.y)-v.max.y)/(f.max.y-v.max.y)-(Math.min(v.min.y,h.y)-v.min.y)/(f.min.y-v.min.y)).multiplyBy(n);i.panBy(b,{animate:!1}),this._draggable._newPos._add(b),this._draggable._startPos._add(b),j(e._icon,this._draggable._newPos),this._onDrag(t),this._panRequest=it(this._adjustPan.bind(this,t))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(t){this._marker.options.autoPan&&(ht(this._panRequest),this._panRequest=it(this._adjustPan.bind(this,t)))},_onDrag:function(t){var e=this._marker,i=e._shadow,n=Ot(e._icon),s=e._map.layerPointToLatLng(n);i&&j(i,n),e._latlng=s,t.latlng=s,t.oldLatLng=this._oldLatLng,e.fire("move",t).fire("drag",t)},_onDragEnd:function(t){ht(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",t)}}),Be=pt.extend({options:{icon:new ce,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(t,e){w(this,e),this._latlng=Z(t)},onAdd:function(t){this._zoomAnimated=this._zoomAnimated&&t.options.markerZoomAnimation,this._zoomAnimated&&t.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(t){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&t.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(t){var e=this._latlng;return this._latlng=Z(t),this.update(),this.fire("move",{oldLatLng:e,latlng:this._latlng})},setZIndexOffset:function(t){return this.options.zIndexOffset=t,this.update()},getIcon:function(){return this.options.icon},setIcon:function(t){return this.options.icon=t,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var t=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(t)}return this},_initIcon:function(){var t=this.options,e="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),i=t.icon.createIcon(this._icon),n=!1;i!==this._icon&&(this._icon&&this._removeIcon(),n=!0,t.title&&(i.title=t.title),i.tagName==="IMG"&&(i.alt=t.alt||"")),A(i,e),t.keyboard&&(i.tabIndex="0",i.setAttribute("role","button")),this._icon=i,t.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&E(i,"focus",this._panOnFocus,this);var s=t.icon.createShadow(this._shadow),h=!1;s!==this._shadow&&(this._removeShadow(),h=!0),s&&(A(s,e),s.alt=""),this._shadow=s,t.opacity<1&&this._updateOpacity(),n&&this.getPane().appendChild(this._icon),this._initInteraction(),s&&h&&this.getPane(t.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&F(this._icon,"focus",this._panOnFocus,this),W(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&W(this._shadow),this._shadow=null},_setPos:function(t){this._icon&&j(this._icon,t),this._shadow&&j(this._shadow,t),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(t){this._icon&&(this._icon.style.zIndex=this._zIndex+t)},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center).round();this._setPos(e)},_initInteraction:function(){if(this.options.interactive&&(A(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),Rn)){var t=this.options.draggable;this.dragging&&(t=this.dragging.enabled(),this.dragging.disable()),this.dragging=new Rn(this),t&&this.dragging.enable()}},setOpacity:function(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var t=this.options.opacity;this._icon&&ut(this._icon,t),this._shadow&&ut(this._shadow,t)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var t=this._map;if(t){var e=this.options.icon.options,i=e.iconSize?T(e.iconSize):T(0,0),n=e.iconAnchor?T(e.iconAnchor):T(0,0);t.panInside(this._latlng,{paddingTopLeft:n,paddingBottomRight:i.subtract(n)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function Vr(t,e){return new Be(t,e)}var Mt=pt.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(t){this._renderer=t.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(t){return w(this,t),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&t&&Object.prototype.hasOwnProperty.call(t,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),Ne=Mt.extend({options:{fill:!0,radius:10},initialize:function(t,e){w(this,e),this._latlng=Z(t),this._radius=this.options.radius},setLatLng:function(t){var e=this._latlng;return this._latlng=Z(t),this.redraw(),this.fire("move",{oldLatLng:e,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(t){return this.options.radius=this._radius=t,this.redraw()},getRadius:function(){return this._radius},setStyle:function(t){var e=t&&t.radius||this._radius;return Mt.prototype.setStyle.call(this,t),this.setRadius(e),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var t=this._radius,e=this._radiusY||t,i=this._clickTolerance(),n=[t+i,e+i];this._pxBounds=new G(this._point.subtract(n),this._point.add(n))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(t){return t.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function jr(t,e){return new Ne(t,e)}var Ei=Ne.extend({initialize:function(t,e,i){if(typeof e=="number"&&(e=l({},i,{radius:e})),w(this,e),this._latlng=Z(t),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(t){return this._mRadius=t,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var t=[this._radius,this._radiusY||this._radius];return new ot(this._map.layerPointToLatLng(this._point.subtract(t)),this._map.layerPointToLatLng(this._point.add(t)))},setStyle:Mt.prototype.setStyle,_project:function(){var t=this._latlng.lng,e=this._latlng.lat,i=this._map,n=i.options.crs;if(n.distance===St.distance){var s=Math.PI/180,h=this._mRadius/St.R/s,f=i.project([e+h,t]),m=i.project([e-h,t]),v=f.add(m).divideBy(2),b=i.unproject(v).lat,C=Math.acos((Math.cos(h*s)-Math.sin(e*s)*Math.sin(b*s))/(Math.cos(e*s)*Math.cos(b*s)))/s;(isNaN(C)||C===0)&&(C=h/Math.cos(Math.PI/180*e)),this._point=v.subtract(i.getPixelOrigin()),this._radius=isNaN(C)?0:v.x-i.project([b,t-C]).x,this._radiusY=v.y-f.y}else{var S=n.unproject(n.project(this._latlng).subtract([this._mRadius,0]));this._point=i.latLngToLayerPoint(this._latlng),this._radius=this._point.x-i.latLngToLayerPoint(S).x}this._updateBounds()}});function Kr(t,e,i){return new Ei(t,e,i)}var Lt=Mt.extend({options:{smoothFactor:1,noClip:!1},initialize:function(t,e){w(this,e),this._setLatLngs(t)},getLatLngs:function(){return this._latlngs},setLatLngs:function(t){return this._setLatLngs(t),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(t){for(var e=1/0,i=null,n=ue,s,h,f=0,m=this._parts.length;f<m;f++)for(var v=this._parts[f],b=1,C=v.length;b<C;b++){s=v[b-1],h=v[b];var S=n(t,s,h,!0);S<e&&(e=S,i=n(t,s,h))}return i&&(i.distance=Math.sqrt(e)),i},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Nn(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(t,e){return e=e||this._defaultShape(),t=Z(t),e.push(t),this._bounds.extend(t),this.redraw()},_setLatLngs:function(t){this._bounds=new ot,this._latlngs=this._convertLatLngs(t)},_defaultShape:function(){return ct(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(t){for(var e=[],i=ct(t),n=0,s=t.length;n<s;n++)i?(e[n]=Z(t[n]),this._bounds.extend(e[n])):e[n]=this._convertLatLngs(t[n]);return e},_project:function(){var t=new G;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,t),this._bounds.isValid()&&t.isValid()&&(this._rawPxBounds=t,this._updateBounds())},_updateBounds:function(){var t=this._clickTolerance(),e=new M(t,t);this._rawPxBounds&&(this._pxBounds=new G([this._rawPxBounds.min.subtract(e),this._rawPxBounds.max.add(e)]))},_projectLatlngs:function(t,e,i){var n=t[0]instanceof R,s=t.length,h,f;if(n){for(f=[],h=0;h<s;h++)f[h]=this._map.latLngToLayerPoint(t[h]),i.extend(f[h]);e.push(f)}else for(h=0;h<s;h++)this._projectLatlngs(t[h],e,i)},_clipPoints:function(){var t=this._renderer._bounds;if(this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(t))){if(this.options.noClip){this._parts=this._rings;return}var e=this._parts,i,n,s,h,f,m,v;for(i=0,s=0,h=this._rings.length;i<h;i++)for(v=this._rings[i],n=0,f=v.length;n<f-1;n++)m=Zn(v[n],v[n+1],t,n,!0),m&&(e[s]=e[s]||[],e[s].push(m[0]),(m[1]!==v[n+1]||n===f-2)&&(e[s].push(m[1]),s++))}},_simplifyPoints:function(){for(var t=this._parts,e=this.options.smoothFactor,i=0,n=t.length;i<n;i++)t[i]=On(t[i],e)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(t,e){var i,n,s,h,f,m,v=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(t))return!1;for(i=0,h=this._parts.length;i<h;i++)for(m=this._parts[i],n=0,f=m.length,s=f-1;n<f;s=n++)if(!(!e&&n===0)&&In(t,m[s],m[n])<=v)return!0;return!1}});function Yr(t,e){return new Lt(t,e)}Lt._flat=Bn;var qt=Lt.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return An(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(t){var e=Lt.prototype._convertLatLngs.call(this,t),i=e.length;return i>=2&&e[0]instanceof R&&e[0].equals(e[i-1])&&e.pop(),e},_setLatLngs:function(t){Lt.prototype._setLatLngs.call(this,t),ct(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return ct(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var t=this._renderer._bounds,e=this.options.weight,i=new M(e,e);if(t=new G(t.min.subtract(i),t.max.add(i)),this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(t))){if(this.options.noClip){this._parts=this._rings;return}for(var n=0,s=this._rings.length,h;n<s;n++)h=zn(this._rings[n],t,!0),h.length&&this._parts.push(h)}},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(t){var e=!1,i,n,s,h,f,m,v,b;if(!this._pxBounds||!this._pxBounds.contains(t))return!1;for(h=0,v=this._parts.length;h<v;h++)for(i=this._parts[h],f=0,b=i.length,m=b-1;f<b;m=f++)n=i[f],s=i[m],n.y>t.y!=s.y>t.y&&t.x<(s.x-n.x)*(t.y-n.y)/(s.y-n.y)+n.x&&(e=!e);return e||Lt.prototype._containsPoint.call(this,t,!0)}});function Jr(t,e){return new qt(t,e)}var Pt=wt.extend({initialize:function(t,e){w(this,e),this._layers={},t&&this.addData(t)},addData:function(t){var e=U(t)?t:t.features,i,n,s;if(e){for(i=0,n=e.length;i<n;i++)s=e[i],(s.geometries||s.geometry||s.features||s.coordinates)&&this.addData(s);return this}var h=this.options;if(h.filter&&!h.filter(t))return this;var f=De(t,h);return f?(f.feature=He(t),f.defaultOptions=f.options,this.resetStyle(f),h.onEachFeature&&h.onEachFeature(t,f),this.addLayer(f)):this},resetStyle:function(t){return t===void 0?this.eachLayer(this.resetStyle,this):(t.options=l({},t.defaultOptions),this._setLayerStyle(t,this.options.style),this)},setStyle:function(t){return this.eachLayer(function(e){this._setLayerStyle(e,t)},this)},_setLayerStyle:function(t,e){t.setStyle&&(typeof e=="function"&&(e=e(t.feature)),t.setStyle(e))}});function De(t,e){var i=t.type==="Feature"?t.geometry:t,n=i?i.coordinates:null,s=[],h=e&&e.pointToLayer,f=e&&e.coordsToLatLng||zi,m,v,b,C;if(!n&&!i)return null;switch(i.type){case"Point":return m=f(n),Fn(h,t,m,e);case"MultiPoint":for(b=0,C=n.length;b<C;b++)m=f(n[b]),s.push(Fn(h,t,m,e));return new wt(s);case"LineString":case"MultiLineString":return v=Re(n,i.type==="LineString"?0:1,f),new Lt(v,e);case"Polygon":case"MultiPolygon":return v=Re(n,i.type==="Polygon"?1:2,f),new qt(v,e);case"GeometryCollection":for(b=0,C=i.geometries.length;b<C;b++){var S=De({geometry:i.geometries[b],type:"Feature",properties:t.properties},e);S&&s.push(S)}return new wt(s);case"FeatureCollection":for(b=0,C=i.features.length;b<C;b++){var O=De(i.features[b],e);O&&s.push(O)}return new wt(s);default:throw new Error("Invalid GeoJSON object.")}}function Fn(t,e,i,n){return t?t(e,i):new Be(i,n&&n.markersInheritOptions&&n)}function zi(t){return new R(t[1],t[0],t[2])}function Re(t,e,i){for(var n=[],s=0,h=t.length,f;s<h;s++)f=e?Re(t[s],e-1,i):(i||zi)(t[s]),n.push(f);return n}function Ai(t,e){return t=Z(t),t.alt!==void 0?[x(t.lng,e),x(t.lat,e),x(t.alt,e)]:[x(t.lng,e),x(t.lat,e)]}function Fe(t,e,i,n){for(var s=[],h=0,f=t.length;h<f;h++)s.push(e?Fe(t[h],ct(t[h])?0:e-1,i,n):Ai(t[h],n));return!e&&i&&s.length>0&&s.push(s[0].slice()),s}function Vt(t,e){return t.feature?l({},t.feature,{geometry:e}):He(e)}function He(t){return t.type==="Feature"||t.type==="FeatureCollection"?t:{type:"Feature",properties:{},geometry:t}}var Oi={toGeoJSON:function(t){return Vt(this,{type:"Point",coordinates:Ai(this.getLatLng(),t)})}};Be.include(Oi),Ei.include(Oi),Ne.include(Oi),Lt.include({toGeoJSON:function(t){var e=!ct(this._latlngs),i=Fe(this._latlngs,e?1:0,!1,t);return Vt(this,{type:(e?"Multi":"")+"LineString",coordinates:i})}}),qt.include({toGeoJSON:function(t){var e=!ct(this._latlngs),i=e&&!ct(this._latlngs[0]),n=Fe(this._latlngs,i?2:e?1:0,!0,t);return e||(n=[n]),Vt(this,{type:(i?"Multi":"")+"Polygon",coordinates:n})}}),Gt.include({toMultiPoint:function(t){var e=[];return this.eachLayer(function(i){e.push(i.toGeoJSON(t).geometry.coordinates)}),Vt(this,{type:"MultiPoint",coordinates:e})},toGeoJSON:function(t){var e=this.feature&&this.feature.geometry&&this.feature.geometry.type;if(e==="MultiPoint")return this.toMultiPoint(t);var i=e==="GeometryCollection",n=[];return this.eachLayer(function(s){if(s.toGeoJSON){var h=s.toGeoJSON(t);if(i)n.push(h.geometry);else{var f=He(h);f.type==="FeatureCollection"?n.push.apply(n,f.features):n.push(f)}}}),i?Vt(this,{geometries:n,type:"GeometryCollection"}):{type:"FeatureCollection",features:n}}});function Hn(t,e){return new Pt(t,e)}var Xr=Hn,Ue=pt.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(t,e,i){this._url=t,this._bounds=V(e),w(this,i)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(A(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){W(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(t){return this.options.opacity=t,this._image&&this._updateOpacity(),this},setStyle:function(t){return t.opacity&&this.setOpacity(t.opacity),this},bringToFront:function(){return this._map&&Ht(this._image),this},bringToBack:function(){return this._map&&Ut(this._image),this},setUrl:function(t){return this._url=t,this._image&&(this._image.src=t),this},setBounds:function(t){return this._bounds=V(t),this._map&&this._reset(),this},getEvents:function(){var t={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var t=this._url.tagName==="IMG",e=this._image=t?this._url:N("img");if(A(e,"leaflet-image-layer"),this._zoomAnimated&&A(e,"leaflet-zoom-animated"),this.options.className&&A(e,this.options.className),e.onselectstart=p,e.onmousemove=p,e.onload=a(this.fire,this,"load"),e.onerror=a(this._overlayOnError,this,"error"),(this.options.crossOrigin||this.options.crossOrigin==="")&&(e.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),t){this._url=e.src;return}e.src=this._url,e.alt=this.options.alt},_animateZoom:function(t){var e=this._map.getZoomScale(t.zoom),i=this._map._latLngBoundsToNewLayerBounds(this._bounds,t.zoom,t.center).min;At(this._image,i,e)},_reset:function(){var t=this._image,e=new G(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),i=e.getSize();j(t,e.min),t.style.width=i.x+"px",t.style.height=i.y+"px"},_updateOpacity:function(){ut(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var t=this.options.errorOverlayUrl;t&&this._url!==t&&(this._url=t,this._image.src=t)},getCenter:function(){return this._bounds.getCenter()}}),Qr=function(t,e,i){return new Ue(t,e,i)},Un=Ue.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var t=this._url.tagName==="VIDEO",e=this._image=t?this._url:N("video");if(A(e,"leaflet-image-layer"),this._zoomAnimated&&A(e,"leaflet-zoom-animated"),this.options.className&&A(e,this.options.className),e.onselectstart=p,e.onmousemove=p,e.onloadeddata=a(this.fire,this,"load"),t){for(var i=e.getElementsByTagName("source"),n=[],s=0;s<i.length;s++)n.push(i[s].src);this._url=i.length>0?n:[e.src];return}U(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(e.style,"objectFit")&&(e.style.objectFit="fill"),e.autoplay=!!this.options.autoplay,e.loop=!!this.options.loop,e.muted=!!this.options.muted,e.playsInline=!!this.options.playsInline;for(var h=0;h<this._url.length;h++){var f=N("source");f.src=this._url[h],e.appendChild(f)}}});function ts(t,e,i){return new Un(t,e,i)}var Gn=Ue.extend({_initImage:function(){var t=this._image=this._url;A(t,"leaflet-image-layer"),this._zoomAnimated&&A(t,"leaflet-zoom-animated"),this.options.className&&A(t,this.options.className),t.onselectstart=p,t.onmousemove=p}});function es(t,e,i){return new Gn(t,e,i)}var vt=pt.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(t,e){t&&(t instanceof R||U(t))?(this._latlng=Z(t),w(this,e)):(w(this,t),this._source=e),this.options.content&&(this._content=this.options.content)},openOn:function(t){return t=arguments.length?t:this._source._map,t.hasLayer(this)||t.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(t){return this._map?this.close():(arguments.length?this._source=t:t=this._source,this._prepareOpen(),this.openOn(t._map)),this},onAdd:function(t){this._zoomAnimated=t._zoomAnimated,this._container||this._initLayout(),t._fadeAnimated&&ut(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),t._fadeAnimated&&ut(this._container,1),this.bringToFront(),this.options.interactive&&(A(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(t){t._fadeAnimated?(ut(this._container,0),this._removeTimeout=setTimeout(a(W,void 0,this._container),200)):W(this._container),this.options.interactive&&(q(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(t){return this._latlng=Z(t),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(t){return this._content=t,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var t={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&Ht(this._container),this},bringToBack:function(){return this._map&&Ut(this._container),this},_prepareOpen:function(t){var e=this._source;if(!e._map)return!1;if(e instanceof wt){e=null;var i=this._source._layers;for(var n in i)if(i[n]._map){e=i[n];break}if(!e)return!1;this._source=e}if(!t)if(e.getCenter)t=e.getCenter();else if(e.getLatLng)t=e.getLatLng();else if(e.getBounds)t=e.getBounds().getCenter();else throw new Error("Unable to get source layer LatLng.");return this.setLatLng(t),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var t=this._contentNode,e=typeof this._content=="function"?this._content(this._source||this):this._content;if(typeof e=="string")t.innerHTML=e;else{for(;t.hasChildNodes();)t.removeChild(t.firstChild);t.appendChild(e)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var t=this._map.latLngToLayerPoint(this._latlng),e=T(this.options.offset),i=this._getAnchor();this._zoomAnimated?j(this._container,t.add(i)):e=e.add(t).add(i);var n=this._containerBottom=-e.y,s=this._containerLeft=-Math.round(this._containerWidth/2)+e.x;this._container.style.bottom=n+"px",this._container.style.left=s+"px"}},_getAnchor:function(){return[0,0]}});B.include({_initOverlay:function(t,e,i,n){var s=e;return s instanceof t||(s=new t(n).setContent(e)),i&&s.setLatLng(i),s}}),pt.include({_initOverlay:function(t,e,i,n){var s=i;return s instanceof t?(w(s,n),s._source=this):(s=e&&!n?e:new t(n,this),s.setContent(i)),s}});var Ge=vt.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(t){return t=arguments.length?t:this._source._map,!t.hasLayer(this)&&t._popup&&t._popup.options.autoClose&&t.removeLayer(t._popup),t._popup=this,vt.prototype.openOn.call(this,t)},onAdd:function(t){vt.prototype.onAdd.call(this,t),t.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof Mt||this._source.on("preclick",It))},onRemove:function(t){vt.prototype.onRemove.call(this,t),t.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof Mt||this._source.off("preclick",It))},getEvents:function(){var t=vt.prototype.getEvents.call(this);return(this.options.closeOnClick!==void 0?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(t.preclick=this.close),this.options.keepInView&&(t.moveend=this._adjustPan),t},_initLayout:function(){var t="leaflet-popup",e=this._container=N("div",t+" "+(this.options.className||"")+" leaflet-zoom-animated"),i=this._wrapper=N("div",t+"-content-wrapper",e);if(this._contentNode=N("div",t+"-content",i),le(e),wi(this._contentNode),E(e,"contextmenu",It),this._tipContainer=N("div",t+"-tip-container",e),this._tip=N("div",t+"-tip",this._tipContainer),this.options.closeButton){var n=this._closeButton=N("a",t+"-close-button",e);n.setAttribute("role","button"),n.setAttribute("aria-label","Close popup"),n.href="#close",n.innerHTML='<span aria-hidden="true">&#215;</span>',E(n,"click",function(s){X(s),this.close()},this)}},_updateLayout:function(){var t=this._contentNode,e=t.style;e.width="",e.whiteSpace="nowrap";var i=t.offsetWidth;i=Math.min(i,this.options.maxWidth),i=Math.max(i,this.options.minWidth),e.width=i+1+"px",e.whiteSpace="",e.height="";var n=t.offsetHeight,s=this.options.maxHeight,h="leaflet-popup-scrolled";s&&n>s?(e.height=s+"px",A(t,h)):q(t,h),this._containerWidth=this._container.offsetWidth},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center),i=this._getAnchor();j(this._container,e.add(i))},_adjustPan:function(){if(this.options.autoPan){if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning){this._autopanning=!1;return}var t=this._map,e=parseInt(oe(this._container,"marginBottom"),10)||0,i=this._container.offsetHeight+e,n=this._containerWidth,s=new M(this._containerLeft,-i-this._containerBottom);s._add(Ot(this._container));var h=t.layerPointToContainerPoint(s),f=T(this.options.autoPanPadding),m=T(this.options.autoPanPaddingTopLeft||f),v=T(this.options.autoPanPaddingBottomRight||f),b=t.getSize(),C=0,S=0;h.x+n+v.x>b.x&&(C=h.x+n-b.x+v.x),h.x-C-m.x<0&&(C=h.x-m.x),h.y+i+v.y>b.y&&(S=h.y+i-b.y+v.y),h.y-S-m.y<0&&(S=h.y-m.y),(C||S)&&(this.options.keepInView&&(this._autopanning=!0),t.fire("autopanstart").panBy([C,S]))}},_getAnchor:function(){return T(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),is=function(t,e){return new Ge(t,e)};B.mergeOptions({closePopupOnClick:!0}),B.include({openPopup:function(t,e,i){return this._initOverlay(Ge,t,e,i).openOn(this),this},closePopup:function(t){return t=arguments.length?t:this._popup,t&&t.close(),this}}),pt.include({bindPopup:function(t,e){return this._popup=this._initOverlay(Ge,this._popup,t,e),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(t){return this._popup&&(this instanceof wt||(this._popup._source=this),this._popup._prepareOpen(t||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return this._popup?this._popup.isOpen():!1},setPopupContent:function(t){return this._popup&&this._popup.setContent(t),this},getPopup:function(){return this._popup},_openPopup:function(t){if(!(!this._popup||!this._map)){$t(t);var e=t.layer||t.target;if(this._popup._source===e&&!(e instanceof Mt)){this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(t.latlng);return}this._popup._source=e,this.openPopup(t.latlng)}},_movePopup:function(t){this._popup.setLatLng(t.latlng)},_onKeyPress:function(t){t.originalEvent.keyCode===13&&this._openPopup(t)}});var We=vt.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(t){vt.prototype.onAdd.call(this,t),this.setOpacity(this.options.opacity),t.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(t){vt.prototype.onRemove.call(this,t),t.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var t=vt.prototype.getEvents.call(this);return this.options.permanent||(t.preclick=this.close),t},_initLayout:function(){var t="leaflet-tooltip",e=t+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=N("div",e),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+c(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(t){var e,i,n=this._map,s=this._container,h=n.latLngToContainerPoint(n.getCenter()),f=n.layerPointToContainerPoint(t),m=this.options.direction,v=s.offsetWidth,b=s.offsetHeight,C=T(this.options.offset),S=this._getAnchor();m==="top"?(e=v/2,i=b):m==="bottom"?(e=v/2,i=0):m==="center"?(e=v/2,i=b/2):m==="right"?(e=0,i=b/2):m==="left"?(e=v,i=b/2):f.x<h.x?(m="right",e=0,i=b/2):(m="left",e=v+(C.x+S.x)*2,i=b/2),t=t.subtract(T(e,i,!0)).add(C).add(S),q(s,"leaflet-tooltip-right"),q(s,"leaflet-tooltip-left"),q(s,"leaflet-tooltip-top"),q(s,"leaflet-tooltip-bottom"),A(s,"leaflet-tooltip-"+m),j(s,t)},_updatePosition:function(){var t=this._map.latLngToLayerPoint(this._latlng);this._setPosition(t)},setOpacity:function(t){this.options.opacity=t,this._container&&ut(this._container,t)},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);this._setPosition(e)},_getAnchor:function(){return T(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),ns=function(t,e){return new We(t,e)};B.include({openTooltip:function(t,e,i){return this._initOverlay(We,t,e,i).openOn(this),this},closeTooltip:function(t){return t.close(),this}}),pt.include({bindTooltip:function(t,e){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(We,this._tooltip,t,e),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(t){if(!(!t&&this._tooltipHandlersAdded)){var e=t?"off":"on",i={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?i.add=this._openTooltip:(i.mouseover=this._openTooltip,i.mouseout=this.closeTooltip,i.click=this._openTooltip,this._map?this._addFocusListeners():i.add=this._addFocusListeners),this._tooltip.options.sticky&&(i.mousemove=this._moveTooltip),this[e](i),this._tooltipHandlersAdded=!t}},openTooltip:function(t){return this._tooltip&&(this instanceof wt||(this._tooltip._source=this),this._tooltip._prepareOpen(t)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(t){return this._tooltip&&this._tooltip.setContent(t),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(t){var e=typeof t.getElement=="function"&&t.getElement();e&&(E(e,"focus",function(){this._tooltip._source=t,this.openTooltip()},this),E(e,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(t){var e=typeof t.getElement=="function"&&t.getElement();e&&e.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(t){if(!(!this._tooltip||!this._map)){if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var e=this;this._map.once("moveend",function(){e._openOnceFlag=!1,e._openTooltip(t)});return}this._tooltip._source=t.layer||t.target,this.openTooltip(this._tooltip.options.sticky?t.latlng:void 0)}},_moveTooltip:function(t){var e=t.latlng,i,n;this._tooltip.options.sticky&&t.originalEvent&&(i=this._map.mouseEventToContainerPoint(t.originalEvent),n=this._map.containerPointToLayerPoint(i),e=this._map.layerPointToLatLng(n)),this._tooltip.setLatLng(e)}});var Wn=Wt.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(t){var e=t&&t.tagName==="DIV"?t:document.createElement("div"),i=this.options;if(i.html instanceof Element?(ze(e),e.appendChild(i.html)):e.innerHTML=i.html!==!1?i.html:"",i.bgPos){var n=T(i.bgPos);e.style.backgroundPosition=-n.x+"px "+-n.y+"px"}return this._setIconStyles(e,"icon"),e},createShadow:function(){return null}});function os(t){return new Wn(t)}Wt.Default=ce;var de=pt.extend({options:{tileSize:256,opacity:1,updateWhenIdle:k.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(t){w(this,t)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(t){t._addZoomLimit(this)},onRemove:function(t){this._removeAllTiles(),W(this._container),t._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(Ht(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(Ut(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(t){return this.options.opacity=t,this._updateOpacity(),this},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var t=this._clampZoom(this._map.getZoom());t!==this._tileZoom&&(this._tileZoom=t,this._updateLevels()),this._update()}return this},getEvents:function(){var t={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=_(this._onMoveEnd,this.options.updateInterval,this)),t.move=this._onMove),this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},createTile:function(){return document.createElement("div")},getTileSize:function(){var t=this.options.tileSize;return t instanceof M?t:new M(t,t)},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(t){for(var e=this.getPane().children,i=-t(-1/0,1/0),n=0,s=e.length,h;n<s;n++)h=e[n].style.zIndex,e[n]!==this._container&&h&&(i=t(i,+h));isFinite(i)&&(this.options.zIndex=i+t(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!k.ielt9){ut(this._container,this.options.opacity);var t=+new Date,e=!1,i=!1;for(var n in this._tiles){var s=this._tiles[n];if(!(!s.current||!s.loaded)){var h=Math.min(1,(t-s.loaded)/200);ut(s.el,h),h<1?e=!0:(s.active?i=!0:this._onOpaqueTile(s),s.active=!0)}}i&&!this._noPrune&&this._pruneTiles(),e&&(ht(this._fadeFrame),this._fadeFrame=it(this._updateOpacity,this))}},_onOpaqueTile:p,_initContainer:function(){this._container||(this._container=N("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var t=this._tileZoom,e=this.options.maxZoom;if(t!==void 0){for(var i in this._levels)i=Number(i),this._levels[i].el.children.length||i===t?(this._levels[i].el.style.zIndex=e-Math.abs(t-i),this._onUpdateLevel(i)):(W(this._levels[i].el),this._removeTilesAtZoom(i),this._onRemoveLevel(i),delete this._levels[i]);var n=this._levels[t],s=this._map;return n||(n=this._levels[t]={},n.el=N("div","leaflet-tile-container leaflet-zoom-animated",this._container),n.el.style.zIndex=e,n.origin=s.project(s.unproject(s.getPixelOrigin()),t).round(),n.zoom=t,this._setZoomTransform(n,s.getCenter(),s.getZoom()),p(n.el.offsetWidth),this._onCreateLevel(n)),this._level=n,n}},_onUpdateLevel:p,_onRemoveLevel:p,_onCreateLevel:p,_pruneTiles:function(){if(this._map){var t,e,i=this._map.getZoom();if(i>this.options.maxZoom||i<this.options.minZoom){this._removeAllTiles();return}for(t in this._tiles)e=this._tiles[t],e.retain=e.current;for(t in this._tiles)if(e=this._tiles[t],e.current&&!e.active){var n=e.coords;this._retainParent(n.x,n.y,n.z,n.z-5)||this._retainChildren(n.x,n.y,n.z,n.z+2)}for(t in this._tiles)this._tiles[t].retain||this._removeTile(t)}},_removeTilesAtZoom:function(t){for(var e in this._tiles)this._tiles[e].coords.z===t&&this._removeTile(e)},_removeAllTiles:function(){for(var t in this._tiles)this._removeTile(t)},_invalidateAll:function(){for(var t in this._levels)W(this._levels[t].el),this._onRemoveLevel(Number(t)),delete this._levels[t];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(t,e,i,n){var s=Math.floor(t/2),h=Math.floor(e/2),f=i-1,m=new M(+s,+h);m.z=+f;var v=this._tileCoordsToKey(m),b=this._tiles[v];return b&&b.active?(b.retain=!0,!0):(b&&b.loaded&&(b.retain=!0),f>n?this._retainParent(s,h,f,n):!1)},_retainChildren:function(t,e,i,n){for(var s=2*t;s<2*t+2;s++)for(var h=2*e;h<2*e+2;h++){var f=new M(s,h);f.z=i+1;var m=this._tileCoordsToKey(f),v=this._tiles[m];if(v&&v.active){v.retain=!0;continue}else v&&v.loaded&&(v.retain=!0);i+1<n&&this._retainChildren(s,h,i+1,n)}},_resetView:function(t){var e=t&&(t.pinch||t.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),e,e)},_animateZoom:function(t){this._setView(t.center,t.zoom,!0,t.noUpdate)},_clampZoom:function(t){var e=this.options;return e.minNativeZoom!==void 0&&t<e.minNativeZoom?e.minNativeZoom:e.maxNativeZoom!==void 0&&e.maxNativeZoom<t?e.maxNativeZoom:t},_setView:function(t,e,i,n){var s=Math.round(e);this.options.maxZoom!==void 0&&s>this.options.maxZoom||this.options.minZoom!==void 0&&s<this.options.minZoom?s=void 0:s=this._clampZoom(s);var h=this.options.updateWhenZooming&&s!==this._tileZoom;(!n||h)&&(this._tileZoom=s,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),s!==void 0&&this._update(t),i||this._pruneTiles(),this._noPrune=!!i),this._setZoomTransforms(t,e)},_setZoomTransforms:function(t,e){for(var i in this._levels)this._setZoomTransform(this._levels[i],t,e)},_setZoomTransform:function(t,e,i){var n=this._map.getZoomScale(i,t.zoom),s=t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e,i)).round();k.any3d?At(t.el,s,n):j(t.el,s)},_resetGrid:function(){var t=this._map,e=t.options.crs,i=this._tileSize=this.getTileSize(),n=this._tileZoom,s=this._map.getPixelWorldBounds(this._tileZoom);s&&(this._globalTileRange=this._pxBoundsToTileRange(s)),this._wrapX=e.wrapLng&&!this.options.noWrap&&[Math.floor(t.project([0,e.wrapLng[0]],n).x/i.x),Math.ceil(t.project([0,e.wrapLng[1]],n).x/i.y)],this._wrapY=e.wrapLat&&!this.options.noWrap&&[Math.floor(t.project([e.wrapLat[0],0],n).y/i.x),Math.ceil(t.project([e.wrapLat[1],0],n).y/i.y)]},_onMoveEnd:function(){!this._map||this._map._animatingZoom||this._update()},_getTiledPixelBounds:function(t){var e=this._map,i=e._animatingZoom?Math.max(e._animateToZoom,e.getZoom()):e.getZoom(),n=e.getZoomScale(i,this._tileZoom),s=e.project(t,this._tileZoom).floor(),h=e.getSize().divideBy(n*2);return new G(s.subtract(h),s.add(h))},_update:function(t){var e=this._map;if(e){var i=this._clampZoom(e.getZoom());if(t===void 0&&(t=e.getCenter()),this._tileZoom!==void 0){var n=this._getTiledPixelBounds(t),s=this._pxBoundsToTileRange(n),h=s.getCenter(),f=[],m=this.options.keepBuffer,v=new G(s.getBottomLeft().subtract([m,-m]),s.getTopRight().add([m,-m]));if(!(isFinite(s.min.x)&&isFinite(s.min.y)&&isFinite(s.max.x)&&isFinite(s.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var b in this._tiles){var C=this._tiles[b].coords;(C.z!==this._tileZoom||!v.contains(new M(C.x,C.y)))&&(this._tiles[b].current=!1)}if(Math.abs(i-this._tileZoom)>1){this._setView(t,i);return}for(var S=s.min.y;S<=s.max.y;S++)for(var O=s.min.x;O<=s.max.x;O++){var tt=new M(O,S);if(tt.z=this._tileZoom,!!this._isValidTile(tt)){var J=this._tiles[this._tileCoordsToKey(tt)];J?J.current=!0:f.push(tt)}}if(f.sort(function(rt,Kt){return rt.distanceTo(h)-Kt.distanceTo(h)}),f.length!==0){this._loading||(this._loading=!0,this.fire("loading"));var dt=document.createDocumentFragment();for(O=0;O<f.length;O++)this._addTile(f[O],dt);this._level.el.appendChild(dt)}}}},_isValidTile:function(t){var e=this._map.options.crs;if(!e.infinite){var i=this._globalTileRange;if(!e.wrapLng&&(t.x<i.min.x||t.x>i.max.x)||!e.wrapLat&&(t.y<i.min.y||t.y>i.max.y))return!1}if(!this.options.bounds)return!0;var n=this._tileCoordsToBounds(t);return V(this.options.bounds).overlaps(n)},_keyToBounds:function(t){return this._tileCoordsToBounds(this._keyToTileCoords(t))},_tileCoordsToNwSe:function(t){var e=this._map,i=this.getTileSize(),n=t.scaleBy(i),s=n.add(i),h=e.unproject(n,t.z),f=e.unproject(s,t.z);return[h,f]},_tileCoordsToBounds:function(t){var e=this._tileCoordsToNwSe(t),i=new ot(e[0],e[1]);return this.options.noWrap||(i=this._map.wrapLatLngBounds(i)),i},_tileCoordsToKey:function(t){return t.x+":"+t.y+":"+t.z},_keyToTileCoords:function(t){var e=t.split(":"),i=new M(+e[0],+e[1]);return i.z=+e[2],i},_removeTile:function(t){var e=this._tiles[t];e&&(W(e.el),delete this._tiles[t],this.fire("tileunload",{tile:e.el,coords:this._keyToTileCoords(t)}))},_initTile:function(t){A(t,"leaflet-tile");var e=this.getTileSize();t.style.width=e.x+"px",t.style.height=e.y+"px",t.onselectstart=p,t.onmousemove=p,k.ielt9&&this.options.opacity<1&&ut(t,this.options.opacity)},_addTile:function(t,e){var i=this._getTilePos(t),n=this._tileCoordsToKey(t),s=this.createTile(this._wrapCoords(t),a(this._tileReady,this,t));this._initTile(s),this.createTile.length<2&&it(a(this._tileReady,this,t,null,s)),j(s,i),this._tiles[n]={el:s,coords:t,current:!0},e.appendChild(s),this.fire("tileloadstart",{tile:s,coords:t})},_tileReady:function(t,e,i){e&&this.fire("tileerror",{error:e,tile:i,coords:t});var n=this._tileCoordsToKey(t);i=this._tiles[n],i&&(i.loaded=+new Date,this._map._fadeAnimated?(ut(i.el,0),ht(this._fadeFrame),this._fadeFrame=it(this._updateOpacity,this)):(i.active=!0,this._pruneTiles()),e||(A(i.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:i.el,coords:t})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),k.ielt9||!this._map._fadeAnimated?it(this._pruneTiles,this):setTimeout(a(this._pruneTiles,this),250)))},_getTilePos:function(t){return t.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(t){var e=new M(this._wrapX?g(t.x,this._wrapX):t.x,this._wrapY?g(t.y,this._wrapY):t.y);return e.z=t.z,e},_pxBoundsToTileRange:function(t){var e=this.getTileSize();return new G(t.min.unscaleBy(e).floor(),t.max.unscaleBy(e).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var t in this._tiles)if(!this._tiles[t].loaded)return!1;return!0}});function rs(t){return new de(t)}var jt=de.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(t,e){this._url=t,e=w(this,e),e.detectRetina&&k.retina&&e.maxZoom>0?(e.tileSize=Math.floor(e.tileSize/2),e.zoomReverse?(e.zoomOffset--,e.minZoom=Math.min(e.maxZoom,e.minZoom+1)):(e.zoomOffset++,e.maxZoom=Math.max(e.minZoom,e.maxZoom-1)),e.minZoom=Math.max(0,e.minZoom)):e.zoomReverse?e.minZoom=Math.min(e.maxZoom,e.minZoom):e.maxZoom=Math.max(e.minZoom,e.maxZoom),typeof e.subdomains=="string"&&(e.subdomains=e.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(t,e){return this._url===t&&e===void 0&&(e=!0),this._url=t,e||this.redraw(),this},createTile:function(t,e){var i=document.createElement("img");return E(i,"load",a(this._tileOnLoad,this,e,i)),E(i,"error",a(this._tileOnError,this,e,i)),(this.options.crossOrigin||this.options.crossOrigin==="")&&(i.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),typeof this.options.referrerPolicy=="string"&&(i.referrerPolicy=this.options.referrerPolicy),i.alt="",i.src=this.getTileUrl(t),i},getTileUrl:function(t){var e={r:k.retina?"@2x":"",s:this._getSubdomain(t),x:t.x,y:t.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var i=this._globalTileRange.max.y-t.y;this.options.tms&&(e.y=i),e["-y"]=i}return H(this._url,l(e,this.options))},_tileOnLoad:function(t,e){k.ielt9?setTimeout(a(t,this,null,e),0):t(null,e)},_tileOnError:function(t,e,i){var n=this.options.errorTileUrl;n&&e.getAttribute("src")!==n&&(e.src=n),t(i,e)},_onTileRemove:function(t){t.tile.onload=null},_getZoomForUrl:function(){var t=this._tileZoom,e=this.options.maxZoom,i=this.options.zoomReverse,n=this.options.zoomOffset;return i&&(t=e-t),t+n},_getSubdomain:function(t){var e=Math.abs(t.x+t.y)%this.options.subdomains.length;return this.options.subdomains[e]},_abortLoading:function(){var t,e;for(t in this._tiles)if(this._tiles[t].coords.z!==this._tileZoom&&(e=this._tiles[t].el,e.onload=p,e.onerror=p,!e.complete)){e.src=at;var i=this._tiles[t].coords;W(e),delete this._tiles[t],this.fire("tileabort",{tile:e,coords:i})}},_removeTile:function(t){var e=this._tiles[t];if(e)return e.el.setAttribute("src",at),de.prototype._removeTile.call(this,t)},_tileReady:function(t,e,i){if(!(!this._map||i&&i.getAttribute("src")===at))return de.prototype._tileReady.call(this,t,e,i)}});function qn(t,e){return new jt(t,e)}var Vn=jt.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(t,e){this._url=t;var i=l({},this.defaultWmsParams);for(var n in e)n in this.options||(i[n]=e[n]);e=w(this,e);var s=e.detectRetina&&k.retina?2:1,h=this.getTileSize();i.width=h.x*s,i.height=h.y*s,this.wmsParams=i},onAdd:function(t){this._crs=this.options.crs||t.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var e=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[e]=this._crs.code,jt.prototype.onAdd.call(this,t)},getTileUrl:function(t){var e=this._tileCoordsToNwSe(t),i=this._crs,n=nt(i.project(e[0]),i.project(e[1])),s=n.min,h=n.max,f=(this._wmsVersion>=1.3&&this._crs===Dn?[s.y,s.x,h.y,h.x]:[s.x,s.y,h.x,h.y]).join(","),m=jt.prototype.getTileUrl.call(this,t);return m+D(this.wmsParams,m,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+f},setParams:function(t,e){return l(this.wmsParams,t),e||this.redraw(),this}});function ss(t,e){return new Vn(t,e)}jt.WMS=Vn,qn.wms=ss;var Ct=pt.extend({options:{padding:.1},initialize:function(t){w(this,t),c(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),A(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var t={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(t.zoomanim=this._onAnimZoom),t},_onAnimZoom:function(t){this._updateTransform(t.center,t.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(t,e){var i=this._map.getZoomScale(e,this._zoom),n=this._map.getSize().multiplyBy(.5+this.options.padding),s=this._map.project(this._center,e),h=n.multiplyBy(-i).add(s).subtract(this._map._getNewPixelOrigin(t,e));k.any3d?At(this._container,h,i):j(this._container,h)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var t in this._layers)this._layers[t]._reset()},_onZoomEnd:function(){for(var t in this._layers)this._layers[t]._project()},_updatePaths:function(){for(var t in this._layers)this._layers[t]._update()},_update:function(){var t=this.options.padding,e=this._map.getSize(),i=this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();this._bounds=new G(i,i.add(e.multiplyBy(1+t*2)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),jn=Ct.extend({options:{tolerance:0},getEvents:function(){var t=Ct.prototype.getEvents.call(this);return t.viewprereset=this._onViewPreReset,t},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){Ct.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var t=this._container=document.createElement("canvas");E(t,"mousemove",this._onMouseMove,this),E(t,"click dblclick mousedown mouseup contextmenu",this._onClick,this),E(t,"mouseout",this._handleMouseOut,this),t._leaflet_disable_events=!0,this._ctx=t.getContext("2d")},_destroyContainer:function(){ht(this._redrawRequest),delete this._ctx,W(this._container),F(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){var t;this._redrawBounds=null;for(var e in this._layers)t=this._layers[e],t._update();this._redraw()}},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){Ct.prototype._update.call(this);var t=this._bounds,e=this._container,i=t.getSize(),n=k.retina?2:1;j(e,t.min),e.width=n*i.x,e.height=n*i.y,e.style.width=i.x+"px",e.style.height=i.y+"px",k.retina&&this._ctx.scale(2,2),this._ctx.translate(-t.min.x,-t.min.y),this.fire("update")}},_reset:function(){Ct.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(t){this._updateDashArray(t),this._layers[c(t)]=t;var e=t._order={layer:t,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=e),this._drawLast=e,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(t){this._requestRedraw(t)},_removePath:function(t){var e=t._order,i=e.next,n=e.prev;i?i.prev=n:this._drawLast=n,n?n.next=i:this._drawFirst=i,delete t._order,delete this._layers[c(t)],this._requestRedraw(t)},_updatePath:function(t){this._extendRedrawBounds(t),t._project(),t._update(),this._requestRedraw(t)},_updateStyle:function(t){this._updateDashArray(t),this._requestRedraw(t)},_updateDashArray:function(t){if(typeof t.options.dashArray=="string"){var e=t.options.dashArray.split(/[, ]+/),i=[],n,s;for(s=0;s<e.length;s++){if(n=Number(e[s]),isNaN(n))return;i.push(n)}t.options._dashArray=i}else t.options._dashArray=t.options.dashArray},_requestRedraw:function(t){this._map&&(this._extendRedrawBounds(t),this._redrawRequest=this._redrawRequest||it(this._redraw,this))},_extendRedrawBounds:function(t){if(t._pxBounds){var e=(t.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new G,this._redrawBounds.extend(t._pxBounds.min.subtract([e,e])),this._redrawBounds.extend(t._pxBounds.max.add([e,e]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var t=this._redrawBounds;if(t){var e=t.getSize();this._ctx.clearRect(t.min.x,t.min.y,e.x,e.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var t,e=this._redrawBounds;if(this._ctx.save(),e){var i=e.getSize();this._ctx.beginPath(),this._ctx.rect(e.min.x,e.min.y,i.x,i.y),this._ctx.clip()}this._drawing=!0;for(var n=this._drawFirst;n;n=n.next)t=n.layer,(!e||t._pxBounds&&t._pxBounds.intersects(e))&&t._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(t,e){if(this._drawing){var i,n,s,h,f=t._parts,m=f.length,v=this._ctx;if(m){for(v.beginPath(),i=0;i<m;i++){for(n=0,s=f[i].length;n<s;n++)h=f[i][n],v[n?"lineTo":"moveTo"](h.x,h.y);e&&v.closePath()}this._fillStroke(v,t)}}},_updateCircle:function(t){if(!(!this._drawing||t._empty())){var e=t._point,i=this._ctx,n=Math.max(Math.round(t._radius),1),s=(Math.max(Math.round(t._radiusY),1)||n)/n;s!==1&&(i.save(),i.scale(1,s)),i.beginPath(),i.arc(e.x,e.y/s,n,0,Math.PI*2,!1),s!==1&&i.restore(),this._fillStroke(i,t)}},_fillStroke:function(t,e){var i=e.options;i.fill&&(t.globalAlpha=i.fillOpacity,t.fillStyle=i.fillColor||i.color,t.fill(i.fillRule||"evenodd")),i.stroke&&i.weight!==0&&(t.setLineDash&&t.setLineDash(e.options&&e.options._dashArray||[]),t.globalAlpha=i.opacity,t.lineWidth=i.weight,t.strokeStyle=i.color,t.lineCap=i.lineCap,t.lineJoin=i.lineJoin,t.stroke())},_onClick:function(t){for(var e=this._map.mouseEventToLayerPoint(t),i,n,s=this._drawFirst;s;s=s.next)i=s.layer,i.options.interactive&&i._containsPoint(e)&&(!(t.type==="click"||t.type==="preclick")||!this._map._draggableMoved(i))&&(n=i);this._fireEvent(n?[n]:!1,t)},_onMouseMove:function(t){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var e=this._map.mouseEventToLayerPoint(t);this._handleMouseHover(t,e)}},_handleMouseOut:function(t){var e=this._hoveredLayer;e&&(q(this._container,"leaflet-interactive"),this._fireEvent([e],t,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(t,e){if(!this._mouseHoverThrottled){for(var i,n,s=this._drawFirst;s;s=s.next)i=s.layer,i.options.interactive&&i._containsPoint(e)&&(n=i);n!==this._hoveredLayer&&(this._handleMouseOut(t),n&&(A(this._container,"leaflet-interactive"),this._fireEvent([n],t,"mouseover"),this._hoveredLayer=n)),this._fireEvent(this._hoveredLayer?[this._hoveredLayer]:!1,t),this._mouseHoverThrottled=!0,setTimeout(a(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(t,e,i){this._map._fireDOMEvent(e,i||e.type,t)},_bringToFront:function(t){var e=t._order;if(e){var i=e.next,n=e.prev;if(i)i.prev=n;else return;n?n.next=i:i&&(this._drawFirst=i),e.prev=this._drawLast,this._drawLast.next=e,e.next=null,this._drawLast=e,this._requestRedraw(t)}},_bringToBack:function(t){var e=t._order;if(e){var i=e.next,n=e.prev;if(n)n.next=i;else return;i?i.prev=n:n&&(this._drawLast=n),e.prev=null,e.next=this._drawFirst,this._drawFirst.prev=e,this._drawFirst=e,this._requestRedraw(t)}}});function Kn(t){return k.canvas?new jn(t):null}var fe=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(t){return document.createElement("<lvml:"+t+' class="lvml">')}}catch{}return function(t){return document.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}(),as={_initContainer:function(){this._container=N("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(Ct.prototype._update.call(this),this.fire("update"))},_initPath:function(t){var e=t._container=fe("shape");A(e,"leaflet-vml-shape "+(this.options.className||"")),e.coordsize="1 1",t._path=fe("path"),e.appendChild(t._path),this._updateStyle(t),this._layers[c(t)]=t},_addPath:function(t){var e=t._container;this._container.appendChild(e),t.options.interactive&&t.addInteractiveTarget(e)},_removePath:function(t){var e=t._container;W(e),t.removeInteractiveTarget(e),delete this._layers[c(t)]},_updateStyle:function(t){var e=t._stroke,i=t._fill,n=t.options,s=t._container;s.stroked=!!n.stroke,s.filled=!!n.fill,n.stroke?(e||(e=t._stroke=fe("stroke")),s.appendChild(e),e.weight=n.weight+"px",e.color=n.color,e.opacity=n.opacity,n.dashArray?e.dashStyle=U(n.dashArray)?n.dashArray.join(" "):n.dashArray.replace(/( *, *)/g," "):e.dashStyle="",e.endcap=n.lineCap.replace("butt","flat"),e.joinstyle=n.lineJoin):e&&(s.removeChild(e),t._stroke=null),n.fill?(i||(i=t._fill=fe("fill")),s.appendChild(i),i.color=n.fillColor||n.color,i.opacity=n.fillOpacity):i&&(s.removeChild(i),t._fill=null)},_updateCircle:function(t){var e=t._point.round(),i=Math.round(t._radius),n=Math.round(t._radiusY||i);this._setPath(t,t._empty()?"M0 0":"AL "+e.x+","+e.y+" "+i+","+n+" 0,"+65535*360)},_setPath:function(t,e){t._path.v=e},_bringToFront:function(t){Ht(t._container)},_bringToBack:function(t){Ut(t._container)}},qe=k.vml?fe:Xi,pe=Ct.extend({_initContainer:function(){this._container=qe("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=qe("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){W(this._container),F(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){Ct.prototype._update.call(this);var t=this._bounds,e=t.getSize(),i=this._container;(!this._svgSize||!this._svgSize.equals(e))&&(this._svgSize=e,i.setAttribute("width",e.x),i.setAttribute("height",e.y)),j(i,t.min),i.setAttribute("viewBox",[t.min.x,t.min.y,e.x,e.y].join(" ")),this.fire("update")}},_initPath:function(t){var e=t._path=qe("path");t.options.className&&A(e,t.options.className),t.options.interactive&&A(e,"leaflet-interactive"),this._updateStyle(t),this._layers[c(t)]=t},_addPath:function(t){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(t._path),t.addInteractiveTarget(t._path)},_removePath:function(t){W(t._path),t.removeInteractiveTarget(t._path),delete this._layers[c(t)]},_updatePath:function(t){t._project(),t._update()},_updateStyle:function(t){var e=t._path,i=t.options;e&&(i.stroke?(e.setAttribute("stroke",i.color),e.setAttribute("stroke-opacity",i.opacity),e.setAttribute("stroke-width",i.weight),e.setAttribute("stroke-linecap",i.lineCap),e.setAttribute("stroke-linejoin",i.lineJoin),i.dashArray?e.setAttribute("stroke-dasharray",i.dashArray):e.removeAttribute("stroke-dasharray"),i.dashOffset?e.setAttribute("stroke-dashoffset",i.dashOffset):e.removeAttribute("stroke-dashoffset")):e.setAttribute("stroke","none"),i.fill?(e.setAttribute("fill",i.fillColor||i.color),e.setAttribute("fill-opacity",i.fillOpacity),e.setAttribute("fill-rule",i.fillRule||"evenodd")):e.setAttribute("fill","none"))},_updatePoly:function(t,e){this._setPath(t,Qi(t._parts,e))},_updateCircle:function(t){var e=t._point,i=Math.max(Math.round(t._radius),1),n=Math.max(Math.round(t._radiusY),1)||i,s="a"+i+","+n+" 0 1,0 ",h=t._empty()?"M0 0":"M"+(e.x-i)+","+e.y+s+i*2+",0 "+s+-i*2+",0 ";this._setPath(t,h)},_setPath:function(t,e){t._path.setAttribute("d",e)},_bringToFront:function(t){Ht(t._path)},_bringToBack:function(t){Ut(t._path)}});k.vml&&pe.include(as);function Yn(t){return k.svg||k.vml?new pe(t):null}B.include({getRenderer:function(t){var e=t.options.renderer||this._getPaneRenderer(t.options.pane)||this.options.renderer||this._renderer;return e||(e=this._renderer=this._createRenderer()),this.hasLayer(e)||this.addLayer(e),e},_getPaneRenderer:function(t){if(t==="overlayPane"||t===void 0)return!1;var e=this._paneRenderers[t];return e===void 0&&(e=this._createRenderer({pane:t}),this._paneRenderers[t]=e),e},_createRenderer:function(t){return this.options.preferCanvas&&Kn(t)||Yn(t)}});var Jn=qt.extend({initialize:function(t,e){qt.prototype.initialize.call(this,this._boundsToLatLngs(t),e)},setBounds:function(t){return this.setLatLngs(this._boundsToLatLngs(t))},_boundsToLatLngs:function(t){return t=V(t),[t.getSouthWest(),t.getNorthWest(),t.getNorthEast(),t.getSouthEast()]}});function ls(t,e){return new Jn(t,e)}pe.create=qe,pe.pointsToPath=Qi,Pt.geometryToLayer=De,Pt.coordsToLatLng=zi,Pt.coordsToLatLngs=Re,Pt.latLngToCoords=Ai,Pt.latLngsToCoords=Fe,Pt.getFeature=Vt,Pt.asFeature=He,B.mergeOptions({boxZoom:!0});var Xn=gt.extend({initialize:function(t){this._map=t,this._container=t._container,this._pane=t._panes.overlayPane,this._resetStateTimeout=0,t.on("unload",this._destroy,this)},addHooks:function(){E(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){F(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){W(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){this._resetStateTimeout!==0&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(t){if(!t.shiftKey||t.which!==1&&t.button!==1)return!1;this._clearDeferredResetState(),this._resetState(),re(),pi(),this._startPoint=this._map.mouseEventToContainerPoint(t),E(document,{contextmenu:$t,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(t){this._moved||(this._moved=!0,this._box=N("div","leaflet-zoom-box",this._container),A(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(t);var e=new G(this._point,this._startPoint),i=e.getSize();j(this._box,e.min),this._box.style.width=i.x+"px",this._box.style.height=i.y+"px"},_finish:function(){this._moved&&(W(this._box),q(this._container,"leaflet-crosshair")),se(),_i(),F(document,{contextmenu:$t,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(t){if(!(t.which!==1&&t.button!==1)&&(this._finish(),!!this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(a(this._resetState,this),0);var e=new ot(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(e).fire("boxzoomend",{boxZoomBounds:e})}},_onKeyDown:function(t){t.keyCode===27&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});B.addInitHook("addHandler","boxZoom",Xn),B.mergeOptions({doubleClickZoom:!0});var Qn=gt.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(t){var e=this._map,i=e.getZoom(),n=e.options.zoomDelta,s=t.originalEvent.shiftKey?i-n:i+n;e.options.doubleClickZoom==="center"?e.setZoom(s):e.setZoomAround(t.containerPoint,s)}});B.addInitHook("addHandler","doubleClickZoom",Qn),B.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var to=gt.extend({addHooks:function(){if(!this._draggable){var t=this._map;this._draggable=new Tt(t._mapPane,t._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),t.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),t.on("zoomend",this._onZoomEnd,this),t.whenReady(this._onZoomEnd,this))}A(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){q(this._map._container,"leaflet-grab"),q(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var t=this._map;if(t._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var e=V(this._map.options.maxBounds);this._offsetLimit=nt(this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(e.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;t.fire("movestart").fire("dragstart"),t.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(t){if(this._map.options.inertia){var e=this._lastTime=+new Date,i=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(i),this._times.push(e),this._prunePositions(e)}this._map.fire("move",t).fire("drag",t)},_prunePositions:function(t){for(;this._positions.length>1&&t-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var t=this._map.getSize().divideBy(2),e=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=e.subtract(t).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(t,e){return t-(t-e)*this._viscosity},_onPreDragLimit:function(){if(!(!this._viscosity||!this._offsetLimit)){var t=this._draggable._newPos.subtract(this._draggable._startPos),e=this._offsetLimit;t.x<e.min.x&&(t.x=this._viscousLimit(t.x,e.min.x)),t.y<e.min.y&&(t.y=this._viscousLimit(t.y,e.min.y)),t.x>e.max.x&&(t.x=this._viscousLimit(t.x,e.max.x)),t.y>e.max.y&&(t.y=this._viscousLimit(t.y,e.max.y)),this._draggable._newPos=this._draggable._startPos.add(t)}},_onPreDragWrap:function(){var t=this._worldWidth,e=Math.round(t/2),i=this._initialWorldOffset,n=this._draggable._newPos.x,s=(n-e+i)%t+e-i,h=(n+e+i)%t-e-i,f=Math.abs(s+i)<Math.abs(h+i)?s:h;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=f},_onDragEnd:function(t){var e=this._map,i=e.options,n=!i.inertia||t.noInertia||this._times.length<2;if(e.fire("dragend",t),n)e.fire("moveend");else{this._prunePositions(+new Date);var s=this._lastPos.subtract(this._positions[0]),h=(this._lastTime-this._times[0])/1e3,f=i.easeLinearity,m=s.multiplyBy(f/h),v=m.distanceTo([0,0]),b=Math.min(i.inertiaMaxSpeed,v),C=m.multiplyBy(b/v),S=b/(i.inertiaDeceleration*f),O=C.multiplyBy(-S/2).round();!O.x&&!O.y?e.fire("moveend"):(O=e._limitOffset(O,e.options.maxBounds),it(function(){e.panBy(O,{duration:S,easeLinearity:f,noMoveStart:!0,animate:!0})}))}}});B.addInitHook("addHandler","dragging",to),B.mergeOptions({keyboard:!0,keyboardPanDelta:80});var eo=gt.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(t){this._map=t,this._setPanDelta(t.options.keyboardPanDelta),this._setZoomDelta(t.options.zoomDelta)},addHooks:function(){var t=this._map._container;t.tabIndex<=0&&(t.tabIndex="0"),E(t,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),F(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var t=document.body,e=document.documentElement,i=t.scrollTop||e.scrollTop,n=t.scrollLeft||e.scrollLeft;this._map._container.focus(),window.scrollTo(n,i)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(t){var e=this._panKeys={},i=this.keyCodes,n,s;for(n=0,s=i.left.length;n<s;n++)e[i.left[n]]=[-1*t,0];for(n=0,s=i.right.length;n<s;n++)e[i.right[n]]=[t,0];for(n=0,s=i.down.length;n<s;n++)e[i.down[n]]=[0,t];for(n=0,s=i.up.length;n<s;n++)e[i.up[n]]=[0,-1*t]},_setZoomDelta:function(t){var e=this._zoomKeys={},i=this.keyCodes,n,s;for(n=0,s=i.zoomIn.length;n<s;n++)e[i.zoomIn[n]]=t;for(n=0,s=i.zoomOut.length;n<s;n++)e[i.zoomOut[n]]=-t},_addHooks:function(){E(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){F(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(t){if(!(t.altKey||t.ctrlKey||t.metaKey)){var e=t.keyCode,i=this._map,n;if(e in this._panKeys){if(!i._panAnim||!i._panAnim._inProgress)if(n=this._panKeys[e],t.shiftKey&&(n=T(n).multiplyBy(3)),i.options.maxBounds&&(n=i._limitOffset(T(n),i.options.maxBounds)),i.options.worldCopyJump){var s=i.wrapLatLng(i.unproject(i.project(i.getCenter()).add(n)));i.panTo(s)}else i.panBy(n)}else if(e in this._zoomKeys)i.setZoom(i.getZoom()+(t.shiftKey?3:1)*this._zoomKeys[e]);else if(e===27&&i._popup&&i._popup.options.closeOnEscapeKey)i.closePopup();else return;$t(t)}}});B.addInitHook("addHandler","keyboard",eo),B.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var io=gt.extend({addHooks:function(){E(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){F(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(t){var e=kn(t),i=this._map.options.wheelDebounceTime;this._delta+=e,this._lastMousePos=this._map.mouseEventToContainerPoint(t),this._startTime||(this._startTime=+new Date);var n=Math.max(i-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(a(this._performZoom,this),n),$t(t)},_performZoom:function(){var t=this._map,e=t.getZoom(),i=this._map.options.zoomSnap||0;t._stop();var n=this._delta/(this._map.options.wheelPxPerZoomLevel*4),s=4*Math.log(2/(1+Math.exp(-Math.abs(n))))/Math.LN2,h=i?Math.ceil(s/i)*i:s,f=t._limitZoom(e+(this._delta>0?h:-h))-e;this._delta=0,this._startTime=null,f&&(t.options.scrollWheelZoom==="center"?t.setZoom(e+f):t.setZoomAround(this._lastMousePos,e+f))}});B.addInitHook("addHandler","scrollWheelZoom",io);var hs=600;B.mergeOptions({tapHold:k.touchNative&&k.safari&&k.mobile,tapTolerance:15});var no=gt.extend({addHooks:function(){E(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){F(this._map._container,"touchstart",this._onDown,this)},_onDown:function(t){if(clearTimeout(this._holdTimeout),t.touches.length===1){var e=t.touches[0];this._startPos=this._newPos=new M(e.clientX,e.clientY),this._holdTimeout=setTimeout(a(function(){this._cancel(),this._isTapValid()&&(E(document,"touchend",X),E(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",e))},this),hs),E(document,"touchend touchcancel contextmenu",this._cancel,this),E(document,"touchmove",this._onMove,this)}},_cancelClickPrevent:function t(){F(document,"touchend",X),F(document,"touchend touchcancel",t)},_cancel:function(){clearTimeout(this._holdTimeout),F(document,"touchend touchcancel contextmenu",this._cancel,this),F(document,"touchmove",this._onMove,this)},_onMove:function(t){var e=t.touches[0];this._newPos=new M(e.clientX,e.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(t,e){var i=new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window,screenX:e.screenX,screenY:e.screenY,clientX:e.clientX,clientY:e.clientY});i._simulated=!0,e.target.dispatchEvent(i)}});B.addInitHook("addHandler","tapHold",no),B.mergeOptions({touchZoom:k.touch,bounceAtZoomLimits:!0});var oo=gt.extend({addHooks:function(){A(this._map._container,"leaflet-touch-zoom"),E(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){q(this._map._container,"leaflet-touch-zoom"),F(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(t){var e=this._map;if(!(!t.touches||t.touches.length!==2||e._animatingZoom||this._zooming)){var i=e.mouseEventToContainerPoint(t.touches[0]),n=e.mouseEventToContainerPoint(t.touches[1]);this._centerPoint=e.getSize()._divideBy(2),this._startLatLng=e.containerPointToLatLng(this._centerPoint),e.options.touchZoom!=="center"&&(this._pinchStartLatLng=e.containerPointToLatLng(i.add(n)._divideBy(2))),this._startDist=i.distanceTo(n),this._startZoom=e.getZoom(),this._moved=!1,this._zooming=!0,e._stop(),E(document,"touchmove",this._onTouchMove,this),E(document,"touchend touchcancel",this._onTouchEnd,this),X(t)}},_onTouchMove:function(t){if(!(!t.touches||t.touches.length!==2||!this._zooming)){var e=this._map,i=e.mouseEventToContainerPoint(t.touches[0]),n=e.mouseEventToContainerPoint(t.touches[1]),s=i.distanceTo(n)/this._startDist;if(this._zoom=e.getScaleZoom(s,this._startZoom),!e.options.bounceAtZoomLimits&&(this._zoom<e.getMinZoom()&&s<1||this._zoom>e.getMaxZoom()&&s>1)&&(this._zoom=e._limitZoom(this._zoom)),e.options.touchZoom==="center"){if(this._center=this._startLatLng,s===1)return}else{var h=i._add(n)._divideBy(2)._subtract(this._centerPoint);if(s===1&&h.x===0&&h.y===0)return;this._center=e.unproject(e.project(this._pinchStartLatLng,this._zoom).subtract(h),this._zoom)}this._moved||(e._moveStart(!0,!1),this._moved=!0),ht(this._animRequest);var f=a(e._move,e,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=it(f,this,!0),X(t)}},_onTouchEnd:function(){if(!this._moved||!this._zooming){this._zooming=!1;return}this._zooming=!1,ht(this._animRequest),F(document,"touchmove",this._onTouchMove,this),F(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))}});B.addInitHook("addHandler","touchZoom",oo),B.BoxZoom=Xn,B.DoubleClickZoom=Qn,B.Drag=to,B.Keyboard=eo,B.ScrollWheelZoom=io,B.TapHold=no,B.TouchZoom=oo,d.Bounds=G,d.Browser=k,d.CRS=bt,d.Canvas=jn,d.Circle=Ei,d.CircleMarker=Ne,d.Class=xt,d.Control=ft,d.DivIcon=Wn,d.DivOverlay=vt,d.DomEvent=Sr,d.DomUtil=Cr,d.Draggable=Tt,d.Evented=te,d.FeatureGroup=wt,d.GeoJSON=Pt,d.GridLayer=de,d.Handler=gt,d.Icon=Wt,d.ImageOverlay=Ue,d.LatLng=R,d.LatLngBounds=ot,d.Layer=pt,d.LayerGroup=Gt,d.LineUtil=Rr,d.Map=B,d.Marker=Be,d.Mixin=Ir,d.Path=Mt,d.Point=M,d.PolyUtil=$r,d.Polygon=qt,d.Polyline=Lt,d.Popup=Ge,d.PosAnimation=Sn,d.Projection=Fr,d.Rectangle=Jn,d.Renderer=Ct,d.SVG=pe,d.SVGOverlay=Gn,d.TileLayer=jt,d.Tooltip=We,d.Transformation=ii,d.Util=Vo,d.VideoOverlay=Un,d.bind=a,d.bounds=nt,d.canvas=Kn,d.circle=Kr,d.circleMarker=jr,d.control=he,d.divIcon=os,d.extend=l,d.featureGroup=Wr,d.geoJSON=Hn,d.geoJson=Xr,d.gridLayer=rs,d.icon=qr,d.imageOverlay=Qr,d.latLng=Z,d.latLngBounds=V,d.layerGroup=Gr,d.map=Tr,d.marker=Vr,d.point=T,d.polygon=Jr,d.polyline=Yr,d.popup=is,d.rectangle=ls,d.setOptions=w,d.stamp=c,d.svg=Yn,d.svgOverlay=es,d.tileLayer=qn,d.tooltip=ns,d.transformation=ee,d.version=r,d.videoOverlay=ts;var us=window.L;d.noConflict=function(){return window.L=us,this},window.L=d})});var zo=lo((Xe,Eo)=>{(function(d,r){typeof Xe=="object"&&typeof Eo<"u"?r(Xe):typeof define=="function"&&define.amd?define(["exports"],r):(d=d||self,r((d.Leaflet=d.Leaflet||{},d.Leaflet.markercluster={})))})(Xe,function(d){"use strict";var r=L.MarkerClusterGroup=L.FeatureGroup.extend({options:{maxClusterRadius:80,iconCreateFunction:null,clusterPane:L.Marker.prototype.options.pane,spiderfyOnEveryZoom:!1,spiderfyOnMaxZoom:!0,showCoverageOnHover:!0,zoomToBoundsOnClick:!0,singleMarkerMode:!1,disableClusteringAtZoom:null,removeOutsideVisibleBounds:!0,animate:!0,animateAddingMarkers:!1,spiderfyShapePositions:null,spiderfyDistanceMultiplier:1,spiderLegPolylineOptions:{weight:1.5,color:"#222",opacity:.5},chunkedLoading:!1,chunkInterval:200,chunkDelay:50,chunkProgress:null,polygonOptions:{}},initialize:function(o){L.Util.setOptions(this,o),this.options.iconCreateFunction||(this.options.iconCreateFunction=this._defaultIconCreateFunction),this._featureGroup=L.featureGroup(),this._featureGroup.addEventParent(this),this._nonPointGroup=L.featureGroup(),this._nonPointGroup.addEventParent(this),this._inZoomAnimation=0,this._needsClustering=[],this._needsRemoving=[],this._currentShownBounds=null,this._queue=[],this._childMarkerEventHandlers={dragstart:this._childMarkerDragStart,move:this._childMarkerMoved,dragend:this._childMarkerDragEnd};var a=L.DomUtil.TRANSITION&&this.options.animate;L.extend(this,a?this._withAnimation:this._noAnimation),this._markerCluster=a?L.MarkerCluster:L.MarkerClusterNonAnimated},addLayer:function(o){if(o instanceof L.LayerGroup)return this.addLayers([o]);if(!o.getLatLng)return this._nonPointGroup.addLayer(o),this.fire("layeradd",{layer:o}),this;if(!this._map)return this._needsClustering.push(o),this.fire("layeradd",{layer:o}),this;if(this.hasLayer(o))return this;this._unspiderfy&&this._unspiderfy(),this._addLayer(o,this._maxZoom),this.fire("layeradd",{layer:o}),this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons();var a=o,u=this._zoom;if(o.__parent)for(;a.__parent._zoom>=u;)a=a.__parent;return this._currentShownBounds.contains(a.getLatLng())&&(this.options.animateAddingMarkers?this._animationAddLayer(o,a):this._animationAddLayerNonAnimated(o,a)),this},removeLayer:function(o){return o instanceof L.LayerGroup?this.removeLayers([o]):o.getLatLng?this._map?o.__parent?(this._unspiderfy&&(this._unspiderfy(),this._unspiderfyLayer(o)),this._removeLayer(o,!0),this.fire("layerremove",{layer:o}),this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),o.off(this._childMarkerEventHandlers,this),this._featureGroup.hasLayer(o)&&(this._featureGroup.removeLayer(o),o.clusterShow&&o.clusterShow()),this):this:(!this._arraySplice(this._needsClustering,o)&&this.hasLayer(o)&&this._needsRemoving.push({layer:o,latlng:o._latlng}),this.fire("layerremove",{layer:o}),this):(this._nonPointGroup.removeLayer(o),this.fire("layerremove",{layer:o}),this)},addLayers:function(o,a){if(!L.Util.isArray(o))return this.addLayer(o);var u=this._featureGroup,c=this._nonPointGroup,_=this.options.chunkedLoading,g=this.options.chunkInterval,p=this.options.chunkProgress,x=o.length,y=0,P=!0,w;if(this._map){var D=new Date().getTime(),z=L.bind(function(){var U=new Date().getTime();for(this._map&&this._unspiderfy&&this._unspiderfy();y<x;y++){if(_&&y%200===0){var yt=new Date().getTime()-U;if(yt>g)break}if(w=o[y],w instanceof L.LayerGroup){P&&(o=o.slice(),P=!1),this._extractNonGroupLayers(w,o),x=o.length;continue}if(!w.getLatLng){c.addLayer(w),a||this.fire("layeradd",{layer:w});continue}if(!this.hasLayer(w)&&(this._addLayer(w,this._maxZoom),a||this.fire("layeradd",{layer:w}),w.__parent&&w.__parent.getChildCount()===2)){var at=w.__parent.getAllChildMarkers(),Qt=at[0]===w?at[1]:at[0];u.removeLayer(Qt)}}p&&p(y,x,new Date().getTime()-D),y===x?(this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds)):setTimeout(z,this.options.chunkDelay)},this);z()}else for(var H=this._needsClustering;y<x;y++){if(w=o[y],w instanceof L.LayerGroup){P&&(o=o.slice(),P=!1),this._extractNonGroupLayers(w,o),x=o.length;continue}if(!w.getLatLng){c.addLayer(w);continue}this.hasLayer(w)||H.push(w)}return this},removeLayers:function(o){var a,u,c=o.length,_=this._featureGroup,g=this._nonPointGroup,p=!0;if(!this._map){for(a=0;a<c;a++){if(u=o[a],u instanceof L.LayerGroup){p&&(o=o.slice(),p=!1),this._extractNonGroupLayers(u,o),c=o.length;continue}this._arraySplice(this._needsClustering,u),g.removeLayer(u),this.hasLayer(u)&&this._needsRemoving.push({layer:u,latlng:u._latlng}),this.fire("layerremove",{layer:u})}return this}if(this._unspiderfy){this._unspiderfy();var x=o.slice(),y=c;for(a=0;a<y;a++){if(u=x[a],u instanceof L.LayerGroup){this._extractNonGroupLayers(u,x),y=x.length;continue}this._unspiderfyLayer(u)}}for(a=0;a<c;a++){if(u=o[a],u instanceof L.LayerGroup){p&&(o=o.slice(),p=!1),this._extractNonGroupLayers(u,o),c=o.length;continue}if(!u.__parent){g.removeLayer(u),this.fire("layerremove",{layer:u});continue}this._removeLayer(u,!0,!0),this.fire("layerremove",{layer:u}),_.hasLayer(u)&&(_.removeLayer(u),u.clusterShow&&u.clusterShow())}return this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds),this},clearLayers:function(){return this._map||(this._needsClustering=[],this._needsRemoving=[],delete this._gridClusters,delete this._gridUnclustered),this._noanimationUnspiderfy&&this._noanimationUnspiderfy(),this._featureGroup.clearLayers(),this._nonPointGroup.clearLayers(),this.eachLayer(function(o){o.off(this._childMarkerEventHandlers,this),delete o.__parent},this),this._map&&this._generateInitialClusters(),this},getBounds:function(){var o=new L.LatLngBounds;this._topClusterLevel&&o.extend(this._topClusterLevel._bounds);for(var a=this._needsClustering.length-1;a>=0;a--)o.extend(this._needsClustering[a].getLatLng());return o.extend(this._nonPointGroup.getBounds()),o},eachLayer:function(o,a){var u=this._needsClustering.slice(),c=this._needsRemoving,_,g,p;for(this._topClusterLevel&&this._topClusterLevel.getAllChildMarkers(u),g=u.length-1;g>=0;g--){for(_=!0,p=c.length-1;p>=0;p--)if(c[p].layer===u[g]){_=!1;break}_&&o.call(a,u[g])}this._nonPointGroup.eachLayer(o,a)},getLayers:function(){var o=[];return this.eachLayer(function(a){o.push(a)}),o},getLayer:function(o){var a=null;return o=parseInt(o,10),this.eachLayer(function(u){L.stamp(u)===o&&(a=u)}),a},hasLayer:function(o){if(!o)return!1;var a,u=this._needsClustering;for(a=u.length-1;a>=0;a--)if(u[a]===o)return!0;for(u=this._needsRemoving,a=u.length-1;a>=0;a--)if(u[a].layer===o)return!1;return!!(o.__parent&&o.__parent._group===this)||this._nonPointGroup.hasLayer(o)},zoomToShowLayer:function(o,a){var u=this._map;typeof a!="function"&&(a=function(){});var c=function(){(u.hasLayer(o)||u.hasLayer(o.__parent))&&!this._inZoomAnimation&&(this._map.off("moveend",c,this),this.off("animationend",c,this),u.hasLayer(o)?a():o.__parent._icon&&(this.once("spiderfied",a,this),o.__parent.spiderfy()))};o._icon&&this._map.getBounds().contains(o.getLatLng())?a():o.__parent._zoom<Math.round(this._map._zoom)?(this._map.on("moveend",c,this),this._map.panTo(o.getLatLng())):(this._map.on("moveend",c,this),this.on("animationend",c,this),o.__parent.zoomToBounds())},onAdd:function(o){this._map=o;var a,u,c;if(!isFinite(this._map.getMaxZoom()))throw"Map has no maxZoom specified";for(this._featureGroup.addTo(o),this._nonPointGroup.addTo(o),this._gridClusters||this._generateInitialClusters(),this._maxLat=o.options.crs.projection.MAX_LATITUDE,a=0,u=this._needsRemoving.length;a<u;a++)c=this._needsRemoving[a],c.newlatlng=c.layer._latlng,c.layer._latlng=c.latlng;for(a=0,u=this._needsRemoving.length;a<u;a++)c=this._needsRemoving[a],this._removeLayer(c.layer,!0),c.layer._latlng=c.newlatlng;this._needsRemoving=[],this._zoom=Math.round(this._map._zoom),this._currentShownBounds=this._getExpandedVisibleBounds(),this._map.on("zoomend",this._zoomEnd,this),this._map.on("moveend",this._moveEnd,this),this._spiderfierOnAdd&&this._spiderfierOnAdd(),this._bindEvents(),u=this._needsClustering,this._needsClustering=[],this.addLayers(u,!0)},onRemove:function(o){o.off("zoomend",this._zoomEnd,this),o.off("moveend",this._moveEnd,this),this._unbindEvents(),this._map._mapPane.className=this._map._mapPane.className.replace(" leaflet-cluster-anim",""),this._spiderfierOnRemove&&this._spiderfierOnRemove(),delete this._maxLat,this._hideCoverage(),this._featureGroup.remove(),this._nonPointGroup.remove(),this._featureGroup.clearLayers(),this._map=null},getVisibleParent:function(o){for(var a=o;a&&!a._icon;)a=a.__parent;return a||null},_arraySplice:function(o,a){for(var u=o.length-1;u>=0;u--)if(o[u]===a)return o.splice(u,1),!0},_removeFromGridUnclustered:function(o,a){for(var u=this._map,c=this._gridUnclustered,_=Math.floor(this._map.getMinZoom());a>=_&&c[a].removeObject(o,u.project(o.getLatLng(),a));a--);},_childMarkerDragStart:function(o){o.target.__dragStart=o.target._latlng},_childMarkerMoved:function(o){if(!this._ignoreMove&&!o.target.__dragStart){var a=o.target._popup&&o.target._popup.isOpen();this._moveChild(o.target,o.oldLatLng,o.latlng),a&&o.target.openPopup()}},_moveChild:function(o,a,u){o._latlng=a,this.removeLayer(o),o._latlng=u,this.addLayer(o)},_childMarkerDragEnd:function(o){var a=o.target.__dragStart;delete o.target.__dragStart,a&&this._moveChild(o.target,a,o.target._latlng)},_removeLayer:function(o,a,u){var c=this._gridClusters,_=this._gridUnclustered,g=this._featureGroup,p=this._map,x=Math.floor(this._map.getMinZoom());a&&this._removeFromGridUnclustered(o,this._maxZoom);var y=o.__parent,P=y._markers,w;for(this._arraySplice(P,o);y&&(y._childCount--,y._boundsNeedUpdate=!0,!(y._zoom<x));)a&&y._childCount<=1?(w=y._markers[0]===o?y._markers[1]:y._markers[0],c[y._zoom].removeObject(y,p.project(y._cLatLng,y._zoom)),_[y._zoom].addObject(w,p.project(w.getLatLng(),y._zoom)),this._arraySplice(y.__parent._childClusters,y),y.__parent._markers.push(w),w.__parent=y.__parent,y._icon&&(g.removeLayer(y),u||g.addLayer(w))):y._iconNeedsUpdate=!0,y=y.__parent;delete o.__parent},_isOrIsParent:function(o,a){for(;a;){if(o===a)return!0;a=a.parentNode}return!1},fire:function(o,a,u){if(a&&a.layer instanceof L.MarkerCluster){if(a.originalEvent&&this._isOrIsParent(a.layer._icon,a.originalEvent.relatedTarget))return;o="cluster"+o}L.FeatureGroup.prototype.fire.call(this,o,a,u)},listens:function(o,a){return L.FeatureGroup.prototype.listens.call(this,o,a)||L.FeatureGroup.prototype.listens.call(this,"cluster"+o,a)},_defaultIconCreateFunction:function(o){var a=o.getChildCount(),u=" marker-cluster-";return a<10?u+="small":a<100?u+="medium":u+="large",new L.DivIcon({html:"<div><span>"+a+"</span></div>",className:"marker-cluster"+u,iconSize:new L.Point(40,40)})},_bindEvents:function(){var o=this._map,a=this.options.spiderfyOnMaxZoom,u=this.options.showCoverageOnHover,c=this.options.zoomToBoundsOnClick,_=this.options.spiderfyOnEveryZoom;(a||c||_)&&this.on("clusterclick clusterkeypress",this._zoomOrSpiderfy,this),u&&(this.on("clustermouseover",this._showCoverage,this),this.on("clustermouseout",this._hideCoverage,this),o.on("zoomend",this._hideCoverage,this))},_zoomOrSpiderfy:function(o){var a=o.layer,u=a;if(!(o.type==="clusterkeypress"&&o.originalEvent&&o.originalEvent.keyCode!==13)){for(;u._childClusters.length===1;)u=u._childClusters[0];u._zoom===this._maxZoom&&u._childCount===a._childCount&&this.options.spiderfyOnMaxZoom?a.spiderfy():this.options.zoomToBoundsOnClick&&a.zoomToBounds(),this.options.spiderfyOnEveryZoom&&a.spiderfy(),o.originalEvent&&o.originalEvent.keyCode===13&&this._map._container.focus()}},_showCoverage:function(o){var a=this._map;this._inZoomAnimation||(this._shownPolygon&&a.removeLayer(this._shownPolygon),o.layer.getChildCount()>2&&o.layer!==this._spiderfied&&(this._shownPolygon=new L.Polygon(o.layer.getConvexHull(),this.options.polygonOptions),a.addLayer(this._shownPolygon)))},_hideCoverage:function(){this._shownPolygon&&(this._map.removeLayer(this._shownPolygon),this._shownPolygon=null)},_unbindEvents:function(){var o=this.options.spiderfyOnMaxZoom,a=this.options.showCoverageOnHover,u=this.options.zoomToBoundsOnClick,c=this.options.spiderfyOnEveryZoom,_=this._map;(o||u||c)&&this.off("clusterclick clusterkeypress",this._zoomOrSpiderfy,this),a&&(this.off("clustermouseover",this._showCoverage,this),this.off("clustermouseout",this._hideCoverage,this),_.off("zoomend",this._hideCoverage,this))},_zoomEnd:function(){this._map&&(this._mergeSplitClusters(),this._zoom=Math.round(this._map._zoom),this._currentShownBounds=this._getExpandedVisibleBounds())},_moveEnd:function(){if(!this._inZoomAnimation){var o=this._getExpandedVisibleBounds();this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),this._zoom,o),this._topClusterLevel._recursivelyAddChildrenToMap(null,Math.round(this._map._zoom),o),this._currentShownBounds=o}},_generateInitialClusters:function(){var o=Math.ceil(this._map.getMaxZoom()),a=Math.floor(this._map.getMinZoom()),u=this.options.maxClusterRadius,c=u;typeof u!="function"&&(c=function(){return u}),this.options.disableClusteringAtZoom!==null&&(o=this.options.disableClusteringAtZoom-1),this._maxZoom=o,this._gridClusters={},this._gridUnclustered={};for(var _=o;_>=a;_--)this._gridClusters[_]=new L.DistanceGrid(c(_)),this._gridUnclustered[_]=new L.DistanceGrid(c(_));this._topClusterLevel=new this._markerCluster(this,a-1)},_addLayer:function(o,a){var u=this._gridClusters,c=this._gridUnclustered,_=Math.floor(this._map.getMinZoom()),g,p;for(this.options.singleMarkerMode&&this._overrideMarkerIcon(o),o.on(this._childMarkerEventHandlers,this);a>=_;a--){g=this._map.project(o.getLatLng(),a);var x=u[a].getNearObject(g);if(x){x._addChild(o),o.__parent=x;return}if(x=c[a].getNearObject(g),x){var y=x.__parent;y&&this._removeLayer(x,!1);var P=new this._markerCluster(this,a,x,o);u[a].addObject(P,this._map.project(P._cLatLng,a)),x.__parent=P,o.__parent=P;var w=P;for(p=a-1;p>y._zoom;p--)w=new this._markerCluster(this,p,w),u[p].addObject(w,this._map.project(x.getLatLng(),p));y._addChild(w),this._removeFromGridUnclustered(x,a);return}c[a].addObject(o,g)}this._topClusterLevel._addChild(o),o.__parent=this._topClusterLevel},_refreshClustersIcons:function(){this._featureGroup.eachLayer(function(o){o instanceof L.MarkerCluster&&o._iconNeedsUpdate&&o._updateIcon()})},_enqueue:function(o){this._queue.push(o),this._queueTimeout||(this._queueTimeout=setTimeout(L.bind(this._processQueue,this),300))},_processQueue:function(){for(var o=0;o<this._queue.length;o++)this._queue[o].call(this);this._queue.length=0,clearTimeout(this._queueTimeout),this._queueTimeout=null},_mergeSplitClusters:function(){var o=Math.round(this._map._zoom);this._processQueue(),this._zoom<o&&this._currentShownBounds.intersects(this._getExpandedVisibleBounds())?(this._animationStart(),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),this._zoom,this._getExpandedVisibleBounds()),this._animationZoomIn(this._zoom,o)):this._zoom>o?(this._animationStart(),this._animationZoomOut(this._zoom,o)):this._moveEnd()},_getExpandedVisibleBounds:function(){if(this.options.removeOutsideVisibleBounds){if(L.Browser.mobile)return this._checkBoundsMaxLat(this._map.getBounds())}else return this._mapBoundsInfinite;return this._checkBoundsMaxLat(this._map.getBounds().pad(1))},_checkBoundsMaxLat:function(o){var a=this._maxLat;return a!==void 0&&(o.getNorth()>=a&&(o._northEast.lat=1/0),o.getSouth()<=-a&&(o._southWest.lat=-1/0)),o},_animationAddLayerNonAnimated:function(o,a){if(a===o)this._featureGroup.addLayer(o);else if(a._childCount===2){a._addToMap();var u=a.getAllChildMarkers();this._featureGroup.removeLayer(u[0]),this._featureGroup.removeLayer(u[1])}else a._updateIcon()},_extractNonGroupLayers:function(o,a){var u=o.getLayers(),c=0,_;for(a=a||[];c<u.length;c++){if(_=u[c],_ instanceof L.LayerGroup){this._extractNonGroupLayers(_,a);continue}a.push(_)}return a},_overrideMarkerIcon:function(o){var a=o.options.icon=this.options.iconCreateFunction({getChildCount:function(){return 1},getAllChildMarkers:function(){return[o]}});return a}});L.MarkerClusterGroup.include({_mapBoundsInfinite:new L.LatLngBounds(new L.LatLng(-1/0,-1/0),new L.LatLng(1/0,1/0))}),L.MarkerClusterGroup.include({_noAnimation:{_animationStart:function(){},_animationZoomIn:function(o,a){this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),o),this._topClusterLevel._recursivelyAddChildrenToMap(null,a,this._getExpandedVisibleBounds()),this.fire("animationend")},_animationZoomOut:function(o,a){this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),o),this._topClusterLevel._recursivelyAddChildrenToMap(null,a,this._getExpandedVisibleBounds()),this.fire("animationend")},_animationAddLayer:function(o,a){this._animationAddLayerNonAnimated(o,a)}},_withAnimation:{_animationStart:function(){this._map._mapPane.className+=" leaflet-cluster-anim",this._inZoomAnimation++},_animationZoomIn:function(o,a){var u=this._getExpandedVisibleBounds(),c=this._featureGroup,_=Math.floor(this._map.getMinZoom()),g;this._ignoreMove=!0,this._topClusterLevel._recursively(u,o,_,function(p){var x=p._latlng,y=p._markers,P;for(u.contains(x)||(x=null),p._isSingleParent()&&o+1===a?(c.removeLayer(p),p._recursivelyAddChildrenToMap(null,a,u)):(p.clusterHide(),p._recursivelyAddChildrenToMap(x,a,u)),g=y.length-1;g>=0;g--)P=y[g],u.contains(P._latlng)||c.removeLayer(P)}),this._forceLayout(),this._topClusterLevel._recursivelyBecomeVisible(u,a),c.eachLayer(function(p){!(p instanceof L.MarkerCluster)&&p._icon&&p.clusterShow()}),this._topClusterLevel._recursively(u,o,a,function(p){p._recursivelyRestoreChildPositions(a)}),this._ignoreMove=!1,this._enqueue(function(){this._topClusterLevel._recursively(u,o,_,function(p){c.removeLayer(p),p.clusterShow()}),this._animationEnd()})},_animationZoomOut:function(o,a){this._animationZoomOutSingle(this._topClusterLevel,o-1,a),this._topClusterLevel._recursivelyAddChildrenToMap(null,a,this._getExpandedVisibleBounds()),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),o,this._getExpandedVisibleBounds())},_animationAddLayer:function(o,a){var u=this,c=this._featureGroup;c.addLayer(o),a!==o&&(a._childCount>2?(a._updateIcon(),this._forceLayout(),this._animationStart(),o._setPos(this._map.latLngToLayerPoint(a.getLatLng())),o.clusterHide(),this._enqueue(function(){c.removeLayer(o),o.clusterShow(),u._animationEnd()})):(this._forceLayout(),u._animationStart(),u._animationZoomOutSingle(a,this._map.getMaxZoom(),this._zoom)))}},_animationZoomOutSingle:function(o,a,u){var c=this._getExpandedVisibleBounds(),_=Math.floor(this._map.getMinZoom());o._recursivelyAnimateChildrenInAndAddSelfToMap(c,_,a+1,u);var g=this;this._forceLayout(),o._recursivelyBecomeVisible(c,u),this._enqueue(function(){if(o._childCount===1){var p=o._markers[0];this._ignoreMove=!0,p.setLatLng(p.getLatLng()),this._ignoreMove=!1,p.clusterShow&&p.clusterShow()}else o._recursively(c,u,_,function(x){x._recursivelyRemoveChildrenFromMap(c,_,a+1)});g._animationEnd()})},_animationEnd:function(){this._map&&(this._map._mapPane.className=this._map._mapPane.className.replace(" leaflet-cluster-anim","")),this._inZoomAnimation--,this.fire("animationend")},_forceLayout:function(){L.Util.falseFn(document.body.offsetWidth)}}),L.markerClusterGroup=function(o){return new L.MarkerClusterGroup(o)};var l=L.MarkerCluster=L.Marker.extend({options:L.Icon.prototype.options,initialize:function(o,a,u,c){L.Marker.prototype.initialize.call(this,u?u._cLatLng||u.getLatLng():new L.LatLng(0,0),{icon:this,pane:o.options.clusterPane}),this._group=o,this._zoom=a,this._markers=[],this._childClusters=[],this._childCount=0,this._iconNeedsUpdate=!0,this._boundsNeedUpdate=!0,this._bounds=new L.LatLngBounds,u&&this._addChild(u),c&&this._addChild(c)},getAllChildMarkers:function(o,a){o=o||[];for(var u=this._childClusters.length-1;u>=0;u--)this._childClusters[u].getAllChildMarkers(o,a);for(var c=this._markers.length-1;c>=0;c--)a&&this._markers[c].__dragStart||o.push(this._markers[c]);return o},getChildCount:function(){return this._childCount},zoomToBounds:function(o){for(var a=this._childClusters.slice(),u=this._group._map,c=u.getBoundsZoom(this._bounds),_=this._zoom+1,g=u.getZoom(),p;a.length>0&&c>_;){_++;var x=[];for(p=0;p<a.length;p++)x=x.concat(a[p]._childClusters);a=x}c>_?this._group._map.setView(this._latlng,_):c<=g?this._group._map.setView(this._latlng,g+1):this._group._map.fitBounds(this._bounds,o)},getBounds:function(){var o=new L.LatLngBounds;return o.extend(this._bounds),o},_updateIcon:function(){this._iconNeedsUpdate=!0,this._icon&&this.setIcon(this)},createIcon:function(){return this._iconNeedsUpdate&&(this._iconObj=this._group.options.iconCreateFunction(this),this._iconNeedsUpdate=!1),this._iconObj.createIcon()},createShadow:function(){return this._iconObj.createShadow()},_addChild:function(o,a){this._iconNeedsUpdate=!0,this._boundsNeedUpdate=!0,this._setClusterCenter(o),o instanceof L.MarkerCluster?(a||(this._childClusters.push(o),o.__parent=this),this._childCount+=o._childCount):(a||this._markers.push(o),this._childCount++),this.__parent&&this.__parent._addChild(o,!0)},_setClusterCenter:function(o){this._cLatLng||(this._cLatLng=o._cLatLng||o._latlng)},_resetBounds:function(){var o=this._bounds;o._southWest&&(o._southWest.lat=1/0,o._southWest.lng=1/0),o._northEast&&(o._northEast.lat=-1/0,o._northEast.lng=-1/0)},_recalculateBounds:function(){var o=this._markers,a=this._childClusters,u=0,c=0,_=this._childCount,g,p,x,y;if(_!==0){for(this._resetBounds(),g=0;g<o.length;g++)x=o[g]._latlng,this._bounds.extend(x),u+=x.lat,c+=x.lng;for(g=0;g<a.length;g++)p=a[g],p._boundsNeedUpdate&&p._recalculateBounds(),this._bounds.extend(p._bounds),x=p._wLatLng,y=p._childCount,u+=x.lat*y,c+=x.lng*y;this._latlng=this._wLatLng=new L.LatLng(u/_,c/_),this._boundsNeedUpdate=!1}},_addToMap:function(o){o&&(this._backupLatlng=this._latlng,this.setLatLng(o)),this._group._featureGroup.addLayer(this)},_recursivelyAnimateChildrenIn:function(o,a,u){this._recursively(o,this._group._map.getMinZoom(),u-1,function(c){var _=c._markers,g,p;for(g=_.length-1;g>=0;g--)p=_[g],p._icon&&(p._setPos(a),p.clusterHide())},function(c){var _=c._childClusters,g,p;for(g=_.length-1;g>=0;g--)p=_[g],p._icon&&(p._setPos(a),p.clusterHide())})},_recursivelyAnimateChildrenInAndAddSelfToMap:function(o,a,u,c){this._recursively(o,c,a,function(_){_._recursivelyAnimateChildrenIn(o,_._group._map.latLngToLayerPoint(_.getLatLng()).round(),u),_._isSingleParent()&&u-1===c?(_.clusterShow(),_._recursivelyRemoveChildrenFromMap(o,a,u)):_.clusterHide(),_._addToMap()})},_recursivelyBecomeVisible:function(o,a){this._recursively(o,this._group._map.getMinZoom(),a,null,function(u){u.clusterShow()})},_recursivelyAddChildrenToMap:function(o,a,u){this._recursively(u,this._group._map.getMinZoom()-1,a,function(c){if(a!==c._zoom)for(var _=c._markers.length-1;_>=0;_--){var g=c._markers[_];u.contains(g._latlng)&&(o&&(g._backupLatlng=g.getLatLng(),g.setLatLng(o),g.clusterHide&&g.clusterHide()),c._group._featureGroup.addLayer(g))}},function(c){c._addToMap(o)})},_recursivelyRestoreChildPositions:function(o){for(var a=this._markers.length-1;a>=0;a--){var u=this._markers[a];u._backupLatlng&&(u.setLatLng(u._backupLatlng),delete u._backupLatlng)}if(o-1===this._zoom)for(var c=this._childClusters.length-1;c>=0;c--)this._childClusters[c]._restorePosition();else for(var _=this._childClusters.length-1;_>=0;_--)this._childClusters[_]._recursivelyRestoreChildPositions(o)},_restorePosition:function(){this._backupLatlng&&(this.setLatLng(this._backupLatlng),delete this._backupLatlng)},_recursivelyRemoveChildrenFromMap:function(o,a,u,c){var _,g;this._recursively(o,a-1,u-1,function(p){for(g=p._markers.length-1;g>=0;g--)_=p._markers[g],(!c||!c.contains(_._latlng))&&(p._group._featureGroup.removeLayer(_),_.clusterShow&&_.clusterShow())},function(p){for(g=p._childClusters.length-1;g>=0;g--)_=p._childClusters[g],(!c||!c.contains(_._latlng))&&(p._group._featureGroup.removeLayer(_),_.clusterShow&&_.clusterShow())})},_recursively:function(o,a,u,c,_){var g=this._childClusters,p=this._zoom,x,y;if(a<=p&&(c&&c(this),_&&p===u&&_(this)),p<a||p<u)for(x=g.length-1;x>=0;x--)y=g[x],y._boundsNeedUpdate&&y._recalculateBounds(),o.intersects(y._bounds)&&y._recursively(o,a,u,c,_)},_isSingleParent:function(){return this._childClusters.length>0&&this._childClusters[0]._childCount===this._childCount}});L.Marker.include({clusterHide:function(){var o=this.options.opacity;return this.setOpacity(0),this.options.opacity=o,this},clusterShow:function(){return this.setOpacity(this.options.opacity)}}),L.DistanceGrid=function(o){this._cellSize=o,this._sqCellSize=o*o,this._grid={},this._objectPoint={}},L.DistanceGrid.prototype={addObject:function(o,a){var u=this._getCoord(a.x),c=this._getCoord(a.y),_=this._grid,g=_[c]=_[c]||{},p=g[u]=g[u]||[],x=L.Util.stamp(o);this._objectPoint[x]=a,p.push(o)},updateObject:function(o,a){this.removeObject(o),this.addObject(o,a)},removeObject:function(o,a){var u=this._getCoord(a.x),c=this._getCoord(a.y),_=this._grid,g=_[c]=_[c]||{},p=g[u]=g[u]||[],x,y;for(delete this._objectPoint[L.Util.stamp(o)],x=0,y=p.length;x<y;x++)if(p[x]===o)return p.splice(x,1),y===1&&delete g[u],!0},eachObject:function(o,a){var u,c,_,g,p,x,y,P=this._grid;for(u in P){p=P[u];for(c in p)for(x=p[c],_=0,g=x.length;_<g;_++)y=o.call(a,x[_]),y&&(_--,g--)}},getNearObject:function(o){var a=this._getCoord(o.x),u=this._getCoord(o.y),c,_,g,p,x,y,P,w,D=this._objectPoint,z=this._sqCellSize,H=null;for(c=u-1;c<=u+1;c++)if(p=this._grid[c],p){for(_=a-1;_<=a+1;_++)if(x=p[_],x)for(g=0,y=x.length;g<y;g++)P=x[g],w=this._sqDist(D[L.Util.stamp(P)],o),(w<z||w<=z&&H===null)&&(z=w,H=P)}return H},_getCoord:function(o){var a=Math.floor(o/this._cellSize);return isFinite(a)?a:o},_sqDist:function(o,a){var u=a.x-o.x,c=a.y-o.y;return u*u+c*c}},function(){L.QuickHull={getDistant:function(o,a){var u=a[1].lat-a[0].lat,c=a[0].lng-a[1].lng;return c*(o.lat-a[0].lat)+u*(o.lng-a[0].lng)},findMostDistantPointFromBaseLine:function(o,a){var u=0,c=null,_=[],g,p,x;for(g=a.length-1;g>=0;g--){if(p=a[g],x=this.getDistant(p,o),x>0)_.push(p);else continue;x>u&&(u=x,c=p)}return{maxPoint:c,newPoints:_}},buildConvexHull:function(o,a){var u=[],c=this.findMostDistantPointFromBaseLine(o,a);return c.maxPoint?(u=u.concat(this.buildConvexHull([o[0],c.maxPoint],c.newPoints)),u=u.concat(this.buildConvexHull([c.maxPoint,o[1]],c.newPoints)),u):[o[0]]},getConvexHull:function(o){var a=!1,u=!1,c=!1,_=!1,g=null,p=null,x=null,y=null,P=null,w=null,D;for(D=o.length-1;D>=0;D--){var z=o[D];(a===!1||z.lat>a)&&(g=z,a=z.lat),(u===!1||z.lat<u)&&(p=z,u=z.lat),(c===!1||z.lng>c)&&(x=z,c=z.lng),(_===!1||z.lng<_)&&(y=z,_=z.lng)}u!==a?(w=p,P=g):(w=y,P=x);var H=[].concat(this.buildConvexHull([w,P],o),this.buildConvexHull([P,w],o));return H}}}(),L.MarkerCluster.include({getConvexHull:function(){var o=this.getAllChildMarkers(),a=[],u,c;for(c=o.length-1;c>=0;c--)u=o[c].getLatLng(),a.push(u);return L.QuickHull.getConvexHull(a)}}),L.MarkerCluster.include({_2PI:Math.PI*2,_circleFootSeparation:25,_circleStartAngle:0,_spiralFootSeparation:28,_spiralLengthStart:11,_spiralLengthFactor:5,_circleSpiralSwitchover:9,spiderfy:function(){if(!(this._group._spiderfied===this||this._group._inZoomAnimation)){var o=this.getAllChildMarkers(null,!0),a=this._group,u=a._map,c=u.latLngToLayerPoint(this._latlng),_;this._group._unspiderfy(),this._group._spiderfied=this,this._group.options.spiderfyShapePositions?_=this._group.options.spiderfyShapePositions(o.length,c):o.length>=this._circleSpiralSwitchover?_=this._generatePointsSpiral(o.length,c):(c.y+=10,_=this._generatePointsCircle(o.length,c)),this._animationSpiderfy(o,_)}},unspiderfy:function(o){this._group._inZoomAnimation||(this._animationUnspiderfy(o),this._group._spiderfied=null)},_generatePointsCircle:function(o,a){var u=this._group.options.spiderfyDistanceMultiplier*this._circleFootSeparation*(2+o),c=u/this._2PI,_=this._2PI/o,g=[],p,x;for(c=Math.max(c,35),g.length=o,p=0;p<o;p++)x=this._circleStartAngle+p*_,g[p]=new L.Point(a.x+c*Math.cos(x),a.y+c*Math.sin(x))._round();return g},_generatePointsSpiral:function(o,a){var u=this._group.options.spiderfyDistanceMultiplier,c=u*this._spiralLengthStart,_=u*this._spiralFootSeparation,g=u*this._spiralLengthFactor*this._2PI,p=0,x=[],y;for(x.length=o,y=o;y>=0;y--)y<o&&(x[y]=new L.Point(a.x+c*Math.cos(p),a.y+c*Math.sin(p))._round()),p+=_/c+y*5e-4,c+=g/p;return x},_noanimationUnspiderfy:function(){var o=this._group,a=o._map,u=o._featureGroup,c=this.getAllChildMarkers(null,!0),_,g;for(o._ignoreMove=!0,this.setOpacity(1),g=c.length-1;g>=0;g--)_=c[g],u.removeLayer(_),_._preSpiderfyLatlng&&(_.setLatLng(_._preSpiderfyLatlng),delete _._preSpiderfyLatlng),_.setZIndexOffset&&_.setZIndexOffset(0),_._spiderLeg&&(a.removeLayer(_._spiderLeg),delete _._spiderLeg);o.fire("unspiderfied",{cluster:this,markers:c}),o._ignoreMove=!1,o._spiderfied=null}}),L.MarkerClusterNonAnimated=L.MarkerCluster.extend({_animationSpiderfy:function(o,a){var u=this._group,c=u._map,_=u._featureGroup,g=this._group.options.spiderLegPolylineOptions,p,x,y,P;for(u._ignoreMove=!0,p=0;p<o.length;p++)P=c.layerPointToLatLng(a[p]),x=o[p],y=new L.Polyline([this._latlng,P],g),c.addLayer(y),x._spiderLeg=y,x._preSpiderfyLatlng=x._latlng,x.setLatLng(P),x.setZIndexOffset&&x.setZIndexOffset(1e6),_.addLayer(x);this.setOpacity(.3),u._ignoreMove=!1,u.fire("spiderfied",{cluster:this,markers:o})},_animationUnspiderfy:function(){this._noanimationUnspiderfy()}}),L.MarkerCluster.include({_animationSpiderfy:function(o,a){var u=this,c=this._group,_=c._map,g=c._featureGroup,p=this._latlng,x=_.latLngToLayerPoint(p),y=L.Path.SVG,P=L.extend({},this._group.options.spiderLegPolylineOptions),w=P.opacity,D,z,H,U,yt,at;for(w===void 0&&(w=L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity),y?(P.opacity=0,P.className=(P.className||"")+" leaflet-cluster-spider-leg"):P.opacity=w,c._ignoreMove=!0,D=0;D<o.length;D++)z=o[D],at=_.layerPointToLatLng(a[D]),H=new L.Polyline([p,at],P),_.addLayer(H),z._spiderLeg=H,y&&(U=H._path,yt=U.getTotalLength()+.1,U.style.strokeDasharray=yt,U.style.strokeDashoffset=yt),z.setZIndexOffset&&z.setZIndexOffset(1e6),z.clusterHide&&z.clusterHide(),g.addLayer(z),z._setPos&&z._setPos(x);for(c._forceLayout(),c._animationStart(),D=o.length-1;D>=0;D--)at=_.layerPointToLatLng(a[D]),z=o[D],z._preSpiderfyLatlng=z._latlng,z.setLatLng(at),z.clusterShow&&z.clusterShow(),y&&(H=z._spiderLeg,U=H._path,U.style.strokeDashoffset=0,H.setStyle({opacity:w}));this.setOpacity(.3),c._ignoreMove=!1,setTimeout(function(){c._animationEnd(),c.fire("spiderfied",{cluster:u,markers:o})},200)},_animationUnspiderfy:function(o){var a=this,u=this._group,c=u._map,_=u._featureGroup,g=o?c._latLngToNewLayerPoint(this._latlng,o.zoom,o.center):c.latLngToLayerPoint(this._latlng),p=this.getAllChildMarkers(null,!0),x=L.Path.SVG,y,P,w,D,z,H;for(u._ignoreMove=!0,u._animationStart(),this.setOpacity(1),P=p.length-1;P>=0;P--)y=p[P],y._preSpiderfyLatlng&&(y.closePopup(),y.setLatLng(y._preSpiderfyLatlng),delete y._preSpiderfyLatlng,H=!0,y._setPos&&(y._setPos(g),H=!1),y.clusterHide&&(y.clusterHide(),H=!1),H&&_.removeLayer(y),x&&(w=y._spiderLeg,D=w._path,z=D.getTotalLength()+.1,D.style.strokeDashoffset=z,w.setStyle({opacity:0})));u._ignoreMove=!1,setTimeout(function(){var U=0;for(P=p.length-1;P>=0;P--)y=p[P],y._spiderLeg&&U++;for(P=p.length-1;P>=0;P--)y=p[P],y._spiderLeg&&(y.clusterShow&&y.clusterShow(),y.setZIndexOffset&&y.setZIndexOffset(0),U>1&&_.removeLayer(y),c.removeLayer(y._spiderLeg),delete y._spiderLeg);u._animationEnd(),u.fire("unspiderfied",{cluster:a,markers:p})},200)}}),L.MarkerClusterGroup.include({_spiderfied:null,unspiderfy:function(){this._unspiderfy.apply(this,arguments)},_spiderfierOnAdd:function(){this._map.on("click",this._unspiderfyWrapper,this),this._map.options.zoomAnimation&&this._map.on("zoomstart",this._unspiderfyZoomStart,this),this._map.on("zoomend",this._noanimationUnspiderfy,this),L.Browser.touch||this._map.getRenderer(this)},_spiderfierOnRemove:function(){this._map.off("click",this._unspiderfyWrapper,this),this._map.off("zoomstart",this._unspiderfyZoomStart,this),this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._map.off("zoomend",this._noanimationUnspiderfy,this),this._noanimationUnspiderfy()},_unspiderfyZoomStart:function(){this._map&&this._map.on("zoomanim",this._unspiderfyZoomAnim,this)},_unspiderfyZoomAnim:function(o){L.DomUtil.hasClass(this._map._mapPane,"leaflet-touching")||(this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._unspiderfy(o))},_unspiderfyWrapper:function(){this._unspiderfy()},_unspiderfy:function(o){this._spiderfied&&this._spiderfied.unspiderfy(o)},_noanimationUnspiderfy:function(){this._spiderfied&&this._spiderfied._noanimationUnspiderfy()},_unspiderfyLayer:function(o){o._spiderLeg&&(this._featureGroup.removeLayer(o),o.clusterShow&&o.clusterShow(),o.setZIndexOffset&&o.setZIndexOffset(0),this._map.removeLayer(o._spiderLeg),delete o._spiderLeg)}}),L.MarkerClusterGroup.include({refreshClusters:function(o){return o?o instanceof L.MarkerClusterGroup?o=o._topClusterLevel.getAllChildMarkers():o instanceof L.LayerGroup?o=o._layers:o instanceof L.MarkerCluster?o=o.getAllChildMarkers():o instanceof L.Marker&&(o=[o]):o=this._topClusterLevel.getAllChildMarkers(),this._flagParentsIconsNeedUpdate(o),this._refreshClustersIcons(),this.options.singleMarkerMode&&this._refreshSingleMarkerModeMarkers(o),this},_flagParentsIconsNeedUpdate:function(o){var a,u;for(a in o)for(u=o[a].__parent;u;)u._iconNeedsUpdate=!0,u=u.__parent},_refreshSingleMarkerModeMarkers:function(o){var a,u;for(a in o)u=o[a],this.hasLayer(u)&&u.setIcon(this._overrideMarkerIcon(u))}}),L.Marker.include({refreshIconOptions:function(o,a){var u=this.options.icon;return L.setOptions(u,o),this.setIcon(u),a&&this.__parent&&this.__parent._group.refreshClusters(this),this}}),d.MarkerClusterGroup=r,d.MarkerCluster=l,Object.defineProperty(d,"__esModule",{value:!0})})});var je=globalThis,Ke=je.ShadowRoot&&(je.ShadyCSS===void 0||je.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Zi=Symbol(),uo=new WeakMap,_e=class{constructor(r,l,o){if(this._$cssResult$=!0,o!==Zi)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=l}get styleSheet(){let r=this.o,l=this.t;if(Ke&&r===void 0){let o=l!==void 0&&l.length===1;o&&(r=uo.get(l)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),o&&uo.set(l,r))}return r}toString(){return this.cssText}},Yt=d=>new _e(typeof d=="string"?d:d+"",void 0,Zi),st=(d,...r)=>{let l=d.length===1?d[0]:r.reduce((o,a,u)=>o+(c=>{if(c._$cssResult$===!0)return c.cssText;if(typeof c=="number")return c;throw Error("Value passed to 'css' function must be a 'css' function result: "+c+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+d[u+1],d[0]);return new _e(l,d,Zi)},co=(d,r)=>{if(Ke)d.adoptedStyleSheets=r.map(l=>l instanceof CSSStyleSheet?l:l.styleSheet);else for(let l of r){let o=document.createElement("style"),a=je.litNonce;a!==void 0&&o.setAttribute("nonce",a),o.textContent=l.cssText,d.appendChild(o)}},Bi=Ke?d=>d:d=>d instanceof CSSStyleSheet?(r=>{let l="";for(let o of r.cssRules)l+=o.cssText;return Yt(l)})(d):d;var{is:ks,defineProperty:Ss,getOwnPropertyDescriptor:Ts,getOwnPropertyNames:Ms,getOwnPropertySymbols:Es,getPrototypeOf:zs}=Object,Et=globalThis,fo=Et.trustedTypes,As=fo?fo.emptyScript:"",Os=Et.reactiveElementPolyfillSupport,me=(d,r)=>d,Ni={toAttribute(d,r){switch(r){case Boolean:d=d?As:null;break;case Object:case Array:d=d==null?d:JSON.stringify(d)}return d},fromAttribute(d,r){let l=d;switch(r){case Boolean:l=d!==null;break;case Number:l=d===null?null:Number(d);break;case Object:case Array:try{l=JSON.parse(d)}catch{l=null}}return l}},_o=(d,r)=>!ks(d,r),po={attribute:!0,type:String,converter:Ni,reflect:!1,useDefault:!1,hasChanged:_o};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Et.litPropertyMetadata??(Et.litPropertyMetadata=new WeakMap);var kt=class extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??(this.l=[])).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,l=po){if(l.state&&(l.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((l=Object.create(l)).wrapped=!0),this.elementProperties.set(r,l),!l.noAccessor){let o=Symbol(),a=this.getPropertyDescriptor(r,o,l);a!==void 0&&Ss(this.prototype,r,a)}}static getPropertyDescriptor(r,l,o){let{get:a,set:u}=Ts(this.prototype,r)??{get(){return this[l]},set(c){this[l]=c}};return{get:a,set(c){let _=a?.call(this);u?.call(this,c),this.requestUpdate(r,_,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??po}static _$Ei(){if(this.hasOwnProperty(me("elementProperties")))return;let r=zs(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(me("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(me("properties"))){let l=this.properties,o=[...Ms(l),...Es(l)];for(let a of o)this.createProperty(a,l[a])}let r=this[Symbol.metadata];if(r!==null){let l=litPropertyMetadata.get(r);if(l!==void 0)for(let[o,a]of l)this.elementProperties.set(o,a)}this._$Eh=new Map;for(let[l,o]of this.elementProperties){let a=this._$Eu(l,o);a!==void 0&&this._$Eh.set(a,l)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){let l=[];if(Array.isArray(r)){let o=new Set(r.flat(1/0).reverse());for(let a of o)l.unshift(Bi(a))}else r!==void 0&&l.push(Bi(r));return l}static _$Eu(r,l){let o=l.attribute;return o===!1?void 0:typeof o=="string"?o:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(r=>r(this))}addController(r){(this._$EO??(this._$EO=new Set)).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.()}removeController(r){this._$EO?.delete(r)}_$E_(){let r=new Map,l=this.constructor.elementProperties;for(let o of l.keys())this.hasOwnProperty(o)&&(r.set(o,this[o]),delete this[o]);r.size>0&&(this._$Ep=r)}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return co(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(r=>r.hostConnected?.())}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach(r=>r.hostDisconnected?.())}attributeChangedCallback(r,l,o){this._$AK(r,o)}_$ET(r,l){let o=this.constructor.elementProperties.get(r),a=this.constructor._$Eu(r,o);if(a!==void 0&&o.reflect===!0){let u=(o.converter?.toAttribute!==void 0?o.converter:Ni).toAttribute(l,o.type);this._$Em=r,u==null?this.removeAttribute(a):this.setAttribute(a,u),this._$Em=null}}_$AK(r,l){let o=this.constructor,a=o._$Eh.get(r);if(a!==void 0&&this._$Em!==a){let u=o.getPropertyOptions(a),c=typeof u.converter=="function"?{fromAttribute:u.converter}:u.converter?.fromAttribute!==void 0?u.converter:Ni;this._$Em=a;let _=c.fromAttribute(l,u.type);this[a]=_??this._$Ej?.get(a)??_,this._$Em=null}}requestUpdate(r,l,o,a=!1,u){if(r!==void 0){let c=this.constructor;if(a===!1&&(u=this[r]),o??(o=c.getPropertyOptions(r)),!((o.hasChanged??_o)(u,l)||o.useDefault&&o.reflect&&u===this._$Ej?.get(r)&&!this.hasAttribute(c._$Eu(r,o))))return;this.C(r,l,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,l,{useDefault:o,reflect:a,wrapped:u},c){o&&!(this._$Ej??(this._$Ej=new Map)).has(r)&&(this._$Ej.set(r,c??l??this[r]),u!==!0||c!==void 0)||(this._$AL.has(r)||(this.hasUpdated||o||(l=void 0),this._$AL.set(r,l)),a===!0&&this._$Em!==r&&(this._$Eq??(this._$Eq=new Set)).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(l){Promise.reject(l)}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[a,u]of this._$Ep)this[a]=u;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[a,u]of o){let{wrapped:c}=u,_=this[a];c!==!0||this._$AL.has(a)||_===void 0||this.C(a,void 0,u,_)}}let r=!1,l=this._$AL;try{r=this.shouldUpdate(l),r?(this.willUpdate(l),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(l)):this._$EM()}catch(o){throw r=!1,this._$EM(),o}r&&this._$AE(l)}willUpdate(r){}_$AE(r){this._$EO?.forEach(l=>l.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&(this._$Eq=this._$Eq.forEach(l=>this._$ET(l,this[l]))),this._$EM()}updated(r){}firstUpdated(r){}};kt.elementStyles=[],kt.shadowRootOptions={mode:"open"},kt[me("elementProperties")]=new Map,kt[me("finalized")]=new Map,Os?.({ReactiveElement:kt}),(Et.reactiveElementVersions??(Et.reactiveElementVersions=[])).push("2.1.2");var ve=globalThis,mo=d=>d,Ye=ve.trustedTypes,go=Ye?Ye.createPolicy("lit-html",{createHTML:d=>d}):void 0,Lo="$lit$",zt=`lit$${Math.random().toFixed(9).slice(2)}$`,Po="?"+zt,Is=`<${Po}>`,Dt=document,ye=()=>Dt.createComment(""),xe=d=>d===null||typeof d!="object"&&typeof d!="function",Wi=Array.isArray,$s=d=>Wi(d)||typeof d?.[Symbol.iterator]=="function",Di=`[ 	
\f\r]`,ge=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,vo=/-->/g,yo=/>/g,Bt=RegExp(`>|${Di}(?:([^\\s"'>=/]+)(${Di}*=${Di}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xo=/'/g,bo=/"/g,Co=/^(?:script|style|textarea|title)$/i,qi=d=>(r,...l)=>({_$litType$:d,strings:r,values:l}),$=qi(1),Ys=qi(2),Js=qi(3),Rt=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),wo=new WeakMap,Nt=Dt.createTreeWalker(Dt,129);function ko(d,r){if(!Wi(d)||!d.hasOwnProperty("raw"))throw Error("invalid template strings array");return go!==void 0?go.createHTML(r):r}var Zs=(d,r)=>{let l=d.length-1,o=[],a,u=r===2?"<svg>":r===3?"<math>":"",c=ge;for(let _=0;_<l;_++){let g=d[_],p,x,y=-1,P=0;for(;P<g.length&&(c.lastIndex=P,x=c.exec(g),x!==null);)P=c.lastIndex,c===ge?x[1]==="!--"?c=vo:x[1]!==void 0?c=yo:x[2]!==void 0?(Co.test(x[2])&&(a=RegExp("</"+x[2],"g")),c=Bt):x[3]!==void 0&&(c=Bt):c===Bt?x[0]===">"?(c=a??ge,y=-1):x[1]===void 0?y=-2:(y=c.lastIndex-x[2].length,p=x[1],c=x[3]===void 0?Bt:x[3]==='"'?bo:xo):c===bo||c===xo?c=Bt:c===vo||c===yo?c=ge:(c=Bt,a=void 0);let w=c===Bt&&d[_+1].startsWith("/>")?" ":"";u+=c===ge?g+Is:y>=0?(o.push(p),g.slice(0,y)+Lo+g.slice(y)+zt+w):g+zt+(y===-2?_:w)}return[ko(d,u+(d[l]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),o]},be=class d{constructor({strings:r,_$litType$:l},o){let a;this.parts=[];let u=0,c=0,_=r.length-1,g=this.parts,[p,x]=Zs(r,l);if(this.el=d.createElement(p,o),Nt.currentNode=this.el.content,l===2||l===3){let y=this.el.content.firstChild;y.replaceWith(...y.childNodes)}for(;(a=Nt.nextNode())!==null&&g.length<_;){if(a.nodeType===1){if(a.hasAttributes())for(let y of a.getAttributeNames())if(y.endsWith(Lo)){let P=x[c++],w=a.getAttribute(y).split(zt),D=/([.?@])?(.*)/.exec(P);g.push({type:1,index:u,name:D[2],strings:w,ctor:D[1]==="."?Fi:D[1]==="?"?Hi:D[1]==="@"?Ui:Xt}),a.removeAttribute(y)}else y.startsWith(zt)&&(g.push({type:6,index:u}),a.removeAttribute(y));if(Co.test(a.tagName)){let y=a.textContent.split(zt),P=y.length-1;if(P>0){a.textContent=Ye?Ye.emptyScript:"";for(let w=0;w<P;w++)a.append(y[w],ye()),Nt.nextNode(),g.push({type:2,index:++u});a.append(y[P],ye())}}}else if(a.nodeType===8)if(a.data===Po)g.push({type:2,index:u});else{let y=-1;for(;(y=a.data.indexOf(zt,y+1))!==-1;)g.push({type:7,index:u}),y+=zt.length-1}u++}}static createElement(r,l){let o=Dt.createElement("template");return o.innerHTML=r,o}};function Jt(d,r,l=d,o){if(r===Rt)return r;let a=o!==void 0?l._$Co?.[o]:l._$Cl,u=xe(r)?void 0:r._$litDirective$;return a?.constructor!==u&&(a?._$AO?.(!1),u===void 0?a=void 0:(a=new u(d),a._$AT(d,l,o)),o!==void 0?(l._$Co??(l._$Co=[]))[o]=a:l._$Cl=a),a!==void 0&&(r=Jt(d,a._$AS(d,r.values),a,o)),r}var Ri=class{constructor(r,l){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=l}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:l},parts:o}=this._$AD,a=(r?.creationScope??Dt).importNode(l,!0);Nt.currentNode=a;let u=Nt.nextNode(),c=0,_=0,g=o[0];for(;g!==void 0;){if(c===g.index){let p;g.type===2?p=new we(u,u.nextSibling,this,r):g.type===1?p=new g.ctor(u,g.name,g.strings,this,r):g.type===6&&(p=new Gi(u,this,r)),this._$AV.push(p),g=o[++_]}c!==g?.index&&(u=Nt.nextNode(),c++)}return Nt.currentNode=Dt,a}p(r){let l=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(r,o,l),l+=o.strings.length-2):o._$AI(r[l])),l++}},we=class d{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,l,o,a){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=r,this._$AB=l,this._$AM=o,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let r=this._$AA.parentNode,l=this._$AM;return l!==void 0&&r?.nodeType===11&&(r=l.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,l=this){r=Jt(this,r,l),xe(r)?r===I||r==null||r===""?(this._$AH!==I&&this._$AR(),this._$AH=I):r!==this._$AH&&r!==Rt&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):$s(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==I&&xe(this._$AH)?this._$AA.nextSibling.data=r:this.T(Dt.createTextNode(r)),this._$AH=r}$(r){let{values:l,_$litType$:o}=r,a=typeof o=="number"?this._$AC(r):(o.el===void 0&&(o.el=be.createElement(ko(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===a)this._$AH.p(l);else{let u=new Ri(a,this),c=u.u(this.options);u.p(l),this.T(c),this._$AH=u}}_$AC(r){let l=wo.get(r.strings);return l===void 0&&wo.set(r.strings,l=new be(r)),l}k(r){Wi(this._$AH)||(this._$AH=[],this._$AR());let l=this._$AH,o,a=0;for(let u of r)a===l.length?l.push(o=new d(this.O(ye()),this.O(ye()),this,this.options)):o=l[a],o._$AI(u),a++;a<l.length&&(this._$AR(o&&o._$AB.nextSibling,a),l.length=a)}_$AR(r=this._$AA.nextSibling,l){for(this._$AP?.(!1,!0,l);r!==this._$AB;){let o=mo(r).nextSibling;mo(r).remove(),r=o}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r))}},Xt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,l,o,a,u){this.type=1,this._$AH=I,this._$AN=void 0,this.element=r,this.name=l,this._$AM=a,this.options=u,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=I}_$AI(r,l=this,o,a){let u=this.strings,c=!1;if(u===void 0)r=Jt(this,r,l,0),c=!xe(r)||r!==this._$AH&&r!==Rt,c&&(this._$AH=r);else{let _=r,g,p;for(r=u[0],g=0;g<u.length-1;g++)p=Jt(this,_[o+g],l,g),p===Rt&&(p=this._$AH[g]),c||(c=!xe(p)||p!==this._$AH[g]),p===I?r=I:r!==I&&(r+=(p??"")+u[g+1]),this._$AH[g]=p}c&&!a&&this.j(r)}j(r){r===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}},Fi=class extends Xt{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===I?void 0:r}},Hi=class extends Xt{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==I)}},Ui=class extends Xt{constructor(r,l,o,a,u){super(r,l,o,a,u),this.type=5}_$AI(r,l=this){if((r=Jt(this,r,l,0)??I)===Rt)return;let o=this._$AH,a=r===I&&o!==I||r.capture!==o.capture||r.once!==o.once||r.passive!==o.passive,u=r!==I&&(o===I||a);a&&this.element.removeEventListener(this.name,this,o),u&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r)}},Gi=class{constructor(r,l,o){this.element=r,this.type=6,this._$AN=void 0,this._$AM=l,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(r){Jt(this,r)}};var Bs=ve.litHtmlPolyfillSupport;Bs?.(be,we),(ve.litHtmlVersions??(ve.litHtmlVersions=[])).push("3.3.3");var So=(d,r,l)=>{let o=l?.renderBefore??r,a=o._$litPart$;if(a===void 0){let u=l?.renderBefore??null;o._$litPart$=a=new we(r.insertBefore(ye(),u),u,void 0,l??{})}return a._$AI(d),a};var Le=globalThis,Q=class extends kt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var l;let r=super.createRenderRoot();return(l=this.renderOptions).renderBefore??(l.renderBefore=r.firstChild),r}update(r){let l=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=So(l,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Rt}};Q._$litElement$=!0,Q.finalized=!0,Le.litElementHydrateSupport?.({LitElement:Q});var Ns=Le.litElementPolyfillSupport;Ns?.({LitElement:Q});(Le.litElementVersions??(Le.litElementVersions=[])).push("4.2.2");var Y=ho(Mo(),1),pa=ho(zo(),1);var Ao=`/* required styles */\r
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
`;var Oo=`.leaflet-cluster-anim .leaflet-marker-icon, .leaflet-cluster-anim .leaflet-marker-shadow {
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
`;var Io=`.marker-cluster-small {
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
	}`;var Pe=class extends Q{constructor(){super(),this.events=[],this.radiusKm=10,this.radiusEnabled=!1,this.zones=[],this.capture=null,this.dark=!1,this._markersById=new Map,this._didInitialFit=!1,this._zonesSignature=""}render(){return $`<div id="map"></div>`}firstUpdated(){let r=this.center?[this.center.lat,this.center.lon]:[52.52,13.405];this._map=Y.default.map(this.renderRoot.getElementById("map"),{center:r,zoom:12,zoomControl:!0}),Y.default.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(this._map),this._zoneLayer=Y.default.layerGroup().addTo(this._map),this._shapeLayer=Y.default.featureGroup().addTo(this._map),this._clusterGroup=Y.default.markerClusterGroup({maxClusterRadius:40,showCoverageOnHover:!1}).addTo(this._map),this._radiusLayer=Y.default.layerGroup().addTo(this._map),this._captureLayer=Y.default.layerGroup().addTo(this._map),this._map.on("click",l=>{this.dispatchEvent(new CustomEvent("map-click",{detail:{lat:l.latlng.lat,lon:l.latlng.lng}}))}),this._resizeObserver=new ResizeObserver(()=>this._map.invalidateSize()),this._resizeObserver.observe(this),this._renderEvents(),this._renderRadius(),this._renderZones()}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),this._map?.remove(),this._map=void 0}updated(r){this._map&&(r.has("events")&&this._renderEvents(),(r.has("center")||r.has("radiusKm")||r.has("radiusEnabled"))&&this._renderRadius(),r.has("zones")&&this._renderZones(),r.has("capture")&&this._renderCapture(),r.has("selectedId")&&this.selectedId&&this._focusEvent(this.selectedId))}_accentColor(){return getComputedStyle(this).getPropertyValue("--primary-color").trim()||"#03a9f4"}_renderEvents(){this._clusterGroup.clearLayers(),this._shapeLayer.clearLayers(),this._markersById.clear();let r=this._accentColor();for(let l of this.events||[]){let o=null,a=!1;if(l.geometry)try{o=Y.default.geoJSON(JSON.parse(l.geometry),{style:this._shapeStyle(r,l),pointToLayer:(u,c)=>Y.default.circleMarker(c,this._markerStyle(r,l))})}catch(u){console.warn("chronotope: invalid geometry for event",l.id,u)}!o&&l.lat!=null&&l.lon!=null&&(o=Y.default.circleMarker([l.lat,l.lon],this._markerStyle(r,l)),a=!0),o&&(o.bindPopup(this._popupHtml(l)),o.on("click",()=>{this.dispatchEvent(new CustomEvent("event-selected",{detail:{id:l.id}}))}),(a?this._clusterGroup:this._shapeLayer).addLayer(o),this._markersById.set(l.id,{layer:o,clustered:a}))}if(!this._didInitialFit&&this._markersById.size>0){this._didInitialFit=!0;let l=this._clusterGroup.getBounds().extend(this._shapeLayer.getBounds());l.isValid()&&this._map.fitBounds(l.pad(.2),{maxZoom:14})}}_markerStyle(r,l){return{radius:9,color:r,weight:2,fillColor:r,fillOpacity:l?.favorite?.75:.35,dashArray:l?.time_precision==="approximate"?"3 4":null}}_shapeStyle(r,l){return{color:r,weight:3,fillOpacity:.2,dashArray:l?.time_precision==="approximate"?"6 6":null}}_popupHtml(r){let l=document.createElement("div"),o=document.createElement("div");o.className="popup-title",o.textContent=`${r.favorite?"\u2605 ":""}${r.title}`;let a=document.createElement("div");a.className="popup-meta";let u=r.occurrences?.[0]?.[0]??r.start_time,c=r.time_precision==="approximate"&&r.schedule_text?`~ ${r.schedule_text}`:new Date(u).toLocaleString();if(a.textContent=`${r.category||""} ${c}`.trim(),l.append(o,a),r.address){let _=document.createElement("div");_.className="popup-meta",_.textContent=r.address,l.append(_)}if(r.lat!=null&&r.lon!=null){let _=document.createElement("div");_.className="popup-meta";let g=document.createElement("a");g.href=`https://www.openstreetmap.org/directions?to=${r.lat}%2C${r.lon}`,g.target="_blank",g.rel="noopener noreferrer",g.textContent="\u{1F9ED} Route (OSM)",_.append(g),l.append(_)}return l}_renderRadius(){if(this._radiusLayer.clearLayers(),!this.radiusEnabled||!this.center)return;let r=this._accentColor();Y.default.circle([this.center.lat,this.center.lon],{radius:this.radiusKm*1e3,color:r,weight:1.5,dashArray:"6 6",fillOpacity:.05}).addTo(this._radiusLayer),Y.default.circleMarker([this.center.lat,this.center.lon],{radius:4,color:r,fillColor:r,fillOpacity:1}).addTo(this._radiusLayer)}_renderZones(){if(!this._map)return;let r=JSON.stringify(this.zones||[]);if(r===this._zonesSignature)return;this._zonesSignature=r,this._zoneLayer.clearLayers();let l=getComputedStyle(this).getPropertyValue("--accent-color").trim()||"#ff9800";for(let o of this.zones||[])Y.default.circle([o.lat,o.lon],{radius:o.radius,color:l,weight:1.5,dashArray:o.passive?"2 6":"4 4",fillColor:l,fillOpacity:.06}).bindTooltip(o.name).addTo(this._zoneLayer),o.home&&Y.default.marker([o.lat,o.lon],{icon:Y.default.divIcon({className:"zone-home-icon",html:"\u{1F3E0}",iconSize:[24,24],iconAnchor:[12,12]}),interactive:!1,keyboard:!1}).addTo(this._zoneLayer)}_renderCapture(){if(this._captureLayer.clearLayers(),this.capture?.mode)this.setAttribute("data-capturing","");else{this.removeAttribute("data-capturing");return}let r=this._accentColor(),l=this.capture.points||[];for(let[o,a]of l)Y.default.circleMarker([o,a],{radius:5,color:r,fillColor:r,fillOpacity:.9}).addTo(this._captureLayer);if(l.length>=2){let o=l.map(([a,u])=>[a,u]);this.capture.mode==="polygon"&&l.length>=3?Y.default.polygon(o,{color:r,weight:2,dashArray:"4 4",fillOpacity:.1}).addTo(this._captureLayer):Y.default.polyline(o,{color:r,weight:2,dashArray:"4 4"}).addTo(this._captureLayer)}}_focusEvent(r){let l=this._markersById.get(r);if(!l)return;let{layer:o,clustered:a}=l;a&&o.getLatLng?this._clusterGroup.zoomToShowLayer(o,()=>o.openPopup()):o.getBounds?(this._map.fitBounds(o.getBounds().pad(.3),{maxZoom:15}),o.openPopup()):o.getLatLng&&(this._map.panTo(o.getLatLng()),o.openPopup())}};et(Pe,"properties",{events:{attribute:!1},center:{attribute:!1},radiusKm:{attribute:!1},radiusEnabled:{attribute:!1},zones:{attribute:!1},capture:{attribute:!1},selectedId:{attribute:!1},dark:{type:Boolean,reflect:!0}}),et(Pe,"styles",[st`
      ${Yt(Ao)}
    `,st`
      ${Yt(Oo)}
    `,st`
      ${Yt(Io)}
    `,st`
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
        font-size: 18px;
        line-height: 24px;
        text-align: center;
      }
      :host([data-capturing]) #map {
        cursor: crosshair;
      }
    `]);customElements.define("chronotope-map-view",Pe);var Hs=["Mo","Di","Mi","Do","Fr","Sa","So"],Ce=class extends Q{constructor(){super(),this.profiles=[],this.selectedProfileId="",this._profileName=""}updated(r){if(r.has("selectedProfileId")){let l=(this.profiles||[]).find(o=>o.id===this.selectedProfileId);this._profileName=l?l.name:""}}render(){let r=this.state;return $`
      <div class="groups">
        <div class="group">
          <span class="label">Profil</span>
          <div class="row">
            <select
              .value=${this.selectedProfileId||""}
              @change=${l=>this.dispatchEvent(new CustomEvent("profile-selected",{detail:{id:l.target.value}}))}
            >
              <option value="">— kein Profil —</option>
              ${(this.profiles||[]).map(l=>$`
                  <option value=${l.id} ?selected=${l.id===this.selectedProfileId}>
                    ${l.name}
                  </option>
                `)}
            </select>
            <input
              type="text"
              placeholder="Profilname"
              .value=${this._profileName}
              @input=${l=>this._profileName=l.target.value}
            />
            <button
              class="ics-button"
              title="Aktuelle Filter unter diesem Namen speichern"
              @click=${this._saveProfile}
            >
              Speichern
            </button>
            ${this.selectedProfileId?$`<button
                  class="ics-button"
                  title="Ausgewähltes Profil löschen"
                  @click=${()=>this.dispatchEvent(new CustomEvent("profile-delete",{detail:{id:this.selectedProfileId}}))}
                >
                  Löschen
                </button>`:I}
          </div>
        </div>

        <div class="group">
          <span class="label">Suche</span>
          <div class="row">
            <input
              type="text"
              placeholder="Titel, Beschreibung, Adresse…"
              .value=${r.text||""}
              @input=${l=>this._patch({text:l.target.value})}
            />
            <label class="row" style="gap:4px">
              <input
                type="checkbox"
                .checked=${r.favoritesOnly}
                @change=${l=>this._patch({favoritesOnly:l.target.checked})}
              />
              nur ★
            </label>
          </div>
        </div>

        <div class="group">
          <span class="label">Kategorie</span>
          <div class="chips">
            ${(this.categories||[]).length===0?$`<span class="hint">Noch keine Kategorien</span>`:(this.categories||[]).map(l=>$`
                    <button
                      class="chip"
                      aria-pressed=${r.categories.includes(l)?"true":"false"}
                      @click=${()=>this._toggleCategory(l)}
                    >
                      ${l}
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
              .checked=${r.radiusEnabled}
              @change=${l=>this._patch({radiusEnabled:l.target.checked})}
            />
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              .value=${String(r.radiusKm)}
              ?disabled=${!r.radiusEnabled}
              @input=${l=>this._patch({radiusKm:Number(l.target.value)})}
            />
            <span>${r.radiusKm} km</span>
          </div>
          <span class="hint">Klick auf die Karte setzt das Zentrum</span>
        </div>

        <div class="group">
          <span class="label">Zeitfenster</span>
          <div class="row">
            <input
              type="datetime-local"
              .value=${r.start}
              @change=${l=>this._patch({start:l.target.value,dayFilter:""})}
            />
            <span>–</span>
            <input
              type="datetime-local"
              .value=${r.end}
              @change=${l=>this._patch({end:l.target.value,dayFilter:""})}
            />
          </div>
          ${this._renderDaySlider(r)}
        </div>

        <div class="group">
          <span class="label">Wochentage</span>
          <div class="chips">
            ${Hs.map((l,o)=>$`
                <button
                  class="chip"
                  aria-pressed=${r.weekdays.includes(o)?"true":"false"}
                  @click=${()=>this._toggleWeekday(o)}
                >
                  ${l}
                </button>
              `)}
          </div>
          <div class="row">
            <select
              .value=${r.timeMode}
              @change=${l=>this._patch({timeMode:l.target.value})}
            >
              <option value="allday">Ganztags</option>
              <option value="range">Nach Uhrzeit</option>
            </select>
            ${r.timeMode==="range"?$`
                  <input
                    type="time"
                    .value=${r.timeFrom}
                    @change=${l=>this._patch({timeFrom:l.target.value})}
                  />
                  <span>–</span>
                  <input
                    type="time"
                    .value=${r.timeTo}
                    @change=${l=>this._patch({timeTo:l.target.value})}
                  />
                `:I}
          </div>
        </div>

        <div class="group">
          <span class="label">Karte</span>
          <label class="row">
            <input
              type="checkbox"
              .checked=${r.showZones}
              @change=${l=>this._patch({showZones:l.target.checked})}
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
          ${this._renderStats()}
        </div>
      </div>
    `}_renderStats(){let r=this.stats;return r?$`
      <details class="stats" @toggle=${l=>{l.target.open&&this.dispatchEvent(new CustomEvent("stats-requested"))}}>
        <summary>Statistik (${r.total_events} Events)</summary>
        <table>
          <tr><td>Orte im Cache</td><td>${r.places}</td></tr>
          <tr><td>Profile</td><td>${r.profiles}</td></tr>
          ${(r.sources||[]).map(l=>$`
              <tr>
                <td>${l.source}</td>
                <td>
                  ${l.events} Events${l.last_scraped?$`, zuletzt ${new Date(l.last_scraped).toLocaleDateString()}`:I}
                </td>
              </tr>
            `)}
        </table>
      </details>
    `:I}_patch(r){this.dispatchEvent(new CustomEvent("filters-changed",{detail:r}))}_renderDaySlider(r){if(!r.start||!r.end)return I;let l=new Date(r.start);l.setHours(0,0,0,0);let o=new Date(r.end),a=Math.min(Math.ceil((o-l)/864e5),60);if(a<2)return I;let u=p=>{if(!p)return 0;let x=new Date(`${p}T00:00:00`);return Math.round((x-l)/864e5)+1},c=p=>{if(!p)return"";let x=new Date(l.getTime()+(p-1)*864e5),y=P=>String(P).padStart(2,"0");return`${x.getFullYear()}-${y(x.getMonth()+1)}-${y(x.getDate())}`},_=u(r.dayFilter),g=r.dayFilter?new Date(`${r.dayFilter}T00:00:00`).toLocaleDateString(void 0,{weekday:"short",day:"2-digit",month:"2-digit"}):"Alle Tage";return $`
      <div class="row">
        <input
          type="range"
          min="0"
          max=${String(a)}
          step="1"
          .value=${String(_)}
          @input=${p=>this._patch({dayFilter:c(Number(p.target.value))})}
        />
        <span>${g}</span>
      </div>
    `}_saveProfile(){let r=(this._profileName||"").trim();if(!r)return;let l=(this.profiles||[]).find(o=>o.id===this.selectedProfileId);this.dispatchEvent(new CustomEvent("profile-save",{detail:{name:r,id:l&&l.name===r?l.id:void 0}}))}_toggleCategory(r){let l=this.state.categories.includes(r)?this.state.categories.filter(o=>o!==r):[...this.state.categories,r];this._patch({categories:l})}_toggleWeekday(r){let l=this.state.weekdays.includes(r)?this.state.weekdays.filter(o=>o!==r):[...this.state.weekdays,r];this._patch({weekdays:l})}};et(Ce,"properties",{state:{attribute:!1},categories:{attribute:!1},icsCopied:{attribute:!1},profiles:{attribute:!1},selectedProfileId:{attribute:!1},stats:{attribute:!1},_profileName:{state:!0}}),et(Ce,"styles",st`
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
  `);customElements.define("chronotope-filter-bar",Ce);var ke=class extends Q{render(){let r=this.events||[];return r.length===0?$`<div class="empty">Keine Events für die aktuellen Filter.</div>`:$`${r.map(l=>this._renderItem(l))}`}_renderItem(r){let l=r.occurrences?.[0]?.[0]??r.start_time,o=r.occurrences?.[0]?.[1]??r.end_time;return $`
      <button
        class="item"
        aria-current=${r.id===this.selectedId?"true":"false"}
        @click=${()=>this.dispatchEvent(new CustomEvent("event-selected",{detail:{id:r.id}}))}
      >
        <div class="title-row">
          <span class="title">${r.title}</span>
          <span>
            ${r.distance_km!=null?$`<span class="distance">${this._formatDistance(r.distance_km)}</span>`:I}
            <button
              class="icon-btn ${r.favorite?"starred":""}"
              title=${r.favorite?"Favorit entfernen":"Als Favorit markieren"}
              @click=${a=>this._flag(a,r,{favorite:!r.favorite})}
            >
              ${r.favorite?"\u2605":"\u2606"}
            </button>
            <button
              class="icon-btn"
              title="Event bearbeiten"
              @click=${a=>{a.stopPropagation(),this.dispatchEvent(new CustomEvent("event-edit",{detail:{id:r.id}}))}}
            >
              ✏️
            </button>
            <button
              class="icon-btn"
              title="Event ausblenden"
              @click=${a=>this._flag(a,r,{hidden:!0})}
            >
              🙈
            </button>
          </span>
        </div>
        <div class="meta">
          ${this._renderWhen(r,l,o)}
          ${r.recurrence?$`<span title=${r.recurrence}>🔁</span>`:I}
          ${r.category?$`<span class="badge">${r.category}</span>`:I}
          ${r.confidence?$`<span class="badge confidence-${r.confidence}">${r.confidence}</span>`:I}
          ${r.source_url?$`<span class="source">
                <a href=${r.source_url} target="_blank" rel="noopener noreferrer"
                  @click=${a=>a.stopPropagation()}
                  >${r.source_name||"Quelle"}</a
                >
              </span>`:I}
          ${r.visits?.length?$`<span
                class="visited"
                title=${r.visits.map(a=>`${a.person_id} (${new Date(a.last_seen).toLocaleDateString()})`).join(", ")}
                >✓ besucht</span
              >`:I}
        </div>
        ${r.address?$`<div class="address">${r.address}</div>`:I}
      </button>
    `}_flag(r,l,o){r.stopPropagation(),this.dispatchEvent(new CustomEvent("event-flag",{detail:{id:l.id,...o}}))}_renderWhen(r,l,o){if(r.time_precision==="approximate"){let a=r.schedule_text||this._formatRange(l,o);return $`<span class="fuzzy" title="Unpräzise Zeitangabe">~ ${a}</span>`}return $`<span>${this._formatRange(l,o)}</span>`}_formatDistance(r){return`${(r<10?r.toFixed(1):Math.round(r).toString()).replace(".",",")} km`}_formatRange(r,l){let o=this.locale||void 0,a=new Date(r),u=new Date(l),c=new Intl.DateTimeFormat(o,{weekday:"short",day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}),_=new Intl.DateTimeFormat(o,{hour:"2-digit",minute:"2-digit"});return a.toDateString()===u.toDateString()?`${c.format(a)} \u2013 ${_.format(u)}`:`${c.format(a)} \u2013 ${c.format(u)}`}};et(ke,"properties",{events:{attribute:!1},selectedId:{attribute:!1},locale:{attribute:!1}}),et(ke,"styles",st`
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
    .icon-btn.starred {
      color: var(--warning-color, #ff9800);
    }
    .visited {
      color: var(--success-color, #4caf50);
    }
  `);customElements.define("chronotope-event-list",ke);function $o(d){if(!d)return"";let r=new Date(d);if(Number.isNaN(r.getTime()))return"";let l=o=>String(o).padStart(2,"0");return`${r.getFullYear()}-${l(r.getMonth()+1)}-${l(r.getDate())}T${l(r.getHours())}:${l(r.getMinutes())}`}var Se=class extends Q{willUpdate(r){if(r.has("event")){let l=this.event||{};this._draft={id:l.id,title:l.title||"",category:l.category||"",start:$o(l.start_time),end:$o(l.end_time),address:l.address||"",lat:l.lat??"",lon:l.lon??"",recurrence:l.recurrence||"",time_precision:l.time_precision||"exact",schedule_text:l.schedule_text||"",source_name:l.source_name||"",source_url:l.source_url||"",raw_description:l.raw_description||"",geometry:l.geometry||"",favorite:!!l.favorite},this._error=null}}setCoords(r,l){this._draft={...this._draft,lat:Number(r.toFixed(6)),lon:Number(l.toFixed(6))}}setGeometry(r){this._draft={...this._draft,geometry:JSON.stringify(r)}}render(){let r=this._draft||{};return $`
      <form @submit=${this._save}>
        <h2>${r.id?"Event bearbeiten":"Neues Event"}</h2>
        ${this._error?$`<div class="error">${this._error}</div>`:I}
        <label>
          Titel*
          <input required .value=${r.title} @input=${this._set("title")} />
        </label>
        <label>
          Kategorie
          <input list="categories" .value=${r.category} @input=${this._set("category")} />
          <datalist id="categories">
            ${(this.categories||[]).map(l=>$`<option value=${l}></option>`)}
          </datalist>
        </label>
        <div class="row">
          <label>
            Beginn*
            <input type="datetime-local" required .value=${r.start} @input=${this._set("start")} />
          </label>
          <label>
            Ende*
            <input type="datetime-local" required .value=${r.end} @input=${this._set("end")} />
          </label>
        </div>
        <label>
          Adresse
          <input
            .value=${r.address}
            placeholder="füllt Koordinaten aus dem Cache"
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
            📍 Punkt per Kartenklick
          </button>
        </div>
        <label>
          Wiederholung (RRULE)
          <input
            .value=${r.recurrence}
            placeholder="FREQ=WEEKLY;BYDAY=SA"
            @input=${this._set("recurrence")}
          />
        </label>
        <div class="row">
          <label>
            Zeit-Präzision
            <select .value=${r.time_precision} @change=${this._set("time_precision")}>
              <option value="exact">exakt</option>
              <option value="approximate">ungefähr</option>
            </select>
          </label>
          <label>
            Zeitangabe (Wortlaut)
            <input
              .value=${r.schedule_text}
              placeholder="mittwochs 18 Uhr, ca. 2x im Monat"
              @input=${this._set("schedule_text")}
            />
          </label>
        </div>
        <label>
          Geometrie (GeoJSON, optional)
          <textarea .value=${r.geometry} @input=${this._set("geometry")}></textarea>
        </label>
        <div class="buttons">
          <button
            type="button"
            aria-pressed=${this.captureMode==="line"?"true":"false"}
            @click=${()=>this._requestCapture("line")}
          >
            ➰ Linie zeichnen
          </button>
          <button
            type="button"
            aria-pressed=${this.captureMode==="polygon"?"true":"false"}
            @click=${()=>this._requestCapture("polygon")}
          >
            ⬠ Fläche zeichnen
          </button>
          ${this.captureMode==="line"||this.captureMode==="polygon"?$`<button type="button" class="primary" @click=${this._finishCapture}>
                ✓ Zeichnung übernehmen
              </button>`:I}
        </div>
        ${this.captureMode?$`<div class="hint">
              Klicke auf die Karte, um ${this.captureMode==="point"?"den Punkt zu setzen":"Punkte hinzuzuf\xFCgen"}.
            </div>`:I}
        <div class="row">
          <label>
            Quelle
            <input .value=${r.source_name} @input=${this._set("source_name")} />
          </label>
          <label>
            Quell-URL
            <input .value=${r.source_url} @input=${this._set("source_url")} />
          </label>
        </div>
        <label>
          Beschreibung
          <textarea .value=${r.raw_description} @input=${this._set("raw_description")}></textarea>
        </label>
        <label style="flex-direction: row; align-items: center; gap: 8px;">
          <input
            type="checkbox"
            .checked=${r.favorite}
            @change=${l=>this._draft={...this._draft,favorite:l.target.checked}}
          />
          Favorit ★
        </label>
        <div class="buttons">
          <button type="submit" class="primary">Speichern</button>
          <button type="button" @click=${()=>this.dispatchEvent(new CustomEvent("editor-cancel"))}>
            Abbrechen
          </button>
          ${r.id?$`<button
                type="button"
                class="danger"
                @click=${()=>this.dispatchEvent(new CustomEvent("editor-delete",{detail:{id:r.id}}))}
              >
                Löschen
              </button>`:I}
        </div>
      </form>
    `}_set(r){return l=>{this._draft={...this._draft,[r]:l.target.value}}}_requestCapture(r){let l=this.captureMode===r?null:r;this.dispatchEvent(new CustomEvent("capture-request",{detail:{mode:l}}))}_finishCapture(){this.dispatchEvent(new CustomEvent("capture-finish"))}_save(r){r.preventDefault();let l=this._draft;if(!l.start||!l.end){this._error="Beginn und Ende sind Pflichtfelder.";return}let o=null;if(l.geometry&&l.geometry.trim())try{o=JSON.parse(l.geometry)}catch{this._error="Geometrie ist kein g\xFCltiges JSON.";return}let a=l.lat!==""&&l.lat!=null,u=l.lon!==""&&l.lon!=null;if(a!==u){this._error="Lat und Lon nur gemeinsam angeben.";return}let c={id:l.id||void 0,title:l.title,category:l.category,start_time:new Date(l.start).toISOString(),end_time:new Date(l.end).toISOString(),address:l.address||null,lat:a?Number(l.lat):null,lon:u?Number(l.lon):null,recurrence:l.recurrence||null,time_precision:l.time_precision,schedule_text:l.schedule_text||null,source_name:l.source_name||null,source_url:l.source_url||null,raw_description:l.raw_description||null,geometry:o,favorite:l.favorite};this.dispatchEvent(new CustomEvent("editor-save",{detail:{event:c}}))}};et(Se,"properties",{event:{attribute:!1},categories:{attribute:!1},captureMode:{attribute:!1},_draft:{state:!0},_error:{state:!0}}),et(Se,"styles",st`
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
  `);customElements.define("chronotope-event-editor",Se);var Zo=(d,r)=>d.callWS({type:"chronotope/events/query",...r}),Bo=d=>d.callWS({type:"chronotope/categories"}),No=(d,r)=>d.callWS({type:"chronotope/ics_url",...r}),Do=(d,r)=>d.callWS({type:"chronotope/events/save",event:r}),Ro=(d,r)=>d.callWS({type:"chronotope/events/delete",event_id:r}),Fo=(d,r,l)=>d.callWS({type:"chronotope/events/flag",event_id:r,...l}),Ho=d=>d.callWS({type:"chronotope/profiles/list"}),Uo=(d,r)=>d.callWS({type:"chronotope/profiles/save",profile:r}),Go=(d,r)=>d.callWS({type:"chronotope/profiles/delete",profile_id:r}),Wo=d=>d.callWS({type:"chronotope/stats"});function Qe(d){let r={};return d.categories.length&&(r.categories=[...d.categories]),d.radiusEnabled&&d.center&&(r.center={lat:d.center.lat,lon:d.center.lon},r.radius_km=d.radiusKm),d.start&&(r.start=new Date(d.start).toISOString()),d.end&&(r.end=new Date(d.end).toISOString()),d.weekdays.length&&(r.weekdays=[...d.weekdays]),d.timeMode==="range"&&(d.timeFrom&&(r.time_from=d.timeFrom),d.timeTo&&(r.time_to=d.timeTo)),d.text&&(r.text=d.text),d.favoritesOnly&&(r.favorites_only=!0),r}var Us=250,Gs=new Set(["showZones","dayFilter"]);function qo(d){if(!d)return"";let r=new Date(d);if(Number.isNaN(r.getTime()))return"";let l=o=>String(o).padStart(2,"0");return`${r.getFullYear()}-${l(r.getMonth()+1)}-${l(r.getDate())}T${l(r.getHours())}:${l(r.getMinutes())}`}var Te=class extends Q{constructor(){super(),this._events=[],this._categories=[],this._selectedId=null,this._icsCopied=!1,this._error=null,this._profiles=[],this._selectedProfileId="",this._editing=null,this._capture=null,this._stats=null,this._filters={categories:[],radiusEnabled:!1,radiusKm:10,center:null,start:"",end:"",weekdays:[],timeMode:"allday",timeFrom:"",timeTo:"",text:"",favoritesOnly:!1,showZones:!0,dayFilter:""},this._initialized=!1}willUpdate(r){r.has("hass")&&this.hass&&!this._initialized&&(this._initialized=!0,this._filters={...this._filters,center:{lat:this.hass.config.latitude,lon:this.hass.config.longitude}},this._loadCategories(),this._loadProfiles(),this._loadStats(),this._runQuery())}async _loadStats(){try{this._stats=await Wo(this.hass)}catch(r){console.error("chronotope: loading stats failed",r)}}get _displayedEvents(){if(!this._filters.dayFilter)return this._events;let r=new Date(`${this._filters.dayFilter}T00:00:00`),l=new Date(r.getTime()+864e5);return this._events.filter(o=>(o.occurrences||[[o.start_time,o.end_time]]).some(([u,c])=>new Date(u)<l&&new Date(c)>r))}render(){let r=!!this.hass?.themes?.darkMode,l=this._displayedEvents;return $`
      <header>
        <h1>Chronotope</h1>
        <span class="count">
          ${l.length} ${l.length===1?"Event":"Events"}
        </span>
        <button class="new-event" @click=${this._onNewEvent}>＋ Neues Event</button>
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
      ></chronotope-filter-bar>
      ${this._error?$`<div class="error">${this._error}</div>`:""}
      <div class="content ${this.narrow?"narrow":""}">
        <chronotope-event-list
          .events=${l}
          .selectedId=${this._selectedId}
          .locale=${this.hass?.locale?.language}
          @event-selected=${this._onEventSelected}
          @event-flag=${this._onEventFlag}
          @event-edit=${this._onEventEdit}
        ></chronotope-event-list>
        <chronotope-map-view
          .events=${l}
          .center=${this._filters.center}
          .radiusKm=${this._filters.radiusKm}
          .radiusEnabled=${this._filters.radiusEnabled}
          .zones=${this._filters.showZones?this._haZones():[]}
          .capture=${this._capture}
          .selectedId=${this._selectedId}
          .dark=${r}
          @map-click=${this._onMapClick}
          @event-selected=${this._onEventSelected}
        ></chronotope-map-view>
        ${this._editing!==null?$`<chronotope-event-editor
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
    `}_haZones(){let r=this.hass?.states||{},l=Object.values(r).filter(o=>o.entity_id.startsWith("zone.")).map(o=>({id:o.entity_id,name:o.attributes.friendly_name||o.entity_id,lat:o.attributes.latitude,lon:o.attributes.longitude,radius:o.attributes.radius??100,passive:!!o.attributes.passive,home:o.entity_id==="zone.home"})).filter(o=>o.lat!=null&&o.lon!=null);return!l.some(o=>o.home)&&this.hass?.config?.latitude!=null&&l.push({id:"home",name:"Zuhause",lat:this.hass.config.latitude,lon:this.hass.config.longitude,radius:100,passive:!1,home:!0}),l}_onFiltersChanged(r){this._filters={...this._filters,...r.detail},this._icsCopied=!1,Object.keys(r.detail).filter(o=>!Gs.has(o)).length&&this._scheduleQuery()}_onMapClick(r){let{lat:l,lon:o}=r.detail;if(this._capture?.mode==="point"){this._editorElement()?.setCoords(l,o),this._capture=null;return}if(this._capture?.mode){this._capture={...this._capture,points:[...this._capture.points,[l,o]]};return}this._filters={...this._filters,center:{lat:l,lon:o}},this._filters.radiusEnabled&&this._scheduleQuery()}_onEventSelected(r){this._selectedId=r.detail.id}_scheduleQuery(){clearTimeout(this._queryTimer),this._queryTimer=setTimeout(()=>this._runQuery(),Us)}async _loadCategories(){try{let r=await Bo(this.hass);this._categories=r.categories}catch(r){console.error("chronotope: loading categories failed",r)}}async _loadProfiles(){try{let r=await Ho(this.hass);this._profiles=r.profiles}catch(r){console.error("chronotope: loading profiles failed",r)}}async _runQuery(){if(this.hass)try{let r=await Zo(this.hass,Qe(this._filters));this._events=r.events,this._error=null,this._selectedId&&!this._events.some(l=>l.id===this._selectedId)&&(this._selectedId=null)}catch(r){this._error=`Abfrage fehlgeschlagen: ${r.message||r.code||r}`}}_onProfileSelected(r){this._selectedProfileId=r.detail.id;let l=this._profiles.find(o=>o.id===r.detail.id);l&&this._applyProfileFilters(l.filters||{})}_applyProfileFilters(r){let l=r.center||this._filters.center;this._filters={...this._filters,categories:r.categories||[],radiusEnabled:!!(r.center&&r.radius_km!=null),radiusKm:r.radius_km!=null?r.radius_km:this._filters.radiusKm,center:l,start:qo(r.start),end:qo(r.end),weekdays:r.weekdays||[],timeMode:r.time_from||r.time_to?"range":"allday",timeFrom:r.time_from||"",timeTo:r.time_to||"",text:r.text||"",favoritesOnly:!!r.favorites_only,dayFilter:""},this._scheduleQuery()}async _onProfileSave(r){try{let l=await Uo(this.hass,{id:r.detail.id,name:r.detail.name,filters:Qe(this._filters)});await this._loadProfiles(),this._selectedProfileId=l.profile.id,this._error=null}catch(l){this._error=`Profil speichern fehlgeschlagen: ${l.message||l.code||l}`}}async _onProfileDelete(r){try{await Go(this.hass,r.detail.id),this._selectedProfileId===r.detail.id&&(this._selectedProfileId=""),await this._loadProfiles()}catch(l){this._error=`Profil l\xF6schen fehlgeschlagen: ${l.message||l.code||l}`}}_editorElement(){return this.renderRoot.querySelector("chronotope-event-editor")}_onNewEvent(){let r=new Date;r.setMinutes(0,0,0);let l=new Date(r.getTime()+2*36e5);this._editing={start_time:r.toISOString(),end_time:l.toISOString()},this._capture=null}_onEventEdit(r){let l=this._events.find(o=>o.id===r.detail.id);l&&(this._editing=l,this._capture=null)}async _onEditorSave(r){try{await Do(this.hass,r.detail.event),this._editing=null,this._capture=null,this._error=null,await this._runQuery(),await this._loadCategories()}catch(l){this._error=`Speichern fehlgeschlagen: ${l.message||l.code||l}`}}async _onEditorDelete(r){try{await Ro(this.hass,r.detail.id),this._editing=null,this._capture=null,await this._runQuery()}catch(l){this._error=`L\xF6schen fehlgeschlagen: ${l.message||l.code||l}`}}_onEditorCancel(){this._editing=null,this._capture=null}_onCaptureRequest(r){let l=r.detail.mode;this._capture=l?{mode:l,points:[]}:null}_onCaptureFinish(){let r=this._capture;if(r){if(r.mode==="line"&&r.points.length>=2)this._editorElement()?.setGeometry({type:"LineString",coordinates:r.points.map(([l,o])=>[o,l])});else if(r.mode==="polygon"&&r.points.length>=3){let l=r.points.map(([o,a])=>[a,o]);l.push(l[0]),this._editorElement()?.setGeometry({type:"Polygon",coordinates:[l]})}else{this._error="Zu wenige Punkte f\xFCr die Zeichnung.";return}this._capture=null,this._error=null}}async _onEventFlag(r){let{id:l,...o}=r.detail;try{await Fo(this.hass,l,o),await this._runQuery()}catch(a){this._error=`Aktion fehlgeschlagen: ${a.message||a.code||a}`}}async _onIcsRequested(){try{let r=this._selectedProfileId?{profile_id:this._selectedProfileId}:Qe(this._filters),l=await No(this.hass,r);await navigator.clipboard.writeText(l.url),this._icsCopied=!0,setTimeout(()=>{this._icsCopied=!1},3e3)}catch(r){this._error=`ICS-URL konnte nicht kopiert werden: ${r.message||r.code||r}`}}};et(Te,"properties",{hass:{attribute:!1},narrow:{attribute:!1},route:{attribute:!1},panel:{attribute:!1},_events:{state:!0},_categories:{state:!0},_filters:{state:!0},_selectedId:{state:!0},_icsCopied:{state:!0},_error:{state:!0},_profiles:{state:!0},_selectedProfileId:{state:!0},_editing:{state:!0},_capture:{state:!0},_stats:{state:!0}}),et(Te,"styles",st`
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
  `);customElements.define("chronotope-panel",Te);
