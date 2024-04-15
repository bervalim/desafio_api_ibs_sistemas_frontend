import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddressService } from '../../../services/address.service';
import { TCreateAddressBodyRequest } from '../../../interfaces/address.interface';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ViacepRequest } from '../../../api/viacep.request';

@Component({
  selector: 'app-create-address-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatCommonModule],
  templateUrl: './create-address-form.component.html',
  styleUrl: './create-address-form.component.scss',
})
export class CreateAddressFormComponent {
  constructor(
    private addressService: AddressService,
    private viaCepRequest: ViacepRequest
  ) {
    this.createAddressForm.get('zipCode')?.valueChanges.subscribe((zipCode) => {
      if (zipCode && this.createAddressForm.get('zipCode')?.valid) {
        this.viaCepRequest
          .findAddressByZipCode(zipCode)
          .subscribe((address: any) => {
            this.createAddressForm.patchValue({
              address: address.logradouro,
              neighborhood: address.bairro,
              state: address.uf,
              city: address.localidade,
            });
          });
      }
    });
  }

  createAddressForm = new FormGroup({
    zipCode: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern(/^\d{5}-?\d{3}$/),
    ]),
    address: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(200),
    ]),
    number: new FormControl<number | null>(null, [
      Validators.required,
      Validators.maxLength(8),
    ]),
    complement: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(40),
    ]),
    neighborhood: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(20),
    ]),
    state: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern(
        /^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$/i
      ),
    ]),
    city: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(50),
    ]),
  });

  handleCloseModal() {
    return this.addressService.closeCreateAddressModal();
  }

  get errors() {
    return {
      zipCode: this.createAddressForm.get('zipCode')?.errors,
      address: this.createAddressForm.get('address')?.errors,
      number: this.createAddressForm.get('number')?.errors,
      complement: this.createAddressForm.get('complement')?.errors,
      neighborhood: this.createAddressForm.get('neighborhood')?.errors,
      state: this.createAddressForm.get('state')?.errors,
      city: this.createAddressForm.get('city')?.errors,
    };
  }

  submit() {
    if (this.createAddressForm.status === 'VALID') {
      const data = this.createAddressForm.value as TCreateAddressBodyRequest;
      this.addressService.createAddressService(data);
      this.createAddressForm.reset();
    }
  }
}
