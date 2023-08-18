/**
 * 手写 bind
 */
Function.prototype._bind = function(ctx, ...args){
	// 1. 保存当前函数
	const fn = this;
	// 2. 返回一个函数
	return function F(...params){
		let res;
		// 3. 特殊情况处理
		if(this instanceof F){
			res = new fn(...args, ...params);
		}else{
			// call 函数的实现逻辑
			const targetCtx = (ctx === undefined || ctx === null) ? window : Object(ctx);
			const key = Symbol();
			targetCtx[key] = fn;
			res = targetCtx[key](...args, ...params);
			Reflect.deleteProperty(targetCtx, key)
		}
		// 4. 返回结果
		return res;
	}
}



function testBind(x, y){
	console.log("[testBind] ==> ", this);
	return x + y;
}

let bindObj = { desc: "bind" };
let t1 = testBind._bind();
let t2 = testBind._bind(null);
let t3 = testBind._bind(undefined);
let t4 = testBind._bind(111);
let t5 = testBind._bind(true);
let t6 = testBind._bind("xxx");
let t7 = testBind._bind(bindObj, 1);

console.log(t1());
console.log(t2());
console.log(t3());
console.log(t4());
console.log(t5());
console.log(t6());
console.log(t7(2));

let t8 = testBind._bind();
console.log(new t8());
