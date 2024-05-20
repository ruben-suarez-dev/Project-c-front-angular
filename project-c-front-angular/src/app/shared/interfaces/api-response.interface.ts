export  enum ResponseStatus {
    OK = '200',
    ERROR = '400',
    NORESPONSE = '500'
}

export interface ResponseInterface {
    code: string,
    data?: any
}

