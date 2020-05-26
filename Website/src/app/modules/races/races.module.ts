import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RacesRoutingModule } from './races-routing.module';
import { ManageRacesPageComponent } from './pages/manage-races-page/manage-races-page.component';
import { CreateRacesPageComponent } from './pages/create-races-page/create-races-page.component';
import { SearchRacesPageComponent } from './pages/search-races-page/search-races-page.component';


@NgModule({
  declarations: [ManageRacesPageComponent, CreateRacesPageComponent, SearchRacesPageComponent],
  imports: [
    CommonModule,
    RacesRoutingModule
  ]
})
export class RacesModule { }
