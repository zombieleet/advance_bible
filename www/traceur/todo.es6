class Todo {
    constructor() {
        let todoParent = document.querySelector('.bible-todo-parent');

        todoParent.addEventListener('click', e => {
            let target = e.target;

            switch(target.className) {
                case "bible-add-todo":

                    let todoAddParent = document.querySelector('.todo-add-parent');
                    let cover = document.querySelector('.bible-head-cover');
                    // cover.removeAttribute('data-display');
                    todoAddParent.setAttribute('style', 'visibility: visible;')

                    let todoClose = todoAddParent.querySelector('.todo-bible-close');
                    let todoAddTodo = todoAddParent.querySelector('.todo-add-button');

                    todoClose.addEventListener('click', e => {
                        let target = e.target;
                        let d = document.querySelector(`.${target.getAttribute('data-remove')}`);
                        d.removeAttribute('style');
                        // cover.setAttribute('data-display', 'none');
                    });

                    todoAddTodo.addEventListener('click', e => {
                        let date = todoAddParent.querySelector('input[type="date"]');
                        let time = todoAddParent.querySelector('input[type="time"]');
                        let todo = todoAddParent.querySelector('textarea');
                        this.addTodo(date,time,todo,todoAddParent);
                    });

                    break;
                case "bible-view-todo":
                    break;
                default:
            }
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
                todo_time: savetime
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
    removeTodo() {

    }
}

let td = new Todo();