define([
  'utils/communication-bus',
  'backbone.wreqr'
], function(CommunicationBus, Wreqr) {
  describe("Communication Bus", function() {

    it("Should have a 'vent', 'commands' and 'reqres' attributes", function() {
      expect(CommunicationBus.vent, CommunicationBus.commands, CommunicationBus.reqres).toBeDefined();
      expect(CommunicationBus.vent instanceof Wreqr.EventAggregator).toBeTruthy();
      expect(CommunicationBus.commands instanceof Wreqr.Commands).toBeTruthy();
      expect(CommunicationBus.reqres instanceof Wreqr.RequestResponse).toBeTruthy();
    });

  });
});