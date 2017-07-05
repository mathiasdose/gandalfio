class IoService extends AngularClass {

  constructor(private inputSourceService: InputSourceService,
    private transformService: TransformService,
    private $q: angular.IQService) {
    super();
  }

  async runIo(io: Io) {
    let inputData = await this.inputSourceService.loadInputData(io.inputSources);

    
    let transformed = this.transformService.transform(io.transform, inputData);

    return io;
  }

}

angular.module('Gandalfio').service('ioService', IoService);