// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080'; // Base URL for API
  private tokenKey = 'auth-token';
  private userRoleKey = 'user-role';
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.loggedIn.next(!!this.getToken());
  }

  register(user: any) {
    return this.http.post(`${this.baseUrl}/auth/signup`, user);
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/auth/signin`, credentials).subscribe(
      (response) => {
        this.setToken(response.token);
        const role = this.getRoleFromToken(response.token);
        this.setUserRole(role);
        this.loggedIn.next(true);
        this.router.navigateByUrl('/home');
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }

  logout() {
    this.clearToken();
    this.loggedIn.next(false);
    this.router.navigateByUrl('/login');
  }

 
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userRoleKey);
  }

  getRoleFromToken(token: string): string {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  }

  // getUserRole(): string | null {
  //   return localStorage.getItem(this.userRoleKey);
  // }

  private setUserRole(role: string): void {
    localStorage.setItem(this.userRoleKey, role);
  }

  isLoggedIn(): BehaviorSubject<boolean> {
    return this.loggedIn;
  }




  // src/app/services/auth.service.ts
getUserRole(): string | null {
  // Ensure this method returns a synchronous value
  return localStorage.getItem(this.userRoleKey);
}
/*
isAuthenticated(): boolean {
  // Ensure this method returns a synchronous value
  return !!this.getToken();
}
  */
isAuthenticated(): boolean {
  const token = this.getToken();
  if (token) {
    // Optionally, you could verify the token's validity here
    return true;
  }
  return false;
}
}
