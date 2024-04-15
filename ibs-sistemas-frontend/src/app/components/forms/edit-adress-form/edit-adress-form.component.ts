import { Component, effect } from '@angular/core';
import { AddressService } from '../../../services/address.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TUpdateAddressBodyRequest } from '../../../interfaces/address.interface';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-adress-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatCommonModule],
  templateUrl: './edit-adress-form.component.html',
  styleUrl: './edit-adress-form.component.scss',
})
export class EditAdressFormComponent {
  constructor(private addressService: AddressService) {
    effect(() => {
      this.editAddressForm.setValue({
        zipCode: this.editingAddress?.zipCode as string,
        address: this.editingAddress?.address as string,
        number: this.editingAddress?.number as number,
        complement: this.editingAddress?.complement as string,
        neighborhood: this.editingAddress?.neighborhood as string,
        state: this.editingAddress?.state as string,
        city: this.editingAddress?.city as string,
      });
    });
  }

  get editingAddress() {
    return this.addressService.getEditingAdress();
  }

  editAddressForm = new FormGroup({
    zipCode: new FormControl<string | null>(null),
    address: new FormControl<string | null>(null),
    number: new FormControl<number | null>(null),
    complement: new FormControl<string | null>(null),
    neighborhood: new FormControl<string | null>(null),
    state: new FormControl<string | null>(null),
    city: new FormControl<string | null>(null),
  });

  setEditingAddressToNull() {
    this.addressService.setEditingAddress(null);
  }

  submit() {
    const data = this.editAddressForm.value as TUpdateAddressBodyRequest;
    this.addressService.updateAddressService(data);
    this.addressService.setEditingAddress(null);
  }
}
