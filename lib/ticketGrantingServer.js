const hasher = require('./HashHandler.js');

class TicketGrantingServer {
    constructor() {
    }

    generateST(tgt, service) {
        const client_server_session_key = hasher.generateKey();
        const client_to_server_ticket = tgt.username + "//" + (Date.now() + 1000 * 60 * 60).toString() + "//" + client_server_session_key;
        client_to_server_ticket = hasher.encrypt(client_to_server_ticket, ENV('SERVICE_SECRET_KEY'));
        client_server_session_key = hasher.encrypt(client_server_session_key, tgt.session_key);

        ///TODO: Store client_server_session_key in database
        return {client_to_server_ticket: client_to_server_ticket, client_server_session_key: client_server_session_key};
    }

    validateTGT(tgt, authenticator) {
        tgt = hasher.decrypt(tgt, ENV('TGS_SECRET_KEY'));
        const tgtParts = tgt.split('//');
        const tgtObj = {
            username: tgtParts[0],
            session_key: tgtParts[1],
            valid_until: Date.parse(tgtParts[2]),
        };

        authenticator = hasher.decrypt(authenticator, tgtObj.session_key);
        authenticator = authenticator.split('//');
        authenticator = {
            username: authenticator[0],
            valid_until: Date.parse(authenticator[1]),
        };

        if (tgtObj.username == authenticator.username && authenticator.valid_until > Date.now() && tgtObj.valid_until > Date.now()) {
            return tgtObj;
        } else {
            throw new Error('TGT lifetime expired');
        }
    }
}

module.exports = new TicketGrantingServer;