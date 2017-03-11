this.addEventListener('message', m => {
    let __todo__ = JSON.parse(m.data);
    while ( true ) {
        for ( let miniObj of Object.keys(__todo__)) {

            let { todo_date, todo_time } = __todo__[miniObj];
            let dateObj = new Date().toLocaleDateString();
            let timeObj = new Date().toLocaleTimeString();

            dateObj = Number(dateObj.split("/").reverse().join(""));
            timeObj = timeObj.slice(0,5).replace(/:/,"");

            todo_time = todo_time.replace(":",'');
            todo_date = Number(todo_date)
            

            if ( ( todo_date === dateObj && todo_time === timeObj ) || ( todo_date === dateObj) ) {
                console.log('hello')
                this.postMessage(JSON.stringify(__todo__[miniObj]));
                return ;
            }

        }
    }
})