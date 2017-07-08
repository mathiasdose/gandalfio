class IoBottomBarCtrl {

  constructor() {
    
  }

  $onInit() {
    
  }

}

var IoBottomBarComponent: angular.IComponentOptions = {
  bindings: {
    onSave: '&',
    onRun: '&'
  },
  controller: IoBottomBarCtrl,
  template: `
  <div class="button-container col-xs-12">
    <button class="btn btn-default pull-right" ng-click="$ctrl.onRun()">Run</button>
  </div>
  `
}

angular.module('Gandalfio').component('ioBottomBar', IoBottomBarComponent);