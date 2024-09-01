const express = require("express");
const router = express.Router();

router.use(express.json());

router.use("/sessions", require("./sessions"));
router.use("/errors", require("./errors"));

module.exports = router;
