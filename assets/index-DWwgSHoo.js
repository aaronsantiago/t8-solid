(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const xe=(e,t)=>e===t,Ae=Symbol("solid-track"),P={equals:xe};let ae=ye;const E=1,U=2,he={owned:null,cleanups:null,context:null,owner:null};var g=null;let K=null,je=null,d=null,b=null,S=null,R=0;function B(e,t){const n=d,l=g,s=e.length===0,i=t===void 0?l:t,o=s?he:{owned:null,cleanups:null,context:i?i.context:null,owner:i},r=s?e:()=>e(()=>q(()=>H(o)));g=o,d=null;try{return M(r,!0)}finally{d=n,g=l}}function $(e,t){t=t?Object.assign({},P,t):P;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},l=s=>(typeof s=="function"&&(s=s(n.value)),ge(n,s));return[de.bind(n),l]}function D(e,t,n){const l=se(e,t,!1,E);I(l)}function pe(e,t,n){ae=ke;const l=se(e,t,!1,E);l.user=!0,S?S.push(l):I(l)}function Se(e,t,n){n=n?Object.assign({},P,n):P;const l=se(e,t,!0,0);return l.observers=null,l.observerSlots=null,l.comparator=n.equals||void 0,I(l),de.bind(l)}function q(e){if(d===null)return e();const t=d;d=null;try{return e()}finally{d=t}}function ve(e){pe(()=>q(e))}function Ce(e){return g===null||(g.cleanups===null?g.cleanups=[e]:g.cleanups.push(e)),e}function de(){if(this.sources&&this.state)if(this.state===E)I(this);else{const e=b;b=null,M(()=>Q(this),!1),b=e}if(d){const e=this.observers?this.observers.length:0;d.sources?(d.sources.push(this),d.sourceSlots.push(e)):(d.sources=[this],d.sourceSlots=[e]),this.observers?(this.observers.push(d),this.observerSlots.push(d.sources.length-1)):(this.observers=[d],this.observerSlots=[d.sources.length-1])}return this.value}function ge(e,t,n){let l=e.value;return(!e.comparator||!e.comparator(l,t))&&(e.value=t,e.observers&&e.observers.length&&M(()=>{for(let s=0;s<e.observers.length;s+=1){const i=e.observers[s],o=K&&K.running;o&&K.disposed.has(i),(o?!i.tState:!i.state)&&(i.pure?b.push(i):S.push(i),i.observers&&we(i)),o||(i.state=E)}if(b.length>1e6)throw b=[],new Error},!1)),t}function I(e){if(!e.fn)return;H(e);const t=R;Ee(e,e.value,t)}function Ee(e,t,n){let l;const s=g,i=d;d=g=e;try{l=e.fn(t)}catch(o){return e.pure&&(e.state=E,e.owned&&e.owned.forEach(H),e.owned=null),e.updatedAt=n+1,be(o)}finally{d=i,g=s}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?ge(e,l):e.value=l,e.updatedAt=n)}function se(e,t,n,l=E,s){const i={fn:e,state:l,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:g,context:g?g.context:null,pure:n};return g===null||g!==he&&(g.owned?g.owned.push(i):g.owned=[i]),i}function W(e){if(e.state===0)return;if(e.state===U)return Q(e);if(e.suspense&&q(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<R);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===E)I(e);else if(e.state===U){const l=b;b=null,M(()=>Q(e,t[0]),!1),b=l}}function M(e,t){if(b)return e();let n=!1;t||(b=[]),S?n=!0:S=[],R++;try{const l=e();return _e(n),l}catch(l){n||(S=null),b=null,be(l)}}function _e(e){if(b&&(ye(b),b=null),e)return;const t=S;S=null,t.length&&M(()=>ae(t),!1)}function ye(e){for(let t=0;t<e.length;t++)W(e[t])}function ke(e){let t,n=0;for(t=0;t<e.length;t++){const l=e[t];l.user?e[n++]=l:W(l)}for(t=0;t<n;t++)W(e[t])}function Q(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const l=e.sources[n];if(l.sources){const s=l.state;s===E?l!==t&&(!l.updatedAt||l.updatedAt<R)&&W(l):s===U&&Q(l,t)}}}function we(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=U,n.pure?b.push(n):S.push(n),n.observers&&we(n))}}function H(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),l=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const i=s.pop(),o=n.observerSlots.pop();l<s.length&&(i.sourceSlots[o]=l,s[l]=i,n.observerSlots[l]=o)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)H(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function Le(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function be(e,t=g){throw Le(e)}const Te=Symbol("fallback");function ie(e){for(let t=0;t<e.length;t++)e[t]()}function Ne(e,t,n={}){let l=[],s=[],i=[],o=0,r=t.length>1?[]:null;return Ce(()=>ie(i)),()=>{let u=e()||[],h=u.length,c,f;return u[Ae],q(()=>{let a,y,w,j,_,m,A,p,x;if(h===0)o!==0&&(ie(i),i=[],l=[],s=[],o=0,r&&(r=[])),n.fallback&&(l=[Te],s[0]=B(C=>(i[0]=C,n.fallback())),o=1);else if(o===0){for(s=new Array(h),f=0;f<h;f++)l[f]=u[f],s[f]=B(v);o=h}else{for(w=new Array(h),j=new Array(h),r&&(_=new Array(h)),m=0,A=Math.min(o,h);m<A&&l[m]===u[m];m++);for(A=o-1,p=h-1;A>=m&&p>=m&&l[A]===u[p];A--,p--)w[p]=s[A],j[p]=i[A],r&&(_[p]=r[A]);for(a=new Map,y=new Array(p+1),f=p;f>=m;f--)x=u[f],c=a.get(x),y[f]=c===void 0?-1:c,a.set(x,f);for(c=m;c<=A;c++)x=l[c],f=a.get(x),f!==void 0&&f!==-1?(w[f]=s[c],j[f]=i[c],r&&(_[f]=r[c]),f=y[f],a.set(x,f)):i[c]();for(f=m;f<h;f++)f in w?(s[f]=w[f],i[f]=j[f],r&&(r[f]=_[f],r[f](f))):s[f]=B(v);s=s.slice(0,o=h),l=u.slice(0)}return s});function v(a){if(i[f]=a,r){const[y,w]=$(f);return r[f]=w,t(u[f],y)}return t(u[f])}}}let Oe=!1;function G(e,t){return q(()=>e(t||{}))}function re(e){const t="fallback"in e&&{fallback:()=>e.fallback};return Se(Ne(()=>e.each,e.children,t||void 0))}function qe(e,t,n){let l=n.length,s=t.length,i=l,o=0,r=0,u=t[s-1].nextSibling,h=null;for(;o<s||r<i;){if(t[o]===n[r]){o++,r++;continue}for(;t[s-1]===n[i-1];)s--,i--;if(s===o){const c=i<l?r?n[r-1].nextSibling:n[i-r]:u;for(;r<i;)e.insertBefore(n[r++],c)}else if(i===r)for(;o<s;)(!h||!h.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[i-1]&&n[r]===t[s-1]){const c=t[--s].nextSibling;e.insertBefore(n[r++],t[o++].nextSibling),e.insertBefore(n[--i],c),t[s]=n[i]}else{if(!h){h=new Map;let f=r;for(;f<i;)h.set(n[f],f++)}const c=h.get(t[o]);if(c!=null)if(r<c&&c<i){let f=o,v=1,a;for(;++f<s&&f<i&&!((a=h.get(t[f]))==null||a!==c+v);)v++;if(v>c-r){const y=t[o];for(;r<c;)e.insertBefore(n[r++],y)}else e.replaceChild(n[r++],t[o++])}else o++;else t[o++].remove()}}}function $e(e,t,n,l={}){let s;return B(i=>{s=i,t===document?e():T(t,e(),t.firstChild?null:void 0,n)},l.owner),()=>{s(),t.textContent=""}}function le(e,t,n){let l;const s=()=>{const o=document.createElement("template");return o.innerHTML=e,o.content.firstChild},i=()=>(l||(l=s())).cloneNode(!0);return i.cloneNode=i,i}function De(e,t,n){e.removeAttribute(t)}function oe(e,t){t==null?e.removeAttribute("class"):e.className=t}function Ie(e,t,n){if(!t)return n?De(e,"style"):t;const l=e.style;if(typeof t=="string")return l.cssText=t;typeof n=="string"&&(l.cssText=n=void 0),n||(n={}),t||(t={});let s,i;for(i in n)t[i]==null&&l.removeProperty(i),delete n[i];for(i in t)s=t[i],s!==n[i]&&(l.setProperty(i,s),n[i]=s);return n}function Me(e,t,n){return q(()=>e(t,n))}function T(e,t,n,l){if(n!==void 0&&!l&&(l=[]),typeof t!="function")return F(e,t,l,n);D(s=>F(e,t(),s,n),l)}function F(e,t,n,l,s){for(;typeof n=="function";)n=n();if(t===n)return n;const i=typeof t,o=l!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,i==="string"||i==="number"){if(i==="number"&&(t=t.toString(),t===n))return n;if(o){let r=n[0];r&&r.nodeType===3?r.data!==t&&(r.data=t):r=document.createTextNode(t),n=L(e,n,l,r)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||i==="boolean")n=L(e,n,l);else{if(i==="function")return D(()=>{let r=t();for(;typeof r=="function";)r=r();n=F(e,r,n,l)}),()=>n;if(Array.isArray(t)){const r=[],u=n&&Array.isArray(n);if(V(r,t,n,s))return D(()=>n=F(e,r,n,l,!0)),()=>n;if(r.length===0){if(n=L(e,n,l),o)return n}else u?n.length===0?fe(e,r,l):qe(e,n,r):(n&&L(e),fe(e,r));n=r}else if(t.nodeType){if(Array.isArray(n)){if(o)return n=L(e,n,l,t);L(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function V(e,t,n,l){let s=!1;for(let i=0,o=t.length;i<o;i++){let r=t[i],u=n&&n[e.length],h;if(!(r==null||r===!0||r===!1))if((h=typeof r)=="object"&&r.nodeType)e.push(r);else if(Array.isArray(r))s=V(e,r,u)||s;else if(h==="function")if(l){for(;typeof r=="function";)r=r();s=V(e,Array.isArray(r)?r:[r],Array.isArray(u)?u:[u])||s}else e.push(r),s=!0;else{const c=String(r);u&&u.nodeType===3&&u.data===c?e.push(u):e.push(document.createTextNode(c))}}return s}function fe(e,t,n=null){for(let l=0,s=t.length;l<s;l++)e.insertBefore(t[l],n)}function L(e,t,n,l){if(n===void 0)return e.textContent="";const s=l||document.createTextNode("");if(t.length){let i=!1;for(let o=t.length-1;o>=0;o--){const r=t[o];if(s!==r){const u=r.parentNode===e;!i&&!o?u?e.replaceChild(s,r):e.insertBefore(s,n):u&&r.remove()}else i=!0}}else e.insertBefore(s,n);return[s]}const Be="_App_9g4xh_1",Pe="_logo_9g4xh_5",Ue="_header_9g4xh_11",We="_link_9g4xh_22",ue={App:Be,logo:Pe,"logo-spin":"_logo-spin_9g4xh_1",header:Ue,link:We};function ce(e,t){let n=e.split(`
`);for(let[s,i]of n.entries())n[s]=i.trim();let l={};for(let s of n){let i=l;for(let[o,r]of s.split("").entries()){if(r=t[r.toLowerCase()],!r)break;r in i||(i[r]={entries:[]}),i[r].entries.indexOf(s)===-1&&o==s.length-1&&i[r].entries.push(s),i=i[r]}}return l}var Qe=le("<div><header><select></select><div></div><div></div><textarea>"),Fe=le("<option>"),Re=le("<li>");let N=["qwertyuiop","asdfghjkl","zxcvbnm"],J=["asdffjjkl;","asdffjjkl","asdffjj"],X=["asdfghjkl;","asdfghjkl","asdfghj"],Y=["ffffjjjjjj","ffffjjjjj","ffffjjj"],Z=["qwerttrewq","asdfggfdsa","zxcvbbv"],O=["qwfpgjluy","arstdhneio","zxcvbkm"],z=["arsttnnei","arsttnneio","arsttnn"],ee=["arstdhnei","arstdhneio","arstdhn"],te=["tttttnnnn","tttttnnnnn","tttttnn"],ne=["qwfpggpfw","arstddtsra","zxcvbbv"];N=N.join("");J=J.join("");X=X.join("");Y=Y.join("");Z=Z.join("");O=O.join("");z=z.join("");ee=ee.join("");te=te.join("");ne=ne.join("");let k={qwerty8:{base:N,mapping:J},qwerty10:{base:N,mapping:X},qwerty2:{base:N,mapping:Y},qwertyLH:{base:N,mapping:Z},colemak8:{base:O,mapping:z},colemak10:{base:O,mapping:ee},colemak2:{base:O,mapping:te},colemakLH:{base:O,mapping:ne}};for(let e in k){let t=k[e].base,n=k[e].mapping,l={};for(let s=0;s<t.length;s++)l[t[s]]=n[s];k[e]=l}function He(){let e,t={};const[n,l]=$([]),[s,i]=$(""),[o,r]=$(0),[u,h]=$(Object.keys(k)[0]);ve(async()=>{let a=await fetch("/t8-solid/google-10000-english-usa.txt");t=ce(await a.text(),u())});const c=a=>{a.key===" "&&(console.log(e.value),e.value="",i(y=>y+n()[o()]+" "),a.preventDefault()),a.key==="Tab"&&(a.preventDefault(),r(y=>(y+1)%n().length))},f=a=>{let y=a.target.value,w=t;for(let j of y){if(!(j in w)){l([]);return}w=w[j]}r(0),l(w.entries)},v=a=>{h(a.target.value)};return pe(async()=>{console.log("mapping",u());let a=await fetch("/t8-solid/google-10000-english-usa.txt");t=ce(await a.text(),k[u()])}),(()=>{var a=Qe(),y=a.firstChild,w=y.firstChild,j=w.nextSibling,_=j.nextSibling,m=_.nextSibling;w.addEventListener("change",v),T(w,G(re,{get each(){return Object.keys(k)},children:p=>(()=>{var x=Fe();return x.value=p,T(x,p),x})()})),T(j,s),T(_,G(re,{get each(){return n()},children:(p,x)=>(()=>{var C=Re();return T(C,p),D(me=>Ie(C,x()==o()?{"font-weight":"bolder"}:{},me)),C})()}));var A=e;return typeof A=="function"?Me(A,m):e=m,m.addEventListener("keydown",c),m.addEventListener("input",f),D(p=>{var x=ue.App,C=ue.header;return x!==p.e&&oe(a,p.e=x),C!==p.t&&oe(y,p.t=C),p},{e:void 0,t:void 0}),a})()}const Ke=document.getElementById("root");$e(()=>G(He,{}),Ke);
