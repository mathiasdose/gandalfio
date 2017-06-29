interface Store {
  [key: string]: StorePart<any>;
}


class Konstrux extends AngularClass {
  store: Store;
  _$window: any;
  /**
   * @param  {angular.IWindowService} $window
   */
  constructor($window) {
    super();
    this._$window = $window;
    this.store = {};
    this._$window.konstrux = this;
  }

  registerStorePart<T>(storePartName: string, initialValue?: T) {
    this.store[storePartName] = new StorePart(initialValue, storePartName);
    return this.store[storePartName];
  }

  select(storePartName: string) {
    let storePart = this.store[storePartName] ? this.store[storePartName] : this.registerStorePart(storePartName);
    return storePart;
  }

  _getState() {
    return _.reduce(this.store, (tot, storePart) => {
      tot[storePart._storePartName] = storePart._data;
      return tot;
    }, {});
  }

  combine(...storePartNames: string[]) {
    let storeParts = storePartNames.map(storePartName => this.select(storePartName));
    let storePartCombination = new StorePartCombination(storeParts);
    return storePartCombination;
  }

}

class StorePartCombination extends AngularClass {
  _storeParts: StorePart<any>[];
  constructor(storeParts) {
    super();
    this._storeParts = storeParts;
  }

  compute(callback) {
    let unsubs = [];
    this._storeParts.forEach(storePart => {
      let unsub = storePart.subscribe(data => {
        let otherStoreParts = this._storeParts.filter(_storePart => _storePart !== storePart);
        let retObj = {};
        retObj[storePart._storePartName] = data;
        otherStoreParts.forEach(_storePart => {
          retObj[_storePart._storePartName] = _storePart.getStoreData();
        });
        callback(retObj);
      }, false);
      unsubs.push(unsub);
    });
    let retObj = {};
    this._storeParts.forEach(storePart => retObj[storePart._storePartName] = storePart.getStoreData());
    callback(retObj);
    return () => unsubs.forEach(unsub => unsub());
  }

  
}

class StorePart<T> extends AngularClass {
  _callbacks: any[];
  _storePartName: any;
  _data: T;
  constructor(data: T, storePartName: string) {
    super();
    this._data = this._shallowCopy(data);
    this._freezeData();
    this._storePartName = storePartName;
    this._callbacks = [];
  }

  getStoreData() {
    return this._shallowCopy(this._data);
  }

  subscribe<T>(callback: (T) => void, runFirstTime = true) {
    this._callbacks.push(callback);
    if (runFirstTime) {
      callback(this._data);
    }
    return () => _.remove(this._callbacks, _callback => callback === _callback);
  }

  publish(data: T) {
    this._data = this._shallowCopy(data);
    this._freezeData();
    let sendingCopy = this.getStoreData();
    this._callbacks.forEach(callback => callback(sendingCopy));
  }

  private _freezeData() {
    this._data = this._deepFreeze(this._data);
  }

  private _deepFreeze(obj) {
    if (_.isNull(obj) || _.isUndefined(obj)) return obj;
    var propNames = Object.getOwnPropertyNames(obj);
    propNames.forEach(name => {
      var prop = obj[name];
      if (typeof prop == 'object' && prop !== null)
        this._deepFreeze(prop);
    });
    return Object.freeze(obj);
  }

  _shallowCopy(obj: T) : T{
    if (_.isArray(obj)) {
      let newArr : any = [...obj];
      return newArr;
    } else if (_.isObject(obj)) {
      return Object.assign({}, obj);
    }
    return obj;
  }

}



angular.module('Gandalfio').service('konstrux', Konstrux);