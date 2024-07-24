import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignalServiceService } from '../../../shared/services/signal-service.service';
import { InhabitantInterface } from '../../../shared/interfaces/inhabitant.interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-inabitants',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule],
  templateUrl: './edit-inabitants.component.html',
  styleUrl: './edit-inabitants.component.scss'
})
export class EditInabitantsComponent {

  @Input() editData: any;

  @Output() applyChanges = new EventEmitter<any>();
  @Output() openDeleteModal = new EventEmitter<any>();

  fb: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    areTenant: [false]
  })

  constructor(
    private formBuilder: FormBuilder,
    private signalService: SignalServiceService
  ) {}

  ngOnInit(): void {
    console.log('Edit Data inhabitants: ', this.editData);
    this.initFormData();
  }

  initFormData() {
    const inhabitantEditData = <InhabitantInterface>this.editData
    this.fb.get('name')?.setValue(inhabitantEditData.name);
    this.fb.get('email')?.setValue(inhabitantEditData.email);
    this.fb.get('phone')?.setValue(inhabitantEditData.phone);
    this.fb.get('areTenant')?.setValue(inhabitantEditData.areTenant);
  }

  editInhabitantRequest() {
    if (this.fb.valid) {
      const editHouseRequest: InhabitantInterface = {
        name: this.fb.get('name')?.value,
        email: this.fb.get('email')?.value,
        phone: this.fb.get('phone')?.value,
        areTenant: this.fb.get('areTenant')?.value,
        house: this.editData.house,
        id: this.editData.id
      }
      this.applyChanges.emit(editHouseRequest);
    }

  }

  deleteInhabitant() {
    this.openDeleteModal.emit();
  }

}
