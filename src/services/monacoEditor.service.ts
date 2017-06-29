class MonacoEditorService extends AngularClass {

  private deferreds: angular.IDeferred<any>[];
  
  constructor(private $interval: angular.IIntervalService,
    private $window: angular.IWindowService,
    private $q: angular.IQService) {
    super();
    this.deferreds = [];
    this.setupMonacoLoaderLister();
  }

  awaitMonacoEditor() {
    let defered = this.$q.defer();
    this.deferreds.push(defered);
    return defered.promise
  }

  private setupMonacoLoaderLister() {
    let unsubInterval = this.$interval(() => {
      if (this.$window['monaco']) {
        this.deferreds.forEach(d => d.resolve(this.$window['monaco']))
        this.$interval.cancel(unsubInterval);
      }
    }, 100);
  }

}

angular.module('Gandalfio').service('monacoEditorService', MonacoEditorService);