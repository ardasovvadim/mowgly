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
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {AuthorizeGuard} from '../api-authorization/authorize.guard';

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
            // {path: '**', component: NotFoundPageComponent}
        ]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
