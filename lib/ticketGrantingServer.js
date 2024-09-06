const hasher = require('./HashHandler.js');
require('dotenv').config();

///MockData
const TGS_session_key = 'wPWkODvBBJmxzqQg';
const TGS_secret_key = 'AbcdefGhijklmnop';
const Service_secret_key = 'QwertyUiopAsdfgh';

class TicketGrantingServer {
    constructor() {
    }

    generateC2ST(tgt, service) {
        let client_server_session_key = hasher.generateKey();
        client_server_session_key = hasher.encrypt(client_server_session_key, tgt.session_key);
        
        let client_to_server_ticket = tgt.username + "//" + (Date.now() + 1000 * 60 * 60).toString() + "//" + client_server_session_key;
        client_to_server_ticket = hasher.encrypt(client_to_server_ticket, process.env.SERVICE_SECRET_KEY);

        // console.log('tgt.username:', tgt.username);
        // console.log('date:', t);
        // console.log('client_server_session_key:', client_server_session_key, client_server_session_key.length);

        return {client_to_server_ticket: client_to_server_ticket, client_server_session_key: client_server_session_key};
    }

    validateTGT(req_message, authenticator) {
        ///TODO: Get TGS_secret_key from database
        let tgt = hasher.decrypt(req_message.tgt, TGS_secret_key);
        const tgtParts = tgt.split('//');
        console.log(tgtParts);
        const tgtObj = {
            username: tgtParts[0],
            session_key: tgtParts[1],
            valid_until: parseInt(tgtParts[2]),
        };

        authenticator = hasher.decrypt(authenticator, tgtObj.session_key);
        authenticator = authenticator.split('//');
        authenticator = {
            username: authenticator[0],
            valid_until: parseInt(authenticator[1]),
        };

        // console.log('authenticator:', authenticator);
        // const t = Date.now();
        // console.log(authenticator.valid_until - t, tgtObj.valid_until - t);

        if (tgtObj.username == authenticator.username && authenticator.valid_until - Date.now() >= 0 && tgtObj.valid_until - Date.now() >= 0) {
            return this.generateC2ST(tgtObj, req_message.service_id);
        } else {
            return null;
        }
    }
}

module.exports = new TicketGrantingServer;