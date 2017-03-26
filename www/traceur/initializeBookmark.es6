import { _bookMark as BookMark } from "../dep/bookmark.js"
class InitBookMark {
	static Fire() {
		let _el = document.querySelector('[data-target="bible-bookmark"]');
		_el.addEventListener('click', () => {
			BookMark.init();
		})
	}
}
InitBookMark.Fire();