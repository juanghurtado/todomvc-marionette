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
      addTodo({
        text : 'Sample',
        done : true
      });

      expect(_list.children.first().$el).toHaveClass('completed');
    });

    it("Should have 'active' class if todo is not done", function() {
      addTodo({
        text : 'Sample'
      });

      expect(_list.children.first().$el).toHaveClass('active');
    });

    it("Should reRender the view on model change", function() {
      addTodo({
        text : 'Sample'
      });

      _todos.at(0).set('text', 'Updated text');

      var $el = _list.children.first().$el;
      var $label = $el.find('label');

      expect($label).toHaveText('Updated text');
    });

    it("Should update model 'done' attr when clicking on checkbox", function() {
      addTodo({
        text : 'Sample'
      });

      var $toggle = _list.children.first().$el.find('input.toggle');

      $toggle.trigger('click');

      expect(_todos.at(0).get('done')).toBe(true);
    });

    it("Should set focus on textfield and add 'editing' class on item after a double click on todo text", function() {
      addTodo({
        text : 'Sample'
      });

      var $el = _list.children.first().$el;
      var $textfield = $el.find('.edit');
      var $label = $el.find('label');

      $label.trigger('dblclick');

      expect($el).toHaveClass('editing');
      expect($textfield).toBe(':focus');
    });

    it("Should empty the textfield and remove 'editing' class on item after updating a todo", function() {
      addTodo({
        text : 'Sample'
      });

      var enterKeyPressed = getEnterKeyPressed();

      var $el = _list.children.first().$el;
      var $label = $el.find('label');
      var $textfield = $el.find('.edit');

      $label.trigger('dblclick');

      $textfield.val('Edited text');
      $textfield.trigger(enterKeyPressed);

      expect($el.find('.edit').val()).toBe('');
      expect($el).not.toHaveClass('editing');
    });

    it("Should destroy the model after clicking on destroy button", function() {
      addTodo({
        text : 'Sample'
      });

      var $destroy = _list.children.first().$el.find('.destroy');

      $destroy.trigger('click');

      expect(_todos.length).toBe(0);
    });

  });
});
