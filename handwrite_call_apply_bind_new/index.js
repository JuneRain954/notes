import { realize, _new} from './realize.js';

// 实现 call/apply/bind 功能
realize();

// 测试
function test(a, b){
  console.log("[test] ==> ", this, a, b);
  return a + b;
}

let obj = {
  age: 10,
}

// 验证自行实现的 call
console.log(test._call(obj, 1, 2));
// 验证自行实现的 apply
console.log(test._apply(obj, [3, 4]));

// 验证自行实现的 bind
let t = test._bind(obj, 5);
console.log(t(6));    // 以普通的方式调用 (this 指向绑定的 obj)
console.log(new t(7));  // 以 new 的方式调用 (this 指向 new 出来的实例对象)


// 验证 new 功能
function t1(a, b){
  this.a = a;
  this.b = b;
}

function t2(a, b){
  this.a = a;
  this.b = b;
  // return {
  //   txt: "test function",
  // }
  return function f(){
    console.log("????");
  }
}

let res = _new(t1, 1, "hhh");
console.log("[t1] ==> ", res, res.a, res.b);

let ret = _new(t2, 1, "hhh");
console.log("[t2] ==> ", ret);