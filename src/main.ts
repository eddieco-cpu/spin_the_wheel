import { rainbow72, intToAlphabet, getRandomAngle } from "./utils/helper"
import { Slice, Slices } from "./utils/type"
import './main.css'

const colors = rainbow72

//const circle:HTMLDivElement = document.querySelector('#circle')!  //? //2者差?，类型断言、类型注解
const circle = document.querySelector<HTMLDivElement>('#circle')!

const sliceController = document.querySelector<HTMLInputElement>('#sliceController')!
const sliceNumbers = document.querySelectorAll<HTMLSpanElement>('.slice-number')!

const drawer = document.querySelector<HTMLDivElement>('.drawer')!
const drawerCloser = document.querySelector<HTMLButtonElement>(".drawer_closer")!
const drawerContainer = document.querySelector<HTMLDivElement>('.drawer_container')!
const drawerSliceGroup = document.querySelector<HTMLUListElement>('.drawer_slice-group')!

const startBtn = document.getElementById("startBtn") as HTMLButtonElement
const clearBtn = document.getElementById("clearBtn") as HTMLButtonElement
const editBtn = document.getElementById("editBtn") as HTMLButtonElement
const addBtn = document.getElementById("addBtn") as HTMLButtonElement

let timerId: ReturnType<typeof setTimeout> | null = null; //?

const minSlice = 2
const maxSlice = 30
const animaSec = 5
let timeDep = 0 //Date.now();

let slices: Slices =  []

//
//
function createSlices() {
	for (let i = 0; i < maxSlice; i++) {
		const slice: Slice = {
			id: intToAlphabet(i + 1),
			text: `opt ${intToAlphabet(i + 1)}`,
		}
		slices.push(slice)
	}
	console.log("slices", slices)
}

//Math.round(num * 10) / 10;
function setCricleBg(n: number) {
	var colorJump = Math.floor(colors.length / n);

	var bgString = "conic-gradient(";

	for (let i = 0; i < n; i++) {
		bgString += ` ${colors[colorJump * i]} ${
			Math.round((360 / n) * i * 10) / 10
		}deg ${Math.round((360 / n) * (i + 1) * 10) / 10 }deg`;

		if (i < n - 1) {
			bgString += `,`;
		}
	}
	bgString += ")";

	circle.style.background = bgString;
}

function setSliceHTML(n: number) {
	var sliceHTML = "";

	for (let i = 0; i < n; i++) {
		sliceHTML += `
			<div
				class="absolute m-auto top-0 left-0 right-0 bottom-0 text-center w-fit h-[108%] rotate-[var(--r)]"
				style="--r: ${Math.round((i * 360) / n + 180 / n)}deg"
			>
				<p class="m-auto block rotate-[270deg] w-[1px] relative">
					<b
						class="slice_text block h-[3vh] absolute m-auto top-0 bottom-0 left-0 font-normal max-w-16 truncate text-[2vh] cursor-pointer hover:text-neutral-500 active:text-neutral-100"
						title="${slices[i].text}"
						data-id="${slices[i].id}"
						>${slices[i].text}</b
					>
				</p>
			</div>
			<p 
				class="slice_line w-[1px] h-full m-auto absolute top-0 left-0 right-0 bottom-0 rotate-[var(--r)]"
				style="--r: ${Math.round((i * 360) / n )}deg"
			></p>
		`
	}

	circle.innerHTML = sliceHTML
}

function setSliceInputs(n: number) {
	var sliceInputsHTML = "";

	for (let i = 0; i < n; i++) {
		sliceInputsHTML += `
			<li	
				class="flex flex-row-reverse justify-end items-center gap-2 pl-2 py-3"
			>
				<input
					type="text"
					data-id="${slices[i].id}" 
					value="${slices[i].text}"
					class="slice_inputer outline-0 w-[calc(100%-72px)] min-w-60 px-2 py-1 rounded-sm relative focus:ring-[2px] focus:ring-gray-300"
				/>
				<button
					class="slice_remover text-base text-gray-400 rounded-full w-6 h-6 custom-shadow relative"
				>
					✕
				</button>
			</li>
		`
	}

	drawerSliceGroup.innerHTML = sliceInputsHTML
}

//
//
document.addEventListener("DOMContentLoaded", () => {
	createSlices()

	sliceController.max = maxSlice.toString();
	sliceController.min = minSlice.toString();
	
	sliceNumbers.forEach(item => item.textContent = sliceController.value)
	setCricleBg(Number(sliceController.value))
	setSliceHTML(Number(sliceController.value))
})

sliceController.addEventListener("input", function(e: Event) {  //?
	const target = e.target as HTMLInputElement;    //?

	sliceNumbers.forEach(item => item.textContent = target.value)
	setCricleBg(Number(target.value))
	setSliceHTML(Number(target.value))
})

addBtn.addEventListener("click", () => {
	sliceController.value = `${Number(sliceController.value) +1}`

	sliceNumbers.forEach(item => item.textContent = sliceController.value)
	setCricleBg(Number(sliceController.value))
	setSliceHTML(Number(sliceController.value))
	setSliceInputs(Number(sliceController.value))
})

//
//
editBtn.addEventListener('click', () => {
	//
	const expectSliceNum = Number(sliceController.value)
	const drawerSliceNum = drawerSliceGroup.querySelectorAll("li").length

	if (expectSliceNum !== drawerSliceNum) {
		setSliceInputs(expectSliceNum)
	}
	drawer.classList.add("drawer-active")
})

circle.addEventListener("click", (e) => {
	//
	const target = e.target as HTMLElement | null;	//?	//類型斷言的使用時機?	//怎麼知道是 as HTMLElement
	if (!target || !target.classList.contains("slice_text")) return

	const expectSliceNum = Number(sliceController.value)
	const drawerSliceNum = drawerSliceGroup.querySelectorAll("li").length

	if (expectSliceNum !== drawerSliceNum) {
		setSliceInputs(expectSliceNum)
	}
	drawer.classList.add("drawer-active")

	const dataId = target.getAttribute("data-id")
	const sliceInputs = [...document.querySelectorAll(".slice_inputer")]
	const sliceInput = sliceInputs.find(el => el.getAttribute("data-id") === dataId) as HTMLInputElement | undefined	//?
	sliceInput?.click()
	sliceInput?.focus()
})

//
//
drawer.addEventListener("click", () => {
	drawer.classList.remove("drawer-active")
})
drawerCloser.addEventListener("click", () => {
	drawer.classList.remove("drawer-active")
})

//
//
drawerContainer.addEventListener("click", (e) => {	//? 不用定義 e? 是否讓他自動推導?
	e.stopPropagation()	//?

	const target = e.target as HTMLElement | null

	if (target && target.classList.contains("slice_inputer")) {
		//
		let inputTarget = target as HTMLInputElement

		inputTarget.oninput =  () => {
			//
			const targetId = inputTarget.getAttribute("data-id")
			slices = slices.map(el => el.id === targetId ? {...el, text: inputTarget.value} : el)
			setSliceHTML(Number(sliceController.value))
		}
	}

	if (target && target.classList.contains("slice_remover")) {
		//
		if (Number(sliceController.value) <= minSlice) return alert(`options no less than ${minSlice}`)
		
		//
		const targetId = target.closest("li")?.querySelector(".slice_inputer")?.getAttribute("data-id")
		slices = [...slices.filter(el => el.id !== targetId), slices.find(el => el.id === targetId)!]	//?

		//
		target.closest("li")?.remove()

		//
		sliceController.value = `${Number(sliceController.value) - 1}`

		sliceNumbers.forEach(item => item.textContent = sliceController.value)
		setCricleBg(Number(sliceController.value))
		setSliceHTML(Number(sliceController.value))
	}
})

//
//
startBtn.addEventListener("click", () => {
	let timeNew = Date.now();
	if (timeNew - timeDep < animaSec * 1000) return

	console.log('@@@')
	const basicRotateDeg = 3600;

	let x = basicRotateDeg + getRandomAngle()	//x = total rotate deg

	circle.style.setProperty("--x", `${x}deg`)
	circle.style.transition = `transform ${animaSec}s ease-out`
	sliceController.style.pointerEvents = "none"

	timerId = setTimeout(() => {
		console.log("****")
		
		x = x - basicRotateDeg
		x = x % 360

		circle.style.setProperty("--x", `${x}deg`)
		circle.style.transition = ""
		sliceController.style.pointerEvents = ""

	}, animaSec * 1000)

	timeDep = timeNew
})

clearBtn.addEventListener('click', () => {
	//
	circle.style.setProperty('--x', `0deg`);
	circle.style.transition = '';
	sliceController.style.pointerEvents = '';

	timeDep = timeDep - animaSec * 1000;
	if (timerId !== null) clearTimeout(timerId);
});
