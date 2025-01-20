import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/api.service';
import { IUser } from '../../user/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // Redirect if already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const targetRoute = user.role === 'admin' ? '/admin' : '/quiz-list';
      this.router.navigate([targetRoute]);
    }
  }

  onSubmit() {
    console.log('Form submitted:', this.loginForm.value);

    if (this.loginForm.valid) {
      const userData = this.loginForm.value;

      this.apiService.getAll('users').subscribe({
        next: (users) => {
          const foundUser = users.find(
            (user: any) =>
              user.email === userData.email &&
              user.password === userData.password
          ) as IUser;

          if (foundUser) {
            console.log('User logged in successfully:', foundUser);
            alert('User logged in successfully');

            localStorage.setItem('user', JSON.stringify(foundUser));
            localStorage.setItem('isLoggedIn', 'true');

            const targetRoute =
              foundUser.role === 'admin' ? '/admin' : '/quiz-list';
            this.router.navigate([targetRoute]);
          } else {
            alert('Invalid credentials');
          }
        },
        error: () => {
          alert('Error fetching users');
        },
      });
    }
  }
}
