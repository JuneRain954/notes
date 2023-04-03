const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router");

const port = 3000;

app.use(cors());
app.use("/api", router);

app.listen(port, () => {
  console.log(`listening port: ${port}`);
})
