import { Component, ViewChild, TemplateRef } from '@angular/core';
import { DeviceModel } from '../../@core/entities/device.model';


@Component({
  selector: 'mdm-device-manager',
  styleUrls: ['./devices.component.scss'],
  templateUrl: './devices.component.html',
})
export class DevicesComponent {

  //@property deviceListings: device data listings 
  // when the component initialized device service will request 
  // data from backend API, after obtain dat will give to the property
  // then pass obtained data the its child components
  deviceListings: DeviceModel[];

  //@property groupNodes: device group listings
  // when the component initialized device service will request 
  // data from backend API, after obtain dat will give to the property
  // then pass obtained data the its child components
  groupNodes: any[];

  constructor() {

    // mockup data will remove after the component can obtain data from API
    this.deviceListings = [
      {
        id: 1,
        serialNumber: 'G7P9J00021',
        group: {
          id: 1,
          name: '[技術部] MiDM評価用',
        },
        owner: {
          id: 1,
          name: 'Lishitha',
          email: 'mbel003@mbel.co.jp',
        },
        isEnabled: false,
        license: {
          id: 2,
          name: '1 year',
          activatedDate: new Date(),
          assignedDate: new Date(),
          autoRenew: true,
          expiry: new Date(),
        },
        ssid: 'v2600gi',
      },
      {
        id: 2,
        serialNumber: 'G7P9J00022',
        group: {
          id: 1,
          name: '[技術部] MiDM評価用',
        },
        owner: {
          id: 2,
          name: 'Mithunraj',
          email: 'mbel002@mbel.co.jp',
        },
        isEnabled: false,
        license: {
          id: 2,
          name: '1 year',
          activatedDate: new Date(),
          assignedDate: new Date(),
          autoRenew: true,
          expiry: new Date(),

        },
        ssid: 'v2600gi',
      },
      {
        id: 3,
        serialNumber: 'G7P9J00023',
        group: {
          id: 1,
          name: '[技術部] MiDM評価用',
        },
        owner: {
          id: 3,
          name: 'Pongpeera',
          email: 'mbel003@mbel.co.jp',
        },
        isEnabled: true,
        license: {
          id: 1,
          name: '3 year',
          activatedDate: new Date(),
          assignedDate: new Date(),
          autoRenew: true,
          expiry: new Date(),
        },
        ssid: 'v2600gi',
      },
    ];

    this.groupNodes = [
      {
        id: 1,
        name: 'root1',
        children: [
          { id: 2, name: 'child1' },
          { id: 3, name: 'child2' }
        ],
        isEdit: false
      },
      {
        id: 4,
        name: 'root2',
        children: [
          { id: 5, name: 'child2.1' },
          {
            id: 6,
            name: 'child2.2',
            children: [
              { id: 7, name: 'subsub' }
            ]
          }
        ]
      }
    ];
  }
}
