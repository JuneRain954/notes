// 手动实现 call/apply/bind 以及 new 的功能
import { isNullOrUndefined, createCorrespendingItem, isIntanceOf } from './lib.js';

// ! 每个函数都能使用 call/apply/bind ，说明这三个函数在 Function 的 prototype 中定义 console.dir(Function.prototype)
export function realize(){
  console.log("[realize] running");
  // call
  realizeCall()

  // apply
  realizeApply()

  // bind
  realizeBind()
}



// 实现call函数
function realizeCall(){
  Function.prototype._call = function(ctx, ...args){
    // 1. 初始化上下文
    ctx = isNullOrUndefined(ctx) ? window : createCorrespendingItem(ctx);
    // 2. 把将要执行的函数(this)作为ctx的属性进行调用
    // ? 解释：obj.fn() => fn 内的 this 指向 obj, 所以 func.call() => call 函数内的 this 指向 func
    const key = Symbol();
    ctx[key] = this;
    let res = ctx[key](...args);
    Reflect.deleteProperty(ctx, key);
    // 3. 返回结果
    return res;
  }
}

// 实现 apply
function realizeApply(){
  Function.prototype._apply = function(ctx, argsArray = []){
    // 实现过程跟 call 一样，只是传参的方式不同
    ctx = isNullOrUndefined(ctx) ? window : createCorrespendingItem(ctx);
    const Key = Symbol();
    ctx[Key] = this;
    let res = ctx[Key](...argsArray);
    Reflect.deleteProperty(ctx, Key);
    return res;
  }
}


// 实现 bind 函数功能
function realizeBind(){
  Function.prototype._bind = function(ctx, ...args){
    const targetFn = this;
    return function F(...params){
      let res;
      if(isIntanceOf(this, F)){
        res = new targetFn(...args, ...params);
      }else{
        ctx = isNullOrUndefined(ctx) ? window : createCorrespendingItem(ctx);
        const key = Symbol();
        ctx[key] = targetFn;
        res = ctx[key](...args, ...params);
        Reflect.deleteProperty(ctx, key);
      }
      return res;
    }
  }
}


// 实现 new 
export function _new(fn, ...args){
  // 1. 创建空对象并绑定原型 
  const targetObj = Object.create(fn.prototype);
  // 2. 执行函数获取返回值
  let res = fn.call(targetObj, ...args);
  // 3. 处理返回值
  res = isIntanceOf(res, Object) ? res : targetObj;
  // 4. 返回
  return res;
}

