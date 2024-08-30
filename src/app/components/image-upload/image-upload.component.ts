import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  selectedFile: File | null = null;
  uploadResponse: string | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
  
      this.http.post('http://localhost:8080/auth/api/images/upload', formData, { responseType: 'text' })
        .subscribe({
          next: (response) => this.uploadResponse = response,
          error: (error) => this.uploadResponse = `Upload failed: ${error.message}`
        });
    }
  }
  
}
