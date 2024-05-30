//
type XObj<T> = {
    name: string;
    x: T;
    xFunc: () => T;
  };
type VArray<T> = T[]

export type YFunc = <T>(a: T, b: T) => T

//
export const numberObj: XObj<number> = {
    name: "Number Object",
    x: 42,
    xFunc: () => 42
};
export const stringObj: XObj<string> = {
    name: "String Object",
    x: "Hello",
    xFunc: () => "Hello"
};

export const numberArray: VArray<number> = [1, 2, 3]

//
// export const aFunc: YFunc = (a, b) => {
//     console.log(a, b)
//     if (typeof a === "string" && typeof b === "string") {
//         console.log(a + b)
//         return a + " " + b
//     }
//     if (typeof a === "number" && typeof b === "number") {
//         console.log(a + b)
//         return a + b
//     }
//     return a
// }
// export const aString = aFunc("Hello", "World")



