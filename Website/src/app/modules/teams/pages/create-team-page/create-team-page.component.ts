import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Team } from 'src/app/shared/models/team/team';

@Component({
  selector: 'app-create-team-page',
  templateUrl: './create-team-page.component.html',
  styleUrls: ['./create-team-page.component.css']
})
export class CreateTeamPageComponent {

  createTeamForm: FormGroup

  constructor(private formBuilder: FormBuilder) {

    this.createTeamForm = this.formBuilder.group({
      teamName: []
    });
  }

  ngOnInit() {

  }


  submit() {
    //Here we create shit
    console.log(this.createTeamForm.value);
    console.log("MODEL");
    console.log(this.createTeamForm.get('teamName').value)
  }

}
