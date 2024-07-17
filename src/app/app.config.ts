import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'site-checker-acb0f',
        appId: '1:424586472592:web:7e8b03f03daf329001bc15',
        storageBucket: 'site-checker-acb0f.appspot.com',
        apiKey: 'AIzaSyDeVPREzn_F1KsnLEHMBzAndD4mCy0Tuu0',
        authDomain: 'site-checker-acb0f.firebaseapp.com',
        messagingSenderId: '424586472592',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
