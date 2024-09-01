class SessionController {
	// [POST] /session
	async create(req, res, next) {
		res.status(200).json({ status: 200, message: "Session created" });
	}

	// [PUT] /session/:sessionId
	async update(req, res, next) {
		res.status(200).json({ status: 200, message: "Session updated" });
	}

	// [POST] /sessions/:sessionId/users/logIn
	async logIn(req, res, next) {
		res.status(200).json({ status: 200, message: "User logged in" });
	}

	// [POST] /sessions/:sessionId/services/:serviceId:authorize
	async authorize(req, res, next) {
		console.log(req.params);
		res.status(200).json({ status: 200, message: "Service authorized" });
	}

	// [POST] /sessions/:sessionId/services/:serviceId:handshake
	async handshake(req, res, next) {
		console.log(req.params);
		res.status(200).json({ status: 200, message: "Service handshake" });
	}
}

module.exports = new SessionController();
