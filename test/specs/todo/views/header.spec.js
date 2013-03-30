define([
  'modules/todo/views/header',
  'modules/todo/collections/todos',
  'utils/communication-bus',
  'marionette'
], function(HeaderView, Todos, CommunicationBus, Marionette) {
  describe("TO-DO header view", function() {

    /* =HELPERS
    --------------------------------------------------------------------------- */
    var ENTER_KEY = 13;
    var _todos;
    var _header;
    var _$tf;

    function getEnterKeyEvent() {
      var e = jQuery.Event('keypress');
      e.which = ENTER_KEY;

      return e;
    }

    function addTodoWithText(text) {
      var e = getEnterKeyEvent();

      _$tf.val(text);
      _$tf.trigger(e);
    }

    function createMockOnTodosCreateMethod(todos) {
      var spy = spyOn(todos, 'create').andCallFake(function(model) {
        todos.add(model);
      });
    }

    function renderView() {
      _todos = new Todos();

      createMockOnTodosCreateMethod(_todos);

      _header = new HeaderView({
        collection : _todos
      });

      _header.render();

      _$tf = _header.ui.textfield;
    }

    function renderViewWithoutCollection() {
      new HeaderView();
    }

    function getFirstTodoText() {
      return _todos.at(0).get('text');
    }

    /* =BEFORE AND AFTER
    --------------------------------------------------------------------------- */
    beforeEach(function() {
      renderView();

      $('#sandbox').html(_header.$el);
    });

    afterEach(function() {
      $('#sandbox').html('');
    });

    /* =SPECS
    --------------------------------------------------------------------------- */
    it("Should require a collection of Todos attached", function() {
      expect(renderViewWithoutCollection).toThrow(new Error("a collection must be provided"));
    });

    it("Should have an input to insert new TODOs'", function() {
      expect(_$tf).toBeVisible();
    });

    it("Should create a new todo on ENTER key press", function() {
      addTodoWithText('Good TODO');

      expect(getFirstTodoText()).toBe('Good TODO');
    });

    it("Should not create a new todo on ENTER key press if input has no text", function() {
      addTodoWithText('');

      expect(_todos.length).toBe(0);
    });

    it("Should trim TODO text before saving", function() {
      addTodoWithText('   Good TODO   ');

      expect(getFirstTodoText()).toBe('Good TODO');
    });

    it("Should clear input text after creating a new TODO", function() {
      addTodoWithText('Good TODO');

      expect(_$tf.val()).toBe('');
    });

  });
});