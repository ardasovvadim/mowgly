import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {RegistrationPageComponent} from './pages/registration-page/registration-page.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {IconComponent} from './components/icon/icon.component';
import {FrameGalleryComponent} from './components/frame-gallery/frame-gallery.component';
import {MasterCardComponent} from './components/master-card/master-card.component';
import {MasterSliderComponent} from './components/master-slider/master-slider.component';
import {LinkedAccordionComponent} from './components/linked-accordion/linked-accordion.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    RegistrationPageComponent,
    HeaderComponent,
    FooterComponent,
    IconComponent,
    FrameGalleryComponent,
    MasterCardComponent,
    MasterSliderComponent,
    LinkedAccordionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
