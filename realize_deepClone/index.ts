import { deepClone } from './deepClone/index.js';


const testData = {
  // String
  field_1: "",
  field_2: "test test",
  // Number
  field_3: 1,
  field_4: -1,
  field_5: 0,
  // Boolean
  field_6: false,
  field_7: true,
  // null
  field_8: null,
  // undefined
  field_9: undefined,
  // Symbol
  field_10: Symbol(""),
  field_11: Symbol("1111"),
  // Object
  field_12: {a: 1, b: 2},
  field_13: {a: 1, b: 2, c: {c1: 3, c2: 4, c3: {}}, d: [1, 2, "", true, false]},
  // Array
  field_14: [1, 2, "", true, false],
  field_15: [[1, 2], {a: 1, b: 2}],
  // Map
  field_16: new Map([
    ["a", 1],
    ["b", 2],
    ["c", 5],
  ]),
  // Set
  field_17: new Set([1, 2, 3, "", true, false, ["a", "b", "c"], {a: 1, b: 2}]),
  // Function
  field_18: function(x: number, y: number): number{
    return x + y;
  },
  field_19: (txt: any) => console.log("[field_19] ===> ", txt),
  // Date
  field_20: new Date(),
  field_21: Date.now(),
  // RegExp
  field_22: /^a.*b$/ig,
  field_23: new RegExp("^b.*c$", "ig"),
};

// 循环引用
testData.field_13.c.c3 = testData.field_13.c;

// 验证
const cloneData = deepClone(testData)
console.log({testData, cloneData, result: cloneData === testData});
(window as unknown as any).cloneData = cloneData;
(window as unknown as any).testData = testData;