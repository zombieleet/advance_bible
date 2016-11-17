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
          target.setAttribute('data-color', "darkblue");
          target.setAttribute("data-current", "yes");
          target.setAttribute('data-animate', "paddingAnimateIncrease")
          target.style["background-color"] = target.getAttribute('data-color');
          return ;
        }
        target.setAttribute('data-color',"darkgrey");
        target.setAttribute('data-current', "no");
        target.setAttribute('data-animate', "paddingAnimateDecrease")
        target.style["background-color"] = target.getAttribute('data-color');
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
