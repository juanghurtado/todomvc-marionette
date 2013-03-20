define([
  'modules/todo/models/todo',
  'utils/communication-bus',
], function(Todo, CommunicationBus) {
  describe('TO-DO model', function() {

    /* =HELPERS
    --------------------------------------------------------------------------- */
    function expectTodoToHaveDefaultAttributes(todo) {
      expect(todo.get('text')).toBe('Something to do');
      expect(todo.get('done')).toBe(false);
      expect(todo.get('date')).toBeDefined();
      expect(todo.get('date')).toNotBe(0);
    }

    function expectTodoToBeInvalidWithMessage(todo, msg) {
      expectTodoToBeInvalid(todo);
      expect(todo.validationError).toBe(msg);
    }

    function expectTodoToBeInvalid(todo) {
      expect(todo.isValid()).toBe(false);
    }

    /* =SPECS
    --------------------------------------------------------------------------- */
    it('Should have default attributes', function() {
      var todo = new Todo();

      expectTodoToHaveDefaultAttributes(todo);
    });

    it('should not save when text is empty', function() {
      var todo = new Todo();

      todo.save({
        'text': ''
      });

      expectTodoToBeInvalidWithMessage(todo, 'cannot have an empty text')
    });

    it('should not set an empty text', function() {
      var todo = new Todo({
        text : 'Sample todo'
      });

      todo.set('text', '');

      expectTodoToBeInvalid(todo)
    });

    describe("toggleState()", function() {

      it("Should toggle models done state", function() {
        var todo = new Todo();

        todo.toggleState();

        expect(todo.get('done')).toBe(true);

        todo.toggleState();

        expect(todo.get('done')).toBe(false);
      });

      it("Should return model itself", function() {
        var todo = new Todo();

        expect(todo.toggleState()).toBe(todo);
      });

    });

  });
});
