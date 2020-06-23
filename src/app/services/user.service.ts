import { UserAccount } from './../@core/entities/UserAccount.model';
import { environment } from './../../environments/environment';
import { LoginUser } from '../@core/entities/LoginUser';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  host = environment.host;
  constructor(private http: HttpClient) { }

  public getUserFromApi(inEmail: string){
    const params = { "params": {
    email : inEmail
    }}
    return this.http.get<any>(this.host+'user/findByEmail',params);
  }
  public getLoggedUser():UserAccount {
    let user: UserAccount = JSON.parse(localStorage.getItem('user'));
    return user;
  }
}
