import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTeamPageComponent } from './pages/create-team-page/create-team-page.component';
import { ManageTeamPageComponent } from './pages/manage-team-page/manage-team-page.component';
import { SearchTeamPageComponent } from './pages/search-team-page/search-team-page.component';
import { AuthGuard } from 'src/app/core/guards/AuthGuard/auth.guard';
import { SeeTeamPageComponent } from './pages/see-team-page/see-team-page.component';


const routes: Routes = [
  { path: 'see/:id', component: SeeTeamPageComponent , canActivate: [AuthGuard] },
  { path: 'manage', component: ManageTeamPageComponent , canActivate: [AuthGuard] },
  { path: 'create', component: CreateTeamPageComponent , canActivate: [AuthGuard]},
  { path: 'search', component: SearchTeamPageComponent , canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
