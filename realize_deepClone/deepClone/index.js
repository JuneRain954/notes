/**
 * 深拷贝
 */
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _a;
import { JS_DATA_TYPE } from '../utils/const/index.js';
import { getType, isInstanceOf } from '../utils/tools/index.js';
var globalMap = new WeakMap();
// 拷贝函数处理器
var COPIER_HANDLER = (_a = {},
    _a[JS_DATA_TYPE.OBJECT] = objectCopier,
    _a[JS_DATA_TYPE.ARRAY] = arrayCopier,
    _a[JS_DATA_TYPE.MAP] = mapCopier,
    _a[JS_DATA_TYPE.SET] = setCopier,
    _a[JS_DATA_TYPE.FUNCTION] = functionCopier,
    _a[JS_DATA_TYPE.DATE] = dateCopier,
    _a[JS_DATA_TYPE.REGEXP] = regExpCopier,
    _a);
/**
 * 深拷贝
 * @param data 被拷贝的数据
 * @returns 拷贝数据
 */
export function deepClone(data) {
    var _a;
    // 普通类型数据则直接返回
    if (!isInstanceOf(data, Object))
        return data;
    // 循环引用处理
    if (globalMap.has(data))
        return globalMap.get(data);
    // 1. 创建对应类型的空白数据
    var clone = getRelativeEmptyData(data);
    globalMap.set(data, clone);
    // 2. 复制
    var copierHandler = (_a = COPIER_HANDLER[getType(data)]) !== null && _a !== void 0 ? _a : function () { return data; };
    clone = copierHandler(clone, data);
    // 3. 返回
    return clone;
}
/**
 * 获取对应类型的空白数据
 * @param data 被克隆的数据
 * @returns 对应类型的空白数据
 */
function getRelativeEmptyData(data) {
    var Ctor = data.constructor;
    return new Ctor();
}
/**
 * 对象拷贝
 * @param clone 拷贝对象
 * @param data 被拷贝的对象
 * @returns 拷贝对象
 */
function objectCopier(clone, data) {
    Object.keys(data).forEach(function (key) { return (clone[key] = deepClone(data[key])); });
    return clone;
}
/**
 * 数组拷贝
 * @param clone 拷贝数组
 * @param data 被拷贝的数组
 * @returns 拷贝数组
 */
function arrayCopier(clone, data) {
    data.forEach(function (item) { return clone.push(deepClone(item)); });
    return clone;
}
/**
 * 映射数据拷贝
 * @param clone 拷贝映射数据
 * @param data 被拷贝的映射数据
 * @returns 拷贝映射数据
 */
function mapCopier(clone, data) {
    data.forEach(function (val, key) { return clone.set(key, deepClone(val)); });
    return clone;
}
/**
 * 集合数据拷贝
 * @param clone 拷贝集合数据
 * @param data 被拷贝的集合数据
 * @returns 拷贝集合数据
 */
function setCopier(clone, data) {
    data.forEach(function (val) { return clone.add(deepClone(val)); });
    return clone;
}
/**
 * 函数拷贝
 * @param clone 拷贝函数
 * @param data 被拷贝的函数
 * @returns 拷贝函数
 */
function functionCopier(clone, data) {
    clone = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return data.call.apply(data, __spreadArrays([this], args));
    };
    return clone;
}
/**
 * 日期数据拷贝
 * @param colne 拷贝日期数据
 * @param data 被拷贝的日期数据
 * @returns 拷贝日期数据
 */
function dateCopier(colne, data) {
    colne = new Date(data);
    return colne;
}
/**
 * 正则拷贝
 * @param clone 拷贝正则
 * @param data 被拷贝的正则
 * @returns 拷贝正则
 */
function regExpCopier(clone, data) {
    clone = new RegExp(data.source, data.flags);
    return clone;
}
