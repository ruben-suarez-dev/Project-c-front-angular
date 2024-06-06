import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DTColums, DTRow } from '../../../shared/components/dynamic-table/data-table/data-table-interface';
import { DynamicTableComponent } from "../../../shared/components/dynamic-table/dynamic-table.component";
import { ApiCallInterceptor } from '../../../shared/services/api-call-interceptor.service';
import { CondominiumInterface } from '../../../shared/interfaces/condominium.interface';
import { ApiResponseService } from '../../../shared/services/api-response.service';
import { RequestType, ResponseStatus } from '../../../shared/interfaces/api-response.interface';


@Component({
    selector: 'app-list-condominium',
    standalone: true,
    templateUrl: './list-condominium.component.html',
    styleUrl: './list-condominium.component.scss',
    imports: [CommonModule, DynamicTableComponent]
})
export class ListCondominiumComponent implements OnInit {

  constructor(
    private apiCallService: ApiCallInterceptor,
    private apiResponse: ApiResponseService,
    private cdr: ChangeDetectorRef
  ) {}

  editType: RequestType = RequestType.EDITR_CONDOMINIUM
  deleteType: RequestType = RequestType.DELETE_CONDOMINIUM
  
  listCondominium: CondominiumInterface[] = []

  dtTable: DTColums = {
    rows: [],
    titles: []
  };

  ngOnInit(): void {
    this.getCondominiums();
    this.apiResponse.reseponseObservable.subscribe((response) => {
      if (response.code === ResponseStatus.OK) {
        this.updateList(response.data);
      } else if (response.code === ResponseStatus.OK_EDIT) {
        this.editCondominiumResponse(response);
      } else if (response.code === ResponseStatus.OK_DELETE) {
        console.log('Borre el dato: ', response);
        this.deleteElementFromList(response.data);
      }
    });
  }

  editCondominiumResponse(response: any) {
    let indexToUpdate = this.dtTable.rows.findIndex(id => id === response.data.id);
    let indexToUpdate2 = this.dtTable.data2?.map(data => {
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
    this.dtTable.rows[indexToUpdate].data = dataUpdated;
    this.dtTable.data2 = indexToUpdate2;
    this.cdr.detectChanges();
  }

  updateList(response: CondominiumInterface) {
    console.log('El response es: ', response);
    this.dtTable.rows.push({
      data: [response.name, response.address, response.description]
    });
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

  getCondominiums() {
    this.apiCallService.callApiAxiosGet('http://127.0.0.1:8000/condominium/')
      .then((data: any) => {
        this.listCondominium = data;
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
        this.dtTable.data2 = data;
      })
      .catch((error: any) => {
        console.error('Error en la solicitud:', error);
      });
  }
}
