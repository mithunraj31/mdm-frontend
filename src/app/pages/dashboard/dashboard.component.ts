import { DashboardService } from './../../services/dashboard.service';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { LegendItemModel } from '../../@core/entities/legend-item.model';
import { NgxLegendItemColor } from '../../@core/enums/enum.legend-item-color';
import { DeviceModelSummaryModel } from '../../@core/entities/device-model-summary.mode';
import { LicenseStatusModel } from '../../@core/entities/license-status.mode';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements AfterViewInit, OnInit {

  deviceSummary: any = {};

  deviceActiveChartLegends: LegendItemModel[];

  deviceOnlineChartLegends: LegendItemModel[];

  deviceEnrollmentChartLegends: LegendItemModel[];

  deviceModelSummaries: DeviceModelSummaryModel[] = [];

  licenseStatus: LicenseStatusModel[] = [];

  constructor(private dashboardService: DashboardService) {

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

    this.deviceSummary = {
      registedCount: 3,
      activeCount: 3,
      onlineCount: 3,
      enrolledCount: 3,
    }
  }
  ngOnInit(): void {
    this.getLicense();
    this.getModels();
    this.getDeviceStatus();
  }

  ngAfterViewInit(): void {


  }
  getLicense() {
    this.dashboardService.getLicense().subscribe(result => {
      // console.log(result);
      result.data.forEach(license => {
        let l: LicenseStatusModel = {
          availableCount: license.report.used,
          expiredCount: license.report.expired,
          inuseCount: license.report.active,
          name: license.name
        }
        this.licenseStatus.push(l);
      });
    })
  }
  getModels() {
    this.dashboardService.getModelStatus().subscribe(result => {
      // console.log(result)
      for (let model in result.data.model) {
        // console.log(model);
        let m: DeviceModelSummaryModel = {
          name: model,
          count: result.data.model[model]
        }
        this.deviceModelSummaries.push(m);
      }
    });
  }
  getDeviceStatus() {
    this.dashboardService.getDeviceStatus().subscribe(result => {
      this.deviceSummary = {
        registedCount: result.data.total,
        activeCount: result.data.total - result.data.inactive,
        onlineCount: result.data.online,
        enrolledCount: result.data.enrolled,
      }
    })
  }
}
