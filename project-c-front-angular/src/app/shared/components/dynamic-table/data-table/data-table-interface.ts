export interface DTRow {
    data: string[],
    type: string[]
}

export interface DTColums {
    titles: string[],
    rows: DTRow[]
}