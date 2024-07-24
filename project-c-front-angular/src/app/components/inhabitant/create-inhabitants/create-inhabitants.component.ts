import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiCallInterceptor } from '../../../shared/services/api-call-interceptor.service';
import { ApiResponseService } from '../../../shared/services/api-response.service';
import { CondominiumInterface } from '../../../shared/interfaces/condominium.interface';
import { HouseInterface } from '../../../shared/interfaces/house.interface';
import { InhabitantInterface } from '../../../shared/interfaces/inhabitant.interfaces';

@Component({
  selector: 'app-create-inhabitants',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-inhabitants.component.html',
  styleUrl: './create-inhabitants.component.scss'
})
export class CreateInhabitantsComponent implements OnInit {

  constructor (
    private apiCallService: ApiCallInterceptor,
    private formBuilder: FormBuilder,
    private apiResponse: ApiResponseService
  ) {}

  fb: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    house: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    areTenant: [false]
  })

  listHouse: HouseInterface[] = [];

  ngOnInit(): void {
    this.getHouses()
  }

  createInhabitant() {
    if (this.fb?.valid) {
      const requestData: InhabitantInterface = {
        name: this.fb.get('name')?.value,
        email: this.fb.get('email')?.value,
        phone: this.fb.get('phone')?.value,
        areTenant: this.fb.get('areTenant')?.value,
        house: this.fb.get('house')?.value
      }
      this.apiCallService.callApiAxiosPost('http://127.0.0.1:8000/create-inhabitant/', requestData)
      .then((response) => {
        this.apiResponse.handleResponse(response);
      }).catch((error: any) => {
        console.log('Error al crear condominio: ', error);
      });
    }
  }

  getHouses() {
    this.apiCallService.callApiAxiosGet('http://127.0.0.1:8000/house/')
      .then((data: any) => {
        this.listHouse = data;
      })
      .catch((error: any) => {
        console.error('Error en la solicitud de house:', error);
      });
  }

}
