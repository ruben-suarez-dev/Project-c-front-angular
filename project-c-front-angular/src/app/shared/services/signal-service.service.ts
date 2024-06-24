import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { CondominiumInterface } from '../interfaces/condominium.interface';
import { ApiCallInterceptor } from './api-call-interceptor.service';
import { CondominiumContainerComponent } from '../../components/condominium/condominium-container/condominium-container.component';
import { PageName } from '../enums/page-names.enum';

@Injectable({
  providedIn: 'root'
})
export class SignalServiceService {

  private _signalCurrentPage!: any;
  private _signalCondominiumList!: any;

  constructor(private apiCallService: ApiCallInterceptor) {
    let initList: CondominiumInterface[] = [];
    let initPage: PageName = PageName.CONDOMINIUM;
    this._signalCurrentPage = signal(initPage);
    this._signalCondominiumList = signal(initList);
  }

  get getCurrentPage(): PageName {
    return this._signalCurrentPage();
  }

  set setCurrentPage(page: PageName) {
    this._signalCurrentPage.set(page);
  }
 
  get getListCondominium(): CondominiumInterface[] {
    return this._signalCondominiumList();
  }

  set setListCondominium(list: CondominiumInterface[]) {
    this._signalCondominiumList.set(list);
  }
}
