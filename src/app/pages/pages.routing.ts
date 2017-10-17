import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule',
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'member', loadChildren: './member/member.module#MemberModule' },
      { path: 'finance', loadChildren: './finance/finance.module#FinanceModule' },
      { path: 'utils', loadChildren: './utils/utils.module#UtilsModule' },
      // { path: 'logout', loadChildren: './logout/finance.module#FinanceModule' },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
