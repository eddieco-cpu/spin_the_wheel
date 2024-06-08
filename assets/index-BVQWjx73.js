(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function n(o){if(o.ep)return;o.ep=!0;const c=r(o);fetch(o.href,c)}})();const T=[[255,0,0],[255,127,0],[255,255,0],[0,255,0],[0,0,255],[75,0,130],[148,0,211],[165,42,42]];function k(e){const[t,r,n]=e,o=c=>{const l=c.toString(16);return l.length===1?"0"+l:l};return`#${o(t)}${o(r)}${o(n)}`}function H(e,t){const r=[],n=e.length;for(let o=0;o<n;o++){const c=e[o],l=e[(o+1)%n];for(let d=0;d<t/n;d++){const v=d/(t/n),_=c.map((A,B)=>Math.round(A*(1-v)+l[B]*v));r.push(k(_))}}return r}const P=H(T,72);function N(e){if(e<=0)return"";let t="";for(;e>0;){const r=(e-1)%26+65;t=String.fromCharCode(r)+t,e=Math.floor((e-1)/26)}return t}function O(){return Math.floor(Math.random()*361)}function D(e){return String(e).padStart(2,"0")}const E=P,a=document.querySelector("#circle"),s=document.querySelector("#sliceController"),y=document.querySelectorAll(".slice-number"),p=document.querySelector(".drawer"),j=document.querySelector(".drawer_closer"),$=document.querySelector(".drawer_container"),m=document.querySelector(".drawer_context-group"),R=document.getElementById("startBtn"),F=document.getElementById("clearBtn"),G=document.getElementById("editBtn"),J=document.getElementById("checkBtn"),u=document.getElementById("actionBtn"),M=document.querySelector(".message"),K=document.querySelector(".message_canceller"),q="<li class='p-2 py-4 bg-white mx-4 mb-2 rounded text-center text-gray-400'>No records</li>";let S=null,L=0;const w=2,I=30,x=3.9;let b=0,i=[],g=[];function W(){for(let e=0;e<I;e++){const t={id:N(e+1),text:`opt ${N(e+1)}`};i.push(t)}console.log("slices",i)}function h(e){var t=Math.floor(E.length/e),r="conic-gradient(";for(let n=0;n<e;n++)r+=` ${E[t*n]} ${Math.round(360/e*n*10)/10}deg ${Math.round(360/e*(n+1)*10)/10}deg`,n<e-1&&(r+=",");r+=")",a.style.background=r}function f(e){var t="";for(let r=0;r<e;r++)t+=`
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
		`;a.innerHTML=t}function C(e){var t="";for(let r=0;r<e;r++)t+=`
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
		`;m.innerHTML=t}document.addEventListener("DOMContentLoaded",()=>{W(),s.max=I.toString(),s.min=w.toString(),y.forEach(e=>e.textContent=s.value),h(Number(s.value)),f(Number(s.value))});s.addEventListener("input",function(e){const t=e.target;y.forEach(r=>r.textContent=t.value),h(Number(t.value)),f(Number(t.value))});u.addEventListener("click",()=>{const e=u.getAttribute("data-action");e==="add-slice"&&(s.value=`${Number(s.value)+1}`,y.forEach(t=>t.textContent=s.value),h(Number(s.value)),f(Number(s.value)),C(Number(s.value))),e==="delete-record"&&g.length&&(g=[],m.innerHTML=q,M.classList.remove("message-active"))});J.addEventListener("click",()=>{u.textContent="刪",u.setAttribute("data-action","delete-record");const e=g.length?g.map((t,r)=>`
			<li class="flex justify-start items-start gap-[2px] p-2 bg-white mx-4 mb-2 rounded">
				<span class=" text-base text-gray-400 w-8 flex-shrink-0">${D(r+1)}</span>
				<div class=" flex-grow">
					<p
						class="text-right text-sm leading-none border-b-[1px] border-gray-200 py-1 pr-1 text-gray-400"
					>
					${t.time}
					</p>
					<p class="px-1 pt-1 line-clamp-1 text-gray-600">
						<b class="message_selected text-emerald-500 break-all text-xl">${t.sliceSelectedText}</b>
						was selected
					</p>
					<p class="px-1 text-gray-600">
						from
						<b class="message_opts-amount text-emerald-500 text-xl">${t.sliceAmount}</b>
						options
					</p>
				</div>
			</li>
		`).join(""):q;m.innerHTML=e,p.classList.add("drawer-active")});G.addEventListener("click",()=>{u.textContent="+",u.setAttribute("data-action","add-slice");const e=Number(s.value),t=m.querySelectorAll("li").length,r=!!m.querySelector("slice_inputer");(e!==t||!r)&&C(e),p.classList.add("drawer-active")});a.addEventListener("click",e=>{const t=e.target;if(!t||!t.classList.contains("slice_text"))return;u.textContent="+",u.setAttribute("data-action","add-slice");const r=Number(s.value),n=m.querySelectorAll("li").length,o=!!m.querySelector("slice_inputer");(r!==n||!o)&&C(r),p.classList.add("drawer-active");const c=t.getAttribute("data-id"),d=[...document.querySelectorAll(".slice_inputer")].find(v=>v.getAttribute("data-id")===c);d&&(d.click(),d.focus())});p.addEventListener("click",()=>{p.classList.remove("drawer-active")});j.addEventListener("click",()=>{p.classList.remove("drawer-active")});$.addEventListener("click",e=>{var r,n,o;e.stopPropagation();const t=e.target;if(t&&t.classList.contains("slice_remover")){if(Number(s.value)<=w)return alert(`options no less than ${w}`);const c=(n=(r=t.closest("li"))==null?void 0:r.querySelector(".slice_inputer"))==null?void 0:n.getAttribute("data-id");i=[...i.filter(l=>l.id!==c),i.find(l=>l.id===c)],(o=t.closest("li"))==null||o.remove(),s.value=`${Number(s.value)-1}`,y.forEach(l=>l.textContent=s.value),h(Number(s.value)),f(Number(s.value))}});$.addEventListener("input",e=>{e.stopPropagation();const t=e.target;if(t&&t.classList.contains("slice_inputer")&&t instanceof HTMLInputElement){console.log("on input");const r=t.getAttribute("data-id");i=i.map(n=>n.id===r?{...n,text:t.value}:n),f(Number(s.value))}});R.addEventListener("click",()=>{let e=Date.now();if(e-b<x*1e3)return;console.log("@@@"),document.querySelector(".message").classList.remove("message-active");const t=3600;let r=t+O();a.style.setProperty("--x",`${r}deg`),a.style.transition=`transform ${x}s ease-out`,s.style.pointerEvents="none",S=setTimeout(()=>{console.log("****"),r=r-t,r=r%360,L=360-r;const n=L/(360/Number(s.value)),o=Math.floor(n),c=i[o];console.log(n),console.log(c),a.style.setProperty("--x",`${r}deg`),a.style.transition="",s.style.pointerEvents="",document.querySelector(".message").classList.add("message-active"),document.querySelector(".message_opts-amount").textContent=s.value,document.querySelector(".message_selected").textContent=c.text,g.push({time:new Date().toLocaleTimeString(),sliceAmount:Number(s.value),sliceSelectedId:c.id,sliceSelectedText:c.text})},x*1e3),b=e});F.addEventListener("click",()=>{a.style.setProperty("--x","0deg"),a.style.transition="",s.style.pointerEvents="",L=0,b=b-x*1e3,S!==null&&clearTimeout(S)});K.addEventListener("click",()=>{M.classList.remove("message-active")});
