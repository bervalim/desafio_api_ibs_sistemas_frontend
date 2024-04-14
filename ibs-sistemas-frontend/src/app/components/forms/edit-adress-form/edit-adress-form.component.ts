import { Component } from '@angular/core';
import { AddressService } from '../../../services/address.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TUpdateAddressBodyRequest } from '../../../interfaces/address.interface';

@Component({
  selector: 'app-edit-adress-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-adress-form.component.html',
  styleUrl: './edit-adress-form.component.scss',
})
export class EditAdressFormComponent {
  constructor(private addressService: AddressService) {}

  get editingAddress() {
    return this.addressService.getEditingAdress();
  }

  editAddressForm = new FormGroup({
    zipCode: new FormControl<string | null>(
      this.editingAddress?.zipCode as string
    ),
    address: new FormControl<string | null>(
      this.editingAddress?.address as string
    ),
    number: new FormControl<number | null>(
      this.editingAddress?.number as number
    ),
    complement: new FormControl<string | null>(
      this.editingAddress?.complement as string
    ),
    neighborhood: new FormControl<string | null>(
      this.editingAddress?.neighborhood as string
    ),
    state: new FormControl<string | null>(this.editingAddress?.state as string),
    city: new FormControl<string | null>(this.editingAddress?.city as string),
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
