import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RegisterUser } from '../../shared/types/registeruser';
import { AuthFirebaseService } from '../../services/firebase/authorization/auth-firebase.service';
import { UserFirebaseService } from '../../services/firebase/user/user-firebase.service';
@Component({
  selector: 'app-profile-page',
  imports: [
    FooterComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthFirebaseService,
    private userService: UserFirebaseService
  ) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
        name: ['', Validators.required],
        country: ['hu', Validators.required],
        zip: ['', Validators.required],
        city: ['', Validators.required],
        address: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit() {
    this.userService.getUserProfile().subscribe((user) => {
      if (user) {
        this.registerForm = this.fb.group(
          {
            email: [user['email'], [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]],
            phone: [
              user['phone'],
              [Validators.required, Validators.pattern('^[0-9]{9}$')],
            ],
            name: [user['name'], Validators.required],
            country: ['hu', Validators.required],
            zip: [user['zip'], Validators.required],
            city: [user['city'], Validators.required],
            address: [user['address'], Validators.required],
          },
          { validators: this.passwordMatchValidator }
        );
      }
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      alert('Hibás vagy hiányos adatok. Kérlek, ellenőrizd az űrlapot!');
      return;
    }

    const formData: RegisterUser = this.registerForm.value;
    console.log('Regisztrációs adatok:', formData);
  }

  logout() {
    this.authService.logout();
  }
  delete() {
    this.authService.logout();
  }
}
