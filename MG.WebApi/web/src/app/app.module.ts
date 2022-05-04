import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {RegistrationPageComponent} from './pages/registration-page/registration-page.component';
import {HeaderComponent} from './mg-shared/components/header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegSectionComponent} from './pages/registration-page/reg-section/reg-section.component';
import {RegPersonalDataComponent} from './pages/registration-page/reg-personal-data/reg-personal-data.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppLayoutComponent} from './pages/app-layout/app-layout.component';
import {MgSharedModule} from './mg-shared/mg-shared.module';
import {RegCompletedModalComponent} from './pages/registration-page/reg-completed-modal/reg-completed-modal.component';
import {EventsPageComponent} from './pages/events-page/events-page.component';
import {SchedulePageComponent} from './pages/schedule-page/schedule-page.component';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {NewsDetailsComponent} from './pages/news-page/news-details/news-details.component';
import {MasterPageComponent} from './pages/master-page/master-page.component';

@NgModule({
  declarations: [
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
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MgSharedModule,
    FormsModule,
  ],
  providers: [],
  exports: [
    HeaderComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
