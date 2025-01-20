import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { ResultComponent } from './result/result.component';
import { authGuard } from '../../core/guard/auth.guard';

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: QuizListComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    data: { roles: ['user'] },
  },
  {
    path: 'quiz-detail/:id',
    component: QuizDetailComponent,
  },
  {
    path: 'result',
    component: ResultComponent,
    canActivate: [authGuard],
    data: { roles: ['user'] },
  },
];
