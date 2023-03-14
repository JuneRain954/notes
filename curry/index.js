// 函数柯里化 
// [「前端进阶」彻底弄懂函数柯里化](https://juejin.cn/post/6844903882208837645)
/* 定义：将一个接收多个参数的函数，分解成多个只接收一个参数的函数。例如：fn(1, 2, 3) ==> curry_fn(1)(2)(3)
 * 思路：定义一个包装函数，接收两个参数，分别是目标函数以及目标函数 fn 所需的参数个数 len；若提供的参数个数大于
 * 等于 len，则执行 fn，否则返回一个新函数，用于接收余下参数。
 */


/**
 * 包装函数--实现函数柯里化
 * @param {Function} fn 目标函数
 * @param {Number} len 目标函数所需的参数个数
 */
function curry(fn, len = fn.length){
  return _curry.call(this, fn, len);
}

/**
 * 柯里化函数
 * @param {Function} fn 目标函数
 * @param {Number} len 目标函数的参数个数
 * @param  {...any} args 参数数组
 * @returns 目标函数的执行结果或者新的函数
 */
function _curry(fn, len, ...args){
  return function(...params){
    const totalParams = [...args, ...params];
    let result;
    if(totalParams.length >= len){
      result = fn.apply(this, totalParams);
    }else{
      result = _curry.call(this, fn, len, ...totalParams);
    }
    return result;
  }
}

// 测试例子1
function test(a, b, c, d, e){
  console.log(a, b, c, d, e);
}

let t = curry(test);
t(1, 2, 3, 4, 5); // 1, 2, 3, 4, 5
t(1)(2)(3)(4)(5); // 1, 2, 3, 4, 5
t(1, 2, 3)(4, 5); // 1, 2, 3, 4, 5
t(1, 2, 3)(4)(5); // 1, 2, 3, 4, 5

// ! 应用场景1
// 正则校验 如：检验手机号码
function checkByRegExp(reg, phone){
  return reg.test(phone);
}

// 通常的使用方式：
let res = checkByRegExp(/^1[3-9]{1}[0-9]{9}/, "13712347896");
console.log("checkByRegExp: ", res);

// 应用函数柯里化的使用方式：
// 1. 利用函数柯里化，生成适用性更高的函数
let createCheckFunction = curry(checkByRegExp);
const checkPhoneNumber = createCheckFunction(/^1[3-9]{1}[0-9]{9}/);
// 2. 使用生成的函数进行校验
let result = checkPhoneNumber("13845671345");
console.log("checkPhoneNumber: ", result);


// ! 应用场景2
// 结合数组的map函数，获取数组中每个元素的指定属性

const arr = [];
const randomStr = () => (Math.random() * 0.05).toString(36).slice(2);
for(let i = 0; i < 10; i++){
  let obj = {
    age: i + 20,
    txt: randomStr(),
  };
  arr.push(obj);
}

// 一般使用方式
let targetArr = arr.map((item) => item.txt);
console.log("normal map: ", targetArr);


// 应用函数柯里化
// 1. 利用柯里化，创建用于获取指定属性值的函数
function getValue(key, obj){
  return obj[key];
}

let prop = curry(getValue);
// 2. 使用柯里化处理后的函数获取指定key
let targetArray = arr.map(prop("txt"));
console.log("curry map: ", targetArray);