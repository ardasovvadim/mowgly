import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from './pages/app-layout/app-layout.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {RegistrationPageComponent} from './pages/registration-page/registration-page.component';
import {MasterPageComponent} from './pages/master-page/master-page.component';
import {EventsPageComponent} from './pages/events-page/events-page.component';
import {SchedulePageComponent} from './pages/schedule-page/schedule-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {AuthorizeGuard} from './guards/authorize.guard';
import {ErrorPageComponent} from './pages/error-page/error-page.component';
import {MastersPageComponent} from './pages/masters-page/masters-page.component';

const routes: Routes = [
    {path: 'admin', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)},
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {path: '', component: MainPageComponent},
            {path: 'registration', component: RegistrationPageComponent},
            {path: 'master/:id', component: MasterPageComponent},
            {path: 'masters', component: MastersPageComponent},
            {path: 'events', component: EventsPageComponent},
            {path: 'schedule', component: SchedulePageComponent},
            {path: 'news', loadChildren: () => import('./modules/news/news.module').then(m => m.NewsModule)},
            {path: 'login', component: LoginPageComponent},
            {
                path: 'user-registration',
                loadChildren: () => import('./pages/user-registration/user-registration.module').then(m => m.UserRegistrationModule)
            },
            {
                path: 'user-profile',
                loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfileModule),
                canLoad: [AuthorizeGuard]
            },
            { path: 'contacts', loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsModule) },
            {path: '404', component: ErrorPageComponent, data: {code: '404'}},
            {path: '403', component: ErrorPageComponent, data: {code: '403'}},
            {path: '400', component: ErrorPageComponent, data: {code: '400'}},
            {path: '**', component: ErrorPageComponent, data: {code: '404'}}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
