import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTeamPageComponent } from './pages/create-team-page/create-team-page.component';
import { ManageRacesPageComponent } from '../races/pages/manage-races-page/manage-races-page.component';
import { SearchRacesPageComponent } from '../races/pages/search-races-page/search-races-page.component';
import { ContactBarComponent } from 'src/app/shared/components/contact-bar/contact-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [
  { path: 'manage', component: ManageRacesPageComponent },
  { path: 'create', component: CreateTeamPageComponent },
  { path: 'search', component: SearchRacesPageComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
