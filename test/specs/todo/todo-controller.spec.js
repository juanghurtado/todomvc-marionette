define([
  'modules/todo/todo-controller',
  'modules/todo/views/wrapper',
  'modules/todo/collections/todos',
  'utils/communication-bus',
  'marionette'
], function(TodoController, WrapperView, Todos, CommunicationBus, Marionette) {
  describe('TO-DO controller', function() {

    /* =HELPERS
    --------------------------------------------------------------------------- */
    function createSpyOnCommunicationBusVentTrigger() {
      return spyOn(CommunicationBus.vent, 'trigger');
    }

    function assertFilterEventCalledWith(spy, filter) {
      expect(spy).toHaveBeenCalledWith('todo:list:filter', filter);
    }

    /* =SPECS
    --------------------------------------------------------------------------- */

    /* =|allowedFilters
    ----------------------------------------- */
    it("Should have an allowedFilters array defined with 3 items", function() {
      expect(TodoController.allowedFilters).toEqual(['', 'active', 'completed']);
    });

    /* =|SetItem()
    ----------------------------------------- */
    describe("setItem()", function() {

      it("Should trigger a 'todo:list:filter' event on CommunicationBus passing the filter if it is allowed", function() {
        var spy = createSpyOnCommunicationBusVentTrigger();

        _.each(TodoController.allowedFilters, function(val) {
          TodoController.setFilter(val);

          assertFilterEventCalledWith(spy, val);
        });
      });

      it("Should trigger a 'todo:list:filter' event on CommuncationBus passing empty filter if filter is not allowed", function() {
        var spy = createSpyOnCommunicationBusVentTrigger();

        TodoController.setFilter('not_allowed');

        assertFilterEventCalledWith(spy, '');
      });

    });

    /* =|showInitialLayoutOn()
    ----------------------------------------- */
    describe("showInitialLayoutOn()", function() {

      /* =|Helpers
      ----------------------------------------- */
      var _mockLayout;
      var _fetchSpy;

      function renderMockLayout() {
        var mockLayout = Marionette.Layout.extend({
          template: '<div id="region"></div>',

          regions: {
            region: "#region"
          }
        });

        mockLayout = new mockLayout();
        mockLayout.render();

        return mockLayout;
      }

      /* =|Before and after
      ----------------------------------------- */
      beforeEach(function() {
        _mockLayout = renderMockLayout();
        _fetchSpy = spyOn(TodoController.todos, 'fetch');

        TodoController.showInitialLayoutOn(_mockLayout.region);
      });

      afterEach(function() {
        _mockLayout.close();
      });

      /* =|Specs
      ----------------------------------------- */
      it("Should put a WrapperView inside given view", function() {
        expect(_mockLayout.region.currentView instanceof WrapperView).toBe(true);
      });

      it("Should pass a Todos collection to the WrapperView inside given view", function() {
        expect(_mockLayout.region.currentView.collection instanceof Todos).toBe(true);
      });

      it("Should call fetch on Todos collection", function() {
        expect(_fetchSpy).toHaveBeenCalled();
      });

    });

  });
});
