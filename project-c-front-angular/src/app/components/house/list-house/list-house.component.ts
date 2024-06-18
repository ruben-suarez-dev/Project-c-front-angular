import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { DTColums } from '../../../shared/components/dynamic-table/data-table/data-table-interface';
import { RequestType } from '../../../shared/interfaces/api-response.interface';
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
    /* this.getCondominiums(); */
  }

  editType: RequestType = RequestType.EDITR_HOUSE
  deleteType: RequestType = RequestType.DELETE_HOUSE
  
  listHouse: HouseInterface[] = []
  listCondominium: CondominiumInterface[] = [];

  dtTable: DTColums = {
    rows: [],
    titles: []
  };

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
