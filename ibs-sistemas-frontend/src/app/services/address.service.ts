import { Injectable, signal } from '@angular/core';
import { AddressRequest } from '../api/address.request';
import {
  IAddress,
  TCreateAddressBodyRequest,
  TUpdateAddressBodyRequest,
} from '../interfaces/address.interface';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  readonly personAddressesListSignal = signal<IAddress[]>([]);
  readonly editingAddressSignal = signal<IAddress | null>(null);

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

  getEditingAdress() {
    return this.editingAddressSignal();
  }

  setEditingAddress(address: IAddress | null) {
    return this.editingAddressSignal.set(address);
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

  updateAddressService(formData: TUpdateAddressBodyRequest) {
    const editingAddress = this.editingAddressSignal();
    if (editingAddress) {
      const id = editingAddress?.id;
      this.addressRequest
        .updateAddressRequest(id, formData)
        ?.subscribe((data: IAddress) => {
          this.personAddressesListSignal.update((personAddressesList) =>
            personAddressesList.map((address) => {
              if (address.id === id) {
                return data;
              } else {
                return address;
              }
            })
          );
        });
    }
  }

  deleteAddressService(addressId: string) {
    this.addressRequest.deleteAddressRequest(addressId)?.subscribe(() => {
      this.personAddressesListSignal.update((personAddressesList) =>
        personAddressesList.filter((address) => address.id !== addressId)
      );
    });
  }
}
