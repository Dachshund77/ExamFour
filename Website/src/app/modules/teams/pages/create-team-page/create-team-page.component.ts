import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { NewTeam } from 'src/app/shared/models/newTeam/new-team';
import { HttpTeamsService } from 'src/app/core/http/httpTeamsService/http-teams.service';

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
      teamName: []
    });
  }

  ngOnInit() {

  }


  submit() {
    let teamName = this.createTeamForm.get('teamName').value

    let newTeam = new NewTeam(teamName)

    console.log(newTeam)

window.alert("test")

    try {
      this.httpTeamsService.postTeam(newTeam).subscribe(team => console.log(team));
    } catch (error) {
      console.log('ERROR CATCH')
    }

  }

}
