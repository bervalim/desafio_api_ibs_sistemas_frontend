import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  registerForm = new FormControl({
    name: new FormControl(null),
    email: new FormControl(null),
    password: new FormControl(null),
    sex: new FormControl(null),
    birthDate: new FormControl(null),
    civilState: new FormControl(null),
  });
}
