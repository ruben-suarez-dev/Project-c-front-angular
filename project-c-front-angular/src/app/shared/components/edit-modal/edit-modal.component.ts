import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestType } from '../../interfaces/api-response.interface';
import { CommonModule } from '@angular/common';
import { CondominiumInterface } from '../../interfaces/condominium.interface';
import { ConfirmRejectModalComponent } from '../confirm-reject-modal/confirm-reject-modal.component';
import { EditCondominiumComponent } from '../../../components/condominium/edit-condominium/edit-condominium.component';
import { EditHouseComponent } from '../../../components/house/edit-house/edit-house.component';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
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

  fb: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    description: [''],
  });

  constructor (private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.handleTitle();
    // this.initEditTypeValues();
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
        break;
      case RequestType.EDITR_HOUSE:
        this.title = 'Editar Casa';
        break;
      case RequestType.EDITR_INHABITANTS:
        this.title = 'Editar Habitante';
        break;
    
      default:
        this.title = 'Editar Condominio';
        break;
    }
  }

  handleDeleteValuesByType() {
    this.confirmModalOpen = true;
  }

  handleEditValuesByType(): CondominiumInterface {
    let requestDataEdited;
    switch (this.editType) {
      case RequestType.EDITR_CONDOMINIUM:
          const condominiumEditData: CondominiumInterface = {
          name: this.fb.get('name')?.value,
          address: this.fb.get('address')?.value,
          description: this.fb.get('description')?.value,
          id: this.editData.id
        }
        requestDataEdited = condominiumEditData;
        break;
    
      default:
        break;
    }
    return requestDataEdited!;
  }

  initEditTypeValues() {
    switch (this.editType) {
      case RequestType.EDITR_CONDOMINIUM:
        const condominiumEditData = <CondominiumInterface>this.editData
        console.log('asdassda', this.editData);
        this.fb.get('name')?.setValue(condominiumEditData.name);
        this.fb.get('address')?.setValue(condominiumEditData.address);
        this.fb.get('description')?.setValue(condominiumEditData.description);
        break;
    
      default:
        break;
    }
  }

}
