import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { CreateTeamPageComponent } from './pages/create-team-page/create-team-page.component';
import { ManageTeamPageComponent } from './pages/manage-team-page/manage-team-page.component';
import { SearchTeamPageComponent } from './pages/search-team-page/search-team-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTeamFormTeamnameComponent } from './components/create-team-form-teamname/create-team-form-teamname.component';
import { CreateTeamFormComponent } from './components/create-team-form/create-team-form.component';
import { SearchTeamFormComponent } from './components/search-team-form/search-team-form.component';
import { SearchTeamFormTeamNameComponent } from './components/search-team-form-team-name/search-team-form-team-name.component';
import { TeamListItemComponent } from './components/team-list-item/team-list-item.component';


@NgModule({
  declarations: [
    CreateTeamPageComponent,
    ManageTeamPageComponent,
    SearchTeamPageComponent,
    CreateTeamFormComponent,
    CreateTeamFormTeamnameComponent,
    SearchTeamFormComponent,
    SearchTeamFormTeamNameComponent,
    TeamListItemComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TeamsModule { }
