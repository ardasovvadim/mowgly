import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from './components/footer/footer.component';
import {FrameGalleryComponent} from './components/frame-gallery/frame-gallery.component';
import {HeaderComponent} from './components/header/header.component';
import {IconComponent} from './components/icon/icon.component';
import {ImageGalleryComponent} from './components/image-gallery/image-gallery.component';
import {LinkedAccordionComponent} from './components/linked-accordion/linked-accordion.component';
import {MasterCardComponent} from './components/master-card/master-card.component';
import {MasterSliderComponent} from './components/master-slider/master-slider.component';
import {MessageModalComponent} from './components/message-modal/message-modal.component';
import {ModalWrapperComponent} from './components/modal-wrapper/modal-wrapper.component';
import {TimetableRecordModalComponent} from './components/timetable-record-modal/timetable-record-modal.component';
import {MasterPageComponent} from '../pages/master-page/master-page.component';
import {ModalWrapperDirective} from './directives/modal-wrapper.directive';
import {SettingValuePipe} from './pipes/setting-value.pipe';
import {InterpolationPipe} from './pipes/interpolation.pipe';
import {ImagePipe} from './pipes/image.pipe';
import {ContainsSettingPipe} from './pipes/setting-contains.pipe';
import {RouterModule} from '@angular/router';
import { LocationCardComponent } from './components/location-card/location-card.component';
import { PxPipe } from './pipes/px.pipe';

const components: any[] = [
  FooterComponent,
  FrameGalleryComponent,
  HeaderComponent,
  IconComponent,
  ImageGalleryComponent,
  LinkedAccordionComponent,
  MasterCardComponent,
  MasterSliderComponent,
  MessageModalComponent,
  ModalWrapperComponent,
  TimetableRecordModalComponent,
  MasterPageComponent,
  ModalWrapperDirective,
  SettingValuePipe,
  InterpolationPipe,
  ImagePipe,
  ContainsSettingPipe,
  LocationCardComponent
];

@NgModule({
  declarations: [
    ...components,
    PxPipe,
  ],
    exports: [
        ...components,
        PxPipe,
    ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class MgSharedModule { }
