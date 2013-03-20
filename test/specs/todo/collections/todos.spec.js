define([
  'modules/todo/collections/todos',
  'modules/todo/models/todo',
  'utils/communication-bus',
], function(Todos, Todo, CommunicationBus) {
  describe("TO-DO collection", function() {

    /* =HELPERS
    --------------------------------------------------------------------------- */
    function createTodoListWithTwoDoneItems() {
      var todos = new Todos([{
        done : true
      }, {
        done : true
      }, {
        done : false
      }]);

      return todos;
    }

    function createTodoListWithTwoActiveItems() {
      var todos = new Todos([{
        done : false
      }, {
        done : false
      }, {
        done : true
      }]);

      return todos;
    }

    function getUnorderedInsertedTodos() {
      var todos = new Todos();
      var todo1 = new Todo({});
      var todo2 = new Todo({});
      var todo3 = new Todo({});
      var dates = getMockedDates();

      todo1.set('date', dates[0]);
      todo2.set('date', dates[1]);
      todo3.set('date', dates[2]);

      todos.add(todo2);
      todos.add(todo1);
      todos.add(todo3);

      return todos;
    }

    function getMockedDates() {
      var dates = [];

      dates.push(new Date(2011, 1, 1).getTime());
      dates.push(new Date(2012, 1, 1).getTime());
      dates.push(new Date(2013, 1, 1).getTime());

      return dates;
    }

    function expectTodosToBeOrdered(todos, dates) {
      expect(todos.pluck('date')).toEqual(dates);
    }

    /* =SPECS
    --------------------------------------------------------------------------- */
    it("Should have a method to get completed TO-DO's", function() {
      var todos = createTodoListWithTwoDoneItems();
      var completed = todos.getCompleted();

      expect(completed.length).toBe(2);
    });

    it("Should have a method to get not completed TO-DO's", function() {
      var todos = createTodoListWithTwoActiveItems();
      var not_completed = todos.getNotCompleted();

      expect(not_completed.length).toBe(2);
    });

    it("Should order by date", function() {
      var todos = getUnorderedInsertedTodos();
      var dates = getMockedDates();

      expectTodosToBeOrdered(todos, dates);
    });

  });
});
