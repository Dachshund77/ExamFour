import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpTeamsService } from 'src/app/core/http/httpTeamsService/http-teams.service';
import { Team } from 'src/app/shared/models/team/team';

@Component({
  selector: 'app-search-team-form',
  templateUrl: './search-team-form.component.html',
  styleUrls: ['./search-team-form.component.css']
})
export class SearchTeamFormComponent implements OnInit {

  @Output() onSearch = new EventEmitter<Team[]>();
  searchTeamForm: FormGroup
  makingHttpCall : boolean = false;

  constructor(
    private httpTeamsService : HttpTeamsService,
    private formBuilder: FormBuilder) {

    
  }

  ngOnInit(): void {
    
    
    this.searchTeamForm = this.formBuilder.group({
      teamNameControl: [{teamName:'', teamNameExact: false}] //Would be greate if that could be set from inside
    });
    this.searchTeamForm.valueChanges.subscribe(value =>{

    });
  }

  findTeams() {
    console.log("FIND TEAM NAME");
    this.makingHttpCall = true; //need swirly button 
    
    //let teamName = this.searchTeamForm.get('teamNameControl').value.teamName
    //let teamNameExact = this.searchTeamForm.get('teamNameControl').value.teamNameExact

    let teamName = this.searchTeamForm.get('teamNameControl').value;

    this.httpTeamsService.getFilteredTeams(teamName)
    .subscribe(
      res => { 
        //Should redirect probably
        console.log(res);
        
        this.makingHttpCall = false; //Emmit event?
        this.onSearch.emit(res)
      },
      err => { //Executed on error (duh)
        console.log(err);
        
        this.makingHttpCall = false;
      }
    )
    //console.log(teamName);
    //console.log(teamNameExact);


    

  }

}
