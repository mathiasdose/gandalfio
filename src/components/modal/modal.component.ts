class ModalCtrl {
  private modalElem: JQuery;

  constructor(private $element: angular.IRootElementService) {
    
  }

  $onInit() {
    this.modalElem = this.$element.find('#modal');
  }

  openModal() {
    this.modalElem.modal('show');
  }

  closeModal() {
    this.modalElem.modal('hide');
  }

}

var ModalComponent: angular.IComponentOptions = {
  bindings: {
    modalTitle: '@',
    disableModalFooter: '<'
  },
  transclude: true,
  controller: ModalCtrl,
  template: `
  <div id="modal" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">{{::$ctrl.modalTitle}}</h4>
        </div>
        <div class="modal-body" ng-transclude></div>
        <div class="modal-footer" ng-if="!$ctrl.disableModalFooter">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>
  `
}

angular.module('Gandalfio').component('modal', ModalComponent); 