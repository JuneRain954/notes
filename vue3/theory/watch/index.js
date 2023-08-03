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
export function watch(fn, callback, options) {
    var effect;
    var oldVal;
    var getter = fn;
    var job = function () {
        var value = effect.run();
        callback(value, oldVal);
        oldVal = value;
    };
    effect = new ReactiveEffect(getter, function () { return job(); });
    (options === null || options === void 0 ? void 0 : options.immediate) ? job() : (oldVal = effect.run());
}
