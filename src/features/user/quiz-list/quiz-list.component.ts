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
  quizzes!: Observable<Quiz[]>; // Observable to store quizzes
  error: string | null = null; // To handle any errors

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAllQuizzes(); // Fetch all quizzes when the component loads
  }

  // Fetch all quizzes dynamically using the generic ApiService
  getAllQuizzes(): void {
    this.quizzes = this.apiService.getAll<Quiz>('quizzes'); // Passing 'Quiz' as the generic type
  }
}
