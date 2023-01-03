import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import {MgSharedModule} from '../../mg-shared/mg-shared.module';


@NgModule({
  declarations: [
    ContactsPageComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    MgSharedModule
  ]
})
export class ContactsModule { }
