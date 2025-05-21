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
import { AuthFirebaseService } from '../../services/firebase/authorization/auth-firebase.service';
import { UserFirebaseService } from '../../services/firebase/user/user-firebase.service';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DbUser } from '../../shared/types/dbuser';
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
    private userService: UserFirebaseService,
    private auth: Auth,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      name: ['', Validators.required],
      country: ['hu', Validators.required],
      zip: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.userService.getUserProfile().subscribe((user: DbUser | null) => {
      if (user) {
        this.registerForm = this.fb.group({
          email: [user.email, [Validators.required, Validators.email]],
          currentPassword: ['', [Validators.required, Validators.minLength(6)]],
          newPassword: ['', [Validators.required, Validators.minLength(6)]],
          phone: [
            user.phone,
            [Validators.required, Validators.pattern('^[0-9]{9}$')],
          ],
          name: [user.name, Validators.required],
          country: ['hu', Validators.required],
          zip: [user.zip, Validators.required],
          city: [user.city, Validators.required],
          address: [user.address, Validators.required],
        });
      }
    });
  }

  update(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      alert('Hibás vagy hiányos adatok. Kérlek, ellenőrizd az űrlapot!');
      return;
    }

    this.userService.updateUser(this.registerForm);

    console.log('Sikeresen frissítve!');
    this.router.navigate(['/profile']);
  }

  logout() {
    this.authService.logout();
  }

  async delete() {
    await this.userService.deleteUser(this.getCurrentUserId());
    await this.authService.deleteCurrentUser();

    this.router.navigate(['/main']);
  }

  getCurrentUserId(): string {
    const user = this.auth.currentUser;
    return user ? user.uid : '';
  }
}
