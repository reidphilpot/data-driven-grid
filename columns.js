define(
  [ 'q'
  , 'jquery'
  , 'underscore'
  , './data-types'
  ]
, function(Q, $, _, dataTypes) {

    return function columnsPromise() {
       var deferred = Q.defer()
       $.getJSON('columns.json', _.compose(deferred.resolve, merge))
       return deferred.promise
    }

    function merge(columns) {
      return columns.map(function(column) {
        return _.extend(column, {}, dataTypes[column['type']])
      })
    }

  }
)
