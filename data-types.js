define(
  [ 'moment'
  , 'numeral'
  , 'mathjs'
  , 'slickGrid'
  , 'slickEditors'
  ]
, function(moment, numeral, math) {

    function dateFormatter(row, cell, value, columnDef, dataContext) {
      return moment(value).format('ll')
    }

    function numberFormatter(row, cell, value, columnDef, dataContext) {
      return numeral(value).format(columnDef.mask)
    }

    function nullGuard(formatter) {
      return function(row, cell, value, columnDef, dataContext) {
        if(columnDef.formula) return calculate(columnDef.formula, dataContext)
        if(value == null) return ''
        return formatter.apply(this, arguments)
      }
    }

    function calculate(formula, dataContext) {
      var parsedFormula = formula.replace(/{(.*?)}/g, extractVariables)

      if(parsedFormula.search('undefined') > -1) return ''

      return math.eval(parsedFormula)

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
        formatter: nullGuard(numberFormatter)
      , cssClass: 'text-right'
      , editor: Slick.Editors.Integer
      }
    }

  }
)
