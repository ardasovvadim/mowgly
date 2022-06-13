import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from './pages/app-layout/app-layout.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {RegistrationPageComponent} from './pages/registration-page/registration-page.component';
import {MasterPageComponent} from './pages/master-page/master-page.component';
import {EventsPageComponent} from './pages/events-page/events-page.component';
import {SchedulePageComponent} from './pages/schedule-page/schedule-page.component';
import {NewsPageComponent} from './pages/news-page/news-page.component';
import {NewsDetailsComponent} from './pages/news-page/news-details/news-details.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {UserRegistrationPageComponent} from './pages/user-registration-page/user-registration-page.component';
import {UserProfilePageComponent} from './pages/user-profile-page/user-profile-page.component';
import {AuthorizeGuard} from './guards/authorize.guard';
import {ErrorPageComponent} from './pages/error-page/error-page.component';
import {PersonalDataComponent} from './pages/user-profile-page/components/personal-data/personal-data.component';
import {ChangePasswordComponent} from './pages/user-profile-page/components/change-password/change-password.component';

const routes: Routes = [
    {path: 'admin', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)},
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {path: '', component: MainPageComponent},
            {path: 'registration', component: RegistrationPageComponent},
            {path: 'master/:id', component: MasterPageComponent},
            {path: 'events', component: EventsPageComponent},
            {path: 'schedule', component: SchedulePageComponent},
            {path: 'news', component: NewsPageComponent},
            {path: 'news/:id', component: NewsDetailsComponent},
            {path: 'login', component: LoginPageComponent},
            {path: 'user-registration', component: UserRegistrationPageComponent},
            {
                path: 'user-profile',
                component: UserProfilePageComponent,
                canActivate: [AuthorizeGuard],
                children: [
                    {path: '', component: PersonalDataComponent, data: {index: 0}},
                    {path: 'change-password', component: ChangePasswordComponent, data: {index: 1}},
                ]
            },
            {path: '404', component: ErrorPageComponent, data: {code: '404'}},
            {path: '403', component: ErrorPageComponent, data: {code: '403'}},
            {path: '**', component: ErrorPageComponent, data: {code: '404'}}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
