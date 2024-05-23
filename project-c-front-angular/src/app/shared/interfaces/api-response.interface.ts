export enum ResponseStatus {
    OK = '200',
    ERROR = '400',
    NORESPONSE = '500'
}

export enum EditRequestType {
    CONDOMINIUM = 'edit-condominium',
    HOUSE = 'edit-house',
    INHABITANTS = 'edit-inhabitant'
}

export interface ResponseInterface {
    code: string,
    data?: any
}

