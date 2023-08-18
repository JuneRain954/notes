/**
 * 手写 new
 */

function _new(fn, ...args){
  // 1. 创建空对象并绑定原型
  const obj = Object.create(fn.prototype);
  // 2. 以空对象为上下文执行构造函数
  const res = fn.call(obj, ...args);
  // 3. 返回结果
  return (res instanceof Object) ? res : obj;
}

function Person(name, age){
  this.name = name;
  this.age = age;
}

Person.prototype.getName = function(){
  return this.name;
}

const o1 = _new(Person, "xxx", 33);
console.log("[_new] ==> ", o1, o1.name, o1.age, o1.getName()); 


function Cat(desc){
  this.desc = desc;
  return 111; 
}

function Dog(desc){
  this.desc = desc;
  return true; 
}

function Mouse(desc){
  this.desc = desc;
  return "xxx"; 
}

function Box(desc){
  this.desc = desc;
  return { a: 1 };
}

function Phone(desc){
  this.desc = desc;
  return function(){};
}

console.log("[Cat] ==> ", new Cat("car"));
console.log("[Dog] ==> ", new Dog("dog"));
console.log("[Mouse] ==> ", new Mouse("mouse"));
console.log("[Box] ==> ", new Box("box"));
console.log("[Phone] ==> ", new Phone("phone"));