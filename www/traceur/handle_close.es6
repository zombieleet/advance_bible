class HandleClose {
    constructor() {
    }
    close() {
        console.log('hi');
        document.body.addEventListener('click', e => {
            let target = e.target;
            if ( target.className.includes('bible-close') ) {
                
                let bibleHeadCover = document.querySelector('.bible-head-cover');
                bibleHeadCover.setAttribute('data-display', 'none')



                let bibleCover = document.querySelector('.bible-cover');
                let bibleNavItemParent = document.querySelector('.bible-nav');
                let homeScreen = document.querySelector('.bible-home-screen');


                if ( ! bibleNavItemParent.hasAttribute('data-close-bar') ) {

                    homeScreen.removeAttribute('data-reduce-size');
                    bibleNavItemParent.removeAttribute('data-open-bar');
                    bibleNavItemParent.setAttribute('data-close-bar', 'closebar');
                    
                }             
            }
        });

    }
}

var qq = new HandleClose();

qq.close();

