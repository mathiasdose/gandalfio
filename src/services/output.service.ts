class OutputService extends AngularClass {

  private outputTypes: OutputType[];

  constructor(private xlsx, private $q: angular.IQService) {
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

  writeOutputs(outputs: Output[], data: {}[]) {
    let promises = outputs.map(output => this.writeOutputSingle(output, data));
    return this.$q.all(promises);
  }

  private writeOutputSingle(output: Output, data: {}[]) {
    switch (output.outputType.id) {
      case 'excel_directory':
        let excelOutput = output as ExcelOutput; 
        return this.writeExcelDirectoryOutput(excelOutput, data);
      default:
        return this.$q.reject(`Unknow OutputType: ${output.outputType.id}`);
    }
  }

  private writeExcelDirectoryOutput(excelOutput: ExcelOutput, data: {}[]) {
    let aoa = this.dataToAoa(data);
    let sheet = this.xlsx.utils.aoa_to_sheet(aoa);
    let workbook = {
      Sheets: { Sheet1: sheet },
      SheetNames: ['Sheet1'],
      Props: {}
    }
    this.xlsx.writeFile(workbook, `${excelOutput.directory}/${excelOutput.fileName}`);
    return this.$q.when();
  }

  private dataToAoa(data: {}[]) {
    let firstRow = data[0];
    let keys = _.keys(firstRow);
    let aoa = [];
    aoa.push(keys);
    data.forEach(row => {
      let values = _.values(row);
      aoa.push(values);
    });
    return aoa;
  }
}

angular.module('Gandalfio').service('outputService', OutputService);