const express = require("express");
const path = require("path");
const app = express();

// 设置静态目录
app.use(express.static(path.join(__dirname, "../page2")));

// 处理根路径请求
app.get("/", (req, res) => {
  res.sendFile(patn.join(__dirname, "../page2/index.html"));
})


// 监听端口
const port = 3000;
app.listen(port, () => {
  console.log(`listen: ${port}`);
})