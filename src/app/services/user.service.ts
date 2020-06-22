import { environment } from './../../environments/environment';
import { LoginUser } from '../@core/entities/LoginUser';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  host = environment.host;
  constructor(private http: HttpClient) { }


}
