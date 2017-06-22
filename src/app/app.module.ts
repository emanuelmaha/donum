import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// used to create backend
import { BackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

// map of directives and guards
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';

// routing 
import { routing }        from './app.routing';
// services 
import { AlertService, AuthenticationService, UserService } from './_services/index';
// used for geting view of the app
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/index';
import { RegisterComponent } from './views/register/index';
import { LoginComponent } from './views/login/login.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,

        // providers used to create fake backend
        BackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }