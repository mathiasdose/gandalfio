class FileReaderCtrl extends AngularClass {
  private onFileRead: (any) => void;
  private fileInputElem: JQuery;

  constructor(private $element: angular.IRootElementService,
    private $scope: angular.IRootScopeService) {
    super();
  }

  $onInit() {
    this.fileInputElem = this.$element.find('#file-input');
    this.fileInputElem.on('change', this.readFile);
  }

  readFile(evt) {
    this.$scope.$apply(() => {
      let file: File = evt.target.files[0];
      this.onFileRead({ file: file });
    });
    // let reader = new FileReader();
    // reader.onload = (onLoadEvt: any) => {
    //   let binary = onLoadEvt.target.result;
    //   this.onFileRead({binary});
    // }

    // reader.readAsBinaryString(file);


  }

}

var FileReaderComponent: angular.IComponentOptions = {
  bindings: {
    accept: '@',
    onFileRead: '&'
  },
  controller: FileReaderCtrl,
  template: `
  <div>
    <input id="file-input" accept="{{::$ctrl.accept}}" type="file"/>
  </div>
  `
}

angular.module('Gandalfio').component('fileReader', FileReaderComponent);