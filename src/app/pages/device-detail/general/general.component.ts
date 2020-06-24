import { DeviceService } from './../../../services/device.service';
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
  basicInformation: { key: string, value: string }[];

  // @variable relatedInfomation: Key pair value listing of device related information
  // the data contain owner info, device profile info or etc.
  // values obtain from backend API
  // then retrive on second Accordion panel 
  // source of ng2-smart-table
  // @type {{ key:string, value: string }[]}
  relatedInfomation: { key: string, value: string }[];


  // @variable license: Key pair value listing of device license information
  // the data contain owner license type and license period
  // values obtain from backend API
  // then retrive on last Accordion panel 
  // source of ng2-smart-table
  // @type {{ key:string, value: string }[]}
  license: { key: string, value: string }[];

  // @variable wifiDetails: Key pair value listing of device WIFI information
  // the data contain owner WIFI is enabled and MAC address
  // values obtain from backend API
  // then retrive on 3rd Accordion panel's first tab
  // source of ng2-smart-table
  // @type {{ key:string, value: string }[]}
  wifiDetails: { key: string, value: string }[];

  // @variable bluetoothDetails: Key pair value listing of device bluetooth information
  // the data contain owner bluetooh is enabled, MAC address and etc.
  // values obtain from backend API
  // then retrive on 3rd Accordion panel's 2nd tab
  // source of ng2-smart-table
  // @type {{ key:string, value: string }[]}
  bluetoothDetails: { key: string, value: string }[];

  // @variable phoneDetails: Key pair value listing of device phone information
  // the data contain owner data usage and .
  // values obtain from backend API
  // then retrive on 3rd Accordion panel's 3rd tab
  // source of ng2-smart-table
  // @type {{ key:string, value: string }[]}
  phoneDetails: { key: string, value: string }[];

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

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService) {

  }

  // observer route params of /pages/devices/{id}
  // @type {string}
  // parms "id" is device ID 
  // when enter to details page will obtain some value
  // then use the value to specific device from Backend API
  ngOnInit() {

    this.route.parent.params.subscribe(paramMap => {
      this.deviceId = paramMap.id;

      this.getGeneralDeviceDetails();
      this.storageChart = {
        title: 'N/A',
        description: 'N/A',
        value: 0
      };

      this.memoryUsageChart = {
        title: 'Memory Usage',
        description: 'N/A',
        value: 0
      };

      this.wifiChart = {
        title: 'WiFi Data usage',
        description: '2.91 MB (2020-06-01 ~ 2020-06-30)',
        value: 100
      };

      this.batteryChart = {
        title: 'Battery status',
        description: 'N/A',
        value: 0
      }

      // this.basicInformation = [
      //   {
      //     key: 'Model number',
      //     value: 'F740'
      //   },
      //   {
      //     key: 'Serial Number',
      //     value: 'G7P97J00022'
      //   },
      //   {
      //     key: 'Status',
      //     value: 'Off-line'
      //   },
      //   {
      //     key: 'Os version',
      //     value: '6.0.1'
      //   },
      //   {
      //     key: 'Kernel version',
      //     value: '3.10.49-ga5f0b3a buildmach@ea79cf5cdd7a #1 Tue Oct 15 03:00:59 UTC 2019'
      //   },
      //   {
      //     key: 'Build number',
      //     value: 'R33.1.5646.1015'
      //   },
      //   {
      //     key: 'Model type',
      //     value: 'N564'
      //   },
      // ];

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

  getGeneralDeviceDetails() {
    this.deviceService.getDeviceById(this.deviceId).subscribe(result => {
      console.log(result);
      // Storage chart values
      let totalStorage: number = result?.data?.profile?.hardware_info?.storages[0]?.total || 0;
      let freeStorage: number = result?.data?.profile?.hardware_info?.storages[0]?.free || 0;
      let usedStorage: number = totalStorage - freeStorage > 0 ? totalStorage - freeStorage : 0;
      let usedStoragePercentage: number = +(usedStorage / totalStorage * 100).toFixed(0);

      this.storageChart = {
        title: result?.data?.profile?.hardware_info?.storages[0]?.name || 'N/A',
        description: this.formatBytes(usedStorage) + " / " + this.formatBytes(totalStorage),
        value: usedStoragePercentage
      }

      // Memory chart Values
      let totalMemory: number = result?.data?.profile?.hardware_info?.memory?.total || 0;
      let freeMemory: number = result?.data?.profile?.hardware_info?.memory?.free || 0;
      let usedMemory: number = totalMemory - freeMemory > 0 ? totalMemory - freeMemory : 0;
      let usedMemoryPercentage: number = +(usedMemory/ totalMemory* 100).toFixed(0);

      this.memoryUsageChart.description = this.formatBytes(usedMemory) + " / " + this.formatBytes(totalMemory)
      this.memoryUsageChart.value = usedMemoryPercentage;

      // Battery chart values
      this.batteryChart.description = result?.data?.profile?.hardware_info?.battery.isCharging==true?'Charging':'Not Charging';
      this.batteryChart.value = result?.data?.profile?.hardware_info?.battery?.level || 0;

      // Wifi chart Data Usage
      this.wifiChart.description = 
      this.formatBytes(result?.data?.profile?.network?.dataUsage?.wifi?.rx+result?.data?.profile?.network?.dataUsage?.wifi?.tx)
        + " ("+ new Date(result?.data?.profile?.network?.dataUsage?.wifi?.from).toDateString()
        + " - "+ new Date(result?.data?.profile?.network?.dataUsage?.wifi?.to).toDateString()
        + ")";

      // Basic Information
      this.basicInformation = [
        {
          key: 'Model number',
          value: result?.data?.profile?.hardware_info?.model || 'N/A'
        },
        {
          key: 'Serial Number',
          value: result?.data?.profile?.hardware_info?.serial_no || 'N/A'
        },
        {
          key: 'Status',
          value: result?.data?.states?.isOnline?'Online':'Offline'
        },
        {
          key: 'Os version',
          value: result?.data?.profile?.software_info?.os_version || 'N/A'
        },
        {
          key: 'Kernel version',
          value: result?.data?.profile?.software_info?.kernel_version || 'N/A'
        },
        {
          key: 'Build number',
          value: result?.data?.profile?.software_info?.build_no || 'N/A'
        },
        {
          key: 'Model type',
          value: result?.data?.profile?.hardware_info?.product_id || 'N/A'
        },
      ];
    },
      // When the deviceId from the url parameter is invalid
      // then status will return as 400
      // <Implimentation Needed>should enable an error message or redirect back to device-list
      error => {
        if (error &&
          error.status &&
          error.status == 400) {
          console.log("Invalid device id");
        }
      })
  }
  private formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}