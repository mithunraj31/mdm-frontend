import { Component, Input, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';

@Component({
    selector: 'mdm-group-management-panel',
    styleUrls: ['./group-management-panel.component.scss'],
    templateUrl: './group-management-panel.component.html',
})
export class GroupManagementPanelComponent {
    //@varible title: use for set card title 
    //the value will receive from parent component
    @Input() title: string;

    //@property group: use to display group names in tree root
    // the data format should be array of objects 
    // objects should contain properties id: number, name: string, isEdit: boolean
    // and children: any[] (children data format is same groups data format)
    // the values will receive from parent component
    // reference: https://angular2-tree.readme.io/docs/options-1
    @Input() groups: any[];

    //@property options: is settings of angular-tree-component (lib)
    // the settings will give to tree-root component (element)
    // data format is object 
    // reference: https://angular2-tree.readme.io/docs/options-2
    options: any;

    //@property tree: reference tree-root element (angular conponent from angular-tree-component) 
    // use for trigger manually update tree-root data.
    @ViewChild(TreeComponent)
    tree: TreeComponent;

    constructor() {
        this.options = {
            allowDrag: (node: any) => node.isLeaf,
            allowDrop: (element: any, { parent, index }) => {
                return true;
            },
            getNodeClone: (node: any) => ({
                ...node.data,
                id: +new Date,
                name: `copy of ${node.data.name}`
            })
        };
    }

    // onAddGroupButtonClick 
    // trigger when user click add group button 
    // then show textbox at the last tree root level 1 with default value.
    onAddGroupButtonClick() {
        // add plain Group data format to group listing, Default group name to "undefined"
        // set isEdit to true because need to open textbox in group tree.
        this.groups.push({
            id: 0,
            name: 'undefined',
            children: [],
            isEdit: true
        });

        // manually trigger update tree data after added new group data.
        this.tree.treeModel.update();
    }
}