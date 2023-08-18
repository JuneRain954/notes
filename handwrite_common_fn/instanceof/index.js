/**
 * 手写 instanceof 
 */

function _instanceof(item, target){
  try {
    let proto = Reflect.getPrototypeOf(item);
    let res = false;
    while(proto){
      if(proto === target.prototype){
        res = true;
        break;
      }
      proto = Reflect.getPrototypeOf(proto);
    }
    return res;
  } catch (e) {
    // item 是普通类型数据时，获取原型会报错
    return false; 
  }
}

function Person(name){
  this.name = name;
}

let p1 = new Person("xxx");

console.log("[_insctanceof] p1, Person ==> ", _instanceof(p1, Person), p1 instanceof Person);
console.log("[_insctanceof] {}, Person ==> ", _instanceof({}, Person), {} instanceof Person);
console.log("[_insctanceof] {}, Object ==> ", _instanceof({}, Object), {} instanceof Object);
console.log("[_insctanceof] {}, Function ==> ", _instanceof({}, Function), {} instanceof Function);
console.log("[_insctanceof] 1, Object ==> ", _instanceof(1, Object), 1 instanceof Object);
console.log("[_insctanceof] function(){}, Function ==> ", _instanceof(function(){}, Function), function(){} instanceof Function);
