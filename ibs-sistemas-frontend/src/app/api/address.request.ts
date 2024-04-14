import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IAddress,
  TCreateAddressBodyRequest,
  TUpdateAddressBodyRequest,
} from '../interfaces/address..interface';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressRequest {
  constructor(private http: HttpClient) {}

  private BASE_URL = 'http://localhost:3000';

  createAddressRequest(data: TCreateAddressBodyRequest) {
    const token = localStorage.getItem('@TokenIBS');

    if (token) {
      return this.http.post<IAddress>(`${this.BASE_URL}/addresses`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      return null;
    }
  }

  getAddressesPersonRequest() {
    const token = localStorage.getItem('@TokenIBS');
    const personId = localStorage.getItem('@PersonId');

    if (token) {
      return this.http.get<IAddress[]>(`${this.BASE_URL}/people/${personId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      return null;
    }
  }

  updateAddressRequest(addressId: string, data: TUpdateAddressBodyRequest) {
    const token = localStorage.getItem('@TokenIBS');

    if (token) {
      return this.http.patch<IAddress>(
        `${this.BASE_URL}/addresses/${addressId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      return null;
    }
  }

  deleteAddressRequest(addressId: string) {
    const token = localStorage.getItem('@TokenIBS');

    if (token) {
      return this.http.delete<void>(`${this.BASE_URL}/addresses/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      return null;
    }
  }
}
