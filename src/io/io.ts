angular.module('Gandalfio').config(($routeProvider : angular.route.IRouteProvider) => {
  $routeProvider.when('/', {
    template: '<io></io>'
  });
});