angular
  .module('app')
  .component('headerComponent', {
    templateUrl: 'app/components/main/Header.html',
//    controller: Header,
    controller: mainCtrl,
    bindings: {
      todos: '='
    }
  });

/** @ngInject */
function Header() {
//  this.todoService = todoService;
}

//Header.prototype = {
//  handleSave: function (text) {
//    if (text.length !== 0) {
//      this.todos = this.todoService.addTodo(text, this.todos);
//    }
//  }
//};
