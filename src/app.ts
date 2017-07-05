

angular.module('Gandalfio', ['ngRoute', 'ngAnimate', 'LocalStorageModule'])
  .config(($routeProvider: angular.route.IRouteProvider, localStorageServiceProvider: angular.local.storage.ILocalStorageServiceProvider) => {
    $routeProvider.otherwise({
      redirectTo: '/'
    })

    localStorageServiceProvider
      .setPrefix('gandalfio')
      .setNotify(false, false);
  });

angular.module('Gandalfio').run(($rootScope: angular.IRootScopeService) => {
  $rootScope.angular = angular;
});
angular.module('Gandalfio').run(($rootScope: angular.IRootScopeService) => {
  console.log('run twice');
});

// import * as alasql from 'alasql';
// import * as alasql from "alasql";
angular.module('Gandalfio').value('xlsx', require('./node_modules/xlsx/xlsx.js'));
angular.module('Gandalfio').value('fs', require('fs'));
angular.module('Gandalfio').value('alasql', require('./node_modules/alasql/dist/alasql.fs.js'));


const {dialog} = require('electron').remote
angular.module('Gandalfio').value('dialog', dialog);

// console.log('adding monaco')
// angular.module('Gandalfio').value('editor', window['monaco']);


