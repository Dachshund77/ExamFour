import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { //Thats a be all end all catch clause
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) { //Client did shit the bed, means most likely a dev fucked up and we cant realy deal with it
          console.log('INTERCEPTORthis is client side error');
          errorMsg = `Error: ${error.error.message}`;
        }
        else {
          console.log('INTERCEPTOR this is server side error'); //server problems, should come after other error coees handlers
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        console.log(errorMsg);
        return throwError(error);
      })
    )
  }
}