define([
  'modules/todo/views/wrapper',
    'modules/todo/collections/todos',
  'utils/communication-bus'
], function(WrapperView, Todos, CommunicationBus) {

  return {
    allowedFilters : ['', 'active', 'completed'],

    todos : new Todos(),

    setFilter : function(filter) {
      if (!_.contains(this.allowedFilters, filter)) {
        filter = "";
      }

      CommunicationBus.vent.trigger('todo:list:filter', filter);
    },

    showInitialLayoutOn : function(wrapperView) {
      if (!wrapperView) {
        return;
      }

      var TodoModule = require('modules/todo/todo-module');
      var wrapper = new WrapperView({
        collection : this.todos
      });

      wrapperView.show(wrapper);

      this.todos.fetch();
    }
  };

});