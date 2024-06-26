import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { CondominiumInterface } from '../interfaces/condominium.interface';
import { ApiCallInterceptor } from './api-call-interceptor.service';
import { CondominiumContainerComponent } from '../../components/condominium/condominium-container/condominium-container.component';
import { PageName } from '../enums/page-names.enum';
import { HouseInterface } from '../interfaces/house.interface';

@Injectable({
  providedIn: 'root'
})
export class SignalServiceService {

  private _signalCurrentPage!: any;
  private _signalCondominiumList!: any;
  private _signalHouseList!: any;

  constructor(private apiCallService: ApiCallInterceptor) {
    let initCondominiumList: CondominiumInterface[] = [];
    let initHouseList: HouseInterface[] = [];
    let initPage: PageName = PageName.CONDOMINIUM;
    this._signalCurrentPage = signal(initPage);
    this._signalCondominiumList = signal(initCondominiumList);
    this._signalHouseList = signal(initHouseList);
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

  get getListHouse(): HouseInterface[] {
    return this._signalHouseList();
  }

  set setHouseList(list: HouseInterface[]) {
    this._signalHouseList.set(list);
  }
}
