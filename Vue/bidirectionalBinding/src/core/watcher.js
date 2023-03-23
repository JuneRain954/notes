// 观察者

import { Dep } from './dep.js';


export class Watcher{
  vm = undefined;
  expression = undefined;
  callback = undefined;
  value = undefined;
  constructor(vm, expression, callback){
    this.vm = vm;
    this.expression = expression;
    this.callback = callback;
    // 绑定更新事件
    this.value = this.getValue();
  }

  getValue(){
    const { vm, expression } = this;
    Dep.target = this;
    const value = vm[expression]; // 触发 getter , 收集依赖
    Dep.target = undefined;
    return value;
  }

  update(){
    this.run.call(this);
  }

  run(){
    const { vm, expression } = this;
    const val = vm[expression];
    const oldVal = this.value;
    if(val !== oldVal){
      this.value = val;
      this.callback.call(vm, val, oldVal);
    }
  }
}