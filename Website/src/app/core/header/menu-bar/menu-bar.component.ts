import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/authService/auth.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  isLoggedIn : boolean = false;
  loggedInUsername : string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log(this.isLoggedIn);
    console.log(this.loggedInUsername);
    
    console.log(this.authService.getToken());
    console.log(this.authService.getUserName());
    

    if(this.authService.getUserName()){
      this.isLoggedIn = true;
      this.loggedInUsername = this.authService.getUserName();
    }
   
  }

  onLogOut(){
    this.authService.logOut();
  }

  test(){
    console.log('TEST');
    
  }

}
