// 观察提供的数据

import { isObject } from '../../../lib/index.js';
import { Dep } from '../dep/index.js';

class Observer{
  data = undefined;
  constructor(data){
    this.data = data;
    this.init();
  }

  init(){
    this.observe();
  }

  observe(){
    const keys = Object.keys(this.data);
    keys.forEach(key => this.defineProperty(this.data, key, this.data[key]));
  }

  defineProperty(obj, key, val){
    let dep = new Dep();
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get(){
        // 收集依赖
        Dep.target && dep.add(Dep.target);
        return val;
      },
      set(newVal){
        val = newVal;
        // 触发依赖
        dep.notify();
      }
    })
  }
}

export function observe(data){
  if(!isObject(data)) return;
  return new Observer(data);
}
