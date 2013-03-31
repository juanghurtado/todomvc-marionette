define([
  'modules/todo/views/todo-list',
  'modules/todo/views/todo-item',
  'modules/todo/collections/todos',
  'utils/communication-bus',
], function(TodoListView, TodoItemView, Todos, CommunicationBus) {

  /* =HELPERS
  --------------------------------------------------------------------------- */
  var ENTER_KEY = 13;
  var _todos;
  var _list;
  var _$toggleAll;

  function renderView() {
    _todos = new Todos();

    _list = new TodoListView({
      collection : _todos
    });

    _list.render();

    $('#sandbox').html(_list.$el);
  }

  function clearSandbox() {
    $('#sandbox').html('');
  }

  function addTodo(todo) {
    _todos.add(todo);
  }

  function getEnterKeyPressed() {
    var e = jQuery.Event('keypress');
    e.which = ENTER_KEY;

    return e;
  }

  function addDoneTodo() {
    addTodo({
      text : 'Sample',
      done : true
    });
  }

  function addNotDoneTodo() {
    addTodo({
      text : 'Sample'
    });
  }

  function getFirstTodoInList() {
    return _list.children.first().$el;
  }

  function getLabelOfFirstTodoInList() {
    return getFirstTodoInList().find('label');
  }

  function setTextOfFirstTodo(text) {
    _todos.at(0).set('text', text);
  }

  function clickToggleButtonOnFirstTodo() {
    getFirstTodoInList().find('input.toggle').trigger('click');
  }

  function getTextFieldOfFirstTodoInList() {
   return getFirstTodoInList().find('.edit');
  }

  function doubleClickLabelOfFirstTodoInList() {
    getLabelOfFirstTodoInList().trigger('dblclick');
  }

  function clickDestroyButtonOfFirstTodoInList() {
    getFirstTodoInList().find('.destroy').trigger('click');
  }

  function editTodo() {
    var e = getEnterKeyPressed();

    doubleClickLabelOfFirstTodoInList();
    getTextFieldOfFirstTodoInList().val('Edited text').trigger(e);
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
  describe("TO-DO item view", function() {

    it("Should have 'completed' class if todo is done", function() {
      addDoneTodo();

      expect(getFirstTodoInList()).toHaveClass('completed');
    });

    it("Should have 'active' class if todo is not done", function() {
      addNotDoneTodo();

      expect(getFirstTodoInList()).toHaveClass('active');
    });

    it("Should reRender the view on model change", function() {
      addNotDoneTodo();

      setTextOfFirstTodo('Updated text');

      expect(getLabelOfFirstTodoInList()).toHaveText('Updated text');
    });

    it("Should update model 'done' attr when clicking on checkbox", function() {
      addNotDoneTodo();

      clickToggleButtonOnFirstTodo();

      expect(_todos.at(0).get('done')).toBe(true);
    });

    it("Should set focus on textfield and add 'editing' class on item after a double click on todo text", function() {
      addNotDoneTodo();

      doubleClickLabelOfFirstTodoInList();

      expect(getFirstTodoInList()).toHaveClass('editing');

      // Should test against ':focus', but there is a bug on PhantomJS: https://github.com/ariya/phantomjs/issues/10427
      expect(getTextFieldOfFirstTodoInList()).toBe(document.activeElement);
    });

    it("Should empty the textfield and remove 'editing' class on item after updating a todo", function() {
      addNotDoneTodo();

      editTodo();

      expect(getTextFieldOfFirstTodoInList()).toBeEmpty();
      expect(getFirstTodoInList()).not.toHaveClass('editing');
    });

    it("Should destroy the model after clicking on destroy button", function() {
      addNotDoneTodo();

      clickDestroyButtonOfFirstTodoInList();

      expect(_todos.length).toBe(0);
    });

  });
});
