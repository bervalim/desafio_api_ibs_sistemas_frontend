import { Injectable, signal } from '@angular/core';
import { PersonRequest } from '../api/person.request';
import {
  ILoginPersonReturn,
  IRegisterPersonReturn,
  IRegisterPersonReturnBirthday,
  TLoginBodyRequest,
  TPersonReturn,
  TRegisterBodyRequest,
} from '../interfaces/person.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  readonly personSignal = signal<TPersonReturn | null>(null);

  constructor(private personRequest: PersonRequest, private router: Router) {
    this.personRequest
      .autoLoginPeopleRequest()
      ?.subscribe((data: TPersonReturn) => {
        this.personSignal.set(data);
      });
  }

  registerPeopleService(formData: TRegisterBodyRequest) {
    this.personRequest
      .registerPeopleRequest(formData)
      .subscribe(
        (data: IRegisterPersonReturn | IRegisterPersonReturnBirthday) => {
          console.log(data);
          alert('Cadastro realizado com sucesso');
          this.router.navigateByUrl('/');
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
        this.router.navigateByUrl('/dashboard');
      });
  }

  logoutPeopleService() {
    this.personSignal.set(null);
    localStorage.removeItem('@TokenIBS');
    localStorage.removeItem('@PersonId');
    this.router.navigateByUrl('/');
  }
}
