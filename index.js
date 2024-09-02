const express = require("express");
const router = require("./routers");

const app = express();
app.listen(5000);
app.use(router);
