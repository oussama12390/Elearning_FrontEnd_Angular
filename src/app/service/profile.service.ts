import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../components/model/users.model'; // Import the User model

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://localhost:8080/admin'; // Spring Boot backend URL

  constructor(private http: HttpClient) {}

  // Helper method to retrieve Authorization headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth-token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Get user profile by ID
  getUserById(id: number): Observable<Users> { // Use the User model for the response type
    return this.http.get<Users>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Update user profile by ID
  updateProfile(id: number, userData: Users): Observable<Users> { // Use Partial<User> to make properties optional
    return this.http.put<Users>(`${this.apiUrl}/update-profile/${id}`, userData, { headers: this.getHeaders() });
  }

  // Delete user profile by ID
  deleteUser(id: number): Observable<void> { // Return type is void because the delete endpoint might not return data
    return this.http.delete<void>(`${this.apiUrl}/delete-user/${id}`, { headers: this.getHeaders() });
  }
}
