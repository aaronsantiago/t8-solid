(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const we=(e,t)=>e===t,be=Symbol("solid-track"),P={equals:we};let fe=de;const _=1,U=2,ue={owned:null,cleanups:null,context:null,owner:null};var g=null;let G=null,me=null,p=null,b=null,C=null,R=0;function B(e,t){const n=p,l=g,s=e.length===0,i=t===void 0?l:t,o=s?ue:{owned:null,cleanups:null,context:i?i.context:null,owner:i},r=s?e:()=>e(()=>O(()=>K(o)));g=o,p=null;try{return M(r,!0)}finally{p=n,g=l}}function $(e,t){t=t?Object.assign({},P,t):P;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},l=s=>(typeof s=="function"&&(s=s(n.value)),he(n,s));return[ae.bind(n),l]}function D(e,t,n){const l=Z(e,t,!1,_);I(l)}function ce(e,t,n){fe=Ee;const l=Z(e,t,!1,_);l.user=!0,C?C.push(l):I(l)}function Ae(e,t,n){n=n?Object.assign({},P,n):P;const l=Z(e,t,!0,0);return l.observers=null,l.observerSlots=null,l.comparator=n.equals||void 0,I(l),ae.bind(l)}function O(e){if(p===null)return e();const t=p;p=null;try{return e()}finally{p=t}}function xe(e){ce(()=>O(e))}function Se(e){return g===null||(g.cleanups===null?g.cleanups=[e]:g.cleanups.push(e)),e}function ae(){if(this.sources&&this.state)if(this.state===_)I(this);else{const e=b;b=null,M(()=>W(this),!1),b=e}if(p){const e=this.observers?this.observers.length:0;p.sources?(p.sources.push(this),p.sourceSlots.push(e)):(p.sources=[this],p.sourceSlots=[e]),this.observers?(this.observers.push(p),this.observerSlots.push(p.sources.length-1)):(this.observers=[p],this.observerSlots=[p.sources.length-1])}return this.value}function he(e,t,n){let l=e.value;return(!e.comparator||!e.comparator(l,t))&&(e.value=t,e.observers&&e.observers.length&&M(()=>{for(let s=0;s<e.observers.length;s+=1){const i=e.observers[s],o=G&&G.running;o&&G.disposed.has(i),(o?!i.tState:!i.state)&&(i.pure?b.push(i):C.push(i),i.observers&&pe(i)),o||(i.state=_)}if(b.length>1e6)throw b=[],new Error},!1)),t}function I(e){if(!e.fn)return;K(e);const t=R;Ce(e,e.value,t)}function Ce(e,t,n){let l;const s=g,i=p;p=g=e;try{l=e.fn(t)}catch(o){return e.pure&&(e.state=_,e.owned&&e.owned.forEach(K),e.owned=null),e.updatedAt=n+1,ge(o)}finally{p=i,g=s}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?he(e,l):e.value=l,e.updatedAt=n)}function Z(e,t,n,l=_,s){const i={fn:e,state:l,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:g,context:g?g.context:null,pure:n};return g===null||g!==ue&&(g.owned?g.owned.push(i):g.owned=[i]),i}function q(e){if(e.state===0)return;if(e.state===U)return W(e);if(e.suspense&&O(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<R);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===_)I(e);else if(e.state===U){const l=b;b=null,M(()=>W(e,t[0]),!1),b=l}}function M(e,t){if(b)return e();let n=!1;t||(b=[]),C?n=!0:C=[],R++;try{const l=e();return ve(n),l}catch(l){n||(C=null),b=null,ge(l)}}function ve(e){if(b&&(de(b),b=null),e)return;const t=C;C=null,t.length&&M(()=>fe(t),!1)}function de(e){for(let t=0;t<e.length;t++)q(e[t])}function Ee(e){let t,n=0;for(t=0;t<e.length;t++){const l=e[t];l.user?e[n++]=l:q(l)}for(t=0;t<n;t++)q(e[t])}function W(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const l=e.sources[n];if(l.sources){const s=l.state;s===_?l!==t&&(!l.updatedAt||l.updatedAt<R)&&q(l):s===U&&W(l,t)}}}function pe(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=U,n.pure?b.push(n):C.push(n),n.observers&&pe(n))}}function K(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),l=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const i=s.pop(),o=n.observerSlots.pop();l<s.length&&(i.sourceSlots[o]=l,s[l]=i,n.observerSlots[l]=o)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)K(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function _e(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function ge(e,t=g){throw _e(e)}const ke=Symbol("fallback");function ee(e){for(let t=0;t<e.length;t++)e[t]()}function Te(e,t,n={}){let l=[],s=[],i=[],o=0,r=t.length>1?[]:null;return Se(()=>ee(i)),()=>{let u=e()||[],h=u.length,c,f;return u[be],O(()=>{let a,y,w,S,k,m,x,d,A;if(h===0)o!==0&&(ee(i),i=[],l=[],s=[],o=0,r&&(r=[])),n.fallback&&(l=[ke],s[0]=B(E=>(i[0]=E,n.fallback())),o=1);else if(o===0){for(s=new Array(h),f=0;f<h;f++)l[f]=u[f],s[f]=B(v);o=h}else{for(w=new Array(h),S=new Array(h),r&&(k=new Array(h)),m=0,x=Math.min(o,h);m<x&&l[m]===u[m];m++);for(x=o-1,d=h-1;x>=m&&d>=m&&l[x]===u[d];x--,d--)w[d]=s[x],S[d]=i[x],r&&(k[d]=r[x]);for(a=new Map,y=new Array(d+1),f=d;f>=m;f--)A=u[f],c=a.get(A),y[f]=c===void 0?-1:c,a.set(A,f);for(c=m;c<=x;c++)A=l[c],f=a.get(A),f!==void 0&&f!==-1?(w[f]=s[c],S[f]=i[c],r&&(k[f]=r[c]),f=y[f],a.set(A,f)):i[c]();for(f=m;f<h;f++)f in w?(s[f]=w[f],i[f]=S[f],r&&(r[f]=k[f],r[f](f))):s[f]=B(v);s=s.slice(0,o=h),l=u.slice(0)}return s});function v(a){if(i[f]=a,r){const[y,w]=$(f);return r[f]=w,t(u[f],y)}return t(u[f])}}}let je=!1;function H(e,t){return O(()=>e(t||{}))}function te(e){const t="fallback"in e&&{fallback:()=>e.fallback};return Ae(Te(()=>e.each,e.children,t||void 0))}function Le(e,t,n){let l=n.length,s=t.length,i=l,o=0,r=0,u=t[s-1].nextSibling,h=null;for(;o<s||r<i;){if(t[o]===n[r]){o++,r++;continue}for(;t[s-1]===n[i-1];)s--,i--;if(s===o){const c=i<l?r?n[r-1].nextSibling:n[i-r]:u;for(;r<i;)e.insertBefore(n[r++],c)}else if(i===r)for(;o<s;)(!h||!h.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[i-1]&&n[r]===t[s-1]){const c=t[--s].nextSibling;e.insertBefore(n[r++],t[o++].nextSibling),e.insertBefore(n[--i],c),t[s]=n[i]}else{if(!h){h=new Map;let f=r;for(;f<i;)h.set(n[f],f++)}const c=h.get(t[o]);if(c!=null)if(r<c&&c<i){let f=o,v=1,a;for(;++f<s&&f<i&&!((a=h.get(t[f]))==null||a!==c+v);)v++;if(v>c-r){const y=t[o];for(;r<c;)e.insertBefore(n[r++],y)}else e.replaceChild(n[r++],t[o++])}else o++;else t[o++].remove()}}}function Ne(e,t,n,l={}){let s;return B(i=>{s=i,t===document?e():j(t,e(),t.firstChild?null:void 0,n)},l.owner),()=>{s(),t.textContent=""}}function z(e,t,n){let l;const s=()=>{const o=document.createElement("template");return o.innerHTML=e,o.content.firstChild},i=()=>(l||(l=s())).cloneNode(!0);return i.cloneNode=i,i}function Oe(e,t,n){e.removeAttribute(t)}function ne(e,t){t==null?e.removeAttribute("class"):e.className=t}function $e(e,t,n){if(!t)return n?Oe(e,"style"):t;const l=e.style;if(typeof t=="string")return l.cssText=t;typeof n=="string"&&(l.cssText=n=void 0),n||(n={}),t||(t={});let s,i;for(i in n)t[i]==null&&l.removeProperty(i),delete n[i];for(i in t)s=t[i],s!==n[i]&&(l.setProperty(i,s),n[i]=s);return n}function De(e,t,n){return O(()=>e(t,n))}function j(e,t,n,l){if(n!==void 0&&!l&&(l=[]),typeof t!="function")return F(e,t,l,n);D(s=>F(e,t(),s,n),l)}function F(e,t,n,l,s){for(;typeof n=="function";)n=n();if(t===n)return n;const i=typeof t,o=l!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,i==="string"||i==="number"){if(i==="number"&&(t=t.toString(),t===n))return n;if(o){let r=n[0];r&&r.nodeType===3?r.data!==t&&(r.data=t):r=document.createTextNode(t),n=T(e,n,l,r)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||i==="boolean")n=T(e,n,l);else{if(i==="function")return D(()=>{let r=t();for(;typeof r=="function";)r=r();n=F(e,r,n,l)}),()=>n;if(Array.isArray(t)){const r=[],u=n&&Array.isArray(n);if(Q(r,t,n,s))return D(()=>n=F(e,r,n,l,!0)),()=>n;if(r.length===0){if(n=T(e,n,l),o)return n}else u?n.length===0?se(e,r,l):Le(e,n,r):(n&&T(e),se(e,r));n=r}else if(t.nodeType){if(Array.isArray(n)){if(o)return n=T(e,n,l,t);T(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function Q(e,t,n,l){let s=!1;for(let i=0,o=t.length;i<o;i++){let r=t[i],u=n&&n[e.length],h;if(!(r==null||r===!0||r===!1))if((h=typeof r)=="object"&&r.nodeType)e.push(r);else if(Array.isArray(r))s=Q(e,r,u)||s;else if(h==="function")if(l){for(;typeof r=="function";)r=r();s=Q(e,Array.isArray(r)?r:[r],Array.isArray(u)?u:[u])||s}else e.push(r),s=!0;else{const c=String(r);u&&u.nodeType===3&&u.data===c?e.push(u):e.push(document.createTextNode(c))}}return s}function se(e,t,n=null){for(let l=0,s=t.length;l<s;l++)e.insertBefore(t[l],n)}function T(e,t,n,l){if(n===void 0)return e.textContent="";const s=l||document.createTextNode("");if(t.length){let i=!1;for(let o=t.length-1;o>=0;o--){const r=t[o];if(s!==r){const u=r.parentNode===e;!i&&!o?u?e.replaceChild(s,r):e.insertBefore(s,n):u&&r.remove()}else i=!0}}else e.insertBefore(s,n);return[s]}const Ie="_App_9g4xh_1",Me="_logo_9g4xh_5",Be="_header_9g4xh_11",Pe="_link_9g4xh_22",le={App:Ie,logo:Me,"logo-spin":"_logo-spin_9g4xh_1",header:Be,link:Pe};function ie(e,t){let n=e.split(`
`);for(let[s,i]of n.entries())n[s]=i.trim();let l={};for(let s of n){let i=l;for(let[o,r]of s.split("").entries()){if(r=t[r.toLowerCase()],!r)break;r in i||(i[r]={entries:[]}),i[r].entries.indexOf(s)===-1&&o==s.length-1&&i[r].entries.push(s),i=i[r]}}return l}var Ue=z("<div><header><select></select><div></div><div></div><textarea>"),qe=z("<option>"),We=z("<li>");let re=["qwertyuiop","asdfghjkl","zxcvbnm"],oe=["asdffjjkl;","asdffjjkl","asdffjj"],L=["qwfpgjluy","arstdhneio","zxcvbkm"],V=["arsttnnei","arsttnneio","arsttnn"],J=["arstdhnei","arstdhneio","arstdhn"],X=["tttttnnnn","tttttnnnnn","tttttnn"],Y=["qwfpggpfw","arstddtsra","zxcvbbv"];re=re.join("");oe=oe.join("");L=L.join("");V=V.join("");J=J.join("");X=X.join("");Y=Y.join("");let N={colemak8:{base:L,mapping:V},colemak10:{base:L,mapping:J},colemak2:{base:L,mapping:X},colemakLH:{base:L,mapping:Y}};for(let e in N){let t=N[e].base,n=N[e].mapping,l={};for(let s=0;s<t.length;s++)l[t[s]]=n[s];N[e]=l}function Fe(){let e,t={};const[n,l]=$([]),[s,i]=$(""),[o,r]=$(0),[u,h]=$("colemak8");xe(async()=>{let a=await fetch("/wictionary-100k.txt");t=ie(await a.text(),u())});const c=a=>{a.key===" "&&(console.log(e.value),e.value="",i(y=>y+n()[o()]+" "),a.preventDefault()),a.key==="Tab"&&(a.preventDefault(),r(y=>(y+1)%n().length))},f=a=>{let y=a.target.value,w=t;for(let S of y){if(!(S in w)){l([]);return}w=w[S]}r(0),l(w.entries)},v=a=>{h(a.target.value)};return ce(async()=>{console.log("mapping",u());let a=await fetch("/wictionary-100k.txt");t=ie(await a.text(),N[u()])}),(()=>{var a=Ue(),y=a.firstChild,w=y.firstChild,S=w.nextSibling,k=S.nextSibling,m=k.nextSibling;w.addEventListener("change",v),j(w,H(te,{get each(){return Object.keys(N)},children:d=>(()=>{var A=qe();return A.value=d,j(A,d),A})()})),j(S,s),j(k,H(te,{get each(){return n()},children:(d,A)=>(()=>{var E=We();return j(E,d),D(ye=>$e(E,A()==o()?{"font-weight":"bolder"}:{},ye)),E})()}));var x=e;return typeof x=="function"?De(x,m):e=m,m.addEventListener("keydown",c),m.addEventListener("input",f),D(d=>{var A=le.App,E=le.header;return A!==d.e&&ne(a,d.e=A),E!==d.t&&ne(y,d.t=E),d},{e:void 0,t:void 0}),a})()}const Re=document.getElementById("root");Ne(()=>H(Fe,{}),Re);
