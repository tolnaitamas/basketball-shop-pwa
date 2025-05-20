import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';
import { AuthFirebaseService } from '../../services/firebase/authorization/auth-firebase.service';

@Component({
  selector: 'app-login-page',
  imports: [
    FooterComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthFirebaseService
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.userForm.valid) {
      this.authService
        .login(this.userForm.value.email, this.userForm.value.password)
        .then(() => alert('Sikeres bejelentkezés!'))
        .catch((error) => alert(`Hiba: ${error.message}`));
    }
  }
}
