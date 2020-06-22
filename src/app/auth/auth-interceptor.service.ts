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
    // const idSession = localStorage.getItem("id_session");
    if (idToken) {

      const authReq = req.clone({ 
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + idToken,
          // 'Access-Control-Allow-Origin': '*'
        }),
        withCredentials : true
      });

      return next.handle(authReq);
    } else {
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'Access-Control-Allow-Origin': '*'
        }),
        withCredentials : true
      });

      return next.handle(authReq);
    }
  }
}
