$traceurRuntime.registerModule("loadRequested.js", [], function() {
  "use strict";
  var __moduleName = "loadRequested.js";
  var $__12 = $traceurRuntime.initGeneratorFunction(objectEntries);
  function objectEntries(obj) {
    var propKeys,
        $__6,
        $__7,
        $__8,
        $__4,
        $__3,
        propKey,
        $__9;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            propKeys = Object.keys(obj);
            $__6 = true;
            $__7 = false;
            $__8 = undefined;
            $ctx.state = 24;
            break;
          case 24:
            $ctx.pushTry(10, 11);
            $ctx.state = 13;
            break;
          case 13:
            $__4 = void 0, $__3 = (propKeys)[Symbol.iterator]();
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = (!($__6 = ($__4 = $__3.next()).done)) ? 5 : 7;
            break;
          case 4:
            $__6 = true;
            $ctx.state = 9;
            break;
          case 5:
            propKey = $__4.value;
            $ctx.state = 6;
            break;
          case 6:
            $ctx.state = 2;
            return [propKey, obj[propKey]];
          case 2:
            $ctx.maybeThrow();
            $ctx.state = 4;
            break;
          case 7:
            $ctx.popTry();
            $ctx.state = 11;
            $ctx.finallyFallThrough = -2;
            break;
          case 10:
            $ctx.popTry();
            $ctx.maybeUncatchable();
            $__9 = $ctx.storedException;
            $ctx.state = 16;
            break;
          case 16:
            $__7 = true;
            $__8 = $__9;
            $ctx.state = 11;
            $ctx.finallyFallThrough = -2;
            break;
          case 11:
            $ctx.popTry();
            $ctx.state = 22;
            break;
          case 22:
            try {
              if (!$__6 && $__3.return != null) {
                $__3.return();
              }
            } finally {
              if ($__7) {
                throw $__8;
              }
            }
            $ctx.state = 20;
            break;
          case 20:
            $ctx.state = $ctx.finallyFallThrough;
            break;
          default:
            return $ctx.end();
        }
    }, $__12, this);
  }
  var GetJson = function() {
    function GetJson(url) {
      if (!url)
        throw Error("An Argument is required");
      this.url = url;
    }
    return ($traceurRuntime.createClass)(GetJson, {loadJson: function() {
        var self = this;
        return new Promise(function(resolve, reject) {
          var xhr = new XMLHttpRequest(self.url);
          xhr.open('GET', self.url, true);
          xhr.addEventListener('readystatechange', function() {
            if ((xhr.status <= 300) && (xhr.readyState <= 4)) {
              try {
                resolve(JSON.parse(xhr.responseText));
              } catch (ex) {}
            } else {
              reject(Error("A Promise Error has occured"));
            }
          });
          xhr.send();
        });
      }}, {});
  }();
  var JumpToChapter = function() {
    function JumpToChapter() {
      var bibleGetChapters = document.querySelector('.bible-getChapters');
      this.bibleGetChapters = function() {
        return bibleGetChapters;
      };
    }
    return ($traceurRuntime.createClass)(JumpToChapter, {el: function() {
        return this.bibleGetChapters();
      }}, {});
  }();
  var Modal = function() {
    function Modal() {}
    return ($traceurRuntime.createClass)(Modal, {}, {
      extended: function(callback) {
        var qq = document.querySelector('.bible-cover');
        var modalChapters = document.querySelector('#bible-body');
        modalChapters.addEventListener('click', function(e) {
          var target = e.target;
          if (target.classList.toString().includes("bible-location")) {
            console.log('true');
            Modal.searchJson(target.textContent.replace(/\s+/g, ""));
            qq.removeAttribute('data-display');
          } else if (target.classList.toString().includes("bible-label-chapter")) {
            var currentOpenLocation = document.querySelector('.bible-book-name').innerHTML;
            Modal.searchJson(currentOpenLocation.replace(/\s+/g, ""));
            qq.removeAttribute('data-display');
          }
        });
        var getChaptersParent = document.querySelector('.bible-getChapters');
        var close = getChaptersParent.getElementsByClassName('bible-close')[0];
        close.addEventListener('click', function() {
          var chaptersParent = document.querySelector('.bible-getChapters-chaptersParent');
          var qq = document.querySelector('.bible-cover');
          if (!!chaptersParent)
            chaptersParent.remove();
          getChaptersParent.setAttribute("data-display", "none");
          qq.setAttribute('data-display', 'none');
        });
      },
      searchJson: function(testament) {
        var getChapters = new GetJson(("js/jsons/" + testament + ".json"));
        getChapters.loadJson().then(function(ch) {
          var $__10 = ch,
              book = $__10.book,
              chapters = $__10.chapters;
          var getChaptersParent = document.querySelector('.bible-getChapters');
          var bookName = document.querySelector('.bible-getChapters-book');
          bookName.innerHTML = book;
          var chaptersParent = document.createElement('ul');
          chaptersParent.setAttribute('class', 'bible-getChapters-chaptersParent');
          var removeChaptersParent = document.querySelector('.bible-getChapters-chaptersParent');
          if (!!removeChaptersParent) {
            removeChaptersParent.remove();
          }
          getChaptersParent.removeAttribute('data-display');
          getChaptersParent.appendChild(chaptersParent);
          Array.from(chapters, function(getchapters) {
            var $__11 = getchapters,
                chapter = $__11.chapter,
                verses = $__11.verses;
            var chapterNode = document.createElement('li');
            chapterNode.setAttribute('class', 'bible-getChapters-chapter');
            chaptersParent.appendChild(chapterNode);
            chapterNode.innerHTML = ("<div>\n                                    <p>CH.</p>\n                                    <p>" + chapter + "</p>\n                                  <div>");
          });
        });
      }
    });
  }();
  return {
    get objectEntries() {
      return objectEntries;
    },
    get GetJson() {
      return GetJson;
    },
    get JumpToChapter() {
      return JumpToChapter;
    },
    get Modal() {
      return Modal;
    }
  };
});
$traceurRuntime.registerModule("../traceur/concord.es6", [], function() {
  "use strict";
  var __moduleName = "../traceur/concord.es6";
  var $__19 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("loadRequested.js", "../traceur/concord.es6")),
      GetJson = $__19.GetJson,
      objectEntries = $__19.objectEntries;
  var Concord = function() {
    function Concord() {
      var concord = document.querySelector('.bible-concord');
      var concordModal = document.querySelector('#BibleConcord');
      var bibleCover = document.querySelector('.bible-cover');
      var close = document.querySelector('.bible-close');
      var search = document.querySelector('.bible-start-search');
      var bibleInput = document.querySelector('.bible-search-concord');
      var bibleHomeScreen = document.querySelector('.bible-home-screen');
      this.concord = function() {
        return concord;
      };
      this.concordModal = function() {
        return concordModal;
      };
      this.bibleCover = function() {
        return bibleCover;
      };
      this.close = function() {
        return close;
      };
      this.search = function() {
        return search;
      };
      this.bibleInput = function() {
        return bibleInput;
      };
      this.bibleHomeScreen = function() {
        return bibleHomeScreen;
      };
    }
    return ($traceurRuntime.createClass)(Concord, {
      showConcord: function() {
        var $__2 = this;
        this.concord().addEventListener('click', function(e) {
          $__2.concordModal().style["display"] = "flex";
          $__2.concordModal().setAttribute('data-location', 'bringdown');
        });
        return this;
      },
      closeModal: function() {
        var $__2 = this;
        this.close().addEventListener('click', function(e) {
          $__2.bibleCover().setAttribute('data-display', 'none');
          $__2.concordModal().style["display"] = "none";
        });
        return this;
      },
      searchText: function(concord) {
        var $__11,
            $__12;
        var $__2 = this;
        var q = 0;
        var qq = document.querySelector('.bible-rendered-on-page');
        if (qq) {
          qq.remove();
        }
        var renderOnPageParent = document.createElement('div');
        renderOnPageParent.setAttribute('class', 'bible-rendered-on-page');
        this.renderOnPageParent = function() {
          return renderOnPageParent;
        };
        var $__6 = true;
        var $__7 = false;
        var $__8 = undefined;
        try {
          for (var $__4 = void 0,
              $__3 = (objectEntries(concord))[Symbol.iterator](); !($__6 = ($__4 = $__3.next()).done); $__6 = true) {
            var $__10 = $__4.value,
                index = ($__11 = $__10[Symbol.iterator](), ($__12 = $__11.next()).done ? void 0 : $__12.value),
                nameOfLocation = ($__12 = $__11.next()).done ? void 0 : $__12.value;
            {
              nameOfLocation = nameOfLocation.replace(/\s/g, "");
              var getLocationConcord = new GetJson(("js/jsons/" + nameOfLocation + ".json"));
              getLocationConcord.loadJson().then(function(concord) {
                var $__15,
                    $__16;
                var $__13 = concord,
                    book = $__13.book,
                    chapters = $__13.chapters;
                var ifFound = false;
                var $__6 = true;
                var $__7 = false;
                var $__8 = undefined;
                try {
                  var $__18 = function() {
                    var $__14 = $__4.value,
                        index = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value),
                        versesValue = ($__16 = $__15.next()).done ? void 0 : $__16.value;
                    {
                      var $__17 = versesValue,
                          chapter = $__17.chapter,
                          verses = $__17.verses;
                      var userInput = $__2.bibleInput().value;
                      var userInpuRegex = new RegExp(userInput, "igm");
                      Array.from(verses, function(v) {
                        var verseNum = Object.getOwnPropertyNames(v);
                        var text = v[verseNum];
                        if (userInpuRegex.test(text)) {
                          $__2.renderSearch({
                            book: book,
                            chapter: chapter,
                            verseNum: verseNum,
                            text: text
                          });
                          ifFound = true;
                        }
                      });
                    }
                  };
                  for (var $__4 = void 0,
                      $__3 = (objectEntries(chapters))[Symbol.iterator](); !($__6 = ($__4 = $__3.next()).done); $__6 = true) {
                    $__18();
                  }
                } catch ($__9) {
                  $__7 = true;
                  $__8 = $__9;
                } finally {
                  try {
                    if (!$__6 && $__3.return != null) {
                      $__3.return();
                    }
                  } finally {
                    if ($__7) {
                      throw $__8;
                    }
                  }
                }
                ifFound = (ifFound ? false : ifFound);
              });
            }
          }
        } catch ($__9) {
          $__7 = true;
          $__8 = $__9;
        } finally {
          try {
            if (!$__6 && $__3.return != null) {
              $__3.return();
            }
          } finally {
            if ($__7) {
              throw $__8;
            }
          }
        }
      },
      searchConcord: function() {
        var $__2 = this;
        this.search().addEventListener('click', function(e) {
          e.preventDefault();
          if ($__2.bibleInput().value.length === 0) {
            return false;
          }
          $__2.concordModal().setAttribute('data-location', 'bringup');
          $__2.concordModal().style["display"] = "none";
          var getConcord = new GetJson("js/jsons/oldtestament.json");
          setTimeout(function() {
            getConcord.loadJson().then(function(concord) {
              $__2.searchText(concord);
              return new GetJson("js/jsons/newtestament.json");
            }).then(function(nt) {
              nt.loadJson().then(function(concord) {
                $__2.searchText(concord);
              });
            });
          }, 1000);
        });
      },
      renderSearch: function() {
        var foundSearch = arguments[0] !== (void 0) ? arguments[0] : {};
        if (Object.keys(foundSearch).length !== 0) {
          var $__10 = foundSearch,
              book = $__10.book,
              chapter = $__10.chapter,
              verseNum = $__10.verseNum,
              text = $__10.text;
          var rndPage = document.querySelector('.bible-rendered-on-page');
          if (Boolean(rndPage) === false) {
            Array.from(this.bibleHomeScreen().children, function(ch) {
              if (!ch.hasAttribute('data-display')) {
                ch.setAttribute('data-display', 'none');
              }
            });
            this.bibleHomeScreen().appendChild(this.renderOnPageParent());
          }
          var renderOnPage = document.createElement('div');
          var renderBookOnPage = document.createElement('p');
          renderBookOnPage.innerHTML = (book + " " + chapter + " vs " + verseNum[0]);
          var hideText = document.createElement('p');
          hideText.innerHTML = text;
          hideText.setAttribute('data-display', 'none');
          renderOnPage.setAttribute('class', 'bible-location');
          renderOnPage.appendChild(renderBookOnPage);
          renderOnPage.appendChild(hideText);
          this.renderOnPageParent().appendChild(renderOnPage);
          return;
        }
      }
    }, {StyleProp: function(testament, value) {}});
  }();
  var q = new Concord();
  q.showConcord().closeModal().searchConcord();
  return {};
});
$traceurRuntime.getModule("../traceur/concord.es6" + '');
