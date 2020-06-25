import { NgModule } from '@angular/core';
import { DeviceDetailComponent } from './device-detail.component';
import { 
  NbTabsetModule, 
  NbCardModule, 
  NbRouteTabsetModule, 
  NbListModule, 
  NbMenuModule,
  NbAccordionModule,  } from '@nebular/theme';
import { AppsComponent } from './apps/apps.component';
import { LogsComponent } from './logs/logs.component';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { GeneralComponent } from './general/general.component';
import { ThemeModule } from '../../@theme/theme.module';
import { PercentPieComponent } from './percent-pie/percent-pie.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
    imports: [
      CommonModule,
      ThemeModule,
      NbListModule,
      NbTabsetModule,
      NbRouteTabsetModule,
      NbCardModule,
      NbMenuModule,
      Ng2SmartTableModule,
      NbAccordionModule,
      NgxEchartsModule,
    ],
    declarations: [
      DeviceDetailComponent,
      GeneralComponent,
      AppsComponent,
      LogsComponent,
      PercentPieComponent,
    ],
    exports: [CommonModule]
  })
  export class DeviceDetailModule {

  }
