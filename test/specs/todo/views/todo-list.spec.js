define([
  'modules/todo/views/todo-list',
  'modules/todo/views/todo-item',
  'modules/todo/collections/todos',
  'utils/communication-bus',
], function(TodoListView, TodoItemView, Todos, CommunicationBus) {
  describe("TO-DO list view", function() {

    /* =HELPERS
    --------------------------------------------------------------------------- */
    var _todos;
    var _list;
    var _$toggleAll;

    function renderView() {
      _todos = new Todos();

      _list = new TodoListView({
        collection : _todos
      });

      _list.render();

      _$toggleAll = _list.ui.toggleAll;

      $('#sandbox').html(_list.$el);
    }

    function instanceViewWithoutCollection() {
      var list = new TodoListView();
    }

    function clearSandbox() {
      $('#sandbox').html('');
    }

    function addTodo(todo) {
      _todos.add(todo);
    }

    function addDoneTodo() {
      addTodo({
        text : 'Done todo',
        done : true
      });
    }

    function addNotDoneTodo() {
      addTodo({
        text : 'Not done todo'
      });
    }

    function createSpyOnTodoListInvoke() {
      return spyOn(_todos, 'invoke');
    }

    function clickToggleAllCheckbox() {
      _$toggleAll.trigger('click');
    }

    function clickToggleAllCheckboxTwice() {
      clickToggleAllCheckbox();
      clickToggleAllCheckbox();
    }

    /* =BEFORE AND AFTER
    --------------------------------------------------------------------------- */
    beforeEach(function() {
      renderView();
    });

    afterEach(function() {
      clearSandbox();
    });

    /* =SPECS
    --------------------------------------------------------------------------- */

    /* =|General specs
    ----------------------------------------- */
    it("Should require a collection of Todos attached", function() {
      expect(instanceViewWithoutCollection).toThrow(new Error("a collection must be provided"));
    });

    it("Should have an itemView of type TodoItemView", function() {
      expect(_list.itemView).toBe(TodoItemView);
    });

    it("Should insert TodoItemViews inside an UL with id 'todo-list'", function() {
      expect(_list.itemViewContainer).toBe('ul#todo-list');
    });

    /* =|"Toggle all checkbox" specs
    ----------------------------------------- */
    describe("'Toggle all' checkbox", function() {

      it("Should be present", function() {
        expect(_$toggleAll).toBe('input#toggle-all');
      });

      it("Should be hidden if there are no todos on the collection", function() {
        expect(_$toggleAll).toBeHidden();
      });

      it("Should be visible if there are todos on the collection", function() {
        addTodo({
          text : 'Sample todo'
        });

        expect(_$toggleAll).toBeVisible();
      });

      it("Should update all collection models 'done' attribute when checked", function() {
        var spy = createSpyOnTodoListInvoke();

        clickToggleAllCheckbox();

        expect(spy).toHaveBeenCalledWith('set', { 'done': true});
      });

      it("Should update all collection models 'done' attribute when checked", function() {
        var spy = createSpyOnTodoListInvoke();

        clickToggleAllCheckboxTwice();

        expect(spy).toHaveBeenCalledWith('set', { 'done': false});
      });

      it("Should be checked if all todos are done", function() {
        addDoneTodo();

        expect(_$toggleAll).toBe(':checked');
      });

      it("Should be unchecked if all todos are undone", function() {
        addDoneTodo();
        addNotDoneTodo();

        expect(_$toggleAll).not.toBe(':checked');
      });

    });

  });
});
