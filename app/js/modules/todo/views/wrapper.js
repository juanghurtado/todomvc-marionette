define([
  'text!modules/todo/views/templates/wrapper.html',
  'modules/todo/views/header',
  'modules/todo/views/footer',
  'modules/todo/views/todo-list',
  'utils/communication-bus',
  'marionette'
], function(LayoutTemplate, HeaderView, FooterView, ListView, CommunicationBus, Marionette) {

  Layout = Marionette.Layout.extend({
    template: LayoutTemplate,
    regions: {
      header: "#header",
      main: "#main",
      footer : "#footer"
    },
    collectionEvents : {
      "all" : "handleRegionsVisibility"
    },

    initialize : function() {
      if (!this.collection) {
        throw new Error('a collection must be provided');
      }

      var viewOptions = {
        collection : this.collection
      };
      var header = new HeaderView(viewOptions);
      var footer = new FooterView(viewOptions);
      var list = new ListView(viewOptions);

      this.on('show', function() {
        this.header.show(header);
        this.footer.show(footer);
        this.main.show(list);

        this.handleRegionsVisibility();
      });

      var that = this;
      CommunicationBus.vent.on('todo:list:filter', function(filter) {
        that.$el.attr('class', '');
        that.$el.addClass(filter);
      });
    },

    handleRegionsVisibility : function() {
      if (this.collection.length <= 0) {
        this.footer.$el.hide();
        this.main.$el.hide();
      } else {
        this.footer.$el.show();
        this.main.$el.show();
      }
    }
  });

  return Layout;

});