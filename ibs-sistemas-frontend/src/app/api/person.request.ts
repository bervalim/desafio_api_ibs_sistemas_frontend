import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IRegisterPersonReturn,
  IRegisterPersonReturnBirthday,
  TRegisterBodyRequest,
} from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root',
})
export class PersonRequest {
  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  registerPeople(formData: TRegisterBodyRequest) {
    return this.http.post<
      IRegisterPersonReturn | IRegisterPersonReturnBirthday
    >(`${this.BASE_URL}/people`, formData);
  }
}
