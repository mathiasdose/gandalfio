
interface GlobalLoadOptions {
  globalLoad: boolean;
  fullScreenLoad: boolean;
}

class GlobalLoaderService extends AngularClass {
  store: StorePart<GlobalLoadOptions>;

  constructor(private konstrux: Konstrux) {
    super();
  }

  initStore() {
    this.store = this.konstrux.registerStorePart('globalLoad', this.getGlobalLoadDefault());
  }

  startLoading(fullScreenLoad = false) {
    this.store.publish({
      globalLoad: true,
      fullScreenLoad: fullScreenLoad
    });
  }

  stopLoading() {
    let currentLoading = this.store.getStoreData();
    this.store.publish({
      globalLoad: false,
      fullScreenLoad: currentLoading.fullScreenLoad
    });
  }

  private getGlobalLoadDefault() {
    return {
      globalLoad: true,
      fullScreenLoad: true
    };
  }

}

angular.module('Gandalfio').service('globalLoaderService', GlobalLoaderService);