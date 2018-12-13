// imports
import noUiSlider from 'nouislider'
import { EJSON } from 'meteor/ejson'
import './autoform-nouislider.html'
import './materialize/nouislider'
import './materialize/nouislider.css'

// add autoform input type
AutoForm.addInputType('noUiSlider2', {
  template: 'afNoUiSlider2',
  valueOut: function(){
    const slider = this.find('.nouislider')[0]
    const isDecimal = this.closest('.at-nouislider').data('decimal')

    if (this.attr('data-type') === 'Object') {
      const parser = (isDecimal)? parseFloat : parseInt
      const first = parser.call(null, slider.noUiSlider.get()[0])
      const second = parser.call(null, slider.noUiSlider.get()[1])
      return {
        lower: first > second ? second : first,
        upper: first > second ? first : second
      }
    } else {
      return slider.noUiSlider.get()
    }
  }
})

// helpers
Template.afNoUiSlider2.helpers({
  atts() {
    const data = Template.currentData()
    const atts = data.atts
    atts['data-type'] = data.schemaType.name
    if (atts['class']) {
      atts['class'] += ' at-nouislider'
    } else {
      atts['class'] = 'at-nouislider'
    }
    atts.doLabels = atts.labelLeft || atts.labelRight
    atts['data-decimal'] = data.decimal
    return _.omit(atts, 'noUiSliderOptions', 'noUiSlider_pipsOptions')
  }
})

function calculateOptions (data) {
  console.log('afNoUiSlider2 calculateOptions data:', data)
  const schemaAtts = _.pick(data, 'min', 'max')
  const autoformOptions = _.pick(data.atts || {}, 'min', 'max', 'step', 'start',
      'range')
  console.log('autoform options', autoformOptions)
  const noUiSliderOptions = (data.atts || {}).noUiSliderOptions
  const options = _.extend({}, schemaAtts, autoformOptions, noUiSliderOptions)

  // override schema min and max if specified in autoform options
  options.min = autoformOptions.min&&schemaAtts.min?autoformOptions.min:
      options.min
  options.max = autoformOptions.max&&schemaAtts.max?autoformOptions.max:
      options.max
  console.log(`min ${_.clone(options.min)} max ${_.clone(options.max)}`)

  // override nouislider with autoform options if defined
  const override = key => {
    const value = autoformOptions[key]
    console.log(`override option ${key} with value ${value}`)
    if (value) {
      if (typeof value === 'string') {
        try {
          options[key] = EJSON.parse(value)
        } catch (e) {
          try {
            const jsonArray = `{${key}: ${value}}`
            options[key] = EJSON.parse(value)[key]
          } catch (e) {
            options[key] = value
          }
        }
      }
      else {
        options[key] = value
      }
    }
  }
  override('start')
  override('range')

  // adjust data initialization based on schema type
  if (options.start === undefined) {
    if (data.schemaType.name === 'Object'){
      if (data.value && data.value.lower){
        options.start = [
          data.value.lower,
          data.value.upper
        ]
      } else {
        options.start = [
          typeof options.min === 'number' ? options.min : 0,
          typeof options.max === 'number' ? options.max : 100
        ]
      }
      options.connect = true
    } else {
      options.start = data.value || 0
    }
  }

  if (options.range === undefined) {
    options.range = {
      min: typeof options.min === 'number' ? options.min : 0,
      max: typeof options.max === 'number' ? options.max : 100
    }
  }
  delete options.min
  delete options.max

  // default step to 1 if not otherwise defined
  if( options.step === undefined ){
    options.step = 1
  }

  // return options
  console.log('afNoUiSlider2 options', _.clone(options))
  return options
}

// on rendered
Template.afNoUiSlider2.rendered = function () {
  const template = this
  const $s = template.$('.nouislider')
  const sliderElement = $s.get(0)

  const setup = c => {
    const data = Template.currentData()
    const options = calculateOptions(data)
    noUiSlider.create(sliderElement, options)

    if (c.firstRun) {
      sliderElement.noUiSlider.on('slide', function(){
        /* This is a trick to fool some logic in AutoForm that makes
           sure values have actually changed on whichever element
           emits a change event. Eventually AutoForm will give
           input types the control of indicating exactly when
           their value changes rather than relying on the change event */
        $s.parent()[0].value = JSON.stringify(sliderElement.noUiSlider.get())
        $s.parent().change()
        $s.data('changed','true')
      })
    }

    if( data.atts.noUiSlider_pipsOptions ){
      sliderElement.noUiSlider.pips(
          data.atts.noUiSlider_pipsOptions
      )
    }
  }
  template.autorun(setup)
}
