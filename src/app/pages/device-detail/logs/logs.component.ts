import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserAccount } from './../../../@core/entities/UserAccount.model';
import { DeviceService } from './../../../services/device.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';
import { LogModel } from '../../../@core/entities/log.model';
import { LocalDataSource } from 'ng2-smart-table';

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

  logs$: Observable<LogModel[]>;

  source = new LocalDataSource();

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService) {

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
          valuePrepareFunction: (loggedAt: string) => {
            return new Date(loggedAt).toDateString();
          },
        },
        owner: {
          title: 'Logged by',
          // mapping nested property of user data to display ownner name
          valuePrepareFunction: (owner: UserAccount) => {
            return owner.name;
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

    });
    this.getLogs(this.deviceId, 0, 10);

  }

  // param "uuid" is Device ID which need to get logs
  // param "page" & "size" is used to manage pagination
  // response is containing "totalSize","size" and "totalPage" as well.
  getLogs(uuid: string, page: number, size: number) {
    this.logs$ = this.deviceService.getLogs(uuid, page, size).pipe(map(result => {
      const logs: LogModel[] = [];
      if (result?.data) {
        result.data.forEach(log => {
          // console.log(log);
          let tempLog: LogModel = {
            event: log.category || '',
            loggedAt: log.loggedAt || '',
            message: log.log || '',
            owner: {
              name: log.logger?.profile?.name || '',
              uuid: log.logger?.profile?.name || null,
            }
          }
          logs.push(tempLog);
        });
      }
      return logs;
    }
    ));
  }
}