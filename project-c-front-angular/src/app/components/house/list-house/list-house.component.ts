import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { DTColums } from '../../../shared/components/dynamic-table/data-table/data-table-interface';
import { RequestType } from '../../../shared/interfaces/api-response.interface';
import { ApiCallInterceptor } from '../../../shared/services/api-call-interceptor.service';
import { ApiResponseService } from '../../../shared/services/api-response.service';
import { HouseInterface } from '../../../shared/interfaces/house.interface';
import { CondominiumInterface } from '../../../shared/interfaces/condominium.interface';

@Component({
  selector: 'app-list-house',
  standalone: true,
  imports: [DynamicTableComponent],
  templateUrl: './list-house.component.html',
  styleUrl: './list-house.component.scss'
})
export class ListHouseComponent implements OnInit {

  constructor(
    private apiCallService: ApiCallInterceptor,
    private apiResponse: ApiResponseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getHouse();
  }

  editType: RequestType = RequestType.EDITR_HOUSE
  deleteType: RequestType = RequestType.DELETE_HOUSE
  
  listHouse: HouseInterface[] = []

  dtTable: DTColums = {
    rows: [],
    titles: []
  };

  getHouse() {
    this.apiCallService.callApiAxiosGet('http://127.0.0.1:8000/house/')
      .then((data: any) => {
        this.listHouse = data;
        for (let index = 0; index < this.listHouse.length; index++) {
          this.dtTable.rows.push({
            data: [
              this.listHouse[index].number,
              this.listHouse[index].condominium,
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
