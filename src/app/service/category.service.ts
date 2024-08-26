import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../components/model/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/admin/categories';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth-token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
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

  updateCategory(id: number, category: Category): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/update/${id}`, category, { headers: this.getHeaders() });
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/categories/${id}`);
  }
  
}
