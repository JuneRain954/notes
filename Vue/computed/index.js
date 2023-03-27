import { computed } from './computed/index.js';
import { reactive } from './reactive/index.js';

// ===> 测试验证 computed 的功能 <===
let count = 0;
// 创建响应式数据
const user = reactive({ age: 10 });

function update(){
  count++;
  console.log("functon update has been called!!");
  return user.age;
}

// 创建计算属性数据
let computedData = computed(update);


// 验证1: 未访问计算属性数据 computedData.value, 不执行 update 函数
console.log(count); // 0 

// 验证2：访问计算属性数据 computedData.value，执行一遍 update 函数
computedData.value;
console.log(count); // 1;

// 验证3：依赖值 user.age 未发生变更，再次访问计算属性数据 computedData.value, 不执行 update 函数, 而是返回缓存值
computedData.value;
console.log(count); // 1;

// 验证4：依赖值 user.age 更新，未访问计算属性数据 computedData.value, 不执行 update 函数
user.age = 20;
console.log(count); // 1;

// 验证5：依赖值 user.age 更新，并且访问计算属性数据 computedData.value, 执行 update 函数
computedData.value;
console.log(count); // 2;
