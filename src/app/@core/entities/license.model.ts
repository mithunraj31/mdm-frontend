// License model use for storing Device license model
// contians license period
export class LicenseModel {
    id?: number;
    name?: string;
    autoRenew?: boolean;
    assignedDate?: Date;
    activatedDate?: Date;
    expiry?: Date;
}
