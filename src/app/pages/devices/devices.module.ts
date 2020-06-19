import { NgModule } from '@angular/core';
import { NbCardModule, NbToggleModule, NbButtonModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { DevicesComponent } from './devices.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { DeviceListingsTableComponent } from './device-listings-table/device-listings-table.component';
import { AddDeviceManualModalComponent } from './add-device-manual-modal/add-device-manual-modal.component';

@NgModule({
    imports: [
        FormsModule,
        ThemeModule,
        NbCardModule,
        Ng2SmartTableModule,
        NbToggleModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
    ],
    declarations: [
        DevicesComponent,
        DeviceListingsTableComponent,
        AddDeviceManualModalComponent,
    ],
  })
  export class DevicesModule {

  }
