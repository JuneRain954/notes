import { reactive } from './reactive/index.js';
import { ref } from './ref/index.js';
import { effect } from './effect/index.js';
var reactiveInput = document.querySelector("#reactiveInput");
var effectInput = document.querySelector("#effectInput");
var refInput = document.querySelector("#refInput");
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
