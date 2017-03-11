$traceurRuntime.registerModule("../traceur/todo.es6", [], function() {
  "use strict";
  var __moduleName = "../traceur/todo.es6";
  var Todo = function() {
    function Todo() {
      var $__3 = this;
      var todoParent = document.querySelector('.bible-todo-parent');
      todoParent.addEventListener('click', function(e) {
        var target = e.target;
        switch (target.className) {
          case "bible-add-todo":
            var todoAddParent = document.querySelector('.todo-add-parent');
            var cover = document.querySelector('.bible-head-cover');
            todoAddParent.setAttribute('style', 'visibility: visible;');
            var todoClose = todoAddParent.querySelector('.todo-bible-close');
            var todoAddTodo = todoAddParent.querySelector('.todo-add-button');
            todoClose.addEventListener('click', function(e) {
              var target = e.target;
              var d = document.querySelector(("." + target.getAttribute('data-remove')));
              d.removeAttribute('style');
            });
            todoAddTodo.addEventListener('click', function(e) {
              var date = todoAddParent.querySelector('input[type="date"]');
              var time = todoAddParent.querySelector('input[type="time"]');
              var todo = todoAddParent.querySelector('textarea');
              $__3.addTodo(date, time, todo, todoAddParent);
            });
            break;
          case "bible-view-todo":
            break;
          default:
        }
      });
    }
    return ($traceurRuntime.createClass)(Todo, {
      addTodo: function(date, time, todo, parent) {
        var $__4;
        var savedate = date.value.replace(/-/g, '');
        var savetime = time.value.replace(/-/g, '');
        var savetodo = todo.value;
        {
          if ((String(savedate).length === 0)) {
            Todo.SetStatusMessage("Please use a proper date");
            return;
          } else if (String(savetime).length === 0) {
            Todo.SetStatusMessage("Please use a proper time");
            return;
          } else if (savetodo.length < 10) {
            Todo.SetStatusMessage("Your Todo Message should be greater than 10 characters");
            return;
          }
        }
        var getPrevItem = JSON.parse(localStorage.getItem('___TODO___'));
        var isTrueFalse = (getPrevItem) ? true : false;
        var todoInfo = Object.create({});
        var obj = ($__4 = {}, Object.defineProperty($__4, savetodo.substring(0, 30), {
          value: {
            todo_date: savedate,
            todo_content: savetodo,
            todo_time: savetime
          },
          configurable: true,
          enumerable: true,
          writable: true
        }), $__4);
        if (!isTrueFalse) {
          Object.assign(todoInfo, obj);
          localStorage.setItem('___TODO___', JSON.stringify(todoInfo));
          Todo.SetStatusMessage('todo has been succefully saved');
          parent.removeAttribute('style');
          return;
        }
        Object.assign(todoInfo, getPrevItem, obj);
        localStorage.setItem('___TODO___', JSON.stringify(todoInfo));
        Todo.SetStatusMessage('todo has been succefully saved');
        parent.removeAttribute('style');
      },
      removeTodo: function() {}
    }, {SetStatusMessage: function(msg) {
        if (((typeof msg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(msg))) !== 'string') {
          throw Error(("expected a string as an argument but got " + ((typeof msg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(msg)))));
        }
        var bibleRep = document.querySelector(".bible-report");
        bibleRep.innerHTML = msg;
        bibleRep.setAttribute('style', 'visibility: visible');
        setTimeout(function() {
          bibleRep.removeAttribute('style');
        }, 3000);
      }});
  }();
  var td = new Todo();
  return {};
});
$traceurRuntime.getModule("../traceur/todo.es6" + '');
