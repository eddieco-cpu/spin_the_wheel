(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();const M=[[255,0,0],[255,127,0],[255,255,0],[0,255,0],[0,0,255],[75,0,130],[148,0,211],[165,42,42]];function I(e){const[t,r,l]=e,o=n=>{const c=n.toString(16);return c.length===1?"0"+c:c};return`#${o(t)}${o(r)}${o(l)}`}function _(e,t){const r=[],l=e.length;for(let o=0;o<l;o++){const n=e[o],c=e[(o+1)%l];for(let a=0;a<t/l;a++){const L=a/(t/l),C=n.map(($,q)=>Math.round($*(1-L)+c[q]*L));r.push(I(C))}}return r}const B=_(M,72);function w(e){if(e<=0)return"";let t="";for(;e>0;){const r=(e-1)%26+65;t=String.fromCharCode(r)+t,e=Math.floor((e-1)/26)}return t}function A(){return Math.floor(Math.random()*361)}const N=B,u=document.querySelector("#circle"),s=document.querySelector("#sliceController"),p=document.querySelectorAll(".slice-number"),d=document.querySelector(".drawer"),T=document.querySelector(".drawer_closer"),P=document.querySelector(".drawer_container"),x=document.querySelector(".drawer_slice-group"),k=document.getElementById("startBtn"),O=document.getElementById("clearBtn"),H=document.getElementById("editBtn"),D=document.getElementById("addBtn");let y=null,h=0;const b=2,E=30,f=3.9;let g=0,i=[];function F(){for(let e=0;e<E;e++){const t={id:w(e+1),text:`opt ${w(e+1)}`};i.push(t)}console.log("slices",i)}function v(e){var t=Math.floor(N.length/e),r="conic-gradient(";for(let l=0;l<e;l++)r+=` ${N[t*l]} ${Math.round(360/e*l*10)/10}deg ${Math.round(360/e*(l+1)*10)/10}deg`,l<e-1&&(r+=",");r+=")",u.style.background=r}function m(e){var t="";for(let r=0;r<e;r++)t+=`
			<div
				class="absolute m-auto top-0 left-0 right-0 bottom-0 text-center w-fit h-[104%] rotate-[var(--r)]"
				style="--r: ${Math.round(r*360/e+180/e)}deg"
			>
				<p class="m-auto block rotate-[270deg] w-[1px] relative">
					<b
						class="slice_text block h-[3vh] absolute m-auto top-0 bottom-0 left-0 font-normal max-w-20 max-md:max-w-[70px] truncate text-[2vh] cursor-pointer hover:text-neutral-500 active:text-neutral-100"
						title="${i[r].text}"
						data-id="${i[r].id}"
						>${i[r].text}</b
					>
				</p>
			</div>
			<p 
				class="slice_line w-[1px] h-full m-auto absolute top-0 left-0 right-0 bottom-0 rotate-[var(--r)]"
				style="--r: ${Math.round(r*360/e)}deg"
			></p>
		`;u.innerHTML=t}function S(e){var t="";for(let r=0;r<e;r++)t+=`
			<li	
				class="flex flex-row-reverse justify-end items-center gap-2 pl-2 py-3"
			>
				<input
					type="text"
					data-id="${i[r].id}" 
					value="${i[r].text}"
					class="slice_inputer outline-0 w-[calc(100%-72px)] min-w-60 px-2 py-1 rounded-sm relative focus:ring-[2px] focus:ring-gray-300"
				/>
				<button
					class="slice_remover text-base text-gray-400 rounded-full w-6 h-6 custom-shadow relative"
				>
					✕
				</button>
			</li>
		`;x.innerHTML=t}document.addEventListener("DOMContentLoaded",()=>{F(),s.max=E.toString(),s.min=b.toString(),p.forEach(e=>e.textContent=s.value),v(Number(s.value)),m(Number(s.value))});s.addEventListener("input",function(e){const t=e.target;p.forEach(r=>r.textContent=t.value),v(Number(t.value)),m(Number(t.value))});D.addEventListener("click",()=>{s.value=`${Number(s.value)+1}`,p.forEach(e=>e.textContent=s.value),v(Number(s.value)),m(Number(s.value)),S(Number(s.value))});H.addEventListener("click",()=>{const e=Number(s.value),t=x.querySelectorAll("li").length;e!==t&&S(e),d.classList.add("drawer-active")});u.addEventListener("click",e=>{const t=e.target;if(!t||!t.classList.contains("slice_text"))return;const r=Number(s.value),l=x.querySelectorAll("li").length;r!==l&&S(r),d.classList.add("drawer-active");const o=t.getAttribute("data-id"),c=[...document.querySelectorAll(".slice_inputer")].find(a=>a.getAttribute("data-id")===o);c&&(c.click(),c.focus())});d.addEventListener("click",()=>{d.classList.remove("drawer-active")});T.addEventListener("click",()=>{d.classList.remove("drawer-active")});P.addEventListener("click",e=>{var r,l,o;e.stopPropagation();const t=e.target;if(t&&t.classList.contains("slice_inputer")){let n=t;n.oninput=()=>{const c=n.getAttribute("data-id");i=i.map(a=>a.id===c?{...a,text:n.value}:a),m(Number(s.value))}}if(t&&t.classList.contains("slice_remover")){if(Number(s.value)<=b)return alert(`options no less than ${b}`);const n=(l=(r=t.closest("li"))==null?void 0:r.querySelector(".slice_inputer"))==null?void 0:l.getAttribute("data-id");i=[...i.filter(c=>c.id!==n),i.find(c=>c.id===n)],(o=t.closest("li"))==null||o.remove(),s.value=`${Number(s.value)-1}`,p.forEach(c=>c.textContent=s.value),v(Number(s.value)),m(Number(s.value))}});k.addEventListener("click",()=>{let e=Date.now();if(e-g<f*1e3)return;console.log("@@@"),document.querySelector(".message").classList.remove("message-active");const t=3600;let r=t+A();u.style.setProperty("--x",`${r}deg`),u.style.transition=`transform ${f}s ease-out`,s.style.pointerEvents="none",y=setTimeout(()=>{console.log("****"),r=r-t,r=r%360,h=360-r;const l=h/(360/Number(s.value)),o=Math.floor(l),n=i[o];console.log(l),console.log(n),u.style.setProperty("--x",`${r}deg`),u.style.transition="",s.style.pointerEvents="",document.querySelector(".message").classList.add("message-active"),document.querySelector(".message_opts-amount").textContent=s.value,document.querySelector(".message_selected").textContent=n.text},f*1e3),g=e});O.addEventListener("click",()=>{u.style.setProperty("--x","0deg"),u.style.transition="",s.style.pointerEvents="",h=0,g=g-f*1e3,y!==null&&clearTimeout(y)});document.querySelector(".message_canceller").addEventListener("click",()=>{document.querySelector(".message").classList.remove("message-active")});
