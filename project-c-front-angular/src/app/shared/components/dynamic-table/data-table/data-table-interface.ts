import { CondominiumInterface } from "../../../interfaces/condominium.interface"

export interface DTRow {
    data: string[]
}

export interface DTColums {
    titles: string[],
    rows: DTRow[]
    data2?: CondominiumInterface[] 
}