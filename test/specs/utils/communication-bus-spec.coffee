define [
  'utils/communication-bus',
  'backbone.wreqr'
], (CommunicationBus, Wreqr) ->

  describe "Communication Bus", ->
    it "Should have a 'vent', 'commands' and 'reqres' attributes", ->
      expect(CommunicationBus.vent, CommunicationBus.commands, CommunicationBus.reqres).toBeDefined()
      expect(CommunicationBus.vent instanceof Wreqr.EventAggregator).toBeTruthy()
      expect(CommunicationBus.commands instanceof Wreqr.Commands).toBeTruthy()
      expect(CommunicationBus.reqres instanceof Wreqr.RequestResponse).toBeTruthy()