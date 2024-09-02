const crypto = require('crypto');
const { validateHeaderName } = require('http');

class AuthenticationServer {
    constructor() {
        this.users = {};
    }

    generateTGT(username) {
        const sessionKey = crypto.randomBytes(16).toString('hex');
        const tgt = {
            sessionKey: sessionKey,
            username: username,
            validUntil: Date.now() + 1000 * 60 * 60,
        };

        this.users[username] = tgt;
        return tgt;
    }

    authenticateUser(username, password) {
        ///Add more case when add database
        if (password == 'pw') {
            return this.generateTGT(username);
        } else {
            throw new Error('Invalid password');
        }
    }
}

module.exports = AuthenticationServer;