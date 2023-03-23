const cors = require("cors");
const express = require("express");
const routerStrongCache = require("./router/strongCache");
const routerNegotiateCache = require("./router/negotiateCache");

const port = 3000;
const app = express();
app.use(cors());
app.set("port", port);
app.use("/api", routerStrongCache);
app.use("/api", routerNegotiateCache);


app.listen(port, () => console.log("listening: ", port));


