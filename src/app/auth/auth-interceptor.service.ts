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
      document.cookie = "JSESSIONID=5A6B1F2DE85CD4C044035C05FEB5EE56;";
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer OwPOlI_NRvaYTxPsD8fdSQ==`,
          // 'Access-Control-Allow-Origin' : '*',
          'Content-Type': 'application/json',
         // 'Cookie' : 'JSESSIONID=5A6B1F2DE85CD4C044035C05FEB5EE56; Path=/; HttpOnly',
        //  'Access-Control-Allow-Credentials' : 'true'
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
        // withCredentials : true
      });

      return next.handle(authReq);
    }
  }
}
