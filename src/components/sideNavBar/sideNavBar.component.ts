class SideNavBarCtrl {
  private $rootScope: angular.IRootScopeService;
  private $location: angular.ILocationService;

  private currentPath: string;
  private links: {
    path: string
    title: string;
    icon: string;
  }[];

  constructor($location : angular.ILocationService, $rootScope : angular.IRootScopeService) {
    this.$location = $location;
    this.$rootScope = $rootScope;
  }

  $onInit() {
    this.createLinks();
    this.registerOnRouteChange();
  }

  $onDestroy() {

  }

  createLinks() {
    this.links = [
      {
        path: '/',
        title: 'Import => Export',
        icon: 'vertical_align_bottom'
      },
      {
        path: '/test',
        title: 'Testing asd with some asd',
        icon: 'bubble_chart'
      }
    ]
  }

  registerOnRouteChange() {
    this.$rootScope.$on('$routeChangeSuccess', () => {
      this.currentPath = this.$location.path();
    })
  }

  

}

var component: angular.IComponentOptions = {
  bindings: {},
  controller: SideNavBarCtrl,
  template: `
  <div class="side-nav-bar">
    <div ng-repeat="link in $ctrl.links" 
      class="nav-link-container" 
      ng-class="{ active: link.path === $ctrl.currentPath }"
      tooltip="{ 
        title: link.title, 
        placement: 'right', 
        delay: {
          show: 500,
          hide: 100
        } 
      }">
      <i class="material-icons">{{ ::link.icon }}</i>
    </div>
  </div>  
  `
}


angular.module('Gandalfio').component('sideNavBar', component);