import { Component, Input } from '@angular/core';
import { DTColums } from './data-table/data-table-interface';
import { CommonModule } from '@angular/common';
import { RequestType } from '../../interfaces/api-response.interface';
import { ApiCallInterceptor } from '../../services/api-call-interceptor.service';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { ApiResponseService } from '../../services/api-response.service';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule, EditModalComponent],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss'
})
export class DynamicTableComponent {

  @Input() dtColumsData: DTColums | undefined;
  @Input() editType!: RequestType;
  @Input() deleteType!: RequestType;

  isModalOpen = false;
  editData: any;

  constructor (
    private apiCallService: ApiCallInterceptor,
    private apiResponse: ApiResponseService
  ) {}

  openModal(data: any) {
    let elementForEdit = this.dtColumsData?.data2?.find(element => element.id === data);
    this.editData = elementForEdit;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  applyChanges(requestData: any) {
    console.log('Estoy en el dynamic table con los datos: ', requestData);
    let url = this.getEditUrlByType(requestData.id);
    this.apiCallService.callApiAxiosPost(url, requestData)
    .then((response) => {
      this.apiResponse.handleResponse(response);
      this.isModalOpen = false;
    }).catch((error: any) => {
      console.log('Error al crear condominio: ', error);
    });
  }

  deleteElement(id: string) {
    let url = this.getDeleteUrlByType(id);
    this.apiCallService.callApiAxiosPost(url)
    .then((response) => {
      this.apiResponse.handleResponse(response);
    }).catch((error: any) => {
      console.log('Error al crear condominio: ', error);
    });
  }

  getDeleteUrlByType(id: string) {
    return 'http://127.0.0.1:8000/' + this.deleteType + '/' + id + '/'; 
  }

  getEditUrlByType(id: string): string {
    return 'http://127.0.0.1:8000/' + this.editType + '/' + id + '/'; 
  }

}
