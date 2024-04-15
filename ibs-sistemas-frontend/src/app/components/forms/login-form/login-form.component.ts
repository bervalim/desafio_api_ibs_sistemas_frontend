import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PersonService } from '../../../services/person.service';
import { TLoginBodyRequest } from '../../../interfaces/person.interface';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  constructor(private personService: PersonService) {}

  loginForm = new FormGroup({
    email: new FormControl<string | null>(null, [Validators.required]),
    password: new FormControl<string | null>(null, [Validators.required]),
  });

  get errors() {
    return {
      email: this.loginForm.get('email')?.errors,
      password: this.loginForm.get('password')?.errors,
    };
  }

  submitLoginForm() {
    if (this.loginForm.status === 'VALID') {
      const data = this.loginForm.value as TLoginBodyRequest;
      this.personService.loginPeopleService(data);
      this.loginForm.reset();
    }
  }
}
