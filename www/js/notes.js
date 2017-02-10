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
          var bibleHeadCover = document.querySelector('.bible-head-cover');
          if (target.classList.toString().includes("bible-location")) {
            Modal.searchJson(target.textContent.replace(/\s+/g, ""));
            qq.removeAttribute('data-display');
            bibleHeadCover.removeAttribute('data-display');
          } else if (target.classList.toString().includes("bible-label-chapter")) {
            var currentOpenLocation = document.querySelector('.bible-book-name').innerHTML;
            Modal.searchJson(currentOpenLocation.replace(/\s+/g, ""));
            qq.removeAttribute('data-display');
            bibleHeadCover.removeAttribute('data-display');
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
$traceurRuntime.registerModule("../traceur/notes.es6", [], function() {
  "use strict";
  var __moduleName = "../traceur/notes.es6";
  var objectEntries = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../dep/loadRequested.js", "../traceur/notes.es6")).objectEntries;
  var NoteListener = function() {
    function NoteListener() {
      var noteParent = document.querySelector('.bible-note');
      this.noteParent = function() {
        return noteParent;
      };
    }
    return ($traceurRuntime.createClass)(NoteListener, {triggerClicks: function() {
        var $__3 = this;
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
                  $__3.noteParent().setAttribute('style', ("left:" + evtObj.pL + "px;top:" + evtObj.pT + "px;right:" + evtObj.pR + "px"));
                }
              };
              if (target.className.includes('fa-rotate-90')) {
                target.classList.toggle('fa-rotate-90');
                $__3.noteParent().removeAttribute('data-shrink');
                target.removeEventListener('drag', evtObj.dEvent);
                target.removeEventListener('dragend', evtObj.dStopEvent);
                return;
              }
              target.setAttribute('class', target.getAttribute('class') + ' fa-rotate-90');
              $__3.noteParent().setAttribute('data-shrink', 'shrink');
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
      showNote: function($__13) {
        var $__14 = $__13,
            page_title = $__14.page_title,
            fireEditNote = $__14.fireEditNote,
            title = $__14.title;
        var $__3 = this;
        var pageTitle = document.querySelector('.bible-add-note-text'),
            pageButton = document.querySelector('.bible-add-note-btn'),
            noteTitle = document.querySelector('.bible-add-note-title'),
            noteContent = document.querySelector('.bible-add-note-content');
        pageTitle.innerHTML = page_title;
        pageButton.innerHTML = page_title;
        {
          if (page_title === 'Edit Note') {
            var noteToEdit = JSON.parse(localStorage.getItem('___BIBLE-NOTE___'))[title];
            var $__15 = noteToEdit,
                noteTT = $__15.title,
                content = $__15.content;
            noteTitle.value = noteTT;
            noteContent.value = content;
            noteTitle.setAttribute('disabled', "true");
          } else {
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
            $__3.addNote().removeAttribute('style');
          } else if (className.includes('bible-add-note-btn')) {
            if (noteTitle.value.length < 10) {
              AddNote.SetNoteStatus('Note title should not be less than 10 characters');
              return;
            } else if (noteContent.value.length < 40) {
              AddNote.SetNoteStatus('Note Content should not be less than 40 characters');
              return;
            }
            if (page_title === 'Add Note') {
              $__3.AddNote(noteTitle, noteContent);
              return;
            }
            fireEditNote();
          }
        });
      },
      AddNote: function(noteTitle, noteContent) {
        var $__4;
        var getPrevItem = JSON.parse(localStorage.getItem('___BIBLE-NOTE___'));
        var isTrueFalse = (getPrevItem) ? true : false;
        var noteInfo = Object.create({});
        var obj = ($__4 = {}, Object.defineProperty($__4, ("" + noteTitle.value), {
          value: {
            title: noteTitle.value,
            content: noteContent.value,
            creationDate: new Date().toLocaleDateString()
          },
          configurable: true,
          enumerable: true,
          writable: true
        }), $__4);
        if (!isTrueFalse) {
          Object.assign(noteInfo, obj);
          localStorage.setItem('___BIBLE-NOTE___', JSON.stringify(noteInfo));
          AddNote.SetNoteStatus('note has been succefully saved');
          this.addNote().removeAttribute('style');
          return;
        }
        Object.assign(noteInfo, getPrevItem, obj);
        localStorage.setItem('___BIBLE-NOTE___', JSON.stringify(noteInfo));
        AddNote.SetNoteStatus('note has been succefully saved');
        this.addNote().removeAttribute('style');
      }
    }, {SetNoteStatus: function(msg) {
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
          AddNote.SetNoteStatus('No Note has been added yet');
          return;
        }
        this.viewNote().setAttribute('style', 'visibility:visible;');
        this.populateNote(options);
      },
      populateNote: function(options) {
        var $__14,
            $__15;
        var $__8 = true;
        var $__9 = false;
        var $__10 = undefined;
        try {
          for (var $__6 = void 0,
              $__5 = (objectEntries(this.SavedNotes()))[Symbol.iterator](); !($__8 = ($__6 = $__5.next()).done); $__8 = true) {
            var $__13 = $__6.value,
                n = ($__14 = $__13[Symbol.iterator](), ($__15 = $__14.next()).done ? void 0 : $__15.value),
                i = ($__15 = $__14.next()).done ? void 0 : $__15.value;
            {
              var $__16 = i,
                  content = $__16.content,
                  creationDate = $__16.creationDate,
                  title = $__16.title;
              var $__17 = options,
                  editwidget = $__17.editwidget,
                  deletewidget = $__17.deletewidget,
                  elistener = $__17.elistener,
                  dlistener = $__17.dlistener;
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
      },
      removeParentElement: function(el) {
        this.viewNote().removeAttribute('style');
        Array.from(this.viewNote().querySelectorAll('.bible-view-note-item'), function(el) {
          return el.remove();
        });
      },
      listener: function(n) {
        for (var args = [],
            $__12 = 1; $__12 < arguments.length; $__12++)
          args[$__12 - 1] = arguments[$__12];
        var $__3 = this;
        var $__8 = true;
        var $__9 = false;
        var $__10 = undefined;
        try {
          for (var $__6 = void 0,
              $__5 = (args)[Symbol.iterator](); !($__8 = ($__6 = $__5.next()).done); $__8 = true) {
            var i = $__6.value;
            {
              i.addEventListener('click', function(e) {
                var target = e.target;
                if (target.className.includes('bible-close')) {
                  $__3.removeParentElement('bible-close');
                  return;
                }
                $__3.viewNoteContent(n);
              });
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
      },
      viewNoteContent: function(n) {
        var mdNote = document.querySelector('.bible-view-note-modal'),
            mdTitle = mdNote.querySelector('.bible-view-note-title').children[0],
            mdDate = mdNote.querySelector('.bible-view-note-creationDate').children[0],
            mdContent = mdNote.querySelector('.bible-view-note-content').children[0],
            mdClose = mdNote.querySelector('.bible-close');
        var $__13 = n,
            content = $__13.content,
            creationDate = $__13.creationDate,
            title = $__13.title;
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
      var $__3;
      $traceurRuntime.superConstructor(EditNote).call(this);
      $traceurRuntime.superGet(this, EditNote.prototype, "showNote").call(this, {
        editwidget: true,
        elistener: ($__3 = this, function($__13) {
          var title = $__13.title;
          for (var args = [],
              $__12 = 1; $__12 < arguments.length; $__12++)
            args[$__12 - 1] = arguments[$__12];
          var $__8 = true;
          var $__9 = false;
          var $__10 = undefined;
          try {
            for (var $__6 = void 0,
                $__5 = (args)[Symbol.iterator](); !($__8 = ($__6 = $__5.next()).done); $__8 = true) {
              var i = $__6.value;
              {
                i.addEventListener('click', function(e) {
                  var target = e.target;
                  if (target.className.includes('bible-close')) {
                    $__3.removeParentElement('bible-close');
                    return;
                  } else if (target.className.includes('bible-note-edit')) {
                    var noteAdd = new AddNote();
                    noteAdd.showNote({
                      page_title: 'Edit Note',
                      fireEditNote: $__3.fireEditNote,
                      title: title
                    });
                    return;
                  }
                });
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
      var $__3;
      $traceurRuntime.superConstructor(DeleteNote).call(this);
      $traceurRuntime.superGet(this, DeleteNote.prototype, "showNote").call(this, {
        deletewidget: true,
        dlistener: ($__3 = this, function(n) {
          for (var args = [],
              $__12 = 1; $__12 < arguments.length; $__12++)
            args[$__12 - 1] = arguments[$__12];
          var $__8 = true;
          var $__9 = false;
          var $__10 = undefined;
          try {
            for (var $__6 = void 0,
                $__5 = (args)[Symbol.iterator](); !($__8 = ($__6 = $__5.next()).done); $__8 = true) {
              var i = $__6.value;
              {
                i.addEventListener('click', function(e) {
                  var target = e.target;
                  if (target.className.includes('bible-close')) {
                    $__3.removeParentElement('bible-close');
                    return;
                  } else if (target.className.includes('bible-note-delete')) {
                    $__3.removeNote(n, target);
                    return;
                  }
                  $__3.viewNoteContent(n);
                });
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
        })
      });
    }
    return ($traceurRuntime.createClass)(DeleteNote, {removeNote: function($__13, target) {
        var $__14,
            $__15;
        var tt = $__13.title;
        var $__8 = true;
        var $__9 = false;
        var $__10 = undefined;
        try {
          for (var $__6 = void 0,
              $__5 = (objectEntries(this.SavedNotes()))[Symbol.iterator](); !($__8 = ($__6 = $__5.next()).done); $__8 = true) {
            var $__17 = $__6.value,
                n = ($__14 = $__17[Symbol.iterator](), ($__15 = $__14.next()).done ? void 0 : $__15.value),
                i = ($__15 = $__14.next()).done ? void 0 : $__15.value;
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
      }}, {}, $__super);
  }(ViewNote);
  return {};
});
$traceurRuntime.getModule("../traceur/notes.es6" + '');
