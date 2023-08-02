import { reactive } from './reactive/index.js';
import { effect } from './effect/index.js';

const reactiveInput: HTMLInputElement = document.querySelector("#reactiveInput") as HTMLInputElement;
const effectInput: HTMLInputElement = document.querySelector("#effectInput") as HTMLInputElement;

interface Data{
  val: string | number;
}

const data: Data = reactive({
  val: "",
});

reactiveInput.addEventListener("change", onValChange);

function onValChange(this: any){
  data.val = this.value;
  console.log("[onValChange] ===> ", data.val);
}


function effectVal(){
  effectInput.value = `${data.val}`;
}

effect(effectVal);