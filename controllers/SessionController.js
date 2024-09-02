const createError = require("http-errors");
const prisma = require("../prisma/prisma");

class SessionController {
	// [POST] /sessions
	async create(req, res, next) {
		const { users, services, permissions } = req.body;
		try {
			const session = await prisma.session.create({
				data: {
					users: { create: users },
					services: { create: services },
				},
			});
			for (let i = 0; i < permissions.length; ++i) {
				for (const user of permissions[i].users) {
					await prisma.service.update({
						where: {
							name: permissions[i].service,
						},
						data: {
							users: {
								connect: { name: user },
							},
						},
					});
				}
			}
			res.status(201).json({ status: 201, session: session });
		} catch (err) {
			next(err);
		}
	}

	// [PUT] /sessions/:sessionId
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
