# Data Driven Grid

This project aims to identify an API that would enable a datagrid to be defined in the service layer and rendered by a thin client.

The API should provide the following features:

* Define columns
* Provide data
* Define how data should be formatted by the client
* Allow certain fields to be editable
* Define how inputted values are validated
* Specify synthetic fields whose values are derived from other fields

## Define columns

An array of Objects that describe a column, based on [SlickGrid's column definition](https://github.com/mleibman/SlickGrid/wiki/Column-Options) with some extra attributes:

| Option | Default | Description |
|---|---|---|
| type  | String | Data types tell the client which formatter to use and how to validate editable fields. |
| mask  | null | A `Number` can be formatted to look like currency, percentages, times, or even plain old numbers with decimal places, thousands, and abbreviations. A `Date` can be formatted explicitly or left undefined for the client to attempt to format for the locale |
| editable  | false  | Make a field editable |
| formula | false  | Implicitly defines a synthetic field. Any explicit values will be ignored, the client will attempt to calculate the value based on the formula |

### Example

``` json
[
  {
    "id": "reset"
  , "field": "reset"
  , "name": "Reset Date"
  , "type": "Date"
  , "mask": "MMMM Do YYYY"
  }
, {
    "id": "value"
  , "field": "value"
  , "name": "Value Date"
  , "type": "Date"
  }
, {
    "id": "tenor"
  , "field": "tenor"
  , "name": "Tenor"
  }
, {
    "id": "maturity"
  , "field": "maturity"
  , "name": "Maturity Date"
  , "type": "Date"
  }
, {
    "id": "curve"
  , "field": "curve"
  , "name": "Yield"
  , "type": "Number"
  , "mask": "00.0000"
  }
, {
    "id": "yourCurve"
  , "field": "yourCurve"
  , "name": "Your Curve"
  , "toolTip": "Decimal not percentage"
  , "type": "Number"
  , "mask": "00.0000"
  , "editable": true
  , "min": 0
  , "max": 100
  , "step": 0.1
  }
, {
    "id": "yourCurve100"
  , "field": "yourCurve100"
  , "name": "Your Curve as %"
  , "type": "Number"
  , "mask": "0.00%"
  , "formula": "{curve} / {yourCurve}"
  }
, {
    "id": "curveDiff"
  , "field": "curveDiff"
  , "name": "Your Curve - Ours"
  , "type": "Number"
  , "mask": "00.0000"
  , "formula": "{yourCurve} - {curve}"
  }
, {
    "id": "yourPos"
  , "field": "pos"
  , "name": "Your Pos"
  , "toolTip": "Use the '+' to sell the FRA (received fixed) and '-' to buy the FRA (pay fixed)"
  , "type": "Number"
  , "editable": true
  }
]
```

## Provide data

Keys maps to `column.field` in the column definition.

``` json
[
  {
    "reset": "2015-01-02"
  , "value": "2015-01-04"
  , "maturity": "2015-07-02"
  , "tenor": "6M"
  , "curve": 0.019
  }
, {
    "reset": "2015-01-03"
  , "value": "2015-01-05"
  , "maturity": "2015-07-03"
  , "tenor": "6M"
  , "curve": 0.029
  }
, {
    "reset": "2015-01-04"
  , "value": "2015-01-06"
  , "maturity": "2015-07-04"
  , "tenor": "6M"
  , "curve": 0.039
  }
, {
    "reset": "2015-01-05"
  , "value": "2015-01-07"
  , "maturity": "2015-07-05"
  , "tenor": "6M"
  , "curve": 0.049
  }
, {
    "reset": "2015-01-06"
  , "value": "2015-01-08"
  , "maturity": "2015-07-06"
  , "tenor": "6M"
  , "curve": 0.059
  }
, {
    "reset": "2015-01-07"
  , "value": "2015-01-09"
  , "maturity": "2015-07-07"
  , "tenor": "6M"
  , "curve": 0.069
  }
, {
    "reset": "2015-01-08"
  , "value": "2015-01-10"
  , "maturity": "2015-07-08"
  , "tenor": "6M"
  , "curve": 0.079
  }
]
```

## Formulas

Provide any mathematical expression, define variables by wrapping them in curly braces:

``` {field1} / {field2} * 100 ```

``` 1.2 * (2 + 4.5) ```

``` sin(45 deg) ^ 2 ```

## Installation

``` shell
> npm install && bower install
```
