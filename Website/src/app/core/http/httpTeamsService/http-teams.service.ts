import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NewTeam } from 'src/app/shared/models/newTeam/new-team';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from 'src/app/shared/models/team/team';

@Injectable({
  providedIn: 'root'
})
export class HttpTeamsService {

  teamsUrl = "http://localhost:3000/teams";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      //'Authorization': 'my-auth-token'
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
}
