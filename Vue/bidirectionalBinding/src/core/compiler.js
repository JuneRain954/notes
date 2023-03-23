// 解析 dom 元素，并实现更新

import { Watcher } from "./watcher.js";

const NODE_TYPE_MAP = {
  ELEMENT_NODE: 1,
  TEXT_NODE: 3,
};

const NODE_COMPILE_MAP = {
  [NODE_TYPE_MAP.ELEMENT_NODE]: function(node){
    this.compileElement(node);
  },
  [NODE_TYPE_MAP.TEXT_NODE]: function(node){
    this.compileText(node);
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
      this.parseElement(this.el);
    }else{
      throw new Error("Invaild parameter el");
    }
  }

  parseElement(el){
    const childNodes = el.childNodes;
    const len = childNodes.length;
    for(let i = 0; i < len; i++){
      const node = childNodes[i];
      let compolier = NODE_COMPILE_MAP[node.nodeType];
      compolier && compolier.call(this, node);
      const nodeList = node.childNodes;
      if(nodeList && nodeList.length) this.parseElement(node);
    }
  }

  compileText(node){
    const reg = /\{\{(.*)+\}\}/;
    const parseRes = reg.exec(node.nodeValue);
    const key = (parseRes && parseRes[1]) ? parseRes[1].trim() : "";
    if(!key) return;
    let pattern = node.nodeValue;
    this.updateText(node, pattern, key);
    // 监听数据更新，实现数据更新(Data) => 试图更新(View)
    new Watcher(this.vm, key, this.updateText.bind(this, node, pattern, key));
  }

  compileElement(node){
    const attrs = node.attributes;
    const len = attrs.length;
    for(let i = 0; i < len; i++){
      const { name, value } = attrs[i];
      // 处理事件类型指令 or model指令
      this.handleDirective(node, name, value);
    }
  }

  updateText(node, pattern, key){
    const reg = /\{\{(.*)+\}\}/;
    const value = this.vm[key];
    node.nodeValue = pattern.replace(reg, (_, match) => value);
  }

  handleDirective(node, directive, expression){
    if(directive.indexOf("v-") === -1) return;
    const regIsOn = /v\-on:(.*)+/;
    const regIsModel = /v\-model/;
    let result = regIsOn.exec(directive);
    if(result){
      // 处理事件类型指令
      const evtName = result[1].trim();
      const method = this.vm.methods[expression];
      node.addEventListener(evtName, method.bind(this.vm));
    }else{
      // 处理model指令
      result = regIsModel.exec(directive);
      if(result){
        const val = this.vm[expression];
        this.updateModel(node, expression, val);
        // 监听元素 input 事件，相应更新数据 View => Data
        node.addEventListener(EVENT_TYPE_MAP.INPUT, this.updateModel.bind(this, node, expression));
        // 监听数据更新，并相应更新视图 Data => View
        new Watcher(this.vm, expression, () => {
          this.updateModel.call(this, node, expression, this.vm[expression]);
        });
      }
    }
  }

  updateModel(node, key, valueOrEvt){
    if(valueOrEvt.target){
      this.vm[key] = valueOrEvt.target.value;
    }else{
      node.value = valueOrEvt;
    }
  }
}