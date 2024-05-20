import axios, { AxiosError, AxiosResponse } from 'axios';

import { Injectable } from '@angular/core';
import { ResponseStatus } from '../interfaces/api-response.interface';
import { ApiResponseService } from './api-response.service';

@Injectable({
  providedIn: 'root'
})


export class ApiCallInterceptor {

  constructor() {}
  
  callApiAxiosGet(url: string, header?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((response: AxiosResponse) => {
          resolve(response.data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  callApiAxiosPost(url: string, data: any, header?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then((response: AxiosResponse) => {
          resolve(response.data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}

