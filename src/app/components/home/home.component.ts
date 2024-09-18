import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(private userService: UserService, public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.userService.getCurrentUser().subscribe(
        (data) => {
          this.user = data;
          if (this.user.role === 'ADMIN') {
            this.router.navigateByUrl('/admin'); // Redirect to admin page if role is admin
          } else if (this.user.role === 'USER') {
            this.router.navigateByUrl('/user'); // Redirect to home page if role is user
          }
        },
        (error) => {
          console.error('Error fetching user details:', error);
         
        }
      );
    } else {
      this.router.navigateByUrl('/home'); // Redirect to login if not authenticated
    }
  }


}
