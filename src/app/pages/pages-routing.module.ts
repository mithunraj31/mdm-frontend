import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicesComponent } from './devices/devices.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { AppsComponent } from './device-detail/apps/apps.component';
import { LogsComponent } from './device-detail/logs/logs.component';
import { GeneralComponent } from './device-detail/general/general.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'devices',
      children: [
        {
          path: '',
          component: DevicesComponent,
        },
        {
          path: ':id',
          component: DeviceDetailComponent,
          children: [
            {
              path: '',
              redirectTo: 'general',
              pathMatch: 'full',
            },
            {
              path: 'general',
              component: GeneralComponent,
            },
            {
              path: 'apps',
              component: AppsComponent,
            },
            {
              path: 'logs',
              component: LogsComponent,
            }
          ]
        }
      ]
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
