angular.module('rootModule')
    .filter('searchFilter', function(){
        return function(items, value){
            let filtered = [];
            angular.forEach(items,(item)=>{
                if ((item.name.toUpperCase()).indexOf(value.toUpperCase())===0){
                    filtered.push(item);
                }
            })
            return filtered;
        }
    });
