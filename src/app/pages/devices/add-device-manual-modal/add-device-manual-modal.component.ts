import { Component, Input } from '@angular/core';
import { LicenseModel } from '../../../@core/entities/license.model';
import { NbDialogService, NbDialogConfig } from '@nebular/theme';
import { SelectGroupModalComponent } from '../../../@theme/components/select-group-modal/select-group-modal.component';

@Component({
    selector: 'mdm-add-device-manual-modal',
    templateUrl: './add-device-manual-modal.component.html',
})
export class AddDeviceManualModalComponent {
    @Input() deviceGroups: any[];
    @Input() licenses: LicenseModel[];

    selectedGroup: any;

    constructor(private dialogService: NbDialogService) {
        this.selectedGroup = { name: 'Unassigned' };
        this.licenses = [];
    }

    onSelectGroupClick() {
        this.dialogService.open(SelectGroupModalComponent, { 
            context: {
                groups: this.deviceGroups
            }
        }).onClose.subscribe((group: any) => this.selectedGroup = group);
    }
}