const { GetJson,
	objectEntries,
	Modal } = require("./loadRequested.js");

const { GetBible } = require("./bible.js");

class Home {

  constructor() {

    let bibleHomeNav = document.querySelector(".bible-choice-item");

    bibleHomeNav.addEventListener('click', e => {

        const target = e.target;

        if ( ! target.hasAttribute('data-exec') ) return ;

        const value = target.getAttribute('data-exec');
        Home[value](target);

    });

  }
  static BibleChapters() {
    let bible = new GetBible();
    let bibleChapters = bible.getBible();
    return bibleChapters;
  }
  static BookMark(element) {
      BookMark.Fire(element);
  }
  static oldTestament(element) {
    element.addEventListener('click', (e) => {
      Home.LoadJSON({
        src: "js/jsons/oldtestament.json",
        type: "ot",
      });
    });    
  }
  static newTestament(element) {
    element.addEventListener('click', (e) => {
      Home.LoadJSON({
        src: "js/jsons/newtestament.json",
        type: "nt",
      });
    });
  }
  static LoadJSON({src,type}) {
    let getNewTestaMent = new GetJson(src);
    getNewTestaMent.loadJson().then(result => {
      Home.PlaceLocationInDom(result, type);
      Home.BibleChapters();
      Array.from(document.querySelectorAll(".bible-location"), el => {
          Modal.extended(el);
      })
    })
  }
  static PlaceLocationInDom(testament, part) {
    let bibleChoice = document.querySelector('.bible-choice');
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
}

let getTestaMents = new Home();
