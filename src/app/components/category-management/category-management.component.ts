import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../components/model/category.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  categories: Category[] = [];
  currentCategory: Category = { name: '' };
  isEditMode: boolean = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getAllCategories().subscribe({
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

  onAdd(): void {
    this.categoryService.addCategory(this.currentCategory).subscribe({
      next: () => {
        this.resetForm();
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          alert('You are not authorized to perform this action.');
        } else {
          alert('An error occurred while adding the category.');
        }
      }
    });
  }

  onUpdate(): void {
    if (this.isEditMode && this.currentCategory.id) {
      this.categoryService.updateCategory(this.currentCategory.id, this.currentCategory).subscribe({
        next: () => {
          this.resetForm();
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 403) {
            alert('You are not authorized to update this category.');
          } else {
            alert('An error occurred while updating the category.');
          }
        }
      });
    }
  }

  onDelete(id: number): void {
    console.log('Deleting category with id:', id);
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.getCategories(); // Refresh the list after deletion
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error during deletion:', error); // Log the full error
          if (error.status === 403) {
            alert('You are not authorized to delete this category.');
          } else {
            alert('An error occurred while deleting the category.');
          }
        }
      });
    }
  }
  
  

  onEdit(category: Category): void {
    this.currentCategory = { ...category };
    this.isEditMode = true;
  }

  onCancel(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.currentCategory = { name: '' };
    this.isEditMode = false;
    this.getCategories(); // Refresh the list
  }
}
