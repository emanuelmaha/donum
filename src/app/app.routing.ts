import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views//home/index';
import { LoginComponent } from './views/login/index';
import { RegisterComponent } from './views/register/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);