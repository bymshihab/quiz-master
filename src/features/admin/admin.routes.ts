import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { authGuard } from '../../core/guard/auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard], // Guard at parent level
    data: { roles: ['admin'] },
    children: [
      {
        path: 'add-quiz',
        component: AddQuizComponent,
        data: { roles: ['admin'] },
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
        data: { roles: ['admin'] },
      },
    ],
  },
];
