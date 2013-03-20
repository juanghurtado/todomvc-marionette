define([
  'modules/todo/views/header',
  'modules/todo/collections/todos',
  'utils/communication-bus',
  'marionette'
], function(HeaderView, Todos, CommunicationBus, Marionette) {
  describe("TO-DO header view", function() {

    var ENTER_KEY = 13;
    var A_KEY = 65;

    function getEnterKeyEvent() {
      var e = jQuery.Event('keypress');
      e.which = ENTER_KEY;

      return e;
    }

    function addTodoWithText(text, $tf) {
      var e = getEnterKeyEvent();

      $tf.val(text);
      $tf.trigger(e);
    }

    function createMockOnTodosCreateMethod(todos) {
      var spy = spyOn(todos, 'create').andCallFake(function(model) {
        todos.add(model);
      });
    }

    beforeEach(function() {
      this.todos = new Todos();

      createMockOnTodosCreateMethod(this.todos);

      this.header = new HeaderView({
        collection : this.todos
      });

      this.header.render();

      this.$tf = this.header.ui.textfield;

      $('#sandbox').html(this.header.$el);
    });

    afterEach(function() {
      $('#sandbox').html('');
    });

    it("Should require a collection of Todos attached", function() {
      expect(function() {
        var wrapper = new HeaderView();
      }).toThrow(new Error("a collection must be provided"));
    });

    it("Should have an input with id 'new-todo'", function() {
      expect(this.$tf).toExist();
      expect(this.$tf).toHaveId('new-todo');
      expect(this.$tf).toBeVisible();
    });

    it("Should create a new todo on ENTER key press", function() {
      expect(this.todos.length).toBe(0);

      addTodoWithText('Good TODO', this.$tf);

      expect(this.todos.length).toBe(1);
      expect(this.todos.at(0).get('text')).toBe('Good TODO');
    });

    it("Should not create a new todo on ENTER key press if input has no text", function() {
      expect(this.todos.length).toBe(0);

      addTodoWithText('', this.$tf);

      expect(this.todos.length).toBe(0);
    });

    it("Should trim TODO text before saving", function() {
      var e = getEnterKeyEvent();

      addTodoWithText('   Good TODO   ', this.$tf);

      expect(this.todos.at(0).get('text')).toBe('Good TODO');
    });

  });
});
