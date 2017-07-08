interface OutputModalApi {
  runWizard: (Output) => void;
}

enum OutputModalStep {
  ChooseOutputType,
  OutputTypeWizard
}

enum OutputModalMode {
  Create,
  Edit
}

class OutputModalCtrl extends AngularClass {
  private output: Output;
  private selectedOutputType: OutputType;
  private outputTypes: OutputType[];
  private currentStep: OutputModalStep;
  private OutputModalMode: typeof OutputModalMode;
  private OutputModalStep: typeof OutputModalStep;
  private canStepForward: boolean;
  private ioStore: StorePart<Io>;
  private api: OutputModalApi;
  private modalCtrl: ModalCtrl;
  private onRegisterApi: ({ outputModalApi: OutputModalApi }) => void;
  private mode: OutputModalMode;

  constructor(private konstrux: Konstrux,
    private outputService: OutputService) {
    super();
  }

  $onInit() {
    this.ioStore = this.konstrux.select('io');
    this.canStepForward = false;
    this.OutputModalStep = OutputModalStep;
    this.OutputModalMode = OutputModalMode;
    this.currentStep = OutputModalStep.ChooseOutputType;
    this.outputTypes = this.outputService.getOutputTypes();
  }

  $postLink() {
    this.triggerOnRegisterApi();
  }

  triggerOnRegisterApi() {
    this.api = {
      runWizard: this.runWizard
    }
    this.onRegisterApi({ outputModalApi: this.api });
  }

  runWizard(output: Output = null) {
    if (output === null) {
      this.mode = OutputModalMode.Create;
      this.currentStep = OutputModalStep.ChooseOutputType;
      this.selectedOutputType = null;
    } else {
      this.mode = OutputModalMode.Edit;
      this.currentStep = OutputModalStep.OutputTypeWizard;
      this.selectedOutputType = output.outputType;
      this.output = output;
    }
    this.modalCtrl.openModal();
  }

  closeModal() {
    this.modalCtrl.closeModal();
    this.resetModal();
  }

  resetModal() {
    this.canStepForward = false;
    this.selectedOutputType = null;
    this.currentStep = OutputModalStep.ChooseOutputType;
  }

  addOutput(output: Output) {
    let io = this.ioStore.getStoreData();
    io = angular.copy(io);
    io.outputs = [...io.outputs, output];
    this.ioStore.publish(io);
    this.closeModal();
  }

  removeOutput(output: Output) {
    let io = this.ioStore.getStoreData();
    let outputs = angular.copy(io.outputs);
    outputs = outputs.filter(o => o.id !== output.id);
    io.outputs = outputs;
    this.ioStore.publish(io);
    this.closeModal();
  }

  selectOutputType(outputType: OutputType) {
    this.selectedOutputType = outputType;
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

var OutputModalComponent: angular.IComponentOptions = {
  bindings: {
    onRegisterApi: '&'
  },
  require: {
    modalCtrl: '^modal'
  },
  controller: OutputModalCtrl,
  template: `
  <div>
    <output-type-step ng-if="$ctrl.currentStep === $ctrl.OutputModalStep.ChooseOutputType"
      output-types="$ctrl.outputTypes"
      selected-output-type="$ctrl.selectedOutputType"
      on-select-output-type="$ctrl.selectOutputType(outputType)"></output-type-step>

    <output-excel-file-step ng-if="$ctrl.currentStep === $ctrl.OutputModalStep.OutputTypeWizard
      && $ctrl.selectedOutputType.id === 'excel_directory'"
      output="$ctrl.output"
      output-types="$ctrl.outputTypes"
      mode="$ctrl.mode"
      on-add-output="$ctrl.addOutput(output)"
      on-remove-output="$ctrl.removeOutput(output)"></output-excel-file-step>

    <step-buttons on-step-back="$ctrl.stepBack()"
      on-step-forward="$ctrl.stepForward()"
      can-step-forward="$ctrl.canStepForward"
      current-step="$ctrl.currentStep"></step-buttons>
  </div>
  `
}

angular.module('Gandalfio').component('outputModal', OutputModalComponent);