import { _bookMark as BookMark } from "../dep/bookmark.js";

const element = document.querySelector('[data-target="bible-bookmark"]');
BookMark.Fire(element);
