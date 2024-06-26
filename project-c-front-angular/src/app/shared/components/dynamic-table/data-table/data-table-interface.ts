import { CondominiumInterface } from "../../../interfaces/condominium.interface"
import { HouseInterface } from "../../../interfaces/house.interface"

export interface DTRow {
    data: string[]
}

export interface DTColums {
    titles: string[],
    rows: DTRow[]
    data2?: (CondominiumInterface | HouseInterface)[]
}