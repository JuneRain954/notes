
const DATA_TYPE_MAP = {
  FUNCTION: "[object Function]",
  OBJECT: "[object Object]",
}

export function isFunction(fn){
  return getType(fn) === DATA_TYPE_MAP.FUNCTION;
}

export function isObject(data){
  return getType(data) === DATA_TYPE_MAP.OBJECT;
}

export function isInstanceOf(item, target){
  return (item instanceof target);
}

function getType(data){
  return Object.prototype.toString.call(data);
}