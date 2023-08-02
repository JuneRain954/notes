/** xxx/effect/index.ts
 * 依赖相关
 */
var globalMap = new WeakMap(); // 存放响应式对象
var activeEffect; // 指向当前需要收集的依赖
// 接受依赖函数的类
var ReactiveEffect = /** @class */ (function () {
    function ReactiveEffect(fn, scheduler) {
        this.fn = fn;
        this.scheduler = scheduler;
    }
    ReactiveEffect.prototype.run = function () {
        activeEffect = this;
        var res = this.fn();
        activeEffect = null;
        return res;
    };
    return ReactiveEffect;
}());
export { ReactiveEffect };
/**
 * 收集依赖
 * @param target 目标数据对象
 * @param key 键名
 */
export function track(target, key) {
    if (!activeEffect)
        return;
    // 1. 获取 target 对应的依赖映射
    var effectMap = globalMap.get(target);
    if (!effectMap)
        globalMap.set(target, (effectMap = new Map()));
    // 2. 获取 key 对应的依赖集合
    var effectSet = effectMap.get(key);
    if (!effectSet)
        effectMap.set(key, (effectSet = new Set()));
    // 3. 收集依赖
    trackEffect(effectSet);
}
/**
 * 保存依赖
 * @param deps 依赖集合
 */
export function trackEffect(deps) {
    if (!activeEffect)
        return;
    deps.add(activeEffect);
}
/**
 * 触发依赖
 * @param target 目标数据对象
 * @param key 键名
 */
export function trigger(target, key) {
    // 1. 获取 target 对应的依赖映射
    var effectMap = globalMap.get(target);
    if (!effectMap)
        return;
    // 2. 获取 key 对应的依赖集合
    var effectSet = effectMap.get(key);
    if (!effectSet)
        return;
    // 3. 触发依赖
    triggerEffect(effectSet);
}
/**
 * 执行依赖
 * @param deps 依赖集合
 */
export function triggerEffect(deps) {
    deps.forEach(function (effect) { return effect.scheduler ? effect.scheduler() : effect.run(); });
}
/**
 * 生成依赖实例
 * @param fn 依赖函数
 * @param options 配置项对象
 */
export function effect(fn, options) {
    var _effect = new ReactiveEffect(fn, options === null || options === void 0 ? void 0 : options.scheduler);
    _effect.run();
    return _effect.run.bind(_effect);
}
