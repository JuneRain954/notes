import { reactive } from './reactive/index.js';
import { ref } from './ref/index.js';
import { effect } from './effect/index.js';
import { computed } from './computed/index.js';

const reactiveInput: HTMLInputElement = document.querySelector("#reactiveInput") as HTMLInputElement;
const effectInput: HTMLInputElement = document.querySelector("#effectInput") as HTMLInputElement;
const refInput: HTMLInputElement = document.querySelector("#refInput") as HTMLInputElement;
const leftValInput: HTMLInputElement = document.querySelector("#leftVal") as HTMLInputElement;
const rightValInput: HTMLInputElement = document.querySelector("#rightVal") as HTMLInputElement;
const descElement: HTMLElement = document.querySelector("#computedDesc") as HTMLElement;

interface WithDesc{
  _desc: any;
}

interface Data{
  val: string | number;
}

const data: Data = reactive({
  val: "",
});
const test = ref("");

reactiveInput.addEventListener("change", onValChange);

function onValChange(this: any){
  data.val = this.value;
  test.value = this.value;
  console.log("[onValChange] ===> ", data.val);
}


function effectVal(){
  effectInput.value = `${data.val}`;
  refInput.value = test.value;  
}

effect(effectVal);

const leftVal = reactive<{count: number}>({
  count: 0,
});
const rightVal = ref(0);
const desc = computed(() => `${leftVal.count} + ${rightVal.value} = ${leftVal.count + rightVal.value}`);
(window as unknown as WithDesc)._desc = desc;

leftValInput.addEventListener("input", function(){
  leftVal.count = +this.value;
  descElement.textContent = desc.value;
})
rightValInput.addEventListener("input", function(){
  rightVal.value = +this.value;
  descElement.textContent = desc.value;
})
