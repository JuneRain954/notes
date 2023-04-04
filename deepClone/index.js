// 实现深拷贝

// 引用类型数据的字面量
const TYPE_MAP = {
  OBJECT: "[object Object]",
  ARRAY: "[object Array]",
  MAP: "[object Map]",
  SET: "[object Set]",
  DATE: "[object Date]",
  FUNCTION: "[object Function]",
  REGEXP: "[object RegExp]",
};

// 各引用类型数据相应的处理函数
const COPY_TARGET_ITEM = {
  [TYPE_MAP.OBJECT]: copyObject,
  [TYPE_MAP.ARRAY]: copyArray,
  [TYPE_MAP.MAP]: copyMap,
  [TYPE_MAP.SET]: copySet,
  [TYPE_MAP.DATE]: copyDate,
  [TYPE_MAP.FUNCTION]: copyFunction,
  [TYPE_MAP.REGEXP]: copyRegExp,
};


// 全局映射集合
let globalMap = new WeakMap();


function deepClone(data){
  // 原始类型的数据，直接返回
  if(!isInstanceOfObject(data)) return data;

  // 引用类型数据的处理逻辑
  // 利用 WeakMap 解决循环引用问题
  if(globalMap.has(data)) return globalMap.get(data);
  let copy = createEmptyItem(data);
  globalMap.set(data, copy);
  const copier = COPY_TARGET_ITEM[getType(data)]
  if(copier){
    copy = copier(copy, data);
  }
  return copy;
}


/**
 * 判断给定的数据是否引用类型的数据
 * @param {any} data 目标数据
 * @returns Boolean
 */
function isInstanceOfObject(data){
  return (data instanceof Object);
}

/**
 * 创建空白数据对象
 * @param {Object} data 给定的目标数据对象
 * @returns 已实现继承的空白数据对象
 */
function createEmptyItem(data){
  // 通过调用给定对象的构造函数 constructor 来创建，从而实现继承
  const Ctor = data.constructor;
  let emptyItem = new Ctor();
  return emptyItem;
}


/**
 * 获取数据的类型
 * @param {any} data 给定的数据
 * @returns String 数据的类型
 */
function getType(data){
  return Object.prototype.toString.call(data);
}


/**
 * 拷贝对象
 * @param {Object} copy 副本
 * @param {Object} target 目标对象
 * @returns 副本
 */
function copyObject(copy, target){
  const keys = Object.keys(target);
  keys.forEach((key) => copy[key] = deepClone(target[key]))
  return copy;
}


/**
 * 拷贝数组
 * @param {Array} copy 副本
 * @param {Array} target 目标数组
 * @returns 副本
 */
function copyArray(copy, target){
  target.forEach((value, idx) => { copy[idx] = deepClone(value) })
  return copy;
}


/**
 * 拷贝映射集合
 * @param {Map} copy 副本
 * @param {Map} target 目标映射集合
 * @returns 副本
 */
function copyMap(copy, target){
  target.forEach((value, key) => { copy.set(key, deepClone(value)) })
  return copy;
}


/**
 * 拷贝集合
 * @param {Set} copy 副本
 * @param {Set} target 目标集合
 * @returns 副本
 */
function copySet(copy, target){
  target.forEach((value) => copy.add( deepClone(value) ))
  return copy;
}


/**
 * 拷贝日期对象
 * @param {Date} copy 副本
 * @param {Date} target 目标日期对象
 * @returns 副本
 */
function copyDate(copy, target){
  copy = new Date(target);
  return copy;
}


/**
 * 拷贝函数
 * @param {Function} copy 副本
 * @param {Functon} target 目标函数
 * @returns 副本
 */
function copyFunction(copy, target){
  copy = function(...args){
    return target.call(this, ...args);
  }
  return copy;
}


/**
 * 拷贝正则
 * @param {RegExp} copy 副本
 * @param {RegExp} target 目标正则对象
 * @returns 副本
 */
function copyRegExp(copy, target){
  const { source, flags } = target;
  copy = new RegExp(source, flags);
  return copy;
}




// 测试数据
let testMap = new Map();
testMap.set("txt", 1999);
testMap.set(333, "???");
testMap.set(Symbol(true), {txt: "this is an text"});


let testSet = new Set();
testSet.add(1001);
testSet.add(3020);
testSet.add(44400);


const testData = {
  field_1: 9527,
  field_2: "This is an content",
  field_3: true,
  field_4: Symbol("unique string"),
  field_5: undefined,
  field_6: null,
  field_7: {
    age: 10,
    name: "juneRain",
  },
  field_8: ["hhh", 188, {gender: "male"}],
  field_9: testMap,
  field_10: testSet,
  field_11: new Date(),
  field_12: function(){
    console.log("field_12");
  },
  field_13: () => { console.log("field_13") },
  field_14: /^[a-zA-Z].*\d$/ig,
};
// 循环引用
testData.field_7.circle = testData;

let copyData = deepClone(testData);
console.log(copyData === testData, copyData);