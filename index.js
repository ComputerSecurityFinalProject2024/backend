const express = require("express");
const router = require("./routes");

const app = express();
app.listen(5000);
app.use(router);
