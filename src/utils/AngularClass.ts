class AngularClass {

  constructor() {
    this._bindMethodsToThis();
  }

  private _getMethodNames() {
    const excludes = [
      'constructor'
    ];
    const props = Object.getOwnPropertyNames(this.constructor.prototype);
    const names = [];
    for (let p of props) {
      const p2 = this[p];
      if (_.isFunction(p2) && excludes.indexOf(p) === -1) {
        names.push(p);
      }
    }
    return names;
  }

  private _bindMethodsToThis() {
    const methods = this._getMethodNames();

    methods.forEach((item) => {
      this[item] = this[item].bind(this);
    });
  }

}