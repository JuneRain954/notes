// 创建自定义MVVM模型

import { Compolier } from "./compiler.js";
import { observe } from "./observer.js";

export class MVVM{
  el = undefined;
  data = undefined;
  methods = undefined;
  constructor(options){
    this.el = options.el;
    this.data = options.data;
    this.methods = options.methods;
    this.init();
  }

  init(){
    // 外层映射，目的：直接以 this.xxx 的形式访问 data 里的数据，而不用 this.data.xxx 的形式访问
    this.outerLayerProxy();
    this.initObserver();
    this.initCompiler();
  }

  outerLayerProxy(){
    const keys = Object.keys(this.data);
    keys.forEach(key => {
      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: false,
        get(){
          return this.data[key]
        },
        set(newVal){
          this.data[key] = newVal;
        }
      })
    })
  }

  initObserver(){
    observe(this.data);
  }


  initCompiler(){
    new Compolier(this.el, this);
  }
}