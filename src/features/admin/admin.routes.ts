import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { AnalyticsComponent } from './analytics/analytics.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'add-quiz',
        component: AddQuizComponent,
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];
