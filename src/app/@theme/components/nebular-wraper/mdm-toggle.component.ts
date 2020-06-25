import { Component, Input } from '@angular/core';

// The component use for wraping NbToggleComponent
// to display in ng2-smart-table's custom column
// because the custom column can not pass row data
// to NbToggleComponent directly.
// references:
// https://stackoverflow.com/questions/58609812/how-to-pass-data-to-ng2-smart-table-rendercomponent-from-http-request
@Component({
    selector: 'mdm-toggle-wraper',
    // display NbToggleComponent
    template: `<nb-toggle [checked]="value"></nb-toggle>`,
})
export class NbToggleWraperComponent {
    // value: row data use to pass value to NbToggleComponent in "checked" directive
    @Input() value: any;
    @Input() rowData: any;
}
