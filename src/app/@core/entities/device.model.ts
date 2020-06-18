import { LicenseModel } from './license.model';
import { GroupModel } from './group.model';
import { AccountModel } from './account.model';

// Device model use for storing device data
// contains owner profile, hardware and software details
export class DeviceModel {
    id: number;
    serialNumber: string;
    group: GroupModel;
    owner: AccountModel;
    license: LicenseModel;
    ssid: string;
    isEnabled: boolean;
}