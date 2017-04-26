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


module.exports.GetBible = class GetBible {
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
