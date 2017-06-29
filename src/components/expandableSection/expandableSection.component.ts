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
  <div class="row">
    <div class="col-xs-12 row">
      <div class="col-xs-8">
        <h1 ng-if="$ctrl.sequence" class="col-xs-1">{{::$ctrl.sequence}}</h2>
        <h3 class="title col-xs-11" ng-click="$ctrl.toggleShowContent()">{{::$ctrl.header}}</h5>   
      </div>
      <div class="col-xs-1 col-xs-offset-3 es-caret-container">
        <i class="material-icons pull-right es-caret" ng-click="$ctrl.toggleShowContent()" tooltip="{ title: 'Show/Hide section' }">
          {{ $ctrl.showContent ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}
        </i>
      </div>
    </div>
    <hr class="col-xs-11">
    <div class="col-xs-12 row section-content" ng-transclude ng-show="$ctrl.showContent"></div>
  </div>
  `
}

angular.module('Gandalfio').component('expandableSection', ExpandableSectionComponent);