import { objectEntries } from '../dep/loadRequested.js';
class NoteListener {
    constructor() {
        let noteParent = document.querySelector('.bible-note');
        this.noteParent = () => noteParent;
    }

    triggerClicks() {
        this.noteParent().addEventListener('click', e => {

            let target = e.target,
                className = target.className,
                dataPointer = target.getAttribute('data-pointer');

            switch (dataPointer) {
                case "bible-add-note":
                    // this.bibleCover().removeAttribute('data-display');
                    let noteAdd = new AddNote();
                    noteAdd.showNote({
                        page_title: 'Add Note'
                    });
                    break;
                case "bible-edit-note":
                    let noteEdit = new EditNote();

                    break;
                case "bible-view-note":
                    let noteView = new ViewNote();
                    noteView.showNote();
                    break;
                case "bible-delete-note":
                    let noteDelete = new DeleteNote();
                    break;
                case "bible-pushpin":

                    let evtObj = {
                        dEvent: e => {
                            let target = e.target;
                            let pL = e.clientX - target.getBoundingClientRect().left;
                            let pT = e.clientY - target.getBoundingClientRect().top;
                            let pR = e.clientY - target.getBoundingClientRect().right;



                            Object.assign(evtObj, { pL, pT, pR })
                        },
                        dStopEvent: e => {
                            let target = e.target;
                            this.noteParent().setAttribute('style', `left:${evtObj.pL}px;top:${evtObj.pT}px;right:${evtObj.pR}px`);
                        }
                    }

                    if (target.className.includes('fa-rotate-90')) {
                        target.classList.toggle('fa-rotate-90');
                        this.noteParent().removeAttribute('data-shrink');

                        target.removeEventListener('drag', evtObj.dEvent);
                        target.removeEventListener('dragend', evtObj.dStopEvent);
                        return;
                    }

                    target.setAttribute('class', target.getAttribute('class') + ' fa-rotate-90');
                    this.noteParent().setAttribute('data-shrink', 'shrink');

                    target.addEventListener('drag', evtObj.dEvent);
                    target.addEventListener('dragend', evtObj.dStopEvent);
                    break;

            }

        });
    }
}

let cc = new NoteListener();

cc.triggerClicks();



class AddNote /*extends NoteListener*/ {

    constructor() {
        // super()
        let addNote = document.querySelector('.add-note');
        this.addNote = () => addNote;
    }
    static SetNoteStatus(msg) {

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
    showNote({page_title, fireEditNote, title}) {

        let pageTitle = document.querySelector('.bible-add-note-text'),
            pageButton = document.querySelector('.bible-add-note-btn'),
            noteTitle = document.querySelector('.bible-add-note-title'),
            noteContent = document.querySelector('.bible-add-note-content');

        pageTitle.innerHTML = page_title;
        pageButton.innerHTML = page_title;

        // run this in a local scope
        {
            if (page_title === 'Edit Note') {

                let noteToEdit = JSON.parse(localStorage.getItem('___BIBLE-NOTE___'))[title];

                let { title: noteTT, content} = noteToEdit;

                noteTitle.value = noteTT;
                noteContent.value = content;

                noteTitle.setAttribute('disabled', "true");

            } else {

                // lets assume the value property of the input HTMLElement is not empty
                noteTitle.value = noteContent.value = ""
                if (noteTitle.hasAttribute('disabled')) noteTitle.removeAttribute('disabled');
            }

        }

        this.addNote().setAttribute('style', 'visibility: visible;');

        this.addNote().addEventListener('click', e => {

            let target = e.target,
                className = target.className;

            if (className.includes('bible-close')) {
                // console.log(this.bibleCover());
                this.addNote().removeAttribute('style');
            } else if (className.includes('bible-add-note-btn')) {

                if (noteTitle.value.length < 10) {

                    AddNote.SetNoteStatus('Note title should not be less than 10 characters');
                    return;

                } else if (noteContent.value.length < 40) {

                    AddNote.SetNoteStatus('Note Content should not be less than 40 characters');
                    return;
                }

                if (page_title === 'Add Note') {
                    this.AddNote(noteTitle, noteContent);
                    return;
                }
                fireEditNote();
            }


        });
    }

    AddNote(noteTitle, noteContent) {


        let getPrevItem = JSON.parse(localStorage.getItem('___BIBLE-NOTE___'));
        let isTrueFalse = (getPrevItem) ? true : false;
        let noteInfo = Object.create({});

        let obj = {

            [`${noteTitle.value}`]: {
                title: noteTitle.value,
                content: noteContent.value,
                creationDate: new Date().toLocaleDateString()
            }

        }

        if (!isTrueFalse) {

            Object.assign(noteInfo, obj)
            localStorage.setItem('___BIBLE-NOTE___',
                JSON.stringify(noteInfo));
            AddNote.SetNoteStatus('note has been succefully saved');
            this.addNote().removeAttribute('style');
            return;

        }

        Object.assign(noteInfo, getPrevItem, obj)
        localStorage.setItem('___BIBLE-NOTE___',
            JSON.stringify(noteInfo));
        AddNote.SetNoteStatus('note has been succefully saved');
        this.addNote().removeAttribute('style');

    }

}

class ViewNote {
    constructor() {
        let viewNote = document.querySelector('.view-note');
        let viewNoteParent = document.querySelector('.bible-view-note-list');
        let SavedNotes = JSON.parse(localStorage.getItem("___BIBLE-NOTE___"));

        this.viewNote = () => viewNote;
        this.viewNoteParent = () => viewNoteParent;
        this.SavedNotes = () => SavedNotes;
    }

    showNote(options = {}) {



        if (!this.SavedNotes()) {
            AddNote.SetNoteStatus('No Note has been added yet');
            return;
        }

        this.viewNote().setAttribute('style', 'visibility:visible;');

        this.populateNote(options);


    }
    populateNote(options) {



        for (let [n, i] of objectEntries(this.SavedNotes())) {

            let { content, creationDate, title } = i;
            let { editwidget, deletewidget, elistener, dlistener } = options;


            let viewNoteItem = document.createElement('li');
            let noteTitle = document.createElement('p')
            let noteDate = document.createElement('p');
            // let editWidget = ( editwidget ) ? document.createElement('p') : '';


            noteTitle.innerHTML = title.substring(0, 10) + '...';
            noteDate.innerHTML = creationDate;


            if (editwidget) {

                let editEl = document.createElement('p');

                viewNoteItem.setAttribute('class', 'fa fa-pencil fa-5x  bible-view-note-item');
                editEl.setAttribute('class', 'fa fa-pencil pull-right bible-note-edit');

                viewNoteItem.appendChild(editEl);

                elistener(
                    i,
                    noteTitle, noteDate, viewNoteItem, editEl,
                    this.viewNoteParent().parentNode.querySelector('.bible-close')
                );

            } else if (deletewidget) {

                let delEl = document.createElement('p');

                viewNoteItem.setAttribute('class', 'fa fa-remove fa-5x  bible-view-note-item');
                delEl.setAttribute('class', 'fa fa-remove pull-right bible-note-delete');

                viewNoteItem.appendChild(delEl);

                dlistener(
                    i,
                    noteTitle, noteDate, viewNoteItem, delEl,
                    this.viewNoteParent().parentNode.querySelector('.bible-close')
                );

            } else {
                viewNoteItem.setAttribute('class', 'fa fa-sticky-note fa-5x  bible-view-note-item');
                this.listener({
                    content,
                    creationDate,
                    title
                }, noteTitle, noteDate, viewNoteItem,
                    this.viewNoteParent().parentNode.querySelector('.bible-close'));
            }

            viewNoteItem.appendChild(noteTitle)
            viewNoteItem.appendChild(noteDate)

            this.viewNoteParent().appendChild(viewNoteItem);
        }


    }
    removeParentElement(el) {

        this.viewNote().removeAttribute('style');

        Array.from(
            this.viewNote().querySelectorAll('.bible-view-note-item'),
            el => el.remove()
        );

    }
    listener(n, ...args) {
        for (let i of args) {
            i.addEventListener('click', e => {

                let target = e.target;

                if (target.className.includes('bible-close')) {
                    this.removeParentElement('bible-close');
                    return;
                }

                this.viewNoteContent(n);
            })
        }
    }
    viewNoteContent(n) {

        let mdNote = document.querySelector('.bible-view-note-modal'),
            mdTitle = mdNote.querySelector('.bible-view-note-title').children[0],
            mdDate = mdNote.querySelector('.bible-view-note-creationDate').children[0],
            mdContent = mdNote.querySelector('.bible-view-note-content').children[0],
            mdClose = mdNote.querySelector('.bible-close');


        let {content, creationDate, title} = n;

        mdTitle.innerHTML = title,
            mdDate.innerHTML = creationDate,
            mdContent.innerHTML = content;

        mdNote.setAttribute('style', 'display: block;');

        mdClose.addEventListener('click', e => {
            let target = e.target;

            mdNote.removeAttribute('style');
        });

    }
}


class EditNote extends ViewNote {
    constructor() {
        super();
        super.showNote({
            editwidget: true,
            elistener: ({ title }, ...args) => {
                for (let i of args) {
                    i.addEventListener('click', e => {
                        let target = e.target;

                        if (target.className.includes('bible-close')) {
                            this.removeParentElement('bible-close');
                            return;
                        } else if (target.className.includes('bible-note-edit')) {
                            // bad coding practice, ask on starkoverflow on how to
                            //   extends multiple class
                            let noteAdd = new AddNote();
                            noteAdd.showNote({
                                page_title: 'Edit Note',
                                fireEditNote: this.fireEditNote,
                                title: title
                            });
                            return;
                        }

                    })
                }
            }
        });
    }

    fireEditNote(options) {

        let edNote = document.querySelector('.add-note');

        edNote.addEventListener('click', e => {
            let target = e.target;
            if (target.nodeName.toLowerCase() === 'button') {

                let nTitle = edNote.querySelector('.bible-add-note-title').value;

                nTitle = JSON.parse(localStorage.getItem('___BIBLE-NOTE___'))[nTitle];

                nTitle.content = edNote.querySelector('textarea').value;

                // set the title object to the content of nTitle
                localStorage.setItem('___BIBLE-NOTE___', JSON.stringify(nTitle["title"][nTitle]));
                edNote.removeAttribute('style');
            }
        });
    }
}

class DeleteNote extends ViewNote {
    constructor() {
        super()

        super.showNote({
            deletewidget: true,
            dlistener: (n, ...args) => {

                for (let i of args) {

                    i.addEventListener('click', e => {

                        let target = e.target;

                        if (target.className.includes('bible-close')) {

                            this.removeParentElement('bible-close');
                            return;

                        } else if (target.className.includes('bible-note-delete')) {

                            this.removeNote(n, target);
                            return;

                        }

                        this.viewNoteContent(n);

                    })
                }
            }
        })
    }
    removeNote({title: tt}, target) {

        for (let [n, i] of objectEntries(this.SavedNotes())) {
            let { title } = i;

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
}