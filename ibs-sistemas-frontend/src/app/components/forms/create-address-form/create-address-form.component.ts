import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddressService } from '../../../services/address.service';
import { TCreateAddressBodyRequest } from '../../../interfaces/address.interface';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-address-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatCommonModule],
  templateUrl: './create-address-form.component.html',
  styleUrl: './create-address-form.component.scss',
})
export class CreateAddressFormComponent {
  constructor(private addressService: AddressService) {}

  createAddressForm = new FormGroup({
    zipCode: new FormControl<string | null>(null),
    address: new FormControl<string | null>(null),
    number: new FormControl<number | null>(null),
    complement: new FormControl<string | null>(null),
    neighborhood: new FormControl<string | null>(null),
    state: new FormControl<string | null>(null),
    city: new FormControl<string | null>(null),
  });

  handleCloseModal() {
    return this.addressService.closeCreateAddressModal();
  }

  submit() {
    const data = this.createAddressForm.value as TCreateAddressBodyRequest;
    this.addressService.createAddressService(data);
    this.createAddressForm.reset();
  }
}
