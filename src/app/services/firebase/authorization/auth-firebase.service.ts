import { Injectable } from '@angular/core';
import {
  Auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
  UserCredential,
  UserProfile,
} from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, switchMap, of, map } from 'rxjs';

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
}
