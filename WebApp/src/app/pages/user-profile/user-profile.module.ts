import {NgModule} from '@angular/core';

import {UserProfileRoutingModule} from './user-profile-routing.module';
import {UserProfilePageComponent} from './pages/user-profile-page/user-profile-page.component';
import {PersonalDataComponent} from './components/personal-data/personal-data.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {MgSharedModule} from '../../mg-shared/mg-shared.module';
import {EditMasterProfileComponent} from './components/edit-master-profile/edit-master-profile.component';


@NgModule({
    declarations: [
        UserProfilePageComponent,
        PersonalDataComponent,
        ChangePasswordComponent,
        EditMasterProfileComponent
    ],
    imports: [
        MgSharedModule,
        UserProfileRoutingModule
    ]
})
export class UserProfileModule {
}
