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

  createTeamForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private httpTeamsService: HttpTeamsService
  ) {

    this.createTeamForm = this.formBuilder.group({
      teamNameControl: []
    });
  }

  ngOnInit() {

  }

  makingHttpCall = false;

  submit() {
    //init
    this.makingHttpCall = true;

    //get needed values
    let teamName = this.createTeamForm.get('teamNameControl').value.teamName

    //Format into object
    let newTeam = new NewTeam(teamName)

    //Call http service
    this.httpTeamsService.postTeam(newTeam)
      .subscribe(
        res => { //Executed only on succes
          //Should redirect probably
          this.makingHttpCall = false;
        },
        err => { //Executed on error (duh)
          this.makingHttpCall = false;
        }
      )
  }

}
