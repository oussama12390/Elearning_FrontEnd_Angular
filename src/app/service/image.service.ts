// src/app/image.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl = 'http://localhost:8080/admin/image';

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('imageFile', file, file.name);
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  getImage(imageName: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/get/${imageName}`, { responseType: 'blob' });
  }
}
