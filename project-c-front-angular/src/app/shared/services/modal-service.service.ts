import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  private _edit: BehaviorSubject<any>

  constructor() {
    this._edit = new BehaviorSubject<any>('');
  }

  // Exponemos el response como observable con el fin de no tener que suscribirnos a la funcion
  // y tener que pasarle un parametro nulo.
  get editAsObservable() {
    return this._edit.asObservable();
  }

  callToEditModalWithData(data: any) {
    this._edit.next(data);
  }
}
