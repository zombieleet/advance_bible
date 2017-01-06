export function* objectEntries(obj) {
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
export class GetJson {
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
export class JumpToChapter {
    constructor() {
      let bibleGetChapters = document.querySelector('.bible-getChapters');
      this.bibleGetChapters = () => bibleGetChapters;
    }
    el() {
      return this.bibleGetChapters();
    }
}

export class Modal {
  static extended(callback) {

      let qq = document.querySelector('.bible-cover');
      let modalChapters = document.querySelector('#bible-body');

      modalChapters.addEventListener('click', (e) => {
        let target = e.target;

        if ( target.classList.toString().includes("bible-location")) {
            Modal.searchJson(target.textContent.replace(/\s+/g, ""))
            qq.removeAttribute('data-display');
        }
      });

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
