import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  selectedFile: File | null = null;
  uploadResponse: string | null = null;
  imageList: { id: number; url: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadImages();
  }

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
          next: (response) => {
            this.uploadResponse = response;
            this.loadImages(); // Reload the list of images after uploading
          },
          error: (error) => this.uploadResponse = `Upload failed: ${error.message}`
        });
    }
  }

  loadImages(): void {
    this.http.get<{ id: number; name: string; type: string; data: string }[]>('http://localhost:8080/auth/api/images')
      .subscribe({
        next: (response) => {
          this.imageList = response.map(img => ({
            id: img.id,
            url: `data:${img.type};base64,${img.data}`
          }));
        },
        error: (error) => console.error('Failed to load images:', error)
      });
  }

  getImageUrl(imageId: number): string {
    return `http://localhost:8080/auth/api/images/${imageId}`;
  }
}
