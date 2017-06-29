class OutputService extends AngularClass {

  private outputTypes: OutputType[];

  constructor() {
    super();
    this.outputTypes = [
      {
        id: 'excel_directory',
        name: 'Excel',
        description: 'Outputs an .xlsx file to a directory'
      }
    ]
  }

  getOutputTypes() {
    return this.outputTypes;
  }
}

angular.module('Gandalfio').service('outputService', OutputService);