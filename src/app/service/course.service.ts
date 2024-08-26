

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../components/model/course.model';
//import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = 'http://localhost:8080';  // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth-token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);//to add an Authorization header
    //The "Authorization" header allows the server to verify that the request is being made by 
    //an authenticated user. The server checks the token to determine if the user is authorized to access the requested resource.
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/user/all/courses`);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/admin/get/course/${id}`, { headers: this.getHeaders() });
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.baseUrl}/admin/save`, course, { headers: this.getHeaders() });
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/admin/update/course/${id}`, course, { headers: this.getHeaders() });
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/delete/course/${id}`, { headers: this.getHeaders() });
  }

  assignUserToCourse(courseId: number, userId: number): Observable<Course> {
    return this.http.post<Course>(`${this.baseUrl}/${courseId}/user/${userId}`, {}, { headers: this.getHeaders() });
  }

  getCoursesByUser(userId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/user/${userId}`, { headers: this.getHeaders() });
  }
}
