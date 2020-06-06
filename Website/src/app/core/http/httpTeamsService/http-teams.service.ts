import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NewTeam } from 'src/app/shared/models/newTeam/new-team';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    return this.http.post<Team>(this.teamsUrl, newTeam, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
      
  };

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
