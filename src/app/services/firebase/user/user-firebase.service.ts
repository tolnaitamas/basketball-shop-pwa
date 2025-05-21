import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  User,
  UserProfile,
} from '@angular/fire/auth';
import {
  Firestore,
  deleteDoc,
  doc,
  docData,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { RegisterUser } from '../../../shared/types/registeruser';
import { Observable, switchMap, of } from 'rxjs';
import { AuthFirebaseService } from '../authorization/auth-firebase.service';
import { FormGroup } from '@angular/forms';
import { DbUser } from '../../../shared/types/dbuser';

@Injectable({
  providedIn: 'root',
})
export class UserFirebaseService {
  currentUser$: Observable<User | null>;

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private authService: AuthFirebaseService
  ) {
    this.currentUser$ = new Observable((observer) => {
      onAuthStateChanged(this.auth, (user) => {
        observer.next(user);
      });
    });
  }

  async registerUser(formData: RegisterUser): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        formData.email,
        formData.password
      );

      const dbUser: DbUser = {
        email: formData.email,
        phone: formData.phone,
        name: formData.name,
        country: formData.country,
        zip: formData.zip,
        city: formData.city,
        address: formData.address,
      };

      const userRef = doc(this.firestore, `users/${userCredential.user.uid}`);
      await setDoc(userRef, dbUser);

      console.log('Felhasználó sikeresen regisztrálva és adatbázisba mentve.');
    } catch (error) {
      console.error('Hiba a regisztráció során:', error);
      throw error;
    }
  }

  async updateUser(formData: FormGroup): Promise<void> {
    const user = this.auth.currentUser;

    if (!user || !user.email) {
      return Promise.reject(new Error('Nem vagy bejelentkezve.'));
    }

    const currentPassword = formData.get('currentPassword')?.value;
    const newPassword = formData.get('newPassword')?.value;
    const newEmail = formData.get('email')?.value;

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    try {
      await reauthenticateWithCredential(user, credential);

      if (user.email !== newEmail) {
        await updateEmail(user, newEmail);
      }

      if (newPassword && newPassword.length >= 6) {
        await updatePassword(user, newPassword);
      }

      const userRef = doc(this.firestore, 'users', user.uid);
      await updateDoc(userRef, {
        email: newEmail,
        phone: formData.get('phone')?.value,
        name: formData.get('name')?.value,
        country: formData.get('country')?.value,
        zip: formData.get('zip')?.value,
        city: formData.get('city')?.value,
        address: formData.get('address')?.value,
      });

      console.log('Felhasználó adatai frissítve.');
    } catch (error) {
      console.error('Hiba a frissítés során:', error);
      throw error;
    }
  }

  getUserProfile(): Observable<DbUser | null> {
    return this.currentUser$.pipe(
      switchMap((user) => {
        if (user) {
          const userDocRef = doc(this.firestore, `users/${user.uid}`);
          return docData(userDocRef) as Observable<DbUser>;
        } else {
          return of(null);
        }
      })
    );
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      const userRef = doc(this.firestore, 'users', userId);
      await deleteDoc(userRef);
      await this.authService.deleteCurrentUser();
      console.log('Felhasználó sikeresen törölve.');
      alert('Felhasználó sikeresen törölve.');
    } catch (error) {
      console.error('Hiba a felhasználó törlése során:', error);
      throw error;
    }
  }
}
