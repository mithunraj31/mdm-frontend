import { Component } from '@angular/core';
import { LegendItemModel } from '../../@core/entities/legend-item.model';
import { NgxLegendItemColor } from '../../@core/enums/enum.legend-item-color';
import { DeviceModelSummaryModel } from '../../@core/entities/device-model-summary.mode';
import { LicenseStatusModel } from '../../@core/entities/license-status.mode';

@Component({
  selector: 'mdm-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  //@property deviceSummary: contain overview device status in the system
  // ex. total device, online count, active count, enrolled count.
  deviceSummary: any = {};

  //@property deviceActiveChartLegends: contain labels for active device chart
  // data format => LegendItemModel
  deviceActiveChartLegends: LegendItemModel[];

  //@property deviceOnlineChartLegends: contain labels for online device chart
  // data format => LegendItemModel
  deviceOnlineChartLegends: LegendItemModel[];

  //@property deviceEnrollmentChartLegends: contain labels for enrollment device chart
  // data format => LegendItemModel
  deviceEnrollmentChartLegends: LegendItemModel[];

  //@property deviceModelSummaries: device model status listings 
  // each models will contain online and offline status
  // data format => DeviceModelSummaryModel
  deviceModelSummaries: DeviceModelSummaryModel[];

  //@property licenseStatus: device license status listings 
  // each models will contain number of expired device, active device and etc.
  // data format => LicenseStatusModel
  licenseStatus: LicenseStatusModel[];

  constructor() {

    // mockup data
    this.deviceSummary = {
      registedCount: 20,
      activeCount: 15,
      onlineCount: 12,
      enrolledCount: 10,
    };

    this.deviceActiveChartLegends = [
      {
        iconColor: NgxLegendItemColor.YELLOW,
        title: 'active',
      },
      {
        iconColor: NgxLegendItemColor.GREEN,
        title: 'inactive',
      },
    ];

    this.deviceOnlineChartLegends = [
      {
        iconColor: NgxLegendItemColor.YELLOW,
        title: 'online',
      },
      {
        iconColor: NgxLegendItemColor.GREEN,
        title: 'offline',
      },
    ];

    this.deviceEnrollmentChartLegends = [
      {
        iconColor: NgxLegendItemColor.YELLOW,
        title: 'enrolled',
      },
      {
        iconColor: NgxLegendItemColor.GREEN,
        title: 'unenrolled',
      },
    ];

    this.deviceModelSummaries = [
      {
        name: 'Unknown',
        online: 0,
        offline: 1,
      },
      {
        name: 'F740',
        online: 12,
        offline: 7,
      },
    ];

    this.licenseStatus = [
      {
        name: '1 year',
        expiredCount: 0,
        availableCount: 15,
        inuseCount: 8,
      },
      {
        name: '3 year',
        expiredCount: 0,
        availableCount: 5,
        inuseCount: 4,
      },
    ];
  }
}
