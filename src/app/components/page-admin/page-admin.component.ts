// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-page-admin',
//   templateUrl: './page-admin.component.html',
//   styleUrl: './page-admin.component.css'
// })
// export class PageAdminComponent {

// }


import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '../../service/profile.service';
import { Users } from '../model/users.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-page-admin',
    templateUrl: './page-admin.component.html',
    styleUrl: './page-admin.component.css'
})
export class PageAdminComponent implements OnInit {
  user: any;
  userData: Users | undefined; // Stores fetched user data
  profileForm!: FormGroup;
  userId!: number;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    public userService: UserService, 
    private userProfileService: ProfileService,
    public authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
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

      // Load user profile data
      this.loadUserProfile();

      // Check user authentication and load current user details
      this.checkAuthentication();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login'); // Redirect to login page after logout
  }



  //

  checkAuthentication(): void {
    if (this.authService.isAuthenticated()) {
      this.userService.getCurrentUser().subscribe(
        (data: Users) => {
          this.user = data;
          this.profileForm.patchValue({
            email: this.user.email,
            address: this.user.address,
            birth_date: this.user.birth_date,
            imageId: this.user.imageId
          });
        },
        (error) => {
          console.error('Error fetching current user details:', error);
        }
      );
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  // Load user profile data by ID
  loadUserProfile() {
    this.userProfileService.getUserById(this.userId).subscribe(
      (response: Users) => {
        this.userData = response;
        this.profileForm.patchValue({
          email: this.userData.email,
          address: this.userData.address,
          birth_date: this.userData.birth_date,
          imageId: this.userData.imageId
        });
      },
      (error) => {
        this.errorMessage = 'Failed to load user profile.';
      }
    );
  }

}

