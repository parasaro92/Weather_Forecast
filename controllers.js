//CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function ($scope, $location, cityService) {

  $scope.city = 'Hyderabad';

  $scope.$watch('city', function() {
    console.log($scope.city);
    cityService.city = $scope.city; 
  });
    
    $scope.submit = function() {
        $location.path('/weather');
    };
}]);

weatherApp.controller('forecastController', ['$scope','$resource', '$routeParams', 'cityService', function($scope, $resource , $routeParams, cityService) {
  $scope.city = cityService.city;

  $scope.days = $routeParams.days || 2;

  $scope.weatherAPI = 
  $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP"}});

  $scope.weatherResult = $scope.weatherAPI.get({ 
    q: $scope.city, 
    cnt: $scope.days, 
    appid: 'bd82977b86bf27fb59a04b61b657fb6f'
  });
    
    console.log($scope.weatherResult);

  $scope.convertToFahrenheit = function(degk) {
    return Math.round((1.8 * (degk - 273)) + 32);
  }

  $scope.convertToDate = function(dt) {
    return new Date(dt * 1000);
  }
}]);
