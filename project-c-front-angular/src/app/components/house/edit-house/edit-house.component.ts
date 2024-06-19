import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HouseInterface } from '../../../shared/interfaces/house.interface';
import { SignalServiceService } from '../../../shared/services/signal-service.service';
import { CondominiumInterface } from '../../../shared/interfaces/condominium.interface';

@Component({
  selector: 'app-edit-house',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule],
  templateUrl: './edit-house.component.html',
  styleUrl: './edit-house.component.scss'
})

export class EditHouseComponent implements OnInit {

  @Input() editData: any;

  @Output() applyChanges = new EventEmitter<any>();
  @Output() openDeleteModal = new EventEmitter<any>();

  condominiumName!: string;
  condominiumID?: string;

  constructor(
    private formBuilder: FormBuilder,
    private signalService: SignalServiceService
  ) {}
  
  fb: FormGroup = this.formBuilder.group({
    number: ['', Validators.required],
    condominium: [{value: '', disabled: true}, Validators.required],
    description: ['']
  })

  ngOnInit(): void {
    this.initFormData();
  }

  initFormData() {
    const houseEditData = <HouseInterface>this.editData
    let condominiumList: CondominiumInterface[] = this.signalService.getListCondominium;
    let condominiumFilter = condominiumList.find(data => data.id === houseEditData.condominium);
    this.condominiumName = condominiumFilter!.name;
    this.condominiumID = condominiumFilter?.id;
    this.fb.get('number')?.setValue(houseEditData.number);
    this.fb.get('condominium')?.setValue(this.condominiumID);
    this.fb.get('description')?.setValue(houseEditData.description);
  }

  editHouseRequest() {
    if (this.fb.valid) {
      const editHouseRequest: HouseInterface = {
        number: this.fb.get('number')?.value,
        condominium: this.fb.get('condominium')?.value,
        description: this.fb.get('description')?.value,
        id: this.editData.id
      }
      this.applyChanges.emit(editHouseRequest);
    }

  }

  deleteHouse() {
    this.openDeleteModal.emit();
  }

}
