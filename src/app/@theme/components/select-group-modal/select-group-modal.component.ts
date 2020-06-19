import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'mdm-select-group-modal',
    templateUrl: './select-group-modal.component.html',
})
export class SelectGroupModalComponent {
    //@property group: use to display group names in tree root
    // the data format should be array of objects 
    // objects should contain properties id: number, name: string, isEdit: boolean
    // and children: any[] (children data format is same groups data format)
    // the values will receive from parent component
    // reference: https://angular2-tree.readme.io/docs/options-1
    groups: any[];

    //@property options: is settings of angular-tree-component (lib)
    // the settings will give to tree-root component (element)
    // data format is object 
    // reference: https://angular2-tree.readme.io/docs/options-2
    options: any;

    constructor(protected dialogRef: NbDialogRef<any>) {
        this.options = {};
    }

    // @method onGroupSelected: trigger when user click some group name
    // then the mehod will obtain tree node object (group data),
    // give the obtained data to obsever service and close modal element.
    onGroupSelected($event: any) {
        // give tree node object (group data) to obsever service
        this.dialogRef.close($event.node.data);
    }
}