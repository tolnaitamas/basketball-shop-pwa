import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { RegisterUser } from '../../../shared/types/registeruser';
import { DbUser } from '../../../shared/types/dbUser';

@Injectable({
  providedIn: 'root',
})
export class UserFirebaseService {
  constructor(private firestore: Firestore, private auth: Auth) {}

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
}
