import { DashboardService } from './../../services/dashboard.service';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { LegendItemModel } from '../../@core/entities/legend-item.model';
import { NgxLegendItemColor } from '../../@core/enums/enum.legend-item-color';
import { DeviceModelSummaryModel } from '../../@core/entities/device-model-summary.mode';
import { LicenseStatusModel } from '../../@core/entities/license-status.mode';

@Component({
  selector: 'mdm-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  // @property deviceSummary: device status chart values
  // obtain from backend api
  // the object contains peroperties =>
  // @property registedCount {number}
  // @property activeCount {number}
  // @property onlineCount {number}
  // @property enrolledCount {number}
  // @type {any}
  deviceSummary: any = {};

  // @property deviceActiveChartLegends: active deveice chart labels
  // use for display labels on bottom of chart card
  // config value at constructor
  // @type {LegendItemModel[]}
  deviceActiveChartLegends: LegendItemModel[];

  // @property deviceOnlineChartLegends: online device chart labels
  // use for display labels on bottom of chart card
  // config value at constructor
  // @type {LegendItemModel[]}
  deviceOnlineChartLegends: LegendItemModel[];

  // @property deviceEnrollmentChartLegends: enrolled device chart labels
  // use for display labels on bottom of chart card
  // config value at constructor
  // @type {LegendItemModel[]}
  deviceEnrollmentChartLegends: LegendItemModel[];

  // @property deviceModelSummaries: device model status table data
  // use for dispaly on table
  // each model contain online, offince status
  // @type {DeviceModelSummaryModel[]}
  deviceModelSummaries: DeviceModelSummaryModel[] = [];


  // @property licenseStatus: device model status table data
  // use for dispaly on table
  // each model contain license name and contract period
  // @type {DeviceModelSummaryModel[]}
  licenseStatus: LicenseStatusModel[] = [];

  // @property dashboardSpinners: device status's display loading spinner fact
  // each properties, data type is boolean
  // assign the proeprty to nbSpinner Directive
  // @type {any}
  dashboardSpinners = {
    statusChart: false,
    modelTable: false,
    licenseTable: false
  };

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    // while the component initializing 
    // request dash data
    this.getLicense();
    this.getModels();
    this.getDeviceStatus();
  }

  initCharts() {
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

  }
  // @method getLicense: request license status from backend API
  // to display license data table
  // the method will eanble spinner
  // then send http request for data from backend API
  // mapping obtained data to model and assign to listings
  // @return {void}
  getLicense() {
    this.dashboardSpinners.licenseTable = true;
    this.dashboardService.getLicense()
      .subscribe(result => {
        this.dashboardSpinners.licenseTable = false;
        if (result && result.data) {
          const licenses = result.data as any[];
          this.licenseStatus = licenses.map(license => <LicenseStatusModel>{
            availableCount: license.report.used,
            expiredCount: license.report.expired,
            inuseCount: license.report.active,
            name: license.name
          });
        }
      }, error => {
        this.dashboardSpinners.licenseTable = false;
      });
  }

  // @method getModels: request device model status from backend API
  // to display license data table
  // the method will eanble spinner
  // then send http request for data from backend API
  // mapping obtained data to model and assign to listings
  // @return {void}
  getModels() {
    this.dashboardSpinners.modelTable = true;
    this.dashboardService.getModelStatus()
      .subscribe(result => {
        this.dashboardSpinners.modelTable = false;
        if (result && result.data && result.data.model) {
          const models = result.data.model;
          this.deviceModelSummaries = Object.keys(models)
            .map(key => <DeviceModelSummaryModel>{
              name: key,
              count: models[key]
            });
        }

      }, error => {
        this.dashboardSpinners.modelTable = false;
      });
  }

  // @method getDeviceStatus: request device status from backend API
  // to display license data table
  // the method will eanble spinner
  // then send http request for data from backend API
  // mapping obtained data to model and assign to listings
  // @return {void}
  getDeviceStatus() {
    this.dashboardSpinners.statusChart = true;
    this.dashboardService.getDeviceStatus()
      .subscribe(result => {
        this.dashboardSpinners.statusChart = false;
        if (result && result.data) {
          const totalCount: number = result.data.total || 0;

          this.deviceSummary = {
            registedCount: totalCount,
            activeCount: totalCount - (result.data.inactive || 0),
            onlineCount: result.data.online || 0,
            enrolledCount: result.data.enrolled || 0,
          };
          this.initCharts();
        }
      }, error => {
        this.dashboardSpinners.statusChart = false;
      });
  }
}
