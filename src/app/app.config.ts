import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }), provideFirebaseApp(() => initializeApp({ projectId: "basketball-shop-pwa", appId: "1:65663420889:web:b4120b354d8ea0a21bb1c8", storageBucket: "basketball-shop-pwa.firebasestorage.app", apiKey: "AIzaSyCnNd3sqK5yIkZtPa_RLEK3SgL94OQ28RA", authDomain: "basketball-shop-pwa.firebaseapp.com", messagingSenderId: "65663420889" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
};
