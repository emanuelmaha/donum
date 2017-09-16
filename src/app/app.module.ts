import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './app.routing';

// App is our top level component
import { AppComponent } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';

// used to create backend
// import { BackendProvider } from './_helpers/index';
// import { MockBackend, MockConnection } from '@angular/http/testing';
// import { BaseRequestOptions } from '@angular/http';
// import { EndPoint } from './_helpers/endPoint';
// // map of directives and guards
// import { AuthGuard } from './_guards/index';
// // database services
// import { DatabaseService } from './db/services/database.service';
// // routing 
// // services 
// import { AuthenticationService, UserService } from './_services/index';
// used for geting view of the app
// import { MenuComponent } from './views/menu/index';
// import { HomeComponent } from './views/home/index';
// import { ListMemberComponent, AddMemberComponent, EditMemberComponent} from './views/member/index';
// import { RegisterComponent } from './views/register/index';
// import { LoginComponent } from './views/login/login.component';

// Application wide providers
const APP_PROVIDERS = [
    AppState,
    GlobalState,
];

export type StoreType = {
    state: InternalStateType,
    restoreInputValues: () => void,
    disposeOldHosts: () => void,
};

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
    ],
    imports: [ // import Angular's modules
        BrowserModule,
        HttpModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgaModule.forRoot(),
        NgbModule.forRoot(),
        PagesModule,
        routing,
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        APP_PROVIDERS,
    ],
})

export class AppModule {

    constructor(public appState: AppState) {
    }
}