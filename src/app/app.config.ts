import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { firebaseConfig } from '../../environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    provideFirebaseApp(() =>
      initializeApp(firebaseConfig)
    ),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideAnimationsAsync(),
  ],
};
