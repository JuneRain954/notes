const express = require("express");
const router = express.Router();
const { randomStr, readFile, statFile } = require("../lib/index");

/** 协商缓存
 * Etag -- If-None-Match
 * Last-Modified -- If-Modified-Since
 */
router.get("/getDataByNegotiateCache", (req, res, next) => {
  const { method, baseUrl, route } = req;
  const ifModifiedSince = req.headers["if-modified-since"];
  const fileInfo = statFile();
  console.log(`[negotiateCache] ${method}--${baseUrl}--${route.path}`);
  const lastModified = fileInfo.mtime.toUTCString();
  if(ifModifiedSince === lastModified){
    console.log("not modified");
    res.status(304).send();
  }else{
    console.log("last modified");
    const resData = {
      msg: "success",
      code: 200,
      data: "negotiate cache: " + readFile(),
    };
    res.setHeader("Last-Modified", lastModified);
    res.status(200).send(JSON.stringify(resData));
  }
})



module.exports = router;