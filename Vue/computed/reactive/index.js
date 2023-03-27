import { track, trigger } from "../reactiveEffect/index.js"

const proxyHandler = {
  get(target, key){
    // 收集依赖
    track(target, key);
    const res = Reflect.get(target, key);
    return res;
  },
  set(target, key, newValue){
    const res = Reflect.set(target, key, newValue);
    // 触发依赖
    trigger(target, key);
    return res;
  }
}

// 创建响应式对象
export function reactive(data){
  return new Proxy(data, proxyHandler);
}