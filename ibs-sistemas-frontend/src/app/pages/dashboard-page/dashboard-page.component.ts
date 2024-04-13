import { Component } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { PrivateRoutesComponent } from '../../components/private-routes/private-routes.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [PrivateRoutesComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  constructor(private personService: PersonService) {}

  get person() {
    return this.personService.getPerson();
  }

  handleLogout() {
    return this.personService.logoutPeopleService();
  }
}
