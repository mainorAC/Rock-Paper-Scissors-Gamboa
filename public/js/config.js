/**
 * MAINOR GAMBOA
 *
 * AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/index/main");

    $ocLazyLoadProvider.config({
        debug: false
    });

    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "views/project.html"
        })
        .state('index.minor', {
            url: "/minor",
            templateUrl: "views/about-me.html"
        })
}
angular
    .module('rock-paper-scissor')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
