class Settings {
    constructor() {

        let bibleSettings = document.querySelector('.bible-list');

        let _strage = localStorage.getItem("bible_settings");


        if ( ! _strage ) {
            console.log('no');
            localStorage.setItem("bible_settings", JSON.stringify({}));
            _strage = localStorage.getItem("bible_settings");
        }

        this.bibleSettings = _ => bibleSettings;
        console.log(_strage);
        this.Storage = JSON.parse(_strage);

        this.clicks();
    }

    static initSettings() {
        return new Settings();
    }
    clicks() {
        this.bibleSettings().addEventListener('click', e => {
            let target = e.target,
                pNode = target.parentNode,
                targetClass = target.getAttribute('class');

            if ( pNode.nodeName.toLowerCase() === "li" && /^(on)$|^(off)$/.test(targetClass) ) {
                let _attribute = pNode.getAttribute('data-type'),
                    value = Settings.removeCurrent(target,pNode);

                if ( value ) {
                    Settings.Save(_attribute,value,this);
                }
            }
        });
    }
    static Save(key,value,_this) {
        _this.Storage[key] = value;
        localStorage.setItem("bible_settings", JSON.stringify(_this.Storage));
    }
    static setCurrent(target) {
        if ( ! target.hasAttribute("data-current") ) {
            target.setAttribute("data-current","current");
            return target.getAttribute("class");
        }

        return undefined;
    }
    static removeCurrent(target,pNode) {
        let toNotRemove = Settings.setCurrent(target);

        if ( ! toNotRemove ) return false;

        if ( toNotRemove === "on" ) {
            pNode.querySelector('.off').removeAttribute("data-current");
            return "on";
        }

        pNode.querySelector('.on').removeAttribute("data-current");
        return "off";

    }

}

Settings.initSettings();
