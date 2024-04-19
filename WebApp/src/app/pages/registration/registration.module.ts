import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegistrationRoutingModule} from './registration-routing.module';
import {MgSharedModule} from "../../mg-shared/mg-shared.module";
import {RegCompletedModalComponent} from "./reg-completed-modal/reg-completed-modal.component";
import {RegPersonalDataComponent} from "./reg-personal-data/reg-personal-data.component";
import {RegSectionComponent} from "./reg-section/reg-section.component";
import {RegistrationComponent} from "./registration.component";


@NgModule({
    declarations: [
        RegCompletedModalComponent,
        RegPersonalDataComponent,
        RegSectionComponent,
        RegistrationComponent
    ],
    imports: [
        CommonModule,
        RegistrationRoutingModule,
        MgSharedModule
    ]
})
export class RegistrationModule {
}
