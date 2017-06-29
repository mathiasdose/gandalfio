class OutputExcelFileStepCtrl extends AngularClass {

  private onAddOutput: ({ output: Output }) => void;
  private output: ExcelOutput;
  private outputTypes: OutputType[];
  private mode: OutputModalMode;
  private outputForm: angular.IFormController;  

  constructor() {
    super();
  }

  $onInit() {
    if (this.mode === OutputModalMode.Create) {
      this.scaffoldOutput();
    }
  }

  scaffoldOutput() {
    let excelOutputType = this.outputTypes.filter(ot => ot.id === 'excel_directory')[0];
    this.output = {
      outputType: excelOutputType,
      directory: null,
      fileName: null
    }
  }

  onDirectoryRead(file) {

    console.log('file');
  }

  addOutput() {
    if (!this.outputForm.$valid) {
      this.outputForm.$setSubmitted();
      return;
    }
    this.onAddOutput({ output: this.output });
  }

}

var OutputExcelFileStepComponent: angular.IComponentOptions = {
  bindings: {
    onAddOutput: '&',
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
        <file-reader accept=".xls,.xlsx" on-file-read="$ctrl.onDirectoryRead(file)"></file-reader>
        <span class="input-group-btn">
          <label for="file-input" class="btn btn-default"><i class="material-icons">folder</i></label>
        </span>   
      </div>
    </div>
    <div class="button-container col-xs-8 col-xs-offset-2">
      <button class="btn btn-primary pull-right" ng-click="$ctrl.addOutput()">Add</button>
    </div>
  </div>
  `
}

angular.module('Gandalfio').component('outputExcelFileStep', OutputExcelFileStepComponent);