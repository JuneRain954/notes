/**
 * ref
 */
import { ReactiveEffect, trackEffect, triggerEffect } from '../effect/index.js';
import { reactive } from '../reactive/index.js';

class RefImpl {
  _value: any;
  deps: Set<ReactiveEffect>;
  constructor(val: any){
    this._value = val;
    this.deps = new Set()
  }

  get value(){
    // 收集依赖
    trackEffect(this.deps);
    return this._value;
  }

  set value(val: any){
    this._value = val;
    // 触发依赖
    triggerEffect(this.deps);
  }
}

/**
 * 创建响应式数据
 * @param data 目标数据
 * @returns 响应式数据
 */
export function ref(data: any){
  if(data instanceof Object) return reactive(data);
  return new RefImpl(data);
}