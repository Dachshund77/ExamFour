import { Component, OnInit } from '@angular/core';
import { HttpAuthService } from 'src/app/core/http/httpAuthService/http-auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  registrationForm: FormGroup
  makingHttpCall: boolean = false;

  constructor(
    private httpAuthService: HttpAuthService,
    private formBuilder: FormBuilder,
    private router : Router
  ) {
    this.registrationForm = this.formBuilder.group({
      userNameControl: [],
      passwordControl: []
    });
  }

  ngOnInit(): void {
  }

  submit() {

    if (this.makingHttpCall || !this.registrationForm.valid) {
      return //premature abort
    } else {
      this.makingHttpCall = true;
    }

    //get needed values
    let userName = this.registrationForm.get('userNameControl').value
    let pw = this.registrationForm.get('passwordControl').value

    console.log(userName);
    console.log(pw);
    
    

    //Call http service
    this.httpAuthService.register(userName, pw)
      .subscribe(
        res => { //Executed only on succes
          //Should redirect probably
          console.log(res);

          this.makingHttpCall = false;
          this.router.navigate(['/dashboard'])

        },
        err => { //Executed on error (duh)
          console.log(err);

          this.makingHttpCall = false;
        }
      )
  }

  

}
