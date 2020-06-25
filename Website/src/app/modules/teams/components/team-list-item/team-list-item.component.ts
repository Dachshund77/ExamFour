import { Component, OnInit, Input } from '@angular/core';
import { Team } from 'src/app/shared/models/team/team';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-team-list-item',
  templateUrl: './team-list-item.component.html',
  styleUrls: ['./team-list-item.component.css']
})
export class TeamListItemComponent implements OnInit {

  @Input() team: Team;

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  onClick(){
    console.log("clicked")
    this.router.navigate(['teams','see',this.team.ID])
  }

}
