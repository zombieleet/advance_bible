$traceurRuntime.registerModule("../traceur/handle_close.es6", [], function() {
  "use strict";
  var __moduleName = "../traceur/handle_close.es6";
  var HandleClose = function() {
    function HandleClose() {}
    return ($traceurRuntime.createClass)(HandleClose, {close: function() {
        console.log('hi');
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
  return {};
});
$traceurRuntime.getModule("../traceur/handle_close.es6" + '');
