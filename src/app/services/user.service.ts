import { UserAccount } from './../@core/entities/UserAccount.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  host = environment.host;
  constructor(private http: HttpClient) { }

  public getUserFromApi(inEmail: string) {
    const params = {
      "params": {
        email: inEmail
      }
    }
    return this.http.get<any>(this.host + 'user/findByEmail', params);
  }

  // @method getLoggedUser: retrive logged in user information from local storage
  // after login user data should storing in local storage 
  // the method will get user data from local storage
  // obtained data should be string json format
  // then parse the string to UserAccount Model
  // @return {UserAccount}
  public getLoggedUser(): UserAccount {

    const json = localStorage.getItem('user');
    // define empty object
    let user: UserAccount = <UserAccount>{};

    // check the json is existing
    if (json && json.length > 0) {
      try {
        user = JSON.parse(localStorage.getItem('user'));
      }
      catch (e) {
        // #issue: alert or do something if can not parse json to object
        // set empty object
        user = <UserAccount>{};
      }
      return user;
    }
    else {
      // #issue: alert or do something if can not get user
      // return empty object
      return user;
    }
  }
}
