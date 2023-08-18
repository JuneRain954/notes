/**
 * 手写 apply
 */
Function.prototype._apply = function (ctx, params = []) {
	// 1. 创建上下文
	const targetCtx = (ctx === undefined || ctx === null) ? window : Object(ctx);
	// 2. 把函数作为上下文的属性
	const key = Symbol();
	targetCtx[key] = this;
	// 3. 执行函数获取结果
	const res = targetCtx[key](...params);
	Reflect.deleteProperty(targetCtx, key);
	// 4. 返回结果
	return res;
};


function testApply(x, y) {
	console.log("[testApply] ==> ", this);
	return x + y;
}

let applyObj = { desc: "apply" };
console.log(testApply._apply());
console.log(testApply._apply(null));
console.log(testApply._apply(undefined));
console.log(testApply._apply(111));
console.log(testApply._apply(true));
console.log(testApply._apply("xxx"));
console.log(testApply._apply(applyObj, [1, 2]));
