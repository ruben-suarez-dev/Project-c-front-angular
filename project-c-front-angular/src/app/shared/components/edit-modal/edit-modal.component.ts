import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestType } from '../../interfaces/api-response.interface';
import { ConfirmRejectModalComponent } from '../confirm-reject-modal/confirm-reject-modal.component';
import { EditCondominiumComponent } from '../../../components/condominium/edit-condominium/edit-condominium.component';
import { EditHouseComponent } from '../../../components/house/edit-house/edit-house.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmRejectModalComponent,
    EditCondominiumComponent,
    EditHouseComponent
  ],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.scss'
})
export class EditModalComponent implements OnInit {

  @Input() editType!: RequestType;
  @Input() editData: any;

  @Output() closeModal = new EventEmitter<void>();
  @Output() applyChanges = new EventEmitter<any>();
  @Output() deleteElement = new EventEmitter<any>();

  requestType = RequestType;

  confirmModalOpen = false;

  title: string = '';
  confirmRejectModalTitle: string = '';

  constructor () {}

  ngOnInit(): void {
    this.handleTitle();
  }

  close() {
    this.closeModal.emit();
  }

  cancelDelete() {
    this.confirmModalOpen = false;
  }

  confirmDelete() {
    this.confirmModalOpen = false;
    this.closeModal.emit();
    this.deleteElement.emit(this.editData.id)
  }

  openDeleteModal() {
    this.confirmModalOpen = true;
  }

  editElement(requestData: any) {
    this.applyChanges.emit(requestData);
  }

  handleTitle() {
    switch (this.editType) {
      case RequestType.EDITR_CONDOMINIUM:
        this.title = 'Editar Condominio';
        this.confirmRejectModalTitle = 'Borrar Condominio';
        break;
      case RequestType.EDITR_HOUSE:
        this.title = 'Editar Casa';
        this.confirmRejectModalTitle = 'Borrar Casa';
        break;
      case RequestType.EDITR_INHABITANTS:
        this.title = 'Editar Habitante';
        this.confirmRejectModalTitle = 'Borrar Habitante';
        break;
    
      default:
        this.title = 'Editar Condominio';
        break;
    }
  }
}
