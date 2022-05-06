import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminLayoutComponent} from './pages/admin-layout/admin-layout.component';
import {ManageSettingsPageComponent} from './pages/manage-settings-page/manage-settings-page.component';
import {ManageNewsPageComponent} from './pages/manage-news-page/manage-news-page.component';
import {ManageMastersPageComponent} from './pages/manage-masters-page/manage-masters-page.component';
import {ManageUsersPageComponent} from './pages/manage-users-page/manage-users-page.component';
import {ManageSectionsPageComponent} from './pages/manage-sections-page/manage-sections-page.component';
import {ManageOrdersPageComponent} from './pages/manage-orders-page/manage-orders-page.component';
import {ManageLocationsPageComponent} from './pages/manage-locations-page/manage-locations-page.component';
import {ManageSchedulePageComponent} from './pages/manage-schedule-page/manage-schedule-page.component';
import {
  ManageNewsDescriptionPageComponent
} from './pages/manage-news-page/manage-news-description-page/manage-news-description-page.component';
import {ManageEventsPageComponent} from './pages/manage-events-page/manage-events-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {path: '', redirectTo: 'schedule', pathMatch: 'full'},
      {path: 'masters/:id', component: ManageMastersPageComponent},
      {path: 'masters', component: ManageMastersPageComponent},
      {path: 'news', component: ManageNewsPageComponent},
      {path: 'news/:id', component: ManageNewsDescriptionPageComponent},
      {path: 'orders', component: ManageOrdersPageComponent},
      {path: 'sections', component: ManageSectionsPageComponent},
      {path: 'settings', component: ManageSettingsPageComponent},
      {path: 'users', component: ManageUsersPageComponent},
      {path: 'locations', component: ManageLocationsPageComponent},
      {path: 'schedule', component: ManageSchedulePageComponent},
      {path: 'events', component: ManageEventsPageComponent},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
