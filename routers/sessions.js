const express = require("express");
const { sessionController } = require("../controllers");
const router = express.Router();

router.post("/", sessionController.create);

// router.put("/:sessionId", sessionController.update);

router.post("/:sessionId/users/logIn", sessionController.logIn);

// prettier-ignore
router.post(
	"/:sessionId/services/:serviceId/authorize", sessionController.authorize
);

// prettier-ignore
router.post(
	"/:sessionId/services/:serviceId/handshake", sessionController.handshake
);

module.exports = router;
