/**  xxx/reactive/index.ts
 * 响应式原理
 */
import { track, trigger } from '../effect/index.js';

const PROXY_HANDLER = {
  get(target: object, key: string){
    const res: any = Reflect.get(target, key);
    // 收集依赖
    track(target, key);
    return res;
  },
  set(target: object, key: string, value: any){
    const res = Reflect.set(target, key, value);
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
export function reactive<T extends object>(data: T): T{
  return new Proxy(data, PROXY_HANDLER) as T;
}