interface SideNavBarLink {
  path: string;
  title: string;
  icon: string;
  onClick?: (event: MouseEvent) => void;
}

class SideNavBarCtrl extends AngularClass {
  private logOpen: boolean;

  private currentPath: string;
  private topLinks: SideNavBarLink[];
  private bottomLinks: SideNavBarLink[];

  constructor(private $location : angular.ILocationService, 
    private $rootScope : angular.IRootScopeService) {
      super();
  }

  $onInit() {
    this.createLinks();
    this.registerOnRouteChange();
    this.logOpen = false;
  }

  $onDestroy() {

  }

  createLinks() {
    this.topLinks = [
      {
        path: '/',
        title: 'Import => Export',
        icon: 'vertical_align_bottom'
      }
    ];

    this.bottomLinks = [
      {
        path: '/',
        title: 'Log',
        icon: 'keyboard_arrow_right',
        onClick: this.toggleOpenSideBar
      }
    ];
  }

  toggleOpenSideBar() {
    console.log(this.logOpen);
    this.logOpen = !this.logOpen;
  }

  registerOnRouteChange() {
    this.$rootScope.$on('$routeChangeSuccess', () => {
      this.currentPath = this.$location.path();
    });
  }

}

var component: angular.IComponentOptions = {
  bindings: {},
  controller: SideNavBarCtrl,
  template: `
  <expanded-side-bar ng-show="$ctrl.logOpen"></expanded-side-bar>
  <div class="side-nav-bar" ng-class="{ 'log-open': $ctrl.logOpen }">
    <div ng-repeat="link in $ctrl.topLinks" 
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
    <bottom-nav-bar-links bottom-links="$ctrl.bottomLinks"></bottom-nav-bar-links>
  </div>  
  `
};


angular.module('Gandalfio').component('sideNavBar', component);