class TooltipCtrl {
  private $element: angular.IRootElementService;
  private tooltip: TooltipOptions;
  
  constructor($element: angular.IRootElementService) {
    this.$element = $element;
  }

  $onInit() {
    this.tooltip.delay = this.tooltip.delay || { show: 500, hide: 100 };
    this.$element.tooltip(this.tooltip);
  }

  $onDestroy() {

  }
}

function tooltipDirective() {
  let directive : angular.IDirective = {
    restrict: 'A',
    bindToController: {
      tooltip: '<'
    },
    controller: TooltipCtrl
  }
  return directive;
}


angular.module('Gandalfio').directive('tooltip', tooltipDirective);