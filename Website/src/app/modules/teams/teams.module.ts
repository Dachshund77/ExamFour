import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { CreateTeamPageComponent } from './pages/create-team-page/create-team-page.component';
import { ManageTeamPageComponent } from './pages/manage-team-page/manage-team-page.component';
import { SearchTeamPageComponent } from './pages/search-team-page/search-team-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTeamFormComponent } from './components/create-team-form/create-team-form.component';


@NgModule({
  declarations: [CreateTeamPageComponent, ManageTeamPageComponent, SearchTeamPageComponent, CreateTeamFormComponent],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TeamsModule { }
