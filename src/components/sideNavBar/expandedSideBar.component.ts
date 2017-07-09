class ExpandedSideBarCtrl {

  constructor() {
    
  }

  $onInit() {
    
  }

}

var ExpandedSideBarComponent: angular.IComponentOptions = {
  bindings: {},
  controller: ExpandedSideBarCtrl,
  template: `
  <div class="expanded-container">
    <ul class="nav nav-tabs">
      <li class="active"><a href="#home" data-toggle="tab">Log</a></li>
    </ul>
    <global-log></global-log>
  </div>
  `
};

angular.module('Gandalfio').component('expandedSideBar', ExpandedSideBarComponent);