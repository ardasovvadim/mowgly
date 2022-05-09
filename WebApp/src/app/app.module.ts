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
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {SchedulePageComponent} from './pages/schedule-page/schedule-page.component';
import {NewsDetailsComponent} from './pages/news-page/news-details/news-details.component';
import {MasterPageComponent} from './pages/master-page/master-page.component';
import {RegCompletedModalComponent} from './pages/registration-page/reg-completed-modal/reg-completed-modal.component';
import {AuthorizeInterceptor} from '../api-authorization/authorize.interceptor';
import {ApiAuthorizationModule} from '../api-authorization/api-authorization.module';
import { ScullyLibModule } from '@scullyio/ng-lib';

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
        NotFoundPageComponent,
        NewsDetailsComponent,
        MasterPageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ApiAuthorizationModule,

        BrowserAnimationsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MgSharedModule,
        FormsModule,
        ScullyLibModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
