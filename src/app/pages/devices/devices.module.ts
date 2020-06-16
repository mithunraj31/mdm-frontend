import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { DevicesComponent } from './devices.component';

@NgModule({
    imports: [
        ThemeModule,
        NbCardModule,
    ],
    declarations: [
        DevicesComponent,
    ],
  })
  export class DevicesModule {

  }
