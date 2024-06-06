export enum ResponseStatus {
    OK = '200',
    OK_EDIT = '201',
    OK_DELETE = '210',
    ERROR = '400',
    NORESPONSE = '500'
}

export enum RequestType {
    EDITR_CONDOMINIUM = 'edit-condominium',
    EDITR_HOUSE = 'edit-house',
    EDITR_INHABITANTS = 'edit-inhabitant',
    DELETE_CONDOMINIUM = 'delete-condominium',
    DELETE_HOUSE = 'delete-house',
    DELETE_INHABITANTS = 'delete-inhabitant',
}

export interface ResponseInterface {
    code: string,
    data?: any
}

