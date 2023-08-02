/**
 * computed
 */
import { ReactiveEffect } from '../effect/index.js';
var ComputedImpl = /** @class */ (function () {
    function ComputedImpl(getter) {
        var _this = this;
        this._effect = new ReactiveEffect(getter, function () { _this._dirty = true; });
        this._dirty = true;
    }
    Object.defineProperty(ComputedImpl.prototype, "value", {
        get: function () {
            if (this._dirty) {
                console.log("[ComputedImpl] data is dirty");
                this._dirty = false;
                this._value = this._effect.run();
            }
            return this._value;
        },
        set: function (val) {
            throw new Error("computed data is readonly");
        },
        enumerable: false,
        configurable: true
    });
    return ComputedImpl;
}());
export function computed(getter) {
    return new ComputedImpl(getter);
}
