autoform-nouislider2 for materializecss
====================

AutoForm nouislider input type with materilizecss styling.

Forked from mozfet:meteor-autoform-nouislider in order to provide alternative styling than the default from materilizeCSS.

> **Thank You** This suite of packages is maintained by [ExpertBox.com](http://www.ExpertBox.com) as a thank you to the Open Source community.

## Setup
`meteor add mozfet:autoform-nouislider2`

## This package is part of a suite
[mozfet:meteor-autoform-materialize](https://github.com/mozfet/meteor-autoform-materialize)
[mozfet:meteor-autoform-modals-materialize](https://github.com/mozfet/meteor-autoform-modals-materialize)
[mozfet:meteor-autoform-nouislider](https://github.com/mozfet/meteor-autoform-nouislider)
[mozfet:meteor-autoform-medium](https://github.com/mozfet/meteor-autoform-medium)
[mozfet:meteor-autoform-materialize-playground](https://github.com/mozfet/meteor-autoform-materialize-playground)

## Configuration
Adds the `noUiSlider` type to [autoform](https://github.com/aldeed/meteor-autoform). It uses `min`, `max`, and `step` attributes like a normal slider, so it can be a drop in replacement, but options passed as `noUiSliderOptions` are passed directly to [nouislider](http://refreshless.com/nouislider/) for advanced control.

### Simple Usage

```
{{> afFieldInput type="noUiSlider" name="foo" min=5 max=10 step=1}}
```

### Single values
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
    });


### Range Silder
    RangeSchema = new SimpleSchema({
      lower: {
        type: Number
      },
      upper: {
        type: Number
      }
    });

    CollectionSchema = new SimpleSchema({
      slider: {
        type: RangeSchema,
        max: 150,
        min: 30,
        autoform: {
          type: "noUiSlider",
          noUiSliderOptions: {
            step: 10
          },      
          noUiSlider_pipsOptions: {
            mode: 'steps',
            density: 5
          }
        }
      }
    });

### Vertical Slider

To get a vertical slider, do `noUiSliderOptions: {orientation: 'vertical'}` and specify an exact `height` in the CSS for the `nouislider` class.

### Overridding start and range
You can override start and range by passing the options in.  

Be sure that the values passed in match the format below.

    {{> afQuickField name='slider' start="[50,60]"}}
    {{> afQuickField name='singleSlider' range='{"min": 2,"max":50}'}}

### Labels
Show a label left and/or right of the slider
```
{{> afFieldInput type="noUiSlider" name="foo" labelLeft="ugly" labelRight="delicious" min=0 max=1 step=0.1}}
```

## Credits

### Forks
We forked and added this to the suite in order to upgrade to AutoForm 6.0.0 and to add [MaterializeCSS](https://github.com/Dogfalo/materialize) styling.

Forked from [muqube:meteor-autoform-nouislider](https://github.com/muqube/meteor-autoform-nouislider) which forked from [elevatedevdesign:autoform-nouslider](https://github.com/ElevateDev/meteor-autoform-nouislider).

### Using
1. [AutoForm](https://github.com/aldeed/meteor-autoform) v6.0.0
2. [nouislider](https://github.com/leongersen/noUiSlider) v9.2.0
3. [MaterializeCSS](https://github.com/Dogfalo/materialize) v0.98.2 - extras/noUiSlider
