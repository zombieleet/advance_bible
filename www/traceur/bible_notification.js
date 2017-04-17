const GetNotified = {
	setStatusMessage: function (msg) {
	      if ((typeof msg) !== 'string') {
	          throw Error(`expected a string as an argument but got ${(typeof msg)}`);
	      }

	      let bibleRep = document.querySelector(".bible-report");

	      bibleRep.innerHTML = msg;

	      bibleRep.setAttribute('style', 'visibility: visible');

	      setTimeout(() => {
	          bibleRep.removeAttribute('style');
	      }, 3000);
	},
	isAvailable: function() {
			if ( "Notification" in window ) {
				return true;
			} else {
				this.setStatusMessage("Update Your Browser to enjoy this feature");
				return false;
			}
	},
	isGranted: function() {
			if ( this.isAvailable() && Notification.permission === 'granted' ) {

				this.getTodo(( { todo_content , todo_date } = obj) => {

					navigator.vibrate([100,50,20,10]);

					// there is vibrate property for __n 
					// but i decided to use navigator
					const __n = new Notification('Todo Notification', {
						body: "content: " + todo_content + "\nDate: " + todo_date,
						icon: './img/old_bible.jpg'
					})

					setTimeout( () => {
						__n.close();
					}, 4000);

					__n.addEventListener('click', e => {
						let moveToTodo = document.querySelector('.bible-view-todo'),
							todoList = moveToTodo.querySelector('.todo-list'),
							target = e.target;

						moveToTodo.click();

						Array.from(todoList.children, (el) => {
							let content = el.innerHTML;
							let data = target.data.replace(/\n/g,'');
							el.setAttribute('style', 'border: 12px solid red;');
							if ( content === data ) {
								
							}
						});
						__n.close();
					});

				})
			} else {
				// implement worker thread here
				console.log('asdfadsf');
			}
	},
	getTodo: function(callback) {

			if ( localStorage.getItem("___TODO___")) {

                let __todo__ = JSON.parse(localStorage.getItem("___TODO___"));

				for ( let miniObj of Object.keys(__todo__)) {

		            let { todo_date, todo_time } = __todo__[miniObj];

		            let dateObj = new Date().toLocaleDateString();
		            let timeObj = new Date().toLocaleTimeString();

		            dateObj = Number(dateObj.split("/").reverse().join(""));
		            timeObj = timeObj.slice(0,5).replace(/:/,"");

		            todo_time = todo_time.replace(":",'');
		            todo_date = Number(todo_date);
		            
		            if ( ( todo_date === dateObj && todo_time === timeObj ) || ( todo_date === dateObj) ) {
		                callback(__todo__[miniObj]);
		            } 
		        }
            }
	}
};
GetNotified.isGranted();