import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../components/model/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = 'http://localhost:8080';  // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth-token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/admin/all/courses`, { headers: this.getHeaders() });
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

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admin/users`, { headers: this.getHeaders() });
  }
}
