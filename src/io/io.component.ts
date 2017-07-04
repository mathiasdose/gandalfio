class IoCtrl {
  private unsubIo: () => void;
  private io: Io;
  private ioStore: StorePart<Io>;

  constructor(private konstrux: Konstrux) {

  }

  $onInit() {
    this.io = this.resolveIo();
    this.ioStore = this.konstrux.registerStorePart('io', this.io);
    this.unsubIo = this.ioStore.subscribe(io => {
      this.io = io;
    });
  }

  $onDestroy() {
    this.unsubIo();
  }

  resolveIo() {
    let io: Io = {
      inputSources: [],
      transform: {
        statement: null,
        type: 'sql'
      },
      outputs: []
    };
    return io;
  }

  runIo() {

  }

  saveIo() {
    
  }

}

var ioComponent: angular.IComponentOptions = {
  bindings: {},
  controller: IoCtrl,
  template: `
  <div class="container-fluid">
    <expandable-section sequence="1" header="Choose your input sources" class="row">
      <input-sources></input-sources>
    </expandable-section>
    <expandable-section sequence="2" header="Transform your data" show-content="true" class="row">
      <transform></transform>
    </expandable-section>
    <expandable-section sequence="3" header="Export" show-content="true" class="row">
      <outputs></outputs>
    </expandable-section>
    <div class="delimiter"></div>
    <io-bottom-bar on-run="$ctrl.runIo()" on-save="$ctrl.saveIo()"></io-bottom-bar>
  </div>  
  `
}


angular.module('Gandalfio').component('io', ioComponent);