const { GetJson,
        objectEntries,
        Modal } = require("./loadRequested.js");

const { GetBible } = require("./bible.js");

const { _bookMark: BookMark } = require("./bookmark.js");
const { AddNote } = require("./notes.js");
const Todo = new (require('./todo.js'))();
// const Settings = 

class Home {

    constructor() {

        let bibleHomeNav = document.querySelector(".bible-choice-item");

        bibleHomeNav.addEventListener('click', e => {

            const target = e.target;

            let value;

            if ( ! target.hasAttribute('data-exec') && target.parentNode.nodeName.toLowerCase() === "li" ) {
                value = target.parentNode.getAttribute("data-exec");
            }
            
            value = value ? value : target.getAttribute('data-exec') ;
            
            try {
                Home[value](target);
            } catch(ex) {};

        });

    }
    static RemoveDisplay(classValue) {
        let bbHomeScreen = document.querySelector(".bible-home-screen ");

        Array.from(bbHomeScreen.children, el => {
            if ( ! el.hasAttribute("data-display") ) {
                let pEl = document.querySelector(".bible-nav");
                
                el.setAttribute("data-display", "none");
                pEl.querySelector(`[data-target=${el.getAttribute    }]`);
                bbHomeScreen.querySelector(classValue).removeAttribute("data-display");

            }
        });
    }
    static Settings() {
        Home.RemoveDisplay(".bible-settings");
    }
    static Note() {
        let noteAdd = new AddNote();
        noteAdd.showNote({
            page_title: 'Add Note'
        });
    }
    static TodoAdd() {
        Todo.triggerAdd();
    }
    static TodoView() {
        Todo.viewTodo();
    }
    static BibleChapters() {
        let bible = new GetBible();
        let bibleChapters = bible.getBible();
        return bibleChapters;
    }
    static BookMark(element) {
        BookMark.Fire(element);
        Home.RemoveDisplay(".bible-bookmark");
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
