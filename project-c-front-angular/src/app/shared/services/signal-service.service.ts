import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { CondominiumInterface } from '../interfaces/condominium.interface';
import { ApiCallInterceptor } from './api-call-interceptor.service';
import { CondominiumContainerComponent } from '../../components/condominium/condominium-container/condominium-container.component';

@Injectable({
  providedIn: 'root'
})
export class SignalServiceService {

  private _signalCondominiumList!: any;

  constructor(private apiCallService: ApiCallInterceptor) {
    let initList: CondominiumInterface[] = [];
    this._signalCondominiumList = signal(initList);
  }

  get getListCondominium(): CondominiumInterface[] {
    return this._signalCondominiumList();
  }

  set setListCondominium(list: CondominiumInterface[]) {
    this._signalCondominiumList.set(list);
  }
}
