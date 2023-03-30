import { isFunction, isInstanceOf, isObject } from "./lib.js";

export class MyPromise{
  // promise 的状态, 用静态属性表示
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  static PENDING = "pending";

  PromiseResult = undefined;  // Promise对象的结果
  PromiseState = undefined; // Promise对象的状态
  onFulfilledCallbacks = undefined; // 保存成功回调
  onRejectedCallbacks = undefined;  // 保存失败回调
  // 构造函数, new 命令生成对象时, 自动调用类的构造函数
  constructor(fn){
    this.PromiseState = MyPromise.PENDING; // promise 实例状态的初始值
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    try {
      /**
       * fn 传入 resolve 和 reject 函数
       * new 对象实例的时候,自动执行 fn
       * tip: 因为 resolve, reject 在外边调用, 作用得绑定 this
       */
      const { resolve, reject } = this;
      fn(resolve.bind(this), reject.bind(this))
    } catch (error) {
      // 创建实例时(执行 resolve 或 reject ), 若报错, 则把错误信息传递给 reject 函数并执行
      this.reject(error)
    }
  }

  /**
   * Promise 对象成功态的回调
   * @param {any} result Promise 对象为成功态时的结果值
   */
  resolve(result){
    // 状态只能由 pending => fulfilled, 避免多次执行
    if(this.PromiseState === MyPromise.PENDING){
      this.PromiseState = MyPromise.FULFILLED;
      this.PromiseResult = result;
      /**
       * 执行 resolve 时, 若自身的 callbacks 数组存在 then 函数里保存的回调,
       * 则遍历数组，执行每一个回调，并传入结果值
       */
      this.onFulfilledCallbacks.forEach(cb => cb(result))
    }
  }
  
  /**
   * Promise 对象失败态时的回调
   * @param {any} reason Promise 对象失败态时的结果值
   */
  reject(reason){
    // 状态只能 pending => rejeccted, 避免多次调用
    if(this.PromiseState === MyPromise.PENDING){
      this.PromiseState = MyPromise.REJECTED;
      this.PromiseResult = reason;
      /**
       * 执行 rejected 时, 若自身 callbacks 数组存在 then 函数里保存的回调,
       * 则遍历数组, 执行每一个回调, 并传入结果值
       */
      this.onRejectedCallbacks.forEach(cb => cb(reason))
    }
  }

  /**
   * 保存 fulfilled 态或 rejected 态对应的回调函数
   * @param {Function} onFulfilled fulfilled状态时执行的函数
   * @param {Function} onRejected rejected状态时执行的函数
   * @returns 新的 promise 实例
   */
  then(onFulfilled, onRejected){
    // 规范2.2.7 返回一个 promise 实例
    const promise2 = new MyPromise((resolve, reject) => {
      if(this.PromiseState === MyPromise.FULFILLED){
        /**
         * 规范2.2.4 onFullfiled 和 onRejected 回调只有在执行栈仅包含平台代码时才可被调用
         * 即：onFulfilled 和 onRejected 函数需异步执行, 需在 then 函数被调用的那一轮事件循环之后执行,
         *    这里采用 setTimeout 来模式实现
         */
        setTimeout(() => {
          try {
            if(!isFunction(onFulfilled)){
              // 规范2.2.7.3 若 onFulfilled 不是函数且promise1成功执行, 则 promise2 必须成功执行并返回相同的值
              resolve(this.PromiseResult)
            }else{
              /** 规范2.2.7.1 若 onFulfilled 或 onRejected 返回一个值 x, 则
              *  执行 [[Resolve]](promise2, x) 的解决过程, 即执行 resolvePromise()
              */
              let x = onFulfilled(this.PromiseResult);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            // 规范2.2.7.2 若 onFulfilled 或 onRejected 抛出异常 e, 则 promise2 必须拒绝执行, 并返回拒因 e
            reject(error)
          }
        })
      }
      if(this.PromiseState === MyPromise.REJECTED){
        setTimeout(() => {
          try {
            if(!isFunction(onRejected)){
              reject(this.PromiseResult)
            }else{
              let x = onRejected(this.PromiseResult);
              resolvePromise(promise2, x, resolve, reject)
            }
            } catch (error) {
              reject(error)
            }
        })
      }
      if(this.PromiseState === MyPromise.PENDING){
        // pending 状态保存的回调, 也要遵守规范 2.2.7.1, 2.2.7.2, 2.2.7.3 和 2.2.7.4
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              if(!isFunction(onFulfilled)){
                resolve(this.PromiseResult)
              }else{
                let x = onFulfilled(this.PromiseResult);
                resolvePromise(promise2, x, resolve, reject)
              }
            } catch (error) {
              reject(error)
            }
          })
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              if(!isFunction(onRejected)){
                reject(this.PromiseResult)
              }else{
                let x = onRejected(this.PromiseResult);
                resolvePromise(promise2, x, resolve, reject)
              }
            } catch (error) {
              reject(error)
            }
          })
        })
      }
    })

    return promise2;
  }

  catch(onRejected){
    return this.then(undefined, onRejected);
  }
}



/**
 * 对 resolve 和 reject 方法进行改造增强, 针对 resolve 和 rejct 中不同值的情况进行处理
 * @param {Promise} promise2 promise1.then 方法返回的新的 Promise 对象
 * @param {any} x promise1中 onFulfilled 或 onRejected 方法的返回值
 * @param {Function} resolve promise2 的 resolve 方法
 * @param {Function} reject promise2 的 reject 方法
 * @returns 
 */
function resolvePromise(promise2, x, resolve, reject){
  if(promise2 === x){
    // 规范2.3.1 若 promise2 和 x 指向同一个对象, 则以 TypeError 为拒因拒绝指向 promise
    throw new TypeError("chaining cycle")
  }

  if(isInstanceOf(x, MyPromise)){
    /** 规范2.3.2 若 x 为 promise 实例, 则使 promise2 接受 x 的状态, 
     *  即: 继续执行 x, 若执行的时候拿到一个 y, 则继续解析 y
     */ 
    x.then(y => resolvePromise(promise2, y, resolve, reject), reject)
  }else if(isObject(x) || isFunction(x)){
    // 规范2.3.3 若 x 为对象或者函数
    try {
      // 规范2.3.3.1 把 x.then 赋值给 then
      const then = x.then;
    } catch (error) {
      // 规范2.3.3.2 若取 x.then 时抛出错误 e, 则以 e 为拒因拒绝执行 promise
      return reject(error)
    }

    /**
     * 规范2.3.3.3 若 then 是函数, 则将 x 作为函数的作用域 this 调用,
     * 此时传递两个回调函数作为参数, 第一个参数名为 resolveProimse, 第二个参数名为 rejectPromise
     */
    if(isFunction(then)){
      /** 规范2.3.3.3.3 若 resolvePromise 和 rejectPromise 均被调用, 或者
       *  被同一参数多次调用, 则优先采用首次调用并忽略其余的调用
       */
      let hasBeenCalled = false;
      try {
        then.call(
          x,
          // 规范2.3.3.3.1 若 resolvePromise 以值 y 为参数被调用, 则运行 [[Roselve]](promise, y)
          y => {
            if(hasBeenCalled) return;
            hasBeenCalled = true;
            resolvePromise(promise2, y, resolve, reject)
          },
          // 规范2.3.3.3.2 若 rejectPromise 以拒因 r 为参数被调用, 则以拒因 r 拒绝执行 promise
          r => {
            if(hasBeenCalled) return;
            hasBeenCalled = true;
            reject(r)
          }
        ) 
      } catch (error) {
        /**
         * 规范2.3.3.3.4 若调用 then 方法抛出异常 e,
         *    规范2.3.3.3.4.1 若 resolvePromise 或 rejectPromise 已被调用, 则忽略
         */
        if(hasBeenCalled) return;
        hasBeenCalled = true;
        //    规范 2.3.3.3.4.2 否则以 e 为拒因拒绝执行 promise
        reject(error)
      }
      
    }else{
      // 规范2.3.3.4 若 then 不是函数, 则以 x 为参数执行 promise
      resolve(x)
    }
  }else{
    // 规范2.3.4 若 x 既不是对象也不是函数, 则以 x 为参数执行 promise
    return resolve(x)
  }
}