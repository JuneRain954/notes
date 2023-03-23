const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../files/file.txt");

// 往文件里写入内容
function writeTxt(){
  fs.writeFileSync(filePath, randomStr());
}

function statFile(){
  let res = fs.statSync(filePath, {encoding: "utf-8"});
  return res;
}

function readFile(){
  return fs.readFileSync(filePath, {encoding: "utf-8"});
}

// 生成随机字符串
function randomStr(){
  return (Math.random() * 0.05).toString(36).slice(2);
}


module.exports = {
  randomStr,
  writeTxt,
  readFile,
  statFile,
}