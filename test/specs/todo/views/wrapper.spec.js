define([
  'modules/todo/views/wrapper',
  'modules/todo/views/footer',
  'modules/todo/views/header',
  'modules/todo/collections/todos',
  'utils/communication-bus',
  'marionette'
], function(WrapperView, FooterView, HeaderView, Todos, CommunicationBus, Marionette) {
  describe("TO-DO wrapper view", function() {

    /* =HELPERS
    --------------------------------------------------------------------------- */
    var _todos;
    var _wrapper;
    var _mockLayout;

    function renderView() {
      var MockLayout = Marionette.Layout.extend({
        template : '<div id="test"></div>',
        regions : {
          test : '#test'
        }
      });

      _todos = new Todos();

      _wrapper = new WrapperView({
        collection : _todos
      });

      _mockLayout = new MockLayout();

      _mockLayout.render();
      _mockLayout.test.show(_wrapper);
    }

    function setFilter(filter) {
      CommunicationBus.vent.trigger('todo:list:filter', filter);
    }

    function createAndRenderMockWrapperAddingTodo(model) {
      var MockLayout = Marionette.Layout.extend({
        template : '<div id="test"></div>',
        regions : {
          test : '#test'
        }
      });

      var todos = new Todos();

      if (model) {
        todos.add(model);
      }

      var wrapper = new WrapperView({
        collection : todos
      });

      var mockLayout = new MockLayout();

      mockLayout.render();
      mockLayout.test.show(wrapper);

      $('#sandbox').html(mockLayout.$el);

      return wrapper;
    }

    /* =BEFORE AND AFTER
    --------------------------------------------------------------------------- */
    beforeEach(function() {
      renderView();

      $('#sandbox').html(_mockLayout.$el);
    });

    afterEach(function() {
      $('#sandbox').html('');
    });

    /* =SPECS
    --------------------------------------------------------------------------- */
    it("Should require a collection of Todos attached", function() {
      expect(function() {
        var wrapper = new WrapperView();
      }).toThrow(new Error("a collection must be provided"));
    });

    it("Should have three regions: header, footer and wrapper", function() {
      expect(_wrapper.footer).toBeDefined();
      expect(_wrapper.header).toBeDefined();
      expect(_wrapper.main).toBeDefined();

      expect(_wrapper.footer.el).toBe('#footer');
      expect(_wrapper.header.el).toBe('#header');
      expect(_wrapper.main.el).toBe('#main');
    });

    it("Should have FooterView on footer region and HeaderView on header region", function() {
      expect(_wrapper.footer.currentView instanceof FooterView).toBe(true);
      expect(_wrapper.header.currentView instanceof HeaderView).toBe(true);
    });

    it("Should show footer region on show if collection has todos", function() {
      var wrapper = createAndRenderMockWrapperAddingTodo({
        text : "Sample todo"
      });

      expect(wrapper.footer.$el).toBeVisible();
    });

    it("Should hide footer region on show if there are no todos", function() {
      var wrapper = createAndRenderMockWrapperAddingTodo();

      expect(wrapper.footer.$el).toBeHidden();
    });

    it("Should show main region on show if collection has todos", function() {
      var wrapper = createAndRenderMockWrapperAddingTodo({
        text : "Sample todo"
      });

      expect(wrapper.main.$el).toBeVisible();
    });

    it("Should hide main region on show if there are no todos", function() {
      var wrapper = createAndRenderMockWrapperAddingTodo();

      expect(wrapper.main.$el).toBeHidden();
    });

    it("Should show footer region after adding todos", function() {
      _todos.add({
        text : 'Sample todo'
      });

      expect(_wrapper.footer.$el).toBeVisible();
    });

    it("Should hide footer region after todo list reset", function() {
      _todos.reset();

      expect(_wrapper.footer.$el).toBeHidden();
    });

    it("Should show main region after adding todos", function() {
      _todos.add({
        text : 'Sample todo'
      });

      expect(_wrapper.main.$el).toBeVisible();
    });

    it("Should hide main region after todo list reset", function() {
      _todos.reset();

      expect(_wrapper.main.$el).toBeHidden();
    });

    it("Should add 'active' class on wrapper on show active items filter event", function() {
      setFilter('active');

      expect(_wrapper.$el).toHaveClass('active');
    });

    it("Should add 'completed' class on wrapper on show completed items filter event", function() {
      setFilter('completed');

      expect(_wrapper.$el).toHaveClass('completed');
    });

    it("Should remove class on wrapper on show all items filter event", function() {
      setFilter('');

      expect(_wrapper.$el.attr('class')).toBe('');
    });

  });
});
