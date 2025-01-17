import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { ResultComponent } from './result/result.component';
import { AuthGuard } from '../../core/guard/auth.guard';

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: QuizListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user'] },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user'] },
  },
  {
    path: 'quiz-detail/:id',
    component: QuizDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user'] },
  },
  {
    path: 'quiz-list',
    component: QuizListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user'] },
  },
  {
    path: 'result',
    component: ResultComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user'] },
  },
];
