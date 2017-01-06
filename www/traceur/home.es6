import {GetJson, objectEntries, Modal} from "loadRequested.js"
/*import {objectEntries as objectEntries } from "loadRequested.js";
import {Modal as Modal} from "loadRequested.js";*/
import {GetBible} from "bible.js";
class Home {
  constructor() {
    let oldTestament = document.querySelector('.bible-oldtestament');
    let newTestament = document.querySelector('.bible-newtestament');
    this.oldTestament = () => oldTestament;
    this.newTestament = () => newTestament;
  }
  static BibleChapters() {
    let bible = new GetBible();
    let bibleChapters = bible.getBible();
    return bibleChapters;
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
  loadBibleLocation() {
    this.oldTestament().addEventListener('click', (e) => {
      let getOldTestament = new GetJson("js/jsons/oldtestament.json");
      getOldTestament.loadJson().then((ot) => {
        Home.PlaceLocationInDom(ot, "ot")
        Home.BibleChapters();
        Modal.extended();
      })
    });
    this.newTestament().addEventListener('click', (e) => {
      let getNewTestaMent = new GetJson("js/jsons/newtestament.json");
      getNewTestaMent.loadJson().then((nt) => {
        Home.PlaceLocationInDom(nt, "nt");
        Home.BibleChapters();
        Modal.extended();
      })
    });
  }
}
let getTestaMents = new Home();
getTestaMents.loadBibleLocation();
