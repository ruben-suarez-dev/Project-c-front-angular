import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiCallInterceptor } from '../../../shared/services/api-call-interceptor.service';
import { CommonModule } from '@angular/common';
import { CondominiumInterface } from '../../../shared/interfaces/condominium.interface';
import { error } from 'console';
import { ApiResponseService } from '../../../shared/services/api-response.service';

@Component({
  selector: 'app-create-condominium',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-condominium.component.html',
  styleUrl: './create-condominium.component.scss'
})
export class CreateCondominiumComponent {

  constructor(
    private apiCallService: ApiCallInterceptor,
    private formBuilder: FormBuilder,
    private apiResponse: ApiResponseService
  ) {}

  fb: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    description: [''],
  })

  createCondominium() {
    if (this.fb?.valid) {
      const requestData: CondominiumInterface = {
        name: this.fb.get('name')?.value,
        address: this.fb.get('address')?.value,
        description: this.fb.get('description')?.value
      }
      console.log('Los datos son: ', requestData);
      this.apiCallService.callApiAxiosPost('http://127.0.0.1:8000/create-condominium/', requestData)
      .then((response) => {
        this.apiResponse.handleResponse(response);
      }).catch((error: any) => {
        console.log('Error al crear condominio: ', error);
      });
    }
  }

}
