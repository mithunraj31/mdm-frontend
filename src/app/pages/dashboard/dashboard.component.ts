import { Component, AfterViewInit } from '@angular/core';
import { LegendItemModel } from '../../@core/entities/legend-item.model';
import { NgxLegendItemColor } from '../../@core/enums/enum.legend-item-color';
import { DeviceModelSummaryModel } from '../../@core/entities/device-model-summary.mode';
import { LicenseStatusModel } from '../../@core/entities/license-status.mode';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements AfterViewInit {

  deviceSummary: any = {};

  deviceActiveChartLegends: LegendItemModel[];

  deviceOnlineChartLegends: LegendItemModel[];

  deviceEnrollmentChartLegends: LegendItemModel[];

  deviceModelSummaries: DeviceModelSummaryModel[];

  licenseStatus: LicenseStatusModel[];

  constructor() {
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

  ngAfterViewInit(): void {


  }
}
