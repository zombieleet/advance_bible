module.exports.objectEntries =  function* objectEntries(obj) {
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

module.exports.SetStatusMessage = function SetStatusMessage(msg) {
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
module.exports.GetJson = class GetJson {
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
module.exports.JumpToChapter = class JumpToChapter {
    constructor() {
      let bibleGetChapters = document.querySelector('.bible-getChapters');
      this.bibleGetChapters = () => bibleGetChapters;
    }
    el() {
      return this.bibleGetChapters();
    }
}

module.exports.Modal =  class Modal {

  static extended(el) {

      let qq = document.querySelector('.bible-cover');
      console.log(el);
      el.addEventListener('click', e => {
          let target = e.target,
              bibleHeadCover = document.querySelector('.bible-head-cover');


          if ( target.classList.contains("bible-location") ) {
              Modal.searchJson(target.textContent.replace(/\s+/g, ""));
          } else {
            let currentOpenLocation = document.querySelector('.bible-book-name').innerHTML;
            Modal.searchJson(currentOpenLocation.replace(/\s+/g, ""));
          }
          
          qq.removeAttribute('data-display');
          bibleHeadCover.removeAttribute('data-display');
      })      



      // modalChapters.addEventListener('click', (e) => {
      //   let target = e.target;
      //   let bibleHeadCover = document.querySelector('.bible-head-cover');
      //   if ( target.classList.toString().includes("bible-location")) {
      //       Modal.searchJson(target.textContent.replace(/\s+/g, ""))
      //       qq.removeAttribute('data-display');
      //       bibleHeadCover.removeAttribute('data-display');
      //   } else if ( target.classList.toString().includes("bible-label-chapter") ) {
      //     let currentOpenLocation = document.querySelector('.bible-book-name').innerHTML;
      //     Modal.searchJson(currentOpenLocation.replace(/\s+/g, ""));
      //     qq.removeAttribute('data-display');
      //     bibleHeadCover.removeAttribute('data-display');
      //   }

      // });

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
