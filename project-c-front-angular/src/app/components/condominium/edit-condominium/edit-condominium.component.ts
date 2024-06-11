import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CondominiumInterface } from '../../../shared/interfaces/condominium.interface';

@Component({
  selector: 'app-edit-condominium',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-condominium.component.html',
  styleUrl: './edit-condominium.component.scss'
})
export class EditCondominiumComponent implements OnInit {

  constructor (private formBuilder: FormBuilder) {}

  @Input() editData: any;

  @Output() applyChanges = new EventEmitter<any>();
  @Output() openDeleteModal = new EventEmitter<any>();

  fb: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    description: [''],
  });

  ngOnInit(): void {
    this.initFormData();
  }

  initFormData() {
    const condominiumEditData = <CondominiumInterface>this.editData
    this.fb.get('name')?.setValue(condominiumEditData.name);
    this.fb.get('address')?.setValue(condominiumEditData.address);
    this.fb.get('description')?.setValue(condominiumEditData.description);
  }

  editCondominiumRequest() {
    const condominiumEditData: CondominiumInterface = {
      name: this.fb.get('name')?.value,
      address: this.fb.get('address')?.value,
      description: this.fb.get('description')?.value,
      id: this.editData.id 
    }
    this.applyChanges.emit(condominiumEditData);
  }

  deleteModal() {
    this.openDeleteModal.emit();
  }

}
