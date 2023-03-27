// 依赖处理逻辑

let targetEffect = undefined;
let targetMap = new Map();


export class ReactiveEffect{
  fn = undefined;
  scheduler = undefined;
  constructor(fn, scheduler){
    this.fn = fn;
    this.scheduler = scheduler;
  }

  run(){
    targetEffect = this;
    let res = this.fn();
    targetEffect = undefined;
    return res;
  }
}

/**
 * 收集依赖
 * @param {Object} target 响应式对象
 * @param {any} key 对象的 key 值
 * @returns 
 */
export function track(target, key){
  if(!targetEffect) return;
  // 获取 target 对象对应的映射集合
  let depsMap = targetMap.get(target);
  if(!depsMap) targetMap.set(target, ( depsMap = new Map() ));
  // 获取 key 对应的集合
  let deps = depsMap.get(key);
  if(!deps) depsMap.set(key, ( deps = new Set() ));
  // 收集依赖
  deps.add(targetEffect);
}

/**
 * 触发依赖
 * @param {Object} target 响应式对象
 * @param {any} key 响应式对应的 key 
 */
export function trigger(target, key){
  // 获取 target 对象对应的映射集合
  let depsMap = targetMap.get(target);
  // 获取 key 对应的集合
  let deps = depsMap.get(key);
  // 执行依赖
  deps.forEach(dep => {
    dep.scheduler ? dep.scheduler() : dep.run();
  })
}