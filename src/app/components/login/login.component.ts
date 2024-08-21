import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../service/auth.service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private location: LocationStrategy

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
   }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    })
  }
/*
  login() {
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe((response) => {
      console.log(response);
     if (response && response.token) {  // Par exemple, si le token est sous la clé 'token'
      const jwtToken = response.token;
      localStorage.setItem('JWT', jwtToken);
      this.router.navigate(['/home']);
    } else {
      alert('Échec de la connexion : jeton JWT manquant ou invalide.');
    }
    
    });
  }
*/
login() {
  console.log(this.loginForm.value);
  this.service.login(this.loginForm.value).subscribe(
    (response) => {
      console.log(response);
      if (response && response.token) { // Vérification de l'existence du token
        const jwtToken = response.token;
        localStorage.setItem('JWT', jwtToken); // Stockage du token
        this.router.navigate(['/home']); // Redirection vers la page d'accueil
      } else {
        alert('Échec de la connexion : jeton JWT manquant ou invalide.');
      }
    },
    (error) => {
      console.error('Erreur de connexion:', error);
      alert('Échec de la connexion.');
    }
  );
}

  

}