import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { NgxLinearPieComponent, NgxLinearPieSeries } from '../../../ngx-linear-pie/src/public-api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        NgxLinearPieComponent,
        MatButtonModule,
        MatCheckbox,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    static readonly DefaultData: Pick<NgxLinearPieSeries, "name" | "title">[] = [
        { name: "cs", title: "C#" },
        { name: "ts", title: "TypeScript" },
        { name: "html", title: "HTML" },
        { name: "scss", title: "SCSS" },
        { name: "sql", title: "SQL" },
        { name: "bash", title: "Bash" },
    ];

    readonly data = signal<NgxLinearPieSeries[]>(AppComponent.DefaultData.map(s => ({
        ...s,
        value: Math.floor(Math.random() * 500)
    })));

    readonly clickable = signal<boolean>(false);
    readonly showLegend = signal<boolean>(false);
    readonly valuesAsPercentages = signal<boolean>(false);
    readonly isAnimating = signal<boolean>(false);

    readonly subscription = new Subscription();

    onSeriesClick(series: NgxLinearPieSeries) {
        alert(`Series clicked: ${series.name}`);
    }

    toggleAnimate() {
        const wasAnimating = this.isAnimating();
        this.isAnimating.set(!wasAnimating);

        if (!wasAnimating) {
            console.log("Starting animation...");
            const intervalId = setInterval(() => {
                this.data.set(this.data().map(s => ({
                    ...s,
                    value: Math.floor(Math.random() * 500)
                })));
            }, 1000);

            this.subscription.add(() => clearInterval(intervalId));
        } else {
            this.subscription.unsubscribe();
        }
    }
}
