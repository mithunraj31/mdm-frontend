import { DeviceService } from './../../../services/device.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { DeviceModel } from '../../../@core/entities/device.model';
import { GroupModel } from '../../../@core/entities/group.model';
import { AccountModel } from '../../../@core/entities/account.model';
import { LicenseModel } from '../../../@core/entities/license.model';
import { NbToggleWraperComponent } from '../../../@theme/components/nebular-wraper/mdm-toggle.component';
import { AddDeviceManualModalComponent } from '../add-device-manual-modal/add-device-manual-modal.component';
import { Router } from '@angular/router';
import { BasicDeviceInfoModel } from '../../../@core/entities/basic-device-info.mode';
import { SmartTableLinkComponent } from '../../../@theme/components/smart-table-link/smart-table-link.component';
import { map } from 'rxjs/operators';
import { Pagination } from '../../../@core/entities/page.model';

@Component({
    selector: 'mdm-device-listings-table',
    styleUrls: ['./device-listings-table.component.scss'],
    templateUrl: './device-listings-table.component.html',
})
export class DeviceListingsTableComponent {
    // @property tableSettings: use for config UI of ng2-smart-table
    tableSettings: any = {};

    // deviceListings: use for retrive device listings data  in device listings table (ng2-smart-table)
    // the data will receive from backend API
    // API reference: GET api/devices
    @Input() listings: DeviceModel[];

    // @varobale groups: group infomation listings
    // the data obtain from parent component
    // then pass the data to AddDeviceManualModalComponent
    // @type {any[]}
    @Input() groups: any[];

    @Output() onDeviceAdded = new EventEmitter();
    @Output() onPageNumberChanged = new EventEmitter();

    //@property page: current page of listings table
    //use for PagerComponent 
    //@type {number}
    page: number = 1;

    @Input() pagination: Pagination;

    constructor(private dialogService: NbDialogService,
        private router: Router,
        private deviceService: DeviceService) {

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
                    type: 'custom',
                    filter: false,
                    renderComponent: SmartTableLinkComponent,
                    // use for listening component events.
                    onComponentInitFunction: (instance: any) => {
                        // when user click serial number will redirect to devcie details page
                        instance.onClicked.subscribe(response => {
                            this.router.navigate([`pages/devices/${response.id}`]);
                        });
                    },
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
                    onComponentInitFunction: (instance: any) => {
                        // when user toggle a device switcher will update device detail via Backend API
                        instance.onSwitched.subscribe(event => {
                            this.enableDeviceAsync(event.rowData.id, event.currentValue);
                        });
                    },
                },
            },
            // hide ng2-smart-table pager
            pager: {
                display: false
            }
        };
    }

    // @method onAddDeviceManualButtonClick: open add device manually modal
    // when user click add device button will trigger the method
    // call NbDialogService to display form modal and attach group listings
    // for group selector in the form 
    // Observer close model event if user submited form 
    // observable will return  BasicDeviceInfoModel
    // if dismiss will return undefined
    onAddDeviceManualButtonClick() {
        this.dialogService.open(AddDeviceManualModalComponent, {
            context: {
                deviceGroups: this.groups
            }
        }).onClose.subscribe((basicInfo: BasicDeviceInfoModel) => {
            // do something for create the data
            if (basicInfo) {
                this.deviceService.addDevice(basicInfo).subscribe(result => {
                    if (result.code == 200) {
                        this.onDeviceAdded.emit();
                    }
                })
            }
        });
    }

    // @method  onPageChanged: pass user selected page number to parent component
    // when user click pager will ecute the method
    // @return {void}
    onPageChanged($event) {
        this.onPageNumberChanged.emit($event);
    }

    //@method enableDeviceAsync: update devive is enabeld status via backend API
    // the method will request API to get device detail and modify its property [enabled]
    // then send request to update the modified device data
    // return {Promise<any>}
    private async enableDeviceAsync(deviceId: string, isEnabled: boolean) {
        const device = await this.deviceService.getDeviceById(deviceId)
            .pipe(map(res => res?.data)).toPromise();

        if (device) {
            device.enabled = isEnabled;
            const response = await this.deviceService
                .updateDevice(device).pipe(map(res => res)).toPromise();
        }
    }
}
