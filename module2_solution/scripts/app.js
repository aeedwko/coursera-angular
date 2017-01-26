(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

    toBuy.bought = function(itemIndex) {
      try {
        ShoppingListCheckOffService.bought(itemIndex);
      } catch (error) {
        toBuy.message = error.message;
      }
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;
    alreadyBought.boughtItems = ShoppingListCheckOffService.getBoughtItems();

    alreadyBought.nothingBought = function() {
      if (alreadyBought.boughtItems.length == 0) {
          return true;
      } else {
        return false;
      }
    }
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [
      { name: "Apples", quantity: 5 },
      { name: "Oranges", quantity: 3 },
      { name: "Pencils", quantity: 10 },
      { name: "Cookies", quantity: 6 },
      { name: "Carrots", quantity: 2 }
    ];

    var boughtItems = [];

    // take item index and add over to the other list
    service.bought = function(itemIndex) {
      boughtItems.push(toBuyItems[itemIndex]);
      toBuyItems.splice(itemIndex,1);

      if (toBuyItems.length == 0) {
        throw new Error("Everything is bought!");
      }
    }

    service.getToBuyItems = function() {
      return toBuyItems;
    }

    service.getBoughtItems = function() {
      return boughtItems;
    }
  }
})();
