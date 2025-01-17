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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  regForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.regForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.regForm.value);

    if (this.regForm.valid) {
      console.log('Form is valid');
      const userData = this.regForm.value;
      const newUserData = {
        ...userData,
        role: 'user',
        registered: false,
        quizzes: [],
        results: [],
      };
      this.apiService.create('users', newUserData).subscribe({
        next: (data) => {
          console.log('User registered successfully:', data);
          alert('User registered successfully');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error registering user:', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
