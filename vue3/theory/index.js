import { reactive } from './reactive/index.js';
import { effect } from './effect/index.js';
var reactiveInput = document.querySelector("#reactiveInput");
var effectInput = document.querySelector("#effectInput");
var data = reactive({
    val: "",
});
reactiveInput.addEventListener("change", onValChange);
function onValChange() {
    data.val = this.value;
    console.log("[onValChange] ===> ", data.val);
}
function effectVal() {
    effectInput.value = "" + data.val;
}
effect(effectVal);
