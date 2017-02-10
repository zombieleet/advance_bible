import {GetJson, objectEntries} from "../dep/loadRequested.js"

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