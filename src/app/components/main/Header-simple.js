angular
  .module('app')
  .component('headerSimple', {
    templateUrl: 'app/components/main/Header-simple.html',
    controller: Header
  });

/** @ngInject */
function Header(todoService) {
//  this.todoService = todoService;
}

Header.prototype = {
  handleSave: function (text) {
    if (text.length !== 0) {
      this.todos = this.todoService.addTodo(text, this.todos);
    }
  }
};
