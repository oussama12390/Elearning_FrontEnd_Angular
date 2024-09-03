import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../components/model/category.model';
import { Image } from '../../components/model/image.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  categories: Category[] = [];
  images: Image[] = [];
  currentCategory: Category = { name: ''};
  selectedCategory: Category | null = null;
  isEditMode: boolean = false;
  user: any;

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
          console.error('Error retrieving user details:', error);
        }
      );
    } else {
      console.error('User not authenticated');
      this.router.navigateByUrl('/login');
    }
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => console.error('Error loading categories:', error)
    });
  }

  loadImages(): void {
    this.categoryService.getAllImages().subscribe({
      next: (data: Image[]) => {
        this.images = data;
      },
      error: (error) => console.error('Error loading images:', error)
    });
  }

  saveCategory(): void {
    if (this.isEditMode && this.selectedCategory) {
      this.categoryService.updateCategory(this.selectedCategory.name!, this.currentCategory).subscribe({
        next: () => {
          this.getAllCategories();
          this.resetForm();
        },
        error: (error) => console.error('Error updating category:', error)
      });
    } else {
      this.categoryService.addCategory(this.currentCategory).subscribe({
        next: () => {
          this.getAllCategories();
          this.resetForm();
        },
        error: (error) => console.error('Error adding category:', error)
      });
    }
  }

  deleteCategory(name: string): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(name).subscribe({
        next: () => {
          this.getAllCategories();
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 403) {
            alert('You are not authorized to delete this category.');
          } else {
            alert('An error occurred while deleting the category.');
          }
        }
      });
    }
  }

  editCategory(category: Category): void {
    this.selectedCategory = { ...category };
    this.currentCategory = { ...category };
    this.isEditMode = true;
  }

  getImageUrl(imageId: number | null | undefined): string | null {
    if (imageId == null) {
      return null;
    }
    const image = this.images.find(img => img.id === imageId);
    return image ? `data:${image.type};base64,${image.data}` : null;
  }

  resetForm(): void {
    this.currentCategory = { name: '', imageId: null };
    this.selectedCategory = null;
    this.isEditMode = false;
  }
}
