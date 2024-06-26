import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { DTColums } from '../../../shared/components/dynamic-table/data-table/data-table-interface';
import { RequestType, ResponseStatus } from '../../../shared/interfaces/api-response.interface';
import { ApiCallInterceptor } from '../../../shared/services/api-call-interceptor.service';
import { ApiResponseService } from '../../../shared/services/api-response.service';
import { HouseInterface } from '../../../shared/interfaces/house.interface';
import { CondominiumInterface } from '../../../shared/interfaces/condominium.interface';
import { SignalServiceService } from '../../../shared/services/signal-service.service';

@Component({
  selector: 'app-list-house',
  standalone: true,
  imports: [DynamicTableComponent],
  templateUrl: './list-house.component.html',
  styleUrl: './list-house.component.scss'
})
export class ListHouseComponent implements OnInit {

  editType: RequestType = RequestType.EDITR_HOUSE
  deleteType: RequestType = RequestType.DELETE_HOUSE
  
  listHouse: HouseInterface[] = []
  listCondominium: CondominiumInterface[] = [];

  dtTable: DTColums = {
    rows: [],
    titles: []
  };

  constructor(
    private apiCallService: ApiCallInterceptor,
    private signalService: SignalServiceService,
    private apiResponse: ApiResponseService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.signalService.getListCondominium.length <= 0) {
      this.listCondominium = await this.apiCallService.callApiAxiosGet('http://127.0.0.1:8000/condominium/');
      this.signalService.setListCondominium = this.listCondominium;
    } else {
      this.listCondominium = this.signalService.getListCondominium;
    }
    this.getHouse();
    this.apiResponse.reseponseObservable.subscribe((response) => {
      if (response.code === ResponseStatus.OK) {
        this.updateListOnCreate(response.data);
      } else if (response.code === ResponseStatus.OK_EDIT) {
        this.editHouseListByResponse(response);
      } else if (response.code === ResponseStatus.OK_DELETE) {
        this.deleteElementFromList(response.data);
      }
    });
  }

  updateListOnCreate(response: HouseInterface) {
    console.log('El response es: ', response);
    let nameCondominium = this.listCondominium.find(data => data.id === response.condominium);
    this.dtTable.rows.push({
      data: [response.number, nameCondominium!.name, response.description, response.id!]
    });
    this.dtTable.data2?.push(response);
    this.listHouse.push(response);
    this.signalService.setHouseList = this.listHouse;
    this.cdr.detectChanges();
  }

  // Con el fin de no volver a hacer un GET de House se hace este procedimiento.
  editHouseListByResponse(response: any) {
    let nameCondominium = this.listCondominium.find(data => data.id === response.data.condominium);
    console.log('lista condominio es: ', this.listCondominium);
    console.log('condominio es: ', response);
    let editedData = this.dtTable.data2?.map(data => {
      if (data.id === response.data.id) {
        return { ...data,
          number: response.data.number,
          condominium: response.data.condominium,
          description: response.data.description
        }
      }
      return data
    });
    // Con los datos actualizados, creamos un "dummy" para poder actualizar la row especifica del elemento editado.
    let dataUpdated: string[] = [response.data.number, nameCondominium?.name, response.data.description, response.data.id];
    let indexData = -1;
    for (let index = 0; index < this.dtTable.rows.length; index++) {
      // Esta validacion de index es para asegurarme que el Elemento exista dentro del listado.
      indexData = this.dtTable.rows[index].data.findIndex((id => id === response.data.id));
      if (indexData !== -1) {
        this.dtTable.rows[index].data = dataUpdated;
        break;
        }
    }
    this.dtTable.data2 = <HouseInterface[]>editedData;
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
    console.log('Index es ', indexData);
    console.log('lista actualizada ', this.dtTable.rows);
    this.cdr.detectChanges();
  }

  getHouse() {
    this.apiCallService.callApiAxiosGet('http://127.0.0.1:8000/house/')
      .then((data: any) => {
        this.listHouse = data;
        for (let index = 0; index < this.listHouse.length; index++) {
          let nameCondominium = this.listCondominium.find(data => data.id === this.listHouse[index].condominium);
          this.dtTable.rows.push({
            data: [
              this.listHouse[index].number,
              nameCondominium!.name,
              this.listHouse[index].description,
              this.listHouse[index].id!
            ]
          })
        }
        // Considerar un espacio en blanco para poder manejar el ID
        // con el fin de poder editar el producto.
        this.dtTable.titles.push('Numero', 'Condominio', 'Descriptción');
        this.dtTable.data2 = data;
      })
      .catch((error: any) => {
        console.error('Error en la solicitud:', error);
      });
  }
}
