const express = require("express");
const createError = require("http-errors");
const router = express.Router();

router.use(express.json());

router.post("/session/:sessionId/users.logIn", async (req, res, next) => {
	res.status(200).json({ status: 200, message: "User logged in" });
});

router.post(
	"/session/:sessionId/services/:serviceId.authorize",
	async (req, res, next) => {
		console.log(req.params);
		res.status(200).json({ status: 200, message: "Service authorized" });
	}
);

router.post(
	"/session/:sessionId/services/:serviceId.handshake",
	async (req, res, next) => {
		console.log(req.params);
		res.status(200).json({ status: 200, message: "Service handshake" });
	}
);

router.use((req, res, next) => {
	next(createError.NotFound());
});

router.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		status: err.status || 500,
		message: err.message,
	});
});

module.exports = router;
