// 前端路由实现 -- history 模式
/** 实现思路：
 *      包装 history 对象的 pushState 和 replaceState 方法，使得更新网页 url 时触发自定义的事件，从而显示相应组件
 *  特点：
 *    1. 没有 hash 模式时的 # 符号
 *    2. 刷新后会丢失页面，所以需要后端的配合，当前路径找不到访问资源时默认返回主页
 */
// ! 注意：该例子需要在服务器上运行，本地运行时， 使用 history.pushState 方法会报错：
// !  Uncaught TypeError: Illegal invocation

// 事件字面量
const EVENT_MAP = {
  LOAD: "load",
  PUSH_STATE:  "pushState",
  REPLACE_STATE:  "replaceState",
  CLICK:  "click",
}

// 路由字面量
const ROUTE_MAP = {
  HOME: "/",
}

class VueRouter{
  routes = [];
  contentElemt = undefined;
  constructor(routes){
    this.routes = routes;
    this.init();
  }

  // 初始化
  init(){
    this.wrapHistoryFunction();
    this.bindEvent();
    this.getContentElement();
  }

  // 获取内容区域的元素
  getContentElement(){
    this.contentElemt = this.getElement("#history-content");
  }

  // 包装history对象的部分函数
  wrapHistoryFunction(){
    const { PUSH_STATE, REPLACE_STATE } = EVENT_MAP;
    this.wrapFunction(PUSH_STATE);
    this.wrapFunction(REPLACE_STATE);
  }

  // 包装state函数
  wrapFunction(type){
    const rawMethod = history[type];
    history[type] =  function(...args){
      rawMethod.call(this, ...args);
      // 创建自定义事情，并手动触发
      const evt = new Event(type);
      evt.arguments = arguments;
      window.dispatchEvent(evt);
    }
  }

  // 绑定监听事件
  bindEvent(){
    const { LOAD, PUSH_STATE, REPLACE_STATE } = EVENT_MAP;
    window.addEventListener(LOAD, this.refresh.bind(this));
    window.addEventListener(PUSH_STATE, this.refresh.bind(this));
    window.addEventListener(REPLACE_STATE, this.refresh.bind(this));
    this.bindBtnEvent();
  }

  // 绑定菜单按钮的点击事件
  bindBtnEvent(){
    const baseClassName = "route-item";
    this.routes.forEach((component, index) => {
      const { name, path } = component;
      const btn = this.getElement(`.${baseClassName}.${name.toLowerCase()}`);
      this.addEventListener(btn, EVENT_MAP.CLICK, this.handleBtnClick.bind(this, {path, index}));
    })
  }

  // 获取元素
  getElement(selector){
    return document.querySelector(selector);
  }

  // 绑定事件
  addEventListener(target = window, eventType, fn){
    target.addEventListener(eventType, fn.bind(fn));
  }

  // 按钮点击事件
  handleBtnClick({path, index}){
    const { PUSH_STATE } = EVENT_MAP;
    history[PUSH_STATE]({state: index}, null, path);
  }

  // 监听路由更新
  refresh(evt){
    const args = evt.arguments ? Array.from(evt.arguments) : [];
    const routeURL = args[2];
    this.switchToComponent(routeURL);
  }

  // 切换到指定路由对应的组件
  switchToComponent(url){
    const component = this.matchComponent(url);
    if(component){
      this.contentElemt.innerHTML = component.component;
    }else{
      this.switchToComponent(ROUTE_MAP.HOME);
    }
  }

  // 获取指定路由对应的组件
  matchComponent(url){
    return this.routes.find(component => component.path === url);
  }
  
}


const router = new VueRouter([
  {
    path: "/",
    name: "Home",
    component: "<div>Home</div>",
  },
  {
    path: "/mine",
    name: "Mine",
    component: "<div>Mine</div>",
  },
  {
    path: "/market",
    name: "Market",
    component: "<div>Market</div>",
  },
])