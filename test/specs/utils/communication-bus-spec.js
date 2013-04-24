(function() {
  define(['utils/communication-bus', 'backbone.wreqr'], function(CommunicationBus, Wreqr) {
    return describe("Communication Bus", function() {
      return it("Should have a 'vent', 'commands' and 'reqres' attributes", function() {
        expect(CommunicationBus.vent, CommunicationBus.commands, CommunicationBus.reqres).not.toBeDefined();
        expect(CommunicationBus.vent instanceof Wreqr.EventAggregator).toBeTruthy();
        expect(CommunicationBus.commands instanceof Wreqr.Commands).toBeTruthy();
        return expect(CommunicationBus.reqres instanceof Wreqr.RequestResponse).toBeTruthy();
      });
    });
  });

}).call(this);
