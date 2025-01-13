import { Routes } from '@angular/router';
import { QuizListComponent } from '../features/user/quiz-list/quiz-list.component';
import { HomeLayoutComponent } from '../features/user/home-layout/home-layout.component';
import { AuthLayoutComponent } from '../features/auth/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    loadChildren: () =>
      import('../features/user/user.routes').then((m) => m.USER_ROUTES),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('../features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: '',
    loadChildren: () =>
      import('../features/user/user.routes').then((m) => m.USER_ROUTES),
  },
  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('../features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
