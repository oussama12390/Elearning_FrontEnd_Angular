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
  selector: 'app-courses',
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {
  user: any;
  courses: Course[] = [];
  categories: Category[] = [];
  images: Image[] = []; 
  selectedCourse: Course | null = null;
  newCourse: Course = { name: '', description: '', categoryId: null, ourUsersId: null, imageId: null }; 
  users: any[] = [];
  name:any;

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
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data;
        console.log('Courses chargées:', this.courses);
      },
      error: (error) => console.error('Erreur lors du chargement des courses:', error)
    });
  }

  loadUsers(): void {
    this.courseService.getUsers().subscribe({
      next: (data: any[]) => {
        this.users = data;
        console.log('Utilisateurs chargés:', this.users);
      },
      error: (error) => console.error('Erreur lors du chargement des utilisateurs:', error)
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

  setLoggedInUser(): void {
    const userId = localStorage.getItem('userId');
    this.newCourse.ourUsersId = userId ? +userId : null;
  }

  saveCourse(): void {
    if (this.selectedCourse) {
      this.courseService.updateCourse(this.selectedCourse.name!, this.newCourse).subscribe({
        next: () => {
          this.getAllCourses();
          this.selectedCourse = null;
          this.resetForm();
        },
        error: (error) => console.error('Erreur lors de la mise à jour du cours:', error)
      });
    } else {
      this.courseService.createCourse(this.newCourse).subscribe({
        next: () => {
          this.getAllCourses();
          this.resetForm();
        },
        error: (error) => console.error('Erreur lors de la création du cours:', error)
      });
    }
  }

  editCourse(course: Course): void {
    // Correction : Assurez-vous que l'ID est bien transmis
    this.selectedCourse = { ...course };  // Cloner l'objet course
    this.newCourse = { ...course };  // Cloner l'objet course pour éditer
  }

  deleteCourse(name: string): void {
    this.courseService.deleteCourse(name).subscribe({
      next: () => {
        // Remove the course with the matching name from the list
        this.courses = this.courses.filter(course => course.name !== name);
        this.resetForm(); // Reset the form after deletion
      },
      error: (error) => console.error('Erreur lors de la suppression du cours:', error) // Log any errors that occur
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

  getImageUrl(imageId: number | null | undefined): string | null {
    if (imageId == null) {  // This checks for both null and undefined
      return null;
    }
    const image = this.images.find(img => img.id === imageId);
    return image ? `data:${image.type};base64,${image.data}` : null;
  }

  // searchImageOnGoogle(imageId: number | null | undefined): void {
  //   if (imageId == null) { // Vérifie que l'image existe
  //     return;
  //   }
  
  //   const image = this.categories.find(img => img.id === imageId);
  //   if (image && image.name) {
  //     const query = encodeURIComponent(image.name); // Encode le nom de l'image pour l'URL
  //     const googleNewsUrl = `https://www.google.com/search?q=${query}&tbm=bks`; // Recherche dans Google News
  //     window.open(googleNewsUrl, '_blank'); // Ouvre un nouvel onglet avec la recherche Google News
  //   }
  // }
  searchImageOnAmazon(imageId: number | null | undefined, courseName: string, categoryName: string): void {
    if (imageId == null) {
      return;
    }
  
    const image = this.images.find(img => img.id === imageId);
    if (image && courseName && categoryName) {
      const query = encodeURIComponent(`${courseName} ${categoryName}`);
      const amazonBooksUrl = `https://www.amazon.com/s?k=${query}&i=stripbooks`;
      window.open(amazonBooksUrl, '_blank');
    }
  }
  
  getCategoryName(categoryId: number | null | undefined): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  }
  
  
  
  
  
}
