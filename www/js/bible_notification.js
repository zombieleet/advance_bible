$traceurRuntime.registerModule("../traceur/bible_notification.es6", [], function() {
  "use strict";
  var __moduleName = "../traceur/bible_notification.es6";
  var GetNotified = {
    setStatusMessage: function(msg) {
      if (((typeof msg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(msg))) !== 'string') {
        throw Error(("expected a string as an argument but got " + ((typeof msg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(msg)))));
      }
      var bibleRep = document.querySelector(".bible-report");
      bibleRep.innerHTML = msg;
      bibleRep.setAttribute('style', 'visibility: visible');
      setTimeout(function() {
        bibleRep.removeAttribute('style');
      }, 3000);
    },
    isAvailable: function() {
      if ("Notification" in window) {
        return true;
      } else {
        this.setStatusMessage("Update Your Browser to enjoy this feature");
        return false;
      }
    },
    isGranted: function() {
      if (this.isAvailable() && Notification.permission === 'granted') {
        this.getTodo(function() {
          var $__9 = arguments[0] !== (void 0) ? arguments[0] : obj,
              todo_content = $__9.todo_content,
              todo_date = $__9.todo_date;
          navigator.vibrate([200]);
          var __n = new Notification('Todo Notification', {
            body: "content: " + todo_content + "\nDate: " + todo_date,
            icon: './img/old_bible.jpg'
          });
          setTimeout(function() {
            __n.close();
          }, 4000);
          __n.addEventListener('click', function(e) {
            var moveToTodo = document.querySelector('.bible-view-todo'),
                todoList = moveToTodo.querySelector('.todo-list');
            var target = e.target;
            moveToTodo.click();
            console.log(e);
            __n.close();
          });
        });
      } else {
        console.log('asdfadsf');
      }
    },
    getTodo: function(callback) {
      if (localStorage.getItem("___TODO___")) {
        var __todo__ = JSON.parse(localStorage.getItem("___TODO___"));
        var $__5 = true;
        var $__6 = false;
        var $__7 = undefined;
        try {
          for (var $__3 = void 0,
              $__2 = (Object.keys(__todo__))[Symbol.iterator](); !($__5 = ($__3 = $__2.next()).done); $__5 = true) {
            var miniObj = $__3.value;
            {
              var $__9 = __todo__[miniObj],
                  todo_date = $__9.todo_date,
                  todo_time = $__9.todo_time;
              var dateObj = new Date().toLocaleDateString();
              var timeObj = new Date().toLocaleTimeString();
              dateObj = Number(dateObj.split("/").reverse().join(""));
              timeObj = timeObj.slice(0, 5).replace(/:/, "");
              todo_time = todo_time.replace(":", '');
              todo_date = Number(todo_date);
              if ((todo_date === dateObj && todo_time === timeObj) || (todo_date === dateObj)) {
                callback(__todo__[miniObj]);
              }
            }
          }
        } catch ($__8) {
          $__6 = true;
          $__7 = $__8;
        } finally {
          try {
            if (!$__5 && $__2.return != null) {
              $__2.return();
            }
          } finally {
            if ($__6) {
              throw $__7;
            }
          }
        }
      }
    }
  };
  GetNotified.isGranted();
  return {};
});
$traceurRuntime.getModule("../traceur/bible_notification.es6" + '');
