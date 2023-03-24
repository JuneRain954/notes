// 工具函数

const NULL_OR_UNDEFINED = Symbol("null_or_undefined");


export function isNullOrUndefined(data){
  return (data ?? NULL_OR_UNDEFINED) === NULL_OR_UNDEFINED;
}

export function isIntanceOf(item, target){
  return (item instanceof target);
}

export function createCorrespendingItem(item){
  /**
   * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/Object
   * Object 构造函数将给定的值包装为一个新对象。
   *   - 如果给定的值是 null 或 undefined, 它会创建并返回一个空对象。
   *   - 否则，它将返回一个和给定的值相对应的类型的对象。
   *   - 如果给定值是一个已经存在的对象，则会返回这个已经存在的值（相同地址）。
   *   - 在非构造函数上下文中调用时， Object 和 new Object()表现一致。
   */
  return Object(item);
}