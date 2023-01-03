import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserProfilePageComponent} from './pages/user-profile-page/user-profile-page.component';
import {PersonalDataComponent} from './components/personal-data/personal-data.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfilePageComponent,
    children: [
      {path: '', component: PersonalDataComponent, data: {index: 0}},
      {path: 'change-password', component: ChangePasswordComponent, data: {index: 1}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
