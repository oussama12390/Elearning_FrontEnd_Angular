// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user-categoriy',
//   templateUrl: './user-categoriy.component.html',
//   styleUrl: './user-categoriy.component.css'
// })
// export class UserCategoriyComponent {

// }





import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../components/model/category.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
   selector: 'app-user-categoriy',
  templateUrl: './user-categoriy.component.html',
    styleUrl: './user-categoriy.component.css'
})
export class UserCategoriyComponent implements OnInit {
  categories: Category[] = [];
  currentCategory: Category = { name: '' ,imageId:null};
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





  
  

 



