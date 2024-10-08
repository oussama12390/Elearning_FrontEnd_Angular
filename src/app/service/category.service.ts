import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../components/model/category.model';
import { Image } from '../components/model/image.model';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/admin/categories';
  private api="http://localhost:8080/user/categories/all"
  private apiv2="http://localhost:8080"

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth-token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);//to add an Authorization header
    //The "Authorization" header allows the server to verify that the request is being made by 
    //an authenticated user. The server checks the token to determine if the user is authorized to access the requested resource.
  }
  

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/get/${id}`, { headers: this.getHeaders() });
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/add`, category, { headers: this.getHeaders() });
  }

  updateCategory(name: string, category: Category): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/update/${name}`, category, { headers: this.getHeaders() });
  }

  deleteCategory(name: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${name}`, { headers: this.getHeaders() });
}


getAllCategoriesWithUser(): Observable<Category[]> {
  return this.http.get<Category[]>(this.api, { headers: this.getHeaders() });
}
getAllImages(): Observable<Image[]> {
  return this.http.get<Image[]>(`${this.apiv2}/auth/api/images`);
}

///user/categories/all
  
}
