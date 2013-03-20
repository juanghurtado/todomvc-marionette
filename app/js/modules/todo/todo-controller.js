define([
  'modules/todo/views/wrapper',
  'modules/todo/views/header',
  'modules/todo/views/footer',
  'modules/todo/views/todo-list',
  'modules/todo/views/todo-item',
  'utils/communication-bus'
], function(WrapperView, HeaderView, FooterView, TodoListView, TodoItemView, CommunicationBus) {

  return {
    allowedFilters : ['', 'active', 'completed'],

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
        collection : TodoModule.todos
      });

      wrapperView.show(wrapper);

      TodoModule.todos.fetch();
    }
  };

});