import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'mdm-confirm-modal',
    styleUrls: ['./confirm-modal.component.scss'],
    templateUrl: './confirm-modal.component.html',
})
export class ConfirmModalComponent {

    title: string;

    description: string;

    constructor(protected dialogRef: NbDialogRef<any>) {

    }

    // @method onConfirmClick: give user result to observable and close model
    // the method trigger by user click confirm or dismiss button
    // confirm button has true value
    // dissmiss button has false value
    // @parameter isConfirm {boolean}
    // @return {void}
    onConfirmClick(isConfirm: boolean) {
        // give tree node object (group data) to obsever service
        this.dialogRef.close(isConfirm);
    }
}