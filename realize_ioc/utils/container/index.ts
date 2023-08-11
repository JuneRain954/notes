/**
 * IOC容器
 */
import { DELIMITER } from '../const/index';

type ClassStructor = new (...args: any[]) => any;
type ServiceKey = string | ClassStructor;

export class IocContainer {
  // IOC类映射
  static servicesMap: Map<ServiceKey, ClassStructor> = new Map();
  // 实例属性映射
  static propertyKeysMap: Map<string, ClassStructor> = new Map();

  private constructor(){}

  /**
   * 实例化IOC类
   * @param key 键名
   */
  static get(key: ServiceKey){
    // 1. 获取构造函数
    const Ctor = IocContainer.servicesMap.get(key);
    if(!Ctor) return undefined;
    // 2. 创建实例
    const inst = new Ctor();
    // 3. 初始化实例属性
    const CtorName = Ctor.name;
    IocContainer.propertyKeysMap.forEach((val, key) => {
      const [className, property] = key.split(DELIMITER);
      if(className === CtorName){
        (inst as any)[property] = IocContainer.get(val);
      }
    })
    // 4. 返回实例
    return inst;
  }

  /**
   * 存放IOC类
   * @param key 键名
   * @param value 值
   */
  static set(key: ServiceKey, value: ClassStructor){
    IocContainer.servicesMap.set(key, value);
  }

}