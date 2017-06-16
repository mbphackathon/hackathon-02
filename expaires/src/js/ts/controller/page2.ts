module HabitatPresto.controller {
    export class Page2 extends HabitatPresto.controller.Base {
        public static $inject = ['$rootScope', '$state', 'wsHttp', '$mdDialog'];

        constructor(
            public $rootScope,
            public $state,
            public wsHttp,
            public $mdDialog
        ) {
            super($rootScope, $state, wsHttp, $mdDialog);
        }
    }
}
