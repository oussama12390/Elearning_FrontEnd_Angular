// src/app/services/course.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../components/model/course.model';
//import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
    private apiUrl = 'http://localhost:8080';
    //update and add and getByid

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth-token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);//to add an Authorization header
    //The "Authorization" header allows the server to verify that the request is being made by 
    //an authenticated user. The server checks the token to determine if the user is authorized to access the requested resource.
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/all/courses`, { headers: this.getHeaders() });
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/get/course/${id}`, { headers: this.getHeaders() });
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/admin/save`, course, { headers: this.getHeaders() });
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/admin/update/course/${id}`, course, { headers: this.getHeaders() });
  }

  deleteCourse(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/course/${id}`, { headers: this.getHeaders() });
  }

  assignUserToCourse(courseId: number, userId: number): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/${courseId}/user/${userId}`, {}, { headers: this.getHeaders() });
  }

  getCoursesByUser(userId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/user/${userId}`, { headers: this.getHeaders() });
  }

 
}
