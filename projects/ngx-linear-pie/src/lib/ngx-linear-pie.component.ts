import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

export interface NgxLinearPieData {
    name: string;
    value: number;
    title?: string;
    color?: string;
    className?: string;
}

interface NgxLinearPieViewModel {
    data: NgxLinearPieData;
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

    readonly data = input.required<NgxLinearPieData[]>();

    readonly allowClick = input<boolean>(false);
    readonly showLegend = input<boolean>(false);
    readonly valuesAsPercentages = input<boolean>(false);

    readonly sliceClick = output<NgxLinearPieData>();

    readonly total = computed<number>(() => this.data().reduce((acc, { value }) => acc + value, 0));

    readonly viewModels = computed<NgxLinearPieViewModel[]>(() =>
        this.data()
        .filter(({ value }) => value > 0)
        .map((data, index) => ({
            data: data,
            percentage: data.value / this.total() * 100,
            backgroundColor: data.color || NgxLinearPieComponent.DefaultColors[index % NgxLinearPieComponent.DefaultColors.length],
            tooltip: `${data.title ? data.title : data.name}: ${NgxLinearPieComponent.formatValue(data.value, this.total(), this.valuesAsPercentages())}`,
            className: data.className || "",
        } satisfies NgxLinearPieViewModel))
    );

    onSliceClick(data: NgxLinearPieData) {
        if (this.allowClick()) {
            this.sliceClick.emit(data);
        }
    }

    onSliceKeyUp(event: KeyboardEvent, data: NgxLinearPieData) {
        if (event.key === "Enter") {
            this.onSliceClick(data);
        }
    }

    private static formatValue(value: number, total: number, asPercentage: boolean) {
        return asPercentage ? `${(value / total * 100).toFixed(0)}%` : value.toString();
    }
}
