import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    host = environment.host;

    constructor(private http: HttpClient) { }

    public getLicense() {

        return this.http.get<any>(this.host + 'stat/dbquery?db=license');
    }
    
    public getModelStatus() {
        return this.http.get<any>(this.host + 'stat/dbquery?db=device&fields=model&fields=model_online&fields=model_ofline&fields=os&fields=carrier');
    }

    public getDeviceStatus() {
        return this.http.get<any>(this.host + 'stat/dbquery?db=device&fields=inactive&fields=enrolled&fields=online');
    }
}
