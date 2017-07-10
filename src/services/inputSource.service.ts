class InputSourceService extends AngularClass {

  private inputSourceTypes: InputSourceType[];

  constructor(private $q: angular.IQService,
    private xlsx,
    private $timeout: angular.ITimeoutService) {
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

  loadInputData(inputSources: InputSource[]) {
    let promises = {};
    inputSources.forEach(inputSource => promises[inputSource.reference] = this.loadInputDataSingle(inputSource));
    return this.$q.all(promises);
  }

  private loadInputDataSingle(inputSource: InputSource) {
    switch (inputSource.inputSourceType.id) {
      case 'excel':
        let excelInputSource = inputSource as ExcelInputSource;
        return this.loadExcelInputData(excelInputSource);
      default:
        return this.$q.reject(`Unknown InputSourceType: ${inputSource.inputSourceType.id}`);
    }
  }

  private loadExcelInputData(excelInputSource: ExcelInputSource) {   
    
    return this.$timeout()
      .then(() => {
        let workbook = this.xlsx.readFile(excelInputSource.filePath);
        let data = this.xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        return data;
      });
    // return this.$q.when(data);
  }

}

angular.module('Gandalfio').service('inputSourceService', InputSourceService);