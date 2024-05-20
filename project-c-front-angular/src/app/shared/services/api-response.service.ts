
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResponseInterface } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})

export class ApiResponseService {
  private _response: BehaviorSubject<ResponseInterface>

  constructor() {
    let tmpResponse: ResponseInterface = {
      code: ''
    }
    this._response = new BehaviorSubject<ResponseInterface>(tmpResponse);
  }

  // Exponemos el response como observable con el fin de no tener que suscribirnos a la funcion
  // y tener que pasarle un parametro nulo.
  get reseponseObservable() {
    return this._response.asObservable();
  }

  handleResponse(response: ResponseInterface) {
    this._response.next(response);
  }
}