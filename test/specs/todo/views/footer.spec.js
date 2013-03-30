define([
  'modules/todo/views/footer',
  'modules/todo/collections/todos',
  'utils/communication-bus',
], function(FooterView, Todos, CommunicationBus) {
  describe("TO-DO footer view", function() {

    /* =HELPERS
    --------------------------------------------------------------------------- */
    var _todos;
    var _footer;

    function renderView() {
      _todos = new Todos();

      _footer = new FooterView({
        collection : _todos
      });

      _footer.render();
    }

    function renderViewWithoutCollection() {
      new FooterView()
    }

    function getClearCompletedButton() {
      return _footer.$el.find('#clear-completed');
    }

    function getTodoCountText() {
      return _footer.$el.find('#todo-count');
    }

    function getFilterLinks() {
      return _footer.$el.find('#filters a');
    }

    function getFilterAllLink() {
      return getFilterLinks().eq(0);
    }

    function getFilterActiveLink() {
      return getFilterLinks().eq(1);
    }

    function getFilterCompletedLink() {
      return getFilterLinks().eq(2);
    }

    function setFilter(filter) {
      CommunicationBus.vent.trigger('todo:list:filter', filter);
    }

    function addDoneTodo() {
      _todos.add({
        text : 'Done 1',
        done : true
      });
    }

    function addNotDoneTodo() {
      _todos.add({
        text : 'Not done',
        done : false
      });
    }

    function resetTodoList() {
      _todos.reset();
    }

    /* =BEFORE AND AFTER
    --------------------------------------------------------------------------- */
    beforeEach(function() {
      renderView();

      $('#sandbox').append(_footer.$el);
    });

    afterEach(function() {
      $('#sandbox').html('');
    });

    /* =SPECS
    --------------------------------------------------------------------------- */

    /* =|General specs
    ----------------------------------------- */
    it("Should require a collection of Todos attached", function() {
      expect(renderViewWithoutCollection).toThrow(new Error("a collection must be provided"));
    });

    /* =|Filter links
    ----------------------------------------- */
    describe("Filter links list", function() {
      it("Should have a filter to view 'All' todos", function() {
        var $link = getFilterAllLink();

        expect($link.attr('href')).toBe('#/');
      });

      it("Should have a filter to view 'Active' todos", function() {
        var $link = getFilterActiveLink();

        expect($link.attr('href')).toBe('#/active');
      });

      it("Should have a filter to view 'Completed' todos", function() {
        var $link = getFilterCompletedLink();

        expect($link.attr('href')).toBe('#/completed');
      });

      it("Should set 'All' filter as selected by default", function() {
        expect(getFilterAllLink()).toHaveClass('selected');
      });

      it("Should set 'All' filter as selected after filtering by 'All' todos", function() {
        setFilter('');

        expect(getFilterAllLink()).toHaveClass('selected');
      });

      it("Should set 'Active' filter as selected after filtering by 'Active' todos", function() {
        setFilter('active');

        expect(getFilterActiveLink()).toHaveClass('selected');
      });

      it("Should set 'Completed' filter as selected after filtering by 'Completed' todos", function() {
        setFilter('completed');

        expect(getFilterCompletedLink()).toHaveClass('selected');
      });
    });

    /* =|Remaining tasks
    ----------------------------------------- */
    describe("Remaining tasks count", function() {
      it("Should show how many tasks are not done", function() {
        addDoneTodo();
        addNotDoneTodo();
        addNotDoneTodo();

        expect(getTodoCountText()).toHaveText(/2/);
      });

      it("Should use singular form when only one todo left", function() {
        addDoneTodo();
        addNotDoneTodo();

        expect(getTodoCountText()).toHaveText(/item/);
      });

      it("Should use plural form when more than one todo is left", function() {
        addDoneTodo();
        addNotDoneTodo();
        addNotDoneTodo();

        expect(getTodoCountText()).toHaveText(/items/);
      });
    });

    /* =|Clear completed tasks
    ----------------------------------------- */
    describe("Clear completed tasks button", function() {
      it("Should not be appended when there are no tasks", function() {
        expect(getClearCompletedButton()).not.toExist();
      });

      it("Should not be appended when there are no completed tasks", function() {
        addNotDoneTodo();

        expect(getClearCompletedButton()).not.toExist();
      });

      it("Should be appended when there are completed tasks", function() {
        addDoneTodo();

        expect(getClearCompletedButton()).toBeVisible();
      });

      it("Should not be appended after reseting todo list", function() {
        addDoneTodo();
        resetTodoList();

        expect(getClearCompletedButton()).not.toExist();
      });

      it("Should remove done todos when clicked", function() {
        addDoneTodo();
        addDoneTodo();
        addNotDoneTodo();

        getClearCompletedButton().trigger('click');

        expect(_todos.where({
          done : false
        }).length).toBe(1);
      });

      it("Should show the number of done todos", function() {
        addDoneTodo();
        addDoneTodo();
        addNotDoneTodo();
        addNotDoneTodo();

        expect(getClearCompletedButton()).toHaveText(/2/);
      });
    });

  });
});
