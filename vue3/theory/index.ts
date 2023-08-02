import { reactive } from './reactive/index.js';
import { ref } from './ref/index.js';
import { effect } from './effect/index.js';

const reactiveInput: HTMLInputElement = document.querySelector("#reactiveInput") as HTMLInputElement;
const effectInput: HTMLInputElement = document.querySelector("#effectInput") as HTMLInputElement;
const refInput: HTMLInputElement = document.querySelector("#refInput") as HTMLInputElement;

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