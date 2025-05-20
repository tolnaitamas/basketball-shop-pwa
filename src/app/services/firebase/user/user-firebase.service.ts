import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  updatePassword,
  User,
  UserProfile,
} from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { RegisterUser } from '../../../shared/types/registeruser';
import { DbUser } from '../../../shared/types/dbUser';
import { Observable, switchMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserFirebaseService {
  currentUser$: Observable<User | null>;

  constructor(private firestore: Firestore, private auth: Auth) {
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

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = this.auth.currentUser;

    if (!user || !user.email) {
      return Promise.reject(new Error('Nem vagy bejelentkezve.'));
    }

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    try {
      // Újra hitelesítés a régi jelszóval
      await reauthenticateWithCredential(user, credential);
      // Jelszó módosítása az újra
      await updatePassword(user, newPassword);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getUserProfile(): Observable<UserProfile | null> {
    return this.currentUser$.pipe(
      switchMap((user) => {
        if (user) {
          const userDocRef = doc(this.firestore, `users/${user.uid}`);
          return docData(userDocRef) as Observable<UserProfile>;
        } else {
          return of(null);
        }
      })
    );
  }
}
