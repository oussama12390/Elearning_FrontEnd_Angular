import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { Course } from '../../components/model/course.model';
import { CategoryService } from '../../service/category.service';  // Assuming you have a service for categories
import { Category } from '../model/category.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  categories: Category[] = [];  // Assuming you have a Category model
  selectedCourse: Course | null = null;
  newCourse: Course = { name: '', description: '', categoryId: null, ourUsersId: null };

  constructor(private courseService: CourseService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getAllCourses();
    this.getAllCategories();
    this.setLoggedInUser();
  }

  getAllCourses(): void {
    this.courseService.getAllCourses().subscribe(data => {
      this.courses = data;
    });
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  setLoggedInUser(): void {
    const userId = localStorage.getItem('userId');  // Assume userId is stored in localStorage when the user logs in
    this.newCourse.ourUsersId = userId ? +userId : null;
  }

  saveCourse(): void {
    if (this.selectedCourse) {
      this.courseService.createCourse(this.newCourse).subscribe(() => {
        this.getAllCourses();
        this.selectedCourse = null;
      });
    } else {
      this.courseService.createCourse(this.newCourse).subscribe(() => {
        this.getAllCourses();
        this.newCourse = { name: '', description: '', categoryId: null, ourUsersId: null };
        this.setLoggedInUser();  // Reset the userId for the new course form
      });
    }
  }

  editCourse(course: Course): void {
    this.selectedCourse = { ...course };
  }

  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.getAllCourses();
    });
  }
}