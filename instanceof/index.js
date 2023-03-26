// 实现 instanceOf 函数
// 思路：假设需要确定 item 是否是 target 的实例，则遍历 item 的原型链，寻找与 target.prototype 相等的原型。
function _instanceOf(item, target){
  let res = false;
  const targetPrototype = target.prototype;
  while(true){
    const prototype = Object.getPrototypeOf(item);
    if(!prototype) break;
    if(prototype === targetPrototype){
      res = true;
      break;
    }
    item = prototype;
  }
  return res;
}

class Person{
  constructor(age){
    this.age = age;
  }
}

let p1 = new Person(10);
console.log(_instanceOf(p1, Person));
console.log(_instanceOf({}, Person));