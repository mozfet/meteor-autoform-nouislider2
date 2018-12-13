autoform-nouislider for materializecss
======================================

AutoForm nouislider input type with materilizecss styling.

## Setup
`meteor add mozfet:autoform-nouislider`

## This package is part of a suite
[mozfet:meteor-autoform-materialize](https://github.com/mozfet/meteor-autoform-materialize)
[mozfet:meteor-autoform-modals-materialize](https://github.com/mozfet/meteor-autoform-modals-materialize)
[mozfet:meteor-autoform-nouislider](https://github.com/mozfet/meteor-autoform-nouislider)
[mozfet:meteor-autoform-medium](https://github.com/mozfet/meteor-autoform-medium)
[mozfet:meteor-autoform-materialize-playground](https://github.com/mozfet/meteor-autoform-materialize-playground)

## Configuration
Adds the `noUiSlider` type to [autoform](https://github.com/aldeed/meteor-autoform). It uses `min`, `max`, and `step` attributes like a normal slider, so it can be a drop in replacement, but options passed as `noUiSliderOptions` are passed directly to [nouislider](http://refreshless.com/nouislider/) for advanced control.

## Usage

### Collection2 basic
```javascript
const schema = new SimpleSchema({
  'basic': {
    type: Number,
    min: 10,
    max: 26,
    autoform: {
      type: 'noUiSlider'
    }
  }
}, {tracker: Tracker})

Template.slidersExample.helpers({
  doc() {
    return {}
  },
  schema() {
    return schema
  }
})
```
```html
{{> quickForm id="slidersExample" type="normal" doc=doc schema=schema}}
```

### Collection2 with pips
```javascript
const schema = new SimpleSchema({
  'rangeArrayPips': {
    type: Array,
    optional: true,
    autoform: {
      type: 'noUiSlider',
      step: 2,
      noUiSliderOptions: {
        start: [700,8000],
        connect: true,
        range: {
          'min': [0],
          '10%': [500,500],
          '50%': [4000,1000],
          'max': [10000]
        },
        pips: {
          mode: 'range',
          density: 3
        }
      }
    }
  },
  'rangeArrayPips.$': {
    type: Number
  }
}, {tracker: Tracker})

Template.slidersExample.helpers({
  doc() {
    return {}
  },
  schema() {
    return schema
  }
})
```
```html
{{> quickForm id="slidersExample" type="normal" doc=doc schema=schema}}
```

### Single values
```javascript
CollectionSchema = new SimpleSchema({
  slider: {
    type: Number,
    max: 150,
    min: 30,
    autoform: {
      type: "noUiSlider",
      step: 10,    
      noUiSlider_pipsOptions: {
        mode: 'steps',
        density: 5
      }
    }
  }
}, {tracker: Tracker});
```

### Overridding start and range
You can override start and range by passing the options in.  

```
{{#autoForm id="slidersAutoFormExample1" type="normal" doc=doc schema=schema}}
  {{> afQuickField name="basic" min=2 max=50 label="Overwritten Min and Max"}}
  <button type="submit" class="btn btn-primary">Submit</button>
{{/autoForm}}
```
```
{{#autoForm id="slidersAutoFormExample2" type="normal" doc=doc schema=schema}}
  {{> afQuickField name="basic" range='{"min":0, "max":100}'
      label="Overwritten range"}}
  <button type="submit" class="btn btn-primary">Submit</button>
{{/autoForm}}
```
```
{{#autoForm id="slidersAutoFormExample3" type="normal" doc=doc schema=schema}}
  {{> afQuickField name="basic" start=20 label="Overwritten Start"}}
  <button type="submit" class="btn btn-primary">Submit</button>
{{/autoForm}}
```
```
{{#autoForm id="slidersAutoFormExample4" type="normal" doc=doc schema=schema}}
  {{> afQuickField name="rangeArrayPips" start='[100,3000]' label="Overwritten Start"}}
  <button type="submit" class="btn btn-primary">Submit</button>
{{/autoForm}}
```

### Labels
Show a label left and/or right of the slider
```
{{> afFieldInput type="noUiSlider" name="foo" labelLeft="ugly" labelRight="delicious" min=0 max=1 step=0.1}}
```

## Credits

### Forks
We forked in order to upgrade dependancies for our suite and to add [MaterializeCSS](https://github.com/Dogfalo/materialize) styling.

Forked from [muqube:meteor-autoform-nouislider](https://github.com/muqube/meteor-autoform-nouislider) which forked from [elevatedevdesign:autoform-nouslider](https://github.com/ElevateDev/meteor-autoform-nouislider).

### Dependancies
[MaterializeCSS](https://github.com/Dogfalo/materialize) v1.0.0 - extras/noUiSlider; which includes nouislider v9.1.0
