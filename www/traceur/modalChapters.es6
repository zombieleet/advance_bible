import {GetJson as GetJson} from "loadRequested.js";
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