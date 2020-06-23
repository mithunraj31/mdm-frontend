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

  dashboardSpiners = {
    statusChart: false,
    modelTable: false,
    licenseTable: false
  };

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
      registedCount: 0,
      activeCount: 0,
      onlineCount: 0,
      enrolledCount: 0,
    };
  }

  ngOnInit(): void {
    this.getLicense();
    this.getModels();
    this.getDeviceStatus();
  }

  ngAfterViewInit(): void {
  }

  getLicense() {
    this.dashboardSpiners.licenseTable = true;
    this.dashboardService.getLicense()
      .subscribe(result => {
        this.dashboardSpiners.licenseTable = false;
        if (result && result.data) {
          result.data.forEach(license => {
            let l: LicenseStatusModel = {
              availableCount: license.report.used,
              expiredCount: license.report.expired,
              inuseCount: license.report.active,
              name: license.name
            }
            this.licenseStatus.push(l);
          });
        }
      }, error => {
        this.dashboardSpiners.licenseTable = false;
      });
  }

  getModels() {
    this.dashboardSpiners.modelTable = true;
    this.dashboardService.getModelStatus()
      .subscribe(result => {
        this.dashboardSpiners.modelTable = false;
        if (result && result.data && result.data.model) {
          for (let model in result.data.model) {
            const m: DeviceModelSummaryModel = {
              name: model,
              count: result.data.model[model]
            }
            this.deviceModelSummaries.push(m);
          }
        }

      }, error => {
        this.dashboardSpiners.modelTable = false;
      });
  }

  getDeviceStatus() {
    this.dashboardSpiners.statusChart = true;
    this.dashboardService.getDeviceStatus()
      .subscribe(result => {
        this.dashboardSpiners.statusChart = false;
        if (result && result.data) {
          const totalCount: number = result.data.total || 0;
          console.log(totalCount, result.data.inactive);
          this.deviceSummary = {
            registedCount: totalCount,
            activeCount: totalCount - (result.data.inactive || 0),
            onlineCount: result.data.online || 0,
            enrolledCount: result.data.enrolled || 0,
          }
        }
      }, error => {
        this.dashboardSpiners.statusChart = false;
      });
  }
}
