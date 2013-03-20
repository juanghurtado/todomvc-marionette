define(['marionette'], function(Marionette) {

  var Router = Marionette.AppRouter.extend({
    appRoutes:{
      '*filter': 'setFilter'
    }
  });

  return Router;

});