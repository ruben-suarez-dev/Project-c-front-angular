import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DTColums } from '../../../shared/components/dynamic-table/data-table/data-table-interface';
import { DynamicTableComponent } from "../../../shared/components/dynamic-table/dynamic-table.component";
import { ApiCallInterceptor } from '../../../shared/services/api-call-interceptor.service';
import { CondominiumInterface } from '../../../shared/interfaces/condominium.interface';
import { ApiResponseService } from '../../../shared/services/api-response.service';
import { EditRequestType, ResponseStatus } from '../../../shared/interfaces/api-response.interface';


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

  editType: EditRequestType = EditRequestType.CONDOMINIUM
  
  listCondominium: CondominiumInterface[] = []

  dtTable: DTColums = {
    rows: [],
    titles: []
  };

  ngOnInit(): void {
    this.getCondominiums();
    this.apiResponse.reseponseObservable.subscribe((response) => {
      if (response.code === ResponseStatus.OK) {
        this.updateList(response.data)
      }
    });
  }

  updateList(response: CondominiumInterface) {
    response.name
    this.dtTable.rows.push({
      data: [response.name, response.address, response.description]
    })
    this.cdr.detectChanges()
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
        this.dtTable.titles.push('Nombre', 'Dirección', 'Descriptción')
        this.dtTable.data2 = data
      })
      .catch((error: any) => {
        console.error('Error en la solicitud:', error);
      });
  }
}
