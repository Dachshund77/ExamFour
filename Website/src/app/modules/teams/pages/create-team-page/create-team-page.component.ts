import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms'
import { Team } from 'src/app/shared/models/team/team';

@Component({
  selector: 'app-create-team-page',
  templateUrl: './create-team-page.component.html',
  styleUrls: ['./create-team-page.component.css']
})
export class CreateTeamPageComponent implements OnInit {

  createTeamForm : FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.createTeamForm = this.formBuilder.group({
      team: []
    });
  }

  ngOnInit() {
  
  }

  
  submit() {
    console.log(this.createTeamForm.value);
  }

}
