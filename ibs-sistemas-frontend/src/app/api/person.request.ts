import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ILoginPersonReturn,
  IRegisterPersonReturn,
  TLoginBodyRequest,
  TPersonReturn,
  TRegisterBodyRequest,
} from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root',
})
export class PersonRequest {
  private BASE_URL = 'https://desafio-api-ibs-sistemas-backend.onrender.com';

  constructor(private http: HttpClient) {}

  registerPeopleRequest(formData: TRegisterBodyRequest) {
    return this.http.post<IRegisterPersonReturn>(
      `${this.BASE_URL}/people`,
      formData
    );
  }

  loginPeopleRequest(formData: TLoginBodyRequest) {
    return this.http.post<ILoginPersonReturn>(
      `${this.BASE_URL}/login`,
      formData
    );
  }

  autoLoginPeopleRequest() {
    const getToken = localStorage.getItem('@TokenIBS');
    const getPersonId = localStorage.getItem('@PersonId');

    if (getToken && getPersonId) {
      return this.http.get<TPersonReturn>(
        `${this.BASE_URL}/people/${getPersonId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
    } else {
      return null;
    }
  }
}
