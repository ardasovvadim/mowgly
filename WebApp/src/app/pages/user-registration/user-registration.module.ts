import {NgModule} from '@angular/core';

import {UserRegistrationRoutingModule} from './user-registration-routing.module';
import {UserRegistrationPageComponent} from './user-registration-page/user-registration-page.component';
import {MgSharedModule} from '../../mg-shared/mg-shared.module';
import {UserInvitationValidatorGuard} from './guards/user-invitation-validator.guard';


@NgModule({
    declarations: [
        UserRegistrationPageComponent,
    ],
    imports: [
        MgSharedModule,
        UserRegistrationRoutingModule
    ],
    providers: [
        UserInvitationValidatorGuard
    ]
})
export class UserRegistrationModule {
}
