import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public getToken(): string {
    return sessionStorage.getItem('token');
  }

  public setToken(value: string) {
    sessionStorage.setItem('token', value)
  }

  public getUserName(): string {
    return sessionStorage.getItem('userName');
  }

  public setUserName(value: string) {
    sessionStorage.setItem('userName', value)
  }

  public logOut(){
    sessionStorage.clear();
  }


}
