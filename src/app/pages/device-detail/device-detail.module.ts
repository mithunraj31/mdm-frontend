import { NgModule } from '@angular/core';
import { DeviceDetailComponent } from './device-detail.component';
import { NbTabsetModule, NbCardModule, NbRouteTabsetModule, NbListModule, NbMenuModule } from '@nebular/theme';
import { AppsComponent } from './apps/apps.component';
import { LogsComponent } from './logs/logs.component';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
    imports: [
      CommonModule,
      NbListModule,
      NbTabsetModule,
      NbRouteTabsetModule,
      NbCardModule,
      NbMenuModule,
      Ng2SmartTableModule,
    ],
    declarations: [
      DeviceDetailComponent,
      AppsComponent,
      LogsComponent,
    ],
    exports: [CommonModule]
  })
  export class DeviceDetailModule {

  }
