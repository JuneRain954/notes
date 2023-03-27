// 计算属性逻辑

import { ReactiveEffect } from "../reactiveEffect/index.js";

class ComputedImpl{
  _fn = undefined;
  _dirty = true;
  _value = undefined;
  _effect = undefined;
  constructor(fn){
    this._fn = fn;
    this._effect = new ReactiveEffect(fn, this.update.bind(this));
  }
  
  update(){
    this._dirty = true;
  }

  get value(){
    if(this._dirty){
      this._dirty = false;
      this._value = this._effect.run();
    }
    return this._value;
  }
}

export function computed(fn){
  return new ComputedImpl(fn);
}