require.config({
  urlArgs: 'bust=' + (new Date()).getTime(),
  baseUrl: '/app/js',

  paths: {
    'text': '../../components/requirejs-text/text',
    'tpl': '../../components/requirejs-tpl/tpl',
    'jquery': '../../components/jquery/jquery',
    'underscore': '../../components/underscore/underscore',
    'backbone': '../../components/backbone/backbone',
    'backbone.wreqr': '../../components/backbone.wreqr/lib/amd/backbone.wreqr',
    'backbone.eventbinder': '../../components/backbone.eventbinder/lib/amd/backbone.eventbinder',
    'backbone.babysitter': '../../components/backbone.babysitter/lib/amd/backbone.babysitter',
    'backbone.localstorage': '../../components/backbone.localstorage/backbone.localStorage',
    'marionette': '../../components/marionette/lib/core/amd/backbone.marionette',
    'cfg': './config/config',

    'jasmine': '../../components/jasmine/lib/jasmine-core/jasmine',
    'jasmine-html': '../../components/jasmine/lib/jasmine-core/jasmine-html',
    'jasmine-jquery': '../../components/jasmine-jquery/lib/jasmine-jquery',
    'sinon': '../../components/sinon/lib/sinon',
    'specs': '../../test/specs'
  },

  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps : ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone-localstorage' : {
      deps: ['backbone']
    },
    'cfg': {
      'deps': [
        './config/marionette/marionette-template-cache'
      ]
    },
    'jasmine': {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    },
    'jasmine-jquery': {
      deps: ['jquery', 'jasmine']
    },
    'sinon': {
      exports: 'sinon'
    }
  }
});

require(['jquery', 'jasmine-html', 'specs', 'jasmine-jquery', 'cfg'], function($, jasmine, specs) {
  var jasmineEnv = jasmine.getEnv();
  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.updateInterval = 1000;
  jasmineEnv.addReporter(htmlReporter);

  jasmine.getFixtures().fixturesPath = 'fixtures/';
  jasmine.getJSONFixtures().fixturesPath = 'fixtures/json/';
  jasmine.getStyleFixtures().fixturesPath = 'fixtures/css/';

  $(function() {
    require(specs, function() {
      jasmineEnv.execute();
    });
  });
});