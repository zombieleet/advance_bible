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
