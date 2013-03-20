define([
  'text!modules/todo/views/templates/footer.html',
  'utils/communication-bus',
  'marionette'
], function(FooterTemplate, CommunicationBus, Marionette) {

  Footer = Marionette.ItemView.extend({
    template: FooterTemplate,
    ui: {
      count : "#todo-count",
      filters : "#filters a",
      clear : "#clear-completed"
    },
    events : {
      "click #clear-completed" : "clearCompleted"
    },
    collectionEvents: {
      "all": "render"
    },

    initialize : function() {
      if (!this.collection) {
        throw new Error('a collection must be provided');
      }

      var that = this;

      CommunicationBus.vent.on('todo:list:filter', function(filter) {
        that.ui.filters
          .removeClass('selected')
          .filter('[href="#/'+ filter +'"]')
          .addClass('selected')
      });
    },

    serializeData: function(){
      return {
        completed: this.collection.getCompleted().length,
        notCompleted: this.collection.getNotCompleted().length
      }
    },

    clearCompleted : function() {
      this.collection.remove(this.collection.getCompleted());
    }

  });

  return Footer;
});