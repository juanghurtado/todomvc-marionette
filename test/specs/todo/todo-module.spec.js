define([
  'modules/todo/todo-router',
  'modules/todo/todo-controller',
  'modules/todo/todo-module',
  'utils/communication-bus',
  'marionette'
], function(TodoRouter, TodoController, TodoModule, CommunicationBus, Marionette) {
  describe("TO-DO module", function() {

    it("Should create a new TodoRouter with a controller pointing to TodoController", function() {
      expect(TodoModule.router instanceof TodoRouter).toBeTruthy();
      expect(TodoModule.router.options.controller).toBe(TodoController)
    });

    it("Should register a 'todo:start' command", function() {
      var command = CommunicationBus.commands.getHandler('todo:start');

      expect(command).toBeDefined();
    });

    it("Should show initial layout on 'todo:start' command", function() {
      var mockView = new Marionette.ItemView();
      var spy = spyOn(TodoController, 'showInitialLayoutOn');

      CommunicationBus.commands.execute('todo:start', mockView);

      expect(spy).toHaveBeenCalled();
    });

  });
});
