import { ChangeDetectorRef, Component } from '@angular/core';
import { InhabitantInterface } from '../../../shared/interfaces/inhabitant.interfaces';
import { DTColums } from '../../../shared/components/dynamic-table/data-table/data-table-interface';
import { RequestType, ResponseStatus } from '../../../shared/interfaces/api-response.interface';
import { HouseInterface } from '../../../shared/interfaces/house.interface';
import { ApiCallInterceptor } from '../../../shared/services/api-call-interceptor.service';
import { ApiResponseService } from '../../../shared/services/api-response.service';
import { SignalServiceService } from '../../../shared/services/signal-service.service';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-list-inhabitants',
  standalone: true,
  imports: [DynamicTableComponent],
  templateUrl: './list-inhabitants.component.html',
  styleUrl: './list-inhabitants.component.scss'
})
export class ListInhabitantsComponent {

  editType: RequestType = RequestType.EDITR_INHABITANTS
  deleteType: RequestType = RequestType.DELETE_INHABITANTS
  
  listInhabitant: InhabitantInterface[] = []
  listHouse: HouseInterface[] = [];

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
    if (this.signalService.getListHouse.length <= 0) {
      this.listHouse = await this.apiCallService.callApiAxiosGet('http://127.0.0.1:8000/house/');
      this.signalService.setHouseList = this.listHouse;
    } else {
      this.listHouse = this.signalService.getListHouse;
    }
    this.getInhabitant();
    this.apiResponse.reseponseObservable.subscribe((response) => {
      if (response.code === ResponseStatus.OK) {
        this.updateListOnCreate(response.data);
      } else if (response.code === ResponseStatus.OK_EDIT) {
        this.editInhabitantListByResponse(response);
      } else if (response.code === ResponseStatus.OK_DELETE) {
        this.deleteElementFromList(response.data);
      }
    });
  }

  updateListOnCreate(response: InhabitantInterface) {
    console.log('El response es: ', response);
    let houseName = this.listHouse.find(data => data.id === response.house);
    this.dtTable.rows.push({
      data: [response.name, houseName!.number, response.email, response.id]
    });
    this.dtTable.data2?.push(response);
    this.listInhabitant.push(response);
    /* this.signalService.setHouseList = this.listInhabitant; */
    this.cdr.detectChanges();
  }

  // Con el fin de no volver a hacer un GET de Inhabitant se hace este procedimiento.
  editInhabitantListByResponse(response: any) {
    let houseName = this.listHouse.find(data => data.id === response.data.condominium);
    console.log('lista house es: ', this.listHouse);
    console.log('Inhabitant es: ', response);
    let editedData = this.dtTable.data2?.map(data => {
      if (data.id === response.data.id) {
        return { ...data,
          name: response.data.name,
          house: response.data.house,
          email: response.data.email,
          phone: response.data.phone,
          areTenant: response.data.areTenant,
        }
      }
      return data
    });
    // Con los datos actualizados, creamos un "dummy" para poder actualizar la row especifica del elemento editado.
    let dataUpdated: string[] = [response.data.name, houseName?.number,
      response.data.email, response.data.phone, response.data.areTenant,
      response.data.id];
    let indexData = -1;
    for (let index = 0; index < this.dtTable.rows.length; index++) {
      // Esta validacion de index es para asegurarme que el Elemento exista dentro del listado.
      indexData = this.dtTable.rows[index].data.findIndex((id => id === response.data.id));
      if (indexData !== -1) {
        this.dtTable.rows[index].data = dataUpdated;
        break;
        }
    }
    this.dtTable.data2 = <InhabitantInterface[]>editedData;
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

  getInhabitant() {
    this.apiCallService.callApiAxiosGet('http://127.0.0.1:8000/inhabitant/')
      .then((data: any) => {
        this.listInhabitant = data;
        for (let index = 0; index < this.listInhabitant.length; index++) {
          let houseName = this.listHouse.find(data => data.id === this.listInhabitant[index].house);
          this.dtTable.rows.push({
            data: [
              this.listInhabitant[index].name,
              houseName!.number,
              this.listInhabitant[index].email,
              this.listInhabitant[index].phone,
              this.listInhabitant[index].areTenant ? 'Si' : 'No',
              this.listInhabitant[index].id!
            ]
          })
        }
        // Considerar un espacio en blanco para poder manejar el ID
        // con el fin de poder editar el producto.
        this.dtTable.titles.push('Nombre', 'Casa', 'Email', 'Fono', 'Arrendatario');
        this.dtTable.data2 = data;
      })
      .catch((error: any) => {
        console.error('Error en la solicitud:', error);
      });
  }

}
