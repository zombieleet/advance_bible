import {GetJson, objectEntries} from "loadRequested.js"

class Concord {

	constructor() {

		let concord = document.querySelector('.bible-concord');
		let concordModal = document.querySelector('#BibleConcord');
		let bibleCover = document.querySelector('.bible-cover');
		let close = document.querySelector('.bible-close');
		let search = document.querySelector('.bible-start-search');
		let bibleInput = document.querySelector('.bible-search-concord');

		// let saveSearch = new Map();
		// this.saveSearch = () => saveSearch;

		let saveSearch = new Set();
		this.saveSearch = () => saveSearch;


		this.concord = () => concord;
		this.concordModal = () => concordModal;
		this.bibleCover = () => bibleCover;
		this.close = () => close;
		this.search = () => search;
		this.bibleInput = () => bibleInput;
	}
	showConcord() {
		this.concord().addEventListener('click', (e) => {
			this.concordModal().style["display"] = "flex";
			this.concordModal().setAttribute('data-location', 'bringdown');
			this.bibleCover().removeAttribute('data-display');

		});
		return this;
	}
	closeModal() {
		this.close().addEventListener('click', (e) => {
			this.bibleCover().setAttribute('data-display', 'none');
			this.concordModal().style["display"] = "none";
		})
		return this;
	}
	searchText(concord) {

		let q = 0;

		for ( let [index,nameOfLocation] of objectEntries(concord) ) {

			nameOfLocation = nameOfLocation.replace(/\s/g, "");
			
			let getLocationConcord = new GetJson(`js/jsons/${nameOfLocation}.json`);


			getLocationConcord.loadJson().then((concord) => {

				let {book, chapters} = concord;

				let ifFound = false;

				let searchChapters = document.querySelector('.bible-search-chapters');

				searchChapters.innerHTML = `Searching ${book}`;

				for ( let [index,versesValue] of objectEntries(chapters) ) {

					let {chapter,verses} = versesValue;

					let userInput = this.bibleInput().value;
					let userInpuRegex = new RegExp(userInput, "igm");

					Array.from(verses, (v) => {

							// since v is an object, get the first key
							// actually there is only one key


							let verseNum = Object.getOwnPropertyNames(v);
							let text = v[verseNum];

							if ( userInpuRegex.test(text) ) {
								// this.saveSearch().set(book,`${chapter} ${verseNum}`);

								this.saveSearch().add(`${book} -- ${chapter} ${verseNum}`);
								ifFound = true;

							}
					});

				}



				if ( ifFound ) {
					searchChapters.innerHTML += ` found`
					ifFound = false;
				} else {
					searchChapters.innerHTML += ` not found`
				}


			});
		}

		this.applySearch();
	}
	searchConcord() {

		this.search().addEventListener('click', (e) => {

			e.preventDefault();

			if ( this.bibleInput().value.length === 0 ) {
				return false;
			}

			this.concordModal().setAttribute('data-location', 'bringup');


			this.bibleCover().setAttribute('data-display', 'none');
			this.concordModal().style["display"] = "none";
			let getConcord = new GetJson("js/jsons/oldtestament.json");
			setTimeout(() => {
				
				getConcord.loadJson().then((concord) => {
					this.bibleCover().removeAttribute('data-display');
					Concord.StyleProp("oldtestament", this.bibleInput().value)
					this.searchText(concord);
					return new GetJson("js/jsons/newtestament.json");
				}).then((nt) => {
					nt.loadJson().then((concord) => {
						this.bibleCover().removeAttribute('data-display');
							Concord.StyleProp("newtestament", this.bibleInput().value)
						this.searchText(concord);
					});
				});
				
			}, 1000);

		})
	}
	static StyleProp(testament, value){

		if ( Boolean(document.querySelector('.bible-loading')) ) {
			let loadingText = document.querySelector('.bible-loading-text');
			loadingText.innerHTML = `Searching ${testament} for "${value}"`;
			return ;
		}

		let gifLoading = new Image();

		let loadingParent = document.createElement('div');

		loadingParent.setAttribute('class', 'bible bible-loading');


		let searchingChapters = document.createElement('p');
		searchingChapters.setAttribute('class', 'bible bible-search-chapters')

		let loadingText = document.createElement('p');
		loadingText.innerHTML = `Searching ${testament} for "${value}"`;
		loadingText.setAttribute('class', 'bible bible-loading-text');


		let loadingImageParent = document.createElement('div');

		loadingImageParent.setAttribute('class', 'bible bible-loading-image');

		gifLoading.src = '../img/loading.gif';

		// gifLoading.addEventListener('load', () => {
		loadingImageParent.appendChild(gifLoading);
		loadingParent.appendChild(loadingText);
		loadingParent.appendChild(searchingChapters);
		// })


		loadingParent.appendChild(loadingImageParent);

		document.body.appendChild(loadingParent);
	}
	applySearch() {
		// this.saveSearch().forEach((findConcord) => {
		// 	console.log(findConcord);
		// })
		// console.log(this.saveSearch());		
		// for ( let i of this.saveSearch() ) {
		// 	console.log(i);
		// }

		console.log(this.saveSearch());
		// for ( let i of this.saveSearch().entries() ) {
		// 	console.log(i);
		// }		
	}
}

var q = new Concord();

q.showConcord().closeModal().searchConcord();