define([
  'modules/todo/todo-router',
  'modules/todo/todo-controller',
  'modules/todo/todo-module',
  'utils/communication-bus',
  'marionette'
], function(TodoRouter, TodoController, TodoModule, CommunicationBus, Marionette) {
  describe("TO-DO module", function() {

    /* =HELPERS
    --------------------------------------------------------------------------- */
    function getTodoStartCommandHandler() {
      return CommunicationBus.commands.getHandler('todo:start');
    }

    function startModule() {
      var mockView = new Marionette.ItemView();
      CommunicationBus.commands.execute('todo:start', mockView);
    }

    /* =SPECS
    --------------------------------------------------------------------------- */
    it("Should create a new TodoRouter with a controller pointing to TodoController", function() {
      expect(TodoModule.router instanceof TodoRouter).toBeTruthy();
      expect(TodoModule.router.options.controller).toBe(TodoController)
    });

    it("Should register a 'todo:start' command", function() {
      var command = getTodoStartCommandHandler();

      expect(command).toBeDefined();
    });

    it("Should show initial layout on 'todo:start' command", function() {
      var spy = spyOn(TodoController, 'showInitialLayoutOn');

      startModule();

      expect(spy).toHaveBeenCalled();
    });

  });
});
