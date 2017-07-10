class IoService extends AngularClass {
  store: StorePart<Io>;

  constructor(private inputSourceService: InputSourceService,
    private transformService: TransformService,
    private outputService: OutputService,
    private $q: angular.IQService,
    private konstrux: Konstrux,
    private localStorageService: angular.local.storage.ILocalStorageService,
    private $rootScope: angular.IRootScopeService) {
    super();
  }

  initStore() {
    this.store = this.konstrux.registerStorePart('io', this.resolveIo());
    this.store.subscribe(io => this.localStorageService.set<Io>('io', io));
  }

  async runIo(io: Io) {

    let inputData = await this.inputSourceService.loadInputData(io.inputSources);
    let transformed = this.transformService.transform(io.transform, inputData);
    let result = await this.outputService.writeOutputs(io.outputs, transformed);
    return io;
  }

  getDefaultIo() : Io {
    return {
      inputSources: [],
      transform: {
        statement: null,
        type: 'sql'
      },
      outputs: []
    };
  }

  resolveIo() {
    let io: Io = this.localStorageService.get<Io>('io')
      || this.getDefaultIo();
    return io;
  }

}

angular.module('Gandalfio').service('ioService', IoService);