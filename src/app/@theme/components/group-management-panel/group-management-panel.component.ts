import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import { NbDialogService, NbMenuItem, NbMenuService } from '@nebular/theme';
import { ConfirmModalComponent } from '../confirm-modal/cofirm-modal.component';

@Component({
    selector: 'mdm-group-management-panel',
    styleUrls: ['./group-management-panel.component.scss'],
    templateUrl: './group-management-panel.component.html',
})
export class GroupManagementPanelComponent {
    //@property title: use for set card title 
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

    // @variable sideMenuItems: Device application page tab side menu configuration
    // the data contains menu title, prefixe icon class name and meni is active face
    // @type {NbMenuItem[]}
    sideMenuItems: NbMenuItem[] = []

    @Output() onSelected = new EventEmitter();
    @Output() onDeleted = new EventEmitter();
    @Output() onChanged = new EventEmitter();
    @Output() onAdded = new EventEmitter();
    @Output() onViewAllSelected = new EventEmitter();

    constructor(private dialogService: NbDialogService,
        private menuService: NbMenuService) {

        this.sideMenuItems = [
            {
                title: 'View all',
                icon: 'list-outline',
                selected: true
            }
        ];
        this.options = {
            allowDrag: (node: any) => node.isLeaf,
            allowDrop: (element: any, { parent, index }) => {
                return true;
            },
            getNodeClone: (node: any) => {
                return {
                    ...node.data,
                    id: +new Date,
                    name: `copy of ${node.data.name}`
                };
            }
        };
        this.menuService.onItemClick().subscribe(item => {
            if (item.tag == 'groupMenu') {
                
                const activedNode = this.tree.treeModel.getActiveNode();

                if (activedNode) {
                    activedNode.setIsActive(false);
                    this.sideMenuItems = [
                        {
                            title: 'View all',
                            icon: 'list-outline',
                            selected: true
                        }
                    ];
                }

               
                // view all clicked
                this.onViewAllSelected.emit();
            }
        });
    }

    // onAddGroupButtonClick 
    // trigger when user click add group button 
    // then show textbox at the last tree root level 1 with default value.
    onAddGroupButtonClick() {

        this.onAdded.emit('');
        // add plain Group data format to group listing, Default group name to "undefined"
        // set isEdit to true because need to open textbox in group tree.
        // this.groups.push({
        //     id: 0,
        //     name: 'undefined',
        //     children: [],
        //     isEdit: false
        // });

        // manually trigger update tree data after added new group data.
        // this.tree.treeModel.update();
    }

    // @method onDeleteGroupClick: Delete group from tree root
    // @parameter group {any}: group node data is contain id, name and childrens
    // while excuting the method will receive selected group data
    // then open delete confirmation dialog and create observer to watch user response
    // if user confirm call http request to delete the group then toast some result message
    // if user cancel close dialog
    // @return {void}
    onDeleteGroupClick(group: any) {
        this.dialogService.open(ConfirmModalComponent, {
            context: {
                title: 'Confirm delete',
                description: `Would you like to delete this grpup id: ${group.id} ?`
            }
        }).onClose.subscribe((isDeleteConfirmed: boolean) => {
            if (isDeleteConfirmed) {
                // pass data to parent
                this.onDeleted.emit(group);
            }
        });
    }

    // @method onGroupChanged: send all groups information to parent when has some change to parent component
    // the method trigger by user rename, move group position (updateData event of angula-tree-component) 
    // @parameter $event {any}: the parameter contian changed tree root model (angular-tree-component)
    // @return {void}
    onGroupChanged($event: any) {
        this.onChanged.emit($event.treeModel.nodes);
    }

    // @method onNameChanged: update tree root model data when edited group name
    // the method trigger by user edited group name when lost focus form input 
    // then receive new group name and group id
    // find all nested group object by group id if a group has updated id, it will assign
    // new group name to name property
    // and pass updated group information listings to parent component
    // @parameter $event {any}: input value changed's event object
    // @parameter groupId {string}: group id
    // @return {void}
    onNameChanged($event: any, groupId: string) {

        // find group by id
        // do it all group
        // @function iter: named function to use local process
        this.groups.forEach(function iter(group) {
            // if group contain same assign new group name 
            // to name property
            if (group.id == groupId) {
                group.name = $event.target.value;
            }

            // if children is not empty array, process again with children object
            if (group.children && group.children.length > 0) {
                group.children.forEach(iter);
            }
        });

        this.tree.treeModel.update();
        this.onChanged.emit(this.tree.treeModel.nodes as any);
    }

    onGroupSelected($event: any) {
        this.sideMenuItems = [
            {
                title: 'View all',
                icon: 'list-outline',
                selected: false
            }
        ];
        this.onSelected.emit($event.node.data);
    }

}