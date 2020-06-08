import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { NewTeam } from 'src/app/shared/models/newTeam/new-team';
import { HttpTeamsService } from 'src/app/core/http/httpTeamsService/http-teams.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-create-team-page',
  templateUrl: './create-team-page.component.html',
  styleUrls: ['./create-team-page.component.css']
})
export class CreateTeamPageComponent {



  constructor( ) { }

}
