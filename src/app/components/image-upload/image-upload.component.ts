import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from '../model/image.model'; // Assurez-vous d'avoir un modèle Image

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  selectedFile: File | null = null;
  uploadResponse: string | null = null;
  imageList: string[] = [];

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
            this.loadImages(); // Recharger la liste des images après l'upload
          },
          error: (error) => this.uploadResponse = `Upload failed: ${error.message}`
        });
    }
  }

  loadImages(): void {
    this.http.get<Image[]>('http://localhost:8080/auth/api/images')
      .subscribe({
        next: (response) => this.imageList = response.map(img => this.convertToImageUrl(img.data, img.type)),
        error: (error) => console.error('Failed to load images:', error)
      });
  }

  convertToImageUrl(data: string, type: string): string {
    return `data:${type};base64,${data}`;
  }
}

// interface Image {
//   id: number;
//   name: string;
//   type: string;
//   data: string;  // data sous forme base64 string
// }
