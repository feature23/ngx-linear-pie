import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

export interface NgxLinearPieSeries {
    name: string;
    value: number;
    title?: string;
    color?: string;
    className?: string;
}

interface NgxLinearPieSeriesViewModel {
    series: NgxLinearPieSeries;
    percentage: number;
    backgroundColor: string;
    tooltip: string;
    className: string;
}

@Component({
    selector: 'ngx-linear-pie',
    standalone: true,
    imports: [
        MatTooltip,
    ],
    templateUrl: `./ngx-linear-pie.component.html`,
    styleUrls: [`./ngx-linear-pie.component.scss`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxLinearPieComponent {
    private static readonly DefaultColors = [
        "#D32F2F", // red
        "#F57C00", // orange
        "#FBC02D", // yellow
        "#388E3C", // green
        "#1976D2", // blue
        "#7B1FA2", // purple
    ];

    readonly data = input.required<NgxLinearPieSeries[]>();

    readonly allowClick = input<boolean>(false);
    readonly showLegend = input<boolean>(false);
    readonly valuesAsPercentages = input<boolean>(false);

    readonly seriesClick = output<NgxLinearPieSeries>();

    readonly total = computed<number>(() => this.data().reduce((acc, { value }) => acc + value, 0));

    readonly seriesViewModels = computed<NgxLinearPieSeriesViewModel[]>(() =>
        this.data()
        .filter(({ value }) => value > 0)
        .map((series, index) => ({
            series,
            percentage: series.value / this.total() * 100,
            backgroundColor: series.color || NgxLinearPieComponent.DefaultColors[index % NgxLinearPieComponent.DefaultColors.length],
            tooltip: `${series.title ? series.title : series.name}: ${NgxLinearPieComponent.formatValue(series.value, this.total(), this.valuesAsPercentages())}`,
            className: series.className || "",
        } satisfies NgxLinearPieSeriesViewModel))
    );

    onSeriesClick(series: NgxLinearPieSeries) {
        if (this.allowClick()) {
            this.seriesClick.emit(series);
        }
    }

    onSeriesKeyUp(event: KeyboardEvent, series: NgxLinearPieSeries) {
        if (event.key === "Enter") {
            this.onSeriesClick(series);
        }
    }

    private static formatValue(value: number, total: number, asPercentage: boolean) {
        return asPercentage ? `${(value / total * 100).toFixed(0)}%` : value.toString();
    }
}
