
class AutoScroll {
    
    constructor() {
        
        let parentScroll = document.createElement('div');
        let scrollArea = document.querySelector('.bible-read-text');
        
        let scrollDown = document.createElement('span');
        let scrollUp = document.createElement('span');


        
        scrollDown.setAttribute('class', 'fa fa-chevron-circle-down bible-scroll-down');
        scrollUp.setAttribute('class', 'fa fa-chevron-circle-up bible-scroll-up bible-scroll-disabled');

        
        parentScroll.appendChild(scrollDown);
        parentScroll.appendChild(scrollUp);

        parentScroll.setAttribute('class', 'bible-parent-scroll');

        scrollArea.appendChild(parentScroll);
        
        this.parentScroll = _ => {
            return parentScroll;
        };

        this.scrollArea = _ => {
            return scrollArea;
        };

        this.scrollUp = _ => {
            return scrollUp;
        };

        this.scrollDown = _ => {
            return scrollDown;
        };
        
    }

    static Render(instance) {
        
        instance.scroll(AutoScroll);
    }
    
    scroll(HomeConstructor) {
        
        this.parentScroll().addEventListener('dblclick', (e) => {
            let target = e.target;

            if ( target.getAttribute('class').includes('bible-scroll-up') ) {
                HomeConstructor.ScrollUP(this,'auto');
                //AutoScroll.ScrollUP(this);
            } else if ( target.getAttribute('class').includes('bible-scroll-down') ) {
                HomeConstructor.ScrollDown(this,'auto');
            } else {
                console.log('uhh');
                return false;
            }
        });
        
        this.parentScroll().addEventListener('click', (e) => {
            let target = e.target;

            if ( target.getAttribute('class').includes('bible-scroll-up') ) {
                HomeConstructor.ScrollUP(this,undefined);
            } else if ( target.getAttribute('class').includes('bible-scroll-down') ) {
                HomeConstructor.ScrollDown(this,undefined);
            } else {
                console.log('uhh');
                return false;
            }
            
        });

        this.parentScroll().addEventListener('scroll', (e) => {
            
        });
    }
    
    static CLEAR_INTERVAL(_this) {
        
        if ( _this.downId ) clearInterval(_this.downId);
        if ( _this.upId ) clearInterval(_this.upId);
        
    }

    static CalculateScroll(_this) {
        return (_this.scrollArea().scrollHeight - _this.scrollArea().scrollTop);
    }
    static ScrollUP(_this,type) {
        
        AutoScroll.CLEAR_INTERVAL(_this);

        if ( ! type ) {
            _this.scrollArea().scrollTop -= 20;
            return ;
        }
        
        
        _this.upId = setInterval(() => {
            // if the difference between the scrollheight and scrolltop is 0
            //   that is the scroll has reached the top of the page
            //   clear the interval
            if ( AutoScroll.CalculateScroll(_this) === 0 ) {
                clearInterval(_this.upId);
                return ;
            }
            
            _this.scrollArea().scrollTop -= 20;
            
        }, 500);

        
    }
    static ScrollDown(_this,type) {
        
        AutoScroll.CLEAR_INTERVAL(_this);

        if ( ! type ) {
            _this.scrollArea().scrollTop += 20;
            return ;
        }
        
        _this.downId = setInterval(() => {
            
            // if the difference between the scrollheight and scrolltop is equal to
            //   the elements clientHeight ,
            //   the autoscroll has reached the bottom of the element, clear the Interval
            if ( AutoScroll.CalculateScroll(_this) === _this.scrollArea().clientHeight ) {
                clearInterval(_this.downId);
                return ;
            }
            _this.scrollArea().scrollTop += 20;
        },500);
        
    }
}

module.exports = AutoScroll;
