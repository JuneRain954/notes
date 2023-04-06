/**
 * postMessage API使用注意事项：
 *  1. 接收消息：各自页面内使用 window 监听 message 事件即可
 *  2. 发送消息：两个不同的页面需要使用同一个 window 窗口, 如：
 *        当前页面是被 window.opener 使用 window.open 打开的，所以可以指定 window.opener
 *    为发送消息的窗口。
 *        对端接收到本端发送的消息 event 后，需要使用 evevt.source 作为指定窗口来发送消息，
 *    不能直接 window.postMessage 来发送消息，否则报错
 */

const NULL_OR_UNDEFINED = Symbol("null_or_undefined");

const EVENT_MAP = {
  CLICK: "click",
  MESSAGE: "message",
}

class Handler{
  url = undefined;          // 目标窗口地址
  btnSend = undefined;      // 发送按钮
  btnRandomTxt = undefined; // 生成随机字符串按钮
  textAreaElemt = undefined;// 输入框
  targetWindow = undefined; // 目标窗口
  msgListElemt = undefined; // 展示消息的包裹元素
  constructor(url){
    this.url = url;
    this.targetWindow = window.opener; // 该页面是通过 window.open 被打开的, 故 window.opener 为目标窗口
    this.init();
  }

  init(){
    this.initElement();
    this.bindEvent();
    this.notify();
  }

  initElement(){
    this.btnSend = this.getElement(".btn.send");
    this.btnRandomTxt = this.getElement(".btn.random-txt");
    this.textAreaElemt = this.getElement("#msg");
    this.msgListElemt = this.getElement(".msg-list");
  }

  bindEvent(){
    this.btnSend.addEventListener(EVENT_MAP.CLICK, this.handleBtnSendClick.bind(this));
    this.btnRandomTxt.addEventListener(EVENT_MAP.CLICK, this.handleBtnRandomTxtClick.bind(this));
    // 监听 message 事件，获取对端发送的消息
    window.addEventListener(EVENT_MAP.MESSAGE, this.handleReceiveMessage.bind(this));
  }

  notify(){
    // 给对端发送一次消息，让对端获取到自己
    this.sendMsg("establish");
  }

  handleBtnSendClick(){
    this.sendMsg();
  }

  handleBtnRandomTxtClick(){
    this.textAreaElemt.value = this.createRandomText();
  }

  handleReceiveMessage(evt){
    console.log("[page2] handleReceiveMessage", evt);
    this.handleAddMsg(evt.data);
  }

  handleAddMsg(...args){
    let fragment = document.createDocumentFragment();
    args.forEach(msg => fragment.append( this.createMsg(msg) ));
    this.msgListElemt.insertBefore(fragment, null);
  }

  createMsg(txt){
    let li = document.createElement("li");
    li.append( this.createTextNode(txt) )
    return li;
  }

  createTextNode(txt){
    return document.createTextNode(txt);
  }

  // 给对端发送消息
  sendMsg(msg){
    msg = isNullOrUndefined(msg) ? this.textAreaElemt.value : msg;
    this.targetWindow.postMessage(msg, this.url);
  }

  createRandomText(){
    return (Math.random() * 0.001).toString(36).slice(2);
  }

  getElement(selector){
    return document.querySelector(selector);
  }
}


function isNullOrUndefined(data){
  return (data ?? NULL_OR_UNDEFINED) === NULL_OR_UNDEFINED;
}

// live server 服务使用的端口号
const port = 5502;
// 对端地址
const targetOrigin = `http://127.0.0.1:${port}`;
let handler = new Handler(targetOrigin);
