import { DeviceService } from './../../../services/device.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppModel } from '../../../@core/entities/app.model';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'mdm-apps',
  styleUrls: ['./apps.component.scss'],
  templateUrl: './apps.component.html',
})
export class AppsComponent implements OnInit {
  // @variable apps: Device installed application listings (APKs)
  // the data will display on /pages/devices/{id}/apps
  // retrive on nb-list (Nebular list component)
  // the data receive from Backend API while ngOnInit
  // @type {AppModel[]}
  apps: AppModel[] = [];

  // @variable sideMenuItems: Device application page tab side menu configuration
  // the data contains menu title, prefixe icon class name and meni is active face
  // @type {NbMenuItem[]}
  sideMenuItems: NbMenuItem[] = [];

  // @variable deviceId: Device Id
  // use for specific device data in the application
  // the data will receive from parent route param {id}
  // @type {string}
  deviceId: string;

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService) {
    this.sideMenuItems = [
      {
        title: 'Installed apps',
        icon: 'download-outline',
        selected: true
      }
    ];
  }

  ngOnInit() {
    // observer route params of /pages/devices/{id}
    // @type {string}
    // parms "id" is device ID 
    // when enter to details page will obtain some value
    // then use the value to specific device from Backend API
    this.route.parent.params.subscribe(paramMap => {

      // assign obtained parent route device ID to global veriable
      this.deviceId = paramMap.id

      // get installed apps from API 
      // and populate data
      this.getInstalledApps(this.deviceId);
    });
  }
  getInstalledApps(uuid: string) {
    this.deviceService.getInstalledApps(uuid).subscribe(result => {

      if (result?.data?.apps) {
        result.data.apps.forEach(app => {

          let tempApp = {
            name: app.label,
            packageName: app.packageName,
            versionName: app.versionName,
            versionCode: app.versionCode
          }

          this.apps.push(tempApp);
        });
      }
    })
  }
}