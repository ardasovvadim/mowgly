import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminLayoutComponent} from './pages/admin-layout/admin-layout.component';
import {MgSharedModule} from '../mg-shared/mg-shared.module';
import {NavigationComponent} from './components/navigation/navigation.component';
import {ManageSettingsPageComponent} from './pages/manage-settings-page/manage-settings-page.component';
import {ManageNewsPageComponent} from './pages/manage-news-page/manage-news-page.component';
import {ManageOrdersPageComponent} from './pages/manage-orders-page/manage-orders-page.component';
import {ManageUsersPageComponent} from './pages/manage-users-page/manage-users-page.component';
import {ManageMastersPageComponent} from './pages/manage-masters-page/manage-masters-page.component';
import {ManageSectionsPageComponent} from './pages/manage-sections-page/manage-sections-page.component';
import {ManageMasterModalComponent} from './pages/manage-masters-page/manage-master-modal/manage-master-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuillModule} from 'ngx-quill';
import {ManageLocationsPageComponent} from './pages/manage-locations-page/manage-locations-page.component';
import {ManageLocationModalComponent} from './pages/manage-locations-page/manage-location-modal/manage-location-modal.component';
import { ManageModalComponent } from './components/manage-modal/manage-modal.component';
import { ManageSchedulePageComponent } from './pages/manage-schedule-page/manage-schedule-page.component';
import { TimetableSlotComponent } from './components/timetable-slot/timetable-slot.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    NavigationComponent,
    ManageSettingsPageComponent,
    ManageNewsPageComponent,
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
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MgSharedModule,
    ReactiveFormsModule,
    QuillModule.forRoot({
      format: 'html',
      modules: {
        syntax: true,
        toolbar: [],
        clipboard: {
          matchVisual: false
        },
      }
    }),
    FormsModule
  ]
})
export class AdminModule {
}
