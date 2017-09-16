import { Routes, RouterModule } from '@angular/router';

import { MemberComponent } from './member.component';
import { ListComponent } from './components/list/list.component';
import { NewComponent } from './components/new/new.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: MemberComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'new', component: NewComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
