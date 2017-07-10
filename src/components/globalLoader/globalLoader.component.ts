class GlobalLoaderCtrl extends AngularClass {
  private globalLoad: any;
  private fullScreenLoad: any;

  constructor(private globalLoaderService: GlobalLoaderService) {
    super();
  }

  $onInit() {
    this.globalLoaderService.store.subscribe(globalLoadOptions => {
      this.fullScreenLoad = globalLoadOptions.fullScreenLoad;
      this.globalLoad = globalLoadOptions.globalLoad;
    }); 
  }

}

var GlobalLoaderComponent: angular.IComponentOptions = {
  bindings: {},
  controller: GlobalLoaderCtrl,
  template: `
  <div class="global-loader"
    ng-show="$ctrl.globalLoad" 
    ng-class="{ 'full-screen-load': $ctrl.fullScreenLoad }">
    <div class="spinner-container">
      <div class="dizzy-gillespie"></div>
    </div>
  </div>
  `
};

angular.module('Gandalfio').component('globalLoader', GlobalLoaderComponent);