// 路由
const path = require("path");
const express = require("express");
const router = express.Router();
const multer = require("multer");

// 设置文件保存的相关配置
const storage = multer.diskStorage({
  // 设置图片保存路径
  destination: function(req, file, cb){
    cb(null, path.resolve(__dirname, "../uploads"));
  },
  // 设置图片名称
  filename: function(req, file, cb){
    console.log("[filename]",  file);
    const fileName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  }
})

// 创建中间件
let upload = multer({ storage: storage, limits: 1024 * 1024 * 100 });


router.post("/uploadImg", upload.single("file"), (req, res) => {
  const { method, route } = req;
  console.log(`${method} -- ${route.path}`, req.file);
  
  res.json(res.file);
})

module.exports = router;