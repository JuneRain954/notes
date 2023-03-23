// 请求后端服务器资源

const CACHE_METHOD = {
  "STRONG": 0,
  "NEGOTIATE": 1,
}

const EVENT = {
  CLICK: "click",
}


class Http{
  url = undefined;
  http = undefined;
  btnStrongCache = undefined;
  content = undefined;
  constructor(url){
    this.url = url;
    this.init();
  }

  init(){
    this.getElemt();
    this.initHttp();
    this.getData();
  }

  getElemt(){
    this.btnStrongCache = this.getDom(".strong-cache");
    this.btnNegotiateCache = this.getDom(".negotiate-cache");
    this.content = this.getDom(".content");
    this.btnStrongCache.addEventListener(EVENT.CLICK, this.getData.bind(this, CACHE_METHOD.STRONG));
    this.btnNegotiateCache.addEventListener(EVENT.CLICK, this.getData.bind(this, CACHE_METHOD.NEGOTIATE));
  }

  initHttp(){
    this.http = new XMLHttpRequest();
  }

  getData(cacheType = CACHE_METHOD.NEGOTIATE){
    const url = this.url[cacheType];
    this.http.open("get", url);
    // this.http.setHeader(); // POST 请求才需要设置header
    this.http.onreadystatechange = this.onreadystatechange.bind(this);
    this.http.send();
  }

  getDom(selector){
    return document.querySelector(selector);
  }

  onreadystatechange(){
    if(this.http.readyState === 4){
      const { msg, code, data } = JSON.parse(this.http.response);
      console.log("[getData] response: ", this.http, JSON.parse(this.http.response));
      this.updateContent(data);
    }
  }

  updateContent(data){
    this.content.innerHTML = data;
  }
}


const URL = {
  [CACHE_METHOD.STRONG]: "http://localhost:3000/api/getDataByStrongCache",
  [CACHE_METHOD.NEGOTIATE]: "http://localhost:3000/api/getDataByNegotiateCache",
};
const http = new Http(URL);