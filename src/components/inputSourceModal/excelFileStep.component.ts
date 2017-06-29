class ExcelFileStepCtrl extends AngularClass {
  
  private inputSourceForm: angular.IFormController;
  private inputSource: ExcelInputSource;
  private onAddInputSource: (any) => void;
  private mode: InputSourceModalMode;

  constructor(private inputSourceService: InputSourceService) {
    super();
  }

  $onInit() {
    if (this.mode === InputSourceModalMode.Create) {
      this.scaffoldInputSource();
    }
  }

  scaffoldInputSource() {
    let excelInputSourdeType = this.inputSourceService.getInputSourceTypes()
      .filter(ist => ist.id === 'excel')[0];
    this.inputSource = {
      reference: null,
      filePath: null,
      inputSourceType: excelInputSourdeType
    }

  }

  onFileRead(file: File) {
    this.inputSource.filePath = file.path;
  }

  addInputSource() {
    if (!this.inputSourceForm.$valid) {
      this.inputSourceForm.$setSubmitted();
      return;
    }
    this.onAddInputSource({ inputSource: this.inputSource });
  }

}

var ExcelFileStepComponent: angular.IComponentOptions = {
  bindings: {
    onAddInputSource: '&',
    inputSource: '<',
    mode: '<'
  },
  require: {
  },
  controller: ExcelFileStepCtrl,
  template: `
  <div class="row" ng-form="$ctrl.inputSourceForm">
    <div class="form-group col-xs-8 col-xs-offset-2">
      <label for="reference" class="control-label">Reference name</label>
      <input ng-model="$ctrl.inputSource.reference" type="text" class="form-control"/>
    </div>
    <div class="form-group col-xs-8 col-xs-offset-2 file-path-input">
      <label for="filePath" class="control-label">File path</label>
      <div class="input-group">
        <input ng-model="$ctrl.inputSource.filePath" type="text" class="form-control"/>
        <file-reader accept=".xls,.xlsx" on-file-read="$ctrl.onFileRead(file)"></file-reader>
        <span class="input-group-btn">
          <label for="file-input" class="btn btn-default"><i class="material-icons">attach_file</i></label>
        </span>   
      </div>
    </div>
    <div class="button-container col-xs-8 col-xs-offset-2">
      <button class="btn btn-primary pull-right" ng-click="$ctrl.addInputSource()">Add</button>
    </div>
  </div>
  `
}

angular.module('Gandalfio').component('excelFileStep', ExcelFileStepComponent);