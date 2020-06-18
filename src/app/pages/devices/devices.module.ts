import { NgModule } from '@angular/core';
import { NbCardModule, NbToggleModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { DevicesComponent } from './devices.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbToggleWraperComponent } from '../../@theme/components/nebular-wraper/mdm-toggle.component';

@NgModule({
    imports: [
        ThemeModule,
        NbCardModule,
        Ng2SmartTableModule,
        NbToggleModule,
    ],
    declarations: [
        DevicesComponent,
        NbToggleWraperComponent
    ],
  })
  export class DevicesModule {

  }
