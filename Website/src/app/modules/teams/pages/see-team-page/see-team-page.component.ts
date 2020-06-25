import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/shared/models/team/team';
import { ActivatedRoute } from '@angular/router';
import { HttpTeamsService } from 'src/app/core/http/httpTeamsService/http-teams.service';

@Component({
  selector: 'app-see-team-page',
  templateUrl: './see-team-page.component.html',
  styleUrls: ['./see-team-page.component.css']
})
export class SeeTeamPageComponent implements OnInit {

  team: Team;

  constructor(private activatedRoute: ActivatedRoute,
    private httpTeamService: HttpTeamsService) {
      this.team = new Team();
     }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.httpTeamService.getById(id)
      .subscribe(
        res => { //Executed only on succes
          //Should redirect probably
          console.log(res);
          this.team = res;
      
        },
        err => { //Executed on error (duh)
          console.log(err);

          
        }
      )
  }

}
