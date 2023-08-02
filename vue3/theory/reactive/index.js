/**  xxx/reactive/index.ts
 * 响应式原理
 */
import { track, trigger } from '../effect/index.js';
var PROXY_HANDLER = {
    get: function (target, key) {
        var res = Reflect.get(target, key);
        // 收集依赖
        track(target, key);
        return res;
    },
    set: function (target, key, value) {
        var res = Reflect.set(target, key, value);
        // 触发依赖
        trigger(target, key);
        return res;
    }
};
/**
 * 创建响应式数据
 * @param data 目标对象
 * @returns 响应式对象
 */
export function reactive(data) {
    return new Proxy(data, PROXY_HANDLER);
}
