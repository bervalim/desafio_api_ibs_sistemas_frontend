import { Component } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { PrivateRoutesComponent } from '../../components/private-routes/private-routes.component';
import { CreateAddressFormComponent } from '../../components/forms/create-address-form/create-address-form.component';
import { AddressService } from '../../services/address.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, PrivateRoutesComponent, CreateAddressFormComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  constructor(
    private personService: PersonService,
    private addressService: AddressService
  ) {}

  get person() {
    return this.personService.getPerson();
  }

  get personAddressList() {
    return this.addressService.getPersonAddresses();
  }

  handleDeleteAddress(addressId: string) {
    return this.addressService.deleteAddressService(addressId);
  }

  handleLogout() {
    return this.personService.logoutPeopleService();
  }
}
