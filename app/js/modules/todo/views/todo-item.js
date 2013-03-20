define([
  'text!modules/todo/views/templates/todo-item.html',
  'utils/communication-bus',
  'marionette'
], function(ItemTemplate, CommunicationBus, Marionette) {

  var ENTER_KEY = 13;

  Item = Marionette.ItemView.extend({
    tagName: 'li',
    template: ItemTemplate,
    ui: {
      toggle : '.toggle',
      textfield : '.edit',
      label : 'label',
      destroy : '.destroy'
    },
    events : {
      'click .toggle' : 'toggleItem',
      'keypress .edit' : 'editItem',
      'dblclick label' : 'startEditing',
      'click .destroy' : 'destroyItem'
    },
    modelEvents : {
      'change' : 'render'
    },

    onRender : function() {
      this.$el.removeClass('active completed');

      if (this.model.get('done')) {
        this.$el.addClass('completed');
      } else {
        this.$el.addClass('active');
      }
    },

    toggleItem : function() {
      this.model.toggleState().save();
    },

    editItem : function(e) {
      var text = this.ui.textfield.val().trim();

      if (e.which === ENTER_KEY && text) {
        this.model.set('text', text).save();
        this.ui.textfield.val('');
        this.$el.removeClass('editing');
      }
    },

    startEditing : function() {
      this.$el.addClass('editing');
      this.ui.textfield.focus().select();
    },

    destroyItem : function() {
      this.model.destroy();
    }

  });

  return Item;

});