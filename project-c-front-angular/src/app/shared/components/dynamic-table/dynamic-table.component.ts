import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { DTColums } from './data-table/data-table-interface';
import { CommonModule } from '@angular/common';
import { EditRequestType } from '../../interfaces/api-response.interface';
import { ApiCallInterceptor } from '../../services/api-call-interceptor.service';
import { CondominiumInterface } from '../../interfaces/condominium.interface';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule, EditModalComponent],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss'
})
export class DynamicTableComponent {

  @Input() dtColumsData: DTColums | undefined;
  @Input() editType: EditRequestType | undefined;

  isModalOpen = false;

  constructor (private apiCallService: ApiCallInterceptor) {}

  updateElement(data: any) {
    this.isModalOpen = true;
    console.log('AAAA', this.isModalOpen);
    /* let url = this.getEditUrlByType() + data + '/';
    let elementForEdit = this.dtColumsData?.data2?.find(element => element.id === data);
    elementForEdit!.name = 'POST del front';
    elementForEdit!.address = 'POST del front';
    elementForEdit!.description = 'POST del front';
    const requestData: CondominiumInterface = {
      name: elementForEdit!.name,
      address: elementForEdit!.address,
      description: elementForEdit!.description
    }
    this.apiCallService.callApiAxiosPost(url, requestData); */
  }

  closeModal() {
    this.isModalOpen = false;
  }

  getEditUrlByType(): string {
    return 'http://127.0.0.1:8000/' + this.editType + '/'; 
  }

}
