import { Component, Input } from '@angular/core';

@Component({
    selector: 'mdm-vertical-detail',
    templateUrl: './vertical-details.component.html',
    styleUrls: ['./vertical-details.component.scss']
})
export class VerticalDetailComponent {
    //@varible source: list of key pair value
    // the data obtain from parent component 
    // use for display in ng2-smart-table
    // key property will display on first column
    // value property will display on second column
    // @type {{ key: string, value: string }[]}
    @Input() source: { key: string, value: string }[];

    //@variable tableSettings: use for config UI of ng2-smart-table
    //@type {any}
    tableSettings: any = {};

    constructor() {
        this.tableSettings = {
            // hide create, update, and delete row buttons from ng2-smart-table
            actions: {
                add: false,
                edit: false,
                delete: false,
            },
            // hide column header
            hideHeader: true,
            // hide filter row
            hideSubHeader: true,
            // the property contains column configurations.u
            columns: {
                key: {
                    class: 'key-name',

                },
                value: {
                    // data feild can add html element
                    type: 'html'
                }
            }
        };
    }
}
