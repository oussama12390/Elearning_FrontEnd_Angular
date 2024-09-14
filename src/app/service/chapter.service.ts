import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chapter } from '../components/model/chapter.model';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  private baseUrl = 'http://localhost:8080/admin'; // URL de base pour vos endpoints
  

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth-token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);//to add an Authorization header
    //The "Authorization" header allows the server to verify that the request is being made by 
    //an authenticated user. The server checks the token to determine if the user is authorized to access the requested resource.
  }

  createChapter(chapter: Chapter): Observable<Chapter> {
    return this.http.post<Chapter>(`${this.baseUrl}/add/chapters`, chapter,{ headers: this.getHeaders() });
  }

  getChaptersByCourseId(courseId: number): Observable<Chapter[]> {
    return this.http.get<Chapter[]>(`${this.baseUrl}/get/chaptersByIdCourse/${courseId}`,{ headers: this.getHeaders() });
  }

  getChapterById(id: number): Observable<Chapter> {
    return this.http.get<Chapter>(`${this.baseUrl}/get/chaptersById/${id}`,{ headers: this.getHeaders() });
  }

  updateChapter(name: string, chapter: Chapter): Observable<Chapter> {
    return this.http.put<Chapter>(`${this.baseUrl}/update/chapterByName/${name}`, chapter,{ headers: this.getHeaders() });
  }

  deleteChapter(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteById/${id}`,{ headers: this.getHeaders() });
  }
  //admin/getAllChapters
  getAllChapters(): Observable<Chapter[]> {
    return this.http.get<Chapter[]>(`${this.baseUrl}/getAllChapters`,{ headers: this.getHeaders() });
  }
}
