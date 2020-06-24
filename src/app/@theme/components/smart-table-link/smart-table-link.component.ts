import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

// @Component SmartTableLinkComponent: add custom link to ng2-smart-table
@Component({
    template: `<a (click)="onLinkClick()">{{ text }}</a>`,
    styles: [ 'a {font-weight: bold;cursor: pointer;color:#598bff !important;}' ]
})
export class SmartTableLinkComponent implements OnInit {
    text: string;
    id: string;

    @Input() value: string;

    @Input() rowData: any;

    @Output() onClicked: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        this.text = this.value;
    }

    onLinkClick() {
        this.onClicked.emit(this.rowData);
    }
}