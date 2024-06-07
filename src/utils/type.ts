//
export type Color = [number, number, number]

export type Slice = {
    id: string,
    text: string
}

export type Slices = Slice[]

export type Record = {
    time: string,
    sliceAmount: number,
    sliceSelectedId: string,
    sliceSelectedText: string
}