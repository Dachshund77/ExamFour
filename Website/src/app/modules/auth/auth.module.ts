import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginFormUserNameComponent } from './components/login-form-user-name/login-form-user-name.component';
import { LoginFormPasswordComponent } from './components/login-form-password/login-form-password.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [LoginPageComponent, RegistrationPageComponent, LoginFormComponent, LoginFormUserNameComponent, LoginFormPasswordComponent, RegistrationFormComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
