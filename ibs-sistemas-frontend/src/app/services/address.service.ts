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
  readonly personAddressesListSignal = signal<IAddress[]>([]);

  constructor(private addressRequest: AddressRequest) {
    this.addressRequest
      .getAddressesPersonRequest()
      ?.subscribe((data: IAddress[]) => {
        console.log(data);
        this.personAddressesListSignal.set(data);
      });
  }

  getPersonAddresses() {
    return this.personAddressesListSignal();
  }

  createAddressService(formData: TCreateAddressBodyRequest) {
    this.addressRequest
      .createAddressRequest(formData)
      ?.subscribe((data: IAddress) => {
        this.personAddressesListSignal.update((personAddressesList) => [
          ...personAddressesList,
          data,
        ]);
      });
  }

  updateAddressService(addressId: string, formData: TUpdateAddressBodyRequest) {
    this.addressRequest
      .updateAddressRequest(addressId, formData)
      ?.subscribe((data: IAddress) => {
        this.personAddressesListSignal.update((personAddressesList) =>
          personAddressesList.map((address) => {
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
        personAddressesList.filter((address) => address.id !== addressId)
      );
    });
  }
}
