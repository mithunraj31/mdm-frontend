import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DeviceService {
    // API Hostname from Environment
    // Host will be dynamically changed when dev and prod environment
    host = environment.host;
    constructor(private http: HttpClient) { }

    getDeviceById(uuid: string) {
        return this.http.get<any>(this.host + 'device/findBy?uuid=' + uuid);
    }
    getDeviceAll() {
        return this.http.get<any>(this.host + 'device/group/all');
    }
    getInstalledApps(uuid: string) {
        return this.http.get<any>(this.host + 'device/app/installed?deviceUuid=' + uuid);
    }
    getLogs(uuid: string, page: number, size: number) {
        const params = `filter={"forWhat":"${uuid}"}&page=${page}&size=${size}`
        return this.http.get<any>(this.host + 'logs/find?'+params);
    }
}