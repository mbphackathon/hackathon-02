angular.module('habitatpresto').config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider) {
        $stateProvider
            .state('view1', {
                url: '/view1',
                data: {
                    requiredAuthentication: false
                },
                views: {
                    'content@': {
                        templateUrl: 'html/view1.html',
                        controller: HabitatPresto.controller.Page1,
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('view2', {
                url: '/view2',
                data: {
                    requiredAuthentication: false
                },
                views: {
                    'content@': {
                        templateUrl: 'html/view2.html',
                        controller: HabitatPresto.controller.Page2,
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('view3', {
                url: '/view3',
                data: {
                    requiredAuthentication: false
                },
                views: {
                    'content@': {
                        templateUrl: 'html/view3.html',
                        controller: HabitatPresto.controller.Page3,
                        controllerAs: 'ctrl'
                    }
                }
            })
    }
]);
