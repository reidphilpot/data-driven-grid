define(
  [ 'moment'
  , 'numeral'
  , 'mathjs'
  , './editors'
  ]
, function(moment, numeral, math, editors) {

    var locale = window.navigator.userLanguage || window.navigator.language

    function dateFormatter(row, cell, value, columnDef, dataContext) {
      return moment(value).locale(locale).format(columnDef.mask || 'll')
    }

    function numberFormatter(row, cell, value, columnDef, dataContext) {
      if (columnDef.formula) value = calculate(columnDef.formula, dataContext)
      if(value == null) return ''
      return numeral(value).format(columnDef.mask)
    }

    function nullGuard(formatter) {
      return function(row, cell, value, columnDef, dataContext) {
        if(value == null) return ''
        return formatter.apply(this, arguments)
      }
    }

    function calculate(formula, dataContext) {
      var node = math.parse(formula)
      var code = node.compile(math)

      try {
        return code.eval(dataContext)
      } catch(e) {
        return null
      }
    }

    return {
      'Date': {
        formatter: nullGuard(dateFormatter)
      }
    , 'Number': {
        formatter: numberFormatter
      , cssClass: 'text-right'
      , editor: editors.number
      }
    }

  }
)
