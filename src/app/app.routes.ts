import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    loadChildren: () => import('./views/authentication/signin/signin.routes')
    .then(routes => routes.signinRoutes)
  },
];
