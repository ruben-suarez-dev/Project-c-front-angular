import axios, { AxiosResponse } from 'axios';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class ApiCallInterceptor {

  constructor() {}
  
  async callApiAxiosGet(url: string, header?: string): Promise<any> {
    try {
      const response = await axios.get(url);
      return response.data;
      /* console.log('Data fetched:', response.data); */
    } catch (error) {
        console.error('Error fetching data:', error);
    }
/*     return await new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((response: AxiosResponse) => {
          resolve(response.data);
        })
        .catch((error: any) => {
          reject(error);
        });
    }); */
  }

  callApiAxiosPost(url: string, data?: any, header?: string): Promise<any> {
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
