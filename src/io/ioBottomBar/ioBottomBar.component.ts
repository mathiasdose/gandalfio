class IoBottomBarCtrl {

  constructor() {
    
  }

  $onInit() {
    
  }

}

var IoBottomBarComponent: angular.IComponentOptions = {
  bindings: {
    onSave: '&',
    onRun: '&',
    onClear: '&'
  },
  controller: IoBottomBarCtrl,
  template: `
  <div class="button-container col-xs-12">
    <button class="btn btn-primary pull-right" ng-click="$ctrl.onRun()">Run</button>
    <button class="btn btn-default pull-right" ng-click="$ctrl.onClear()">Clear</button>
  </div>
  `
}

angular.module('Gandalfio').component('ioBottomBar', IoBottomBarComponent);