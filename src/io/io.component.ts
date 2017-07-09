class IoCtrl {
  private unsubIo: () => void;
  private io: Io;
  private ioStore: StorePart<Io>;

  constructor(private konstrux: Konstrux,
    private ioService: IoService,
    private globalLogService: GlobalLogService) {
  }

  $onInit() {
    this.ioStore = this.konstrux.select('io');
    this.unsubIo = this.ioStore.subscribe(io => {
      this.io = io;
    });
  }

  $onDestroy() {
    this.unsubIo();
  }

  async runIo() {
    this.globalLogService.log(`Running io.`);
    
    try {
      await this.ioService.runIo(this.io);
    } catch (error) {
      this.globalLogService.log(error.message);
      console.error(error);
      //display error
    } finally {
      //stopLoading
    }



  }

  clearIo() {
    this.ioStore.publish(this.ioService.getDefaultIo());
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
    <io-bottom-bar on-clear="$ctrl.clearIo()"
      on-run="$ctrl.runIo()" on-save="$ctrl.saveIo()"></io-bottom-bar>
  </div>  
  `
};


angular.module('Gandalfio').component('io', ioComponent);