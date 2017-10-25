import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
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
import { DatabaseService } from './db/services/database.service';
import { AuthGuard, AdminGuard, UserGuard } from 'app/_guards';
import { AlertService, AlertModule } from 'app/_helpers/alert';
import { LoginModule } from 'app/pages/login/login.module';
import { RegisterModule } from 'app/pages/register/register.module';

const APP_PROVIDERS = [
    AppState,
    GlobalState,
    DatabaseService,
    AlertService,
    UserGuard,
    AdminGuard,
    AuthGuard
];

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
    ],
    imports: [ // import Angular's modules
        BrowserAnimationsModule,
        BrowserModule,
        HttpModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgaModule.forRoot(),
        NgbModule.forRoot(),
        AlertModule,
        LoginModule,
        RegisterModule,
        PagesModule,
        routing,
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        APP_PROVIDERS
    ],
})

export class AppModule {

    constructor(public appState: AppState) {
    }
}