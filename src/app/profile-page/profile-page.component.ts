import { Component } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';
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
import { RegisterUser } from '../shared/types/registeruser';
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

  newUser: RegisterUser = {
    email: 'example@example.com',
    password: '',
    confirmPassword: '',
    phone: '123456789',
    name: 'Kiss Péter',
    country: 'Magyarország',
    zip: '1051',
    city: 'Budapest',
    address: 'Bajcsy-Zsilinszky út 1.',
  };

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        email: [this.newUser.email, [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        phone: [
          this.newUser.phone,
          [Validators.required, Validators.pattern('^[0-9]{9}$')],
        ],
        name: [this.newUser.name, Validators.required],
        country: ['hu', Validators.required],
        zip: [this.newUser.zip, Validators.required],
        city: [this.newUser.city, Validators.required],
        address: [this.newUser.address, Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
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
}
