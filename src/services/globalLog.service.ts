class GlobalLogService extends AngularClass {
  private store: StorePart<string[]>;

  constructor(private konstrux: Konstrux,
    private moment) {
    super();
    this.store = this.konstrux.registerStorePart('globalLog', []);
  }

  log(str: string) {
    let globalLog = this.store.getStoreData();
    let now = this.moment();
    str = `[${now.format('HH:mm:ss')}]: ${str}`;
    globalLog = [...globalLog, str];
    this.store.publish(globalLog);
  }

}

angular.module('Gandalfio').service('globalLogService', GlobalLogService);