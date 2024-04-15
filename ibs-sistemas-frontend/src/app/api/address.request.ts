import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IAddress,
  TCreateAddressBodyRequest,
  TUpdateAddressBodyRequest,
} from '../interfaces/address.interface';

@Injectable({
  providedIn: 'root',
})
export class AddressRequest {
  constructor(private http: HttpClient) {}

  private BASE_URL = 'https://desafio-api-ibs-sistemas-backend.onrender.com';

  createAddressRequest(data: any) {
    const token = localStorage.getItem('@TokenIBS');

    if (token) {
      return this.http.post<any>(`${this.BASE_URL}/addresses`, data, {
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

    if (token && personId) {
      return this.http.get<IAddress[]>(
        `${this.BASE_URL}/people/${personId}/addresses`,
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
      return this.http.delete<any>(`${this.BASE_URL}/addresses/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      return null;
    }
  }
}
