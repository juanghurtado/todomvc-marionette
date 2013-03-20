define([
  'jquery',
  'modules/app/app-module',
  'utils/communication-bus'
], function($, App, CommunicationBus) {
  describe("App module", function() {

    /* =HELPERS
    --------------------------------------------------------------------------- */
    function createSpyOnCommunicationBusExecute() {
      return spyOn(CommunicationBus.commands, "execute");
    }

    function createSpyOnBackboneHistoryStart() {
      return spyOn(Backbone.history, "start");
    }

    /* =SPECS
    --------------------------------------------------------------------------- */
    it("Should have an 'appWrapper' region", function() {
      App.start();

      expect(App.appWrapper.el).toBe('#todoapp');
    });

    it("Should call 'todo:start' command", function() {
      var spy = createSpyOnCommunicationBusExecute();

      App.start();

      expect(spy).toHaveBeenCalledWith('todo:start', App.appWrapper);
    });

    it("Should start Backbone History", function() {
      var spy = createSpyOnBackboneHistoryStart();

      App.start();

      expect(spy).toHaveBeenCalled();
    });

  });
});