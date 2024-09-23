# ngx-linear-pie

A linear "pie" chart component for Angular Material.

## Installation

```bash
npm i --save @feature23/ngx-linear-pie
```

## Usage

Import `NgxLinearPieComponent` into either your standalone component's `imports` array, or the module in which it will be used.

Create an array of `NgxLinearPieData` objects where each element in the array represents a data point, or "slice," of the pie. The `value` property should be the raw value of the data point. There is no need to compute percentages yourself; the component will do this based on the sum of all of the values.

```ts
data: NgxLinearPieData[] = [
    { 
        name: "cs", 
        title: "C#", 
        value: 705,
    },
    { 
        name: "ts", 
        title: "TypeScript", 
        value: 462,
    },
    { 
        name: "html", 
        title: "HTML",
        value: 390,
    },
    { 
        name: "scss", 
        title: "SCSS",
        value: 275,
    },
    { 
        name: "sql", 
        title: "SQL",
        value: 42, 
    },
];
```

Only `name` and `value` are required properties. The `title` value is shown in the UI if provided, otherwise the `name` value is shown. This can allow you to use the `name` property as a programmatic value (i.e. an identifier) if desired.

By default, the component will use a rainbow palette using Material colors. If you wish to customize the colors, you can provide a `color` property to each data object.

For further customization, you can provide a `className` property to each data object to give each slice a CSS class name.

The data may be computed if desired, and this component works well with Angular Signals, too.

Once you have your data, add the component to your HTML template:

```html
<ngx-linear-pie [data]="data" />
```

## Inputs

The `ngx-linear-pie` component allows for the following inputs to customize its appearance and behavior:

| Input | Type | Description |
| --- | --- | --- |
| `[data]` | `NgxLinearPieData[]` | (Required) The data to display in the component |
 | `[allowClick]` | `boolean` | (Optional; default `false`) Whether to allow clicking pie slices or legend entries. Not very useful without subscribing to the `(sliceClick)` event. |
| `[showLegend]` | `boolean` | (Optional; default `false`) Whether to show a legend below the chart |
| `[valuesAsPercentages]` | `boolean` | (Optional; default `false`) Whether to show tooltip and legend values as percentages (if `true`) or the raw values (if `false`).

## Events

The following output events are available to support interactivity:

| Output | Event/Argument Type | Description |
| --- | --- | --- |
| `(sliceClick)` | `NgxLinearPieData` | Emitted when the user clicks or presses Enter on a pie chart slice or legend entry. This event is not emitted if `[allowClick]` is `false` or unset. |
