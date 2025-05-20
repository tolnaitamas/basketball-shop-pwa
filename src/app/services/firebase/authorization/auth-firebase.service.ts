import { Injectable } from '@angular/core';
import {
  Auth,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthFirebaseService {
  currentUser$: Observable<User | null>;

  constructor(private auth: Auth, private router: Router) {
    this.currentUser$ = new Observable((observer) => {
      onAuthStateChanged(this.auth, (user) => {
        observer.next(user);
      });
    });
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password).then(
      (userCredential) => {
        this.router.navigate(['/profile']);
        return userCredential;
      }
    );
  }

  logout(): Promise<void> {
    return this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  isLoggedIn(): Observable<boolean> {
    return this.currentUser$.pipe(map((user) => !!user));
  }

  async deleteCurrentUser() {
    const user = this.auth.currentUser;

    if (user) {
      try {
        await deleteUser(user);
        console.log('Felhasználó törölve az Authentication-ből.');
      } catch (error: any) {
        console.error('Hiba a törlés során:', error);

        if (error.code === 'auth/requires-recent-login') {
          alert('Újra kell jelentkezni a törléshez.');
        }
      }
    } else {
      console.warn('Nincs bejelentkezett felhasználó.');
    }
    this.router.navigate(['/main']);
  }
}
