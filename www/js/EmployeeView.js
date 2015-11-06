var EmployeeView = function(employee) {
  var self = this;

  self.initialize = function() {
    this.el = $('<div/>');
  };

  self.render = function() {
    this.el.html(EmployeeView.template(employee));
    return this;
  };

  self.initialize();
}

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());
