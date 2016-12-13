/**
 * Created by hasee on 2016/12/6.
 */
angular.module('app').run(
    [          '$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
)
    .config(
        [          '$stateProvider', '$urlRouterProvider',
            function ($stateProvider,   $urlRouterProvider) {
                $urlRouterProvider
                    .otherwise('/customer/login');
                $stateProvider
                    .state('customer', {
                        abstract: true,
                        url: '/customer',
                        templateUrl: 'views/blank.html',
                        controller: "navCtrl",
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/navCtroller.js']);
                                }]
                        }
                    })
                    .state('customer.home', {
                        url: '/home',
                        templateUrl: 'views/base_page.html',
                        controller: 'customerCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/customer.js']);
                                }]
                        }
                    })
                    .state('customer.login', {
                        url: '/login',
                        templateUrl: 'views/login.html',
                        controller: "loginCtrl",
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/loginCtroller.js']);
                                }]
                        }
                    })
                    .state('customer.register', {
                        url: '/register',
                        templateUrl: 'views/register.html'
                    })
            }
            ]
    )
