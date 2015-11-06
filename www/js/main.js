var app = {

    initialize: function() {
      var self = this;
      self.detailsURL = /^#employees\/(\d{1,})/;
      self.registerEvents();
      self.store = new MemoryStore(function(){
        self.route()
      });
    },

    showAlert: function (message, title) {
      if(navigator.notification){
        navigator.notification.alert(message, null, title, 'OK');
      }
      else {
        alert(title ? (title + ": " + message) : message);
      }
    },

    registerEvents: function() {
      var self = this;

      $(window).on('hashchange', $.proxy(this.route, this));

      // Check if browser supports touch events
      if(document.documentElement.hasOwnProperty('ontouchstart')) {
        $('body').on('touchstart', 'a', function(event) {
          $(event.target).addClass('tappable-active');
        });
        $('body').on('touched', 'a', function(event) {
          $(event.target).removeClass('tappable-active');
        });
      }
      else {
        // ... if not: register mouse events instead
        $('body').on('mousedown', 'a', function(event) {
          $(event.target).addClass('tappable-active');
        });
        $('body').on('mouseup', 'a', function(event) {
          $(event.target).removeClass('tappable-active');
        });
      }
    },

    route: function() {
      var self = this;
      var hash = window.location.hash;
      if(!hash) {
        $('body').html(new HomeView(this.store).render().el);
        return;
      }
      var match = hash.match(app.detailsURL);
      if(match) {
        self.store.findById(Number(match[1]), function(employee) {
          $('body').html(new EmployeeView(employee).render().el);
        });
      }
    }

};

app.initialize();
