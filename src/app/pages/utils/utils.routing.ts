import { Routes, RouterModule } from '@angular/router';

import { UtilsComponent } from './utils.component';
import { MigrationComponent, UserComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: UtilsComponent,
    children: [
      { path: 'migration', component: MigrationComponent },
      { path: 'user', component: UserComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
