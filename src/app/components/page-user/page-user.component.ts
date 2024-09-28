import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.css']
})
export class PageUserComponent implements OnInit {
  user: any;

  constructor(
    public userService: UserService, 
    public authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.userService.getCurrentUser().subscribe(
        (data) => {
          this.user = data;
          console.log(data);
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

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login'); // Redirect to login page after logout
  }
}
