const express = require("express");
const router = express.Router();
const { randomStr, readFile } = require("../lib/index")


/** 设置强缓存
 * cache-control (优先级更高)
 *    - private: 仅浏览器可缓存
 *    - public: 浏览器以及代理服务器均可缓存
 *    - max-age = xxx: 过期时间/s (相对时间)
 *    - no-cache: 不使用强缓存
 *    - no-store: 不使用缓存(包括强缓存和协商缓存)
 * 
 * expires 过期时间(绝对时间)
 */
router.get("/getDataByStrongCache", function(req, res, next){
  const { method, baseUrl, route } = req;
  console.log(`${method} -- ${baseUrl} -- ${route.path}`);
  const resData = {
    msg: "success",
    code: 200,
    data: `${readFile()}`,
  }
  // 设置强缓存，过期时间为10s
  res.setHeader("cache-control", "max-age=10");
  res.send(resData);
})


module.exports = router;