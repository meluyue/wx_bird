/**
 * author LUYUE
 * description 变量缓存器，方便在不同的类中调用和修改
 * date 2018-5-31
 */
export class DataStore {

  static getInstance() {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  constructor() {
    this.map = new Map();
  }

  put(key, value) {
    if(typeof value ==='function'){
      value=new value();
    }
    this.map.set(key, value);
    return this;
  }

  get(key) {
    return this.map.get(key);
  }

  destroy() {
    for (let value of this.map.values()) {
      value = null;
    }
  }
}