import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PercentPieModel } from '../../../@core/entities/percent-pie.model';

@Component({
    selector: 'mdm-device-detail-general',
    templateUrl: './general.component.html',
    styles: ['.list-contianer { padding-top: 0.5rem; }']
  })
  export class GeneralComponent implements OnInit {
    // @variable deviceId: Device Id
    // use for specific device data in the application
    // the data will receive from parent route param {id}
    // @type {string}
    deviceId: string;


    // @variable basicInformation: Key pair value listing of device basic information
    // the data contain hardware basic info.
    // values obtain from backend API
    // then retrive on first Accordion panel 
    // source of ng2-smart-table
    // @type {{ key:string, value: string }[]}
    basicInformation: { key:string, value: string }[];

    // @variable relatedInfomation: Key pair value listing of device related information
    // the data contain owner info, device profile info or etc.
    // values obtain from backend API
    // then retrive on second Accordion panel 
    // source of ng2-smart-table
    // @type {{ key:string, value: string }[]}
    relatedInfomation: { key:string, value: string }[];


    // @variable license: Key pair value listing of device license information
    // the data contain owner license type and license period
    // values obtain from backend API
    // then retrive on last Accordion panel 
    // source of ng2-smart-table
    // @type {{ key:string, value: string }[]}
    license: { key:string, value: string }[];

    // @variable wifiDetails: Key pair value listing of device WIFI information
    // the data contain owner WIFI is enabled and MAC address
    // values obtain from backend API
    // then retrive on 3rd Accordion panel's first tab
    // source of ng2-smart-table
    // @type {{ key:string, value: string }[]}
    wifiDetails:  { key:string, value: string }[];

    // @variable bluetoothDetails: Key pair value listing of device bluetooth information
    // the data contain owner bluetooh is enabled, MAC address and etc.
    // values obtain from backend API
    // then retrive on 3rd Accordion panel's 2nd tab
    // source of ng2-smart-table
    // @type {{ key:string, value: string }[]}
    bluetoothDetails:  { key:string, value: string }[];

    // @variable phoneDetails: Key pair value listing of device phone information
    // the data contain owner data usage and .
    // values obtain from backend API
    // then retrive on 3rd Accordion panel's 3rd tab
    // source of ng2-smart-table
    // @type {{ key:string, value: string }[]}
    phoneDetails:  { key:string, value: string }[];

    // @varible storageChart: device storage usage info for status chart
    // the data contain labels and percent value (x of 100% should be number)
    // obtain from backend API then display chart foramt
    // @type {PercentPieModel}
    storageChart: PercentPieModel;

    // @varible memoryUsageChart: device memory usage info for status chart
    // the data contain labels and percent value (x of 100% should be number)
    // obtain from backend API then display chart foramt
    // @type {PercentPieModel}
    memoryUsageChart: PercentPieModel;

    // @varible wifiChart: device WIFI data usage info for status chart
    // the data contain labels and percent value (x of 100% should be number)
    // obtain from backend API then display chart foramt
    // @type {PercentPieModel}
    wifiChart: PercentPieModel;

    // @varible batteryChart: device battery status info for status chart
    // the data contain labels and percent value (x of 100% should be number)
    // obtain from backend API then display chart foramt
    // @type {PercentPieModel}
    batteryChart: PercentPieModel;
  
    constructor(private route: ActivatedRoute) {
      
    }
  
    // observer route params of /pages/devices/{id}
    // @type {string}
    // parms "id" is device ID 
    // when enter to details page will obtain some value
    // then use the value to specific device from Backend API
    ngOnInit() {
      this.route.parent.params.subscribe(paramMap => {
        this.deviceId = paramMap.id;

        this.storageChart = {
          title: 'Device Storage',
          description: '1.3 GB / 11.9 GB',
          value: 11
        };

        this.memoryUsageChart = {
          title: 'Memory usagee',
          description: '417.2 MB / 1.8 GB',
          value: 22
        };

        this.wifiChart = {
          title: 'WiFi Data usage',
          description: '2.91 MB (2020-06-01 ~ 2020-06-30)',
          value: 100
        };

        this.batteryChart = {
          title: 'Battery status',
          description: 'Not charging',
          value: 10
        }
        
        this.basicInformation = [
          {
            key: 'Model number',
            value: 'F740'
          },
          {
            key: 'Serial Number',
            value: 'G7P97J00022'
          },
          {
            key: 'Status',
            value: 'Off-line'
          },
          {
            key: 'Os version',
            value: '6.0.1'
          },
          {
            key: 'Kernel version',
            value: '3.10.49-ga5f0b3a buildmach@ea79cf5cdd7a #1 Tue Oct 15 03:00:59 UTC 2019'
          },
          {
            key: 'Build number',
            value: 'R33.1.5646.1015'
          },
          {
            key: 'Model type',
            value: 'N564'
          },
        ];

        this.relatedInfomation = [
          {
            key: 'Group',
            value: '[技術部] MiDM評価用/APIテスト・評価用'
          },
          {
            key: 'Owner',
            value: 'Mithunraj mbel001@mbel.co.jp'
          },
          {
            key: 'Profile',
            value: '◇MiDM評価◇ 作成 尾松　Don\'t remove & modify'
          },
          {
            key: 'Enrollment date',
            value: 'May 20, 2020 12:39:24 PM'
          },
          {
            key: 'Last checked in',
            value: 'May 20, 2020 12:39:24 PM'
          },
          {
            key: 'Registered date',
            value: 'May 20, 2020 12:39:24 PM'
          },
          {
            key: 'Last updated',
            value: 'Jun 2, 2020 1:58:11 PM'
          },
        ];

        this.license = [
          {
            key: 'Model',
            value: '1 Year'
          },
          {
            key: 'Assigned',
            value: 'May 20, 2020'
          },
          {
            key: 'Activated',
            value: 'Aug 6, 2019'
          },
          {
            key: 'expiry',
            value: 'Aug 7, 2020'
          },
          {
            key: 'Auto renew',
            value: 'false'
          }
        ];

        this.wifiDetails = [
          {
            key: 'Enabled',
            value: 'true'
          },
          {
            key: 'WiFi MAC address',
            value: '00:22:4d:eb:d1:42'
          },
        ];

        this.bluetoothDetails = [
          {
            key: 'Enabled',
            value: 'true'
          },
          {
            key: 'Bluetooth name',
            value: 'QCOM-BTD'
          },
          {
            key: 'Bluetooth MAC address',
            value: '22:22:A5:4E:C5:DC'
          },
        ];

        this.phoneDetails = [
          {
            key: 'Phone carrier',
            value: 'IIJ'
          },
          {
            key: 'Phone number',
            value: ''
          },
          {
            key: 'ICCID',
            value: '440030010903766'
          },
          {
            key: 'Data enabled',
            value: 'true'
          },
          {
            key: 'Data roaming enabledd',
            value: 'true'
          },
        ];
      });
    }
  }