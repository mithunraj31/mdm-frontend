import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'mdm-device-detail-general',
    templateUrl: './general.component.html',
  })
  export class GeneralComponent implements OnInit {
  
    constructor(private route: ActivatedRoute) {
      
    }
  
    // observer route params of /pages/devices/{id}
    // @type {string}
    // parms "id" is device ID 
    // when enter to details page will obtain some value
    // then use the value to specific device from Backend API
    ngOnInit() {
      this.route.paramMap.subscribe(paramMap => {
        console.log('Logs:' + paramMap.get('id'))
      });
    }
  }