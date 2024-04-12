import { Injectable } from '@angular/core';
import { PersonRequest } from '../api/person.request';
import { TRegisterBodyRequest } from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private personRequest: PersonRequest) {}

  registerPeopleService(formData: TRegisterBodyRequest) {
    this.personRequest.registerPeopleRequest(formData).subscribe((data) => {
      console.log(data);
      alert('Cadastro realizado com sucesso');
    });
  }
}
