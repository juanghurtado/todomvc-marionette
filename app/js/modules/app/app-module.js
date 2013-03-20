define([
  'modules/todo/todo-module',
  'utils/communication-bus',
  'marionette'
], function(TodoModule, CommunicationBus, Marionette) {

  var App = new Marionette.Application();

  App.addRegions({
    appWrapper: "#todoapp",
  });

  App.on("initialize:after", function(options){
    CommunicationBus.commands.execute('todo:start', App.appWrapper);

    try {
      Backbone.history.start();
    } catch(err) {}
  });

  return App;
});