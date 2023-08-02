/**
 * ref
 */
import { trackEffect, triggerEffect } from '../effect/index.js';
import { reactive } from '../reactive/index.js';
var RefImpl = /** @class */ (function () {
    function RefImpl(val) {
        this._value = val;
        this.deps = new Set();
    }
    Object.defineProperty(RefImpl.prototype, "value", {
        get: function () {
            // 收集依赖
            trackEffect(this.deps);
            return this._value;
        },
        set: function (val) {
            this._value = val;
            // 触发依赖
            triggerEffect(this.deps);
        },
        enumerable: false,
        configurable: true
    });
    return RefImpl;
}());
/**
 * 创建响应式数据
 * @param data 目标数据
 * @returns 响应式数据
 */
export function ref(data) {
    if (data instanceof Object)
        return reactive(data);
    return new RefImpl(data);
}
