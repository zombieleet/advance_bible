$traceurRuntime.registerModule("../traceur/todo.es6", [], function() {
  "use strict";
  var __moduleName = "../traceur/todo.es6";
  var Todo = function() {
    function Todo() {
      var $__3 = this;
      var todoParent = document.querySelector('.bible-todo-parent');
      todoParent.addEventListener('click', function(e) {
        var target = e.target;
        console.log(target.className);
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
            $__3.viewTodo();
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
          } else if (savetodo.length < 30) {
            Todo.SetStatusMessage("Your Todo Message should be greater than 30 characters");
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
      viewTodo: function() {
        var $__3 = this;
        var todo_Obj,
            todoViewParent = document.querySelector(".view-todo"),
            todoView = document.querySelector(".todo-list");
        if ((todo_Obj = localStorage.getItem('___TODO___'))) {
          todo_Obj = JSON.parse(todo_Obj);
          todoViewParent.setAttribute('style', 'visibility: visible;');
          var $__8 = true;
          var $__9 = false;
          var $__10 = undefined;
          try {
            for (var $__6 = void 0,
                $__5 = (Object.keys(todo_Obj))[Symbol.iterator](); !($__8 = ($__6 = $__5.next()).done); $__8 = true) {
              var _j = $__6.value;
              {
                var $__12 = todo_Obj[_j],
                    todo_date = $__12.todo_date,
                    todo_time = $__12.todo_time,
                    todo_content = $__12.todo_content;
                var listElement = document.createElement('li'),
                    dateElement = document.createElement('p'),
                    timeElement = document.createElement('p'),
                    contentElement = document.createElement('p'),
                    deleteTodo = document.createElement('span');
                dateElement.innerHTML = todo_date, timeElement.innerHTML = todo_time, contentElement.innerHTML = todo_content, deleteTodo.innerHTML = "Delete";
                listElement.setAttribute('class', 'todo-view-item');
                dateElement.setAttribute('class', 'todo-date');
                deleteTodo.setAttribute('class', 'fa todo-delete-todo pull-right');
                timeElement.setAttribute('class', 'todo-time');
                contentElement.setAttribute('class', '_todo-content');
                listElement.appendChild(dateElement);
                listElement.appendChild(timeElement);
                listElement.appendChild(contentElement);
                listElement.appendChild(deleteTodo);
                todoView.appendChild(listElement);
              }
            }
          } catch ($__11) {
            $__9 = true;
            $__10 = $__11;
          } finally {
            try {
              if (!$__8 && $__5.return != null) {
                $__5.return();
              }
            } finally {
              if ($__9) {
                throw $__10;
              }
            }
          }
        } else {
          Todo.SetStatusMessage("No Todo has been added yet");
          return;
        }
        todoViewParent.addEventListener('click', function(e) {
          var target = e.target;
          if (target.getAttribute('class').includes('bible-close')) {
            todoViewParent.removeAttribute('style');
            Array.from(todoView.children, function(el) {
              el.remove();
            });
          } else if (target.getAttribute('class').includes('todo-delete-todo')) {
            $__3.removeTodo(target);
          }
        });
      },
      removeTodo: function(target) {
        var pNode = target.parentNode;
        var contEl = pNode.querySelector('._todo-content');
        var todoRenderedList = pNode.parentNode;
        var __todo__ = JSON.parse(localStorage.getItem("___TODO___"));
        var $__8 = true;
        var $__9 = false;
        var $__10 = undefined;
        try {
          for (var $__6 = void 0,
              $__5 = (Object.keys(__todo__))[Symbol.iterator](); !($__8 = ($__6 = $__5.next()).done); $__8 = true) {
            var miniObj = $__6.value;
            {
              var $__12 = __todo__[miniObj],
                  todo_date = $__12.todo_date,
                  todo_time = $__12.todo_time,
                  todo_content = $__12.todo_content;
              todo_content = todo_content.substring(0, 30);
              if (todo_content === contEl.innerHTML.substring(0, 30)) {
                delete __todo__[miniObj];
                localStorage.removeItem("___TODO___");
                localStorage.setItem("___TODO___", JSON.stringify(__todo__));
                pNode.remove();
                if (todoRenderedList.children.length === 0) {
                  todoRenderedList.parentNode.parentNode.removeAttribute('style');
                }
                break;
              }
            }
          }
        } catch ($__11) {
          $__9 = true;
          $__10 = $__11;
        } finally {
          try {
            if (!$__8 && $__5.return != null) {
              $__5.return();
            }
          } finally {
            if ($__9) {
              throw $__10;
            }
          }
        }
        if (Object.keys(__todo__).length === 0) {
          localStorage.removeItem("___TODO___");
          return;
        }
      }
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
