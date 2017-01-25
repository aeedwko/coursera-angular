(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchController', LunchController);

  LunchController.$inject = ['$scope'];
  function LunchController($scope) {
    $scope.input = "";
    $scope.count = 0;
    $scope.message= "";
    $scope.updateMessage = function() {
      if ($scope.count == 0) {
        $scope.message = "Please enter data first";
      } else if ($scope.count <= 3) {
        $scope.message = "Enjoy!";
      } else if ($scope.count > 3) {
        $scope.message = "Too much!";
      }
    };

    $scope.countDishes = function() {
      var array = $scope.input.split(",");
      $scope.count = array.length;
      for (var i=0; i < array.length; i++) {
        if (array[i].trim() == "") {
          $scope.count -= 1;
        }
      }
    }
  }
})();
