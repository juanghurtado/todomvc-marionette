define(['backbone.wreqr'], function(Wreqr) {

  var CommunicationBus = {
    commands : new Wreqr.Commands(),
    reqres : new Wreqr.RequestResponse(),
    vent : new Wreqr.EventAggregator()
  };

  return CommunicationBus;
});