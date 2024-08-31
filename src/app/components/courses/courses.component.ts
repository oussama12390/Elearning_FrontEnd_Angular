import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { Course } from '../../components/model/course.model';
import { CategoryService } from '../../service/category.service';
import { Category } from '../model/category.model';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { Image } from '../model/image.model'; // Assurez-vous d'avoir un modèle Image

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {
  user: any;
  courses: Course[] = [];
  categories: Category[] = [];
  images: Image[] = []; // Liste des images disponibles
  selectedCourse: Course | null = null;
  newCourse: Course = { name: '', description: '', categoryId: null, ourUsersId: null, imageId: null }; // Ajouter imageId
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
    this.setLoggedInUser();
    this.loadUsers();
    this.loadImages(); // Charger les images disponibles
    if (this.authService.isAuthenticated()) {
      this.userService.getCurrentUser().subscribe(
        (data) => {
          this.user = data;
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    } else {
      console.error('User is not authenticated');
      // Optionally, you can redirect to login or show an error message
      this.router.navigateByUrl('/login');
    }
  }

  getAllCourses(): void {
    this.courseService.getAllCourses().subscribe(data => {
      this.courses = data;
    });
  }

  loadUsers(): void {
    this.courseService.getUsers().subscribe((data: any[]) => {
      this.users = data;
    });
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  loadImages(): void {
    this.courseService.getAllImages().subscribe((data: Image[]) => {
      this.images = data;
    });
  }

  setLoggedInUser(): void {
    const userId = localStorage.getItem('userId');
    this.newCourse.ourUsersId = userId ? +userId : null;
  }

  saveCourse(): void {
    if (this.selectedCourse) {
      this.courseService.updateCourse(this.selectedCourse.id!, this.newCourse).subscribe(() => {
        this.getAllCourses();
        this.selectedCourse = null;
        this.resetForm();
      });
    } else {
      this.courseService.createCourse(this.newCourse).subscribe(() => {
        this.getAllCourses();
        this.resetForm();
      });
    }
  }

  editCourse(course: Course): void {
    this.selectedCourse = { ...course };
    this.newCourse = { ...course };
  }

  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.courses = this.courses.filter(course => course.id !== id);
      this.resetForm();
    });
  }

  cancelEdit(): void {
    this.selectedCourse = null;
    this.resetForm();
  }

  resetForm(): void {
    this.newCourse = { name: '', description: '', categoryId: null, ourUsersId: null, imageId: null };
    this.setLoggedInUser();
  }
}
