class initSettings {
  constructor() {
    window.addEventListener("DOMContentLoaded", _ => {
      let storage = localStorage.getItem("bible_settings");
      if ( storage ) {
        storage = JSON.parse(storage);
        for ( var data_type in storage) {
          if ( storage.hasOwnProperty(data_type) ) {
            const pNode = document.querySelector(`[data-type=${data_type}]`);
            const child = pNode.querySelector(`.${storage[data_type]}`);
            if ( ! child.hasAttribute("data-current") ) {
                if ( data_type === "on" ) {
                  pNode.querySelector(".off").removeAttribute("data-current");
                } else {
                  pNode.querySelector(".on").removeAttribute("data-current");
                }
                child.setAttribute("data-current", "current");
            }

          }
        }
      }
    });
  }
}
new initSettings();
