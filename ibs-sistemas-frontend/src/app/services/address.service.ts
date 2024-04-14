import { Injectable, signal } from '@angular/core';
import { AddressRequest } from '../api/address.request';
import {
  IAddress,
  TCreateAddressBodyRequest,
  TPersonAddress,
  TPersonAddresses,
  TUpdateAddressBodyRequest,
} from '../interfaces/address.interface';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  readonly personAddressesListSignal = signal<any>([]);

  constructor(private addressRequest: AddressRequest) {
    this.addressRequest.getAddressesPersonRequest()?.subscribe((data) => {
      this.personAddressesListSignal.set(data.addresses);
    });
  }

  getPersonAddresses() {
    return this.personAddressesListSignal();
  }

  createAddressService(formData: any) {
    this.addressRequest.createAddressRequest(formData)?.subscribe((data) => {
      this.personAddressesListSignal.update((personAddressesList) => [
        ...personAddressesList,
        data,
      ]);
    });
  }

  updateAddressService(addressId: string, formData: TUpdateAddressBodyRequest) {
    this.addressRequest
      .updateAddressRequest(addressId, formData)
      ?.subscribe((data) => {
        this.personAddressesListSignal.update((personAddressesList) =>
          personAddressesList.map((address: any) => {
            if (address.id === addressId) {
              return data;
            } else {
              return address;
            }
          })
        );
      });
  }

  deleteAddressService(addressId: string) {
    this.addressRequest.deleteAddressRequest(addressId)?.subscribe(() => {
      this.personAddressesListSignal.update((personAddressesList) =>
        personAddressesList.filter((address: any) => address.id !== addressId)
      );
    });
  }
}
