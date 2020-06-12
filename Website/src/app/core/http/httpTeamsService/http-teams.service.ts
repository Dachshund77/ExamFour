import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { NewTeam } from 'src/app/shared/models/newTeam/new-team';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from 'src/app/shared/models/team/team';

@Injectable({
  providedIn: 'root'
})
export class HttpTeamsService {

  teamsUrl = "http://localhost:3000/teams"; //Move to enviroment variables
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })
  
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  
  constructor(private http: HttpClient) { }

  postTeam(newTeam: NewTeam): Observable<Team> {
    return this.http.post<any>(this.teamsUrl, newTeam, this.httpOptions)
      .pipe(
        map((res) => {
          return new Team( //Dirty but works
            res.data[0]._id,
            res.data[0].attributes.teamName
          )
        }));
  };

  getFilteredTeams(teamName: string): Observable<Team[]> {
    console.log('GET FILTERED')
    console.log(teamName);

    let params = new HttpParams().set("teamName", teamName)

    return this.http.get<any>(this.teamsUrl, { headers: this.headers, params: params })
      .pipe(
        map((res) => {
          let teams = [];
          console.log(res);
          res.data.forEach(element => {
            teams.push(new Team(element._id, element.attributes.teamName))
          });
          return teams;
        }
        ));
  };
}
