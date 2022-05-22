import {NgModule} from '@angular/core';
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
import {AuthorizeGuard} from '../api-authorization/authorize.guard';
import {ManageMasterPageComponent} from './pages/manage-masters-page/manage-master-page/manage-master-page.component';
import {
  ManageTournamentResultsPageComponent
} from './pages/manage-tournament-results-page/manage-tournament-results-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthorizeGuard],
    children: [
      {path: '', redirectTo: 'schedule', pathMatch: 'full', canActivate: [AuthorizeGuard]},
      {path: 'masters/:id', component: ManageMasterPageComponent, canActivate: [AuthorizeGuard]},
      {path: 'masters', component: ManageMastersPageComponent, canActivate: [AuthorizeGuard]},
      {path: 'news', component: ManageNewsPageComponent, canActivate: [AuthorizeGuard]},
      {path: 'news/:id', component: ManageNewsDescriptionPageComponent, canActivate: [AuthorizeGuard]},
      {path: 'orders', component: ManageOrdersPageComponent, canActivate: [AuthorizeGuard]},
      {path: 'sections', component: ManageSectionsPageComponent, canActivate: [AuthorizeGuard]},
      {path: 'settings', component: ManageSettingsPageComponent, canActivate: [AuthorizeGuard]},
      {path: 'users', component: ManageUsersPageComponent, canActivate: [AuthorizeGuard]},
      {path: 'locations', component: ManageLocationsPageComponent, canActivate: [AuthorizeGuard]},
      {path: 'schedule', component: ManageSchedulePageComponent, canActivate: [AuthorizeGuard]},
      {path: 'events', component: ManageEventsPageComponent, canActivate: [AuthorizeGuard]},
      {path: 'events/:id/results', component: ManageTournamentResultsPageComponent, canActivate: [AuthorizeGuard]},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
