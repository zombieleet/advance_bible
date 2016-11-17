$traceurRuntime.registerModule("loadRequested.js", [], function() {
  "use strict";
  var $__9 = $traceurRuntime.initGeneratorFunction(objectEntries);
  var __moduleName = "loadRequested.js";
  function objectEntries(obj) {
    var propKeys,
        $__5,
        $__6,
        $__7,
        $__3,
        $__2,
        propKey,
        $__8;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            propKeys = Object.keys(obj);
            $__5 = true;
            $__6 = false;
            $__7 = undefined;
            $ctx.state = 24;
            break;
          case 24:
            $ctx.pushTry(10, 11);
            $ctx.state = 13;
            break;
          case 13:
            $__3 = void 0, $__2 = (propKeys)[Symbol.iterator]();
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = (!($__5 = ($__3 = $__2.next()).done)) ? 5 : 7;
            break;
          case 4:
            $__5 = true;
            $ctx.state = 9;
            break;
          case 5:
            propKey = $__3.value;
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
            $__8 = $ctx.storedException;
            $ctx.state = 16;
            break;
          case 16:
            $__6 = true;
            $__7 = $__8;
            $ctx.state = 11;
            $ctx.finallyFallThrough = -2;
            break;
          case 11:
            $ctx.popTry();
            $ctx.state = 22;
            break;
          case 22:
            try {
              if (!$__5 && $__2.return != null) {
                $__2.return();
              }
            } finally {
              if ($__6) {
                throw $__7;
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
    }, $__9, this);
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
  return {
    get objectEntries() {
      return objectEntries;
    },
    get GetJson() {
      return GetJson;
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
        var $__4 = this;
        this.concord().addEventListener('click', function(e) {
          $__4.concordModal().style["display"] = "flex";
          $__4.concordModal().setAttribute('data-location', 'bringdown');
          $__4.bibleCover().removeAttribute('data-display');
        });
        return this;
      },
      closeModal: function() {
        var $__4 = this;
        this.close().addEventListener('click', function(e) {
          $__4.concordModal().setAttribute('data-location', 'bringup');
          setTimeout(function() {
            $__4.bibleCover().setAttribute('data-display', 'none');
            $__4.concordModal().style["display"] = "none";
          }, 50);
        });
        return this;
      },
      prom: function(inputValue, arg) {
        return new Promise(function(resolve, reject) {
          try {} catch (ex) {}
        });
      },
      searchConcord: function() {
        var $__4 = this;
        this.search().addEventListener('click', function(e) {
          if ($__4.bibleInput().value.length === 0) {
            return false;
          }
          $__4.concordModal().setAttribute('data-location', 'bringup');
          setTimeout(function() {
            $__4.bibleCover().setAttribute('data-display', 'none');
            $__4.concordModal().style["display"] = "none";
            var getConcord = new GetJson("js/jsons/oldtestament.json");
            getConcord.loadJson().then(function(concord) {
              var $__13,
                  $__14;
              var $__8 = true;
              var $__9 = false;
              var $__10 = undefined;
              try {
                var $__20 = function() {
                  var $__12 = $__6.value,
                      index = ($__13 = $__12[Symbol.iterator](), ($__14 = $__13.next()).done ? void 0 : $__14.value),
                      value = ($__14 = $__13.next()).done ? void 0 : $__14.value;
                  {
                    var getLocationConcord = new GetJson(("js/jsons/" + value + ".json"));
                    var i = 0;
                    var j = 1;
                    getLocationConcord.loadJson().then(function(concord) {
                      var $__17,
                          $__18;
                      var $__15 = concord,
                          book = $__15.book,
                          chapters = $__15.chapters;
                      var $__8 = true;
                      var $__9 = false;
                      var $__10 = undefined;
                      try {
                        for (var $__6 = void 0,
                            $__5 = (objectEntries(chapters))[Symbol.iterator](); !($__8 = ($__6 = $__5.next()).done); $__8 = true) {
                          var $__16 = $__6.value,
                              index$__21 = ($__17 = $__16[Symbol.iterator](), ($__18 = $__17.next()).done ? void 0 : $__18.value),
                              versesValue = ($__18 = $__17.next()).done ? void 0 : $__18.value;
                          {
                            var $__19 = versesValue,
                                chapter = $__19.chapter,
                                verses = $__19.verses;
                            try {
                              var inputValue = $__4.bibleInput().value;
                              var textOfVerse = verses[i][j];
                              if (RegExp(inputValue, "ig").match(textOfVerse)) {
                                console.log(book, chapter, (Number(Reflect.ownKeys(verses[i])[0]) - 1), textOfVerse.join(" "));
                              }
                            } catch (ex) {}
                            ;
                            i = i + 1;
                            j = j + 1;
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
                    });
                  }
                };
                for (var $__6 = void 0,
                    $__5 = (objectEntries(concord))[Symbol.iterator](); !($__8 = ($__6 = $__5.next()).done); $__8 = true) {
                  $__20();
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
            });
          }, 50);
        });
      }
    }, {check: function(inputValue, splitText) {
        var $__8 = true;
        var $__9 = false;
        var $__10 = undefined;
        try {
          for (var $__6 = void 0,
              $__5 = (splitText)[Symbol.iterator](); !($__8 = ($__6 = $__5.next()).done); $__8 = true) {
            var text = $__6.value;
            {
              console.log(text);
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
      }});
  }();
  var q = new Concord();
  q.showConcord().closeModal().searchConcord();
  return {};
});
$traceurRuntime.getModule("../traceur/concord.trace" + '');
