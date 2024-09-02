const hasher = require('./HashHandler.js');
const { validateHeaderName } = require('http');

class AuthenticationServer {
    constructor() {
    }

    generateTGT(username) {
        const session_key = {
            key: hasher.generateKey(),
            valid_until: Date.now() + 1000 * 60 * 60,
        };

        const tgt = username + "//" + session_key.key + "//" + session_key.valid_until.toString();

        tgt = hasher.encrypt(tgt, ENV('TGS_SECRET_KEY'));

        ///TODO: Get client_secret_key from database
        session_key.key = hasher.encrypt(session_key.key, client_secret_key);

        return {tgt: tgt, session_key: session_key};
    }

    authenticateUser(username) {
        ///TODO: Check username trong database
        if (username == 'pw') {
            return this.generateTGT(username);
        } else {
            throw new Error('Invalid Username');
        }
    }
}

module.exports = new AuthenticationServer;