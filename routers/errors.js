const express = require("express");
const createError = require("http-errors");
const router = express.Router();

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
