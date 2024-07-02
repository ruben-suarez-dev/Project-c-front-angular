import { CondominiumInterface } from "../../../interfaces/condominium.interface"
import { HouseInterface } from "../../../interfaces/house.interface"
import { InhabitantInterface } from "../../../interfaces/inhabitant.interfaces"

export interface DTRow {
    data: string[]
}

export interface DTColums {
    titles: string[],
    rows: DTRow[]
    data2?: (CondominiumInterface | HouseInterface | InhabitantInterface)[]
}