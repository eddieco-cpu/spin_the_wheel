import {Color} from "./type"

export function setupCounter(element: HTMLButtonElement) {
    let counter = 0
    const setCounter = (count: number) => {
      counter = count
      element.innerHTML = `count is ${counter}`
    }
    element.addEventListener('click', () => setCounter(counter + 1))
    setCounter(0)
  }
  
//
const rainbowColors: Color[] = [
    [255, 0, 0],    // 紅
    [255, 127, 0],  // 橙
    [255, 255, 0],  // 黃
    [0, 255, 0],    // 綠
    [0, 0, 255],    // 藍
    [75, 0, 130],   // 靛
    [148, 0, 211],   // 紫
    [165, 42, 42],  //棕
];

function rgbToHex(rgb: Color): string {
  const [r, g, b] = rgb;
  
  const toHex = (color: number): string => {
      const hex = color.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function interpolateColors(colors: Color[], numPoints: number) {
  const interpolatedColors = [];
  const numColors = colors.length;

  for (let i = 0; i < numColors; i++) {
      const startColor = colors[i];
      const endColor = colors[(i + 1) % numColors];

      for (let t = 0; t < numPoints / numColors; t++) {
          const ratio = t / (numPoints / numColors);
          const interpolatedColor = startColor.map((start, index) => 
              Math.round(start * (1 - ratio) + endColor[index] * ratio)
          ) as Color
          interpolatedColors.push(rgbToHex(interpolatedColor));
      }
  }
  return interpolatedColors;
}

export const rainbow72 = interpolateColors(rainbowColors, 72);


export function intToAlphabet(num: number): string {
  if (num <= 0) return "";

  let result = '';

  while (num > 0) {
    // 计算当前字母的位置
    const charCode = ((num - 1) % 26) + 65;
    result = String.fromCharCode(charCode) + result;
    num = Math.floor((num - 1) / 26);
  }

  return result;
}

export function getRandomAngle(): number {
  return Math.floor(Math.random() * 361); 
}