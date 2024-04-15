import { Injectable, signal } from '@angular/core';
import { PersonRequest } from '../api/person.request';
import {
  ILoginPersonReturn,
  IRegisterPersonReturn,
  TLoginBodyRequest,
  TPersonReturn,
  TRegisterBodyRequest,
} from '../interfaces/person.interface';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { publicRoutes } from '../app.routes';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  readonly personSignal = signal<TPersonReturn | null>(null);

  constructor(
    private personRequest: PersonRequest,
    private router: Router,
    private toastr: ToastrService
  ) {
    const pathname = window.location.pathname;
    this.personRequest.autoLoginPeopleRequest()?.subscribe({
      next: (data: TPersonReturn) => {
        this.personSignal.set(data);
        if (publicRoutes.includes(pathname)) {
          this.router.navigateByUrl('/dashboard');
        } else {
          this.router.navigateByUrl(pathname);
        }
      },
      error: (error) => {
        console.log(error);
        this.logoutPeopleService();
      },
    });
  }

  getPerson() {
    return this.personSignal();
  }

  registerPeopleService(formData: TRegisterBodyRequest) {
    this.personRequest.registerPeopleRequest(formData).subscribe({
      next: (data: IRegisterPersonReturn) => {
        const today = new Date();
        const formattedToday = `${today
          .getDate()
          .toString()
          .padStart(2, '0')}/${(today.getMonth() + 1)
          .toString()
          .padStart(2, '0')}`;
        const formattedBirthDate = data.person.birthDate.substring(0, 5);
        if (formattedBirthDate === formattedToday) {
          this.toastr.success(
            `${data.message}.É incrível que você faça parte de nossa história`
          );
        } else {
          this.toastr.success(
            `Você tem ${data.age} anos e faltam ${data.daysUntilNextBirthday} dias para podermos comemorar o seu aniversário`
          );
        }
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error.message === 'Email already exists') {
            this.toastr.error(
              'Já existe um usuário cadastrado com este e-mail'!
            );
          }
        }
      },
    });
  }

  loginPeopleService(formData: TLoginBodyRequest) {
    this.personRequest.loginPeopleRequest(formData).subscribe({
      next: (data: ILoginPersonReturn) => {
        this.personSignal.set(data.person);
        localStorage.setItem('@TokenIBS', data.token);
        localStorage.setItem('@PersonId', data.person.id);
        this.toastr.success(`Seja bem-vindo,${data.person.name}`);
        this.router.navigateByUrl('/dashboard');
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error.message === 'Invalid email or password') {
            this.toastr.error('Senha ou e-mail inválidos');
          }
        }
      },
    });
  }

  logoutPeopleService() {
    this.personSignal.set(null);
    localStorage.removeItem('@TokenIBS');
    localStorage.removeItem('@PersonId');
    this.toastr.success('Deslogando...');
    this.router.navigateByUrl('/');
  }
}
