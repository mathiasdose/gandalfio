class OutputsCtrl extends AngularClass {
  private outputModalApi: OutputModalApi;

  private ioStore: StorePart<Io>;
  private outputs: Output[];
  private unsubIo: () => void;

  constructor(private konstrux: Konstrux) {
    super();
  }

  $onInit() {
    this.ioStore = this.konstrux.select('io');
    this.unsubIo = this.ioStore.subscribe(io => this.outputs = angular.copy(io.outputs));
  }

  $onDestroy() {
    this.unsubIo();
  }

  onRegisterOutputModalApi(outputModalApi: OutputModalApi) {
    this.outputModalApi = outputModalApi;
  }

}

var OutputsComponent: angular.IComponentOptions = {
  bindings: {},
  controller: OutputsCtrl,
  template: `
  <div>
    <div class="outputs-container col-xs-12">
      <div ng-repeat="output in $ctrl.outputs"
        class="output-button-container col-xs-1">
        <div class="output-button" ng-click="$ctrl.outputModalApi.runWizard(output)">
          <i class="material-icons">insert_drive_file</i>
          <h4>{{output.type}}</h4>
        </div>
      </div>
    </div>
    <div class="add-button-container col-xs-1 col-xs-offset-11">
      <button class="btn btn-primary"
        ng-click="$ctrl.outputModalApi.runWizard()">Add</button>
    </div>
    <modal modal-title="Output"
      disable-modal-footer="true">
      <output-modal on-register-api="$ctrl.onRegisterOutputModalApi(outputModalApi)"></output-modal>
    </modal>
  </div>
  `
}

angular.module('Gandalfio').component('outputs', OutputsComponent);