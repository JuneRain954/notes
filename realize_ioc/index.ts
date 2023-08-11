/**
 * http服务
 */
import "reflect-metadata";
import * as http from 'http';
import routeInfo from './api';



http.createServer((req, res) => {
  console.log("[server] url: ", req.url);
  // 每次请求的处理
  routeInfo.forEach((info) => {
    const { reqMethod, url, rawMethod } = info;
    if(req.url === url && req.method === reqMethod){
      res.end(JSON.stringify(rawMethod()));
    }
  })
})
.listen(3399)
.on("listening", () => {
  console.log("[server] running...", routeInfo);
})
