import { Component, Input } from '@angular/core';
import { LegendItemModel } from '../../../@core/entities/legend-item.model';

@Component({
  selector: 'ngx-legend-chart',
  styleUrls: ['./legend-chart.component.scss'],
  templateUrl: './legend-chart.component.html',
})
export class DashboardLegendChartComponent {
  @Input()
  legendItems: LegendItemModel[] = [];
}
