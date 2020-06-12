import { Component, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { Team } from 'src/app/shared/models/team/team';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpTeamsService } from 'src/app/core/http/httpTeamsService/http-teams.service';
import { NewTeam } from 'src/app/shared/models/newTeam/new-team';
import { SimpleChanges } from "@angular/core";

@Component({
  selector: 'app-create-team-form',
  templateUrl: './create-team-form.component.html',
  styleUrls: ['./create-team-form.component.css']
})
export class CreateTeamFormComponent implements OnInit {

  createTeamForm: FormGroup
  makingHttpCall : boolean = false;

  constructor(
    private httpTeamsService : HttpTeamsService,
    private formBuilder: FormBuilder,
  ) {
    this.createTeamForm = this.formBuilder.group({
      teamNameControl: []
    });
  }

  ngOnInit(): void {
  }

  submit() {
    if(this.makingHttpCall || !this.createTeamForm.valid){
      return //premature abort
    } else{
      this.makingHttpCall = true;
    } 

    //get needed values
    let teamName = this.createTeamForm.get('teamNameControl').value.teamName
    
    //Format into object
    let newTeam = new NewTeam(teamName)

    //Call http service
    this.httpTeamsService.postTeam(newTeam)
      .subscribe(
        res => { //Executed only on succes
          //Should redirect probably
          console.log(res);
          
          this.makingHttpCall = false;
          console.log('TODO REDIRECT');
          
        },
        err => { //Executed on error (duh)
          console.log(err);

          this.makingHttpCall = false;
        }
      )
      
  }

  


}
