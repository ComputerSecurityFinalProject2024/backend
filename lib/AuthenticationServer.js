const hasher = require("./HashHandler.js");
require("dotenv").config();

class AuthenticationServer {
	constructor() {}

	generateTGT(username, clientSecretKey) {
		let session_key =
			hasher.generateKey() +
			"//" +
			(Date.now() + 1000 * 60 * 60).toString();

		let tgt = username + "//" + session_key;

		//console.log(tgt);
		//console.log(process.env.TGS_SECRET_KEY);

		tgt = hasher.encrypt(tgt, clientSecretKey);

		///TODO: Get client_secret_key from database

		session_key = hasher.encrypt(session_key, clientSecretKey);

		return { tgt: tgt, tgs_session_key: session_key };
	}

	// authenticateUser(username, password) {
	// 	///TODO: Check username trong database
	// 	if (username == "viet") {
	// 		return this.generateTGT(username, hasher.generateKey());
	// 	} else {
	// 		return null;
	// 	}
	// }
}

module.exports = new AuthenticationServer();
