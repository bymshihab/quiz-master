import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import { ResultsComponent } from './results/results.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'quiz-form',
    component: QuizFormComponent,
  },
  {
    path: 'results',
    component: ResultsComponent,
  },
];
