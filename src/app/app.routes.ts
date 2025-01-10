import { Routes } from '@angular/router';
import { QuizListComponent } from '../features/user/quiz-list/quiz-list.component';

export const routes: Routes = [
  {
    path: '',
    component: QuizListComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('../features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('../features/user/user.routes').then((m) => m.USER_ROUTES),
  },
  {
    path: '',
    loadChildren: () =>
      import('../features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
