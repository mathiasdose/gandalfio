class TransformService extends AngularClass {

  constructor(private alasql) {
    super();
  }

  transform(transform: Transform, inputData: { [key: string]: {}[]}) {
    let transformDb = new this.alasql.Database();
    this.createTables(inputData, transformDb);
    let result = transformDb.exec(transform.statement);
    return result;
  }

  createTables(inputData: { [key: string]: {}[]}, transformDb) {
    _.forEach(inputData, (data, reference) => {
      let columnsStatement = this.createColumnsStatement(data);
      transformDb.exec(`CREATE TABLE ${reference} ${this.createColumnsStatement(data)}`, data);
      transformDb.tables[reference].data = data;
    });
  }

  createColumnsStatement(data) {
    let row = data[0];
    let keys = _.keys(row);
    let colStatements = keys.map(key => {
      let colValueType = typeof row[key];
      return `${key} ${this.getJsToSqlTypeMapping()[colValueType]}`
    });
    let colStatementsStr = colStatements.join(', ');
    return `(${colStatementsStr})`;
  }

  getJsToSqlTypeMapping() {
    return {
      number: 'number',
      string: 'string'
    }
  }


}

angular.module('Gandalfio').service('transformService', TransformService);