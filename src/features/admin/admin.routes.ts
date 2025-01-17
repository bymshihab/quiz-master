import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AuthGuard } from '../../core/guard/auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
    children: [
      {
        path: 'add-quiz',
        component: AddQuizComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] },
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
];
