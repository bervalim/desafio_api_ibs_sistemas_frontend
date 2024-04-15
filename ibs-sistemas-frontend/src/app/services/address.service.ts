import { Injectable, signal } from '@angular/core';
import { AddressRequest } from '../api/address.request';
import {
  IAddress,
  TCreateAddressBodyRequest,
  TUpdateAddressBodyRequest,
} from '../interfaces/address.interface';
import { ToastrService } from 'ngx-toastr';
import { ViacepRequest } from '../api/viacep.request';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  readonly personAddressesListSignal = signal<IAddress[]>([]);
  readonly editingAddressSignal = signal<IAddress | null>(null);
  readonly createAddressModalSignal = signal(false);

  constructor(
    private addressRequest: AddressRequest,
    private toastr: ToastrService
  ) {
    this.addressRequest
      .getAddressesPersonRequest()
      ?.subscribe((data: IAddress[]) => {
        this.personAddressesListSignal.set(data);
      });
  }

  getPersonAddresses() {
    return this.personAddressesListSignal();
  }

  getCreateAddressModalSignal() {
    return this.createAddressModalSignal();
  }

  getEditingAdress() {
    return this.editingAddressSignal();
  }

  setEditingAddress(address: IAddress | null) {
    return this.editingAddressSignal.set(address);
  }

  setCreateAddressModal() {
    return this.createAddressModalSignal.set(true);
  }

  closeCreateAddressModal() {
    return this.createAddressModalSignal.set(false);
  }

  createAddressService(formData: TCreateAddressBodyRequest) {
    this.addressRequest.createAddressRequest(formData)?.subscribe({
      next: (data: IAddress) => {
        this.personAddressesListSignal.update((personAddressesList) => [
          ...personAddressesList,
          data,
        ]);
        this.toastr.success('Endereço criado com sucesso!');
        this.closeCreateAddressModal();
      },
      error: () => {
        this.toastr.error('Erro ao criar endereço.');
      },
    });
  }

  updateAddressService(formData: TUpdateAddressBodyRequest) {
    const editingAddress = this.editingAddressSignal();
    if (editingAddress) {
      const id = editingAddress.id;
      this.addressRequest.updateAddressRequest(id, formData)?.subscribe({
        next: (data: IAddress) => {
          this.personAddressesListSignal.update((personAddressesList) =>
            personAddressesList.map((address) => {
              if (address.id === id) {
                return data;
              } else {
                return address;
              }
            })
          );
          this.toastr.success('Endereço atualizado com sucesso!');
        },
        error: () => {
          this.toastr.error('Erro ao atualizar o endereço.');
        },
      });
    }
  }

  deleteAddressService(addressId: string) {
    this.addressRequest.deleteAddressRequest(addressId)?.subscribe({
      next: () => {
        this.personAddressesListSignal.update((personAddressesList) =>
          personAddressesList.filter((address) => address.id !== addressId)
        );
        this.toastr.success('Endereço deletado com sucesso!');
      },
      error: () => {
        this.toastr.error('Erro ao deletar o endereço.');
      },
    });
  }
}
