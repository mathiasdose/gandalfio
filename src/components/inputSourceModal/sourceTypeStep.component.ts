class SourceTypeStepCtrl {
  private sourceTypeIconMappings: {
    excel: string;
  };

  constructor() {
    
  }

  $onInit() {
    this.sourceTypeIconMappings = {
      excel: 'insert_drive_file'
    }
  }

}

var SourceTypeStepComponent: angular.IComponentOptions = {
  bindings: {
    inputSourceTypes: '<',
    selectedSourceType: '<',
    onSelectSourceType: '&',
    onClickNext: '&'
  },
  controller: SourceTypeStepCtrl,
  template: `
  <div>
    <div class="source-types-container row">
      <div ng-repeat="sourceType in $ctrl.inputSourceTypes" 
        class="source-type-button-container col-xs-2">
        <div class="source-type-button" 
          ng-class="{ selected: sourceType.id === $ctrl.selectedSourceType.id}"
          ng-click="$ctrl.onSelectSourceType({ sourceType: sourceType })"
          tooltip="{ title: sourceType.description }">
          <i class="material-icons">{{$ctrl.sourceTypeIconMappings[sourceType.id]}}</i>
          <small>{{::sourceType.name}}</small>
        </div>
      </div>
    </div>
  </div>
  `
}

angular.module('Gandalfio').component('sourceTypeStep', SourceTypeStepComponent);