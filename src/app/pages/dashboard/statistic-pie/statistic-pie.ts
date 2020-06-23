import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { delay, takeWhile } from 'rxjs/operators';
import { LayoutService } from '../../../@core/utils/layout.service';
import { LegendItemModel } from '../../../@core/entities/legend-item.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'mdm-statistic-pie',
  styleUrls: ['./statistic-pie.component.scss'],
  templateUrl: './statistic-pie.component.html',
})
export class DashboardStatisticPieComponent implements AfterViewInit, OnDestroy {

  private _alive = true;
  // issue#: when component call ngAfterViewInit 
  // NbThemeService.getJsTheme() subscribe faster than 
  // the global varibles obtain data from parent component
  // DashboardStatisticPieComponent.setOptions() will excute without chart value
  // sometime the compoment will create wrong chart

  // 1st solution
  // create component input as observer 
  // after subscribe input value excute NbThemeService.getJsTheme()
  private _maxValue = new BehaviorSubject<number>(0);
  private _value = new BehaviorSubject<number>(0);
  private _chartLengends = new BehaviorSubject<LegendItemModel[]>([]);

  @Input() set maxValue(val: number) {
    this._maxValue.next(val);
  }

  get maxValue() {
    return this._maxValue.getValue();
  }

  @Input() set value(val: number) {
    this._value.next(val);
  }

  get value() {
    return this._value.getValue();
  }


  @Input() set chartLegend(val: LegendItemModel[]) {
    this._chartLengends.next(val);
  }

  get chartLegend() {
    return this._chartLengends.getValue();
  }

  option: any = {};

  echartsIntance: any;

  constructor(private theme: NbThemeService,
    private layoutService: LayoutService) {
    this.layoutService.onSafeChangeLayoutSize()
      .pipe(
        takeWhile(() => this._alive),
      )
      .subscribe(() => this.resizeChart());
  }

  ngAfterViewInit() {
    this._maxValue.subscribe(val => {
      this.theme.getJsTheme()
        .pipe(
          takeWhile(() => this._alive),
          delay(1),
        )
        .subscribe(config => {
          const variables: any = config.variables;
          this.setOptions(variables);
        });
    });
  }

  setOptions(variables) {

    const visitorsPie: any = variables.visitorsPie;
    const calulatedRatio = ((this.value / this.maxValue) * 100);
    this.option = {
      tooltip: {
        trigger: 'item',
        formatter: '',
      },
      series: [
        {
          name: ' ',
          clockWise: true,
          hoverAnimation: false,
          type: 'pie',
          center: ['50%', '50%'],
          radius: visitorsPie.firstPieRadius,
          data: [
            {
              value: 100 - calulatedRatio,
              name: ' ',
              label: {
                normal: {
                  position: 'center',
                  formatter: '',
                  textStyle: {
                    fontSize: '22',
                    fontFamily: variables.fontSecondary,
                    fontWeight: '600',
                    color: variables.fgHeading,
                  },
                },
              },
              tooltip: {
                show: false,
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: visitorsPie.firstPieGradientLeft,
                    },
                    {
                      offset: 1,
                      color: visitorsPie.firstPieGradientRight,
                    },
                  ]),
                  shadowColor: visitorsPie.firstPieShadowColor,
                  shadowBlur: 0,
                  shadowOffsetX: 0,
                  shadowOffsetY: 3,
                },
              },
              hoverAnimation: false,
            },
            {
              value: calulatedRatio,
              name: ' ',
              tooltip: {
                show: false,
              },
              label: {
                normal: {
                  position: 'inner',
                },
              },
              itemStyle: {
                normal: {
                  color: variables.layoutBg,
                },
              },
            },
          ],
        },
        {
          name: ' ',
          clockWise: true,
          hoverAnimation: false,
          type: 'pie',
          center: ['50%', '50%'],
          radius: visitorsPie.secondPieRadius,
          data: [
            {
              value: 100 - calulatedRatio,
              name: ' ',
              label: {
                normal: {
                  position: 'center',
                  formatter: '',
                  textStyle: {
                    fontSize: '22',
                    fontFamily: variables.fontSecondary,
                    fontWeight: '600',
                    color: variables.fgHeading,
                  },
                },
              },
              tooltip: {
                show: false,
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1),
                },
              },
              hoverAnimation: false,
            },
            {
              value: calulatedRatio,
              name: ' ',
              tooltip: {
                show: false,
              },
              label: {
                normal: {
                  position: 'inner',
                },
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: visitorsPie.secondPieGradientLeft,
                    },
                    {
                      offset: 1,
                      color: visitorsPie.secondPieGradientRight,
                    },
                  ]),
                  shadowColor: visitorsPie.secondPieShadowColor,
                  shadowBlur: 0,
                  shadowOffsetX: visitorsPie.shadowOffsetX,
                  shadowOffsetY: visitorsPie.shadowOffsetY,
                },
              },
            },
          ],
        },
      ],
    };
  }

  onChartInit(echarts) {
    this.echartsIntance = echarts;
  }

  resizeChart() {
    if (this.echartsIntance) {
      this.echartsIntance.resize();
    }
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
