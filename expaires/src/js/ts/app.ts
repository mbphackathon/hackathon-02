angular.module('habitatpresto', [
    'ui.router',
    'ngAnimate',
    'ngMaterial',
    'MyBestPro',
    'ngMap',
    'ngCordova'
])
    .config(
        [
            'MBPLogProvider',
            '$urlRouterProvider',
            '$qProvider',
            '$mdThemingProvider',
            function (MBPLogProvider, $urlRouterProvider, $qProvider, $mdThemingProvider) {
                $qProvider.errorOnUnhandledRejections(false);

                MBPLogProvider.setLevel(MBPLogProvider.LOG_DEBUG);
                MBPLogProvider.setDisplayMode(true);
                $urlRouterProvider.otherwise('view1');

                $mdThemingProvider.definePalette('bluePalette', {
                    '50': 'ffffff',
                    '100': 'd4edf0',
                    '200': '28a3b2',
                    '300': '28a3b2',
                    '400': '28a3b2',
                    '500': '28a3b2',
                    '600': '228C98',
                    '700': '228C98',
                    '800': '228C98',
                    '900': '11404d',
                    'A100': '28a3b2',
                    'A200': '28a3b2',
                    'A400': '28a3b2',
                    'A700': '228C98',
                    'contrastDefaultColor': 'light',
                    'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
                    'contrastLightColors': undefined
                });
                $mdThemingProvider.definePalette('orangePalette', {
                    '50': 'ffffff',
                    '100': 'ffdece',
                    '200': 'ff580c',
                    '300': 'ff580c',
                    '400': 'ff580c',
                    '500': 'ff580c',
                    '600': 'f14e04',
                    '700': 'f14e04',
                    '800': 'f14e04',
                    '900': 'f14e04',
                    'A100': 'ff580c',
                    'A200': 'ff580c',
                    'A400': 'f14e04',
                    'A700': 'f14e04',
                    'contrastDefaultColor': 'light',
                    'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
                    'contrastLightColors': undefined
                });
                $mdThemingProvider.theme('default')
                    .primaryPalette('bluePalette', {
                        'default': '500',
                        'hue-1': '50',
                        'hue-2': '600',
                        'hue-3': '900'
                    })
                    .accentPalette('orangePalette', {
                        'default': '500',
                        'hue-1': '50',
                        'hue-2': '600'
                    });
            }
        ]
    )
    .run(
        [
            '$rootScope',
            '$state',
            'MBPLog',
            'authentication',
            'storage',
            'wsHttp',
            '$cordovaNetwork',
            function ($rootScope, $state, MBPLog, authentication, storage, wsHttp, $cordovaNetwork) {
                $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                    if (toState.data.requiredAuthentication && !authentication.isAuthenticated()) {
                        event.preventDefault();
                        $state.go('view1');
                    } else if (toState.data.redirectIfAuthenticated && authentication.isAuthenticated()) {
                        event.preventDefault();
                        $state.go('view1');
                    }
                });
                $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                    MBPLog.error(error);
                });
            }
        ]
    );
