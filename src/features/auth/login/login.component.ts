import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
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
          );

          if (foundUser) {
            console.log('User logged in successfully:', foundUser);
            alert('User logged in successfully');
            // Optionally, store user information in localStorage or a service
            localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
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
