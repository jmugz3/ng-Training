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

ratingApp.controller('forecastController',['$scope','$resource','cityService',function($scope,$resource,cityService){

    $scope.city = cityService.city;
    $scope.ratingAPI = 
        $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{
        callback: "JSON_CALLBACK"} , {get: {method: "JSONP" }});
    
    $scope.weatherResult = $scope.ratingAPI.get
    
    
}]);