const createError = require("http-errors");
const prisma = require("../prisma/prisma");
const { authenticationServer } = require("../lib/AuthenticationServer");
const { ticketGrantingServer } = require("../lib/TicketGrantingServer");
const { hasher } = require("../lib/HashHandler");
require("dotenv").config();

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
		const { username, password } = req.body;
		try {
			let asMessage = await authenticationServer.authenticateUser(username, password);
			let tgs_session_key = hasher.decrypt(asMessage.tgs_session_key, process.env.CLIENT_SECRET_KEY);
			let tgt_obj = hasher.decrypt(asMessage.tgt, tgs_session_key);
			if (tgt_obj.split("//")[0] !== username) {
				throw createError(401, "Invalid username");
			}
			process.env.TGS_SESSION_KEY = tgs_session_key;
			process.env.USERNAME = username;
			process.env.TGT = asMessage.tgt;
			res.status(200).json({ status: 200, message: "User logged in" });
		} catch (err) {
			next(err);
		}
	}

	// [POST] /sessions/:sessionId/services/:serviceId:authorize
	async authorize(req, res, next) {
		console.log(req.params);
		const serviceId = req.params.serviceId;
		try {
			let newReq = {
				tgt: process.env.TGT,
				service_id: serviceId,
			};
			let authenticator = hasher.encrypt(process.env.USERNAME + "//" + (Date.now() + 1000 * 60 * 60).toString(), process.env.TGS_SESSION_KEY);
			let tgsMessage = await ticketGrantingServer.validateTGT(newReq, authenticator);
			res.status(200).json({ status: 200, message: "Service authorized" });
		} catch (err) {
			next(err);
		}
	}

	// [POST] /sessions/:sessionId/services/:serviceId:handshake
	async handshake(req, res, next) {
		console.log(req.params);
		res.status(200).json({ status: 200, message: "Service handshake" });
	}
}

module.exports = new SessionController();
