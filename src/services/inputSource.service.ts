class InputSourceService extends AngularClass {

  private inputSourceTypes: InputSourceType[];

  constructor() {
    super();
    this.inputSourceTypes = [
      {
        id: 'excel',
        name: 'Excel',
        description: 'A .xls or .xlsx file'
      }
    ];
  }

  getInputSourceTypes() {
    return this.inputSourceTypes;
  }

}

angular.module('Gandalfio').service('inputSourceService', InputSourceService);