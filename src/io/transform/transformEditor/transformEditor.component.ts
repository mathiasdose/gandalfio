class TransformEditorCtrl extends AngularClass {
  private containerElem: JQuery;
  private transform: Transform;
  private editorOptions: monaco.editor.IEditorConstructionOptions;
  private _monaco;
  private monacoEditor: monaco.editor.IStandaloneCodeEditor;
  private editorChangeDebounce: angular.IPromise<any>;
  private onStatementChange: ({ statement: string }) => void;

  constructor(private monacoEditorService: MonacoEditorService,
    private $element: angular.IRootElementService,
    private $timeout: angular.ITimeoutService) {
    super();
  }

  $onInit() {
    this.monacoEditorService.awaitMonacoEditor()
      .then(_monaco => {
        this._monaco = _monaco;
        this.monacoEditor = this._monaco.editor.create(this.containerElem[0], this.editorOptions);
        this.setupMonacoEditor();
      });

    this.containerElem = this.$element.find('#container');
    this.setupMonacoConfig();
  }

  $onChanges(changes: angular.IOnChangesObject) {
    if (changes.transform 
      && !changes.transform.isFirstChange()
      && this.transform.statement === null) {
      this.monacoEditor.setValue(this.getDefaultValue());
    }
  }

  setupMonacoConfig() {

    this.editorOptions = {
      value: this.transform.statement || this.getDefaultValue(),
      language: 'sql',
      automaticLayout: true
    };

  }

  getDefaultValue() {
    let value = [
      '-- Input sources above can be queried',
      '-- like tables. What is selected can then',
      '-- be exported, example if Reference was',
      '-- MyExcelFile:',
      '',
      '-- SELECT MyExcelFile.CustomerId, MyExcelFile.CustomerName',
      '-- FROM MyExcelFile'
    ].join('\n');
    return value;
  }

  setupMonacoEditor() {
    this.monacoEditor.onDidChangeModelContent(this.onModelChange);

  }

  onModelChange(evt: monaco.editor.IModelContentChangedEvent2) {
    if (this.editorChangeDebounce) {
      this.$timeout.cancel(this.editorChangeDebounce);
    }
    this.editorChangeDebounce = this.$timeout(() => {
      let statement = this.monacoEditor.getValue();
      this.onStatementChange({ statement: statement })
    }, 1500)
  }

}

var TransformEditorComponent: angular.IComponentOptions = {
  bindings: {
    transform: '<',
    onStatementChange: '&'
  },
  controller: TransformEditorCtrl,
  template: `
    <div class="col-xs-12">
      <div id="container"></div>
    </div>
  `
}

angular.module('Gandalfio').component('transformEditor', TransformEditorComponent);