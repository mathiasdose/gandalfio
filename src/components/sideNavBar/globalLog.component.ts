class GlobalLogCtrl extends AngularClass {
  private globalLogStore: StorePart<string[]>;
  private containerElem: JQuery;
  private _monaco;
  private monacoEditor: monaco.editor.IStandaloneCodeEditor;
  private editorOptions: monaco.editor.IEditorConstructionOptions;

  constructor(private monacoEditorService: MonacoEditorService,
    private $element: angular.IRootElementService,
    private konstrux: Konstrux,
    private globalLogService: GlobalLogService) {
    super();
  }

  $onInit() {
    this.monacoEditorService.awaitMonacoEditor()
      .then(_monaco => {
        this._monaco = _monaco;
        this.monacoEditor = this._monaco.editor.create(this.containerElem[0], this.editorOptions);
      });

    this.containerElem = this.$element.find('#global-log-editor');
    this.setupMonacoConfig();
    this.registerGlobalStateListeners();
  }

  registerGlobalStateListeners() {
    this.globalLogStore = this.konstrux.select('globalLog');
    this.globalLogStore.subscribe(globalLog => {
      if (this.monacoEditor) {
        this.monacoEditor.setValue(globalLog.join('\n'));
      }
    });
  }

  setupMonacoConfig() {
    this.editorOptions = {
      value: '',
      language: 'plaintext',
      automaticLayout: true,
      readOnly: true,
      lineNumbers: 'off'
    };
  }

}

var GlobalLogComponent: angular.IComponentOptions = {
  bindings: {},
  controller: GlobalLogCtrl,
  template: `
  <div>
    <div id="global-log-editor"></div>
  </div>
  `
};

angular.module('Gandalfio').component('globalLog', GlobalLogComponent);