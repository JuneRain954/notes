/**
 * 工具函数
 */

/**
 * 获取给定数据的类型
 * @param data 目标数据
 * @returns 类型字符串
 */
export function getType(data: any): string {
  return Object.prototype.toString.call(data);
}

/**
 * 判断 item 是否为 target 的实例
 * @param item 目标数据
 * @param target 作为对比的目标数据
 * @returns Boolean
 */
export function isInstanceOf(item: any, target: any): boolean{
  return item instanceof target;
}