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
                        controller: 'navCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/navCtroller.js']);
                                }]
                        }
                    })
                    .state('customer.login', {
                        url: '/login',
                        templateUrl: 'views/customer_login.html',
                        controller: 'loginCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/loginCtroller.js']);
                                }]
                        }
                    })
                    .state('customer.register', {
                        url: '/register',
                        templateUrl: 'views/customer_register.html',
                        controller: 'registerCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/registerCtroller.js']);
                                }]
                        }
                    })
                    .state('customer.home', {
                        url: '/home',
                        templateUrl: 'views/index_home.html'
                    })
                    .state('product.info', {
                        url: '/productInfo',
                        templateUrl: 'views/product_info.html'
                    })
                    .state('customer.women', {
                        url: '/women',
                        templateUrl: 'views/product_women.html'
                    })
                    .state('customer.men', {
                        url: '/men',
                        templateUrl: 'views/product_men.html'
                    })
                    .state('customer.other', {
                        url: '/other',
                        templateUrl: 'views/other.html'
                    })
                    .state('customer.productInfo', {
                        url: '/productInfo',
                        templateUrl: 'views/product_info.html'
                    })
                    .state('customer.shopCart', {
                        url: '/shopCart',
                        templateUrl: 'views/shoppingCart.html'
                    })

                    //店铺路由
                    .state('store', {
                        abstract: true,
                        url: '/store',
                        templateUrl: 'views/blank.html'
                    })
                    .state('store.login', {
                        url: '/storeLogin',
                        templateUrl: 'views/store_login.html',
                        controller: 'storeCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/storeCtroller.js']);
                                }]
                        }
                    })
                    .state('store.register', {
                        url: '/storeRegister',
                        templateUrl: 'views/store_register.html',
                        controller: 'shopRegisterCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/shopRegisterCtroller.js']);
                                }]
                        }
                    })
                    .state('store.loadProInfo', {
                        url: '/loadProInfo',
                        templateUrl: 'views/product_load.html',
                        controller: 'productInfoCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/production_load.js']);
                                }]
                        }
                    })


            }
        ]
    )
