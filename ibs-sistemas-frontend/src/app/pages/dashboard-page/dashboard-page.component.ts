import { Component } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  constructor(private personService: PersonService, private router: Router) {
    if (!this.person) this.router.navigateByUrl('/');
  }

  get person() {
    return this.personService.getPerson();
  }

  handleLogout() {
    return this.personService.logoutPeopleService();
  }
}
