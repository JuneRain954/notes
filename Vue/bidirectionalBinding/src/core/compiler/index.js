// 解析 dom 元素，并实现更新

import { Watcher } from "../watcher/index.js";

const NODE_TYPE_MAP = {
  ELEMENT_NODE: 1,
  TEXT_NODE: 3,
};

const NODE_COMPILE_MAP = {
  [NODE_TYPE_MAP.ELEMENT_NODE]: function(node){
    this.compileElementNode(node);
  },
  [NODE_TYPE_MAP.TEXT_NODE]: function(node){
    this.compileTextNode(node);
  },
}

const EVENT_TYPE_MAP = {
  INPUT: "input",
}


export class Compolier{
  el = undefined;
  vm = undefined;
  constructor(el, vm){
    this.el = document.querySelector(el);
    this.vm = vm;
    this.init();
  }

  init(){
    if(this.el){
      // 解析元素
      this.parseElement();
    }else{
      throw new Error("Invaild parameter el");
    }
  }

  parseElement(el = this.el){
    const childNodes = el.childNodes;
    const len = childNodes.length;
    for(let i = 0; i < len; i++){
      const node = childNodes[i];
      let compolier = NODE_COMPILE_MAP[node.nodeType];
      compolier && compolier.call(this, node);
      if(node.childNodes?.length) this.parseElement(node);
    }
  }

  compileTextNode(node){
    const reg = /\{\{(.*)+\}\}/;
    const res = reg.exec(node.textContent);
    if(!res) return;
    const pattern = node.textContent;
    const fullMatch = res[0];
    const key = res[1].trim();
    this.updateText(node, pattern, fullMatch, this.vm[key]);
    // 监听数据更新，实现数据更新(Data) => 试图更新(View)
    new Watcher(this.vm, key, (val) => {
      this.updateText(node, pattern, fullMatch, val);
    });
  }

  compileElementNode(node){
    const attrs = node.attributes;
    const len = attrs.length;
    for(let i = 0; i < len; i++){
      const { name, value } = attrs[i];
      // 处理事件类型指令 or model指令
      this.handleDirective(node, name, value);
    }
  }

  updateText(node, pattern, replaceStr, value){
    node.textContent = pattern.replaceAll(replaceStr, value);
  }

  handleDirective(node, directive, expression){
    if(directive.indexOf("v-") === -1) return;
    const isOn = /v\-on:(.*)+/;
    let result = isOn.exec(directive);
    if(result){
      // 处理事件类型指令
      const evtName = result[1].trim();
      const method = this.vm.methods[expression];
      node.addEventListener(evtName, method.bind(this.vm));
    }else{
      // 处理model指令
      const isModel = /v\-model/;
      result = isModel.exec(directive);
      if(result){
        const val = this.vm[expression];
        this.updateModel(node, val);
        // 监听元素 input 事件，相应更新数据 View => Data
        node.addEventListener(EVENT_TYPE_MAP.INPUT, (evt) => {
          const value = evt.target.value;
          this.vm[expression] = value;
        });
        // 监听数据更新，并相应更新视图 Data => View
        new Watcher(this.vm, expression, (val) => {
          this.updateModel.call(this, node, val);
        });
      }
    }
  }

  updateModel(node, value){
    if(node.value === value) return;
    node.value = value;
  }
}