import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminLayoutComponent} from './pages/admin-layout/admin-layout.component';
import {ManageSettingsPageComponent} from './pages/manage-settings-page/manage-settings-page.component';
import {ManageMastersPageComponent} from './pages/manage-masters-page/manage-masters-page.component';
import {ManageUsersPageComponent} from './pages/manage-users-page/manage-users-page.component';
import {ManageSectionsPageComponent} from './pages/manage-sections-page/manage-sections-page.component';
import {ManageOrdersPageComponent} from './pages/manage-orders-page/manage-orders-page.component';
import {ManageLocationsPageComponent} from './pages/manage-locations-page/manage-locations-page.component';
import {ManageEventsPageComponent} from './pages/manage-events-page/manage-events-page.component';
import {ManageMasterPageComponent} from './pages/manage-masters-page/manage-master-page/manage-master-page.component';
import {
    ManageTournamentResultsPageComponent
} from './pages/manage-tournament-results-page/manage-tournament-results-page.component';
import {AuthorizeGuard} from '../app/guards/authorize.guard';
import {ManagePermissionsPageComponent} from './pages/manage-permissions-page/manage-permissions-page.component';
import {PermissionGuard} from '../app/guards/permission.guard';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthorizeGuard],
        children: [
            {path: '', redirectTo: 'schedule', pathMatch: 'full'},
            {
                path: 'masters/:id',
                component: ManageMasterPageComponent,
                canActivate: [AuthorizeGuard, PermissionGuard],
                data: {permissions: ['Permission.Master.Create']}
            },
            {
                path: 'masters',
                component: ManageMastersPageComponent,
                canActivate: [AuthorizeGuard, PermissionGuard],
                data: {permissions: ['Permission.Master.Get']}
            },
            {
                path: 'orders',
                component: ManageOrdersPageComponent,
                canActivate: [AuthorizeGuard, PermissionGuard],
                data: {permissions: ['Permission.Order.Get']}
            },
            {
                path: 'sections',
                component: ManageSectionsPageComponent,
                canActivate: [AuthorizeGuard, PermissionGuard],
                data: {permissions: ['Permission.Section.Get']}
            },
            {path: 'settings', component: ManageSettingsPageComponent, canActivate: [AuthorizeGuard]},
            {
                path: 'users',
                component: ManageUsersPageComponent,
                canActivate: [AuthorizeGuard, PermissionGuard],
                data: {permissions: ['Permission.User.Get']}
            },
            {
                path: 'locations',
                component: ManageLocationsPageComponent,
                canActivate: [AuthorizeGuard, PermissionGuard],
                data: {permissions: ['Permission.Location.Get']}
            },
            {
                path: 'schedule',
                loadChildren: () => import('./pages/schedule/schedule.module').then(m => m.ScheduleModule),
                canLoad: [AuthorizeGuard]
            },
            {
                path: 'events',
                component: ManageEventsPageComponent,
                canActivate: [AuthorizeGuard, PermissionGuard],
                data: {permissions: ['Permission.Event.Get']}
            },
            {
                path: 'events/:id/results',
                component: ManageTournamentResultsPageComponent,
                canActivate: [AuthorizeGuard, PermissionGuard],
                data: {permissions: ['Permission.Event.Create']}
            },
            {
                path: 'permissions',
                component: ManagePermissionsPageComponent,
                canActivate: [AuthorizeGuard, PermissionGuard],
                data: {permissions: ['Permission.Role.Get']}
            },
            {path: 'news', loadChildren: () => import('./pages/news/news.module').then(m => m.NewsModule)},
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
