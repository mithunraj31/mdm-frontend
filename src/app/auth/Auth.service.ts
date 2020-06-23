import { Router } from '@angular/router';
import { LoginUser } from '../@core/entities/LoginUser';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  host = environment.host;
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

  public login(user: LoginUser) {
    // res.headers['set-cookie'][0];

    const dataString = "email=" + user.email + "&password=" + user.password + "&eulaEnabled=" + user.eulaEnabled;
    return this.http.post<any>(this.host + "user/login", dataString);
  }

  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
    // localStorage.removeItem("id_session");
    this.loggedIn.next(false);
    this.router.navigate(["/login"]);
  }

  public setSession(authResult) {

    localStorage.setItem('id_token', authResult.token);
    // localStorage.setItem("id_session", authResult.session);
    if (authResult.token) this.loggedIn.next(true);
  }

  public isAuthenticated(): boolean {
    if (localStorage.getItem('id_token')) {
      //this.loggedIn.next(true);
      return true;
    } else {
      //this.loggedIn.next(false);
      return false;
    }
  }
  public isLoggedIn() {
    if (this.isAuthenticated()) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }

    return this.loggedIn.asObservable();
  }
}
