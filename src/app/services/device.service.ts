import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BasicDeviceInfoModel } from '../@core/entities/basic-device-info.mode';

@Injectable({
    providedIn: 'root'
})
export class DeviceService {
    // API Hostname from Environment
    // Host will be dynamically changed when dev and prod environment
    host = environment.host;
    constructor(private http: HttpClient, private userService: UserService) { }

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
        const params = `filter={"forWhat":"${uuid}"}&page=${this.getPage(page)}&size=${size}`
        return this.http.get<any>(this.host + 'logs/find?' + params);
    }
    getProfiles() {
        return this.http.get<any>(this.host + 'device/group/all');
    }
    getDeviceData(page: number, size: number, sortBy?: string) {
        let siteUuid = this.userService.getLoggedUser().siteUuid;
        let urlParams = `device/find?direction=desc&filter={"siteUuid":"${siteUuid}"}&page=${this.getPage(page)}&size=${size}&sortBy=profile.hardware_info.serial_no`;
        return this.http.get<any>(this.host + urlParams);
    }
    getDeviceDataByGroupId(uuids: string[], page: number, size: number, sortBy?: string) {
        let siteUuid = this.userService.getLoggedUser().siteUuid;
        let urlParams = `device/find?direction=desc&filter={"siteUuid":"${siteUuid}","deviceGroup.uuid":${JSON.stringify(uuids)}}&page=${this.getPage(page)}&size=${size}&sortBy=profile.hardware_info.serial_no`;
        const url = encodeURI(this.host + urlParams);
        return this.http.get<any>(url);
    }
    getLicenses() {
        let siteUuid = this.userService.getLoggedUser().siteUuid;
        return this.http.get<any>(this.host + 'license/site/models?siteUuid=' + siteUuid);
    }
    addDevice(device: BasicDeviceInfoModel) {
        let siteUuid = this.userService.getLoggedUser().siteUuid;
        let payload = {
            autoRenew: device.autoRenew,
            enabled: true,
            licenseModelUuid: device.licenseId,
            owner: {
                email: device.email
            },
            profile: {
                hardware_info: {
                    serial_no: device.serialNumber
                }

            },
            siteUuid: siteUuid
        }
        if (device.groupId && device.groupId != "") {
            payload['groupUuid'] = device.groupId
        }
        return this.http.post<any>(this.host + 'device/save', payload);
    }
    updateDevice(device: any) {
        return this.http.post<any>(this.host + 'device/save', device);
    }
    moveGroup(profile, id: string, parentId: any) {
        let siteUuid = this.userService.getLoggedUser().siteUuid;
        let payload = {
            siteUuid: siteUuid,
            uuid: id,
        }
        if (typeof parentId === 'string' || parentId instanceof String) {
            profile['parentUuid'] = parentId;
        } else if (profile.parentUuid) {
            delete profile['parentUuid'];
        }
        return this.http.post<any>(this.host + 'device/group/save', profile);
    }

    private getPage(pageNumber: number) {
        return pageNumber > 0 ? pageNumber - 1: 0;
    }
}