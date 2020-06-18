import { Component } from '@angular/core';
import { GroupModel } from '../../@core/entities/group.model';
import { AccountModel } from '../../@core/entities/account.model';
import { LicenseModel } from '../../@core/entities/license.model';
import { DeviceModel } from '../../@core/entities/device.model';
import { NbToggleWraperComponent } from '../../@theme/components/nebular-wraper/mdm-toggle.component';

@Component({
    selector: 'ngx-device-manager',
    styleUrls: ['./devices.component.scss'],
    templateUrl: './devices.component.html',
})
export class DevicesComponent {
    // deviceTableSettings: use for config UI of ng2-smart-table
    deviceTableSettings: any = {};

    // deviceListings: use for retrive device listings data  in device listings table (ng2-smart-table)
    // the data will receive from backend API
    // API reference: GET api/devices
    deviceListings: DeviceModel[];
    constructor(){
        this.deviceTableSettings = {
            // hide create, update, and delete row buttons from ng2-smart-table
            actions: {
                add: false,
                edit: false,
                delete: false,
            },
            // hide filter row
            hideSubHeader: true,
            // the property contains column configurations.
            columns: {
              serialNumber: {
                title: 'Serial number',
              },
              group: {
                title: 'Group name',
                // mapping nested property of group data to display group name
                valuePrepareFunction: (group: GroupModel) => {
                    return group.name;
                },
              },
              owner: {
                title: 'Owner',
                // mapping nested property of user data to display  username
                valuePrepareFunction: (owner: AccountModel) => {
                    return owner.name;
                },
              },
              license: {
                title: 'License',
                // mapping nested property of license data to display license name
                valuePrepareFunction: (license: LicenseModel) => {
                    return license.name;
                },
              },
              ssid: {
                  title: 'SSID',
              },
              isEnabled: {
                title: 'Enabled',
                type: 'custom',
                filter: false,
                renderComponent: NbToggleWraperComponent,
                // use for listening component events.
                onComponentInitFunction(instance: any) {

                },
              },
            },
        };

        // deviceListings mockup data will remove after the component can obtain data from API
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

    }
}

