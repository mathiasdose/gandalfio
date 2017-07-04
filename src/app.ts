

angular.module('Gandalfio', ['ngRoute', 'ngAnimate'])
  .config(($routeProvider: angular.route.IRouteProvider, ) => {
    $routeProvider.otherwise({
      redirectTo: '/'
    })
  });

angular.module('Gandalfio').run(($rootScope: angular.IRootScopeService) => {
  $rootScope.angular = angular;
});
angular.module('Gandalfio').run(($rootScope: angular.IRootScopeService) => {
  console.log('run twice');
});

angular.module('Gandalfio').value('xlsx', require('./node_modules/xlsx/xlsx.js'));
angular.module('Gandalfio').value('fs', require('fs'));

const {dialog} = require('electron').remote
angular.module('Gandalfio').value('dialog', dialog);

// console.log('adding monaco')
// angular.module('Gandalfio').value('editor', window['monaco']);


