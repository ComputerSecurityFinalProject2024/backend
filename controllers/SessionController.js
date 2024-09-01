class SessionController {
	async create(req, res, next) {
		res.status(200).json({ status: 200, message: "Session created" });
	}
	async update(req, res, next) {
		res.status(200).json({ status: 200, message: "Session updated" });
	}
	async logIn(req, res, next) {
		res.status(200).json({ status: 200, message: "User logged in" });
	}
	async authorize(req, res, next) {
		console.log(req.params);
		res.status(200).json({ status: 200, message: "Service authorized" });
	}
	async handshake(req, res, next) {
		console.log(req.params);
		res.status(200).json({ status: 200, message: "Service handshake" });
	}
}

module.exports = new SessionController();
