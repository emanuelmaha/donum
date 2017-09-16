// import { Routes, RouterModule } from '@angular/router';

// import { HomeComponent } from './views//home/index';
// import { LoginComponent } from './views/login/index';
// import { ListMemberComponent, EditMemberComponent, AddMemberComponent} from './views/member/index';
// import { RegisterComponent } from './views/register/index';
// import { AuthGuard } from './_guards/index';

// const appRoutes: Routes = [
//     { path: '', component: HomeComponent, canActivate: [AuthGuard] },
//     { path: 'login', component: LoginComponent },
//     { path: 'register', component: RegisterComponent },
//     {
//         path: 'member',
//         component: ListMemberComponent, canActivate: [AuthGuard],
//         children: [
//             {
//                 path: 'edit',
//                 component: EditMemberComponent
//             },
//             {
//                 path: 'add',
//                 component: AddMemberComponent
//             }           
//         ]
//     },
//     { path: 'donation', component: ListMemberComponent, canActivate: [AuthGuard] },
//     { path: 'contribution', component: ListMemberComponent, canActivate: [AuthGuard] },
//     { path: 'reports', component: ListMemberComponent, canActivate: [AuthGuard] },

//     // otherwise redirect to home
//     { path: '**', redirectTo: '' }
// ];

// export const routing = RouterModule.forRoot(appRoutes);