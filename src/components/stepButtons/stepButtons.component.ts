class StepButtonsCtrl {

  constructor() {
    
  }

  $onInit() {
    
  }

}

var StepButtonsComponent: angular.IComponentOptions = {
  bindings: {
    onStepBack: '&',
    onStepForward: '&',
    canStepForward: '<',
    currentStep: '<',
  },
  controller: StepButtonsCtrl,
  template: `
  <div class="arrow-buttons-container">
    <div ng-click="$ctrl.onStepBack()"
      ng-class="{ 'gio-disabled': $ctrl.currentStep === 0 }"
      class="arrow-button arrow-back-button">
      <i class="material-icons">arrow_back</i>
    </div>
    <div ng-click="$ctrl.onStepForward()"
      ng-class="{ 'gio-disabled': !$ctrl.canStepForward }"
      class="arrow-button arrow-forward-button">
      <i class="material-icons">arrow_forward</i>
    </div>
  </div>
  `
}

angular.module('Gandalfio').component('stepButtons', StepButtonsComponent);