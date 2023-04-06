/**
 * postMessage使用注意事项：
 *    1. 接收消息：各自页面内使用 window 监听 message 事件即可
 *    2. 发送消息：两个不同的页面需要使用同一个窗口来发送消息，如：
 *           当前页面使用 window.open 打开目标窗口, 需要等目标窗口发送消息 event 过来,
 *        然后把 event.source 保存起来, 供发送消息使用。不能直接使用 window.postMessage
 *        发送消息。
 */

const EVENT_MAP = {  
  MESSAGE: "message",
  CLICK: "click",
};


class Handler{
  url = undefined;          // 目标窗口地址
  btnOpen = undefined;      // 按钮-打开目标窗口
  btnSend = undefined;      // 按钮-发送消息
  btnRandomTxt = undefined; // 按钮-生成随机字符串
  textAreaElemt = undefined;// 输入框
  targetWindow = undefined; // 目标窗口
  isOpen = false;           // 是否已打开目标窗口
  msgListElemt = undefined; // 展示消息的容器元素
  constructor(url){
    this.url = url;
    this.init();
  }

  init(){
    this.initElement();
    this.bindEvent();
  }

  initElement(){
    this.btnOpen = this.getElement(".btn.open");
    this.btnSend = this.getElement(".btn.send");
    this.btnRandomTxt = this.getElement(".btn.random-txt");
    this.textAreaElemt = this.getElement("#msg");
    this.msgListElemt = this.getElement(".msg-list");
  }

  bindEvent(){
    this.btnOpen.addEventListener(EVENT_MAP.CLICK, this.handleBtnOpenClick.bind(this));
    this.btnSend.addEventListener(EVENT_MAP.CLICK, this.handleBtnSendClick.bind(this));
    this.btnRandomTxt.addEventListener(EVENT_MAP.CLICK, this.handleBtnRandomTxtClick.bind(this));
    // 监听 message 事件，获取对端发送过来的消息
    window.addEventListener(EVENT_MAP.MESSAGE, this.handleReceiveMessage.bind(this));
  }

  handleAddMsg(...args){
    let fragment = document.createDocumentFragment();
    args.forEach(item => fragment.append( this.createMsg(item) ));
    this.msgListElemt.insertBefore(fragment, null);
  }

  createMsg(txt){
    let li = document.createElement("li");
    li.append( this.createTextElement(txt) );
    return li;
  }

  createTextElement(txt){
    return document.createTextNode(txt);
  }

  handleBtnOpenClick(evt){
    if(!this.isOpen){
      window.open(this.url);
      this.isOpen = true;
    }
  }

  handleBtnSendClick(){
    this.sendMsg();
  }

  sendMsg(){
    if(this.targetWindow){
      this.targetWindow.postMessage(this.textAreaElemt.value, this.url);
    }
  }

  handleBtnRandomTxtClick(){
    this.textAreaElemt.value = this.createRandomTxt();
  }

  handleReceiveMessage(evt){
    console.log("[page1] handleReceiveMessage: ", evt);
    // 保存对端窗口实例, 供发送消息时使用
    if(!this.targetWindow) this.targetWindow = evt.source;
    this.handleAddMsg(evt.data);
  }

  createRandomTxt(){
    return (Math.random() * 0.001).toString(36).slice(2);
  }

  getElement(selector){
    return document.querySelector(selector);
  }
}

// back_end 目录下 app.js 里指定的端口号
const port = 3000;
// 对端窗口地址
const targetWindowURL = `http://127.0.0.1:${port}/`;
let handler = new Handler(targetWindowURL)
