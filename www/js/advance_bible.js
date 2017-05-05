$traceurRuntime.registerModule("../advance_bible.js", [], function() {
  "use strict";
  var __moduleName = "../advance_bible.js";
  (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a)
            return a(o, !0);
          if (i)
            return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f;
        }
        var l = n[o] = {exports: {}};
        t[o][0].call(l.exports, function(e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }
      return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++)
      s(r[o]);
    return s;
  })({
    1: [function(require, module, exports) {
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
              var parent = document.querySelector('.bible-read-text');
              audio.setAttribute('src', link);
              parent.appendChild(audio);
              Audio.CreateControls(parent, audio);
            }
          },
          CreateControls: function(parent, audio) {
            var playbtn = document.createElement('button');
            playbtn.setAttribute('class', 'btn btn-success btn-xs  glyphicon glyphicon-play');
            var pausebtn = document.createElement('button');
            pausebtn.setAttribute('class', 'btn btn-success btn-xs  glyphicon glyphicon-pause');
            var stopbtn = document.createElement('button');
            stopbtn.setAttribute('class', 'btn btn-success btn-xs glyphicon glyphicon-stop');
            var bar = document.createElement('progress');
            bar.setAttribute('value', audio.currentTime);
            bar.setAttribute('max', 300);
            parent.appendChild(playbtn);
            parent.appendChild(pausebtn);
            parent.appendChild(stopbtn);
            parent.appendChild(bar);
            Audio.ControlsListener(audio, {
              playbtn: playbtn,
              pausebtn: pausebtn,
              stopbtn: stopbtn,
              bar: bar
            });
          },
          IncrementAudioBar: function(bar, audio) {
            bar.setAttribute('value', audio.currentTime);
          },
          ControlsListener: function(audio, btnlisteners) {
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
                  Audio.IncrementAudioBar(bar, target);
                });
                target.setAttribute('class', playbtn.getAttribute('class') + " disabled");
                pausebtn.setAttribute('class', pausebtn.getAttribute('class').replace('disabled', ''));
                return;
              }
              GetBible.StyleBible(book, (" " + (Number(chapter["chapter"]) + 1) + " "));
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
    }, {}],
    2: [function(require, module, exports) {
      var AutoScroll = function() {
        function AutoScroll() {
          var parentScroll = document.createElement('div');
          var scrollArea = document.querySelector('.bible-read-text');
          var scrollDown = document.createElement('span');
          var scrollUp = document.createElement('span');
          scrollDown.setAttribute('class', 'fa fa-chevron-circle-down bible-scroll-down');
          scrollUp.setAttribute('class', 'fa fa-chevron-circle-up bible-scroll-up');
          parentScroll.appendChild(scrollDown);
          parentScroll.appendChild(scrollUp);
          parentScroll.setAttribute('class', 'bible-parent-scroll');
          scrollArea.appendChild(parentScroll);
          this.parentScroll = function(_) {
            return parentScroll;
          };
          this.scrollArea = function(_) {
            return scrollArea;
          };
          this.scrollUp = function(_) {
            return scrollUp;
          };
          this.scrollDown = function(_) {
            return scrollDown;
          };
        }
        return ($traceurRuntime.createClass)(AutoScroll, {scroll: function(HomeConstructor) {
            var $__2 = this;
            this.parentScroll().addEventListener('dblclick', function(e) {
              var target = e.target;
              if (target.getAttribute('class').includes('bible-scroll-up')) {
                HomeConstructor.ScrollUP($__2, 'auto');
              } else if (target.getAttribute('class').includes('bible-scroll-down')) {
                HomeConstructor.ScrollDown($__2, 'auto');
              } else {
                console.log('uhh');
                return false;
              }
            });
            this.parentScroll().addEventListener('click', function(e) {
              var target = e.target;
              if (target.getAttribute('class').includes('bible-scroll-up')) {
                HomeConstructor.ScrollUP($__2, undefined);
              } else if (target.getAttribute('class').includes('bible-scroll-down')) {
                HomeConstructor.ScrollDown($__2, undefined);
              } else {
                console.log('uhh');
                return false;
              }
            });
          }}, {
          Render: function(instance) {
            instance.scroll(AutoScroll);
          },
          CLEAR_INTERVAL: function(_this) {
            if (_this.downId)
              clearInterval(_this.downId);
            if (_this.upId)
              clearInterval(_this.upId);
          },
          CalculateScroll: function(_this) {
            return (_this.scrollArea().scrollHeight - _this.scrollArea().scrollTop);
          },
          ScrollUP: function(_this, type) {
            AutoScroll.CLEAR_INTERVAL(_this);
            if (!type) {
              _this.scrollArea().scrollTop -= 20;
              return;
            }
            _this.upId = setInterval(function() {
              if (AutoScroll.CalculateScroll(_this) === 0) {
                clearInterval(_this.upId);
                return;
              }
              _this.scrollArea().scrollTop -= 20;
            }, 500);
          },
          ScrollDown: function(_this, type) {
            AutoScroll.CLEAR_INTERVAL(_this);
            if (!type) {
              _this.scrollArea().scrollTop += 20;
              return;
            }
            _this.downId = setInterval(function() {
              if (AutoScroll.CalculateScroll(_this) === _this.scrollArea().clientHeight) {
                clearInterval(_this.downId);
                return;
              }
              _this.scrollArea().scrollTop += 20;
            }, 500);
          }
        });
      }();
      module.exports = AutoScroll;
    }, {}],
    3: [function(require, module, exports) {
      var $__19 = require("./loadRequested.js"),
          JumpToChapter = $__19.JumpToChapter,
          objectEntries = $__19.objectEntries,
          GetJson = $__19.GetJson,
          Modal = $__19.Modal;
      var AutoScroll = require("./auto_scroll.js");
      var HeaderButtons = require("./header_buttons.js");
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
              var $__20 = info,
                  book = $__20.book,
                  chapter = $__20.chapter;
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
            var $__20 = btnlisteners,
                playbtn = $__20.playbtn,
                pausebtn = $__20.pausebtn,
                stopbtn = $__20.stopbtn,
                bar = $__20.bar;
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
      module.exports.GetBible = function() {
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
          GetSettings: function() {
            return {};
          },
          SetSettings: function() {},
          SetBookMarked: function() {},
          StyleBible: function(book, chapter) {
            var $__21,
                $__22;
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
            var jj = new AutoScroll();
            AutoScroll.Render(jj);
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
            var setState = false;
            var BOOKMARK = JSON.parse(localStorage.getItem('___BIBLE-BOOKMARK___'));
            var $__14 = true;
            var $__15 = false;
            var $__16 = undefined;
            try {
              for (var $__12 = void 0,
                  $__11 = (chapter["verses"])[Symbol.iterator](); !($__14 = ($__12 = $__11.next()).done); $__14 = true) {
                var verses = $__12.value;
                {
                  var $__7 = true;
                  var $__8 = false;
                  var $__9 = undefined;
                  try {
                    for (var $__5 = void 0,
                        $__4 = (objectEntries(verses))[Symbol.iterator](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
                      var $__20 = $__5.value,
                          versenum = ($__21 = $__20[Symbol.iterator](), ($__22 = $__21.next()).done ? void 0 : $__22.value),
                          versetext = ($__22 = $__21.next()).done ? void 0 : $__22.value;
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
                  } catch ($__10) {
                    $__8 = true;
                    $__9 = $__10;
                  } finally {
                    try {
                      if (!$__7 && $__4.return != null) {
                        $__4.return();
                      }
                    } finally {
                      if ($__8) {
                        throw $__9;
                      }
                    }
                  }
                }
              }
            } catch ($__17) {
              $__15 = true;
              $__16 = $__17;
            } finally {
              try {
                if (!$__14 && $__11.return != null) {
                  $__11.return();
                }
              } finally {
                if ($__15) {
                  throw $__16;
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
          SetAudio: function() {},
          BookMark: function($__20) {
            var $__23,
                $__24,
                $__25,
                $__26,
                $__27;
            var $__21 = $__20,
                bookMark = $__21.bookMark,
                versenum = $__21.versenum,
                versetext = $__21.versetext,
                BOOKMARK = $__21.BOOKMARK;
            var _p = GetBible.IsBookMarked(BOOKMARK);
            var $__22 = _p.next().value,
                value = ($__23 = $__22[Symbol.iterator](), ($__24 = $__23.next()).done ? void 0 : $__24.value),
                location = ($__24 = $__23.next()).done ? void 0 : $__24.value;
            while (value != null) {
              var _joinedValue = versenum + versetext.replace(/\s/g, '_');
              if (_joinedValue === value) {
                bookMark.classList.add('bible-bookmarked');
                bookMark.classList.remove('bible-not-bookmarked');
              }
              ($__25 = _p.next().value, value = ($__26 = $__25[Symbol.iterator](), ($__27 = $__26.next()).done ? void 0 : $__27.value), location = ($__27 = $__26.next()).done ? void 0 : $__27.value, $__25);
            }
          },
          SaveBookMarked: function(newbookmark) {
            var $__22,
                $__23;
            var $__3;
            var getPrevItem = JSON.parse(localStorage.getItem('___BIBLE-BOOKMARK___'));
            var isTrueFalse = (getPrevItem) ? true : false;
            var bookmark = {};
            var textContent = newbookmark.textContent;
            var ____ = [textContent.match(/^\d+/)[0], textContent.replace(/^\d+/, ''), newbookmark.parentElement.querySelector('h3').textContent + " " + newbookmark.parentElement.querySelector('h5')];
            var $__21 = $traceurRuntime.spread(____),
                verseNum = ($__22 = $__21[Symbol.iterator](), ($__23 = $__22.next()).done ? void 0 : $__23.value),
                verseText = ($__23 = $__22.next()).done ? void 0 : $__23.value,
                location = ($__23 = $__22.next()).done ? void 0 : $__23.value;
            var obj = ($__3 = {}, Object.defineProperty($__3, ("" + textContent.replace(/\s/g, '_')), {
              value: {
                verseNum: verseNum,
                verseText: verseText,
                location: location
              },
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3);
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
          IsBookMarked: $traceurRuntime.initGeneratorFunction(function $__31(BOOKMARK) {
            var $__21,
                $__22,
                $__7,
                $__8,
                $__9,
                $__5,
                $__4,
                $__20,
                i,
                BOOKMARK$__29,
                location,
                $__10;
            return $traceurRuntime.createGeneratorInstance(function($ctx) {
              while (true)
                switch ($ctx.state) {
                  case 0:
                    $__7 = true;
                    $__8 = false;
                    $__9 = undefined;
                    $ctx.state = 26;
                    break;
                  case 26:
                    $ctx.pushTry(12, 13);
                    $ctx.state = 15;
                    break;
                  case 15:
                    $__5 = void 0, $__4 = (objectEntries(BOOKMARK))[Symbol.iterator]();
                    $ctx.state = 11;
                    break;
                  case 11:
                    $ctx.state = (!($__7 = ($__5 = $__4.next()).done)) ? 7 : 9;
                    break;
                  case 4:
                    $__7 = true;
                    $ctx.state = 11;
                    break;
                  case 7:
                    $__20 = $__5.value, i = ($__21 = $__20[Symbol.iterator](), ($__22 = $__21.next()).done ? void 0 : $__22.value), BOOKMARK$__29 = ($__22 = $__21.next()).done ? void 0 : $__22.value;
                    $ctx.state = 8;
                    break;
                  case 8:
                    location = BOOKMARK$__29.location;
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
                    $__10 = $ctx.storedException;
                    $ctx.state = 18;
                    break;
                  case 18:
                    $__8 = true;
                    $__9 = $__10;
                    $ctx.state = 13;
                    $ctx.finallyFallThrough = -2;
                    break;
                  case 13:
                    $ctx.popTry();
                    $ctx.state = 24;
                    break;
                  case 24:
                    try {
                      if (!$__7 && $__4.return != null) {
                        $__4.return();
                      }
                    } finally {
                      if ($__8) {
                        throw $__9;
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
            }, $__31, this);
          })
        });
      }();
    }, {
      "./auto_scroll.js": 2,
      "./header_buttons.js": 8,
      "./loadRequested.js": 11
    }],
    4: [function(require, module, exports) {
      var GetNotified = {
        setStatusMessage: function(msg) {
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
        isAvailable: function() {
          if ("Notification" in window) {
            return true;
          } else {
            this.setStatusMessage("Update Your Browser to enjoy this feature");
            return false;
          }
        },
        isGranted: function() {
          if (this.isAvailable() && Notification.permission === 'granted') {
            this.getTodo(function() {
              var $__19 = arguments[0] !== (void 0) ? arguments[0] : obj,
                  todo_content = $__19.todo_content,
                  todo_date = $__19.todo_date;
              navigator.vibrate([100, 50, 20, 10]);
              var __n = new Notification('Todo Notification', {
                body: "content: " + todo_content + "\nDate: " + todo_date,
                icon: './img/old_bible.jpg'
              });
              setTimeout(function() {
                __n.close();
              }, 4000);
              __n.addEventListener('click', function(e) {
                var moveToTodo = document.querySelector('.bible-view-todo'),
                    todoList = moveToTodo.querySelector('.todo-list'),
                    target = e.target;
                moveToTodo.click();
                Array.from(todoList.children, function(el) {
                  var content = el.innerHTML;
                  var data = target.data.replace(/\n/g, '');
                  el.setAttribute('style', 'border: 12px solid red;');
                  if (content === data) {}
                });
                __n.close();
              });
            });
          } else {
            console.log('asdfadsf');
          }
        },
        getTodo: function(callback) {
          if (localStorage.getItem("___TODO___")) {
            var __todo__ = JSON.parse(localStorage.getItem("___TODO___"));
            var $__7 = true;
            var $__8 = false;
            var $__9 = undefined;
            try {
              for (var $__5 = void 0,
                  $__4 = (Object.keys(__todo__))[Symbol.iterator](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
                var miniObj = $__5.value;
                {
                  var $__19 = __todo__[miniObj],
                      todo_date = $__19.todo_date,
                      todo_time = $__19.todo_time;
                  var dateObj = new Date().toLocaleDateString();
                  var timeObj = new Date().toLocaleTimeString();
                  dateObj = Number(dateObj.split("/").reverse().join(""));
                  timeObj = timeObj.slice(0, 5).replace(/:/, "");
                  todo_time = todo_time.replace(":", '');
                  todo_date = Number(todo_date);
                  if ((todo_date === dateObj && todo_time === timeObj) || (todo_date === dateObj)) {
                    callback(__todo__[miniObj]);
                  }
                }
              }
            } catch ($__10) {
              $__8 = true;
              $__9 = $__10;
            } finally {
              try {
                if (!$__7 && $__4.return != null) {
                  $__4.return();
                }
              } finally {
                if ($__8) {
                  throw $__9;
                }
              }
            }
          }
        }
      };
      GetNotified.isGranted();
    }, {}],
    5: [function(require, module, exports) {
      var GetBible = require("./bible.js").GetBible;
      module.exports._bookMark = Object.create({
        bookmarkStorage: JSON.parse(localStorage.getItem("___BIBLE-BOOKMARK___")),
        bookmarkElement: function() {
          var element = document.querySelector('.bible-bookmark');
          element.removeAttribute('data-display');
          return element;
        },
        init: function() {
          var $__2 = this;
          if (this.bookmarkElement().children.length !== 0) {
            Array.from(this.bookmarkElement().children, function(_) {
              $__2.bookmarkElement().removeChild(_);
              _ = undefined;
            });
          }
          this.checkBookMarkStorage();
        },
        bookmarkHtml: function() {
          this.bookmarkElement().setAttribute('style', ("font-size: " + localStorage.getItem("font-size") + "px;"));
          return this.bookmarkElement();
        },
        checkBookMarkStorage: function() {
          if (!this.bookmarkStorage) {
            console.log(' dont execute');
            document.querySelector(".fa.fa-home.bible-nav-item").click();
            GetBible.SetStatusMessage('Nothing to display here');
            return false;
          }
          console.log('execute');
          this.showBookMark();
        },
        showBookMark: function() {
          var $__23,
              $__21,
              $__22,
              $__24,
              $__25,
              $__26,
              $__27,
              $__28;
          try {
            var _p = GetBible.IsBookMarked(this.bookmarkStorage);
            var $__20 = _p.next().value,
                value = ($__23 = $__20[Symbol.iterator](), ($__21 = $__23.next()).done ? void 0 : $__21.value),
                location = ($__21 = $__23.next()).done ? void 0 : $__21.value;
            var setBg = false;
            while (value != null) {
              if (!setBg) {
                setBg = true;
                this.styleBookMark({
                  value: value,
                  setBg: setBg,
                  location: location
                });
                ($__22 = _p.next().value, value = ($__24 = $__22[Symbol.iterator](), ($__25 = $__24.next()).done ? void 0 : $__25.value), location = ($__25 = $__24.next()).done ? void 0 : $__25.value, $__22);
                continue;
              }
              setBg = false;
              this.styleBookMark({
                value: value,
                setBg: setBg,
                location: location
              });
              ($__26 = _p.next().value, value = ($__27 = $__26[Symbol.iterator](), ($__28 = $__27.next()).done ? void 0 : $__28.value), location = ($__28 = $__27.next()).done ? void 0 : $__28.value, $__26);
            }
          } catch (ex) {}
        },
        styleBookMark: function($__20) {
          var $__22,
              $__24;
          var $__23 = $__20,
              value = $__23.value,
              setBg = $__23.setBg,
              location = $__23.location;
          var $__21 = [value.split(/_/).join(" ").match(/\d+/)[0], value.split(/_/).join(" ").replace(/^\d+/, "")],
              versenum = ($__22 = $__21[Symbol.iterator](), ($__24 = $__22.next()).done ? void 0 : $__24.value),
              versetext = ($__24 = $__22.next()).done ? void 0 : $__24.value;
          var readParent = document.createElement('div');
          readParent.setAttribute('class', 'bible-verse-text');
          readParent.setAttribute('data-set-bg', setBg.toString());
          var verseLocation = document.createElement('p');
          var verseNum = document.createElement('span');
          var verseText = document.createElement('span');
          verseNum.textContent = versenum;
          verseText.textContent = versetext;
          verseLocation.textContent = location;
          readParent.appendChild(verseLocation);
          readParent.appendChild(verseNum);
          readParent.appendChild(verseText);
          this.bookmarkHtml().appendChild(readParent);
        },
        Fire: function(el) {
          var $__2 = this;
          el.addEventListener('click', function(_) {
            $__2.init();
            document.querySelector('.bible-choice').setAttribute('data-display', 'none');
          });
        }
      });
    }, {"./bible.js": 3}],
    6: [function(require, module, exports) {
      var $__19 = require("./loadRequested.js"),
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
          var bibleHeadCover = document.querySelector('.bible-head-cover');
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
          this.bibleHeadCover = function() {
            return bibleHeadCover;
          };
        }
        return ($traceurRuntime.createClass)(Concord, {
          showConcord: function() {
            var $__2 = this;
            this.concord().addEventListener('click', function(e) {
              $__2.concordModal().style["display"] = "flex";
              $__2.concordModal().setAttribute('data-location', 'bringdown');
              $__2.bibleHeadCover().removeAttribute('data-display');
            });
            return this;
          },
          closeModal: function() {
            var $__2 = this;
            this.close().addEventListener('click', function(e) {
              $__2.bibleCover().setAttribute('data-display', 'none');
              $__2.concordModal().style["display"] = "none";
              $__2.bibleHeadCover().setAttribute('data-display', 'none');
            });
            return this;
          },
          searchText: function(concord) {
            var $__23,
                $__21;
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
            var $__7 = true;
            var $__8 = false;
            var $__9 = undefined;
            try {
              for (var $__5 = void 0,
                  $__4 = (objectEntries(concord))[Symbol.iterator](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
                var $__20 = $__5.value,
                    index = ($__23 = $__20[Symbol.iterator](), ($__21 = $__23.next()).done ? void 0 : $__21.value),
                    nameOfLocation = ($__21 = $__23.next()).done ? void 0 : $__21.value;
                {
                  nameOfLocation = nameOfLocation.replace(/\s/g, "");
                  var getLocationConcord = new GetJson(("js/jsons/" + nameOfLocation + ".json"));
                  getLocationConcord.loadJson().then(function(concord) {
                    var $__25,
                        $__26;
                    var $__22 = concord,
                        book = $__22.book,
                        chapters = $__22.chapters;
                    var ifFound = false;
                    var $__7 = true;
                    var $__8 = false;
                    var $__9 = undefined;
                    try {
                      var $__30 = function() {
                        var $__24 = $__5.value,
                            index = ($__25 = $__24[Symbol.iterator](), ($__26 = $__25.next()).done ? void 0 : $__26.value),
                            versesValue = ($__26 = $__25.next()).done ? void 0 : $__26.value;
                        {
                          var $__27 = versesValue,
                              chapter = $__27.chapter,
                              verses = $__27.verses;
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
                      for (var $__5 = void 0,
                          $__4 = (objectEntries(chapters))[Symbol.iterator](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
                        $__30();
                      }
                    } catch ($__10) {
                      $__8 = true;
                      $__9 = $__10;
                    } finally {
                      try {
                        if (!$__7 && $__4.return != null) {
                          $__4.return();
                        }
                      } finally {
                        if ($__8) {
                          throw $__9;
                        }
                      }
                    }
                    ifFound = (ifFound ? false : ifFound);
                  });
                }
              }
            } catch ($__10) {
              $__8 = true;
              $__9 = $__10;
            } finally {
              try {
                if (!$__7 && $__4.return != null) {
                  $__4.return();
                }
              } finally {
                if ($__8) {
                  throw $__9;
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
              var bibleNavItemParent = document.querySelector('.bible-nav');
              $__2.bibleHomeScreen().removeAttribute('data-reduce-size');
              bibleNavItemParent.removeAttribute('data-open-bar');
              bibleNavItemParent.setAttribute('data-close-bar', 'closebar');
              $__2.bibleHeadCover().setAttribute('data-display', 'none');
              $__2.concordModal().setAttribute('data-location', 'bringup');
              $__2.bibleCover().setAttribute('data-display', 'none');
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
              var $__20 = foundSearch,
                  book = $__20.book,
                  chapter = $__20.chapter,
                  verseNum = $__20.verseNum,
                  text = $__20.text;
              var rndPage = document.querySelector('.bible-rendered-on-page');
              if (Boolean(rndPage) === false) {
                Array.from(this.bibleHomeScreen().children, function(ch) {
                  if (!ch.hasAttribute('data-display') && !HTMLImageElement[Symbol.hasInstance](ch)) {
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
          },
          openMd: function() {
            this.bibleHomeScreen().addEventListener('click', function(e) {
              var target = e.target;
              if (target.parentNode.className.includes('bible-location') || target.parentNode.className.includes('bible-location')) {
                var t = (target.className.includes('bible-location')) ? target.children[1] : target.nextElementSibling;
                Concord.ReadModal(t.innerHTML);
              }
            });
            return this;
          }
        }, {ReadModal: function(text) {
            var bibleCover = document.querySelector('.bible-cover');
            var bibleHeadCover = document.querySelector('.bible-head-cover');
            var mdParent = document.createElement('div');
            mdParent.setAttribute('data-read-modal', 'read-modal');
            var mdClose = document.createElement('span');
            mdClose.setAttribute('class', 'fa fa-close bible-close pull-right');
            mdClose.addEventListener('click', function(e) {
              mdParent.remove();
              bibleCover.setAttribute('data-display', 'none');
              bibleHeadCover.setAttribute('data-display', 'none');
            });
            var readTextParent = document.createElement('div');
            var readText = document.createElement('p');
            readText.setAttribute('class', 'read-search-text');
            readText.innerHTML = text;
            readTextParent.appendChild(readText);
            mdParent.appendChild(mdClose);
            mdParent.appendChild(readTextParent);
            document.body.appendChild(mdParent);
            bibleCover.removeAttribute('data-display');
            bibleHeadCover.removeAttribute('data-display');
          }});
      }();
      var q = new Concord();
      q.showConcord().openMd().closeModal().searchConcord();
    }, {"./loadRequested.js": 11}],
    7: [function(require, module, exports) {
      var HandleClose = function() {
        function HandleClose() {}
        return ($traceurRuntime.createClass)(HandleClose, {close: function() {
            document.body.addEventListener('click', function(e) {
              var target = e.target;
              if (target.className.includes('bible-close')) {
                var bibleHeadCover = document.querySelector('.bible-head-cover');
                bibleHeadCover.setAttribute('data-display', 'none');
                var bibleCover = document.querySelector('.bible-cover');
                var bibleNavItemParent = document.querySelector('.bible-nav');
                var homeScreen = document.querySelector('.bible-home-screen');
                if (!bibleNavItemParent.hasAttribute('data-close-bar')) {
                  homeScreen.removeAttribute('data-reduce-size');
                  bibleNavItemParent.removeAttribute('data-open-bar');
                  bibleNavItemParent.setAttribute('data-close-bar', 'closebar');
                }
              }
            });
          }}, {});
      }();
      var qq = new HandleClose();
      qq.close();
    }, {}],
    8: [function(require, module, exports) {
      var Modal = require("./loadRequested.js").Modal;
      var HeaderButtons = function() {
        function HeaderButtons() {}
        return ($traceurRuntime.createClass)(HeaderButtons, {}, {
          render: function() {
            var $__23;
            var header = document.querySelector('.bible-read-text');
            var header_Menu = document.createElement('div');
            var genLink = HeaderButtons.createMenuLinks(["select chapter", "select version", "select language"]);
            var $__20 = genLink.next(),
                done = $__20.done,
                value = $__20.value;
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
              (($__23 = genLink.next(), done = $__23.done, value = $__23.value, $__23));
            }
          },
          createMenuLinks: $traceurRuntime.initGeneratorFunction(function $__31(links) {
            var $__7,
                $__8,
                $__9,
                $__5,
                $__4,
                _l,
                $__10;
            return $traceurRuntime.createGeneratorInstance(function($ctx) {
              while (true)
                switch ($ctx.state) {
                  case 0:
                    $__7 = true;
                    $__8 = false;
                    $__9 = undefined;
                    $ctx.state = 24;
                    break;
                  case 24:
                    $ctx.pushTry(10, 11);
                    $ctx.state = 13;
                    break;
                  case 13:
                    $__5 = void 0, $__4 = (links)[Symbol.iterator]();
                    $ctx.state = 9;
                    break;
                  case 9:
                    $ctx.state = (!($__7 = ($__5 = $__4.next()).done)) ? 5 : 7;
                    break;
                  case 4:
                    $__7 = true;
                    $ctx.state = 9;
                    break;
                  case 5:
                    _l = $__5.value;
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
                    $__10 = $ctx.storedException;
                    $ctx.state = 16;
                    break;
                  case 16:
                    $__8 = true;
                    $__9 = $__10;
                    $ctx.state = 11;
                    $ctx.finallyFallThrough = -2;
                    break;
                  case 11:
                    $ctx.popTry();
                    $ctx.state = 22;
                    break;
                  case 22:
                    try {
                      if (!$__7 && $__4.return != null) {
                        $__4.return();
                      }
                    } finally {
                      if ($__8) {
                        throw $__9;
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
            }, $__31, this);
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
      module.exports = HeaderButtons;
    }, {"./loadRequested.js": 11}],
    9: [function(require, module, exports) {
      var $__19 = require("./loadRequested.js"),
          GetJson = $__19.GetJson,
          objectEntries = $__19.objectEntries,
          Modal = $__19.Modal;
      var GetBible = require("./bible.js").GetBible;
      var BookMark = require("./bookmark.js")._bookMark;
      var AddNote = require("./notes.js").AddNote;
      var Todo = require('./todo.js');
      var Home = function() {
        function Home() {
          var bibleHomeNav = document.querySelector(".bible-choice-item");
          bibleHomeNav.addEventListener('click', function(e) {
            var target = e.target;
            if (!target.hasAttribute('data-exec'))
              return;
            var value = target.getAttribute('data-exec');
            Home[value](target);
          });
        }
        return ($traceurRuntime.createClass)(Home, {}, {
          Note: function() {
            var noteAdd = new AddNote();
            noteAdd.showNote({page_title: 'Add Note'});
          },
          TodoAdd: function() {
            var todoAdd = new Todo();
            todoAdd.triggerAdd();
          },
          TodoView: function() {
            var todoView = new Todo();
            todoView.viewTodo();
          },
          BibleChapters: function() {
            var bible = new GetBible();
            var bibleChapters = bible.getBible();
            return bibleChapters;
          },
          BookMark: function(element) {
            BookMark.Fire(element);
          },
          oldTestament: function(element) {
            element.addEventListener('click', function(e) {
              Home.LoadJSON({
                src: "js/jsons/oldtestament.json",
                type: "ot"
              });
            });
          },
          newTestament: function(element) {
            element.addEventListener('click', function(e) {
              Home.LoadJSON({
                src: "js/jsons/newtestament.json",
                type: "nt"
              });
            });
          },
          LoadJSON: function($__22) {
            var $__24 = $__22,
                src = $__24.src,
                type = $__24.type;
            var getNewTestaMent = new GetJson(src);
            getNewTestaMent.loadJson().then(function(result) {
              Home.PlaceLocationInDom(result, type);
              Home.BibleChapters();
              Array.from(document.querySelectorAll(".bible-location"), function(el) {
                Modal.extended(el);
              });
            });
          },
          PlaceLocationInDom: function(testament, part) {
            var $__24,
                $__27;
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
              var $__7 = true;
              var $__8 = false;
              var $__9 = undefined;
              try {
                for (var $__5 = void 0,
                    $__4 = (objectEntries(testament))[Symbol.iterator](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
                  var $__22 = $__5.value,
                      otKey = ($__24 = $__22[Symbol.iterator](), ($__27 = $__24.next()).done ? void 0 : $__27.value),
                      otValue = ($__27 = $__24.next()).done ? void 0 : $__27.value;
                  {
                    var location = document.createElement('p');
                    ;
                    location.setAttribute('class', 'bible-location');
                    location.innerHTML = ("" + otValue);
                    testaMentParent.appendChild(location);
                  }
                }
              } catch ($__10) {
                $__8 = true;
                $__9 = $__10;
              } finally {
                try {
                  if (!$__7 && $__4.return != null) {
                    $__4.return();
                  }
                } finally {
                  if ($__8) {
                    throw $__9;
                  }
                }
              }
            }
          }
        });
      }();
      var getTestaMents = new Home();
    }, {
      "./bible.js": 3,
      "./bookmark.js": 5,
      "./loadRequested.js": 11,
      "./notes.js": 14,
      "./todo.js": 16
    }],
    10: [function(require, module, exports) {
      var BookMark = require("./bookmark.js")._bookMark;
      BookMark.Fire(document.querySelector("[data-target='bible-bookmark']"));
    }, {"./bookmark.js": 5}],
    11: [function(require, module, exports) {
      module.exports.objectEntries = $traceurRuntime.initGeneratorFunction(function objectEntries(obj) {
        var propKeys,
            $__7,
            $__8,
            $__9,
            $__5,
            $__4,
            propKey,
            $__10;
        return $traceurRuntime.createGeneratorInstance(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                propKeys = Object.keys(obj);
                $__7 = true;
                $__8 = false;
                $__9 = undefined;
                $ctx.state = 24;
                break;
              case 24:
                $ctx.pushTry(10, 11);
                $ctx.state = 13;
                break;
              case 13:
                $__5 = void 0, $__4 = (propKeys)[Symbol.iterator]();
                $ctx.state = 9;
                break;
              case 9:
                $ctx.state = (!($__7 = ($__5 = $__4.next()).done)) ? 5 : 7;
                break;
              case 4:
                $__7 = true;
                $ctx.state = 9;
                break;
              case 5:
                propKey = $__5.value;
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
                $__10 = $ctx.storedException;
                $ctx.state = 16;
                break;
              case 16:
                $__8 = true;
                $__9 = $__10;
                $ctx.state = 11;
                $ctx.finallyFallThrough = -2;
                break;
              case 11:
                $ctx.popTry();
                $ctx.state = 22;
                break;
              case 22:
                try {
                  if (!$__7 && $__4.return != null) {
                    $__4.return();
                  }
                } finally {
                  if ($__8) {
                    throw $__9;
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
        }, objectEntries, this);
      });
      module.exports.SetStatusMessage = function SetStatusMessage(msg) {
        if (((typeof msg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(msg))) !== 'string') {
          throw Error(("expected a string as an argument but got " + ((typeof msg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(msg)))));
        }
        var bibleRep = document.querySelector(".bible-report");
        bibleRep.innerHTML = msg;
        bibleRep.setAttribute('style', 'visibility: visible');
        setTimeout(function() {
          bibleRep.removeAttribute('style');
        }, 3000);
      };
      module.exports.GetJson = function() {
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
      module.exports.JumpToChapter = function() {
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
      module.exports.Modal = function() {
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
              var $__19 = ch,
                  book = $__19.book,
                  chapters = $__19.chapters;
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
                var $__20 = getchapters,
                    chapter = $__20.chapter,
                    verses = $__20.verses;
                var chapterNode = document.createElement('li');
                chapterNode.setAttribute('class', 'bible-getChapters-chapter');
                chaptersParent.appendChild(chapterNode);
                chapterNode.innerHTML = ("<div>\n                                    <p>CH.</p>\n                                    <p>" + chapter + "</p>\n                                  <div>");
              });
            });
          }
        });
      }();
    }, {}],
    12: [function(require, module, exports) {
      var GetJson = require("./loadRequested.js").GetJson;
      var ChapterModal = function() {
        function ChapterModal() {
          var bibleBody = document.querySelector('#bible-body');
          this.bibleBody = function() {
            return bibleBody;
          };
        }
        return ($traceurRuntime.createClass)(ChapterModal, {runModal: function() {
            this.bibleBody().addEventListener('click', function(e) {
              var target = e.target;
            });
          }}, {
          otModal: function() {},
          ntModal: function() {}
        });
      }();
      var qq = new ChapterModal();
      qq.runModal();
    }, {"./loadRequested.js": 11}],
    13: [function(require, module, exports) {
      var $__19 = require("./loadRequested.js"),
          GetJson = $__19.GetJson,
          objectEntries = $__19.objectEntries,
          Modal = $__19.Modal;
      var GetBible = require("./bible.js").GetBible;
      var IconBar = function() {
        function IconBar() {
          var $__2 = this;
          var iconBar = document.querySelector('.fa-bars');
          var noDisplay = document.querySelector('.bible-cover');
          var bibleNavItemParent = document.querySelector('.bible-nav');
          var homeScreen = document.querySelector('.bible-home-screen');
          noDisplay.addEventListener('click', function(e) {
            var target = e.target;
            var rmModal = document.querySelector("[data-remove-modal='remove']");
            target.setAttribute('data-display', 'none');
            homeScreen.removeAttribute('data-reduce-size');
            $__2.bibleNavItemParent().removeAttribute('data-open-bar');
            $__2.bibleNavItemParent().setAttribute('data-close-bar', 'closebar');
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
            var $__2 = this;
            this.iconBar().addEventListener('click', function(e) {
              var target = e.target;
              var bibleNavItemParent = document.querySelector('.bible-nav');
              var homeScreen = document.querySelector('.bible-home-screen');
              if (!bibleNavItemParent.hasAttribute('data-open-bar')) {
                $__2.noDisplay().removeAttribute('data-display');
                $__2.homeScreen().setAttribute('data-reduce-size', 'reducesize');
                bibleNavItemParent.setAttribute('data-open-bar', 'openbar');
                bibleNavItemParent.removeAttribute('data-close-bar');
                return;
              }
              $__2.noDisplay().setAttribute('data-display', 'none');
              $__2.homeScreen().removeAttribute('data-reduce-size');
              $__2.bibleNavItemParent().removeAttribute('data-open-bar');
              $__2.bibleNavItemParent().setAttribute('data-close-bar', 'closebar');
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
            var $__21,
                $__22;
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
              var $__7 = true;
              var $__8 = false;
              var $__9 = undefined;
              try {
                for (var $__5 = void 0,
                    $__4 = (objectEntries(testament))[Symbol.iterator](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
                  var $__23 = $__5.value,
                      otKey = ($__21 = $__23[Symbol.iterator](), ($__22 = $__21.next()).done ? void 0 : $__22.value),
                      otValue = ($__22 = $__21.next()).done ? void 0 : $__22.value;
                  {
                    var location = document.createElement('li');
                    ;
                    location.setAttribute('class', 'bible-location');
                    location.innerHTML = ("" + otValue);
                    testaMentParent.appendChild(location);
                  }
                }
              } catch ($__10) {
                $__8 = true;
                $__9 = $__10;
              } finally {
                try {
                  if (!$__7 && $__4.return != null) {
                    $__4.return();
                  }
                } finally {
                  if ($__8) {
                    throw $__9;
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
            var $__2 = this;
            this.bibleNavList().addEventListener('click', function(e) {
              var target = e.target;
              var nodeName = e.target.nodeName.toLowerCase();
              target = (nodeName === 'li') ? target : target.parentNode;
              Array.from($__2.bibleNavList().children, function(element) {
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
    }, {
      "./bible.js": 3,
      "./loadRequested.js": 11
    }],
    14: [function(require, module, exports) {
      var objectEntries = require("./loadRequested.js").objectEntries;
      var NoteListener = function() {
        function NoteListener() {
          var noteParent = document.querySelector('.bible-note');
          this.noteParent = function() {
            return noteParent;
          };
        }
        return ($traceurRuntime.createClass)(NoteListener, {triggerClicks: function() {
            var $__2 = this;
            this.noteParent().addEventListener('click', function(e) {
              var target = e.target,
                  className = target.className,
                  dataPointer = target.getAttribute('data-pointer');
              switch (dataPointer) {
                case "bible-add-note":
                  var noteAdd = new AddNote();
                  noteAdd.showNote({page_title: 'Add Note'});
                  break;
                case "bible-edit-note":
                  var noteEdit = new EditNote();
                  break;
                case "bible-view-note":
                  var noteView = new ViewNote();
                  noteView.showNote();
                  break;
                case "bible-delete-note":
                  var noteDelete = new DeleteNote();
                  break;
                case "bible-pushpin":
                  var evtObj = {
                    dEvent: function(e) {
                      var target = e.target;
                      var pL = e.clientX - target.getBoundingClientRect().left;
                      var pT = e.clientY - target.getBoundingClientRect().top;
                      var pR = e.clientY - target.getBoundingClientRect().right;
                      Object.assign(evtObj, {
                        pL: pL,
                        pT: pT,
                        pR: pR
                      });
                    },
                    dStopEvent: function(e) {
                      var target = e.target;
                      $__2.noteParent().setAttribute('style', ("left:" + evtObj.pL + "px;top:" + evtObj.pT + "px;right:" + evtObj.pR + "px"));
                    }
                  };
                  if (target.className.includes('fa-rotate-90')) {
                    target.classList.toggle('fa-rotate-90');
                    $__2.noteParent().removeAttribute('data-shrink');
                    target.removeEventListener('drag', evtObj.dEvent);
                    target.removeEventListener('dragend', evtObj.dStopEvent);
                    return;
                  }
                  target.setAttribute('class', target.getAttribute('class') + ' fa-rotate-90');
                  $__2.noteParent().setAttribute('data-shrink', 'shrink');
                  target.addEventListener('drag', evtObj.dEvent);
                  target.addEventListener('dragend', evtObj.dStopEvent);
                  break;
              }
            });
          }}, {});
      }();
      var cc = new NoteListener();
      cc.triggerClicks();
      var AddNote = function() {
        function AddNote() {
          var addNote = document.querySelector('.add-note');
          this.addNote = function() {
            return addNote;
          };
        }
        return ($traceurRuntime.createClass)(AddNote, {
          showNote: function($__20) {
            var $__23 = $__20,
                page_title = $__23.page_title,
                fireEditNote = $__23.fireEditNote,
                title = $__23.title;
            var $__2 = this;
            var pageTitle = document.querySelector('.bible-add-note-text'),
                pageButton = document.querySelector('.bible-add-note-btn'),
                noteTitle = document.querySelector('.bible-add-note-title'),
                noteContent = document.querySelector('.bible-add-note-content');
            pageTitle.innerHTML = page_title;
            {
              if (page_title === 'Edit Note') {
                pageButton.setAttribute('class', pageButton.getAttribute('class') + " fa fa-pencil");
                var noteToEdit = JSON.parse(localStorage.getItem('___BIBLE-NOTE___'))[title];
                var $__21 = noteToEdit,
                    noteTT = $__21.title,
                    content = $__21.content;
                noteTitle.value = noteTT;
                noteContent.value = content;
                noteTitle.setAttribute('disabled', "true");
              } else {
                pageButton.setAttribute('class', pageButton.getAttribute('class') + " fa fa-plus");
                noteTitle.value = noteContent.value = "";
                if (noteTitle.hasAttribute('disabled'))
                  noteTitle.removeAttribute('disabled');
              }
            }
            this.addNote().setAttribute('style', 'visibility: visible;');
            this.addNote().addEventListener('click', function(e) {
              var target = e.target,
                  className = target.className;
              if (className.includes('bible-close')) {
                $__2.addNote().removeAttribute('style');
              } else if (className.includes('bible-add-note-btn')) {
                if (noteTitle.value.length < 10) {
                  AddNote.SetStatusMessage('Note title should not be less than 10 characters');
                  return;
                } else if (noteContent.value.length < 40) {
                  AddNote.SetStatusMessage('Note Content should not be less than 40 characters');
                  return;
                }
                if (page_title === 'Add Note') {
                  $__2.AddNote(noteTitle, noteContent);
                  return;
                }
                fireEditNote();
              }
            });
          },
          AddNote: function(noteTitle, noteContent) {
            var $__3;
            var getPrevItem = JSON.parse(localStorage.getItem('___BIBLE-NOTE___'));
            var isTrueFalse = (getPrevItem) ? true : false;
            var noteInfo = Object.create({});
            var obj = ($__3 = {}, Object.defineProperty($__3, ("" + noteTitle.value), {
              value: {
                title: noteTitle.value,
                content: noteContent.value,
                creationDate: new Date().toLocaleDateString()
              },
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3);
            if (!isTrueFalse) {
              Object.assign(noteInfo, obj);
              localStorage.setItem('___BIBLE-NOTE___', JSON.stringify(noteInfo));
              AddNote.SetStatusMessage('note has been succefully saved');
              this.addNote().removeAttribute('style');
              return;
            }
            Object.assign(noteInfo, getPrevItem, obj);
            localStorage.setItem('___BIBLE-NOTE___', JSON.stringify(noteInfo));
            AddNote.SetStatusMessage('note has been succefully saved');
            this.addNote().removeAttribute('style');
          }
        }, {SetStatusMessage: function(msg) {
            if (((typeof msg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(msg))) !== 'string') {
              throw Error(("expected a string as an argument but got " + ((typeof msg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(msg)))));
            }
            var bibleRep = document.querySelector(".bible-report");
            bibleRep.innerHTML = msg;
            bibleRep.setAttribute('style', 'visibility: visible');
            setTimeout(function() {
              bibleRep.removeAttribute('style');
            }, 3000);
          }});
      }();
      var ViewNote = function() {
        function ViewNote() {
          var viewNote = document.querySelector('.view-note');
          var viewNoteParent = document.querySelector('.bible-view-note-list');
          var SavedNotes = JSON.parse(localStorage.getItem("___BIBLE-NOTE___"));
          this.viewNote = function() {
            return viewNote;
          };
          this.viewNoteParent = function() {
            return viewNoteParent;
          };
          this.SavedNotes = function() {
            return SavedNotes;
          };
        }
        return ($traceurRuntime.createClass)(ViewNote, {
          showNote: function() {
            var options = arguments[0] !== (void 0) ? arguments[0] : {};
            if (!this.SavedNotes()) {
              AddNote.SetStatusMessage('No Note has been added yet');
              return;
            }
            this.viewNote().setAttribute('style', 'visibility:visible;');
            this.populateNote(options);
          },
          populateNote: function(options) {
            var $__23,
                $__21;
            var $__7 = true;
            var $__8 = false;
            var $__9 = undefined;
            try {
              for (var $__5 = void 0,
                  $__4 = (objectEntries(this.SavedNotes()))[Symbol.iterator](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
                var $__20 = $__5.value,
                    n = ($__23 = $__20[Symbol.iterator](), ($__21 = $__23.next()).done ? void 0 : $__21.value),
                    i = ($__21 = $__23.next()).done ? void 0 : $__21.value;
                {
                  var $__22 = i,
                      content = $__22.content,
                      creationDate = $__22.creationDate,
                      title = $__22.title;
                  var $__24 = options,
                      editwidget = $__24.editwidget,
                      deletewidget = $__24.deletewidget,
                      elistener = $__24.elistener,
                      dlistener = $__24.dlistener;
                  var viewNoteItem = document.createElement('li');
                  var noteTitle = document.createElement('p');
                  var noteDate = document.createElement('p');
                  noteTitle.innerHTML = title.substring(0, 10) + '...';
                  noteDate.innerHTML = creationDate;
                  if (editwidget) {
                    var editEl = document.createElement('p');
                    viewNoteItem.setAttribute('class', 'fa fa-pencil fa-5x  bible-view-note-item');
                    editEl.setAttribute('class', 'fa fa-pencil pull-right bible-note-edit');
                    viewNoteItem.appendChild(editEl);
                    elistener(i, noteTitle, noteDate, viewNoteItem, editEl, this.viewNoteParent().parentNode.querySelector('.bible-close'));
                  } else if (deletewidget) {
                    var delEl = document.createElement('p');
                    viewNoteItem.setAttribute('class', 'fa fa-remove fa-5x  bible-view-note-item');
                    delEl.setAttribute('class', 'fa fa-remove pull-right bible-note-delete');
                    viewNoteItem.appendChild(delEl);
                    dlistener(i, noteTitle, noteDate, viewNoteItem, delEl, this.viewNoteParent().parentNode.querySelector('.bible-close'));
                  } else {
                    viewNoteItem.setAttribute('class', 'fa fa-sticky-note fa-5x  bible-view-note-item');
                    this.listener({
                      content: content,
                      creationDate: creationDate,
                      title: title
                    }, noteTitle, noteDate, viewNoteItem, this.viewNoteParent().parentNode.querySelector('.bible-close'));
                  }
                  viewNoteItem.appendChild(noteTitle);
                  viewNoteItem.appendChild(noteDate);
                  this.viewNoteParent().appendChild(viewNoteItem);
                }
              }
            } catch ($__10) {
              $__8 = true;
              $__9 = $__10;
            } finally {
              try {
                if (!$__7 && $__4.return != null) {
                  $__4.return();
                }
              } finally {
                if ($__8) {
                  throw $__9;
                }
              }
            }
          },
          removeParentElement: function(el) {
            this.viewNote().removeAttribute('style');
            Array.from(this.viewNote().querySelectorAll('.bible-view-note-item'), function(el) {
              return el.remove();
            });
          },
          listener: function(n) {
            for (var args = [],
                $__18 = 1; $__18 < arguments.length; $__18++)
              args[$__18 - 1] = arguments[$__18];
            var $__2 = this;
            var $__7 = true;
            var $__8 = false;
            var $__9 = undefined;
            try {
              for (var $__5 = void 0,
                  $__4 = (args)[Symbol.iterator](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
                var i = $__5.value;
                {
                  i.addEventListener('click', function(e) {
                    var target = e.target;
                    if (target.className.includes('bible-close')) {
                      $__2.removeParentElement('bible-close');
                      return;
                    }
                    $__2.viewNoteContent(n);
                  });
                }
              }
            } catch ($__10) {
              $__8 = true;
              $__9 = $__10;
            } finally {
              try {
                if (!$__7 && $__4.return != null) {
                  $__4.return();
                }
              } finally {
                if ($__8) {
                  throw $__9;
                }
              }
            }
          },
          viewNoteContent: function(n) {
            var mdNote = document.querySelector('.bible-view-note-modal'),
                mdTitle = mdNote.querySelector('.bible-view-note-title').children[0],
                mdDate = mdNote.querySelector('.bible-view-note-creationDate').children[0],
                mdContent = mdNote.querySelector('.bible-view-note-content').children[0],
                mdClose = mdNote.querySelector('.bible-close');
            var $__20 = n,
                content = $__20.content,
                creationDate = $__20.creationDate,
                title = $__20.title;
            mdTitle.innerHTML = title, mdDate.innerHTML = creationDate, mdContent.innerHTML = content;
            mdNote.setAttribute('style', 'display: block;');
            mdClose.addEventListener('click', function(e) {
              var target = e.target;
              mdNote.removeAttribute('style');
            });
          }
        }, {});
      }();
      var EditNote = function($__super) {
        function EditNote() {
          var $__2;
          $traceurRuntime.superConstructor(EditNote).call(this);
          $traceurRuntime.superGet(this, EditNote.prototype, "showNote").call(this, {
            editwidget: true,
            elistener: ($__2 = this, function($__20) {
              var title = $__20.title;
              for (var args = [],
                  $__18 = 1; $__18 < arguments.length; $__18++)
                args[$__18 - 1] = arguments[$__18];
              var $__7 = true;
              var $__8 = false;
              var $__9 = undefined;
              try {
                for (var $__5 = void 0,
                    $__4 = (args)[Symbol.iterator](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
                  var i = $__5.value;
                  {
                    i.addEventListener('click', function(e) {
                      var target = e.target;
                      if (target.className.includes('bible-close')) {
                        $__2.removeParentElement('bible-close');
                        return;
                      } else if (target.className.includes('bible-note-edit')) {
                        var noteAdd = new AddNote();
                        noteAdd.showNote({
                          page_title: 'Edit Note',
                          fireEditNote: $__2.fireEditNote,
                          title: title
                        });
                        return;
                      }
                    });
                  }
                }
              } catch ($__10) {
                $__8 = true;
                $__9 = $__10;
              } finally {
                try {
                  if (!$__7 && $__4.return != null) {
                    $__4.return();
                  }
                } finally {
                  if ($__8) {
                    throw $__9;
                  }
                }
              }
            })
          });
        }
        return ($traceurRuntime.createClass)(EditNote, {fireEditNote: function(options) {
            var edNote = document.querySelector('.add-note');
            edNote.addEventListener('click', function(e) {
              var target = e.target;
              if (target.nodeName.toLowerCase() === 'button') {
                var nTitle = edNote.querySelector('.bible-add-note-title').value;
                nTitle = JSON.parse(localStorage.getItem('___BIBLE-NOTE___'))[nTitle];
                nTitle.content = edNote.querySelector('textarea').value;
                localStorage.setItem('___BIBLE-NOTE___', JSON.stringify(nTitle["title"][nTitle]));
                edNote.removeAttribute('style');
              }
            });
          }}, {}, $__super);
      }(ViewNote);
      var DeleteNote = function($__super) {
        function DeleteNote() {
          var $__2;
          $traceurRuntime.superConstructor(DeleteNote).call(this);
          $traceurRuntime.superGet(this, DeleteNote.prototype, "showNote").call(this, {
            deletewidget: true,
            dlistener: ($__2 = this, function(n) {
              for (var args = [],
                  $__18 = 1; $__18 < arguments.length; $__18++)
                args[$__18 - 1] = arguments[$__18];
              var $__7 = true;
              var $__8 = false;
              var $__9 = undefined;
              try {
                for (var $__5 = void 0,
                    $__4 = (args)[Symbol.iterator](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
                  var i = $__5.value;
                  {
                    i.addEventListener('click', function(e) {
                      var target = e.target;
                      if (target.className.includes('bible-close')) {
                        $__2.removeParentElement('bible-close');
                        return;
                      } else if (target.className.includes('bible-note-delete')) {
                        $__2.removeNote(n, target);
                        return;
                      }
                      $__2.viewNoteContent(n);
                    });
                  }
                }
              } catch ($__10) {
                $__8 = true;
                $__9 = $__10;
              } finally {
                try {
                  if (!$__7 && $__4.return != null) {
                    $__4.return();
                  }
                } finally {
                  if ($__8) {
                    throw $__9;
                  }
                }
              }
            })
          });
        }
        return ($traceurRuntime.createClass)(DeleteNote, {removeNote: function($__20, target) {
            var $__23,
                $__21;
            var tt = $__20.title;
            var $__7 = true;
            var $__8 = false;
            var $__9 = undefined;
            try {
              for (var $__5 = void 0,
                  $__4 = (objectEntries(this.SavedNotes()))[Symbol.iterator](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
                var $__24 = $__5.value,
                    n = ($__23 = $__24[Symbol.iterator](), ($__21 = $__23.next()).done ? void 0 : $__21.value),
                    i = ($__21 = $__23.next()).done ? void 0 : $__21.value;
                {
                  var title = i.title;
                  if (title.includes(tt)) {
                    target.parentNode.remove();
                    delete this.SavedNotes()[tt];
                    localStorage.setItem('___BIBLE-NOTE___', JSON.stringify(this.SavedNotes()));
                    if (Object.keys(this.SavedNotes()).length === 0) {
                      localStorage.removeItem('___BIBLE-NOTE___');
                      this.viewNote().removeAttribute('style');
                    }
                  }
                }
              }
            } catch ($__10) {
              $__8 = true;
              $__9 = $__10;
            } finally {
              try {
                if (!$__7 && $__4.return != null) {
                  $__4.return();
                }
              } finally {
                if ($__8) {
                  throw $__9;
                }
              }
            }
          }}, {}, $__super);
      }(ViewNote);
      module.exports = {AddNote: AddNote};
    }, {"./loadRequested.js": 11}],
    15: [function(require, module, exports) {
      var Settings = function() {
        function Settings() {
          var bibleSettings = document.querySelector('.bible-list');
          var _strage = localStorage.getItem("bible_settings");
          if (!_strage) {
            console.log('no');
            localStorage.setItem("bible_settings", JSON.stringify({}));
            _strage = localStorage.getItem("bible_settings");
          }
          this.bibleSettings = function(_) {
            return bibleSettings;
          };
          console.log(_strage);
          this.Storage = JSON.parse(_strage);
          this.clicks();
        }
        return ($traceurRuntime.createClass)(Settings, {clicks: function() {
            var $__2 = this;
            this.bibleSettings().addEventListener('click', function(e) {
              var target = e.target,
                  pNode = target.parentNode,
                  targetClass = target.getAttribute('class');
              if (pNode.nodeName.toLowerCase() === "li" && /^(on)$|^(off)$/.test(targetClass)) {
                var _attribute = pNode.getAttribute('data-type'),
                    value = Settings.removeCurrent(target, pNode);
                if (value) {
                  Settings.Save(_attribute, value, $__2);
                }
              }
            });
          }}, {
          initSettings: function() {
            return new Settings();
          },
          Save: function(key, value, _this) {
            _this.Storage[key] = value;
            localStorage.setItem("bible_settings", JSON.stringify(_this.Storage));
          },
          setCurrent: function(target) {
            if (!target.hasAttribute("data-current")) {
              target.setAttribute("data-current", "current");
              return target.getAttribute("class");
            }
            return undefined;
          },
          removeCurrent: function(target, pNode) {
            var toNotRemove = Settings.setCurrent(target);
            if (!toNotRemove)
              return false;
            if (toNotRemove === "on") {
              pNode.querySelector('.off').removeAttribute("data-current");
              return "on";
            }
            pNode.querySelector('.on').removeAttribute("data-current");
            return "off";
          }
        });
      }();
      Settings.initSettings();
    }, {}],
    16: [function(require, module, exports) {
      var Todo = function() {
        function Todo() {}
        return ($traceurRuntime.createClass)(Todo, {
          triggerAdd: function() {
            var $__2 = this;
            var todoAddParent = document.querySelector('.todo-add-parent');
            var cover = document.querySelector('.bible-head-cover');
            todoAddParent.setAttribute('style', 'visibility: visible;');
            var todoClose = todoAddParent.querySelector('.todo-bible-close');
            var todoAddTodo = todoAddParent.querySelector('.todo-add-button');
            todoClose.addEventListener('click', function(e) {
              var target = e.target;
              var d = document.querySelector(("." + target.getAttribute('data-remove')));
              d.removeAttribute('style');
            });
            todoAddTodo.addEventListener('click', function(e) {
              var date = todoAddParent.querySelector('input[type="date"]');
              var time = todoAddParent.querySelector('input[type="time"]');
              var todo = todoAddParent.querySelector('textarea');
              $__2.addTodo(date, time, todo, todoAddParent);
            });
          },
          addTodo: function(date, time, todo, parent) {
            var $__3;
            var savedate = date.value.replace(/-/g, '');
            var savetime = time.value.replace(/-/g, '');
            var savetodo = todo.value;
            {
              if ((String(savedate).length === 0)) {
                Todo.SetStatusMessage("Please use a proper date");
                return;
              } else if (String(savetime).length === 0) {
                Todo.SetStatusMessage("Please use a proper time");
                return;
              } else if (savetodo.length < 30) {
                Todo.SetStatusMessage("Your Todo Message should be greater than 30 characters");
                return;
              }
            }
            var getPrevItem = JSON.parse(localStorage.getItem('___TODO___'));
            var isTrueFalse = (getPrevItem) ? true : false;
            var todoInfo = Object.create({});
            var obj = ($__3 = {}, Object.defineProperty($__3, savetodo.substring(0, 30), {
              value: {
                todo_date: savedate,
                todo_content: savetodo,
                todo_time: savetime
              },
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3);
            if (!isTrueFalse) {
              Object.assign(todoInfo, obj);
              localStorage.setItem('___TODO___', JSON.stringify(todoInfo));
              Todo.SetStatusMessage('todo has been succefully saved');
              parent.removeAttribute('style');
              return;
            }
            Object.assign(todoInfo, getPrevItem, obj);
            localStorage.setItem('___TODO___', JSON.stringify(todoInfo));
            Todo.SetStatusMessage('todo has been succefully saved');
            parent.removeAttribute('style');
          },
          viewTodo: function() {
            var $__2 = this;
            var todo_Obj,
                todoViewParent = document.querySelector(".view-todo"),
                todoView = document.querySelector(".todo-list");
            if ((todo_Obj = localStorage.getItem('___TODO___'))) {
              todo_Obj = JSON.parse(todo_Obj);
              todoViewParent.setAttribute('style', 'visibility: visible;');
              var $__7 = true;
              var $__8 = false;
              var $__9 = undefined;
              try {
                for (var $__5 = void 0,
                    $__4 = (Object.keys(todo_Obj))[Symbol.iterator](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
                  var _j = $__5.value;
                  {
                    var $__19 = todo_Obj[_j],
                        todo_date = $__19.todo_date,
                        todo_time = $__19.todo_time,
                        todo_content = $__19.todo_content;
                    var listElement = document.createElement('li'),
                        dateElement = document.createElement('p'),
                        timeElement = document.createElement('p'),
                        contentElement = document.createElement('p'),
                        deleteTodo = document.createElement('span'),
                        markCompleted = document.createElement('span');
                    dateElement.innerHTML = todo_date, timeElement.innerHTML = todo_time, contentElement.innerHTML = todo_content, deleteTodo.innerHTML = "Delete";
                    listElement.setAttribute('class', 'todo-view-item');
                    dateElement.setAttribute('class', 'todo-date');
                    deleteTodo.setAttribute('class', 'fa todo-delete-todo pull-right');
                    timeElement.setAttribute('class', 'todo-time');
                    contentElement.setAttribute('class', '_todo-content');
                    markCompleted.setAttribute('class', 'fa fa-check-circle pull-right todo-check');
                    listElement.appendChild(dateElement);
                    listElement.appendChild(timeElement);
                    listElement.appendChild(contentElement);
                    listElement.appendChild(deleteTodo);
                    listElement.appendChild(markCompleted);
                    todoView.appendChild(listElement);
                    markCompleted.addEventListener('click', function(e) {
                      var target = e.target;
                      var parent = target.parentNode;
                      if (parent.getAttribute('data-completed') === 'completed') {
                        return false;
                      }
                      parent.setAttribute('data-completed', 'completed');
                    });
                  }
                }
              } catch ($__10) {
                $__8 = true;
                $__9 = $__10;
              } finally {
                try {
                  if (!$__7 && $__4.return != null) {
                    $__4.return();
                  }
                } finally {
                  if ($__8) {
                    throw $__9;
                  }
                }
              }
            } else {
              Todo.SetStatusMessage("No Todo has been added yet");
              return;
            }
            todoViewParent.addEventListener('click', function(e) {
              var target = e.target;
              if (target.getAttribute('class').includes('bible-close')) {
                todoViewParent.removeAttribute('style');
                Array.from(todoView.children, function(el) {
                  el.remove();
                });
              } else if (target.getAttribute('class').includes('todo-delete-todo')) {
                $__2.removeTodo(target);
              }
            });
          },
          removeTodo: function(target) {
            var pNode = target.parentNode;
            var contEl = pNode.querySelector('._todo-content');
            var todoRenderedList = pNode.parentNode;
            var __todo__ = JSON.parse(localStorage.getItem("___TODO___"));
            var $__7 = true;
            var $__8 = false;
            var $__9 = undefined;
            try {
              for (var $__5 = void 0,
                  $__4 = (Object.keys(__todo__))[Symbol.iterator](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
                var miniObj = $__5.value;
                {
                  var $__19 = __todo__[miniObj],
                      todo_date = $__19.todo_date,
                      todo_time = $__19.todo_time,
                      todo_content = $__19.todo_content;
                  todo_content = todo_content.substring(0, 30);
                  if (todo_content === contEl.innerHTML.substring(0, 30)) {
                    delete __todo__[miniObj];
                    localStorage.removeItem("___TODO___");
                    localStorage.setItem("___TODO___", JSON.stringify(__todo__));
                    pNode.remove();
                    if (todoRenderedList.children.length === 0) {
                      todoRenderedList.parentNode.parentNode.removeAttribute('style');
                    }
                    break;
                  }
                }
              }
            } catch ($__10) {
              $__8 = true;
              $__9 = $__10;
            } finally {
              try {
                if (!$__7 && $__4.return != null) {
                  $__4.return();
                }
              } finally {
                if ($__8) {
                  throw $__9;
                }
              }
            }
            if (Object.keys(__todo__).length === 0) {
              localStorage.removeItem("___TODO___");
              return;
            }
          }
        }, {SetStatusMessage: function(msg) {
            if (((typeof msg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(msg))) !== 'string') {
              throw Error(("expected a string as an argument but got " + ((typeof msg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(msg)))));
            }
            var bibleRep = document.querySelector(".bible-report");
            bibleRep.innerHTML = msg;
            bibleRep.setAttribute('style', 'visibility: visible');
            setTimeout(function() {
              bibleRep.removeAttribute('style');
            }, 3000);
          }});
      }();
      module.exports = Todo;
    }, {}]
  }, {}, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
  return {};
});
$traceurRuntime.getModule("../advance_bible.js" + '');
