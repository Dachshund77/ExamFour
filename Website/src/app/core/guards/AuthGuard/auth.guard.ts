import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../authentication/authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(
  private authService : AuthService,
  private router : Router){

}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('AUTH GUARD CALLED');
      console.log(this.authService.getToken());
      
    if(this.authService.getToken() == null || this.authService.getToken() == undefined){
      this.router.navigate(['/auth/login'])
    } else{
      return true;
    }
  }
  
}
