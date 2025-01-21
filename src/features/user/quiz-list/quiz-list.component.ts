import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Quiz } from '../quizzes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css'],
})
export class QuizListComponent implements OnInit {
  // quizzes!: Observable<Quiz[]>; // Observable to store quizzes
  quizzes: Quiz[] = [];
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAllQuizzes(); // Fetch all quizzes when the component loads
  }

  getAllQuizzes(): void {
    this.apiService.getAll<Quiz>('quizzes').subscribe({
      next: (quizzes) => {
        // Filter quizzes based on isActive and registered conditions
        this.quizzes = quizzes.filter(
          (quiz) => quiz.isActive && this.shouldDisplayQuiz(quiz)
        );
        console.log('Filtered quizzes:', this.quizzes); // Log the filtered quizzes
      },
      error: (error) => {
        console.error('Error occurred while fetching quizzes:', error); // Log the error
        this.error = 'Failed to load quizzes. Please try again later.'; // Set a user-friendly error message
      },
    });
  }

  // Helper method to determine if a quiz should be displayed
  private shouldDisplayQuiz(quiz: Quiz): boolean {
    // Check if the user is logged in
    const isLoggedIn = this.isUserLoggedIn();

    // Display conditions: Show if not registered or if user is logged in
    return !quiz.registered || isLoggedIn;
  }

  // Check if the user is logged in
  private isUserLoggedIn(): boolean {
    // Example: Check for a stored auth token indicating the user is logged in
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
