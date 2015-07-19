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
      var parsedFormula = formula.replace(/{(.*?)}/g, extractVariables)

      if(parsedFormula.search('undefined') > -1) return null

      var result = math.eval(parsedFormula)

      return isNaN(result) || result === Infinity ? null : result

      function extractVariables(match, p1, p2, p3, offset, string) {
        // p1 is nondigits, p2 digits, and p3 non-alphanumerics
        return dataContext[p1]
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
