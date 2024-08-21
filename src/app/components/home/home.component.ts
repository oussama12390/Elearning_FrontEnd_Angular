import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userRole: string = ''; // Valeur par défaut
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
      this.router.navigate(['/login']);
    } 
   
    
  }
  // Méthode de déconnexion
  logout(): void {
    this.authService.logout(); // Appel de la méthode de déconnexion dans AuthService
    this.router.navigate(['/login']); // Rediriger vers la page de connexion
  }

}
