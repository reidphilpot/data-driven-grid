define(
  [ 'q'
  , 'jquery'
  , 'underscore'
  , './data-types'
  , 'slickgrid'
  , 'css!./app.css'
  , 'css!./bower_components/jquery-ui/themes/base/jquery-ui.css'
  , 'css!./bower_components/slickgrid/slick.grid.css'
  ]
, function(Q, $, _, dataTypes) {

  Q.all([getColumns(), getData()]).spread(createGrid)

  function getColumns() {
     var deferred = Q.defer()
     $.getJSON('columns.json', _.compose(deferred.resolve, merge))
     return deferred.promise
  }

  function merge(columns) {
    return columns.map(function(column) {
      return _.extend({}, column, dataTypes[column['type']])
    })
  }

  function getData() {
     var deferred = Q.defer()
     $.getJSON('data.json', deferred.resolve)
     return deferred.promise
  }

  function createGrid(columns, data) {
    var options = {
      enableCellNavigation: true
    , enableColumnReorder: false
    , forceFitColumns: true
    , editable: true
    }
    var grid = new Slick.Grid("#app-grid", data, columns, options)

    grid.onBeforeEditCell.subscribe(function(e, args) {
      var columnDef = args.column
      if(!columnDef.editable) return false
    })
  }

  }
)
