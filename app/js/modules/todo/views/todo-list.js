define([
  'text!modules/todo/views/templates/todo-list.html',
  'modules/todo/views/todo-item',
  'utils/communication-bus',
  'marionette'
], function(ListTemplate, TodoItem, CommunicationBus, Marionette) {

  List = Marionette.CompositeView.extend({
    template: ListTemplate,
    itemView: TodoItem,
    itemViewContainer: 'ul#todo-list',
    ui: {
      toggleAll : '#toggle-all'
    },
    events: {
      'click #toggle-all' : 'toggleAll'
    },
    collectionEvents : {
      'all' : 'handleToggleAllState'
    },

    initialize : function() {
      if (!this.collection) {
        throw new Error('a collection must be provided');
      }
    },

    onRender : function() {
      this.handleToggleAllState();
    },

    toggleAll : function() {
      var checkAll = this.ui.toggleAll.is(':checked');

      this.collection.invoke('set', {'done': checkAll});
    },

    handleToggleAllState : function() {
      if (this.collection.length <= 0) {
        this.ui.toggleAll.hide();
      } else {
        this.ui.toggleAll
          .prop('checked', this.allTodosCompleted())
          .show();
      }
    },

    allTodosCompleted : function() {
      var allCompleted = this.collection.reduce(function(allCompleted, todo) {
        return todo.get('done') === true;
      }, false);

      return allCompleted;
    }

  });

  return List;

});