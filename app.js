//MODULE
var ratingApp = angular.module('ratingApp',['ngRoute','ngResource']);

//ROUTES
ratingApp.config(function($routeProvider){
    
    $routeProvider
    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    
    })
    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
    .when('/forecast/:days',{
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
    
});


//SERVICES
ratingApp.service('cityService',function(){
    this.city = "Miami, FL";
    

});


//CONTROLLERS
ratingApp.controller('homeController', ['$scope','cityService', function($scope,cityService){

    $scope.city = cityService.city;
    
    $scope.$watch('city',function(){
        cityService.city = $scope.city;
    });
}]);

ratingApp.controller('forecastController',['$scope','$resource', '$routeParams','cityService',function($scope,$resource,$routeParams,cityService){

    $scope.city = cityService.city;
    $scope.days = $routeParams.days || '2';
    
    $scope.ratingAPI = 
        $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{
        callback: "JSON_CALLBACK"}, {get: {method: "JSONP" }});
    
    $scope.weatherResult = $scope.ratingAPI.get({q: $scope.city, cnt:$scope.days});
    
    //console.log($scope.weatherResult);
    
    
    $scope.convertToFahrenheit= function(degK){
        return Math.round((1.8*(degK -273)) + 32);
    
    }
    
    $scope.convertToDate = function(dt){
        return new Date(dt * 1000);
    }
    
    
}]);