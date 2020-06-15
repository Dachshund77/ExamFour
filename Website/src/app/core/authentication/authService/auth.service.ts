import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public setToken(value: string) {
    localStorage.setItem('token', value)
  }


}
