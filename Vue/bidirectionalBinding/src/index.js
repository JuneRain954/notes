import { MVVM } from './core/index.js';


const vm = new MVVM({
  el: "#app",
  data: {
    title: "hello world",
  },
  methods: {
    handleBtnClick(){
      this.title = "hello world";
    }
  }
});

console.log("[index.js] MVVM: ", vm);