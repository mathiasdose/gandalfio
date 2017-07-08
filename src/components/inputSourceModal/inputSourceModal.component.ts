interface InputSourceModalApi {
  runWizard: (InputSource) => void;
}

enum InputSourceModalStep {
  ChooseSourceType,
  SourceTypeWizard
}

enum InputSourceModalMode {
  Create,
  Edit
}

class InputSourceModalCtrl extends AngularClass {
  private inputSource: InputSource;
  private canStepForward: boolean;
  private InputSourceModalStep: typeof InputSourceModalStep;
  private InputSourceModalMode: typeof InputSourceModalMode;
  private onRegisterApi: (any) => void;
  private api: InputSourceModalApi;
  private modalCtrl: ModalCtrl;
  private currentStep: InputSourceModalStep;
  private inputSourceTypes: InputSourceType[];
  private selectedSourceType: InputSourceType;
  private ioStore: StorePart<Io>;
  private mode: InputSourceModalMode;

  constructor(private inputSourceService: InputSourceService,
    private konstrux: Konstrux) {
    super();
  }

  $onInit() {
    this.ioStore = this.konstrux.select('io');
    this.canStepForward = false;
    this.InputSourceModalStep = InputSourceModalStep;
    this.InputSourceModalMode = InputSourceModalMode;
    this.currentStep = InputSourceModalStep.ChooseSourceType;
    this.inputSourceTypes = this.inputSourceService.getInputSourceTypes();
  }

  $postLink() {
    this.triggerOnRegisterApi();
  }

  triggerOnRegisterApi() {
    this.api = {
      runWizard: this.runWizard
    }
    this.onRegisterApi({ inputSourceModalApi: this.api });
  }

  editInputSource(inputSource: InputSource) {

  }

  runWizard(inputSource: InputSource = null) {
    if (inputSource === null) {
      this.mode = InputSourceModalMode.Create;
      this.currentStep = InputSourceModalStep.ChooseSourceType;
      this.selectedSourceType = null;
    } else {
      this.mode = InputSourceModalMode.Edit;
      this.currentStep = InputSourceModalStep.SourceTypeWizard;
      this.selectedSourceType = inputSource.inputSourceType;
      this.inputSource = inputSource;
    }
    this.modalCtrl.openModal();
  }

  closeModal() {
    this.modalCtrl.closeModal();
    this.resetModal();
  }

  resetModal() {
    this.canStepForward = false;
    this.selectedSourceType = null;
    this.currentStep = InputSourceModalStep.ChooseSourceType;
  }

  addInputSource(inputSource: InputSource) {
    let io = this.ioStore.getStoreData();
    io = angular.copy(io);
    io.inputSources = [...io.inputSources, inputSource];
    this.ioStore.publish(io);
    this.closeModal();
  }

  removeInputSource(inputSource: InputSource) {
    let io = this.ioStore.getStoreData();
    let inputSources = angular.copy(io.inputSources);
    inputSources = inputSources.filter(is => is.reference !== inputSource.reference);
    io.inputSources = inputSources;
    this.ioStore.publish(io);
    this.closeModal();
  }

  selectSourceType(sourceType: InputSourceType) {
    this.selectedSourceType = sourceType;
    this.canStepForward = true;
  }

  stepBack() {
    this.currentStep--;
  }

  stepForward() {
    this.currentStep++;
    this.canStepForward = false;
  }


}

var InputSourceModalComponent: angular.IComponentOptions = {
  bindings: {
    onRegisterApi: '&'
  },
  require: {
    modalCtrl: '^modal'
  },
  controller: InputSourceModalCtrl,
  template: `
  <div>
    <source-type-step ng-if="$ctrl.currentStep === $ctrl.InputSourceModalStep.ChooseSourceType"
      input-source-types="$ctrl.inputSourceTypes"
      selected-source-type="$ctrl.selectedSourceType"
      on-select-source-type="$ctrl.selectSourceType(sourceType)"></source-type-step>

    <excel-file-step ng-if="$ctrl.currentStep === $ctrl.InputSourceModalStep.SourceTypeWizard
      && $ctrl.selectedSourceType.id === 'excel'"
      input-source="$ctrl.inputSource"
      mode="$ctrl.mode"
      on-add-input-source="$ctrl.addInputSource(inputSource)"
      on-remove-input-source="$ctrl.removeInputSource(inputSource)"></excel-file-step>

    <step-buttons on-step-back="$ctrl.stepBack()"
      on-step-forward="$ctrl.stepForward()"
      can-step-forward="$ctrl.canStepForward"
      current-step="$ctrl.currentStep"></step-buttons>
  </div>
  `
}

angular.module('Gandalfio').component('inputSourceModal', InputSourceModalComponent);