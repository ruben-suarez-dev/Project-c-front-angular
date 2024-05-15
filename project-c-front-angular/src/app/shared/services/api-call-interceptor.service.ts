import axios, { AxiosError, AxiosResponse } from 'axios';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class ApiCallInterceptor {
  
  callApiAxios(url: string, header?: string): Promise<any> {
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
    // TODO: En algun momento ocupare esto.
    axios.get(url)
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          // El servidor respondió con un código de estado diferente de 2xx
          console.log('Respuesta del servidor con estado:', error.response.status);
          console.log('Datos de respuesta:', error.response.data);
        } else if (error.request) {
          // La solicitud fue realizada, pero no se recibió respuesta del servidor
          console.log('No se recibió respuesta del servidor');
          console.log('Solicitud:', error.request);
        } else {
          // Ocurrió un error durante la configuración de la solicitud
          console.log('Error durante la configuración de la solicitud:', error.message);
        }
        console.log('Configuración de error:', error.config);
      });
  }
}

