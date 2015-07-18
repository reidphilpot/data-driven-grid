define({
  paths: {
    'jquery': './bower_components/jquery/dist/jquery.min',
    'jquery-ui': './bower_components/jquery-ui/jquery-ui.min',
    'underscore': './bower_components/underscore/underscore-min',
    'moment': './bower_components/moment/min/moment.min',
    'numeral': './bower_components/numeral/min/numeral.min',
    'mathjs': './bower_components/mathjs/dist/math.min',
    'q': './bower_components/q/q',
    'slickcore': './bower_components/slickgrid/slick.core',
    'slickgrid': './bower_components/slickgrid/slick.grid',
    'slickdataview': './bower_components/slickgrid/slick.dataview',
    'slickeditors': './bower_components/slickgrid/slick.editors',
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
    'slickcore': {
      deps:  ['jquery-ui'],
      exports: 'Slick'
    },
    'slickgrid': {
      deps: ['slickcore', 'dragEvent', 'dropEvent']
    },
    'slickdataview': {
      deps: ['slickgrid']
    },
    'slickeditors': {
      deps: ['slickgrid']
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
