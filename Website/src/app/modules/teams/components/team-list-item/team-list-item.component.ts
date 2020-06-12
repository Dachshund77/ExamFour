import { Component, OnInit, Input } from '@angular/core';
import { Team } from 'src/app/shared/models/team/team';

@Component({
  selector: 'app-team-list-item',
  templateUrl: './team-list-item.component.html',
  styleUrls: ['./team-list-item.component.css']
})
export class TeamListItemComponent implements OnInit {

  @Input() team: Team;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    console.log("clicked")
  }

}
