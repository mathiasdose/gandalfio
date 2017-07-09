class TransformCtrl extends AngularClass {

  private ioStore: StorePart<Io>;
  private unsubIo: () => void;
  private transform: Transform;
  private monacoLoaded: boolean;

  constructor(private konstrux: Konstrux,
    private $interval: angular.IIntervalService,
    private $window: angular.IWindowService) {
    super();
  }

  $onInit() {
    this.ioStore = this.konstrux.select('io');
    this.unsubIo = this.ioStore.subscribe(io => this.transform = angular.copy(io.transform));
  }

  $onDestroy() {
    this.unsubIo();
  }

  onStatementChanged(statement: string) {
    this.transform.statement = statement;
    let io = this.ioStore.getStoreData();
    io.transform = this.transform;
    this.ioStore.publish(io);
  }

}

var TransformComponent: angular.IComponentOptions = {
  bindings: {},
  controller: TransformCtrl,
  template: `
  <div>
    <transform-editor transform="$ctrl.transform"
      on-statement-change="$ctrl.onStatementChanged(statement)"></transform-editor>
  </div>
  `
};

angular.module('Gandalfio').component('transform', TransformComponent);