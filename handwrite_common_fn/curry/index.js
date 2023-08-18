/**
 * 函数柯里化
 */

/**
 * 函数柯里化
 * @param {Function} fn 目标函数
 * @param {Number} len 形参个数
 * @param  {...any} args 参数
 * @returns 柯里化后的函数
 */
function curry(fn, len = fn.length, ...args){
  return function(...params){
    const allParams = [...args, ...params];
    return (allParams.length >= len) ? fn.call(this, ...allParams) : curry(fn, len, ...allParams);
  }
}


function add(a, b, c, d, e){
  return a + b + c + d + e;
}

const test = curry(add);
console.log("test(1, 2) ===> ", test(1, 2));
console.log("test(1, 2, 3, 4, 5, 6) ===> ", test(1, 2, 3, 4, 5, 6));
console.log("test(1, 2, 3, 4, 5) ===> ", test(1, 2, 3, 4, 5));
console.log("test(1, 2)(3, 4, 5) ===> ", test(1, 2)(3, 4, 5));
console.log("test(1, 2, 3)(4, 5) ==> ", test(1, 2, 3)(4, 5));
console.log("test(1)(2)(3)(4)(5) ===> ", test(1)(2)(3)(4)(5));