const _settings = require('./settings.js');

const notification = {
  isExists() {
    return "Notification" in window;
  },
  handleNotify() {
    
    if ( ! this.isExists() ) return false;
    console.log(true);
    _settings.on("Notification", value => {

      if ( value === "on" && Notification.permission !== "granted" ) {
          this.askPermission();
          return ;
      }

    });
  },
  askPermission() {
    Notification.requestPermission(perm => {
      if ( perm === "granted") {
          this.sendNotification();
      } else if ( perm === "denied" ) {
        return perm;
      } else {
        return false;
      }
    })
  },
  sendNotification(message = "You will Be sent notification when neccessary") {
    let _n = new Notification(message,{
      icon: './img/old_bible.jpg'
    });
    navigator.vibrate([100,80,60,40,20,0]);

    _n.addEventListener('click', _ => {
      _n.close();
    });

    setTimeout( _ => {
      _n.close();
    },5000);
  }
};

module.exports = notification;
