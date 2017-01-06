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
$traceurRuntime.registerModule("bible.js", [], function() {
  "use strict";
  var __moduleName = "bible.js";
  var $__20 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("loadRequested.js", "bible.js")),
      JumpToChapter = $__20.JumpToChapter,
      objectEntries = $__20.objectEntries,
      GetJson = $__20.GetJson,
      Modal = $__20.Modal;
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
          var $__17 = info,
              book = $__17.book,
              chapter = $__17.chapter;
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
        divbtn.setAttribute('class', 'bible-audio-ctrlers');
        ctrlBtn.setAttribute('class', 'audioctrlers');
        ctrlBtn.appendChild(playbtn);
        ctrlBtn.appendChild(pausebtn);
        ctrlBtn.appendChild(stopbtn);
        divbtn.appendChild(bar);
        divbtn.appendChild(ctrlBtn);
        divbtn.appendChild(audio);
        parent.insertBefore(divbtn, parent.firstElementChild);
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
        var $__17 = btnlisteners,
            playbtn = $__17.playbtn,
            pausebtn = $__17.pausebtn,
            stopbtn = $__17.stopbtn,
            bar = $__17.bar;
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
            } catch (ex) {
              console.log(ex);
            }
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
        var $__2 = this;
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
              $__2.navigateChapters(bc, i);
              var el = new JumpToChapter();
              el.el().addEventListener('click', function(e) {
                var target = e.target;
                var match = target.textContent.match(/\d+/g) || target.textContent.match(/CH\./);
                if (match && (target.nodeName.toLowerCase() === "p")) {
                  if (match[0] === "CH.") {
                    target = target.nextElementSibling;
                    console.log(target);
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
        var $__18,
            $__19;
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
        var openChapterModal = document.createElement('button');
        openChapterModal.setAttribute('class', 'btn btn-primary');
        openChapterModal.addEventListener('click', function() {
          Modal.extended();
        });
        backward.setAttribute('class', 'fa fa-arrow-left bible-go-left');
        forward.setAttribute('class', 'fa fa-arrow-right bible-go-right');
        bookName.textContent = book;
        bookChapter.textContent = ("Chapter " + chapter["chapter"]);
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
        var $__13 = true;
        var $__14 = false;
        var $__15 = undefined;
        try {
          for (var $__11 = void 0,
              $__10 = (chapter["verses"])[Symbol.iterator](); !($__13 = ($__11 = $__10.next()).done); $__13 = true) {
            var verses = $__11.value;
            {
              var $__6 = true;
              var $__7 = false;
              var $__8 = undefined;
              try {
                for (var $__4 = void 0,
                    $__3 = (objectEntries(verses))[Symbol.iterator](); !($__6 = ($__4 = $__3.next()).done); $__6 = true) {
                  var $__17 = $__4.value,
                      versenum = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value),
                      versetext = ($__19 = $__18.next()).done ? void 0 : $__19.value;
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
            }
          }
        } catch ($__16) {
          $__14 = true;
          $__15 = $__16;
        } finally {
          try {
            if (!$__13 && $__10.return != null) {
              $__10.return();
            }
          } finally {
            if ($__14) {
              throw $__15;
            }
          }
        }
        if (bibleSettingsValues.audio === 'yes') {
          var audio = document.querySelectorAll('audio');
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
      }
    });
  }();
  return {get GetBible() {
      return GetBible;
    }};
});
$traceurRuntime.registerModule("../traceur/nav.es6", [], function() {
  "use strict";
  var __moduleName = "../traceur/nav.es6";
  var $__15 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("loadRequested.js", "../traceur/nav.es6")),
      GetJson = $__15.GetJson,
      objectEntries = $__15.objectEntries,
      Modal = $__15.Modal;
  var GetBible = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("bible.js", "../traceur/nav.es6")).GetBible;
  ;
  var IconBar = function() {
    function IconBar() {
      var iconBar = document.querySelector('.fa-bars');
      this.iconBar = function() {
        return iconBar;
      };
    }
    return ($traceurRuntime.createClass)(IconBar, {openIconBar: function() {
        this.iconBar().addEventListener('click', function(e) {
          var target = e.target;
          var bibleNavItemParent = document.querySelector('.bible-nav');
          var homeScreen = document.querySelector('.bible-home-screen');
          if (!bibleNavItemParent.hasAttribute('data-open-bar')) {
            homeScreen.setAttribute('data-reduce-size', 'reducesize');
            bibleNavItemParent.setAttribute('data-open-bar', 'openbar');
            return;
          }
          homeScreen.removeAttribute('data-reduce-size');
          bibleNavItemParent.removeAttribute('data-open-bar');
          bibleNavItemParent.setAttribute('data-close-bar', 'closebar');
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
                if (!children.hasAttribute('data-display')) {
                  children.setAttribute('data-display', 'none');
                }
              });
              homeScreenChild.removeAttribute('data-display');
              if (homeScreenChild.getAttribute('class') === "bible-ot") {
                var getOldTestament = new GetJson("js/jsons/oldtestament.json");
                getOldTestament.loadJson().then(function(ot) {
                  NavNavigation.PlaceLocationInDom(ot, ".bible-ot");
                  NavNavigation.BibleChapters();
                  Modal.extended();
                });
              } else if (homeScreenChild.getAttribute('class') === "bible-newt") {
                var getNewTestament = new GetJson("js/jsons/newtestament.json");
                getNewTestament.loadJson().then(function(nt) {
                  NavNavigation.PlaceLocationInDom(nt, ".bible-newt");
                  NavNavigation.BibleChapters();
                  Modal.extended();
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
        var testaMentParent = document.createElement('div');
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
                var location = document.createElement('p');
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
  var toggleC = new ToggleConcord();
  toggleC.toggleConcord();
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
          if (target.parentNode.className.includes("bible-nav-concord")) {
            target.parentNode.parentNode.setAttribute('data-override', 'true');
            return;
          }
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
  var ss = new SetActive();
  ss.active();
  return {};
});
$traceurRuntime.getModule("../traceur/nav.es6" + '');
