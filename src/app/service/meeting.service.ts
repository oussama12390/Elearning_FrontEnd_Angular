import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private apiUrl = 'http://localhost:8080/admin/meetings'; // Replace with your backend URL
  meetingTitle: any;
  meetingTime: any;

  constructor(private http: HttpClient) {}

  // scheduleMeeting(meetingData: any): Observable<any> {
  //   return this.http.post(this.apiUrl, meetingData);
  // }

  

  scheduleMeeting() {
    const meetingData = {
      title: this.meetingTitle,
      time: this.meetingTime
    };

    const token = localStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`});
  
  
    this.http.post('http://localhost:8080/admin/meetings', meetingData, { headers })
      .subscribe(response => {
        console.log('Meeting scheduled:', response);
      }, error => {
        console.error('Error scheduling meeting:', error);
      });
  }

  joinMeeting(meetingId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${meetingId}`);
  }
}
