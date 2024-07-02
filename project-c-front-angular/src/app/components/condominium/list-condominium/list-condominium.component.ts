import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DTColums, DTRow } from '../../../shared/components/dynamic-table/data-table/data-table-interface';
import { DynamicTableComponent } from "../../../shared/components/dynamic-table/dynamic-table.component";
import { ApiCallInterceptor } from '../../../shared/services/api-call-interceptor.service';
import { CondominiumInterface } from '../../../shared/interfaces/condominium.interface';
import { ApiResponseService } from '../../../shared/services/api-response.service';
import { RequestType, ResponseStatus } from '../../../shared/interfaces/api-response.interface';
import { SignalServiceService } from '../../../shared/services/signal-service.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-list-condominium',
    standalone: true,
    templateUrl: './list-condominium.component.html',
    styleUrl: './list-condominium.component.scss',
    imports: [CommonModule, DynamicTableComponent]
})
export class ListCondominiumComponent implements OnInit, OnDestroy {

  constructor(
    private apiCallService: ApiCallInterceptor,
    private signalService: SignalServiceService,
    private apiResponse: ApiResponseService,
    private cdr: ChangeDetectorRef
  ) {}

  subs!: Subscription;

  editType: RequestType = RequestType.EDITR_CONDOMINIUM
  deleteType: RequestType = RequestType.DELETE_CONDOMINIUM
  
  listCondominium: CondominiumInterface[] = []

  dtTable: DTColums = {
    rows: [],
    titles: []
  };

  async ngOnInit(): Promise<void> {
    if (this.signalService.getListCondominium.length <= 0) {
      this.listCondominium = await this.apiCallService.callApiAxiosGet('http://127.0.0.1:8000/condominium/');
      this.signalService.setListCondominium = this.listCondominium;
    } else {
      this.listCondominium = this.signalService.getListCondominium;
    }
    this.setInTableCondominiums();
    this.subs = this.apiResponse.reseponseObservable.subscribe((response) => {
      console.log('response del condominio: ', response);
      if (response.code === ResponseStatus.OK) {
        this.updateListOnCreate(response.data);
      } else if (response.code === ResponseStatus.OK_EDIT) {
        this.editCondominiumResponse(response);
      } else if (response.code === ResponseStatus.OK_DELETE) {
        this.deleteElementFromList(response.data);
      }
    });
  }

  // Con el fin de no volver a hacer un GET de los condominios se hace este procedimiento.
  editCondominiumResponse(response: any) {
    let editedData = this.dtTable.data2?.map(data => {
      if (data.id === response.data.id) {
        return { ...data,
          name: response.data.name,
          address: response.data.address,
          description: response.data.description
        }
      }
      return data
    });
    // Con los datos actualizados, creamos un "dummy" para poder actualizar la row especifica del elemento editado.
    let dataUpdated: string[] = [response.data.name, response.data.address, response.data.description, response.data.id];
    let indexData = -1;
    for (let index = 0; index < this.dtTable.rows.length; index++) {
      // Esta validacion de index es para asegurarme que el Elemento exista dentro del listado.
      indexData = this.dtTable.rows[index].data.findIndex((id => id === response.data.id));
      if (indexData !== -1) {
        this.dtTable.rows[index].data = dataUpdated;
        break;
        }
    }
    console.log('edited data: ', editedData);
    this.signalService.setListCondominium = <CondominiumInterface[]>editedData;
    this.dtTable.data2 = editedData;
    this.cdr.detectChanges();
  }

  updateListOnCreate(response: CondominiumInterface) {
    console.log('El response es: ', response);
    this.dtTable.rows.push({
      data: [response.name, response.address, response.description, response.id!]
    });
    this.dtTable.data2?.push(response);
    this.listCondominium.push(response);
    this.signalService.setListCondominium = this.listCondominium;
    this.cdr.detectChanges();
  }

  deleteElementFromList(responseID: any) {
    let indexData = -1;
    for (let index = 0; index < this.dtTable.rows.length; index++) {
      indexData = this.dtTable.rows[index].data.findIndex(id => id === responseID);
      if (indexData !== -1) {
        console.log('La row eliminada es ', this.dtTable.rows[index]);
        this.dtTable.rows.splice(index, 1);
        break;
      }
    }
    let editedData = this.dtTable.data2?.map(data => {
      if (data.id !== responseID) {
        return { ...data}
      }
      return data
    });
    console.log('edited data ', editedData);
    this.signalService.setListCondominium = <CondominiumInterface[]>editedData;
    this.dtTable.data2 = editedData;
    /* console.log('lista actualizada ', this.dtTable.data2); */
    this.cdr.detectChanges();
  }

  setInTableCondominiums() {
    for (let index = 0; index < this.listCondominium.length; index++) {
      this.dtTable.rows.push({
        data: [
          this.listCondominium[index].name,
          this.listCondominium[index].address,
          this.listCondominium[index].description,
          this.listCondominium[index].id!
        ]
      })
    }
    // Considerar un espacio en blanco para poder manejar el ID
    // con el fin de poder editar el producto.
    this.dtTable.titles.push('Nombre', 'Dirección', 'Descriptción');
    this.dtTable.data2 = this.listCondominium;
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
