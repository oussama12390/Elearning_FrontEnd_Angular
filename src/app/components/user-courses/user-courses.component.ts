// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user-courses',
//   templateUrl: './user-courses.component.html',
//   styleUrl: './user-courses.component.css'
// })
// export class UserCoursesComponent {

// }

import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { Course } from '../../components/model/course.model';
import { CategoryService } from '../../service/category.service';
import { Category } from '../model/category.model';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { Image } from '../model/image.model';

@Component({
    selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
})
export class UserCoursesComponent implements OnInit {
  user: any;
  courses: Course[] = [];
  categories: Category[] = [];
  images: Image[] = []; 
  selectedCourse: Course | null = null;
  newCourse: Course = { name: '', description: '', categoryId: null, ourUsersId: null, imageId: null }; 
  users: any[] = [];

  constructor(
    private courseService: CourseService, 
    private categoryService: CategoryService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCourses();
    this.getAllCategories();
   
 
    this.loadImages(); 
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    if (this.authService.isAuthenticated()) {
      this.userService.getCurrentUser().subscribe(
        (data) => {
          this.user = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
        }
      );
    } else {
      console.error('Utilisateur non authentifié');
      this.router.navigateByUrl('/login');
    }
  }

  getAllCourses(): void {
    this.courseService.getAllCoursesUser().subscribe({
      next: (data) => {
        this.courses = data;
        console.log('Courses chargées:', this.courses);
      },
      error: (error) => console.error('Erreur lors du chargement des courses:', error)
    });
  }



  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Catégories chargées:', this.categories);
      },
      error: (error) => console.error('Erreur lors du chargement des catégories:', error)
    });
  }

  loadImages(): void {
    this.courseService.getAllImages().subscribe({
      next: (data: Image[]) => {
        this.images = data;
        console.log('Images chargées:', this.images);
      },
      error: (error) => console.error('Erreur lors du chargement des images:', error)
    });
  }



 

  editCourse(course: Course): void {
    // Correction : Assurez-vous que l'ID est bien transmis
    this.selectedCourse = { ...course };  // Cloner l'objet course
    this.newCourse = { ...course };  // Cloner l'objet course pour éditer
  }


  



 

  getImageUrl(imageId: number | null | undefined): string | null {
    if (imageId == null) {  // This checks for both null and undefined
      return null;
    }
    const image = this.images.find(img => img.id === imageId);
    return image ? `data:${image.type};base64,${image.data}` : null;
  }
}
