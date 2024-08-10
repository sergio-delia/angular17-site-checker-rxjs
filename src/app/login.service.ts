import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { onAuthStateChanged, UserCredential } from 'firebase/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUser: User | null = null;

  constructor(private auth: Auth, private router: Router) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.currentUser = user;
        this.router.navigate(['/dashboard']); // Reindirizza se l'utente è loggato
      } else {
        this.currentUser = null;
      }
    });

  }


  login(email:string, password:string):Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password))
  }

  logout(): void {
    signOut(this.auth).then(() => {
      // Reindirizza l'utente alla pagina di login dopo il logout
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.error('Errore durante il logout:', error);
    });
  }

}
