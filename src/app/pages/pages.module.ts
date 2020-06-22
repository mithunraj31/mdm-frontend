import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { DevicesModule } from './devices/devices.module';
import { DeviceDetailModule } from './device-detail/device-detail.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    DevicesModule,
    DeviceDetailModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
