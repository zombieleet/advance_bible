import {GetJson , objectEntries, Modal } from "loadRequested.js"
import {GetBible as GetBible } from "bible.js";;

class IconBar {
  constructor() {
    let iconBar = document.querySelector('.fa-bars');
    let noDisplay = document.querySelector('.bible-cover');
    let bibleNavItemParent = document.querySelector('.bible-nav');
    let homeScreen = document.querySelector('.bible-home-screen');

    noDisplay.addEventListener('click', ( e ) => {

        let target = e.target;
        let rmModal = document.querySelector("[data-remove-modal='remove']");
        
        target.setAttribute('data-display', 'none');

        homeScreen.removeAttribute('data-reduce-size');

        this.bibleNavItemParent().removeAttribute('data-open-bar');
        this.bibleNavItemParent().setAttribute('data-close-bar', 'closebar');     
        
        Array.from(document.querySelectorAll("[data-remove-modal='remove']"), tt => {
            console.log(tt);
        });
        
    }); 

    this.iconBar = () => iconBar;
    this.noDisplay = () => noDisplay;

    this.homeScreen = () => homeScreen;
    this.bibleNavItemParent = () => bibleNavItemParent;

  }

  openIconBar() {

    this.iconBar().addEventListener('click', (e) => {

      let target = e.target;
      let bibleNavItemParent = document.querySelector('.bible-nav');
      let homeScreen = document.querySelector('.bible-home-screen');

      if ( ! bibleNavItemParent.hasAttribute('data-open-bar') ) {

          this.noDisplay().removeAttribute('data-display');
          this.homeScreen().setAttribute('data-reduce-size','reducesize');

          bibleNavItemParent.setAttribute('data-open-bar', 'openbar')

          bibleNavItemParent.removeAttribute('data-close-bar');

          return ;

      }

      this.noDisplay().setAttribute('data-display', 'none');

      this.homeScreen().removeAttribute('data-reduce-size');

      this.bibleNavItemParent().removeAttribute('data-open-bar');
      this.bibleNavItemParent().setAttribute('data-close-bar', 'closebar');

    });
  }
}

let icBar = new IconBar();
icBar.openIconBar();

class NavNavigation {
  constructor() {
    let bibleNavItemParent = document.querySelector('.bible-nav-list');
    this.bibleNavItemParent = () => bibleNavItemParent;
  }
  static BibleChapters() {
    let bible = new GetBible();
    let bibleChapters = bible.getBible();
    return bibleChapters;
  }
  static PlaceLocationInDom(testament, bibleType) {
    let bibleChoice = document.querySelector(bibleType);
    let homeScreen = document.querySelector('.bible-home-screen');
    let testaMentParent = document.createElement('div');
    testaMentParent.setAttribute('class', 'bible-testament');
    if ( bibleChoice ) {
      bibleChoice.setAttribute('data-display', 'none');
      let removeTestamentParent = homeScreen.getElementsByClassName('bible-testament')[0];
      if ( removeTestamentParent !== undefined ) {
        removeTestamentParent.remove();
      }
      homeScreen.appendChild(testaMentParent)
      for ( let [otKey, otValue] of objectEntries(testament) ) {
        let location = document.createElement('p');;
        location.setAttribute('class', 'bible-location');
        location.innerHTML = `${otValue}`;
        testaMentParent.appendChild(location);
      }

    }
  }
  navigate() {
    this.bibleNavItemParent().addEventListener('click', (e) => {
      let target = e.target;
      let homeScreen = document.querySelector(".bible-home-screen");
      let targetElement = target.classList.toString().includes("bible-nav-item") || target.parentNode.classList.toString().includes("bible-nav-item");

      if ( targetElement ) {

        let targetEl = target.parentNode.nodeName.toLowerCase() === "li" ? target.parentNode : target;
        let showElement = targetEl.getAttribute('data-target')
        let homeScreenChild = homeScreen.getElementsByClassName(showElement)[0];

        if ( ! homeScreenChild ) return;

        if ( homeScreenChild.hasAttribute('data-display') ) {
            Array.from(homeScreen.children, (children) => {
                if ( ! children.hasAttribute('data-display') && ! HTMLImageElement[Symbol.hasInstance](children) ) {
                  children.setAttribute('data-display', 'none');
                }

            })
            homeScreenChild.removeAttribute('data-display');
            if ( homeScreenChild.getAttribute('class') === "bible-ot" ) {
                let getOldTestament = new GetJson("js/jsons/oldtestament.json");
                getOldTestament.loadJson().then((ot) => {
                  NavNavigation.PlaceLocationInDom(ot,".bible-ot");
                  NavNavigation.BibleChapters()
                  Modal.extended();
                });
            } else if( homeScreenChild.getAttribute('class') === "bible-newt" ) {
              let getNewTestament = new GetJson("js/jsons/newtestament.json");
              getNewTestament.loadJson().then((nt) => {
                NavNavigation.PlaceLocationInDom(nt,".bible-newt");
                NavNavigation.BibleChapters()
                Modal.extended();
              })
            }
        }
      }
    })
  }
}
// var navigation = new Nav();
// navigation.minMax()

var navigationNavigate = new NavNavigation()
navigationNavigate.navigate();


class ToggleConcord {
  constructor() {
    let concordNav = document.querySelector('.concord-nav');

    this.concordNav = () => concordNav; 
  }
  toggleConcord() {
    this.concordNav().addEventListener('click', (e) => {
      let target = e.target;
      let bibleNavConcord = document.querySelector('.bible-nav-concord');

      if ( ! target.classList.toString().includes("bible-nav-item") ) {
            if ( bibleNavConcord.hasAttribute('style') ) {
                bibleNavConcord.removeAttribute('style');
                return ;
            }      
            bibleNavConcord.setAttribute('style', 'display: block')
            return ;
      }
    })
  }
}

var toggleC = new ToggleConcord();

toggleC.toggleConcord();

class SetActive {
  constructor() {
    let bibleNavList = document.querySelector('.bible-nav-list');
    this.bibleNavList = () => bibleNavList
  }
  active() {
    this.bibleNavList().addEventListener('click', (e) => {
      let target = e.target;
      let nodeName = e.target.nodeName.toLowerCase();
      // console.log(nodeName)
      // if ( (nodeName === 'li') || (nodeName === 'span') ) {
      target = ( nodeName === 'li' ) ? target : target.parentNode;
      if ( target.parentNode.className.includes("bible-nav-concord") ) {
          target.parentNode.parentNode.setAttribute('data-override', 'true');
          return ;
      }
      Array.from(this.bibleNavList().children, (element) => {
        if ( element.hasAttribute('data-active-click') ) {
            element.removeAttribute('data-active-click');
            if ( element.hasAttribute('data-override') ) element.removeAttribute('data-override');
        }
        target.setAttribute('data-active-click', 'true');
      });
    })
  }
}
var ss = new SetActive();

ss.active();
