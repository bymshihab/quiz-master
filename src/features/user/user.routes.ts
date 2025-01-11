import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { ResultComponent } from './result/result.component';

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: QuizListComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'quiz-detail/:id',
    component: QuizDetailComponent,
  },
  {
    path: 'quiz-list',
    component: QuizListComponent,
  },
  {
    path: 'result',
    component: ResultComponent,
  },
];
