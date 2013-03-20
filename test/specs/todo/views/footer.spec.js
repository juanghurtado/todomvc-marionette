define([
  'modules/todo/views/footer',
  'modules/todo/collections/todos',
  'utils/communication-bus',
], function(FooterView, Todos, CommunicationBus) {
  describe("TO-DO footer view", function() {

    beforeEach(function() {
      this.todos = new Todos();

      this.footer = new FooterView({
        collection : this.todos
      });

      this.footer.render();

      $('#sandbox').append(this.footer.$el);
    });

    afterEach(function() {
      $('#sandbox').html('');
    });

    it("Should require a collection of Todos attached", function() {
      expect(function() {
        var footer = new FooterView();
      }).toThrow(new Error("a collection must be provided"));
    });

    describe("Filter links list", function() {

      it("Should have links to all 3 types of filters", function() {
        var $links = this.footer.$el.find('#filters a');

        expect($links.length).toBe(3);
        expect($links.eq(0).attr('href')).toBe('#/');
        expect($links.eq(1).attr('href')).toBe('#/active');
        expect($links.eq(2).attr('href')).toBe('#/completed');
      });

      it("Should set 'selected' class on active filter", function() {

        var $links = this.footer.$el.find('#filters a');

        expect($links.filter('.selected')).toBe($links.eq(0));

        CommunicationBus.vent.trigger('todo:list:filter', 'active');
        expect($links.filter('.selected')).toBe($links.eq(1));

        CommunicationBus.vent.trigger('todo:list:filter', 'completed');
        expect($links.filter('.selected')).toBe($links.eq(2));
      });

    });

    describe("Remaining tasks count", function() {

      it("Should show how many tasks are not done", function() {
        this.todos.add([
          {
            text : 'Not done 1',
            done : false
          }, {
            text : 'Done 1',
            done : true
          }
        ]);

        expect($('#todo-count strong')).toHaveText(/1/);

        this.todos.add([
          {
            text : 'Not done 2',
            done : false
          }, {
            text : 'Done 2',
            done : true
          }
        ]);

        expect($('#todo-count strong')).toHaveText(/2/);
      });

      it("Should handle plurals on text", function() {
        this.todos.add({
          text : 'Not done 1',
          done : false
        });

        expect($('#todo-count')).toHaveText(/item/);

        this.todos.add({
          text : 'Not done 2',
          done : false
        });

        expect($('#todo-count')).toHaveText(/items/);
      });

    });

    describe("Clear completed tasks button", function() {

      it("Should be hidden when no tasks on the collection", function() {
        expect($('#clear-completed').length).toBe(0);
      });

      it("Should be hidden when no completed tasks on the collection", function() {
        this.todos.add({
          text : 'Sample TO-DO',
          done : false
        });
        expect($('#clear-completed').length).toBe(0);
      });

      it("Should be visible when completed tasks are present on the collection", function() {
        expect($('#clear-completed').length).toBe(0);

        this.todos.add({
          text : 'Sample TO-DO',
          done : true
        });

        expect($('#clear-completed')).toBeVisible();
      });

      it("Should be hidden after reseting the collection", function() {
        this.todos.add({
          text : 'Sample TO-DO',
          done : true
        });

        expect($('#clear-completed')).toBeVisible();

        this.todos.reset();

        expect($('#clear-completed').length).toBe(0);
      });

      it("Should remove done tasks on the collection when clicked", function() {
        this.todos.add([
          {
            text : "Done 1",
            done : true
          },
          {
            text : "Done 2",
            done : true
          },
          {
            text : "Not done",
            done : false
          }
        ]);

        $('#clear-completed').trigger('click');

        expect(this.todos.length).toBe(1);
        expect(this.todos.at(0).get('done')).toBe(false);
      });

      it("Should show done tasks number on button text", function() {
        this.todos.add([
          {
            text : "Done 1",
            done : true
          },
          {
            text : "Done 2",
            done : true
          },
          {
            text : "Not done 1",
            done : false
          },
          {
            text : "Not done 2",
            done : false
          }
        ]);

        expect($('#clear-completed')).toHaveText(/2/);
      });

    });

  });
});
