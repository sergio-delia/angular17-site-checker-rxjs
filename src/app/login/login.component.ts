import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User, UserCredential } from 'firebase/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router){}

  loginForm = {
    email: '',
    password: ''
  }

  user: User | null = this.loginService.currentUser;
  errorMessage: string = '';  // Proprietà per memorizzare i messaggi di errore

  login(){
    this.loginService.login(this.loginForm.email, this.loginForm.password).subscribe({
      next: (user: User) => {
        console.log('Login successful');
        this.user = user
      },
      error: (err) => {
        console.error('Login failed', err)
        this.errorMessage = 'Login fallito. Controlla di aver inserito le credenziali corrette e riprova.';  // Imposta il messaggio di errore
      }
    })
  }

  logout(){
    this.loginService.logout()
    this.user = null;
  }

  get_current_user(){
    return !!this.user
  }

}
