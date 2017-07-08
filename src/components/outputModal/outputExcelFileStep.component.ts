class OutputExcelFileStepCtrl extends AngularClass {

  private onAddOutput: ({ output: Output }) => void;
  private output: ExcelOutput;
  private outputTypes: OutputType[];
  private mode: OutputModalMode;
  private outputForm: angular.IFormController;  

  constructor(private dialog: Electron.Dialog) {
    super();
  }

  $onInit() {
    if (this.mode === OutputModalMode.Create) {
      this.scaffoldOutput();
    }
  }

  scaffoldOutput() {
    let excelOutputType = this.outputTypes.filter(ot => ot.id === 'excel_directory')[0]
    this.output = {
      outputType: excelOutputType,
      directory: null,
      fileName: null,
      id: null
    }
  }

  addOutput() {
    if (!this.outputForm.$valid) {
      this.outputForm.$setSubmitted();
      return;
    }
    this.addFileEnding(this.output);
    this.output.id = this.output.fileName;
    this.onAddOutput({ output: this.output });
  }

  addFileEnding(output: ExcelOutput) {
    output.fileName = _.trimEnd(output.fileName, '.xlsx');
    output.fileName = `${output.fileName}.xlsx`;
    return output;
  }

  openDirectoryDialog() {
    let directory = this.dialog.showOpenDialog({
      properties: ['openDirectory']
    });
    if (directory && directory.length === 1) {
      this.output.directory = directory[0];
    }
  }

}

var OutputExcelFileStepComponent: angular.IComponentOptions = {
  bindings: {
    onAddOutput: '&',
    onRemoveOutput: '&',
    output: '<',
    mode: '<',
    outputTypes: '<'
  },
  controller: OutputExcelFileStepCtrl,
  template: `
  <div class="row" ng-form="$ctrl.outputForm">
    <div class="form-group col-xs-8 col-xs-offset-2">
      <label for="fileName" class="control-label">File name</label>
      <input ng-model="$ctrl.output.fileName" type="text" class="form-control"/>
    </div>
    <div class="form-group col-xs-8 col-xs-offset-2 directory-input">
      <label for="directory" class="control-label">Directory</label>
      <div class="input-group">
        <input ng-model="$ctrl.output.directory" type="text" class="form-control"/>
        <span class="input-group-btn">
          <button class="btn btn-default" ng-click="$ctrl.openDirectoryDialog()">
            <i class="material-icons">folder</i>
          </button>
        </span>   
      </div>
    </div>
    <div class="button-container col-xs-8 col-xs-offset-2">
      <button ng-if="$ctrl.mode === 1"
        class="btn btn-default pull-right" 
        ng-click="$ctrl.onRemoveOutput({ output: $ctrl.output })">Remove</button>
      <button ng-if="$ctrl.mode === 0"
        class="btn btn-primary pull-right" 
        ng-click="$ctrl.addOutput()">Add</button>
    </div>
  </div>
  `
}

angular.module('Gandalfio').component('outputExcelFileStep', OutputExcelFileStepComponent);