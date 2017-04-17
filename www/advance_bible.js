(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
class Audio {
  // constructor() {
  //   let audio = document.createElement('audio');
  //   this.audio = () => audio;
  // }
  static SetAudio(link = undefined, audio) {
      if ( link === undefined ) {
        throw new Error("Link is Undefined");
      }

      if ( HTMLAudioElement[Symbol.hasInstance](audio) ) {
          let parent = document.querySelector('.bible-read-text');
          audio.setAttribute('src', link)
          parent.appendChild(audio);
          Audio.CreateControls(parent, audio)
      }

  }
  static CreateControls(parent, audio) {
    let playbtn = document.createElement('button');
    playbtn.setAttribute('class', 'btn btn-success btn-xs  glyphicon glyphicon-play');

    let pausebtn = document.createElement('button');
    pausebtn.setAttribute('class', 'btn btn-success btn-xs  glyphicon glyphicon-pause');

    let stopbtn = document.createElement('button');
    stopbtn.setAttribute('class', 'btn btn-success btn-xs glyphicon glyphicon-stop');

    let bar = document.createElement('progress');

    bar.setAttribute('value', audio.currentTime)
    bar.setAttribute('max', 300)
    parent.appendChild(playbtn)
    parent.appendChild(pausebtn)
    parent.appendChild(stopbtn)
    parent.appendChild(bar);
    Audio.ControlsListener(audio, { playbtn, pausebtn, stopbtn, bar})
  }
  static IncrementAudioBar(bar,audio) {
    bar.setAttribute('value',audio.currentTime)
  }
  static ControlsListener(audio, btnlisteners) {
    let {playbtn, pausebtn, stopbtn, bar} = btnlisteners;

    playbtn.addEventListener('click', (evt) => {
      let target = evt.target;
      if ( target.disabled ) {
        return false;
      }
      if ( ! audio.ended ) {
        audio.play()
        audio.addEventListener('timeupdate', (evt) => {
          let target = evt.target;
          Audio.IncrementAudioBar(bar,target);
        })
        target.setAttribute('class', playbtn.getAttribute('class') + " disabled")
        pausebtn.setAttribute('class', pausebtn.getAttribute('class').replace('disabled',''))
        return ;
      }
      GetBible.StyleBible(book,` ${Number(chapter["chapter"]) + 1} `);
    });

    pausebtn.addEventListener('click', (evt) => {
      let target = evt.target
      if ( ! audio.ended ) {
        audio.pause();
        target.setAttribute('class', pausebtn.getAttribute('class') + " disabled")
        playbtn.setAttribute('class', playbtn.getAttribute('class').replace('disabled',''));
      }
    })

    stopbtn.addEventListener('click', (evt) => {
      let target = evt.target;
      if ( ! audio.ended ) {
        audio.currentTime = 0;
        audio.pause()
        playbtn.setAttribute('class', playbtn.getAttribute('class').replace('disabled',''));
        pausebtn.setAttribute('class', pausebtn.getAttribute('class').replace('disabled',''))
      }
    })

  }
}
//export { Audio }

},{}],2:[function(require,module,exports){
//import {JumpToChapter, objectEntries, GetJson, Modal} from "./loadRequested.js";

const { JumpToChapter, 
        objectEntries, 
        GetJson, 
        Modal } = require("./loadRequested.js");

class Audio {

  // constructor() {
  //   let audio = document.createElement('audio');
  //   this.audio = () => audio;
  // }
  
  static SetAudio(link = undefined, audio, info) {
      if ( link === undefined ) {
        throw new Error("Link is Undefined");
      }

      if ( HTMLAudioElement[Symbol.hasInstance](audio) ) {
					let { book, chapter} = info;
          let parent = document.querySelector('.bible-read-text');
          audio.setAttribute('src', link)
          // parent.appendChild(audio);
          Audio.CreateControls(parent, audio, book,chapter)
      }

  }
  static CreateControls(parent, audio, book, chapter) {
		let divbtn = document.createElement('div');
    let ctrlBtn = document.createElement('div');
    let playbtn = document.createElement('button');

    playbtn.setAttribute('class', 'btn btn-success btn-xs  glyphicon glyphicon-play');

    let pausebtn = document.createElement('button');
    pausebtn.setAttribute('class', 'btn btn-success btn-xs  glyphicon glyphicon-pause');

    let stopbtn = document.createElement('button');
    stopbtn.setAttribute('class', 'btn btn-success btn-xs glyphicon glyphicon-stop');

    let bar = document.createElement('progress');
    bar.setAttribute('class', 'progress progress-bar-success')
    bar.setAttribute('value', audio.currentTime)
    bar.setAttribute('max', 300)

	divbtn.setAttribute('class', 'bible-audio-ctrlers pull-right');

    ctrlBtn.setAttribute('class', 'audioctrlers')

    ctrlBtn.appendChild(playbtn);
    ctrlBtn.appendChild(pausebtn);
    ctrlBtn.appendChild(stopbtn)


    // divbtn.appendChild(bar);
    divbtn.appendChild(ctrlBtn);
    divbtn.appendChild(audio);
		// parent.insertBefore(divbtn, parent.firstElementChild);
	document.querySelector('.bible-read-text').appendChild(divbtn);
	let ctrlers = document.querySelectorAll('.bible-audio-ctrlers');

	if ( ctrlers.length > 1 ) {
		ctrlers[ctrlers.length - 1].remove();
	}

    Audio.ControlsListener(audio, { playbtn, pausebtn, stopbtn, bar}, book, chapter)
  }
  static IncrementAudioBar(bar,audio) {
    bar.setAttribute('value',audio.currentTime)
  }
  static ControlsListener(audio, btnlisteners, book, chapter) {
    let {playbtn, pausebtn, stopbtn, bar} = btnlisteners;

    playbtn.addEventListener('click', (evt) => {
      let target = evt.target;
      if ( target.disabled ) {
        return false;
      }
      if ( ! audio.ended ) {
        audio.play()
        audio.addEventListener('timeupdate', (evt) => {
          let target = evt.target;
					if ( audio.ended ) {
            chapter["chapter"] = (Number(chapter["chapter"]) + 1);
						GetBible.StyleBible(book,chapter);
						return ;
					}
          Audio.IncrementAudioBar(bar,target);
        })
        target.setAttribute('class', playbtn.getAttribute('class') + " disabled")
        pausebtn.setAttribute('class', pausebtn.getAttribute('class').replace('disabled',''))
        return ;
      }
    });

    pausebtn.addEventListener('click', (evt) => {
      let target = evt.target
      if ( ! audio.ended ) {
        audio.pause();
        target.setAttribute('class', pausebtn.getAttribute('class') + " disabled")
        playbtn.setAttribute('class', playbtn.getAttribute('class').replace('disabled',''));
      }
    })

    stopbtn.addEventListener('click', (evt) => {
      let target = evt.target;
      if ( ! audio.ended ) {
        audio.currentTime = 0;
        audio.pause()
        playbtn.setAttribute('class', playbtn.getAttribute('class').replace('disabled',''));
        pausebtn.setAttribute('class', pausebtn.getAttribute('class').replace('disabled',''))
      }
    })

  }
}
//export { Audio }
class HeaderButtons {
	static render() {

		let header = document.querySelector('.bible-read-text');
		let header_Menu = document.createElement('div');
		let genLink = HeaderButtons.createMenuLinks([
				"select chapter",
				"select version",
				"select language"
				]);

		let {done , value} = genLink.next();
		let headerul = HeaderButtons.createUnderList();

		header_Menu.setAttribute('class','bible-menu-header');
		header.appendChild(header_Menu);
		header_Menu.appendChild(HeaderButtons.createElipsis(headerul));
		header_Menu.appendChild(headerul);

		while ( ! done ) {

			let _value = value.replace(/\s+/,''),
				links = HeaderButtons[_value]();

			links.innerHTML = value;

			links.setAttribute('class', 'bible-elipsis-link');

			headerul.appendChild(links);

			({ done , value } = genLink.next());

		}

	}
	static *createMenuLinks(links) {
		for ( let _l of links ) {
			yield _l;
		}
	}
	static createUnderList() {
		let header_ul = document.createElement('ul');
		header_ul.setAttribute('class', 'bible-elipsis-parent');
		return header_ul;
	}
	static createElipsis(elp) {
		let elipsis = document.createElement('span');
		elipsis.setAttribute('class', 'fa fa-ellipsis-v bible-elipsis');
		elipsis.addEventListener('click', () => {
			if ( elp.hasAttribute('style') ) {
				elp.removeAttribute('style')
				return ;
			}
			elp.setAttribute('style','display: block;');
		});

		return elipsis;
	}
	static selectchapter() {

			let openChapter = document.createElement('li');
			Modal.extended(openChapter);

			return openChapter;
	}

	static selectversion() {
		let selectVersionDropDown = document.createElement('li');
		return selectVersionDropDown
	}
	static selectlanguage() {	
		let selectLanguageDropdown = document.createElement('li');
		return selectLanguageDropdown;
	}
}


module.exports.Getbible = class GetBible {
	constructor() {
		let bibleTestament = document.querySelector('.bible-testament');
		this.bibleTestament = () => bibleTestament;
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
	static Settings() {
			return {
				fontSize: localStorage.getItem("font-size"),
				fontStyle: localStorage.getItem("font-family"),
				audio: localStorage.getItem("sound-state"),
				volume: localStorage.getItem("sound-level"),
				textcolor: localStorage.getItem("text-color"),
				bgcolor: localStorage.getItem("background-color")				
			}		
	}
	static StyleBible(book, chapter) {


    let homeScreen = document.querySelector('.bible-home-screen');
    let bibleReadText = document.createElement('div')
    bibleReadText.setAttribute('class','bible-read-text');
    let removeBibleReadText = homeScreen.getElementsByClassName('bible-read-text')[0];
		
    if ( removeBibleReadText ) {	
    	removeBibleReadText.remove();
    }
    homeScreen.appendChild(bibleReadText);



		let parent = document.querySelector('.bible-read-text');
		let backward = document.createElement('span');
		let forward = document.createElement('span');
		let bookParent = document.createElement('div');
		let bookName = document.createElement('h3');
		let bookChapter = document.createElement('h5');

		bookParent.setAttribute('class', 'bible-book-parent');

		HeaderButtons.render();

		backward.setAttribute('class', 'fa fa-arrow-circle-o-right bible-go-right');
		forward.setAttribute('class', 'fa fa-arrow-circle-o-left bible-go-left');
		bookName.textContent = book;
		bookChapter.textContent = `Chapter ${chapter["chapter"]}`;
		bookName.setAttribute('class', 'bible-book-name')

		parent.appendChild(backward)
		parent.appendChild(forward)
		parent.appendChild(bookParent);
		bookParent.appendChild(bookName);
		bookParent.appendChild(bookChapter);

		
		let bibleSettingsValues = GetBible.Settings();
		
		parent.style["font-size"] = bibleSettingsValues.fontSize + "px";
		parent.style["font-family"] = bibleSettingsValues.fontStyle;

		parent.style["color"] = bibleSettingsValues.textcolor;
		parent.style["background-color"] = bibleSettingsValues.bgcolor;

		let setState = false;

		const BOOKMARK = JSON.parse(localStorage.getItem('___BIBLE-BOOKMARK___'));

		for ( let verses of chapter["verses"] ) {

			for ( let [versenum,versetext]  of objectEntries(verses) ) {

				let readParent = document.createElement('div');
				readParent.setAttribute('class', 'bible-verse-text');

				let verseNum = document.createElement('span');
				let verseText = document.createElement('span');
				let bookMark = document.createElement('span');

				bookMark.setAttribute('class', 'fa fa-bookmark bible-bookmark-icon bible-not-bookmarked');

				verseNum.textContent = versenum;
				verseText.textContent = versetext;
				readParent.appendChild(verseNum)
				readParent.appendChild(verseText);
				readParent.appendChild(bookMark);
				parent.appendChild(readParent);

				try { 
					if ( BOOKMARK ) GetBible.BookMark({bookMark,versenum,versetext,BOOKMARK}) 
				} catch(ex) {  };
				

				bookMark.addEventListener('click', e => {
					let target = e.target;

					if ( target.classList.contains('bible-bookmarked') ) {
						target.classList.remove('bible-bookmarked');
						target.classList.add('bible-not-bookmarked');
						GetBible.UnSaveBookMarked(target.parentNode);
						return ;
					}
					target.classList.remove('bible-not-bookmarked');
					target.classList.add('bible-bookmarked');
					GetBible.SaveBookMarked(target.parentNode);
				})

				if ( ! setState ) {
					setState = true;
					readParent.setAttribute('data-set-bg', 'true');
					continue ;
				} 
				setState = false;
				readParent.setAttribute('data-set-bg', 'false');
			}
			
		}
		
		if ( bibleSettingsValues.audio === 'yes' ) {
			let audiobook = book.replace(/\s+/,'')
			let audioBible = fetch(`audios/KJV/${audiobook}/${audiobook}${chapter["chapter"]}.mp3`);
			
			audioBible.then((data) => {
				return data.url
			}).then((src) => {
				let audio = document.createElement('audio');
				Audio.SetAudio(src, audio, {book, chapter});
			})
		}

	}
	static BookMark({bookMark,versenum,versetext,BOOKMARK}) {

		const _p = GetBible.IsBookMarked(BOOKMARK);

		let [value,location] = _p.next().value;
		
		while ( value != null ) {
			const _joinedValue = versenum + versetext.replace(/\s/g, '_');
			if ( _joinedValue === value ) {
				bookMark.classList.add('bible-bookmarked');
				bookMark.classList.remove('bible-not-bookmarked');
			}

			[value,location] = _p.next().value;
		}	
	}
	static SaveBookMarked(newbookmark) {
		
        let getPrevItem = JSON.parse(localStorage.getItem('___BIBLE-BOOKMARK___'));
        let isTrueFalse = (getPrevItem) ? true : false;
        let bookmark = {};
       
        let { textContent } = newbookmark;
        const ____ = [
	        textContent.match(/^\d+/)[0],
	        textContent.replace(/^\d+/,''),
	        newbookmark.parentElement.querySelector('h3').textContent + " " + newbookmark.parentElement.querySelector('h5')
        ];

        let [ verseNum, verseText, location ] = [...____];
        let obj = {
            [`${textContent.replace(/\s/g,'_')}`]: {
            	verseNum,
            	verseText,
            	location
            }
        }

        if (!isTrueFalse) {

            Object.assign(bookmark, obj)
            localStorage.setItem('___BIBLE-BOOKMARK___',
                JSON.stringify(bookmark));
            GetBible.SetStatusMessage('bookmark has been added');
            return;

        }
        
        Object.assign(bookmark, getPrevItem, obj);
        
        localStorage.setItem('___BIBLE-BOOKMARK___',
            JSON.stringify(bookmark));
        GetBible.SetStatusMessage('bookmark has been added');
	}
	static UnSaveBookMarked(remnewbookmark) {
		let bookmarkStorage = JSON.parse(localStorage.getItem("___BIBLE-BOOKMARK___"));
		let { textContent } = remnewbookmark;
		let name = `${textContent.replace(/\s/g,'_')}`;
		delete bookmarkStorage[name];
		localStorage.setItem("___BIBLE-BOOKMARK___", JSON.stringify(bookmarkStorage));
	}
	static *IsBookMarked(BOOKMARK) {
		// let bookmark = JSON.parse(localStorage.getItem('___BIBLE-BOOKMARK___'));
		for ( let [i,BOOKMARK] of objectEntries(BOOKMARK) ) {
			let { location } = BOOKMARK;
			yield [i,location];
		}
	}
	navigateChapters(bc,i) {
		let homeScreen = document.querySelector('.bible-home-screen');
		homeScreen.addEventListener('click', (e) => {
			let target = e.target;
			if ( target.classList.toString().includes("bible-go-right") ) {

				if ( document.querySelector('.bible-read-text') ) {
					document.querySelector('.bible-read-text').remove()
				}

				try {
					let bibleReadText = document.createElement('div')
					bibleReadText.setAttribute('class','bible-read-text')
					homeScreen.appendChild(bibleReadText);
					i = ++i
					if ( bc.chapters[i] === undefined ) {
						i = 0;
						GetBible.StyleBible(bc["book"],bc.chapters[i]);
						return ;
					}

					GetBible.StyleBible(bc["book"],bc.chapters[i]);
				} catch(ex) {}
			} else if ( target.classList.toString().includes("bible-go-left") ) {

				if ( document.querySelector('.bible-read-text') ) {
					document.querySelector('.bible-read-text').remove()
				}
				bibleReadText = document.createElement('div')
				bibleReadText.setAttribute('class','bible-read-text')
				homeScreen.appendChild(bibleReadText);
				if ( bc.chapters[+-(-i)-1] === undefined ) {
					i = 0;
					GetBible.StyleBible(bc["book"],bc.chapters[i]);
					return ;
				}
				GetBible.StyleBible(bc["book"],bc.chapters[+-(-i)-1]);
				i = --i
			}
		})																	
	}
	getBible() {
		this.bibleTestament().addEventListener('click', (e) => {
			let target = e.target;
			let homeScreen = document.querySelector('.bible-home-screen');
			if ( target.classList.toString().includes("bible-location") ) {
				let textContent = target.textContent.replace(/\s+/g, "");
				let bibleChapters = new GetJson(`js/jsons/${textContent}.json`);
				target.parentNode.remove();

				let bibleReadText = document.createElement('div')
				bibleReadText.setAttribute('class','bible-read-text');
				let removeBibleReadText = homeScreen.getElementsByClassName('bible-read-text')[0];
				// removeBibleReadText = removeBibleReadText[removeBibleReadText.length - 1];

				if ( removeBibleReadText !== undefined ) {
					removeBibleReadText.remove();
				}
				homeScreen.appendChild(bibleReadText);
				bibleChapters.loadJson().then((bc) => {
					let i = 0;				
					GetBible.StyleBible(bc["book"],bc.chapters[i]);
					this.navigateChapters(bc,i);

					var el = new JumpToChapter();					
					el.el().addEventListener('click',  (e) => {
						let target = e.target;
						let match = target.textContent.match(/\d+/g) || target.textContent.match(/CH\./);
						if ( match && (target.nodeName.toLowerCase() === "p") ) {
							if ( match[0] === "CH." ) {
								target = target.nextElementSibling;
								i = Number(target.innerHTML) - 1;
								GetBible.StyleBible(bc["book"],bc.chapters[i]);	
							}
						}
				 	})

				})
			}
		})
	}
}
//export { GetBible }

},{"./loadRequested.js":9}],3:[function(require,module,exports){
const GetNotified = {
	setStatusMessage: function (msg) {
	      if ((typeof msg) !== 'string') {
	          throw Error(`expected a string as an argument but got ${(typeof msg)}`);
	      }

	      let bibleRep = document.querySelector(".bible-report");

	      bibleRep.innerHTML = msg;

	      bibleRep.setAttribute('style', 'visibility: visible');

	      setTimeout(() => {
	          bibleRep.removeAttribute('style');
	      }, 3000);
	},
	isAvailable: function() {
			if ( "Notification" in window ) {
				return true;
			} else {
				this.setStatusMessage("Update Your Browser to enjoy this feature");
				return false;
			}
	},
	isGranted: function() {
			if ( this.isAvailable() && Notification.permission === 'granted' ) {

				this.getTodo(( { todo_content , todo_date } = obj) => {

					navigator.vibrate([100,50,20,10]);

					// there is vibrate property for __n 
					// but i decided to use navigator
					const __n = new Notification('Todo Notification', {
						body: "content: " + todo_content + "\nDate: " + todo_date,
						icon: './img/old_bible.jpg'
					})

					setTimeout( () => {
						__n.close();
					}, 4000);

					__n.addEventListener('click', e => {
						let moveToTodo = document.querySelector('.bible-view-todo'),
							todoList = moveToTodo.querySelector('.todo-list'),
							target = e.target;

						moveToTodo.click();

						Array.from(todoList.children, (el) => {
							let content = el.innerHTML;
							let data = target.data.replace(/\n/g,'');
							el.setAttribute('style', 'border: 12px solid red;');
							if ( content === data ) {
								
							}
						});
						__n.close();
					});

				})
			} else {
				// implement worker thread here
				console.log('asdfadsf');
			}
	},
	getTodo: function(callback) {

			if ( localStorage.getItem("___TODO___")) {

                let __todo__ = JSON.parse(localStorage.getItem("___TODO___"));

				for ( let miniObj of Object.keys(__todo__)) {

		            let { todo_date, todo_time } = __todo__[miniObj];

		            let dateObj = new Date().toLocaleDateString();
		            let timeObj = new Date().toLocaleTimeString();

		            dateObj = Number(dateObj.split("/").reverse().join(""));
		            timeObj = timeObj.slice(0,5).replace(/:/,"");

		            todo_time = todo_time.replace(":",'');
		            todo_date = Number(todo_date);
		            
		            if ( ( todo_date === dateObj && todo_time === timeObj ) || ( todo_date === dateObj) ) {
		                callback(__todo__[miniObj]);
		            } 
		        }
            }
	}
};
GetNotified.isGranted();
},{}],4:[function(require,module,exports){
//import { GetBible } from "./bible.js";
const { GetBible } = require("./bible.js");

module.exports._bookMark =  Object.create({
	bookmarkStorage: JSON.parse(localStorage.getItem("___BIBLE-BOOKMARK___")),
	bookmarkElement() {
		return document.querySelector('.bible-bookmark');
	},
	init() {
		if (this.bookmarkElement().children.length !== 0 )  {
			Array.from(this.bookmarkElement().children, _ => {
				this.bookmarkElement().removeChild(_);
			});
			console.log(this.bookmarkElement().children.length);
		}
		this.checkBookMarkStorage();
	},
	bookmarkHtml() {
		this.bookmarkElement().setAttribute('style', `font-size: ${localStorage.getItem("font-size")}px;`);
		return this.bookmarkElement();
	},
	checkBookMarkStorage() {
		if ( ! this.bookmarkStorage )  {
			document.querySelector(".fa.fa-home.bible-nav-item").click();
			GetBible.SetStatusMessage('Nothing to display here');
			return false;
		}
		this.showBookMark();
	},
	showBookMark() {

		try {
			const _p = GetBible.IsBookMarked(this.bookmarkStorage);
			let [value,location] = _p.next().value;
			let setBg = false;
			while ( value != null ) {
				if ( ! setBg ) {
					setBg = true;
					this.styleBookMark({value,setBg,location});	
					[value,location] = _p.next().value;
					continue ;
				}
				setBg = false;
				this.styleBookMark({value,setBg,location});
				[value,location] = _p.next().value;
			}
		} catch(ex) {}

	},
	styleBookMark({value,setBg,location}) {
		let [versenum,versetext] = [value.split(/_/).join(" ").match(/\d+/)[0],value.split(/_/).join(" ").replace(/^\d+/,"")];

		let readParent = document.createElement('div');

		readParent.setAttribute('class', 'bible-verse-text');
		readParent.setAttribute('data-set-bg', setBg.toString());
		let verseLocation = document.createElement('p');
		let verseNum = document.createElement('span');
		let verseText = document.createElement('span');

		verseNum.textContent = versenum;
		verseText.textContent = versetext;
		verseLocation.textContent = location;
		readParent.appendChild(verseLocation);
		readParent.appendChild(verseNum)
		readParent.appendChild(verseText);
		this.bookmarkHtml().appendChild(readParent);
	}
});

},{"./bible.js":2}],5:[function(require,module,exports){
//import {GetJson, objectEntries} from "../dep/loadRequested.js"

const { GetJson, objectEntries } = require("./loadRequested.js");

class Concord {

	constructor() {

		let concord = document.querySelector('.bible-concord');
		let concordModal = document.querySelector('#BibleConcord');
		let bibleCover = document.querySelector('.bible-cover');
		let close = document.querySelector('.bible-close');
		let search = document.querySelector('.bible-start-search');
		let bibleInput = document.querySelector('.bible-search-concord');
		let bibleHomeScreen = document.querySelector('.bible-home-screen');
		let bibleHeadCover = document.querySelector('.bible-head-cover');
			/*				*\

		This Element should be created in this constructor to avoid creating it more than once
			in renderSearch method since renderOnPageParent will be created ones
			\*				*/
			// console.log('sss');
		// let renderOnPageParent = document.createElement('div');
		// 		renderOnPageParent.setAttribute('class', 'bible-rendered-on-page');

		this.concord = () => concord;
		this.concordModal = () => concordModal;
		this.bibleCover = () => bibleCover;
		this.close = () => close;
		this.search = () => search;
		this.bibleInput = () => bibleInput;
		this.bibleHomeScreen =  () => bibleHomeScreen;
		this.bibleHeadCover = () => bibleHeadCover;
	}
	showConcord() {
		this.concord().addEventListener('click', (e) => {
			this.concordModal().style["display"] = "flex";
			this.concordModal().setAttribute('data-location', 'bringdown');
			// this.bibleCover().removeAttribute('data-display');
			this.bibleHeadCover().removeAttribute('data-display');
		});
		return this;
	}
	closeModal() {
		this.close().addEventListener('click', (e) => {
			this.bibleCover().setAttribute('data-display', 'none');
			this.concordModal().style["display"] = "none";
			this.bibleHeadCover().setAttribute('data-display', 'none');
		})
		return this;
	}
	searchText(concord) {

		let q = 0;
		/////////////////////////////////////////
		/* if the bible-rendered-on-page class is already mapped on the dom 
		remove it
		*/
				let qq = document.querySelector('.bible-rendered-on-page')
				if ( qq ) {
					qq.remove();
				}

		/////////////////////////////////////////////


		let renderOnPageParent = document.createElement('div');
		renderOnPageParent.setAttribute('class', 'bible-rendered-on-page');

		this.renderOnPageParent = () => renderOnPageParent;

		for ( let [index,nameOfLocation] of objectEntries(concord) ) {

			nameOfLocation = nameOfLocation.replace(/\s/g, "");

			let getLocationConcord = new GetJson(`js/jsons/${nameOfLocation}.json`);


			getLocationConcord.loadJson().then((concord) => {

				let {book, chapters} = concord;

				let ifFound = false;

				// let searchChapters = document.querySelector('.bible-search-chapters');

				// searchChapters.innerHTML = `Searching ${book}`;

				for ( let [index,versesValue] of objectEntries(chapters) ) {

					let {chapter,verses} = versesValue;

					let userInput = this.bibleInput().value;
					let userInpuRegex = new RegExp(userInput, "igm");

					Array.from(verses, (v) => {

							let verseNum = Object.getOwnPropertyNames(v);
							let text = v[verseNum];

							if ( userInpuRegex.test(text) ) {
								// this.saveSearch().add(`${book} -- ${chapter} ${verseNum} -- ${text}`);
								this.renderSearch({
									book,
									chapter,
									verseNum,
									text
								})
								ifFound = true;

							}
					});

				}

				ifFound = ( ifFound ? false : ifFound);

			});
		}
	}
	searchConcord() {

		this.search().addEventListener('click', (e) => {

			e.preventDefault();
			
			if ( this.bibleInput().value.length === 0 ) {
				return false;
			}


			let bibleNavItemParent = document.querySelector('.bible-nav');



			this.bibleHomeScreen().removeAttribute('data-reduce-size');

			bibleNavItemParent.removeAttribute('data-open-bar');
			bibleNavItemParent.setAttribute('data-close-bar', 'closebar');

			this.bibleHeadCover().setAttribute('data-display', 'none');
			this.concordModal().setAttribute('data-location', 'bringup');
			this.bibleCover().setAttribute('data-display', 'none')

			this.concordModal().style["display"] = "none";
			let getConcord = new GetJson("js/jsons/oldtestament.json");

			setTimeout(() => {
				getConcord.loadJson().then((concord) => {
					// this.bibleCover().removeAttribute('data-display');
					// Concord.StyleProp("oldtestament", this.bibleInput().value)
					this.searchText(concord);
					return new GetJson("js/jsons/newtestament.json");
				}).then((nt) => {
					nt.loadJson().then((concord) => {
						// this.bibleCover().removeAttribute('data-display');
							// Concord.StyleProp("newtestament", this.bibleInput().value)
						this.searchText(concord);
					});
				});

			}, 1000);

		})
	}
	renderSearch(foundSearch = {}) {

			if ( Object.keys(foundSearch).length !== 0 ) {
				
				let {book,chapter,verseNum,text} = foundSearch;

				let rndPage = document.querySelector('.bible-rendered-on-page');
				
				if ( Boolean(rndPage) === false ) {
					Array.from(this.bibleHomeScreen().children, (ch) => {
						if ( ! ch.hasAttribute('data-display') && ! HTMLImageElement[Symbol.hasInstance](ch) ) {
							ch.setAttribute('data-display', 'none');
						}
					})
					this.bibleHomeScreen().appendChild(this.renderOnPageParent());
				}


				let renderOnPage = document.createElement('div');
				let renderBookOnPage = document.createElement('p');
						// renderBookOnPage.setAttribute('class', 'bible-location');
						renderBookOnPage.innerHTML = `${book} ${chapter} vs ${verseNum[0]}`
				
				let hideText = document.createElement('p');
						hideText.innerHTML = text;
						hideText.setAttribute('data-display', 'none');		
				
				renderOnPage.setAttribute('class', 'bible-location');
				renderOnPage.appendChild(renderBookOnPage);
				renderOnPage.appendChild(hideText);
				this.renderOnPageParent().appendChild(renderOnPage);
				return;
			}
	}

	openMd() {

		this.bibleHomeScreen().addEventListener('click', e => {
			let target = e.target;
			
			if ( target.parentNode.className.includes('bible-location') || target.parentNode.className.includes('bible-location') ) {

				let t = (target.className.includes('bible-location')) 
								? target.children[1] 
										: target.nextElementSibling;

				Concord.ReadModal(t.innerHTML);
			}

		});
		return this;
	}	

	static ReadModal(text) {
		// let renderedOnPage = document.querySelector('.bible-rendered-on-page');
		let bibleCover = document.querySelector('.bible-cover');
		let bibleHeadCover = document.querySelector('.bible-head-cover');

		let mdParent = document.createElement('div');
		mdParent.setAttribute('data-read-modal', 'read-modal');

		let mdClose = document.createElement('span');
		mdClose.setAttribute('class', 'fa fa-close bible-close pull-right');

		mdClose.addEventListener('click', e => {
			
			mdParent.remove();
			bibleCover.setAttribute('data-display', 'none');
			bibleHeadCover.setAttribute('data-display', 'none')
			
		})

		let readTextParent = document.createElement('div');
		let readText = document.createElement('p');
		readText.setAttribute('class','read-search-text');
		readText.innerHTML = text;

		readTextParent.appendChild(readText);

		mdParent.appendChild(mdClose);
		mdParent.appendChild(readTextParent);

		document.body.appendChild(mdParent);

		bibleCover.removeAttribute('data-display');
		bibleHeadCover.removeAttribute('data-display');
	}
}

var q = new Concord();

q.showConcord().openMd().closeModal().searchConcord();

},{"./loadRequested.js":9}],6:[function(require,module,exports){
class HandleClose {
    constructor() {}
    close() {
        document.body.addEventListener('click', e => {
            let target = e.target;
            if ( target.className.includes('bible-close') ) {
                let bibleHeadCover = document.querySelector('.bible-head-cover');
                bibleHeadCover.setAttribute('data-display', 'none')

                let bibleCover = document.querySelector('.bible-cover');
                let bibleNavItemParent = document.querySelector('.bible-nav');
                let homeScreen = document.querySelector('.bible-home-screen');

                if ( ! bibleNavItemParent.hasAttribute('data-close-bar') ) {
                    homeScreen.removeAttribute('data-reduce-size');
                    bibleNavItemParent.removeAttribute('data-open-bar');
                    bibleNavItemParent.setAttribute('data-close-bar', 'closebar');  
                }             
            }
        });

    }
}

var qq = new HandleClose();
qq.close();


},{}],7:[function(require,module,exports){
//import {GetJson, objectEntries, Modal} from "../dep/loadRequested.js"
/*import {objectEntries as objectEntries } from "loadRequested.js";
import {Modal as Modal} from "loadRequested.js";*/
//import {GetBible} from "../dep/bible.js";

const { GetJson,
	objectEntries,
	Modal } = require("./loadRequested.js");

const { GetBible } = require("./bible.js");

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
        Array.from(document.querySelectorAll(".bible-location"), el => {
            Modal.extended(el);
        })
      })
    });
    this.newTestament().addEventListener('click', (e) => {
      let getNewTestaMent = new GetJson("js/jsons/newtestament.json");
      getNewTestaMent.loadJson().then((nt) => {
        Home.PlaceLocationInDom(nt, "nt");
        Home.BibleChapters();
        Array.from(document.querySelectorAll(".bible-location"), el => {
            Modal.extended(el);
        })
      })
    });
  }
}

let getTestaMents = new Home();
getTestaMents.loadBibleLocation();

},{"./bible.js":2,"./loadRequested.js":9}],8:[function(require,module,exports){
//import { _bookMark as BookMark } from "../dep/bookmark.js"

const { _bookMark: BookMark } = require("./bookmark.js");

class InitBookMark {
	static Fire() {
		let _el = document.querySelector('[data-target="bible-bookmark"]');
		_el.addEventListener('click', () => {
			BookMark.init();
		})
	}
}
InitBookMark.Fire();

},{"./bookmark.js":4}],9:[function(require,module,exports){
module.exports.objectEntries =  function* objectEntries(obj) {
    // in ES6, you can use strings or symbols as property keys,
    // Reflect.ownKeys() retrieves both
    /*                *\
        Exploring ES6
    \*                */
    let propKeys = Object.keys(obj);
    for ( let propKey of propKeys ) {
        yield [propKey, obj[propKey]];
    }
}

module.exports.SetStatusMessage = function SetStatusMessage(msg) {
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
module.exports.GetJson = class GetJson {
  constructor(url) {
    if ( ! url ) throw Error("An Argument is required");
    this.url = url;
  }
  loadJson() {
    let self = this;
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest(self.url);
      xhr.open('GET', self.url, true);
      xhr.addEventListener('readystatechange', () => {
        if ( (xhr.status <= 300) && (xhr.readyState <= 4) ) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch(ex) {}

        } else {
          reject(Error("A Promise Error has occured"))
        }
      })
      xhr.send();
    })
  }
}
module.exports.JumpToChapter = class JumpToChapter {
    constructor() {
      let bibleGetChapters = document.querySelector('.bible-getChapters');
      this.bibleGetChapters = () => bibleGetChapters;
    }
    el() {
      return this.bibleGetChapters();
    }
}

module.exports.Modal =  class Modal {

  static extended(el) {

      let qq = document.querySelector('.bible-cover');
      console.log(el);
      el.addEventListener('click', e => {
          let target = e.target,
              bibleHeadCover = document.querySelector('.bible-head-cover');


          if ( target.classList.contains("bible-location") ) {
              Modal.searchJson(target.textContent.replace(/\s+/g, ""));
          } else {
            let currentOpenLocation = document.querySelector('.bible-book-name').innerHTML;
            Modal.searchJson(currentOpenLocation.replace(/\s+/g, ""));
          }
          
          qq.removeAttribute('data-display');
          bibleHeadCover.removeAttribute('data-display');
      })      



      // modalChapters.addEventListener('click', (e) => {
      //   let target = e.target;
      //   let bibleHeadCover = document.querySelector('.bible-head-cover');
      //   if ( target.classList.toString().includes("bible-location")) {
      //       Modal.searchJson(target.textContent.replace(/\s+/g, ""))
      //       qq.removeAttribute('data-display');
      //       bibleHeadCover.removeAttribute('data-display');
      //   } else if ( target.classList.toString().includes("bible-label-chapter") ) {
      //     let currentOpenLocation = document.querySelector('.bible-book-name').innerHTML;
      //     Modal.searchJson(currentOpenLocation.replace(/\s+/g, ""));
      //     qq.removeAttribute('data-display');
      //     bibleHeadCover.removeAttribute('data-display');
      //   }

      // });

      let getChaptersParent  = document.querySelector('.bible-getChapters');
      let close = getChaptersParent.getElementsByClassName('bible-close')[0];
      
      close.addEventListener('click', () => {
        let chaptersParent = document.querySelector('.bible-getChapters-chaptersParent');
        let qq = document.querySelector('.bible-cover');
        if ( !! chaptersParent ) chaptersParent.remove() ;
        getChaptersParent.setAttribute("data-display", "none");
        qq.setAttribute('data-display', 'none');
      })
  }
    
  static searchJson(testament) {
    let getChapters = new GetJson(`js/jsons/${testament}.json`);
    getChapters.loadJson().then((ch) => {
      let {book, chapters} = ch;
              // let createChapterDom = Modal.createDomNodes(book);
              // if ( ! createChapterDom ) return ;
      let getChaptersParent  = document.querySelector('.bible-getChapters');
      let bookName = document.querySelector('.bible-getChapters-book');
      bookName.innerHTML = book;
      let chaptersParent = document.createElement('ul');
      chaptersParent.setAttribute('class', 'bible-getChapters-chaptersParent');
      let removeChaptersParent = document.querySelector('.bible-getChapters-chaptersParent')

      if ( !! removeChaptersParent ) {
          removeChaptersParent.remove();
      }

      getChaptersParent.removeAttribute('data-display');
      getChaptersParent.appendChild(chaptersParent);
      Array.from(chapters, (getchapters) => {
        let {chapter, verses} = getchapters;
        let chapterNode = document.createElement('li');
        chapterNode.setAttribute('class', 'bible-getChapters-chapter');
              // createChapterDom.appendChild(chapterNode);
        chaptersParent.appendChild(chapterNode);
        chapterNode.innerHTML = `<div>
                                    <p>CH.</p>
                                    <p>${chapter}</p>
                                  <div>`
      })

    })
  }
}

},{}],10:[function(require,module,exports){
//import {GetJson as GetJson} from "../dep/loadRequested.js";

const { GetJson } = require("./loadRequested.js");
class ChapterModal {
	constructor() {
		let bibleBody = document.querySelector('#bible-body');
		this.bibleBody = () => bibleBody;
	}
	static otModal() {

	}
	static ntModal() {

	}
	runModal() {
		this.bibleBody().addEventListener('click', (e) => {
			let target = e.target
		})
	}
}

var qq = new ChapterModal();
qq.runModal();

},{"./loadRequested.js":9}],11:[function(require,module,exports){
//import {GetJson , objectEntries, Modal } from "../dep/loadRequested.js"
//import {GetBible as GetBible } from "../dep/bible.js"

const { GetJson,
	objectEntries,
	Modal }  = require("./loadRequested.js");

const { GetBible } = require("./bible.js");

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
    let testaMentParent = document.createElement('ul');
    testaMentParent.setAttribute('class', 'bible-testament');
    if ( bibleChoice ) {
      bibleChoice.setAttribute('data-display', 'none');
      let removeTestamentParent = homeScreen.getElementsByClassName('bible-testament')[0];
      if ( removeTestamentParent !== undefined ) {
        removeTestamentParent.remove();
      }
      homeScreen.appendChild(testaMentParent)
      for ( let [otKey, otValue] of objectEntries(testament) ) {
        let location = document.createElement('li');;
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
                  Array.from(document.querySelectorAll(".bible-location"), el => {
                      Modal.extended(el);
                  })
                });
            } else if( homeScreenChild.getAttribute('class') === "bible-newt" ) {
              let getNewTestament = new GetJson("js/jsons/newtestament.json");
              getNewTestament.loadJson().then((nt) => {
                NavNavigation.PlaceLocationInDom(nt,".bible-newt");
                NavNavigation.BibleChapters()
                Array.from(document.querySelectorAll(".bible-location"), el => {
                    Modal.extended(el);
                })
              })
            } 
        }
      }
    })
  }
}

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

class SetActive {
  constructor() {
    let bibleNavList = document.querySelector('.bible-nav-list');
    this.bibleNavList = () => bibleNavList
  }
  active() {
    this.bibleNavList().addEventListener('click', (e) => {
      let target = e.target;
      let nodeName = e.target.nodeName.toLowerCase();
      
      target = ( nodeName === 'li' ) ? target : target.parentNode;
      // if ( target.parentNode.className.includes("bible-nav-concord") ) {
      //     target.parentNode.parentNode.setAttribute('data-override', 'true');
      //     return ;
      // }
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

; ( function () {
  const ss = new SetActive();
  ss.active();

  const toggleC = new ToggleConcord();
  toggleC.toggleConcord();

}());

},{"./bible.js":2,"./loadRequested.js":9}],12:[function(require,module,exports){
//import { objectEntries } from '../dep/loadRequested.js';

const { objectEntries } = require("./loadRequested.js");

class NoteListener {
    constructor() {
        let noteParent = document.querySelector('.bible-note');
        this.noteParent = () => noteParent;
    }

    triggerClicks() {
        this.noteParent().addEventListener('click', e => {

            let target = e.target,
                className = target.className,
                dataPointer = target.getAttribute('data-pointer');

            switch (dataPointer) {
                case "bible-add-note":
                    // this.bibleCover().removeAttribute('data-display');
                    let noteAdd = new AddNote();
                    noteAdd.showNote({
                        page_title: 'Add Note'
                    });
                    break;
                case "bible-edit-note":
                    let noteEdit = new EditNote();

                    break;
                case "bible-view-note":
                    let noteView = new ViewNote();
                    noteView.showNote();
                    break;
                case "bible-delete-note":
                    let noteDelete = new DeleteNote();
                    break;
                case "bible-pushpin":

                    let evtObj = {
                        dEvent: e => {
                            let target = e.target;
                            let pL = e.clientX - target.getBoundingClientRect().left;
                            let pT = e.clientY - target.getBoundingClientRect().top;
                            let pR = e.clientY - target.getBoundingClientRect().right;



                            Object.assign(evtObj, { pL, pT, pR })
                        },
                        dStopEvent: e => {
                            let target = e.target;
                            this.noteParent().setAttribute('style', `left:${evtObj.pL}px;top:${evtObj.pT}px;right:${evtObj.pR}px`);
                        }
                    }

                    if (target.className.includes('fa-rotate-90')) {
                        target.classList.toggle('fa-rotate-90');
                        this.noteParent().removeAttribute('data-shrink');

                        target.removeEventListener('drag', evtObj.dEvent);
                        target.removeEventListener('dragend', evtObj.dStopEvent);
                        return;
                    }

                    target.setAttribute('class', target.getAttribute('class') + ' fa-rotate-90');
                    this.noteParent().setAttribute('data-shrink', 'shrink');

                    target.addEventListener('drag', evtObj.dEvent);
                    target.addEventListener('dragend', evtObj.dStopEvent);
                    break;

            }

        });
    }
}

let cc = new NoteListener();

cc.triggerClicks();



class AddNote  {

    constructor() {
        // super()
        let addNote = document.querySelector('.add-note');
        this.addNote = () => addNote;
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
    showNote({page_title, fireEditNote, title}) {

        let pageTitle = document.querySelector('.bible-add-note-text'),
            pageButton = document.querySelector('.bible-add-note-btn'),
            noteTitle = document.querySelector('.bible-add-note-title'),
            noteContent = document.querySelector('.bible-add-note-content');

        pageTitle.innerHTML = page_title;
        // pageButton.innerHTML = page_title;

        // run this in a local scope
        {
            if (page_title === 'Edit Note') {
                pageButton.setAttribute('class', pageButton.getAttribute('class') + " fa fa-pencil")
                let noteToEdit = JSON.parse(localStorage.getItem('___BIBLE-NOTE___'))[title];

                let { title: noteTT, content} = noteToEdit;

                noteTitle.value = noteTT;
                noteContent.value = content;

                noteTitle.setAttribute('disabled', "true");

            } else {

                // lets assume the value property of the input HTMLElement is not empty
                pageButton.setAttribute('class', pageButton.getAttribute('class') + " fa fa-plus")
                noteTitle.value = noteContent.value = ""
                if (noteTitle.hasAttribute('disabled')) noteTitle.removeAttribute('disabled');
            }

        }

        this.addNote().setAttribute('style', 'visibility: visible;');

        this.addNote().addEventListener('click', e => {

            let target = e.target,
                className = target.className;

            if (className.includes('bible-close')) {
                // console.log(this.bibleCover());
                this.addNote().removeAttribute('style');
            } else if (className.includes('bible-add-note-btn')) {

                if (noteTitle.value.length < 10) {

                    AddNote.SetStatusMessage('Note title should not be less than 10 characters');
                    return;

                } else if (noteContent.value.length < 40) {

                    AddNote.SetStatusMessage('Note Content should not be less than 40 characters');
                    return;
                }

                if (page_title === 'Add Note') {
                    this.AddNote(noteTitle, noteContent);
                    return;
                }
                fireEditNote();
            }


        });
    }

    AddNote(noteTitle, noteContent) {


        let getPrevItem = JSON.parse(localStorage.getItem('___BIBLE-NOTE___'));
        let isTrueFalse = (getPrevItem) ? true : false;
        let noteInfo = Object.create({});

        let obj = {

            [`${noteTitle.value}`]: {
                title: noteTitle.value,
                content: noteContent.value,
                creationDate: new Date().toLocaleDateString()
            }

        }

        if (!isTrueFalse) {

            Object.assign(noteInfo, obj)
            localStorage.setItem('___BIBLE-NOTE___',
                JSON.stringify(noteInfo));
            AddNote.SetStatusMessage('note has been succefully saved');
            this.addNote().removeAttribute('style');
            return;

        }

        Object.assign(noteInfo, getPrevItem, obj)
        localStorage.setItem('___BIBLE-NOTE___',
            JSON.stringify(noteInfo));
        AddNote.SetStatusMessage('note has been succefully saved');
        this.addNote().removeAttribute('style');

    }

}

class ViewNote {
    constructor() {
        let viewNote = document.querySelector('.view-note');
        let viewNoteParent = document.querySelector('.bible-view-note-list');
        let SavedNotes = JSON.parse(localStorage.getItem("___BIBLE-NOTE___"));

        this.viewNote = () => viewNote;
        this.viewNoteParent = () => viewNoteParent;
        this.SavedNotes = () => SavedNotes;
    }

    showNote(options = {}) {



        if (!this.SavedNotes()) {
            AddNote.SetStatusMessage('No Note has been added yet');
            return;
        }

        this.viewNote().setAttribute('style', 'visibility:visible;');

        this.populateNote(options);


    }
    populateNote(options) {



        for (let [n, i] of objectEntries(this.SavedNotes())) {

            let { content, creationDate, title } = i;
            let { editwidget, deletewidget, elistener, dlistener } = options;


            let viewNoteItem = document.createElement('li');
            let noteTitle = document.createElement('p')
            let noteDate = document.createElement('p');
            // let editWidget = ( editwidget ) ? document.createElement('p') : '';


            noteTitle.innerHTML = title.substring(0, 10) + '...';
            noteDate.innerHTML = creationDate;


            if (editwidget) {

                let editEl = document.createElement('p');

                viewNoteItem.setAttribute('class', 'fa fa-pencil fa-5x  bible-view-note-item');
                editEl.setAttribute('class', 'fa fa-pencil pull-right bible-note-edit');

                viewNoteItem.appendChild(editEl);

                elistener(
                    i,
                    noteTitle, noteDate, viewNoteItem, editEl,
                    this.viewNoteParent().parentNode.querySelector('.bible-close')
                );

            } else if (deletewidget) {

                let delEl = document.createElement('p');

                viewNoteItem.setAttribute('class', 'fa fa-remove fa-5x  bible-view-note-item');
                delEl.setAttribute('class', 'fa fa-remove pull-right bible-note-delete');

                viewNoteItem.appendChild(delEl);

                dlistener(
                    i,
                    noteTitle, noteDate, viewNoteItem, delEl,
                    this.viewNoteParent().parentNode.querySelector('.bible-close')
                );

            } else {
                viewNoteItem.setAttribute('class', 'fa fa-sticky-note fa-5x  bible-view-note-item');
                this.listener({
                    content,
                    creationDate,
                    title
                }, noteTitle, noteDate, viewNoteItem,
                    this.viewNoteParent().parentNode.querySelector('.bible-close'));
            }

            viewNoteItem.appendChild(noteTitle)
            viewNoteItem.appendChild(noteDate)

            this.viewNoteParent().appendChild(viewNoteItem);
        }


    }
    removeParentElement(el) {

        this.viewNote().removeAttribute('style');

        Array.from(
            this.viewNote().querySelectorAll('.bible-view-note-item'),
            el => el.remove()
        );

    }
    listener(n, ...args) {
        for (let i of args) {
            i.addEventListener('click', e => {

                let target = e.target;

                if (target.className.includes('bible-close')) {
                    this.removeParentElement('bible-close');
                    return;
                }

                this.viewNoteContent(n);
            })
        }
    }
    viewNoteContent(n) {

        let mdNote = document.querySelector('.bible-view-note-modal'),
            mdTitle = mdNote.querySelector('.bible-view-note-title').children[0],
            mdDate = mdNote.querySelector('.bible-view-note-creationDate').children[0],
            mdContent = mdNote.querySelector('.bible-view-note-content').children[0],
            mdClose = mdNote.querySelector('.bible-close');


        let {content, creationDate, title} = n;

        mdTitle.innerHTML = title,
            mdDate.innerHTML = creationDate,
            mdContent.innerHTML = content;

        mdNote.setAttribute('style', 'display: block;');

        mdClose.addEventListener('click', e => {
            let target = e.target;

            mdNote.removeAttribute('style');
        });

    }
}


class EditNote extends ViewNote {
    constructor() {
        super();
        super.showNote({
            editwidget: true,
            elistener: ({ title }, ...args) => {
                for (let i of args) {
                    i.addEventListener('click', e => {
                        let target = e.target;

                        if (target.className.includes('bible-close')) {
                            this.removeParentElement('bible-close');
                            return;
                        } else if (target.className.includes('bible-note-edit')) {
                            // bad coding practice, ask on starkoverflow on how to
                            //   extends multiple class
                            let noteAdd = new AddNote();
                            noteAdd.showNote({
                                page_title: 'Edit Note',
                                fireEditNote: this.fireEditNote,
                                title: title
                            });
                            return;
                        }

                    })
                }
            }
        });
    }

    fireEditNote(options) {

        let edNote = document.querySelector('.add-note');

        edNote.addEventListener('click', e => {
            let target = e.target;
            if (target.nodeName.toLowerCase() === 'button') {

                let nTitle = edNote.querySelector('.bible-add-note-title').value;

                nTitle = JSON.parse(localStorage.getItem('___BIBLE-NOTE___'))[nTitle];

                nTitle.content = edNote.querySelector('textarea').value;

                // set the title object to the content of nTitle
                localStorage.setItem('___BIBLE-NOTE___', JSON.stringify(nTitle["title"][nTitle]));
                edNote.removeAttribute('style');
            }
        });
    }
}

class DeleteNote extends ViewNote {
    constructor() {
        super()

        super.showNote({
            deletewidget: true,
            dlistener: (n, ...args) => {

                for (let i of args) {

                    i.addEventListener('click', e => {

                        let target = e.target;

                        if (target.className.includes('bible-close')) {

                            this.removeParentElement('bible-close');
                            return;

                        } else if (target.className.includes('bible-note-delete')) {

                            this.removeNote(n, target);
                            return;

                        }

                        this.viewNoteContent(n);

                    })
                }
            }
        })
    }
    removeNote({title: tt}, target) {

        for (let [n, i] of objectEntries(this.SavedNotes())) {
            let { title } = i;

            if (title.includes(tt)) {
                target.parentNode.remove();

                delete this.SavedNotes()[tt];

                localStorage.setItem('___BIBLE-NOTE___', JSON.stringify(this.SavedNotes()));

                if (Object.keys(this.SavedNotes()).length === 0) {
                    localStorage.removeItem('___BIBLE-NOTE___');
                    this.viewNote().removeAttribute('style');
                }
            }
        }
    }
}

},{"./loadRequested.js":9}],13:[function(require,module,exports){
class Todo {
    constructor() {
        let todoParent = document.querySelector('.bible-todo-parent');

        todoParent.addEventListener('click', e => {
            let target = e.target;
            console.log(target.className);
            switch(target.className) {
                case "bible-add-todo":

                    let todoAddParent = document.querySelector('.todo-add-parent');
                    let cover = document.querySelector('.bible-head-cover');
                    // cover.removeAttribute('data-display');
                    todoAddParent.setAttribute('style', 'visibility: visible;')

                    let todoClose = todoAddParent.querySelector('.todo-bible-close');
                    let todoAddTodo = todoAddParent.querySelector('.todo-add-button');

                    todoClose.addEventListener('click', e => {
                        let target = e.target;
                        let d = document.querySelector(`.${target.getAttribute('data-remove')}`);
                        d.removeAttribute('style');
                        // cover.setAttribute('data-display', 'none');
                    });

                    todoAddTodo.addEventListener('click', e => {
                        let date = todoAddParent.querySelector('input[type="date"]');
                        let time = todoAddParent.querySelector('input[type="time"]');
                        let todo = todoAddParent.querySelector('textarea');
                        this.addTodo(date,time,todo,todoAddParent);
                    });

                    break;
                case "bible-view-todo":
                    this.viewTodo();
                    break;
                default:
            }
        });


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

    addTodo(date,time,todo,parent) {
        let savedate = date.value.replace(/-/g,'');
        let savetime = time.value.replace(/-/g,'');
        let savetodo = todo.value;

        {
            if ( (String(savedate).length === 0) ) {
                Todo.SetStatusMessage("Please use a proper date");
                return ;
            } else if ( String(savetime).length === 0 ) {
                Todo.SetStatusMessage("Please use a proper time");
                return ;
            } else if ( savetodo.length < 30 ) {
                Todo.SetStatusMessage("Your Todo Message should be greater than 30 characters");
                return ;
            }
        }

        
        let getPrevItem = JSON.parse(localStorage.getItem('___TODO___'));
        let isTrueFalse = (getPrevItem) ? true : false;
        let todoInfo = Object.create({});
        

        let obj = {
            [savetodo.substring(0,30)]: {
                todo_date: savedate,
                todo_content: savetodo,
                todo_time: savetime
            }
        }

        if (!isTrueFalse) {

            Object.assign(todoInfo, obj)
            localStorage.setItem('___TODO___',
                JSON.stringify(todoInfo));
            Todo.SetStatusMessage('todo has been succefully saved');
            parent.removeAttribute('style');
            return;

        }

        Object.assign(todoInfo, getPrevItem, obj)
        localStorage.setItem('___TODO___',
            JSON.stringify(todoInfo));
        Todo.SetStatusMessage('todo has been succefully saved');
        parent.removeAttribute('style');

    }
    viewTodo() {

        let todo_Obj,
            todoViewParent = document.querySelector(".view-todo"),
            todoView = document.querySelector(".todo-list");

        if ( (todo_Obj = localStorage.getItem('___TODO___') )) {

            todo_Obj = JSON.parse(todo_Obj);
            todoViewParent.setAttribute('style', 'visibility: visible;');
            for ( let _j of Object.keys(todo_Obj) ) {
                let { todo_date, todo_time, todo_content } = todo_Obj[_j];

                let listElement = document.createElement('li'),
                    dateElement = document.createElement('p'),
                    timeElement = document.createElement('p'),
                    contentElement = document.createElement('p'),
                    deleteTodo = document.createElement('span'),
                    markCompleted = document.createElement('span');

                dateElement.innerHTML = todo_date,
                timeElement.innerHTML = todo_time,
                contentElement.innerHTML = todo_content,
                deleteTodo.innerHTML = "Delete";

                listElement.setAttribute('class', 'todo-view-item');
                dateElement.setAttribute('class', 'todo-date');
                deleteTodo.setAttribute('class', 'fa todo-delete-todo pull-right');
                timeElement.setAttribute('class', 'todo-time');
                contentElement.setAttribute('class', '_todo-content');
                markCompleted.setAttribute('class', 'fa fa-check-circle pull-right todo-check')

                listElement.appendChild(dateElement);
                listElement.appendChild(timeElement);
                listElement.appendChild(contentElement)
                listElement.appendChild(deleteTodo);
                listElement.appendChild(markCompleted);
                todoView.appendChild(listElement);

                markCompleted.addEventListener('click', e => {
                    let target = e.target;
                    let parent = target.parentNode;

                    if ( parent.getAttribute('data-completed') === 'completed' ) {
                        return false;
                    }
                    parent.setAttribute('data-completed', 'completed')
                })
            }
        } else {
            Todo.SetStatusMessage("No Todo has been added yet");
            return ;
        }

       todoViewParent.addEventListener('click', (e) => {
            let target = e.target;
            if ( target.getAttribute('class').includes('bible-close') ) {
                todoViewParent.removeAttribute('style');
                Array.from(todoView.children, (el) => {
                    el.remove();
                });
            } else if ( target.getAttribute('class').includes('todo-delete-todo') ) {
                this.removeTodo(target)
            }
        });
    }

    removeTodo(target) {
        let pNode = target.parentNode;
        let contEl = pNode.querySelector('._todo-content');
        let todoRenderedList = pNode.parentNode;

        let __todo__ = JSON.parse(localStorage.getItem("___TODO___"));
        for ( let miniObj of Object.keys(__todo__)) {
            let { todo_date, todo_time , todo_content } = __todo__[miniObj];
            todo_content = todo_content.substring(0,30);
            if ( todo_content === contEl.innerHTML.substring(0,30) ) {
                delete __todo__[miniObj];
                localStorage.removeItem("___TODO___");
                localStorage.setItem("___TODO___", JSON.stringify(__todo__));
                pNode.remove();

                if ( todoRenderedList.children.length === 0 ) {
                    todoRenderedList.parentNode.parentNode.removeAttribute('style');
                }
                break ;
            }

        }

        if ( Object.keys(__todo__).length === 0 ) {
            localStorage.removeItem("___TODO___");
            return ;
        }


    }
}

let td = new Todo();

},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13]);
