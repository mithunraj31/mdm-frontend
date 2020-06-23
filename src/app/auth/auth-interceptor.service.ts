import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHeaders, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("intercepter");


    const idToken = localStorage.getItem("id_token");

    if (idToken) {

      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${idToken}`,

          'Content-Type': 'application/json',

        },
        withCredentials: true
      });

      return next.handle(authReq);
    } else {
      const authReq = req.clone({
        setHeaders : {
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'Access-Control-Allow-Origin' : '*'
        },
        withCredentials : true
      });

      return next.handle(authReq);
    }
  }
}
