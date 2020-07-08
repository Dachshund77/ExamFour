import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpTeamsService } from 'src/app/core/http/httpTeamsService/http-teams.service';
import { HttpAuthService } from 'src/app/core/http/httpAuthService/http-auth.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/authService/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {


  loginForm: FormGroup
  makingHttpCall: boolean = false;

  constructor(
    private httpAuthService: HttpAuthService,
    private formBuilder: FormBuilder,
    private router : Router,
    private authServie : AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      userNameControl: [],
      passwordControl: []
    });
  }

  ngOnInit(): void {
  }

  submit() {

    if (this.makingHttpCall || !this.loginForm.valid) {
      return //premature abort
    } else {
      this.makingHttpCall = true;
    }

    //get needed values
    let userName = this.loginForm.get('userNameControl').value
    let pw = this.loginForm.get('passwordControl').value

    console.log(userName);
    console.log(pw);
    
    

    //Call http service
    this.httpAuthService.login(userName, pw)
      .subscribe(
        res => { //Executed only on succes
          //Should redirect probably
          console.log(res);

          this.makingHttpCall = false;
          this.authServie.setToken(res); 
          this.authServie.setUserName(userName);
          this.router.navigate(['/dashboard'])

        },
        err => { //Executed on error (duh)
          console.log(err);

          this.makingHttpCall = false;
        }
      )
  }
}
