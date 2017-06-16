module HabitatPresto.controller {
    export class Base {
        public static $inject = ['$rootScope', '$state', '$http', '$mdDialog'];

        constructor(
            public $rootScope,
            public $state,
            public $http:ng.IHttpService,
            public $mdDialog
        ) {

        }
        
    }
}
