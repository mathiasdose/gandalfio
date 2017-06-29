class OutputTypeStepCtrl extends AngularClass {

  private outputTypeIconMappings: {
    excel_directory: string;
  };

  constructor() {
    super();
  }

  $onInit() {
    this.outputTypeIconMappings = {
      excel_directory: 'insert_drive_file'
    }
  }

}

var OutputTypeStepComponent: angular.IComponentOptions = {
  bindings: {
    outputTypes: '<',
    selectedOutputType: '<',
    onSelectOutputType: '&'
  },
  controller: OutputTypeStepCtrl,
  template: `
  <div>
    <div class="output-types-container row">
      <div ng-repeat="outputType in $ctrl.outputTypes" 
        class="output-type-button-container col-xs-2">
        <div class="output-type-button" 
          ng-class="{ selected: outputType.id === $ctrl.selectedOutputType.id}"
          ng-click="$ctrl.onSelectOutputType({ outputType: outputType })"
          tooltip="{ title: outputType.description }">
          <i class="material-icons">{{$ctrl.outputTypeIconMappings[outputType.id]}}</i>
          <small>{{::outputType.name}}</small>
        </div>
      </div>
    </div>
  </div>
  `
}

angular.module('Gandalfio').component('outputTypeStep', OutputTypeStepComponent);