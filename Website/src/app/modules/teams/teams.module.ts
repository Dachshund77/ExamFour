import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { CreateTeamPageComponent } from './pages/create-team-page/create-team-page.component';
import { ManageTeamPageComponent } from './pages/manage-team-page/manage-team-page.component';
import { SearchTeamPageComponent } from './pages/search-team-page/search-team-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CreateTeamPageComponent, ManageTeamPageComponent, SearchTeamPageComponent],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    SharedModule
  ]
})
export class TeamsModule { }
