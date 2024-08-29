// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-categories',
//   templateUrl: './categories.component.html',
//   styleUrl: './categories.component.css'
// })
// export class CategoriesComponent {

// }


import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../components/model/category.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-categories',
   templateUrl: './categories.component.html',
    styleUrl: './categories.component.css'
  // styleUrls: ['./category-management.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  currentCategory: Category = { name: '' };
  isEditMode: boolean = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getAllCategoriesWithUser().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          alert('You are not authorized to view categories.');
        } else {
          alert('An error occurred while fetching categories.');
        }
      }
    });
  }




  
  

 
}

