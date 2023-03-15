// 前端路由实现 -- Hash 模式
/* 实现方式：
 *    通过 hashchange 事情，监听 location.hash 的更新，从而根据路径渲染相应组件
 * 特点：
 * 1. 纯前端实现
 * 2. 刷新后页面不丢失，所以无需后端配合（跟 history 模式的区别）
 * 3. 切换路由后，页面不会刷新，且浏览器不会发送请求
 */

const HOME_URL = "/"; // 默认展示路径

class VueRouter{
  routes = [];
  contentElemt = "";
  constructor(routes){
    this.routes = routes;
    this.init();
  }

  // 初始化
  init(){
    this.bindEvent();
    this.getContentElemt();
    this.bindComponentUrl();
  }
  
  // 监听hash更新
  bindEvent(){
    // 监听页面加载完成
    window.addEventListener("load", this.refresh.bind(this));
    // 监听 hash 更新
    window.addEventListener("hashchange", this.refresh.bind(this));
  }

  // 监听 hash 更新
  refresh(evt){
    const targetURL = this.parseURL(evt.newURL);
    this.switchToComponent(targetURL);
  }

  // 绑定组件的路由
  bindComponentUrl(){
    const baseClassName = "route-item";
    this.routes.forEach(component => {
      const { name, path } = component;
      const className = `.${baseClassName}.${name.toLowerCase()}`;
      const elemt = this.getElement(className);
      elemt.href = `#${path}`;
    })
  }

  // 匹配组件
  matchComponent(url){
    return this.routes.find(compoent => compoent.path === url);
  }
  
  // 切换组件
  switchToComponent(url){
    const component = this.matchComponent(url);
    if(component){
      this.contentElemt.innerHTML = component.component;
    }else{
      // 一般默认展示主页内容 (视具体业务而定)
      this.switchToComponent(HOME_URL);
    }
  }

  // 获取内容区域元素
  getContentElemt(){
    this.contentElemt = this.getElement("#hash-content");
  }

  // 解析路由
  parseURL(pathStr){
    let copyPathStr = `${pathStr}#`;
    const reg = /\#(\/[a-zA-Z]+)#$/;
    let res = copyPathStr.match(reg);
    res = Array.isArray(res) ? res[1] : res;
    return res;
  }

  // 获取dom元素
  getElement(selector){
    return document.querySelector(selector);
  }
}

const router =  new VueRouter([
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