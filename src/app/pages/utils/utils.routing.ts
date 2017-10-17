import { Routes, RouterModule } from '@angular/router';

import { UtilsComponent } from './utils.component';
import { MigrationComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: UtilsComponent,
    children: [
      { path: 'migration', component: MigrationComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
