import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';



const BASE_URL = ['http://localhost:8080/']

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  router: any;
 /* isAuthenticated() {
    throw new Error('Method not implemented.');
  }
    */
  
  private token: string | null = localStorage.getItem('JWT');
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
 
  
  ) { }

  signup(signupRequest: any): Observable<any> {
    return this.http.post(BASE_URL + "auth/signup", signupRequest)
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + "auth/signin", loginRequest)
  }


  private createAuthorizationHeader() {
    const jwtToken = localStorage.getItem('JWT');
    if (jwtToken) {
      return new HttpHeaders().set(
        'Authorization', 'Bearer ' + jwtToken
      )
    } else {
      console.log("JWT token not found in the Local Storage");
    }
    return null;
  }



//


/*
isAuthenticated(): boolean {
  const token = localStorage.getItem('token');

  // Vérifier si le token existe
  if (!token) {
    return false;
  }

  // Vérifier si le token est expiré
  if (this.jwtHelper.isTokenExpired(token)) {
    return false;
  }

  // Décoder le token pour extraire les informations
  try {
    const decodedToken: any = jwt_decode(token);

    // Vérifier des informations spécifiques dans le token, comme l'issuer ou l'audience
    if (decodedToken.iss !== 'expected_issuer' || decodedToken.aud !== 'expected_audience') {
      return false;
    }

    // Vous pouvez également vérifier d'autres champs du token ici si nécessaire
    return true;

  } catch (error) {
    console.error('Invalid token:', error);
    return false;
  }
}
  */
isAuthenticated(): boolean {
  const token = localStorage.getItem('JWT'); // Utilisation de la clé correcte
  if (!token) {
    return false;
  }
  
  if (this.jwtHelper.isTokenExpired(token)) {
    return false;
  }

  return true;
}
/*
 getUserRole(): string | null {
    const token = localStorage.getItem('JWT');
    if (token) {
      try {
        const decoded: any = jwt_decode(token);
        return decoded.role || null; // Assurez-vous que 'role' est la clé correcte dans le payload du token
      } catch (error) {
        console.error('Token invalid or decoding failed', error);
        return null;
      }
    }
    return null;
  }
*/


// Méthode pour décoder le token et obtenir le rôle





logout(): void {
  localStorage.removeItem('JWT'); // Suppression du token
 
}

storeToken(token: string): void {
  localStorage.setItem('token', token);
}
 
}
function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}

