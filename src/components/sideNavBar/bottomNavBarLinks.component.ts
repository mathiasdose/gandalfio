class BottomNavBarLinksCtrl {

  private bottomLinks: SideNavBarLink[];
  constructor() {

  }

  $onInit() {
    
  }

}

var Component: angular.IComponentOptions = {
  bindings: {
    bottomLinks: '<'
  },
  controller: BottomNavBarLinksCtrl,
  template: `
  <div ng-repeat="link in $ctrl.bottomLinks"
    ng-click="link.onClick($event)" 
    class="nav-link-container bottom" 
    ng-class="{ active: link.path === $ctrl.currentPath }"
    tooltip="{ 
      title: link.title, 
      placement: 'right' 
    }">
    <i class="material-icons">{{ ::link.icon }}</i>
  </div>
  `
};

angular.module('Gandalfio').component('bottomNavBarLinks', Component);