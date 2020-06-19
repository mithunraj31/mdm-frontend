import { NgModule } from '@angular/core';
import { NbCardModule, NbListModule } from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardStatisticPieComponent } from './statistic-pie/statistic-pie.component';
import { DashboardLegendChartComponent } from './legend-chart/legend-chart.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NgxEchartsModule,
    NbListModule,
  ],
  declarations: [
    DashboardComponent,
    DashboardStatisticPieComponent,
    DashboardLegendChartComponent,
  ],
})
export class DashboardModule { }
