import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mdm-device-detail',
  styleUrls: ['./device-detail.component.scss'],
  templateUrl: './device-detail.component.html',
})
export class DeviceDetailComponent implements OnInit {

  // @variable tab: initalize Tabs configuration for device device tab
  // each tabs contin tile and display component route
  // @type {any[]}
  // reference: https://akveo.github.io/nebular/docs/components/tabs/overview#nbtabsetcomponent
  tabs: any[] = [];  

  constructor() {
    
  }

  ngOnInit() {
    this.tabs = [
      {
        title: 'General',
        route: ['./general'],
      },
      {
        title: 'Applications',
        route: ['./apps'],
      },
      {
        title: 'Logs',
        route: ['./logs'],
      },
    ];
  }
}
