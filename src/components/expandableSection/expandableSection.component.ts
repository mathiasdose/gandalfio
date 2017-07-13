class ExpandableSectionCtrl {
  private sequence: string;
  private header: string;
  private showContent: boolean;

  constructor() {
    
  }

  $onInit() {
    this.showContent = this.showContent === undefined ? true : this.showContent;
  }

  toggleShowContent() {
    this.showContent = !this.showContent;
  }

}

var ExpandableSectionComponent: angular.IComponentOptions = {
  bindings: {
    sequence: '@',
    header: '@',
    showContent: '<',
  },
  controller: ExpandableSectionCtrl,
  transclude: true,
  template: `
  <div class="outer-container row">
    <div class="title-container">
      <h1 ng-if="$ctrl.sequence" class="sequence">{{::$ctrl.sequence}}</h2>
      <h3 class="title" ng-click="$ctrl.toggleShowContent()">{{::$ctrl.header}}</h5>   
    </div>
    <div class="es-caret-container">
      <i class="material-icons pull-right es-caret" ng-click="$ctrl.toggleShowContent()" tooltip="{ title: 'Show/Hide section' }">
        {{ $ctrl.showContent ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}
      </i>
    </div>
  </div>
  <hr class="">
  <div class="row section-content" ng-transclude ng-show="$ctrl.showContent"></div>
  `
};

angular.module('Gandalfio').component('expandableSection', ExpandableSectionComponent);