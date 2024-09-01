import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../components/model/course.model';
import { Image } from '../components/model/image.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth-token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/admin/all/courses`, { headers: this.getHeaders() });
  }
  ///user/all/courses
  getAllCoursesUser(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/user/all/courses`, { headers: this.getHeaders() });
  }
//part of user

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/admin/get/course/${id}`, { headers: this.getHeaders() });
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.baseUrl}/admin/save`, course, { headers: this.getHeaders() });
  }

  // updateCourse(id: number, course: Course): Observable<Course> {
  //   return this.http.put<Course>(`${this.baseUrl}/admin/update/course/${id}`, course, { headers: this.getHeaders() });
  // }
  updateCourse(name: string, course: Course): Observable<Course> {
    if (!name) {
      console.error('ID du cours manquant pour la mise à jour');
      throw new Error('ID du cours manquant');
    }
    return this.http.put<Course>(`${this.baseUrl}/admin/update/course/${name}`, course, { headers: this.getHeaders() });
  }
  

  // deleteCourse(id?: number): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/admin/delete/course/${id}`, { headers: this.getHeaders() });
  // }
  deleteCourse(name: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/delete/course/${name}`, { headers: this.getHeaders() });
  }
  

  // getAllImages(): Observable<Image[]> {
  //   return this.http.get<Image[]>(`${this.baseUrl}/auth/api/images`);
  // }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admin/all/users`, { headers: this.getHeaders() });
  }

  getAllImages(): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.baseUrl}/auth/api/images`);
  }
  
}
