import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MgSharedModule} from './mg-shared/mg-shared.module';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {RegistrationPageComponent} from './pages/registration-page/registration-page.component';
import {RegPersonalDataComponent} from './pages/registration-page/reg-personal-data/reg-personal-data.component';
import {RegSectionComponent} from './pages/registration-page/reg-section/reg-section.component';
import {AppLayoutComponent} from './pages/app-layout/app-layout.component';
import {EventsPageComponent} from './pages/events-page/events-page.component';
import {SchedulePageComponent} from './pages/schedule-page/schedule-page.component';
import {MasterPageComponent} from './pages/master-page/master-page.component';
import {RegCompletedModalComponent} from './pages/registration-page/reg-completed-modal/reg-completed-modal.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {ErrorHandlerInterceptor} from './interceptors/error-handler.interceptor';
import {AuthHandlerInterceptor} from './interceptors/auth-handler.interceptor';
import {ErrorPageComponent} from './pages/error-page/error-page.component';
import {AdminModule} from '../admin/admin.module';
import {MastersPageComponent} from './pages/masters-page/masters-page.component';

@NgModule({
    declarations: [
        AppComponent,
        AppComponent,
        MainPageComponent,
        RegistrationPageComponent,
        RegSectionComponent,
        RegPersonalDataComponent,
        RegCompletedModalComponent,
        AppLayoutComponent,
        SchedulePageComponent,
        EventsPageComponent,
        MasterPageComponent,
        LoginPageComponent,
        RegistrationPageComponent,
        ErrorPageComponent,
        MastersPageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,

        BrowserAnimationsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MgSharedModule,
        FormsModule,
        AdminModule,
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: AuthHandlerInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
