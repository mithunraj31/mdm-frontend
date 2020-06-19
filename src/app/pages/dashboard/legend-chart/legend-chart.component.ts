import { Component, Input } from '@angular/core';
import { LegendItemModel } from '../../../@core/entities/legend-item.model';

@Component({
  selector: 'mdm-legend-chart',
  styleUrls: ['./legend-chart.component.scss'],
  templateUrl: './legend-chart.component.html',
})
export class DashboardLegendChartComponent {

  //@property legendItems: cotain labels, display under chart.
  // data format => LegendItemModel
  @Input()
  legendItems: LegendItemModel[] = [];
}
