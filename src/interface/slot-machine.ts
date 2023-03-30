export interface Slot{
    name: string
    image: string
}

export interface Door{
    slots: Slot[]
    element?: HTMLElement
    boxes?: HTMLElement
    currentPosition: number
    stopped: boolean
}