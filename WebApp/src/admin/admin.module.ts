import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminLayoutComponent} from './pages/admin-layout/admin-layout.component';
import {MgSharedModule} from '../app/mg-shared/mg-shared.module';
import {ManageSettingsPageComponent} from './pages/manage-settings-page/manage-settings-page.component';
import {ManageOrdersPageComponent} from './pages/manage-orders-page/manage-orders-page.component';
import {ManageUsersPageComponent} from './pages/manage-users-page/manage-users-page.component';
import {ManageMastersPageComponent} from './pages/manage-masters-page/manage-masters-page.component';
import {ManageSectionsPageComponent} from './pages/manage-sections-page/manage-sections-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ManageLocationsPageComponent} from './pages/manage-locations-page/manage-locations-page.component';
import {
    ManageLocationModalComponent
} from './pages/manage-locations-page/manage-location-modal/manage-location-modal.component';
import {ManageSchedulePageComponent} from './pages/manage-schedule-page/manage-schedule-page.component';
import {
    ManageTimeslotModalComponent
} from './pages/manage-schedule-page/manage-timeslot-modal/manage-timeslot-modal.component';
import {ManageUserModalComponent} from './pages/manage-users-page/manage-user-modal/manage-user-modal.component';
import {
    ManageSectionModalComponent
} from './pages/manage-sections-page/manage-section-modal/manage-section-modal.component';
import {TextFieldModule} from '@angular/cdk/text-field';
import {ManageEventsPageComponent} from './pages/manage-events-page/manage-events-page.component';
import {ManageMasterPageComponent} from './pages/manage-masters-page/manage-master-page/manage-master-page.component';
import {
    ManageTournamentResultsPageComponent
} from './pages/manage-tournament-results-page/manage-tournament-results-page.component';
import {ManagePermissionsPageComponent} from './pages/manage-permissions-page/manage-permissions-page.component';
import {OrderDetailsModalComponent} from './pages/manage-orders-page/order-details-modal/order-details-modal.component';
import {
    InviteMasterModalComponent
} from './pages/manage-masters-page/invite-master-modal/invite-master-modal.component';
import {SharedAdminModule} from "./shared-admin/shared-admin.module";

@NgModule({
    declarations: [
        AdminLayoutComponent,
        ManageSettingsPageComponent,
        ManageOrdersPageComponent,
        ManageUsersPageComponent,
        ManageMastersPageComponent,
        ManageSectionsPageComponent,
        ManageLocationsPageComponent,
        ManageLocationModalComponent,
        ManageSchedulePageComponent,
        ManageTimeslotModalComponent,
        ManageUserModalComponent,
        ManageSectionModalComponent,
        ManageEventsPageComponent,
        ManageMasterPageComponent,
        ManageTournamentResultsPageComponent,
        ManagePermissionsPageComponent,
        OrderDetailsModalComponent,
        InviteMasterModalComponent,
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedAdminModule,
        ReactiveFormsModule,
        FormsModule,
        MgSharedModule,
        TextFieldModule,
    ],
    providers: []
})
export class AdminModule {
}
