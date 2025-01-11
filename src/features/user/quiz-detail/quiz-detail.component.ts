import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/api.service';
import { Quiz } from '../quizzes';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-quiz-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css'],
})
export class QuizDetailComponent implements OnInit, OnDestroy {
  quizId!: string;
  quizz!: Quiz;
  error: string | null = null;
  selectedAnswers: string[] = [];
  score: number = 0;
  showResults: boolean = false;

  // Timer properties
  timeRemaining: { minutes: number; seconds: number } = {
    minutes: 0,
    seconds: 0,
  };
  timer: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.quizId = params.get('id') || '';
      if (this.quizId) {
        this.getQuizDetail();
      }
    });
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  getQuizDetail(): void {
    const quizId = parseInt(this.quizId, 10);
    this.apiService.getById<Quiz>('quizzes', quizId).subscribe({
      next: (data) => {
        this.quizz = data;
        this.initializeTimer(); // Start timer
      },
      error: (err) => {
        console.error('Error fetching quiz details:', err);
      },
    });
  }

  initializeTimer(): void {
    let totalSeconds = this.quizz.takeTime * 60;

    this.timer = setInterval(() => {
      if (totalSeconds <= 0) {
        this.submitQuiz();
        this.clearTimer();
      } else {
        totalSeconds--;
        this.timeRemaining = {
          minutes: Math.floor(totalSeconds / 60),
          seconds: totalSeconds % 60,
        };
      }
    }, 1000);
  }

  clearTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  get allQuestionsAnswered(): boolean {
    return this.selectedAnswers.length === this.quizz.questions.length;
  }

  selectAnswer(questionIndex: number, option: string): void {
    this.selectedAnswers[questionIndex] = option;
  }

  submitQuiz(): void {
    this.score = 0;
    this.showResults = true;
    this.quizz.questions.forEach((question, index) => {
      if (question.correctAnswer === this.selectedAnswers[index]) {
        this.score++;
      }
    });
    this.clearTimer();
  }
}
