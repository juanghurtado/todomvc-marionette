define(['backbone','modules/todo/models/todo', 'backbone.localstorage'],function(Backbone, Todo) {

  var isCompleted = function(todo) {
    return todo.get('done');
  };

  var Collection = Backbone.Collection.extend({
    model: Todo,
    localStorage: new Backbone.LocalStorage('todosmvc:todos'),
    comparator: function(todo) {
      return todo.get('date');
    },
    getCompleted: function() {
      return this.filter(isCompleted);
    },
    getNotCompleted: function() {
      return this.reject(isCompleted);
    }
  });

  return Collection;

});