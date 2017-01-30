(function() {
  'use strict';

  angular.module('data')
  .component('categories', {
    templateUrl: 'src/templates/categories.component.template.html',
    bindings: {
      categories: '<'
    }
  });
})();
