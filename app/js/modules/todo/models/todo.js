define(['backbone', 'underscore', 'backbone.localstorage'],function(Backbone, _){

  var Model = Backbone.Model.extend({
    defaults : {
      'text' : 'Something to do',
      'done' : false,
      'date' : 0
    },

    initialize : function() {
      if (this.isNew()) {
        this.set('date', Date.now());
      }

      this.bind('remove', function() {
        this.destroy();
      });
    },

    validate: function(attrs) {
      if (_.isEmpty(attrs.text)) {
        return "cannot have an empty text";
      }
    },

    toggleState : function() {
      return this.set('done', !this.get('done'));
    }
  });

  return Model;

});
