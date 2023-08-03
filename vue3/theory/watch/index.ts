/**
 * watch 功能
 */
import { ReactiveEffect } from '../effect/index.js';

/**
 * 监听响应式数据
 * @param fn getter函数
 * @param callback 回调函数
 * @param options 配置项对象
 */

export function watch(fn: Func, callback: Func, options?: WatchOptions){
  let effect: ReactiveEffect;
  let oldVal: undefined;
  const getter: Func = fn;
  const job = () => {
    const value = effect.run();
    callback(value, oldVal);
    oldVal = value;
  };
  effect = new ReactiveEffect(getter, () => job());
  options?.immediate ? job() : (oldVal = effect.run());
}
