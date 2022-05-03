import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminLayoutComponent} from './pages/admin-layout/admin-layout.component';
import {MgSharedModule} from '../mg-shared/mg-shared.module';
import {NavigationComponent} from './components/navigation/navigation.component';
import {ManageSettingsPageComponent} from './pages/manage-settings-page/manage-settings-page.component';
import {ManageOrdersPageComponent} from './pages/manage-orders-page/manage-orders-page.component';
import {ManageUsersPageComponent} from './pages/manage-users-page/manage-users-page.component';
import {ManageMastersPageComponent} from './pages/manage-masters-page/manage-masters-page.component';
import {ManageSectionsPageComponent} from './pages/manage-sections-page/manage-sections-page.component';
import {
  ManageMasterModalComponent
} from './pages/manage-masters-page/manage-master-modal/manage-master-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuillModule} from 'ngx-quill';
import {ManageLocationsPageComponent} from './pages/manage-locations-page/manage-locations-page.component';
import {
  ManageLocationModalComponent
} from './pages/manage-locations-page/manage-location-modal/manage-location-modal.component';
import {ManageModalComponent} from './components/manage-modal/manage-modal.component';
import {ManageSchedulePageComponent} from './pages/manage-schedule-page/manage-schedule-page.component';
import {TimetableSlotComponent} from './components/timetable-slot/timetable-slot.component';
import {
  ManageTimeslotModalComponent
} from './pages/manage-schedule-page/manage-timeslot-modal/manage-timeslot-modal.component';
import {ManageUserModalComponent} from './pages/manage-users-page/manage-user-modal/manage-user-modal.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {
  ManageSectionModalComponent
} from './pages/manage-sections-page/manage-section-modal/manage-section-modal.component';
import {ManageNewsPageComponent} from './pages/manage-news-page/manage-news-page.component';
import {
  ManageNewsDescriptionPageComponent
} from './pages/manage-news-page/manage-news-description-page/manage-news-description-page.component';
import {
  ManageNewsImageCoverModalComponent
} from './components/news/manage-news-image-cover-modal/manage-news-image-cover-modal.component';
import {ManageBlockComponent} from './components/manage-block/manage-block.component';
import {ManageTextLineComponent} from './components/manage-text-line/manage-text-line.component';
import {TextFieldModule} from '@angular/cdk/text-field';
import {ManageTextHtmlModalComponent} from './components/news/manage-text-html-modal/manage-text-html-modal.component';
import { ManageNewsVideoModalComponent } from './components/news/manage-news-video-modal/manage-news-video-modal.component';
import { ManageTournamentTableComponent } from './components/manage-tournament-table/manage-tournament-table.component';
import { ManageTournamentResultModalComponent } from './components/manage-tournament-result-modal/manage-tournament-result-modal.component';
import { ManageTournamentModalComponent } from './components/manage-tournament-modal/manage-tournament-modal.component';
import { ManageEventsPageComponent } from './pages/manage-events-page/manage-events-page.component';
import { ManageEventModalComponent } from './pages/manage-events-page/manage-event-modal/manage-event-modal.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    NavigationComponent,
    ManageSettingsPageComponent,
    ManageOrdersPageComponent,
    ManageUsersPageComponent,
    ManageMastersPageComponent,
    ManageSectionsPageComponent,
    ManageMasterModalComponent,
    ManageLocationsPageComponent,
    ManageLocationModalComponent,
    ManageModalComponent,
    ManageSchedulePageComponent,
    TimetableSlotComponent,
    ManageTimeslotModalComponent,
    ManageUserModalComponent,
    ManageSectionModalComponent,
    ManageNewsPageComponent,
    ManageNewsDescriptionPageComponent,
    ManageNewsImageCoverModalComponent,
    ManageBlockComponent,
    ManageTextLineComponent,
    ManageTextHtmlModalComponent,
    ManageNewsVideoModalComponent,
    ManageTournamentTableComponent,
    ManageTournamentResultModalComponent,
    ManageTournamentModalComponent,
    ManageEventsPageComponent,
    ManageEventModalComponent,
  ],
  exports: [
    ManageModalComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    QuillModule.forRoot({}),
    // todo: delete?
    CKEditorModule,
    FormsModule,
    MgSharedModule,
    TextFieldModule,
  ]
})
export class AdminModule {
}
