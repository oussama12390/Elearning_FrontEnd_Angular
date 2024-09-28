import { Injectable } from '@angular/core';
const USER_KEY = 'auth-user';
const TOKEN = 'ecom-token';
const USER = 'ecom-user';
@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  /*
  constructor() { }
  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public saveUser(user: void): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(TOKEN, JSON.stringify(user));
  }
   */ 
}
