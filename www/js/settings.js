class Settings {
  constructor() {
    let settingsOnOf = document.querySelector('.bible-settings');
    this.settingsOnOf = () => settingsOnOf;
  }
  setSliding() {
    this.settingsOnOf().addEventListener('click', (e) => {
      let target = e.target;
      if ( target.getAttribute('class').includes("bible-on-of-Parent") ) {
        let elChild = target.children[0];
        if ( target.getAttribute('data-color')  === "darkgrey" ) {

          target.setAttribute('data-color', "black");
          target.setAttribute("data-current", "yes");
          
          elChild.setAttribute('data-change-state', 'settings-state')

          target.style["background-color"] = target.getAttribute('data-color');
          localStorage.setItem("sound-state", target.getAttribute('data-current'))
          return ;

        }
        target.setAttribute('data-color',"darkgrey");
        target.setAttribute('data-current', "no");
        elChild.removeAttribute('data-change-state');
        target.style["background-color"] = target.getAttribute('data-color');
        localStorage.setItem("sound-state", target.getAttribute('data-current'))
        return ;
      }
    })
    return this;
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
        console.log(role);
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
