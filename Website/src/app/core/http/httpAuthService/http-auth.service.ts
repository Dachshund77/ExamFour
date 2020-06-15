import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpAuthService {

  authUrl = "http://localhost:3000/auth"; //Move to enviroment variables
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(private http: HttpClient) { }

  login(name: string, pw: string): Observable<string> {
    return this.http.post<any>(this.authUrl + '/login', { name, pw }, { headers: this.headers })
      .pipe(
        map((res) => {
          return res.data[0].token
        }));
  }
}
