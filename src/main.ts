import { rainbow72, intToAlphabet, getRandomAngle } from "./utils/helper"
import './main.css'

const colors = rainbow72

//const circle:HTMLDivElement = document.querySelector('#circle')!  //? //2者差?，类型断言、类型注解
const circle = document.querySelector<HTMLDivElement>('#circle')!

const sliceController = document.querySelector<HTMLInputElement>('#sliceController')!
const sliceNumber = document.querySelector<HTMLSpanElement>('#sliceNumber')!

const startBtn = document.getElementById("startBtn") as HTMLButtonElement
const clearBtn = document.getElementById("clearBtn") as HTMLButtonElement

let timerId: ReturnType<typeof setTimeout> | null = null; //?
const animaSec = 5
let timeDep = 0 //Date.now();

//
function setCricleBg(n: number) {
	var colorJump = Math.floor(colors.length / n);

	var bgString = "conic-gradient(";

	for (let i = 0; i < n; i++) {
		bgString += ` ${colors[colorJump * i]} ${ //?
			Math.round(360 / n) * i
		}deg ${(Math.round(360 / n) * (i + 1))-1}deg`;

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
				class="absolute m-auto top-0 left-0 right-0 bottom-0 text-center w-fit h-[130%] rotate-[var(--r)]"
				style="--r: ${Math.round((i * 360) / n + 180 / n)}deg"
			>
				${intToAlphabet(i + 1)}
			</div>
		`
	}

	circle.innerHTML = sliceHTML
}

//
document.addEventListener("DOMContentLoaded", () => {
	sliceNumber.textContent = sliceController.value
	setCricleBg(Number(sliceController.value))
	setSliceHTML(Number(sliceController.value))
})

sliceController.addEventListener("input", function(e: Event) {  //?
	const target = e.target as HTMLInputElement;    //?

	sliceNumber.textContent = target.value;
	setCricleBg(Number(target.value))
	setSliceHTML(Number(target.value))
})

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
