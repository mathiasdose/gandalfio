class InputSourcesCtrl extends AngularClass {
  private ioStore: StorePart<Io>;
  private inputSourceModalApi: InputSourceModalApi;
  private inputSources: InputSource[];
  private unsubIo: () => void;

  constructor(private konstrux: Konstrux) {
    super();
  }

  $onInit() {
    this.ioStore = this.konstrux.select('io');
    this.unsubIo = this.ioStore.subscribe(io => this.inputSources = angular.copy(io.inputSources));
  }

  $onDestroy() {
    this.unsubIo();
  }

  onRegisterInputSourceModalApi(inputSourceModalApi: InputSourceModalApi) {
    this.inputSourceModalApi = inputSourceModalApi;
  }

}

var InputSourcesComponent: angular.IComponentOptions = {
  bindings: {
  },
  controller: InputSourcesCtrl,
  template: `
  <div>
    <div class="input-sources-container col-xs-12">
      <div ng-repeat="inputSource in $ctrl.inputSources"
        class="input-source-button-container col-xs-1">
        <div class="input-source-button" ng-click="$ctrl.inputSourceModalApi.runWizard(inputSource)">
          <i class="material-icons">insert_drive_file</i>
          <h4>{{inputSource.reference}}</h4>
        </div>
      </div>
    </div>
    <div class="add-button-container col-xs-1 col-xs-offset-11">
      <button class="btn btn-primary"
        ng-click="$ctrl.inputSourceModalApi.runWizard()">Add</button>
    </div>
    <modal modal-title="Input source"
      disable-modal-footer="true">
      <input-source-modal on-register-api="$ctrl.onRegisterInputSourceModalApi(inputSourceModalApi)"></input-source-modal>
    </modal>
  </div>
  `
}

angular.module('Gandalfio').component('inputSources', InputSourcesComponent);