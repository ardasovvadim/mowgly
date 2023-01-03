import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserRegistrationPageComponent} from './user-registration-page/user-registration-page.component';
import {UserInvitationValidatorGuard} from './guards/user-invitation-validator.guard';
import {NotAuthorizeGuard} from '../../guards/not-authorize.guard';

const routes: Routes = [
    {
        path: '',
        component: UserRegistrationPageComponent,
        canActivate: [UserInvitationValidatorGuard, NotAuthorizeGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRegistrationRoutingModule {
}
