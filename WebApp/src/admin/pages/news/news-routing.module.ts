import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManageNewsPageComponent} from "./pages/manage-news-page/manage-news-page.component";
import {AuthorizeGuard} from "../../../app/guards/authorize.guard";
import {PermissionGuard} from "../../../app/guards/permission.guard";
import {
    ManageNewsDescriptionPageComponent
} from "./pages/manage-news-description-page/manage-news-description-page.component";

const routes: Routes = [
    {
        path: '',
        component: ManageNewsPageComponent,
        canActivate: [AuthorizeGuard, PermissionGuard],
        data: {permissions: ['Permission.News.Get']}
    },
    {
        path: ':id',
        component: ManageNewsDescriptionPageComponent,
        canActivate: [AuthorizeGuard, PermissionGuard],
        data: {permissions: ['Permission.News.Create']}
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
