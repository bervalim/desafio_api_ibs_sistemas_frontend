import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PersonRequest } from './api/person.request';
import { PersonService } from './services/person.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatIconModule],
  providers: [PersonRequest, PersonService], // Serviços utilizados pelo componente
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // Corrigido para 'styleUrls' e definido como um array
})
export class AppComponent {
  title = 'ibs-sistemas-frontend';
}
