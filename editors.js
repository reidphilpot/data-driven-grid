define(
  [ 'jquery'
  , 'slickgrid'
  ]
, function($) {

    function numberEditor(args) {
      var $input
      var defaultValue
      var scope = this

      this.init = function () {
        $input = $("<INPUT type=number class='editor-text' />")

        if(args.column.min)  $input.attr('min', args.column.min)
        if(args.column.max)  $input.attr('max', args.column.max)
        if(args.column.step) $input.attr('step', args.column.step)

        $input.bind("keydown.nav", function (e) {
          if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
            e.stopImmediatePropagation()
          }
        })

        $input.appendTo(args.container)
        $input.focus().select()
      }

      this.destroy = function () {
        $input.remove()
      }

      this.focus = function () {
        $input.focus()
      }

      this.loadValue = function (item) {
        defaultValue = item[args.column.field]
        $input.val(defaultValue)
        $input[0].defaultValue = defaultValue
        $input.select()
      }

      this.serializeValue = function () {
        return $input.val()
      }

      this.applyValue = function (item, state) {
        item[args.column.field] = state
      }

      this.isValueChanged = function () {
        return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue)
      }

      this.validate = function () {
        if (isNaN($input.val())) {
          return {
            valid: false
          , msg: "Please enter a valid integer"
          }
        }

        if (outOfBounds($input.val())) {
          return {
            valid: false
          , msg: "Value out of bounds"
          }
        }

        return {
          valid: true
        , msg: null
        }
      }

      this.init()

      function outOfBounds(val) {
        if (
          args.column.min != undefined && $input.val() < args.column.min ||
          args.column.max != undefined && $input.val() > args.column.max
        ) return true
        return false
      }
    }

    return {
      number: numberEditor
    }

  }
)
