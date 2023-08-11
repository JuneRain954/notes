/**
 * 装饰器函数
 */
import "reflect-metadata";
import { KEY, REQ_METHOD, DELIMITER } from '../const';
import { curry } from '../tools';
import { IocContainer } from '../container';

/**
 * 存储IOC类
 * @returns 类装饰器函数
 */
export function Injectable(): ClassDecorator{
  return function(target: any){
    IocContainer.set(target, target);
  }
}

/**
 * 依赖注入
 * @returns 属性装饰器函数
 */
export function Inject(): PropertyDecorator{
  return function(target: any, property: any){
    const key = `${target.constructor.name}${DELIMITER}${property}`;
    const value = Reflect.getMetadata(KEY.TYPE, target, property);
    IocContainer.propertyKeysMap.set(key, value);
  }
}

/**
 * 定义请求的根路径
 * @param path 请求的根路径
 * @returns 类装饰器函数
 */
export function Controller(path: string = ""): ClassDecorator{
  return function(target: any){
    Reflect.defineMetadata(KEY.PATH, path,target);
  }
}

// GET 请求
export const Get = curry(ApiMethod)(REQ_METHOD.GET);

// POST 请求
export const Post = curry(ApiMethod)(REQ_METHOD.POST);

/**
 * 定义实例方法对应的请求方式以及请求的子路径
 * @param method 请求的方式
 * @param path 请求的子路径
 * @returns 方法装饰器函数
 */
function ApiMethod(method: string, path?: string): MethodDecorator{
  return function(target: any, property: any, descriptor: any){
    const rawMethod = descriptor.value;
    Reflect.defineMetadata(KEY.METHOD, method, rawMethod);
    Reflect.defineMetadata(KEY.PATH, path ?? "", rawMethod);
  }
}