(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();const M=[[255,0,0],[255,127,0],[255,255,0],[0,255,0],[0,0,255],[75,0,130],[148,0,211],[165,42,42]];function B(e){const[t,r,c]=e,o=i=>{const n=i.toString(16);return n.length===1?"0"+n:n};return`#${o(t)}${o(r)}${o(c)}`}function q(e,t){const r=[],c=e.length;for(let o=0;o<c;o++){const i=e[o],n=e[(o+1)%c];for(let a=0;a<t/c;a++){const w=a/(t/c),E=i.map((C,$)=>Math.round(C*(1-w)+n[$]*w));r.push(B(E))}}return r}const A=q(M,72);function L(e){if(e<=0)return"";let t="";for(;e>0;){const r=(e-1)%26+65;t=String.fromCharCode(r)+t,e=Math.floor((e-1)/26)}return t}function _(){return Math.floor(Math.random()*361)}const S=A,u=document.querySelector("#circle"),l=document.querySelector("#sliceController"),p=document.querySelectorAll(".slice-number"),d=document.querySelector(".drawer"),I=document.querySelector(".drawer_closer"),T=document.querySelector(".drawer_container"),h=document.querySelector(".drawer_slice-group"),k=document.getElementById("startBtn"),H=document.getElementById("clearBtn"),O=document.getElementById("editBtn"),P=document.getElementById("addBtn");let y=null;const b=2,N=20,f=5;let g=0,s=[];function D(){for(let e=0;e<N;e++){const t={id:L(e+1),text:`opt ${L(e+1)}`};s.push(t)}console.log("slices",s)}function v(e){var t=Math.floor(S.length/e),r="conic-gradient(";for(let c=0;c<e;c++)r+=` ${S[t*c]} ${Math.round(360/e)*c}deg ${Math.round(360/e)*(c+1)-1}deg`,c<e-1&&(r+=",");r+=")",u.style.background=r}function m(e){var t="";for(let r=0;r<e;r++)t+=`
			<div
				class="absolute m-auto top-0 left-0 right-0 bottom-0 text-center w-fit h-[108%] rotate-[var(--r)]"
				style="--r: ${Math.round(r*360/e+180/e)}deg"
			>
				<p class="m-auto block rotate-[270deg] w-[1px] relative">
					<b
						class="slice_text block h-[3vh] absolute m-auto top-0 bottom-0 left-0 font-normal max-w-16 truncate text-[2vh] cursor-pointer hover:text-neutral-500 active:text-neutral-100"
						title="${s[r].text}"
						data-id="${s[r].id}"
						>${s[r].text}</b
					>
				</p>
			</div>
		`;u.innerHTML=t}function x(e){var t="";for(let r=0;r<e;r++)t+=`
			<li	
				class="flex flex-row-reverse justify-end items-center gap-2 pl-2 py-3"
			>
				<input
					type="text"
					data-id="${s[r].id}" 
					value="${s[r].text}"
					class="slice_inputer outline-0 w-[calc(100%-72px)] min-w-60 px-2 py-1 rounded-sm relative focus:ring-[2px] focus:ring-gray-300"
				/>
				<button
					class="slice_remover text-base text-gray-400 rounded-full w-6 h-6 custom-shadow relative"
				>
					✕
				</button>
			</li>
		`;h.innerHTML=t}document.addEventListener("DOMContentLoaded",()=>{D(),l.max=N.toString(),l.min=b.toString(),p.forEach(e=>e.textContent=l.value),v(Number(l.value)),m(Number(l.value))});l.addEventListener("input",function(e){const t=e.target;p.forEach(r=>r.textContent=t.value),v(Number(t.value)),m(Number(t.value))});P.addEventListener("click",()=>{l.value=`${Number(l.value)+1}`,p.forEach(e=>e.textContent=l.value),v(Number(l.value)),m(Number(l.value)),x(Number(l.value))});O.addEventListener("click",()=>{const e=Number(l.value),t=h.querySelectorAll("li").length;e!==t&&x(e),d.classList.add("drawer-active")});u.addEventListener("click",e=>{const t=e.target;if(!t||!t.classList.contains("slice_text"))return;const r=Number(l.value),c=h.querySelectorAll("li").length;r!==c&&x(r),d.classList.add("drawer-active");const o=t.getAttribute("data-id"),n=[...document.querySelectorAll(".slice_inputer")].find(a=>a.getAttribute("data-id")===o);n==null||n.click(),n==null||n.focus()});d.addEventListener("click",()=>{d.classList.remove("drawer-active")});I.addEventListener("click",()=>{d.classList.remove("drawer-active")});T.addEventListener("click",e=>{var r,c,o;e.stopPropagation();const t=e.target;if(t&&t.classList.contains("slice_inputer")){let i=t;i.oninput=()=>{const n=i.getAttribute("data-id");s=s.map(a=>a.id===n?{...a,text:i.value}:a),m(Number(l.value))}}if(t&&t.classList.contains("slice_remover")){if(Number(l.value)<=b)return alert(`options no less than ${b}`);const i=(c=(r=t.closest("li"))==null?void 0:r.querySelector(".slice_inputer"))==null?void 0:c.getAttribute("data-id");s=[...s.filter(n=>n.id!==i),s.find(n=>n.id===i)],(o=t.closest("li"))==null||o.remove(),l.value=`${Number(l.value)-1}`,p.forEach(n=>n.textContent=l.value),v(Number(l.value)),m(Number(l.value))}});k.addEventListener("click",()=>{let e=Date.now();if(e-g<f*1e3)return;console.log("@@@");const t=3600;let r=t+_();u.style.setProperty("--x",`${r}deg`),u.style.transition=`transform ${f}s ease-out`,l.style.pointerEvents="none",y=setTimeout(()=>{console.log("****"),r=r-t,r=r%360,u.style.setProperty("--x",`${r}deg`),u.style.transition="",l.style.pointerEvents=""},f*1e3),g=e});H.addEventListener("click",()=>{u.style.setProperty("--x","0deg"),u.style.transition="",l.style.pointerEvents="",g=g-f*1e3,y!==null&&clearTimeout(y)});
