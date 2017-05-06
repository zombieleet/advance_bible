class Todo {
    constructor() {}

    triggerAdd() {

        let todoAddParent = document.querySelector('.todo-add-parent');
        let cover = document.querySelector('.bible-head-cover');

        todoAddParent.setAttribute('style', 'visibility: visible;');

        let todoClose = todoAddParent.querySelector('.todo-bible-close');
        let todoAddTodo = todoAddParent.querySelector('.todo-add-button');

        todoClose.addEventListener('click', e => {
            let target = e.target;
            let d = document.querySelector(`.${target.getAttribute('data-remove')}`);
            d.removeAttribute('style');

        });

        todoAddTodo.addEventListener('click', e => {
            let date = todoAddParent.querySelector('input[type="date"]');
            let time = todoAddParent.querySelector('input[type="time"]');
            let todo = todoAddParent.querySelector('textarea');
            this.addTodo(date,time,todo,todoAddParent);
        });

    }
    static  SetStatusMessage(msg) {
        if ((typeof msg) !== 'string') {
            throw Error(`expected a string as an argument but got ${(typeof msg)}`);
        }

        let bibleRep = document.querySelector(".bible-report");

        bibleRep.innerHTML = msg;

        bibleRep.setAttribute('style', 'visibility: visible');

        setTimeout(() => {
            bibleRep.removeAttribute('style');
        }, 3000);
    }

    addTodo(date,time,todo,parent) {
        let savedate = date.value.replace(/-/g,'');
        let savetime = time.value.replace(/-/g,'');
        let savetodo = todo.value;

        {
            if ( (String(savedate).length === 0) ) {
                Todo.SetStatusMessage("Please use a proper date");
                return ;
            } else if ( String(savetime).length === 0 ) {
                Todo.SetStatusMessage("Please use a proper time");
                return ;
            } else if ( savetodo.length < 30 ) {
                Todo.SetStatusMessage("Your Todo Message should be greater than 30 characters");
                return ;
            }
        }


        let getPrevItem = JSON.parse(localStorage.getItem('___TODO___'));
        let isTrueFalse = (getPrevItem) ? true : false;
        let todoInfo = Object.create({});


        let obj = {
            [savetodo.substring(0,30)]: {
                todo_date: savedate,
                todo_content: savetodo,
                todo_time: savetime,
                disabled: true
            }
        }

        if (!isTrueFalse) {

            Object.assign(todoInfo, obj)
            localStorage.setItem('___TODO___',
                JSON.stringify(todoInfo));
            Todo.SetStatusMessage('todo has been succefully saved');
            parent.removeAttribute('style');
            return;

        }

        Object.assign(todoInfo, getPrevItem, obj)
        localStorage.setItem('___TODO___',
            JSON.stringify(todoInfo));
        Todo.SetStatusMessage('todo has been succefully saved');
        parent.removeAttribute('style');

    }
    viewTodo() {

        let todo_Obj,
            todoViewParent = document.querySelector(".view-todo"),
            todoView = document.querySelector(".todo-list");

        if ( (todo_Obj = localStorage.getItem('___TODO___') )) {

            todo_Obj = JSON.parse(todo_Obj);
            todoViewParent.setAttribute('style', 'visibility: visible;');
            for ( let _j of Object.keys(todo_Obj) ) {
                let { todo_date, todo_time, todo_content } = todo_Obj[_j];

                let listElement = document.createElement('li'),
                    dateElement = document.createElement('p'),
                    timeElement = document.createElement('p'),
                    contentElement = document.createElement('p'),
                    deleteTodo = document.createElement('span'),
                    markCompleted = document.createElement('span'),
                    bell = document.createElement('span');

                dateElement.innerHTML = todo_date,
                timeElement.innerHTML = todo_time,
                contentElement.innerHTML = todo_content,
                deleteTodo.innerHTML = "Delete";

                listElement.setAttribute('class', 'todo-view-item');
                dateElement.setAttribute('class', 'todo-date');
                deleteTodo.setAttribute('class', 'fa todo-delete-todo pull-right');
                timeElement.setAttribute('class', 'todo-time');
                contentElement.setAttribute('class', '_todo-content');
                markCompleted.setAttribute('class', 'fa fa-check-circle pull-right todo-check')
                bel.setAttribute('class', 'fa fa-bell-slash todo-bell');

                listElement.appendChild(dateElement);
                listElement.appendChild(bell);
                listElement.appendChild(timeElement);
                listElement.appendChild(contentElement)
                listElement.appendChild(deleteTodo);
                listElement.appendChild(markCompleted);
                todoView.appendChild(listElement);

                markCompleted.addEventListener('click', e => {
                    let target = e.target;
                    let parent = target.parentNode;

                    if ( parent.getAttribute('data-completed') === 'completed' ) {
                        return false;
                    }
                    parent.setAttribute('data-completed', 'completed')
                })
            }
        } else {
            Todo.SetStatusMessage("No Todo has been added yet");
            return ;
        }

       todoViewParent.addEventListener('click', (e) => {
            let target = e.target;
            if ( target.getAttribute('class').includes('bible-close') ) {
                todoViewParent.removeAttribute('style');
                Array.from(todoView.children, (el) => {
                    el.remove();
                });
            } else if ( target.getAttribute('class').includes('todo-delete-todo') ) {
                this.removeTodo(target)
            } else if ( target.getAttribute('class').includes('todo-bell') ) {
              let value = this.notificationState(target);
              let strage = JSON.parse(localStorage.getItem('___TODO___'));
              let todo = target.parentNode.querySelector('textarea');
              let key = todo.value.substring(0,30);
              Object.assign(strage[key], {
                disabled: value
              });
              localStorage.setItem("___TODO___", JSON.parse(strage))
            }
        });
    }
    notificationState(target) {
      const state = target.getAttribute("class");

      if ( state.includes("fa-bell-slash") ) {
        target.classList.remove("fa-bell-slash");
        target.classList.add("fa-bell");
        return false;
      }

      target.classList.remove("fa-bell");
      target.classList.add("fa-bell-slash");
      return true;
    }
    removeTodo(target) {
        let pNode = target.parentNode;
        let contEl = pNode.querySelector('._todo-content');
        let todoRenderedList = pNode.parentNode;

        let __todo__ = JSON.parse(localStorage.getItem("___TODO___"));
        for ( let miniObj of Object.keys(__todo__)) {
            let { todo_date, todo_time , todo_content } = __todo__[miniObj];
            todo_content = todo_content.substring(0,30);
            if ( todo_content === contEl.innerHTML.substring(0,30) ) {
                delete __todo__[miniObj];
                localStorage.removeItem("___TODO___");
                localStorage.setItem("___TODO___", JSON.stringify(__todo__));
                pNode.remove();

                if ( todoRenderedList.children.length === 0 ) {
                    todoRenderedList.parentNode.parentNode.removeAttribute('style');
                }
                break ;
            }

        }

        if ( Object.keys(__todo__).length === 0 ) {
            localStorage.removeItem("___TODO___");
            return ;
        }


    }
}

module.exports = Todo;
