define(['modules/todo/todo-router'], function(TodoRouter) {
  describe('TO-DO router', function() {

    /* =HELPERS
    --------------------------------------------------------------------------- */
    var _router;
    var _mockController;
    var _spy;

    function resetURL(router) {
      _router.navigate('/test/');
    }

    function startBackboneHistory() {
      try {
        Backbone.history.start({
          silent: true,
          pushState: true
        });
      } catch (e) {}
    }

    function getMockController() {
      return {
        setFilter: function(filter) {}
      };
    }

    function createSpyOnMockControllerSetFilter() {
      return spyOn(_mockController, 'setFilter');
    }

    function createRouter() {
      _mockController = getMockController();

      _spy = createSpyOnMockControllerSetFilter();

      _router = new TodoRouter({
        controller: _mockController
      });
    }

    /* =BEFORE AND AFTER
    --------------------------------------------------------------------------- */
    beforeEach(function() {
      createRouter();

      startBackboneHistory();

      resetURL(_router);
    });

    afterEach(function() {
      resetURL(_router);
    });

    /* =SPECS
    --------------------------------------------------------------------------- */
    it('Should match a route "*filter" with "setFilter" method', function() {
      expect(_router.appRoutes['*filter']).toEqual('setFilter');
    });

    it('Should execute "setFilter" method when navigating to a matching route', function() {
      _router.navigate('test', true);

      expect(_spy).toHaveBeenCalledWith('test');
    });

  });
});
