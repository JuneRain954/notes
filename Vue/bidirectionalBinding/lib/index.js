// 工具集
import { DATA_TYPE_MAP } from '../lib/const.js';

export function isObject(data){
  return getDataType(data) === DATA_TYPE_MAP.OBJECT;
}


function getDataType(data){
 return Object.prototype.toString.call(data);
}