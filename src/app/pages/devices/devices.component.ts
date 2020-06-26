import { map } from 'rxjs/operators';
import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { DeviceModel } from '../../@core/entities/device.model';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { DeviceService } from '../../services/device.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'mdm-device-manager',
  styleUrls: ['./devices.component.scss'],
  templateUrl: './devices.component.html',
})
export class DevicesComponent implements OnInit {

  //@property deviceListings: device data listings 
  // when the component initialized device service will request 
  // data from backend API, after obtain dat will give to the property
  // then pass obtained data the its child components
  deviceListings$: Observable<DeviceModel[]>;

  //@property groupNodes: device group listings
  // when the component initialized device service will request 
  // data from backend API, after obtain dat will give to the property
  // then pass obtained data the its child components
  groupNodes: any[];

  constructor(
    private toasterService: NbToastrService,
    private deviceService: DeviceService) {

    // mockup data will remove after the component can obtain data from API


  }
  ngOnInit(): void {
    this.getDeviceProfiles();
    this.getDeviceData();
  }


  deleteGroup(group: any) {

    // status can be 'basic' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'control'
    let status: NbComponentStatus = 'success';

    // notify user via toast message
    this.toasterService.show(status, 'some message', {
      position: NbGlobalPhysicalPosition.TOP_RIGHT
    });
  }

  getDeviceProfiles() {
    this.deviceService.getProfiles().subscribe(result => {
      if (result.data) {
        var array = result.data;
        var newArray = [];
        for (var i = 0; i < array.length; i++) {
          var tempobj = array[i];
          var obj = {};
          obj['id'] = tempobj.uuid;
          obj['name'] = tempobj.profile.name;
          obj['parentId'] = tempobj.parentUuid || null;
          obj['deviceCount'] = tempobj.deviceNumbers;
          newArray.push(obj);
        }
        const nest = (items, id = null, link = 'parentId') =>
          items
            .filter(item => item[link] === id)
            .map(item => ({ ...item, children: nest(items, item.id) }));

        this.groupNodes = nest(newArray);
      }
    })
  }

  getDeviceData() {
    this.deviceListings$ = this.deviceService.getDeviceData(0, 20).pipe(map(result => {
      const deviceList: DeviceModel[] = [];
      if (result.data.length > 0) {
        result.data.forEach(device => {

          let serial = device.states?.isOnline==true?'🟢 '+device.profile?.hardware_info?.serial_no:'🔴 '+device.profile?.hardware_info?.serial_no;

          let tempDevice: DeviceModel = {
            id: device.uuid || '',
            ssid: '',
            isEnabled: device.enabled || false,
            serialNumber: serial|| '',
            group: {
              id: device.deviceGroup?.uuid || null,
              name: device.deviceGroup?.profile?.name || '',
            },
            license: {
              name: device.license?.licenseModel?.name || '',
              autoRenew: device.license?.autoRenew || '',
            },
            owner: {
              name: device.owner?.profile?.name || '',
              email: device.owner?.email || ''
            },
            isOnline : device.states?.isOnline || false

          }
          deviceList.push(tempDevice);
        });
      }
      return deviceList;
    }));
  }

  onGroupSelected($event: any) {

    let idArray: string[] = [];

    const getId = (obj: any) => {
      idArray.push(obj.id);
      if (obj.children && obj.children.length > 0) {
        obj.children.forEach(child => {
          getId(child)
        });
      }
    }
    getId($event);
    this.deviceListings$ = this.deviceService.getDeviceDataByGroupId(idArray, 0, 20).pipe(map(result => {
      const deviceList: DeviceModel[] = [];
      if (result.data.length > 0) {
        result.data.forEach(device => {

          let tempDevice: DeviceModel = {
            id: device.uuid || '',
            ssid: '',
            isEnabled: device.enabled || false,
            serialNumber: device.profile?.hardware_info?.serial_no || '',
            group: {
              id: device.deviceGroup?.uuid || null,
              name: device.deviceGroup?.profile?.name || '',
            },
            license: {
              name: device.license?.licenseModel?.name || '',
              autoRenew: device.license?.autoRenew || '',
            },
            owner: {
              name: device.owner?.profile?.name || '',
              email: device.owner?.email || ''
            }
          }
          deviceList.push(tempDevice);
        });
      }
      return deviceList;
    }));
  }
}
