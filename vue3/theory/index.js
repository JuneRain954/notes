import { reactive } from './reactive/index.js';
import { ref } from './ref/index.js';
import { effect } from './effect/index.js';
import { computed } from './computed/index.js';
import { watch } from './watch/index.js';
var reactiveInput = document.querySelector("#reactiveInput");
var effectInput = document.querySelector("#effectInput");
var refInput = document.querySelector("#refInput");
var leftValInput = document.querySelector("#leftVal");
var rightValInput = document.querySelector("#rightVal");
var descElement = document.querySelector("#computedDesc");
var data = reactive({
    val: "",
});
var test = ref("");
reactiveInput.addEventListener("change", onValChange);
function onValChange() {
    data.val = this.value;
    test.value = this.value;
    console.log("[onValChange] ===> ", data.val);
}
function effectVal() {
    effectInput.value = "" + data.val;
    refInput.value = test.value;
}
effect(effectVal);
var leftVal = reactive({
    count: 0,
});
var rightVal = ref(0);
var desc = computed(function () { return leftVal.count + " + " + rightVal.value + " = " + (leftVal.count + rightVal.value); });
window._desc = desc;
leftValInput.addEventListener("input", function () {
    leftVal.count = +this.value;
    descElement.textContent = desc.value;
});
rightValInput.addEventListener("input", function () {
    rightVal.value = +this.value;
    descElement.textContent = desc.value;
});
watch(function () { return data.val; }, function (val, oldVal) {
    console.log("[watch] data.val: ", { val: val, oldVal: oldVal });
}, { immediate: true });
