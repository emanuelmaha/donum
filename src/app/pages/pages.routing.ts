import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard, AdminGuard, UserGuard} from '../_guards/index';

export const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'member', loadChildren: './member/member.module#MemberModule', canActivate:[UserGuard] },
      { path: 'finance', loadChildren: './finance/finance.module#FinanceModule', canActivate:[UserGuard] },
      { path: 'utils', loadChildren: './utils/utils.module#UtilsModule', canActivate:[AdminGuard] },
    ],
    canActivate: [AuthGuard]
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
