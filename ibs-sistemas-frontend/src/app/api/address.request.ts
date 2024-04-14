import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IAddress,
  TCreateAddressBodyRequest,
} from '../interfaces/address..interface';

@Injectable({
  providedIn: 'root',
})
export class AddressRequest {
  constructor(private htpp: HttpClient) {}

  private BASE_URL = 'http://localhost:3000';

  createAddressRequest(data: TCreateAddressBodyRequest) {
    const token = localStorage.getItem('@TokenIBS');

    if (token) {
      return this.htpp.post<IAddress>(`${this.BASE_URL}/addresses`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      return null;
    }
  }
}
