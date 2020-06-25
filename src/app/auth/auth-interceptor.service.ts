import { AuthService } from './Auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHeaders, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService){}
  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("id_token");

    if (idToken) {

      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${idToken}`,

          'Content-Type': 'application/json',

        },
        withCredentials: true
      });

      return next.handle(authReq).pipe(
        tap(evt => {
          if (evt instanceof HttpResponse) {
            if (evt.body && (evt.body.code == 415||evt.body.code == 400)) {
              this.auth.logout();
            }
          }
        }));
    } else {
      const authReq = req.clone({
        setHeaders: {
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'Access-Control-Allow-Origin' : '*'
        },
        withCredentials: true
      });

      return next.handle(authReq);
    }
  }
}
