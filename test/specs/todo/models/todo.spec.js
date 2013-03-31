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

    function createEmptyTodo() {
      return new Todo();
    }

    function createTodo() {
      return new Todo({
        text : 'Sample todo'
      });
    }

    /* =SPECS
    --------------------------------------------------------------------------- */

    /* =|Global specs
    ----------------------------------------- */
    it('Should have default attributes', function() {
      var todo = createEmptyTodo();

      expectTodoToHaveDefaultAttributes(todo);
    });

    it('should not save when text is empty', function() {
      var todo = createEmptyTodo();

      todo.save({
        'text': ''
      });

      expectTodoToBeInvalidWithMessage(todo, 'cannot have an empty text')
    });

    it("Should call to .destroy() on 'remove' events", function() {
      var todo = createTodo();

      var spy = spyOn(todo, 'destroy');

      todo.trigger('remove');

      expect(spy).toHaveBeenCalled();
    });

    it('should not set an empty text', function() {
      var todo = createTodo();

      todo.set('text', '');

      expectTodoToBeInvalid(todo)
    });

    /* =|toggleState()
    ----------------------------------------- */
    describe("toggleState()", function() {
      it("Should toggle models done state", function() {
        var todo = createEmptyTodo();

        todo.toggleState();

        expect(todo.get('done')).toBe(true);

        todo.toggleState();

        expect(todo.get('done')).toBe(false);
      });

      it("Should return model itself", function() {
        var todo = createEmptyTodo();

        expect(todo.toggleState()).toBe(todo);
      });
    });

  });
});
