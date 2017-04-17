class Settings {
  constructor() {
    let settingsOnOf = document.querySelector('.bible-settings');
    this.settingsOnOf = () => settingsOnOf;
  }
  static NotificationCallback(storageCan,target) {
    Notification.requestPermission( permission => {
        Notification.requestPermission( permission => {
          if ( permission === 'granted' ) {
            var _notify = new Notification("You will be notified if your todo date arrives");
            return true;
          } else if ( permission === 'denied' ) {
              return false;
          }
          return false;
        })
    })
  }
  static StyleTogglElement(target,elChild) {
          target.setAttribute('data-color', "black");
          target.setAttribute("data-current", "yes");
          elChild.setAttribute('data-change-state', 'settings-state')
          target.style["background-color"] = target.getAttribute('data-color');
  }
  static SetElementState(target, storageCan) {
          let elChild = target.children[0];
          if ( target.getAttribute('data-color')  === "darkgrey" ) {

            if ( storageCan === "notification-state" )  {
                if ( "Notification" in window ) {

                    if ( Settings.NotificationCallback(storageCan) ) { 

                      Settings.StyleTogglElement(target,elChild);

                    } else {
                      Settings.SetStatusMessage("Notification can only be enabled if you delete the storage from your browser");
                      return ;
                    }

                }  else {
                  Settings.SetStatusMessage("Update Your Browser To Enable Notification");
                  return ;
                }
            } else {
                  Settings.StyleTogglElement(target,elChild);
            }
            localStorage.setItem(storageCan, target.getAttribute('data-current'))
            return ;
          }
          target.setAttribute('data-color',"darkgrey");
          target.setAttribute('data-current', "no") 
          elChild.removeAttribute('data-change-state');
          target.style["background-color"] = target.getAttribute('data-color');
          localStorage.setItem(storageCan, target.getAttribute('data-current'));
  }
  setSliding() {
    this.settingsOnOf().addEventListener('click', (e) => {
      let target = e.target;
      if ( target.getAttribute('class').includes("bible-on-of-Parent") ) {
        Settings.SetElementState(target, "sound-state");
        return ;
      } else if ( target.getAttribute('class').includes("bible-notification-Parent") ) {
        Settings.SetElementState(target, "notification-state");
        return ;
      }
    })
    return this;
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
  setValues() {
    this.settingsOnOf().addEventListener('click', (e) => {
      let target = e.target;
      if ( target.getAttribute('class').includes("setval") ) {
        let parent = target.parentNode
        let elShowValue = parent.previousElementSibling.previousElementSibling;
        elShowValue.setAttribute('data-current', target.textContent);
        elShowValue.textContent = target.textContent;
        let role = parent.getAttribute('role')

        switch (role) {
          case null:
            break ;
          case "fontFamily":
            localStorage.setItem('font-family', elShowValue.getAttribute('data-current'));
            break;
          case "fontSize":
            localStorage.setItem('font-size', elShowValue.getAttribute('data-current'));
            break;
          case "volumeLevel":
            localStorage.setItem('sound-level', elShowValue.getAttribute('data-current'));
            break ;
          case "textColor":
            localStorage.setItem('text-color', elShowValue.getAttribute('data-current'));
            break ;
          case "backgroundColor":
            localStorage.setItem('background-color', elShowValue.getAttribute('data-current'));
          break ;
          default:

        }
      }
    })
    return this;
  }
}
let settings = new Settings();
settings.setSliding().setValues();