import {JumpToChapter, objectEntries, GetJson, Modal} from "./loadRequested.js";

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
		let header_btnGroup = document.createElement('div');
		header.appendChild(header_btnGroup);
		header_btnGroup.setAttribute('class', 'btn-group bible-label-group');
		header_btnGroup.appendChild(HeaderButtons.createOpenChapterBtn());
		header_btnGroup.appendChild(HeaderButtons.createSelectVersion());
		header_btnGroup.appendChild(HeaderButtons.createSelectLanguage());

	}
	static createOpenChapterBtn() {
			let openChapterModalDiv = document.createElement('div');

			let openChapterModal = document.createElement('button');

			openChapterModalDiv.setAttribute('class', 'col-xs-4')
			openChapterModalDiv.appendChild(openChapterModal);
			
			openChapterModal.setAttribute('class', 'btn btn-primary label bible-label bible-label-chapter')
			openChapterModal.innerHTML = 'Select Chapter';	
			openChapterModal.addEventListener('click', () => {
				Modal.extended()
			});
			return openChapterModalDiv;
	}

	static createSelectVersion() {
		let selectVersionDropDown = document.createElement('div');
		selectVersionDropDown.setAttribute('class', 'col-xs-4')
		selectVersionDropDown.innerHTML = `
				<button class="btn label dropdown-toggle bible-label" 
						type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						
					choose version <span class="bible-current-version"></span> 
					<span class="caret"></span>
				</button>
				<ul class="dropdown-menu list-group bible-label-list">
					<li class="list-group-item">KJV</li>
					<li class="list-group-item">KJV</li>
					<li class="list-group-item">KJV</li>
					<li class="list-group-item">KJV</li>
					<li class="list-group-item">KJV</li>
					<li class="list-group-item">KJV</li>
				</ul>				
		`
		return selectVersionDropDown
	}
	static createSelectLanguage() {	
		let selectLanguageDropdown = document.createElement('div');

		selectLanguageDropdown.setAttribute('class', 'col-xs-4')

		selectLanguageDropdown.innerHTML = `
				<button class="btn label dropdown-toggle bible-label" 
					type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

					select langauge 
					<span class="caret"></span>
					<span class="bible-current-langauge"></span>
				</button>
				<ul class="dropdown-menu list-group bible-label-list">
					<li class="list-group-item">English</li>
					<li class="list-group-item">Pigin</li>
					<li class="list-group-item">Korean</li>
					<li class="list-group-item">Mandarine</li>
					<li class="list-group-item">Arabic</li>
					<li class="list-group-item">Hebrew</li>
				</ul>							
		`
		return selectLanguageDropdown;
	}
}


export class GetBible {
	constructor() {
		let bibleTestament = document.querySelector('.bible-testament');
		this.bibleTestament = () => bibleTestament;
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

		HeaderButtons.render();

		backward.setAttribute('class', 'fa fa-arrow-left bible-go-left');
		forward.setAttribute('class', 'fa fa-arrow-right bible-go-right');
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

		for ( let verses of chapter["verses"] ) {
			for ( let [versenum,versetext]  of objectEntries(verses) ) {
				let readParent = document.createElement('div');
				readParent.setAttribute('class', 'bible-verse-text');
				let verseNum = document.createElement('span');
				let verseText = document.createElement('span');

				verseNum.textContent = versenum;
				verseText.textContent = versetext;

				readParent.appendChild(verseNum)
				readParent.appendChild(verseText);
				parent.appendChild(readParent);
			}
			
		}
		console.log('should execute ones');
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
				} catch(ex) {
					console.log(ex);
				}
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


				// if you see a whitespace take it out
				let textContent = target.textContent.replace(/\s+/g, "");
				let bibleChapters = new GetJson(`js/jsons/${textContent}.json`);
				target.parentNode.remove();

				let bibleReadText = document.createElement('div')
				bibleReadText.setAttribute('class','bible-read-text');
				let removeBibleReadText = homeScreen.getElementsByClassName('bible-read-text')[0];
				if ( removeBibleReadText !== undefined ) {
					removeBibleReadText.remove();
				}
				homeScreen.appendChild(bibleReadText);
				
				bibleChapters.loadJson().then((bc) => {

				/* 																		*\
					A CHAPTER MUST ALREADY BE RENDERED
				\* 																		*/	

					let i = 0;				
					GetBible.StyleBible(bc["book"],bc.chapters[i]);
					console.log('onessssssssss', 0);
					this.navigateChapters(bc,i);
					console.log('onessssssssss', 0);

					var el = new JumpToChapter();					
					el.el().addEventListener('click',  (e) => {
							let target = e.target;
							let match = target.textContent.match(/\d+/g) || target.textContent.match(/CH\./);
							if ( match && (target.nodeName.toLowerCase() === "p") ) {
									if ( match[0] === "CH." ) {
											target = target.nextElementSibling;
											console.log(target);
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
