/** xxx/effect/index.ts
 * 依赖相关
 */

const globalMap = new WeakMap();          // 存放响应式对象
let activeEffect: ReactiveEffect | null;  // 指向当前需要收集的依赖

// 接受依赖函数的类
export class ReactiveEffect {
  fn: Func;
  scheduler?: Func;
  constructor(fn: Func, scheduler?: Func){
    this.fn = fn;
    this.scheduler = scheduler;
  }

  run(){
    activeEffect = this;
    const res: any = this.fn();
    activeEffect = null;
    return res;
  }
}

/**
 * 收集依赖
 * @param target 目标数据对象
 * @param key 键名
 */
export function track(target: object, key: string): void{
  if(!activeEffect) return;
  // 1. 获取 target 对应的依赖映射
  let effectMap = globalMap.get(target);
  if(!effectMap) globalMap.set(target, ( effectMap = new Map() ));
  // 2. 获取 key 对应的依赖集合
  let effectSet = effectMap.get(key);
  if(!effectSet) effectMap.set(key, ( effectSet = new Set() ));
  // 3. 收集依赖
  trackEffect(effectSet);
}

/**
 * 保存依赖
 * @param deps 依赖集合
 */
export function trackEffect(deps: Set<ReactiveEffect>){
  if(!activeEffect) return;
  deps.add(activeEffect as ReactiveEffect);
}


/**
 * 触发依赖
 * @param target 目标数据对象
 * @param key 键名
 */
export function trigger(target: object, key: string): void{
  // 1. 获取 target 对应的依赖映射
  const effectMap = globalMap.get(target);
  if(!effectMap) return;
  // 2. 获取 key 对应的依赖集合
  const effectSet = effectMap.get(key);
  if(!effectSet) return;
  // 3. 触发依赖
  triggerEffect(effectSet);
}

/**
 * 执行依赖
 * @param deps 依赖集合
 */
export function triggerEffect(deps: Set<ReactiveEffect>){
  deps.forEach((effect: ReactiveEffect) => effect.scheduler? effect.scheduler() : effect.run());
}


/**
 * 生成依赖实例
 * @param fn 依赖函数
 * @param options 配置项对象
 */
export function effect(fn: Func, options?: EffectOptions){
 const _effect: ReactiveEffect = new ReactiveEffect(fn, options?.scheduler);
 _effect.run();
 return _effect.run.bind(_effect);
}