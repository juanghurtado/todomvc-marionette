define([
  'modules/todo/todo-router',
  'modules/todo/todo-controller',
  'utils/communication-bus'
], function(TodoRouter, TodoController,  CommunicationBus) {

  var TodoModule = {
    router : new TodoRouter({
      controller : TodoController
    })
  };

  CommunicationBus.commands.setHandler("todo:start", function(view){
    TodoController.showInitialLayoutOn(view);
  });

  return TodoModule;
});
