import { Routes, RouterModule } from '@angular/router';

import { FinanceComponent } from './finance.component';
import { DonationComponent, ReportsComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: FinanceComponent,
    children: [
      { path: 'donation', component: DonationComponent },
      { path: 'reports', component: ReportsComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
