import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IViaCepResponse } from '../interfaces/viacep.interface';

@Injectable({
  providedIn: 'root',
})
export class ViacepRequest {
  constructor(private http: HttpClient) {}

  private BASE_URL = 'https://viacep.com.br/ws';

  findAddressByZipCode(zipCode: string) {
    return this.http.get<IViaCepResponse>(`${this.BASE_URL}/${zipCode}/json`);
  }
}
