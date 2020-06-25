import { Component, Input } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { DeviceModel } from '../../../@core/entities/device.model';
import { GroupModel } from '../../../@core/entities/group.model';
import { AccountModel } from '../../../@core/entities/account.model';
import { LicenseModel } from '../../../@core/entities/license.model';
import { NbToggleWraperComponent } from '../../../@theme/components/nebular-wraper/mdm-toggle.component';
import { AddDeviceManualModalComponent } from '../add-device-manual-modal/add-device-manual-modal.component';

@Component({
    selector: 'mdm-device-listings-table',
    styleUrls: ['./device-listings-table.component.scss'],
    templateUrl: './device-listings-table.component.html',
})
export class DeviceListingsTableComponent {
    // tableSettings: use for config UI of ng2-smart-table
    tableSettings: any = {};

    // deviceListings: use for retrive device listings data  in device listings table (ng2-smart-table)
    // the data will receive from backend API
    // API reference: GET api/devices
    @Input() listings: DeviceModel[];

    @Input() groups: any[];

    constructor(private dialogService: NbDialogService) {

        this.tableSettings = {
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
    }

    onAddDeviceManualButtonClick() {
        this.dialogService.open(AddDeviceManualModalComponent, {
            context: {
                deviceGroups: this.groups
            }
        });
    }
}
