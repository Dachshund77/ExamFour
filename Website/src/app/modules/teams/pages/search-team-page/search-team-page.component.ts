import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/shared/models/team/team';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-team-page',
  templateUrl: './search-team-page.component.html',
  styleUrls: ['./search-team-page.component.css']
})
export class SearchTeamPageComponent implements OnInit {

  queriedTeams : Team[];

  constructor() { }

  ngOnInit() {
    this.queriedTeams = []
  }

  displaySearchResult(teams : Team[]){
    //Optional paramters and shit
    this.queriedTeams = [] //reset
    
    teams.forEach(element => {
      this.queriedTeams.push(element)
    });
  }

}
