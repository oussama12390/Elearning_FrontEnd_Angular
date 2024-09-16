// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrl: './profile.component.css'
// })
// export class ProfileComponent {

// }import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../../components/model/users.model'; // User model
import { ProfileService } from '../../service/profile.service';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId!: number;
  profileForm!: FormGroup;
  userData: Users | undefined; // Stores fetched user data
  successMessage: string = '';
  errorMessage: string = '';
  user: Users | undefined; // Authenticated user object

  constructor(
    private userProfileService: ProfileService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get user ID from route parameters
    this.userId = +(this.route.snapshot.paramMap.get('id') ?? 0);

    // Initialize form group for the profile form
    this.profileForm = this.fb.group({
      email: [''],
      password: [''],
      address: [''],
      birth_date: [''],
      imageId: ['']
    });

    // Load user profile data
    this.loadUserProfile();

    // Check user authentication and load current user details
    this.checkAuthentication();
  }

  // Check if the user is authenticated
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

  // Update user profile
  updateProfile() {
    const updatedData: Users = this.profileForm.value; // Updated profile form data
    this.userProfileService.updateProfile(this.userId, updatedData).subscribe(
      (response) => {
        this.successMessage = 'Profile updated successfully!';
      },
      (error) => {
        this.errorMessage = 'Failed to update profile.';
      }
    );
  }

  // Delete user profile
  deleteProfile() {
    if (confirm('Are you sure you want to delete your profile?')) {
      this.userProfileService.deleteUser(this.userId).subscribe(
        (response) => {
          this.successMessage = 'Profile deleted successfully!';
          this.router.navigate(['/']); // Redirect after deletion
        },
        (error) => {
          this.errorMessage = 'Failed to delete profile.';
        }
      );
    }
  }
}
