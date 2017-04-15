$traceurRuntime.registerModule("../dep/loadRequested.js", [], function() {
  "use strict";
  var __moduleName = "../dep/loadRequested.js";
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
  function SetStatusMessage(msg) {
    if (((typeof msg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(msg))) !== 'string') {
      throw Error(("expected a string as an argument but got " + ((typeof msg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(msg)))));
    }
    var bibleRep = document.querySelector(".bible-report");
    bibleRep.innerHTML = msg;
    bibleRep.setAttribute('style', 'visibility: visible');
    setTimeout(function() {
      bibleRep.removeAttribute('style');
    }, 3000);
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
      extended: function(el) {
        var qq = document.querySelector('.bible-cover');
        console.log(el);
        el.addEventListener('click', function(e) {
          var target = e.target,
              bibleHeadCover = document.querySelector('.bible-head-cover');
          if (target.classList.contains("bible-location")) {
            Modal.searchJson(target.textContent.replace(/\s+/g, ""));
          } else {
            var currentOpenLocation = document.querySelector('.bible-book-name').innerHTML;
            Modal.searchJson(currentOpenLocation.replace(/\s+/g, ""));
          }
          qq.removeAttribute('data-display');
          bibleHeadCover.removeAttribute('data-display');
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
    get SetStatusMessage() {
      return SetStatusMessage;
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
$traceurRuntime.registerModule("../dep/bible.js", [], function() {
  "use strict";
  var __moduleName = "../dep/bible.js";
  var $__29 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./loadRequested.js", "../dep/bible.js")),
      JumpToChapter = $__29.JumpToChapter,
      objectEntries = $__29.objectEntries,
      GetJson = $__29.GetJson,
      Modal = $__29.Modal;
  var Audio = function() {
    function Audio() {}
    return ($traceurRuntime.createClass)(Audio, {}, {
      SetAudio: function() {
        var link = arguments[0];
        var audio = arguments[1];
        var info = arguments[2];
        if (link === undefined) {
          throw new Error("Link is Undefined");
        }
        if (HTMLAudioElement[Symbol.hasInstance](audio)) {
          var $__19 = info,
              book = $__19.book,
              chapter = $__19.chapter;
          var parent = document.querySelector('.bible-read-text');
          audio.setAttribute('src', link);
          Audio.CreateControls(parent, audio, book, chapter);
        }
      },
      CreateControls: function(parent, audio, book, chapter) {
        var divbtn = document.createElement('div');
        var ctrlBtn = document.createElement('div');
        var playbtn = document.createElement('button');
        playbtn.setAttribute('class', 'btn btn-success btn-xs  glyphicon glyphicon-play');
        var pausebtn = document.createElement('button');
        pausebtn.setAttribute('class', 'btn btn-success btn-xs  glyphicon glyphicon-pause');
        var stopbtn = document.createElement('button');
        stopbtn.setAttribute('class', 'btn btn-success btn-xs glyphicon glyphicon-stop');
        var bar = document.createElement('progress');
        bar.setAttribute('class', 'progress progress-bar-success');
        bar.setAttribute('value', audio.currentTime);
        bar.setAttribute('max', 300);
        divbtn.setAttribute('class', 'bible-audio-ctrlers pull-right');
        ctrlBtn.setAttribute('class', 'audioctrlers');
        ctrlBtn.appendChild(playbtn);
        ctrlBtn.appendChild(pausebtn);
        ctrlBtn.appendChild(stopbtn);
        divbtn.appendChild(ctrlBtn);
        divbtn.appendChild(audio);
        document.querySelector('.bible-read-text').appendChild(divbtn);
        var ctrlers = document.querySelectorAll('.bible-audio-ctrlers');
        if (ctrlers.length > 1) {
          ctrlers[ctrlers.length - 1].remove();
        }
        Audio.ControlsListener(audio, {
          playbtn: playbtn,
          pausebtn: pausebtn,
          stopbtn: stopbtn,
          bar: bar
        }, book, chapter);
      },
      IncrementAudioBar: function(bar, audio) {
        bar.setAttribute('value', audio.currentTime);
      },
      ControlsListener: function(audio, btnlisteners, book, chapter) {
        var $__19 = btnlisteners,
            playbtn = $__19.playbtn,
            pausebtn = $__19.pausebtn,
            stopbtn = $__19.stopbtn,
            bar = $__19.bar;
        playbtn.addEventListener('click', function(evt) {
          var target = evt.target;
          if (target.disabled) {
            return false;
          }
          if (!audio.ended) {
            audio.play();
            audio.addEventListener('timeupdate', function(evt) {
              var target = evt.target;
              if (audio.ended) {
                chapter["chapter"] = (Number(chapter["chapter"]) + 1);
                GetBible.StyleBible(book, chapter);
                return;
              }
              Audio.IncrementAudioBar(bar, target);
            });
            target.setAttribute('class', playbtn.getAttribute('class') + " disabled");
            pausebtn.setAttribute('class', pausebtn.getAttribute('class').replace('disabled', ''));
            return;
          }
        });
        pausebtn.addEventListener('click', function(evt) {
          var target = evt.target;
          if (!audio.ended) {
            audio.pause();
            target.setAttribute('class', pausebtn.getAttribute('class') + " disabled");
            playbtn.setAttribute('class', playbtn.getAttribute('class').replace('disabled', ''));
          }
        });
        stopbtn.addEventListener('click', function(evt) {
          var target = evt.target;
          if (!audio.ended) {
            audio.currentTime = 0;
            audio.pause();
            playbtn.setAttribute('class', playbtn.getAttribute('class').replace('disabled', ''));
            pausebtn.setAttribute('class', pausebtn.getAttribute('class').replace('disabled', ''));
          }
        });
      }
    });
  }();
  var HeaderButtons = function() {
    function HeaderButtons() {}
    return ($traceurRuntime.createClass)(HeaderButtons, {}, {
      render: function() {
        var $__20;
        var header = document.querySelector('.bible-read-text');
        var header_Menu = document.createElement('div');
        var genLink = HeaderButtons.createMenuLinks(["select chapter", "select version", "select language"]);
        var $__19 = genLink.next(),
            done = $__19.done,
            value = $__19.value;
        var headerul = HeaderButtons.createUnderList();
        header_Menu.setAttribute('class', 'bible-menu-header');
        header.appendChild(header_Menu);
        header_Menu.appendChild(HeaderButtons.createElipsis(headerul));
        header_Menu.appendChild(headerul);
        while (!done) {
          var _value = value.replace(/\s+/, ''),
              links = HeaderButtons[_value]();
          links.innerHTML = value;
          links.setAttribute('class', 'bible-elipsis-link');
          headerul.appendChild(links);
          (($__20 = genLink.next(), done = $__20.done, value = $__20.value, $__20));
        }
      },
      createMenuLinks: $traceurRuntime.initGeneratorFunction(function $__28(links) {
        var $__8,
            $__9,
            $__10,
            $__6,
            $__5,
            _l,
            $__11;
        return $traceurRuntime.createGeneratorInstance(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                $__8 = true;
                $__9 = false;
                $__10 = undefined;
                $ctx.state = 24;
                break;
              case 24:
                $ctx.pushTry(10, 11);
                $ctx.state = 13;
                break;
              case 13:
                $__6 = void 0, $__5 = (links)[Symbol.iterator]();
                $ctx.state = 9;
                break;
              case 9:
                $ctx.state = (!($__8 = ($__6 = $__5.next()).done)) ? 5 : 7;
                break;
              case 4:
                $__8 = true;
                $ctx.state = 9;
                break;
              case 5:
                _l = $__6.value;
                $ctx.state = 6;
                break;
              case 6:
                $ctx.state = 2;
                return _l;
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
                $__11 = $ctx.storedException;
                $ctx.state = 16;
                break;
              case 16:
                $__9 = true;
                $__10 = $__11;
                $ctx.state = 11;
                $ctx.finallyFallThrough = -2;
                break;
              case 11:
                $ctx.popTry();
                $ctx.state = 22;
                break;
              case 22:
                try {
                  if (!$__8 && $__5.return != null) {
                    $__5.return();
                  }
                } finally {
                  if ($__9) {
                    throw $__10;
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
        }, $__28, this);
      }),
      createUnderList: function() {
        var header_ul = document.createElement('ul');
        header_ul.setAttribute('class', 'bible-elipsis-parent');
        return header_ul;
      },
      createElipsis: function(elp) {
        var elipsis = document.createElement('span');
        elipsis.setAttribute('class', 'fa fa-ellipsis-v bible-elipsis');
        elipsis.addEventListener('click', function() {
          if (elp.hasAttribute('style')) {
            elp.removeAttribute('style');
            return;
          }
          elp.setAttribute('style', 'display: block;');
        });
        return elipsis;
      },
      selectchapter: function() {
        var openChapter = document.createElement('li');
        Modal.extended(openChapter);
        return openChapter;
      },
      selectversion: function() {
        var selectVersionDropDown = document.createElement('li');
        return selectVersionDropDown;
      },
      selectlanguage: function() {
        var selectLanguageDropdown = document.createElement('li');
        return selectLanguageDropdown;
      }
    });
  }();
  var GetBible = function() {
    function GetBible() {
      var bibleTestament = document.querySelector('.bible-testament');
      this.bibleTestament = function() {
        return bibleTestament;
      };
    }
    return ($traceurRuntime.createClass)(GetBible, {
      navigateChapters: function(bc, i) {
        var homeScreen = document.querySelector('.bible-home-screen');
        homeScreen.addEventListener('click', function(e) {
          var target = e.target;
          if (target.classList.toString().includes("bible-go-right")) {
            if (document.querySelector('.bible-read-text')) {
              document.querySelector('.bible-read-text').remove();
            }
            try {
              var bibleReadText = document.createElement('div');
              bibleReadText.setAttribute('class', 'bible-read-text');
              homeScreen.appendChild(bibleReadText);
              i = ++i;
              if (bc.chapters[i] === undefined) {
                i = 0;
                GetBible.StyleBible(bc["book"], bc.chapters[i]);
                return;
              }
              GetBible.StyleBible(bc["book"], bc.chapters[i]);
            } catch (ex) {}
          } else if (target.classList.toString().includes("bible-go-left")) {
            if (document.querySelector('.bible-read-text')) {
              document.querySelector('.bible-read-text').remove();
            }
            bibleReadText = document.createElement('div');
            bibleReadText.setAttribute('class', 'bible-read-text');
            homeScreen.appendChild(bibleReadText);
            if (bc.chapters[+-(-i) - 1] === undefined) {
              i = 0;
              GetBible.StyleBible(bc["book"], bc.chapters[i]);
              return;
            }
            GetBible.StyleBible(bc["book"], bc.chapters[+-(-i) - 1]);
            i = --i;
          }
        });
      },
      getBible: function() {
        var $__3 = this;
        this.bibleTestament().addEventListener('click', function(e) {
          var target = e.target;
          var homeScreen = document.querySelector('.bible-home-screen');
          if (target.classList.toString().includes("bible-location")) {
            var textContent = target.textContent.replace(/\s+/g, "");
            var bibleChapters = new GetJson(("js/jsons/" + textContent + ".json"));
            target.parentNode.remove();
            var bibleReadText = document.createElement('div');
            bibleReadText.setAttribute('class', 'bible-read-text');
            var removeBibleReadText = homeScreen.getElementsByClassName('bible-read-text')[0];
            if (removeBibleReadText !== undefined) {
              removeBibleReadText.remove();
            }
            homeScreen.appendChild(bibleReadText);
            bibleChapters.loadJson().then(function(bc) {
              var i = 0;
              GetBible.StyleBible(bc["book"], bc.chapters[i]);
              $__3.navigateChapters(bc, i);
              var el = new JumpToChapter();
              el.el().addEventListener('click', function(e) {
                var target = e.target;
                var match = target.textContent.match(/\d+/g) || target.textContent.match(/CH\./);
                if (match && (target.nodeName.toLowerCase() === "p")) {
                  if (match[0] === "CH.") {
                    target = target.nextElementSibling;
                    i = Number(target.innerHTML) - 1;
                    GetBible.StyleBible(bc["book"], bc.chapters[i]);
                  }
                }
              });
            });
          }
        });
      }
    }, {
      SetStatusMessage: function(msg) {
        if (((typeof msg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(msg))) !== 'string') {
          throw Error(("expected a string as an argument but got " + ((typeof msg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(msg)))));
        }
        var bibleRep = document.querySelector(".bible-report");
        bibleRep.innerHTML = msg;
        bibleRep.setAttribute('style', 'visibility: visible');
        setTimeout(function() {
          bibleRep.removeAttribute('style');
        }, 3000);
      },
      Settings: function() {
        return {
          fontSize: localStorage.getItem("font-size"),
          fontStyle: localStorage.getItem("font-family"),
          audio: localStorage.getItem("sound-state"),
          volume: localStorage.getItem("sound-level"),
          textcolor: localStorage.getItem("text-color"),
          bgcolor: localStorage.getItem("background-color")
        };
      },
      StyleBible: function(book, chapter) {
        var $__20,
            $__21;
        var homeScreen = document.querySelector('.bible-home-screen');
        var bibleReadText = document.createElement('div');
        bibleReadText.setAttribute('class', 'bible-read-text');
        var removeBibleReadText = homeScreen.getElementsByClassName('bible-read-text')[0];
        if (removeBibleReadText) {
          removeBibleReadText.remove();
        }
        homeScreen.appendChild(bibleReadText);
        var parent = document.querySelector('.bible-read-text');
        var backward = document.createElement('span');
        var forward = document.createElement('span');
        var bookParent = document.createElement('div');
        var bookName = document.createElement('h3');
        var bookChapter = document.createElement('h5');
        bookParent.setAttribute('class', 'bible-book-parent');
        HeaderButtons.render();
        backward.setAttribute('class', 'fa fa-arrow-circle-o-right bible-go-right');
        forward.setAttribute('class', 'fa fa-arrow-circle-o-left bible-go-left');
        bookName.textContent = book;
        bookChapter.textContent = ("Chapter " + chapter["chapter"]);
        bookName.setAttribute('class', 'bible-book-name');
        parent.appendChild(backward);
        parent.appendChild(forward);
        parent.appendChild(bookParent);
        bookParent.appendChild(bookName);
        bookParent.appendChild(bookChapter);
        var bibleSettingsValues = GetBible.Settings();
        parent.style["font-size"] = bibleSettingsValues.fontSize + "px";
        parent.style["font-family"] = bibleSettingsValues.fontStyle;
        parent.style["color"] = bibleSettingsValues.textcolor;
        parent.style["background-color"] = bibleSettingsValues.bgcolor;
        var setState = false;
        var BOOKMARK = JSON.parse(localStorage.getItem('___BIBLE-BOOKMARK___'));
        var $__15 = true;
        var $__16 = false;
        var $__17 = undefined;
        try {
          for (var $__13 = void 0,
              $__12 = (chapter["verses"])[Symbol.iterator](); !($__15 = ($__13 = $__12.next()).done); $__15 = true) {
            var verses = $__13.value;
            {
              var $__8 = true;
              var $__9 = false;
              var $__10 = undefined;
              try {
                for (var $__6 = void 0,
                    $__5 = (objectEntries(verses))[Symbol.iterator](); !($__8 = ($__6 = $__5.next()).done); $__8 = true) {
                  var $__19 = $__6.value,
                      versenum = ($__20 = $__19[Symbol.iterator](), ($__21 = $__20.next()).done ? void 0 : $__21.value),
                      versetext = ($__21 = $__20.next()).done ? void 0 : $__21.value;
                  {
                    var readParent = document.createElement('div');
                    readParent.setAttribute('class', 'bible-verse-text');
                    var verseNum = document.createElement('span');
                    var verseText = document.createElement('span');
                    var bookMark = document.createElement('span');
                    bookMark.setAttribute('class', 'fa fa-bookmark bible-bookmark-icon bible-not-bookmarked');
                    verseNum.textContent = versenum;
                    verseText.textContent = versetext;
                    readParent.appendChild(verseNum);
                    readParent.appendChild(verseText);
                    readParent.appendChild(bookMark);
                    parent.appendChild(readParent);
                    try {
                      if (BOOKMARK)
                        GetBible.BookMark({
                          bookMark: bookMark,
                          versenum: versenum,
                          versetext: versetext,
                          BOOKMARK: BOOKMARK
                        });
                    } catch (ex) {}
                    ;
                    bookMark.addEventListener('click', function(e) {
                      var target = e.target;
                      if (target.classList.contains('bible-bookmarked')) {
                        target.classList.remove('bible-bookmarked');
                        target.classList.add('bible-not-bookmarked');
                        GetBible.UnSaveBookMarked(target.parentNode);
                        return;
                      }
                      target.classList.remove('bible-not-bookmarked');
                      target.classList.add('bible-bookmarked');
                      GetBible.SaveBookMarked(target.parentNode);
                    });
                    if (!setState) {
                      setState = true;
                      readParent.setAttribute('data-set-bg', 'true');
                      continue;
                    }
                    setState = false;
                    readParent.setAttribute('data-set-bg', 'false');
                  }
                }
              } catch ($__11) {
                $__9 = true;
                $__10 = $__11;
              } finally {
                try {
                  if (!$__8 && $__5.return != null) {
                    $__5.return();
                  }
                } finally {
                  if ($__9) {
                    throw $__10;
                  }
                }
              }
            }
          }
        } catch ($__18) {
          $__16 = true;
          $__17 = $__18;
        } finally {
          try {
            if (!$__15 && $__12.return != null) {
              $__12.return();
            }
          } finally {
            if ($__16) {
              throw $__17;
            }
          }
        }
        if (bibleSettingsValues.audio === 'yes') {
          var audiobook = book.replace(/\s+/, '');
          var audioBible = fetch(("audios/KJV/" + audiobook + "/" + audiobook + chapter["chapter"] + ".mp3"));
          audioBible.then(function(data) {
            return data.url;
          }).then(function(src) {
            var audio = document.createElement('audio');
            Audio.SetAudio(src, audio, {
              book: book,
              chapter: chapter
            });
          });
        }
      },
      BookMark: function($__19) {
        var $__22,
            $__23,
            $__24,
            $__25,
            $__26;
        var $__20 = $__19,
            bookMark = $__20.bookMark,
            versenum = $__20.versenum,
            versetext = $__20.versetext,
            BOOKMARK = $__20.BOOKMARK;
        var _p = GetBible.IsBookMarked(BOOKMARK);
        var $__21 = _p.next().value,
            value = ($__22 = $__21[Symbol.iterator](), ($__23 = $__22.next()).done ? void 0 : $__23.value),
            location = ($__23 = $__22.next()).done ? void 0 : $__23.value;
        while (value != null) {
          var _joinedValue = versenum + versetext.replace(/\s/g, '_');
          if (_joinedValue === value) {
            bookMark.classList.add('bible-bookmarked');
            bookMark.classList.remove('bible-not-bookmarked');
          }
          ($__24 = _p.next().value, value = ($__25 = $__24[Symbol.iterator](), ($__26 = $__25.next()).done ? void 0 : $__26.value), location = ($__26 = $__25.next()).done ? void 0 : $__26.value, $__24);
        }
      },
      SaveBookMarked: function(newbookmark) {
        var $__21,
            $__22;
        var $__4;
        var getPrevItem = JSON.parse(localStorage.getItem('___BIBLE-BOOKMARK___'));
        var isTrueFalse = (getPrevItem) ? true : false;
        var bookmark = {};
        var textContent = newbookmark.textContent;
        var ____ = [textContent.match(/^\d+/)[0], textContent.replace(/^\d+/, ''), newbookmark.parentElement.querySelector('h3').textContent + " " + newbookmark.parentElement.querySelector('h5')];
        var $__20 = $traceurRuntime.spread(____),
            verseNum = ($__21 = $__20[Symbol.iterator](), ($__22 = $__21.next()).done ? void 0 : $__22.value),
            verseText = ($__22 = $__21.next()).done ? void 0 : $__22.value,
            location = ($__22 = $__21.next()).done ? void 0 : $__22.value;
        var obj = ($__4 = {}, Object.defineProperty($__4, ("" + textContent.replace(/\s/g, '_')), {
          value: {
            verseNum: verseNum,
            verseText: verseText,
            location: location
          },
          configurable: true,
          enumerable: true,
          writable: true
        }), $__4);
        if (!isTrueFalse) {
          Object.assign(bookmark, obj);
          localStorage.setItem('___BIBLE-BOOKMARK___', JSON.stringify(bookmark));
          GetBible.SetStatusMessage('bookmark has been added');
          return;
        }
        Object.assign(bookmark, getPrevItem, obj);
        localStorage.setItem('___BIBLE-BOOKMARK___', JSON.stringify(bookmark));
        GetBible.SetStatusMessage('bookmark has been added');
      },
      UnSaveBookMarked: function(remnewbookmark) {
        var bookmarkStorage = JSON.parse(localStorage.getItem("___BIBLE-BOOKMARK___"));
        var textContent = remnewbookmark.textContent;
        var name = ("" + textContent.replace(/\s/g, '_'));
        delete bookmarkStorage[name];
        localStorage.setItem("___BIBLE-BOOKMARK___", JSON.stringify(bookmarkStorage));
      },
      IsBookMarked: $traceurRuntime.initGeneratorFunction(function $__28(BOOKMARK) {
        var $__20,
            $__21,
            $__8,
            $__9,
            $__10,
            $__6,
            $__5,
            $__19,
            i,
            BOOKMARK$__27,
            location,
            $__11;
        return $traceurRuntime.createGeneratorInstance(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                $__8 = true;
                $__9 = false;
                $__10 = undefined;
                $ctx.state = 26;
                break;
              case 26:
                $ctx.pushTry(12, 13);
                $ctx.state = 15;
                break;
              case 15:
                $__6 = void 0, $__5 = (objectEntries(BOOKMARK))[Symbol.iterator]();
                $ctx.state = 11;
                break;
              case 11:
                $ctx.state = (!($__8 = ($__6 = $__5.next()).done)) ? 7 : 9;
                break;
              case 4:
                $__8 = true;
                $ctx.state = 11;
                break;
              case 7:
                $__19 = $__6.value, i = ($__20 = $__19[Symbol.iterator](), ($__21 = $__20.next()).done ? void 0 : $__21.value), BOOKMARK$__27 = ($__21 = $__20.next()).done ? void 0 : $__21.value;
                $ctx.state = 8;
                break;
              case 8:
                location = BOOKMARK$__27.location;
                $ctx.state = 6;
                break;
              case 6:
                $ctx.state = 2;
                return [i, location];
              case 2:
                $ctx.maybeThrow();
                $ctx.state = 4;
                break;
              case 9:
                $ctx.popTry();
                $ctx.state = 13;
                $ctx.finallyFallThrough = -2;
                break;
              case 12:
                $ctx.popTry();
                $ctx.maybeUncatchable();
                $__11 = $ctx.storedException;
                $ctx.state = 18;
                break;
              case 18:
                $__9 = true;
                $__10 = $__11;
                $ctx.state = 13;
                $ctx.finallyFallThrough = -2;
                break;
              case 13:
                $ctx.popTry();
                $ctx.state = 24;
                break;
              case 24:
                try {
                  if (!$__8 && $__5.return != null) {
                    $__5.return();
                  }
                } finally {
                  if ($__9) {
                    throw $__10;
                  }
                }
                $ctx.state = 22;
                break;
              case 22:
                $ctx.state = $ctx.finallyFallThrough;
                break;
              default:
                return $ctx.end();
            }
        }, $__28, this);
      })
    });
  }();
  return {get GetBible() {
      return GetBible;
    }};
});
$traceurRuntime.registerModule("../traceur/nav.es6", [], function() {
  "use strict";
  var __moduleName = "../traceur/nav.es6";
  var $__15 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../dep/loadRequested.js", "../traceur/nav.es6")),
      GetJson = $__15.GetJson,
      objectEntries = $__15.objectEntries,
      Modal = $__15.Modal;
  var GetBible = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../dep/bible.js", "../traceur/nav.es6")).GetBible;
  var IconBar = function() {
    function IconBar() {
      var $__4 = this;
      var iconBar = document.querySelector('.fa-bars');
      var noDisplay = document.querySelector('.bible-cover');
      var bibleNavItemParent = document.querySelector('.bible-nav');
      var homeScreen = document.querySelector('.bible-home-screen');
      noDisplay.addEventListener('click', function(e) {
        var target = e.target;
        var rmModal = document.querySelector("[data-remove-modal='remove']");
        target.setAttribute('data-display', 'none');
        homeScreen.removeAttribute('data-reduce-size');
        $__4.bibleNavItemParent().removeAttribute('data-open-bar');
        $__4.bibleNavItemParent().setAttribute('data-close-bar', 'closebar');
        Array.from(document.querySelectorAll("[data-remove-modal='remove']"), function(tt) {
          console.log(tt);
        });
      });
      this.iconBar = function() {
        return iconBar;
      };
      this.noDisplay = function() {
        return noDisplay;
      };
      this.homeScreen = function() {
        return homeScreen;
      };
      this.bibleNavItemParent = function() {
        return bibleNavItemParent;
      };
    }
    return ($traceurRuntime.createClass)(IconBar, {openIconBar: function() {
        var $__4 = this;
        this.iconBar().addEventListener('click', function(e) {
          var target = e.target;
          var bibleNavItemParent = document.querySelector('.bible-nav');
          var homeScreen = document.querySelector('.bible-home-screen');
          if (!bibleNavItemParent.hasAttribute('data-open-bar')) {
            $__4.noDisplay().removeAttribute('data-display');
            $__4.homeScreen().setAttribute('data-reduce-size', 'reducesize');
            bibleNavItemParent.setAttribute('data-open-bar', 'openbar');
            bibleNavItemParent.removeAttribute('data-close-bar');
            return;
          }
          $__4.noDisplay().setAttribute('data-display', 'none');
          $__4.homeScreen().removeAttribute('data-reduce-size');
          $__4.bibleNavItemParent().removeAttribute('data-open-bar');
          $__4.bibleNavItemParent().setAttribute('data-close-bar', 'closebar');
        });
      }}, {});
  }();
  var icBar = new IconBar();
  icBar.openIconBar();
  var NavNavigation = function() {
    function NavNavigation() {
      var bibleNavItemParent = document.querySelector('.bible-nav-list');
      this.bibleNavItemParent = function() {
        return bibleNavItemParent;
      };
    }
    return ($traceurRuntime.createClass)(NavNavigation, {navigate: function() {
        this.bibleNavItemParent().addEventListener('click', function(e) {
          var target = e.target;
          var homeScreen = document.querySelector(".bible-home-screen");
          var targetElement = target.classList.toString().includes("bible-nav-item") || target.parentNode.classList.toString().includes("bible-nav-item");
          if (targetElement) {
            var targetEl = target.parentNode.nodeName.toLowerCase() === "li" ? target.parentNode : target;
            var showElement = targetEl.getAttribute('data-target');
            var homeScreenChild = homeScreen.getElementsByClassName(showElement)[0];
            if (!homeScreenChild)
              return;
            if (homeScreenChild.hasAttribute('data-display')) {
              Array.from(homeScreen.children, function(children) {
                if (!children.hasAttribute('data-display') && !HTMLImageElement[Symbol.hasInstance](children)) {
                  children.setAttribute('data-display', 'none');
                }
              });
              homeScreenChild.removeAttribute('data-display');
              if (homeScreenChild.getAttribute('class') === "bible-ot") {
                var getOldTestament = new GetJson("js/jsons/oldtestament.json");
                getOldTestament.loadJson().then(function(ot) {
                  NavNavigation.PlaceLocationInDom(ot, ".bible-ot");
                  NavNavigation.BibleChapters();
                  Array.from(document.querySelectorAll(".bible-location"), function(el) {
                    Modal.extended(el);
                  });
                });
              } else if (homeScreenChild.getAttribute('class') === "bible-newt") {
                var getNewTestament = new GetJson("js/jsons/newtestament.json");
                getNewTestament.loadJson().then(function(nt) {
                  NavNavigation.PlaceLocationInDom(nt, ".bible-newt");
                  NavNavigation.BibleChapters();
                  Array.from(document.querySelectorAll(".bible-location"), function(el) {
                    Modal.extended(el);
                  });
                });
              }
            }
          }
        });
      }}, {
      BibleChapters: function() {
        var bible = new GetBible();
        var bibleChapters = bible.getBible();
        return bibleChapters;
      },
      PlaceLocationInDom: function(testament, bibleType) {
        var $__13,
            $__14;
        var bibleChoice = document.querySelector(bibleType);
        var homeScreen = document.querySelector('.bible-home-screen');
        var testaMentParent = document.createElement('ul');
        testaMentParent.setAttribute('class', 'bible-testament');
        if (bibleChoice) {
          bibleChoice.setAttribute('data-display', 'none');
          var removeTestamentParent = homeScreen.getElementsByClassName('bible-testament')[0];
          if (removeTestamentParent !== undefined) {
            removeTestamentParent.remove();
          }
          homeScreen.appendChild(testaMentParent);
          var $__8 = true;
          var $__9 = false;
          var $__10 = undefined;
          try {
            for (var $__6 = void 0,
                $__5 = (objectEntries(testament))[Symbol.iterator](); !($__8 = ($__6 = $__5.next()).done); $__8 = true) {
              var $__12 = $__6.value,
                  otKey = ($__13 = $__12[Symbol.iterator](), ($__14 = $__13.next()).done ? void 0 : $__14.value),
                  otValue = ($__14 = $__13.next()).done ? void 0 : $__14.value;
              {
                var location = document.createElement('li');
                ;
                location.setAttribute('class', 'bible-location');
                location.innerHTML = ("" + otValue);
                testaMentParent.appendChild(location);
              }
            }
          } catch ($__11) {
            $__9 = true;
            $__10 = $__11;
          } finally {
            try {
              if (!$__8 && $__5.return != null) {
                $__5.return();
              }
            } finally {
              if ($__9) {
                throw $__10;
              }
            }
          }
        }
      }
    });
  }();
  var navigationNavigate = new NavNavigation();
  navigationNavigate.navigate();
  var ToggleConcord = function() {
    function ToggleConcord() {
      var concordNav = document.querySelector('.concord-nav');
      this.concordNav = function() {
        return concordNav;
      };
    }
    return ($traceurRuntime.createClass)(ToggleConcord, {toggleConcord: function() {
        this.concordNav().addEventListener('click', function(e) {
          var target = e.target;
          var bibleNavConcord = document.querySelector('.bible-nav-concord');
          if (!target.classList.toString().includes("bible-nav-item")) {
            if (bibleNavConcord.hasAttribute('style')) {
              bibleNavConcord.removeAttribute('style');
              return;
            }
            bibleNavConcord.setAttribute('style', 'display: block');
            return;
          }
        });
      }}, {});
  }();
  var SetActive = function() {
    function SetActive() {
      var bibleNavList = document.querySelector('.bible-nav-list');
      this.bibleNavList = function() {
        return bibleNavList;
      };
    }
    return ($traceurRuntime.createClass)(SetActive, {active: function() {
        var $__4 = this;
        this.bibleNavList().addEventListener('click', function(e) {
          var target = e.target;
          var nodeName = e.target.nodeName.toLowerCase();
          target = (nodeName === 'li') ? target : target.parentNode;
          Array.from($__4.bibleNavList().children, function(element) {
            if (element.hasAttribute('data-active-click')) {
              element.removeAttribute('data-active-click');
              if (element.hasAttribute('data-override'))
                element.removeAttribute('data-override');
            }
            target.setAttribute('data-active-click', 'true');
          });
        });
      }}, {});
  }();
  ;
  (function() {
    var ss = new SetActive();
    ss.active();
    var toggleC = new ToggleConcord();
    toggleC.toggleConcord();
  }());
  return {};
});
$traceurRuntime.getModule("../traceur/nav.es6" + '');
