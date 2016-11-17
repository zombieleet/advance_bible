import {GetJson as GetJson} from "loadRequested.js";
import {JumpToChapter as JumpToChapter} from "loadRequested.js";
import {objectEntries as objectEntries} from "loadRequested.js";
export class GetBible {
	constructor() {
		let bibleTestament = document.querySelector('.bible-testament');
		this.bibleTestament = () => bibleTestament;
	}
	static StyleBible(book, chapter) {
		let parent = document.querySelector('.bible-read-text');
		let backward = document.createElement('span');
		let forward = document.createElement('span');
		let bookParent = document.createElement('div');
		let bookName = document.createElement('h3');
		let bookChapter = document.createElement('h5');
		backward.setAttribute('class', 'fa fa-arrow-left bible-go-left');
		forward.setAttribute('class', 'fa fa-arrow-right bible-go-right');
		bookName.textContent = book;
		bookChapter.textContent = `Chapter ${chapter["chapter"]}`;
		parent.appendChild(backward)
		parent.appendChild(forward)
		parent.appendChild(bookParent);
		bookParent.appendChild(bookName);
		bookParent.appendChild(bookChapter);
		let bibleSettingsValues = {
			fontSize: localStorage.getItem("font-size"),
			fontStyle: localStorage.getItem("font-family"),
			audio: localStorage.getItem("sound-state"),
			volume: localStorage.getItem("sound-level"),
			textcolor: localStorage.getItem("text-color"),
			bgcolor: localStorage.getItem("background-color")
		}
		// for ( let i of objectEntries(bibleSettingsValues)) {
		// 	console.log(i)
		// }
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
	}
	// *gen(bc,i) {
	// 	yield GetBible.StyleBible(bc["book"],bc.chapters[i]);
	// }
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
					// bc['book'] >>> the name of the bible book
					let q = new JumpToChapter();
					console.log(q.moveTo());
					let i = 0;
					GetBible.StyleBible(bc["book"],bc.chapters[i]);
					homeScreen.addEventListener('click', (e) => {
						let target = e.target;
						if ( target.classList.toString().includes("bible-go-right") ) {
							if ( document.querySelector('.bible-read-text') ) {
								document.querySelector('.bible-read-text').remove()
							}

							try {
								bibleReadText = document.createElement('div')
								bibleReadText.setAttribute('class','bible-read-text')
								homeScreen.appendChild(bibleReadText);
								i = ++i
								if ( bc.chapters[i] === undefined ) {
									i = 0;
									GetBible.StyleBible(bc["book"],bc.chapters[i]);
								}
								if ( (i + 1) === bc.chapters.length ) {
									GetBible.StyleBible(bc["book"],bc.chapters[i]);
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
				})
			}
		})
	}
}
