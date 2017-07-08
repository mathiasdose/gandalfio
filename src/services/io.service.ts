class IoService extends AngularClass {

  constructor(private inputSourceService: InputSourceService,
    private transformService: TransformService,
    private outputService: OutputService,
    private $q: angular.IQService) {
    super();
  }

  async runIo(io: Io) {
    let inputData = await this.inputSourceService.loadInputData(io.inputSources);
    let transformed = this.transformService.transform(io.transform, inputData);
    let result = await this.outputService.writeOutputs(io.outputs, transformed);
    return io;
  }

}

angular.module('Gandalfio').service('ioService', IoService);