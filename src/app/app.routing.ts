import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from 'app/_guards';
import { Logout } from 'app/pages/logout/logout.component';
import { WaitForApprove } from 'app/pages/waitForApprove/waitForApprove.component';

export const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full', canActivate: [AuthGuard] },
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule',
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  { path: 'waitForApprove', component: WaitForApprove},
  { path: 'logout', component: Logout, canActivate: [AuthGuard] },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
