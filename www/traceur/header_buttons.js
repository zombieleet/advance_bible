const { Modal } = require("./loadRequested.js");
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
		elp.removeAttribute('style');
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


module.exports = HeaderButtons;
