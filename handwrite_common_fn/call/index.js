/**
 * 手写 call 函数
 */


Function.prototype._call = function(ctx, ...args){
  // 1. 创建上下文
  const targetCtx = (ctx === undefined || ctx === null) ? window : Object(ctx);
  // 2. 把函数作为上下文的属性
  const key = Symbol();
  targetCtx[key] = this;
  // 3. 执行函数获取结果
  const res = targetCtx[key](...args);
  Reflect.deleteProperty(targetCtx, key);
  // 4. 返回结果
  return res;
}

function testCall(x, y){
  console.log("[testCall] ==> ", this);
  return x + y;
} 

let obj = { a: "call" };
console.log(testCall._call());
console.log(testCall._call(null));
console.log(testCall._call(undefined));
console.log(testCall._call(111));
console.log(testCall._call(true));
console.log(testCall._call("xxx"));
console.log(testCall._call(obj, 5, 2));
