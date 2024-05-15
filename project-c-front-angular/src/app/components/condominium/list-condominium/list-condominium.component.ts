import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DTColums } from '../../../shared/components/dynamic-table/data-table/data-table-interface';
import { DynamicTableComponent } from "../../../shared/components/dynamic-table/dynamic-table.component";
import { ApiCallInterceptor } from '../../../shared/services/api-call-interceptor.service';


interface CondominiumInterface {
  name: string,
  address: string,
  description: string
}

@Component({
    selector: 'app-list-condominium',
    standalone: true,
    templateUrl: './list-condominium.component.html',
    styleUrl: './list-condominium.component.scss',
    imports: [CommonModule, DynamicTableComponent]
})
export class ListCondominiumComponent implements OnInit {

  constructor(private apiCallService: ApiCallInterceptor) {}

  listCondominium: CondominiumInterface[] = []

  dtTable: DTColums = {
    rows: [],
    titles: []
  };

  ngOnInit(): void {
    // 
    this.apiCallService.callApiAxios('http://127.0.0.1:8000/condominium/')
      .then((data: any) => {
        this.listCondominium = data;
        for (let index = 0; index < this.listCondominium.length; index++) {
          this.dtTable.rows.push({
            data: [this.listCondominium[index].name, this.listCondominium[index].address, this.listCondominium[index].description],
            type: ['text', 'text', 'text']
          })
        }
        this.dtTable.titles.push('Nombre', 'Dirección', 'Descriptción')
      })
      .catch((error: any) => {
        console.error('Error en la solicitud:', error);
      });
  }
}
