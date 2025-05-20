import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap, map } from 'rxjs';
import { AuthFirebaseService } from '../../services/firebase/authorization/auth-firebase.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthFirebaseService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    tap((loggedIn) => {
      if (!loggedIn) {
        alert('Nincs jogosultság! Kérjük, jelentkezz be.');
        router.navigate(['/login']);
      }
    }),
    map((loggedIn) => loggedIn)
  );
};
