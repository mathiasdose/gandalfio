class IoCtrl {
  private unsubIo: () => void;
  private io: Io;
  private ioStore: StorePart<Io>;

  constructor(private konstrux: Konstrux,
    private ioService: IoService,
    private localStorageService: angular.local.storage.ILocalStorageService) {

  }

  $onInit() {
    this.io = this.resolveIo();
    this.ioStore = this.konstrux.registerStorePart('io', this.io);
    this.unsubIo = this.ioStore.subscribe(io => {
      this.io = io;
      this.localStorageService.set<Io>('io', this.io);
    });
  }

  $onDestroy() {
    this.unsubIo();
  }

  resolveIo() {
    let io: Io = this.localStorageService.get<Io>('io')
      ||  {
        inputSources: [],
        transform: {
          statement: null,
          type: 'sql'
        },
        outputs: []
      };
    return io;
  }

  async runIo() {
    //startLoading
    await this.ioService.runIo(this.io);
    try {
      
      // let res = await this.ioService.asyncFunc1();
      // console.log(res);
    } catch (error) {
      console.log(error);
      //display error
    } finally {
      //stopLoading
    }



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