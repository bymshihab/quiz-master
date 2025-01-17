import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/api.service';

interface User {
  email: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.loginForm.value);

    if (this.loginForm.valid) {
      console.log('Form is valid');
      const userData = this.loginForm.value;

      // Send GET request to check if the user exists
      this.apiService.getAll('users').subscribe({
        next: (users) => {
          // Find user with matching email and password
          const foundUser = users.find(
            (user: any) =>
              user.email === userData.email &&
              user.password === userData.password
          ) as User;

          if (foundUser) {
            console.log('User logged in successfully:', foundUser);
            alert('User logged in successfully');
            // Optionally, store user information in localStorage or a service
            if (typeof window !== 'undefined' && window.localStorage) {
              localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
              console.log('User information stored in localStorage');
            } else {
              console.error('localStorage is not available.');
            }

            if (foundUser.role === 'admin') {
              console.log('Redirecting to the dashboard');

              this.router.navigate(['/admin/dashboard']);
            } else {
              this.router.navigate(['/quiz-list']);
            }

            // Redirect to the dashboard or home page
            // this.router.navigate(['/dashboard']);
          } else {
            console.error('Invalid credentials');
            alert('Invalid credentials');
          }
        },
        error: (error) => {
          console.error('Error fetching users:', error);
          alert('Error fetching users');
        },
      });
    }
  }
}
