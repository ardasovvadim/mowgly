import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {RegistrationPageComponent} from "./pages/registration-page/registration-page.component";
import {RegSectionComponent} from "./pages/registration-page/reg-section/reg-section.component";
import {RegPersonalDataComponent} from "./pages/registration-page/reg-personal-data/reg-personal-data.component";
import {RegCompletedModalComponent} from "./pages/registration-page/reg-completed-modal/reg-completed-modal.component";
import {AppLayoutComponent} from "./pages/app-layout/app-layout.component";
import {SchedulePageComponent} from "./pages/schedule-page/schedule-page.component";
import {EventsPageComponent} from "./pages/events-page/events-page.component";
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {NewsDetailsComponent} from "./pages/news-page/news-details/news-details.component";
import {MasterPageComponent} from "./pages/master-page/master-page.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {MgSharedModule} from "./mg-shared/mg-shared.module";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
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
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ApiAuthorizationModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MgSharedModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
