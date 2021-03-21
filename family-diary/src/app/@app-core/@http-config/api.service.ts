import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

export const API_URL = new InjectionToken<string>('apiUrl');

export const APICONFIG =  {
  BASEPOINT: environment.apiUrl,
  AUTH: {
    LOGIN: 'app/auth/login',
     
  }

}