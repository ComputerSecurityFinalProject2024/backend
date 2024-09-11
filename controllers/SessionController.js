const createError = require("http-errors");
const prisma = require("../prisma/prisma");
const authenticationServer = require("../lib/AuthenticationServer");
const ticketGrantingServer = require("../lib/TicketGrantingServer");
const serviceServer = require("../lib/ServiceServer");
const hasher = require("../lib/HashHandler");
require("dotenv").config();

const TGS_session_key = "AAkgVupBvDXUmbcs";
const TGS_secret_key = "NnIwIniHyYPdktZq";
const Service_secret_key = "UVhsUzyDpdKTvJWt";

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
	// async update(req, res, next) {
	// 	res.status(200).json({ status: 200, message: "Session updated" });
	// }

	// [POST] /sessions/:sessionId/users/logIn
	async logIn(req, res, next) {
		const { sessionId } = req.params;
		const { username } = req.body;
		try {
			// console.log(hasher);

			console.log(username);

			const { name: name, password: clientSecretKey } =
				await prisma.user.findUnique({
					where: {
						name: username,
						session: {
							is: { id: parseInt(sessionId) },
						},
					},
					select: {
						name: true,
						password: true,
					},
				});

			console.log(name, clientSecretKey);

			const asMessage =
				name && clientSecretKey
					? authenticationServer.generateTGT(name, clientSecretKey)
					: null;
			// let asMessage = await authenticationServer.authenticateUser(
			// 	username
			// );
			// console.log('asMessage', asMessage);
			if (asMessage == null) {
				next(createError(401, "Invalid username"));
			}
			// let tgs_session_key = hasher.decrypt(asMessage.tgs_session_key, process.env.CLIENT_SECRET_KEY);
			// let tgt_obj = hasher.decrypt(asMessage.tgt, tgs_session_key);

			// ???
			// as_Message = asMessage;

			res.status(200).json({ status: 200, message: asMessage });
		} catch (err) {
			next(err);
		}
	}

	// [POST] /sessions/:sessionId/services/:serviceId/authorize
	async authorize(req, res, next) {
		console.log(req.params);
		const { message, authenticator } = req.body;
		try {
			// console.log('message:', message);
			// console.log('authenticator:', authenticator);
			const tgs_message = await ticketGrantingServer.validateTGT(
				message,
				authenticator
			);

			if (tgs_message == null) {
				next(createError(401, "TGT lifetime expired"));
			}

			console.log("tgs_message:", tgs_message);

			res.status(200).json({ status: 200, message: tgs_message });
		} catch (err) {
			next(err);
		}
	}

	// [POST] /sessions/:sessionId/services/:serviceId/handshake
	async handshake(req, res, next) {
		console.log(req.params);
		const { client_to_server_ticket, authenticator } = req.body;
		try {
			const service_message =
				await serviceServer.validateClientToServerTicket(
					client_to_server_ticket,
					authenticator
				);

			if (service_message == null) {
				next(
					createError(
						401,
						"Invalid client_to_server_ticket or authenticator"
					)
				);
			}

			res.status(200).json({ status: 200, message: service_message });
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new SessionController();
