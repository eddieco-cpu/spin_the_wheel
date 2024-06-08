import { rainbow72, intToAlphabet, getRandomAngle, padNumber } from "./utils/helper"
import { Slice, Slices, Record } from "./utils/type"
import './main.css'

const colors = rainbow72

//const circle:HTMLDivElement = document.querySelector('#circle')!  //? //2者差，类型断言、类型注解
const circle = document.querySelector<HTMLDivElement>('#circle')!

const sliceController = document.querySelector<HTMLInputElement>('#sliceController')!
const sliceNumbers = document.querySelectorAll<HTMLSpanElement>('.slice-number')!

const drawer = document.querySelector<HTMLDivElement>('.drawer')!
const drawerCloser = document.querySelector<HTMLButtonElement>(".drawer_closer")!
const drawerContainer = document.querySelector<HTMLDivElement>('.drawer_container')!
const drawerContextGroup = document.querySelector<HTMLUListElement>('.drawer_context-group')!

const startBtn = document.getElementById("startBtn") as HTMLButtonElement
const clearBtn = document.getElementById("clearBtn") as HTMLButtonElement
const editBtn = document.getElementById("editBtn") as HTMLButtonElement
const checkBtn = document.getElementById("checkBtn") as HTMLButtonElement
const actionBtn = document.getElementById("actionBtn") as HTMLButtonElement

const message = document.querySelector<HTMLDivElement>(".message")!
const messageCanceller = document.querySelector<HTMLButtonElement>(".message_canceller")!


const noRecordHTML = "<li class='p-2 py-4 bg-white mx-4 mb-2 rounded text-center text-gray-400'>No records</li>"

let timerId: ReturnType<typeof setTimeout> | null = null; //重要!!

let FetchedAngle = 0

const minSlice = 2
const maxSlice = 30
const animaSec = 3.9
let timeDep = 0 //Date.now();

let slices: Slices = []
let records: Record[] = []

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
		bgString += ` ${colors[colorJump * i]} ${Math.round((360 / n) * i * 10) / 10
			}deg ${Math.round((360 / n) * (i + 1) * 10) / 10}deg`;

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
				class="absolute m-auto top-0 left-0 right-0 bottom-0 text-center w-fit h-[104%] rotate-[var(--r)]"
				style="--r: ${Math.round((i * 360) / n + 180 / n)}deg"
			>
				<p class="m-auto block rotate-[270deg] w-[1px] relative">
					<b
						class="slice_text block h-[3vh] absolute m-auto top-0 bottom-0 left-0 font-normal max-w-20 max-md:max-w-[70px] truncate text-[2vh] cursor-pointer hover:text-neutral-500 active:text-neutral-100"
						title="${slices[i].text}"
						data-id="${slices[i].id}"
						>${slices[i].text}</b
					>
				</p>
			</div>
			<p 
				class="slice_line w-[1px] h-full m-auto absolute top-0 left-0 right-0 bottom-0 rotate-[var(--r)]"
				style="--r: ${Math.round((i * 360) / n)}deg"
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

	drawerContextGroup.innerHTML = sliceInputsHTML
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

sliceController.addEventListener("input", function (e) {  //fn 拉出去共用時，需要定義 e: Event
	const target = e.target as HTMLInputElement;

	sliceNumbers.forEach(item => item.textContent = target.value)
	setCricleBg(Number(target.value))
	setSliceHTML(Number(target.value))
})

actionBtn.addEventListener("click", () => {

	const action = actionBtn.getAttribute("data-action")

	if (action === "add-slice") {
		sliceController.value = `${Number(sliceController.value) + 1}`

		sliceNumbers.forEach(item => item.textContent = sliceController.value)
		setCricleBg(Number(sliceController.value))
		setSliceHTML(Number(sliceController.value))
		setSliceInputs(Number(sliceController.value))
	}
	if (action === "delete-record" && records.length) {
		records = []
		drawerContextGroup.innerHTML = noRecordHTML
		message.classList.remove("message-active")
	}

})

//
//
checkBtn.addEventListener('click', () => {
	//
	actionBtn.textContent = "刪"
	actionBtn.setAttribute("data-action", "delete-record")

	const recordsHTML = records.length ? records.map((record, index) => (
		`
			<li class="flex justify-start items-start gap-[2px] p-2 bg-white mx-4 mb-2 rounded">
				<span class=" text-base text-gray-400 w-8 flex-shrink-0">${padNumber(index + 1)}</span>
				<div class=" flex-grow">
					<p
						class="text-right text-sm leading-none border-b-[1px] border-gray-200 py-1 pr-1 text-gray-400"
					>
					${record.time}
					</p>
					<p class="px-1 pt-1 line-clamp-1 text-gray-600">
						<b class="message_selected text-emerald-500 break-all text-xl">${record.sliceSelectedText}</b>
						was selected
					</p>
					<p class="px-1 text-gray-600">
						from
						<b class="message_opts-amount text-emerald-500 text-xl">${record.sliceAmount}</b>
						options
					</p>
				</div>
			</li>
		`
	)).join("") : noRecordHTML

	drawerContextGroup.innerHTML = recordsHTML

	drawer.classList.add("drawer-active")
})

editBtn.addEventListener('click', () => {
	//
	actionBtn.textContent = "+"
	actionBtn.setAttribute("data-action", "add-slice")

	const expectSliceNum = Number(sliceController.value)
	const drawerSliceNum = drawerContextGroup.querySelectorAll("li").length
	const isDrawerContextIsSlice: boolean = Boolean(drawerContextGroup.querySelector("slice_inputer"))

	if ((expectSliceNum !== drawerSliceNum) || !isDrawerContextIsSlice) {
		setSliceInputs(expectSliceNum)
	}
	drawer.classList.add("drawer-active")
})

circle.addEventListener("click", (e) => {
	//
	const target = e.target as HTMLElement | null;
	if (!target || !target.classList.contains("slice_text")) return

	actionBtn.textContent = "+"
	actionBtn.setAttribute("data-action", "add-slice")

	const expectSliceNum = Number(sliceController.value)
	const drawerSliceNum = drawerContextGroup.querySelectorAll("li").length
	const isDrawerContextIsSlice: boolean = Boolean(drawerContextGroup.querySelector("slice_inputer"))

	if ((expectSliceNum !== drawerSliceNum) || !isDrawerContextIsSlice) {
		setSliceInputs(expectSliceNum)
	}
	drawer.classList.add("drawer-active")

	const dataId = target.getAttribute("data-id")
	const sliceInputs = [...document.querySelectorAll<HTMLInputElement>(".slice_inputer")]
	const sliceInput = sliceInputs.find(el => el.getAttribute("data-id") === dataId) //as HTMLInputElement | undefined	
	if (sliceInput) {
		sliceInput.click()
		sliceInput.focus()
	}
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
drawerContainer.addEventListener("click", (e) => {	//不用定義 e 是否讓他自動推導
	e.stopPropagation()	//

	const target = e.target as HTMLElement | null

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

//重要
drawerContainer.addEventListener("input", (e) => {	//drawerContainer 為 div ，而 div 也可以綁定 input 事件
	e.stopPropagation()	//

	const target = e.target as HTMLElement | null

	if (target && target.classList.contains("slice_inputer") && target instanceof HTMLInputElement) {	//類型保護!! 重要!!
		//
		console.log("on input")
		const targetId = target.getAttribute("data-id")
		slices = slices.map(el => el.id === targetId ? { ...el, text: target.value } : el)
		setSliceHTML(Number(sliceController.value))
	}
})

//
//
startBtn.addEventListener("click", () => {
	let timeNew = Date.now();
	if (timeNew - timeDep < animaSec * 1000) return

	console.log('@@@')
	document.querySelector<HTMLDivElement>(".message")!.classList.remove("message-active")
	const basicRotateDeg = 3600;

	let x = basicRotateDeg + getRandomAngle()	//x = total rotate deg

	circle.style.setProperty("--x", `${x}deg`)
	circle.style.transition = `transform ${animaSec}s ease-out`
	sliceController.style.pointerEvents = "none"

	timerId = setTimeout(() => {
		console.log("****")

		x = x - basicRotateDeg
		x = x % 360

		FetchedAngle = 360 - x
		const PointToPercentOfWhichSlice = FetchedAngle / (360 / Number(sliceController.value))	//i.e. point to the 3.083 slice
		const sliceIndex = Math.floor(PointToPercentOfWhichSlice)	//i.e. 3.083 is part of the 3rd slice
		const slice = slices[sliceIndex]

		console.log(PointToPercentOfWhichSlice)
		console.log(slice)

		circle.style.setProperty("--x", `${x}deg`)
		circle.style.transition = ""
		sliceController.style.pointerEvents = ""

		document.querySelector<HTMLDivElement>(".message")!.classList.add("message-active")
		document.querySelector<HTMLElement>(".message_opts-amount")!.textContent = sliceController.value
		document.querySelector<HTMLElement>(".message_selected")!.textContent = slice.text
		//notes
		/** string better than String
		 * export type Slice = {
				id: string,		//better then String
				text: string
			}
		 */
		//if text: String, then
		/**
		 * Type 'String' is not assignable to type 'string'.
		 * 'string' is a primitive, but 'String' is a wrapper object. Prefer using 'string' when possible.ts(2322)
		 */

		records.push({
			time: new Date().toLocaleTimeString(),
			sliceAmount: Number(sliceController.value),
			sliceSelectedId: slice.id,
			sliceSelectedText: slice.text
		})

	}, animaSec * 1000)

	timeDep = timeNew
})

clearBtn.addEventListener('click', () => {
	//
	circle.style.setProperty('--x', `0deg`);
	circle.style.transition = '';
	sliceController.style.pointerEvents = '';

	FetchedAngle = 0

	timeDep = timeDep - animaSec * 1000;
	if (timerId !== null) clearTimeout(timerId);
});

//
//
messageCanceller.addEventListener("click", () => {
	message.classList.remove("message-active")
})