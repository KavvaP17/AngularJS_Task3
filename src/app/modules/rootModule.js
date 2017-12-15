const rootModule = angular.module('rootModule', ['ui.router']);

rootModule.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',function($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise('/');
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode({ enabled: true, requireBase: false });
    $stateProvider
        .state('home',{
            url: '/',
            templateUrl : 'templates/home.html'
        })
        .state('addContact',{
            url: '/add',
            templateUrl : 'templates/addContact.html',
            controller : ['$scope', '$state', 'contactListService', function($scope, $state, contactListService){
                    $scope.addContact = function(newName, newPhone, newEmail){
                        if (contactListService.addContact(newName, newPhone, newEmail)){
                            $state.go('home');
                        }
                    };
                    $scope.goHome = function(){
                        $state.go('home');
                    };

                    $scope.nameIsValid = contactListService.nameIsValid;

                    $scope.addFormValid = function(name, phone, email){
                        if (contactListService.formIsValid(name, phone, email)){
                            return !$scope.nameIsValid(name);
                        }
                        return true;
                    }

                }
            ]

        })
        .state('editContact',{
            abstract: true,
            url: '/edit',
            template: '<div ui-view></div>'
        })
        .state('editContact.detail',{
            url: '/:id',
            templateUrl : 'templates/editContact.html',
            controller: ['$state', '$scope', '$stateParams', 'contactListService', function($state, $scope, $stateParams, contactListService){
                $scope.id = $stateParams.id;
                $scope.editItem = Object.assign({},contactListService.getForKey($scope.id));
                $scope.editContact = function(key, newUser, newPhone, newEmail){
                    if (contactListService.editContact(key, newUser, newPhone, newEmail)){
                        $state.go('home');
                    }
                };
                $scope.deleteContact = function(key){
                    contactListService.removeContact(key);
                    $state.go('home');
                }
                $scope.goHome = function(){
                    $state.go('home');
                };
                $scope.formValid = contactListService.formIsValid;
                $scope.nameIsValid = function(id, name){
                    if (id === name){
                        return reue;
                    } else {
                        return contactListService.nameIsValid(name);
                    }
                }
            }],
            onEnter: function($stateParams, contactListService, $state){
                if (!((contactListService.getAll())[$stateParams.id])){
                    $state.go('home')
                }
            }
        })
    }]
)
