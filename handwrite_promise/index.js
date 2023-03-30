import { MyPromise } from './myPromise.js';

// 测试1
/* let p = new MyPromise((resolve, reject) => {
  resolve("this is resolve return");
  reject("this is reject return");
})

p.then((result) => {
  console.log(result);
}, (reason) => {
  console.log(reason);
})
console.log("[MyPromise] p: ", p); */


// 测试2
/* let p2 = new MyPromise((resolve, reject) => {
  throw new Error("this is an error");
})

p2.then((res) => console.log("[p2] resolve: ", res), (err) => console.log("[p2] rejected: ", err)); */

// 测试3
/* let p3 = new MyPromise((resolve, reject) => {
  resolve("这是reslove的返回值");
})

p3.then(null, (err) => console.log("[err] ===> ", err)); */

// 测试4
/* console.log(1);
let p4 = new MyPromise((resolve, reject) => {
  console.log(2);
  // resolve("这是resolve的返回值");
  reject("这是 reject 的返回值");
});

p4.then((res) => {
  console.log("fulfilled", res);
}, (err) => {
  console.log("rejected", err);
})

console.log(3); */

// 测试5
/* console.log(1);
let p5 = new MyPromise((resolve, reject) => {
  console.log(2);
  setTimeout(() => {
    console.log("A", p5.PromiseState);
    resolve("这是resolve函数的返回值");
    console.log("B", p5.PromiseState);
    console.log(4);
  })
})

p5.then((res) => {
  console.log("C", p5.PromiseState);
  console.log("fullfiled", res);
}) 

console.log(3); */

// 测试6
/* let p6 = new MyPromise((resolve, reject) => {
  setTimeout(resolve.bind(null, "这是resolve的返回值"), 0)
});

p6.then(res => {
  console.log("[p6] ==> ", res);
});

p6.then(res => {
  console.log("[p6] ==> ", res);
});

p6.then(res => {
  console.log("[p6] ==> ", res);
});

p6.then(res => {
  console.log("[p6] ==> ", res);
}); */

// 测试7
let p7 = new MyPromise((resolve, reject) => {
  resolve(10)
});

p7.then((res) => {
  console.log("[p7] fulfilled: ", res);
  return 2 * res;
}).then((res) => {
  console.log("[p7] fulfilled: ", res);
})

// 测试8
let p8 = new MyPromise((resolve, reject) => {
  throw new Error("这是抛出的错误")
})

p8.catch((err) => {
  console.log("[p8] => ", err);
})

// 测试9
/* let p9 = new MyPromise((resolve, reject) => {
  resolve("这是resolve返回值")
})

p9.then((res) => {
  throw new Error("这是 then 里的报错")
}).catch((err) => {
  console.log("[p9] catch ===> ", err);
}) */