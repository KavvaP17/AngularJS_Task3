angular.module('rootModule')
    .controller('ContactListCtrl', ['$scope','contactListService',( $scope, contactListService) => {
        $scope.filterValue = '';
        $scope.contactsList = contactListService.getAll();
        $scope.objToArray = contactListService.objToArray;
    }]
    )
