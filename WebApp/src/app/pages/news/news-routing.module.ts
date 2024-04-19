import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewsFeedComponent} from "./pages/news-feed/news-feed.component";
import {NewsDetailsComponent} from "./pages/news-details/news-details.component";

const routes: Routes = [
    { path: '', component: NewsFeedComponent },
    { path: ':id', component: NewsDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
