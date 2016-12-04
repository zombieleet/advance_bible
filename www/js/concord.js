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
$traceurRuntime.registerModule("../traceur/concord.trace", [], function() {
  "use strict";
  var __moduleName = "../traceur/concord.trace";
  var GetJson = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("loadRequested.js", "../traceur/concord.trace")).GetJson;
  var objectEntries = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("loadRequested.js", "../traceur/concord.trace")).objectEntries;
  var Concord = function() {
    function Concord() {
      var concord = document.querySelector('.bible-concord');
      var concordModal = document.querySelector('#BibleConcord');
      var bibleCover = document.querySelector('.bible-cover');
      var close = document.querySelector('.bible-close');
      var search = document.querySelector('.bible-start-search');
      var bibleInput = document.querySelector('.bible-search-concord');
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
    }
    return ($traceurRuntime.createClass)(Concord, {
      showConcord: function() {
        var $__1 = this;
        this.concord().addEventListener('click', function(e) {
          $__1.concordModal().style["display"] = "flex";
          $__1.concordModal().setAttribute('data-location', 'bringdown');
          $__1.bibleCover().removeAttribute('data-display');
        });
        return this;
      },
      closeModal: function() {
        var $__1 = this;
        this.close().addEventListener('click', function(e) {
          $__1.bibleCover().setAttribute('data-display', 'none');
          $__1.concordModal().style["display"] = "none";
        });
        return this;
      },
      prom: function(inputValue, arg) {
        return new Promise(function(resolve, reject) {
          try {} catch (ex) {}
        });
      },
      searchConcord: function() {
        var $__1 = this;
        this.search().addEventListener('click', function(e) {
          e.preventDefault();
          if ($__1.bibleInput().value.length === 0) {
            return false;
          }
          $__1.concordModal().setAttribute('data-location', 'bringup');
          setTimeout(function() {
            $__1.bibleCover().setAttribute('data-display', 'none');
            $__1.concordModal().style["display"] = "none";
            var getConcord = new GetJson("js/jsons/oldtestament.json");
            getConcord.loadJson().then(function(concord) {
              var $__10,
                  $__11;
              var q = 0;
              var $__5 = true;
              var $__6 = false;
              var $__7 = undefined;
              try {
                for (var $__3 = void 0,
                    $__2 = (objectEntries(concord))[Symbol.iterator](); !($__5 = ($__3 = $__2.next()).done); $__5 = true) {
                  var $__9 = $__3.value,
                      index = ($__10 = $__9[Symbol.iterator](), ($__11 = $__10.next()).done ? void 0 : $__11.value),
                      nameOfLocation = ($__11 = $__10.next()).done ? void 0 : $__11.value;
                  {
                    var getLocationConcord = new GetJson(("js/jsons/" + nameOfLocation + ".json"));
                    getLocationConcord.loadJson().then(function(concord) {
                      var $__14,
                          $__15;
                      var $__12 = concord,
                          book = $__12.book,
                          chapters = $__12.chapters;
                      var $__5 = true;
                      var $__6 = false;
                      var $__7 = undefined;
                      try {
                        for (var $__3 = void 0,
                            $__2 = (objectEntries(chapters))[Symbol.iterator](); !($__5 = ($__3 = $__2.next()).done); $__5 = true) {
                          var $__13 = $__3.value,
                              index$__17 = ($__14 = $__13[Symbol.iterator](), ($__15 = $__14.next()).done ? void 0 : $__15.value),
                              versesValue = ($__15 = $__14.next()).done ? void 0 : $__15.value;
                          {
                            var $__16 = versesValue,
                                chapter = $__16.chapter,
                                verses = $__16.verses;
                            var worker = new Worker('thread/concord.js');
                            worker.postMessage("hi");
                            worker.addEventListener('message', function(evt) {
                              console.log(evt);
                            });
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
                    });
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
            });
          }, 50);
        });
      }
    }, {check: function(inputValue, splitText) {
        var $__5 = true;
        var $__6 = false;
        var $__7 = undefined;
        try {
          for (var $__3 = void 0,
              $__2 = (splitText)[Symbol.iterator](); !($__5 = ($__3 = $__2.next()).done); $__5 = true) {
            var text = $__3.value;
            {
              console.log(text);
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
      }});
  }();
  var q = new Concord();
  q.showConcord().closeModal().searchConcord();
  return {};
});
$traceurRuntime.getModule("../traceur/concord.trace" + '');
