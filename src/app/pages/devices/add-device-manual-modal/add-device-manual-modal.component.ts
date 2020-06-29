import { DeviceService } from './../../../services/device.service';
import { Component, Input, OnInit } from '@angular/core';
import { LicenseModel } from '../../../@core/entities/license.model';
import { NbDialogService, NbDialogConfig, NbDialogRef } from '@nebular/theme';
import { SelectGroupModalComponent } from '../../../@theme/components/select-group-modal/select-group-modal.component';
import { BasicDeviceInfoModel } from '../../../@core/entities/basic-device-info.mode';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'mdm-add-device-manual-modal',
    templateUrl: './add-device-manual-modal.component.html',
})
export class AddDeviceManualModalComponent implements OnInit {
    // @property deviceGroups: device group infomation listing
    // the data obtain from parent component
    // then pass data to SelectGroupModalComponent via NbDialogService
    // @type {any}
    @Input() deviceGroups: any[];

    // @property licenses: license infomation listing
    // the data obtain from parent component
    // then retrive on component' license dropdown list
    // @type {any}
    licenses$: Observable<LicenseModel[]>;

    // @property basicInfo: create new device form model
    // use for store form input value (ngModel => two way data binding)
    // @type {BasicDeviceInfoModel}
    basicInfo: BasicDeviceInfoModel;

    constructor(private dialogService: NbDialogService,
        protected dialogRef: NbDialogRef<any>,
        private deviceService: DeviceService) {

        // default value
        this.basicInfo = {
            serialNumber: '',
            groupId: '',
            groupName: 'Unassigned',
            email: '',
            licenseId: '',
            autoRenew: false,
        };
    }
    ngOnInit(): void {
        this.getLicenseData();
    }

    //@method onSelectGroupClick: open group selector modal
    // the method trigger by user click pen icon in Devicec group section
    // pass device group information listings to the modal
    // Observer close modal event if user selected group will receive 
    // group id and grop name then update value of basicInfo
    // @return {void}
    onSelectGroupClick() {
        this.dialogService.open(SelectGroupModalComponent, {
            context: {
                groups: this.deviceGroups
            }
        }).onClose.subscribe((group: any) => {
            this.basicInfo.groupName = group.name;
            this.basicInfo.groupId = group.id;
        });
    }

    // @method onSubmit: drop the component and add basicInfo to Obserable
    // the method trigger by user click save button
    // @return {void}
    onSubmit() {
        if (this.validateForm()) {
            this.dialogRef.close(this.basicInfo);
        }
    }

    // @method validateForm: validate form values is existings
    // email, license id and serial number must be not empty
    // and serial number length must at least 3 character
    // @return {boolean}
    validateForm(): boolean {
        return (this.basicInfo.email &&
            this.basicInfo.licenseId &&
            this.basicInfo.serialNumber &&
            this.basicInfo.serialNumber.length > 3);
    }

    // method getLicenseData: retrive license data from Backend API
    // assign license observable to  @property licenses$ 
    // then licenses$ will bind obtained values to dropdown list
    // @return {void}
    getLicenseData() {
        this.licenses$ = this.deviceService.getLicenses().pipe(map(results => {
            const licenses: LicenseModel[] = []
            if (results?.data?.length > 0) {
                results.data.forEach(license => {
                    let tempLicense: LicenseModel = {
                        id: license.uuid,
                        name: license.name
                    }
                    licenses.push(tempLicense);
                })
            }
            return licenses;
        }));

    }
}