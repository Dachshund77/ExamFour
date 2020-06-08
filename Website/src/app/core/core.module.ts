import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MenuBarComponent } from './header/menu-bar/menu-bar.component';
import { HttpErrorHandlerInterceptor } from './interceptors/httpErrorHandler/http-error-handler.interceptor';


@NgModule({
  declarations: [
    MenuBarComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    MenuBarComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
