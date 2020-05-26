import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageRacesPageComponent } from './pages/manage-races-page/manage-races-page.component';
import { CreateRacesPageComponent } from './pages/create-races-page/create-races-page.component';
import { SearchRacesPageComponent } from './pages/search-races-page/search-races-page.component';


const routes: Routes = [
  { path: 'manage', component: ManageRacesPageComponent},
  { path: 'create', component: CreateRacesPageComponent},
  { path: 'search', component: SearchRacesPageComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RacesRoutingModule { }
