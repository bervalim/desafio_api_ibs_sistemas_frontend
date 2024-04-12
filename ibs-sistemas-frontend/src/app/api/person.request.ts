import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ILoginPersonReturn,
  IRegisterPersonReturn,
  IRegisterPersonReturnBirthday,
  TLoginBodyRequest,
  TPersonReturn,
  TRegisterBodyRequest,
} from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root',
})
export class PersonRequest {
  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  registerPeopleRequest(formData: TRegisterBodyRequest) {
    return this.http.post<
      IRegisterPersonReturn | IRegisterPersonReturnBirthday
    >(`${this.BASE_URL}/people`, formData);
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
      const parsedToken = JSON.parse(getToken);
      const parsedId = JSON.parse(getPersonId);

      return this.http.get<TPersonReturn>(
        `${this.BASE_URL}/people/${parsedId}`,
        {
          headers: {
            Authorization: `Bearer ${parsedToken}`,
          },
        }
      );
    } else {
      return null;
    }
  }
}
