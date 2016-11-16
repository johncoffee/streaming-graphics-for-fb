// resizeViewPort(1024, 576);

window.addEventListener("message", function receiveMessage(event) {
    if (event.data && event.data.type === "resize") {
        resizeViewPort(event.data.x, event.data.y);
    }
}, false);

angular
    .module('app', ['ngMaterial','countTo'])
    .config(function ($mdThemingProvider, $compileProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('orange');

        $compileProvider.debugInfoEnabled(false);
    });

angular.module('app').component('cell', {
    bindings: {
        number: "<"
    },
    controller: function ($element) {
        // let el = null;
        // let greenClass =  'green-fade';
        // let redClass =  'red-fade';
        //
        // this.$postLink = function () {
        //     el = $element.find('animated-text');
        // }

        this.$onChanges = function (changes) {
            if (changes.number) {
                this.prevValue = changes.number.previousValue;
                this.number = changes.number.currentValue;

                // if (el) {
                //     setTimeout(()=> {
                //         this.applyColours()
                //     },10);
                // }

            }
        }

        // this.applyColours = function () {
        //     el.removeClass(greenClass)
        //     el.removeClass(redClass)
        //
        //     if (this.number < this.prevValue) {
        //         el.addClass(redClass)
        //     }
        //     else if (this.number >= this.prevValue) {
        //         el.addClass(greenClass)
        //     }
        //     else {
        //         console.warn(this.number, this.prevValue, this.number === this.prevValue)
        //     }
        // }

    },
    template: `
<div layout="row" layout-align="center end" layout-fill>
    <div class="cell__number">
        <div class="reaction reaction--like"></div> 
        <animated-text 
              count-to="{{$ctrl.number}}"                            
              value="{{$ctrl.prevValue}}"
              filter="number"
              filter-param-1="2"             
              duration="0.333">
        </animated-text> %
    </div>
</div>
`
})
angular.module('app').component('percentages', {
        template: `
                
    <div layout="row" style="height: 50%;">
        <cell layout="column" flex="50" number="$ctrl.wow" class="cell"></cell>
        <cell layout="column" flex="50" number="$ctrl.angry" class="cell"></cell>
    </div>        
    <div layout="row"  style="height: 50%;">
        <cell layout="column" flex="50" number="$ctrl.love" class="cell"></cell>
        <cell layout="column" flex="50" number="$ctrl.like" class="cell"></cell>
    </div>

`,
        controller: function ($http) {

            this.$onInit = function () {
                this.getVotes()
                setInterval(this.getVotes, 2000)
            }

            this.getVotes = () => {
                $http.get("/api/percentages").then((result) => {
                    let data = result.data.data
                    this.angry = data.ANGRY;
                    this.wow = data.WOW;
                    this.love = data.LOVE;
                    this.like = data.LIKE;
                })
            }
        }
    }
);

function resizeViewPort(width, height) {
    window.resizeTo(
        width + (window.outerWidth - window.innerWidth),
        height + (window.outerHeight - window.innerHeight)
    );
}