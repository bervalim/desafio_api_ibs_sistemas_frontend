import { Injectable, signal } from '@angular/core';
import { PersonRequest } from '../api/person.request';
import {
  ILoginPersonReturn,
  IRegisterPersonReturn,
  IRegisterPersonReturnBirthday,
  TLoginBodyRequest,
  TLoginPersonObject,
  TRegisterBodyRequest,
} from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private personRequest: PersonRequest) {}

  readonly personSignal = signal<TLoginPersonObject | null>(null);

  registerPeopleService(formData: TRegisterBodyRequest) {
    this.personRequest
      .registerPeopleRequest(formData)
      .subscribe(
        (data: IRegisterPersonReturn | IRegisterPersonReturnBirthday) => {
          console.log(data);
          alert('Cadastro realizado com sucesso');
        }
      );
  }

  loginPeopleService(formData: TLoginBodyRequest) {
    this.personRequest
      .loginPeopleRequest(formData)
      .subscribe((data: ILoginPersonReturn) => {
        this.personSignal.set(data.person);
        localStorage.setItem('@TokenIBS', data.token);
        localStorage.setItem('@PersonId', data.person.id);
      });
  }

  logoutPeopleService() {
    this.personSignal.set(null);
    localStorage.removeItem('@TokenIBS');
    localStorage.removeItem('@PersonId');
  }
}
