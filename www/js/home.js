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
    return ($traceurRuntime.createClass)(JumpToChapter, {moveTo: function() {
        this.bibleGetChapters().addEventListener('click', function(e) {
          var target = e.target;
          var match = target.textContent.match(/\d+/g) || target.textContent.match(/CH\./);
          if (match && (target.nodeName.toLowerCase() === "p")) {
            if (match[0] === "CH.") {
              target = target.nextElementSibling;
            }
          }
        });
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
            Modal.searchJson(target.textContent.replace(/\s+/g, ""));
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
$traceurRuntime.registerModule("audio.js", [], function() {
  "use strict";
  var __moduleName = "audio.js";
  var Audio = function() {
    function Audio() {}
    return ($traceurRuntime.createClass)(Audio, {}, {
      SetAudio: function() {
        var link = arguments[0];
        var audio = arguments[1];
        if (link === undefined) {
          throw new Error("Link is Undefined");
        }
        if (HTMLAudioElement[Symbol.hasInstance](audio)) {
          Audio.CreaetControls(audio);
          audio.play();
        }
      },
      CreateControls: function(audio) {
        var parent = document.querySelector('.bible-read-text');
        var playbtn = document.createElement('button');
        playbtn.setAttribute('class', 'btn btn-default btn-lg');
        var pausebtn = document.createElement('button');
        pausebtn.setAttribute('class', 'btn btn-default btn-lg');
        var stopbtn = document.createElement('button');
        stopbtn.setAttribute('class', 'btn btn-default btn-lg');
        var bar = document.createElement('progress');
        bar.setAttribute('value', audio.currentTime);
        bar.setAttribute('max', audio.duration);
        parent.appendChild(playbtn);
        parent.appendChild(pausebtn);
        parent.appendChild(stopbtn);
        parent.appendChild(bar);
        Audio.ControlsListener({
          playbtn: playbtn,
          pausebtn: pausebtn,
          stopbtn: stopbtn
        });
      },
      IncrementAudioBar: function(bar) {
        console.log(bar);
      },
      ControlsListener: function(btnlisteners) {
        var $__2 = btnlisteners,
            playbtn = $__2.playbtn,
            pausebtn = $__2.pausebtn,
            stopbtn = $__2.stopbtn;
        playbtn.addEventListener('click', function(evt) {
          var target = evt.target;
          if (target.disabled) {
            return false;
          }
          if (audio.ended) {
            audio.play().then(function() {
              var bar = document.querySelector('progress');
              Audio.IncrementAudioBar(bar);
            });
          }
        });
      }
    });
  }();
  return {get Audio() {
      return Audio;
    }};
});
$traceurRuntime.registerModule("bible.js", [], function() {
  "use strict";
  var __moduleName = "bible.js";
  var $__19 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("loadRequested.js", "bible.js")),
      JumpToChapter = $__19.JumpToChapter,
      objectEntries = $__19.objectEntries,
      GetJson = $__19.GetJson;
  var Audio = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("audio.js", "bible.js")).Audio;
  var GetBible = function() {
    function GetBible() {
      var bibleTestament = document.querySelector('.bible-testament');
      this.bibleTestament = function() {
        return bibleTestament;
      };
    }
    return ($traceurRuntime.createClass)(GetBible, {getBible: function() {
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
              var q = new JumpToChapter();
              console.log(q.moveTo());
              var i = 0;
              GetBible.StyleBible(bc["book"], bc.chapters[i]);
              homeScreen.addEventListener('click', function(e) {
                var target = e.target;
                if (target.classList.toString().includes("bible-go-right")) {
                  if (document.querySelector('.bible-read-text')) {
                    document.querySelector('.bible-read-text').remove();
                  }
                  try {
                    bibleReadText = document.createElement('div');
                    bibleReadText.setAttribute('class', 'bible-read-text');
                    homeScreen.appendChild(bibleReadText);
                    i = ++i;
                    if (bc.chapters[i] === undefined) {
                      i = 0;
                      GetBible.StyleBible(bc["book"], bc.chapters[i]);
                    }
                    if ((i + 1) === bc.chapters.length) {
                      GetBible.StyleBible(bc["book"], bc.chapters[i]);
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
            });
          }
        });
      }}, {StyleBible: function(book, chapter) {
        var $__17,
            $__18;
        var parent = document.querySelector('.bible-read-text');
        var backward = document.createElement('span');
        var forward = document.createElement('span');
        var bookParent = document.createElement('div');
        var bookName = document.createElement('h3');
        var bookChapter = document.createElement('h5');
        backward.setAttribute('class', 'fa fa-arrow-left bible-go-left');
        forward.setAttribute('class', 'fa fa-arrow-right bible-go-right');
        bookName.textContent = book;
        bookChapter.textContent = ("Chapter " + chapter["chapter"]);
        parent.appendChild(backward);
        parent.appendChild(forward);
        parent.appendChild(bookParent);
        bookParent.appendChild(bookName);
        bookParent.appendChild(bookChapter);
        var bibleSettingsValues = {
          fontSize: localStorage.getItem("font-size"),
          fontStyle: localStorage.getItem("font-family"),
          audio: localStorage.getItem("sound-state"),
          volume: localStorage.getItem("sound-level"),
          textcolor: localStorage.getItem("text-color"),
          bgcolor: localStorage.getItem("background-color")
        };
        parent.style["font-size"] = bibleSettingsValues.fontSize + "px";
        parent.style["font-family"] = bibleSettingsValues.fontStyle;
        parent.style["color"] = bibleSettingsValues.textcolor;
        parent.style["background-color"] = bibleSettingsValues.bgcolor;
        if (bibleSettingsValues.audio === 'yes') {
          console.log(book);
        }
        var $__12 = true;
        var $__13 = false;
        var $__14 = undefined;
        try {
          for (var $__10 = void 0,
              $__9 = (chapter["verses"])[Symbol.iterator](); !($__12 = ($__10 = $__9.next()).done); $__12 = true) {
            var verses = $__10.value;
            {
              var $__5 = true;
              var $__6 = false;
              var $__7 = undefined;
              try {
                for (var $__3 = void 0,
                    $__2 = (objectEntries(verses))[Symbol.iterator](); !($__5 = ($__3 = $__2.next()).done); $__5 = true) {
                  var $__16 = $__3.value,
                      versenum = ($__17 = $__16[Symbol.iterator](), ($__18 = $__17.next()).done ? void 0 : $__18.value),
                      versetext = ($__18 = $__17.next()).done ? void 0 : $__18.value;
                  {
                    var readParent = document.createElement('div');
                    readParent.setAttribute('class', 'bible-verse-text');
                    var verseNum = document.createElement('span');
                    var verseText = document.createElement('span');
                    verseNum.textContent = versenum;
                    verseText.textContent = versetext;
                    readParent.appendChild(verseNum);
                    readParent.appendChild(verseText);
                    parent.appendChild(readParent);
                  }
                }
              } catch ($__8) {
                $__6 = true;
                $__7 = $__8;
              } finally {
                try {
                  if (!$__5 && $__2.return != null) {
                    $__2.return();
                  }
                } finally {
                  if ($__6) {
                    throw $__7;
                  }
                }
              }
            }
          }
        } catch ($__15) {
          $__13 = true;
          $__14 = $__15;
        } finally {
          try {
            if (!$__12 && $__9.return != null) {
              $__9.return();
            }
          } finally {
            if ($__13) {
              throw $__14;
            }
          }
        }
      }});
  }();
  return {get GetBible() {
      return GetBible;
    }};
});
$traceurRuntime.registerModule("../traceur/home.trac", [], function() {
  "use strict";
  var __moduleName = "../traceur/home.trac";
  var $__11 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("loadRequested.js", "../traceur/home.trac")),
      GetJson = $__11.GetJson,
      objectEntries = $__11.objectEntries,
      Modal = $__11.Modal;
  var GetBible = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("bible.js", "../traceur/home.trac")).GetBible;
  var Home = function() {
    function Home() {
      var oldTestament = document.querySelector('.bible-oldtestament');
      var newTestament = document.querySelector('.bible-newtestament');
      this.oldTestament = function() {
        return oldTestament;
      };
      this.newTestament = function() {
        return newTestament;
      };
    }
    return ($traceurRuntime.createClass)(Home, {loadBibleLocation: function() {
        this.oldTestament().addEventListener('click', function(e) {
          var getOldTestament = new GetJson("js/jsons/oldtestament.json");
          getOldTestament.loadJson().then(function(ot) {
            Home.PlaceLocationInDom(ot, "ot");
            Home.BibleChapters();
            Modal.extended();
          });
        });
        this.newTestament().addEventListener('click', function(e) {
          var getNewTestaMent = new GetJson("js/jsons/newtestament.json");
          getNewTestaMent.loadJson().then(function(nt) {
            Home.PlaceLocationInDom(nt, "nt");
            Home.BibleChapters();
            Modal.extended();
          });
        });
      }}, {
      BibleChapters: function() {
        var bible = new GetBible();
        var bibleChapters = bible.getBible();
        return bibleChapters;
      },
      PlaceLocationInDom: function(testament, part) {
        var $__9,
            $__10;
        var bibleChoice = document.querySelector('.bible-choice');
        var homeScreen = document.querySelector('.bible-home-screen');
        var testaMentParent = document.createElement('div');
        testaMentParent.setAttribute('class', 'bible-testament');
        if (bibleChoice) {
          bibleChoice.setAttribute('data-display', 'none');
          var removeTestamentParent = homeScreen.getElementsByClassName('bible-testament')[0];
          if (removeTestamentParent !== undefined) {
            removeTestamentParent.remove();
          }
          homeScreen.appendChild(testaMentParent);
          var $__4 = true;
          var $__5 = false;
          var $__6 = undefined;
          try {
            for (var $__2 = void 0,
                $__1 = (objectEntries(testament))[Symbol.iterator](); !($__4 = ($__2 = $__1.next()).done); $__4 = true) {
              var $__8 = $__2.value,
                  otKey = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value),
                  otValue = ($__10 = $__9.next()).done ? void 0 : $__10.value;
              {
                var location = document.createElement('p');
                ;
                location.setAttribute('class', 'bible-location');
                location.innerHTML = ("" + otValue);
                testaMentParent.appendChild(location);
              }
            }
          } catch ($__7) {
            $__5 = true;
            $__6 = $__7;
          } finally {
            try {
              if (!$__4 && $__1.return != null) {
                $__1.return();
              }
            } finally {
              if ($__5) {
                throw $__6;
              }
            }
          }
        }
      }
    });
  }();
  var getTestaMents = new Home();
  getTestaMents.loadBibleLocation();
  return {};
});
$traceurRuntime.getModule("../traceur/home.trac" + '');
