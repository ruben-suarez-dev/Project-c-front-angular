import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiCallInterceptor } from '../../../shared/services/api-call-interceptor.service';
import { CondominiumInterface } from '../../../shared/interfaces/condominium.interface';
import { HouseInterface } from '../../../shared/interfaces/house.interface';
import { ApiResponseService } from '../../../shared/services/api-response.service';

@Component({
  selector: 'app-create-house',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-house.component.html',
  styleUrl: './create-house.component.scss'
})
export class CreateHouseComponent implements OnInit {

  listCondominium: CondominiumInterface[] = [];

  constructor(
    private apiCallService: ApiCallInterceptor,
    private apiResponse: ApiResponseService,
    private formBuilder: FormBuilder) {}


  ngOnInit(): void {
    this.getCondominiums();
  }

  fb: FormGroup = this.formBuilder.group({
    number: ['', Validators.required],
    condominium: ['', Validators.required],
    description: ['']
  })

  createHouse() {
    if (this.fb?.valid) {
      const requestData: HouseInterface = {
        number: this.fb.get('number')?.value,
        condominium: this.fb.get('condominium')?.value,
        description: this.fb.get('description')?.value
      }
      console.log('el request de la casa es: ', requestData);
      this.apiCallService.callApiAxiosPost('http://127.0.0.1:8000/create-house/', requestData)
      .then((response) => {
        this.apiResponse.handleResponse(response);
        console.log('El response es 111: ', response);
      }).catch((error: any) => {
        console.log('Error al crear condominio: ', error);
      });
    }
  }

  getCondominiums() {
    this.apiCallService.callApiAxiosGet('http://127.0.0.1:8000/condominium/')
      .then((data: any) => {
        this.listCondominium = data;
      })
      .catch((error: any) => {
        console.error('Error en la solicitud de condominios:', error);
      });
  }

}
