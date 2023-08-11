/**
 * 工具函数
 */
import { KEY } from '../const/index';

/**
 * 函数柯里化
 * @param fn 目标函数
 * @param len 形参个数
 * @param args 参数数组
 * @returns 柯里化后的函数
 */
export function curry(fn: Function, len: number = fn.length, ...args: any[]){
  return function(this: any, ...params: any[]){
    const allParams = [...args, ...params];
    return (allParams.length >= len) ? fn.apply(this, allParams) : curry(fn, len, ...allParams);
  }
}

export function parseApiInfo(inst: any){
  // 获取 api 根路径  
  const instProto = <any>Reflect.getPrototypeOf(inst);
  const rootPath = <string>(Reflect.getMetadata(KEY.PATH, instProto.constructor));
  // 获取实例各方法对应的 api 子路径以及对应的请求方式
  const methodNameList = <string[]>(Reflect.ownKeys(instProto).filter((name) => name !== "constructor"));
  const info = methodNameList.map((name) => {
    const rawMethod = instProto[name];
    const reqMethod = Reflect.getMetadata(KEY.METHOD, rawMethod);
    const reqPath = Reflect.getMetadata(KEY.PATH, rawMethod);
    return {
      url: `${rootPath}/${reqPath}`,
      reqMethod,
      rawMethod: rawMethod.bind(inst),
    };
  })
  // 返回
  return info;
}