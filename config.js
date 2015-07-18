define({
  paths: {
    'jquery': './bower_components/jquery/dist/jquery.min',
    'jquery-ui': './bower_components/jquery-ui/jquery-ui.min',
    'underscore': './bower_components/underscore/underscore-min',
    'moment': './bower_components/moment/min/moment.min',
    'numeral': './bower_components/numeral/min/numeral.min',
    'mathjs': './bower_components/mathjs/dist/math.min',
    'q': './bower_components/q/q',
    'slickCore': './bower_components/slickgrid/slick.core',
    'slickGrid': './bower_components/slickgrid/slick.grid',
    'slickDataView': './bower_components/slickgrid/slick.dataview',
    'slickEditors': './bower_components/slickgrid/slick.editors',
    'dragEvent': './bower_components/jquery.threedubmedia/event.drag/jquery.event.drag',
    'dropEvent': './bower_components/jquery.threedubmedia/event.drop/jquery.event.drop'
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'jquery-ui': {
      deps: ['jquery']
    },
    "underscore": {
      exports: '_'
    },
    'q': {
      exports: 'Q'
    },
    'slickCore': {
      deps:  ['jquery-ui'],
      exports: 'Slick'
    },
    'slickGrid': {
      deps: ['slickCore', 'dragEvent', 'dropEvent']
    },
    'slickDataView': {
      deps: ['slickGrid']
    },
    'slickEditors': {
      deps: ['slickGrid']
    },
    'dragEvent': {
      deps: ['jquery']
    },
    'dropEvent': {
      deps: ['jquery']
    }
  },
  map: {
    '*': {
      'css': './bower_components/require-css/css'
    }
  }
})
