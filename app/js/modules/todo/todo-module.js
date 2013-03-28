define([
  'modules/todo/todo-router',
  'modules/todo/todo-controller',
  'modules/todo/collections/todos',
  'utils/communication-bus'
], function(TodoRouter, TodoController, Todos,  CommunicationBus) {

  var TodoModule = {
    router : new TodoRouter({
      controller : TodoController
    }),
    todos : new Todos()
  };

  CommunicationBus.commands.setHandler("todo:start", function(view){
    TodoController.showInitialLayoutOn(view);
  });

  return TodoModule;
});
