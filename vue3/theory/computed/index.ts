/**
 * computed
 */
import { ReactiveEffect } from '../effect/index.js';

class ComputedImpl {
  _value: any;
  _dirty: boolean;
  _effect: ReactiveEffect;
  constructor(getter: Func){
    this._effect = new ReactiveEffect(getter, () => { this._dirty = true});
    this._dirty = true;
  }

  get value(){
    if(this._dirty){
      console.log("[ComputedImpl] data is dirty");
      this._dirty = false;
      this._value = this._effect.run();
    }
    return this._value;
  }

  set value(val: any){
    throw new Error("computed data is readonly");
  }
}


export function computed(getter: Func){
  return new ComputedImpl(getter);
}