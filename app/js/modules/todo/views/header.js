define([
  'text!modules/todo/views/templates/header.html',
  'utils/communication-bus',
  'marionette'
], function(HeaderTemplate, CommunicationBus, Marionette) {

  var ENTER_KEY = 13;

  Header = Marionette.ItemView.extend({
    template: HeaderTemplate,
    ui : {
      textfield : '#new-todo'
    },
    events : {
      "keypress #new-todo" : "newTodoKeyPress"
    },

    initialize : function() {
      if (!this.collection) {
        throw new Error('a collection must be provided');
      }
    },

    newTodoKeyPress : function(e) {
      var text = this.ui.textfield.val().trim();

      if (e.which === ENTER_KEY && text) {
        this.collection.create({
          text : text
        });

        this.ui.textfield.val('');
      }
    }
  });

  return Header;

});