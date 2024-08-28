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

@Component({
     templateUrl: './user-courses.component.html',
  styleUrl: './user-courses.component.css'
})
export class UserCoursesComponent implements OnInit {
  user: any;
  courses: Course[] = [];
  categories: Category[] = [];
  selectedCourse: Course | null = null;
 
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
   
    
///add 
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
      this.router.navigateByUrl('/login');
    }
  }

  getAllCourses(): void {
    this.courseService.getAllCoursesUser().subscribe(data => {
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



 

 
 

  // deleteCourse(id: number): void {
  //   this.courseService.deleteCourse(id).subscribe(() => {
  //     this.getAllCourses();
  //     this.resetForm();
  //   });
  // }

  


}

