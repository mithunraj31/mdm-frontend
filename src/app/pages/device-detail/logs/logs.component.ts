import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';
import { LogModel } from '../../../@core/entities/log.model';

@Component({
  selector: 'mdm-logs',
  styleUrls: ['./logs.component.scss'],
  templateUrl: './logs.component.html',
})
export class LogsComponent implements OnInit {
  //@variable tableSettings: use for config UI of ng2-smart-table
  //@type {any}
  tableSettings: any = {};

  // @variable logs: device log activies 
  // recieve from backend API then retrive on ng2-smart-table
  // the data contains event name, log owner, logged date and message.
  // @type {LogModel[]}
  logs: LogModel[] = [];

  // @variable deviceId: Device Id
  // use for specific device data in the application
  // the data will receive from parent route param {id}
  // @type {string}
  deviceId: string;

  // @variable sideMenuItems: Device application page tab side menu configuration
  // the data contains menu title, prefixe icon class name and meni is active face
  // @type {NbMenuItem[]}
  sideMenuItems: NbMenuItem[] = [];

  constructor(private route: ActivatedRoute) {
    this.sideMenuItems = [
      {
        title: 'View all',
        icon: 'list-outline',
        selected: true
      }
    ];

    this.tableSettings = {
      // hide create, update, and delete row buttons from ng2-smart-table
      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      // hide filter row
      hideSubHeader: true,
      // the property contains column configurations.
      columns: {
        event: {
          title: 'Event',
        },
        message: {
          title: 'Message',
        },
        loggedAt: {
          title: 'Logged at',
          // mapping date property for display format
          valuePrepareFunction: (logged: Date) => {
            return logged.toLocaleString();
          },
        },
        owner: {
          title: 'Logged by',
          // mapping nested property of user data to display ownner name
          valuePrepareFunction: (owner: Account) => {
            return owner.displayName;
          },
        },
      },
    };
  }

  ngOnInit() {
    // observer route params of /pages/devices/{id}
    // @type {string}
    // parms "id" is device ID 
    // when enter to details page will obtain some value
    // then use the value to specific device from Backend API
    this.route.parent.params.subscribe(paramMap => {
      this.deviceId = paramMap.id;

      this.logs = [
        {
          event: 'Trance',
          loggedAt: new Date(),
          message: 'App(com.atok.mobile.im.mbel.service 1.0.0(1)) has been added.',
          owner: {
            displayName: 'Pongpeera',
            id: '',
            rpDisplayName: '',
          }
        },
        {
          event: 'Update',
          loggedAt: new Date(),
          message: 'Device information has been updated',
          owner: {
            displayName: 'Pongpeera',
            id: '',
            rpDisplayName: '',
          }
        },
        {
          event: 'Update',
          loggedAt: new Date(),
          message: 'Notified to update profiles.',
          owner: {
            displayName: 'Pongpeera',
            id: '',
            rpDisplayName: '',
          }
        }, {
          event: 'Trance',
          loggedAt: new Date(),
          message: 'Configuration profile \'◇MiDM評価◇ 作成 尾松　Don\'t remove & modify(d7fe88e4-8519-4711-b389-a49201ce9eb4)\' has been applied.',
          owner: {
            displayName: 'Pongpeera',
            id: '',
            rpDisplayName: '',
          }
        }
      ];
    });
  }
}