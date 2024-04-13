import { Component } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-private-routes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './private-routes.component.html',
  styleUrl: './private-routes.component.scss',
})
export class PrivateRoutesComponent {
  constructor(private personService: PersonService, private router: Router) {
    if (!this.person) this.router.navigateByUrl('/');
  }

  get person() {
    return this.personService.getPerson();
  }
}
