(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        directiveFound: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;
    list.isEmpty = function() {
      if (list.directiveFound != undefined && list.directiveFound.length === 0) {
        return true;
      }
      return false;
    };
  }
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var search = this;
    search.getMatchedMenuItems = function(searchTerm) {
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

      promise.then(function (response) {
        search.found = response;
        //console.log(search.categories.menu_items);
      })
      .catch(function (error) {
        console.log("Error!");
      });
    };

    search.removeItem = function (itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    };
  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;
    var foundItems = [];

    service.getMatchedMenuItems = function(searchTerm) {

      var response = $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      })
      .then(function (result) {
        foundItems = [];

        if (searchTerm === "") {
          return foundItems;
        }

        for (var i = 0; i < result.data.menu_items.length; i++) {
          if (result.data.menu_items[i].description.includes(searchTerm)) {
            foundItems.push(result.data.menu_items[i]);
          }
        }
        return foundItems;
      });
      return response;
    };

    service.removeItem = function(itemIndex) {
      foundItems.splice(itemIndex, 1);
    };
  }
})();
