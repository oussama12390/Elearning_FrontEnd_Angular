import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { // Inject Router
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      birth_date: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]] // Ensure confirmPassword is included
    });
  }

  onSubmit() {
    if (this.registerForm.valid && this.passwordsMatch()) {
      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
          console.log('User registered successfully:', response);
          this.router.navigate(['/login']); // Redirect to login page
        },
        (error) => {
          console.error('Registration failed:', error);
        }
      );
    }
  }

  private passwordsMatch(): boolean {
    return this.registerForm.get('password')?.value === this.registerForm.get('confirmPassword')?.value;
  }
}
