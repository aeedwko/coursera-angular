(function() {
  'use strict';

  angular.module('data')
  .component('items', {
    templateUrl: 'src/templates/items.component.template.html',
    bindings: {
      items: '<'
    }
  });
})();
